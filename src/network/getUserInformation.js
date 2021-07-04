import {request9000} from './index.js'

export function getSubScribersByAccount(account){
	return request9000({
		url:'/getSubScribersByAccount',
		method:'post',
		data:{
			account:account
		}
	})
}

export function getFansByAccount(account){
	return request9000({
		url:'/getFansByAccount',
		method:'post',
		data:{
			account
		}
	})
}

export function hasSubScribeSomeOne(mineAccount,queryAccount){
	return request9000({
		url:'/hasSubScribeSomeOne',
		method:'post',
		data:{
			mineAccount:mineAccount,
			queryAccount:queryAccount
		}
	})
}

export function subscribeSomeOne(mineAccount,queryAccount){
	return request9000({
		url:'/subscribeSomeOne',
		method:'post',
		data:{
			mineAccount,
			queryAccount
		}
	})
}

export function unfollowSomeOne(mineAccount,queryAccount){
	return request9000({
		url:'/unfollowSomeOne',
		method:'post',
		data:{
			mineAccount,
			queryAccount
		}
	})
}


export function modifyUserName(account, username) {
	return request9000({
		url:'/modifyUserName',
		method: 'post',
		data: {
			account,
			username
		}
	})
}

export function modifyUserPhoto(account, photo) {
	return request9000({
		url:'/modifyUserPhoto',
		method: 'post',
		data: {
			account,
			photo
		}
	})
}
//为了传递参数，username代表新密码
export function modifyUserPassword(account, password, username) {
	return request9000({
		url:'/modifyUserPassword',
		method: 'post',
		data: {
			account,
			password,
			username
		}
	})
}