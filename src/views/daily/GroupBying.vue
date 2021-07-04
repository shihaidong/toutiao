<template>
	<div class="container">
		<tab-bar class="home-tab">
			<div slot="left" @click="back()"><img src="../../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">拼购</div>
			<div slot="right" @click="detail()"><img src="../../assets/images/common/point.svg" class="back"/></div>
		</tab-bar>
		<div class="zhanwei"></div>
		<ul class="mui-table-view">
		    <li class="mui-table-view-cell mui-media" v-for="item in datas" :key="item.id" @click="groupByingDetail(item.id)">
		        <a href="javascript:;">
		            <img class="mui-media-object mui-pull-left" :src="item.photo">
		            <div class="mui-media-body">
		                {{item.title}}
		                <p class='mui-ellipsis'>{{item.detail}}</p>
		            </div>
		        </a>
		    </li>
		</ul>
		<el-button class="btn" type="primary" icon="el-icon-edit" circle @click="addGroupBying()"></el-button>
	</div>
</template>

<script>
	import TabBar from '../../components/common/tabbbar/TabBar.vue'
	
	import { getAllGroupBying } from '../../network/groupBying.js'
	export default {
		name: 'GroupBying',
		data() {
			return {
				datas:[]
			}
		},
		methods:{
			back(){
				this.$router.back()
			},
			groupByingDetail(id) {
				this.$router.push({path:"/groupByingDetail",query:{id:id}})
			},
			detail(){
				this.$router.push({path:'/myGroupByingDetail',query:{account:this.$route.query.account}});
			},
			addGroupBying(){
				this.$router.push({path:'/addGroupBying', query:{account:this.$route.query.account}})
			}
		},
		components:{
			TabBar
		},
		created(){
			getAllGroupBying().then(res => {
				this.datas = res.data;
				console.log(this.datas)
			})
		}
	}
</script>

<style scoped>
	.container {
		height: 100vh;
		background-color: white;
		z-index: 10;
		position: relative;
		padding: 0.1px;
	}
	.zhanwei{
		height: 44px;
	}
	.back{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		margin-left: -10px;
	}
	img.back{
		width: 20px;
		height: 20px;
	}
	.btn{
		position: fixed;
		bottom: 1rem;
		right: 0.5rem;
	}
</style>
