<!--   
    name：数据表格化组件
    param：paramName{param }        
    return Value : None
    author：qiaoyh 
    date：2018.10.26
-->
<template  style="height:calc( 100% - 81px );">
    <div style="width:100%;margin:0px auto;" class="common-set-body">
          <div class="table-box">
              <div style="padding-left:10px;height:22px;padding-top:8px;">
                  <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                        <el-breadcrumb-item>报警规则设置</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
              <p v-if="fixedHead" class="header-box">{{fixedHead}}</p>
              <el-table :data="data" border fit height="calc(100% - 30px)" style="width: 100%" :row-style="showTr" tooltip-effect="dark" class="tree-table">
                  <el-table-column v-for="(column, index) in columns" :key="column.dataIndex"
                      :label="column.text" :min-width="firstWidth(index)" show-overflow-tooltip :align="firstAlign(index)">
                      <template slot-scope="scope">
                          <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space" :key="levelIndex"></span>
                          <span class="button" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
                              <i v-if="!scope.row._expanded" class="el-icon-caret-right" aria-hidden="true"></i>
                              <i v-if="scope.row._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>
                          </span>
                          <span v-else-if="index===0" class="ms-tree-space"></span>
                          {{scope.row[column.dataIndex]}}
                      </template>
                  </el-table-column>
                  <el-table-column label="操作" :width="operatWidth" :fixed="fixed? 'right':fixed">
                      <template slot-scope="scope">
                          <el-button type="text" size="mini" @click="handleSave(scope.$index, scope.row)">添加下级报警</el-button>
                          <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                          <el-button type="text" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                          <el-button type="text" size="mini" @click="handle(scope.$index, scope.row)">设置</el-button>
                          <!-- <img  src="../../../../../../static/img/jjbx/vehicle/bj2.png" class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)">
                          <img  src="../../../../../../static/img/jjbx/vehicle/sc2.png" @click="handleDelete(scope.$index, scope.row)"  class="img-1"> -->
                      </template>
                  </el-table-column>
                </el-table>
                <div v-show="delVisible1" id="drag1" class="setting-dialog"  :style="{border:dragBorder,borderRadius:dragBorderRad}">
                        <div  class="setting-header" @mousedown="onDragStart1" @mouseup="onDragClose1">
                            <div class="setting-add-desc"> 添加报警类型</div>
                            <div class="setting-hearder-close">
                            <i class="el-icon-close" style="color: #fff;cursor:pointer;" @click="close();"></i>
                        </div>
                    </div>
                  <div class="setting-add">
                      <el-form ref="ruleForm" :model="ruleForm" label-width="70px">
                            <el-form-item label="名称">
                                <el-input v-model="ruleForm.templateName" placeholder="报警类型名称" style="width:360px;"></el-input>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input  type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.templateDesc"  style="width:360px;"></el-input>
                            </el-form-item>
                            <el-form-item label="触发条件">
                                <el-input  type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.templateCon"  style="width:360px;"></el-input>
                            </el-form-item>
                            <el-form-item label="播报内容">
                                <el-input type="textarea" v-model="ruleForm.sendContent" style="width:360px;"></el-input>
                            </el-form-item>
                            <el-form-item label="报警颜色">
                                <el-radio v-model="ruleForm.templateColor" label="红色">红色</el-radio>
                                <el-radio v-model="ruleForm.templateColor" label="橙色">橙色</el-radio>
                                <el-radio v-model="ruleForm.templateColor" label="黄色">黄色</el-radio>
                                <el-radio v-model="ruleForm.templateColor" label="蓝色">蓝色</el-radio>
                            </el-form-item>
                            <div class="button-handle">
                                <el-button @click="handleCancelAdd();">取 消</el-button>
                                <el-button type="primary" @click="handleRowAdd();">确 定</el-button>
                            </div>
                      </el-form>
                  </div>
                </div>
                <!-- 删除提示框 -->
                <el-dialog title="提示" :visible.sync="delVisible2" width="300px" center>
                  <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                  <span slot="footer" class="dialog-footer">
                      <el-button @click="deleteCancel();">取 消</el-button>
                      <el-button type="primary" @click="deleteRow();">确 定</el-button>
                  </span>
                </el-dialog>
                <!--设置提示框-->
                <div v-show="delVisible3" id="drag2" class="child-alarm-dialog" :style="{border:dragBorder,borderRadius:dragBorderRad}" >
                    <!-- 头部 -->
                    <div  class="alarm-dialog-header" @mousedown="onDragStart2" @mouseup="onDragClose2">
                        <div class="alarm-dialog-hearder-icon">
                            <img src="../../../../../../static/img/jjbx/monitor/position/carNum.png" />
                        </div>
                        <div class="alarm-dialog-hearder-desc">
                            报警设置
                        </div>
                        <div class="alarm-dialog-hearder-close">
                            <i class="el-icon-close" style="color: #fff;cursor:pointer;" @click="close();"></i>
                        </div>
                    </div>
                    <!-- 报警信息 -->
                    <div class="alarm-edit">
                        <el-form :model="form" label-width="140px" >
                            <!-- <el-col :span="11"> -->
                                <el-form-item label="是否启用：">
                                    <el-radio v-model="form.isEnabled" label="是">是</el-radio>
                                    <el-radio v-model="form.isEnabled" label="否">否</el-radio>
                                </el-form-item>
                            <!-- </el-col> -->
                            <!-- <el-col :span="10"> -->
                                <el-form-item label="是否启用弹窗：">
                                    <el-radio v-model="form.isPop" label="是">是</el-radio>
                                    <el-radio v-model="form.isPop" label="否">否</el-radio>
                                </el-form-item>
                            <!-- </el-col> -->
                            <el-form-item label="报警类型名称：">
                                <el-input v-model="form.warningType"  :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="报警类型规则：">
                                <el-input style="width:60px;" v-model="form.minute" ></el-input><span style="margin-left:10px;">分钟内，持续超过</span><el-input v-model="form.number" style="width:60px;margin-left:10px;"  ></el-input><span style="margin-left:10px;">次</span>
                            </el-form-item>
                            <!-- <el-form-item label="风险级别：">
                                <el-select v-model="form.warningRisk" placeholder="风险级别" @change="getRiskLabel();">
                                    <el-option v-for="item in selectRisk" :key="item.id" :label="item.text" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item> -->
                            <el-form-item label="扣分系数：">
                                <el-input v-model="form.warningScore"></el-input>
                            </el-form-item>
                            <el-form-item label="自动处理：">
                                <el-radio v-model="form.dealType" label="自动">自动</el-radio>
                                <el-radio v-model="form.dealType" label="手动">手动</el-radio>
                            </el-form-item>
                            
                            <el-form-item label="发送对象：">
                                <el-select v-model="form.sendUser" multiple placeholder="请选择" style="width:360px;">
                                    <el-option v-for="item in selectSendUser" :key="item.id" :label="item.text" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="推送方式：">
                                <el-select v-model="form.sendType" multiple placeholder="请选择"  style="width:360px;">
                                    <el-option v-for="item in selectSendType" :key="item.id" :label="item.text" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                <!-- <div style="width: auto;height: auto;">
                    
                </div> -->
                    <div class="button-handle">
                        <el-button @click="handleCancel();">取 消</el-button>
                        <el-button type="primary" @click="handleRow();">确 定</el-button>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
import ajax from "axios";
import MSDataTransfer from './dataTranslate.js'
// import Vue from 'vue'
export default {
    name: 'tree-grid',
    props: {
        // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
        treeStructure: {
            type: Boolean,
            default: false
        },
        // 这是相应的字段展示
        columns: {
            type: Array,
            default: () => ([])
        },
        // 这是数据源
        dataSource: {
            type: Array,
            default: () => ([])
        },
        // 这个是是否展示操作列
        treeType: {
            type: String,
            default: 'normal'
        },
        // 是否默认展开所有树
        defaultExpandAll: {
            type: Boolean,
            default: false

        },
        // 固定表头
        fixedHead: {
            type: String,
            default: ''
        },
        // 是否固定操作列
        fixed: {
            type: Boolean,
            default: true // 默认为true,固定
        },
        // 操作列按钮
        btnList: {
            type: Array,
            default: () => ([])
        },
        // 操作列宽
        operatWidth: {
            type: Number,
            default: 300
        }
    },
    data () {
        return {
            ruleForm: {
                templateName: "",
                templateDesc: "",
                templateCon:'',
                templateColor:'',
                sendContent:'',
            },
            form:{
                isEnabled:'否',
                isPop:'否',
                dealType:'手动',
                warningType:'',
                // warningRule:'',
                minute:'',
                number:'',
                warningScore:'',
                warningRisk:'',
                
                sendUser:[],
                sendType:[],
            },
            id:'',
            parentsId : '',
            delVisible1: false,
            delVisible2: false,
            delVisible3: false,
            saveOrEdit: -1,
            //拖拽改变样式
            dragBorder: "0",
            dragBorderRad: "6px",
            radio:'1',
            // selectRisk:[],
            selectSendUser:[],
            selectSendType:[],
            // selectRiskLabel:{},
            // selectSendUserLabel:[],
        }
    },
    computed: {
        // 格式化数据源
        data () {
            if (this.treeStructure) {
                let data = MSDataTransfer.treeToArray(this.dataSource, null, null, this.defaultExpandAll)
                return data
            }
            return this.dataSource
        }
    },
    created() {
        let _this = this;
        // _this.getRisk();
        _this.getSendUser();
        _this.getSendType();
    },
    methods: {
        // 显示行
        showTr (rows, index) {
            let row = rows.row
            let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
            row._show = show
            return show ? '' : 'display:none;'
        },
        // 展开下级
        toggle (trIndex) {
            let record = this.data[trIndex]
            record._expanded = !record._expanded
        },
        // 显示层级关系的空格和图标
        spaceIconShow (index) {
            if (this.treeStructure && index === 0) {
                return true
            }
            return false
        },
        // 点击展开和关闭的时候，图标的切换
        toggleIconShow (index, record) {
            if (this.treeStructure && index === 0 && record.children && record.children.length > 0) {
                return true
            }
            return false
        },
        firstWidth (index) {
            if (index === 0) {
                return '100'
            } else {
                return '150'
            }
        },
        firstAlign (index) {
            if (index === 0) {
                return 'left'
            } else {
                return 'center'
            }
        },
        /**
         * @function 调用父组件AlarmSetting的方法 getDate()
         * @return {type} {description}
         */
        callMethod(){

        },
        /**
         * @function 添加
         * @param  {type} index 表格行下标
         * @param  {type} row   所属行
         * @return {type} {description}
         */
        handleSave(index, row){
            let _this = this;
            _this.delVisible1 = true;
            console.log(index);
            console.log(row.id);
            console.log(_this.saveOrEdit);
            // ajax.get(_this.global_.apiUrlJj +"/get/select-warning-id?id=" + row.id)
            //     .then(function (res) {
            //         console.log(res);
            //         if(res.data){
                        _this.parentsId = row.id;
                        console.log(_this.parentsId);
                //     }
                // });
            _this.saveOrEdit=1;
            console.log(_this.saveOrEdit);
        },
        /**
         * @function 修改
         * @param  {type} index 表格行下标
         * @param  {type} row   所属行
         * @return {type} {description}
         */
        handleEdit(index,row){
            let _this = this;
            _this.delVisible1 = true;
            _this.id = row.id;
            ajax.get(_this.global_.apiUrlJj +"/get/select-warning-id?id=" + _this.id)
                .then(function (res) {
                    console.log(res);
            //         if(res.data){
                        _this.parentsId = res.data.data.parentsId;
                        console.log(_this.parentsId);
                        _this.ruleForm.templateName = res.data.data.templateName;
                        _this.ruleForm.templateDesc = res.data.data.templateDesc;
                        _this.ruleForm.templateCon = res.data.data.templateCon;
                        _this.ruleForm.templateColor = res.data.data.templateColor;
                        _this.ruleForm.sendContent = res.data.data.sendContent;
                //     }
                });
            _this.saveOrEdit = 2;
        },
        /**
         * @function 确定添加、修改
         * @param  {type} idx {description}
         * @return {type} {description}
         */
        handleRowAdd() {
            let _this = this;
            let postData = {
                parentsId : _this.parentsId,
                templateName : _this.ruleForm.templateName,
                templateDesc : _this.ruleForm.templateDesc,
                templateCon : _this.ruleForm.templateCon,
                templateColor  : _this.ruleForm.templateColor,
                sendContent  : _this.ruleForm. sendContent,
            }
            if(_this.saveOrEdit === 1){
                ajax.post(_this.global_.apiUrlJj +"/post/warning-template-name", postData)
                .then(function (res) {
                    console.log(res);
                    if(res.data.isSuccess){
                        _this.$message({
                            showClose: true,
                            message: "添加成功！",
                            type: "success"
                        });
                    _this.$emit('callMethod');
                    }
                })
            }
            if(_this.saveOrEdit === 2){
              ajax.post(_this.global_.apiUrlJj +"/post/update-warning?id=" + _this.id , postData)
                .then(function (res) {
                    console.log(res);
                    if(res.data.isSuccess){
                        _this.$message({
                            showClose: true,
                            message: "修改成功！",
                            type: "success"
                        });
                    _this.$emit('callMethod');
                    }
                })
            }
            _this.ruleForm.templateName = '';
            _this.ruleForm.templateDesc = '';
            _this.ruleForm.templateCon = '';
            _this.ruleForm.templateColor = '';
            _this.ruleForm.sendContent = '';
            this.delVisible1 = false;
            _this.saveOrEdit = -1;
        },
        /**
         * @function 取消添加或修改
         * @return {type} {description}
         */
        handleCancelAdd(){
            let _this  = this;
            this.delVisible1 = false;
            _this.saveOrEdit = -1;
            _this.ruleForm.templateName = '';
            _this.ruleForm.templateDesc = '';
            _this.ruleForm.templateCon = '';
        },
        /**
         * @function 删除
         * @return {type} {description}
         */
        handleDelete(index,row){
            let _this = this;
            _this.delVisible2 = true;
            _this.id = row.id;
        },
        //确定删除
        deleteRow(idx) {
            let _this = this;
            // _this.tableData.splice(this.idx, 1);
            ajax.delete(_this.global_.apiUrlJj + "/del/delete-warning?id=" + _this.id)
                .then(function (res) {
                    console.log(res);
                    if(res.data.isSuccess){
                        _this.$message.success("删除成功！");
                        _this.$emit('callMethod');
                    }else{
                        _this.$message.success("删除失败！");
                    }
                });
            _this.delVisible2 = false;
            _this.saveOrEdit = -1;
        },
        //取消删除
        deleteCancel(){
            let _this = this;
            this.delVisible2 = false;
            _this.saveOrEdit = -1;
        },
        //弹出设置报警规则窗口
        handle(index,row){
            let _this = this;
            _this.delVisible3 = true;
            _this.id = row.id;
            console.log(_this.id);
            ajax.get(_this.global_.apiUrlJj +"/get/select-warning-id?id=" + row.id)
                .then(function (res) {
                    // _this.parentsId = res.data.data.parentsId;
                    _this.form.warningType = res.data.data.templateName;
                    // _this.form.warningRule = res.data.data.templateDesc;
                });
        },
        //获取选择风险级别的label值
        // getRiskLabel(value){
        //     let _this = this;
        //     _this.selectRiskLabel = _this.selectRisk.find((item)=>{//这里的selectDistrict就是上面遍历的数据源
        //         return item.id === _this.form.warningRisk;//筛选出匹配数据
        //     });
        //     console.log(_this.selectRiskLabel.text);
        // },
        // getSendUserLabel(value){
        //     let _this = this;
        //     _this.selectSendUserLabel = _this.selectSendUser.find((item)=>{//这里的selectDistrict就是上面遍历的数据源
        //         return item.id === _this.form.sendUser;//筛选出匹配数据
        //     });
        //     console.log(_this.selectSendUserLabel.text);
        // },
        //设置报警规则
        handleRow(){
            let _this = this;
            console.log(_this.id);
            let postData = {
                dealType:_this.form.dealType,
                isEnabled:_this.form.isEnabled,
                isPop:_this.form.isPop,
                // sendContent:_this.form.sendContent,
                // warningDesigner:warningDesigner,
                // warningRisk:_this.selectRiskLabel.text,
                sendUser:_this.form.sendUser.join(','),
                warningRule:_this.form.minute + "," + _this.form.number,
                warningScore:_this.form.warningScore,
                warningType:_this.form.warningType,
                sendType:_this.form.sendType.join(','),
            };
            ajax.post(_this.global_.apiUrlJj + "/post/warning-template?id=" + _this.id, postData)
                .then(function(res) {
                    console.log(res);
                    console.log(postData);
                    if (res.data.isSuccess) {
                        //跳转页面
                        _this.$message({
                            showClose: true,
                            message: "设置成功！",
                            type: "success"
                        });
                        _this.delVisible3 = false;
                        _this.form.isEnabled = '否';
                        _this.form.isPop = '否';
                        _this.form.dealType = '手动';
                        _this.form.sendContent = '';
                        _this.form.sendUser = '';
                        _this.form.warningRisk = '';
                        _this.form.warningRule = '';
                        _this.form.warningScore = '';
                        _this.form.warningType = '';  
                        _this.form.type = "";
                        _this.form.sendUser = "";
                    } else {
                        _this.$message({
                        message: "设置失败！"
                        });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
              
        },
        //取消设置窗口
        handleCancel(){
            let _this = this;
            _this.delVisible3 = false;
            _this.form.isEnabled = '否';
            _this.form.isPop = '否';
            _this.form.dealType = '手动';
            _this.form.type = "";
            _this.form.sendUser = "";

        },
        /**
        * @function {鼠标拖动弹框改变其位置}
        * @param  {type} e {description}
        * @return {type} {description}
        */
        onDragStart1(e) {
            let _this = this;
            _this.dragBorder = "1px dashed #95B8E7";
            _this.dragBorderRad = "0";
            //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
            var divx = e.clientX - document.getElementById("drag1").offsetLeft;
            var divy = e.clientY - document.getElementById("drag1").offsetTop;
            //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
            document.onmousemove = function (e) {
                //获取移动后div的位置：鼠标位置-divx/divy
                var l = e.clientX - divx;
                var t = e.clientY - divy;
                document.getElementById("drag1").style.left = l + "px";
                document.getElementById("drag1").style.top = t + "px";
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        onDragStart2(e) {
            let _this = this;
            _this.dragBorder = "1px dashed #95B8E7";
            _this.dragBorderRad = "0";
            //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
            var divx = e.clientX - document.getElementById("drag2").offsetLeft;
            var divy = e.clientY - document.getElementById("drag2").offsetTop;
            //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
            document.onmousemove = function (e) {
                //获取移动后div的位置：鼠标位置-divx/divy
                var l = e.clientX - divx;
                var t = e.clientY - divy;
                document.getElementById("drag2").style.left = l + "px";
                document.getElementById("drag2").style.top = t + "px";
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        onDragClose1() {
            this.dragBorder = "0";
            this.dragBorderRad = "6px";
        },
        onDragClose2() {
            this.dragBorder = "0";
            this.dragBorderRad = "6px";
        },
        close(){
            let _this = this;
            _this.delVisible1 = false;
            _this.delVisible3 = false;
            _this.saveOrEdit = -1;
            _this.ruleForm.templateName = '';
            _this.ruleForm.templateDesc = '';
            _this.ruleForm.templateCon = '';
            _this.ruleForm.templateColor = '';
            _this.ruleForm.sendContent = '';
            _this.form.isEnabled = '否';
            _this.form.isPop = '否';
            _this.form.dealType = '手动';
            _this.form.warningType='';
            _this.form.warningRule='';
            _this.form.warningScore='';
            _this.form.warningRisk='';
            _this.form.sendUser=[];
            _this.form.sendType=[];
        },
        // getRisk() {
        //     let _this = this;
        //     ajax.get(_this.global_.apiUrlJj + "/get/status?type=warningType")
        //         .then(function (res) {
        //             console.log(res);
        //             // var obj = {}
        //             if (res.data) {
        //                 if (res.data.data) {
        //                     res.data.data.forEach((item, index) => {
        //                         _this.selectRisk.push({
        //                              id: item.id,
        //                             text: item.dictNumName
        //                         });
        //                     });
        //                 }
        //             }
        //         });
        // },
        //获取发送对象下拉列表
        getSendUser() {
                let _this = this;
                ajax.get(_this.global_.apiUrlJj + "/get/warning-role")
                    .then(function (res) {
                        console.log(res);
                        // var obj = {}
                        if (res.data) {
                            if (res.data.data) {
                                res.data.data.forEach((item, index) => {
                                    _this.selectSendUser.push({
                                        id: item.id,
                                        text: item.roleName
                                    });
                                });
                            }
                        }
                    });
            },
        //获取发送对象下拉列表
        getSendType() {
                let _this = this;
                ajax.get(_this.global_.apiUrlJj + "/get/status?type=sendType")
                    .then(function (res) {
                        console.log(res);
                        // var obj = {}
                        if (res.data) {
                            if (res.data.data) {
                                res.data.data.forEach((item, index) => {
                                    _this.selectSendType.push({
                                        id: item.id,
                                        text: item.dictNumName
                                    });
                                });
                            }
                        }
                    });
            },
    }
}
</script>
<style>
.common-set-body .table-box{
  width: 90%;
  height: 642px;
  margin: 0px auto;
  z-index:100;
}
.common-set-body .header-box{
  padding: 8px 0;
  margin: 0;
  text-align: center;
  font-weight: bold;
}
.common-set-body .ms-tree-space{
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
    }
.common-set-body .ms-tree-space::before{
    content: ""
  }
.common-set-body  table td{
    line-height: 26px;
  }
.common-set-body .button{
    font-size: 20px;
    cursor: pointer;
  }
.common-set-body .firstWidth{
    min-width: 150px;
  }
/* .common-set-body .img-1 {
        width: 11px;
        height: 15px;
        vertical-align: middle;
        cursor:pointer;
    }
.common-set-body .img-2 {
        margin-right: 14px;
    } */
 .common-set-body .setting-dialog {
    position: absolute;
    top: 180px;
    right: 30%;
    width: 480px;
    height: 422px;
    background-color: #fff;
    z-index: 9999;
    box-shadow:0px 2px 10px 0px rgba(17,105,252,0.16);
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
.common-set-body .setting-add-desc {
    float: left;
    height: 40px;
    line-height: 40px;
    margin-left: 10px;
    font-size: 12px;
    color: #fff;
}
.common-set-body .setting-hearder-close {
    float: right;
    cursor: default;
    text-align: right;
    width: 40px;
    height: 40px;
    line-height: 40px;
}
.common-set-body .button-handle{
    width: 170px;
    margin: 20px auto;
}
.common-set-body .setting-add {
    height:370px;
    width: auto;
    box-sizing: content-box;
    padding: 12px 16px 0 16px;
    background-color: #F8F8F8;
}
/* 设置报警规则弹出窗口 */
.common-set-body .child-alarm-dialog {
        position: absolute;
        top: 180px;
        right: 30%;
        width: 570px;
        height: auto;
        background-color: #fff;
        z-index: 10;
        box-shadow:0px 2px 10px 0px rgba(17,105,252,0.16);
    }

    /* 窗口头部 */
    .child-alarm-dialog .alarm-dialog-header {
        cursor: move;
        width: auto;
        height: 40px;
        line-height: 40px;
        background: #2e92f6;
        border-radius: 6px 6px 0 0;
        padding: 0 16px;
    }

    .alarm-dialog-header .alarm-dialog-hearder-icon {
        float: left;
        height: 100%;
        line-height: 35px;
    }

    .alarm-dialog-hearder-icon img {
        width: 17px;
        height: 11px;
        vertical-align: middle;
    }

    .alarm-dialog-hearder-desc {
        float: left;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
        font-size: 12px;
        color: #fff;
    }

    .alarm-dialog-hearder-close {
        float: right;
        cursor: default;
        text-align: right;
        width: 40px;
        height: 40px;
        line-height: 40px;
    }

    /* 操作按钮 */
    .child-alarm-dialog .alarm-edit {
        /* height: 370px; */
        width: auto;
        box-sizing: content-box;
        padding: 3px 16px 0 16px;
        color:#5A5E66;
    }
    .setting-add .el-form-item, .alarm-edit .el-form-item{
        margin-bottom: 8px;
    }
    /* .alarm-edit .el-input__inner{
        height: 28px !important;
        line-height: 28px;
    } */
    .alarm-edit .el-form-item__label{
        line-height: 30px;
    }
    .alarm-edit  .el-form-item__content{
        width:360px;
        line-height: 30px;
    }
    .child-alarm-dialog .el-input__icon{
        line-height: 28px;
    }
    .common-set-body .tree-table .el-table td, .el-table th.is-leaf{
        border-right: 1px solid #ebeef5 !important;
    }
</style>
<style>
.common-set-body .tree-table .el-table__body-wrapper{
    overflow-y: auto ;
}
</style>