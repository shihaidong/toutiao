import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/mui/css/mui.css'
import './assets/mui/js/mui.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/iconfont.css'
import VueLazyLoad from 'vue-lazyload'
import Message from './components/common/message/index.js'
Vue.use(ElementUI)
Vue.use(VueLazyLoad,{
	loading:require('./assets/images/common/loading.jpg'),
	error:require('./assets/images/common/loading.jpg')
})
Vue.use(Message)



Vue.config.productionTip = false
Vue.prototype.server = "http://localhost:9000/"
Vue.prototype.fastDFS = "http://81.70.174.63/group1/"

Vue.prototype.normalizeDateTime = function(dateTime){
	let [year, month, day, hours, minutes] = [dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes()];
	let temp = new Date().getTime() - dateTime.getTime();
	if(temp < 60000) {
		return "1分钟前"
	}
	if(temp < 3600000){
		
		return `${new Date().getMinutes() - minutes} 分钟前`;
	}
	if(temp < 86400000){
		return  `${new Date().getHours() - hours} 小时前`;
	}
	return `${month}/${day} ${hours}:${minutes}`
}
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
// import axios from 'axios'
// axios({
// 	url:'http://localhost:9000/login',
// 	method:'post',
// 	data:{
// 		username:'admin',
// 		password:'123456'
// 	}
// }).then(res=>{
// 	console.log(res)
// })

