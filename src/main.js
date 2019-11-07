// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import PlaceGlobal from './pages/place/components/PlaceGlobal.js'

import {
	Menu,
	Icon,
	Badge,
	message,
	Pagination,
	autoComplete,
	input,
	button,
	table,
	cascader,
	popconfirm,
	modal,
	drawer,
	form,
	select,
	radio,
	upload,
	datePicker,

} from 'ant-design-vue'
import "./assets/styles/css/reset.css"
import "./assets/styles/css/iconfont.css"
import './assets/styles/css/content.css'

Vue.use(Menu);
Vue.use(Icon);
Vue.use(Badge);
Vue.use(message);
Vue.use(Pagination);
Vue.use(autoComplete);
Vue.use(input);
Vue.use(button);
Vue.use(table);
Vue.use(cascader);
Vue.use(popconfirm);
Vue.use(modal);
Vue.use(drawer);
Vue.use(form);
Vue.use(select);
Vue.use(radio); 
Vue.use(upload);
Vue.use(datePicker);
Vue.prototype.$message = message
Vue.config.productionTip = false
axios.defaults.withCredentials = true //解决sessionId不一致问题：跨域共享session
Vue.prototype.$qs = qs //qs.stringify()将对象 序列化成URL的形式，以&进行拼接
Vue.use(VueAxios, axios) //axios结合vue-axios使用
Vue.prototype.placeGlobal=PlaceGlobal

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
