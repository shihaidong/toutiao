import {request9000} from './index.js'
//从mysql中获取数据
export function homeItemRequest(){
	return request9000({
		url:'/getArticlesByRand',
		method:'get'
	})
}
//获取某个用户的文章
export function getArticleByAccount(account){
	return request9000({
		url:'/getArticleByAccount',
		method:'post',
		data:{
			account:account
		}
	})
}