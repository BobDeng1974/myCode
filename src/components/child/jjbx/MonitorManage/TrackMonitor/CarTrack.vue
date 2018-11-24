<!--   
    name：轨迹回放组件
    desc：紧急避险轨迹回放组件
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.9.29
-->
<template>
    <div class="child-cartrack-body">
        <div class="child-cartrack-map" id="carposiMap" ref="carposiMap"></div>
        <!-- <div style="position: absolute;bottom:calc( (100% - 200px) / 2 );right: 30px;width: 38px;height: 205px;background:#fff;border-radius: 6px;">
            <div style="height:25px;line-height:25px;text-align: center;" class="font-12">
                时速
            </div>
            <div style="height: 58px;width: auto;padding: 0 4px 0 4px;">
                <div style="float: left;width:8px;height: 100%;background:#DE182E;border-radius: 10px 10px 0 0;">
                </div>
                <div class="font-12" style="float: left;
                width: 22px;
                height: 100%;
                line-height: 115px;
                text-align: right; ">
                    80
                </div>
            </div>
            <div style="height: 58px;width: auto;padding: 0 4px 0 4px;">
                <div style="float: left;width:8px;height: 100%;background:#F1C540;border-radius: 0;">
                </div>
                <div class="font-12" style="float: left;
                width: 22px;
                height: 100%;
                line-height: 115px;
                text-align: right; ">
                    40
                </div>
            </div>
            <div style="height: 58px;width: auto;padding: 0 4px 0 4px;">
                <div style="float: left;width:8px;height: 100%;background:#4B95FF;border-radius: 0 0 10px 10px;">
                </div>
                <div class="font-12" style="float: left;
                width: 22px;
                height: 100%;
                line-height: 105px;
                text-align: right; ">
                    0
                </div>
            </div>
        </div> -->

        <div class="dialog-body" id="drag" :style="{border:carWindow.dragBorder,borderRadius:carWindow.dragBorderRad}">

            <div class="dialog-title" @mousedown="onDragStart" @mouseup="onDragClose" style="position: relative;">
                轨迹回放
                <div @click="carWindow.dialogShow=!carWindow.dialogShow" style="width:30px;height:33px;text-align: center;line-height: 33px;position: absolute;top:0;right: 0;cursor:pointer;">
                    <i v-show="carWindow.dialogShow" class="el-icon-arrow-up"></i>
                    <i v-show="!carWindow.dialogShow" class="el-icon-arrow-down"></i>
                </div>
            </div>
            <transition name="el-zoom-in-top">
                <div v-show="carWindow.dialogShow" style="background: #fff;border-radius: 0 0 6px 6px;">
                    <div class="dialog-row">
                        <div class="font-12 dialog-columnL">时间：</div>
                        <div class="font-12 dialog-columnR">
                            <el-select v-model="dateVal" placeholder="请选择" @change="setStartStopDate()" size="mini">
                                <el-option v-for="item in dateOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="dialog-row">
                        <div class="font-12 dialog-columnL">开始时间：</div>
                        <div class="font-12 dialog-columnR">
                            <el-date-picker v-model="startDate" type="datetime" placeholder="选择日期时间" size="mini">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="dialog-row">
                        <div class="font-12 dialog-columnL">结束时间：</div>
                        <div class="font-12 dialog-columnR">
                            <el-date-picker v-model="stopDate" type="datetime" placeholder="选择日期时间" size="mini">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="dialog-row">
                        <div class="font-12 dialog-columnL">选择车辆：</div>
                        <div class="font-12 dialog-columnR">
                            <el-select v-model="carId" filterable placeholder="请选择" size="mini">
                                <el-option v-for="item in caroptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="dialog-row2">
                        <el-button type="primary" size="mini" @click="onSearch()">查询</el-button>
                    </div>

                </div>
            </transition>
        </div>
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
            plapProp: {
                type: Object
            }
        },
        data() {
            return {
                map: null,
                car: null,
                lushu: null,
                timer: null,
                label: null,
                playSpeed: 3000,
                speed: 0,
                index: 0,
                pointArr: [], 
                mapStyle: {
                    styleJson: [
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
                    ]
                },
                dateOptions: [
                    {
                    value: '0',
                    label: '自定义'
                }, {
                    value: '1',
                    label: '今天'
                }, {
                    value: '2',
                    label: '昨天'
                }, {
                    value: '3',
                    label: '昨天至今天'
                }, {
                    value: '4',
                    label: '前天'
                }, {
                    value: '5',
                    label: '近七天'
                }],
                caroptions: [{
                    value: '0',
                    label: '鲁F wx102'
                }, {
                    value: '1',
                    label: '鲁F wx103'
                }, {
                    value: '32',
                    label: '鲁F wx104'
                }, {
                    value: '3',
                    label: '鲁F wx105'
                }, {
                    value: '4',
                    label: '鲁F wx106'
                }, {
                    value: '5',
                    label: '鲁F wx107'
                }],
                dateVal: '',
                carId: '32',
                startDate: '',
                stopDate: '',
                //弹窗
                carWindow: {
                    dialogShow: true,
                    //拖拽改变样式
                    dragBorder: "0",
                    dragBorderRad: "6px",
                }
            };
        },
        computed: {},
        mounted() {
            let _this = this;
            this.$nextTick(function () {
                MP(_this.ak).then(BMap => {
                    _this.init();
                });
            });
        },
        methods: {
            setStartStopDate() {
                let _this = this;
                let date = new Date();
                let todayS = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                //昨天
                date.setDate(date.getDate() - 1);
                let yesterdayS = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                //前天
                date.setDate(date.getDate() - 1);
                let beYesterdayS = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                //近七天
                date.setDate(date.getDate() - 5);
                let beSevendayS = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                switch (_this.dateVal) {
                    case '0':
                        _this.startDate = "";
                        _this.stopDate = "";
                        break;
                    case '1': //今天
                        _this.startDate = todayS + " 00:00:00";
                        _this.stopDate = todayS + " 23:59:59";
                        break;
                    case '2': //昨天
                        _this.startDate = yesterdayS + " 00:00:00";
                        _this.stopDate = yesterdayS + " 23:59:59";
                        break;
                    case '3': //昨天至今天
                        _this.startDate = yesterdayS + " 00:00:00";
                        _this.stopDate = todayS + " 23:59:59";
                        break;
                    case '4': //前天
                        _this.startDate = beYesterdayS + " 00:00:00";
                        _this.stopDate = beYesterdayS + " 23:59:59";
                        break;
                    case '5': //近七天
                        _this.startDate = beSevendayS + " 00:00:00";
                        _this.stopDate = todayS + " 23:59:59";
                        break;
                }
                console.log(_this.startDate);
                console.log(_this.stopDate);
            },
            init(){
                let _this = this;
                _this.ajaxUtilFun(0, {id:_this.appConfig.getUserInfo().organParentsId});
                _this.initmap();
            },
            //map
            initmap() {
                let _this = this;
                _this.map = new BMap.Map(this.$refs.carposiMap, {
                    minZoom: 1,
                    maxZoom: 18
                }); // 创建Map实例
                _this.map.setMapStyle(_this.mapStyle);
                _this.map.clearOverlays();
                _this.map.centerAndZoom("西安", 5); 
              //  _this.map.centerAndZoom(new BMap.Point(_this.pointArr[0].lng, _this.pointArr[0].lat), 16); // 初始化地图,设置中心点坐标和地图级别
                _this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
                _this.map.addControl(new BMap.NavigationControl());
                _this.map.addControl(new BMap.ScaleControl());
                _this.map.addControl(new BMap.OverviewMapControl({
                    isOpen: true
                })); 
            },

            initMapExec() {
                let _this = this;
                let points = [];
                var j = 0;
                _this.pointArr.forEach((ele, i) => {
                    points.push(new BMap.Point(ele.lng, ele.lat));
                });
                /**添加终点和起点的标记**/
                _this.addMarker(new BMap.Point(points[0].lng, points[0].lat), 'lStart');
                _this.addMarker(new BMap.Point(points[points.length - 1].lng, points[points.length - 1].lat),
                    'lStop');
                //停车marker point数组
                let parkingMarkers = [
                    points[1],
                    points[5],
                    points[6],
                    points[8]
                ];
                for (let i = 0; i < parkingMarkers.length; i++) {
                    _this.addMarker(parkingMarkers[i], 'station');
                }

                let polyline = new BMap.Polyline(points, {
                    strokeColor: "rgba(77,132,229,1)",
                    strokeWeight: 6,
                    strokeOpacity: 0.8
                });
                _this.map.addOverlay(polyline); //添加轨迹到地图
                _this.lushu = new BMapLib.LuShu(_this.map, points, {
                    //landmarkPois:此参数是路书移动的时候碰到这个点会触发pauseTime停留中设置的时间，单位为秒，经纬度误差超过十米不会停止
                    landmarkPois: [{
                            lng: parkingMarkers[0].lng,
                            lat: parkingMarkers[0].lat,
                            html: '',
                            pauseTime: 1
                        },
                        {
                            lng: parkingMarkers[1].lng,
                            lat: parkingMarkers[1].lat,
                            html: '',
                            pauseTime: 1
                        },
                        {
                            lng: parkingMarkers[2].lng,
                            lat: parkingMarkers[2].lat,
                            html: '',
                            pauseTime: 1
                        },
                        {
                            lng: parkingMarkers[3].lng,
                            lat: parkingMarkers[3].lat,
                            html: '',
                            pauseTime: 1
                        }
                    ],
                    defaultContent: '',
                    speed: _this.playSpeed, //速度，单位米每秒
                    /* 1、需要把图片和代码放在同一个文件夹下面
                     * 2、size()是设置图片大小，图片过大可以截取
                     * 3、anchor是设置偏移，默认是图片最中间，设置偏移目的是让图片底部中间与坐标重合
                     */
                    icon: new BMap.Icon('../../../static/img/jjbx/MonitorManage/track/48.png', new BMap.Size(
                        48, 48), {
                        anchor: new BMap.Size(30, 28)
                        // anchor: new BMap.Size(30, 34)
                    }),
                    autoView: true,
                    polyLine: {
                        isShow: true,
                        color: 'rgba(0,0,0,1)',
                        weight: 5,
                        opacity: 0.5
                    },
                    markerLabel: {
                        isShow: true,
                        offsetSize: {
                            x: 8,
                            y: 8
                        }
                    },
                    enableRotation: true
                }, _this.pointArr);
            },
            addMarker(point, iconUrl) {
                let _this = this;
                let myIcon = new BMap.Icon(
                    "../../../static/img/jjbx/MonitorManage/track/" + iconUrl + ".png",
                    new BMap.Size(32, 40), {
                        anchor: new BMap.Size(16, 35) //定位偏移
                    }
                );
                let marker = new BMap.Marker(point, {
                    icon: myIcon
                });
                _this.map.addOverlay(marker);
            },
            onStart() {
                let _this = this;
                if(_this.lushu){
                    _this.map.setZoom(10);
                    _this.lushu.start();
                }                
            },
            onPause() {
                let _this = this;                
                if(_this.lushu){
                //    _this.lushu.hideInfoWindow();
                    _this.lushu.pause(_this.playSpeed);
                }                
            },
            onStop() {
                let _this = this;
                if(_this.lushu){
                    _this.$emit('upPrantPlayStart', '0');
                    _this.lushu.stop();  
                }
                
            },
            onDragStart(e) {
                this.carWindow.dragBorder = "1px dashed #95B8E7";
                this.carWindow.dragBorderRad = "0";
                var divx = e.clientX - document.getElementById("drag").offsetLeft;
                var divy = e.clientY - document.getElementById("drag").offsetTop;
                document.onmousemove = function (e) {
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
            onDragClose() {
                this.carWindow.dragBorder = "0";
                this.carWindow.dragBorderRad = "6px";
            },

            //ajax public fun
            ajaxUtilFun(tId, param) {
                let _this = this;
                let aUrl = _this.global_.apiUrlJj + "";
                let ajaxFun = function (callFun, errMsg) {
                    ajax.get(aUrl, {
                            params: param
                        })
                        .then(function (res) { 
                            if (res.data.isSuccess) {
                                if (typeof callFun == "function") {
                                    callFun(res);
                                }
                            } else {
                                _this.$message({
                                    showClose: true,
                                    type: "error",
                                    message: errMsg
                                });
                            }
                        })
                        .catch(function (error) {
                            //          console.log(error); 
                            _this.$message({
                                showClose: true,
                                message: error.data.errMessage,
                                type: 'error'
                            });
                        });
                };
                switch (tId) {
                    case 0: //获取车辆lists
                        aUrl += "/get/select-car-all";
                        ajaxFun(function (res) {
                            _this.getCarLists(res);
                        }, '车辆列表获取失败!');
                        break;
                    case 1: //获取轨迹回放数据
                        aUrl += "/get/trackball-car";
                        ajaxFun(function (res) {
                            _this.getCarTrack(res,param);
                        }, '轨迹回放数据获取失败!');
                        break;
                }
            },
            getCarLists(res){
                let _this = this;
                console.log(res); 
                _this.caroptions = res.data.data;
            },
            getCarTrack(res,params) {
                let _this = this;
                _this.pointArr = res.data.data;
                if(_this.pointArr.length <= 0){
                    _this.$message({
                        showClose: true,
                        message:'该时间段没有历史轨迹数据',
                        type: 'warning'
                    });
                    params.isBegin = false; 
                }else{
                    _this.initMapExec();
                }                
                _this.$emit('carTrackSearch', params);
            },
            onSearch() {
                let _this = this;
                _this.onStop() ;
                _this.startDate = _this.$dateFormat(_this.startDate);
                _this.stopDate = _this.$dateFormat(_this.stopDate);
                console.log("开始时间：" + _this.startDate);
                console.log("结束时间：" + _this.stopDate);
                console.log("选中车辆：" + _this.carId); 
                if (_this.startDate == '' || _this.stopDate == '' || _this.carId == '') {

                    _this.$message({
                        type: "warning",
                        showClose: true,
                        message: '请选择查询条件'
                    });
                    return;
                }
                let params = {
                    isBegin:true,
                    startTime: _this.startDate,
                    endTime: _this.stopDate,
                    id: _this.carId
                };
                _this.ajaxUtilFun(1, params);
            }
        },
        watch: {
            plapProp: {
                immediate: true,
                handler: function (newVal, oldVal) {
                    let _this = this;
                    if (newVal != undefined && newVal != "") {
                        if (oldVal != undefined && oldVal != "") {
                            if (newVal.playvalue != oldVal.playvalue) {
                                _this.$emit('upPrantPlayStart', '0');
                                switch (newVal.playvalue) {
                                    case '1':
                                        _this.playSpeed = 3000;
                                        break;
                                    case '2':
                                        _this.playSpeed = 10000;
                                        break;
                                    case '3':
                                        _this.playSpeed = 15000;
                                        break;
                                }
                                _this.onPause();
                                return;
                            }
                        }
                        switch (newVal.isStart) {
                            case '0':
                                _this.onPause();
                                break;
                            case '1':
                                _this.onStart();
                                break;
                            case '2':
                                _this.onStop();
                                break;
                        }
                    }
                },
                deep: true
            }
        },
        beforeDestroy() {}
    };

</script>
<style scoped>
    .child-cartrack-body {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .child-cartrack-map {
        width: 100%;
        height: 100%;
    }

    .child-cartrack-body .dialog-body {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 230px;
        height: auto;
        /*     background-color: #fff; */
        z-index: 2000;
        border-radius: 6px;
    }

    .child-cartrack-body .dialog-body .dialog-title {
        cursor: move;
        width: auto;
        color: #fff;
        height: 32px;
        line-height: 32px;
        background: #2e92f6;
        border-radius: 6px 6px 0 0;
        border-bottom: 1px solid #EFEFEF;
        /* margin-bottom: 5px; */
        padding: 0 16px;
    }

    .child-cartrack-body .dialog-body .dialog-row {
        height: 30px;
        width: auto;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        padding: 3px 16px 0 16px;
    }

    .child-cartrack-body .dialog-body .dialog-row2 {
        height: 30px;
        width: auto;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        padding: 12px 16px;
        text-align: right;
        border-radius: 0 0 6px 6px;
    }

    .child-cartrack-body .dialog-body .dialog-row .dialog-columnL {
        width: 60px;
        float: left;
        height: 100%;
        line-height: 30px;
    }

    .child-cartrack-body .dialog-body .dialog-row .dialog-columnR {
        width: 135px;
        float: left;
    } 

</style>

<style>
    /*************el-DatePicker  begin**************/
    /* .child-cartrack-body .el-date-editor.el-input,
    .child-cartrack-body .el-date-editor.el-input__inner {
        width: 100% !important;
    } */

    .child-cartrack-body .el-date-editor.el-input, .child-cartrack-body .el-date-editor.el-input__inner{
        width: auto;
    }

    /*************el-DatePicker  stop**************/
    /*************BMapLabel  begin**************/
    /*  .child-cartrack-body .BMapLabel{ 
         text-align: center;
    }
    .child-cartrack-body .BMapLabel p{
        line-height:10px;
    } */
    /*************BMapLabel  stop**************/
</style>

