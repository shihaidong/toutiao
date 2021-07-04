<template>
	<div class="container">
		<tab-bar class="tab">
			<div slot="left" @click="back"><img src="../../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">我的收藏</div>
			<div slot="right"></div>
		</tab-bar>
		<div class="zhanwei"></div>
		<home-item :items="collections" class="home-item"></home-item>
	</div>
</template>

<script>
	import tabBar from "../../components/common/tabbbar/TabBar.vue"
	import HomeItem from '../../components/common/homeItem/HomeItem.vue'
	
	import {getCollectedArticlesByAccount} from '../../network/detailrequest.js'
	export default{
		name:"Collection",
		data(){
			return{
				collections:[]
			}
		},
		methods:{
			back(){
				this.$router.back()
			}
		},
		components:{
			tabBar,
			HomeItem
		},
		activated(){
			getCollectedArticlesByAccount(this.$store.state.account).then(res=>{
				this.collections=res.data
			})
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
	.container .zhanwei{
		height: 44px;
	}
	.container .tab{
		position: fixed;
		width: 100%;
		background-color: white;
	}
	.container .tab .back{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		margin-left: -10px;
	}
	.container .tab .back img{
		width: 20px;
		height: 20px;
	}
</style>
