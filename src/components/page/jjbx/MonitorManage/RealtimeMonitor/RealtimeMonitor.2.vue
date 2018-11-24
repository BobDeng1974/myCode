<!--   
    name：车辆实时监控
    desc：车辆实时监控界面 v 1.1  由于左侧列表需按照易流排版，故存档
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.9.7
-->
<template>
    <div class="common-monitor-body food">
        <div v-show="!isSearchClose" @click="isSearchClose=!isSearchClose" class="left-open"></div>

        <transition name="move">
            <div v-show="isSearchClose" class="common-monitor-left">
                <div class="left-close">
                    <div class="butControl" @click="isSearchClose=!isSearchClose">
                        <i class="el-icon-arrow-left" style="font-size: 14px;"></i>
                    </div>
                </div>
                <div class="left-search">
                    <div class="sea-select">
                        <div class="sea-selname" @mouseleave="isSearchSele = false;">
                            <div @mouseenter="isSearchSele=true" class="sea-name">
                                车队名称
                            </div>
                            <div class="sea-icon">
                                <i class="el-icon-arrow-down"></i>
                            </div>
                            <div v-show="isSearchSele" class="sea-conditions">
                                <div class="sea-option">
                                    车队名称
                                </div>
                                <div class="sea-option">
                                    车队名称
                                </div>
                            </div>
                        </div>
                        <input class="search-input" />
                        <el-button type="primary" icon="el-icon-search">
                        </el-button>

                    </div>
                </div>
                <div style="width:auto;height:112px;box-sizing:border-box;margin:5px;padding:5px;border:0px solid #e7e7e7;">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city" style="float: left;width:50%;margin-left: 0;margin-top: 5px;">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div style="border-top:1px solid #e7e7e7;clear: both; "></div>
                <div ref="carsList" style="width:auto;height: 200px;overflow-y:auto; overflow-x:hidden;background:#fff;">
                    <div style="width:auto;height:auto;box-sizing:border-box;margin:5px;padding:5px;border:0px solid #e7e7e7;border-bottom:1px solid #e7e7e7;padding-bottom:3px; ">
                        <div @click="onCarsHide(0)" style="width: 100%;height:21px;cursor: pointer;   ">
                            <div style="float: left;width:15px;height:100%;margin-right:13px;">
                                <i class="el-icon-circle-plus-outline" :style="{color:isCarsShow[0]?'#409EFF':'#A2A2A2'}"
                                    style="font-size: 15px;color: #D1D1D1;"></i>
                            </div>
                            <div :style="{color:isCarsShow[0]?'#409EFF':'#A2A2A2'}" style="float: left;width:auto;color:#000;font-weight: 600;font-size:12px; ">
                                LPG车队1
                            </div>
                            <div style="float: right;width:15px;height:100%;margin:0;">
                                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
                            </div>
                        </div>
                        <div v-show="isCarsShow[0]" style="width:auto;margin-top:5px; ">
                            <div v-for="(city , index)  in cities" :key="index" style="width: 100%;height:21px;margin-top:3px;">
                                <div style="float: left;width:15px;height:100%;margin-right:13px;">

                                </div>
                                <div :style="{color:checkedArr[index]?'#409EFF':'#A2A2A2'}" style="float: left;width:auto;font-size:12px; ">
                                    {{city}}
                                </div>
                                <div style="float: right;width:15px;height:100%;margin:0;">
                                    <el-checkbox v-model="checkedArr[index]" @change="aa(index);" style="float: left;width:50%;margin-left: 0;"></el-checkbox>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div style="width:auto;height:auto;box-sizing:border-box;margin:5px;padding:5px;border:0px solid #e7e7e7;border-bottom:1px solid #e7e7e7;padding-bottom:3px; ">
                        <div @click="onCarsHide(0)" style="width: 100%;height:21px;cursor: pointer; ">
                            <div style="float: left;width:15px;height:100%;margin-right:13px;">
                                <i class="el-icon-circle-plus-outline" :style="{color:isCarsShow[0]?'#409EFF':'#A2A2A2'}"
                                    style="font-size: 15px;color: #D1D1D1;"></i>
                            </div>
                            <div :style="{color:isCarsShow[0]?'#409EFF':'#A2A2A2'}" style="float: left;width:auto;color:#000;font-weight: 600;font-size:12px; ">
                                LPG车队1
                            </div>
                            <div style="float: right;width:15px;height:100%;margin:0;">
                                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
                            </div>
                        </div>
                        <div v-show="isCarsShow[0]" style="width:auto;margin-top:5px; ">
                            <div v-for="(city , index)  in cities" :key="index" style="width: 100%;height:21px;margin-top:3px;">
                                <div style="float: left;width:15px;height:100%;margin-right:13px;">

                                </div>
                                <div :style="{color:checkedArr[index]?'#409EFF':'#A2A2A2'}" style="float: left;width:auto;font-size:12px; ">
                                    {{city}}
                                </div>
                                <div style="float: right;width:15px;height:100%;margin:0;">
                                    <el-checkbox v-model="checkedArr[index]" @change="aa(index);" style="float: left;width:50%;margin-left: 0;"></el-checkbox>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </transition>
        <!-- map -->
        <div id="carPosition" ref="carPosition" style="float: left;width:100%;height: 100%;background: aqua;">
            <cars-position></cars-position>
        </div>
    </div>
</template>
<script>
    const cityOptions = [
        "超速报警",
        "前碰撞",
        "行人碰撞",
        "车距监控",
        "车道偏离",
        "疲劳驾驶"
    ];
    import carsPosition from "@/components/child/jjbx/CarsPosition.vue";
    export default {
        components: {
            carsPosition
        },
        props: {
            optionParam: {
                type: Object
            }
        },
        data() {
            return {
                isSearchClose: true,
                isSearchSele: false,
                checkAll: false,
                checkedCities: ["超速报警", "前碰撞"],

                isCarsShow: [false, false],
                checkedArr: [false, false, false, false, false, false],
                cities: cityOptions,
                isIndeterminate: true,

                carsClientHeight: 0 //左侧车队列表高度
            };
        },
        computed: {},
        mounted() {
            let _this = this;
            _this.$nextTick(function () {
                window.onresize = function temp() {
                    _this.execCarsClientHight();
                };
            });
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate =
                    checkedCount > 0 && checkedCount < this.cities.length;
            },
            aa(index) {
                console.log(this.checkedArr);
            },
            onCarsHide(index) {
                this.$set(
                    this.isCarsShow,
                    index,
                    (this.isCarsShow[0] = !this.isCarsShow[0])
                );
            },
            execCarsClientHight() {
                let _this = this;
                _this.$refs["carsList"].style.height = window.innerHeight - 300 + "px";
            }
        },
        beforeDestroy() {}
    };

</script>
<style>
    .common-monitor-body {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: red;
    }

    .common-monitor-body .common-monitor-left {
        position: absolute;
        z-index: 2222;
        top: 0;
        left: 0;
        float: left;
        width: 259px;
        height: 100%;
        background-color: #f6f6f6;
        border-right: 1px solid #e7e7e7;
    }

    .common-monitor-body ::-webkit-scrollbar {
        width: 8px;
        border-radius: 10px;
        background-color: #e7eaee;
    }

    /*定义滚动条的轨道颜色、内阴影及圆角*/
    .common-monitor-left ::-webkit-scrollbar-track {
        background-color: #e7eaee;
    }

    /*定义滑块颜色、内阴影及圆角*/
    .common-monitor-left ::-webkit-scrollbar-thumb {
        border-radius: 17px;
        width: 5px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #fff;
    }

    /*定义两端按钮的样式*/
    .common-monitor-left ::-webkit-scrollbar-button {
        background-color: #e7eaee;
    }

    /*定义右下角汇合处的样式*/
    .common-monitor-left ::-webkit-scrollbar-corner {
        background: #e7eaee;
    }

    .common-monitor-left .left-close {
        z-index: 2222;
        width: 100%;
        height: 36px;
        border-bottom: 1px solid #e7e7e7;
        background-color: #f6f6f6;
    }

    .common-monitor-body .left-open {
        z-index: 2222;
        width: 27px;
        height: 27px;
        background: url("../../../../../static/img/jjbx/monitor/icon.png") no-repeat -315px -447px;
        position: absolute;
        left: 0;
        top: 0;
        cursor: pointer;
    }

    .common-monitor-body .left-open:hover {
        background: url("../../../../../static/img/jjbx/monitor/icon.png") no-repeat -315px -474px;
    }

    .butControl {
        cursor: pointer;
        width: 27px;
        height: 27px;
        padding: 8px 5px 0 5px;
        border-right: 1px solid #e7e7e7;
        background-color: #f3f3f3;
    }

    .butControl:hover {
        background: #e0f2fd;
    }

    .common-monitor-left .left-search {
        width: 100%;
        height: 36px;
        border-bottom: 1px solid #e7e7e7;
        background-color: #f6f6f6;
    }

    .left-search .sea-select {
        width: auto;
        height: 33px;
        padding-left: 4px;
        padding-top: 3px;
    }

    .sea-select .sea-selname {
        float: left;
        position: relative;
        width: 80px;
        height: 28px;
        background-color: #f6f6f6;
        border: 1px solid #e7e7e7;
    }

    .sea-selname .sea-name {
        float: left;
        font-size: 12px;
        cursor: pointer;
        width: 61px;
        height: 28px;
        line-height: 28px;
        padding-left: 5px;
    }

    .sea-selname .sea-icon {
        float: right;
        width: 14px;
        font-size: 12px;
        height: 28px;
        line-height: 28px;
    }

    .sea-selname .sea-conditions {
        position: absolute;
        z-index: 999;
        width: auto;
        height: 200px;
        top: 29px;
        left: 0;
        background-color: #fff;
        border: 1px solid #e7e7e7;
        border-top: 0;
    }

    .sea-conditions .sea-option {
        width: 150px;
        font-size: 12px;
        cursor: pointer;
        background-color: #fff;
        box-shadow: 0 1px 0 #fff;
        overflow: hidden;
        clear: both;
        padding: 5px 10px;
    }

    .sea-conditions .sea-option:hover {
        background-color: #f5f5f5;
    }

    .common-monitor-body .el-input__inner {
        height: 30px !important;
        line-height: 30px !important;
    }

    .common-monitor-body .el-select .el-input {
        width: 50px;
    }

    .common-monitor-body .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    /* 搜索按钮 */
    .common-monitor-body .el-button--primary {
        float: left;
        width: 23px;
        height: 30px;
        margin-top: 8px;
        margin-left: 6px;
        font-size: 12px;
        color: #aeaeae;
        margin: 0;
        padding: 0;
        border-radius: 0;
        background-color: #f6f6f6 !important;
        background-color: #f6f6f6 !important;
        border: 1px solid #e7e7e7 !important;
    }

    .common-monitor-body .el-button--primary:focus,
    .el-button--primary:hover {
        background: #e0f2fd !important;
        color: #444 !important;
    }

    /* 复选框 */
    .common-monitor-body .el-checkbox__label {
        font-size: 12px !important;
    }

    .search-input {
        float: left;
        font-size: 14px;
        width: 138px;
        height: 28px;
        margin: 0;
        padding: 0 0 0 5px;
        border-radius: 0;
        background-color: #fff;
        border: 1px solid #e7e7e7;
        border-left: 0;
        border-right: 0;
        outline: none;
        overflow: hidden;
    } 
    /* 进入 */
    .move-enter-active { 
        transition: all .8s cubic-bezier(0.3, 0.5, 0.8, 1.0); 
    }
    /* 离开 */
    .move-leave-active {
        transition: all .8s cubic-bezier(0.3, 0.5, 0.8, 1.0); 
    }
    .move-enter,
    .move-leave-active {
        transform: translateX(-259px);
        opacity: 0;
    }
</style>
