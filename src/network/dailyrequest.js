import {request9000,request9001} from './index.js'
export function getHomeMultidata(){
	return request9000({
		url:'/getSwipers'
	})
}
export function getHomeRecommandTab(){
	return request9000({
		url:'/recommandtab'
	})
}

export function getNotices(){
	return request9000({
		url:'/getNotices'
	})
}