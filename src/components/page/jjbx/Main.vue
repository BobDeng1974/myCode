<!--   
    name：紧急避险主界面
    desc：紧急避险主界面
    param：None        
    return Value : None
    author：wenls 
    date：2018.8.29
-->
<template> 
        <!-- <collapse-menu></collapse-menu> -->
        <div style="width:100%; height: calc( 100% - 91px );background: url('../../../../../../static/img/bj.jpg') no-repeat;margin-top: 10px;background-size: 100% 100%;">
 
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
            };
        },
        computed: {},
        mounted() {},
        methods: { 
        },
        beforeDestroy() {}
    }

</script> 
<style> 

    /*************el-button  begin**************/
    .sys-searach-conditions .el-button+.el-button {
        margin-left: 5px !important;
    }

    .sys-searach-conditions .el-button {
        height: 26px !important;
        width: 57px !important;
        font-size: 12px !important;
        padding: 0 !important;
    }

    /*************el-button  stop**************/
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
