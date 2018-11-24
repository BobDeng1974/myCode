<!--   
    name：紧急避险 导航菜单组件
    desc：用户点击click动态展开菜单，鼠标移开自动隐藏
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.8.29
-->
<template>
    <div style="position:relative">
        <!-- <div style="background-color:blue;width:100%;height:50px;">
            <div ref="mId_1" @click="show=true;getMenuLocaltion(1);" style="float:left;width:100px;height: 50px;background-color: red;">
                导航菜单
            </div>
            <div ref="mId_2" @click="show=true;getMenuLocaltion(2);" style="float:left;width:100px;height: 50px;background-color: yellow;">
                导航菜单
            </div>
        </div> -->
        <div class="menu-head">
            <div class="menu-header">
                <div class="menu_header_top">

                    <div class="menu_header_title">
                        升级日志
                    </div>

                    <div class="menu_header_title_1">
                        <el-dropdown>
                            <span class="el-dropdown-link">帮助中心<i class="el-icon-arrow-down el-icon--right"></i></span>
                            <el-dropdown-menu slot="dropdown" style="top:15px;">
                                <el-dropdown-item>系统视频</el-dropdown-item>
                                <el-dropdown-item>操作手册</el-dropdown-item>
                                <el-dropdown-item>调查问卷</el-dropdown-item>
                                <el-dropdown-item disabled>意见反馈</el-dropdown-item> 
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>

                    <div class="menu_header_title">
                        接口中心
                    </div>

                    <div class="menu_header_title">
                        政府对接
                    </div>

                    <div class="menu_header_title">
                        报表订阅
                    </div>

                    <div class="bg-1"></div>
                    <div class="menu_header_top_1" style="margin-right: 2px;">
                        <img :style="{width:'14px',height:'10px',paddingTop:'7px'}" src="../../../../static/img/jjbx/menu/xx.png">
                    </div>
                    <div class="menu_header_top_1">
                        <img src="../../../../static/img/jjbx/menu/yc.png">
                    </div>
                    <div class="menu_header_top_1">
                        <img src="../../../../static/img/jjbx/menu/bj.png">
                    </div>
                </div>

            </div>
            <div class="menu_header_bottom">
                <div class="menu_header_bottom_1">
                    <div class="menu_logo"><img src="../../../../static/img/jjbx/menu/logo.png"></div>
                    <div ref="mId_1" @click="show=true;onMenuClick(1);" class="menu_header_bottom_title">
                        <div class="laytop">
                            <img src="../../../../static/img/jjbx/menu/jsc.png">
                        </div>
                        <div class="layname">管理驾驶舱</div>
                    </div>
                    <div ref="mId_2" @click="show=true;onMenuClick(2);" class="menu_header_bottom_title">
                        <div class="laytop">
                            <img src="../../../../static/img/jjbx/menu/jk.png">
                        </div>
                        <div class="layname">监控中心</div>
                    </div>
                    <div ref="mId_3" @click="show=true;onMenuClick(3);" class="menu_header_bottom_title">
                        <div class="laytop">
                            <img src="../../../../static/img/jjbx/menu/bb.png">
                        </div>
                        <div class="layname">报表中心</div>
                    </div>
                    <div ref="mId_4" @click="show=true;onMenuClick(4);" class="menu_header_bottom_title">
                        <div class="laytop">
                            <img src="../../../../static/img/jjbx/menu/cw.png">
                        </div>
                        <div class="layname">财务中心</div>
                    </div>
                    <div ref="mId_5" @click="show=true;onMenuClick(5);" class="menu_header_bottom_title">
                        <div class="laytop">
                            <img src="../../../../static/img/jjbx/menu/xt.png">
                        </div>
                        <div class="layname">系统管理</div>
                    </div>
                    <div class="menu-header-search">
                        <el-input placeholder="请选择日期" v-model="state3">
                            <i class="el-icon-search el-input__icon" slot="suffix" @click="test"></i>
                        </el-input>
                    </div>
                </div>
            </div>
        </div>
        <!-- 二级菜单 -->
        <transition name="menuTrans">
            <div v-show="show" id="menu" @mouseleave="enter()" class="menu-manageLayer">
                <div ref="movePointer" style="position: absolute;left: 50px;top:-7px;width:15px;height:10px; background-image: url('../../../static/img/jjbx/menu/xs3.png');background-size: 15px 10px;"></div>
                <div class="layerType">
                    <div class="tItem tItemSele">
                        业务报表
                    </div>
                    <div class="tItem tItemNosele">
                        安全报表
                    </div>
                    <div class="tItem tItemNosele">
                        基础报表
                    </div>
                    <div class="tItem tItemNosele">
                        征信报表
                    </div>
                </div>
                <div class="layerBody">
                    <div class="lType">
                        <div class="lItem">
                            <h4>里程报表</h4>
                        </div>
                        <div class="lItem">
                            <h4>车辆统计表</h4>
                        </div>
                        <div class="lItem ">
                            <h4>区域统计表</h4>
                        </div>
                        <div class="lItem ">
                            <h4>分析报表</h4>
                        </div>
                        <div class="lItem ">
                            <h4>油量油温报表</h4>
                        </div>
                        <div class="lItem">
                            <h4>其他报表</h4>
                        </div>
                        <div class="lItem">
                            &nbsp;
                        </div>
                    </div>

                    <div class="lContent">
                        <div class="lRow">
                            <div class="lColumn lColumn1">
                                里程报表1
                            </div>
                        </div>
                        <div class="lRow">
                            <div class="lColumn lColumn1">
                                停车统计表
                            </div>
                            <div class="lColumn lColumn1">
                                查看疑似故障车辆
                            </div>
                            <div class="lColumn lColumn1">
                                行驶统计表
                            </div>
                        </div>
                        <div class="lRow">
                            <div class="lColumn lColumn1">
                                区域进出统计表
                            </div>
                            <div class="lColumn lColumn1">
                                区域进出车辆表
                            </div>
                            <div class="lColumn lColumn1">
                                区域行驶明细
                            </div>
                        </div>
                        <div class="lRow">
                            <div class="lColumn lColumn1">
                                速度分析
                            </div>
                            <div class="lColumn lColumn1">
                                车辆证件分析
                            </div>
                            <div class="lColumn lColumn1">
                                开关门分析
                            </div>
                        </div>
                        <div class="lRow">
                            <div class="lColumn lColumn1">
                                油量报表
                            </div>
                            <div class="lColumn lColumn1">
                                油温报表
                            </div>
                        </div>
                        <div class="lRow">
                            <div class="lColumn lColumn1">
                                指令明细
                            </div>
                            <div class="lColumn lColumn1">
                                操作明细
                            </div>
                            <div class="lColumn lColumn1">
                                定时跟踪
                            </div>
                            <div class="lColumn lColumn1">
                                司机出勤报表
                            </div>
                            <div class="lColumn lColumn2">
                                设备工作报表
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        data: () => ({
            show: false,
            state3: ''
        }),
        methods: {
            enter() {
                let _this = this;
                _this.show = false;
                for (let i = 1; i <= 5; i++) {
                    _this.$refs["mId_" + i].style.opacity = "0.5";
                }
            },
            test() {
                console.log(this.state3);
            },
            onMenuClick(mIn) {
                let _this = this;
                let val = 0,
                    e_left = 0,
                    e_width = 0,
                    e_height = 0;
                //定位图标位置
                e_left = _this.$refs["mId_" + mIn].offsetLeft;
                e_height = _this.$refs["mId_" + mIn].offsetHeight;
                e_width = _this.$refs["mId_" + mIn].offsetWidth;
                val = e_left + (e_width / 2) - 7;
                _this.$refs["movePointer"].style.left = val + "px";
                //改变选择Tab栏背景色
                for (let i = 1; i <= 5; i++) {
                    if (i == mIn) {
                        _this.$refs["mId_" + mIn].style.opacity = "1";
                    } else {
                        _this.$refs["mId_" + i].style.opacity = "0.5";
                    }
                }

            }
        },
        components: {},
        computed: {},
        mounted() {},
        beforeDestroy() {}
    }

</script>
<style scoped>
    /* 导航菜单 */
    .main-body {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 1);
        /* overflow:auto; */
        min-width: 1359px;
    }

    .menu-header {
        width: 100%;
        height: 25px;
        background: rgba(0, 0, 0, 1);
        color: #FEFEFF;
        /* font-size: 13px; */
    }

    .menu-head {
        width: 100%;
        height: 75px;
        background: rgba(25, 25, 25, 1);
    }

    .menu_header_top {
        float: right;
        width: 500px;
        height: 25px;
        line-height: 25px;
        padding-right: 15px;
    }

    .menu_header_top_1 {
        float: right;
        width: 34px;
        height: 25px;
        text-align: center;
    }

    .menu_header_top_1 img {
        display: inline-block;
        height: 13px;
        width: 14px;
        padding-top: 5px;
    } 

    .menu_header_title {
        float: right;
        width: 60px;
        height: 25px;
        text-align: right;
        font-size: 12px;
        line-height: 25px;
    }

    .menu_header_title_1 {
        float: right;
        width: 80px;
        height: 25px;
        text-align: right;
        font-size: 10px;
    }

    .bg-1 {
        float: right;
        width: 1px;
        height: 25px;
        /* margin: 0px 15px; */
        background: rgba(255, 255, 255, 1);
        /* background-color: black; */
        opacity: 0.3;
    }

    .el-dropdown-link {
        color: rgba(255, 255, 255, 1);
        font-size: 10px;
        line-height: 25px;
    }

    .menu_header_bottom {
        height: 50px;
        width: 100%;

    }

    .menu_header_bottom_1 {
        margin-left: 24px;
        /* width:1510px; */
        height: 50px;
        padding-right: 15px;
        /* float: right; */
    }

    menu_header_bottom_1 div {
        display: inline;
    }

    .menu_header_bottom_title {
        opacity: 0.5;
        width: 11%;
        height: 50px;
        float: left;
        color: #FEFEFF;
        text-align: center;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
    }

    .menu-header-search {
        line-height: 23px;
        width: 170px;
        height: 23px;
        float: right;
        color: #FEFEFF;
        font-size: 12px;
        margin-top: 15px;
    }

    .menu_header_bottom_1>div:nth-of-type(1) {
        width: 23%;
        height: 50px;
        float: left;
    }

    /* .menu_header_bottom_1 div:nth-of-type(7){
        
    } */
    .menu_logo img {
        width: 130px;
        height: 30px;
        margin-top: 10px;
    }

    .menu_header_bottom_title .laytop {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }

    .menu_header_bottom_title .laytop img {
        height: 20px;
        width: 20px;
        display: inline-block;
        vertical-align: middle;
    }

    .menu_header_bottom_title .layname {
        width: 100%;
        height: 20px;
        line-height: 15px;
        font-size: 12px;
    }

    /* menu 菜单 */
    #menu {
        position: absolute;
        top: 75px;
        animation: menuAtion 0.5s;
        -webkit-animation: menuAtion 0.5s;
        animation-fill-mode: forwards; 
         border-bottom:5px solid #5EADF6;
        border-image: -webkit-linear-gradient(#5EADF6,rgb(249, 250, 252)) 30 30;
        border-image: -moz-linear-gradient(#5EADF6,rgb(249, 250, 252)) 30 30;
        border-image: linear-gradient(#5EADF6,rgb(249, 250, 252)) 30 30;  
    }

    @-webkit-keyframes menuAtion

    /* Safari and Chrome */
        {
        0% {}

        25% {
            height: 335px;
        }

        50% {
            height: 335px;
        }

        75% {
            height: 335px;
        }

        100% {
            height: 355px;

        }
    }

    #menu h4 {
        line-height: 30px;
    }

    .menuTrans-enter-active,
    .menuTrans-leave-active {
        transition: opacity .5s;
    }

    .menuTrans-enter,
    .menuTrans-leave-to

    /* .fade-leave-active below version 2.1.8 */
        {
        opacity: 0;
    }

    .menu-manageLayer {
        z-index: 999;
        background-color: #fff;
        width: 100%;
        height: 335px;
        color: #444;
        padding-top: 27px;
    }

    /* menu 菜单左侧类型 */
    .menu-manageLayer .layerType {
        float: left;
        width: 18%;
        min-width: 256px;
        height: auto;
        margin-top: 38px;
    }

    .menu-manageLayer .layerType .tItem {
        float: right;
        font-size: 16px;
        width: 146px;
        height: 46px;
        line-height: 46px;
        padding-left: 25px;
    }

    .menu-manageLayer .layerType .tItemSele {
        background-color: #2E92F6;
        color: #fff;
    }

    .menu-manageLayer .layerType .tItemNosele {
        background-color: #fff;
        color: #444;
    }

    /* menu 菜单主体 */
    .menuTrans .menu-manageLayer .layerBody {
        float: left;
        width: auto;
        min-width: 981px;
        height: auto;
        margin-top: 17px;
        padding-left: 30px;
    }

    .menu-manageLayer .layerBody .lType {
        float: left;
        width: 150px;
        height: auto;
        font-size: 14px;
        color: #96a2ae;
        border-left: 1px solid #EEE;
    }

    .menu-manageLayer .layerBody .lType .lItem {
        float: left;
        ;
        width: 150px;
        height: 30px;
        line-height: 30px;
        margin: 8px 0 8px 33px;
    }

    .menu-manageLayer .layerBody .lContent {
        float: left;
        width: 830px;
        height: auto;
        color: #444;
    }

    .menu-manageLayer .layerBody .lContent .lRow {
        float: left;
        width: 100%;
        height: 30px;
        margin-top: 8px;
        margin-bottom: 8px;
    }

    .menu-manageLayer .layerBody .lContent .lRow .lColumn {
        float: left;
        font-size: 12px;
        width: 150px;
        padding-left: 10px;
        height: 30px;
        line-height: 30px;
        background-color: #F1F1F1
    }

    .menu-manageLayer .layerBody .lContent .lRow .lColumn1 {

        margin: 0 8px;
    }

    .menu-manageLayer .layerBody .lContent .lRow .lColumn2 {

        margin-top: 10px;
        margin-left: 8px;
        background-color: #F1F1F1
    }
</style>
<style>
    /*************el-input  begin**************/
    /*搜索图片*/
    .menu-header-search .el-input__icon {
        line-height: 20px !important;
    }

    /*input*/
    .menu-header-search .el-input__inner {
        background-color: #191919 !important;
        border-radius: 14px !important;
        border: 1px solid #fff !important;
        height: 24px !important;
        line-height: 40px !important;
        font-size: 12px;
        color: #fff;
    }
    /*************el-input  stop**************/
    /*************el-dropdown-menu  begin**************/
    body .el-popper{
        margin-top:5px !important;
    }
    body .el-dropdown-menu{
        border-radius: 2px !important;
    }
    body .el-dropdown-menu__item{
        font-size: 12px !important;
        line-height: 26px !important;
        width: 80px !important;
    }
    /*************el-dropdown-menu  stop**************/

</style>
