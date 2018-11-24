<!--   
    name：紧急避险供应商档案编辑页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：suny
    date：2018.9.28
-->
<template>
    <div style="width:1200px;height:800px;margin:50px auto;">
        <div style="width:1180px;height:48px;line-height:48px;padding-left:20px;background-color:#F8F8F8;">
            <div style="float:left;height:48px;line-height:48px;">
                <span style="font-size:16px;">修改供应商档案信息 </span>
            </div>
            <div style="float:right;font-size:14px;height:48px;line-height:48px;margin-right:20px;"><a href="#">供应商档案信息</a><span style="color:#999999"> > 修改供应商档案信息</span></div>
        </div>

        <div class="common-supEdit-divt" >
            <div class="common-supEdit-divm" ><img>供应商档案信息</div>
            <div class="common-supEdit-form" style="width:100%;height:200px;background-color:#fff;">
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
          phone:'',
          page:''
        },
        rules: {
          partnerName: [
            { required: true, message: '请填写企业名称', trigger: 'blur' },
          ],
          partnerLaw: [
            { required: true, message: '请填写法人代表', trigger: 'blur' }
          ],
          phone: [
            {required: true, message: '请填写企业联系电话',trigger: 'blur'}
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
    if (to.name == "sm_supplier_supplier") {
      to.query.temp = _this.ruleForm.page;
    }
    next();
  },
    methods: {
      getInfo(){
          
          let _this=this;
          const routerParams = this.$route.query.userId
          _this.ruleForm.page = this.$route.query.page
          ajax.get(_this.global_.apiUrlJj+"/get/select-partner?id="+routerParams).then(res => {
            if (res.status === 200) {
                _this.ruleForm.id = res.data.data.id
                _this.ruleForm.partnerCode = res.data.data.partnerCode
                _this.ruleForm.partnerName=res.data.data.partnerName
                _this.ruleForm.partnerLaw=res.data.data.partnerLaw
                _this.ruleForm.partnerAddress=res.data.data.partnerAddress
                _this.ruleForm.partnerPostcode=res.data.data.partnerPostcode
                _this.ruleForm.partnerSign=res.data.data.partnerSign
                _this.ruleForm.partnerProperty=res.data.data.partnerProperty
                _this.ruleForm.partnerScope=res.data.data.partnerScope
                _this.ruleForm.phone=res.data.data.phone
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
        let  param = {
                        id:_this.ruleForm.id,
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
        
            ajax.post(_this.global_.apiUrlJj + "/post/update-partner?id="+_this.ruleForm.id, param).then(response=>{
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
    .child-dictadd-center{width:1198px;height:98px;line-height:98px;border:1px solid #E4E4E4;background-color:#fff;box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);}
    .child-dictadd-centerbox{width:1160px;height:56px;line-height:56px;border:1px dashed #CCCCCC;text-align:center;margin-left:20px;margin-top:18px;background-color:#F8F8F8;}
    .common-supEdit-divt {
        width:1198px;
        border-top:1px solid #E4E4E4;
        box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);
        height: 280px;
    }
    .common-supEdit-divm {
        width:1179px;
        height:38px;
        line-height:38px;
        padding-left:20px;
        font-size:14px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;color:rgba(30,30,30,1);
    }
    /* el-form begin */
    .common-supEdit-form .el-form{
        margin: 0px auto !important;
        width: 1150px !important;
        height: 300px !important;
        
    }
    .el-input--mini .el-input__inner{
        box-shadow: 0px 0px 6px 0px rgba(25,107,255,0.1) !important;
    }
    
</style>
