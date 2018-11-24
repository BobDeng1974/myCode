<!--   
    name：头部组件
    desc：头部组件，改版隐藏二级菜单中部tab，故存档
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.9.3
-->
<template>
    <div class="common-head-body">
        <!-- background: rgba(55,61,65,1); -->
        <div style=" width: 100%;">
            <div class="common-head-left">
                <div @click="$router.push({name:'jj_main'});" class="common-head-bottombar-menu" :style="{margin:'0 20px 0 15px',width:'220px'}">
                    <img class="logo" src="../../../static/img/jjbx/menu/logo.png">
                </div>
                <div ref="mId_1" class="common-head-bottombar-menu" @mouseenter="onMenuEnter(1)">
                    <div class="common-head-bottombar-menu-item-name">
                        <a>管理驾驶舱</a>
                    </div>
                </div>
                <div ref="mId_2" class="common-head-bottombar-menu" @mouseenter="onMenuEnter(2);">
                    <div class="common-head-bottombar-menu-item-name">
                        <a>监控中心</a>
                    </div>
                </div>
                <div ref="mId_3" class="common-head-bottombar-menu" @mouseenter="onMenuEnter(3);">
                    <div class="common-head-bottombar-menu-item-name">
                        <a>报表中心</a>
                    </div>
                </div>
                <div ref="mId_4" class="common-head-bottombar-menu" @mouseenter="onMenuEnter(4);">
                    <div class="common-head-bottombar-menu-item-name">
                        <a>财务中心</a>
                    </div>
                </div>
                <div ref="mId_5" class="common-head-bottombar-menu" @mouseenter="onMenuEnter(5);">
                    <div class="common-head-bottombar-menu-item-name">
                        <a>业务中心</a>
                    </div>
                </div>
                <div ref="mId_6" class="common-head-bottombar-menu" @mouseenter="onMenuEnter(6);">
                    <div class="common-head-bottombar-menu-item-name">
                        <a>系统管理</a>
                    </div>
                </div>
            </div>
            <div class="common-head-topbar">
                <div class="common-topbar-menu">
                    <el-dropdown style="float: left;" @command="onSysExit">
                        <div class="common-topbar-menu-linkP">
                            <!-- <a> -->
                            <i class="el-icon-jjbx-name" style="color:#A7A8A9;"></i>
                            <!-- </a> -->
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userInfo">个人资料</el-dropdown-item>
                            <el-dropdown-item command="sysExit">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
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
                        <div v-show="isMenuhelpShow" :style="{left:siteSwitchLeft,backgroundColor:siteSwitchBgcolor}"
                            class="common-topbar-site-switch" @mouseleave="onHelpMouseLeave();">
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
                <!-- <transition name="fade">
                    <el-input  v-show="show"  placeholder="请选择日期" ref="menuSearch"  size="mini"  @mouseenter="onMenuSearch();">
                        <i class="el-icon-search el-input__icon" slot="suffix" ></i>
                    </el-input>
                    </transition> -->

                <!--  <div style="width:20px;height:50px;float: right;margin-right: 15px;text-align: center;line-height: 50px;">
                    <i @click="onFullscrren();" class="el-icon-jjbx-fullscrren" style="vertical-align: middle;"></i>
                </div> -->
                <input class="search-input" type="text" value="请输入搜索内容..." onblur="if(this.value=='') value='请输入搜索内容...';"
                    onclick="if(this.value=='请输入搜索内容...')value='';" />

            </div>
        </div>

        <transition name="el-zoom-in-top">
            <div v-show="show[0]" id="menu" @mouseleave="onMenuLeave(0)" class="menu-manageLayer">
                <div ref="movePointer" class="menu-intop"></div>
                <div v-show="show[1]" id="menu-1" style="width: 100%; ">
                    <div style="float: left;width:146px;padding: 0 0 0 25px;color: #666666;  height:100px;line-height: 100px;font-size:16px;cursor: pointer;text-align: center; ">
                        驾驶舱
                    </div>
                    <div class="msgLayer">
                        <a @click="$router.push({name:'jj_main'});">
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">企业</div>
                        </a>
                    </div>
                    <div class="msgLayer">
                        <a @click="$router.push({name:'dy_main'});">
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">政府</div>
                        </a>
                    </div>
                </div>
                <div v-show="show[2]" id="menu-1" style="width: 100%; ">
                    <div style="float: left;width:146px;padding: 0 0 0 25px;color: #666666;  height:100px;line-height: 100px;font-size:16px;cursor: pointer;text-align: center; ">
                        监控中心
                    </div>
                    <div class="msgLayer">
                        <a @click="$router.push({name:'mm_map_monit'});">
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">实时定位</div>
                        </a>
                    </div>
                    <div class="msgLayer">
                        <!-- <a @click="$router.push({name:'mm_map_track', query: { userId: 123 }});"> -->
                        <a @click="$router.push({name:'mm_map_track'});">
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">轨迹回放</div>
                        </a>
                    </div>
                    <div class="msgLayer">
                        <a @click="$router.push({name:'mm_alarm__alarm'});">
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">车辆报警</div>
                        </a>
                    </div>
                </div>
                <div v-show="show[3]" id="menu-1" style="width: 100%; ">
                    <div style="float: left;width:146px;padding: 0 0 0 25px;color: #666666;  height:100px;line-height: 100px;font-size:16px;cursor: pointer;text-align: center; ">
                        报表中心
                    </div>
                    <div class="msgLayer">
                        <a @click="$router.push({name:'sm_milestat_milestat'});">
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">里程统计</div>
                        </a>
                    </div>
                    <div class="msgLayer">
                        <a>
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">停车统计</div>
                        </a>
                    </div>
                    <div class="msgLayer">
                        <a>
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">企业排名统计</div>
                        </a>
                    </div>
                    <div class="msgLayer">
                        <a>
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">高速报警统计</div>
                        </a>
                    </div>
                    <div class="msgLayer">
                        <a>
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">报警处理统计</div>
                        </a>
                    </div>
                    <div class="msgLayer">
                        <a @click="$router.push({name:'sm_esfstat_esfstat'});">
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">设备疑似故障统计</div>
                        </a>
                    </div>
                    <div class="msgLayer">
                        <a @click="$router.push({name:'sm_vehonrate_vehonrate'});">
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">车辆在线率统计</div>
                        </a>
                    </div>
                    <div class="msgLayer">
                        <a>
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">司机打卡信息统计</div>
                        </a>
                    </div>
                </div>
                <div v-show="show[4]" id="menu-1" style="width: 100%; ">
                    <div style="float: left;width:146px;padding: 0 0 0 25px;color: #666666;  height:100px;line-height: 100px;font-size:16px;cursor: pointer;text-align: center; ">
                        财务中心
                    </div>
                    <!-- <div class="msgLayer">
                        <a @click="$router.push('/main');">
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div  class="font-12"  style="width:100%;height: 30px;line-height:30px;">实时定位</div>
                        </a>
                    </div> -->

                </div>
                <div v-show="show[5]" id="menu-1" style="width: 100%; ">
                    <div style="float: left;width:146px;padding: 0 0 0 25px;color: #666666;  height:100px;line-height: 100px;font-size:16px;cursor: pointer;text-align: center; ">
                        业务中心
                    </div>
                    <div class="msgLayer">
                        <a>
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">设备安装／变更</div>
                        </a>
                    </div>
                    <div class="msgLayer">
                        <a>
                            <i class="el-icon-document" style="vertical-align: bottom;font-size: 40px;"></i>
                            <div class="font-12" style="width:100%;height: 30px;line-height:30px;">司机打卡调度</div>
                        </a>
                    </div>
                </div>
                <div v-show="show[6]" id="menu-6">
                    <div class="layerType">
                        <div class="itemRow">
                            <div class="tItem " @click="onLayCheck(0);" :class="{'tItemSele':isLayCheck[0],'tItemNosele':!isLayCheck[0]}">
                                用户管理
                            </div>
                        </div>
                        <div class="itemRow">
                            <div class="tItem " @click="onLayCheck(1);" :class="{'tItemSele':isLayCheck[1],'tItemNosele':!isLayCheck[1]}">
                                车辆管理
                            </div>
                        </div>
                        <div class="itemRow">
                            <div class="tItem " @click="onLayCheck(2);" :class="{'tItemSele':isLayCheck[2],'tItemNosele':!isLayCheck[2]}">
                                人员管理
                            </div>
                        </div>
                        <div class="itemRow">
                            <div class="tItem " @click="onLayCheck(3);" :class="{'tItemSele':isLayCheck[3],'tItemNosele':!isLayCheck[3]}">
                                终端管理
                            </div>
                        </div>
                        <div class="itemRow">
                            <div class="tItem " @click="onLayCheck(4);" :class="{'tItemSele':isLayCheck[4],'tItemNosele':!isLayCheck[4]}">
                                系统配置
                            </div>
                        </div>
                    </div>
                    <div class="layerBody">
                        <div class="lContent">
                            <div v-show="isLayCheck[0]" class="lRow">
                                <div @click="$router.push({name:'sm_user_userfiles',params:{id:'aass' }});" class="lColumn lColumn1">
                                    用户档案
                                </div>
                                <div @click="$router.push({name:'sm_dept_deptMain',params:{id:'aass' }});" class="lColumn lColumn1">
                                    部门档案
                                </div>
                                <div @click="$router.push({name:'sm_user_userrole'});" class="lColumn lColumn1">
                                    角色档案
                                </div>
                                <div @click="$router.push({name:'sm_user_userDictionary',params:{id:'aass' }});" class="lColumn lColumn1">
                                    字典档案
                                </div>
                                <div @click="$router.push({name:'sm_user_menuMain'});" class="lColumn lColumn2" >
                                    菜单档案
                                </div>
                            </div>
                            <div v-show="isLayCheck[1]" class="lRow">
                                <div @click="$router.push({name:'sm_vehicle_vehicle'});" class="lColumn lColumn1">
                                    主车档案
                                </div>
                                <div @click="$router.push({name:'sm_trailer_trailer'});" class="lColumn lColumn1">
                                    挂车档案
                                </div>
                                <div @click="$router.push({name:'sm_fleet_fleet'});" class="lColumn lColumn1">
                                    车队档案
                                </div>
                            </div>
                            <div v-show="isLayCheck[2]" class="lRow">
                                <div @click="$router.push({name:'sm_driver_driver'});" class="lColumn lColumn1">
                                    驾驶员档案
                                </div>
                                <div class="lColumn lColumn1">
                                    押运员档案
                                </div>
                                <div @click="$router.push({name:'sm_supplier_supplier'});" class="lColumn lColumn1">
                                    供应商档案
                                </div>
                            </div>
                            <div v-show="isLayCheck[3]" class="lRow">
                                <div @click="$router.push({name:'sm_device_device'});"  class="lColumn lColumn1">
                                    设备档案
                                </div>
                                <div class="lColumn lColumn1">
                                    采集日志
                                </div>
                                <div class="lColumn lColumn1">
                                    设备检测
                                </div>
                                <div @click="$router.push({name:'sm_dmessage_dmessage'});" class="lColumn lColumn1">
                                    <!-- 设备指令下发 -->
                                    设备消息
                                </div>
                            </div>
                            <div v-show="isLayCheck[4]" class="lRow">
                                <div @click="$router.push({name:'mm_alarmSetting_alarmSetting'});" class="lColumn lColumn1">
                                    报警规则设置
                                </div>
                                <div  @click="$router.push({name:'mm_alarmSetting__alarmSettingDet'});" class="lColumn lColumn1">
                                    报警设置明细
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </transition>
        <div style="clear: both;"></div>
        <real-warning></real-warning>
    </div>
</template>
<script>
    import RealWarning from "@/components/child/jjbx/MonitorManage/RealtimeMonitor/RealWarning.vue";
    export default {
        components: {
            RealWarning
        },
        props: {
            optionParam: {
                type: Object
            }
        },
        data() {
            return {
                isMenuhelpShow: false, //帮助菜单 是否隐藏
                siteSwitchBgcolor: "#1C2327", //帮助菜单 背景色
                siteSwitchLeft: "0px", //帮助菜单  居左位置
                show: [false, false, false, false, false, false, false], //二级菜单  是否隐藏
                isLayCheck: [true, false, false, false,false], //二级菜单点击
                siteSwitchBgcolor: "#1C2327", //帮助菜单 背景色
                siteSwitchLeft: "0px", //帮助菜单  居左位置 

            };
        },
        computed: {},
        mounted() {},
        methods: {
            goPage(id) {
                switch (id) {
                    case 1:
                        this.$router.push("/main");
                        break;
                    case 2:
                        this.$router.push("/dydp/");
                        break;
                }

            },
            onSysExit(command) {
                let _this = this;
                console.log(command);
                let exitFunc = () => {
                    this.$confirm('您确定要退出系统, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _this.appConfig.removeAccount();
                        _this.appConfig.removeUserInfo();
                        _this.$router.push({
                            name: 'login'
                        });
                        this.$message({
                            type: 'success',
                            message: '您已退出系统!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '您已取消退出'
                        });
                    });
                };


                /*    this.$message({
                       showClose: true,
                       message: '您已成功退出系统',
                       type: 'success'
                   }); */
                switch (command) {
                    case 'sysExit':
                        exitFunc();
                        break;
                    default:
                        break;
                }
            },
            onFullscrren() {
                this.$emit('on-home-FullScrren-show');
            },
            onHelpMouseEnter() {
                let self = this;
                self.isMenuhelpShow = true;
                self.siteSwitchBgcolor = "#272B2F";
                self.siteSwitchLeft = self.$refs["menuHelp"].offsetLeft + "px";
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
                    e_width = 0;
                //定位图标位置
                e_left = self.$refs["mId_" + mIn].offsetLeft;
                e_width = self.$refs["mId_" + mIn].offsetWidth;
                val = e_left + e_width / 2 - 13;
                self.$refs["movePointer"].style.left = val + "px";
                self.$set(self.show, 0, true);
                for (let i = 1; i < self.show.length; i++) {
                    self.$set(self.show, i, i == mIn ? true : false);
                }
            },
            onMenuLeave(id) {
                this.$set(this.show, id, false);
            },
            onLayCheck(i) {
                let self = this;
                self.isLayCheck.forEach((val, index) => {
                    self.$set(self.isLayCheck, index, index == i ? true : false);
                });
                // self.$set(self.isLayCheck, i, (index == i ? 'primary' : ''));
            },
            onMenuSearch() {
                self.$refs["menuSearch"].animate = "350px";
            }
        },
        beforeDestroy() {}
    };

</script>
<style scoped>
    .common-head-body {
        min-width: 1200px;
        width: 100%;
        height: 80px;
        z-index: 3333;
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

    .common-head-body .common-head-left {
        width: calc(100% - 430px);
        height: 80px;
        float: left;
    }

    .common-head-body .common-head-topbar {
        float: right;
        height: 30px;
        width: 430px;
    }

    .common-head-body .common-head-topbar .common-topbar-menu {
        float: right;
        font-size: 14px;
    }

    .common-head-body .common-topbar-menu .common-topbar-memu-link {
        float: left;
        height: 30px;
        line-height: 30px;
        padding: 0 12px;
        font-size: 12px;
        cursor: pointer;
    }

    .common-head-body .common-topbar-menu .common-topbar-menu-linkP {
        float: left;
        border-radius: 15px;
        width: 16px;
        height: 16px;
        margin-top: 5px;
        padding: 4px 5px;
        line-height: 16px;
        box-sizing: content-box;
        background: #fff;
    }

    .common-topbar-site-switch {
        position: absolute;
        left: 0;
        top: 30px;
        background-color: #272b2f;
        width: 156px;
        z-index: 3333;
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
        width: 430px;
        float: right;
    }

    .common-head-body .common-head-bottombar-menu {
        float: left;
        height: 80px;
        line-height: 80px;
        cursor: pointer;
        margin: 0 16px;
    }

    .common-head-bottombar-menu .logo {
        width: 160px;
        height: 50px;
        margin-top: 15px;
    }

    .common-head-bottombar-menu .common-head-bottombar-menu-item-img {
        height: 30px;
        line-height: 30px;
        margin: 25px 0 0 0;
        text-align: center;
    }

    .common-head-bottombar-menu-item-img .itemimg {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        display: inline-block;
    }

    .common-head-bottombar-menu-item-name {
        height: 80px;
        line-height: 80px;
    }

    /* menu 菜单 */
    #menu {
        position: absolute;
        top: 80px;
        box-shadow: 0px 3px 3px 0px rgba(92, 175, 293, 0.15);
    }

    #menu-1 {
        height: 115px;
        animation: menuAtion-1 0.8s;
        -webkit-animation: menuAtion-1 0.8s;
        animation-fill-mode: forwards
    }

    #menu-2 {
        height: 335px;
        animation: menuAtion-2 0.8s;
        -webkit-animation: menuAtion-2 0.8s;
        animation-fill-mode: forwards
    }

    @-webkit-keyframes menuAtion-1

    /* Safari and Chrome */
        {
        0% {}

        25% {
            height: 105px;
        }

        50% {
            height: 105px;
        }

        75% {
            height: 105px;
        }

        100% {
            height: 115px;
        }
    }

    @-webkit-keyframes menuAtion-2

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

    .msgLayer {
        float: left;
        width: 100px;
        color: #96a2ae;
        border-radius: 3px;
        height: auto;
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        margin-right: 20px;
    }

    .msgLayer a {
        font-size: 12px;
        background: #f1f1f1;
        display: block;
        border-radius: 3px;
        padding-top: 15px;
        color: #96a2ae;
    }

    .msgLayer a:hover {
        background: #46bfea;
        color: #fff;
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
        z-index: 3000;
        background-color: #fff;
        width: 100%;
        color: #444;
        padding-top: 27px;
    }

    .menu-manageLayer .menu-intop {
        position: absolute;
        left: 50px;
        top: -15px;
        width: 20px;
        height: 23px;
        background-image: url('../../../static/img/jjbx/menu/xs3.png');
        background-size: 20px 23px;
    }

    /* menu 菜单左侧类型 */
    .menu-manageLayer .layerType {
        float: left;
        width: 18%;
        min-width: 256px;
        height: auto;
        padding-top: 38px;
        padding-bottom: 38px;
        border-right: 1px solid #eee;
    }

    .layerType .itemRow {
        width: 100%;
        height: 46px;
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
        /* border-left: 1px solid #eee; */
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
        /* border-left: 1px solid #eee; */
    }

    .menu-manageLayer .layerBody .lContent .lRow {
        float: left;
        width: 100%;
        height: 30px;
        /* margin-top: 8px;
        margin-bottom: 8px; */
        margin: 8px 0 8px 33px;

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
        background: #ededed url('../../../static/img/jjbx/menu/search-icon.png') no-repeat;
        background-position: 98% 50%;
        background-size: 16px 16px;
        padding: 4px 32px 4px 4px;
        width: 200px;
        height: 20px;
        font-size: 14px;
        margin-right: 15px;
        margin-top: 10px;
        border-radius: 0;
        color: #ccc;
        background-color: #313538;
        border: 1px solid #313538;
        outline: none;
        overflow: hidden;
        float: right;
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
        width: 300px;
    }

</style>
