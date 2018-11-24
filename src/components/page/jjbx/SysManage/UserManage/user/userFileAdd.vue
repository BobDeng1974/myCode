<!--   
    name：紧急避险车辆人员档案信息添加页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：suny
    date：2018.9.27
-->
<template>
    <div class="common-userfileAdd-div">
        <div class="common-userfileAdd-head" >
            <div style="float:left;height:48px;line-height:48px;">
                <span style="font-size:16px;">添加用户档案信息 </span>
                <span style="font-size:12px;color:#999999">“
                    <span style="color:red;"> * </span>”为必填项</span>
            </div>
            <div class="common-userfileAdd-M" ><a href="#">用户档案信息</a><span style="color:#999999"> > 添加用户档案信息</span></div>
        </div>
        <div class="child-userfileAdd-center">
            <div class="child-userfileAdd-centerbox">
                <img>
                <span style="font-size:14px;color:#999999;">用户档案信息</span>
            </div>
        </div>
        <div class="common-userfileAdd-F">
            <div class="common-userfileAdd-B"><img>用户档案信息</div>
            <div class="common-userfileAdd-form">
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
                        <el-form-item label="组织机构" prop="orgname">
                            <span>
                                <el-cascader :options="options" filterable change-on-select v-model="ruleForm.orgname" class="sys-common-select" :props="props" style="width:400px">
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
import { Loading } from 'element-ui';
  export default {
    data() {
    var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
            }
        }
    };
     var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('用户名为手机号，请输入正确的手机号'));
            }
        }
    };

      return {
        props: {
                
                value: "id"

            },
        selectRole:[],
        options:[],
        ruleForm: {
          loginName: '',
          loginPwd: '',
          phone: '',
          orgname:[],
          roleName:''
        },
        rules: {
          loginName: [
            { required: true,validator: checkName, trigger: 'blur' },
          ],
          orgname: [
                { required: true,message: '请选组织机构', trigger: 'blur' }
            ],
          phone: [
            {required: true,  validator: checkPhone, trigger: 'blur'}
          ],
          roleName: [
                { required: true,message: '请选用户角色', trigger: 'blur' }
            ]
        },
        labelPosition:'left'
      }
    },
    created(){
        let _this = this;
        this.getData();
        this.getRole();
    },
    methods: {
        getData() {
                let _this = this;
                var data = [];
                
                let url = _this.global_.apiUrlJj + "/get/select-organ?id=2" ;
                
                ajax.get(url).then(function (res) {
                    
                   if(res.data){
                    if(res.data.data){
                        _this.options = res.data.data;      
                        
                    }
                }
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        getRole() {
                let _this = this;
                ajax
                    .get(_this.global_.apiUrlJj + "/get/role-all")
                    .then(function (res) {
                        console.log(res);
                        // var obj = {}
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
            this.$refs[formName].validate((valid) => {
            if (valid) {
            let _this = this;
            let  param = {
                            loginName: _this.ruleForm.loginName,
                            loginPwd: '123.abc',
                            phone: _this.ruleForm.phone,

                            
                    };
                    let organId=_this.ruleForm.orgname[_this.ruleForm.orgname.length-1]
                    let roleId =_this.ruleForm.roleName
                    let organParentsId =_this.ruleForm.orgname
                    console.log(organId+"     "+roleId+"        "+organParentsId)
            
            ajax.post(_this.global_.apiUrlJj + "/post/save-account?organId="+organId+"&roleId="+roleId+"&organParentsId="+organParentsId, param).then(response=>{
            
            if (response.data.isSuccess) {
                            
                            _this.$message({
                            showClose: true,
                            message: "保存成功！",
                            type: "success"
                            });
                _this.$router.push({name: "sm_user_userfiles"});
                } else {
                            _this.$message({
                            message: "保存失败！"
                            });
                        }
            }).catch(function(err){
                console.log(err)
            });
        } else {
            console.log('error submit!!');
            return false;
          }
         });
    },
      resetForm(formName) {
        let _this = this;
        _this.$router.push({name:"sm_user_userfiles"});
      }
    }
  }
</script>
<style>
    .child-userfileAdd-center{width:1198px;height:98px;line-height:98px;border:1px solid #E4E4E4;background-color:#fff;box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);}
    .child-userfileAdd-centerbox{width:1160px;height:56px;line-height:56px;border:1px dashed #CCCCCC;text-align:center;margin-left:20px;margin-top:18px;background-color:#F8F8F8;}
    .common-userfileAdd-div{
        width:1200px;
        height:800px;
        margin:50px auto;
    }
    .common-userfileAdd-div .common-userfileAdd-head{
        width:1180px;
        height:48px;
        line-height:48px;
        padding-left:20px;
        background-color:#F8F8F8;
    }
    .common-userfileAdd-div .common-userfileAdd-M{
        float:right;
        font-size:14px;
        height:48px;
        line-height:48px;
        margin-right:20px;
    }
    .common-userfileAdd-div .common-userfileAdd-F{
        width:1198px;
        border-top:1px solid rgba(228, 228, 228, 0.308); 
        border-bottom:1px solid rgba(228, 228, 228, 0.075);
        box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);
        height: 240px;
    }
    .common-userfileAdd-div .common-userfileAdd-F .common-userfileAdd-B{
        width:1179px;
        height:38px;
        line-height:38px;
        padding-left:20px;
        font-size:14px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(30,30,30,1);
    }
    /* el-form begin */
    .common-userfileAdd-form .el-form{
        margin: 0px auto !important;
        width: 1150px !important;
        height: 140px !important;
        
    }
    .el-input--mini .el-input__inner{
        box-shadow: 0px 0px 6px 0px rgba(25,107,255,0.1) !important;
    }
    
    .common-userfileAdd-form .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9 !important;
        border-radius: 6px !important;
        cursor: pointer !important;
        position: relative !important;
        overflow: hidden !important;
    }
    .common-userfileAdd-form .avatar-uploader .el-upload:hover {
        border-color: #409EFF !important;
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
</style>
