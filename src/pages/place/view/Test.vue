<!-- <template>
	<div class="content">
		<span>测试模块</span>
	</div>
</template>

<script>
</script>

<style>
</style> -->

<template>
	<div class="content">
		<a-upload name="ExcelFile" :multiple="true" :showUploadList="false" :action="`${this.placeGlobal.baseUrl}/json/place/school/testExcel`"
		 accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="uploadSchool">
			<a-button type="primary">
				<a-icon type="upload" /> 导出校区信息
			</a-button>
		</a-upload>


	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			uploadSchool(info) {
				console.log("info:", info);
				if (info.file.status !== 'uploading') {
					console.log("info.file.response.code:info.file.response.msg:",info.file.response.code,info.file.response.msg);
				}
				if (info.file.status === 'done') {
					if(info.file.response.code===0){
						alert("导入校区信息成功")
					}else{
						alert("导入校区信息失败")
					}
					//this.$message.success(`${info.file.name} file uploaded successfully`);
				} else if (info.file.status === 'error') {
					alert("导入校区信息错误")
					// this.$message.error(`${info.file.name} file upload failed.`);
				}
				
				this.fetchPlaceSchoolInfo({ /* 获取校区信息方法 */
					universityId: this.universityId,
					/* 获取universityId的值 */
					pageNum: this.pageNum,
					/* 获取pageNum的值 */
					example: this.searchString,
					/* 获取模糊搜素的信息 */
				});
			},
			
		},
	}
</script>
