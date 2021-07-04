<template>
	<div class="container">
		<tab-bar>
			<div slot="left" @click="back"><img src="../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">{{username}}</div>
			<div slot="right"></div>
		</tab-bar>
		<div class="zhanwei"></div>
		<div class="user">
			<div class="img">
				<img :src="fastDFS+photo"/>
			</div>
			<div class="userName">
				<div class="subContainer">
					<div class="extra-information">头条:{{toutiao}}&nbsp;关注:{{subscriber}}&nbsp;粉丝:{{fans}}</div>
					<div class="zhanwei"></div>
					<div v-show="account!=$store.getters.getAccount" class="subscribe">
						   <el-button v-if="isSubscribe" type="info" :loading="isLoading" size="mini" @click="subscribe" plain>取消关注</el-button>
						   <el-button v-else type="danger" :loading="isLoading" size="mini" @click="subscribe">关注</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="feature-view"></div>
		<tab-control class="tab-control" :titles="['文章','视频']" @index="index"></tab-control>
		<home-item :items="items"></home-item>
	</div>
</template>

<script>
	import TabControl from '../components/content/TabControl.vue'
	import tabBar from '../components/common/tabbbar/TabBar.vue'
	import HomeItem from '../components/common/homeItem/HomeItem.vue'
	
	import {getArticlesByAccount,getUserInformationByAccount,getJustVideosByAccount,getJustArticlesByAccount} from '../network/authorDetailrequest.js'
	import {getSubScribersByAccount,getFansByAccount} from '../network/getUserInformation.js'
	import {hasSubScribeSomeOne,subscribeSomeOne,unfollowSomeOne} from '../network/getUserInformation.js'
	
	export default{
		name:'AuthorDetail',
		data(){
			return {
				//该文章用户的account
				account:'',
				username:'error',
				isLoading:false,
				isSubscribe:false,
				toutiao:0,
				subscriber:0,
				fans:0,
				items:[],
				videos:[],
				articles:[],
				photo:null
			}
		},
		components:{
			tabBar,
			HomeItem,
			TabControl
		},
		methods:{
			back(){
				this.$router.back();
			},
			async subscribe(){
				if(this.$store.state.isLogin){
					this.isLoading=true
					//改为后台交互，然后更改isSubScribe的值，该值得默认值需要从后台获取
					if(this.isSubscribe){
						await unfollowSomeOne(this.$store.state.account,this.account).then(res=>{
							console.log("unfollow",res.data)
						})
						await getFansByAccount(this.account).then(res=>{
							this.fans=res.data[0].fans.length
						})
						this.isSubscribe=false
						this.isLoading=false
					}else{
						await subscribeSomeOne(this.$store.state.account,this.account).then(res=>{
							console.log("subscribe",res.data)
						})
						await getFansByAccount(this.account).then(res=>{
							this.fans=res.data[0].fans.length
						})
						this.isSubscribe=true
						this.isLoading=false
					}
				}else{
					this.$router.push('/login')
				}
			},
			index(index){
				if(index==0){
					this.items=this.articles
				}else{
					this.items=this.videos
				}
			}
		},
		async created(){
			this.account=this.$route.query.account
			//获取用户的所有文章
			// getArticlesByAccount(this.account).then(res=>{
			// 	this.items=res.data
			// })
			await getJustArticlesByAccount(this.account).then(res=>{
				this.articles=res.data
				this.items=res.data
			})
			getJustVideosByAccount(this.account).then(res=>{
				this.videos=res.data
				this.toutiao=this.articles.length+this.videos.length
			})
			
			getUserInformationByAccount(this.account).then(res=>{
				let info=res.data[0]
				this.username=info.username
				this.photo = info.photo
				// this.subscriber=info.subscriber
				// this.fans=info.fans
			})
			//如果将粉丝数和关注数放在mysql中，将粉丝与关注的关系放在mongo中有可能出现数据不一致，所以上面的方法被作废
			getSubScribersByAccount(this.account).then(res=>{
				this.subscriber=res.data[0].subscriber.length;
			})
			getFansByAccount(this.account).then(res=>{
				this.fans=res.data[0].fans.length
			})
			if(this.$store.state.isLogin){
				hasSubScribeSomeOne(this.$store.state.account,this.account).then(res=>{
					this.isSubscribe=res.data
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100vh;
		background-color: white;
		position: relative;
		padding: 0.1px;
		z-index: 10;
	}
	.container .zhanwei{
		height: 44px;
	}
	.container .user{
		position: relative;
		display: flex;
		width: 100%;
		height: 2.5rem;
		padding: 0 10px;
		box-sizing: border-box;
	}
	.container .user .img{
		flex: 1;
		position: relative;
	}
	img{
		width: 20px;
		height: 20px;
	}
	.container .user .img img{
		position: absolute;
		width: 2rem;
		height: 2rem;
		border-radius: 100%;
		top: 50%;
		transform: translateY(-50%);
	}
	.container .user .userName{
		flex: 3;
		position: relative;
	}
	.container .user .userName .subContainer{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	.container .user .userName .subContainer .extra-information{
		font-size: 0.5rem;
		color: black;
		font-weight: bold;
	}
	.container .user .userName .subContainer .zhanwei{
		height: 0.25rem;
	}
	.container .user .userName .subContainer .subscribe{
		display: flex;
		justify-content: flex-end;
	}
	.container .feature-view{
		width: 100%;
		height: 0.2rem;
		background-color: #E7E7E7;
	}
	.container .tab-control{
		position: sticky;
		top: 44px;
		background-color: white;
		z-index: 10;
	}
</style>
