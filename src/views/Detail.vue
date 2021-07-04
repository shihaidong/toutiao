<template>
	<div class="container">
		<tab-bar>
			<div slot="left" @click="back"><img src="../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">忻师头条</div>
			<div slot="right" @click="author"><img src="../assets/images/common/point.svg" class="back"/></div>
		</tab-bar>
		<div class="zhanwei"></div>
		<article>
			<viewer v-if="isInit" :initialValue="viewerText"/>
			<!-- <viewer :Value="viewerText"/> -->
		</article>
		<common-box id="common-box">
			<common-item :isMine="i.account==$store.state.account" v-for="(i,index) in destinationCommons" @remove="remove(i.account,i.common,i.dateTime,index)">
				<div slot="photo"><img :src="fastDFS+i.photo"/></div>
				<div slot="username" @click="commonPeople(i.account)">{{i.username}}</div>
				<div slot="common">{{i.common}}</div>
				<div slot="dateTime">{{i.dateTime | dataFormat}}</div>
			</common-item>
		</common-box>
		<div class="zhanwei"></div>
		<div class="operator">
			<el-input type="text" v-model="common" placeholder="写评论..." prefix-icon="el-icon-edit" maxlength="50" show-word-limit size="small" style="margin-bottom: 0;"/>
			<el-badge :value="commonLength" :max="99">
				<a href="#common-box" style="text-decoration: none;color: black;"><i class="iconfont icon-pinlun"></i></a>
			</el-badge>
			<i v-if="isCollected" class="iconfont icon-shoucang1" @click="collection"></i>
			<i v-else class="iconfont icon-shoucang" @click="collection"></i>
			<i class="iconfont icon-fasong" @click="fason"></i>
		</div>
	</div>
</template>

<script>	
	import { Viewer } from '@toast-ui/vue-editor';
	import 'codemirror/lib/codemirror.css';
	import '@toast-ui/editor/dist/toastui-editor.css';
	
	import CommonBox from "../components/common/common/CommonBox.vue"
	import CommonItem from "../components/common/common/CommonItem.vue"
	
	import {getCommonsByArticleId,insertCommon,deleteCommon,getUserInformationByAccount} from '../network/authorDetailrequest.js'
	import {getArticleById,hasCollectedSomeArticle,collecteArticle,unCollecteArticle} from '../network/detailrequest.js'
	import tabBar from '../components/common/tabbbar/TabBar.vue'
	export default{
		name:'Detail',
		components:{
			tabBar,
			Viewer,
			CommonBox,
			CommonItem
		},
		data(){
			return{
				id:'',
				account:'',
				common:"",
				isCollected:false,
				viewerText:"",
				isInit:false,
				//这个是mongo中的数据
				commons:[],
				isMine:true,
				//这个是mongo中处理后的数据
				destinationCommons:[],
				commonLength:0
			}
		},
		methods:{
			back(){
				this.$router.back()
			},
			author(){
				this.$router.push({path:'/authorDetail',query:{account:this.account}})
			},
			collection(){
				//必须在后台返回成功修改数据后再进行渲染
				//首先判断是是否登录并且不是自己的文章
				if(this.$store.state.isLogin){
					if(this.$store.state.account===this.account){
						console.log("这是自己的文章")
					}else{
						if(this.isCollected){
							unCollecteArticle(this.$store.state.account,this.id).then(res=>{
								this.isCollected=false
							})
						}else{
							collecteArticle(this.$store.state.account,this.id).then(res=>{
								this.isCollected=true
							})
						}
					}
				}
				
				
			},
			fason(){
				//发表评论
				//判断登录
				if(this.$store.state.isLogin){
					//评论取不能为空
					if(this.common!==""){
						insertCommon(this.id,this.$store.state.account,this.common).then(res=>{
							if(res.data){
								let date = new Date();
									date = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`
								let k={account:this.$store.getters.getAccount,username:this.$store.getters.getUserName,
										photo:this.$store.getters.getPhoto,common:this.common,dateTime:date}
								this.destinationCommons.unshift(k)
								this.commonLength += 1;
								this.common=""
							}
						})
					}else{
						console.log("空的")
					}
				}else{
					this.$router.push("/login")
				}
			},
			remove(account,common,dateTime,index){
				// console.log(index)
				deleteCommon(this.id,account,common,dateTime).then(res=>{
					if(res.data){
						this.destinationCommons = this.destinationCommons.filter((item,i) => {
							return index != i;
						})
						this.commonLength -= 1;
					}
				})
			},
			commonPeople(account){
				this.$router.push({path:'/authorDetail',query:{account:account}})
			}
		},
		async created(){
			//根据id获得article文档
			this.id=this.$route.query.id
			this.account=this.$route.query.account
			await getArticleById(this.id).then(res=>{
				// console.log(this.$route.query.id,res)
				this.viewerText=res.data.article
			})
			this.isInit=true
			if(this.$store.state.isLogin){
				await hasCollectedSomeArticle(this.$store.state.account,this.id).then(res=>{
					this.isCollected=res.data
				})
			}
			await getCommonsByArticleId(this.id).then(res=>{
				console.log(res)
				this.commons=res.data[0].allCommons
				this.commonLength=this.commons.length
			})
			this.commons.forEach(async (i,index)=>{
				await getUserInformationByAccount(i.account).then(res=>{
					let k={account:this.commons[index].account,username:res.data[0].username,photo:res.data[0].photo,common:this.commons[index].common,dateTime:this.commons[index].dateTime}
					this.destinationCommons.unshift(k)
				})
			})
			
		},
		filters:{
			dataFormat:function(msg){
				let arr=msg.split(".")
				let ret=arr[0]+"年"+arr[1]+"月"+arr[2]+"日"+arr[3]+"时"+arr[4]+"分"
				return ret
			}
		},
		mounted() {
		}
	}
</script>

<style scoped>
	.container{
		height: 100vh;
		background-color: white!important;
		z-index: 10;
		position: relative;
		padding: 0.1px;
	}
	.zhanwei{
		height: 44px;
	}
	.container article{
		box-sizing: border-box;
		padding: 0 0.35rem;
	}
	.operator{
		position: fixed;
		display: flex;
		height: 50px;
		width: 100%;
		border-top: 0.1px solid lightgray;
		bottom: 0;
		box-sizing: border-box;
		padding: 0 10px;
		justify-content: space-between;
		align-items: center;
		background-color: white;
	}
	.back{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		margin-left: -10px;
	}
	img{
		width: 20px;
		height: 20px;
	}
	.operator i{
		font-size: 0.72rem;
		margin: 0 0 0 0.55rem;
	}

</style>
