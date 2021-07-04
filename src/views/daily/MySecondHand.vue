<template>
	<div class="container">
		<tab-bar class="home-tab">
			<div slot="left" @click="back()"><img src="../../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">我的闲置</div>
			<div slot="right"></div>
		</tab-bar>
		<div class="zhanwei"></div>
		<ul id="OA_task_1" class="mui-table-view">
			<li class="mui-table-view-cell mui-media"  v-for="item in datas" :key="item.id" @click.prevent="secondHandDetail(item.id)">
				<div class="mui-slider-right mui-disabled" @click.stop="del(item.id)">
					<a class="mui-btn mui-btn-red">删除</a>
				</div>
				<div class="mui-slider-handle">
					<img class="mui-media-object mui-pull-left" :src="item.photo">
					<div class="mui-media-body">
						{{item.title}}
						<p class='mui-ellipsis'>{{item.detail}}</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import tabBar from '../../components/common/tabbbar/TabBar.vue'
	import { getAllSecondHandByAccount, deleteSecondHandById } from '../../network/secondHand.js'
	export default {
		name:'MySecondHand',
		data() {
			return{
				datas:null
			}
		},
		methods:{
			back(){
				this.$router.back()
			},
			secondHandDetail(id) {
				this.$router.push({path:"/secondHandDetail",query:{id:id}})
			},
			async del(id){
				await deleteSecondHandById(id).then(res => {
					// console.log(res.data)
					// if(res.data==true) {
					// 	this.datas = this.datas.filter(item=>{
					// 		item.id != id;
					// 	})
					// }
				})
				await getAllSecondHandByAccount(this.$route.query.account).then(res=> {
					this.datas = res.data;
					console.log(this.datas)
				})
			}
		},
		components:{
			tabBar
		},
		created(){
			console.log(this.$route.query.account)
			getAllSecondHandByAccount(this.$route.query.account).then(res=> {
				this.datas = res.data;
				console.log(this.datas)
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
	.zhanwei{
		height: 44px;
	}
</style>
