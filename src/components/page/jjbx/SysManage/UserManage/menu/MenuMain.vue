<!--   
import func from './vue-temp/vue-editor-bridge';
    name：菜单管理主页面
    desc：
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.11.13
-->
<template>
    <div class="common-menumain-body" v-loading="addMenuLoad">
        <div style="padding-left:10px;height:22px;padding-top:8px;border-bottom:1px solid rgba(232,238,243,1);box-shadow:0px 2px 6px 0px rgba(47,149,244,0.13);">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>菜单档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="common-menumain-formbox">
            <div class="common-menumain-handlebox">
                <button type="button" class="button-info" @click="menuAddWin.isWinClose=true;">添加</button>
            </div>
        </div>
        <tree-table :data-source="options" :upTreetable="getMenuOptionsData" :elSeleOptions="elSeleOptions"></tree-table>

        <div v-show="menuAddWin.isWinClose" id="treeDragId" :style="{border:menuAddWin.dragBorder,borderRadius:menuAddWin.dragBorderRad}" class="child-menumain-dialog">
            <!-- 车牌号 -->
            <div @mousedown="onDragStart" @mouseup="onDragClose" class="car-header">
                <div class="car-hearder-desc">
                    添加菜单
                </div>
                <div class="car-hearder-close">
                    <i @click="menuAddWin.isWinClose=false;cleanAddMenuForm();" class="el-icon-close" style="color: #fff;"></i>
                </div>
            </div>
            <div class="row">
                <div class="column-label">
                    <span class="menu-el-dialog-row-span">*</span>菜单类型：</div>
                <div class="column-val">
                    <el-radio v-model="menuAddWin.formInfo.type"  label="0">菜单目录</el-radio>
                    <el-radio v-model="menuAddWin.formInfo.type"  label="1">页面</el-radio>
                </div>
            </div>
            <div class="row">
                <div class="column-label">上级菜单：</div>
                <div class="column-val">
                    <el-cascader v-loading="getMenuoptionLoad" :options="options" :props="props" v-model="parentidarr" clearable change-on-select :show-all-levels="false" size="mini"></el-cascader>
                </div>
            </div>
            <div class="row">
                <div class="column-label"><span class="menu-el-dialog-row-span">*</span>名称：</div>
                <div class="column-val">
                    <input type="text" placeholder="请输入名称" class="sys-common-input" v-model="menuAddWin.formInfo.label">
                </div>
                <div style="clear: both;"></div>
            </div>
            <div v-show="menuAddWin.formInfo.type==='1'" class="row">
                <div class="column-label">权限点：</div>
                <div class="column-val">
                    <el-select v-model="elSeleValue" multiple placeholder="请选择">
                        <el-option v-for="item in elSeleOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="clear: both;"></div>
            </div>
            <div class="row">
                <div class="column-label"><span class="menu-el-dialog-row-span">*</span>唯一标识：</div>
                <div class="column-val">
                    <input type="text" placeholder="请输入内码" class="sys-common-input" v-model="menuAddWin.formInfo.ncode">
                </div>
            </div>
            <div class="row">
                <div class="column-label">排序：</div>
                <div class="column-val">
                    <input type="text" placeholder="请输入排序号" class="sys-common-input" v-model="menuAddWin.formInfo.orderNum">
                </div>
            </div>
            <div class="row" style="height:60px;">
                <div class="column-label">备注：</div>
                <div class="column-val">
                    <el-input type="textarea" style="font-size:12px;" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注信息" v-model="menuAddWin.formInfo.remark">
                    </el-input>
                </div>
            </div>
            <div class="row" style="text-align: center;margin-bottom:10px;">
                <el-button type="primary" size="mini" @click="menuAddWin.isWinClose=!menuAddWin.isWinClose;cleanAddMenuForm();">取消</el-button>
                <el-button type="primary" size="mini" @click="onAddMenuClick">确定</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import ajax from "axios";
import treeTable from "@/components/common/jjbx/TreeTable.vue";
export default {
    components: {
        treeTable
    },
    props: {},
    data() {
        return {
            addMenuLoad: false,
            getMenuoptionLoad: false,
            options: [
                {
                    value: "0",
                    label: "指南",
                    children: [
                        {
                            value: "1",
                            label: "设计原则",
                            children: [
                                {
                                    value: "2",
                                    label: "一致"
                                }
                            ]
                        }
                    ]
                }
            ],
            props: {
                value: "id"
            },
            parentidarr: [],
            elSeleOptions:[],            
            elSeleValue: [],
            //弹窗
            menuAddWin: {
                //拖拽改变样式
                dragBorder: "1",
                dragBorderRad: "6px",
                //窗口显示
                isWinClose: false,
                formInfo: {
                    parentId: 0,
                    level: 0,
                    type: "0", //0:目录，1:页面
                    label: "",
                    ncode: "",
                    remark: "",
                    isShow: "1",
                    perms:"",
                    orderNum: 0 //排序
                }
            }
        };
    },
    computed: {},
    mounted() {
        let _this = this;
        _this.$nextTick(function() {
            _this.getMenuOptionsData();
            _this.getMenuPermButData();
        });
    },
    methods: {
        onDragStart(e) {
            this.menuAddWin.dragBorder = "1px dashed #95B8E7";
            this.menuAddWin.dragBorderRad = "0";
            var divx =
                e.clientX - document.getElementById("treeDragId").offsetLeft;
            var divy =
                e.clientY - document.getElementById("treeDragId").offsetTop;
            document.onmousemove = function(e) {
                var l = e.clientX - divx;
                var t = e.clientY - divy;
                document.getElementById("treeDragId").style.left = l + "px";
                document.getElementById("treeDragId").style.top = t + "px";
            };
            document.onmouseup = function(e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        onDragClose() {
            this.menuAddWin.dragBorder = "1px solid #95B8E7";
            this.menuAddWin.dragBorderRad = "6px";
        },
        cleanAddMenuForm() {
            this.menuAddWin.formInfo = {
                parentId: 0,
                level: 0,
                type: "0", //0:目录，1:页面
                label: "",
                ncode: "",
                remark: "",
                isShow: "1",
                perms:"",
                orderNum: 0 //排序
            };
            this.elSeleValue = [];
            this.parentidarr= [];
        },
        onAddMenuClick() {
            let _this = this;
            // console.log(JSON.stringify(_this.menuAddWin.formInfo));

            if (!_this.$trim(_this.menuAddWin.formInfo.label)) {
                _this.$msgOpen(_this, "提示", "请输入菜单名称！", function(
                    val
                ) {
                    // console.log(val);
                });
                return;
            }
            if (!_this.$trim(_this.menuAddWin.formInfo.ncode)) {
                _this.$msgOpen(_this, "提示", "请输入唯一标识！", function(
                    val
                ) {
                    // console.log(val);
                });
                return;
            }
            if (_this.parentidarr.length > 0) {
                _this.menuAddWin.formInfo.parentId = parseInt(
                    _this.parentidarr[_this.parentidarr.length - 1]
                );
            }
            _this.menuAddWin.formInfo.level = _this.parentidarr.length + 1; 
            if(_this.menuAddWin.formInfo.type === '1' ){
                _this.menuAddWin.formInfo.perms = _this.elSeleValue.toString();
            }else{
                _this.menuAddWin.formInfo.perms = "";
            } 
            _this.addMenuLoad = true;
            ajax
                .post(
                    _this.global_.apiUrlJj + "/post/menu",
                    _this.menuAddWin.formInfo
                )
                .then(function(res) { 
                    _this.addMenuLoad = false;
                    if (res.data.isSuccess) {
                        _this.$message({
                            type: "success",
                            showClose: true,
                            message: "菜单添加成功!"
                        });
                        _this.cleanAddMenuForm();
                        _this.getMenuOptionsData();
                        _this.menuAddWin.isWinClose = false;
                    } else {
                        _this.$message({
                            type: "error",
                            showClose: true,
                            message: "菜单添加失败!"
                        });
                    }
                })
                .catch(function(error) {
                    _this.addMenuLoad = false;
                    _this.$message({
                        type: "error",
                        showClose: true,
                        message: "菜单添加失败!"
                    });
                });
        },
        getMenuOptionsData() {
            let _this = this;
            _this.getMenuoptionLoad = true;
            ajax
                .get(_this.global_.apiUrlJj + "/get/select-menu/")
                .then(function(res) { 
                    _this.getMenuoptionLoad = false;
                    if (res.data.isSuccess) {
                        _this.options = res.data.data; 
                    }
                })
                .catch(function(error) {
                    _this.getMenuoptionLoad = false;
                });
        },
        getMenuPermButData() {
            let _this = this; 
            ajax
                .get(_this.global_.apiUrlJj + "/get/status/",{
                    params:{
                        type:'permBut'
                    }
                })
                .then(function(res) { 
                    if (res.data.isSuccess) {
                        _this.elSeleOptions = [];
                        if(res.data.data){
                            res.data.data.forEach((ele,i)=>{
                                _this.elSeleOptions.push({
                                    label:ele.dictNumName,
                                    value:ele.id
                                });
                            });
                        } 
                    }
                })
                .catch(function(error) { 
                });
        }
    },
    beforeDestroy() {}
};
</script>
<style  >
.common-menumain-body {
    position: relative;
    width: 100%;
    /* height: calc(100% - 192px); */
}

/* 表单整体背景 */
.common-menumain-formbox {
    width: 100%;
    background-color: #fff;
}

.common-menumain-body .common-menumain-handlebox {
    width: 97.8% !important;
    height: 50px !important;
    line-height: 50px !important;
    padding-left: 10px !important;
    font-size: 12px !important;
    color: #5a5e66;
}

/* 查询按钮 */
.common-menumain-handlebox .button-info {
    display: inline-block;
    width: 73px;
    height: 29px;
    background-color: #2f95f4;
    color: #fff;
    border: 1px solid;
    border-radius: 4px;
    float: right;
    margin-top: 10px;
    line-height: 29px;
    margin-right: 5px;
}

.common-menumain-body .li-border-bottom {
    border-bottom: 1px solid #777;
}

.common-menumain-body .li-border-right {
    border-right: 1px solid #777;
}

.common-menumain-body .li-border-top {
    border-top: 1px solid #777;
}

.common-menumain-body .li-border-left {
    border-left: 1px solid #777;
}

/*  弹出窗口 */
.common-menumain-body .child-menumain-dialog {
    position: absolute;
    top: calc( 50% - 180px );
    right: calc(50% - 180px);
    width: 360px;
    height: auto;
    background-color: #fff;
    z-index: 222;
    border: 1px solid #95b8e7;
}
.common-menumain-body .child-menumain-dialog .car-header {
    cursor: move;
    width: auto;
    height: 40px;
    line-height: 40px;
    background: #2e92f6;
    border-radius: 6px 6px 0 0;
    padding: 0 16px;
    z-index: 222;
}

.common-menumain-body .child-menumain-dialog .row { 
    width: auto;
    height: auto;
    min-height: 30px;
    line-height: 30px;
    margin: 5px 10px;
    z-index: 222;
}
.common-menumain-body .child-menumain-dialog .menu-el-dialog-row-span {
    color: red;
}
.common-menumain-body .child-menumain-dialog .column-label {
    width: 30%;
    height: auto;
    min-height: 30px;
    line-height: 30px;
    float: left;
    text-align: right; 
}

.common-menumain-body .child-menumain-dialog .column-val {
    width: auto;
    height: auto;
    min-height: 30px;
    line-height: 30px;
    float: left; 
}

.common-menumain-body .child-menumain-dialog .car-hearder-desc {
    float: left;
    height: 40px;
    line-height: 40px;
    margin-left: 10px;
    font-size: 12px;
    color: #fff;
}

.common-menumain-body .child-menumain-dialog .car-hearder-close {
    float: right;
    cursor: default;
    text-align: right;
    width: 40px;
    height: 40px;
    line-height: 40px;
}

    /*input*/
.common-menumain-body .child-menumain-dialog .el-input__inner {
        /* background-color: #fff !important;
        border-radius: 4px !important;
        border: 1px solid #000 !important;
        height: 28px !important;
        overflow: auto !important;
        line-height: 28px !important;
        font-size: 12px;  */
    }
.common-menumain-body .child-menumain-dialog .el-input__icon {
        line-height:20px !important; 
    }
</style>
