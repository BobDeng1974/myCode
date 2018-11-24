<!--   
    name：紧急避险字典档案信息编辑页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：suny
    date：2018.9.19
-->
<template>
    <div style="width:1200px;height:800px;margin:50px auto;">
        <div style="width:1180px;height:48px;line-height:48px;padding-left:20px;background-color:#F8F8F8;">
            <div style="float:left;height:48px;line-height:48px;">
                <span style="font-size:16px;">修改字典档案信息 </span>
            </div>
            <div style="float:right;font-size:14px;height:48px;line-height:48px;margin-right:20px;"><a href="#">字典档案信息</a><span style="color:#999999"> > 修改字典档案信息</span></div>
        </div>
        <div class="common-dictEdit-divt" >
            <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm" size="mini">
                <div class="common-dictEdit-divm" ><img>字典档案信息</div>
                <div style="width:100%;background-color:#fff;padding-top:10px;">
                    <el-row>
                    <el-col :span=6>
                    <el-form-item label="编号" prop="dictNum">
                        <el-input v-model="ruleForm.dictNum" class="sys-common-input" style="border:none;"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span=6>
                    <el-form-item label="编号名称" prop="dictNumName">
                        <el-input v-model="ruleForm.dictNumName" class="sys-common-input" style="border:none;"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span=6>
                    <el-form-item label="值" prop="dictValue">
                        <el-input v-model="ruleForm.dictValue" class="sys-common-input" style="border:none;"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span=6>
                    <el-form-item label="描述" prop="dictDesc">
                        <el-input v-model="ruleForm.dictDesc" class="sys-common-input" style="border:none;"></el-input>
                    </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span=6>
                    <el-form-item label="排序序号" prop="orderOrderNum">
                        <el-input v-model.number="ruleForm.orderOrderNum" class="sys-common-input" style="border:none;"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span=6>
                    <el-form-item label="字典类型" prop="type" >
                        <el-input v-model="ruleForm.type" class="sys-common-input" style="border:none;"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span=6>
                    <el-form-item label="状态" prop="status">
                        <el-input v-model.number="ruleForm.status" class="sys-common-input" style="border:none;"></el-input>
                    </el-form-item>
                    </el-col>         
                    <el-col :span=6>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="ruleForm.remark" class="sys-common-input" style="border:none;"></el-input>
                    </el-form-item>
                    </el-col>
                    </el-row>
                </div>
                    <div style="width:200px;margin:0px auto;">
                        <el-button style="width:70px;height:35px;padding:10px 20px" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                        <el-button style="width:70px;height:35px;padding:10px 20px" type="primary" @click="resetForm('ruleForm')">返回</el-button>
                    </div>
                </el-form>
            </div>
        </div>
</template>
<script>
import ajax from "axios";
export default {
  data() {
    return {
      page: "",
      ruleForm: {
        dictNum: "",
        dictNumName: "",
        dictValue: "",
        dictDesc: "",
        orderOrderNum: "",
        type: "",
        status: "",
        remark: ""
      },
      rules: {
        dictNum: [
            { required: true, message: '请填写编号', trigger: 'blur' },
          ],
          dictNumName: [
            { required: true, message: '请填写编号名称', trigger: 'blur' }
          ],
          status: [
            {required: true, message: '请填写编号状态',trigger:'blur'}
          ],
            orderOrderNum: [
            {required: true, message: '请填写排序序号', trigger:'blur' }
          ],
          dictValue: [
            { required: true, message: '请填写值', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请填写字典类型', trigger: 'blur' }
          ]
      },
      labelPosition:'left'
    };
  },
  created() {
    this.getInfo();
  },
  beforeRouteLeave(to, from, next) {
    let _this = this;
    if (to.name == "sm_user_userDictionary") {
      to.query.temp = _this.page;
    }
    next();
  },
  methods: {
    getInfo() {
      let _this = this;
      const routerParams = this.$route.query.userId;
      _this.page = this.$route.query.page;
      ajax
        .get(_this.global_.apiUrlJj + "/get/select-dict?id=" + routerParams)
        .then(res => {
          if (res.status === 200) {
            _this.ruleForm.id = routerParams;
            _this.ruleForm.dictNum = res.data.data.dictNum;
            _this.ruleForm.dictNumName = res.data.data.dictNumName;
            _this.ruleForm.dictValue = res.data.data.dictValue;
            _this.ruleForm.dictDesc = res.data.data.dictDesc;
            _this.ruleForm.orderOrderNum = res.data.data.orderOrderNum;
            _this.ruleForm.type = res.data.data.type;
            _this.ruleForm.status = res.data.data.status;
            _this.ruleForm.remark = res.data.data.remark;
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
      let page = _this.page;
      console.log(page);
      let param = {
        id: _this.ruleForm.id,
        orderOrderNum: _this.ruleForm.orderOrderNum,
        dictNum: _this.ruleForm.dictNum,
        dictNumName: _this.ruleForm.dictNumName,
        type: _this.ruleForm.type,
        dictValue: _this.ruleForm.dictValue,
        status: _this.ruleForm.status,
        dictDesc: _this.ruleForm.dictDesc,
        remark: _this.ruleForm.remark
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          ajax
            .post(
              _this.global_.apiUrlJj +
                "/post/update-dict?id=" +
                _this.ruleForm.id,
              param
            )
            .then(response => {
              if (response.data.isSuccess) {
                            
                            _this.$message({
                            showClose: true,
                            message: "保存成功！",
                            type: "success"
                            });
                 _this.$router.push({ name: "sm_user_userDictionary" });
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
      _this.$router.push({ name: "sm_user_userDictionary" });
    }
  }
};
</script>
<style>
    .child-dictEdit-center{width:1198px;height:98px;line-height:98px;border:1px solid #E4E4E4;background-color:#fff;box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);}
    .child-dictEdit-centerbox{width:1160px;height:56px;line-height:56px;border:1px dashed #CCCCCC;text-align:center;margin-left:20px;margin-top:18px;background-color:#F8F8F8;}
    .common-dictEdit-divt {
        width:1198px;
        border-top:1px solid #E4E4E4;
        box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);
        height: 200px;
    }
    .common-dictEdit-divm {
        width:1179px;
        height:38px;
        line-height:38px;
        padding-left:20px;
        font-size:14px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;color:rgba(30,30,30,1);
    }
    /* el-form begin */
    .common-dictEdit-form .el-form{
        margin: 0px auto !important;
        width: 1150px !important;
        height: 200px !important;
        
    }
    .el-input--mini .el-input__inner{
        box-shadow: 0px 0px 6px 0px rgba(25,107,255,0.1) !important;
    }
    .common-dictEdit-divt .el-form {
        margin: 0px auto !important;
        width: 1150px !important;
        height: 140px;
        
    }
    .common-dictEdit-divt .sys-common-input{
        padding-left:0 !important;
    }
    /* .common-dictEdit-divt .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus{
      border-color: 
    } */
</style>
