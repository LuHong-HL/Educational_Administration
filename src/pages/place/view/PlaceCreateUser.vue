<template>
	<div class="content">
		<div class="inputClass">
			<div class="titleClass" style="width: 600px;">
				<span>请填入{{this.record.name}}的负责人信息</span>
			</div>

			<a-form :form="form" @submit="handleSubmit">

				<a-form-item label="学生/教职工" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-radio-group name="radioGroup" v-decorator="['student',{rules: [{ required: true, message: '请选择学生/教职工'}]}]">
						<a-radio :value="true">学生</a-radio>
						<a-radio :value="false">教职工</a-radio>
					</a-radio-group>
				</a-form-item>

				<a-form-item label="编号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['no',{rules: [{ required: true, message: '请填入相应的身份编号'}]}]" />
				</a-form-item>

				<a-form-item label="请选择开始时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<!-- <a-input v-decorator="['ename',{rules: [{ required: true, message: '请输入功能区名'}]}]" /> -->
					<a-date-picker @change="onChangeBeginTime" v-decorator="['beginTime',{rules: [{ required: true, message: '请选择开始时间'}]}]" />
				</a-form-item>

				<a-form-item label="请选择结束时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<!-- <a-input v-decorator="['ename',{rules: [{ required: true, message: '请输入功能区名'}]}]" /> -->
					<a-date-picker @change="onChangeEndTime" v-decorator="['endTime',{rules: [{ required: true, message: '请选择结束时间'}]}]" />
				</a-form-item>


				<div class="bottomClass" style="width: 300px;">
					<a-button type="primary" style="size:100px;" html-type="submit" class="bottomClassButton">
						确认
					</a-button>
					<a-button type="primary" @click="returnToPlaceField()">
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
				record: this.$route.query.record,
				areaName: this.$route.query.areaName,
				schoolName: this.$route.query.schoolName,
				universityName: this.$route.query.universityName,
				listDepartmentData: null,
				beginTime: null,
				endTime: null,
			};
		},
		methods: {
			onChangeBeginTime(date, dateString) { /* 添加开始日期返回输出方法 */
				console.log("date, dateString:", date, dateString);
				this.beginTime = dateString;
				console.log("beginTime:", this.beginTime)

			},
			onChangeEndTime(date, dateString) { /* 添加开始日期返回输出方法 */
				console.log("date, dateString:", date, dateString);
				this.endTime = dateString;
				console.log("endTime:", this.endTime)
			},

			handleSubmit(e) { /* 任命负责人方法 */
				console.log("*****");
				console.log("e:", e)
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if (!err) {
						console.log("values1:", values)
						values["beginTime"] = this.beginTime;
						values["endTime"] = this.endTime;
						// values["universityId"] = this.record.universityId;
						values["fieldId"] = this.record.id;
						console.log('Received values of form: ', values);
						let url = `${this.placeGlobal.baseUrl}/json/place/fieldincharge/ByNo`
						this.axios({
							method: 'post',
							url,
							data: values,
						}).then(
							(placeData) => {
								console.log("PlaceAreaData:", placeData);
								if (placeData.data.code == '0') {
									alert("任命负责人成功！！");
								}else{
									alert("任命负责人失败！！")
								}
							}).catch(function(error) {
							console.log(error);
							alert("任命负责人出现错误！！");
						});
					}
				});
			},
			returnToPlaceField() {
				console.log("跳转到PlaceField页面");
				this.$router.push({
					path: 'PlaceField',
					query: {
						universityId: this.record.universityId,
						schoolId: this.record.schoolId,
						areaId: this.record.areaId,
						areaName: this.areaName,
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
