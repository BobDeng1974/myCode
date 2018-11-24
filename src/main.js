// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto';
import 'babel-polyfill';
import 'es6-promise/auto';
import {
    polyfill
} from '@yanhaijing/console_js';
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/icon/iconfont.css'; //导入自定义icon
import echarts from 'echarts'; //导入echarts
import router from './router';
import VueJsonp from 'vue-jsonp'
import './utils/http.js'
import './utils/index.js'
import './utils/Global'

Vue.config.productionTip = false
// polyfill();
Vue.use(VueJsonp)
Vue.use(ElementUI, {
    // size: 'small'
});
Vue.prototype.$echarts = echarts;

/******************  router路由鉴权  *******************/
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = Vue.prototype.appConfig.getAccount();
    //如果未登录且路径非登录，则转发到Login
    if (to.path == '/dydp') {
        next();
    } else {
        if (!role && to.path !== '/login') {
            next('/login');
        } else if (to.meta.permission) {
            role == 'admin' ? next() : next('/403');
        } else {
            next();
            // if (navigator.userAgent.indexOf('MSIE') > -1) {
            //     Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
            //         confirmButtonText: '确定'
            //     });
            //     next();
            // } else {
            //     next();
            // }
        }
    }

});
//逆地址解析
Vue.filter("bdmapGetLocation", function (lng, lat) {
    if (!lng || !lat) return;
    let pt = new BMap.Point(lng, lat);
    let geoc = new BMap.Geocoder();
    let addStr = '';
    geoc.getLocation(pt, function (rs) {
        let addComp = rs.addressComponents;
        addStr = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
        console.log(addStr);
    });
    return addStr;
});
//文本长度截取
Vue.filter("textFormat", function (textStr, length, isAdd) {
    if (!textStr || !length) return "";
    if (textStr.length <= length || length == 0) return textStr;
    let textS = textStr.substring(0, length);
    if (isAdd) textS += "...";
    return textS;
});
//数字小数点后几位 
Vue.filter("numFormat", function (x, length) {
    if (!length || typeof x != 'number') return x;
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + length) {
        s += '0';
    }
    return s;
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    render: h => h(App),
    data: {
        eventHub: new Vue()
    },
    template: '<App/>',
    beforeCreate: function () {
        // console.log('beforeCreate 创建前状态===============》');
    },
    created: function () {
        // console.log('created 创建完毕状态===============》');
    },
    beforeMount: function () {
        // console.log('beforeMount 挂载前状态===============》');
    },
    mounted: function () {
        // console.log('mounted 挂载结束状态===============》');
    },
    beforeUpdate: function () {
        // console.log('beforeUpdate 更新前状态===============》');
    },
    updated: function () {
        // console.log('updated 更新完成状态===============》');
    },
    beforeDestroy: function () {
        // console.log('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function () {
        // console.log('destroyed 销毁完成状态===============》');
    }
}).$mount('#app');
