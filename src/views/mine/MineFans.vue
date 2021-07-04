<template>
	<div class="container">
		<tab-bar class="tab">
			<div slot="left" @click="back"><img src="../../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">粉丝</div>
			<div slot="right"></div>
		</tab-bar>
		<div class="zhanwei"></div>
		<div v-for="item in newData" :key="item.account">
			<div class="item" @click="author(item.account)">
				<div class="photo"><img :src="fastDFS+ item.photo"/></div>
				<div class="info">
					<div class="username">{{item.username}}</div>
					<div class="toutiao">头条：{{item.toutiao}}</div>
				</div>
			</div>
			<hr/>
		</div>
		
	</div>
</template>

<script>
	import tabBar from '../../components/common/tabbbar/TabBar.vue'
	
	import {getFansByAccount} from '../../network/getUserInformation.js'
	import {getUserInformationByAccount} from '../../network/authorDetailrequest.js'
	export default{
		name:'MineSubScriber',
		data(){
			return{
				fans:[],
				newData:[]
			} 
		},
		methods:{
			back(){
				this.$router.back()
			},
			author(account){
				this.$router.push({path:'/authorDetail',query:{account:account}})
			}
		},
		components:{
			tabBar
		},
		async created(){
			console.log("create")
			await getFansByAccount(this.$store.state.account).then(res=>{
				this.fans=res.data[0].fans
			})
			this.fans.forEach((i)=>{
				getUserInformationByAccount(i).then(res=>{
					let k={account:res.data[0].account,username:res.data[0].username,photo:res.data[0].photo,toutiao:res.data[0].toutiao}
					console.log(k)
					this.newData.push(k)
				})
			})
		}
	}
</script>

<style scoped>
	.container{
		position: relative;
		width: 100%;
		height: 100vh;
		background-color: white;
		z-index: 10;
		overflow: hidden;
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
	.item{
		display: flex;
		justify-content: space-around;
		width: 100%;
		box-sizing: border-box;
		padding: 10px 10px;
	}
	.item .photo{
		flex: 1;
	}
	.item .photo img{
		width: 2rem;
		height: 2rem;
		border-radius: 100%;
		
	}
	.item .info{
		display: flex;
		justify-content: center;
		flex-direction: column;
		flex: 2;
	}
	.item .username{
		font-size: 20px;
		font-weight: bold;
	}
	.item .toutiao{
		font-size: 10px;
	}
</style>
