import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Home from '../views/Home.vue'
import Daily from '../views/Daily.vue'
// const Daily =()=>import('../views/Daily.vue')
import Mine from '../views/Mine.vue'
// const Mine=()=>import('../views/Mine.vue')
import Detail from '../views/Detail.vue'
import VideoDetail from '../views/VideoDetail.vue'
import Login from '../views/relevanceLogin/Login.vue'
import Regist from '../views/relevanceLogin/Regist.vue'
import AuthorDetail from '../views/AuthorDetail.vue'
import MineSubScriber from '../views/mine/MineSubScriber.vue'
import MineFans from '../views/mine/MineFans.vue'
import Collection from '../views/mine/Collection.vue'
import Track from '../views/mine/Track.vue'
import Setting from '../views/mine/Setting.vue'
import GroupBying from '../views/daily/GroupBying.vue'
import GroupByingDetail from '../views/daily/GroupByingDetail.vue'
import MyGroupByingDetail from '../views/daily/MyGroupByingDetail.vue'
import AddGroupBying from '../views/daily/AddGroupBying.vue'
import SecondHand from '../views/daily/SeondHand.vue'
import SecondHandDetail from '../views/daily/SecondHandDetail.vue'
import AddSecondHand from '../views/daily/AddSecondHand.vue'
import MySecondHand from '../views/daily/MySecondHand.vue'
import Plan from '../views/daily/Plan.vue'
import Account from '../views/mine/Account.vue'
import ModifyPassWord from '../views/mine/ModifyPassword.vue'
import FeedBack from '../views/mine/FeedBack.vue'
import WebView from '../views/daily/WebView.vue'

import FastClick from 'fastclick'
FastClick.attach(document.body)

const routes=[
	{
		path:'/',
		redirect:'/home'
	},
	{
		path:'/daily',
		component:Daily,
		name:'Daily'
	},
	{
		path:'/home',
		component:Home,
		name:'Home'
	},
	{
		path:'/mine',
		component:Mine,
		name:'mine'
	},
	{
		path:'/detail',
		component:Detail,
		name:'detail'
	},
	{
		path:'/authorDetail',
		component:AuthorDetail,
		name:'AuthorDetail'
	},
	{
		path:'/login',
		component:Login,
		name:'Login'
	},
	{
		path:'/regist',
		component:Regist,
		name:'Regist'
	},
	{
		path:'/mineSubScriber',
		component:MineSubScriber,
		name:'MineSubScriber'
	},
	{
		path:'/mineFans',
		component:MineFans,
		name:'MineFans'
	},
	{
		path:'/collection',
		component:Collection,
		name:'Collection'
	},
	{
		path:'/track',
		component:Track,
		name:'Track'
	},
	{
		path:'/setting',
		component:Setting,
		name:'Setting'
	},
	{
		path:'/videoDetail',
		component:VideoDetail,
		name:'VideoDetail'
	},
	{
		path:'/groupBying',
		component:GroupBying,
		name:'GroupBying'
	},
	{
		path:'/groupByingDetail',
		component:GroupByingDetail,
		name:'GroupByingDetail'
	},
	{
		path:'/myGroupByingDetail',
		component:MyGroupByingDetail,
		name:'MyGroupByingDetail'
	},
	{
		path:'/addGroupBying',
		component: AddGroupBying,
		name: 'AddGroupBying'
	},
	{
		path:'/secondHand',
		component: SecondHand,
		name:'SecondHand'
	},
	{
		path:'/secondHandDetail',
		component: SecondHandDetail,
		name: 'SecondHandDetail'
	},
	{
		path:'/addSecondHand',
		component: AddSecondHand,
		name: 'AddSecondHand'
	},
	{
		path:'/mySecondHand',
		component: MySecondHand,
		name: 'MySecondHand'
	},
	{
		path:'/plan',
		component: Plan,
		name: 'Plan'
	},
	{
		path:'/account',
		component: Account,
		name: 'Account'
	},
	{
		path: '/modifyPassword',
		component: ModifyPassWord,
		name: 'ModifyPassword'
	},
	{
		path: '/feedback',
		component: FeedBack,
		name: 'FeedBack'
	},
	{
		path:'/webView',
		component: WebView,
		name: 'WebView'
	}
	
]
const router = new VueRouter({
	routes,
	//打包的时候使用hash模式否则会出现一些路由错误
	mode:'history'
})

export default router