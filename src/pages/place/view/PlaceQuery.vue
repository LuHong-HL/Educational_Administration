<!-- 
* 开发者：卢洪
* 时间：19/5/12
* 模块：场地信息管理模块前端代码
* 
*  -->



<template>
	<div class="content">
		<!-- 信息筛选和信息搜索组件 -->
		<template>
			<div class="topclass" id="select">
				<!-- 校区下拉框筛选 -->
				<span>校区筛选：</span>
				<a-select showSearch placeholder="请选择筛选的校区" optionFilterProp="children" style="width: 200px" @focus="handleFocus"
				 @blur="handleBlur" @change="handleSchoolChange" :filterOption="filterOption" size="large">
					<a-select-option v-for="schoolData in schoolDatas" :key="schoolData.id">{{schoolData.name}}</a-select-option>
				</a-select>

				<!-- 功能区下拉框筛选 -->
				<span class="topSelectorClass">功能区筛选：</span>
				<a-select showSearch placeholder="请选择筛选的功能区" optionFilterProp="children" style="width: 200px" @focus="handleFocus"
				 @blur="handleBlur" @change="handleAreaChange" :filterOption="filterOption" size="large">
					<a-select-option v-for="areaData in areaDatas" :key="areaData.id">{{areaData.name}}</a-select-option>
				</a-select>

				<span class="topSearchClass">信息搜索：
					<a-input-search placeholder="请输入搜索信息" style="width: 250px;" @search="onSearch" enterButton size="large" />
				</span>
				<br /><br /><br />
			</div>
		</template>

		<!-- 增加场地按钮 -->
		<div class="topPlaceAddclass">
			<a-button type="primary" href="javascript:;" @click="showModal1">+增加场地信息</a-button>
			<a-modal title="请选择要添加的信息" v-model="visible1" @ok="handleOk1" width="520px">

				<!-- 新增校区信息弹窗表 -->
				<a-button type="primary" @click="showModalChildren1">新增校区信息</a-button>
				<a-modal title="请填入要新增的校区信息" :visible="visibleChildren1" @ok="handleOkChildren1" @cancel="handleCancelChildren1"
				 width="60%">
					<!-- 新增校区信息container模块 -->
					<a-form layout="horizontal">
						<a-form-item label="校区名" :wrapper-col="{ span: 15 }" :label-col="{ span: 5 }">
							<a-input placeholder="input placeholder" />
						</a-form-item>
						<a-form-item label="校区英文名" :wrapper-col="{ span: 15 }" :label-col="{ span: 5 }">
							<a-input placeholder="input placeholder" />
						</a-form-item>
						<a-form-item label="校区办公室电话" :wrapper-col="{ span: 15 }" :label-col="{ span: 5 }">
							<a-input placeholder="input placeholder" />
						</a-form-item>
						<a-form-item label="校区地址" :wrapper-col="{ span: 15 }" :label-col="{ span: 5 }">
							<a-input placeholder="input placeholder" />
						</a-form-item>
						<a-form-item label="校区邮政编码" :wrapper-col="{ span: 15 }" :label-col="{ span: 5 }">
							<a-input placeholder="input placeholder" />
						</a-form-item>
					</a-form>

				</a-modal>

				<!-- 新增功能区模块 -->
				<a-button type="primary" @click="showModalChildren2">新增功能区</a-button>
				<a-modal title="请填入要新增的功能区信息" :visible="visibleChildren2" @ok="handleOkChildren2" @cancel="handleCancelChildren2"
				 width="60%">
					<!-- 新增功能区信息container模块 -->
					<a-form layout="horizontal">
						<a-form-item label="区域名" :wrapper-col="{ span: 15 }" :label-col="{ span: 5 }">
							<a-input placeholder="input placeholder" />
						</a-form-item>
					</a-form>
				</a-modal>

				<!-- 新增场地信息模块 -->
				<a-button type="primary" @click="showModalChildren3">新增场地信息</a-button>
				<a-modal title="请填入要新增的场地信息" :visible="visibleChildren3" @ok="handleOkChildren3" @cancel="handleCancelChildren3"
				 width="60%">
					<!-- 新增场地信息container模块 -->
					<a-form layout="horizontal">
						<a-form-item label="场地名" :wrapper-col="{ span: 15 }" :label-col="{ span: 5 }">
							<a-input placeholder="input placeholder" />
						</a-form-item>
						<a-form-item label="场地楼层" :wrapper-col="{ span: 15 }" :label-col="{ span: 5 }">
							<a-input placeholder="input placeholder" />
						</a-form-item>
						<a-form-item label="场地房间编号" :wrapper-col="{ span: 15 }" :label-col="{ span: 5 }">
							<a-input placeholder="input placeholder" />
						</a-form-item>
						<a-form-item label="场地长度" :wrapper-col="{ span: 15 }" :label-col="{ span: 5 }">
							<a-input placeholder="input placeholder" />
						</a-form-item>
						<a-form-item label="场地宽度" :wrapper-col="{ span: 15 }" :label-col="{ span: 5 }">
							<a-input placeholder="input placeholder" />
						</a-form-item>
						<a-form-item label="场地容纳人数上限" :wrapper-col="{ span: 15 }" :label-col="{ span: 5 }">
							<a-input placeholder="input placeholder" />
						</a-form-item>
						<a-form-item label="场地场地类型" :wrapper-col="{ span: 15 }" :label-col="{ span: 5 }">
							<a-input placeholder="input placeholder" />
						</a-form-item>
						<a-form-item label="场地室内/室内" :wrapper-col="{ span: 15 }" :label-col="{ span: 5 }">
							<a-input placeholder="input placeholder" />
						</a-form-item>



					</a-form>
				</a-modal>

			</a-modal>
		</div>

		<!-- 场地信息列表，包括详情、修改、删除功能 -->
		<a-table :columns="columns" :dataSource="listData" class="containerListClass" :rowKey="record => record.id" :loading="loading"
		 :pagination="pagination" @change="handleTableChange">
			<span slot="action" slot-scope="text, record">
				<!-- 点击详情按钮，弹出对话框 -->
				<a-button type="primary" @click='showModal' href="javascript:;">详情</a-button>
				<a-modal :footer="null" :mask="false" title="Basic Modal" v-model="visible" @ok="handleOk">
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>

				</a-modal>
				<!-- 修改按钮气泡确认框 -->
				<a-popconfirm title="你确定修改此条场地信息吗？" @confirm="confirm" @cancel="cancel" okText="确认" cancelText="取消">
					<a-button type="primary" href="javascript:;">修改</a-button>
				</a-popconfirm>
				<!-- 删除按钮气泡确认框 -->
				<a-popconfirm title="你确定删除此条场地信息吗？" @confirm="confirm" @cancel="cancel" okText="确认" cancelText="取消">
					<a-button type="primary" href="javascript:;">删除</a-button>
				</a-popconfirm>
			</span>
		</a-table>
	</div>
</template>

<script>
	// 场地信息列表的列表头
	const columns = [{
		title: '校区名',
		dataIndex: 'schoolname',
		key: 'schoolname',
		width: '25%',
	}, {
		title: '区域名',
		dataIndex: 'areaname',
		key: 'areaname',
		width: '25%',
	}, {
		title: '场地名',
		dataIndex: 'name',
		key: 'name',
		width: '25%',
	}, {
		title: '操作',
		key: 'action',
		width: '25%',
		scopedSlots: {
			customRender: 'action'
		},
	}]

	export default {
		mounted: function() { /* 页面加载前获取后端数据库的数据 */
			this.fetchPlaceInfo(); /* 获取场地列表信息 */
			this.fetchSchoolPlaceInfo(); /* 获取校区下拉框信息 */
			this.fetchAreaPlaceInfo(); /* 获取功能区下拉框信息 */
		},
		data() {
			return { /* 返回数据各种数据库 */
				// listData,
				listData: null,
				schoolDatas: null,
				areaDatas: null,
				columns,
				loading: false,
				pagination: {},
				schoolId: null,
				areaId: null,
				fieldName:null,

				visible: false,
				visible1: false,
				visibleChildren1: false,
				visibleChildren2: false,
				visibleChildren3: false,
			}
		},


		methods: {
			onSearch(value) { /* 信息搜索监听方法 */
				console.log("onSearch() value",value);
				this.fieldName = value;
				this.fetchPlaceInfo({ /* 获取params的属性值 */
					universityId: 1,
					areaId: this.areaId,
					schoolId:this.schoolId,
					pageNum: 1,
					name:this.fieldName,
				});
			},
			confirm(e) { /* 气泡确认框选择确认的方法 */
				console.log(e)
				this.$message.success('Click on Yes')
			},
			cancel(e) { /* 气泡确认框选择取消的方法 */
				console.log(e)
				this.$message.error('Click on No')
			},
			showModal() { /* 对话框弹出 */
				this.visible = true
			},
			handleOk(e) {
				console.log(e);
				this.visible = false
			},
			showModal1() {
				this.visible1 = true
			},
			handleOk1(e) {
				console.log(e);
				this.visible1 = false
			},
			showModalChildren1() { /* 新增校区方法 */
				this.visibleChildren1 = true
			},
			handleOkChildren1(e) {
				this.visibleChildren1 = false;
			},
			handleCancelChildren1(e) {
				console.log('Clicked cancel button');
				this.visibleChildren1 = false;
			},
			showModalChildren2() { /* 新增功能区方法 */
				this.visibleChildren2 = true
			},
			handleOkChildren2(e) {
				this.visibleChildren2 = false;
			},
			handleCancelChildren2(e) {
				console.log('Clicked cancel button');
				this.visibleChildren2 = false;
			},
			showModalChildren3() { /* 新增场地方法 */
				this.visibleChildren3 = true
			},
			handleOkChildren3(e) {
				this.visibleChildren3 = false;
			},
			handleCancelChildren3(e) {
				console.log('Clicked cancel button');
				this.visibleChildren3 = false;
			},

			placeApplySwitch() {
				this.$router.push({
					path: './PlaceApply'
				});
			},

			handleSchoolChange(value) { /* 筛选下拉框方法 */
				console.log("value:", value);
				this.schoolId = value;
				this.fetchAreaPlaceInfo();
				this.fetchPlaceInfo({ /* 获取params的属性值 */
					universityId: 1,
					schoolId: this.schoolId,
					areaId:this.areaId,
					pageNum: 1,
					name:this.fieldName,
				});
			},
			handleAreaChange(value) { /* 筛选下拉框方法 */
				console.log("value:", value);
				this.areaId = value;
				this.fetchPlaceInfo({ /* 获取params的属性值 */
					universityId: 1,
					areaId: this.areaId,
					schoolId:this.schoolId,
					pageNum: 1,
					name:this.fieldName,
				});
			},

			handleBlur() {
				console.log('blur');
				// this.fetchSchoolPlaceInfo();
				console.log("******");
			},

			handleFocus() {
				console.log('focus');
				// this.fetchSchoolPlaceInfo();

			},
			filterOption(input, option) {
				return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
			},

			fetchSchoolPlaceInfo() { /* 获取校区信息 */
				// http://10.86.2.23:8080/json/place/school/listbyUId/1
				console.log("schoolId:", this.schoolId);
				this.axios.get(`${this.placeGlobal.baseUrl}/json/place/school/listbyUId/1`).then((schoolData) => {
					console.log("fetchSchoolPlaceInfo() schoolData:", schoolData);
					this.schoolDatas = schoolData.data.list;
					console.log("schoolDatas:", this.schoolDatas);
				})
			},
			/* 获取功能区信息 */
			fetchAreaPlaceInfo(params = {
				universityId: 1,
				schoolId: this.schoolId,
			}) {
				// http://10.86.2.23:8080/json/place/school/listbyUId/1

				this.axios.get(`${this.placeGlobal.baseUrl}/json/place/schoolarea/selectByUIdorSId`, {
					params: params
				}).then((areaData) => {
					console.log("fetchAreaPlaceInfo() schoolData:", areaData);
					this.areaDatas = areaData.data.list;
					console.log("areaDatas:", this.areaDatas);
				})
			},

			handleTableChange(pagination, filters, sorter) { /* 检测表格变化的方法 */
				console.log("pagination:", pagination);
				const pager = { ...this.pagination /* 扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中 */
				};
				pager.current = pagination.current;
				this.pagination = pager;
				this.fetchPlaceInfo({ /* 获取params的属性值 */
					pageNum: this.pagination.current,
					universityId: 1,
					schoolId: this.schoolId,
					areaId:this.areaId,
					name:this.fieldName,
					
				});
			},

			fetchPlaceInfo(params = {
				pageNum: 1,
				universityId: 1,
			}) { /* 页面加载前获取后端场地数据库的数据 */
				console.log("fetchPlaceInfo() params:", params);
				this.loading = true;
				// http://10.86.2.23:8080/json/place/fields/selectFileddtosPageByIds?universityId=1&pageNum=1
				this.axios.get(`${this.placeGlobal.baseUrl}/json/place/fields/selectFileddtosPageByIds`, {
					params: params
				}).then((placeData) => {
					console.log("fetchPlaceInfo() placeData:", placeData);
					const pagination = { ...this.pagination
					};
					pagination.total = placeData.data.pageInfo.total; /* 获取后端数据palceInfo数据的的总数 */
					console.log("pagination.total:", pagination.total);
					this.listData = placeData.data.pageInfo.list; /* 将列表数组赋值给listData */
					console.log("this.listData:", this.listData);
					this.loading = false; /* 加载完成,把加载图标值设置成false */
					this.pagination = pagination; /* 把pagination的值赋值给data中的pagination */
				})
			},

			// fetchSchoolIdPlaceInfo(params = {
			// 	pageNum: 1,
			// 	schoolId:1,
			// 	universityId:1,
			// }) { /* 页面加载前获取后端场地数据库的数据 */
			// 	console.log("fetchSchoolIdPlaceInfo() params:", params);
			// 	this.loading = true;
			// 	// http://10.86.2.23:8080/json/place/fields/selectFileddtosPageByIds?universityId=1&pageNum=1
			// 	this.axios.get("http://127.0.0.1:8081/json/place/fields/selectFileddtosPageByIds", {
			// 		params: params
			// 	}).then((placeData) => {
			// 		console.log("fetchSchoolIdPlaceInfo() placeData:", placeData);
			// 		// const pagination = { ...this.pagination
			// 		// };
			// 		// pagination.total = placeData.data.pageInfo.total; /* 获取后端数据palceInfo数据的的总数 */
			// 		// console.log("pagination.total:", pagination.total);
			// 		this.listData = placeData.data.pageInfo.list; /* 将列表数组赋值给listData */
			// 		console.log("this.listData:", this.listData);
			// 		this.loading = false; /* 加载完成,把加载图标值设置成false */
			// 		// this.pagination = pagination; /* 把pagination的值赋值给data中的pagination */
			// 	})
			// },



			// listNameChange(data){/* JSON对象变json字符串,改属性名字,JSON字符串转化成json对象,通过new list[]={n1,n2,n3};封装 */
			// 	for(let i=0;i<data.length;i++){
			// 	let newData = JSON.parse(JSON.stringify(data[i])
			//                  .replace(/name/g, "label").replace(/id/g, "value"))
			// 	}
			// 	
			// }

		},
	}
</script>

<style>
	.topclass {
		margin: 20px;

	}

	.topSelectorClass {
		padding-left: 90px;
	}

	.topPlaceAddclass {
		margin: 20px;
	}

	.topSearchClass {
		padding-left: 90px;
	}

	.containerListClass {
		margin: 20px;
	}

	.content {
		height: 83vh;
	}
</style>
