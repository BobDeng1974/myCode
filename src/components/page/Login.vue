<template>
    <div class="login-wrap" v-loading.fullscreen.lock="isLoading">
        <!-- <div class="ms-title">后台管理系统</div> -->
        <div class="ms-login">
            <!-- <div class="login-left">
                <img data-v-3e604c8c="" src="../../../static/img/login/logo-master.png">
            </div> -->
            <div class="login-right">
                <!-- <h4 data-v-3e604c8c="">
                    <img data-v-3e604c8c="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA4CAMAAABwmqASAAAAilBMVEVMaXE/arQ/arQ/arQ/arQ/arQ/arQ/arQ/arQ/arQ/arQ/arQ/arQ/arQ/arQ/arT///8/arRvj8f09vtjhsJLc7mrvt63x+NXfb3c5PHQ2uyftdro7fazxOI1YrFBa7by9fp7mcyAnM7Z4fB0k8mHotBnicRaf7/Azuemut2zw+H5+v3O2eysvt/w5KpwAAAAEHRSTlMAwLDgoPDQgBBAYFAwIHCQyxlsQAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdBJREFUSImtl9digzAMRU0gZWTUDiOB7Nl0/f/vlRFiY0ngQO9DXvCJJctcCcYw+a5li0q25froGkTBSOgaBd2Y544BV2jseu0gwVVsCzd9I7lCb1Nyw1auEL6t53SCQjhItl57pM+IAWoIIqhlCAphNUGTHGs5Kjh5ARRioiRJ1x/TWKYKL6oQqyTlnKfJCnk2qkEfeZjwWmvkaf32wHONUy61hKRFbrnkqhJqU1iRBW8K5lpWxoP/mGkkEm9xvAHMUgN5CMnAKFjOIzRc24BcgDU2YzMYiQkpZlhNIkDCNXldMAvZaGCKrHFRcq2RV2MyDju3JEgRqWgIa0KTKrpBQZIU8U/FfScxvoAg4/Xv9rHl+QspJkkeQ37a3Uvwvr/wDNt2jt2E0g8u+3P+u91dDvgZ+cjtq4zk8JGj292JOt4ZvPHHR4I5enuA+QHrAdvwLZO34PB5q48JOooD3+ymBUlpjhIAN9EunpTmKB5wsCsBao7iQNekgtUcxYdOrdue1FFZVXdCdVMqzWaXeM5WSkfKMt0QEPLZkTq6YLQoJcuidMH+nfe1bv/+TxPGgKmm/yQ1YHpjJhPjHOXYgCmV9Z+M2YBpvFDPL4BKJl8df2gUpu82xPZGAAAAAElFTkSuQmCC">
                </h4> -->
                <div style="height: 80px;margin-top:10px;">
                    <div style="position: relative;float: left;height: 100%;width:47%;line-height: 80px;">
                        <span style="font-size:33px; 
                        font-weight:400;
                        color:rgba(46,146,246,1);
                        line-height:80px;
                        opacity:0.2;">Log&nbsp;In</span>
                        <div style="position: absolute;top: 10px;left: 0;color:rgba(46,146,246,1);font-size:31px;
                        font-family:FZHTK--GBK1-0,黑体;height: 50px;line-height:70px;">
                            登录
                        </div>
                    </div>
                    <div style="float: left;height: 100%;width: 53%;line-height: 80px;">
                        <span style="font-size:13px; 
                            font-family: SimHei;
                            font-weight:400;
                            color:rgba(200,200,200,1);
                            line-height:80px; ">没有账户，前去<span
                                style="color:rgba(46,146,246,1);">注册</span></span>
                    </div>
                </div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                    <el-form-item prop="username" :error="errorMsg[0]">
                        <el-input prefix-icon="el-icon-jjbx-name" v-model="ruleForm.username" placeholder="请输入账户"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input prefix-icon="el-icon-jjbx-password" type="password" placeholder="请输入密码" v-model="ruleForm.password"
                            @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    </el-form-item>
                    <el-form-item prop="useryzm" :error="errorMsg[1]">
                        <el-col :span="12">
                            <el-input v-model="ruleForm.useryzm" placeholder="请输入验证码"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <img-verify ref="iVerCode" style="float: right;"></img-verify>
                        </el-col>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 15px;">
                        <el-col :span="12">
                            <el-checkbox-group v-model="ruleForm.type">
                                <el-checkbox label="记住密码" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                        <el-col :span="12" style="text-align: right;color:#2E92F6;">
                            忘记密码
                        </el-col>

                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm('ruleForm')" style="background-color:#2E92F6;">登录</el-button>
                    </div>
                </el-form>

                <div style="height: 30px;margin-top:10px;">
                    <div style="height:15px;border-bottom: 1px solid #2E92F6;width: calc( 50% - 40px );float: left;"></div>
                    <div style="height:30px;width: 80px;float: left;line-height:30px;text-align: center;color:#2E92F6;">
                        第三方登录
                    </div>
                    <div style="height:15px;border-bottom: 1px solid #2E92F6;width: calc( 50% - 40px );float: right;"></div>
                </div>
                <div style="height: 40px;margin-bottom: 10px;">
                    <div style="height:25px; width: calc( 50% - 40px );float: left;"></div>
                    <div style="height:40px;width: 80px;float: left;line-height:30px;text-align: center;">
                        <img src="../../../static/img/login/wx.png" style="width:23px;height: 23px;vertical-align: middle;margin-right: 6px;" />
                        <img src="../../../static/img/login/qq.png" style="width:23px;height: 23px;vertical-align: middle;" />
                    </div>
                    <div style="height:20px; width: calc( 50% - 40px );float: right;"></div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import ajax from "axios";
    import imgVerify from "@/components/child/jjbx/ImgVerifyCode.vue";
    export default {
        components: {
            imgVerify
        },
        data: function () {
            return {
                isLoading: false,
                errorMsg: ["", ""],
                ruleForm: {
                    username: "",
                    password: "",
                    useryzm: "",
                    type: []
                },
                rules: {
                    username: [{
                            required: true,
                            message: "请输入账户",
                            trigger: "blur"
                        },
                        {
                            min: 4,
                            max: 10,
                            message: "长度在 4 到 10 个字符",
                            trigger: "blur"
                        }
                    ],
                    password: [{
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }],
                    useryzm: [{
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur"
                    }]
                }
            };
        },
        beforeMount() {},
        mounted() {},
        methods: {
            submitForm(formName) {
                let _this = this;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let _this = this;
                        let postData = {
                            loginName: _this.ruleForm.username,
                            loginPwd: _this.ruleForm.password,
                            kaptchaName: _this.ruleForm.useryzm
                        };
                        _this.errorMsg = ["", ""];
                        _this.isLoading = true;
                        ajax.get(_this.global_.apiUrlJj + "/get/user", {
                                params: postData
                            }).then(function (res) {
                                _this.isLoading = false;
                                console.log(JSON.stringify(res));
                                if (res.data.isSuccess) {
                                    _this.appConfig.saveUserInfo(res.data.data);
                                    _this.appConfig.saveAccount(res.data.data.account.loginName);
                                    _this.$router.push("/main");
                                } else {
                                    switch (res.data.errCode) {
                                        case "1001":
                                            _this.$set(_this.errorMsg, 1, "验证码错误！");
                                            _this.$refs.iVerCode.replaceImgUrl();
                                            break;
                                        case "1002":
                                            _this.$set(_this.errorMsg, 0, "用户名或密码错误！");
                                            _this.$refs.iVerCode.replaceImgUrl();
                                            break;
                                        default:
                                            _this.$set(_this.errorMsg, 0, "其他原因错误！");
                                            _this.$refs.iVerCode.replaceImgUrl();
                                            break;
                                    }
                                }
                            })
                            .catch(function (error) {
                                _this.isLoading = false;
                                console.log(error);
                            });
                    } else {
                        _this.isLoading = false;
                        //     console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    };

</script>

<style>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url("../../../static/img/login/006.png");
        background-size: cover;
        background-repeat: no-repeat;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;
    }

    .ms-login {
        /* position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 160px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff; */
        width: 335px;
        /* height: 450px; */
        position: absolute;
        top: 20%;
        right: 12.9%;
        border-radius: 5px;
        z-index: 999;
    }

    .ms-login .login-left {
        width: 55%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        float: left;
    }

    .ms-login .login-right {
        padding: 0 55px;
        width: calc(100% - 110px);
        height: 100%;
        float: left;
        border-radius: 3px;
        background: #fff;
        position: relative;
    }

    .ms-login .login-right h4 {
        text-align: center;
        padding: 38px 0 15px;
    }
    .ms-login .login-right .el-input__inner {
        position: relative !important;
        font-size: 14px !important;
        display: inline-block !important;
        width: 100% !important;
        border-top-width: 0 !important;
        border-left-width: 0 !important;
        border-right-width: 0 !important;
        border-radius: 0 !important;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }

</style>
