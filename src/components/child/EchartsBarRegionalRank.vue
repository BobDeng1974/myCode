<!--   
    name：区域综合评分排名组件
    desc：根据正向、反向tab栏显示区域综合评分排名
    param：optionParam{yAxis.data，series.data }        
    return Value : None
    author：wenls 
    date：2018.8.22
--> 
 <template>
    <div class="es-main"> 
        <div :id='id' :style="{width:'100%',height:'100%'}" style="color: yellow"></div> 
        <div class="es-tabs">
            <div class="es-item es-item-1 " :class="{'seleCol':isTab,'unseleCol':!isTab}" @click="isTab=true;esRegionalRankTabClick('asc');">正数前三</div>
            <div class="es-item es-item-2 " :class="{'seleCol':!isTab,'unseleCol':isTab}" @click="isTab=false;esRegionalRankTabClick('desc');">倒数前三</div>
        </div>
    </div>
</template>
<script> 
    export default {
        data() {
            return {
                isTab: true, //tab栏切换开关
                chartObj: null,
                option: {
                    // 控制表格位置，
                    grid: {
                        top: "20px",
                        left: "20px",
                        right: "10px",
                        bottom: 5, // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                        containLabel: true
                    },
                    calculable: true,
                    xAxis: [{
                        type: "value",
                        axisLabel: {
                            //x轴文字设置
                            show: false, //是否显示
                            textStyle: {
                                color: "#2B9AD2", //坐标值得具体的颜色
                                fontSize: 11
                            },
                            interval: 0
                        },
                        boundaryGap: [0, 0.01], //去除网格线
                        splitArea: {
                            show: false
                        },
                        splitLine: {
                            // 设置x轴标点分割线样式
                            show: false,
                            lineStyle: {
                                color: "skyblue",
                                type: "dashed",
                                width: 1
                            }
                        }
                    }],
                    yAxis: [{
                            splitLine: {
                                // 设置y轴标点分割线样式
                                show: false,
                                lineStyle: {
                                    color: "skyblue",
                                    type: "dashed",
                                    width: 0
                                }
                            },
                            axisTick: {
                                //设置x轴上标点
                                show: true, //设置x轴上标点显示
                                length: 10, //设置x轴上标点显示长度
                                lineStyle: {
                                    //设置x轴上标点显示样式
                                    color: "red",
                                    width: 0,
                                    type: "solid"
                                }
                            },
                            splitArea: {
                                //y轴网格
                                show: true, //是否显示
                                areaStyle: {
                                    color: [
                                        //横向网格线的颜色数组
                                        "#1B3045",
                                        "#1F2B3B"
                                    ]
                                }
                            },
                            axisLine: {
                                // Y轴线...颜色
                                lineStyle: {
                                    type: "solid",
                                    color: "red", //Y轴字体颜色
                                    width: "0"
                                }
                            },
                            data: ["No.1  ", "No.2  ", "No.3  "], 
                            inverse: true,
                            axisLabel: {
                                //y轴文字设置
                                show: true, //是否显示
                                textStyle: {
                                    color: "#8A6078", //坐标值得具体的颜色
                                    fontSize: 10,
                                    fontFamily: "PingFang-SC-Bold"
                                },
                                formatter: function (value, index) {
                                    return "{weatherHead" + index + "|" + value + "}";
                                }, 
                                margin: 20,
                                rich: {
                                    value: {
                                        lineHeight: 30,
                                        align: "center"
                                    },
                                    weatherHead0: {
                                        color: "#FE8380",
                                        height: 24,
                                        align: "left",
                                        fontWeight: "bold"
                                    },
                                    weatherHead1: {
                                        color: "#A2AA77",
                                        height: 24,
                                        align: "left"
                                    },
                                    weatherHead2: {
                                        color: "#50B686",
                                        height: 24,
                                        align: "left"
                                    }
                                }
                            },
                            type: "category"
                        },
                        {
                            splitLine: {
                                // 设置y轴标点分割线样式
                                show: false,
                                lineStyle: {
                                    color: "skyblue",
                                    type: "dashed",
                                    width: 0
                                }
                            },
                            axisTick: {
                                //设置x轴上标点
                                show: true, //设置x轴上标点显示
                                length: 10, //设置x轴上标点显示长度
                                lineStyle: {
                                    //设置x轴上标点显示样式
                                    color: "red",
                                    width: 0,
                                    type: "solid"
                                }
                            },
                            axisLine: {
                                // Y轴线...颜色
                                lineStyle: {
                                    type: "solid",
                                    color: "red", //Y轴字体颜色
                                    width: "0"
                                }
                            },
                            axisLabel: {
                                //y轴文字设置
                                show: true,  
                                textStyle: {
                                    color: "#EEE", //坐标值得具体的颜色
                                    fontSize: 12
                                }
                            },
                            type: "category",
                            data: []
                        }
                    ],
                    series: [{
                        name: "",
                        type: "bar",
                        barWidth: 10, //固定柱子宽度
                        barGap: "0%", //柱状图两个bar之间的距离
                        yAxisIndex: 0, 
                        data: [{
                                value: 100,
                                itemStyle: {
                                    normal: {
                                        color: "#62C5C2",
                                        //柱形图圆角，初始化效果
                                        barBorderRadius: [10, 10, 10, 10],
                                        label: {
                                            show: true, //是否展示
                                            textStyle: {
                                                fontWeight: "bolder",
                                                fontSize: "12",
                                                fontFamily: "微软雅黑"
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                value: 200,
                                itemStyle: {
                                    normal: {
                                        color: "#62C5C2",
                                        //柱形图圆角，初始化效果
                                        barBorderRadius: [10, 10, 10, 10],
                                        label: {
                                            show: true, //是否展示
                                            textStyle: {
                                                fontWeight: "bolder",
                                                fontSize: "12",
                                                fontFamily: "微软雅黑"
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                value: 200,
                                itemStyle: {
                                    normal: {
                                        color: "#62C5C2",
                                        //柱形图圆角，初始化效果
                                        barBorderRadius: [10, 10, 10, 10],
                                        label: {
                                            show: true, //是否展示
                                            textStyle: {
                                                fontWeight: "bolder",
                                                fontSize: "12",
                                                fontFamily: "微软雅黑"
                                            }
                                        }
                                    }
                                }
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
            optionParam: {
                type: Object
            }
        },
        components: {},
        computed: {},
        mounted() {
            this.initChartLine();
        },
        methods: {
            initChartLine() {
                this.chartObj = this.$echarts.init(document.getElementById(this.id));
                this.chartObj.setOption(this.option);
                this.chartObj.on("click", function (param) {
                    // alert(param.componentType);
                    // if (param.type == "click") {
                    //     alert("1" + param.value);
                    // } else {
                    //     alert("2" + param.name);
                    // }
                });
                window.addEventListener("resize", this.chartObj.resize); // 图表响应大小的关键,重绘
            },
            esRegionalRankTabClick(param) { 
                // console.log(param);
                this.$emit('esRegionalRankTab', param)
            }
        },
        beforeDestroy() {
            if (!this.chartObj) return;
            this.chartObj.dispose();
            this.chartObj = null;
        },
        watch: {
            optionParam: {
                immediate: true,
                handler: function (newVal, oldVal) {
                    let _this = this;
                    // 监听外部传入的值,渲染新的的图表数据
                    if (newVal) {
                        _this.option.yAxis[0].data[0] = newVal.yAxis_data[0];
                        _this.option.yAxis[0].data[1] = newVal.yAxis_data[1];
                        _this.option.yAxis[0].data[2] = newVal.yAxis_data[2];
                        _this.option.series[0].data[0].value = newVal.series_data[0];
                        _this.option.series[0].data[1].value = newVal.series_data[1];
                        _this.option.series[0].data[2].value = newVal.series_data[2];
                        _this.option.yAxis[1].data[0] = parseFloat(newVal.series_data[2]).toFixed(2) + "分";
                        _this.option.yAxis[1].data[1] = parseFloat(newVal.series_data[1]).toFixed(2) + "分";
                        _this.option.yAxis[1].data[2] = parseFloat(newVal.series_data[0]).toFixed(2) + "分";
                    } 
                    setTimeout(() => {
                        _this.chartObj.setOption(_this.option);
                    }, 300);
                },
                deep: true
            } 
        }
    };
</script>
<style scoped>
    .es-main {
        position: relative;
        font-family: 'PingFang-SC-Medium'
    }
    .es-tabs {
        position: absolute;
        top: -5px;
        right: 8px;
        text-align: center;
        font-size: 11px;
        cursor: pointer;
    }
    .es-tabs .es-item {
        width: 50%;
        width: 65px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #38A4E0;
        float: left;
    }
    .es-tabs .es-item-1 {
        border-right: 0;
        border-radius: 2px 0 0 2px;
    }
    .es-tabs .es-item-2 {
        border-left: 0;
        border-radius: 0 2px 2px 0;
    }
    .es-tabs .seleCol {
        background-color: #27719C;
        color: #fff;
    }
    .es-tabs .unseleCol {
        background-color: #202F42;
        color: rgba(69, 182, 247, 1)
    }
</style>