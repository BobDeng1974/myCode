<!--   
    name：报警设置明细
    desc：报警设置明细界面 v 1.2
    param：paramName{param }        
    return Value : None
    author：qiaoyh 
    date：2018.10.25
-->
<template>
    <!-- <div style="width:100%;"> -->
        <div style="width:100%;margin:0px auto;" class="common-set-body">
            <div style="padding-left:10px;height:22px;padding-top:8px;border-bottom:1px solid rgba(232,238,243,1);box-shadow:0px 2px 6px 0px rgba(47,149,244,0.13);">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>监控中心</el-breadcrumb-item>
                    <el-breadcrumb-item>报警设置</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div style="width:100%;height:630px;;background-color:#F8F8F8;padding-top:10px;">
                <!-- <div>
                    <div>名称</div>
                </div> -->
                <div style="width:90%;background-color:#FFF;margin:10px auto;">
                    <div style="width:98.2%;height:50px;line-height:50px;padding-left:20px;border-bottom:1px solid rgb(232, 238, 243);box-shadow: rgba(47, 149, 244, 0.13) 0px 2px 6px 0px;">
                        <h3 style="float:left;">报警名称</h3>
                        <h3 style="float:left;margin-left:460px;">描述</h3>
                    </div>
                    <div>
                        <el-tree :data="data4"  node-key="id" default-expand-all :expand-on-click-node="false">
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span>{{ node.label }}</span>
                                <span>
                                    <span style="display:inline-block;width:800px;text-align:center;">aaaaassssss</span>
                                <el-button type="text" size="mini" @click="() => append(data)">添加下级报警</el-button>
                                <el-button type="text" size="mini" @click="() => modify(node, data)">修改</el-button>
                                <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
                                </span>
                            </span>
                        </el-tree>
                    </div>
                </div>
                <!-- <div style="float:left;width:32.5%;background-color:#FFF;margin-left:10px;">
                    <div style="width:100%;height:50px;line-height:50px;border-bottom:1px solid rgb(232, 238, 243);box-shadow: rgba(47, 149, 244, 0.13) 0px 2px 6px 0px;">
                        <h2>位置报警</h2>
                    </div>
                    <div>
                        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </div>
                </div>
                <div style="float:left;width:32.5%;background-color:#FFF;margin-left:10px;">
                    <div style="width:100%;height:50px;line-height:50px;border-bottom:1px solid rgb(232, 238, 243);box-shadow: rgba(47, 149, 244, 0.13) 0px 2px 6px 0px;">
                        <h2>设备报警</h2>
                    </div>
                    <div>
                        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </div>
                </div> -->
            </div>
            <div v-show="delVisible" id="drag" class="setting-dialog"  :style="{border:dragBorder,borderRadius:dragBorderRad}">
            
            <div  class="setting-header" @mousedown="onDragStart" @mouseup="onDragClose">
                <div class="setting-add-desc">
                    添加报警类型
                </div>
                <div class="setting-hearder-close">
                    <i class="el-icon-close" style="color: #fff;cursor:pointer;" @click="close();"></i>
                </div>
            </div>
            <div class="setting-add">
                <el-form ref="ruleForm" :model="ruleForm" label-width="60px">
                    <el-form-item label="名称">
                        <el-input v-model="ruleForm.name" placeholder="报警类型名称" style="width:480px;"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input  type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.describe"  style="width:480px;"></el-input>
                    </el-form-item>
                    <div class="button-handle">
                        <el-button @click="delVisible = false">取 消</el-button>
                        <el-button type="primary" @click="handleRow();">确 定</el-button>
                    </div>
                </el-form>
            </div>
            
        </div>
        </div>
    <!-- </div> -->
</template>
<script>
let id = 1000;
    export default {
        data() {
            const data = [{
                id: 1,
                label: '一级 1',
                children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                    id: 9,
                    label: '三级 1-1-1'
                }, {
                    id: 10,
                    label: '三级 1-1-2'
                }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                id: 5,
                label: '二级 2-1'
                }, {
                id: 6,
                label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                id: 7,
                label: '二级 3-1'
                }, {
                id: 8,
                label: '二级 3-2'
                }]
            }];
            return {
                ruleForm: {
                    name: "",
                    describe: "",
                },
                delVisible: false,
                //拖拽改变样式
                dragBorder: "0",
                dragBorderRad: "6px",
                data4: JSON.parse(JSON.stringify(data)),
            }
        },
        methods: {
            append(data) {
                let _this = this;
                // const newChild = { id: id++, label: 'testtest', children: [] };
                // if (!data.children) {
                //     this.$set(data, 'children', []);
                // }
                // data.children.push(newChild);
                _this.delVisible = true;
            },
            modify(node, data) {
                // const parent = node.parent;
                // const children = parent.data.children || parent.data;
                // const index = children.findIndex(d => d.id === data.id);
                // children.splice(index, 1);
            },
            remove(node, data) {
                console.log("aaa");
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.find(d => d.id === data.id);
                children.splice(index, 1);
            },
            handleRow(idx) {
                let _this = this;

                this.$message.success("添加成功");
                this.delVisible = false;
            },
            close(){
                let _this = this;
                _this.delVisible = false;
            },
            /**
             * @function {鼠标拖动弹框改变其位置}
             * @param  {type} e {description}
             * @return {type} {description}
             */
            onDragStart(e) {
                let _this = this;
                _this.dragBorder = "1px dashed #95B8E7";
                _this.dragBorderRad = "0";
                //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
                var divx = e.clientX - document.getElementById("drag").offsetLeft;
                var divy = e.clientY - document.getElementById("drag").offsetTop;
                //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
                document.onmousemove = function (e) {
                    //获取移动后div的位置：鼠标位置-divx/divy
                    var l = e.clientX - divx;
                    var t = e.clientY - divy;
                    document.getElementById("drag").style.left = l + "px";
                    document.getElementById("drag").style.top = t + "px";
                };
                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            },
            onDragClose() {
                this.dragBorder = "0";
                this.dragBorderRad = "6px";
            },
        }
    };
</script>
<style>
.common-set-body .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.common-set-body .setting-dialog {
    position: absolute;
    top: 180px;
    right: 30%;
    width: 600px;
    height: 242px;
    background-color: #fff;
    z-index: 9999;
}
.common-set-body .setting-header {
    cursor: move;
    width: auto;
    height: 40px;
    line-height: 40px;
    background: #2e92f6;
    border-radius: 6px 6px 0 0;
    padding: 0 16px;
}
.common-set-body .setting-add {
    height: 190px;
    width: auto;
    box-sizing: content-box;
    padding: 12px 16px 0 16px;
    background-color: #F8F8F8;
}
.common-set-body .setting-add-desc {
    float: left;
    height: 40px;
    line-height: 40px;
    margin-left: 10px;
    font-size: 12px;
    color: #fff;
}
.setting-hearder-close {
    float: right;
    cursor: default;
    text-align: right;
    width: 40px;
    height: 40px;
    line-height: 40px;
}
.common-set-body .button-handle{
    width: 390px;
    margin: 10px 210px;
}
</style>