<template>
	<div class="bottom-item" @click="c">
		<div v-if="isActive"><slot name="img-active"></slot></div>
		<div v-else><slot name="img"></slot></div>
		<div><slot name="title"></slot></div>
	</div>
</template>

<script>
	export default{
		props:{
			link:String
		},
		data(){
			return {
				
			}
		},
		methods:{
			c(){
				if(this.$route.path.indexOf(this.link) !==-1) return
				this.$router.replace(this.link)
				console.log('testc')
			}
		},
		computed:{
			isActive(){
				if(this.$route.path.indexOf(this.link)!==-1){
					return true
				}return false
			},
			
		}
	}
</script>

<style scoped>
	.bottom .bottom-item{
		flex: 1;
		text-align: center;
		padding: 5px;
	}
	.bottom .bottom-item img{
		width: 22px;
		height: 22px;
	}
</style>
