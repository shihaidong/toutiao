<template>
	<div class="notice-wrapper">
		<p>公告</p>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell" v-for="i in notices" :key="i.id" @click="goNotice(i.url)">{{i.title}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'Notice',
		props:{
			notices:{
				type:Array,
				default(){
					return[]
				}
			}
		},
		data () {
			return {
				
			}
		},
		methods:{
			goNotice(url){
				this.$emit("goNotice",url)
			}
		}
	}
</script>

<style scoped>
	.notice-wrapper{
		padding: 10px;
	}
</style>
