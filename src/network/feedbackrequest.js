import { request9000 } from './index.js'

export function feedBack(message, contact) {
	return request9000({
		url:'/feedBack',
		method:'post',
		data: {
			message,
			contact
		}
	})
}