<template>
	<div>
		<div class="pullup">
		  <div ref="scroll" class="pullup-wrapper">
		    <div class="pullup-content">
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
			  	<!-- <home-item :items="items" class="home-item"></home-item> -->
				<slot></slot>
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
  BScroll.use(Pullup)
  BScroll.use(PullDown)

  export default {
    data() {
      return {
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
    mounted() {
      this.initBscroll()
	},
    methods: {
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
		//need modified
        // await this.updata()
		await this.$emit('pullup')
        this.bscroll.finishPullUp()
        this.bscroll.refresh()
        this.isPullUpLoad = false
      },
	  //add
	  async pullingDownHandler() {
		console.log('trigger pullDown')
		this.beforePullDown = false
		this.isPullingDown = true
		//need modified
		// await this.updataPullDown()
		await this.$emit('pulldown')
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
		height: 100vh;
	}
  .pullup-wrapper{
	 
	height: 100%;
    padding: 0 5px;
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
  .pulldown-wrapper{
    position: absolute;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    transform :translateY(-100%) translateZ(0);
    text-align: center;
    color: #999
	}

</style>
