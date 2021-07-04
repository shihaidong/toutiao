<template>
	<div>
		<tab-bar class="home-tab">
			<div slot="left"></div>
			<div slot="center">忻州师范学院</div>
			<div slot="right"></div>
		</tab-bar>
		<div class="zhanwei"></div>
		<swiper>
			<swiper-item v-for="i in banners">
				<img @click="dailyUrl(i.url)" :src="fastDFS+i.imageurl" @load="homeswiper1()"/>
			</swiper-item>
		</swiper>
		<recommend-view :recommands="recommands"></recommend-view>
		<notice :notices="notices" @goNotice="goNotice" class="notice"></notice>
	</div>
</template>

<script>
	import Notice from '../components/common/notice/Notice.vue'
	import {Swiper, SwiperItem} from '../components/common/swiper/index.js'
	import tabBar from '../components/common/tabbbar/TabBar.vue'
	import {getHomeMultidata,getHomeRecommandTab,getNotices} from '../network/dailyrequest.js'
	import HomeSwiper from './homeChildren/HomeSwiper.vue'
	import RecommendView from './homeChildren/RecommendView.vue'
	import { fastDFS } from '../common.js'

	export default{
		name:'Home',
		data(){
			return {
				banners:[],
				recommands:[],
				fastDFS:null,
				notices:[]
			}
		},
		components:{
			Swiper,
			SwiperItem,
			tabBar,
			HomeSwiper,
			RecommendView,
			Notice
			
		},
		methods:{
			homeswiper1(){
				
			},
			dailyUrl(url){
				this.$router.push({path:'/webView',query:{url:url}})
			},
			goNotice(url){
				this.$router.push({path:'/webView',query:{url:url}})
			}
		},
		computed:{
			
		},
		mounted(){
			getHomeMultidata().then(res=>{
				this.banners=res.data
			}),
			getHomeRecommandTab().then(res=>{
				this.recommands=res.data
			})
			getNotices().then(res => {
				console.log(res)
				this.notices = res.data
			})
			
			
		},
		created(){
			this.fastDFS = fastDFS;
		}
	}
</script>

<style scoped>
	.home-tab{
		background-color: pink;
		color: white;
	}
	.zhanwei{
		height: 44px;
	}
	.tab-control{
		position: sticky;
		top: 0;
	}
	.notice{
		margin-top: 10px;
	}
</style>
