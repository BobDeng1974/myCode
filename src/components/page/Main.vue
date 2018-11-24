<!--   
    name：东营大屏项目主页面
    desc: 实现 年度考核指标对比、月度考核指标对比、市级地图、区县车辆散点、入网车辆违章占比、区域综合评分排名等子组件的数据传值
    param：city、area
        1、通过url进行传参，均为空则city默认为东营
        2、根据city、area进行空判断界面类型为地市级 or 县区级，tId赋值为C or A 
    author：wenls 
    date：2018.8.22
-->
<template>
    <div id="index" class="main-body" ref="ytzaIndex">
        <div class="main-top-left">
            <div class="left">
                <span style="color: #fff">当前所在：</span>宏观运行分析
            </div>
            <div class="right">
                <div style="float: left;font-size:12px;"> {{ currentDate }}</div>
                <div style="float: right;padding-right:30px;position: relative;">
                    <img v-if="isFull" src="../../../static/img/fd.png" @click="fullScreen();" style="width:10px;position: absolute;top:10px;right: 10px;"
                    />
                    <img v-if="!isFull" src="../../../static/img/sx.png" @click="exitFullScreen();" style="width:10px;position: absolute;top:10px;right: 10px;"
                    />
                </div>
            </div>
        </div>
        <div class="main-top-right">
            <div id="sDate" class="left float-left">
                <span>市：</span>
                <select>
                    <option>东营市</option>
                </select>
                &nbsp;&nbsp;时间：
                <el-date-picker v-model="seleDate" type="month" :clearable="false" placeholder="选择月" style="width:90px;padding:0;height:25px;"></el-date-picker>
                <el-button type="primary" @click="searchData();" style="background-color:#459DF7;width:70px;height:25px;padding:0;margin:0px;">查询
                    <i class="el-icon-search el-icon--right"></i>
                </el-button>
            </div>
            <div class="left float-right">
                <el-button style="height:25px;width: 70px;height: 25px;padding: 0px;margin: 0px;" type="primary" size="mini">市</el-button>
            </div>
        </div>
        <div class="main-center">
            <!-- 左侧布局 -->
            <div class="left float-left">

                <!-- 左侧上部布局 -->
                <div class="infobody margin-right-5">
                    <div class="infodesc">
                        班线客车注册/入网数
                    </div>
                    <div class="infocode">
                        {{ netInObj.resData[0].RegistedCount }}/{{ netInObj.resData[0].NetInCount }}
                    </div>
                </div>
                <div class="infobody margin-left-5">
                    <div class="infodesc">
                        游览车辆注册/入网数
                    </div>
                    <div class="infocode">
                        {{ netInObj.resData[1].RegistedCount }}/{{ netInObj.resData[1].NetInCount }}
                    </div>
                </div>
                <div class="infobody margin-right-5 margin-top-8">
                    <div class="infodesc">
                        危险品车注册/入网数
                    </div>
                    <div class="infocode">
                        {{ netInObj.resData[3].RegistedCount }}/{{ netInObj.resData[3].NetInCount }}
                    </div>
                </div>
                <div class="infobody margin-left-5 margin-top-8">
                    <div class="infodesc">
                        普通货车注册/入网数
                    </div>
                    <div class="infocode">
                        {{ netInObj.resData[2].RegistedCount }}/{{ netInObj.resData[2].NetInCount }}
                    </div>
                </div>
                <!-- 左侧下部布局 -->
                <div style="clear: both;"></div>
                <div class="infoBing">

                    <div class="title">
                        <img src="../../../static/img/duibi.png" class="titleimg" />年度考核指标对比
                    </div>
                    <div :style="{width:'100%',height:'calc( 100% - 20px )'}">
                        <echarts-yearassessment :optionParam="yearAssessmentObj.resData"></echarts-yearassessment>
                    </div>
                </div>
            </div>

            <!-- 中部布局 -->
            <div class="center float-left">
                <div class="echartsMap">
                    <div class="title">
                        <img src="../../../static/img/monitor.png" class="titleimg" />实时监控
                    </div>
                    <div ref="echartsMap" :style="{width:'100%',height:'calc( 100% - 20px )'}">
                        <echarts-map v-if="tId=='C'" v-on:esMapData="getEsMapData" :onLineTruckProp="onLineTruckObj.resData" :generalPointsProp="generalPointsObj.resData"></echarts-map>
                        <echarts-chinamap v-if="tId=='A'" :optionProp="areaChinaMapObj.resData"></echarts-chinamap>
                    </div>
                    <div v-if="popoverConfig.isShowRealTime" class="popover-main" :style="{left:popoverConfig.x_RealTime+'px',top:popoverConfig.y_RealTime+'px'}">
                        <div class="title">
                            <div class="company-name">企业综合排名</div>
                            <div @click="searchArearOrganSummary(1);" class="tab1" :class="{'seleCol':arearOrganSummaryObj.isTab,'unseleCol':!arearOrganSummaryObj.isTab}">正向排名</div>
                            <div @click="searchArearOrganSummary(2);" class="tab2" :class="{'seleCol':!arearOrganSummaryObj.isTab,'unseleCol':arearOrganSummaryObj.isTab}">负向排名</div>
                            <div @click="popoverConfig.isShowRealTime=!popoverConfig.isShowRealTime" style="position: absolute;width:12px;height:12px;background: url('static/img/close.png');right: 0;top: 5px;"></div>
                        </div>
                        <div class="center">
                            <div class="row-title">
                                <div :style="{width:'195px'}" class="column" style="text-align: left;">
                                     &nbsp;&nbsp;企业名称
                                </div>
                                <!-- <div :style="{width:'55px'}" class="column2">
                                    注册
                                    <br/>车辆数
                                </div> -->
                                <div :style="{width:'55px'}" class="column">
                                    车辆总数
                                </div>
                                <div :style="{width:'85px'}" class="column">
                                    <!-- 入网车辆总数 -->
                                    入网率
                                </div>
                                <div :style="{width:'55px'}" class="column">
                                    在线率
                                </div>
                                <!-- <div :style="{width:'50px'}" class="column">
                                    入网率
                                </div> -->
                                <!-- <div :style="{width:'55px'}" class="column2">
                                    遮挡
                                    <br/>报警率
                                </div>
                                <div :style="{width:'60px'}" class="column2">
                                    设备运
                                    <br/>行正常率
                                </div>
                                <div :style="{width:'60px'}" class="column2">
                                    百公里
                                    <br/>综合扣分
                                </div> -->
                                <!-- <div :style="{width:'70px'}" class="column2">
                                    预报警
                                    <br/>处置响应率
                                </div> -->
                                <!-- <div :style="{width:'50px'}" class="column2">
                                    综合评分
                                </div> -->
                            </div>
                            <div style="clear: both;"></div>
                            <div v-for="(item,key,index) in arearOrganSummaryObj.resData.data" :key="index" :style="{background:'#233D52'}"
                                class="row-data">
                                <div v-bind:title="item.OrgName" :style="{width:'195px'}" style="text-align:left;" class="column1">
                                    &nbsp;&nbsp;{{ item.OrgName | textFormat(13,true) }}
                                </div>
                                <div :style="{width:'55px'}" class="column1">
                                    {{ item.TruckCount  }}
                                </div>
                                <div :style="{width:'85px'}" class="column1">
                                    {{ item.NetTruckCount  }}%
                                </div>
                                <div :style="{width:'55px'}" class="column1">
                                    {{ item.OnLineCarsCount  | numFormat(2) }}%
                                </div>
                                <!-- <div :style="{width:'55px'}" class="column1">
                                    {{ item.TruckCount }}
                                </div>
                                <div :style="{width:'50px'}" class="column1">
                                    {{ item.OnLineRate }}
                                </div> -->
                                <!-- <div :style="{width:'50px'}" class="column1">
                                    {{ item.NetRate | numFormat(2) }}%
                                </div> -->
                                <!-- <div :style="{width:'55px'}" class="column1">
                                    {{ item.TamperRate | numFormat(2) }}%
                                </div>
                                <div :style="{width:'60px'}" class="column1">
                                    {{ item.OnLineRate | numFormat(2) }}%
                                </div>
                                <div :style="{width:'60px'}" class="column1">
                                    {{ item.HundredKMDeduction | numFormat(2) }}
                                </div> -->
                                <!-- <div :style="{width:'70px'}" class="column1">
                                    {{ item.AlarmResponseRate | numFormat(2) }}%
                                </div> -->
                                <!-- <div :style="{width:'50px'}" class="column1">
                                    {{ item.OverallRating | numFormat(2) }}
                                </div> -->
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </div>

                </div>
            </div>
            <!-- 右侧布局 -->
            <div class="left right float-right">
                <div class="echartspeccancyproportion">
                    <div class="title">
                        <img src="../../../static/img/zhanbi.png" class="titleimg" />入网车辆违章占比
                    </div>
                    <div ref="echartspeccancyproportion" :style="{width:'100%',height:'calc( 100% - 20px )'}">
                        <echarts-peccancyproportion :optionParam="peccancyProportionObj.resData"></echarts-peccancyproportion>
                    </div>
                </div>
                <div class="echartsLineX">
                    <div class="title">
                        <img src="../../../static/img/rank.png" class="titleimg" />区域综合评分排名
                    </div>
                    <div ref="echartsLineX" :style="{width:'100%',height:'calc( 100% - 20px )'}">
                        <echarts-barregionalrank :optionParam="regionalRankObj.resData" v-on:esRegionalRankTab="getEsRegionalRankTab"></echarts-barregionalrank>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部布局 -->
        <div class="main-bottom">
            <div class="left">
                <div class="title">
                    <img src="../../../static/img/zhifangtu.png" class="titleimg" />月度考核指标对比
                </div>
                <div ref="echartsLineY" :style="{width:'100%',height:'calc( 100% - 20px )'}">
                    <echarts-monthassessment :optionParam="monthAssessmentObj.resData"></echarts-monthassessment>
                </div>
            </div>
            <div class="right">
                <div class="title">
                    <img src="../../../static/img/situdation.png" class="titleimg" />重点企业综合运营情况
                </div>
                <div id="zbTable" ref="zbTable" :style="{width:'100%',height:'calc( 100% - 50px )'}">
                    <div class="tableRow">
                        <div class="tableCol-1 table-row-height-1 float-left col-1">排名</div>
                        <div class="tableCol-2 table-row-height-1 float-left col-1" style="text-align: left;width:24%;">企业名称</div>
                        <div class="tableCol-2 table-row-height-1 float-left col-1"  >车辆数</div>
                        <!-- <div class="tableCol-2 table-row-height-1 float-left col-1">入网率</div> -->
                        <div class="tableCol-2 table-row-height-2 float-left col-1">遮挡
                            <br/>报警率</div>
                        <div class="tableCol-2 table-row-height-2 float-left col-1">设备运行
                            <br/>正常率</div>
                        <div class="tableCol-2 table-row-height-2 float-left col-1">百公里
                            <br/>综合扣分</div>
                        <!-- <div class="tableCol-3 table-row-height-2 float-left col-1">预报警处 -->
                            <!-- <br/>置响应率</div> -->
                        <div class="tableCol-3 table-row-height-1 float-left col-1">综合评分</div>
                    </div>
                    <div style="clear: both;"></div>
                    <div class="tableRow-resoult" :class="{'bgColor':(key%2 == 1),'bgColor1':(key%2 == 0)}" v-for="(item, key, index) in companyDatas"
                        :key="index">
                        <div class="tableCol-1 table-row-height-3 float-left col-2" style="text-align: center;"  >{{ (comObj.currentPage1-1)*comObj.param.psize + key +1 }}&nbsp;
                            <span v-if="item.Rank == item.LastRank">&nbsp;&nbsp;</span>
                            <img v-if="item.Rank > item.LastRank" src="static/img/up.png" />
                            <img v-if="item.Rank < item.LastRank" src="static/img/down.png" />
                        </div>
                        <div v-bind:title="item.EnterpriseName" class="tableCol-2 table-row-height-3 float-left col-2" style="text-align: left;width:24%;" >{{ item.EnterpriseName | textFormat(15,true) }}</div>
                        <div class="tableCol-2 table-row-height-3 float-left col-2"  >{{ item.TruckCount }}</div>
                        <!-- <div class="tableCol-2 table-row-height-3 float-left col-2">{{ item.NetRate | numFormat(2)}}%</div> -->
                        <div class="tableCol-2 table-row-height-3 float-left col-2">{{ item.TamperRate | numFormat(2)}}%</div>
                        <div class="tableCol-2 table-row-height-3 float-left col-2">{{ item.OnLineRate | numFormat(2)}}%</div>
                        <div class="tableCol-2 table-row-height-3 float-left col-2">{{ item.HundredKMDeduction | numFormat(2)}}</div>
                        <!-- <div class="tableCol-3 table-row-height-3 float-left col-2">{{ item.AlarmResponseRate | numFormat(2)}}%</div> -->
                        <div class="tableCol-3 table-row-height-3 float-left col-2">{{ item.OverallRating | numFormat(2)}}</div>
                    </div>
                </div>
                <div class="title" style="float: right;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="comObj.currentPage1"
                        :page-size="comObj.param.psize" layout="total, prev, pager, next" :total="comObj.totalNumber">
                    </el-pagination>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import echartsYearassessment from "@/components/child/EchartsYearAssessment.vue";
    import echartsMonthassessment from "@/components/child/EchartsMonthAssessment.vue";
    import echartsPeccancyproportion from "@/components/child/EchartsPeccancyProportion.vue";
    import echartsBarregionalrank from "@/components/child/EchartsBarRegionalRank.vue";
    import echartsMap from "@/components/child/EchartsMap.vue";
    import echartsChinamap from "@/components/child/EchartsChinaMap.vue";
    import ajax from "axios";
    export default {
        data: function () {
            return {
                tId: "C",
                tCity:"东营",
                tArea:"",
                seleDate: new Date(), //选择日期
                isFull: true, //是否全屏
                currentDate: "", //当前日期
                popoverConfig: {
                    isShowRealTime: false, //显示开关 实时数据浮层
                    x_RealTime: 0,
                    y_RealTime: 0
                },
                //企业运营数据
                comObj: {
                    currentPage1: 1, //当前页
                    totalNumber: 0, //总条数
                    bgCor: '',
                    param: { //接口参数
                        month: '', //月份201802
                        pIndex: 1, //页码
                        psize: 5, //每页条数
                        area: '东营区' //不传即为东营全市
                    },
                    resData: null //返回数据
                },
                //入网数
                netInObj: {
                    param: { //接口参数
                        month: '' //月份201802
                    },
                    resData: [{
                        RegistedCount: 0,
                        NetInCount: 0
                    }, {
                        RegistedCount: 0,
                        NetInCount: 0
                    }, {
                        RegistedCount: 0,
                        NetInCount: 0
                    }, {
                        RegistedCount: 0,
                        NetInCount: 0
                    }] //返回数据
                },
                //年度考核指标对比
                yearAssessmentObj: {
                    param: {
                        years: '', //年份，逗号分隔2016,2017,2018
                        city: '东营' //城市 
                    },
                    resData: {
                        legend_data: ['', '', ''],
                        series_data: [{ //去年当月
                                name: "",
                                data: [0, 0, 0, 0, 0]
                            },
                            { //当前
                                name: "",
                                data: [0, 0, 0, 0, 0]
                            },
                            { //上月
                                name: "",
                                data: [0, 0, 0, 0, 0]
                            }
                        ]
                    }
                },
                //月度考核指标对比
                monthAssessmentObj: {
                    param: {
                        city: '东营',
                        month: '' //月份，逗号分隔201703,201803,201802
                    },
                    resData: {
                        xAxis_data: ['百公里综合扣分', '遮挡报警率', '设备运行正常率', '预报警处置正常率', '入网率'],
                        series_data: [{ //去年当月
                                name: "",
                                data: [0, 0, 0, 0, 0]
                            },
                            { //当前
                                name: "",
                                data: [0, 0, 0, 0, 0]
                            },
                            { //上月
                                name: "",
                                data: [0, 0, 0, 0, 0]
                            }
                        ]
                    }
                },
                //实时  当前车辆
                onLineTruckObj: {
                    param: {
                        city: '东营' //城市
                        //area=东营区//不填即为东营全市
                    },
                    resData: {
                        carCount: 0
                    }
                },
                //实时  百公里综合扣分
                generalPointsObj: {
                    param: {
                        city: '东营' //城市
                        //area=东营区//不填即为东营全市
                    },
                    resData: {
                        data: []
                    }
                },
                //实时  区域企业排名
                arearOrganSummaryObj: {
                    isTab: true,
                    param: {  
                        sort: 'asc',
                        area: '东营区', 
                        top: 5
                    },
                    resData: {
                        data: null //返回数据
                    }
                },
                //实时  区县组件
                areaChinaMapObj:{
                    param:{

                    },
                    resData:{
                        data:null 
                    }
                },
                //入网车辆违章占比
                peccancyProportionObj: {
                    param: {
                        month: '', //月份201802
                        city: '东营' //城市
                        //area=东营区//不填即为东营全市
                    },
                    resData: {
                        carCount: 0,
                        series_data: [0, 0, 0, 0]
                    }
                },
                //区域综合评分排名
                regionalRankObj: {
                    param: {
                        month: '', //月份201802
                        sort: 'asc' //升序asc，降序desc
                        //area=东营区//不填即为东营全市 
                    },
                    resData: {
                        yAxis_data: ["", "", ""],
                        series_data: [0, 0, 0]
                    }
                }
            };
        },
        components: {
            echartsYearassessment, //年度考核指标
            echartsMonthassessment, //月度考核指标
            echartsBarregionalrank, //区域综合评分排名
            echartsPeccancyproportion, //入网车辆违章占比
            echartsMap,//地市  目前固化为东营市
            echartsChinamap//县区车辆散点
        },
        computed: {
            companyDatas() {
                return this.comObj.resData;
            }
        },
        mounted() {
            let _this = this;
            _this.$nextTick(function () {
                if(_this.$route.query.city){
                    if(_this.$route.query.area){
                        _this.tId = 'A';
                        _this.tCity = this.$route.query.city;
                        _this.tArea = this.$route.query.area;
                    }else{
                        _this.tId = 'C';
                        _this.tCity = this.$route.query.city;
                        _this.tArea = '';
                    } 
                }else{
                        _this.tId = 'C';
                        _this.tCity = "东营";
                        _this.tArea = '';
                }
                console.log("=="+_this.tId); 
                _this.searchData();
                //定时更新  日期
                _this.getCurrentDate();
                setInterval(_this.getCurrentDate, 600000);
                // 定时更新  实时数据 
                if(_this.tId === 'C'){
                    setInterval(function () {
                        console.log(2000);
                        _this.ajaxUtilFun(4, _this.onLineTruckObj.param); //实时  当前运行车辆
                        _this.ajaxUtilFun(8, _this.generalPointsObj.param); //实时  百公里综合扣分
                    }, 2000); 
                }
                
            })
        },
        methods: {
            //点击查询  区域综合评分排名企业明细
            searchArearOrganSummary(param) {
                let _this = this;
                if (param == 0) {
                    let e = event || window.event;
                    let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                    let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                    let x = e.pageX || e.clientX + scrollX;
                    let y = e.pageY || e.clientY + scrollY;
                    _this.popoverConfig.x_RealTime = x + 20;
                    _this.popoverConfig.y_RealTime = y + 10;
                    _this.popoverConfig.isShowRealTime = true;
                }
                _this.arearOrganSummaryObj.isTab = param == 2 ? false : true; //判断tab切换 
                //实时  区域企业排名 
                // let sYear = _this.seleDate.getFullYear();
                // let sMonth = _this.seleDate.getMonth() + 1;
                // sMonth = sMonth.toString().length > 1 ? sMonth.toString() : "0" + sMonth.toString();

                // _this.arearOrganSummaryObj.param.month = sYear.toString() + sMonth;
                _this.arearOrganSummaryObj.param.sort = param == 2 ? "desc" : "asc";
                _this.ajaxUtilFun(9, _this.arearOrganSummaryObj.param);
            },
            //全屏
            fullScreen() {
                var el = document.documentElement,
                    rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
                    wscript;
                if (typeof rfs != "undefined" && rfs) {
                    rfs.call(el);
                    return;
                }
                if (typeof window.ActiveXObject != "undefined") {
                    wscript = new ActiveXObject("WScript.Shell");
                    if (wscript) {
                        wscript.SendKeys("{F11}");
                    }
                }
                this.isFull = true;
            },
            //取消全屏
            exitFullScreen() {
                var el = document,
                    cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
                    wscript;
                if (typeof cfs != "undefined" && cfs) {
                    cfs.call(el);
                    return;
                }
                if (typeof window.ActiveXObject != "undefined") {
                    wscript = new ActiveXObject("WScript.Shell");
                    if (wscript != null) {
                        wscript.SendKeys("{F11}");
                    }
                }
                this.isFull = false;
            },
            
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.isFull) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.isFull = !this.isFull;
            },
            //获取当前时间
            getCurrentDate() {
                let dd = new Date();
                let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                this.currentDate = dd.getFullYear() + "年" + (dd.getMonth() + 1) + "月" + dd.getDate() + "日    " +
                    weekday[dd.getDay()];
            },
            searchData() {
                let _this = this;
                let sYear = _this.seleDate.getFullYear();
                let sMonth = _this.seleDate.getMonth() + 1;
                sMonth = sMonth.toString().length > 1 ? sMonth.toString() : "0" + sMonth.toString();
                //获取入网数
                _this.netInObj.param.month = sYear.toString() + sMonth;
                _this.ajaxUtilFun(1, _this.netInObj.param);
                //年度考核指标
                _this.yearAssessmentObj.param.years = (sYear - 2) + "," + (sYear - 1) + "," + sYear; //years: '2016,2017,2018', //年份，逗号分隔
                _this.ajaxUtilFun(2, _this.yearAssessmentObj.param);
                //月度考核指标
                let lastY = (sYear - 1) + sMonth;
                let lastM = _this.seleDate.getMonth() == 0 ? (sYear - 1) + "12" : sYear + (_this.seleDate.getMonth().toString()
                    .length > 1 ? _this.seleDate.getMonth().toString() : ("0" + _this.seleDate.getMonth().toString())
                );
                _this.monthAssessmentObj.param.month = lastY + "," + sYear.toString() + sMonth + "," + lastM; //month: '201703,201803,201802' //月份，逗号分隔
                _this.ajaxUtilFun(3, _this.monthAssessmentObj.param);
                
                //判断地图类型 city or area
               if(_this.tId === "C"){
                    //实时  当前运行车辆
                    //参数只有city  默认为：东营  暂不更改
                    _this.ajaxUtilFun(4, _this.onLineTruckObj.param);
                    //实时  百公里综合扣分
                    //参数只有city  默认为：东营  暂不更改
                    _this.ajaxUtilFun(8, _this.generalPointsObj.param);
               }else{
                    //实时  地图车辆散点 areaChinaMapObj
                   _this.ajaxUtilFun(10,_this.arearOrganSummaryObj.param);
               }
                //入网车辆违章占比
                _this.peccancyProportionObj.param.month = sYear.toString() + sMonth;
                _this.ajaxUtilFun(5, _this.peccancyProportionObj.param);
                //区域综合评分排名
                _this.regionalRankObj.param.month = sYear.toString() + sMonth;
                _this.ajaxUtilFun(6, _this.regionalRankObj.param);
                //重点企业综合运营情况
                _this.comObj.param.month = sYear.toString() + sMonth;
                _this.ajaxUtilFun(7, _this.comObj.param);
            },
            handleSizeChange(val) {
          //      console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
           //     console.log(`当前页: ${val}`);
                this.comObj.param.pIndex = val;
                this.ajaxUtilFun(7, this.comObj.param);
            },
            getCompanyBgCor(itemIndex) {
                if (itemIndex % 2 == 0) {
                    this.comObj.bgCor = 'rgba(96,184,245,0.1)';
                } else {
                    this.comObj.bgCor = '';
                }
                return this.comObj.bgCor;
            },
            //ajax public fun
            ajaxUtilFun(tId, param) {
                let _this = this;
                let aUrl = baseUrl + ""; 
                let ajaxFun = function (callFun) {
                    ajax.get(aUrl, {
                            params: param
                        })
                        .then(function (res) {
                            if (res.data.Status === 'SUCCESS') {
                                if (typeof callFun == "function") {
                                    callFun(res);
                                }
                            }
                        })
                        .catch(function (error) {
                  //          console.log(error);
                        });
                };
                switch (tId) {
                    case 1: //获取入网数
                        aUrl += "/Home/RegistAndNetIn";
                        ajaxFun(function (res) {
                            _this.getNetInNum(res);
                        });
                        break;
                    case 2: //年度考核指标
                        aUrl += "/Home/YearAssessmentIndex";
                        ajaxFun(function (res) {
                            _this.getYearAssessmentIndex(res);
                        });
                        break;
                    case 3: //月度考核指标
                        aUrl += "/Home/MonthAssessmentIndex";
                        ajaxFun(function (res) {
                            _this.getMonthAssessmentIndex(res);
                        });
                        break;
                    case 4: //实时  当前运行车辆
                        aUrl += "/Home/onLineTruck";
                        ajaxFun(function (res) {
                            _this.getOnLineTruck(res);
                        });
                        break;
                    case 8: //实时  百公里综合扣分
                        aUrl += "/Home/GeneralPoints";
                        ajaxFun(function (res) {
                            _this.getGeneralPoints(res);
                        });
                        break;
                    case 9: //实时  区域企业排名 
                        // aUrl += "/Home/ArearOrganSummary";
                        aUrl += "/Home/ArearOrganSummary";
                        ajaxFun(function (res) {
                            _this.getArearOrganSummary(res);
                        });
                        break;
                    case 10: //实时  区县车辆散点地图 
                        aUrl += "/Home/ArearOrganSummary";
                        ajaxFun(function (res) {
                            _this.getAreaChinaMap(res);
                        });
                        break;
                    case 5: //入网车辆违章占比
                        aUrl += "/Home/PeccancyProportion";
                        ajaxFun(function (res) {
                            _this.getPeccancyProportion(res);
                        });
                        break;
                    case 6: //区域综合评分排名
                        aUrl += "/Home/RegionalComprehensiveRank";
                        ajaxFun(function (res) {
                            _this.getRegionalComprehensiveRank(res);
                        });
                        break;
                    case 7: //重点企业综合运营情况
                        aUrl += "/Home/KeyEnterpriseOperation";
                        ajaxFun(function (res) {
                            _this.getCompanyData(res);
                        });
                        break;
                }
            },
            //获取企业运营情况数据
            getCompanyData(res) {
                this.comObj.resData = res.data.Data.data;
                this.comObj.totalNumber = res.data.Data.recordCount;
            },
            //获取入网数 
            getNetInNum(res) {
                let _this = this;
                res.data.Data.forEach(function (val, index) {
                    _this.netInObj.resData[index].RegistedCount = val.RegistedCount;
                    _this.netInObj.resData[index].NetInCount = val.NetInCount;
                });
            },
            //获取年度考核指标
            getYearAssessmentIndex(res) {
                // console.log(res);
                let _this = this;
                let resData = res.data.Data;
                // console.log(resData);
                let yArr = _this.yearAssessmentObj.param.years.split(',');
                _this.yearAssessmentObj.resData.legend_data = yArr;
                // console.log(_this.yearAssessmentObj.resData.legend_data);
                for (let i = 0; i < yArr.length; i++) {
                    _this.yearAssessmentObj.resData.series_data[i].name = yArr[i]; //赋日期
                    for (let j = 0; j < resData.length; j++) {
                        if (yArr[i] === resData[j].Category) { //日期相同
                            switch (resData[j].Name) {
                                case "入网率":
                                    _this.yearAssessmentObj.resData.series_data[i].data[0] = parseFloat(resData[j].Value).toFixed(2);
                                    break;
                                case "遮挡报警率":
                                    _this.yearAssessmentObj.resData.series_data[i].data[1] = parseFloat(resData[j].Value).toFixed(2);
                                    break;
                                case "百公里综合扣分":
                                    _this.yearAssessmentObj.resData.series_data[i].data[2] = parseFloat(resData[j].Value).toFixed(2);
                                    break;
                                case "预报警处置正常率":
                                    _this.yearAssessmentObj.resData.series_data[i].data[3] = parseFloat(resData[j].Value).toFixed(2);
                                    break;
                                case "设备正常运行率":
                                    _this.yearAssessmentObj.resData.series_data[i].data[4] = parseFloat(resData[j].Value).toFixed(2);
                                    break;
                            }
                        }
                    }
                }
            },
            //获取月度考核指标 
            getMonthAssessmentIndex(res) {
                // console.log(res);
                let _this = this;
                let resData = res.data.Data;
                let mArr = this.monthAssessmentObj.param.month.split(','); //日期数组，排序：去年同月，当前，上月
                // console.log(mArr);
                for (let i = 0; i < mArr.length; i++) {
                    this.monthAssessmentObj.resData.series_data[i].name = mArr[i].substring(0,4)+"年"+mArr[i].substring(4,6)+"月"; //赋日期
                    for (let j = 0; j < resData.length; j++) {
                        if (mArr[i] === resData[j].Category) { //日期相同
                            switch (resData[j].Name) {
                                case "百公里综合扣分":
                                    _this.monthAssessmentObj.resData.series_data[i].data[0] = parseFloat(resData[j].Value).toFixed(2);
                                    break;
                                case "遮挡报警率":
                                    _this.monthAssessmentObj.resData.series_data[i].data[1] = parseFloat(resData[j].Value).toFixed(2);
                                    break;
                                case "设备正常运行率":
                                    _this.monthAssessmentObj.resData.series_data[i].data[2] = parseFloat(resData[j].Value).toFixed(2);
                                    break;
                                case "预报警处置正常率":
                                    _this.monthAssessmentObj.resData.series_data[i].data[3] = parseFloat(resData[j].Value).toFixed(2);
                                    break;
                                case "入网率":
                                    _this.monthAssessmentObj.resData.series_data[i].data[4] = parseFloat(resData[j].Value).toFixed(2);
                                    break;
                            }
                        }
                    }
                }
               // console.log(_this.monthAssessmentObj.resData.series_data);
            },
            //实时 当前运行车辆
            getOnLineTruck(res) {
                let _this = this;
                _this.onLineTruckObj.resData.carCount = res.data.Data;
            },
            //实时  百公里综合扣分
            getGeneralPoints(res) {
                let _this = this;
                _this.generalPointsObj.resData.data = res.data.Data;
            },
            //实时  区域企业排名
            getArearOrganSummary(res) {
                let _this = this;
                console.log(res.data.Data);
                _this.arearOrganSummaryObj.resData.data = res.data.Data;
            },
            //实时  地图车辆散点
            getAreaChinaMap(res){
                let _this = this;
                _this.areaChinaMapObj.resData.data =  [
                            [120.33, 36.07],
                            [120.33, 37.07],
                            [120.33, 38.07],
                            [120.33, 39.07],
                            [120.33, 40.07]
                        ];
                console.log(_this.areaChinaMapObj.resData.data);
            },
            //获取map子组件广播数据
            getEsMapData(val) {
                this.arearOrganSummaryObj.param.area = val; 
                this.searchArearOrganSummary(0);
            },
            //获取入网车辆违章占比值
            getPeccancyProportion(res) {
                let _this = this;
                // console.log(res);
                let resData = res.data.Data;
                _this.peccancyProportionObj.resData.carCount = resData.TruckCount;
                resData.PeccancyProportion.forEach(function (val, i) {
                    switch (resData.PeccancyProportion[i].name) {
                        case '班线客车':
                            _this.peccancyProportionObj.resData.series_data[0] = resData.PeccancyProportion[i].record;
                            break;
                        case '旅游客车':
                            _this.peccancyProportionObj.resData.series_data[1] = resData.PeccancyProportion[i].record;
                            break;
                        case '普通货车':
                            _this.peccancyProportionObj.resData.series_data[2] = resData.PeccancyProportion[i].record;
                            break;
                        case '危险品车':
                            _this.peccancyProportionObj.resData.series_data[3] = resData.PeccancyProportion[i].record;
                            break;
                    }
                });
            },
            //区域综合评分排名
            getRegionalComprehensiveRank(res) {
                let _this = this;
                let resData = res.data.Data;
                if (resData.length > 0) {
                    _this.regionalRankObj.resData.yAxis_data[0] = "No.1" + resData[0].Area;
                    _this.regionalRankObj.resData.yAxis_data[1] = "No.2" + resData[1].Area;
                    _this.regionalRankObj.resData.yAxis_data[2] = "No.3" + resData[2].Area;
                    _this.regionalRankObj.resData.series_data = [resData[0].Comprehensive, resData[1].Comprehensive,
                        resData[2].Comprehensive
                    ];
                } else {
                    _this.regionalRankObj.resData.yAxis_data = ["", "", ""];
                    _this.regionalRankObj.resData.series_data = [0, 0, 0];
                }
            },
            //区域综合评分排名组件  正向、反向排序
            getEsRegionalRankTab(val) {
                this.regionalRankObj.param.sort = val;
                this.ajaxUtilFun(6, this.regionalRankObj.param);
            }
        },
        beforeDestroy() {}
    };

</script>
<style>
    #index:-webkit-full-screen {
        width: 100%;
        min-width: 1400px;
        height: 100%;
    }

    /* 整体布局  */

    .main-body {
        /* min-width: 1300px;  */
        font-size: 12px;
        height: 100%;
    }

    /* 头部布局  */

    .main-top-left {
        height: 30px;
        width: auto;
        padding: 0 10px;
        color: #44a8fa;
        filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=#416386, endColorstr=#345c86)";/*IE<9>*/
        -ms-filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=#416386, endColorstr=#345c86)";/*IE8+*/

        background: -webkit-linear-gradient( top,
        rgb(65, 99, 134),
        rgb(52, 92, 134),
        rgb(50, 87, 124),
        rgb(65, 99, 134));
    }

    .main-top-left .left {
        line-height: 30px;
        float: left;
    }

    .main-top-left .right {
        width:160px;
        line-height: 30px;
        float: right;
        font-size: 10px;
    }

    .main-top-right {
        height: 30px;
        width: auto;
        padding: 0 10px;
        color: #fff;
        border:0;
        filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=#25374d, endColorstr=#2c4563)";/*IE<9>*/
        -ms-filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=#25374d, endColorstr=#2c4563)";/*IE8+*/
        background: -webkit-linear-gradient( top,
        rgb(37, 55, 77),
        rgb(44, 69, 99),
        rgb(37, 55, 77));
    }

    .main-top-right .left {
        line-height: 30px;
    }

    .main-top-right .left select {
        border-radius: 3px;
        font-size: 12px;
        background-color: #0f142a;
        border: 0;
        color: #fff;
        padding: 2px 4px;
    }

    .main-top-right .left input {
        border-radius: 3px;
        width: 60px;
        font-size: 12px;
        background-color: #0f142a;
        border: 0;
        color: #fff;
        padding: 2px 4px;
    }

    #sDate .el-input--small .el-input__inner {
        height: 25px;
        line-height: 25px;
    }

    /* 中间布局  */

    .main-center {
        width: auto;
        padding: 0 10px;
        height: 350px;
        /* background-color: red; */
        margin: 10px 0;
        color: #fff;
        font-size: 12px;
    }

    /*中间布局  左侧布局  */

    .main-center .left {
        width: 26%;
    }

    .main-center .left .infobody {
        width: calc(50% - 5px);
        float: left;
    }

    .float-left {
        float: left;
    }

    .float-right {
        float: right;
    }

    .margin-left-5 {
        margin-left: 5px;
    }

    .margin-right-5 {
        margin-right: 5px;
    }

    .margin-top-8 {
        margin-top: 8px;
    }

    .infobody .infodesc {
        width: auto;
        padding-left: 5px;
        height: 20px;
        line-height: 20px;
        font-size: 11px;
        border: 1px solid #2ba4f1;
    }

    .infobody .infocode {
        width: auto;
        padding-left: 5px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #2ba4f1;
        border-top: 0;
        color: #68bdff;
        font-family: "DIN-Regular";
        font-size: 19px;
    }

    .main-center .infoBing {
        height: 200px;
        width: auto;
        padding: 10px;
        /* background-color: aqua; */
        margin-top: 10px;
        border: 1px solid #2ba4f1;
        border-image: radial-gradient(#265274 70%, #2ba4f1 100%, #265274) 1%;
    }

    /* 中部布局  */

    .main-center .center {
        width: 48%;
    }

    .center .echartsMap {
        width: auto;
        margin: 0 10px;
        padding: 10px;
        height: 326px;
        border: 1px solid #2ba4f1;
        border-image: radial-gradient(#265274 70%, #2ba4f1 100%, #265274) 1%;
    }

    /* 右侧布局  */

    .main-center .right .echartspeccancyproportion {
        height: 160px;
        width: auto;
        border: 1px solid #2ba4f1;
        border-image: radial-gradient(#265274 70%, #2ba4f1 100%, #265274) 1%;
        padding: 10px;
        margin-bottom: 10px;
        /* background-color: aqua */
    }

    .main-center .right .echartsLineX {
        height: 134px;
        width: auto;
        border: 1px solid #2ba4f1;
        border-image: radial-gradient(#265274 70%, #2ba4f1 100%, #265274) 1%;
        padding: 10px;
        margin-bottom: 10px;
        /* background-color: yellow */
    }

    /* 底部布局   */

    .main-bottom {
        width: auto;
        min-height: 125px;
        height: calc(100% - 440px);
        margin: 0 10px;
    }

    #zbTable {
        overflow-y: auto;
    }

    ::-webkit-scrollbar {
        width: 3px;
        border-radius: 10px;
        background-color: #295b77;
    }

    .main-bottom .left {
        width: 40%;
        height: calc(100% - 22px);
        border: 1px solid #2ba4f1;
        border-image: radial-gradient(#265274 70%, #2ba4f1 100%, #265274) 1%;
        padding: 10px;
        margin-right: 10px;
        float: left;
    }

    .main-bottom .right {
        width: calc(60% - 55px);
        height: calc(100% - 22px);
        border: 1px solid #2ba4f1;
        border-image: radial-gradient(#265274 70%, #2ba4f1 100%, #265274) 1%;
        padding: 10px;
        float: left;
    }

    .main-body .title {
        position: relative;
        width: auto;
        padding-left: 25px;
        height: 25px;
        line-height: 23px;
        /* background-color: turquoise; */
        color: #fff;
        font-size: 12px;
    }

    .main-body .title .titleimg {
        height: 18px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .tableRow {
        width: 100%;
        height: 36px;
        text-align: center;
        padding-top: 0;
        background: rgba(96, 184, 245, 0.1);
    }

    .col-1 {
        color: #fff;
    }

    .col-2 {
        color: #66bcff;
        text-align: right;
    }

    .tableRow-resoult {
        width: 100%;
        height: 26px;
        text-align: center;
        padding-top: 0;
    }

    .bgColor {
        background: rgba(96, 184, 245, 0.1);
    }

    .table-row-height-1 {
        height: 36px;
        line-height: 36px;
    }

    .table-row-height-2 {
        height: 36px;
        line-height: 16px;
        padding-top: 2px;
    }

    .table-row-height-3 {
        height: 26px;
        line-height: 26px;
    }

    .table-row-height-3 img {
        width: 5px;
        height: 9px;
    }

    .tableCol-1 {
        width: 13%;
    }

    .tableCol-2 {
        width: 12%;
    }

    .tableCol-3 {
        width: 13%;
    }

    /* 实时地图数据浮层 */

    .popover-main {
        width: 400px;
        height: 200px;
        z-index: 22222;
        position: absolute;
        background: rgba(35, 60, 81, 1);
        border-radius: 6px;
        border: 2px solid #24506D;
        padding: 10px 8px;
        overflow-y: auto;
    }

    .popover-main .title {
        width: auto;
        height: 25px;
        line-height: 25px;
        margin-bottom: 7px;
        position: relative;
    }

    .popover-main .title .company-name {
        width: 88px;
        float: left;
    }

    .popover-main .title .seleCol {
        /* background-color: #27719C; */
        color: #fff;
        background-color: rgb(57, 81, 99);
    }

    .popover-main .title .unseleCol {
        position: relative;
        /* background-color: #202F42; */
        color: #768693;
        background-color: rgb(35, 60, 81);
    }

    .popover-main .title .tab1 {
        width: 66px;
        border: 1px solid #929FAA;
        border-right: 0;
        border-radius: 4px 0 0 4px;
        height: 23px;
        text-align: center;
        float: left;
    }

    .popover-main .title .tab2 {
        width: 66px;
        border: 1px solid #929FAA;
        border-left: 0;
        border-radius: 0 4px 4px 0;
        height: 23px;
        text-align: center;
        float: left;
    }

    .popover-main .center {
        width: 100%;
        border: 1px solid #4C6C82;
    }

    .popover-main .center .row-title {
        width: 100%;
        height: 35px;
        background-color: #244862;
        line-height: 35px;
        text-align: center;
    }

    .popover-main .center .row-data {
        width: 100%;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border-top: 1px solid #4C6C82;
    }

    .popover-main .center .column {
        width: 60px;
        float: left;
    }

    .popover-main .center .column2 {
        width: 55px;
        float: left;
        line-height: 16px;
        padding-top: 2px;
    }

    .popover-main .center .column1 {
        width: 60px;
        float: left;
        text-align: right;
        line-height: 25px;
    }

</style>
