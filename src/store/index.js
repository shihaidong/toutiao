import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		//是否登录
		isLogin:false,
		//登录账户
		account:'',
		username:'',
		photo:''
	},
	mutations:{
		setLoginState(state,newState){
			state.isLogin=newState
		},
		setAccount(state,account){
			state.account=account
		},
		setUserName(state,userName){
			state.username = userName
		},
		setPhoto(state, photo){
			state.photo = photo
		}
	},
	getters:{
		getLoginState(state){
			return state.isLogin
		},
		getAccount(state){
			return state.account;
		},
		getUserName(state){
			return state.username
		},
		getPhoto(state){
			return state.photo
		}
	}
})