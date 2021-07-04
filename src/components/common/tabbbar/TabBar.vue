<template>		
	<div class="nav-bar">
		<div class="left"><slot name="left"></slot></div>
		<div class="center"><slot name="center"></slot></div>
		<div class="right"><slot name="right"></slot></div>
	</div>
</template>

<script>

</script>

<style scoped>
	.nav-bar{
		position: fixed;
		display: flex;
		text-align: center;
		width: 100%;
		height: 44px;
		background-color: white;
		box-shadow: 0 1px 1px 1px rgba(100,100,100,0.1);
		z-index: 50;
	}
	.left ,.right{
		width: 50px;
		position: relative;
	}
	.center{
		line-height: 44px;
		flex: 1;
	}
	.left div{
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
</style>
