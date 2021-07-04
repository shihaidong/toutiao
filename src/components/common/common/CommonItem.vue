<template>
	<div class="common-item">
		<div class="photo">
			<slot name="photo"></slot>
		</div>
		<div class="info">
			<div class="username">
				<slot name="username"></slot>
			</div>
			<div class="common">
				<slot name="common"></slot>
			</div>
			<div class="date-time">
				<slot name="dateTime"></slot>
			</div>
		</div>
		<div v-if="isMine">
			<div @click="remove" >
				删除
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"CommonItem",
		props:{
			isMine:true
		},
		methods:{
			remove(){
				this.$emit("remove")
			}
		}
	}
</script>

<style scoped>
	.common-box .common-item{
		padding: 5px 0;
		display: flex;
		justify-content: space-between;
	}
	.common-box .common-item .photo{
		flex: 1;
	}
	.common-box .common-item .photo img{
		width: 35px;
		height: 35px;
		border-radius: 100%;
	}
	.common-box .common-item .info{
		flex: 4;
	}
	.common-box .common-item .info .username{
		font-size: 15px;
		color: royalblue;
	}
	.common-box .common-item .info .common{
		font-size: 12px;
		box-sizing: border-box;
		padding: 2px 0 0 0;
		color: black;
	}
	.common-box .common-item .info .date-time{
		font-size: 5px;
		font-weight: 100;
		box-sizing: border-box;
		padding: 10px 0 0 0;
	}
</style>
