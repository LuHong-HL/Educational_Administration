import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import Announcement from '@/pages/announcement/Announcement'
import StudentLeave from '@/pages/studentLeave/StudentLeave'
import PlaceQuery from '@/pages/place/view/PlaceQuery'
import PlaceApply from '@/pages/place/view/PlaceApply'

import PlaceAddSchool from '@/pages/place/view/PlaceAddSchool'
import PlaceAddArea from '@/pages/place/view/PlaceAddArea'
import PlaceAddField from '@/pages/place/view/PlaceAddField'

import PlaceSchool from '@/pages/place/view/PlaceSchool'
import PlaceArea from '@/pages/place/view/PlaceArea'
import PlaceField from '@/pages/place/view/PlaceField'
import Test from '@/pages/place/view/Test'
import PlaceUpdateSchool from '@/pages/place/view/PlaceUpdateSchool'
import PlaceUpdateArea from '@/pages/place/view/PlaceUpdateArea'
import PlaceUpdateField from '@/pages/place/view/PlaceUpdateField'
import PlaceCreateDepartment from '@/pages/place/view/PlaceCreateDepartment'
import PlaceCreateUser from '@/pages/place/view/PlaceCreateUser'
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'Login',
			component: Login
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
			children: [{
					path: 'announcement',
					name: 'Announcement',
					component: Announcement
				},
				{
					path: 'studentLeave',
					name: 'StudentLeave',
					component: StudentLeave
				},
				{
					path: 'place/view/PlaceQuery',
					name: 'PlaceQuery',
					component: PlaceQuery
				},
				{
					path: 'place/view/PlaceApply',
					name: 'PlaceApply',
					component: PlaceApply
				},
				{
					path: 'place/view/PlaceAddSchool',
					name: 'placeAddSchool',
					component: PlaceAddSchool,
				},
				{
					path: 'place/view/PlaceAddArea',
					name: 'placeAddArea',
					component: PlaceAddArea,
				},
				{
					path: 'place/view/PlaceAddField',
					name: 'placeAddField',
					component: PlaceAddField,
				},
				
				{
					path: 'place/view/PlaceSchool',
					name: 'PlaceSchool',
					component: PlaceSchool,
				},
				{
					path: 'place/view/PlaceArea',
					name: 'PlaceArea',
					component: PlaceArea,
				},
				{
					path: 'place/view/PlaceField',
					name: 'PlaceField',
					component: PlaceField,
				},
				{
					path: 'place/view/Test',
					name: 'test',
					component: Test,
				},
				{
					path: 'place/view/PlaceUpdateSchool',
					name: 'placeUpdateSchool',
					component: PlaceUpdateSchool,
				},
				{
					path: 'place/view/PlaceUpdateArea',
					name: 'placeUpdateArea',
					component: PlaceUpdateArea,
				},
				{
					path: 'place/view/PlaceUpdateField',
					name: 'placeUpdateField',
					component: PlaceUpdateField,
				},
				{
					path: 'place/view/PlaceCreateDepartment',
					name: 'placeCreateDepartment',
					component: PlaceCreateDepartment,
				},
				{
					path: 'place/view/PlaceCreateUser',
					name: 'placeCreateUser',
					component: PlaceCreateUser,
				},
			]
		}
	]
})
