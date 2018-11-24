<!--   
    name：车辆实时监控
    desc：车辆实时监控界面
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.9.7
-->
<template>
    <div style="width:100%;height: 100%;background-color: red;">

        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            :collapse-transition="true" :collapse="isCollapse">
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <el-tree :props="props1" :load="loadNode1" lazy show-checkbox>
                </el-tree>
            </el-menu-item>
        </el-menu>
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
                isCollapse: true,
                label: 'name',
                children: 'zones',
                isLeaf: 'leaf'
            };
        },
        computed: {},
        mounted() {},
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },

            loadNode1(node, resolve) {
                if (node.level === 0) {
                    return resolve([{
                        name: 'region'
                    }]);
                }
                if (node.level > 1) return resolve([]);

                setTimeout(() => {
                    const data = [{
                        name: 'leaf',
                        leaf: true
                    }, {
                        name: 'zone'
                    }];

                    resolve(data);
                }, 500);
            }
        },
        beforeDestroy() {}
    }

</script>
<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .el-menu-item * {
        height: 56px !important;
        line-height: 56px !important;
    }

</style>
