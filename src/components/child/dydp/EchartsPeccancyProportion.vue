<!--   
    name：入网车辆违章占比组件
    desc：查询上一年、当前日期、上一月的入围车辆违章占比数据
    param：optionParam{carCount,series.data }           
    return Value : None
    author：wenls 
    date：2018.8.22
-->
<template> 
    <div class="es-pie-main">
        <div :id='id' :style="{width:'50%',height:'100%'}" class="pie"></div>
        <div class="pie-name">入网车辆总数：{{ carCount }}</div>
        <div class="pie-legend">
            <div class="row color-1">
                <div class="l-1 bg-1">&nbsp;</div>
                <div class="l-2">班线客车占比</div>
                <div class="l-3">{{ dataItemProportions(0) }}%</div>
            </div>
            <div class="row color-2">
                <div class="l-1 bg-2">&nbsp;</div>
                <div class="l-2">旅游客车占比</div>
                <div class="l-3">{{ dataItemProportions(1) }}%</div>
            </div>
            <div class="row color-3">
                <div class="l-1 bg-3">&nbsp;</div>
                <div class="l-2">普通货车占比</div>
                <div class="l-3">{{ dataItemProportions(2) }}%</div>
            </div>
            <div class="row color-4">
                <div class="l-1 bg-4">&nbsp;</div>
                <div class="l-2">危险品车占比</div>
                <div class="l-3">{{ dataItemProportions(3) }}%</div>
            </div>
        </div>
    </div>
    
</template>
<script> 
    export default {
        data() {
            return {
                carCount:0,
                //数据项比例
                dataItemProportion:[0,0,0,0],
                option: {
                    title: {
                        text: '入网车辆\n\n违章占比', 
                        x: 'center',
                        y: 'center',
                        textStyle: { //标题内容的样式
                            color: '#fff', //京东红
                            fontStyle: 'normal', //主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
                            fontWeight: "lighter", //可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
                            fontFamily: "san-serif", //主题文字字体，默认微软雅黑
                            fontSize: 11 //主题文字字体大小，默认为18px
                        }
                    },
                    color: ['#57E9F9', '#2EB2F5', '#F8657D', '#FAF683'],
                    series: [{
                        name: '',
                        type: 'pie',
                        hoverAnimation:false,//鼠标悬浮 关闭
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
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
            optionParam: {
                type: Object
            }
        },
        components: {},
        computed: {
            //根据下标返回违章占比比例  排序：班线客车、旅游、普通货车、危险品车 
            dataItemProportions(){
                return function(index){
                    let _this = this;
                    let countSum = 0;
                    _this.option.series[0].data.forEach(function(val,i){
                        countSum += _this.option.series[0].data[i];
                    });                
                    _this.dataItemProportion[index] = _this.option.series[0].data[index] / countSum * 100;               
                    return _this.dataItemProportion[index];
                }                
            }
        },
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
                        _this.carCount = newVal.carCount;   
                            _this.option.series[0].data = newVal.series_data; 
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

        .es-pie-main{
            width:100%;height: 100%; position: relative;
        }
        .es-pie-main .pie{
             position: absolute;top:-15px;
        }
        .es-pie-main .pie-name{
            position: absolute;bottom:10%;font-size:11px;color:#68BDFF;text-align: center;width: 50%;
        }
        .es-pie-main .pie-legend{
            position: absolute;right: 0;width: 50%;height: 100%; 
        }
        .es-pie-main .pie-legend .row{
            float: left;width: 100%;height: 23%;line-height:30px;font-size: 12px; 
        }
        .es-pie-main .pie-legend .l-1{
            float: left;width:8px;height:8px;line-height:20px;margin-top:9px;border-radius:1px;
        }
        .es-pie-main .pie-legend .l-2{
            float: left;margin-left:10px;
        }
        .es-pie-main .pie-legend .l-3{
            float:right;margin-right:20px;
        }
        .es-pie-main .pie-legend .color-1{
            color: #57E9F9; 
        }
        .es-pie-main .pie-legend .color-2{
            color: #2EB2F5; 
        }
        .es-pie-main .pie-legend .color-3{
            color: #F8657D; 
        }
        .es-pie-main .pie-legend .color-4{
            color: #FAF683; 
        }
        .es-pie-main .row .bg-1{ 
            background-color: #57E9F9;
        }
        .es-pie-main .row .bg-2{ 
            background-color: #2EB2F5;
        }
        .es-pie-main .row .bg-3{ 
            background-color: #F8657D;
        }
        .es-pie-main .row .bg-4{  
            background-color: #FAF683;
        }

</style>
