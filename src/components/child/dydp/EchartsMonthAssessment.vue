<!--   
    name：月度考核指标对比组件
    desc：查询上一年、当前日期、上一月的月度考核指标数据
    param：optionParam{xAxis.data,legend.data,series.name,series.data }         
    return Value : None
    author：wenls 
    date：2018.8.22
-->
<template> 
    <div :id='id' :style="{width:'100%',height:'100%'}" style="color: yellow"></div>
</template>
<script> 
    export default {
        data() {
            return {
                chartObj: null,
                option: { 
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                        },
                        textStyle: {
                            decoration: "none",
                            fontFamily: "Arial, Verdana, sans-serif", 
                            fontSize: 12 
                        }
                    },
                    // 控制表格位置，
                    grid: {
                        top: 30,
                        left: '30px',
                        right: '30px',
                        bottom: 30, // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上                        
                        containLabel: false
                    },
                    legend: {
                        orient: "horizontal", // 布局方式，默认为水平布局，可选为：
                        // 'horizontal' ¦ 'vertical'
                        x: "right", // 水平安放位置，默认为全图居中，可选为：
                        // 'center' ¦ 'left' ¦ 'right'
                        // ¦ {number}（x坐标，单位px）
                        y: "0", // 垂直安放位置，默认为全图顶端，可选为：
                        // 'top' ¦ 'bottom' ¦ 'center'
                        // ¦ {number}（y坐标，单位px）
                        backgroundColor: "rgba(0,0,0,0)",
                        borderColor: "#ccc", // 图例边框颜色
                        borderWidth: 0, // 图例边框线宽，单位px，默认为0（无边框）
                        padding: [5, 30, 5, 5], // 图例内边距，单位px，默认各方向内边距为5，
                        // 接受数组分别设定上右下左边距，同css
                        itemGap: 10, // 各个item之间的间隔，单位px，默认为10，
                        // 横向布局时为水平间隔，纵向布局时为纵向间隔
                        itemWidth: 18, // 图例图形宽度
                        itemHeight: 4, // 图例图形高度
                        textStyle: {
                            color: "#fff" // 图例文字颜色
                        },
                        data: []
                    },
                    color: [
                        '#3F7AA6', 
                        '#54C2D9', 
                        '#D3A979', 
                        '#68CFE8', 
                        '#FFDC35' 
                    ], 
                    textStyle: {
                        decoration: "none",
                        fontFamily: "Arial, Verdana, sans-serif", 
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal"
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        axisTick: { //设置x轴上标点 
                            show: true, //设置x轴上标点显示
                            length: 10, //设置x轴上标点显示长度
                            lineStyle: { //设置x轴上标点显示样式
                                color: 'red',
                                width: 0,
                                type: 'solid'
                            }
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                type: 'dotted',
                                color: "rgba(0,0,0,0)", //左边线的颜色
                                width: 0 
                            }
                        },
                        axisLabel: { //x轴文字设置
                            show: true, //是否显示
                            textStyle: {
                                color: '#2B9AD2', //坐标值得具体的颜色
                                fontSize: 11
                            },
                            interval: 0,
                            formatter: function (params) {
                                var newParamsName = "";
                                var paramsNameNumber = params.length;
                                var provideNumber = 5;
                                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                                if (paramsNameNumber > provideNumber) {
                                    for (var p = 0; p < rowNumber; p++) {
                                        var tempStr = "";
                                        var start = p * provideNumber;
                                        var end = start + provideNumber;
                                        if (p == rowNumber - 1) {
                                            tempStr = params.substring(start, paramsNameNumber);
                                        } else {
                                            tempStr = params.substring(start, end) + "\n";
                                        }
                                        newParamsName += tempStr;
                                    }

                                } else {
                                    newParamsName = params;
                                }

                                return newParamsName
                            }

                        },
                        splitLine: { // 设置x轴标点分割线样式
                            show: false,
                            lineStyle: {
                                color: 'skyblue',
                                type: 'dashed',
                                width: 1
                            }
                        }, //去除网格线
                        splitArea: {
                            show: false
                        }, //保留网格区域
                        data: []
                    }],
                    yAxis: [{
                            type: 'value', //设置坐标轴类型，共category，value，time三种类型
                            boundaryGap: false, //设置是否在图形开始处于y轴留有间距
                            min: 0,
                            max: 100,
                            axisTick: {
                                show: false //不显示Y轴的刻度
                            },
                            scale: true,
                            axisLine: { // Y轴线...颜色 
                                lineStyle: {
                                    type: 'solid',
                                    color: 'red', //Y轴字体颜色
                                    width: '0'
                                },
                            },
                            axisLabel: { //y轴文字设置
                                show: true, //是否显示
                                textStyle: {
                                    color: '#fff', //坐标值得具体的颜色
                                    fontSize: 10
                                }
                            },
                            splitArea: { //y轴网格
                                show: true, //是否显示
                                areaStyle: {
                                    color: [ //横向网格线的颜色数组
                                        '#193043', 'rgba(96,184,245,0)'
                                    ]
                                }
                            },
                            splitNumber: 5,
                            position: 'left',
                            //    name:'主机名称',
                            nameLocation: 'end',
                            nameTextStyle: {
                                color: '#30ad3a',
                                // padding:[0,80,0,0],
                            },
                            splitLine: { // 设置y轴标点分割线样式
                                show: false,
                                lineStyle: {
                                    color: 'skyblue',
                                    type: 'dashed',
                                    width: 1
                                }
                            }
                        },
                        {
                            type: 'value',
                            boundaryGap: false,
                            axisTick: {
                                show: false //不显示Y轴的刻度
                            },
                            min: 0,
                            max: 100,
                            axisLine: { // Y轴线...颜色 
                                lineStyle: {
                                    type: 'solid',
                                    color: 'red', //Y轴字体颜色
                                    width: '0'
                                },
                            },
                            scale: true,
                            axisLabel: { //y轴文字设置
                                show: true, //是否显示
                                textStyle: {
                                    color: '#2B9AD2', //坐标值得具体的颜色
                                    fontSize: 10
                                },
                                formatter: '{value}%'
                            },
                            splitNumber: 5,
                            position: 'right',
                            //      name:'主机名称',
                            nameLocation: 'end',
                            nameTextStyle: {
                                color: '#30ad3a',
                                // padding:[0,80,0,0],
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#fff", //Y轴字体颜色
                                    width: 0 //这里是为了突出显示加上的
                                }
                            },
                            splitLine: { // 设置y轴标点分割线样式
                                show: false,
                                lineStyle: {
                                    color: 'skyblue',
                                    type: 'dashed',
                                    width: 1
                                }
                            }
                        }
                    ],
                    series: [{
                            name: '',
                            type: 'bar',
                            data: [],
                            yAxisIndex: 0,
                            barWidth: 12, //固定柱子宽度
                            barGap: '0%' //柱状图两个bar之间的距离
                        },
                        {
                            name: '',
                            type: 'bar',
                            data: [],
                            yAxisIndex: 0,
                            barWidth: 12, 
                            barGap: '0%'
                        },
                        {
                            name: '',
                            type: 'bar',
                            data: [],
                            yAxisIndex: 1,
                            barWidth: 12, 
                            barGap: '0%'
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
                        _this.option.legend.data = [];
                        _this.option.xAxis[0].data = newVal.xAxis_data;
                        _this.option.series.forEach(function(val,index){
                            _this.option.legend.data.push(newVal.series_data[index].name);
                            _this.option.series[index].name = newVal.series_data[index].name;
                            _this.option.series[index].data = newVal.series_data[index].data;
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
