<template>
	<div class="tab-control">
		<div class="tab-control-item" 
		v-for="(item,index) in titles" 
		:class="{active:index===currentIndex}"
		@click="itemclick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:"TabControl",
		props:{
			titles:{
				type:Array,
				default(){
					return[]
				}
			}
		},
		data(){
			return{
				currentIndex:0
			}
		},
		methods:{
			itemclick(index){
				this.currentIndex=index
				this.$emit('index',index)
			},
			
		}
	}
</script>

<style scoped>
	.tab-control{
		display: flex;
		text-align: center;
		background-color: white;
	}
	.tab-control-item{
		flex: 1;
		height: 40px;
		line-height: 40px;
	}
	.active{
		color: pink;
		border-bottom: 2px solid pink;
	}
</style>
