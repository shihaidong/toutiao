<template>
	<div class="container">
		<tab-bar class="home-tab">
			<div slot="left" @click="back()"><img src="../../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">网页</div>
			<div slot="right"></div>
		</tab-bar>
		<iframe id="iframeCon" :src="url" width="105%" height="100%" frameborder="0"></iframe>
	</div>
</template>

<script>
	import tabBar from '../../components/common/tabbbar/TabBar.vue'
	export default {
		name: 'WebView',
		data() {
			return {
				url:null
			}
		},
		methods:{
			back(){
				this.$router.back()
			}
		},
		components:{
			tabBar
		},
		created(){
			this.url = this.$route.query.url;
		}
	}
</script>

<style scoped>
	.container {
		position: relative;
		height: 100vh;
		background-color: white;
		overflow: hidden;
		z-index: 10;
	}
	.zhanwei{
		height: 44px;
	}
	#iframeCon{
		position: absolute;
		top: 44px;
		left: 0;
	}
</style>
