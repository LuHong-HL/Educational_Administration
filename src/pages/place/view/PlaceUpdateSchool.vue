<template>
	<div class="content">
		<div class="inputClass">
			<div class="titleClass" style="width: 600px;">
				<span>请修改{{this.universityName}}的校区信息</span>
			</div>
			<a-form :form="form" @submit="handleSubmit">

				<a-form-item label="校区名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['name',{rules:rules.name,initialValue:this.record.name}]" />
				</a-form-item>

				<a-form-item label="校区英文名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['ename',{rules:rules.ename,initialValue:this.record.ename}]" />
				</a-form-item>

				<a-form-item label="办公室电话" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['telephone',{rules:rules.telephone,initialValue:this.record.telephone}]" />
				</a-form-item>

				<a-form-item label="地址" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['address',{rules:rules.address,initialValue:this.record.address}]" />
				</a-form-item>

				<a-form-item label="邮政编码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input type="int" v-decorator="['zip',{rules:rules.zip,initialValue:this.record.zip}]" />
				</a-form-item>


				<div class="bottomClass" style="width: 300px;">
					<a-button type="primary" style="size:100px;" html-type="submit" class="bottomClassButton">
						提交
					</a-button>
					<a-button type="primary" @click="returnToPlaceSchool">
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
				message: '请输入校区名'
			},
			{
				min: 2,
				max: 255,
				message: '长度不正确'
			}
		],
		ename: [{
				required: true,
				message: '请输入校区英文名'
			},
			{
				min: 2,
				max: 255,
				message: '长度不正确'
			}
		],
		telephone: [{
			required: true,
			message: '请输入办公电话'
		}, {
			min: 2,
			max: 15,
			message: '地址长度不正确'
		}],
		address: [{
			required: true,
			message: '请输入地址'
		}, {
			min: 2,
			max: 255,
			message: '地址长度不正确'
		}],
		zip: [{
			required: true,
			message: '请输入邮政编码'
		}, {
			pattern: /^[1-9]\d{5}$/,
			message: '请输入正确的邮政编码'
		}],
	};
	
	
	export default {
		data() {
			return {
				form: this.$form.createForm(this),
				universityId: this.$route.query.universityId,
				universityName: this.$route.query.universityName,
				// universityName:'肇庆学院',
				// universityName:this.$route.query.universityName,
				record:this.$route.query.record,
				rules,
			};
		},
		methods: {
			handleSubmit(e) { /* 校区信息修改方法 */
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if (!err) {
						values["universityId"] = this.universityId;
						values["id"]=this.record.id;
						console.log('Received values of form: ', values);
						let url = `${this.placeGlobal.baseUrl}/json/place/school/update`
						this.axios({
							method: 'put',
							url,
							data: values,
						}).then(
							(placeData) => {
								console.log("PlaceSchoolData:", placeData);
								alert("校区信息修改成功！！");
							}).catch(function(error) {
							console.log(error);
							alert("校区信息修改失败！！");
						});

						/* this.axios.post("http://10.86.2.23:8080/json/place/school/create",
							values
						).then(
							(placeData) => {
								console.log("PlaceSchoolData:", placeData);
							}) */

					}
				});
			},
			returnToPlaceSchool() {
				console.log("跳转到PlaceSchool页面");
				this.$router.push({
					path: 'PlaceSchool',
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
