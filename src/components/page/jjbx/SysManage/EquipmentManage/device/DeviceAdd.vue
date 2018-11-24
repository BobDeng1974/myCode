<!--   
    name：紧急避险设备档案添加页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：suny
    date：2018.10.11
-->
<template>
    <div  class="child-deviceAdd-body">
        <div class="child-deviceAdd-top">
            <div style="float:left;height:48px;line-height:48px;">
                <span style="font-size:16px;">添加设备信息 </span>
                <span style="font-size:12px;color:#999999">“
                    <span style="color:red;"> * </span>”为必填项</span>
            </div>
            <div style="float:right;font-size:14px;height:48px;line-height:48px;margin-right:20px;">
                <a href="#">设备信息</a>
                <span style="color:#999999"> > 添加设备信息</span>
            </div>
        </div>
        <div class="child-deviceAdd-center">
            <div class="child-deviceAdd-centerbox">
                <img>
                <span style="font-size:14px;color:#999999;">设备信息自动识别</span>
            </div>
        </div>
        <div class="common-deviceAdd-form">
            <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm" size="mini"  label-width="110px">
                <div class="child-deviceAdd-formtop">
                    <img>设备基本信息</div>
                <div style="width:100%;background-color:#fff;padding-top:10px;">
                    <el-row>
                    <el-form-item label="编号" prop="id" style="width:30%;float:left" v-show="false">
                        <el-input v-model="ruleForm.id"></el-input>
                    </el-form-item>
                    </el-row>
                    <el-row>
                    <el-col :span=6>
                        <el-form-item label="型号" prop="modelNum">
                            <el-input v-model="ruleForm.modelNum" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="设备名称" prop="deviceMakerBrand">
                            <el-input v-model="ruleForm.deviceMakerBrand" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="设备类型" prop="deviceType">
                            <el-input v-model="ruleForm.deviceType" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="设备价格" prop="devicePrice">
                            <el-input v-model="ruleForm.devicePrice" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span=6>
                        <el-form-item label="设备编号" prop="deviceNum">
                            <el-input v-model="ruleForm.deviceNum" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span=6>
                        <el-form-item label="设备尺寸" prop="deviceSize">
                            <el-input v-model="ruleForm.deviceSize" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="设备规格" prop="deviceSpec">
                            <el-input v-model="ruleForm.deviceSpec" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="状态" prop="status">
                            <el-input v-model="ruleForm.status" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span=6>
                        <el-form-item label="制造商" prop="deviceMaker" style="float:left">
                            <el-input v-model="ruleForm.deviceMaker" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span=6>
                        <el-form-item label="设备公司名称" prop="deviceCompanyName" style="float:left">
                            <el-input v-model="ruleForm.deviceCompanyName" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span=6>
                        <el-form-item label="产品代码" prop="deviceCode" style="float:left">
                            <el-input v-model="ruleForm.deviceCode" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span=6>
                        <el-form-item label="设备客户代码" prop="deviceCustomerCode">
                            <el-input v-model="ruleForm.deviceCustomerCode" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        
                        <el-col :span=6>
                        <el-form-item label="设备硬件版本号" prop="deviceHvn" style="float:left">
                            <el-input v-model="ruleForm.deviceHvn" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span=6>
                        <el-form-item label="设备软件版本号" prop="deviceSvn" style="float:left">
                            <el-input v-model="ruleForm.deviceSvn" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span=6>
                        <el-form-item label="购买时间" prop="deviceBuy" style="float:left">
                            <el-date-picker
                            v-model="ruleForm.deviceBuy" format="yyyy-MM-dd" style="width:123px"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div style="width:200px;margin:0px auto;">
                    <button type="button" class="button-info" @click="submitForm('ruleForm');">保存</button>
                    <button type="button" class="button-info" @click="onBack();">返回</button>
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
                ruleForm: {
                    deviceMaker: '',
                    deviceMakerBrand:'',
                    deviceCompanyName: '',
                    deviceCode: '',
                    deviceHvn: '',
                    deviceSvn: '',
                    deviceCustomerCode: '',
                    modelNum: '',
                    deviceType: '',
                    devicePrice: '',
                    deviceNum: '',
                    deviceSize: '',
                    deviceSpec: '',
                    status: '',
                    deviceBuy: ''               
                }, 
                rules: {
                deviceMakerBrand: [
                    { required: true, message: '请填写设备名称', trigger: 'blur' },
                ],
                deviceNum: [
                    { required: true, message: '请填写设备编码', trigger: 'blur' }
                ]
                },
                labelPosition:'left'
            }
        },
        created() {
            let _this = this;
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                let _this = this;
                var datetime=_this.ruleForm.deviceBuy.getFullYear() + '-' + (_this.ruleForm.deviceBuy.getMonth() + 1) + '-' + _this.ruleForm.deviceBuy.getDate() ;
                let  param = {
                            deviceMaker: _this.ruleForm.deviceMaker,
                            deviceMakerBrand:_this.ruleForm.deviceMakerBrand,
                            deviceCompanyName: _this.ruleForm.deviceCompanyName,
                            deviceCode: _this.ruleForm.deviceCode,
                            deviceHvn: _this.ruleForm.deviceHvn,
                            deviceSvn: _this.ruleForm.deviceSvn,
                            deviceCustomerCode: _this.ruleForm.deviceCustomerCode,
                            modelNum: _this.ruleForm.modelNum,
                            deviceType: _this.ruleForm.deviceType,
                            devicePrice: _this.ruleForm.devicePrice,
                            deviceNum: _this.ruleForm.deviceNum,
                            deviceSize: _this.ruleForm.deviceSize,
                            deviceSpec: _this.ruleForm.deviceSpec,
                            status: _this.ruleForm.status,
                            deviceBuy: datetime     
                        };
                        console.log(param)
                ajax.post(_this.global_.apiUrlJj + "/post/device", param).then(response=>{
                if (response.data.isSuccess) {
                            
                            _this.$message({
                            showClose: true,
                            message: "保存成功！",
                            type: "success"
                            });
                _this.$router.push({name: "sm_device_device"});
                } else {
                            _this.$message({
                            message: "保存失败！"
                            });
                        }
                    })
                .catch(function(err){
                    console.log(err)
                });
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
            onBack() {
                let _this = this;
                _this.$router.go(-1);
            }
        }
    };
</script>
<style>
    /* body{
        margin: 50px auto;
    } */

    /* el-form begin */
    .child-deviceAdd-body{width:1200px;height:800px;margin:50px auto;}
    .child-deviceAdd-top{width:1180px;height:48px;line-height:48px;padding-left:20px;background-color:#F8F8F8;}
    .child-deviceAdd-center{width:1198px;height:98px;line-height:98px;border:1px solid #E4E4E4;background-color:#fff;box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);}
    .child-deviceAdd-centerbox{width:1160px;height:56px;line-height:56px;border:1px dashed #CCCCCC;text-align:center;margin-left:20px;margin-top:18px;background-color:#F8F8F8;}
    .common-deviceAdd-form{
        width:1198px;border-top:1px solid #E4E4E4;border-bottom:1px solid #E4E4E4; box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);
    }
    .child-deviceAdd-formtop{width:1179px;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);}
    .common-deviceAdd-form .el-form {
        margin: 0px auto !important;
        width: 1150px !important;
        /* height: 140px; */
        border-bottom: 1px solid rgba(238, 238, 238, 1) !important;
    }

    .el-input--mini .el-input__inner {
        box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1) !important;
    }

    .button-info {
        /* display: inline-block; */
        width: 68px !important;
        height: 29px !important;
        background-color: #2f95f4 !important;
        color: #fff !important;
        border: 1px solid !important;
        border-radius: 4px !important;
        /* float: right; */
        margin-top: 10px !important;
        line-height: 29px !important;
        margin-bottom: 10px !important;
    }
    .common-deviceAdd-form .el-select {
        display: block !important;
        position: relative !important;
        width: 133px !important;
    }
    .common-deviceAdd-form .sys-common-input{
        padding-left:0 !important;
    }
</style>