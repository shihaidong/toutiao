<template>
	<div class="container">
		<tab-bar class="home-tab">
			<div slot="left" @click="back()"><img src="../../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">拼购详情</div>
			<div slot="right"></div>
		</tab-bar>
		<div class="zhanwei"></div>
		<div class="mui-card" v-if="isLoaded">
			<div class="mui-card-content">
				<img v-lazy="datas.photo" alt="" width="100%"/>
			</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p style="color: #333;">{{datas.title}}</p>
				</div>
			</div>
			<div class="mui-card-content" :style="">
				<div class="mui-card-content-inner">
					<p>{{nickname}} on {{ datas.startTime | normalizeDate}}</p>
					<p>截止时间 {{ datas.stopTime}}</p>
					<p>联系方式 {{ datas.contact }}</p>
					<p style="color: #333;">{{datas.detail}}</p>
				</div>
			</div>
			
			<!-- <div class="mui-card-footer">
				<a class="mui-card-link" v-if="isJoin">加入</a>
				<a class="mui-card-link" v-else>退出</a>
			</div> -->
		</div>
		
	</div>
</template>

<script>
	import { getAllGroupByingById } from '../../network/groupBying.js'
	import { getUserInformationByAccount } from '../../network/authorDetailrequest.js'
	import TabBar from '../../components/common/tabbbar/TabBar.vue'
	export default {
		name:'GroupByingDetail',
		data() {
			return {
				isJoin:true,
				isLoaded:false,
				nickname:null,
				datas:null,
			
			}
		},
		methods:{
			back(){
				this.$router.back()
			}
		},
		components:{
			TabBar
		},
		async created() {
			await getAllGroupByingById(this.$route.query.id).then(res =>{
				this.datas = res.data[0];
			
			})
			getUserInformationByAccount(this.datas.account).then(res=> {
				this.nickname = res.data[0].username;
				this.datas.nickname = res.data[0].username;
				this.isLoaded = true;
			})
		},
		filters:{
			normalizeDate(msg) {
				msg = new Date(msg)
				
				return `${msg.getFullYear()} ${msg.getMonth()+1} ${msg.getDate()} ${msg.getHours()}:${msg.getMinutes()}`
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100vh;
		background-color: white;
		position: relative;
		z-index: 10;
	}
	.zhanwei{
		height: 44px;
	}

</style>
