<!--   
    name：TransferPanel部门结构穿梭框面板组件
    desc：实现调整部门结构，以及调用部门下属车辆穿梭框组件
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.9.19
-->
<template>
    <div class="child-transferpanel-body">
        <!-- background: #f5f5f5; -->
        <div class="child-transferpanel-mainL">
            <div style="width: 100%;text-align: center;height: 30px;line-height: 30px;">部门机构</div>
            <div class="subResult fix">
                <div class="subResultTop ">
                    <div class="tOperate">
                        <a ref="addDept" @click="onAddDept()" title="添加子部门"><i class="el-icon-plus"></i></a>
                        <a @click="onEditDept();" title="修改部门"><i class="el-icon-edit"></i></a>
                        <a @click="onRemoveDept()" title="删除部门"><i class="el-icon-close"></i></a>
                        <!-- add dialog -->
                        <el-dialog title="添加部门" :visible.sync="addDialog.addDeptDialogVisible" width="40%" center>
                            <div class="trans-el-dialog-row">
                                <div class="column"><span class="trans-el-dialog-row-span">*</span>上级部门：</div>
                                <!--  {{ checkedNode.label }} -->
                                <!--     {{addDialog.addDeptForm.organParentsId}} -->
                                <div class="column">
                                    <el-cascader placeholder="请选择部门" :options="deptData" :props="defaultProps" v-model="addDialog.addDeptForm.organParentsIdArr"
                                        size="mini" filterable change-on-select></el-cascader>
                                </div>
                            </div>
                            <div class="trans-el-dialog-row">
                                <div class="column"><span class="trans-el-dialog-row-span">*</span>部门名称：</div>
                                <div class="column">
                                    <input class="sys-common-input" type="text" placeholder="请输入部门名称" @keyup="addDialog.addDeptForm.organName=$trim(addDialog.addDeptForm.organName);" v-model="addDialog.addDeptForm.organName">
                                </div>
                            </div>
                            <div class="trans-el-dialog-row">
                                <div class="column">组织类型：</div>
                                <div class="column"><select class="sys-common-select" style="color: #606266; border: 1px solid #DCDFE6;" v-model="addDialog.addDeptForm.organType">
                                        <option value="0" selected>请选择</option>
                                        <option value="1">政府</option>
                                        <option value="2">企业</option>
                                    </select></div>
                            </div>
                            <div class="trans-el-dialog-row">
                                <div class="column"><span>&nbsp;</span>领导名称：</div>
                                <div class="column"><input class="sys-common-input" type="text" placeholder="请输入领导名称" @keyup="addDialog.addDeptForm.leaderName=$trim(addDialog.addDeptForm.leaderName);" v-model="addDialog.addDeptForm.leaderName"></div>
                            </div>
                            <div class="trans-el-dialog-row">
                                <div class="column"><span>&nbsp;</span>联系人：</div>
                                <div class="column">
                                    <input class="sys-common-input" type="text" placeholder="请输入联系人"
                                       @keyup="addDialog.addDeptForm.organContact=$trim(addDialog.addDeptForm.organContact);"  v-model="addDialog.addDeptForm.organContact"></div>
                            </div>
                            <div class="trans-el-dialog-row">
                                <div class="column"><span>&nbsp;</span>电话：</div>
                                <div class="column">
                                    <input class="sys-common-input" type="text" placeholder="请输入组织电话"
                                        @keyup="addDialog.addDeptForm.phone=$trim(addDialog.addDeptForm.phone);" v-model="addDialog.addDeptForm.phone">
                                </div>
                            </div>
                            <div class="trans-el-dialog-row">
                                <div class="column"><span>&nbsp;</span>备注：</div>
                                <div class="column"><textarea rows="3" cols="30" maxlength="100" placeholder="请输入备注"
                                        v-model="addDialog.addDeptForm.remark" style="color: #333;margin-top: 5px;
                                        border-radius: 4px;
                                        min-height: 40px;
                                        border: 1px solid #DCDFE6;
                                        margin-right: 12px;
                                        font-size: 12px;
                                        padding: 5px 10px; ">
                                </textarea></div>
                            </div>
                            <span slot="footer" class="dialog-footer">
                                <el-button size="mini" type="primary" @click="addDialog.addDeptDialogVisible = false">取 消</el-button>
                                <el-button size="mini" type="primary" @click="addDeptAction()">确 定</el-button>
                            </span>
                        </el-dialog>
                        <!-- exid dialog -->
                        <el-dialog title="修改部门" :visible.sync="editDialog.editDeptDialogVisible" width="40%" center>

                            <div class="trans-el-dialog-row">
                                <div class="column"><span class="trans-el-dialog-row-span">*</span>部门名称：</div>
                                <div class="column">
                                    <input class="sys-common-input" type="text" placeholder="请输入部门名称" 
                                     @keyup="editDialog.editDeptForm.organName=$trim(editDialog.editDeptForm.organName);"  v-model="editDialog.editDeptForm.organName"></div>
                            </div>
                            <div class="trans-el-dialog-row">
                                <div class="column">组织类型：</div>
                                <div class="column"><select class="sys-common-select" style="color: #606266;border: 1px solid #DCDFE6;" v-model="editDialog.editDeptForm.organType">
                                        <option value="0" >请选择</option>
                                        <option value="1">政府</option>
                                        <option value="2">企业</option>
                                    </select></div>
                            </div>
                            <div class="trans-el-dialog-row">
                                <div class="column"><span>&nbsp;</span>领导名称：</div>
                                <div class="column">
                                    <input class="sys-common-input" type="text" placeholder="请输入领导名称"
                                       @keyup="editDialog.editDeptForm.leaderName=$trim(editDialog.editDeptForm.leaderName);"   v-model="editDialog.editDeptForm.leaderName"></div>
                            </div>
                            <div class="trans-el-dialog-row">
                                <div class="column"><span>&nbsp;</span>联系人：</div>
                                <div class="column">
                                    <input class="sys-common-input" type="text" placeholder="请输入联系人"
                                       @keyup="editDialog.editDeptForm.organContact=$trim(editDialog.editDeptForm.organContact);"    v-model="editDialog.editDeptForm.organContact"></div>
                            </div>
                            <div class="trans-el-dialog-row">
                                <div class="column"><span>&nbsp;</span>电话：</div>
                                <div class="column">
                                    <input class="sys-common-input" type="text" placeholder="请输入组织电话"
                                        @keyup="editDialog.editDeptForm.phone=$trim(editDialog.editDeptForm.phone);" v-model="editDialog.editDeptForm.phone"></div>
                            </div>
                            <div class="trans-el-dialog-row">
                                <div class="column"><span>&nbsp;</span>备注：</div>
                                <div class="column"><textarea rows="3" cols="30" maxlength="10" placeholder="请输入备注"
                                        v-model="editDialog.editDeptForm.remark" style="color: #333;margin-top: 5px;
                                        border-radius: 4px;
                                        min-height: 40px;
                                        border: 1px solid #DCDFE6;
                                        margin-right: 12px;
                                        font-size: 12px;
                                        padding: 5px 10px; ">
                                </textarea></div>
                            </div>
                            <span slot="footer" class="dialog-footer">
                                <el-button size="mini" type="primary" @click="editDialog.editDeptDialogVisible = false">取 消</el-button>
                                <el-button size="mini" type="primary" @click="editDeptAction()">确 定</el-button>
                            </span>
                        </el-dialog>
                    </div>
                    <div class="comSearch ">
                        <input class="inp" type="text" placeholder="请输入部门" v-model="filterText">
                    </div>
                </div>
            </div>
            <div v-loading="deptLoad" style="width:100%;height:calc( 100% - 70px );border: 1px solid #e7e7e7;border-top:0;overflow-y:auto;">

                <el-tree ref="tree2" class="filter-tree" :data="deptData" :props="defaultProps" :expand-on-click-node="false"
                    :highlight-current="true" default-expand-all :filter-node-method="filterNode">
                    <div class="custom-tree-node" slot-scope="{ node, data }" style="width: 100%">
                        <div @click="() => setDeptData(node,data)" style="width: 100%">{{ node.label }}</div>
                    </div>
                </el-tree>
            </div>
        </div>
        <div style="float: left;box-sizing: content-box; width:65%;height:100%; border-radius: 3px;color: #444;">
            <transfer-box :deptId="checkedData.id"></transfer-box>
        </div>
    </div>
</template>
<script>
    import ajax from "axios";
    import transferBox from "@/components/child/jjbx/SysManage/UserManage/DepartmentManage/TransferBox.vue";
    export default {
        components: {
            transferBox
        },
        props: {
            optionParam: {
                type: Object
            }
        },
        data() {
            return {
                checkedNode: "", //选中节点
                checkedData: "", //选中data
                addDialog: {
                    addDeptDialogVisible: false, //添加部门dialog显示开关
                    addDeptForm: {
                        parentId: "", //父类ID
                        organName: "", //部门名称
                        organParentsId: "", //父类ID路径
                        organParentsIdArr: [], //父类ID路径
                        organType: "0", //组织类型（企业、政府）
                        leaderName: "", //领导名称
                        organContact: "", //联系人
                        organLogo: "", //组织logo
                        phone: "", //电话
                        remark: "" //备注
                    }
                },
                editDialog: {
                    editDeptDialogVisible: false, //修改部门dialog显示开关
                    editDeptForm: {
                        id: "",
                        parentId: "", //父类ID
                        organName: "", //部门名称
                        organParentsId: "", //父类ID路径
                        organParentsIdArr: [], //父类ID路径
                        organType: "0", //组织类型（企业、政府）
                        leaderName: "", //领导名称
                        organContact: "", //联系人
                        organLogo: "", //组织logo
                        phone: "", //电话
                        remark: "" //备注
                    }
                },
                filterText: "",
                deptLoad: false,
                deptData: [],
                /* deptData: [{
                    id: 1,
                    label: "恒通物流",
                    children: [{
                            id: 4,
                            label: "一点科技",
                            children: [{
                                    id: 9,
                                    label: "一点车队-1",
                                    children: []
                                },
                                {
                                    id: 10,
                                    label: "一点车队-2",
                                    children: []
                                }
                            ]
                        },
                        {
                            id: 2,
                            label: "通港物流",
                            children: [{
                                    id: 5,
                                    label: "通港车队-1",
                                    children: []
                                },
                                {
                                    id: 6,
                                    label: "通港车队-2",
                                    children: []
                                }
                            ]
                        },
                        {
                            id: 3,
                            label: "原油运输",
                            children: [{
                                    id: 7,
                                    label: "原油车队-1",
                                    children: []
                                },
                                {
                                    id: 8,
                                    label: "原油车队-2",
                                    children: []
                                }
                            ]
                        }
                    ]
                }], */
                defaultProps: {
                    children: "children",
                    value: "id"
                }
            };
        },
        computed: {},
        mounted() {
            let _this = this;
            _this.$nextTick(function () {
                _this.initExec();
            });
        },
        methods: {
            initExec() {
                let _this = this;
                //获取组织机构data

                _this.deptLoad = true;
                ajax
                    .get(_this.global_.apiUrlJj + "/get/select-organ", {
                        params: {
                            id: _this.appConfig.getUserInfo().organParentsId
                        }
                    })
                    .then(function (res) {
                        console.log(JSON.stringify(res));
                        _this.deptLoad = false;
                        if (res.data.isSuccess) {
                            _this.deptData = res.data.data;
                            // _this.$set(_this.deptData,0,res.data.data);
                        } else {
                            _this.$message({
                                type: "error",
                                message: "部门机构数据获取失败!"
                            });
                        }
                    })
                    .catch(function (error) {
                        _this.deptLoad = false;
                        _this.$message({
                            type: "error",
                            message: "部门机构数据获取失败!"
                        });
                    });
                //获取数据字典
                ajax
                    .get(_this.global_.apiUrlJj + "/get/status", {
                        params: {
                            type: "organ"
                        }
                    })
                    .then(function (res) {
                        // console.log(res);
                        if (res.data.isSuccess) {
                            //  _this.deptData = res.data.data;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            filterNode(value, data) { 
                if (!value) return true;
                return data.label.indexOf(value ) !== -1 || data.label.indexOf( value.toUpperCase()  ) !== -1 ||data.label.indexOf( value.toLowerCase()) !== -1;
            },
            //获取当前选中节点、数据包
            setDeptData(node, data) {
                // console.log(data);
                let _this = this;
                _this.checkedData = data;
                _this.checkedNode = node;
                /*  _this.addDialog.addDeptForm.parentId = data.id;
                 if (!data.id) {
                     _this.$msgOpen(_this, "提示", "请选择部门！", function (val) {
                         // console.log(val);
                     });
                     return;
                 } */
                //根据机构ID 获取编辑界面机构数据
                ajax
                    .get(_this.global_.apiUrlJj + "/get/select-organ-id", {
                        params: {
                            id: data.id
                        }
                    })
                    .then(function (res) {
                        console.log(res);
                        if (res.data.isSuccess) {
                            _this.editDialog.editDeptForm.id = parseInt(data.id); //父类ID
                            _this.editDialog.editDeptForm.parentId = parseInt(
                                res.data.data.parentId
                            ); //父类ID
                            _this.editDialog.editDeptForm.organParentsId = res.data.data.organParentsId; //部门id路径
                            if (res.data.data.organParentsId) {
                                res.data.data.organParentsId.split(',').forEach(ele => {
                                    _this.editDialog.editDeptForm.organParentsIdArr.push(ele);
                                });
                            }
                            _this.editDialog.editDeptForm.organName = res.data.data.organName; //部门名称
                            _this.editDialog.editDeptForm.organType = res.data.data.organType; //组织类型（企业、政府）
                            _this.editDialog.editDeptForm.leaderName = res.data.data.leaderName; //领导名称
                            _this.editDialog.editDeptForm.organContact =
                                res.data.data.organContact; //联系人
                            _this.editDialog.editDeptForm.organLogo = res.data.data.organLogo; //组织logo
                            _this.editDialog.editDeptForm.phone = res.data.data.phone; //电话
                            _this.editDialog.editDeptForm.remark = res.data.data.remark; //备注
                        }
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            },
            //删除部门
            onRemoveDept() {
                let _this = this;
                if (!_this.checkedData) {
                    _this.$msgOpen(_this, "提示", "请选择部门！", function (val) {
                        // console.log(val);
                    });
                    return;
                } else {
                    if (_this.checkedNode.parent === null) {
                        _this.$msgOpen(_this, "提示", "请选择部门名称！", function (val) {
                            // console.log(val);
                        });
                        return;
                    }
                }
                _this
                    .$confirm("此操作将永久删除该部门, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                        center: true
                    })
                    .then(() => {
                        //删除 部门组织
                        ajax
                            .get(_this.global_.apiUrlJj + "/get/delete-organ", {
                                params: {
                                    id: _this.checkedData.id
                                }
                            })
                            .then(function (res) {
                                // console.log(res);
                                if (res.data.isSuccess) {
                                    //从节点上删除改机构
                                    const parent = _this.checkedNode.parent;
                                    const children = parent.data.children || parent.data;
                                    const index = children.findIndex(
                                        d => d.id === _this.checkedData.id
                                    );
                                    children.splice(index, 1);
                                    _this.checkedData = "";
                                    _this.$message({
                                        type: "success",
                                        message: "部门机构删除成功!"
                                    });
                                } else {
                                    _this.$message({
                                        type: "error",
                                        message: "部门机构删除失败!"
                                    });
                                }
                            })
                            .catch(function (error) {
                                // console.log(error);
                                _this.$message({
                                    type: "error",
                                    message: "部门机构删除失败!"
                                });
                            });
                    })
                    .catch(() => {
                        _this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            //添加部门
            onAddDept() {
                let _this = this;
                _this.addDialog.addDeptDialogVisible = true;
                /*  if (_this.checkedData) {
                     _this.addDialog.addDeptDialogVisible = true;
                 } else {
                     _this.$msgOpen(_this, "提示", "请选择部门！", function (val) {
                         // console.log(val);
                     });
                 } */
            },
            //添加部门action
            addDeptAction() {
                let _this = this;
                if (_this.addDialog.addDeptForm.organParentsIdArr.length == 0) {
                    _this.$msgOpen(_this, "提示", "请选择上级部门！", function (val) {
                        // console.log(val);
                    });
                    return;
                } 
                if (_this.$trim(_this.addDialog.addDeptForm.organName) == "") {
                    _this.$msgOpen(_this, "提示", "请输入部门名称！", function (val) {
                        // console.log(val);
                    });
                    return;
                }
                if(_this.addDialog.addDeptForm.phone){
                    if(!_this.$checkPhone(_this.addDialog.addDeptForm.phone)){
                        _this.$msgOpen(_this, "提示", "请正确输入手机号", function (val) {
                            // console.log(val);
                        });
                        return;
                    }
                }
                _this.addDialog.addDeptForm.parentId = _this.addDialog.addDeptForm.organParentsIdArr[_this.addDialog.addDeptForm
                    .organParentsIdArr.length - 1];
                _this.addDialog.addDeptForm.organParentsId = _this.addDialog.addDeptForm.organParentsIdArr.toString();
                console.log(JSON.stringify(_this.addDialog));
                // return;
                //添加部门
                ajax
                    .post(
                        _this.global_.apiUrlJj + "/post/save-Organ",
                        _this.addDialog.addDeptForm
                    )
                    .then(function (res) {
                        // console.log(res);
                        if (res.data.isSuccess) {
                            let newNodeId = res.data.data.id;
                            const newChild = {
                                id: newNodeId,
                                label: _this.addDialog.addDeptForm.organName,
                                children: []
                            };
                            /*  if (!_this.checkedData.children) {
                                 _this.$set(_this.checkedData, "children", []);
                             } 
                             _this.checkedData.children.push(newChild);*/
                            _this.initExec();
                            _this.addDialog.addDeptForm.parentId = "";
                            _this.addDialog.addDeptForm.organName = "";
                            _this.addDialog.addDeptForm.organParentsId = "";
                            _this.addDialog.addDeptForm.organParentsIdArr = [];
                            _this.addDialog.addDeptForm.organType = "0";
                            _this.addDialog.addDeptForm.leaderName = "";
                            _this.addDialog.addDeptForm.organContact = "";
                            _this.addDialog.addDeptForm.organLogo = "";
                            _this.addDialog.addDeptForm.phone = "";
                            _this.addDialog.addDeptForm.remark = "";

                            _this.addDialog.addDeptDialogVisible = false;
                            _this.$message({
                                type: "success",
                                message: "部门机构添加成功!"
                            });
                        } else {
                            _this.$message({
                                type: "error",
                                message: "部门机构添加失败!"
                            });
                        }
                    })
                    .catch(function (error) {
                        _this.$message({
                            type: "error",
                            message: "部门机构添加失败!"
                        });
                    });
            },
            //修改部门
            onEditDept() {
                let _this = this;
                if (_this.checkedData) {
                    _this.editDialog.editDeptDialogVisible = true;
                } else {
                    _this.$msgOpen(_this, "提示", "请选择部门！", function (val) {
                        // console.log(val);
                    });
                }
            },
            //修改部门action
            editDeptAction() {
                let _this = this;
                if (_this.editDialog.editDeptForm.organParentsId.length == 0) {
                    _this.$msgOpen(_this, "提示", "请选择父级机构！", function (val) {
                        // console.log(val);
                    });
                    return;
                }
                if (_this.$trim(_this.editDialog.editDeptForm.organName) == "") {
                    _this.$msgOpen(_this, "提示", "请输入部门名称！", function (val) {
                        // console.log(val);
                    });
                    return;
                } 
                if(_this.editDialog.editDeptForm.phone){
                    if(!_this.$checkPhone(_this.editDialog.editDeptForm.phone)){
                        _this.$msgOpen(_this, "提示", "请正确输入手机号", function (val) {
                            // console.log(val);
                        });
                        return;
                    }
                } 
                //修改部门 _this.editDialog.editDeptForm.parentId
                ajax
                    .post(
                        _this.global_.apiUrlJj +
                        "/post/update-organ?id=" +
                        _this.editDialog.editDeptForm.id,
                        _this.editDialog.editDeptForm
                    )
                    .then(function (res) {
                        // console.log(res);
                        if (res.data.isSuccess) {
                            _this.checkedData.label = _this.editDialog.editDeptForm.organName;
                            _this.editDialog.editDeptDialogVisible = false;
                            _this.$message({
                                type: "success",
                                message: "部门机构修改成功!"
                            });
                        } else {
                            _this.$message({
                                type: "error",
                                message: "部门机构修改失败!"
                            });
                        }
                    })
                    .catch(function (error) {
                        _this.$message({
                            type: "error",
                            message: "部门机构修改失败!"
                        });
                    });
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        beforeDestroy() {}
    };

</script>
<style>
    .child-transferpanel-body {
        position: relative;
        width: 100%;
        min-width: 800px;
        height: 100%;
        background: #f8f8f8;
    }

    .child-transferpanel-body .child-transferpanel-mainL {
        float: left;
        width: 33%;
        height: 100%;
        margin-left: 10px;
        background: #f5f5f5;
        /* border-radius: 3px; */
        color: #444;
    }

    .child-transferpanel-mainL .subResult {
        position: relative;
        /* border-radius: 3px; */
        width: 100%;
        border: 1px solid #e7e7e7;
    }

    .subResult .subResultTop {
        height: 32px;
        /* border-radius: 3px 3px 0 0;
        border-bottom: 1px solid #dddddd; */
        background: #ffffff;
    }

    .subResult .fix {
        content: ".";
        display: block;
        clear: both;
        visibility: hidden;
        height: 0px;
    }

    .subResult .tOperate {
        float: left;
    }

    .tOperate i {
        display: block;
        width: 15px;
        height: 15px;
        cursor: pointer;
    }

    .tOperate a {
        display: inline-block;
        border-radius: 3px;
        padding: 3px;
        margin: 6px 0 0 5px;
    }

    .tOperate a:hover {
        background: #fff;
        box-shadow: 0 0 3px #adadad;
    }

    .subResultTop .comSearch {
        float: right;
        margin: 2px 5px 0 0;
        height: 25px;
        border-radius: 3px;
        border: 1px solid #e4e4e4;
        background-color: #ffffff;
    }

    .comSearch .inp {
        float: left;
        width: 110px;
        height: 25px;
        line-height: 25px;
        padding-left: 3px;
        color: #c0c0c0;
        outline: none;
        border: 0;
        background: none;
        font-family: Microsoft YaHei;
    }

    .comSearch .botOver {
        /*  float: right;
        width: 15px;
        height: 15px;  
        cursor: pointer;
        margin: 5px 5px 0 0;
         overflow: hidden;
        outline: none;
        border: 0;
        background: none;
        font-family: Microsoft YaHei; */
    }

    .comSearch .bot {
        /*  float: right;
        width: 15px;
        height: 15px;  
        cursor: pointer;
        margin: 5px 5px 0 0;
         overflow: hidden;
        outline: none;
        border: 0;
        background: none;
        font-family: Microsoft YaHei; */
    }

    .trans-el-dialog-row {
        width: 100%;
        height: 40px;
        line-height: 40px;
    }

    .trans-el-dialog-row .column {
        width: auto;
        min-width: 80px;
        float: left;
        height: 40px;
        line-height: 40px;
    }

    .trans-el-dialog-row-span {
        color: red;
    }

    .child-transferpanel-body .el-input--mini .el-input__icon {
        line-height: 28px !important;
        height: 28px !important;
    }

    .child-transferpanel-body .el-icon-arrow-down:before {
        content: "\E603";
        line-height: 28px !important;
        display: block !important;
        width: 15px !important;
        height: 15px !important;
    }

    .child-transferpanel-body input::-webkit-input-placeholder,.child-transferpanel-body textarea::-webkit-input-placeholder {
        /* placeholder颜色  */
        color: #606266;
    } 
    .child-transferpanel-body .el-tree--highlight-current .el-tree-node.is-current> .el-tree-node__content{
        background-color: #2e92f6 !important;
        color: #fff;
    }
</style>
