<!--   
    name：紧急避险车辆管理添加页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：qiaoyh
    date：2018.9.5
-->
<template>
    <div  class="child-fleetAdd-body">
        <div class="child-fleetAdd-top">
            <div style="float:left;height:48px;line-height:48px;">
                <span style="font-size:16px;">修改车队信息 </span>
                <span style="font-size:12px;color:#999999">“
                    <span style="color:red;"> * </span>”为必填项</span>
            </div>
            <div style="float:right;font-size:14px;height:48px;line-height:48px;margin-right:20px;">
                <a href="#">车队信息</a>
                <span style="color:#999999"> > 修改车队信息</span>
            </div>
        </div>
        <div class="child-fleetAdd-center">
            <!-- <div class="child-fleetAdd-centerbox">
                <img>
                <span style="font-size:14px;color:#999999;">车辆信息自动识别</span>
            </div> -->
        </div>
        <div class="common-fleetAdd-form">
            <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" ref="ruleForm" label-width="110px" class="demo-ruleForm" size="mini">
                <div class="child-fleetAdd-formtop">
                    <!-- <img> -->
                    车队基本信息
                </div>
                <div style="width:100%;background-color:#fff;padding-top:10px;">
                    <el-col :span=6>
                        <el-form-item label="车队名称" prop="organName">
                            <el-input v-model="ruleForm.organName" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="车队编号" prop="tenantId">
                            <el-input v-model="ruleForm.tenantId" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="负责人姓名" prop="leaderName">
                            <el-input v-model="ruleForm.leaderName" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="组织类型" prop="organType">
                            <el-select v-model="ruleForm.organType" placeholder="请选择">
                                <el-option v-for="item in selectStatus" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span=6>
                        <el-form-item label="联系人" prop="organContact">
                            <el-input v-model="ruleForm.organContact" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="ruleForm.phone" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="ruleForm.remark" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span=5>
                        <el-form-item label="车队" prop="fleetId">
                            <el-select v-model="ruleForm.fleetId" placeholder="请选择">
                                <el-option v-for="item in selectStatus" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
                </div>
                <div style="width:200px;margin:0px auto;">
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
                    organName: [
                        { required: true, message: '请输入车队名称', trigger: 'blur' },
                    ]
                },
                selectStatus:[],
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
                            organName: _this.ruleForm.organName,
                            tenantId: _this.ruleForm.tenantId,
                            leaderName: _this.ruleForm.leaderName,
                            organType: _this.ruleForm.organType,
                            organContact: _this.ruleForm.organContact,
                            phone: _this.ruleForm.phone,
                            remark: _this.ruleForm.remark,
                        };
                        ajax
                            .post(_this.global_.apiUrlJj + "/post/save-fleet", postData)
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

                                    _this.$router.push({name:'sm_fleet_fleet'});
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
    .child-fleetAdd-body{width:1200px;height:800px;margin:0px auto;}
    .child-fleetAdd-top{width:1180px;height:48px;line-height:48px;padding-left:20px;background-color:#F8F8F8;}
    .child-fleetAdd-center{width:1198px;height:98px;line-height:98px;border:1px solid #E4E4E4;background-color:#fff;box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);}
    .child-fleetAdd-centerbox{width:1160px;height:56px;line-height:56px;border:1px dashed #CCCCCC;text-align:center;margin-left:20px;margin-top:18px;background-color:#F8F8F8;}
    .common-fleetAdd-form{
        width:1198px;border-top:1px solid #E4E4E4;border-bottom:1px solid #E4E4E4; box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);
    }
    .child-fleetAdd-formtop{width:1179px;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);}
    .common-fleetAdd-form .el-form {
        margin: 0px auto !important;
        width: 1150px !important;
        /* height: 140px; */
        border-bottom: 1px solid rgba(238, 238, 238, 1) !important;
    }

    .el-input--mini .el-input__inner {
        box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1) !important;
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
    .common-fleetAdd-form .el-select {
        display: block !important;
        position: relative !important;
        width: 123px !important;
    }
</style>