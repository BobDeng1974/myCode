<!--   
    name：头部组件
    desc：
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.9.3
-->
<template>
    <div class="common-head-body">
        <!-- background: rgba(55,61,65,1); -->
        <div class="common-head-topbar">
            <div class="common-topbar-menu">
                <div class="common-topbar-memu-link">
                    <a>报表订阅</a>
                </div>
                <div class="common-topbar-memu-link">
                    <a>政府对接</a>
                </div>
                <div class="common-topbar-memu-link">
                    <a>接口中心</a>
                </div>
                <div ref="menuHelp" :style="{backgroundColor:siteSwitchBgcolor}" class="common-topbar-memu-link"
                    @mouseenter="onHelpMouseEnter();" @mouseleave="onHelpMouseLeave();">
                    帮助中心
                    <i :class="{'el-icon-arrow-down':!isMenuhelpShow,'el-icon-arrow-up':isMenuhelpShow}"></i>
                    <div v-show="isMenuhelpShow" :style="{left:siteSwitchLeft,backgroundColor:siteSwitchBgcolor}" class="common-topbar-site-switch"
                        @mouseleave="onHelpMouseLeave();">
                        <div class="common-topbar-site-switch-drop">
                            <a>系统手册</a>
                        </div>
                        <div class="common-topbar-site-switch-drop">
                            <a>系统手册</a>
                        </div>
                        <div class="common-topbar-site-switch-drop">
                            <a>系统手册</a>
                        </div>
                    </div>
                </div>
                <div class="common-topbar-memu-link">
                    <a>升级日志</a>
                </div>
            </div>
        </div>
        <div class="common-head-bottombar">
            <div class="common-head-bottombar-menu" :style="{padding:'0 15px',width:'130px'}">
                <img class="logo" src="../../../static/img/jjbx/menu/logo.png">
            </div>
            <div ref="mId_1" class="common-head-bottombar-menu" :style="{padding:'0 12px'}" @click="onMenuEnter(1);">
                <div class="common-head-bottombar-menu-item-img">
                    <img class="itemimg" src="../../../static/img/jjbx/menu/mtab1.png">
                </div>
                <div class="common-head-bottombar-menu-item-name">
                    <a>管理驾驶舱</a>
                </div>
            </div>
            <div ref="mId_2" class="common-head-bottombar-menu" :style="{padding:'0 12px'}" @click="onMenuEnter(2);">
                <div class="common-head-bottombar-menu-item-img">
                    <img class="itemimg" src="../../../static/img/jjbx/menu/mtab2.png">
                </div>
                <div class="common-head-bottombar-menu-item-name">
                    <a>监控中心</a>
                </div>
            </div>
            <div ref="mId_3" class="common-head-bottombar-menu" :style="{padding:'0 12px'}" @click="onMenuEnter(3);">
                <div class="common-head-bottombar-menu-item-img">
                    <img class="itemimg" src="../../../static/img/jjbx/menu/mtab3.png">
                </div>
                <div class="common-head-bottombar-menu-item-name">
                    <a>报表中心</a>
                </div>
            </div>
            <div ref="mId_4" class="common-head-bottombar-menu" :style="{padding:'0 12px'}" @click="onMenuEnter(4);">
                <div class="common-head-bottombar-menu-item-img">
                    <img class="itemimg" src="../../../static/img/jjbx/menu/mtab4.png">
                </div>
                <div class="common-head-bottombar-menu-item-name">
                    <a>财务中心</a>
                </div>
            </div>
            <div ref="mId_5" class="common-head-bottombar-menu" :style="{padding:'0 12px'}" @click="onMenuEnter(5);">
                <div class="common-head-bottombar-menu-item-img">
                    <img class="itemimg" src="../../../static/img/jjbx/menu/mtab5.png">
                </div>
                <div class="common-head-bottombar-menu-item-name">
                    <a>系统管理</a>
                </div>

            </div>
            <div class="common-head-bottombar-menu" style="float: right;">
                <!-- <transition name="fade">
                    <el-input  v-show="show"  placeholder="请选择日期" ref="menuSearch"  size="mini"  @mouseenter="onMenuSearch();">
                        <i class="el-icon-search el-input__icon" slot="suffix" ></i>
                    </el-input>
                    </transition> -->
                <input class="search-input" type="text" value="请输入搜索内容..." onblur="if(this.value=='') value='请输入搜索内容...';"
                    onclick="if(this.value=='请输入搜索内容...')value='';" />

            </div>
        </div>
        <transition name="el-zoom-in-top">
            <div v-show="show" id="menu" @mouseleave="show=false;" class="menu-manageLayer">
                <div ref="movePointer" style="position: absolute;left: 50px;top:-7px;width:15px;height:10px; background-image: url('../../../static/img/jjbx/menu/xs3.png');background-size: 15px 10px;"></div>
                <div class="layerType">
                    <div class="tItem " @click="onLayCheck(0);" :class="{'tItemSele':isLayCheck[0],'tItemNosele':!isLayCheck[0]}">
                        业务报表
                    </div>
                    <div class="tItem " @click="onLayCheck(1);" :class="{'tItemSele':isLayCheck[1],'tItemNosele':!isLayCheck[1]}">
                        安全报表
                    </div>
                    <div class="tItem " @click="onLayCheck(2);" :class="{'tItemSele':isLayCheck[2],'tItemNosele':!isLayCheck[2]}">
                        基础报表
                    </div>
                    <div class="tItem " @click="onLayCheck(3);" :class="{'tItemSele':isLayCheck[3],'tItemNosele':!isLayCheck[3]}">
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
        <div style="width:100%;height: 100px;background-color: aquamarine;">
            aaaaaaa
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
                isMenuhelpShow: false,
                show: false,
                isLayCheck: [true, false, false, false],
                siteSwitchBgcolor: "#1C2327",
                siteSwitchLeft: "0px"
            };
        },
        computed: {},
        mounted() {},
        methods: {
            onHelpMouseEnter() {
                let self = this;
                self.isMenuhelpShow = true;
                self.siteSwitchBgcolor = "#272B2F";
                self.siteSwitchLeft = self.$refs["menuHelp"].offsetLeft + "px";
                console.log(self.siteSwitchLeft);
            },
            onHelpMouseLeave() {
                let self = this;
                self.isMenuhelpShow = false;
                self.siteSwitchBgcolor = "#1C2327";
            },
            onMenuEnter(mIn) {
                let self = this;
                let val = 0,
                    e_left = 0,
                    e_width = 0,
                    e_height = 0;
                //定位图标位置
                e_left = self.$refs["mId_" + mIn].offsetLeft;
                e_height = self.$refs["mId_" + mIn].offsetHeight;
                e_width = self.$refs["mId_" + mIn].offsetWidth;
                val = e_left + e_width / 2 - 7;
                self.$refs["movePointer"].style.left = val + "px";
                self.show = !self.show;
            },
            onLayCheck(i) {
                let self = this;
                console.log(i);
                self.isLayCheck.forEach((val, index) => {
                    self.$set(self.isLayCheck, index, index == i ? true : false);
                });
                console.log(self.isLayCheck);
                // self.$set(self.isLayCheck, i, (index == i ? 'primary' : ''));
            },
            onMenuSearch() {
                console.log(111111);
                self.$refs["menuSearch"].animate = "350px";
            }
        },
        beforeDestroy() {}
    };

</script>
<style scoped>
    /* .fade-enter-active, .fade-leave-active {
  width:300px;
}
.fade-enter, .fade-leave-to   {
  width:100px;
} */
    .common-head-body {
        min-width: 1200px;
        width: 100%;
        height: 100px;
        position: absolute;
        z-index: 1000;
        top: 0;
        left: 0;
        background: #1c2327;
        /* background: rgba(28,35,39,1); */
        border-bottom: 1px solid hsla(0, 0%, 100%, 0.15);
        color: #fff;
    }

    .common-head-body a,
    .common-head-body a:link,
    .common-head-body a:visited {
        color: #fff;
    }

    .common-head-body a:hover,
    .common-head-body a:link,
    .common-head-body a:visited {
        color: #00c1de;
    }

    .common-head-body .common-head-topbar {
        height: 50px;
        width: 100%;
        border-bottom: 1px solid hsla(0, 0%, 100%, 0.15);
    }

    .common-head-body .common-head-topbar .common-topbar-menu {
        float: right;
        font-size: 14px;
    }

    .common-head-body .common-topbar-menu .common-topbar-memu-link {
        float: left;
        height: 50px;
        line-height: 50px;
        padding: 0 12px;
        cursor: pointer;
    }

    .common-topbar-site-switch {
        position: absolute;
        left: 0;
        top: 50px;
        background-color: #272b2f;
        width: 156px;
        z-index: 1000;
        padding: 10px;
        cursor: pointer;
    }

    .common-head-body .common-topbar-site-switch .common-topbar-site-switch-drop {
        height: 30px;
        line-height: 30px;
        cursor: pointer;
    }

    .common-head-body .common-head-bottombar {
        box-sizing: content-box;
        -webkit-box-sizing: content-box;
        font-size: 14px;
        height: 50px;
        width: 100%;
    }

    .common-head-body .common-head-bottombar .common-head-bottombar-menu {
        float: left;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
    }

    .common-head-bottombar-menu .logo {
        width: 100%;
        height: 31px;
        margin-top: 10px;
    }

    .common-head-bottombar-menu .common-head-bottombar-menu-item-img {
        height: 30px;
        line-height: 30px;
        margin: 0;
        text-align: center;
    }

    .common-head-bottombar-menu-item-img .itemimg {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        display: inline-block;
    }

    .common-head-bottombar-menu-item-name {
        height: 20px;
        line-height: 15px;
    }

    /* menu 菜单 */
    #menu {
        position: absolute;
        top: 102px;
        animation: menuAtion 0.5s;
        -webkit-animation: menuAtion 0.5s;
        animation-fill-mode: forwards;
        border-bottom: 5px solid #5eadf6;
        border-image: -webkit-linear-gradient(#5eadf6, rgb(249, 250, 252)) 30 30;
        border-image: -moz-linear-gradient(#5eadf6, rgb(249, 250, 252)) 30 30;
        border-image: linear-gradient(#5eadf6, rgb(249, 250, 252)) 30 30;
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
        transition: opacity 0.5s;
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
        cursor: pointer;
    }

    .menu-manageLayer .layerType .tItemSele {
        background-color: #2e92f6;
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
        border-left: 1px solid #eee;
    }

    .menu-manageLayer .layerBody .lType .lItem {
        float: left;
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
        background-color: #f1f1f1;
        cursor: pointer;
    }

    .menu-manageLayer .layerBody .lContent .lRow .lColumn1 {
        margin: 0 8px;
    }

    .menu-manageLayer .layerBody .lContent .lRow .lColumn2 {
        margin-top: 10px;
        margin-left: 8px;
        background-color: #f1f1f1;
    }

    .search-input {
        background: #ededed url('http: //webdesignerwall.com/demo/expandable-search-form/images/search-icon.png')  no-repeat 9px;
        padding: 4px 0px 4px 32px;
        width: 100px;
        margin-right: 15px;
        border-radius: 2px;
        color: #ccc;
        background-color: #313538;
        outline: none;
        overflow: hidden;
        height:36px;

        border: 1px solid #313538;
        -moz-box-shadow: inset 1px 1px 10px rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: inset 1px 1px 10px rgba(0, 0, 0, 0.1);
        box-shadow: inset 1px 1px 10px rgba(0, 0, 0, 0.1);
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -o-transition: all 0.3s;
    }

    .search-input:hover,
    .search-input:focus {
        border-color: #069DB4;
        background-color: #313538;
        color: #444;
        width: 200px; 
    }

</style>
