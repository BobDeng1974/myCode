<!--   
    name：区县车辆地图散点组件
    desc：根据city、area参数查询车辆经纬度坐标，在chinaMap中显示车辆位置
    param：optionParam{series.data }        
    return Value : None
    author：wenls 
    date：2018.8.22
-->
<template>
    <div class="el-map-main">
        <div :id="id" :style="{width: '100%', height: '100%'}"></div>         
    </div>
</template>
<script> 
    import ajax from "axios";
    export default {
        data() {
            return {
                chartObj: null,  
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
                    backgroundColor: 'rgba(0,0,0,0)',
                    geo: {
                        map: 'china',
                        zoom: 1.2, //设置地图大小
                        label: {
                            normal: {
                                //未点击  区域标签设置
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#2C536B',
                                borderColor: '#4BE1FD',
                                borderWidth: 0.5
                            },
                            emphasis: {
                                areaColor: '#2C536B'
                            }
                        }
                    },
                    series: [{
                        name: '车辆散点',
                        type: 'effectScatter', //影响散点  
                        coordinateSystem: 'geo',
                        symbolSize: 1,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                color: '#c60fff',
                                //  formatter: '{b}',
                                position: 'right',
                                show: false //是否显示散点名字  
                            },
                            emphasis: {
                                show: false //高亮状态下  是否显示散点名字  
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#FDD43E', //散点圆圈颜色
                                shadowBlur: 10,
                                shadowColor: '#FBE07C' //散点圆圈阴影颜色							 
                            },
                        },
                        data: []
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
            optionProp: {
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
                _this.chartObj = echarts.init(document.getElementById(_this.id));
                _this.chartObj.showLoading(_this.showLoadingDefault);
                ajax.get("static/data/china.json", {}).then(function (geoJson) {
                    _this.chartObj.hideLoading(); 
                    echarts.registerMap('china', geoJson.data); 
                    _this.chartObj.setOption(_this.mapOption);
                    window.addEventListener("resize", _this.chartObj.resize);  
                });
            } 
        },
        beforeDestroy() {},
        watch: { 
            optionProp: {
                immediate: true,
                handler: function (newVal, oldVal) {
                    let _this = this; 
                    if (newVal) { 
                        _this.mapOption.series[0].data = newVal.data; 
                    } 
                    setTimeout(() => {  
                        _this.chartObj.setOption(_this.mapOption); 
                    }, 300);
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
