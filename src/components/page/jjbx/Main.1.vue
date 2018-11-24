<!--   
    name：紧急避险主界面
    desc：紧急避险主界面
    param：None        
    return Value : None
    author：wenls 
    date：2018.8.29
-->
<template>
    <div style="position: relative;">
        <collapse-menu></collapse-menu>
        <!-- 系统位置 -->
        <el-row class="el-row-borderStl">
            <el-col :span="24">
                <!-- <div class="grid-content bg-purple-dark" style="background-color: red">12</div> -->

                <div class="sys-location sys-col1">
                    运营仪表盘
                </div>
                <div class="sys-location sys-col2">
                    车辆定位
                </div>
            </el-col>
        </el-row>
        <!-- 运营仪表盘 -->
        <el-row>
            <el-col :span="13">
                <div class="sys-search-lable ">
                    运营仪表盘
                </div>
            </el-col>
            <el-col :span="5">

                <div class="sys-searach-conditions">
                    <el-button :type="searchButArr[0]" @click="onSearchTabChange(0);">昨天</el-button>
                    <el-button :type="searchButArr[1]" @click="onSearchTabChange(1);">近7天</el-button>
                    <el-button :type="searchButArr[2]" @click="onSearchTabChange(2);">近30天</el-button>
                    <div style="width:15px;float: right;">&nbsp;</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="sys-searach-date">
                    <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
        <el-row class="el-row-margin-bot" :gutter="16" style="margin-left: 8px;margin-right:0px;height:130px;">
            <el-col :span="4">
                <div class="grid-content bg-purple" style="height:130px;">
                    <div style="float:left;line-height:35px;margin:10px 25px;">
                        <p style="font-size:14px;font-weight:500;color:rgba(144,144,144,1);">车辆总数(辆)</p>
                        <p style="font-size:26px;font-weight:bold;color:rgba(30,30,30,1);">19,000</p>
                        <p style="font-size:14px;font-weight:400;color:rgba(28,191,108,1);"><img src="">13.76%</p>
                    </div>
                    <div style="right;"><img src=""></div>
                </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple" style="height:130px;"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple" style="height:130px;"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple" style="height:130px;"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple" style="height:130px;"></div></el-col>
        </el-row>
        <el-row class="el-row-margin-bot" :gutter="16" style="margin-left:8px;margin-right:0px;height:570px;">
            <el-col style="width:60%;height:100%;"><div class="grid-content bg-purple" style="height:100%;"></div></el-col>
            <el-col style="width:40%;float:right;" ><div class="grid-content bg-purple" style="height:272px;"></div></el-col>
            <el-col style="width:40%;float:right;margin-top:16px;" ><div class="grid-content bg-purple" style="height:282px;"></div></el-col>
        </el-row>
    </div>
</template>
<script>
    import collapseMenu from "@/components/common/jjbx/CollapseMenu.vue";
    export default {
        components: {
            collapseMenu
        },
        props: {
            optionParam: {
                type: Object
            }
        },
        data() {
            return {
                searchButArr: ['primary', '', ''],
                value6: ''
            };
        },
        computed: {},
        mounted() {},
        methods: {
            onSearchTabChange(index) {
                let self = this;
                self.searchButArr.forEach(function (val, i) {
                    self.$set(self.searchButArr, i, (index == i ? 'primary' : ''));
                });

                console.log(self.searchButArr);
            }
        },
        beforeDestroy() {}
    }

</script>
<style scoped>

</style>
<style>
    .el-row {
        z-index: 222;
        
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-row-margin-bot{
        margin-bottom: 25px;
    }
    .el-row-borderStl {
        border-bottom: 5px solid #D8E5F2;
        border-image: -webkit-linear-gradient(#D8E5F2, #fff) 30 30;
        border-image: -moz-linear-gradient(#D8E5F2, #fff) 30 30;
        border-image: linear-gradient(#D8E5F2, #fff) 30 30;
    }

    .el-col {
        border-radius: 4px;
    }
    .el-col-4 {
        width: 20%;
        /* height: 130px; */
    }  

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        min-height: 25px;
        line-height: 25px;
        border-radius: 8px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }





   
    /* 系统位置 */

    .sys-location {
        float: left;
        width: 7.6%;
        text-align: center;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
    }

    .sys-col1 {
        color: #59A5F8;
        border-right: 1px solid #eee;
    }

    .sys-col2 {
        color: #000; 
    }

    .sys-search-lable {
        float: left;
        margin-left: 17px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        color: #2E92F6;
        font-size: 15px;
        font-weight: bold;
    }

    .sys-searach-conditions {
        float: left;
        text-align: right;
        height: 30px;
        line-height: 27px;
        color: #2E92F6;
        font-size: 15px;
        font-weight: bold;
        width: 100%;
    }

    .sys-searach-date {
        float: left;
        text-align: center;
        height: 30px;
        line-height: 30px;
        color: #2E92F6;
        font-size: 15px;
        font-weight: bold;
    }

    /*************el-buttom  begin**************/
    .sys-searach-conditions .el-button+.el-button {
        margin-left: 5px !important;
    }

    .sys-searach-conditions .el-button {
        height: 26px !important;
        width: 57px !important;
        font-size: 12px !important;
        padding: 0 !important;
    }

    /*************el-buttom  stop**************/
    /*************el-date-picker  begin**************/

    .sys-searach-date .el-input__inner {
        height: 26px !important;
        line-height: 26px !important;
        width: 90% !important;
    }

    .sys-searach-date .el-date-editor .el-range__icon {
        line-height: 12px !important;
    }

    .sys-searach-date .el-date-editor .el-range-separator {
        line-height: 18px !important;
    }

    .sys-searach-date .el-date-editor .el-range-input,
    .el-date-editor .el-range-separator {
        font-size: 12px !important;
    }

    /*************el-date-picker  stop**************/

</style>
