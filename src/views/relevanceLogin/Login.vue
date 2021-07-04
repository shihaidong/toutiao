<template>
	<div class="container">
		<tab-bar class="tab">
			<div slot="left" @click="back"><img src="../../assets/images/common/back.svg" class="back"/></div>
			<div slot="center"></div>
			<div slot="right"></div>
		</tab-bar>
		<div class="login">
			<div class="el-icon-cherry" style="width: 20px; height: 20px;"></div>
			<el-form :model="numberValidateForm" ref="numberValidateForm" class="demo-ruleForm">
			  <el-form-item
			    prop="account"
			    :rules="[
			      { required: true, message: '账号不能为空'},
			      { type: 'number', message: '账号必须为数字值'}
			    ]"
			  >
			    <el-input type="string" v-model.number="numberValidateForm.account" prefix-icon="el-icon-user" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item
			    prop="password"
			    :rules="[
			      { required: true, message: '密码不能为空'}
			    ]"
			  >
			    <el-input type="string" v-model.number="numberValidateForm.password" placeholder="password" show-password prefix-icon="el-icon-lock" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="danger" icon="el-icon-right" circle @click="login"></el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {loginRequest} from '../../network/minerequest.js'
	import {getUserInformationByAccount} from '../../network/authorDetailrequest.js'
	
	import tabBar from '../../components/common/tabbbar/TabBar.vue'
	export default{
		name:"Login",
		data(){
			return{
				
				numberValidateForm: {
					  account:'1009039407',
					  password:'123456',
				}
			}
		},
		methods:{
			back(){
				this.$router.back()
			},
			login(){
				loginRequest(this.numberValidateForm.account,this.numberValidateForm.password).then(async res=>{
					if(res.data.msg){
						this.$store.commit('setLoginState',true)
						this.$store.commit('setAccount',this.numberValidateForm.account)
						window.sessionStorage.setItem("6002628bf7745b0533b1edb9",this.numberValidateForm.account)
						window.sessionStorage.setItem("6002a98514df384444485e26",this.numberValidateForm.password)
						await getUserInformationByAccount(this.numberValidateForm.account).then(res=>{
							this.$store.commit("setUserName",res.data[0].username)
							this.$store.commit("setPhoto",res.data[0].photo)
							window.sessionStorage.setItem("6002628bf7745b0533b1abcd",res.data[0].username)
							window.sessionStorage.setItem("6002628bf7745b0533befghi",res.data[0].photo)
						})
						this.$router.back()
					}else{
						this.$message({
							message:'账户或密码错误',
						})
					}
					
				})
			},
		},
		components:{
			tabBar
		}
	}
</script>

<style scoped>
	.container{
		height: 100vh;
		background-color: white;
		position: relative;
		padding: 0.1px;
		z-index: 10;
		overflow: hidden;
	}
	.container .tab{
		position: relative;
		width: 100%;
		background-color: white;
	}
	.container .tab .back{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		margin-left: -10px;
	}
	.container .tab .back img{
		width: 20px;
		height: 20px;
	}
	.container .login{
		box-sizing: border-box;
		padding: 2rem 1rem;
		text-align: center;
	}
	.container .login .zhanwei{
		height: 10px;
	}
</style>
