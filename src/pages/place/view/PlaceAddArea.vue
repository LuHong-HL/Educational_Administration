<template>
	<div class="content">
		<div class="inputClass">
			<div class="titleClass" style="width: 600px;">
				<span>请填入{{this.schoolName}}的功能区信息</span>
			</div>

			<a-form :form="form" @submit="handleSubmit">

				<a-form-item label="功能区名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['name',{rules: [{ required: true, message: '请输入功能区名'}]}]" />
				</a-form-item>

				<div class="bottomClass" style="width: 300px;">
					<a-button type="primary" style="size:100px;" html-type="submit" class="bottomClassButton">
						提交
					</a-button>
					<a-button type="primary" @click="returnToPlaceArea()">
						返回
					</a-button>
				</div>
			</a-form>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: this.$form.createForm(this),
				universityId: this.$route.query.universityId,
				schoolId: this.$route.query.schoolId,
				schoolName: this.$route.query.schoolName,
				universityName: this.$route.query.universityName,
			};
		},
		methods: {
			handleSubmit(e) { /* 功能区信息新增方法 */
				console.log("*******");
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if (!err) {
						values["universityId"] = this.universityId;
						values["schoolId"] = this.schoolId;
						console.log('Received values of form: ', values);
						let url = `${this.placeGlobal.baseUrl}/json/place/schoolarea/create`
						this.axios({
							method: 'post',
							url,
							data: values,
						}).then(
							(placeData) => {
								console.log("PlaceAreaData:", placeData);
								alert("功能区信息新增成功！！");
							}).catch(function(error) {
							console.log(error);
							alert("功能区信息新增失败！！");
						});
					}
				});
			},
			returnToPlaceArea() {
				console.log("跳转到PlaceArea页面 universityId:schoolId:universityName:schoolName:", this.universityId, this.schoolId,
					this.universityName, this.schoolName, );
				this.$router.push({
					path: 'PlaceArea',
					query: {
						universityId: this.universityId,
						schoolId: this.schoolId,
						universityName: this.universityName,
						schoolName: this.schoolName,
					}
				})


			},



		},
	};
</script>

<style>
	.bottomClass {
		margin: 40px auto;
	}

	.inputClass {
		margin: 20px;
	}

	.titleClass {
		font-size: 35px;
		margin: 30px auto;
	}

	.bottomClassButton {
		margin-right: 40px;
	}
</style>
