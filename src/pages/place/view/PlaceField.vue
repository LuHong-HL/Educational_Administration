<!-- <template>
	<div class="content">
		<p>场地信息</p>
	</div>
</template> -->

<template>
	<div class="content">
		<div class="topClass">
			<a-button type="primary" @click="changeToPlaceAddField()">增加场地信息</a-button>
			<!-- <a-button type="primary">导入场地信息</a-button> -->
			<a-upload name="ExcelFile" :multiple="true" :showUploadList="false" :action="`${this.placeGlobal.baseUrl}/json/place/field/testExcel`"
			 accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="uploadField">
				<a-button type="primary">
					<a-icon type="upload" /> 导入场地信息
				</a-button>
			</a-upload>
			<a-button type="primary">
				<a-icon type="download" />导出场地信息
			</a-button>
			<span class="topSearchClass">
				<a-input-search placeholder="请输入搜索信息" style="width: 350px;" @search="onSearch" enterButton size="large" />
			</span>
		</div>
		<div class="topClass2">
			<span>{{this.universityName}}/{{this.schoolName}}/{{this.areaName}}</span>
		</div>
		<div>
			<!-- 场地信息列表，包括详情、修改、删除功能 -->
			<a-table :columns="columns" :dataSource="listFieldData" class="containerListClass" :rowKey="record => record.id"
			 :loading="loading" :pagination="pagination" @change="handleTableChange">
				<span slot="action" slot-scope="text, record">
					<!-- 添加主管部门按钮气泡确认框 -->
					<a-popconfirm title="你确定为此场地添加主管部门吗？" @confirm="createDepartmentConfirm(record)" @cancel="createDepartmentCancel(record)" okText="确认"
					 cancelText="取消">
						<a-button type="primary" href="javascript:;">添加部门</a-button>
					</a-popconfirm>
					<!-- 任命负责人按钮气泡确认框 -->
					<a-popconfirm title="你确定为此场地任命负责人吗？" @confirm="createUserConfirm(record)" @cancel="createUserCancel(record)" okText="确认"
					 cancelText="取消">
						<a-button type="primary" href="javascript:;">任命负责人</a-button>
					</a-popconfirm>
					
					
					<!-- 修改按钮气泡确认框 -->
					<a-popconfirm title="你确定修改此条场地信息吗？" @confirm="updateConfirm(record)" @cancel="updateCancel(record)" okText="确认"
					 cancelText="取消">
						<a-button type="primary" href="javascript:;">修改</a-button>
					</a-popconfirm>
					<!-- 删除按钮气泡确认框 -->
					<a-popconfirm title="你确定删除此条场地信息吗？" @confirm="deleteConfirm(record)" @cancel="deleteCancel(record)" okText="确认"
					 cancelText="取消">
						<a-button type="primary" href="javascript:;">删除</a-button>
					</a-popconfirm>
				</span>
			</a-table>
		</div>

	</div>

</template>
<script>
	// 场地信息列表的列表头
	const columns = [{
			title: '场地名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '楼层',
			dataIndex: 'level',
			key: 'level',
		},
		{
			title: '房间编号',
			dataIndex: 'room',
			key: 'room',
		},
		// {
		// 	title: '长度',
		// 	dataIndex: 'length',
		// 	key: 'length',
		// },
		// {
		// 	title: '宽度',
		// 	dataIndex: 'width',
		// 	key: 'width',
		// },
		// {
		// 	title: '高度',
		// 	dataIndex: 'height',
		// 	key: 'height',
		// },
		{
			title: '容纳人数',
			dataIndex: 'maxVolumn',
			key: 'maxVolumn',
		},
		// {
		// 	title: '室内/室外',
		// 	dataIndex: 'inOutDoor',
		// 	key: 'inOutDoor',
		// },
		{
			title: '场地类型',
			dataIndex: 'typeName',
			key: 'typeName',
		},
		{
			title: '主管部门',
			dataIndex: 'departmentName',
			key: 'departmentName',
		},
		{
			title: '负责人',
			dataIndex: 'userName',
			key: 'userName',
		},


		{
			title: '操作',
			key: 'action',
			scopedSlots: {
				customRender: 'action'
			},
		}
	]

	export default {
		created: function() { /* 页面加载前获取后端数据库的数据 */
			this.fetchPlaceFieldInfo(); /* 获取场地列表信息 */
		},


		data() {
			return {
				listFieldData: null,
				columns,
				pagination: {},
				universityId: this.$route.query.universityId,
				schoolId: this.$route.query.schoolId,
				areaId: this.$route.query.areaId,
				universityName: this.$route.query.universityName,
				schoolName: this.$route.query.schoolName,
				areaName: this.$route.query.areaName,
				pageNum: 1,
				searchString: null,
			}
		},
		methods: {
			onSearch(value) { /* 信息搜索监听方法 */
				console.log("onSearch() value", value);
				this.searchString = value;
				this.fetchPlaceFieldInfo({ /* 获取场地信息方法 */
					areaId: this.areaId,
					/* 获取areaId的值 */
					pageNum: this.pageNum,
					/* 获取pageNum的值 */
					example: this.searchString,
					/* 获取模糊搜素的信息 */
				});
			},
			createDepartmentConfirm(record) { /* 添加主管部门气泡确认框选择确认的方法 */
				console.log(record)
				console.log("record.id:", record.id)
				this.changeToPlaceCreateDepartment(record);
			},
			changeToPlaceCreateDepartment(record) { /* 跳转到PlaceCreateDepartment */
				console.log("PlaceUpdateField页面 universityId:universityName:", this.universityId, this.universityName);
				this.$router.push({
					path: 'PlaceCreateDepartment',
					query: {
						record: record,
						areaName: this.areaName,
						universityName: this.universityName,
						schoolName: this.schoolName,
					}
				})
			},
			createDepartmentCancel(record) { /* 取消添加主管部门气泡确认框选择取消的方法 */
				console.log("record:", record)
				this.$message.error('取消添加主管部门！！')
			},
			
			createUserConfirm(record) { /* 添加主管部门气泡确认框选择确认的方法 */
				console.log(record)
				console.log("record.id:", record.id)
				this.changeToPlaceCreateUser(record);
			},
			changeToPlaceCreateUser(record) { /* 跳转到PlaceCreateUser */
				console.log("PlaceCreateUser页面 universityId:universityName:", this.universityId, this.universityName);
				this.$router.push({
					path: 'PlaceCreateUser',
					query: {
						record: record,
						areaName: this.areaName,
						universityName: this.universityName,
						schoolName: this.schoolName,
					}
				})
			},
			createUserCancel(record) { /* 取消任命负责人气泡确认框选择取消的方法 */
				console.log("record:", record)
				this.$message.error('取消任命负责人！！')
			},
			
			
			
			

			updateConfirm(record) { /* 修改气泡确认框选择确认的方法 */
				console.log(record)
				console.log("record.id:", record.id)
				this.changeToPlaceUpdateField(record);
			},
			changeToPlaceUpdateField(record) { /* 跳转到PlaceUpdateField */
				console.log("PlaceUpdateField页面 universityId:universityName:", this.universityId, this.universityName);
				this.$router.push({
					path: 'PlaceUpdateField',
					query: {
						record: record,
						areaName: this.areaName,
						universityName: this.universityName,
						schoolName: this.schoolName,
					}
				})
			},
			updateCancel(record) { /* 修改气泡确认框选择取消的方法 */
				console.log("record:", record)
				this.$message.error('取消修改！！')
			},


			deleteConfirm(e) { /* 气泡确认框选择确认的方法 */
				console.log(e)
				console.log("record.id:", e.id)
				this.axios.delete(`${this.placeGlobal.baseUrl}/json/place/field/destroy/${e.id}`).then(
					(placeData) => {
						this.fetchPlaceFieldInfo({
							pageNum: this.pageNum,
							areaId: this.areaId,
						}); /* 删除后局部刷新数据 */
					});
				this.$message.success('删除成功！！');
			},
			deleteCancel(e) { /* 气泡确认框选择取消的方法 */
				console.log(e)
				this.$message.error('删除失败！！')
			},


			changeToPlaceAddField() { /* 跳转到PlaceAddField */
				console.log("PlaceAddField页面");
				this.$router.push({
					path: 'PlaceAddField',
					query: {
						universityId: this.universityId,
						schoolId: this.schoolId,
						areaId: this.areaId,
						areaName: this.areaName,
						universityName: this.universityName,
						schoolName: this.schoolName,
					}
				})
			},


			handleTableChange(pagination, filters, sorter) { /* 检测表格变化的方法 */
				console.log("pagination:", pagination);
				const pager = { ...this.pagination /* 扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中 */
				};
				pager.current = pagination.current;
				this.pagination = pager;
				// this.areaId=this.areaId;/* 获取areaId的值 */
				this.pageNum = this.pagination.current; /* 获取pageNum的值 */
				this.fetchPlaceFieldInfo({
					areaId: this.areaId,
					pageNum: this.pageNum,
					example: this.searchString,

				}); /* 获取场地信息方法 */
			},


			fetchPlaceFieldInfo(params = {
				areaId: this.areaId,
				pageNum: this.pageNum,
			}) { /* 页面加载前获取后端场地信息的数据 */
				// console.log("fetchPlaceFieldInfo() params:", params);
				this.loading = true;
				console.log("areaId: pageNum:", this.areaId, this.pageNum)
				// this.axios.get(`http://10.86.2.23:8080/json/place/fields/selectFDI/${this.areaId}/${this.pageNum}`)
				this.axios.get(`${this.placeGlobal.baseUrl}/json/place/field/selecetNike`, {
					params: params
				}).then((placeData) => {
					console.log("fetchPlaceFieldInfo() placeData:", placeData);
					const pagination = { ...this.pagination
					};
					pagination.total = placeData.data.pageInfo.total; /* 获取后端数据palceInfo数据的的总数 */
					console.log("pagination.total:", pagination.total);
					this.listFieldData = placeData.data.pageInfo.list; /* 将列表数组赋值给listFieldData */
					console.log("this.listFieldData:", this.listFieldData);
					this.loading = false; /* 加载完成,把加载图标值设置成false */
					this.pagination = pagination; /* 把pagination的值赋值给data中的pagination */
				})
			},

			uploadField(info) {
				console.log("info:", info);
				if (info.file.status !== 'uploading') {
					console.log("info.file.response.code:info.file.response.msg:", info.file.response.code, info.file.response.msg);
				}
				if (info.file.status === 'done') {
					if (info.file.response.code === 0) {
						this.$message.success(`成功:${info.file.response.msg}`);
					} else {
						this.$message.success(`失败:${info.file.response.msg}`);
					}
					//this.$message.success(`${info.file.name} file uploaded successfully`);
				} else if (info.file.status === 'error') {
					this.$message.success(`错误:${info.file.response.msg}`);
					// this.$message.error(`${info.file.name} file upload failed.`);
				}

				this.fetchPlaceFieldInfo({ /* 获取field信息方法 */
					areaId: this.areaId,
					/* 获取areaId的值 */
					pageNum: this.pageNum,
					/* 获取pageNum的值 */
					example: this.searchString,
					/* 获取模糊搜素的信息 */
				});
			},
		}
	}
</script>

<style>
	.content {
		height: 83vh;
	}

	.topClass {
		margin: 20px;
	}

	.topSearchClass {
		padding-left: 100px;
		/* padding-right: 10px; */
	}

	.topClass2 {
		margin: 20px;
	}

	.containerListClass {
		margin: 20px;
	}
</style>
