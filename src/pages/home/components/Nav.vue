<template>
	<div class="nav">
		<h4 class="nav-h4">教务管理系统</h4>
		<div class="side-bar">
			<a-menu mode="inline" theme="dark">
				<template v-for="item in navList">
					<a-menu-item v-if="!item.children" :key="item.key" @click="changeUrl(item.key)">
						<span>{{item.title}}</span>
					</a-menu-item>
					<sub-menu v-else :menu-info="item" :key="item.key" />
				</template>
			</a-menu>
		</div>
	</div>
</template>

<script>
	import SubMenu from './SubMenu.vue'
	export default {
		components: {
			'sub-menu': SubMenu,
		},
		data() {
			return {
				navList: [
					{
						key: 'place/view/PlaceSchool',
						title: '场地信息管理',
					},
					// {
					//   key: 'studentLeave',//作为跳转的地址（具有语义的单词拼接）
					//   title: '在线请假',
					// },
					// {
					//   key: 'place',//作为跳转的地址（具有语义的单词拼接）
					//   title: '场地信息查询',
					// },
					// {
					//   key: 'place_apply',//作为跳转的地址（具有语义的单词拼接）
					//   title: '场地申请',
					// },
					// {
					//   key: 'place_add,',//作为跳转的地址（具有语义的单词拼接）
					//   title: '场地添加',
					// },
					// {
					//   key: 'place/pagination',//作为跳转的地址（具有语义的单词拼接）
					//   title: '场地申请',
					// },
					// {//一级菜单
					//   key: 'leaveRecords',
					//   title: '查看请假记录',
					// },
					
				/* 	{ //二级菜单
						key: 'place',
						title: '场地信息管理',
						children: [{
								key: 'place/view/PlaceQuery',
								title: '场地信息查询',
							},
							{
								key: 'place/view',
								title: '场地信息新增',
								children: [{
										key: 'place/view/PlaceAddSchool',
										title: "新增校区信息",
									},
									{
										key: 'place/view/PlaceAddArea',
										title: "新增功能区信息",
									},
									{
										key: 'place/view/PlaceAddField',
										title: "新增场地信息",
									},
								]
							}, 

							{
								key: 'place/view/PlaceApply',
								title: '场地申请',
							},
							{
								key: 'place/view/PlaceSchool',
								title: '校区信息',
							},
							{
								key: 'place/view/PlaceArea',
								title: '功能区信息',
							},
							{
								key: 'place/view/PlaceField',
								title: '场地信息',
							},
							{
								key: 'place/view/test',
								title: '测试',
							},

						],
					}, */

					// {//三级菜单
					//   key: 'menu4',
					//   title: 'menu4',
					//   children: [{
					//       key: 'menu4-item1',
					//       title: 'menu4-item1',
					//       children: [{
					//           key: 'sub4-item1',
					//           title: 'sub4-item1',
					//         },
					//         {
					//           key: 'sub4-item2',
					//           title: "sub4-item2",
					//         },
					//         {
					//           key: 'sub4-item3',
					//           title: "sub4-item3",
					//         }
					//       ]
					//     },
					//     {
					//       key: 'menu4.2',
					//       title: 'menu4.2',
					//     }
					//   ],
					// },

				],
			}
		},
		methods: {
			changeUrl(url) {
				this.$router.push('/home/' + url);
			}

		},

	}
</script>

<style scoped>
	.nav {
		width: 15%;
		min-width: 120px;
		background: #2C3B48;
		color: rgba(255, 255, 255, .8);
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		overflow: hidden;
	}

	.nav-h4 {
		width: 100%;
		height: 59px;
		min-width: 120px;
		line-height: 59px;
		text-align: center;
		color: #fff;
		font-weight: bold;
		border-bottom: 1px solid #4b545c;
	}

	.side-bar {
		width: 110%;
		height: 100vh;
		min-width: 120px;
		overflow-y: scroll;
		overflow-x: hidden;
		padding-bottom: 50%;
	}

	.ant-menu {
		background: #2C3B48 !important;
	}
</style>
