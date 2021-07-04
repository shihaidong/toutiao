<template>
	<div class="container">
		<tab-bar class="tab">
			<div slot="left" @click="back"><img src="../../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">反馈</div>
			<div slot="right"></div>
		</tab-bar>
		<div class="zhanwei"></div>
		<div class="mui-inline">问题和意见</div>
		<div class="row mui-input-row">
			<textarea id='question' v-model="message"class="mui-input-clear question" placeholder="请详细描述你的问题和意见..."></textarea>
		</div>
		
		<div class="mui-inline">QQ和邮箱</div>
			<div class="mui-input-row">
				<input id='contact' v-model="contact" type="text" class="mui-input-clear contact" placeholder="(选填,方便我们联系你 )" />
		</div>
		<div class="submit">
			<button type="button" @click="submit(),showMsg= true" class="mui-btn mui-btn-primary">
				提交
			</button>
		</div>
		<message v-if="showMsg" :message="msg"></message>
</div>
</template>

<script>
	import { feedBack } from '../../network/feedbackrequest.js'
	import tabBar from '../../components/common/tabbbar/TabBar.vue'
	export default {
		name: 'FeedBack',
		data () {
			return {
				message:null,
				contact:null,
				showMsg: false,
				msg:'反馈成功'
			}
		},
		methods: {
			back() {
				this.$router.back()
			},
			submit(){
				if(!this.message){
					this.msg = "反馈信息不能为空"
					this.showMsg = true;
					return
				}
				feedBack(this.message, this.contact).then(res => {
					if(res.data){
						this.msg = "反馈成功"
						this.showMsg = true;
						this.$router.back()
					}else {
						this.msg = "反馈失败"
						this.showMsg = true;
					}
				})

			}
		},
		components:{
			tabBar
		}
	}
</script>

<style scoped>
	.container {
		position: relative;
		height: 100vh;
		background-color: white;
		z-index: 10;
	}
	.zhanwei {
		height: 44px;
	}
	.mui-inline{
		margin-top: 14px;
		margin-left: 14px;
		margin-bottom: 14px;
		font-size: 14px;
		color: #8f8f94;
	}
	.question{
		height: 100px;
	}
	.submit{
		position: fixed;
		width: 100%;
		bottom: 20px;
		text-align: center;
	}
</style>
