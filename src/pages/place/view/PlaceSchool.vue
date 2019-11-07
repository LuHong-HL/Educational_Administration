<!-- <template>
	<div class="content">

		<p>校区场地信息</p>

	</div>
</template> -->

<template>
	<div class="content">
		<div class="topClass">
			<a-button type="primary" @click="changeToPlaceAddSchool()">增加校区信息</a-button>
			<!-- <a-button type="primary">导入校区信息</a-button> -->
			<a-upload name="ExcelFile" :multiple="true" :showUploadList="false" :action="`${this.placeGlobal.baseUrl}/json/place/school/testExcel`"
			 accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="uploadSchool">
				<a-button type="primary">
					<a-icon type="upload" />导入校区信息
				</a-button>
			</a-upload>

			<a-button type="primary">
				<a-icon type="download" />导出校区信息</a-button>
			<span class="topSearchClass">
				<a-input-search placeholder="请输入搜索信息" style="width: 350px;" @search="onSearch" enterButton size="large" />
			</span>
		</div>

		<div class="topClass2">
			<span>{{this.universityName}}/</span>
		</div>

		<div>
			<!-- 校区信息列表，包括详情、修改、删除功能 -->
			<!-- :rowKey="record => record.id" -->
			<a-table :columns="columns" :dataSource="listSchoolData" class="containerListClass" :rowKey="record =>record.id"
			 :loading="loading" :pagination="pagination" :customRow="placeChange" @change="handleTableChange">
				<span slot="action" slot-scope="text, record">
					<!-- 修改按钮气泡确认框 -->
					<a-popconfirm title="你确定修改此条校区信息吗？" @confirm="updateConfirm(record)" @cancel="updateCancel(record)" okText="确认"
					 cancelText="取消">
						<a-button type="primary" href="javascript:;">修改</a-button>
					</a-popconfirm>
					<!-- 删除按钮气泡确认框 -->
					<a-popconfirm title="你确定删除此条校区信息吗？" @confirm="deleteConfirm(record)" @cancel="deleteCancel(record)" okText="确认"
					 cancelText="取消">
						<a-button type="primary" href="javascript:;">删除</a-button>
					</a-popconfirm>
				</span>
			</a-table>
		</div>

	</div>

</template>
<script>
	// 校区信息列表的列表头
	const columns = [{
			title: '校区名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '英文名',
			dataIndex: 'ename',
			key: 'ename',
		},
		{
			title: '办公室电话',
			dataIndex: 'telephone',
			key: 'telephone',
		},
		{
			title: '地址',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: '邮政编码',
			dataIndex: 'zip',
			key: 'zip',
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
			this.fetchPlaceSchoolInfo(); /* 获取校区列表信息 */
		},


		data() {
			return {
				listSchoolData: null,
				columns,
				pagination: {},
				universityId: 1,
				pageNum: 1,
				universityName: '肇庆学院',
				searchString: null,
				url:this.placeGlobal.baseUrl,
				newUrl:null,
			}
		},
		methods: {
			updateConfirm(record) { /* 修改气泡确认框选择确认的方法 */
				console.log(record)
				console.log("record.id:", record.id)
				this.changeToPlaceUpdateSchool(record);


				// this.axios.delete(`http://10.86.2.23:8080/json/place/school/destroy/${e.id}`).then(
				// 	(placeData) => {
				// 		this.fetchPlaceSchoolInfo({
				// 			pageNum:this.pageNum,
				// 			universityId:this.universityId,
				// 		}); /* 修改后局部刷新数据 */
				// 	});
				// this.$message.success('修改成功！！');

			},
			changeToPlaceUpdateSchool(record) { /* 跳转到PlaceUpdateSchool */
				console.log("PlaceAddSchool页面 universityId:universityName:", this.universityId, this.universityName);
				this.$router.push({
					path: 'PlaceUpdateSchool',
					query: {
						record: record,
						universityId: this.universityId,
						universityName: this.universityName,
					}
				})
			},
			updateCancel(record) { /* 修改气泡确认框选择取消的方法 */
				console.log("record:", record)
				this.$message.error('取消修改！！')
			},

			deleteConfirm(e) { /* 删除气泡确认框选择确认的方法 */
				console.log(e)
				console.log("record.id:", e.id)
				this.axios.delete(`${this.placeGlobal.baseUrl}/json/place/school/destroy/${e.id}`).then(
					(placeData) => {
						this.fetchPlaceSchoolInfo({
							pageNum: this.pageNum,
							universityId: this.universityId,
						}); /* 删除后局部刷新数据 */
					});
				this.$message.success('删除成功！！');

			},
			deleteCancel(e) { /* 删除气泡确认框选择取消的方法 */
				console.log(e)
				this.$message.error('删除失败！！')
			},


			onSearch(value) { /* 信息搜索监听方法 */
				console.log("onSearch() value:", value);
				this.searchString = value;
				this.fetchPlaceSchoolInfo({ /* 获取校区信息方法 */
					universityId: this.universityId,
					/* 获取universityId的值 */
					pageNum: this.pageNum,
					/* 获取pageNum的值 */
					example: this.searchString,
					/* 获取模糊搜素的信息 */
				});
			},

			handleTableChange(pagination, filters, sorter) { /* 检测表格变化的方法 */
				console.log("pagination:", pagination);
				const pager = { ...this.pagination /* 扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中 */
				};
				pager.current = pagination.current;
				this.pagination = pager;
				this.pageNum = this.pagination.current,
					this.fetchPlaceSchoolInfo({ /* 获取校区信息方法 */
						universityId: this.universityId,
						/* 获取universityId的值 */
						pageNum: this.pagination.current,
						/* 获取pageNum的值 */
						example: this.searchString,
						/* 获取模糊搜素的信息 */
					});
			},

			changeToPlaceAddSchool() { /* 跳转到PlaceAddSchool */
				console.log("PlaceAddSchool页面 universityId:universityName:", this.universityId, this.universityName);
				this.$router.push({
					path: 'PlaceAddSchool',
					query: {
						universityId: this.universityId,
						universityName: this.universityName,
					}
				})
			},




			changeToPlaceArea(record) { /* 跳转到PlaceArea */
				console.log("PlaceArea页面 schoolId:universityName:schoolName:universityId:", record.id, this.universityName, record.name,
					this.universityId, );
				this.$router.push({
					path: 'PlaceArea',
					query: {
						schoolId: record.id,
						universityName: this.universityName,
						schoolName: record.name,
						universityId: this.universityId,
					}
				})

			},

			placeChange(record) { /* 校区跳转到功能区的方法 */
				return {
					on: { // 事件
						dblclick: () => {
							console.log("当前行record:", record);
							this.changeToPlaceArea(record);
						}, // 点击行
					},

				};
			},

			fetchPlaceSchoolInfo(params = {
				pageNum: 1,
				universityId: 1,
			}) { /* 页面加载前获取后端校区数据库的数据 */
				console.log("fetchPlaceSchoolInfo() params:", params);
				console.log("baseUrl:",this.url)
				this.loading = true;
				// console.log("universityId: pageNum: example:", this.universityId, this.pageNum,this.searchString)
				/* http://10.86.2.23:8080/json/place/fields/selectFileddtosPageByIds?universityId=1&pageNum=1 */
				// http://10.86.2.23:8080/json/place/school/testExcel
				this.newUrl=`${this.placeGlobal.baseUrl}/json/place/school/testExcel`
				console.log(this.newUrl)
				console.log("ss:",this.newUrl)
				this.axios.get(`${this.placeGlobal.baseUrl}/json/place/school/selecetAllNike`, {
					params: params
				}).then(
					(placeData) => {
						console.log("fetchPlaceSchoolInfo() placeData:", placeData);
						const pagination = { ...this.pagination
						};
						pagination.total = placeData.data.pageInfo.total; /* 获取后端数据palceInfo数据的的总数 */
						console.log("pagination.total:", pagination.total);
						this.listSchoolData = placeData.data.pageInfo.list; /* 将列表数组赋值给listSchoolData */
						console.log("this.listSchoolData:", this.listSchoolData);
						this.loading = false; /* 加载完成,把加载图标值设置成false */
						this.pagination = pagination; /* 把pagination的值赋值给data中的pagination */
					})
			},



			// fetchPlaceSchoolInfo() { /* 页面加载前获取后端校区数据库的数据 */
			// 	/* console.log("fetchPlaceSchoolInfo() params:", params); */
			// 	this.loading = true;
			// 	console.log("universityId: pageNum:", this.universityId, this.pageNum)
			// 	/* http://10.86.2.23:8080/json/place/fields/selectFileddtosPageByIds?universityId=1&pageNum=1 */
			// 	this.axios.get(`http://10.86.2.23:8080/json/place/school/listByUId_page/${this.universityId}/${this.pageNum}`).then(
			// 		(placeData) => {
			// 			console.log("fetchPlaceSchoolInfo() placeData:", placeData);
			// 			const pagination = { ...this.pagination
			// 			};
			// 			pagination.total = placeData.data.pageInfo.total; /* 获取后端数据palceInfo数据的的总数 */
			// 			console.log("pagination.total:", pagination.total);
			// 			this.listSchoolData = placeData.data.pageInfo.list; /* 将列表数组赋值给listSchoolData */
			// 			console.log("this.listSchoolData:", this.listSchoolData);
			// 			this.loading = false; /* 加载完成,把加载图标值设置成false */
			// 			this.pagination = pagination; /* 把pagination的值赋值给data中的pagination */
			// 		})
			// },

			uploadSchool(info) {
				console.log("info:", info);
				if (info.file.status !== 'uploading') {
					console.log("info.file.response.code:info.file.response.msg:", info.file.response.code, info.file.response.msg);
				}
				if (info.file.status === 'done') {
					if(info.file.response.code===0){
						this.$message.success(`成功:导入校区信息成功`);
					}else{
						this.$message.success(`失败:导入校区信息失败`);
					}
					//this.$message.success(`${info.file.name} file uploaded successfully`);
				} else if (info.file.status === 'error') {
					this.$message.success(`错误:导入校区信息错误`);
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
	}

	.topClass2 {
		margin: 20px;
	}

	.containerListClass {
		margin: 20px;
	}
</style>
