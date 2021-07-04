import {request9000} from './index.js'


export function getAllGroupBying() {
	return request9000({
		url:'/getAllGroupBying',
		method: 'get'
	})
}

export function getAllGroupByingByAccount(account) {
	return request9000({
		url:'/getAllGroupByingByAccount',
		method:'post',
		data:{
			account
		}
	})
}
export function addGroupBying(account, title, photo, detail, stopTime, contact) {
	return request9000({
		url:'/addGroupBying',
		method:'post',
		data:{
			account,
			title,
			photo,
			detail,
			stopTime,
			contact
		}
	})
}

export function deleteGroupByingById(id) {
	return request9000({
		url:'/deleteGroupByingById',
		method:'post',
		data:{
			id
		}
	})
}
export function getAllGroupByingById(id) {
	return request9000({
		url:'getAllGroupByingById',
		method:'post',
		data:{
			id
		}
	})
}

