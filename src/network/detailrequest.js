import {request9000} from './index.js'

//从mongo中获取数据
export function getArticleById(uid){
	return request9000({
		url:'/getArticleById',
		method:'post',
		data:{
			id:uid
		}
	})
}

export function hasCollectedSomeArticle(account,id){
	return request9000({
		url:'/hasCollectedSomeArticle',
		method:'post',
		data:{
			account,
			id
		}
	})
}
export function collecteArticle(account,id){
	return request9000({
		url:'/collecteArticle',
		method:'post',
		data:{
			account,
			id
		}
	})
}

export function unCollecteArticle(account,id){
	return request9000({
		url:'/unCollecteArticle',
		method:'post',
		data:{
			account,
			id
		}
	})
}

export function getCollectedArticlesByAccount(account){
	return request9000({
		url:'/getCollectedArticlesByAccount',
		method:'post',
		data:{
			account
		}
	})
}
