<!--   
    name：紧急避险用户档案信息编辑页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：suny
    date：2018.10.8
-->
<template>
    <div class="common-userfileEdit-div">
        <div class="common-userfileEdit-head">
            <div style="float:left;height:48px;line-height:48px;">
                <span style="font-size:16px;">修改用户档案信息 </span>
            </div>
            <div class="common-userfileEdit-M">
                <a href="#">用户档案信息</a>
                <span style="color:#999999"> > 修改用户档案信息</span>
            </div>
        </div>
        <!-- <div class="child-userfileEdit-center">
            <div class="child-userfileEdit-centerbox">
                <img>
                <span style="font-size:14px;color:#999999;">用户档案信息</span>
            </div>
        </div> -->
        <div class="common-userfileEdit-F">
            <div class="common-userfileEdit-B"><img>用户档案信息</div>
            <div class="common-userfileEdit-form" style="width:100%;background-color:#fff;">
                <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="mini" label-width="110px">
                    <el-row>

                        <el-form-item label="编号" prop="id" style="width:30%;float:left" v-show="false">
                            <el-input v-model="ruleForm.id"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col :span=7>
                        <el-form-item label="登录名" prop="loginName" >
                            <el-input v-model="ruleForm.loginName" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span=7>
                        <el-form-item label="手机号" prop="phone" >
                            <el-input v-model.number="ruleForm.phone" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                        </el-col>
                    
                        <el-col :span=7>
                        <el-form-item label="用户角色"  prop="roleName">
                            <el-select v-model="ruleForm.roleName" placeholder="请选择" class="sys-common-select">
                                <el-option v-for="item in selectRole" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        </el-row>
                    <el-row>
                        <el-col :span=10>
                        <el-form-item label="组织机构" prop="orgname" v-loading="orgLoad" >
                            <span>
                                <el-cascader :options="options" filterable change-on-select v-model="ruleForm.orgname" class="sys-common-select" :props="props" style="width:400px" >
                                </el-cascader>
                            </span>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <div style="width:200px;margin:0px auto;">
                        <el-button style="width:70px;height:35px;padding:10px 20px" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                        <el-button style="width:70px;height:35px;padding:10px 20px" type="primary" @click="resetForm('ruleForm')">返回</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import ajax from "axios";
export default {
    data() {
        var checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("手机号不能为空"));
            } else {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
                console.log(reg.test(value));
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error("请输入正确的手机号"));
                }
            }
        };
        var checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("用户名不能为空"));
            } else {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
                console.log(reg.test(value));
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(
                        new Error("用户名为手机号，请输入正确的手机号")
                    );
                }
            }
        };
        return {
            props: {
                value: "id"
            },
            options: [],
            selectedOptions3: [],
            selectRole: [],
            valued: "",
            orgLoad:false,
            ruleForm: {
                loginName: "",
                loginPwd: "",
                phone: "",
                orgname: [],
                roleName: "",
                page: ""
            },
            rules: {
                loginName: [
                    { required: true, validator: checkName, trigger: "blur" }
                ],
                orgname: [
                    {
                        required: true,
                        message: "请选组织机构",
                        trigger: "blur"
                    }
                ],
               
                phone: [
                    { required: true, validator: checkPhone, trigger: "blur" }
                ],
                roleName: [
                    {
                        required: true,
                        message: "请选用户角色",
                        trigger: "blur"
                    }
                ]
            },
             labelPosition:'left'
        };
    },
    created() {
        this.getInfo();
        this.getData();
        this.getRole();
    },
    watch: {
        $route: "getInfo"
    },
    beforeRouteLeave(to, from, next) {
        let _this = this;
        if (to.name == "sm_user_userfiles") {
        to.query.temp = this.ruleForm.page;
        }
        next();
    },
    methods: {
      getInfo(){
          let _this = this;
          let data=[];
          const routerParams = this.$route.query.userId
          _this.ruleForm.page = this.$route.query.page
          ajax.get(_this.global_.apiUrlJj+"/get/select-account-id?id="+routerParams).then(res => {
              
            if (res.status === 200) {
                _this.ruleForm.id = res.data.data.content.id
                _this.ruleForm.loginName = res.data.data.content.login_name
                _this.ruleForm.phone=res.data.data.content.phone
                _this.ruleForm.orgname=res.data.data.content.organ_parents_id.split(",").map(Number)
                _this.ruleForm.roleName=res.data.data.roleId
                
            } else {
            this.$message({
            message: "获取信息失败," + res.message,
            type: "error"
            });
            }
        });
      },
        getData() {
            let _this = this;
            var data = [];
            _this.orgLoad=true;
            let url = _this.global_.apiUrlJj + "/get/select-organ?id=2";

            ajax
                .get(url)
                .then(function(res) {
                    _this.orgLoad=false;
                    if (res.data) {
                        if (res.data.data) {
                            _this.options = res.data.data;
                        }
                    }

                })
                .catch(function(error) {
                    _this.orgLoad=false;
                    console.log(error);
                });
        },
        getRole() {
            let _this = this;
            ajax
                .get(_this.global_.apiUrlJj + "/get/role-all")
                .then(function(res) {
                    if (res.data) {
                        if (res.data.data) {
                            res.data.data.forEach((item, index) => {
                                _this.selectRole.push({
                                    id: item.id,
                                    text: item.roleName
                                });
                            });
                        }
                    }
                });
        },
        submitForm(formName) {
            let _this = this;
            let page = _this.ruleForm.page;
            let param = {
                loginName: _this.ruleForm.loginName,
                phone: _this.ruleForm.phone
            };
            let organId =
                _this.ruleForm.orgname[_this.ruleForm.orgname.length - 1];
            let roleId = _this.ruleForm.roleName;
            let organParentsId = _this.ruleForm.orgname;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    ajax
                        .post(
                            _this.global_.apiUrlJj +
                                "/post/update-account?id=" +
                                _this.ruleForm.id +
                                "&organId=" +
                                organId +
                                "&roleId=" +
                                roleId +
                                "&organParentsId=" +
                                organParentsId,
                            param
                        )
                        .then(response => {
                            if (response.data.isSuccess) {
                            
                            _this.$message({
                            showClose: true,
                            message: "保存成功！",
                            type: "success"
                            });
                           _this.$router.push({
                                name: "sm_user_userfiles"
                            });
                            } else {
                                        _this.$message({
                                        message: "保存失败！"
                                        });
                                    }
                            
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                } else {
                    console.log("保存失败！");
                    return false;
                }
            });
        },

        resetForm(formName) {
            let _this = this;
            _this.$router.push({ name: "sm_user_userfiles" });
        }
    }
    
};
</script>
<style>
.child-userfileEdit-center {
    width: 1198px;
    height: 98px;
    line-height: 98px;
    border: 1px solid #e4e4e4;
    background-color: #fff;
    box-shadow: 0px 0px 8px 0px rgba(47, 149, 244, 0.16);
}
.child-userfileEdit-centerbox {
    width: 1160px;
    height: 56px;
    line-height: 56px;
    border: 1px dashed #cccccc;
    text-align: center;
    margin-left: 20px;
    margin-top: 18px;
    background-color: #f8f8f8;
}
.common-userfileEdit-div {
    width: 1200px;
    height: 800px;
    margin: 50px auto;
}
.common-userfileEdit-div .common-userfileEdit-head {
    width: 1180px;
    height: 48px;
    line-height: 48px;
    padding-left: 20px;
    background-color: #f8f8f8;
}
.common-userfileEdit-div .common-userfileEdit-M {
    float: right;
    font-size: 14px;
    height: 48px;
    line-height: 48px;
    margin-right: 20px;
}
.common-userfileEdit-div .common-userfileEdit-F {
    width: 1198px;
    border-top: 1px solid rgba(228, 228, 228, 0.308);
    border-bottom: 1px solid rgba(228, 228, 228, 0.075);
    box-shadow: 0px 0px 8px 0px rgba(47, 149, 244, 0.16);
    height: 240px;
}
.common-userfileEdit-div .common-userfileEdit-F .common-userfileEdit-B {
    width: 1179px;
    height: 38px;
    line-height: 38px;
    padding-left: 20px;
    font-size: 14px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(30, 30, 30, 1);
}
/* el-form begin */
.common-userfileEdit-form .el-form {
    margin: 0px auto !important;
    width: 1150px !important;
    height: 140px !important;
}
.el-input--mini .el-input__inner {
    box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1) !important;
}

.common-userfileEdit-form .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px !important;
    cursor: pointer !important;
    position: relative !important;
    overflow: hidden !important;
}
.common-userfileEdit-form .avatar-uploader .el-upload:hover {
    border-color: #409eff !important;
}
.avatar-uploader-icon {
    font-size: 28px !important;
    color: #8c939d !important;
    width: 178px !important;
    height: 178px !important;
    line-height: 178px !important;
    text-align: center !important;
}
.avatar {
    width: 178px !important;
    height: 178px !important;
    display: block !important;
}
    /* .common-userfileEdit-form .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus
    {
        border-color:#dcdfe6 !important;
    } */
</style>
