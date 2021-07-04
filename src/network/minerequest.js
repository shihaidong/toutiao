import {request9000} from './index.js'

export function loginRequest(account,password){
	return request9000({
		method:'post',
		url:'/login',
		data:{
			account,
			password
		}
	})
}

export function registRequest(username,account,password){
	return request9000({
		method:'post',
		url:'/regist',
		data:{
			username,
			account,
			password
		}
	})
}