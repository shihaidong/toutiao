<template>
	<bottom-navigate>
		<bottom-navigate-item link="/home">
			<img slot="img-active" src="../../assets/images/bottomnavigate/home-active.png"/>
			<img slot="img" src="../../assets/images/bottomnavigate/home.png"/>
			<div slot="title">首页</div>
		</bottom-navigate-item>
		<bottom-navigate-item link="/daily">
			<img slot="img-active" src="../../assets/images/bottomnavigate/content-active.png"/>
			<img slot="img" src="../../assets/images/bottomnavigate/content.png"/>
			<div slot="title">日常</div>
		</bottom-navigate-item>
		<bottom-navigate-item link="mine">
			<img slot="img-active" src="../../assets/images/bottomnavigate/mine.png"/>
			<img slot="img" src="../../assets/images/bottomnavigate/mine.png"/>
			<div slot="title">我的</div>
		</bottom-navigate-item>
	</bottom-navigate>
</template>

<script>
	import bottomNavigateItem from '../common/bottomNavigate/bottom-navigate-item.vue'
	import bottomNavigate from '../common/bottomNavigate/bottomNavigate.vue'
	export default{
		components:{
			bottomNavigate,
			bottomNavigateItem
		}
	}
</script>

<style>
	
</style>
