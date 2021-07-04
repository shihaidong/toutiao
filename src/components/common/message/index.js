import Message from './Message.vue'

export default{
	install(vue){
		vue.component(Message.name, Message);
	}
}