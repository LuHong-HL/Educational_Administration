<template>
	<div class="content">
		<div class="inputClass">
			<div class="titleClass" style="width: 600px;">
				<span>请填入{{this.record.name}}的主管部门信息</span>
			</div>

			<a-form :form="form" @submit="handleSubmit">

				<a-form-item label="主管部门" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-select showSearch placeholder="请选择筛选的校区" optionFilterProp="children" style="width: 100%" size="large"
					 v-decorator="['departmentId',{rules: [{ required: true, message: '请输入功能区名'}]}]">
						<a-select-option v-for="department in listDepartmentData" :key="department.id">{{department.name}}</a-select-option>
					</a-select>
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
		created: function() { /* 页面加载前获取后端数据库的数据 */
			this.fetchPlaceDepartmentInfo(); /* 获取场地列表信息 */
		},
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

			handleSubmit(e) { /* 主管部门添加方法 */
				console.log("*****");
				console.log("e:", e)
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if (!err) {
						console.log("values1:", values)
						values["beginTime"] = this.beginTime;
						values["endTime"] = this.endTime;
						values["universityId"] = this.record.universityId;
						values["fieldId"] = this.record.id;
						console.log('Received values of form: ', values);
						let url = `${this.placeGlobal.baseUrl}/json/place/fielddepartment/create`
						this.axios({
							method: 'post',
							url,
							data: values,
						}).then(
							(placeData) => {
								console.log("PlaceAreaData:", placeData);
								if (placeData.data.code == '0') {
									alert("主管部门添加成功！！");
								}else{
									alert("主管部门添加失败！！")
								}
							}).catch(function(error) {
							console.log(error);
							alert("主管部门添加出现错误！！");
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

			fetchPlaceDepartmentInfo() { /* 页面加载前获取后端场地类型信息的数据 */
				// console.log("fetchPlaceFieldInfo() params:", params);
				this.loading = true;
				//this.axios.get(`http://10.86.2.23:8080/json/place/fields/selectFDI/${this.areaId}/${this.pageNum}`)
				this.axios.get(`${this.placeGlobal.baseUrl}/json/place/fieldtypes/listAllDepartment`).then((placeData) => {

					console.log("fetchPlaceDepartmentInfo() placeData:", placeData);
					this.listDepartmentData = placeData.data.department; /* 将列表数组赋值给listDepartmentData */
					console.log("listDepartmentData:", this.listDepartmentData);
					/* for (var i in this.listFieldTypeData) {
						for (var j in this.listFieldTypeData[i]) {
							if (j == 'name') {
								this.listFieldTypeData[i]['lable'] = this.listFieldTypeData[i][j] //修改属性名为“lable”
								delete this.listFieldTypeData[i]['name'] //删除“name”
							}
							if (j == 'id') {
								this.listFieldTypeData[i]['value'] = this.listFieldTypeData[i][j] //修改属性名为“value”
								delete this.listFieldTypeData[i]['id'] //删除“id”
							}
						}
					} */

					// for (var i in this.listFieldTypeData) { /* 新建option的json格式数据 */
					// 	// this.options.push({lable:"",value:""})
					// 	this.options.push({
					// 		label: this.listFieldTypeData[i].name,
					// 		value: this.listFieldTypeData[i].id,
					// 	})
					// }
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
