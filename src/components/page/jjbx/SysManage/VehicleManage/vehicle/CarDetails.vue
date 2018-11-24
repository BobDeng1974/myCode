<!--   
    name：紧急避险车辆管理详情页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：qiaoyh
    date：2018.9.10
-->
<template>
<div class="child-veh-details" style="width:100%; background-color:#EEEEEE;">
    <div style="width:85%;border:1px solid #E2E1E1;box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1);margin:0px auto;">
        <!-- 车牌信息 -->
        <div style="height:70px; background-color:#F6F6F6;padding:0px 20px;border-bottom: 1px solid #e7e7e7;">
            <div style="float:left;line-height:70px;">
                <!-- <img> -->
                <span style="font-size: 18px;font-weight: 600;font-family: Microsoft YaHei;">{{tableData.carNum}}</span>
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
            <div style="width:98.4%;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);"><img>车辆基本信息</div>
            <div style="width:100%;height:160px;background-color:#fff;">
                <table :data="tableData">
                    <tr>
                        <td>车牌号：</td>
                        <td>{{tableData.carNum}}</td>
                        <td>车牌颜色：</td>
                        <td>{{tableData.carPlateColor}}</td>
                        <td>车辆颜色：</td>
                        <td>{{tableData.carColor}}</td>
                        <td>车辆识别码：</td>
                        <td>{{tableData.carCode}}</td>
                    </tr>
                    <tr>
                        <td>发动机号：</td>
                        <td>{{tableData.carEngineNum}}</td>
                        <td>所属机构：</td>
                        <td>{{tableData.carOrgName}}</td>
                        <td>车辆状态：</td>
                        <td>{{tableData.carStates}}</td>
                        <td>车辆品牌：</td>
                        <td>{{tableData.carBrand}}</td>
                    </tr>
                </table>
                
            </div>
            <div style="width:98.4%;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);">
                <!-- <img> -->
                司机信息
            </div>
            <div style="width:100%;background-color:#fff;">
                <table style="width:50%;">
                    <tr>
                        <td>第一司机：</td>
                        <td>{{tableData.carDriver1Id}}</td>
                        <td>第二司机：</td>
                        <td>{{tableData.carDriver2Id}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:98.4%;height:38px;line-height:38px;padding-left:20px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);">
                <!-- <img> -->
                车辆运营信息
            </div>
            <div style="width:100%;background-color:#fff;">
                <table>
                    <tr>
                        <td>购买日期：</td>
                        <td>{{tableData.carBuyDate}}</td>
                        <td>购买价值：</td>
                        <td>{{tableData.carBuyPrice}}</td>
                        <td>运输介质：</td>
                        <td>{{tableData.carMedium}}</td>
                        <td>经营范围：</td>
                        <td>{{tableData.carScope}}</td>
                    </tr>
                    <tr>
                        <td>交强险有效期：</td>
                        <td>{{tableData.carJqxDate}}</td>
                        <td>商业保险有效期：</td>
                        <td>{{tableData.carSyxDate}}</td>
                        <td>挂车车牌号：</td>
                        <td>{{tableData.semiCarNum}}</td>
                        <td>车长：</td>
                        <td>{{tableData.carLength}}</td>
                    </tr>
                    <tr>
                        <td>车宽：</td>
                        <td>{{tableData.carWide}}</td>
                        <td>车高：</td>
                        <td>{{tableData.carHigh}}</td>
                        <td>箱型：</td>
                        <td>{{tableData.carCarriage}}</td>
                        <td>Gps设备编号：</td>
                        <td>{{tableData.gpsNo}}</td>
                    </tr><tr>
                        <td>强制报废期：</td>
                        <td>{{tableData.carOverDate}}</td>
                        <td>额定转速：</td>
                        <td>{{tableData.carRateSpeed}}</td>
                        <td>额定体积：</td>
                        <td>{{tableData.carVolume}}</td>
                        <td>额定载重：</td>
                        <td>{{tableData.carWeight}}</td>
                    </tr><tr>
                        <td>核载人数：</td>
                        <td>{{tableData.carRealPeople}}</td>
                        <td>标准使用年限：</td>
                        <td>{{tableData.carServiceYears}}</td>
                        <td>车辆类型：</td>
                        <td>{{tableData.carType}}</td>
                        <td>实际运行公里数：</td>
                        <td>{{tableData.carRealMileage}}</td>
                    </tr>
                    <tr>
                        <td>车架号：</td>
                        <td>{{tableData.carFrameNo}}</td>
                        <td>百公里参考油耗：</td>
                        <td>{{tableData.carOil100}}</td>
                        <td>油耗因子：</td>
                        <td>{{tableData.carOilFactor}}</td>
                        <td>里程因子：</td>
                        <td>{{tableData.carMileageFactor}}</td>
                    </tr>
                    <tr>
                        <td>下次保养时间：</td>
                        <td>{{tableData.carNextCareDate}}</td>
                        <td>每日行驶时间：</td>
                        <td>{{tableData.carRunTime}}</td>
                        <td>每日行驶里程：</td>
                        <td>{{tableData.carRunMileage}}</td>
                    </tr>
                </table>
                
            </div>
        </div>
        <div style="width:100%;text-align: center;">
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
                    carNum: '',
                    fleetId:'',
                    Orgname: '',
                    carRealMileage:'',
                    carLength:'',
                    gpsNo:'',
                    companyName:'',
                },
                page:'',
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
                _this.page = _this.$route.params.page;
                console.log(this.$route.params.page);
                ajax.get(_this.global_.apiUrlJj + "/get/select-car?id=" + param)
                    .then(function (res) {
                        console.log(res);
                        _this.tableData.carNum = res.data.data.carNum
                        _this.tableData.carPlateColor = res.data.data.carPlateColor
                        _this.tableData.carColor = res.data.data.carColor
                        _this.tableData.carCode = res.data.data.carCode
                        _this.tableData.carEngineNum = res.data.data.carEngineNum
                        _this.tableData.carOrgName = res.data.data.carOrgName
                        _this.tableData.carStates = res.data.data.carStates
                        _this.tableData.carBrand = res.data.data.carBrand
                        _this.tableData.carBuyPrice = res.data.data.carBuyPrice
                        _this.tableData.carMedium = res.data.data.carMedium
                        _this.tableData.carScope = res.data.data.carScope
                        _this.tableData.semiCarNum = res.data.data.semiCarNum
                        _this.tableData.carLength = res.data.data.carLength
                        _this.tableData.carWide = res.data.data.carWide
                        _this.tableData.carHigh = res.data.data.carHigh
                        _this.tableData.carCarriage = res.data.data.carCarriage
                        _this.tableData.gpsNo = res.data.data.gpsNo
                        _this.tableData.carFrameNo = res.data.data.carFrameNo
                        _this.tableData.carVolume = res.data.data.carVolume
                        _this.tableData.carWeight = res.data.data.carWeight
                        _this.tableData.carRealPeople = res.data.data.carRealPeople
                        _this.tableData.carServiceYears = res.data.data.carServiceYears
                        _this.tableData.carType = res.data.data.carType
                        _this.tableData.carDriver1Id = res.data.data.carDriver1Id
                        _this.tableData.carDriver2Id = res.data.data.carDriver2Id
                        _this.tableData.carRateSpeed = res.data.data.carRateSpeed
                        _this.tableData.carOilFactor = res.data.data.carOilFactor
                        _this.tableData.carMileageFactor = res.data.data.carMileageFactor
                        _this.tableData.carOil100 = res.data.data.carOil100
                        _this.tableData.carRunTime = res.data.data.carRunTime
                        _this.tableData.carRunMileage = res.data.data.carRunMileage
                        _this.tableData.carRealMileage = res.data.data.carRealMileage
                        _this.tableData.carBuyDate = res.data.data.carBuyDate
                        _this.tableData.carOverDate = res.data.data.carOverDate
                        _this.tableData.carNextCareDate = res.data.data.carNextCareDate
                        _this.tableData.carJqxDate = res.data.data.carJqxDate
                        _this.tableData.carSyxDate = res.data.data.carSyxDate
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
        /**
         * @function 从详情页返回主页时把主页的keepAlive值设置为true
         * @param  {type} to   {description}
         * @param  {type} from {description}
         * @param  {type} next {description}
         * @return {type} {description}
         */
        beforeRouteLeave(to, from, next) {
            if (to.path == "/jjbx/SysManage/vehicle/vehicle") {
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
    }
</style>
