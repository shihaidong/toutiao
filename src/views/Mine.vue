<template>
	<div class="container">
		<div v-if="$store.state.isLogin" class="user" @click="author">
			<div class="img">
				<img :src="photo"/>
			</div>
			<div class="userName">
				<div class="subContainer">
					<div class="subUserName">
						{{username}}
					</div>
					<div class="zhanwei"></div>
					<div class="other">
						头条:{{toutiao}}&nbsp;<span @click.stop="mineSubScriber()">关注:{{subscriber}}</span>&nbsp;<span @click.stop="mineFans()">粉丝:{{fans}}</span>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="user login_box">
			<el-row> 
				  <el-button type="info" size="primary" circle @click="regiest">注册</el-button>
				  <el-button type="danger" size="primary" circle @click="login">登录</el-button>
			</el-row>
			
		</div>
		<div class="feature-view"></div>
		<div class="function">
			<div class="sub-function" @click="collection">
				<div class="nav">
					<img src="../assets/images/mine/collection.png" />
					<div class="tag">收藏</div>
				</div>
			</div>
			<div class="sub-function" @click="track">
				<div class="nav">
					<img src="../assets/images/mine/track.png" />
					<div class="tag">足迹</div>
				</div>
			</div>
			<div class="sub-function">
				<div class="nav" @click="feedback()">
					<img src="../assets/images/mine/feedback.png" />
					<div class="tag">反馈</div>
				</div>
			</div>
			<div class="sub-function">
				<div class="nav">
					<img src="../assets/images/mine/notification.png" />
					<div class="tag">通知</div>
				</div>
			</div>
			<div class="sub-function" @click="setting()">
				<div class="nav">
					<img src="../assets/images/mine/setting.png" />
					<div class="tag">设置</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import {getUserInformationByAccount,getArticlesByAccount} from '../network/authorDetailrequest.js'
  import {getSubScribersByAccount,getFansByAccount} from '../network/getUserInformation.js'
  export default {
	name:'Mine',
    data() {
      return{
		  //用户id(唯一标识符)
		  account:String,
		  //用户名
		  username:String,
		  photo:null,
		  //头条数
		  toutiao:0,
		  //关注数
		  subscriber:0,
		  //粉丝数
		  fans:0,
	  }
    },
	components:{
		
	},
	methods:{
		regiest(){
			this.$router.push('/regist')
		},
		login(){
			this.$router.push('/login')
		},
		author(){
			this.$router.push({path:'/authorDetail',query:{account:this.$store.state.account}})
		},
		mineSubScriber(){
			this.$router.push('/mineSubScriber')
		},
		mineFans(){
			this.$router.push('/mineFans')
		},
		collection(){
			if(this.$store.state.isLogin){
				this.$router.push('/collection')
			}else{
				this.$router.push('/login')
			}
		},
		track(){
			if(this.$store.state.isLogin){
				this.$router.push('/track')
			}else{
				this.$router.push('/login')
			}
		},
		feedback() {
			if(this.$store.state.isLogin){
				this.$router.push('/feedback')
			}else{
				this.$router.push('/login')
			}
		},
		setting(){
			if(this.$store.state.isLogin) {
				this.$router.push({path:'/setting',query:{account:this.$store.state.account}})
			}
			// this.$router.push('/setting')
		},
		
		
	},
	async activated(){
		if(this.$store.state.isLogin){
			getUserInformationByAccount(this.$store.state.account).then(res=>{
				let info=res.data[0]
				this.username=info.username
				this.photo = this.fastDFS + info.photo;
				// this.subscriber=info.subscriber
				// this.fans=info.fans
			})
			getSubScribersByAccount(this.$store.state.account).then(res=>{
				this.subscriber=res.data[0].subscriber.length;
			})
			getFansByAccount(this.$store.state.account).then(res=>{
				this.fans=res.data[0].fans.length
			})
			getArticlesByAccount(this.$store.state.account).then(res=>{
				this.toutiao=res.data
			})
		}
	}
   
  }
</script>

<style scoped>
	.container{
		position: relative;
		width: 100%;
	}
	.container .user{
		position: relative;
		display: flex;
		width: 100%;
		height: 2.5rem;
		padding: 0 10px;
		box-sizing: border-box;
	}
	.container .user.login_box{
		justify-content: center;
		align-items: center;
	}
	.container .user.login_box .login{
		width: 2rem;
		height: 2rem;
		border-radius: 100%;
		background-color: red;
		text-align: center;
		line-height: 2rem;
	}
	.container .user .img{
		flex: 1;
		position: relative;
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
	.container .user .userName .subContainer .subUserName{
		font-size: 20px;
		color: black;
		font-weight: bold;
	}
	.container .user .userName .subContainer .zhanwei{
		height: 5px;
	}
	.container .user .userName .subContainer .other{
		font-size: 10px;
		color: black;
	}
	.container .feature-view{
		width: 100%;
		height: 0.2rem;
		background-color: #E7E7E7;
	}
	.container .function{
		position: relative;
		margin-top: 5px;
	}
	.container .function .sub-function{
		width: 100%;
		height: 1.2rem;
		text-decoration: none;
	}
	.container .function .sub-function .nav{
		display: flex;
		padding: 4px 10px;
	}
	.container .function .sub-function img{
		width: 1.2rem;
		height: 1.2rem;
	}
	.container .function .sub-function .tag{
		display: inline-block;
		line-height: 1.2rem;
		padding-left: 10px;
		font-size: 0.4rem;
		color: black;
	}
</style>
