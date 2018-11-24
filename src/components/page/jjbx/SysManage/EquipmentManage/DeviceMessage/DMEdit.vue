<!--   
    name：紧急避险设备信息编辑页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：qiaoyh
    date：2018.11.14
-->
<template>
    <div class="child-dmEdit-body">
        <div class="child-dmEdit-top">
            <div style="float:left;height:48px;line-height:48px;">
                <span style="font-size:16px;">修改设备信息 </span>
                <span style="font-size:12px;color:#999999">“<span style="color:red;"> * </span>”为必填项</span>
            </div>
            <div class="child-dmEdit-topbot"><a>设备信息</a><span style="color:#999999"> > 修改设备信息</span></div>
        </div>
        <div class="child-dmEdit-center">
            <div class="child-dmEdit-cenbox">
                <!-- <img> -->
                <span style="font-size:14px;color:#999999;">设备信息自动识别</span>
            </div>
        </div>
        <div class="common-dmEdit-form">
            <el-form :model="ruleForm" ref="ruleForm" :label-position="labelPosition" label-width="125px" class="demo-ruleForm" size="mini">
                <div style="width:1179px;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);">
                    <!-- <img> -->
                    设备基本信息
                </div>
                <div style="width:100%;height:140px;background-color:#fff;padding-top:10px;">
                    <el-col :span=8>
                        <el-form-item label="信息名称" prop="mergerName">
                            <el-input v-model="ruleForm.mergerName" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    
                    <el-col :span=8>
                        <el-form-item label="简称" prop="shortName">
                            <el-input v-model="ruleForm.shortName" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=8>
                        <el-form-item label="数据来自哪个设备" prop="fromDevice">
                            <el-select v-model="ruleForm.fromDevice" placeholder="请选择">
                                <el-option v-for="item in selectDevice" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span=8>
                        <el-form-item label="内容" prop="content">
                            <el-input v-model="ruleForm.content" class="sys-common-input" type="textarea" :rows="2" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=8>
                        <el-form-item label="传感" prop="sense">
                            <el-input v-model="ruleForm.sense" class="sys-common-input" type="textarea" :rows="2" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=8>
                        <el-form-item label="执行" prop="perform">
                            <el-input v-model="ruleForm.perform" class="sys-common-input" type="textarea" :rows="2" style="border:none;"></el-input>
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
                mergerName:'',
                shortName:'',
                content:'',
                sense:'',
                perform:'',
                fromDevice:'',
            },
            labelPosition:'left',
            selectDevice:[],
        }
    },
    created() {
        let _this = this;
        _this.getDate();
        _this.getDevice();
    },
    methods: {
        getDate(){
            let _this = this;
                let param =_this.$route.params.id;
                ajax.get(_this.global_.apiUrlJj + "/get/select-adas-dict?id=" + param)
                .then(function (res) {
                    console.log(res);
                    _this.ruleForm.mergerName = res.data.data.mergerName
                    _this.ruleForm.shortName = res.data.data.shortName
                    _this.ruleForm.content = res.data.data.content
                    _this.ruleForm.sense = res.data.data.sense
                    _this.ruleForm.perform = res.data.data.perform
                    _this.ruleForm.fromDevice = res.data.data.fromDevice
                    console.log(_this.ruleForm);
                })
                .catch(function (error) {
                    console.log(error);
                }); 
        },
        //获取字典档案中的来自设备
        getDevice(){
                let _this = this;
                ajax.get(_this.global_.apiUrlJj + "/get/status?type=fromDevice")
                    .then(function (res) {
                        console.log(res);
                        // var obj = {}
                        if (res.data) {
                            if (res.data.data) {
                                res.data.data.forEach((item, index) => {
                                    _this.selectDevice.push({
                                        id: item.id,
                                        text: item.dictNumName
                                    });
                                });
                            }
                        }
                    });
            },
        onSave(formName) {
            // let _this = this; 
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let _this = this;
                    let postData = {
                        id:_this.$route.params.id,
                        mergerName: _this.ruleForm.mergerName,
                        shortName: _this.ruleForm.shortName,
                        content: _this.ruleForm.content,
                        sense: _this.ruleForm.sense,
                        perform: _this.ruleForm.perform,
                        fromDevice: _this.ruleForm.fromDevice,
                    };
                    ajax.post(_this.global_.apiUrlJj + "/post/update-adas-dict" , postData)
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
                                _this.$router.push({name:'sm_dmessage_dmessage'})
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
    .child-dmEdit-body{
        width:1200px;margin:0px auto;
    }
    .child-dmEdit-body .child-dmEdit-top{width:1180px;height:48px;line-height:48px;padding-left:20px;background-color:#F8F8F8;}
    .child-dmEdit-body .child-dmEdit-topbot{float:right;font-size:14px;height:48px;line-height:48px;margin-right:20px;}
    .child-dmEdit-body .child-dmEdit-center{width:1198px;height:98px;line-height:98px;border:1px solid #E4E4E4;background-color:#fff;box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);}
    .child-dmEdit-body .child-dmEdit-cenbox{width:1160px;height:56px;line-height:56px;border:1px dashed #CCCCCC;text-align:center;margin-left:20px;margin-top:18px;background-color:#F8F8F8;}
    /* el-form begin */
    .common-dmEdit-form{
        width:1198px;border-top:1px solid #E4E4E4;border-bottom:1px solid #E4E4E4; box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);
    }
    .common-dmEdit-form .el-form{
        margin: 0px auto;
        width: 1150px;
        border-bottom: 1px solid rgba(238,238,238,1);
    }
    .child-dmEdit-body .el-input--mini .el-input__inner{
        box-shadow: 0px 0px 6px 0px rgba(25,107,255,0.1) !important;
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
    .common-dmEdit-form .el-select {
        display: block !important;
        position: relative !important;
        width: 200px !important;
        padding-left: 10px;
    }
    .common-dmEdit-form .sys-common-input{
        width: 200px !important;
    }
</style>
