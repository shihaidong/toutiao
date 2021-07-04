<template>
	<div class="container">
		<tab-bar class="home-tab">
			<div slot="left" @click="back()"><img src="../../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">设置</div>
			<div slot="right"></div>
		</tab-bar>
		<div class="zhanwei"></div>
		<div class="mui-page-content">
			<div class="mui-scroll-wrapper">
				<div class="mui-scroll">
					<ul class="mui-table-view mui-table-view-chevron">
						<li class="mui-table-view-cell mui-media" @click="goAccount()">
							
								<img class="mui-media-object mui-pull-left head-img" id="head-img" :src="photo">
								<div class="mui-media-body">
									{{username}}
									<p class='mui-ellipsis'>账号:{{account}}</p>
								</div>
						
						</li>
					</ul>
					<ul class="mui-table-view mui-table-view-chevron">
						<li class="mui-table-view-cell" @click="goAccount()">
							账号与安全
						</li>
					</ul>
					<ul class="mui-table-view mui-table-view-chevron">
						<li class="mui-table-view-cell">
							<a href="#about" class="mui-navigate-right">关于本软件 <i class="mui-pull-right update">V1.1.0</i></a>
						</li>
					</ul>
					<ul class="mui-table-view" @click="exit()">
						<li class="mui-table-view-cell" style="text-align: center;">
							退出登录
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	import tabBar from '../../components/common/tabbbar/TabBar.vue'
	import { getUserInformationByAccount } from '../../network/authorDetailrequest.js'
	export default {
		name:'Setting',
		data () {
			return {
				username:null,
				photo:null,
				account:null
			}
		},
		methods: {
			back(){
				console.log('back')
				this.$router.back()
			},
			exit(){
				window.sessionStorage.clear()
				this.$store.commit("setLoginState",false)
				this.$store.commit("setAccount","")
				this.$router.back()
			},
			goAccount() {
				this.$router.push({path:'/account',query:{account:this.$route.query.account}})
			}
		},
		created() {
			getUserInformationByAccount(this.$route.query.account).then(res => {
				this.username = res.data[0].username;
				this.photo = this.fastDFS+res.data[0].photo;
				this.account = res.data[0].account;
			})
		},
		components:{
			tabBar
		}
	}
</script>

<style scoped>
	.container{
		position: relative;
		height: 100vh;
		background-color: white;
		z-index: 10;
	}
	.zhanwei{
		height: 44px;
	}
	html,
				body {
					background-color: #efeff4;
				}
				.mui-views,
				.mui-view,
				.mui-pages,
				.mui-page,
				.mui-page-content {
					/* position: absolute; */
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					width: 100%;
					background-color: #efeff4;
				}
				.mui-pages {
					top: 46px;
					height: auto;
				}
				.mui-scroll-wrapper,
				.mui-scroll {
					position: static;
					background-color: #efeff4;
				}
				.mui-page.mui-transitioning {
					-webkit-transition: -webkit-transform 300ms ease;
					transition: transform 300ms ease;
				}
				.mui-page-left {
					-webkit-transform: translate3d(0, 0, 0);
					transform: translate3d(0, 0, 0);
				}
				.mui-ios .mui-page-left {
					-webkit-transform: translate3d(-20%, 0, 0);
					transform: translate3d(-20%, 0, 0);
				}
				.mui-navbar {
					position: fixed;
					right: 0;
					left: 0;
					z-index: 10;
					height: 44px;
					background-color: #f7f7f8;
				}
				.mui-navbar .mui-bar {
					position: absolute;
					background: transparent;
					text-align: center;
				}
				.mui-android .mui-navbar-inner.mui-navbar-left {
					opacity: 0;
				}
				.mui-ios .mui-navbar-left .mui-left,
				.mui-ios .mui-navbar-left .mui-center,
				.mui-ios .mui-navbar-left .mui-right {
					opacity: 0;
				}
				.mui-navbar .mui-btn-nav {
					-webkit-transition: none;
					transition: none;
					-webkit-transition-duration: .0s;
					transition-duration: .0s;
				}
				.mui-navbar .mui-bar .mui-title {
					display: inline-block;
					width: auto;
				}
				.mui-page-shadow {
					position: absolute;
					right: 100%;
					top: 0;
					width: 16px;
					height: 100%;
					z-index: -1;
					content: '';
				}
				.mui-page-shadow {
					background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, .01) 50%, rgba(0, 0, 0, .2) 100%);
					background: linear-gradient(to right, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, .01) 50%, rgba(0, 0, 0, .2) 100%);
				}
				.mui-navbar-inner.mui-transitioning,
				.mui-navbar-inner .mui-transitioning {
					-webkit-transition: opacity 300ms ease, -webkit-transform 300ms ease;
					transition: opacity 300ms ease, transform 300ms ease;
				}
				.mui-page {
					display: none;
				}
				.mui-pages .mui-page {
					display: block;
				}
				.mui-page .mui-table-view:first-child {
					margin-top: 15px;
				}
				.mui-page .mui-table-view:last-child {
					margin-bottom: 30px;
				}
				.mui-table-view {
					margin-top: 20px;
				}
				
				.mui-table-view span.mui-pull-right {
					color: #999;
				}
				.mui-table-view-divider {
					background-color: #efeff4;
					font-size: 14px;
				}
				.mui-table-view-divider:before,
				.mui-table-view-divider:after {
					height: 0;
				}
				.head {
					height: 40px;
				}
				#head {
					line-height: 40px;
				}
				.head-img {
					width: 40px;
					height: 40px;
				}
				#head-img1 {
					position: absolute;
					bottom: 10px;
					right: 40px;
					width: 40px;
					height: 40px;
				}
				.update {
					font-style: normal;
					color: #999999;
					margin-right: -25px;
					font-size: 15px
				}
				.mui-fullscreen {
					position: fixed;
					z-index: 20;
					background-color: #000;
				}
				.mui-ios .mui-navbar .mui-bar .mui-title {
					position: static;
				}
				/*问题反馈在setting页面单独的css*/
				#feedback .mui-popover{
					position: fixed;
				}
				#feedback .mui-table-view:last-child {
				    margin-bottom: 0px;
				}
				#feedback .mui-table-view:first-child {
				    margin-top: 0px;
				}
				
				.mui-plus.mui-plus-stream .mui-stream-hidden{
					display: none !important;
				}
</style>
