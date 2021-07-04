<template>
	<div>
		<tab-bar class="home-tab">
			<div slot="left"></div>
			<div slot="center">忻州师范学院</div>
			<div slot="right"></div>
		</tab-bar>
		<div class="zhanwei"></div>
		<div class="pullup">
		  <div ref="scroll" class="pullup-wrapper">
		    <div class="pullup-content">
		      <!-- <ul class="pullup-list">
		        <li v-for="i of data" :key="i" class="pullup-list-item">
		          {{ i % 5 === 0 ? 'scroll up 👆🏻' : `I am item ${i} `}}
		        </li>
		      </ul> -->
			  <div class="pulldown-wrapper">
				<div v-show="beforePullDown">
				  <span>Pull Down and refresh</span>
				</div>
				<div v-show="!beforePullDown">
				  <div v-show="isPullingDown">
					<span>Loading...</span>
				  </div>
				  <div v-show="!isPullingDown">
					<span>Refresh success</span>
				  </div>
				</div>
			  </div>
			  <div>
			  	<home-item :items="items" class="home-item"></home-item>
			  </div>
		      <div class="pullup-tips">
		        <div v-if="!isPullUpLoad" class="before-trigger">
		          <span class="pullup-txt">Pull up and load more</span>
		        </div>
		        <div v-else class="after-trigger">
		          <span class="pullup-txt">Loading...</span>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
	</div>
	  
</template>

<script>
  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'
  import PullDown from '@better-scroll/pull-down'
  
  import tabBar from '../components/common/tabbbar/TabBar.vue'
  import HomeItem from '../components/common/homeItem/HomeItem.vue'
  
  import {homeItemRequest} from '../network/homerequest.js'
  import {getArticle} from '../network/detailrequest.js'
  
  BScroll.use(Pullup)
  BScroll.use(PullDown)

  export default {
    data() {
      return {
		saveY:0,
        isPullUpLoad: false,
		//文章基本数据
        items:{
        	type:Array,
        	default(){
        		return []
        	}
        },
		//add
		beforePullDown: true,
		isPullingDown: false,
      }
    },
	components:{
		tabBar,
		HomeItem,
	},
    mounted() {
      this.initBscroll()
	},
	created(){
		homeItemRequest().then(res=>{
			if(this.items.default().length==0){
				this.items=res.data
			}else{
				this.items.push(...res.data)
			}
		})
	},
    methods: {
		//上拉刷新
		updata(){
			homeItemRequest().then(res=>{
				if(this.items.length!==0){
					this.items.push(...res.data)
				}else{
					this.items=res.data
				}
				
			})
		},
		//下拉属性
		updataPullDown(){
			homeItemRequest().then(res=>{
				if(this.items.length!==0){
					this.items.unshift(...res.data)
				}else{
					this.items=res.data
				}
			})
		},
      initBscroll() {
        this.bscroll = new BScroll(this.$refs.scroll, {
          pullUpLoad: true,
		  //add
		  scrollY: true,
		  bounceTime: 800,
		  useTransition: false,
		  pullDownRefresh: {
		    threshold: 70,
		    stop: 56
		  },
		  click:true,
		  proptype:3
        })

        this.bscroll.on('pullingUp', this.pullingUpHandler)
		//add
		this.bscroll.on('pullingDown',this.pullingDownHandler)
      },
      async pullingUpHandler() {
        this.isPullUpLoad = true
        await this.updata()
        this.bscroll.finishPullUp()
        this.bscroll.refresh()
        this.isPullUpLoad = false
      },
	  //add
	  async pullingDownHandler() {
		console.log('trigger pullDown')
		this.beforePullDown = false
		this.isPullingDown = true
		// await this.requestData()
		await this.updataPullDown()
		this.isPullingDown = false
		this.finishPullDown()
	  },
	  async finishPullDown() {
		this.bscroll.finishPullDown()
		setTimeout(() => {
		  this.beforePullDown = true
		  this.bscroll.refresh()
		}, 800 + 100)
	  },
    },
  }
</script>

<style scoped>
	.pullup
	{
		height: 500px;
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
