<!--   
    name：紧急避险车辆管理编辑页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：qiaoyh
    date：2018.9.5
-->
<template>
    <div class="child-TrailerEdit-body">
        <div class="child-TrailerEdit-top">
            <div style="float:left;height:48px;line-height:48px;">
                <span style="font-size:16px;">修改挂车车辆信息 </span>
                <span style="font-size:12px;color:#999999">“<span style="color:red;"> * </span>”为必填项</span>
            </div>
            <div class="child-TrailerEdit-topbot"><a>挂车信息</a><span style="color:#999999"> > 修改挂车信息</span></div>
        </div>
        <div class="child-TrailerEdit-center">
            <div class="child-TrailerEdit-cenbox">
                <!-- <img> -->
                <span style="font-size:14px;color:#999999;">挂车信息自动识别 {{ruleForm.semiCarNum}}</span>
            </div>
        </div>
        <div class="common-TrailerEdit-form">
            <el-form :model="ruleForm" ref="ruleForm" :label-position="labelPosition" label-width="80px" class="demo-ruleForm" size="mini">
                <div style="width:1179px;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);">
                    <!-- <img> -->
                    挂车基本信息
                </div>
                <div style="width:100%;height:140px;background-color:#fff;padding-top:10px;">
                    <el-col :span=6>
                        <el-form-item label="车牌号" prop="semiCarNum">
                           
                            <el-input v-model="ruleForm.semiCarNum" class="sys-common-input" style="border:none;" :disabled="true"></el-input>
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
            ruleForm: {
                semiCarNum :""
            },
            labelPosition:'left',
        }
    },
    created() {
        let _this = this;
        _this.getDate();
    },
    methods: {
        getDate(){
            let _this = this;
                let param =_this.$route.params.id;
                ajax.get(_this.global_.apiUrlJj + "/get/select-semi-car?id=" + param)
                .then(function (res) {
                    console.log(res);
                    _this.ruleForm.semiCarNum = res.data.data.semiCarNum
                    _this.ruleForm.semiCarLength = res.data.data.semiCarLength
                    _this.ruleForm.semiCarWide = res.data.data.semiCarWide
                    _this.ruleForm.semiCarHigh = res.data.data.semiCarHigh
                    _this.ruleForm.semiCarKg = res.data.data.semiCarKg
                    console.log(_this.ruleForm);
                })
                .catch(function (error) {
                    console.log(error);
                }); 
        },
        onSave(formName) {
            // let _this = this; 
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let _this = this;
                    let postData = {
                        id:_this.$route.params.id,
                        semiCarNum: _this.ruleForm.semiCarNum,
                        semiCarLength: _this.ruleForm.semiCarLength,
                        semiCarWide: _this.ruleForm.semiCarWide,
                        semiCarHigh: _this.ruleForm.semiCarHigh,
                        semiCarKg: _this.ruleForm.semiCarKg,
                    };
                    ajax.post(_this.global_.apiUrlJj + "/post/update-semi-car" , postData)
                        .then(function (res) {
                            console.log(res);
                            console.log(postData);
                            if(res.data.isSuccess){
                                //跳转页面
                                _this.$message({
                                showClose: true,
                                message: '修改成功！',
                                type: 'success'
                                });
                                _this.$router.push({name:'sm_trailer_trailer'})
                            }else{
                                _this.$message({
                                message: '修改失败！'
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
        onBack(){
            let _this = this; 
            _this.$router.go(-1)
        },
    },
    //从详情页返回主页时把主页的keepAlive值设置为true
    beforeRouteLeave(to, from, next) {
        if (to.path == "/jjbx/SysManage/trailer/trailer") {
            to.meta.keepAlive = true;
        } else {
            to.meta.keepAlive = false;
        }
        next();
    }
}
</script>
<style>
    /* body{
        margin: 50px auto;
    } */
    .child-TrailerEdit-body{
        width:1200px;margin:0px auto;
    }
    .child-TrailerEdit-body .child-TrailerEdit-top{width:1180px;height:48px;line-height:48px;padding-left:20px;background-color:#F8F8F8;}
    .child-TrailerEdit-body .child-TrailerEdit-topbot{float:right;font-size:14px;height:48px;line-height:48px;margin-right:20px;}
    .child-TrailerEdit-body .child-TrailerEdit-center{width:1198px;height:98px;line-height:98px;border:1px solid #E4E4E4;background-color:#fff;box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);}
    .child-TrailerEdit-body .child-TrailerEdit-cenbox{width:1160px;height:56px;line-height:56px;border:1px dashed #CCCCCC;text-align:center;margin-left:20px;margin-top:18px;background-color:#F8F8F8;}
    /* el-form begin */
    .common-TrailerEdit-form{
        width:1198px;border-top:1px solid #E4E4E4;border-bottom:1px solid #E4E4E4; box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);
    }
    .common-TrailerEdit-form .el-form{
        margin: 0px auto;
        width: 1150px;
        border-bottom: 1px solid rgba(238,238,238,1);
    }
    .child-TrailerEdit-body .el-input--mini .el-input__inner{
        box-shadow: 0px 0px 6px 0px rgba(25,107,255,0.1) !important;
        width: 123px;
    }
    .button-info{
        /* display: inline-block; */
        width: 68px;
        height: 29px;
        background-color: #2F95F4;
        color: #fff;
        border: 1px solid;
        border-radius: 4px;
        /* float: right; */
        margin-top: 10px;
        line-height: 29px;
        margin-bottom: 10px;
        cursor:pointer;
    }
    .common-TrailerEdit-form .el-select {
        display: block !important;
        position: relative !important;
        width: 133px !important;
    }
</style>
