<!--   
    name：紧急避险 导航菜单组件
    desc：用户点击click动态展开菜单，鼠标移开自动隐藏
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.8.22
-->
<template>
    <div>
        <el-button @click="show3 = !show3">Click Me</el-button>
 
            <el-collapse-transition @mouseleave="enter( )" style="margin-top:0px; height:50px;z-index:9999;">
                <div v-show="show3">
                    <div class="transition-box">el-collapse-transition</div>

                </div>
            </el-collapse-transition> 
    </div>
</template>
<script>
    export default {
        data: () => ({
            show3: false
        }),
        methods: {
            enter() {
            //    this.show3 = false;
            }
        },
        components: {},
        computed: {},
        mounted() {},
        beforeDestroy() {}
    }

</script>
<style scoped>
    .transition-box {
        margin-bottom: 10px;
        width: 100%;
        height: 100px;
        border-radius: 4px;
        background-color: #409EFF;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }

</style>
