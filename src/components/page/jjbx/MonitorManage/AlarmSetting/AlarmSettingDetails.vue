<!--   
    name：报警设置明细
    desc：报警设置明细界面 v 1.2
    param：paramName{param }        
    return Value : None
    author：qiaoyh 
    date：2018.10.24
-->
<template>
    <div class="common-alarmDel-body">
        <div style="padding-left:10px;height:22px;padding-top:8px;border-bottom:1px solid rgba(232,238,243,1);box-shadow:0px 2px 6px 0px rgba(47,149,244,0.13);">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>报警设置明细</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="common-alarmDel-formbox">
            <div class="common-alarmDel-handlebox">
                <!-- <el-form :model="ruleForm" ref="ruleForm"> -->
                    <!-- 报警类型   -->
                    <!-- <input class="sys-common-input" placeholder="请输入报警类型" v-model="ruleForm.warningType">  -->
                    <button type="button" class="button-info" @click="exportExcel()">导出</button>
                    <!-- <button type="button" class="button-info" @click="search();">查询</button> -->
                <!-- </el-form> -->
            </div>
        </div>
        <div class="common-alarmDel-table" v-loading="deptLoad">
            <el-table id="out-table" :data="tableData" :highlight-current-row="true" :stripe="true" :header-cell-style="{background:'rgba(238,245,251,1)'}"
                height="calc( 100% - 70px )" :row-class-name="onSetRowIndex" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                <el-table-column align="center" type="index" :index="indexMethod" label="序号">
                </el-table-column>
                <el-table-column prop="isEnabled" align="left" label="启用状态" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="isPop" align="left" label="启用弹窗" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="warningType" align="left" label="报警类型名称"  :show-overflow-tooltip="true">
                </el-table-column>
                <!-- <el-table-column prop="warningRule" align="center" label="报警规则"  :show-overflow-tooltip="true">
                </el-table-column> -->
                <el-table-column prop="warningScore" align="left" label="扣分系数" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="dealType" align="left" label="自动处理" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="sendUser" align="left" label="发送对象" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="sendType" align="left" label="推送方式" :show-overflow-tooltip="true">
                </el-table-column>
                 <el-table-column prop="province" align="center" label="操作">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.isSele" style="color:#2F95F4;cursor:pointer;" @click="handleEdit(scope.$index, scope.row);" >修改</span>
                        <span v-if="scope.row.isSele" style="color:#fff;cursor:pointer;" @click="handleEdit(scope.$index, scope.row);" >修改</span>
                        <!-- <img v-if="scope.row.isSele" src="../../../../../../static/img/jjbx/vehicle/bj.png" class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)">
                        <img v-if="!scope.row.isSele" src="../../../../../../static/img/jjbx/vehicle/bj2.png" class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)"> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" layout="total, prev, pager, next" :total="totalElements">
                </el-pagination>
            </div>
        </div>
        <!--设置提示框-->
                <div v-show="delVisible" id="drag" class="child-alarm-dialog" :style="{border:dragBorder,borderRadius:dragBorderRad}" >
                    <!-- 头部 -->
                    <div  class="alarm-dialog-header" @mousedown="onDragStart" @mouseup="onDragClose">
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
                        <el-form :model="form" label-width="140px"  :rules="rules">
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
                                <el-input v-model="form.warningType" :disabled="true" ></el-input>
                            </el-form-item>
                            <el-form-item label="报警类型规则：">
                                <el-input style="width:60px;"  v-model="form.minute"></el-input><span style="margin-left:10px;">分钟内，持续</span><el-input  v-model="form.number" style="width:60px;margin-left:10px;" ></el-input><span style="margin-left:10px;">次</span>
                            </el-form-item>
                            <el-form-item label="扣分系数：">
                                <el-input v-model="form.warningScore"></el-input>
                            </el-form-item>
                            <el-form-item label="自动处理：">
                                <el-radio v-model="form.dealType" label="自动">自动</el-radio>
                                <el-radio v-model="form.dealType" label="手动">手动</el-radio>
                            </el-form-item>
                            <!-- <el-form-item label="播报内容：">
                                <el-input type="textarea" v-model="form.sendContent"></el-input>
                            </el-form-item> -->
                            <el-form-item label="发送对象：">
                                <el-select v-model="form.sendUser" multiple placeholder="请选择"  style="width:360px;">
                                    <el-option v-for="item in selectSendUser" :key="item.id" :label="item.text" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="推送方式：">
                                <el-select v-model="form.sendType" multiple placeholder="请选择" style="width:360px;" >
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
</template>

<script>
    import ajax from "axios";
    import FileSaver from 'file-saver';
    import XLSX from 'xlsx';
    export default {
        data() {
            return {
                tableData: [],
                cur_page: 1,
                pageSize:20,
                totalElements: 0, //总条数
                delVisible: false,
                form:{
                    isEnabled:'',
                    isPop:'',
                    dealType:'',
                    warningType:'',
                    // warningRule:'',
                    minute:'',
                    number:'',
                    warningScore:'',
                    // sendContent:'',
                    sendUser:'',
                    sendType:'',
                },
                //拖拽改变样式
                dragBorder: "0",
                dragBorderRad: "6px",
                // selectRisk:[],
                selectSendUser:[],
                selectSendType:[],
                id:'',
                rules:{
                    // warningRisk:[
                    //     { required: true, message: '请选择风险级别', trigger: 'change' },
                    // ],

                },
                deptLoad:false,
            };
        },
        created() {
            let _this = this;
            _this.search();
            // _this.getRisk();
            _this.getSendUser();
            _this.getSendType();
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                let _this = this;
                this.cur_page = val;
                this.getData();
            },
            /**
             * @function {自定义索引}
             * @param  {number} index {行序号}
             * @return {number} {行索引}
             */
            indexMethod(index) {
                let _this = this;
                return index + 1 + (_this.cur_page - 1)*_this.pageSize; 
            },
            onSetRowIndex({ row, rowIndex }) {
                //把每一行的索引放进row
                row.index = rowIndex;
            },
            /**
             * @function {鼠标 hover 进入时触发事件}
             * @param  {string} row    {行}
             * @param  {object} event  {description}
             * @param  {string} column {列}
             * @return {type} {description}
             */
            handleMouseEnter: function (row, event, column) {
                var index = row.index;
                this.tableData[row.index].isSele = true;
            },
            /**
             * @function {鼠标 hover 退出时触发事件}
             * @param  {type} row    {行}
             * @param  {type} event  {description}
             * @param  {type} column {列}
             * @return {type} {description}
             */
            handleMouseOut: function (row, event, column) {
                this.tableData[row.index].isSele = false;
            },
            /**
             * @function {function name}
             * @param  {type} formName {currentPage,pageSize}
             * @return {type} {车辆列表 , 总数}
             */
            getData() {
                let _this = this;
                _this.deptLoad = true;
                var data = [];
                // let param = {
                //     warningType: _this.ruleForm.warningType
                // };
                ajax.get(_this.global_.apiUrlJj +"/get/warning-template?currentPage=" +_this.cur_page + "&pageSize="+ _this.pageSize)
                    .then(function (res) {
                        console.log(res);
                        _this.deptLoad = false;
                        res.data.data.content.forEach((item, index) => {
                            var obj = {};
                            obj.isEnabled = item.isEnabled;
                            obj.isPop = item.isPop;
                            obj.warningType = item.warningType;
                            // obj.warningRule = item. warningRule;
                            obj.warningScore = item.warningScore;
                            obj.dealType = item.dealType;
                            obj.sendUser = item.sendUser;
                            obj.sendType = item.sendType;
                            obj.isSele = item.isSele;
                            obj.id = item.id;
                            data[index] = obj;
                        });
                        _this.tableData = data;
                        console.log(_this.tableData);
                        _this.totalElements = res.data.data.number;
                    })
                    .catch(function (error) {
                        _this.deptLoad = false;
                        console.log(error);
                    });
            },
            search() {
                let _this = this;
                _this.cur_page = 1;
                _this.getData();
            },
            handleEdit(index, row) {
                let _this = this;
                _this.delVisible = true;
                _this.id = row.id;
                ajax.get(_this.global_.apiUrlJj +"/get/select-warning-template?id=" + row.id)
                .then(function (res) {
                    // _this.parentsId = res.data.data.parentsId;
                    _this.form.isEnabled = res.data.data.isEnabled;
                    _this.form.isPop = res.data.data.isPop;
                    _this.form.dealType = res.data.data.dealType;
                    _this.form.warningType = res.data.data.warningType;
                    // _this.form.warningRule = res.data.data.warningRule;
                    _this.form.minute = res.data.data.warningRule.split(',')[0];
                    _this.form.number = res.data.data.warningRule.split(',')[1];
                    _this.form.warningScore = res.data.data.warningScore;
                    // _this.form.sendContent = res.data.data.sendContent;
                    _this.form.sendUser = res.data.data.sendUser.split(',');
                    _this.form.sendType = res.data.data.sendType.split(',');
                });
            },
            //处理完成
            handleRow(idx) {
                let _this = this;
                let postData = {
                    dealType:_this.form.dealType,
                    isEnabled:_this.form.isEnabled,
                    isPop:_this.form.isPop,
                    // sendContent:_this.form.sendContent,
                    sendUser:_this.form.sendUser.join(','),
                    sendType:_this.form.selectSendType,
                    // warningDesigner:warningDesigner,
                    warningRule:_this.form.minute + "," + _this.form.number,
                    warningScore:_this.form.warningScore,
                    warningType:_this.form.warningType,
                    sendType:_this.form.sendType.join(','),
                };
                ajax.post(_this.global_.apiUrlJj + "/post/update-warning-template?id=" + _this.id, postData)
                .then(function(res) {
                    console.log(res);
                    if (res.data.isSuccess) {
                        _this.$message.success("设置成功");
                        _this.delVisible = false;
                        _this.getData();
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
            handleCancel(){
                let _this = this;
                _this.delVisible = false;
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
            /**
             * @function {导出}
             * @return {type} {description}
             */
            exportExcel () {
                /* generate workbook object from table */
                var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
                /* get binary string as output */
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '报警规则明细表.xlsx')
                } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                return wbout
            },
            
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
            getSendType(){
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
            // getSendUserLabel(value){
            // let _this = this;
            // _this.selectSendUserLabel = _this.selectSendUser.find((item)=>{//这里的selectDistrict就是上面遍历的数据源
            //     return item.id === _this.form.sendUser;//筛选出匹配数据
            // });
            // console.log(_this.selectSendUserLabel.text);
            // },
        }
    };
</script>
<style>
    /* 设置滚动条的样式 */

    scrollbar-base-color {
        width: 5px;
        background: #e7eaee;
    }

    /* 表格整体布局 */

    .common-alarmDel-table {
        /*scrollbar-arrow-color: #f4ae21; */
        /*三角箭头的颜色*/
        /*scrollbar-face-color: #333;*/
        /*立体滚动条的颜色*/
        /*scrollbar-3dlight-color: #666; */
        /*立体滚动条亮边的颜色*/
        /*scrollbar-highlight-color: #666; */
        /*滚动条空白部分的颜色*/
        /*scrollbar-shadow-color: #999; */
        /*立体滚动条阴影的颜色*/
        /*scrollbar-darkshadow-color: #666; */
        /*立体滚动条强阴影的颜色*/
        /*scrollbar-track-color: #666; */
        /*立体滚动条背景颜色*/
        /*scrollbar-base-color:#f8f8f8; */
        /*滚动条的基本颜色*/
        width: 98%;
        height: calc(100% - 110px);
    }

    /*定义滚动条的轨道颜色、内阴影及圆角*/

    .common-alarmDel-table ::-webkit-scrollbar-track {
        background-color: #e7eaee;
    }

    /*定义滑块颜色、内阴影及圆角*/

    .common-alarmDel-table ::-webkit-scrollbar-thumb {
        border-radius: 17px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #fff;
    }

    /*定义两端按钮的样式*/

    .common-alarmDel-table ::-webkit-scrollbar-button {
        background-color: #e7eaee;
    }

    /*定义右下角汇合处的样式*/

    .common-alarmDel-table ::-webkit-scrollbar-corner {
        background: #e7eaee;
    }
    common-alarmDel-table .el-table td, .el-table th.is-leaf{
        border-right: 1px solid #ebeef5 !important;
    }
    /* 整体布局 */
    .common-alarmDel-body {
        box-sizing: content-box;
        /* margin-left: 10px;
        margin-right: 10px; */
        height: calc(100% - 111px);
    }

    /* 表单整体背景 */

    .common-alarmDel-formbox {
        width: 100%;
        background-color: #f8f8f8;
    }

    /* .demo-form-inline{padding-top:0.5%;} */

    /* .el-select{width: 60%} */

    /* 操作按钮整体布局 */

    .common-alarmDel-menu {
        height: 50px;
        width: 99.2%;
        background-color: #ffffff;
        border: none;
    }

    /* 按钮左对齐 */

    .el-button--primary.is-plain {
        width: 68px !important;
        height: 32px !important;
        float: left !important;
        background: #2f95f4 !important;
        color: #fff !important;
    }

    .common-alarmDel-menu .el-button-text {
        width: 422px !important;
        float: right !important;
        margin-top: 10px !important;
        /* margin-left: 1400px; */
        font-size: 12px !important;
    }

    .common-alarmDel-menu .el-button-text button:nth-of-type(1),
    .common-alarmDel-menu button:nth-of-type(2) {
        width: 73px;
    }

    .common-alarmDel-menu .el-button-text button:nth-of-type(3) {
        width: 150px;
    }

    .common-alarmDel-menu .el-button-text button:nth-of-type(4) {
        width: 105px;
    }

    /* 按钮图标设置 */

    .common-alarmDel-menu .el-button-text .img-3 {
        display: inline-block;
        width: 13px;
        height: 12px;
        margin-right: 5px;
        position: relative;
        top: 1px;
    }

    .common-alarmDel-body .el-table__body {
        /* margin-top: 10px; */
        border-radius: 4px !important;
    }

    .common-alarmDel-body .el-table__body tr {
        height: 30px !important;
    }

    .common-alarmDel-table .el-table {
        margin-left: 10px !important;
        width: 100% !important;
        border: 1px solid rgba(237, 241, 245, 1) !important;
    }

    .common-alarmDel-body .el-table td,
    .el-table th {
        padding: 2px !important;
    }

    .common-alarmDel-body .icon {
        width: 2em !important;
        height: 2em !important;
        color: #5eaee3 !important;
    }

    .common-alarmDel-body .common-alarmDel-handlebox {
        /* margin-bottom: 20px; */
        width: 97.8% !important;
        height: 50px !important;
        line-height: 50px !important;
        padding-left: 10px !important;
        font-size: 12px !important;
        color: #5a5e66;
    }
    .common-alarmDel-body .handle-select {
        width: 8.4% !important;
        height: 32px !important;
        margin: 0 8px !important;
    }

    .common-alarmDel-body .handle-input {
        width: 280px !important;
        display: inline-block !important;
    }

    .common-alarmDel-body .el-input--small .el-input__inner {
        height: 32px !important;
        line-height: 32px !important;
    }

    .common-alarmDel-body .el-input__inner {
        box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1) !important;
    }
    .common-alarmDel-body .el-table {
        color: #909090 !important;
    }

    .common-alarmDel-body .el-table th>.cell {
        font-size: 14px !important;
        font-family: PingFang-SC-Medium !important;
        font-weight: 700 !important;
        color: rgba(30, 30, 30, 1) !important;
    }

    .common-alarmDel-body .el-table .cell {
        font-size: 12px !important;
        font-family: PingFang-SC-Bold !important;
    }

    .common-alarmDel-body .el-table--enable-row-hover .el-table__body tr:hover>td {
        background: #2f95f4 !important;
        color: #fff;
    }

    .common-alarmDel-body .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #f6f8f9 ;
    }

    .common-alarmDel-table .img-1 {
        width: 11px;
        height: 15px;
        vertical-align: middle;
    }

    .common-alarmDel-table .img-2 {
        margin-right: 14px;
    }
    /* .common-alarmDel-body .el-input__inner{
        height: 28px !important;
        line-height: 28px !important;
    } */

    /* 查询按钮 */

    .common-alarmDel-handlebox .button-info {
        display: inline-block;
        width: 68px;
        height: 29px;
        background-color: #2f95f4;
        color: #fff;
        border: 1px solid;
        border-radius: 4px;
        float: right;
        margin-top: 10px;
        line-height: 29px;
        cursor:pointer;
    }
    .common-alarmDel-handlebox .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 280px !important;
    }
    
    table {
        padding-top: 0!important;
    }

    select::-ms-expand {
        display: none !important;
    }

    .common-alarmDel-handlebox .el-range-editor.el-input__inner {
        padding:0px 10px !important;
    }
    .common-alarmDel-handlebox .el-input__icon{
        height: 28px !important;
    }
    .common-alarmDel-handlebox .el-date-editor {
        top:3px !important;
    }
    .common-alarmDel-handlebox .el-date-editor .el-range-separator{
        line-height: 25px !important;
        color: #5A5E66;
    }
    .common-alarmDel-handlebox .el-cascader  {
        line-height: 28px !important;
    }
    .common-alarmDel-handlebox .el-select {
        /* display: block; */
        position: relative !important;
        width: 133px !important;
    }
    /* .common-alarmDel-body .el-input--suffix .el-input__inner{height: 40px !important;line-height: 40px !important; padding-right: 10px !important;} */
    .common-alarmDel-handlebox .el-form-item {
        display: inline-flex !important;
        height: 28px !important;
        position: relative !important;
        top: -20px !important;
        margin-bottom: 0px !important;
    }
    .common-alarmDel-body .el-form-item__label{
        height: 28px !important;
        line-height: 28px !important;
    }
    .common-alarmDel-handlebox .el-form-item__content{
        height: 28px !important;
        line-height: 28px !important;
    }
    .common-alarmDel-body .el-form-item__label .el-form-item__content{
        
        line-height: 28px !important;
    }
    .common-alarmDel-table .el-dialog--center{
        height: 520px !important;
        border-radius:4px !important;
    }
    .common-alarmDel-table .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
        padding-left: 0px !important;
    }
    .common-alarmDel-table .el-table .cell, .el-table th div{
        padding-left: 0px !important;
    }
    .common-alarmDel-body .child-alarm-dialog {
        position: absolute;
        top: 180px;
        right: 30%;
        width: 570px;
        height: auto;
        background-color: #fff;
        z-index: 10;
        box-shadow:0px 2px 10px 0px rgba(17,105,252,0.16);
    }
    .common-alarmDel-body .el-tag--small {
        height: 16px;
        padding: 0 8px;
        line-height: 14px;
    }
    /* 窗口头部 */
    .common-alarmDel-body .alarm-dialog-header {
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
    .common-alarmDel-body .alarm-edit {
        /* height: 370px; */
        width: auto;
        box-sizing: content-box;
        padding: 3px 16px 0 16px;
        color:#5A5E66;
    }
    .alarm-edit .el-form-item{
        margin-bottom: 8px;
    }
    /* .alarm-edit .el-input__inner{
        height: 28px;
        line-height: 28px;
    } */
    .alarm-edit .el-form-item__label{
        line-height: 30px;
    }
    .alarm-edit  .el-form-item__content{
        width:360px;
        line-height: 30px;
    }
    .common-alarmDel-body .child-alarm-dialog .el-input__icon{
        line-height: 28px;
    }
    .common-alarmDel-body .button-handle{
        width: 170px;
        margin: 10px auto;
    }
</style>