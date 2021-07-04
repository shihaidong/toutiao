<template>
	<div class="bottom">
		<slot></slot>
	</div>
</template>

<script>
</script>

<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.bottom{
		position: fixed;
		display: flex;
		bottom: 0;
		width: 100%;
		height: 49px;
		justify-content: space-around;
		background: #F6F6F6;
	}
</style>
