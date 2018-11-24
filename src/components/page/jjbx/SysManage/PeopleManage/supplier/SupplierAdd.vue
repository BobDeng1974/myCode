<!--   
    name：紧急避险供应商档案添加页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：suny
    date：2018.9.27
-->
<template>
    <div style="width:1200px;height:800px;margin:50px auto;">
        <div style="width:1180px;height:48px;line-height:48px;padding-left:20px;background-color:#F8F8F8;">
            <div style="float:left;height:48px;line-height:48px;">
                <span style="font-size:16px;">添加供应商档案信息 </span>
                <span style="font-size:12px;color:#999999">“
                    <span style="color:red;"> * </span>”为必填项</span>
            </div>
            <div style="float:right;font-size:14px;height:48px;line-height:48px;margin-right:20px;"><a href="#">供应商档案信息</a><span style="color:#999999"> > 添加供应商档案信息</span></div>
        </div>
        <div class="child-supAdd-center">
            <div class="child-supAdd-centerbox">
                <img>
                <span style="font-size:14px;color:#999999;">供应商档案信息</span>
            </div>
        </div>
        <div class="common-supAdd-divt" >
            <div class="common-supAdd-divm" ><img>供应商档案信息</div>
            <div class="common-supAdd-form" style="width:100%;height:200px;background-color:#fff;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm" size="mini">
                    <el-row>
                    <el-col :span=8>
                    <el-form-item label="企业代码" prop="partnerCode" >
                        <el-input v-model="ruleForm.partnerCode"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span=8>
                    <el-form-item label="企业名称" prop="partnerName" >
                        <el-input v-model="ruleForm.partnerName"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span=8>
                    <el-form-item label="法人代表" prop="partnerLaw" >
                        <el-input v-model="ruleForm.partnerLaw"></el-input>
                    </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span=8>
                    <el-form-item label="邮政编码" prop="partnerPostcode" >
                        <el-input v-model.number="ruleForm.partnerPostcode"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span=8>
                    <el-form-item label="注册资本" prop="partnerSign"  >
                        <el-input v-model="ruleForm.partnerSign"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span=8>
                    <el-form-item label="企业性质" prop="partnerProperty" >
                        <el-input v-model.number="ruleForm.partnerProperty"></el-input>
                    </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span=8>
                    <el-form-item label="经营范围" prop="partnerScope" >
                        <el-input v-model="ruleForm.partnerScope"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span=8>
                    <el-form-item label="企业联系电话" prop="phone" >
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    </el-col>   
                    </el-row>
                    <el-row>
                    <el-col :span=10>
                    <el-form-item label="企业通信地址" prop="partnerAddress" >
                        <el-input v-model="ruleForm.partnerAddress"></el-input>
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
            return callback(new Error('请填写手机号'));
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
      return {
         ruleForm: {
          partnerCode: '',
          partnerName: '',
          partnerLaw: '',
          partnerAddress: '',
          partnerPostcode: '',
          partnerSign: '',
          partnerProperty: '',
          partnerScope: '',
          phone:''
        },
        rules: {
          partnerName: [
            { required: true, message: '请填写企业名称', trigger: 'blur' },
          ],
          partnerLaw: [
            { required: true, message: '请填写法人代表', trigger: 'change' }
          ],
          phone: [
            {required: true, validator: checkPhone, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        let _this = this;
         this.$refs[formName].validate((valid) => {
          if (valid) {
        let  param = {
                        partnerCode: _this.ruleForm.partnerCode,
                        partnerName: _this.ruleForm.partnerName,
                        partnerLaw: _this.ruleForm.partnerLaw,
                        partnerAddress: _this.ruleForm.partnerAddress,
                        partnerPostcode: _this.ruleForm.partnerPostcode,
                        partnerSign: _this.ruleForm.partnerSign,
                        partnerProperty: _this.ruleForm.partnerProperty, 
                        partnerScope: _this.ruleForm.partnerScope, 
                        phone: _this.ruleForm.phone     
                };
        console.log(_this.ruleForm.dictNum);
       
            ajax.post(_this.global_.apiUrlJj + "/post/partner", param).then(response=>{
            if (response.data.isSuccess) {
                            
                            _this.$message({
                            showClose: true,
                            message: "保存成功！",
                            type: "success"
                            });
                 _this.$router.push({name:"sm_supplier_supplier"});
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
        _this.$router.push({name:"sm_supplier_supplier"});
      }
      
    }
  }
</script>
<style>
    .child-supAdd-center{width:1198px;height:98px;line-height:98px;border:1px solid #E4E4E4;background-color:#fff;box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);}
    .child-supAdd-centerbox{width:1160px;height:56px;line-height:56px;border:1px dashed #CCCCCC;text-align:center;margin-left:20px;margin-top:18px;background-color:#F8F8F8;}
    .common-supAdd-divt {
        width:1198px;
        border-top:1px solid #E4E4E4;
        box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);
        height: 280px;
    }
    .common-supAdd-divm {
        width:1179px;
        height:38px;
        line-height:38px;
        padding-left:20px;
        font-size:14px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;color:rgba(30,30,30,1);
    }
    /* el-form begin */
    .common-supAdd-form .el-form{
        margin: 0px auto !important;
        width: 1150px !important;
        height: 300px !important;
        
    }
    .el-input--mini .el-input__inner{
        box-shadow: 0px 0px 6px 0px rgba(25,107,255,0.1) !important;
    }
    
</style>
