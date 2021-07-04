<template>
	<div class="container">
		<tab-bar class="tab">
			<div slot="left" @click="back"><img src="../../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">修改密码</div>
			<div slot="right"></div>
		</tab-bar>
		<div class="zhanwei"></div>
		<article>
			输入旧密码
			<el-input placeholder="请输入密码" v-model="oldPassword" show-password></el-input>
			新密码
			<el-input placeholder="请输入密码" v-model="newPassword" show-password></el-input>
			<div class="confirm">
				<el-button type="primary" @click="modify">确认修改</el-button>
			</div>
			
		</article>
		<message v-if="showMsg" :message="msg"></message>
	</div>
</template>

<script>
	import { modifyUserPassword } from '../../network/getUserInformation.js'
	import tabBar from '../../components/common/tabbbar/TabBar.vue'
	export default {
		name: 'ModifyPassword',
		data () {
			return {
				showMsg:false,
				oldPassword:null,
				newPassword:null,
				msg:"修改成功"
			}
		},
		methods: {
			back() {
				this.$router.back();
			},
			modify(){
				if(!(this.oldPassword && this.newPassword)) return;
				modifyUserPassword(this.$store.state.account,this.newPassword,this.oldPassword).then(res => {
					if(res.data){
						this.showMsg= true;
					}else{
						this.msg = "修改失败"
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
	*{
		margin: 0;
	}
	.container {
		position: relative;
		height: 100vh;
		background-color: white;
		z-index: 10;
	}
	.zhanwei{
		height: 44px;
	}
	article{
		padding: 10px 10px;
	}
	.confirm {
		margin-top: 20px;
		text-align: center;
	}
</style>
