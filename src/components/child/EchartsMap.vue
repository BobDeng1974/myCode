<!--   
    name：市级地图组件
    desc：查询当前运行车辆、百公里综合扣分及企业综合排名
    param：onLineTruckProp（当前运行车辆） generalPointsProp（百公里综合扣分） 
    return Value : esMapData 广播传参
    author：wenls 
    date：2018.8.22
-->
<template>
    <div class="el-map-main">
        <div :id="id" :style="{width: '100%', height: '100%'}"></div>
        <div class="car-main">
            <div class="car-desc">当前运行车辆</div>
            <div class="car-num-row">
                <div class="column" v-for="(item,key,index) in onLineTruckNum" :key="index">{{ item }}</div> 
            </div>
        </div>
        <div class="info-main">
            <div class="row color-1">| 百公里综合扣分</div>
            <div class="row" v-for="(item,key,index) in generalPoints" :key="index">&nbsp;{{ item.area }}：{{ item.val }}</div> 
        </div>
    </div>

</template>
<script>

    import ajax from "axios";
    export default {
        data() {
            return {
                chartObj: null,
                onLineTruckNum:[],
                generalPoints:[],
                areaIsSele: [false, true, false, false, false],
                showLoadingDefault: {
                    text: "loading...",
                    color: "#29526F",
                    textColor: "#fff",
                    // 加载时地图背景色
                    maskColor: "#29526F",
                    zlevel: 310
                },
                mapOption: {
                    backgroundColor: "rgba(0,0,0,0)",
                    title: {
                        text: "东营",
                        left: "center",
                        textStyle: {
                            color: "#fff"
                        },
                        show: false
                    },
                    series: [{
                        type: "map",
                        mapType: name,
                        zoom: 1.2, //设置地图大小
                        label: {
                            //区域标签设置
                            normal: {
                                //未点击  区域标签设置
                                show: true,
                                textStyle: {
                                    color: "#45B6F7" //区域名称字体颜色
                                }
                            },
                            emphasis: {
                                //点击  区域标签设置
                                textStyle: {
                                    color: "#fff" //区域名称字体颜色
                                }
                            }
                        },
                        itemStyle: {
                            //区域样式设置
                            normal: {
                                //未点击 区域样式设置
                                borderColor: "#45CFF7", //地图区域边界线颜色
                                areaColor: "#2C4A61" //地图区域背景颜色
                            },
                            emphasis: {
                                //点击 区域样式设置
                                areaColor: "#2C536B", //地图区域背景颜色
                                borderWidth: 2
                            }
                        },
                        animation: false,
                        data: [{
                                name: "河口区",
                                selected: false
                            }, // selected:true 默认选中
                            {
                                name: "利津县",
                                selected: false
                            },
                            {
                                name: "垦利区",
                                selected: true
                            },
                            {
                                name: "东营区",
                                selected: false
                            },
                            {
                                name: "广饶县",
                                selected: false
                            }
                        ]
                    }]
                }
            };
        },
        props: {
            id: {
                default: function () { 
                    let temp = [];
                    for (let i = 0; i < 6; i++) {
                        let randomChar = String.fromCharCode(
                            65 + Math.floor(Math.random() * 19) + i
                        );
                        temp.push(randomChar);
                    }
                    return temp.reduce((pre, next) => pre + next);
                }
            },
            onLineTruckProp: {
                type: Object
            },
            generalPointsProp: {
                type: Object
            }
        },
        components: {},
        computed: {},
        mounted() {
            this.initDrawMap();
        },
        methods: {
            initDrawMap() {
                let _this = this;
                let echarts = this.$echarts;
                _this.chartObj = echarts.init(document.getElementById(this.id));
                _this.chartObj.on("click", function (param) {
                    _this.mapOption.series[0].data.forEach(function (val, index) {
                        if (index === param.dataIndex) {
                            _this.mapOption.series[0].data[param.dataIndex].selected = true;
                        } else {
                            _this.mapOption.series[0].data[index].selected = false;
                        }
                    });
                    _this.esMapClick(param.name);
                    _this.chartObj.setOption(_this.mapOption);
                });
                _this.chartObj.showLoading(_this.showLoadingDefault);
                ajax.get("static/data/dongying.json", {}).then(function (geoJson) {
                    _this.chartObj.hideLoading();
                    echarts.registerMap(name, geoJson.data);
                    _this.chartObj.setOption(_this.mapOption);
                    window.addEventListener("resize", _this.chartObj.resize);  
                });
            },
            esMapClick(param) { 
                this.$emit('esMapData', param)
            }
        },
        beforeDestroy() {},        
        watch: {
            onLineTruckProp: {
                immediate: true,
                handler: function (newVal, oldVal) {
                    let _this = this;  
                    if (newVal) {  
                        _this.onLineTruckNum = newVal.carCount;
                        if(newVal.carCount){
                            _this.onLineTruckNum = newVal.carCount.toString().split('');
                        } 
                    } 
                },
                deep: true
            },
            generalPointsProp: {
                immediate: true,
                handler: function (newVal, oldVal) {
                    let _this = this;  
                    if (newVal) {  
                        _this.generalPoints = newVal.data;
                    } 
                },
                deep: true
            }
        }
    };

</script>
<style scoped>
    .el-map-main {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .el-map-main .car-main {
        position: absolute;
        width: auto;
        height: 40px; 
        top: 10px;
        right: 5px;
        font-size: 12px;
        font-family: '黑体'
    }

    .el-map-main .car-main .car-desc { 
        width: 100%;
        height: 20px;
        line-height: 20px;
        text-align: right;
        color: #3C91D6;
    }

    .el-map-main .car-main .car-num-row { 
        width: auto;
        height: 26px; 
        background-size: 100% 100%;
        font-family: 'Arial';
    }

    .el-map-main .car-main .car-num-row .column {
        width: 24px;
        height: 26px;
        line-height: 26px; 
        background: url('../../../static/img/numbg.png') repeat-x; 
        float: left;
        text-align: center;
        font-weight: bold;
        font-size: 14px;
    }

    .el-map-main .info-main {
        position: absolute;
        bottom: 7px;
        right: 5px;
        width: 108px;
        min-height: 106px; 
        background: rgba(41, 98, 130, 0.6);
        border: 1px solid #2A6D94;
        border-radius: 2px;
        ;
        padding: 8px 8px;
        font-size: 11px;
        font-family: 'PingFang-SC-Regular'
    }

    .el-map-main .info-main .row {
        width: 100%;
        height: 18px;
        line-height: 18px;
    }

    .color-1 {
        color: #68BDFF;
    }

</style>
