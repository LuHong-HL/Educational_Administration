<!-- <template>
	<div class="content">
		<p>功能区场地信息</p>
	</div>
</template> -->

<template>
	<div class="content">
		<div class="topClass">
			<a-button type="primary" @click="changeToPlaceAddArea()">增加功能区信息</a-button>
			<!-- <a-button type="primary">导入功能区信息</a-button> -->
			<a-upload name="ExcelFile" :multiple="true" :showUploadList="false" :action="`${this.placeGlobal.baseUrl}/json/place/schoolarea/testExcel`"
			 accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="uploadArea">
				<a-button type="primary">
					<a-icon type="upload" /> 导入功能区信息
				</a-button>
			</a-upload>

			<a-button type="primary">
				<a-icon type="download" />导出功能区信息
			</a-button>
			<span class="topSearchClass">
				<a-input-search placeholder="请输入搜索信息" style="width: 350px;" @search="onSearch" enterButton size="large" />
			</span>
		</div>
		<div class="topClass2">
			<span>{{this.universityName}}/{{this.schoolName}}</span>
		</div>
		<div>
			<!-- 功能区信息列表，包括详情、修改、删除功能 -->
			<a-table :columns="columns" :dataSource="listAreaData" class="containerListClass" :rowKey="record => record.id"
			 :loading="loading" :pagination="pagination" @change="handleTableChange" :customRow="placeChange">
				<span slot="action" slot-scope="text, record">
					<!-- 修改按钮气泡确认框 -->
					<a-popconfirm title="你确定修改此条功能区信息吗？" @confirm="updateConfirm(record)" @cancel="updateCancel(record)" okText="确认"
					 cancelText="取消">
						<a-button type="primary" href="javascript:;">修改</a-button>
					</a-popconfirm>
					<!-- 删除按钮气泡确认框 -->
					<a-popconfirm title="你确定删除此条功能区信息吗？" @confirm="deleteConfirm(record)" @cancel="deleteCancel(record)" okText="确认"
					 cancelText="取消">
						<a-button type="primary" href="javascript:;">删除</a-button>
					</a-popconfirm>
				</span>
			</a-table>
		</div>

	</div>

</template>
<script>
	// 功能区信息列表的列表头
	const columns = [{
			title: '功能区名称',
			dataIndex: 'name',
			key: 'name',
			width: '80%',
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
			this.fetchPlaceAreaInfo(); /* 获取功能区列表信息 */
		},


		data() {
			return {
				listAreaData: null,
				columns,
				pagination: {},
				schoolId: this.$route.query.schoolId,
				universityId: this.$route.query.universityId,
				universityName: this.$route.query.universityName,
				schoolName: this.$route.query.schoolName,
				pageNum: 1,
				searchString: null,
			}
		},
		methods: {
			onSearch(value) { /* 信息搜索监听方法 */
				console.log("onSearch() value", value);
				this.searchString = value;
				this.fetchPlaceAreaInfo({ /* 获取功能区信息方法 */
					schoolId: this.schoolId,
					/* 获取schoolId的值 */
					pageNum: this.pageNum,
					/* 获取pageNum的值 */
					example: this.searchString,
					/* 获取模糊搜素的信息 */
				});
			},

			updateConfirm(record) { /* 修改气泡确认框选择确认的方法 */
				console.log("record:", record)
				console.log("record.id:", record.id)
				this.changeToPlaceUpdateArea(record);


				// this.axios.delete(`http://10.86.2.23:8080/json/place/school/destroy/${e.id}`).then(
				// 	(placeData) => {
				// 		this.fetchPlaceSchoolInfo({
				// 			pageNum:this.pageNum,
				// 			universityId:this.universityId,
				// 		}); /* 修改后局部刷新数据 */
				// 	});
				// this.$message.success('修改成功！！');

			},
			changeToPlaceUpdateArea(record) { /* 跳转到PlaceUpdateSchool */
				console.log("PlaceUpdateArea页面 universityId:universityName:", this.universityId, this.universityName);
				this.$router.push({
					path: 'PlaceUpdateArea',
					query: {
						record: record,
						schoolName: this.schoolName,
						universityName: this.universityName,
					}
				})
			},
			updateCancel(record) { /* 修改气泡确认框选择取消的方法 */
				console.log("record:", record)
				this.$message.error('取消修改！！')
			},


			deleteConfirm(record) { /* 气泡确认框选择确认的方法 */
				console.log(record)
				console.log("record.id:", record.id)
				this.axios.delete(`${this.placeGlobal.baseUrl}/json/place/schoolarea/destroy/${record.id}`).then(
					(placeData) => {
						this.fetchPlaceAreaInfo({
							pageNum: this.pageNum,
							schoolId: this.schoolId,
						}); /* 删除后局部刷新数据 */
					});
				this.$message.success('删除成功！！');
			},
			deleteCancel(record) { /* 气泡确认框选择取消的方法 */
				console.log(record)
				this.$message.error('删除失败！！')
			},


			changeToPlaceAddArea() { /* 跳转到PlaceAddArea */
				console.log("PlaceAddArea页面 universityId:schoolId:universityName:schoolName:", this.universityId, this.schoolId,
					this.universityName, this.schoolName, );
				this.$router.push({
					path: 'PlaceAddArea',
					query: {
						universityId: this.universityId,
						schoolId: this.schoolId,
						schoolName: this.schoolName,
						universityName: this.universityName,

					}
				})
			},



			handleTableChange(pagination, filters, sorter) { /* 检测表格变化的方法 */
				console.log("pagination:", pagination);
				const pager = { ...this.pagination /* 扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中 */
				};
				pager.current = pagination.current;
				this.pagination = pager;
				// this.schoolId=this.schoolId;/* 获取schoolId的值 */
				this.pageNum = this.pagination.current; /* 获取pageNum的值 */

				this.fetchPlaceAreaInfo({
					schoolId: this.schoolId,
					pageNum: this.pageNum,
					// universityId:this.universityId,
					example: this.searchString,
				}); /* 获取场地信息方法 */
			},

			placeChange(record) { /* 功能区跳转到对应场地的方法 */
				return {
					props: {
						//属性 
					},
					on: { // 事件
						dblclick: () => {
							console.log("ddd", record);
							this.changeToPlaceField(record);
						}, // 点击行
					},

				};
			},
			changeToPlaceField(record) { /* 跳转到PlaceField */
				console.log("PlaceField页面");
				this.$router.push({
					path: 'PlaceField',
					query: {
						universityId: this.universityId,
						schoolId: this.schoolId,
						areaId: record.id,
						universityName: this.universityName,
						schoolName: this.schoolName,
						areaName: record.name,
					}
				})

			},

			fetchPlaceAreaInfo(params = {
				pageNum: 1,
				schoolId: this.schoolId,
			}) { /* 页面加载前获取后端功能区数据库的数据 */
				console.log("fetchPlaceAreaInfo() params:", params);
				this.loading = true;
				this.axios.get(`${this.placeGlobal.baseUrl}/json/place/schoolarea/selecetAllNike`, {
					params: params
				}).then(
					(placeData) => {
						console.log("fetchPlaceAreaInfo() placeData:", placeData);
						const pagination = { ...this.pagination
						};
						pagination.total = placeData.data.pageInfo.total; /* 获取后端数据palceInfo数据的的总数 */
						console.log("pagination.total:", pagination.total);
						this.listAreaData = placeData.data.pageInfo.list; /* 将列表数组赋值给listAreaData */
						console.log("this.listAreaData:", this.listAreaData);
						this.loading = false; /* 加载完成,把加载图标值设置成false */
						this.pagination = pagination; /* 把pagination的值赋值给data中的pagination */
					})
			},

			uploadArea(info) {
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

				this.fetchPlaceAreaInfo({ /* 获取校区信息方法 */
					schoolId: this.schoolId,
					/* 获取schoolId的值 */
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
