<!--   
    name：紧急避险挂车管理详情页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：qiaoyh
    date：2018.10.8
-->
<template>
<div class="child-veh-details" style="width:100%; background-color:#EEEEEE;padding-top:12px;">
    <div style="width:75%;border:1px solid #E2E1E1;box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1);margin:0px auto;">
        <!-- 车牌信息 -->
        <div style="height:70px; background-color:#F6F6F6;padding:0px 20px;border-bottom: 1px solid #e7e7e7;">
            <div style="float:left;line-height:70px;">
                <!-- <img> -->
                <span style="font-size: 18px;font-weight: 600;font-family: Microsoft YaHei;">{{tableData.semiCarNum}}</span>
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
                        <td>车牌号码：</td>
                        <td>{{tableData.semiCarNum}}</td>
                        <td>车牌颜色：</td>
                        <td></td>
                        <td>车辆颜色：</td>
                        <td></td>
                        <td>车辆类型：</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>车辆识别码：</td>
                        <td></td>
                        <td>发动机号：</td>
                        <td></td>
                        <td>实际运行公里数：</td>
                        <td>{{tableData.carRealMileage}}</td>
                        <td>车辆状态：</td>
                        <td></td>
                    </tr>
                </table>
                
            </div>

            <div style="width:98.4%;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);">
                <!-- <img> -->
                运营信息
            </div>
            <div style="width:100%;background-color:#fff;">
                <table>
                    <tr>
                        <td>创建日期：</td>
                        <td></td>
                        <td>交强险有效期：</td>
                        <td></td>
                        <td>商业保险有效期：</td>
                        <td></td>
                        <td>挂车车牌号：</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>所属机构：</td>
                        <td>{{tableData.carOrgName}}</td>
                        <td>所属车队：</td>
                        <td>{{tableData.fleetId}}</td>
                        <td>车长：</td>
                        <td></td>
                        <td>车宽：</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>额定体积：</td>
                        <td></td>
                        <td>额定载重：</td>
                        <td></td>
                        <td>第一司机：</td>
                        <td></td>
                        <td>Gps设备编号：</td>
                        <td></td>
                    </tr><tr>
                        <td>车辆品牌：</td>
                        <td></td>
                        <td>购买日期：</td>
                        <td>{{tableData.createDate}}</td>
                        <td>车架号：</td>
                        <td></td>
                        <td>标准使用年限：</td>
                        <td></td>
                    </tr><tr>
                        <td>车队：</td>
                        <td></td>
                        <td>半挂车：</td>
                        <td></td>
                        <!-- <td>车长：</td>
                        <td></td>
                        <td>车宽：</td>
                        <td></td> -->
                    </tr>
                </table>
                
            </div>
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
                    semiCarNum: '',
                    fleetId:'',
                    Orgname: '',
                    createDate:'',
                    carRealMileage:''
                }
            };
        },
        created() {
            let _this = this;
        //    _this.param = _this.$route.params;
           this.getDate();
        //    console.log(_this.param);
        },
        // search(index){
        //     let _this = this;
        //    let data=_this.$route.tableData[index];
        //    console.log(data);
        // }
        methods:{
            getDate(){
                let _this = this;
                let param =_this.$route.params.id;
                console.log(this.$route.params.id);
                ajax.get(_this.global_.apiUrlJj + "/get/select-car?id=" + param)
                .then(function (res) {
                    console.log(res);
                    _this.tableData.semiCarNum = res.data.data.semiCarNum
                    _this.tableData.fleetId = res.data.data.fleetId
                    _this.tableData.carOrgName = res.data.data.carOrgName
                    _this.tableData.Orgname = res.data.data.Orgname
                    _this.tableData.carRealMileage = res.data.data.carRealMileage
                    _this.tableData.createDate = res.data.data.createDate
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
    .child-veh-details td{
        /* border: 1px solid #E2E1E1; */
        padding: 10px 5px;    
    }
    .child-veh-details td:nth-child(odd){
        width: 140px;
        text-align: right;
        color:#888;
    }
    .child-veh-details td:nth-child(even){
        width: 160px;
    }
    .child-veh-details .button-info {
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
