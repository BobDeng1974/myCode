<!--   
    name：部门档案主界面
    desc：部门档案管理界面，管理部门结构以及管辖车辆信息
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.9.19
-->
<template>
    <div class="common-departmentmain-body">
        <div class="sys-el-breadcrumb-body">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>部门档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="common-departmentmain-left">
            <div class="depment-title">
                <i></i>
                <span>系统管理</span>
            </div>
            <ul class="leftMenu">
                <li class="now" id="organizeli"><a >用户档案</a></li>
                <li id="e6roleli"><a >部门档案</a></li>
                <li id="e6userli"><a >角色档案</a></li>
                <li id="li_linkman"><a >字典档案</a></li>
            </ul>
        </div>
        <div style="float: left;width: calc( 100% - 200px );
        height: 100%;">
            <transfer-panel></transfer-panel>
        </div>

    </div>
</template>
<script>
    import transferPanel from "@/components/child/jjbx/SysManage/UserManage/DepartmentManage/TransferPanel.vue";
    export default {
        components: {
            transferPanel
        },
        props: {
            optionParam: {
                type: Object
            }
        },
        data() {
            return { 
            };
        }, 
        computed: {},
        mounted() { 
        },
        methods: {},
        beforeDestroy() {}
    }

</script>
<style scoped>
    .common-departmentmain-body {
        position: relative; 
        width: 100%;  height:calc( 100% - 112px )  ;
    }

    .common-departmentmain-body .common-departmentmain-left {
        float: left;
        width: 200px;
        height: 100%;
        background: #fff;
        background: url('../../../../../../../static/img/jjbx/SysManage/UserManage/bg_sub_repeat.jpg') repeat-y;
        z-index: 998;
    }

    .common-departmentmain-left .depment-title {
        width: 156px;
        padding: 13px 0 11px 43px;
        background: #f6f6f6;
        box-shadow: 0 1px 0 #fff;
        border: 1px solid #e7e7e7;
        border-width: 1px 1px 1px 0;
    }

    .depment-title i {
        display: inline-block;
        vertical-align: middle;
        width: 25px;
        height: 25px;
        background: url('../../../../../../../static/img/jjbx/monitor/icons.png') no-repeat;
        background-position: -450px -106px;
    }

    .depment-title span {
        font-size: 14px;
        margin: 2px 0 0 10px;
        color: #444444;
    }

    .common-departmentmain-left .leftMenu {
        width: 199px;
        padding: 0;
        list-style-type: none;
    }

    .leftMenu li {
        position: relative;
        cursor: pointer;
        width: 199px;
        height: 32px;
        line-height: 32px;
        border-bottom: 1px solid #ebebeb;
    }

    .leftMenu li a {
        display: block;
        height: 32px;
        padding-left: 10px;
        color: #5a667d;
    }

    .leftMenu li{
        background: #FAFAFA;
    }
    .leftMenu li a:hover {
        background: #2e92f6;
        color:#fff;
    }

</style>
