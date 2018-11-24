<!--   
    name：实时报警组件
    desc：
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.11.10
-->
<template>
    <div id="drag" v-show="!delVisible" class="child-alarm-dialog" :style="{border:dragBorder,borderRadius:dragBorderRad}">
        <!-- 车牌号 -->
        <div class="car-header" @mousedown="onDragStart" @mouseup="onDragClose">
            <div class="car-hearder-icon">
                <img src="../../../../../../static/img/jjbx/monitor/position/carNum.png" />
            </div>
            <div class="car-hearder-desc">
                车牌号：鲁C12345
            </div>
            <div class="car-hearder-close">
                <i class="el-icon-close" style="color: #fff;cursor:pointer;" @click="delVisible=!delVisible"></i>
            </div>
        </div>
        <!-- 报警信息 -->
        <div class="car-edit">
            <div class="car-edit-title">
                报警信息
            </div>
            <div style="height:47px;margin-left:290px;">
                <div class="car-edit-tab" style="background: cornflowerblue; ">
                    <img src="../../../../../../static/img/jjbx/monitor/position/jg1.png" class="img_1" />
                    <!-- <img v-show="!carWindow.menuSwitch[0]" src="../../../../../../static/img/jjbx/monitor/position/jg-1.png"
                            class="img_1" /> -->
                </div>
                <div class="car-edit-tab" style="background:#EEEEEE; ">
                    <img src="../../../../../../static/img/jjbx/monitor/position/jg2.png" class="img_2" />
                    <!-- <img v-show="!carWindow.menuSwitch[1]" src="../../../../../../static/img/jjbx/monitor/position/jg-2.png"
                            class="img_2" /> -->
                </div>
                <div class="car-edit-tab" style="background: #EEEEEE; ">
                    <img src="../../../../../../static/img/jjbx/monitor/position/jg3.png" class="img_3" />
                    <!-- <img v-show="!carWindow.menuSwitch[2]" src="../../../../../../static/img/jjbx/monitor/position/jg-3.png"
                            class="img_3" /> -->
                </div>
                <div class="car-edit-tab" style="background: #EEEEEE; ">
                    <img src="../../../../../../static/img/jjbx/monitor/position/jg4.png" class="img_4" />
                    <!-- <img v-show="!carWindow.menuSwitch[3]" src="../../../../../../static/img/jjbx/monitor/position/jg-4.png"
                            class="img_4" /> -->
                </div>
                <div class="car-edit-tab" style="background: #EEEEEE; ">
                    <img src="../../../../../../static/img/jjbx/monitor/position/jg5.png" class="img_5" />
                    <!-- <img v-show="!carWindow.menuSwitch[4]" src="../../../../../../static/img/jjbx/monitor/position/jg-5.png"
                            class="img_5" /> -->
                </div>
                <div class="car-edit-tab" style="background: #EEEEEE; ">
                    <img src="../../../../../../static/img/jjbx/monitor/position/jg6.png" class="img_6" />
                    <!-- <img v-show="!carWindow.menuSwitch[5]" src="../../../../../../static/img/jjbx/monitor/position/jg-6.png"
                            class="img_6" /> -->
                </div>
            </div>
        </div>
        <div style="width: auto;height: auto;">
            <!-- 车辆信息 -->
            <div class="car-Detailinfo">
                <div class="car-Detailinfo-driverinfo">
                    <div class="car-driverinfo-photo">
                        <img src="../../../../../../static/img/jjbx/monitor/position/user-icon.png" />
                    </div>
                    <!-- <div class="car-driverinfo-name">
                            司机：<span>罗师傅</span>
                        </div> -->
                </div>
                <div class="car-Detailinfo-dInfo">
                    <div class="dInfo-row">
                        <div class="dInfo-column-name">车牌号</div>
                        <div class="dInfo-column-val">：鲁F12345</div>
                    </div>
                    <div class="dInfo-row">
                        <div class="dInfo-column-name">司机</div>
                        <div class="dInfo-column-val">：罗师傅</div>
                    </div>
                    <div class="dInfo-row">
                        <div class="dInfo-column-name">里程</div>
                        <div class="dInfo-column-val">：1206km</div>
                    </div>
                    <div class="dInfo-row">
                        <div class="dInfo-column-name">时速</div>
                        <div class="dInfo-column-val">：56km/h</div>
                    </div>
                    <div class="dInfo-row">
                        <div class="dInfo-column-name">位置</div>
                        <div class="dInfo-column-val">：太原市万宝林区前锋路11号</div>
                    </div>
                    <div class="dInfo-row">
                        <div class="dInfo-column-name">时间</div>
                        <div class="dInfo-column-val">：2018-12-11 12:00:00</div>
                    </div>
                </div>
            </div>
            <!-- 信息列表 -->
            <div class="car-tabs">
                <div class="car-tab">
                    <span>
                        处理方式
                    </span>
                    <span style="margin-left:42%;">
                        处理描述
                    </span>
                </div>
            </div>
            <!-- 处理方式选框 -->
            <div class="car-bj-lists">
                <el-radio-group v-model="radio">
                    <el-radio :label="1" style="margin: 5px 3px 5px 0px;">电话通知</el-radio>
                    <el-radio :label="2" style="margin: 5px 3px 5px 0px;">语音下发</el-radio>
                    <el-radio :label="3" style="margin: 5px 3px 5px 0px;">建议停车</el-radio>
                    <el-radio :label="4" style="margin: 5px 0px 5px 0px;">警告提醒</el-radio>
                    <el-radio :label="5" style="margin: 5px 3px 5px 0px;">停车调整</el-radio>
                    <el-radio :label="6" style="margin: 5px 3px 5px 0px;">停车休息</el-radio>
                    <el-radio :label="7" style="margin: 5px 3px 5px 0px;">强制停车</el-radio>
                    <el-radio :label="8" style="margin: 5px 3px 5px 0px;">其他</el-radio>
                </el-radio-group>
            </div>
            <div style="float:right;margin: 10px 100px 20px 0px;">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                </el-input>
            </div>
        </div>
        <div class="button-handle">
            <el-button @click="delVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleRow();">确 定</el-button>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    props: {
        optionParam: {
            type: Object
        }
    },
    data() {
        return {
            delVisible:true,
            //拖拽改变样式
            dragBorder: "0",
            dragBorderRad: "6px",
            radio: "",
            textarea: ""
        };
    },
    computed: {},
    mounted() {},
    methods: {        
            /**
             * @function {鼠标拖动弹框改变其位置}
             * @param  {type} e {description}
             * @return {type} {description}
             */
            onDragStart(e) {
                let _this = this;
                _this.dragBorder = "1px dashed #95B8E7";
                _this.dragBorderRad = "0";
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
            onDragClose() {
                this.dragBorder = "0";
                this.dragBorderRad = "6px";
            }
    },
    beforeDestroy() {}
};
</script>
<style  scoped>
/* 车辆信息弹出窗口 */
.child-alarm-dialog {
    position: absolute;
    top: 180px;
    right: 30%;
    width: 600px;
    height: auto;
    background-color: #fff;
    z-index: 9999;
}

/* 窗口头部 */
.child-alarm-dialog .car-header {
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
.child-alarm-dialog .car-edit {
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
.child-alarm-dialog .car-Detailinfo {
    height: 205px;
    width: auto;
    margin: 7px 0;
    box-sizing: content-box;
    margin: 7px 16px;
}

.car-Detailinfo .car-Detailinfo-driverinfo {
    float: left;
    height: 205px;
    width: 275px;
    margin-right: 22px;
}

.car-Detailinfo-driverinfo .car-driverinfo-photo {
    height: 205px;
    line-height: 205px;
    text-align: center;
    width: 100%;
    background-color: #f7f7f7;
}

.car-driverinfo-photo img {
    height: 44px;
    width: 44px;
    vertical-align: middle;
}
.child-alarm-dialog .button-handle {
    width: 600px;
    margin: 10px 210px;
}
/* .car-Detailinfo-driverinfo .car-driverinfo-name {
        height: 30px;
        line-height: 30px;
        width: 100%;
        font-size: 12px;
        color: #909090;
    }

    .car-driverinfo-name span {
        color: #242424;
    } */

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
.child-alarm-dialog .car-tabs {
    width: auto;
    height: 26px;
    box-sizing: content-box;
    margin: 3px 16px;
    /* border-bottom: 1px solid #e2e2e2; */
}

.car-tabs .car-tab {
    float: left;
    width: 100%;
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
.child-alarm-dialog .car-bj-lists {
    width: 45%;
    height: 54px;
    box-sizing: content-box;
    margin: 10px 16px 20px 16px;
    /* border: 1px solid #dae3f2;
        border-radius:4px; */
    color: #b3b9c8;
    font-size: 12px;
    float: left;
}
.child-alarm-dialog .el-radio__label {
    font-size: 12px;
    padding-left: 0px !important;
}
.child-alarm-dialog .el-radio__inner {
    width: 12px;
    height: 12px;
}
</style>