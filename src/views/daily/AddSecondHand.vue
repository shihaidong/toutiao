<template>
	<div class="container">
		<tab-bar class="home-tab">
			<div slot="left" @click="back()"><img src="../../assets/images/common/back.svg" class="back"/></div>
			<div slot="center">新建闲置</div>
			<div slot="right"></div>
		</tab-bar>
		<div class="zhanwei"></div>
			<form class="mui-input-group">
				<div class="mui-input-row">
					<label>标题</label>
					<input v-model="title" type="text" placeholder="title">
				</div>
				
					<el-upload
					ref="upload1"
					list-type="picture"
					:auto-upload="false"
					:on-change="onChange"
					  class="avatar-uploader"
					  action="http://localhost:9000/uploadImage"
					  :show-file-list="false"
					  :before-upload="beforeAvatarUpload"
					  :on-success="handleAvatarSuccess">
					  <img v-if="image" :src="image" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				
				<div class="mui-input-row">
					<label>联系方式</label>
					<input v-model="contact"type="text" class="mui-input-clear" placeholder="">
				</div>
				<div class="mui-input-row">
					<label>价格</label>
					<input v-model="price" type="text" class="mui-input-clear" placeholder="100">
				</div>
			</form>
			<div class="mui-input-row" style="margin: 10px 5px;">
				
				<textarea v-model="detail" id="textarea" rows="5" placeholder="多行文本框"></textarea>
			</div>
			<div style="text-align: center;">
				<el-button type="primary" @click="submit()">添加</el-button>
			</div>
			  
			<message v-if="isShow" :message="msg"></message>
	</div>
</template>

<script>
	import tabBar from '../../components/common/tabbbar/TabBar.vue'
	import { addSecondHand } from '../../network/secondHand.js'
	export default {
		name:'AddGroupBying',
		data() {
			return {
				image:null,
				title:null,
				price:null,
				contact:null,
				detail:null,
				isShow:false,
				msg:"添加成功"
			}
		},
		methods:{
			back(){
				this.$router.back();
			},
			onChange(file,fileList) {
				this.image = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
				  this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
				  this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			handleAvatarSuccess(response,file){
				this.image="http://81.70.174.63/group1/"+response
				addSecondHand(this.$route.query.account,this.title,this.image,this.detail,this.price,this.contact).then(res => {
					console.log(res)
					this.$router.back()
				})
			},
			submit(){
				if(!(this.title && this.contact)){
					this.msg = "标题，联系方式不能为空"
					this.isShow = true;
					return;
				}
				this.$refs.upload1.submit()
			}
		},
		components:{
			tabBar
		}
	}
</script>

<style scoped>
	.container{
		position: relative;
		height: 100vh;
		background-color: white;
		z-index: 10;
	}
	.zhanwei{
		height: 44px;
	}
	.upload-success .operator{
		display: flex;
		justify-content: space-between;
	}
	.avatar-uploader{
			  display: inline-block;
			  margin-left: 15px;
	}
	.avatar-uploader .avatar-uploader-icon {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .avatar-uploader-icon:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 100px;
	    height: 100px;
	    line-height: 100px;
	    text-align: center;
	  }
	  .avatar {
	    width: 100px;
	    height: 100px;
	    display: block;
	  }
</style>