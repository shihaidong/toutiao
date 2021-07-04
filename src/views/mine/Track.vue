<template>
	<div class="container">
		<tab-bar>
			<div slot="left" @click="back"><img src="../../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">我的收藏</div>
			<div slot="right"></div>
		</tab-bar>
		<div class="zhanwei"></div>
	</div>
</template>

<script>
	import tabBar from "../../components/common/tabbbar/TabBar.vue"
	
	export default{
		name:"Track",
		data(){
			return{
		
			
			}
		},
		methods:{
			back(){
				this.$router.back()
			},
		},
		components:{
			tabBar,


		},
		async created(){
			
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

</style>
