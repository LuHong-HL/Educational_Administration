<template>
	<div class="content">
		<div class="inputClass">
			<div class="titleClass" style="width: 600px;">
				<span>请填入{{this.areaName}}的场地信息</span>
			</div>

			<a-form :form="form" @submit="handleSubmit">

				<a-form-item label="场地名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['name',{rules:rules.name,initialValue:this.record.name}]" />
				</a-form-item>

				<a-form-item label="楼层" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['level',{rules:rules.level,initialValue:this.record.level}]" />
				</a-form-item>

				<a-form-item label="房间编号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['room',{rules: rules.room,initialValue:this.record.room}]" />
				</a-form-item>

				<a-form-item label="长度" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['length',{rules:rules.length,initialValue:this.record.length}]" />
				</a-form-item>
				
				<a-form-item label="宽度" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['width',{rules: rules.width,initialValue:this.record.width}]" />
				</a-form-item>
				
				<a-form-item label="高度" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['height',{rules: rules.height,initialValue:this.record.height}]" />
				</a-form-item>
				
				<a-form-item label="容纳人数上限" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['maxVolumn',{rules:rules.maxVolumn,initialValue:this.record.maxVolumn}]" />
				</a-form-item>

				<a-form-item label="场地类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-radio-group name="radioGroup" :options="options" v-decorator="['typeId',{rules:rules.typeId,initialValue:this.record.typeId}]" />
					</a-radio-group>
				</a-form-item>
				
				<a-form-item label="室内/室外" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-radio-group name="radioGroup" v-decorator="['inOutDoor',{rules:rules.inOutDoor,initialValue:this.record.inOutDoor}]">
						<a-radio :value="0">室内</a-radio>
						<a-radio :value="1">室外</a-radio>
					</a-radio-group>
				</a-form-item>

				<div class="bottomClass" style="width: 300px;">
					<a-button type="primary" style="size:100px;" html-type="submit" class="bottomClassButton">
						提交
					</a-button>
					<a-button type="primary" @click="returnToPlaceField">
						返回
					</a-button>
				</div>
			</a-form>

		</div>
	</div>
</template>

<script>
	const rules = {
		name: [{
			required: true,
			message: '请输入场地名称'
		}],
		level: [{
			required: true,
			message: '请输入楼层'
		}],
		room: [{
			required: true,
			message: '请输入房间编号'
		}],
		length: [{
			required: true,
			message: '请输入长度'
		}],
		width: [{
			required: true,
			message: '请输入宽度'
		}],
		height: [{
			required: true,
			message: '请输入高度'
		}],
		maxVolumn: [{
			required: true,
			message: '请输入容纳人数上限'
		}],
		typeId: [{
			required: true,
			message: '请选择场地类型'
		}],
		inOutDoor: [{
			required: true,
			message: '请选择室内/室外'
		}],
	}


	export default {
		created: function() { /* 页面加载前获取后端数据库的数据 */
			this.fetchPlaceFieldTypeInfo(); /* 获取场地列表信息 */
		},
		data() {
			return {
				form: this.$form.createForm(this),
				record:this.$route.query.record,
				areaName: this.$route.query.areaName,
				universityName: this.$route.query.universityName,
				schoolName: this.$route.query.schoolName,
				listFieldTypeData: null,
				options: [],
				rules,

			};
		},
		methods: {
			handleSubmit(e) { /* 场地信息修改方法 */
				e.preventDefault();
				console.log("*******");
				this.form.validateFields((err, values) => {
					if (!err) {
						values["universityId"] = this.record.universityId;
						values["schoolId"] = this.record.schoolId;
						values["areaId"] = this.record.areaId;
						values["id"]=this.record.id;
						console.log('Received values of form: ', values);
						let url = `${this.placeGlobal.baseUrl}/json/place/field/update`
						this.axios({
							method: 'put',
							url,
							data: values,
						}).then(
							(placeData) => {
								console.log("PlaceSchoolData:", placeData);
								alert("场地信息修改成功！！");
							}).catch(function(error) {
							console.log(error);
							alert("场地信息修改失败！！");
						});
				
						/* this.axios.post("http://10.86.2.23:8080/json/place/school/create",
							values
						).then(
							(placeData) => {
								console.log("PlaceSchoolData:", placeData);
							}) */
				
					}
				});
				
				
// 				this.form.validateFields((err, values) => {
// 					if (!err) {
// 						values["universityId"] = this.record.universityId;
// 						values["schoolId"] = this.record.schoolId;
// 						values["areaId"] = this.record.areaId;
// 						vulues["id"]=this.record.id;
// 						console.log('Received values of form: ', values);
// 						let url = "http://10.86.2.23:8080/json/place/field/update"
// 						this.axios({
// 							method: 'put',
// 							url,
// 							data: values,
// 						}).then(
// 							(placeData) => {
// 								console.log("PlaceFieldData:", placeData);
// 								alert("场地信息修改成功！！");
// 							}).catch(function(error) {
// 							console.log(error);
// 							alert("场地信息修改失败！！");
// 						});
// 
// 						/* this.axios.post("http://10.86.2.23:8080/json/place/school/create",
// 							values
// 						).then(
// 							(placeData) => {
// 								console.log("PlaceSchoolData:", placeData);
// 							}) */
// 
// 					}
// 				});
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

			fetchPlaceFieldTypeInfo() { /* 页面加载前获取后端场地类型信息的数据 */
				// console.log("fetchPlaceFieldInfo() params:", params);
				this.loading = true;
				// this.axios.get(`http://10.86.2.23:8080/json/place/fields/selectFDI/${this.areaId}/${this.pageNum}`)
				this.axios.get(`${this.placeGlobal.baseUrl}/json/place/fieldtypes/listAll`).then((placeData) => {

					console.log("fetchPlaceFieldTypeInfo() placeData:", placeData);
					this.listFieldTypeData = placeData.data.fieldtypes; /* 将列表数组赋值给listFieldTypeData */
					console.log("listFieldTypeData:", this.listFieldTypeData);
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
					for (var i in this.listFieldTypeData) { /* 新建option的json格式数据 */
						// this.options.push({lable:"",value:""})
						this.options.push({
							label: this.listFieldTypeData[i].name,
							value: this.listFieldTypeData[i].id,
						})
					}
					console.log("options:", this.options)
				})
			},


		},
	};
</script>

<style>
	.content {
		height: 83vh;
	}

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
