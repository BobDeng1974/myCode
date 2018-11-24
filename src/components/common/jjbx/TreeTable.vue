<!--    
    name：treetable组件
    desc：
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.11.13
-->
<template>
    <div class="common-treetable-body">
        <div v-show="menuWin.isWinClose" id="treeDrag" :style="{border:menuWin.dragBorder,borderRadius:menuWin.dragBorderRad}"
            class="child-carsposi-dialog">
            <!-- 车牌号 -->
            <div @mousedown="onDragStart" @mouseup="onDragClose" class="car-header">
                <div class="car-hearder-desc">
                    修改菜单
                </div>
                <div class="car-hearder-close">
                    <i @click="menuWin.isWinClose=!menuWin.isWinClose" class="el-icon-close" style="color: #fff;"></i>
                </div>
            </div>
            <div class="row">
                <div class="column-label">
                    <span class="menu-el-dialog-row-span">*</span>菜单类型：</div>
                <div class="column-val">
                    <el-radio v-model="menuWin.formInfo.type" label="0">菜单目录</el-radio>
                    <el-radio v-model="menuWin.formInfo.type" label="1">页面</el-radio>
                </div>
            </div>
            <div class="row">
                <div class="column-label">上级菜单：</div>
                <div class="column-val">
                    <el-cascader :options="options" v-model="parentidarr" :props="props" change-on-select clearable
                        :show-all-levels="false" size="mini"></el-cascader>
                </div>
            </div>
            <div class="row">
                <div class="column-label">
                    <span class="menu-el-dialog-row-span">*</span>名称：</div>
                <div class="column-val">
                    <input type="text" placeholder="请输入菜单名称" class="sys-common-input" v-model="menuWin.formInfo.label">
                </div>
            </div>
            <div v-show="menuWin.formInfo.type==='1'" class="row">
                <div class="column-label">权限点：</div>
                <div class="column-val">
                    <el-select v-model="menuWin.formInfo.perms" multiple placeholder="请选择">
                        <el-option v-for="item in elSeleOption" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="clear: both;"></div>
            </div>
            <div class="row">
                <div class="column-label">
                    <span class="menu-el-dialog-row-span">*</span>唯一标识：</div>
                <div class="column-val">
                    <input type="text" placeholder="请输入内码" class="sys-common-input" v-model="menuWin.formInfo.ncode">
                </div>
            </div>
            <div class="row">
                <div class="column-label">排序：</div>
                <div class="column-val">
                    <input type="text" placeholder="请输入内码" class="sys-common-input" v-model="menuWin.formInfo.orderNum">
                </div>
            </div>
            <div class="row" style="height:60px;">
                <div class="column-label">备注：</div>
                <div class="column-val">
                    <el-input type="textarea" style="font-size:12px;" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注信息"
                        v-model="menuWin.formInfo.remark">
                    </el-input>
                </div>
            </div>
            <div style="clear: both;"></div>
            <div class="row" style="text-align: center;">
                <el-button type="primary" size="mini" @click="menuWin.isWinClose=false">取消</el-button>
                <el-button type="primary" size="mini" @click="onUpmenuClick">确定</el-button>
            </div>
        </div> 
        <div class="treetable-body" v-loading="menuUpLoading">
            <div class="treetable-row" :style="{width:(1282 + elSeleOptions.length*60)+'px'}">
                <div class="li-border-top li-border-bottom li-border-left li-border-right treetable-header-column "
                    style="min-width: 250px;">
                    菜单名称
                </div>
                <div class="li-border-top li-border-bottom li-border-right treetable-header-column " style="min-width: 100px;">
                    菜单类型
                </div>
                <div class="li-border-top li-border-bottom li-border-right treetable-header-column " style="min-width: 200px;">
                    唯一标示
                </div>
                <div class="li-border-top li-border-bottom li-border-right treetable-header-column  " :style="{width:(elSeleOptions.length*60)+'px'}">
                    权限点
                </div>
                <div class="li-border-top li-border-bottom li-border-right treetable-header-column " style="min-width: 350px;">
                    使用说明
                </div>
                <div class="li-border-top li-border-bottom li-border-right treetable-header-column  " style="min-width: 150px;">
                    操作
                </div>
            </div>
            <div v-show="isTreeRowShow(key)" v-for="(item,key,index) in treeData" :key="index" class="treetable-row2"
                :style="{width:(1282 + elSeleOptions.length*60)+'px'}" @dblclick="getUpMenuFrom(key)">
                <div @click="onTreeIsshowClick(key)" class="li-border-bottom li-border-left li-border-right  treetable-column "
                    style="min-width: 250px;">
                    <span :style="{'margin-left':((item.level-1)*( item.type==0?20:25 )) +'px'}">
                        <i v-show="item.type==0" :class="item._isClick?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
                        {{ item.label }}
                    </span>
                </div>
                <div class="li-border-bottom li-border-right  treetable-column " style="min-width: 100px;">
                    {{item.type==0?'目录':'页面'}}
                </div>
                <div class="li-border-bottom li-border-right  treetable-column " style="min-width: 200px;">
                    {{ item.ncode }}
                </div>
                <div class="li-border-bottom li-border-right  treetable-column " :style="{width:(elSeleOptions.length*60)+'px'}">
                    <el-checkbox-group v-if="item.type==1" v-model="treeData[key].perms" @change="onMenupermClick(key)"
                        size="mini">
                        <el-checkbox-button v-for="perm in elSeleOptions" :label="perm.value" :disabled="perm.value === 1"
                            :key="perm.value">
                            {{perm.label}}
                        </el-checkbox-button>
                    </el-checkbox-group>
                </div>
                <div class="li-border-bottom li-border-right  treetable-column " style="min-width: 350px;">
                    {{ item.remark }}
                </div>
                <div class="li-border-bottom li-border-right  treetable-column " style="min-width: 150px;">
                    <el-button type="text" size="mini" @click="getUpMenuFrom(key)">修改</el-button>
                    <el-button type="text" size="mini" @click="onDeleMenuClick(key)">删除</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ajax from "axios";
    export default {
        components: {},
        props: {
            // 数据源
            dataSource: {
                type: Array,
                default: () => []
            },
            elSeleOptions: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                menuUpLoading: false,
                elSeleOption: [],
                menuData: [{
                        parentId: 0,
                        label: "管理驾驶舱",
                        ncode: "sys_cockpit",
                        level: 1,
                        type: 0,
                        orderNum: 0,
                        isShow: "1",
                        remark: "管理驾驶舱-目录"
                    },
                    {
                        parentId: 0,
                        label: "监控中心",
                        ncode: "sys_monitor",
                        level: 1,
                        type: 0,
                        orderNum: 0,
                        isShow: "1",
                        remark: "监控中心-目录"
                    }
                ],
                treeData: [],
                _options: [],
                options: [{
                    value: "zhinan",
                    label: "指南",
                    children: [{
                        value: "shejiyuanze",
                        label: "设计原则"
                    }]
                }],
                props: {
                    value: "id"
                },
                parentidarr: [],
                //弹窗
                menuWin: {
                    //拖拽改变样式
                    dragBorder: "0",
                    dragBorderRad: "6px",
                    //窗口显示
                    isWinClose: false,
                    formInfo: {
                        id: 1,
                        parentId: 0,
                        label: "系统管理",
                        ncode: "a_01",
                        level: 0,
                        type: "0", //D:目录，P:页面
                        remark: "这是一个treetable",
                        orderNum: 0,
                        perms: [],
                        isShow: "1"
                    }
                }
            };
        },
        computed: {
            isTreeRowShow(key) {
                return function (key) {
                    let _this = this;
                    let isShow = false;
                    if (_this.treeData[key].isShow === "1") {
                        if (key - 1 >= 0) {
                            _this.treeData.forEach((ele, i) => {
                                if (
                                    ele.id === _this.treeData[key].parentId ||
                                    _this.treeData[key].level === 1
                                ) {
                                    isShow = ele._isClick;
                                }
                            });
                        } else {
                            isShow = true;
                        }
                    }
                    return isShow;
                };
            }
        },
        mounted() {},
        methods: {
            onTreeIsshowClick(key) {
                let _this = this;
                if (key == _this.treeData.length - 1) return;
                _this.treeData[key]._isClick = !_this.treeData[key]._isClick;
                let initExec = function (parentId, parentIshow) {
                    _this.treeData.forEach((ele, i) => {
                        if (ele.parentId === parentId) {
                            ele.isShow = parentIshow ? "1" : "0";
                            initExec(ele.id, parentIshow);
                        }
                    });
                };
                initExec(_this.treeData[key].id, _this.treeData[key]._isClick);
            },
            treeDataFormat() {
                let _this = this;
                let arr = [];
                let initExec = function (obj) {
                    obj.forEach((ele, i) => {
                        let option = {
                            id: ele.id,
                            parentId: ele.parentId,
                            label: ele.label,
                            ncode: ele.ncode,
                            level: ele.level,
                            type: ele.type,
                            remark: ele.remark,
                            orderNum: ele.orderNum,
                            isShow: ele.isShow,
                            perms: ele.perms === undefined ? [] : ele.perms.split(",").map(Number),
                            _isClick: true
                        };
                        arr.push(option);
                        if (ele.children) {
                            initExec(ele.children);
                        }
                    });
                };
                initExec(_this.treeData);
                _this.treeData = arr;
            },
            getUpMenuFrom(index) {
                let _this = this;
                _this.menuWin.isWinClose = true;
                _this.menuWin.formInfo =  _this.treeData[index];
                _this.menuWin.formInfo.type = _this.menuWin.formInfo.type + "";
                _this.parentidarr = [];
                let getAllParentType = function (arr, pId) {
                    arr.forEach((ele, i) => {
                        if (ele.id == pId) {
                            _this.parentidarr.unshift(ele.id);
                            getAllParentType(arr, ele.parentId);
                        }
                    });
                };
                getAllParentType(_this.treeData, _this.menuWin.formInfo.parentId);
                let setOptionFun = function (arr, seleId) {
                    arr.forEach((ele, i) => {
                        if (ele.id == seleId || ele.type == 1) {
                            ele.disabled = true;
                        } else {
                            ele.disabled = false;
                        }
                        if (ele.children) {
                            setOptionFun(ele.children, seleId);
                        }
                    });
                };
                setOptionFun(_this.options, _this.menuWin.formInfo.id);
            },
            onMenupermClick(key) {
                let _this = this;
                console.log(JSON.stringify(_this.treeData[key]));
                if (!key) return;
                _this.menuUpLoading = true;
                ajax
                    .post(
                        _this.global_.apiUrlJj +
                        "/post/update-menu", {
                            id: _this.treeData[key].id,
                            perms: _this.treeData[key].perms.toString()
                        }
                    )
                    .then(function (res) {
                        if (res.data.isSuccess) {
                            _this.$message({
                                type: "success",
                                showClose: true,
                                message: _this.treeData[key].type == 1 ? '目录' : '页面' + _this.treeData[key].label +
                                    "[权限点]更新成功!"
                            });
                            _this.menuUpLoading = false;
                        } else {
                            _this.$message({
                                type: "error",
                                showClose: true,
                                message: _this.treeData[key].type == 1 ? '目录' : '页面' + _this.treeData[key].label +
                                    "[权限点]更新失败!"
                            });
                        }
                    })
                    .catch(function (error) {
                        _this.menuUpLoading = false;
                        _this.$message({
                            type: "error",
                            showClose: true,
                            message: _this.treeData[key].type == 1 ? '目录' : '页面' + _this.treeData[key].label +
                                "[权限点]更新失败!"
                        });
                    });
            },
            onUpmenuClick() {
                let _this = this;
                if (!_this.$trim(_this.menuWin.formInfo.label)) {
                    _this.$msgOpen(_this, "提示", "请输入菜单名称！", function (
                        val
                    ) {
                        // console.log(val);
                    });
                    return;
                }
                if (!_this.$trim(_this.menuWin.formInfo.ncode)) {
                    _this.$msgOpen(_this, "提示", "请输入唯一标识！", function (
                        val
                    ) {
                        // console.log(val);
                    });
                    return;
                }
                if (_this.parentidarr.length > 0) {
                    _this.menuWin.formInfo.level = _this.parentidarr.length + 1;
                    _this.menuWin.formInfo.parentId =
                        _this.parentidarr[_this.parentidarr.length - 1];
                } else {
                    _this.menuWin.formInfo.level = 1;
                    _this.menuWin.formInfo.parentId = 0;
                }
                let param = JSON.parse(JSON.stringify(_this.menuWin.formInfo));
                param.perms = param.perms.toString();
                ajax
                    .post(
                        _this.global_.apiUrlJj +
                        "/post/update-menu?id=" +
                        _this.menuWin.formInfo.id,
                        param
                    )
                    .then(function (res) {
                        if (res.data.isSuccess) {
                            _this.$message({
                                type: "success",
                                showClose: true,
                                message: "菜单修改成功!"
                            });

                            _this.menuWin.isWinClose = false;
                            _this.$emit("upTreetable", "1");
                        } else {
                            _this.$message({
                                type: "error",
                                showClose: true,
                                message: "菜单修改失败!"
                            });
                        }
                    })
                    .catch(function (error) {
                        _this.$message({
                            type: "error",
                            showClose: true,
                            message: "菜单修改失败!"
                        });
                    });
            },
            onDeleMenuClick(key) {
                let _this = this;
                _this
                    .$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        ajax
                            .delete(
                                _this.global_.apiUrlJj +
                                "/del/delete-menu?id=" +
                                _this.treeData[key].id
                            )
                            .then(function (res) {
                                console.log(res);
                                if (res.data.isSuccess) {
                                    _this.$message({
                                        type: "success",
                                        showClose: true,
                                        message: "菜单删除成功!"
                                    });
                                    _this.$emit("upTreetable", "1");
                                } else {
                                    _this.$message({
                                        type: "error",
                                        showClose: true,
                                        message: "菜单删除失败!"
                                    });
                                }
                            });
                    })
                    .catch(() => {
                        _this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            onDragStart(e) {
                this.menuWin.dragBorder = "1px dashed #95B8E7";
                this.menuWin.dragBorderRad = "0";
                var divx = e.clientX - document.getElementById("treeDrag").offsetLeft;
                var divy = e.clientY - document.getElementById("treeDrag").offsetTop;
                document.onmousemove = function (e) {
                    var l = e.clientX - divx;
                    var t = e.clientY - divy;
                    document.getElementById("treeDrag").style.left = l + "px";
                    document.getElementById("treeDrag").style.top = t + "px";
                };
                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            },
            onDragClose() {
                this.menuWin.dragBorder = "0";
                this.menuWin.dragBorderRad = "6px";
            }
        },
        watch: {
            dataSource: {
                immediate: true,
                handler: function (newVal, oldVal) {
                    let _this = this;
                    if (newVal != undefined) {
                        _this.treeData = JSON.parse(JSON.stringify(newVal)) ;
                        _this._options = JSON.parse(JSON.stringify(newVal));
                        _this.options = JSON.parse(JSON.stringify(newVal));
                        _this.treeDataFormat();
                    } else {
                        _this.treeData = [];
                    }
                },
                deep: true
            },
            elSeleOptions: {
                immediate: true,
                handler: function (newVal, oldVal) {
                    let _this = this;
                    if (newVal != undefined) {
                        _this.elSeleOption = JSON.parse(JSON.stringify(newVal));
                    } else {
                        _this.elSeleOption = [];
                    }
                },
                deep: true
            }
        },
        beforeDestroy() {}
    };

</script>
<style scoped>
    .common-treetable-body {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .common-treetable-body .treetable-body {
        width: auto;
        min-width: 1200px;
        height: 100%;
        overflow: auto;
        margin: 0 10px;
    }

    .common-treetable-body .treetable-row {
        width: 1400px;
        height: 30px;
    }

    .common-treetable-body .treetable-row2 {
        width: 1400px;
        height: 40px;
        background: #fff;
        position: relative;
        cursor: pointer;
    }

    .common-treetable-body .treetable-row2:hover {
        background: #f6faff;
    }

    .common-treetable-body .column-width-10 {
        width: 10%;
    }

    .common-treetable-body .column-width-15 {
        width: 15%;
    }

    .common-treetable-body .column-width-20 {
        width: 20%;
    }

    .common-treetable-body .column-width-25 {
        width: 25%;
    }

    .common-treetable-body .column-width-30 {
        width: 30%;
    }

    .common-treetable-body .column-width-40 {
        width: 40%;
    }

    .common-treetable-body .treetable-column {
        height: 29px;
        padding: 5px 10px;
        line-height: 30px;
        float: left;
        list-style: none;
    }

    .common-treetable-body .treetable-header-column {
        background: rgb(238, 245, 251);
        height: 18px;
        padding: 5px 10px;
        line-height: 19px;
        float: left;
        list-style: none;
        font-size: 14px;
        font-weight: bold;
    }

    .common-treetable-body .li-border-bottom {
        border-bottom: 1px solid #ebeef5;
    }

    .common-treetable-body .li-border-right {
        border-right: 1px solid #ebeef5;
    }

    .common-treetable-body .li-border-top {
        border-top: 1px solid #ebeef5;
    }

    .common-treetable-body .li-border-left {
        border-left: 1px solid #ebeef5;
    }

    /* 弹出窗口 */
    .child-carsposi-dialog {
        position: absolute;
        top: calc(50% - 220px) ;
        right: calc(50% - 180px);
        width: 360px;
        height: auto;
        background-color: #fff;
        z-index: 222;
    }

    .child-carsposi-dialog .menu-el-dialog-row-span {
        color: red;
    }

    .child-carsposi-dialog .car-header {
        cursor: move;
        width: auto;
        height: 40px;
        line-height: 40px;
        background: #2e92f6;
        border-radius: 6px 6px 0 0;
        padding: 0 16px;
        z-index: 222;
    }

    .child-carsposi-dialog .row {
        width: auto;
        height: 30px;
        line-height: 30px;
        margin: 5px 10px;
        z-index: 222;
    }

    .child-carsposi-dialog .column-label {
        width: 30%;
        height: 30px;
        line-height: 30px;
        float: left;
        text-align: right;
    }

    .child-carsposi-dialog .column-val {
        width: auto;
        height: 30px;
        line-height: 30px;
        float: left;
    }

    .car-hearder-desc {
        float: left;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
        font-size: 12px;
        color: #fff;
    }

    .car-hearder-close {
        float: right;
        cursor: default;
        text-align: right;
        width: 40px;
        height: 40px;
        line-height: 40px;
    }

</style>
