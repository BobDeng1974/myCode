<!--   
    name：紧急避险挂车添加页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：qiaoyh
    date：2018.10.8
-->
<template>
    <div  class="child-traAdd-body">
        <div class="child-traAdd-top">
            <div style="float:left;height:48px;line-height:48px;">
                <span style="font-size:16px;">添加挂车信息 </span>
                <span style="font-size:12px;color:#999999">“
                    <span style="color:red;"> * </span>”为必填项</span>
            </div>
            <div style="float:right;font-size:14px;height:48px;line-height:48px;margin-right:20px;">
                <a>挂车信息</a>
                <span style="color:#999999">添加挂车信息</span>
            </div>
        </div>
        <div class="child-traAdd-center">
            <div class="child-traAdd-centerbox">
                <!-- <img> -->
                <span style="font-size:14px;color:#999999;">挂车信息自动识别</span>
            </div>
        </div>
        <div class="common-traAdd-form">
            <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" ref="ruleForm" label-width="80px" class="demo-ruleForm" size="mini">
                <div class="child-traAdd-formtop">
                    <!-- <img> -->
                    挂车基本信息
                </div>
                <div style="width:100%;height:140px;background-color:#fff;padding-top:10px;">
                    <el-col :span=6>
                        <el-form-item label="车牌号" prop="semiCarNum">
                            <el-input v-model="ruleForm.semiCarNum" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="车长" prop="semiCarLength">
                            <el-input v-model="ruleForm.semiCarLength" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="车宽" prop="semiCarWide">
                            <el-input v-model="ruleForm.semiCarWide" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="车高" prop="semiCarHigh">
                            <el-input v-model="ruleForm.semiCarHigh" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span=6>
                        <el-form-item label="额定载重" prop="semiCarKg">
                            <el-input v-model="ruleForm.semiCarKg" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>

                </div>
                <div style="width:100%;text-align:center;">
                    <button type="button" class="button-info" @click="onSave('ruleForm');">保存</button>
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
                ruleForm: {},
                rules: {
                    semiCarNum: [
                        { required: true, message: '请输入车牌号码', trigger: 'blur' },
                        { min: 7, max: 7, message: '长度 7 个字符', trigger: 'blur' }
                    ],
                },
                labelPosition:'left',
            };
        },
        created() {
            let _this = this;
        },
        methods: {
            onSave(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this;
                        let postData = {
                            semiCarNum: _this.ruleForm.semiCarNum,
                            semiCarLength: _this.ruleForm.semiCarLength,
                            semiCarWide: _this.ruleForm.semiCarWide,
                            semiCarHigh: _this.ruleForm.semiCarHigh,
                            semiCarKg: _this.ruleForm.semiCarKg,
                        };
                        ajax
                            .post(_this.global_.apiUrlJj + "/post/semi-car", postData)
                            .then(function (res) {
                                console.log(res);
                                console.log(postData);
                                if (res.data.isSuccess) {
                                    //跳转页面
                                    _this.$message({
                                        showClose: true,
                                        message: "保存成功！",
                                        type: "success"
                                    });

                                    _this.$router.push({name:'sm_trailer_trailer'});
                                } else {
                                    _this.$message({
                                        message: "保存失败！"
                                    });
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
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
            },
        }
    };
</script>
<style>
    /* body{
        margin: 50px auto;
    } */

    /* el-form begin */
    .child-traAdd-body{width:1200px;margin:0px auto;}
    .child-traAdd-top{width:1180px;height:48px;line-height:48px;padding-left:20px;background-color:#F8F8F8;}
    .child-traAdd-center{width:1198px;height:98px;line-height:98px;border:1px solid #E4E4E4;background-color:#fff;box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);}
    .child-traAdd-centerbox{width:1160px;height:56px;line-height:56px;border:1px dashed #CCCCCC;text-align:center;margin-left:20px;margin-top:18px;background-color:#F8F8F8;}
    .common-traAdd-form{
        width:1198px;border-top:1px solid #E4E4E4;border-bottom:1px solid #E4E4E4; box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);
    }
    .child-traAdd-formtop{width:1179px;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);}
    .common-traAdd-form .el-form {
        margin: 0px auto !important;
        width: 1150px !important;
        /* height: 140px; */
        border-bottom: 1px solid rgba(238, 238, 238, 1) !important;
    }

    .common-traAdd-form .el-input--mini .el-input__inner {
        box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1) !important;
    }
    .common-traAdd-form .el-input__inner{
        width: 123px;
    }
    .button-info {
        /* display: inline-block; */
        width: 68px;
        height: 29px;
        background-color: #2f95f4;
        color: #fff;
        border: 1px solid;
        border-radius: 4px;
        /* float: right; */
        margin-top: 10px;
        line-height: 29px;
        margin-bottom: 10px;
        cursor:pointer;
    }
    .common-traAdd-form .el-select {
        display: block !important;
        position: relative !important;
        width: 133px !important;
    }
</style>