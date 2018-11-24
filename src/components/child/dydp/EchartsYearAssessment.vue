<!--   
    name：年度考核指标对比组件
    desc：查询前年、去年、今年的年度考核指标数据
    param：optionParam{legend.data,series.data }      
    return Value : None
    author：wenls 
    date：2018.8.22
-->
<template>
    <div :id='id' :style="{width:'100%',height:'100%'}"></div>
</template>
<script> 
    export default {
        data() {
            return {
                option: { 
                    color:['rgba(53,95,160,0.6)','rgba(77,156,196,0.6)','rgba(225,200,86,1)'],
                    center: ["45%"], //位置 
                    startAngle: 90,
                    splitNumber: 4,
                    shape: "circle",
                    textStyle: {
                        decoration: "none",
                        fontFamily: "Arial, Verdana, sans-serif", 
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal"
                    },
                    tooltip: {
                        show:true,
                        trigger: "axis",
                        position:[3,3],  //赋予一个[x,y]的位置
                        textStyle: {
                            decoration: "none",
                            fontFamily: "Arial, Verdana, sans-serif", 
                            fontSize: 12 
                        }
                    },
                    legend: { 
                        show:true,
                        data: ["2016", "2017", "2018"],
                        orient: "vertical", // 布局方式 'horizontal' ¦ 'vertical'
                        x: "right",  
                        y: "0px",  
                        backgroundColor: "rgba(0,0,0,0)",
                        borderColor: "#ccc",  
                        borderWidth: 0,  
                        padding: 5,  
                        itemGap: 10, // 各个item之间的间隔，单位px，默认为10，
                        // 横向布局时为水平间隔，纵向布局时为纵向间隔
                        itemWidth: 10, // 图例图形宽度
                        itemHeight: 10, // 图例图形高度
                        textStyle: {
                            color: "#fff"  
                        }
                    },
                    radar: [{
                        name: {
                            textStyle: {
                                color: '#44B4FF', 
                                borderRadius: 3,
                                fontSize: 12,
                                padding: [-11,-11,-11,-11] //调整文字位置
                            }
                        },
                        axisLine:{
                            show:true,
                            lineStyle: {
                                width: 1,
                                color: ['#2B5178']// 图表背景网格线的颜色                                
                            }
                        },
                        indicator: [{
                                text: "车辆入网率",
                                max: 150
                            },
                            {
                                text: "遮挡报警率",
                                max: 150
                            },
                            {
                                text: "车辆运行      \n百公里总和扣分",
                                max: 150
                            },
                            {
                                text: "        管理人员\n预报警处理响应率",
                                max: 150
                            },
                            {
                                text: "设备运行\n正常率",
                                max: 150
                            }
                        ],
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgba(0,0,0,0)'] // 图表背景网格的颜色                               
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                width: 1,
                                color: ['#2B5178', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', '#22364D']// 图表背景网格线的颜色                                
                            }
                        },
                        center: ["41%", "52%"],//雷达图像位置
                        radius: 70  //雷达图像大小
                    }],
                    series: [
                        {
                            type: "radar",
                            tooltip: {
                                trigger: "item"
                            },
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        type: "default", 
                                    }
                                }
                            },
                            data: [{
                                    value: [],
                                    name: ""
                                },
                                {
                                    value: [],
                                    name: ""
                                },
                                {
                                    value: [],
                                    name: ""
                                }
                            ]
                        }
                    ]
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
                window.addEventListener("resize", this.chartObj.resize);  
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
                    if (newVal) {
                        _this.option.legend.data = newVal.legend_data;
                        _this.option.series[0].data.forEach(function(val,index){
                            _this.option.series[0].data[index].name = newVal.legend_data[index];
                            _this.option.series[0].data[index].value = newVal.series_data[index].data;
                        });  
                    } 
                    setTimeout(() => {
                        _this.chartObj.setOption(_this.option); 
                    }, 300);
                },
                deep: true
            }
        }
    }
</script>
<style scoped>
</style>
