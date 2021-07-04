import {request9000} from './index.js'

export function getArticlesByAccount(account){
	return request9000({
		url:'/getArticlesByAccount',
		method:'post',
		data:{
			account:account
		}
	})
}
export function getJustVideosByAccount(account){
	return request9000({
		url:'/getJustVideosByAccount',
		method:'post',
		data:{
			account
		}
	})
}

export function getJustArticlesByAccount(account){
	return request9000({
		url:'/getJustArticlesByAccount',
		method:'post',
		data:{
			account
		}
	})
}
export function getUserInformationByAccount(account){
	return request9000({
		url:'/getUserInformationByAccount',
		method:'post',
		data:{
			account:account
		}
	})
}

export function findAllCollectedArticlesByAccount(account){
	return request9000({
		url:'/getCollectedArticlesByAccount',
		method:'post',
		data:{
			account:account
		}
	})
}
export function getCommonsByArticleId(articleId){
	return request9000({
		url:'/common/getCommonsByArticleId',
		method:'post',
		data:{
			articleId
		}
	})
}
export function getCommonNumbersByArticleId(articleId){
	return request9000({
		url:'/common/getCommonNumbersByArticleId',
		method: 'post',
		data:{
			articleId
		}
	})
}

export function insertCommon(articleId,account,common){
	return request9000({
		url:'/common/insertCommon',
		method:'post',
		data:{
			articleId,
			account,
			common
		}
	})
}
export function deleteCommon(articleId,account,common,dateTime){
	return request9000({
		url:'/common/deleteCommon',
		method:'post',
		data:{
			articleId,
			account,
			common,
			dateTime
		}
	})
}



