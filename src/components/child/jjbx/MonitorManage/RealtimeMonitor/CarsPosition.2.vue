<!--   
    name：车辆定位组件
    desc：紧急避险车辆定位组件  去除无用的demo 故备份
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.9.10
-->
<template>
    <div v-loading="carRealLoading" class="child-carsposi-body">
        <div class="child-carsposi-map" id="carposiMap" ref="carposiMap">
        </div>
        <transition name="el-zoom-in-center">
            <div v-show="carWindow.isWinClose" id="drag" :style="{border:carWindow.dragBorder,borderRadius:carWindow.dragBorderRad}"
                class="child-carsposi-dialog">
                <!-- 车牌号 -->
                <div @mousedown="onDragStart" @mouseup="onDragClose" class="car-header">
                    <div class="car-hearder-icon">
                        <img src="../../../../../../static/img/jjbx/monitor/position/carNum.png" />
                    </div>
                    <div class="car-hearder-desc">
                        车牌号：{{ carWindow.carInfo.carNum }}
                    </div>
                    <div class="car-hearder-close">
                        <i @click="carWindow.isWinClose=!carWindow.isWinClose" class="el-icon-close" style="color: #fff;"></i>
                    </div>
                </div>
                <!-- 车辆监管 -->
                <div class="car-edit">
                    <div class="car-edit-title">
                        车辆监管
                    </div>
                    <div @click="onCarMenuSwitch(0)" :style="{background:carWindow.menuSwitch[0]?'cornflowerblue':'#EEEEEE'}"
                        class="car-edit-tab" style="background: cornflowerblue; ">
                        <img v-show="carWindow.menuSwitch[0]" src="../../../../../../static/img/jjbx/monitor/position/jg1.png"
                            class="img_1" />
                        <img v-show="!carWindow.menuSwitch[0]" src="../../../../../../static/img/jjbx/monitor/position/jg-1.png"
                            class="img_1" />
                    </div>
                   <!--  <div @click="onCarMenuSwitch(1)" :style="{background:carWindow.menuSwitch[1]?'cornflowerblue':'#EEEEEE'}"
                        class="car-edit-tab" style="background:#EEEEEE; ">
                        <img v-show="carWindow.menuSwitch[1]" src="../../../../../../static/img/jjbx/monitor/position/jg2.png"
                            class="img_2" />
                        <img v-show="!carWindow.menuSwitch[1]" src="../../../../../../static/img/jjbx/monitor/position/jg-2.png"
                            class="img_2" />
                    </div>
                    <div @click="onCarMenuSwitch(2)" :style="{background:carWindow.menuSwitch[2]?'cornflowerblue':'#EEEEEE'}"
                        class="car-edit-tab" style="background: #EEEEEE; ">
                        <img v-show="carWindow.menuSwitch[2]" src="../../../../../../static/img/jjbx/monitor/position/jg3.png"
                            class="img_3" />
                        <img v-show="!carWindow.menuSwitch[2]" src="../../../../../../static/img/jjbx/monitor/position/jg-3.png"
                            class="img_3" />
                    </div>
                    <div @click="onCarMenuSwitch(3)" :style="{background:carWindow.menuSwitch[3]?'cornflowerblue':'#EEEEEE'}"
                        class="car-edit-tab" style="background: #EEEEEE; ">
                        <img v-show="carWindow.menuSwitch[3]" src="../../../../../../static/img/jjbx/monitor/position/jg4.png"
                            class="img_4" />
                        <img v-show="!carWindow.menuSwitch[3]" src="../../../../../../static/img/jjbx/monitor/position/jg-4.png"
                            class="img_4" />
                    </div>
                    <div @click="onCarMenuSwitch(4)" :style="{background:carWindow.menuSwitch[4]?'cornflowerblue':'#EEEEEE'}"
                        class="car-edit-tab" style="background: #EEEEEE; ">
                        <img v-show="carWindow.menuSwitch[4]" src="../../../../../../static/img/jjbx/monitor/position/jg5.png"
                            class="img_5" />
                        <img v-show="!carWindow.menuSwitch[4]" src="../../../../../../static/img/jjbx/monitor/position/jg-5.png"
                            class="img_5" />
                    </div>
                    <div @click="onCarMenuSwitch(5)" :style="{background:carWindow.menuSwitch[5]?'cornflowerblue':'#EEEEEE'}"
                        class="car-edit-tab" style="background: #EEEEEE; ">
                        <img v-show="carWindow.menuSwitch[5]" src="../../../../../../static/img/jjbx/monitor/position/jg6.png"
                            class="img_6" />
                        <img v-show="!carWindow.menuSwitch[5]" src="../../../../../../static/img/jjbx/monitor/position/jg-6.png"
                            class="img_6" />
                    </div> -->
                </div>
                <div style="width: auto;height: auto;">
                    <!-- 车辆信息 -->
                    <div class="car-Detailinfo">
                        <div class="car-Detailinfo-driverinfo">
                            <div class="car-driverinfo-photo">
                                <img src="../../../../../../static/img/jjbx/monitor/position/user-icon.png" />
                            </div>
                            <div class="car-driverinfo-name">
                                司机：<span>{{ carWindow.carInfo.driverName }}</span>
                            </div>
                        </div>
                        <div class="car-Detailinfo-dInfo">
                            <div class="dInfo-row">
                                <div class="dInfo-column-name">车牌号</div>
                                <div class="dInfo-column-val">：{{ carWindow.carInfo.carNum }}</div>
                            </div>
                            <div class="dInfo-row">
                                <div class="dInfo-column-name">里程</div>
                                <div class="dInfo-column-val">：{{ carWindow.carInfo.todayMileage }}km</div>
                            </div>
                            <div class="dInfo-row">
                                <div class="dInfo-column-name">时速</div>
                                <div class="dInfo-column-val">：{{ carWindow.carInfo.speed }}km</div>
                            </div>
                            <div class="dInfo-row">
                                <div class="dInfo-column-name">位置</div>
                                <div class="dInfo-column-val">：{{ carWindow.carInfo.gpsLocation }}</div>
                            </div>
                            <div class="dInfo-row">
                                <div class="dInfo-column-name">时间</div>
                                <div class="dInfo-column-val">：{{ carWindow.carInfo.gpsDate }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 信息列表 -->
                    <div class="car-tabs">
                        <div @click="onCarMonitorTabSwitch(0)" class="car-tab">
                            <span :style="{color:carWindow.monitorObj.tabs[0]?'#2E92F6':'#909090',borderBottom:carWindow.monitorObj.tabs[0]?'2px solid #2E92F6':'0'}">
                                报警信息
                            </span>
                        </div>
                        <div @click="onCarMonitorTabSwitch(1)" class="car-tab">
                            <span :style="{color:carWindow.monitorObj.tabs[1]?'#2E92F6':'#909090',borderBottom:carWindow.monitorObj.tabs[1]?'2px solid #2E92F6':'0'}">
                                运行信息
                            </span>
                        </div>
                        <div @click="onCarMonitorTabSwitch(2)" class="car-tab">
                            <span :style="{color:carWindow.monitorObj.tabs[2]?'#2E92F6':'#909090',borderBottom:carWindow.monitorObj.tabs[2]?'2px solid #2E92F6':'0'}">
                                车辆信息
                            </span>
                        </div>
                        <div @click="onCarMonitorTabSwitch(3)" class="car-tab">
                            <span :style="{color:carWindow.monitorObj.tabs[3]?'#2E92F6':'#909090',borderBottom:carWindow.monitorObj.tabs[3]?'2px solid #2E92F6':'0'}">
                                司机信息
                            </span>
                        </div>
                    </div>
                    <!-- 报警信息列表 -->
                    <div v-show="carWindow.monitorObj.tabs[0]" class="car-bj-lists">
                        <div class="car-bjlists-tabs">
                            <div class="car-bjlists-tab">
                                报警时间
                            </div>
                            <div class="car-bjlists-tab">
                                持续时间
                            </div>
                            <div class="car-bjlists-tab">
                                报警类型
                            </div>
                            <div class="car-bjlists-tab">
                                报警次数
                            </div>
                            <div class="car-bjlists-tab">
                                当前状态
                            </div>
                        </div>
                        <div class="car-bj-list">
                            <div class="bjlist-row">
                                <div class="bjlist-column">
                                    17:12:23
                                </div>
                                <div class="bjlist-column">
                                    30min
                                </div>
                                <div class="bjlist-column">
                                    超速报警
                                </div>
                                <div class="bjlist-column">
                                    1次
                                </div>
                                <div class="bjlist-column">
                                    离线
                                </div>
                            </div>
                            <div class="bjlist-row">
                                <div class="bjlist-column">
                                    17:12:23
                                </div>
                                <div class="bjlist-column">
                                    30min
                                </div>
                                <div class="bjlist-column">
                                    超速报警
                                </div>
                                <div class="bjlist-column">
                                    1次
                                </div>
                                <div class="bjlist-column">
                                    离线
                                </div>
                            </div>
                            <div class="bjlist-row">
                                <div class="bjlist-column">
                                    17:12:23
                                </div>
                                <div class="bjlist-column">
                                    30min
                                </div>
                                <div class="bjlist-column">
                                    超速报警
                                </div>
                                <div class="bjlist-column">
                                    1次
                                </div>
                                <div class="bjlist-column">
                                    离线
                                </div>
                            </div>
                            <div class="bjlist-row">
                                <div class="bjlist-column">
                                    17:12:23
                                </div>
                                <div class="bjlist-column">
                                    30min
                                </div>
                                <div class="bjlist-column">
                                    超速报警
                                </div>
                                <div class="bjlist-column">
                                    1次
                                </div>
                                <div class="bjlist-column">
                                    离线
                                </div>
                            </div>
                            <div class="bjlist-row">
                                <div class="bjlist-column">
                                    17:12:23
                                </div>
                                <div class="bjlist-column">
                                    30min
                                </div>
                                <div class="bjlist-column">
                                    超速报警
                                </div>
                                <div class="bjlist-column">
                                    1次
                                </div>
                                <div class="bjlist-column">
                                    离线
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- 车辆信息 -->
                    <div v-show="carWindow.monitorObj.tabs[2]" class="car-info">
                        <div class="car-info-row">
                            <div class="car-info-column-lable">
                                车牌号
                            </div>
                            <div class="car-info-column-value">
                                ：{{ carWindow.carInfo.carNum }}
                            </div>
                            <div class="car-info-column-lable">
                                车辆名称
                            </div>
                            <div class="car-info-column-value">
                                ：{{ carWindow.carInfo.carNum }}
                            </div>
                        </div>
                        <div class="car-info-row">
                            <div class="car-info-column-lable">
                                所属机构
                            </div>
                            <div class="car-info-column-value" :style="{width:'auto'}">
                                ：{{ carWindow.carInfo.carOrgName }}
                            </div>
                        </div>
                        <div class="car-info-row">
                            <div class="car-info-column-lable">
                                所属车队
                            </div>
                            <div class="car-info-column-value" :style="{width:'auto'}">
                                ：{{ carWindow.carInfo.fleet }}
                            </div>
                        </div>
                        <div class="car-info-row">
                            <div class="car-info-column-lable">
                                SIM卡号
                            </div>
                            <div class="car-info-column-value" :style="{width:'auto'}">
                                ：{{ carWindow.carInfo.deviceNo }}
                            </div>
                        </div>

                    </div>

                    <!-- 司机信息 -->
                    <div v-show="carWindow.monitorObj.tabs[3]" class="driver-info">
                        <div class="driver-info-row">
                            司机姓名：<span>{{ carWindow.carInfo.driverName }}</span>
                        </div>
                        <div class="driver-info-row">
                            身份证号：<span>370602198212232521</span>
                        </div>
                        <div class="driver-info-row">
                            准驾车型：<span>B1</span>
                        </div>
                        <div class="driver-info-row">
                            联系电话：<span>13526232623</span>
                        </div>
                    </div>
                </div>

            </div>
        </transition>
    </div>

</template>
<script>
    import ajax from "axios";
    import {
        MP
    } from "@/utils/map.js";
    export default {
        components: {},
        props: {
            carId: {
                type: String
            },
            carIdChecked:{
                type: String
            }
        },
        data() {
            return {
                ws: null,
                map: null,
                mapStyleJson: [
                    /* {
                            featureType: "road",
                            elementType: "all",
                            stylers: {
                                color: "#ffffff",
                                visibility: "off"
                            }
                        }, */
                    {
                        featureType: "building",
                        elementType: "all",
                        stylers: {
                            visibility: "off"
                        }
                    },
                    {
                        featureType: "poilabel",
                        elementType: "all",
                        stylers: {
                            visibility: "off"
                        }
                    },
                    /*  {
                         featureType: "manmade",  
                         elementType: "all",
                         stylers: {
                             visibility: "off"
                         }
                     },  */
                    {
                        "featureType": "subway", //地铁
                        "elementType": "all",
                        "stylers": {
                            visibility: "off"
                        }
                    }
                ],
                carRealLoading:false,
                markers: [],
                markersLabelStyle: {
                    width: "80px",
                    color: "#000",
                    background: "#fff",
                    border: "1px solid #CADFF4",
                    borderRadius: "3px",
                    textAlign: "center",
                    height: "30px",
                    lineHeight: "30px"
                },
                markerClusterer: null,
                //弹窗
                carWindow: {
                    //拖拽改变样式
                    dragBorder: "0",
                    dragBorderRad: "6px",
                    //窗口显示
                    isWinClose: false,
                    //菜单切换
                    menuSwitch: [true, false, false, false, false, false],
                    //监控信息界面 menuSwitch->0
                    monitorObj: {
                        tabs: [true, false, false, false]
                    },
                    carInfo: {
                        carNum: '', //车牌号
                        todayMileage:'' ,//里程
                        speed:'' ,//时速
                        gpsLocation:'' ,//位置
                        gpsDate:'' ,//时间
                        driverName:'',//司机名称
                        carOrgName: '', //所属单位
                        fleet:'',//所属车队
                        deviceNo:'' //设备sim卡号 
                    }
                }
            };
        },
        computed: {},
        mounted() {
            let _this = this;
            let count = 0;
            this.$nextTick(function () {
                MP(_this.ak).then(BMap => {
                    //设定父组件车队选择列表高度
                    _this.$parent.execCarsClientHight();
                    //在此调用api
                    _this.init();
                    //  setInterval(() => {
                    count += 0.01;
                    //_this.setTheLocation(116.3449 + count, 39.93995 + count);
                    //  _this.setMarkerClusterer();
                    //  }, 300);
                });
            });
        },
        methods: {

            init() {
                let _this = this;
                _this.createMap();
                //获取车辆实时定位
                let param = {
                    id: "0"
                };
               // _this.ajaxUtilFun(1, param);
            },
            //ajax public fun
            ajaxUtilFun(tId, param) { 
                let _this = this;
                _this.carRealLoading = true;
                let aUrl = _this.global_.apiUrlJj + "";
                let ajaxFun = function (callFun,errMsg) {
                    ajax.get(aUrl, {
                            params: param
                        })
                        .then(function (res) {
                            _this.carRealLoading = false;
                            if (res.data.isSuccess) {
                                if (typeof callFun == "function") {
                                    callFun(res);
                                }
                            } else {
                                _this.$message({
                                    type: "error",
                                    showClose: true,
                                    message: errMsg 
                                });
                            }
                        })
                        .catch(function (error) {
                            //          console.log(error);
                            _this.carRealLoading = false;
                            _this.$message({
                                showClose: true,
                                message: error.data.errMessage,
                                type: 'error'
                            });
                        });
                };
                switch (tId) {
                    case 0: //查询部分车辆位置坐标
                        aUrl += "/get/redis-car-single";
                        ajaxFun(function (res) {
                            _this.getCarRealMonitor(res);
                        },'车辆位置坐标获取失败!');
                        break; 
                    case 1: //查询所有车辆位置坐标
                        aUrl += "/get/redis-car-status-location";
                        ajaxFun(function (res) {
                            _this.getCarRealMonitor(res);
                        },'车辆位置坐标获取失败!');
                        break; 
                    case 2: //获取车辆实时信息
                        aUrl += "/get/redis-car-location";
                        ajaxFun(function (res) {
                            _this.getCarRealInfoData(res);
                        },'车辆实时信息获取失败!');
                        break;
                }
            },
            //Drag窗口 菜单切换
            onCarMenuSwitch(mIn) {
                let _this = this;
                _this.carWindow.menuSwitch.forEach((item, index) => {
                    _this.$set(
                        _this.carWindow.menuSwitch,
                        index,
                        mIn == index ? true : false
                    );
                });
            },
            //监控信息 tab栏切换
            onCarMonitorTabSwitch(mIn) {
                let _this = this;
                _this.carWindow.monitorObj.tabs.forEach((item, index) => {
                    _this.$set(
                        _this.carWindow.monitorObj.tabs,
                        index,
                        mIn == index ? true : false
                    );
                });
            },
            //map
            createMap() {
                let _this = this;
                _this.map = new BMap.Map(this.$refs.carposiMap, {
                    minZoom: 1,
                    maxZoom: 18
                }); // 创建Map实例
                _this.map.setMapStyle({
                    styleJson: _this.mapStyleJson
                });

                _this.map.clearOverlays();
                _this.map.centerAndZoom(new BMap.Point(110.40411, 36.91511), 5); // 初始化地图,设置中心点坐标和地图级别
                _this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放  
                /* _this.map.addEventListener("dragend", function () {
                    var center = _this.map.getCenter();
                    console.log("地图中心点变更为：" + center.lng + ", " + center.lat);
                }); */
            },
            //bind marker click
            onMarkerClick(mkParamObj) {
                let _this = this;
                // _this.map.setZoom(18);
               /*  _this.map.panTo(new BMap.Point(mkParamObj.ln, mkParamObj.la)); */
                console.log(mkParamObj.carId);
                //get car info data
                _this.ajaxUtilFun(2, {
                    id: mkParamObj.carId
                });                
                _this.carWindow.isWinClose = true;
                //  alert(mkParamObj.carId);
            },
            //获取车辆实时信息
            getCarRealInfoData(res){                
                let _this = this;
                console.log(JSON.stringify(res));
                _this.carWindow.carInfo.carNum = res.data.data[0].carInfo.carNum;
                _this.carWindow.carInfo.todayMileage = res.data.data[0].carInfo.todayMileage;
                _this.carWindow.carInfo.speed = res.data.data[0].carInfo.speed;
                _this.carWindow.carInfo.gpsLocation = res.data.data[0].carInfo.gpsLocation;
                _this.carWindow.carInfo.gpsDate = res.data.data[0].carInfo.gpsDate;
                _this.carWindow.carInfo.driverName = res.data.data[0].carInfo.driverName;
                _this.carWindow.carInfo.carOrgName = res.data.data[0].carInfo.carOrgName;
                _this.carWindow.carInfo.fleet = res.data.data[0].carInfo.fleet;
                _this.carWindow.carInfo.deviceNo = res.data.data[0].carInfo.deviceNo;
                
                if(res.data.data[0].gpsLongitude && res.data.data[0].gpsLatitude){
                    let geoc = new BMap.Geocoder();
                    geoc.getLocation(new BMap.Point(res.data.data[0].gpsLongitude,res.data.data[0].gpsLatitude), function(rs){
                        let addComp = rs.addressComponents;
                        _this.carWindow.carInfo.gpsLocation = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
                    }); 
                }
                
            },
            // 用经纬度设置地图中心点
            setTheLocation(longitude, latitude) {
                let _this = this;
                // _this.map.clearOverlays();//清楚覆盖物
                var new_point = new BMap.Point(longitude, latitude);
                var myIcon = new BMap.Icon(
                    "static/img/jjbx/monitor/position/tb21.png",
                    new BMap.Size(300, 157)
                );
                var marker = new BMap.Marker(new_point, {
                    icon: myIcon
                }); // 创建标注
                _this.map.addOverlay(marker); // 将标注添加到地图中
                // _this.map.panTo(new_point);//设置改标注为地图中心点
                // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            },
            //获取marker对象，isPanTo：是否为地图中心
            getMarker(mkParamObj, isPanTo) {
                // console.log(mkParamObj);
                let _this = this;
                let pt = null;
                let label = null;
                let myIcon = new BMap.Icon(
                    "../../../static/img/jjbx/monitor/position/car-online.png",
                    new BMap.Size(30, 30)
                );
                let marker = null;
                //-----------------------------
                pt = new BMap.Point(mkParamObj.ln, mkParamObj.la);
                marker = new BMap.Marker(pt, {
                    icon: myIcon,
                    title: mkParamObj.carNum
                });
                label = new BMap.Label(mkParamObj.carNum, {
                    offset: new BMap.Size(-30, -38)
                });
                label.setStyle(_this.markersLabelStyle);
                marker.setLabel(label);
                marker.addEventListener("click", function () {
                    _this.onMarkerClick(mkParamObj);
                });
                return marker;
            },
            getMarker2(mkParamObj, isPanTo) {
                // console.log(mkParamObj);
                let _this = this;
                let pt = null;
                let label = null;
                let myIcon = new BMap.Icon(
                    "../../../static/img/jjbx/monitor/position/car-online.png",
                    new BMap.Size(30, 30)
                );
                let marker = null;
                //-----------------------------
                pt = new BMap.Point(mkParamObj[0], mkParamObj[1]);
                marker = new BMap.Marker(pt, {
                    icon: myIcon,
                    title: mkParamObj[2]
                });
                label = new BMap.Label(mkParamObj[2], {
                    offset: new BMap.Size(-30, -38)
                });
                label.setStyle(markersLabelStyle);
                marker.setLabel(label);
                marker.addEventListener("click", function () {
                    // _this.onMarkerClick(mkParamObj);
                });
                return marker;
            },

            getCarRealMonitor(res) {
                let _this = this;
                _this.markers = [];
                let simulationData = res.data.data;
                simulationData.forEach(function (val, index) {
                    _this.markers.push(_this.getMarker(val, index == 0 ? true : false));
                });
                var _styles = [{
                    url: "../../../static/img/jjbx/monitor/position/djh.png",
                    size: new BMap.Size(33, 33),
                    textColor: "#fff",
                    textSize: "20"
                }];
                //生成一个marker数组，然后调用markerClusterer类即可。
                _this.markerClusterer = new BMapLib.MarkerClusterer(_this.map, {
                    markers: _this.markers,
                    styles: _styles
                });
            },
            //设置点聚合  已弃用
            setMarkerClusterer(res) {
                let _this = this;
                //模拟数据
                let simulationData = [{
                        carId: "22",
                        ln: "116.3449",
                        la: "39.93995",
                        carNum: "鲁A11111"
                    },
                    {
                        carId: "22",
                        ln: "117.3449",
                        la: "39.93999",
                        carNum: "鲁A22222"
                    }
                    /* ,
                                        {
                                            carId: "3",
                                            ln: "118.3449",
                                            la: "39.94004",
                                            carNum: "鲁A33333"
                                        },
                                        {
                                            carId: "4",
                                            ln: "119.3449",
                                            la: "39.94009",
                                            carNum: "鲁A44444"
                                        } */
                ];
                ajax.get(_this.global_.apiUrlJj + "/get/redis-car-status-location?id=0")
                    .then(function (res) {
                        console.log(res.data.data.length);
                        if (res.data.isSuccess) {
                            _this.markers = [];
                            simulationData = res.data.data;
                            simulationData.forEach(function (val, index) {
                                _this.markers.push(_this.getMarker(val, index == 0 ? true : false));
                            });
                            var _styles = [{
                                url: "../../../static/img/jjbx/monitor/position/djh.png",
                                size: new BMap.Size(33, 33),
                                textColor: "#fff",
                                textSize: "20"
                            }];
                            //生成一个marker数组，然后调用markerClusterer类即可。
                            _this.markerClusterer = new BMapLib.MarkerClusterer(_this.map, {
                                markers: _this.markers,
                                styles: _styles
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                /*                _this.markers = [];
                               simulationData.forEach(function (val, index) {
                                   _this.markers.push(_this.getMarker(val, index == 0 ? true : false));
                               }); 
                               for(let i=0;i<aa.length;i++){
                                   _this.markers.push(_this.getMarker2(aa[i], false));
                               }
                               var _styles = [{
                                   url: "../../../static/img/jjbx/monitor/position/djh.png",
                                   size: new BMap.Size(33, 33),
                                   textColor: "#fff",
                                   textSize: "20"
                               }];
                               //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
                               _this.markerClusterer = new BMapLib.MarkerClusterer(_this.map, {
                                   markers: _this.markers,
                                   styles: _styles
                               });*/
            },
            onDragStart(e) {
                this.carWindow.dragBorder = "1px dashed #95B8E7";
                this.carWindow.dragBorderRad = "0";
                //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
                var divx = e.clientX - document.getElementById("drag").offsetLeft;
                var divy = e.clientY - document.getElementById("drag").offsetTop;
                //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
                document.onmousemove = function (e) {
                    //获取移动后div的位置：鼠标位置-divx/divy
                    var l = e.clientX - divx;
                    var t = e.clientY - divy;
                    document.getElementById("drag").style.left = l + "px";
                    document.getElementById("drag").style.top = t + "px";
                };
                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            },
            carPanTo(cId){
                let _this = this;
                _this.map.setZoom(13);   
                let pt = new BMap.Point(120.308605,37.589285);
                _this.map.panTo(pt);      
            },
            onDragClose() {
                this.carWindow.dragBorder = "0";
                this.carWindow.dragBorderRad = "6px";
            }
        },
        watch: {
            carId: {
                immediate: true,
                handler: function (newVal, oldVal) {
                    let _this = this;
                    if (newVal != undefined && newVal != "") {
                        console.log(newVal);
                        _this.carPanTo(newVal);
                    }
                },
                deep: true
            },
            carIdChecked:{
                immediate: true,
                handler: function (newVal, oldVal) {
                    let _this = this;
                    if (newVal != undefined && newVal != "") {
                        console.log(newVal);
                        let param = {
                            id: newVal
                        };
                        _this.ajaxUtilFun(0, param);
                    }
                },
                deep: true
            }
        },
        beforeDestroy() {},
        //自定义指令
        directives: {}
    };

</script>
<style scoped>
    .child-carsposi-body {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .child-carsposi-map {
        width: 100%;
        height: 100%;
    }

    /* 车辆信息弹出窗口 */
    .child-carsposi-dialog {
        position: absolute;
        top: 50px;
        right: 30px;
        width: 360px;
        height: auto;
        background-color: #fff;
        z-index: 9999;
    }

    /* 窗口头部 */
    .child-carsposi-dialog .car-header {
        cursor: move;
        width: auto;
        height: 40px;
        line-height: 40px;
        background: #2e92f6;
        border-radius: 6px 6px 0 0;
        padding: 0 16px;
    }

    .car-header .car-hearder-icon {
        float: left;
        height: 100%;
        line-height: 35px;
    }

    .car-hearder-icon img {
        width: 17px;
        height: 11px;
        vertical-align: middle;
    }

    .car-hearder-desc {
        float: left;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
        font-size: 12px;
        color: #fff;
    }

    .car-hearder-close {
        float: right;
        cursor: default;
        text-align: right;
        width: 40px;
        height: 40px;
        line-height: 40px;
    }

    /* 操作按钮 */
    .child-carsposi-dialog .car-edit {
        height: 44px;
        width: auto;
        box-sizing: content-box;
        padding: 3px 16px 0 16px;
    }

    .car-edit .car-edit-title {
        float: left;
        height: 30px;
        line-height: 30px;
        margin: 7px 16px 7px 0;
    }

    .car-edit .car-edit-tab {
        float: left;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 7px 6px;
        border-radius: 4px;
    }

    .car-edit-tab img {
        vertical-align: middle;
    }

    .car-edit-tab .img_1 {
        height: 12px;
        width: 12px;
    }

    .car-edit-tab .img_2 {
        height: 13px;
        width: 13px;
    }

    .car-edit-tab .img_3 {
        height: 16px;
        width: 16px;
    }

    .car-edit-tab .img_4 {
        height: 13px;
        width: 14px;
    }

    .car-edit-tab .img_5 {
        height: 14px;
        width: 14px;
    }

    .car-edit-tab .img_6 {
        height: 14px;
        width: 14px;
    }

    /* 详细信息 */
    .child-carsposi-dialog .car-Detailinfo {
        height: 139px;
        width: auto;
        margin: 7px 0;
        box-sizing: content-box;
        margin: 7px 16px;
    }

    .car-Detailinfo .car-Detailinfo-driverinfo {
        float: left;
        height: 137px;
        width: 80px;
        margin-right: 22px;
    }

    .car-Detailinfo-driverinfo .car-driverinfo-photo {
        height: 107px;
        line-height: 107px;
        text-align: center;
        width: 100%;
        background-color: #f7f7f7;
    }

    .car-driverinfo-photo img {
        height: 44px;
        width: 44px;
        vertical-align: middle;
    }

    .car-Detailinfo-driverinfo .car-driverinfo-name {
        height: 30px;
        line-height: 30px;
        width: 100%;
        font-size: 12px;
        color: #909090;
    }

    .car-driverinfo-name span {
        color: #242424;
    }

    .car-Detailinfo .car-Detailinfo-dInfo {
        float: left;
        width: auto;
    }

    .car-Detailinfo-dInfo .dInfo-row {
        width: auto;
        height: 27px;
        line-height: 27px;
    }

    .car-Detailinfo-dInfo .dInfo-column-name {
        float: left;
        width: 42px;
        height: 27px;
        line-height: 27px;
        font-size: 12px;
        color: #909090;
    }

    .car-Detailinfo-dInfo .dInfo-column-val {
        float: left;
        width: auto;
        height: 27px;
        line-height: 27px;
        color: #242424;
        font-size: 12px;
    }

    /* tab栏 */
    .child-carsposi-dialog .car-tabs {
        width: auto;
        height: 26px;
        box-sizing: content-box;
        margin: 3px 16px;
        border-bottom: 1px solid #e2e2e2;
    }

    .car-tabs .car-tab {
        float: left;
        width: 25%;
        height: auto;
    }

    .car-tab span {
        cursor: pointer;
        width: auto;
        height: 25px;
        line-height: 25px;
        display: inline-block;
    }

    /* 报警列表  */
    .child-carsposi-dialog .car-bj-lists {
        width: auto;
        height: 130px;
        box-sizing: content-box;
        margin: 10px 16px 20px 16px;
        border: 1px solid #dae3f2;
    }

    .car-bj-lists .car-bjlists-tabs {
        width: auto;
        height: 30px;
        box-sizing: content-box;
        background-color: #f2f5f9;
        color: #6a87a4;
    }

    .car-bjlists-tabs .car-bjlists-tab {
        float: left;
        width: 20%;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }

    .car-bj-lists .car-bj-list {
        height: 90px;
        width: 100%;
        overflow-y: auto;
    }

    .car-bj-list .bjlist-row {
        height: 30px;
        box-sizing: content-box;
        border-bottom: 1px solid #dae3f2;
    }

    .bjlist-row .bjlist-column {
        float: left;
        width: 20%;
        height: 24px;
        line-height: 32px;
        text-align: center;
        font-size: 12px;
        color: #4a6a8a;
    }

    /* 车辆信息 */

    .child-carsposi-dialog .car-info {
        width: auto;
        height: 130px;
        box-sizing: content-box;
        margin: 10px 16px 20px 16px;
    }

    .car-info .car-info-row {
        height: 30px;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        border-bottom: 1px solid #dae3f2;
    }

    .car-info-row .car-info-column-lable {
        float: left;
        width: 55px;
        height: 30px;
        line-height: 30px;
        text-align: left;
        font-size: 12px;
        color: #909090;
    }

    .car-info-row .car-info-column-value {
        float: left;
        width: 107px;
        height: 30px;
        line-height: 30px;
        text-align: left;
        font-size: 12px;
        color: #242424;
    }

    /* 司机信息  */
    .child-carsposi-dialog .driver-info {
        width: auto;
        height: 130px;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        margin: 0 16px 20px 16px;
    }

    .driver-info .driver-info-row {
        height: 30px;
        line-height: 30px;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        border-bottom: 1px solid #dae3f2;
        color: #909090;
        font-size: 12px;
    }

    .driver-info-row span {
        color: #242424;
    }

 
</style>
