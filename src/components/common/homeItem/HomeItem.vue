<template>
	<div class="box">
		<div class="container" v-for="item in items">
			<div v-if="item.st==1" class="container0">
				<a @click="jump(item.url,item.account)">
					<div class="tr">
						<div class="title">
							{{item.title}}
						</div>
						<div class="img">
							<img v-lazy=" item.imageurl1">
						</div>
					</div>
					<div class="detail">
						<div>时间:{{item.sdate}}&nbsp;&nbsp;评论{{item.critic}}</div>
						<hr/>
					</div>
					
				</a>
			</div>
			<div v-else-if="item.st==2" class="container1">
				<a @click="jump(item.url,item.account)">
					<div class="tr">
						<div class="title">
							{{item.title}}
						</div>
						<div class="img">
							<img v-lazy="item.imageurl1"/>
							<img v-lazy="item.imageurl2"/>
							<img v-lazy="item.imageurl3"/>
						</div>
						<div class="detail">
							<div>时间:{{item.sdate}}&nbsp;&nbsp;评论{{item.critic}}</div>
						</div>
						<hr/>
					</div>
					
				</a>
			</div>
			<div v-else class="container2">
				<a @click="jumpvideo(item.url,item.account,item.imageurl2)">
					<div class="nav">
						<div class="title">
							{{item.title}}
						</div>
						<div class="img">
							<img class="tag" src="../../../assets/images/common/play.svg"/>
							<img v-lazy="item.imageurl1"/>
						</div>
						<div class="detail">
							<div>时间:{{item.sdate}}&nbsp;&nbsp;评论{{item.critic}}</div>
						</div>
						<hr/>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>

<script>

	export default{
		name:"HomeItem",
		data(){
			return{
				
			}
		},
		props:{
			//数据
			items:{
				type:Array,
				default(){
					return []
				}
			},
		},
		methods:{
			jump(url,account){
				this.$router.push({path:'/detail',query:{id:url,account:account}})
			},
			jumpvideo(url,account,imageurl2){
				this.$router.push({path:'/videoDetail',query:{id:url,account:account,imageurl2:imageurl2}})
			}
		}
	}
</script>

<style scoped>
	.box{
		overflow: hidden;
		position: relative;
		font-size: 15px;
	}
	.container0{
		width: 100%;
		padding: 5px 0;
		background-color: white;
	}
	.container0 a{
		text-decoration: none;
	}
	.container0 a .tr{
		display: flex;
		justify-content: space-around;
		color: black;
	}
	hr{
		color: gray;
		height: 0.2px;
	}
	.container0 a .detail{
		font-size: 10px;
		color: gray;
		padding: 0 5px;
	}
	.container0 a .tr .title{
		width: 60%;
		white-space: normal;
	}
	.container0 a .tr .img{
	
		width: 3.2rem;
		height: 1.8rem;
		position: relative;
	}
	.container0 a .tr .img img{
		width: inherit;
		height: inherit;
		margin: 0 auto;
		line-height: inherit;
		border-radius: 4px;
	}
	.container1{
		width: 100%;
		padding: 5px 0;
		background-color: white;
	}
	.container1 a{
		text-decoration: none;
	}
	.container1 a{
		color: black;
	}
	.container1 a .tr{
		padding: 0 5px;
	}
	.container1 a .tr .img{
		display: flex;
		justify-content: space-around;
		padding: 5px 0;
	}
	.container1 a .tr .img img{
		border-radius: 4px;
		width: 3rem;
		height: 2.3rem;
	}
	.container1 a .tr .detail{
		font-size: 10px;
		color: gray;
		padding: 0 5px;
	}
	.container2{
		width: 100%;
		padding: 5px 0;
		background-color: white
	}
	.container2 a{
		padding: 5px 0;
		text-decoration: none;
	}
	.container2 a .nav{
		padding: 0 5px;
	}
	.container2 a .title{
		color: black;
	}
	.container2 a .nav .img{
		position: relative;
		width: 100%;
		height: 4.3rem;
	}
	.container2 a .nav .img img{
		width: 100%;
		height: inherit;
		border-radius: 2px;
	}
	.container2 a .nav .img .tag{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		width: 35%;
		height: 35%;
		opacity: 0.5;
	}
	.container2 a .nav .detail{
		font-size: 10px;
		color: gray;
	}
	
</style>
