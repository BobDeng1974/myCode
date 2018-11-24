<!--   
    name：部门下属车辆穿梭框组件
    desc：部门下属车辆穿梭框组件,根据transferPanel传入的部门id，获取或设置下属车辆
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.9.20
-->
<template>
    <div class="child-transferbox-body">
        <div class="child-transferbox-mainL">
            <div class="dept-title">已分配</div>
            <div class="subResult fix">
                <div class="subResultTop ">
                    <div class="comSearch ">
                        <input class="inp" type="text" placeholder="请输入车辆" v-model="filterTextL">
                    </div>
                </div>
            </div>
            <div v-loading="deptLoad" style="width:100%;height:calc( 100% - 70px );border: 1px solid #e7e7e7;border-top:0;overflow-y:auto;">
                <el-tree ref="deptTree" class="filter-tree" :data="deptData" :props="defaultProps" node-key="id"
                    :expand-on-click-node="false" default-expand-all :render-content="renderContent" :highlight-current="true"
                    :filter-node-method="filterNode">
                </el-tree>
            </div>
            <!-- <el-tree ref="tree2" class="filter-tree" :data="deptData" :props="defaultProps" :expand-on-click-node="false"
            :highlight-current="true" default-expand-all :filter-node-method="filterNode">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span @click="() => setDeptData(node,data)">{{ node.label }}</span>
            </span>
        </el-tree> -->
        </div>
        <div class="child-transferbox-mainC">
            <div class="aOperate">
                <a class="buttonCom addBtn" id="turnToSel" @click="appendDeptTree();" title="添加到分组">
                    <i class="el-icon-d-arrow-left" style="margin-top: 5px;color:#fff;"></i>
                </a>
                <a class="buttonCom cancleBtn" id="turnToNotSel" @click="removeDeptTree();" title="撤出分组">
                    <i class="el-icon-d-arrow-right" style="margin-top: 5px;color:#fff;"></i>
                </a>
            </div>
        </div>
        <div class="child-transferbox-mainR">
            <div class="dept-title">未分配</div>
            <div class="subResult fix">
                <div class="subResultTop ">
                    <div class="comSearch ">
                        <input class="inp" type="text" placeholder="请输入车辆" v-model="filterTextR">
                    </div>
                </div>
            </div>

            <div v-loading="carLoad" style="width:100%;height:calc( 100% - 70px );border: 1px solid #e7e7e7;border-top:0;overflow-y:auto;">
                <el-tree ref="carTree" class="filter-tree" :data="carData" :props="defaultProps" node-key="id"
                    show-checkbox   default-expand-all :highlight-current="true"
                    :filter-node-method="filterNode">
                </el-tree>
            </div>
        </div>
    </div>
</template>
<script>
    import ajax from "axios";
    export default {
        components: {},
        props: {
            deptId: {
                type: Number
            }
        },
        data() {
            return {
                filterTextL: "",
                filterTextR: "",
                removeCarsArrR: [],
                deptLoad:false,
                carLoad:false,
                deptData: [
                    /* {
                                        id: 1,
                                        equipmentId: "0",
                                        isCar: false,
                                        label: '1恒通物流股份有限公司',
                                        children: [{
                                            id: 2,
                                            equipmentId: "0",
                                            isCar: false,
                                            label: '2LPG车队1',
                                            children: [{
                                                    id: 3,
                                                    equipmentId: "1,2",
                                                    isCar: true,
                                                    label: '3鲁F 11111'
                                                },
                                                {
                                                    id: 4,
                                                    equipmentId: "1,2,3,4,5,6,7",
                                                    isCar: true,
                                                    label: '4鲁F 22222'
                                                }
                                            ]
                                        }, {
                                            id: 5,
                                            equipmentId: "0",
                                            isCar: false,
                                            label: '5LPG车队2',
                                            children: [{
                                                    id: 6,
                                                    equipmentId: "0",
                                                    isCar: true,
                                                    label: '6鲁F 6666'
                                                },
                                                {
                                                    id: 7,
                                                    equipmentId: "0",
                                                    isCar: true,
                                                    label: '7鲁F 77777'
                                                },
                                                {
                                                    id: 8,
                                                    equipmentId: "0",
                                                    isCar: true,
                                                    label: '8鲁F 88888'
                                                }
                                            ]
                                        }]
                                    } */
                ],
                carData: [
                    /* {
                                            id: 11,
                                            equipmentId: "0",
                                            isCar: true,
                                            label: '鲁A 11'
                                        },
                                        {
                                            id: 12,
                                            equipmentId: "0",
                                            isCar: true,
                                            label: '鲁A 12'
                                        },
                                        {
                                            id: 13,
                                            equipmentId: "1,2",
                                            isCar: true,
                                            label: '鲁A 13'
                                        },
                                        {
                                            id: 14,
                                            equipmentId: "1,2,3,4,5,6,7",
                                            isCar: true,
                                            label: '鲁A 14'
                                        } */

                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        computed: {},
        mounted() {
            let _this = this;
            _this.$nextTick(function () {
                _this.getCarTreeData();
            });
        },
        methods: {
            getCarTreeData() {
                let _this = this;
                _this.carLoad = true;
                ajax.get(_this.global_.apiUrlJj + "/get/select-no-organ?id=1")
                    .then(function (res) {
                        // console.log(JSON.stringify(res));
                        _this.carLoad = false;
                        if (res.data.isSuccess) {
                            _this.carData = res.data.data;
                        }
                    })
                    .catch(function (error) {
                        _this.carLoad = false;
                        console.log(error);
                    });
            },
            initExec(deptId) {
                let _this = this;
                _this.deptLoad = true;
                ajax.get(_this.global_.apiUrlJj + "/get/select-all-organ", {
                        params: {
                            id: deptId
                        }
                    })
                    .then(function (res) {
                        _this.deptLoad = false;
                        console.log(res);
                        if (res.data.isSuccess) {
                            _this.deptData = res.data.data;
                        }
                    })
                    .catch(function (error) {
                        _this.deptLoad = true;
                        console.log(error);
                    });
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value ) !== -1 || data.label.indexOf( value.toUpperCase()  ) !== -1 ||data.label.indexOf( value.toLowerCase()) !== -1;
            },
            handleChange(val) {
                let _this = this;
                let checked = val.target.checked;
                let checkVal = JSON.parse(val.target.defaultValue); 
                if (checked) {
                    _this.removeCarsArrR.push(checkVal);
                } else {
                    _this.removeCarsArrR.forEach((ele, i) => {
                        if (ele.id === checkVal.id) {
                            _this.removeCarsArrR.splice(i, 1)
                        }
                    });
                }
                // console.log(_this.removeCarsArrR);
            },
            
            renderContent(h, {node,data,store}) {
                 console.log(JSON.stringify(data));
                let _this = this;
                var initExec = (isCar,id) => {
                    let res = [];
                    if(isCar === "true"){ 
                       res.push( <input type="checkbox" value={JSON.stringify(id)}  onChange={this.handleChange}/> , node.label )
                    //    res.push( <input type="checkbox"  v-model="checkedNames" value="aaa" />, node.label )
                    }else{                        
                        res.push(  node.label ); 
                    }
                    return res;
                }; 
                return (
                    <span class = "custom-tree-node" > 
                        <span > { initExec(data.isCar,data) } </span> 
                    </span>
                );
            },
            appendDeptTree() {
                let _this = this;
                let carCheckedNodes = _this.$refs.carTree.getCheckedNodes();
                let deptCurrentNode = _this.$refs.deptTree.getCurrentNode();
                console.log(deptCurrentNode);
                if (carCheckedNodes.length <= 0) {
                    _this.$msgOpen(_this, "提示", "请选择车辆！", function (val) {
                        console.log(val);
                    });
                    return;
                } else {
                    if (!deptCurrentNode) {
                        _this.$msgOpen(_this, "提示", "请在部门结构中选择部门！", function (val) {
                            console.log(val);
                        });
                        return;
                    } else {
                        if (deptCurrentNode.isCar==="false") {
                            console.log(deptCurrentNode.id);
                            /*  let ss = {id:11,equipmentId:"0",isCar:true,label:"鲁F 88888"};
                            _this.$refs.deptTree.append( ss,_this.$refs.deptTree.getCurrentNode()); */
                            let params = [];
                            carCheckedNodes.forEach((ele, i) => {
                                /* let ss = {id:ele.id,equipmentId:ele.equipmentId,isCar:ele.isCar,label:ele.label};
                                _this.$refs.deptTree.append( ss,_this.$refs.deptTree.getCurrentNode());
                                _this.$refs.carTree.remove(ele);   */
                                let aParam = {
                                    carId: ele.organId,
                                    organId: deptCurrentNode.organId,
                                    status: 1
                                };
                                params.push(aParam);
                            });
                            _this.deptLoad = true;
                            _this.carLoad = true;
                            ajax.post(
                                    _this.global_.apiUrlJj + "/post/save-all-no-Organ",
                                    params
                                )
                                .then(function (res) {
                                    console.log(res);
                                    _this.deptLoad = false;
                                    _this.carLoad = false;
                                    if (res.data.isSuccess) {
                                        carCheckedNodes.forEach((ele, i) => {
                                            let ss = {
                                                id: ele.id,
                                                equipmentId: ele.equipmentId,
                                                isCar: ele.isCar,
                                                label: ele.label
                                            };
                                            _this.$refs.deptTree.append(ele, _this.$refs.deptTree.getCurrentNode());
                                            _this.$refs.carTree.remove(ele);
                                            if (i == (carCheckedNodes.length - 1)) {
                                                _this.$message({
                                                    type: "success",
                                                    message: "车辆分配成功!"
                                                });
                                            }
                                        });
                                    } else {
                                        _this.$message({
                                            type: "error",
                                            message: "车辆分配失败!"
                                        });
                                    }
                                })
                                .catch(function (error) {
                                    _this.deptLoad = false;
                                    _this.carLoad = false;
                                    _this.$message({
                                        type: "error",
                                        message: "车辆分配失败!"
                                    });
                                });
                        } else {
                            _this.$msgOpen(_this, "提示", "请在部门结构中选择部门！", function (val) {
                                console.log(val);
                            });
                            return;
                        }
                    }
                }
            },
            removeDeptTree() {
                let _this = this;
                if (_this.removeCarsArrR.length > 0) {
                    let params = [];
                    /* _this.removeCarsArrR.forEach((ele, i) => {
                        _this.carData.push(ele);
                        _this.$refs.deptTree.remove(ele);
                        let aParam = {
                                    carId: ele.id,
                                    organId: deptCurrentNode.id,
                                    status: 0
                         };
                        params.push(aParam);
                    }); */
                    _this.removeCarsArrR.forEach((ele, i) => { 
                        let aParam = {
                            carId: ele.organId,
                            organId: ele.parentId,
                            status: 0
                         };
                        params.push(aParam);
                    });
                    console.log(params);
                    _this.deptLoad = true;
                    _this.carLoad = true;
                    ajax.post(
                            _this.global_.apiUrlJj + "/post/save-all-no-Organ",
                            params
                        )
                        .then(function (res) {
                            console.log(res);
                            _this.deptLoad = false;
                            _this.carLoad = false;
                            if (res.data.isSuccess) {
                                _this.removeCarsArrR.forEach((ele, i) => {                                    
                                    _this.carData.push(ele);
                                    _this.$refs.deptTree.remove(ele);
                                    if (i == (_this.removeCarsArrR.length - 1)) {
                                        _this.removeCarsArrR = [];
                                        _this.$message({
                                            type: "success",
                                            message: "车辆移出成功!"
                                        });
                                    }
                                });

                            } else {
                                _this.$message({
                                    type: "error",
                                    message: "车辆移出失败!"
                                });
                            }
                        })
                        .catch(function (error) {
                            _this.deptLoad = false;
                            _this.carLoad = false;
                            _this.$message({
                                type: "error",
                                message: "车辆移出失败!"
                            });
                        });
                    console.log(_this.carData);
                    console.log(_this.deptData);
                } else {
                    _this.$msgOpen(_this, "提示", "请在部门结构中选择撤出的车辆！", function (val) {
                        console.log(val);
                    });
                    return;
                }

                /* if(carCheckedNodes.length <= 0){                    
                    _this.$msgOpen(_this, "提示", "请选择车辆！", function (val) {
                        console.log(val);
                    });
                    return;
                } else{
                    if(!deptCurrentNode){                    
                        _this.$msgOpen(_this, "提示", "请在部门结构中选择部门！", function (val) {
                            console.log(val);
                        });
                        return;
                    }else{
                        if(!deptCurrentNode.isCar){ 
                            carCheckedNodes.forEach((ele,i) => {
                                let ss = {id:ele.id,equipmentId:ele.equipmentId,isCar:ele.isCar,label:ele.label};
                                _this.$refs.deptTree.append( ss,_this.$refs.deptTree.getCurrentNode());
                                _this.$refs.carTree.remove(ele);                        
                            });
                        }else{         
                            _this.$msgOpen(_this, "提示", "请在部门结构中选择部门！", function (val) {
                                console.log(val);
                            });
                            return;
                        }
                      
                    }
                }  */
            },
            appendTreeNode() {
                let _this = this;
                console.log(_this.$refs.deptTree.getCurrentNode());
                if (!_this.$refs.deptTree.getCurrentNode()) {
                    _this.$msgOpen(_this, "提示", "请选择部门！", function (val) {
                        console.log(val);
                    });
                    return;
                }
                let ss = {
                    id: 11,
                    equipmentId: "0",
                    isCar: true,
                    label: "鲁F 88888"
                };
                _this.$refs.deptTree.append(ss, _this.$refs.deptTree.getCurrentNode());
            },
            removeTreeNode() {
                let _this = this;
                let current = _this.$refs.carTree.getCheckedNodes();
                if (current.length <= 0) {
                    _this.$msgOpen(_this, "提示", "请选择车辆！", function (val) {
                        console.log(val);
                    });
                    return;
                } else {
                    current.forEach((ele, i) => {
                        _this.$refs.carTree.remove(ele);
                    });
                }
                //                _this.$refs.carTree.remove( _this.$refs.carTree.getCheckedNodes());
            }

        },
        watch: {
            filterTextL(val) {
                this.$refs.deptTree.filter(val);
            },
            filterTextR(val) {
                this.$refs.carTree.filter(val);
            },
            deptId: {
                immediate: true,
                handler: function (newVal, oldVal) {
                    let _this = this;
                    if (newVal != undefined) {
                        _this.initExec(newVal);
                    }else{
                        _this.deptData = [];
                    }
                },
                deep: true
            }
        },
        beforeDestroy() {}
    };

</script>
<style>
    .child-transferbox-body {
        position: relative;
        box-sizing: content-box;
        width: auto;
        height: 100%;
        margin: 0 24px;
    }

    .child-transferbox-body .child-transferbox-mainL {
        float: left;
        width: calc(50% - 28px);
        height: 100%;
        background: #f5f5f5;
        border-radius: 3px;
        color: #444;
    }


    .child-transferbox-mainL .subResult,
    .child-transferbox-mainR .subResult {
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


    .child-transferbox-body .dept-title {
        width: 100%;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }

    .child-transferbox-body .child-transferbox-mainC {
        float: left;
        width: 56px;
        height: 100%;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }

    .child-transferbox-mainC .aOperate {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -50px 0 0 -19px;
    }

    .child-transferbox-mainC .aOperate a {
        clear: both !important;
        width: 30px;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        color: #777;
        margin: 10px auto;
    }

    .child-transferbox-mainC a.buttonCom {
        display: block;
        float: left;
        color: #444;
        line-height: 22px;
    }

    .child-transferbox-mainC a:link,
    a:visited {
        color: #444;
    }

    .child-transferbox-mainC .buttonComOver,
    .child-transferbox-mainC a:hover.buttonCom,
    .buttonCom:hover {
        opacity: 0.8;
    }

    .child-transferbox-mainC .buttonCom,
    .buttonComOver {
        height: 28px;
        border-radius: 3px;
        background-color: #32b8e8;
        padding: 0 5px;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
    }

    .child-transferbox-mainC a {
        outline: none;
        text-decoration: none;
    }

    .child-transferbox-body .child-transferbox-mainR {
        float: left;
        width: calc(50% - 28px);
        height: 100%;
        background: #f5f5f5;
        border-radius: 3px;
        color: #444;
    }

</style>
