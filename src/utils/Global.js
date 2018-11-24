import Vue from 'vue'
const appConfig = {
    apiUrl: Object.freeze({
        apiUrlDy: "http://47.105.126.92:18185", //http://47.105.126.92:18182  东营大屏
        apiUrlJj: "http://192.168.80.184:8089" //  紧急避险  
    }),
    appId: 'ydkj.com',
    /* 保存自动登陆用户信息 */
    saveUserInfo: function(user) {
        localStorage.setItem(this.appId + "_user", JSON.stringify(user));
    },
    /* 获取自动登录用户信息 */
    getUserInfo: function(){
        return JSON.parse(localStorage.getItem(this.appId + "_user"));
    },
    /* 删除自动登录用户信息 */
    removeUserInfo: function() {
        localStorage.removeItem(this.appId + "_user");
    },
    /* 保存用户账户 */
    saveAccount: function(account)  {
        let _this = this;
        localStorage.setItem(_this.appId + "_account", JSON.stringify(account));
    },
    /* 获取用户账户 */
    getAccount: function() {
        return JSON.parse(localStorage.getItem(this.appId + "_account"));
    },
    /* 删除用户账户 */
    removeAccount: function() {
        localStorage.removeItem(this.appId + "_account");
    }
};
Vue.prototype.global_ = appConfig.apiUrl;
Vue.prototype.appConfig = appConfig;
