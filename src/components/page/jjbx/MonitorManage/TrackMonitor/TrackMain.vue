<!--   
    name：车辆轨迹回放
    desc：车辆轨迹回放主界面 v1.0
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.9.29
-->
<template>
    <div v-loading="deptLoading" ref="truckbody" class="common-truckmains-body">
        <!-- map -->
        <div id="carTrack" ref="carTrack" style="float: left;width:100%;height: 100%;">
            <cars-track :plapProp="{playvalue:playvalue,isStart:isStart}" v-on:upPrantPlayStart="setPrantIsStart($event)"
                v-on:carTrackSearch="onSearchCarTrack($event)"></cars-track>
        </div>
        <div class="common-truckmains-bottom">
            <div class="tabs">
                <el-radio-group v-model="radioListTab" size="medium" style="vertical-align: bottom;margin-top:2px;">
                    <el-radio-button label="0">轨迹点({{ tableData.length }})</el-radio-button>
                    <el-radio-button label="1">停车({{stopTableData.length}})</el-radio-button>
                    <el-radio-button label="2">报警({{ warnTableData.length }})</el-radio-button>
                </el-radio-group>
                <div class="playOptions">
                    <div class="option">
                        <el-select v-model="playvalue" placeholder="请选择" size="mini">
                            <el-option v-for="item in playoptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="option">
                        <img v-show="isStart=='0' || isStart == '2'" @click="isStart='1'" src="../../../../../../static/img/jjbx/MonitorManage/track/start.png" />
                        <img v-show="isStart=='1'" @click="isStart='0'" src="../../../../../../static/img/jjbx/MonitorManage/track/zt.png" />
                    </div>
                    <div class="option">
                        <img @click="isStart='2'" src="../../../../../../static/img/jjbx/MonitorManage/track/reset.png" />
                    </div>
                    <div class="option">
                        <img v-show="!winMax" @click="winMax=!winMax" src="../../../../../../static/img/jjbx/MonitorManage/track/fd.png" />
                        <img v-show="winMax" @click="winMax=!winMax" src="../../../../../../static/img/jjbx/MonitorManage/track/sx.png" />
                    </div>
                </div>
            </div>

            <!-- <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" v-bind:css="false"> -->
            <!-- <transition name="common-truckmains-bottom-move"> -->

            <!--    <transition name="el-fade-in-linear" v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
            v-bind:css="false"> -->
            <!-- <transition name="fade" @before-enter="handleBeforeEnter" @enter="handlerEnter" @after-enter="handleAfterEnter"> -->
            <div v-show="winMax && radioListTab==0" class="lists">
                <el-table :data="tableData" border :highlight-current-row="true" :stripe="true" :header-cell-style="{background:'rgba(238,245,251,1)' }"
                    height=" 100% " :row-class-name="onSetRowIndex" @cell-mouse-enter="handleMouseEnter"
                    @cell-mouse-leave="handleMouseOut">
                    <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80">
                    </el-table-column>
                    <!-- <el-table-column prop="carOrganName" align="center" label="所属机构" width="180" :show-overflow-tooltip="true">
                    </el-table-column> -->
                    <el-table-column prop="msgTime" align="center" label="定位时间" width="180" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="speed" align="center" label="速度(km/h)" width="110" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="mileage" align="center" label="里程(km)" width="110">
                    </el-table-column>
                    <el-table-column prop="status" align="center" label="状态" width="180">
                    </el-table-column>
                    <el-table-column prop="mapLocation" align="center" label="位置" width="210"> 
                    </el-table-column>
                    <el-table-column prop="lng" align="center" label="经度" width="110">
                    </el-table-column>
                    <el-table-column prop="lat" align="center" label="纬度" width="110">
                    </el-table-column>
                </el-table>
            </div>
            <!-- @cell-mouse-enter="handleMouseEnter"
                    @cell-mouse-leave="handleMouseOut" -->
            <div v-show="winMax && radioListTab==1" class="lists">
                <el-table :data="stopTableData" border :highlight-current-row="true" :stripe="true" :header-cell-style="{background:'rgba(238,245,251,1)' }"
                    height=" 100% " :row-class-name="onSetRowIndex">
                    <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80">
                    </el-table-column>
                    <el-table-column prop="keyId" align="center" label="设备ID" width="150" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="type" align="center" label="类型" width="110" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="count" align="center" label="次数" width="110">
                    </el-table-column>
                    <el-table-column prop="mapLocation" align="center" label="位置" width="210">
                    </el-table-column>
                    <el-table-column prop="longitude" align="center" label="经度" width="110">
                    </el-table-column>
                    <el-table-column prop="latitude" align="center" label="纬度" width="110">
                    </el-table-column>
                    <el-table-column prop="startTime" align="center" label="开始时间" width="150">
                    </el-table-column>
                    <el-table-column prop="endTime" align="center" label="结束时间" width="150">
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="winMax && radioListTab==2" class="lists">
                <el-table :data="warnTableData" border :highlight-current-row="true" :stripe="true" :header-cell-style="{background:'rgba(238,245,251,1)' }"
                    height=" 100% " :row-class-name="onSetRowIndex">
                    <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80">
                    </el-table-column>
                    <el-table-column prop="keyId" align="center" label="设备ID" width="150" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="deviceType" align="center" label="设备类型" width="110" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="warningType" align="center" label="报警类型" width="110">
                    </el-table-column>
                    <el-table-column prop="tsrLevel" align="center" label="报警级别" width="110">
                    </el-table-column>
                    <el-table-column prop="hmwSec" align="center" label="报警持续时间" width="150">
                    </el-table-column>
                    <el-table-column prop="tsrSec" align="center" label="超时持续时间" width="150">
                    </el-table-column>
                    <el-table-column prop="carStatus" align="center" label="状态" width="110">
                    </el-table-column>
                    <el-table-column prop="speed" align="center" label="速度" width="110">
                    </el-table-column>
                    <el-table-column prop="mapLocation" align="center" label="位置" width="210">
                    </el-table-column>
                    <el-table-column prop="longitude" align="center" label="经度" width="110">
                    </el-table-column>
                    <el-table-column prop="latitude" align="center" label="纬度" width="110">
                    </el-table-column>
                    <el-table-column prop="msgTime" align="center" label="报警时间" width="150">
                    </el-table-column>
                </el-table>
            </div>
            <!-- </transition> -->
        </div>
    </div>
</template>
<script>
    import ajax from "axios";
    import Velocity from "velocity-animate";
    import carsTrack from "@/components/child/jjbx/MonitorManage/TrackMonitor/CarTrack.vue";
    export default {
        components: {
            carsTrack
        },
        props: {
            optionParam: {
                type: Object
            }
        },
        data() {
            return {
                deptLoading: false,
                playoptions: [
                    {
                        value: '1',
                        label: '1X'
                    }, {
                        value: '2',
                        label: '2X'
                    }, {
                        value: '3',
                        label: '3X'
                    }
                ],
                playvalue: "1",
                isStart: 0, //播放开始
                winMax: false, //窗口放大
                tableData: [],
                warnTableData: [],
                stopTableData: [],
                radioListTab: "0" //底部列表选项卡单选值
            };
        },
        computed: {},
        mounted() {},        
        methods: {
            beforeEnter: function (el) {
                el.style.opacity = 0;
                el.style.transformOrigin = "left";
            },
            enter: function (el, done) {
                Velocity(
                    el, {
                        opacity: 1,
                        translateY: "0px"
                    }, {
                        duration: 300
                    }
                );
                Velocity(
                    el, {
                        translateY: "0px"
                    }, {
                        complete: done
                    }
                );
            },
            leave: function (el, done) {
                Velocity(
                    el, {
                        translateY: "45px"
                    }, {
                        duration: 100
                    }
                );
                Velocity(
                    el, {
                        opacity: 0
                    }, {
                        complete: done
                    }
                );
            },
            setPrantIsStart(val) {
                let _this = this;
                _this.isStart = val;
            },
            //ajax public fun
            ajaxUtilFun(tId, param) {
                let _this = this;
                let aUrl = _this.global_.apiUrlJj + "";
                _this.deptLoading = true;
                let ajaxFun = function (callFun, errMsg) {
                    ajax.get(aUrl, {
                            params: param
                        })
                        .then(function (res) {
                            // console.log(res);
                            _this.deptLoading = false;
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
                            _this.deptLoading = false;
                            _this.$message({
                                showClose: true,
                                message: error.data.errMessage,
                                type: 'error'
                            });
                        });
                };
                switch (tId) {
                    case 1: //获取轨迹回放数据
                        aUrl += "/get/trackball-car-message";
                        ajaxFun(function (res) {
                            _this.getCarTrackList(res);
                        }, '轨迹回放数据获取失败!');
                        break;
                    case 2: //获取车辆报警明细
                        aUrl += "/get/trackball-car-call";
                        ajaxFun(function (res) {
                            _this.getCarWarnList(res);
                        }, '车辆报警明细获取失败!');
                        break;
                    case 3: //获取车辆停车明细
                        aUrl += "/get/car-stop";
                        ajaxFun(function (res) {
                            _this.getCarStopList(res);
                        }, '车辆停车明细获取失败!');
                        break;
                }
            },
            getMapLocation(lng,lat,i,callFun){
                if(!lng || !lat) return;
                let mapLocation = '';
                let ptLng = lng;
                let ptLat = lat;
                let geoc = new BMap.Geocoder();
                geoc.getLocation(new BMap.Point(ptLng,ptLat), function(rs){
                    let addComp = rs.addressComponents;
                    mapLocation = addComp.province  + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                    if(typeof callFun == "function"){
                        callFun(i,mapLocation);
                    }
                }); 
            },
            getCarTrackList(res) {
                console.log(res);
                let _this = this;
                let reVal = res.data.data;
                let j=0,count=0;
                while (j<reVal.length) {
                    _this.getMapLocation(reVal[j].lng+"",reVal[j].lat+"",j,function name(jj,mLocation) {
                        reVal[jj].mapLocation = mLocation;
                        count++;
                        if(count >= (reVal.length-1)){
                            _this.tableData = reVal;
                        }
                    });
                    j++;
                }
            },
            getCarWarnList(res) {
                console.log(res); 
                let _this = this;
                let reVal = res.data.data;
                let j=0,count=0;
                while (j<reVal.length) {
                    _this.getMapLocation(reVal[j].longitude+"",reVal[j].latitude+"",j,function name(jj,mLocation) {
                        reVal[jj].mapLocation = mLocation;
                        count++;
                        if(count >= (reVal.length-1)){
                            _this.warnTableData = reVal;
                        }
                    });
                    j++;
                }
            },
            getCarStopList(res) {
                console.log(res); 
                let _this = this;
                let reVal = res.data.data.content;
                let j=0,count=0;
                while (j<reVal.length) {
                    _this.getMapLocation(reVal[j].longitude+"",reVal[j].latitude+"",j,function name(jj,mLocation) {
                        reVal[jj].mapLocation = mLocation;
                        count++;
                        if(count >= (reVal.length-1)){
                            _this.stopTableData = reVal;
                        }
                    });
                    j++;
                }
            },
            onSearchCarTrack(params) {
                let _this = this;
                // console.log("子组件传回查询条件：");
                // console.log(params);
                if (params.isBegin) {
                    params.currentPage = 1;
                    params.pageSize = 4;
                    _this.ajaxUtilFun(1, params);//轨迹
                    _this.ajaxUtilFun(2, params);//报警
                    _this.ajaxUtilFun(3,params);//停车
                } else {
                    _this.tableData = [];
                    _this.warnTableData = [];
                    _this.stopTableData = [];
                }

            },
            onSetRowIndex({
                row,
                rowIndex
            }) {
                //把每一行的索引放进row
                row.index = rowIndex;
            },
            /**
             * @function {获取下一行}
             * @param  {number} index {行索引}
             * @return {number} {下一行索引}
             */
            indexMethod(index) {
                return index + 1;
            },
            /**
             * @function {鼠标 hover 进入时触发事件}
             * @param  {string} row    {行}
             * @param  {object} event  {description}
             * @param  {string} column {列}
             * @return {type} {description}
             */
            handleMouseEnter: function (row, event, column) {
                var index = row.index;
                this.tableData[row.index].isSele = true;
            },
            /**
             * @function {鼠标 hover 退出时触发事件}
             * @param  {type} row    {行}
             * @param  {type} event  {description}
             * @param  {type} column {列}
             * @return {type} {description}
             */
            handleMouseOut: function (row, event, column) {
                this.tableData[row.index].isSele = false;
            }
        },
        beforeDestroy() {}
    };

</script>
<style>
    .common-truckmains-body {
        position: relative;
        width: 100%;
        height: calc(100% - 81px);
    }

    .common-truckmains-body .common-truckmains-bottom {
        position: absolute;
        z-index: 2000;
        bottom: 0;
        left: 0;
        float: left;
        width: 100%;
        height: auto;
        background-color: #f6f6f6;
    }

    .common-truckmains-bottom .tabs {
        width: 100%;
        height: 37px;
        border-bottom: 1px solid #409eff;
    }

    .common-truckmains-bottom .lists {
        width: auto;
        height: 160px;
        box-sizing: content-box;
        padding: 7px;
    }

    .common-truckmains-body ::-webkit-scrollbar {
        width: 8px;
        border-radius: 10px;
        background-color: #e7eaee;
    }

    /*定义滚动条的轨道颜色、内阴影及圆角*/
    .common-truckmains-bottom ::-webkit-scrollbar-track {
        background-color: #e7eaee;
    }

    /*定义滑块颜色、内阴影及圆角*/
    .common-truckmains-bottom ::-webkit-scrollbar-thumb {
        border-radius: 17px;
        width: 5px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #fff;
    }

    /*定义两端按钮的样式*/
    .common-truckmains-bottom ::-webkit-scrollbar-button {
        background-color: #e7eaee;
    }

    /*定义右下角汇合处的样式*/
    .common-truckmains-bottom ::-webkit-scrollbar-corner {
        background: #e7eaee;
    }

    .common-truckmains-body .playOptions {
        float: right;
        height: 100%;
        width: auto;
    }

    .playOptions .option {
        float: left;
        height: 100%;
        width: auto;
        line-height: 38px;
        margin-right: 12px;
        cursor: pointer;
    }

    .common-truckmains-body .option img {
        width: 18px;
        height: 18px;
        margin-top: 10px;
    }

    /* 进入 */
    .common-truckmains-bottom-move-enter-active {
        transition: all 0.8s cubic-bezier(0.3, 0.5, 0.8, 1);
    }

    /* 离开 */
    .common-truckmains-bottom-move-leave-active {
        transition: all 0.8s cubic-bezier(0.3, 0.5, 0.8, 1);
    }

    .common-truckmains-bottom-move-enter,
    .common-truckmains-bottom-move-leave-active {
        transform: translateY(120px);
        opacity: 0.5;
    }

    /* element ui --- table style ---start */
    .common-truckmains-body .el-table__body {
        /* margin-top: 10px; */
        border-radius: 4px !important;
    }

    .common-truckmains-body .el-table__body tr {
        height: 35px !important;
    }

    .common-truckmains-body .el-table {
        width: 100%;
        border: 1px solid rgba(237, 241, 245, 1);
    }

    .common-truckmains-body .el-table td,
    .el-table th {
        padding: 2px !important;
    }

    .common-truckmains-body .el-input--small .el-input__inner {
        height: 32px !important;
        line-height: 32px !important;
    }

    .common-truckmains-body .el-input__inner {
        box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1) !important;
    }

    .common-truckmains-body .el-input--suffix .el-input__inner {
        padding-right: 10px !important;
        width: 135px !important;
    }

    .common-truckmains-body .el-table {
        color: #909090 !important;
        padding-top: 0 !important;
    }

    .common-truckmains-body .el-table th>.cell {
        font-size: 14px !important;
        font-family: PingFang-SC-Medium !important;
        font-weight: 700 !important;
        color: rgba(30, 30, 30, 1) !important;
    }

    .common-truckmains-body .el-table .cell {
        font-size: 12px !important;
        font-family: PingFang-SC-Bold !important;
    }

    .common-truckmains-body .el-table--enable-row-hover .el-table__body tr:hover>td {
        background: #2f95f4 !important;
        color: #fff;
    }

    .common-truckmains-body .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #f6f8f9;
    }

    /* element ui --- table style ---end */

</style>
