<!--   
    name：紧急避险角色档案信息编辑页面
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
                <span style="font-size:16px;">修改角色信息 </span>
            </div>
            <div class="common-userRoleEdit-title"><a href="#">角色档案信息</a><span style="color:#999999"> > 修改角色档案信息</span></div>
        </div>
        <div class="common-userRoleEdit-divt" >
            <div class="common-userRoleEdit-divm" ><img>角色档案信息</div>
            <div class="common-userRoleEdit-form" style="width:100%;background-color:#fff;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini" style="border:0px">
                    <el-row>
                    <el-col :span=8>
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="ruleForm.roleName" class="sys-common-input" style="border:none;width:200px"  ></el-input>
                    </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span=8>
                    <el-form-item label="备注" prop="roleRemark">
                        <el-input v-model="ruleForm.roleRemark" class="sys-common-input" style="border:none;width:200px"></el-input>
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
          roleRemark:'',
          page:''
        },
        rules: {
          roleName: [
            { required: true, message: '请填写角色名称', trigger: 'blur' },
          ]
        }
      }
    }, 
    created() {
            this.getInfo();
        },
    watch: {
        '$route': 'getInfo'
    },
    beforeRouteLeave(to, from, next) {
        let _this = this;
        if (to.name == "sm_user_userrole") {
        to.query.temp = _this.ruleForm.page;
        }
        next();
    },
    methods: {
      getInfo(){
          
          let _this=this;
            const routerParams = this.$route.query.id
          _this.ruleForm.page = this.$route.query.page
          ajax.get(_this.global_.apiUrlJj+"/get/select-role?id="+routerParams).then(res => {
            if (res.status === 200) {
                _this.ruleForm.id = res.data.data.id
                _this.ruleForm.roleName = res.data.data.roleName
                _this.ruleForm.roleRemark=res.data.data.remark
            
            } else {
            this.$message({
            message: "获取信息失败," + res.message,
            type: "error"
            });
            }
        });
      },
       
      submitForm(formName) {
        let _this = this;
        let page = _this.ruleForm.page
        let  param = {
                        id:_this.ruleForm.id,
                        roleName: _this.ruleForm.roleName,
                        remark:_this.ruleForm.roleRemark
                };
        this.$refs[formName].validate((valid) => {
          if (valid) {
            ajax.post(_this.global_.apiUrlJj + "/post/update-role?id="+_this.ruleForm.id, param).then(response=>{
           if (response.data.isSuccess) {
                            
                            _this.$message({
                            showClose: true,
                            message: "保存成功！",
                            type: "success"
                            });
                _this.$router.push({name:'sm_user_userrole'});
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
    .common-userRoleEdit-heade{
        width:1180px;
        height:48px;
        line-height:48px;
        padding-left:20px;
        background-color:#F8F8F8;
    }
    .common-userRoleEdit-title{
        float:right;
        font-size:14px;
        height:48px;
        line-height:48px;
        margin-right:20px;
    }
    .common-userRoleEdit-divt{
        width:1198px;
        border-top:1px solid #E4E4E4;
        border-bottom:1px solid #E4E4E4; 
        box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);
    }
    .common-userRoleEdit-divm{
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
    .common-userRoleEdit-form .el-form{
        margin: 0px auto !important;
        width: 1150px !important;
        height: 140px !important;
        border-bottom: 1px solid rgba(238,238,238,1) !important;
    }
    .el-input--mini .el-input__inner{
        box-shadow: 0px 0px 6px 0px rgba(25,107,255,0.1) !important;
    }
    
    /* .common-userRoleEdit-form .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus
    {
        border-color:#dcdfe6 !important;
    } */
</style>
