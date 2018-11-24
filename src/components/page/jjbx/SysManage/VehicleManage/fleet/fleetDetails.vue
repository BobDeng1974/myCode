<!--   
    name：紧急避险车队管理详情页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：qiaoyh
    date：2018.9.30
-->
<template>
<div class="child-fleet-details" style="width:100%; background-color:#EEEEEE;padding-top:12px;">
    <div style="width:75%;border:1px solid #E2E1E1;box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1);margin:0px auto;">
        <!-- 车牌信息 -->
        <div style="height:70px; background-color:#F6F6F6;padding:0px 20px;border-bottom: 1px solid #e7e7e7;">
            <div style="float:left;line-height:70px;">
                <!-- <img> -->
                <span style="font-size: 18px;font-weight: 600;font-family: Microsoft YaHei;">{{tableData.organName}}</span>
            </div>
            <div style="float:right;margin-top:24px;">
                <div style="float:left;background-color:#A0ADC0;width:31px;height:31px;margin-left:10px;"><img></div>
                <div style="float:left;background-color:#A0ADC0;width:31px;height:31px;margin-left:10px;"><img></div>
                <div style="float:left;background-color:#A0ADC0;width:31px;height:31px;margin-left:10px;"><img></div>
            </div>
        </div>
        <!-- <div style="width:100%;height:600px;background-color:#fff;"> -->
        <!-- 左侧报警提醒 -->
            <!-- <div style="float:left;padding-top: 20px;width: 860px; height:571px;">
                <div style="margin: 0 0 40px 20px;"></div>
            </div> -->
            <!-- 右侧状态 -->
            <!-- <div style="margin-right: 20px;float: right; width: 300px;height:596px; "></div>
        </div> -->
        <!-- 管理信息 -->
        <div style="width:99.9%;border-top:1px solid #E4E4E4;border-bottom:1px solid #E4E4E4; box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);">
            <div style="width:98.4%;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);">
                <!-- <img> -->
                管理信息
            </div>
            <div style="width:100%;height:160px;background-color:#fff;">
                <table :data="tableData">
                    <tr>
                        <td>车队名称：</td>
                        <td>{{tableData.organName}}</td>
                        <td>车队编号：</td>
                        <td>{{tableData.tenantId}}</td>
                        <td>负责人姓名：</td>
                        <td>{{tableData.leaderName}}</td>
                        <td>组织类型：</td>
                        <td>{{tableData.organType}}</td>
                    </tr>
                    <tr>
                        <td>联系人：</td>
                        <td>{{tableData.organContact}}</td>
                        <td>联系电话：</td>
                        <td>{{tableData.phone}}</td>
                        <td>备注：</td>
                        <td>{{tableData.remark}}</td>
                    </tr>
                </table>
            </div>
            <!-- <div style="width:98.4%;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);"><img>运营信息</div>
            <div style="width:100%;background-color:#fff;">
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
                tableData:{
                    organName: '',
                    tenantId:'',
                    leaderName: '',
                    organType:'',
                    organContact:'',
                    phone:'',
                    remark:'',
                }
            };
        },
        created() {
            let _this = this;
        //    _this.param = _this.$route.params;
           this.getDate();
        //    console.log(_this.param);
        },
        methods:{
            getDate(){
                let _this = this;
                let param =_this.$route.params.id;
                console.log(this.$route.params.id);
                ajax.get(_this.global_.apiUrlJj + "/get/select-car?id=" + param)
                .then(function (res) {
                    console.log(res);
                    _this.tableData.organName = res.data.data.organName
                    _this.tableData.tenantId = res.data.data.tenantId
                    _this.tableData.leaderName = res.data.data.leaderName
                    _this.tableData.organType = res.data.data.organType
                    _this.tableData.organContact = res.data.data.organContact
                    _this.tableData.phone = res.data.data.phone
                    _this.tableData.remark = res.data.data.remark
                    // console.log(_this.tableData);
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
        if (to.path == "/jjbx/SysManage/fleet/fleet") {
            to.meta.keepAlive = true;
        } else {
            to.meta.keepAlive = false;
        }
        next();
    }
        

}
</script>

<style>
    .child-fleet-details td{
        /* border: 1px solid #E2E1E1; */
        padding: 10px 5px;    
    }
    .child-fleet-details td:nth-child(odd){
        width: 140px;
        text-align: right;
        color:#888;
    }
    .child-fleet-details td:nth-child(even){
        width: 160px;
    }
    .child-fleet-details .button-info {
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
