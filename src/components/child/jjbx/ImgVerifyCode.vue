<!--   
    name：验证码组件
    desc：根据接口地址获取验证码图片，并实现加载前loading显示
    param：apiUrl 接口地址        
    return Value : None
    author：wenls 
    date：2018.8.27
--> 
<template>
    <div>
        <div v-loading="loading" element-loading-spinner="el-icon-jjbx-load" element-loading-background="rgba(255,255,255, 0.49)" style="width: 96px;height:38px;">
            <img ref="verCode" :src="url" @click="replaceImgUrl()" width="96" height="38">
        </div>
    </div>
</template>
<script>
    export default {
        props: ['src'], // 父组件传过来所需的url
        data() {
            return {
                loading: true,
                apiUrl:'/get/captcha-image', // apiurl地址
                url: ''
            };
        },
        components: {},
            computed: {},
            mounted() { 
                let _this = this;
                _this.replaceImgUrl();
                _this.$refs.verCode.onload = () => {
                    setTimeout(() => {
                        _this.loading = false;
                    }, 500);
                }
            },
        methods: {
            replaceImgUrl() {//重写获取验证码
                this.loading = true; 
                this.url = this.global_.apiUrlJj + this.apiUrl + "?d=" + Math.floor(Math.random () * 900) + 100;
            }
        },
        beforeDestroy() {}
    }

</script>
<style scoped>


</style>
