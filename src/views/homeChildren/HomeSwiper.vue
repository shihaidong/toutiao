<template>
	<swiper>
		<swiper-item v-for="i in banner">
			<img @click="dailyUrl(i.url)" :src="i.imageurl" @load="imgload"/>
		</swiper-item>
	</swiper>
</template>

<script>
	import {Swiper, SwiperItem} from '../../components/common/swiper/index.js'
	export default{
		name:'HomeSwiper',
		data(){
			return {
			}
		},
		props:{
			banner:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{
			Swiper,
			SwiperItem
		},
		methods:{
			imgload(){
				this.$emit('homeswiper')
			},
			dailyUrl(url){
				this.$router.push({path:'/dailyUrl',query:{url:url}})
			}
		}
	}
</script>

<style>
	
</style>
