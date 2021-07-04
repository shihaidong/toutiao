<template>
	<div class="rec">
		<div class="rec-item" v-for="i in recommands" @click="enter(i.url)">
			<img :src="i.imageurl" @load="recomload"/>
			<div>{{i.title}}</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'RecommendView',
		props:{
			recommands:{
				type:Array,
				default(){
					return[]
				}
			}
		},
		methods:{
			recomload(){
				
			},
			enter(url){
				this.$router.push({path:url,query:{account:this.$store.state.account}})
			}
		}
	}
</script>

<style scoped>
	.rec{
		display: flex;
		justify-content: space-between;
	}
	.rec .rec-item{
		width: 1.53rem;
		height: 1.53rem;
		box-sizing: border-box;
		margin: 5px;
		flex: 1;
		text-align: center;
		color: #666666;
	}
	.rec .rec-item img{
		width:1rem;
		height: 1rem;
	}
</style>
