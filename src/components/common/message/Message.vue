<template>
	<div class="msg-box">
		<div class="them">
			{{message}}
		</div>
	</div>
</template>

<script>
	export default{
		name:'Message',
		props:{
			message:{
				type: String,
				default:'这是一条消息'
			},
			type:{
				type: String,
				default: 'info'
			},
			isShow:{
				type:Boolean,
				default: false
			},
			duration:{
				type:Number,
				default: 3000
			}
		},
		data () {
			return {
				timer:null
			}
		},
		methods:{
			startTimer() {
				this.timer = setTimeout(() => {
					// this.isShow = false;
					this.close()
				},this.duration)
			},
			close() {
				// this.$destroy(true);
				this.$el.parentNode.removeChild(this.$el);
			},
			
		},
		mounted(){
			this.startTimer();
		},
		destroyed(){
			console.log("destory")
		}
	}
</script>

<style scoped>
	.msg-box{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		left: 0;
		margin: 0;
		overflow: auto;
		width: 100vw;
		height: 100vh;
	}
	
	.them{
		display: flex;
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		width: 40%;
		height: 50px;
		border-radius: 2px;
		margin: 0 auto 50px;
		margin-top: 15vh;
		justify-content: center;
		color: white;
		align-items: center;
		background: rgba(0,0,0,0.4);
		text-align: center;
		padding: 5px;
		
	}
</style>
