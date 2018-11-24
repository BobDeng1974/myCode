<!--   
    name：紧急避险角色档案信息添加页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：suny
    date：2018.10.8
-->
<template>
    <div style="width:1200px;height:800px;margin:50px auto;">
        <div style="width:1180px;height:48px;line-height:48px;padding-left:20px;background-color:#F8F8F8;">
            <div style="float:left;height:48px;line-height:48px;">
                <span style="font-size:16px;">添加角色信息 </span>
                <span style="font-size:12px;color:#999999">“
                    <span style="color:red;"> * </span>”为必填项</span>
            </div>
            <div style="float:right;font-size:14px;height:48px;line-height:48px;margin-right:20px;"><a href="#">角色档案信息</a><span style="color:#999999"> > 添加角色档案信息</span></div>
        </div>
        <div class="child-userRoleAdd-center">
            <div class="child-userRoleAdd-centerbox">
                <img>
                <span style="font-size:14px;color:#999999;">角色档案信息</span>
            </div>
        </div>
        <div class="common-userRoleAdd-divt" >
            <div class="common-userRoleAdd-divm" ><img>角色档案信息</div>
            <div class="common-userRoleAdd-form" style="width:100%;background-color:#fff;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
                    <el-row>
                    <el-col :span=6>
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="ruleForm.roleName" class="sys-common-input" style="border:none;width:200px"></el-input>
                    </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span=6>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="ruleForm.remark" class="sys-common-input" style="border:none;width:200px"></el-input>
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
      return {
         ruleForm: {
          roleName: '',
          remark:''
        },
        rules: {
          roleName: [
            { required: true, message: '请填写角色名称', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        let  param = {
                    roleName: _this.ruleForm.roleName,
                    remark:_this.ruleForm.remark
                };
        console.log(param);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            ajax.post(_this.global_.apiUrlJj + "/post/role", param).then(response=>{
            if (response.data.isSuccess) {
                            
                            _this.$message({
                            showClose: true,
                            message: "保存成功！",
                            type: "success"
                            });
                _this.$router.push({name:"sm_user_userrole"});
                } else {
                            _this.$message({
                            message: "保存失败！"
                            });
                        }
            
            }).catch(function(err){
                console.log(err)
            });
          } else {
            console.log('保存失败！');
            return false;
          }
        });
    },
    resetForm(formName) {
        let _this = this;
        _this.$router.push({name:"sm_user_userrole"});
      }
      
    }
  }
</script>
<style>
    .common-userRoleAdd-divt {
        width:1198px;
        border-top:1px solid #E4E4E4;
        box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);
    }
    .common-userRoleAdd-divm {
        width:1179px;
        height:38px;
        line-height:38px;
        padding-left:20px;
        font-size:14px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;color:rgba(30,30,30,1);
    }
    /* el-form begin */
    .common-userRoleAdd-form .el-form{
        margin: 0px auto !important;
        width: 1150px !important;
        height: 140px !important;
        
    }
    .el-input--mini .el-input__inner{
        box-shadow: 0px 0px 6px 0px rgba(25,107,255,0.1) !important; 
    }
    .child-userRoleAdd-center{width:1198px;height:98px;line-height:98px;border:1px solid #E4E4E4;background-color:#fff;box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);}
    .child-userRoleAdd-centerbox{width:1160px;height:56px;line-height:56px;border:1px dashed #CCCCCC;text-align:center;margin-left:20px;margin-top:18px;background-color:#F8F8F8;}
</style>
