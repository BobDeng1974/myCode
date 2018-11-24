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
        <div style="background-color:blue;width:100%;height:50px;">
            <div ref="mId_1" @click="show=true;getMenuLocaltion(1);" style="float:left;width:100px;height: 50px;background-color: red;">
                导航菜单
            </div>
            <div ref="mId_2" @click="show=true;getMenuLocaltion(2);" style="float:left;width:100px;height: 50px;background-color: yellow;">
                导航菜单
            </div>
        </div>
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
            show: false
        }),
        methods: {
            enter() {
                this.show = false;
            },
            getMenuLocaltion(mIn) {
                let _this = this;
                let val = 0,e_left = 0,e_width = 0,e_height = 0; 
                e_left = _this.$refs["mId_" + mIn].offsetLeft;
                e_height = _this.$refs["mId_" + mIn].offsetHeight;
                e_width = _this.$refs["mId_" + mIn].offsetWidth; 
                val = e_left + (e_width / 2) - 7;
                console.log(val);
                _this.$refs["movePointer"].style.left = val+"px";
                console.log(_this.$refs["movePointer"].style.left);
            }
        },
        components: {},
        computed: {},
        mounted() {},
        beforeDestroy() {}
    }

</script>
<style scoped>
    #menu {
        position: absolute;
        top: 50px;
        animation: menuAtion 0.5s;
        -webkit-animation: menuAtion 0.5s;
        animation-fill-mode: forwards;
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

    /* menu 菜单 */
    .menu-manageLayer {
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
