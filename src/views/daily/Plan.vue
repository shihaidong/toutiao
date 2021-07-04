<template>
	<div class="container">
		<tab-bar class="home-tab">
			<div slot="left" @click="back()"><img src="../../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">自习室</div>
			<div slot="right"></div>
		</tab-bar>
		<div class="zhanwei"></div>
	</div>
</template>

<script>
	import tabBar from '../../components/common/tabbbar/TabBar.vue'
	export default {
		name:'Plan',
		data () {
			return {
				
			}
		},
		methods: {
			back(){
				this.$router.back()
			}
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
</style>
