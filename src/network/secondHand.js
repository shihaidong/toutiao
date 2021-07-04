import {request9000} from './index.js'


export function getAllSecondHand() {
	return request9000({
		url:'/getAllSecondHand',
		method: 'get'
	})
}

export function getAllSecondHandByAccount(account) {
	return request9000({
		url:'/getAllSecondHandByAccount',
		method:'post',
		data:{
			account
		}
	})
}
export function addSecondHand(account, title, photo, detail, price, contact) {
	return request9000({
		url:'/addSecondHand',
		method:'post',
		data:{
			account,
			title,
			photo,
			detail,
			price,
			contact
		}
	})
}

export function deleteSecondHandById(id) {
	return request9000({
		url:'/deleteSecondHandById',
		method:'post',
		data:{
			id
		}
	})
}
export function getAllSecondHandById(id) {
	return request9000({
		url:'getAllSecondHandById',
		method:'post',
		data:{
			id
		}
	})
}

