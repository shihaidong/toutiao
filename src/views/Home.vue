<template>
	<div>
		<tab-bar class="home-tab">
			<div slot="left"></div>
			<div slot="center">忻州师范学院</div>
			<div slot="right"></div>
		</tab-bar>
		<div class="zhanwei"></div>
		<scroll @pullup="updata()" @pulldown="updataPullDown()">
			 	<home-item :items="items" class="home-item"></home-item>
		</scroll>
	</div>
</template>

<script>

  import tabBar from '../components/common/tabbbar/TabBar.vue'
  import HomeItem from '../components/common/homeItem/HomeItem.vue'
  import Scroll from '../components/common/scroll/Scroll.vue'
  import {homeItemRequest} from '../network/homerequest.js'
  import {getArticle} from '../network/detailrequest.js'
  import { getCommonNumbersByArticleId } from '../network/authorDetailrequest.js'

  export default {
    data() {
      return {
		//文章基本数据
        // items:{
        // 	type:Array,
        // 	default(){
        // 		return []
        // 	}
        // },
		items:[]
      }
    },
	components:{
		tabBar,
		HomeItem,
		Scroll
	},
	created(){
		homeItemRequest().then(res=>{
			if(this.items.length==0){
				
				this.items=res.data
				console.log(this.items)
				this.handle(this.items)
			}else{
				
				this.items.push(...res.data)
				this.handle(this.items)
			}
		})
	},
    methods: {
		//上拉刷新
		updata(){
			homeItemRequest().then(res=>{
				if(this.items.length!==0){
					let temp = res.data;
					this.handle(temp)
					this.items.push(...temp)
					
				}else{
					let temp = res.data;
					this.handle(temp);
					this.items=temp;
				}
			})
		},
		//下拉属性
		updataPullDown(){
			homeItemRequest().then(res=>{
				if(this.items.length!==0){
					let temp = res.data;
					this.handle(temp);
					this.items.unshift(...temp)
				}else{
					let temp = res.data;
					this.handle(temp);
					this.items=temp;
				}
			})
		},
		handle(arr){
			
			arr.forEach(item => {
				item.sdate = this.normalizeDateTime(new Date(item.sdate));
				(function(i){
					getCommonNumbersByArticleId(i.url).then(res => {
						i.critic = res.data
					})
				})(item)
			})
		}
    },
	
  }
</script>

<style scoped>
	.pullup
	{
		height: 100vh;
	}
  .pullup-wrapper{
	 
	height: 100%;
    padding: 0 10px;
    border: 1px solid #ccc;
    overflow: hidden;
  }

  .pullup-list{
	   padding: 0;
  }
   
  .pullup-list-item{
	padding: 10px 0;
    list-style: none;
    border-bottom: 1px solid #ccc;
  }

  .pullup-tips{
	  padding: 20px;
		text-align: center;
		color: #999;
  }
  .home-tab{
	  background-color: pink;
	  color: white;
	  z-index: 10;
	  position: fixed;
	  width: 100%;
  }
  .pulldown-wrapper{
    position: absolute;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    transform :translateY(-100%) translateZ(0);
    text-align: center;
    color: #999
	}
	.zhanwei{
		width: 100%;
		height: 44px;
	}

</style>
