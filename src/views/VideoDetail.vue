<template>
	<div class="container">
		<tab-bar>
			<div slot="left" @click="back"><img src="../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">忻师头条</div>
			<div slot="right" @click="author"><img src="../assets/images/common/point.svg" class="back"/></div>
		</tab-bar>
		<div class="zhanwei"></div>
		<Xgplayer :config="config" @player="Player = $event"/>
		<div class="video-detail">
			<div class="user-info" @click="author">
				<img :src="fastDFS+ photo"/>
				<div class="username">{{username}}</div>
			</div>
			<div class="abstract">简介：{{abstract}}</div>
		</div>
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
			<el-input type="text" v-model="common" placeholder="写评论..." prefix-icon="el-icon-edit" maxlength="50" show-word-limit size="small"/>
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
	import Xgplayer from 'xgplayer-vue'
	import CommonBox from "../components/common/common/CommonBox.vue"
	import CommonItem from "../components/common/common/CommonItem.vue"
	
	import {getCommonsByArticleId,insertCommon,deleteCommon,getUserInformationByAccount} from '../network/authorDetailrequest.js'
	import {getArticleById,hasCollectedSomeArticle,collecteArticle,unCollecteArticle} from '../network/detailrequest.js'
	import tabBar from '../components/common/tabbbar/TabBar.vue'
	export default{
		name:'VideoDetail',
		components:{
			Xgplayer,
			tabBar,
			CommonBox,
			CommonItem
		},
		data(){
			return{
				id:'',
				account:'',
				username:null,
				common:"",
				isCollected:false,
				//这个是mongo中的数据
				abstract:'',
				commons:[],
				isMine:true,
				//这个是mongo中处理后的数据
				destinationCommons:[],
				commonLength:0,
				config: {
				        id: 'vs',
				        url: this.$route.query.imageurl2,
						fluid: true,
						autoplay: true,
						playbackRate: [0.5, 0.75, 1, 1.5, 2],
				      },
				Player: null,
				photo:null
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
						insertCommon(this.id,this.$store.state.account,this.common).then(async res=>{
							if(res.data){
								let t = this.$store.getters;
								let date = new Date();
								let normalize = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`
								let k={account:t.getAccount,username:t.getUserName,photo:t.getPhoto,common:this.common,dateTime:normalize}
								this.destinationCommons.unshift(k)
								this.common=""
								this.commonLength += 1;
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
				deleteCommon(this.id,account,common,dateTime).then(res=>{
					if(res.data){
						console.log("从队列中删掉这条评论")
						this.destinationCommons = this.destinationCommons.filter((item,i)=>{
							return i!= index;
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
			console.log(this.account)
			await getArticleById(this.id).then(res=>{
				// console.log(this.$route.query.id,res)
				this.abstract=res.data.article
			})
			this.isInit=true
			if(this.$store.state.isLogin){
				await hasCollectedSomeArticle(this.$store.state.account,this.id).then(res=>{
					this.isCollected=res.data
				})
			}
			await getCommonsByArticleId(this.id).then(res=>{
				this.commons=res.data[0].allCommons
				this.commonLength=this.commons.length
			})
			// console.log(this.$route.query.account)
			await getUserInformationByAccount(this.$route.query.account).then(res=>{
				this.username = res.data[0].username;
				this.photo = res.data[0].photo;
			})
			this.commons.forEach(async (i,index)=>{
				await getUserInformationByAccount(i.account).then(res=>{
					let k={account:this.commons[index].account,username:res.data[0].username,photo:res.data[0].photo,common:this.commons[index].common,dateTime:this.commons[index].dateTime}
					this.destinationCommons.unshift(k)
				})
				// console.log(this.destinationCommons)
			})
			
		},
		filters:{
			dataFormat:function(msg){
				let arr=msg.split(".")
				let ret=arr[0]+"/"+arr[1]+"/"+arr[2]+" "+arr[3]+":"+arr[4]
				return ret
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100vh;
		background-color: white;
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
	.container .video-detail{
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		min-height: 50px;
		box-sizing: border-box;
		padding: 10px;
	}
	.container .video-detail .user-info{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.container .video-detail .abstract{
		color: #a5a5a5;
		font-size: 6px;
	}
	.container .video-detail .user-info img{
		width: 30px;
		height: 30px;
		border-radius: 100%;
		margin-right: 15px;
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
