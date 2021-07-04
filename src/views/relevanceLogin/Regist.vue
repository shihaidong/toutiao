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
				  prop="username"
				  :rules="[
				    { required: true, message: '用户名不能为空'},
					{ max: 8, message: '长度最多8个字符', trigger: 'change'}
				  ]"
				>
				  <el-input type="string" v-model.number="numberValidateForm.username" prefix-icon="el-icon-s-check" autocomplete="off"></el-input>
				</el-form-item>
			  <el-form-item
			    prop="account"
			    :rules="[
			      { required: true, message: '账号不能为空'},
			      { type: 'number', message: '账号必须为数字值'},
				  { min: 10, max: 11, message: '长度为为10到11个字符', trigger: 'change'}
				  
			    ]"
			  >
			    <el-input type="string" v-model.number="numberValidateForm.account" prefix-icon="el-icon-user" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item
			    prop="password"
			    :rules="[
			      { required: true, message: '密码不能为空'},
				  { min: 8, max: 16, message: '长度为为8到16个字符', trigger: 'change'}
			    ]"
			  >
			    <el-input type="string" v-model.number="numberValidateForm.password" placeholder="password" show-password prefix-icon="el-icon-lock" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="danger" icon="el-icon-right" circle @click="regist"></el-button>
			  </el-form-item>
			</el-form>
			
		</div>
	</div>
</template>

<script>
	import {registRequest} from '../../network/minerequest.js'
	// import {subscribeSomeOne,unfollowSomeOne} from '../../network/getUserInformation.js'
	
	import tabBar from '../../components/common/tabbbar/TabBar.vue'
	export default{
		name:"Login",
		data(){
			return{
				numberValidateForm: {
					username:'未命名',
					account:'1009039407',
					password:'123456',
				},
				
				account:'918605647',
				password:'123456',
			}
		},
		methods:{
			back(){
				this.$router.back()
			},
			regist(){
				registRequest(this.numberValidateForm.username,this.numberValidateForm.account,this.numberValidateForm.password).then(res=>{
					console.log(res)
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
