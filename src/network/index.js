import axios from 'axios'


//获取mysql中的数据
export function request9000(config){
	const instance=axios.create({
		baseURL:'http://localhost:9000',
		timeout:5000
	})
	return instance(config)
}
//获取mongodb中的数据
export function request9001(config){
	const instance=axios.create({
		baseURL:'http://192.168.0.100:9001',
		timeout:5000
	})
	return instance(config)
}
