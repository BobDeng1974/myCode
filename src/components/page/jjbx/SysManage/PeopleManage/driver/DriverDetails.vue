<!--   
    name：紧急避险司机管理详情页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：qiaoyh
    date：2018.9.11
-->
<template>
<div class="child-driver-details" style="background-color:#EEEEEE;">
    <div style="width:85%;border:1px solid #E2E1E1;box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1);margin:0px auto;">
        <!-- 司机详细信息 -->
        <div style="height:48px; background-color:#F6F6F6;padding:0px 20px;border-bottom: 1px solid #e7e7e7;">
            <div style="float:left;line-height:48px;">
                <!-- <img> -->
                <span style="font-size: 16px;font-weight: 600;font-family: Microsoft YaHei;">驾驶员详细信息</span>
            </div>
            
        </div>
        <!-- 管理信息 -->
        <div style="width:100%;border-top:1px solid #E4E4E4;border-bottom:1px solid #E4E4E4; box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);">
            <div style="width:1179px;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);">
                <!-- <img> -->
                驾驶员基本信息
            </div>
            <div style="width:100%;height:160px;background-color:#fff;">
                <table class="child-driDet-table">
                    <tr>
                        <td>姓名：</td>
                        <td>{{tableData.personName}}</td>
                        <td>性别：</td>
                        <td>{{tableData.sex}}</td>
                        <td>工号：</td>
                        <td>{{tableData.personWorknum}}</td>
                        <td>手机号：</td>
                        <td>{{tableData.phone}}</td>
                    </tr>
                    <tr>
                        <td>身份证号：</td>
                        <td>{{tableData.personIdcard}}</td>
                        <td>详细地址：</td>
                        <td>{{tableData.personAddress}}</td>
                        <td>入职日期：</td>
                        <td>{{tableData.personJoindate}}</td>
                        <td>所属企业：</td>
                        <td>{{tableData.organName}}</td>
                    </tr>
                    <tr>
                        <td>户口所在地：</td>
                        <td>{{tableData.personHouseHold}}</td>
                    </tr>
                </table>
                
            </div>

            <div style="width:1179px;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);">
                <!-- <img> -->
                驾驶证信息
            </div>
            <div style="width:100%;height:160px;background-color:#fff;">
                <table class="child-driDet-table">
                    <tr>
                        <td>驾驶证号：</td>
                        <td>{{tableData.credentNum}}</td>
                        <td>初次领证日期：</td>
                        <td>{{tableData.credentFirstDate}}</td>
                        <td>驾驶证有效期：</td>
                        <td>{{tableData.credentStartDate}}</td>
                        <td>至：</td>
                        <td>{{tableData.credentEndDate}}</td>
                    </tr>
                </table>
                
            </div>
            <div style="width:1179px;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);">
                <!-- <img> -->
                紧急联系人信息
            </div>
            <div style="width:100%;height:120px;background-color:#fff;padding-top: 5px;">
                <el-table :data="data" border style="width: 99%;margin-left:0.5%" ref="multipleTable" max-height="155">
                    <el-table-column prop="personRelation" label="紧急联系人关系" align="center">
                    </el-table-column>
                    <el-table-column prop="personName" label="紧急联系人姓名" align="center">
                    </el-table-column>
                    <el-table-column prop="phoneRelation" label="紧急联系人电话"  align="center">
                    </el-table-column>
                </el-table>
            </div>
            <!-- <div style="width:1179px;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);"><img>司机账户信息</div>
            <div style="width:100%;height:160px;background-color:#fff;">
                <table>
                </table> 
            </div> -->
        </div>
        <div style="width:200px;margin:0px auto;">
            <button type="button" class="button-info" @click="onBack();">返回</button>
        </div>
    </div>
</div>
</template>
<script>
import ajax from "axios";
export default {
    data() {
            return {
                // param: 1,  
                tableData:{
                    personName: '',
                    sex:'',
                    credentNum: '',
                    personWorknum:'',
                    phone:'',
                    personIdcard:'',
                    personAddress:'',
                    personJoindate:'',
                    companyName:'',
                    personHouseHold:'',
                    credentFirstDate:'',
                    credentStartDate:'',
                    credentEndDate:'',
                    personRelation:'',
                    personName:'',
                    phoneRelation:'',
                },
                data:[],
            };
        },
        created() {
            let _this = this;
           this.getDate();
        },
        methods:{
            getDate(){
                let _this = this;
                let param = _this.$route.params.id;
                var data1 = [];
                console.log(_this.$route.params.id);
                ajax.get(_this.global_.apiUrlJj + "/get/select-person-id?id=" + param)
                .then(function (res) {
                    console.log(res);
                    _this.tableData.personName = res.data.data.infoPersonEntity.personName
                    _this.tableData.sex = res.data.data.infoPersonEntity.sex
                    _this.tableData.credentNum = res.data.data.infoCredentEntity[0].credentNum
                    _this.tableData.personWorknum = res.data.data.infoPersonEntity.personWorknum
                    _this.tableData.phone = res.data.data.infoPersonEntity.phone
                    _this.tableData.personIdcard = res.data.data.infoPersonEntity.personIdcard
                    _this.tableData.personAddress = res.data.data.infoPersonEntity.personAddress
                    _this.tableData.personJoindate = res.data.data.infoPersonEntity.personJoindate
                    _this.tableData.companyName = res.data.data.fleetId
                    _this.tableData.personHouseHold = res.data.data.infoPersonEntity.personHouseHold
                    _this.tableData.organName = res.data.data.infoPersonEntity.organName
                    _this.tableData.credentFirstDate = res.data.data.infoCredentEntity[0].credentFirstDate //初次领证日期
                    _this.tableData.credentStartDate = res.data.data.infoCredentEntity[0].credentStartDate
                    _this.tableData.credentEndDate = res.data.data.infoCredentEntity[0].credentEndDate
                    // console.log(_this.tableData);
                    for(let i = 0; i < res.data.data.personList.length;i++){
                        var obj = {}
                        obj.personRelation =  res.data.data.personList[i].personRelation
                        obj.personName  =  res.data.data.personList[i].personName
                        obj.phoneRelation  =  res.data.data.personList[i].phone
                        data1[i] = obj
                    }
                    _this.data = data1;
                    console.log(_this.data);
                })
                .catch(function (error) {
                    console.log(error);
                }); 
            },
             onBack() {
                let _this = this;
                _this.$router.go(-1);
            },
        },
        //从详情页返回主页时把主页的keepAlive值设置为true
        beforeRouteLeave(to, from, next) {
            if (to.path == "/jjbx/SysManage/driver/driverMain") {
            to.meta.keepAlive = true;
            } else {
            to.meta.keepAlive = false;
            }
            next();
        }
        

}
</script>
<style>
    .child-driver-details td{
        /* border: 1px solid #E2E1E1; */
        padding: 10px 5px !important;    
    }
    .child-driDet-table td:nth-child(odd){
        width: 140px;
        text-align: right;
        color:#888;
    }
    .child-driDet-table td:nth-child(even){
        width: 160px;
    }
    .child-driver-details .button-info {
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
</style>
