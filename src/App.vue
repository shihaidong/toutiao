<template>
  <div id="app">
	<keep-alive exclude="Detail,AuthorDetail,MineSubScriber,MineFans,Track,Setting,AddGroupBying,
	,VideoDetail,DailyUrl,GroupBying,GroupByingDetail,MyGroupByingDetail,SecondHand,SecondHandDetail,AddSecondHand,MySecondHand,FeedBack,WebView">
		<router-view></router-view>
	</keep-alive>
	<main-bottom></main-bottom>
  </div>
</template>

<script>
import {loginRequest} from './network/minerequest.js'
import mainBottom from './components/content/MainBottom.vue'
export default {
	
  name: 'App',
  components: {
	mainBottom
  },
  data(){
	  return{
		  flag:false
	  }
  },
  methods:{
	  
  },
   created(){
	   let account=window.sessionStorage.getItem("6002628bf7745b0533b1edb9")
	   let password=window.sessionStorage.getItem("6002a98514df384444485e26")
	   loginRequest(account,password).then(res=>{
		    	if(res.data.msg){
					this.$store.commit("setAccount",account)
					this.$store.commit("setLoginState",true)
					this.$store.commit("setUserName",window.sessionStorage.getItem("6002628bf7745b0533b1abcd"))
					this.$store.commit("setPhoto",window.sessionStorage.getItem("6002628bf7745b0533befghi"))
		    	}
	   })
   }
}
</script>

<style>
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
