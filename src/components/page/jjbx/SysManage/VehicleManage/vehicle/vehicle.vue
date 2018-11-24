<!--   
    name：紧急避险主车管理
    desc：紧急避险主界面
    param：None        
    return Value : None
    author：qiaoyh
    date：2018.9.3
-->
<template>

    <div class="common-veh-body">
        <div style="padding-left:10px;height:22px;padding-top:8px;border-bottom:1px solid rgba(232,238,243,1);box-shadow:0px 2px 6px 0px rgba(47,149,244,0.13);">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
                <el-breadcrumb-item>主车档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="common-veh-formbox">
            <div class="common-veh-handlebox">
                <el-form :model="ruleForm" ref="ruleForm">
                    车牌号:
                    <input class="sys-common-input" placeholder="请输入车牌号" v-model.trim="ruleForm.carnum"> 
                    <!-- 所属企业：<input class="sys-common-input" placeholder="请输入所属企业" v-model="ruleForm.company">  -->
                    所属机构:
                    <el-cascader :options="options" filterable clearable
    change-on-select v-model="ruleForm.orgname" class="sys-common-select" :props="props"></el-cascader>
                    <!-- 车辆状态： -->
                    <!-- <select class="sys-common-select" v-model="ruleForm.carstates">
                        <option value="" class="sys-common-option">请选择</option>
                        <option class="sys-common-option" v-for="item in selectStatus" :key="item.id" :value="item.id">{{item.text}}
                        </option>
                    </select> -->
                    <el-form-item label="车辆状态:" prop="carStates">
                            <el-select v-model="ruleForm.carStates" placeholder="请选择" clearable>
                                <el-option v-for="item in selectStatus" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                            </el-select>
                    </el-form-item>
                    <span>{{ruleForm.carstates}}</span>
                    <button type="button" class="button-info" @click="search();">查询</button>
                </el-form>

            </div>
        </div>
        <div class="common-veh-menu">
            <div class="el-button-text">
                <button type="button" class="button-info-2" @click="exportExcel()">
                    <img src="../../../../../../../static/img/jjbx/vehicle/dc.png" class="img-3">导出</button>
                <button type="button" class="button-info-2" @click="goAdd();">
                    <img src="../../../../../../../static/img/jjbx/vehicle/tj.png" class="img-3">添加</button>
                <!-- <button type="button" class="button-info-2">
                    <img src="../../../../../../../static/img/jjbx/vehicle/pl.png" class="img-3">批量设置百公里油耗</button>
                <button type="button" class="button-info-2">
                    <img src="../../../../../../../static/img/jjbx/vehicle/xl.png" class="img-3">表格列设置</button> -->
                <!-- <el-button type="primary" plain size="small" style="width: 68px;height: 29px;line-height:10px;"><img src="../../../../../static/img/jjbx/vehicle/dc.png" class="img-3" > 导出</el-button>
                <el-button class="el-icon-plus" type="primary" plain size="small" style="width: 68px;height: 29px;">添加</el-button>
                <el-button type="primary" plain size="small" style="width: 150px;height: 29px;"><img src="../../../../../static/img/jjbx/vehicle/pl.png" class="img-3"> 批量设置百公里油耗</el-button>
                <el-button type="primary" plain size="small" style="width: 105px;height: 29px;"><img src="../../../../../static/img/jjbx/vehicle/xl.png" class="img-3"> 表格列设置</el-button> -->
            </div>
        </div>
        <div class="common-veh-table" v-loading="deptLoad">
            <el-table  id="out-table" :data="tableData" :highlight-current-row="true" :stripe="true"  :header-cell-style="{background:'rgba(238,245,251,1)'}"
                height="calc( 100% - 70px )" :row-class-name="onSetRowIndex" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut"
                @cell-dblclick="handleDbl">
                <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="60">
                </el-table-column>
                <el-table-column prop="name" align="center" label="详情" width="60">
                    <template slot-scope="scope">
                        <img v-if="scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/xq.png" class="img-1" @click="goDetail(scope.$index, scope.row);">
                        <img v-if="!scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/xq2.png" class="img-1" @click="goDetail(scope.$index, scope.row);">
                    </template>
                </el-table-column>
                <el-table-column prop="province" align="center" label="操作">
                    <template slot-scope="scope">
                        <img v-if="scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/bj.png" class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)">
                        <img v-if="!scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/bj2.png" class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)">
                        <img v-if="scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/sc.png" @click="handleDelete(scope.$index, scope.row)"
                            class="img-1">
                        <img v-if="!scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/sc2.png" @click="handleDelete(scope.$index, scope.row)"
                            class="img-1">
                    </template>
                </el-table-column>
                <el-table-column prop="carNum" align="left" label="车牌号" :show-overflow-tooltip="true">
                </el-table-column>
                <!-- <el-table-column prop="companyName" align="center" label="所属企业" width="150" :show-overflow-tooltip="true">
                </el-table-column> -->
                <el-table-column prop="carOrgName" align="left" label="所属机构"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="carLength" align="left" label="车长" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="carCarriage" align="left" label="箱型" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="carVolume" align="left" label="额定体积" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="carWeight" align="left" label="额定载重" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="carStates" align="left" label="车辆状态" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="semiCarNum" align="left" label="挂车车牌号" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="fleetId" align="left" label="车队" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="carDriver1Id" align="left" label="第一司机"  :show-overflow-tooltip="true">
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div> -->
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" layout="total, prev, pager, next" :total="totalElements">
                </el-pagination>
            </div>
            <!-- 删除提示框 -->
            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteRow">确 定</el-button>
                </span>
            </el-dialog>
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
                // ok:[],
                // multipleSelection: [],
                props: {
                    value: "id"
                },
                selectOrg: [],
                selectStatus: [],
                tableData: [],
                options:[{
                    id:'',
                    label:'',
                    children:[{
                        id:'',
                        label:'',
                    }]
                }],
                cur_page: 1,
                pageSize:20,
                totalElements: 0, //总条数
                delVisible: false,
                ruleForm: {
                    carnum: "",
                    company: "",
                    orgname: [],
                    carStates: ""
                },
                idx: -1,
                idx2: -1,
                deptLoad:false,
            };
        },
        created() {
            let _this = this;
            _this.search();
            _this.getOrg();
            _this.getStatus();
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                let _this = this;
                _this.cur_page = val;
                _this.getData();
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
                let _this = this;
                var index = row.index;
                _this.tableData[row.index].isSele = true;
            },
            /**
             * @function {鼠标 hover 退出时触发事件}
             * @param  {type} row    {行}
             * @param  {type} event  {description}
             * @param  {type} column {列}
             * @return {type} {description}
             */
            handleMouseOut: function (row, event, column) {
                let _this = this;
                _this.tableData[row.index].isSele = false;
            },
            handleDbl: function (row, event, column) {
                let _this = this;
                var index = row.index;
                _this.goDetail(index, row);
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
                let param = {
                    carNum: _this.ruleForm.carnum,
                    companyName: _this.ruleForm.company,
                    carOrgCode: _this.ruleForm.orgname[_this.ruleForm.orgname.length-1],
                    carStates: _this.ruleForm.carStates
                };
                console.log(param);
                ajax.get(_this.global_.apiUrlJj +"/get/car?currentPage=" +_this.cur_page + "&pageSize="+ _this.pageSize, { params: param})
                    .then(function (res) {
                        console.log(res);
                        _this.deptLoad = false;
                        // for (let i = 0; i < res.data.data.content.length; i++) {
                        //     var obj = {};
                        //     obj.carNum = res.data.data.content[i].carNum;
                        //     obj.companyName = res.data.data.content[i].companyName;
                        //     obj.carOrgName = res.data.data.content[i].carOrgName;
                        //     obj.carLength = res.data.data.content[i].carLength;
                        //     obj.carCarriage = res.data.data.content[i].carCarriage;
                        //     obj.carDriver1Id = res.data.data.content[i].carDriver1Id;
                        //     obj.carStates = res.data.data.content[i].carStates;
                        //     obj.carVolume = res.data.data.content[i].carVolume;
                        //     obj.carWeight = res.data.data.content[i].carWeight;
                        //     obj.fleetId = res.data.data.content[i].fleetId;
                        //     obj.semiCarNum = res.data.data.content[i].semiCarNum;
                        //     obj.isSele = res.data.data.content[i].isSele;
                        //     obj.id = res.data.data.content[i].id;
                        //     data[i] = obj;
                        // }
                        res.data.data.content.forEach((item, index) => {
                            var obj = {};
                            obj.carNum = item.carNum;
                            obj.companyName = item.companyName;
                            obj.carOrgName = item.carOrgName;
                            obj.carLength = item.carLength;
                            obj.carCarriage = item.carCarriage;
                            obj.carDriver1Id = item.carDriver1Id;
                            obj.carStates = item.carStates;
                            obj.carVolume = item.carVolume;
                            obj.carWeight = item.carWeight;
                            obj.fleetId = item.fleetId;
                            obj.semiCarNum = item.semiCarNum;
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
            /**
             * @function {获取所属机构信息}
             * @return {string} {机构名称}
             */
            getOrg() {
                let _this = this;
                ajax.get(_this.global_.apiUrlJj + "/get/select-organ?id=5")
                    .then(function (res) {
                        console.log(res);
                        // var obj = {}
                        if (res.data) {
                            if (res.data.data) {
                                _this.options = res.data.data;
                            }
                        }
                    });
            },
            getStatus() {
                let _this = this;
                ajax.get(_this.global_.apiUrlJj + "/get/status?type=carStatus")
                    .then(function (res) {
                        console.log(res);
                        // var obj = {}
                        if (res.data) {
                            if (res.data.data) {
                                res.data.data.forEach((item, index) => {
                                    _this.selectStatus.push({
                                        id: item.id,
                                        text: item.dictNumName
                                    });
                                });
                            }
                        }
                    });
            },
            search() {
                let _this = this;
                _this.cur_page = 1;
                _this.getData();
            },
            handleEdit(index, row) {
                let _this = this;
                _this.$router.push({
                    // path: "/jjbx/SysManage/VehicleManage/vehicle/CarEdit",
                    name: "sm_vehicle_carEdit",
                    params: { id: _this.tableData[row.index].id }
                });
            },
            goAdd() {
                let _this = this;
                _this.$router.push({ name: "sm_vehicle_carAdd" });
            },
            goDetail(index, row) {
                let _this = this;
                _this.$router.push({
                    // path: "/jjbx/SysManage/VehicleManage/vehicle/CarDetails",
                    name: "sm_vehicle_CarDetails",
                    params: { id: _this.tableData[row.index].id, page:_this.cur_page}
                });
                console.log(_this.tableData[row.index].id);
            },
            /**
             * @function {删除}
             * @param  {type} index {description}
             * @param  {type} row   {description}
             * @return {type} {description}
             */
            handleDelete(index, row) {
                let _this = this;
                _this.idx = index;
                _this.idx2 = _this.tableData[row.index].id;
                _this.delVisible = true;
            },
            //确定删除
            deleteRow(idx) {
                let _this = this;
                // _this.tableData.splice(_this.idx, 1);
                ajax.delete(_this.global_.apiUrlJj + "/del/delete-car?id=" + _this.idx2)
                    .then(function (res) {
                        console.log(res);
                        if(res.data.isSuccess){
                            _this.$message.success("删除成功！");
                            _this.getData();
                        }else{
                            _this.$message.success("删除失败！");
                        }
                    });
                
                _this.delVisible = false;
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
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '主车档案表.xlsx')
                } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                return wbout
            },
        },
        /**
         * @function 详情页,编辑页返回列表页时不刷新页面，其他情况下是需要刷新的,主页跳转到其他页面时把主页的keepAlive值设置为false
         * @param  {type} to   {description}
         * @param  {type} from {description}
         * @param  {type} next {description}
         * @return {type} {description}
         */
        beforeRouteLeave(to, from, next) {
            from.meta.keepAlive = false;
            next();
        },
        mounted(){
            let _this = this;
            _this.search();
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

    .common-veh-table {
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

    .common-veh-table ::-webkit-scrollbar-track {
        background-color: #e7eaee;
    }

    /*定义滑块颜色、内阴影及圆角*/

    .common-veh-table ::-webkit-scrollbar-thumb {
        border-radius: 17px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #fff;
    }

    /*定义两端按钮的样式*/

    .common-veh-table ::-webkit-scrollbar-button {
        background-color: #e7eaee;
    }

    /*定义右下角汇合处的样式*/

    .common-veh-table ::-webkit-scrollbar-corner {
        background: #e7eaee;
    }

    /* 整体布局 */


    .common-veh-body {
        box-sizing: content-box;
        /* margin-left: 10px;
        margin-right: 10px; */
        height: calc(100% - 111px)!important;
    }

    /* 表单整体背景 */

    .common-veh-formbox {
        width: 100%;
        background-color: #f8f8f8;
    }

    /* .demo-form-inline{padding-top:0.5%;} */

    /* .el-select{width: 60%} */

    /* 操作按钮整体布局 */

    .common-veh-menu {
        height: 50px;
        width: 99.2%;
        background-color: #ffffff;
        border: none;
    }

    /* 按钮左对齐 */

    .el-button--primary.is-plain {
        width: 68px !important;
        height: 32px !important;
        float: left;
        background: #2f95f4;
        color: #fff;
    }

    .common-veh-menu .el-button-text {
        width: 158px !important;
        float: right;
        margin-top: 10px;
        /* margin-left: 1400px; */
        font-size: 12px;
    }

    .common-veh-menu .el-button-text button:nth-of-type(1),
    .common-veh-menu button:nth-of-type(2) {
        width: 73px;
    }

    .common-veh-menu .el-button-text button:nth-of-type(3) {
        width: 150px;
    }

    .common-veh-menu .el-button-text button:nth-of-type(4) {
        width: 105px;
    }

    /* 按钮图标设置 */

    .common-veh-menu .el-button-text .img-3 {
        display: inline-block;
        width: 13px;
        height: 12px;
        margin-right: 5px;
        position: relative;
        top: 1px;
    }

    .common-veh-body .el-table__body {
        /* margin-top: 10px; */
        border-radius: 4px !important;
    }

    .common-veh-body .el-table__body tr {
        height: 30px !important;
    }

    .common-veh-table .el-table {
        margin-left: 10px;
        width: 100% !important;
        border: 1px solid rgba(237, 241, 245, 1);
    }

    .common-veh-body .el-table td,
    .el-table th {
        padding: 2px !important;
    }

    .common-veh-body .icon {
        width: 2em !important;
        height: 2em !important;
        color: #5eaee3 !important;
    }

    .common-veh-body .common-veh-handlebox {
        /* margin-bottom: 20px; */
        width: 97.8% !important;
        height: 50px !important;
        line-height: 50px !important;
        padding-left: 10px !important;
        font-size: 14px !important;
        color: #5a5e66;
    }

    .common-veh-handlebox .common-veh-input{
        height:25px;width:133px;color:#B4BCCC;border-radius:4px;border: 1px solid;margin-right:12px;font-size:12px;
    }

    .common-veh-handlebox .common-veh-select{
        height:28px;width:133px;color:#B4BCCC;border-radius:4px;margin-right:12px;font-size:12px;
    }

    .common-veh-body .handle-select {
        width: 8.4% !important;
        height: 32px !important;
        margin: 0 8px !important;
    }

    .common-veh-body .handle-input {
        width: 280px !important;
        display: inline-block !important;
    }
    .common-veh-body .el-input{
        font-size: 12px;
    }
    .common-veh-body .el-input--small .el-input__inner {
        height: 32px !important;
        line-height: 32px !important;
    }

    .common-veh-body .el-input__inner {
        box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1) !important;
    }

    .common-veh-body .el-input--suffix .el-input__inner {
        padding-right: 10px !important;
    }

    .common-veh-body .el-table {
        color: #909090 !important;
    }

    .common-veh-body .el-table th>.cell {
        font-size: 14px !important;
        font-family: PingFang-SC-Medium !important;
        font-weight: 700 !important;
        color: rgba(30, 30, 30, 1) !important;
    }

    .common-veh-body .el-table .cell {
        font-size: 12px !important;
        font-family: PingFang-SC-Bold !important;
    }

    .common-veh-body .el-table--enable-row-hover .el-table__body tr:hover>td {
        background: #2f95f4 !important;
        color: #fff;
    }

    .common-veh-body .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #f6f8f9 ;
    }

    .common-veh-table .img-1 {
        width: 11px;
        height: 15px;
        vertical-align: middle;
        cursor:pointer;
    }

    .common-veh-table .img-2 {
        margin-right: 14px;
    }
    /* .common-veh-table .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
        padding-left: 0px !important;
    } */
    .common-veh-table .el-table td, .el-table th.is-leaf{
        border-right: 1px solid #ebeef5 !important;
    }
    /* .common-veh-table .el-table .cell, .el-table th div{
        padding-left: 0px !important;
    } */
    /* 查询按钮 */

    .common-veh-handlebox .button-info {
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

    .common-veh-menu .button-info-2 {
        display: inline-block;
        height: 29px;
        background-color: #2f95f4;
        color: #fff;
        border: 1px solid;
        border-radius: 4px;
        cursor:pointer;
    }

    table {
        padding-top: 0!important;
    }

    select::-ms-expand {
        display: none !important;
    }

    .common-veh-handlebox .el-input__icon {
        line-height: 28px !important;
    }

    .common-veh-handlebox .el-cascader  {
        line-height: 28px !important;
    }
    .common-veh-handlebox .el-select {
        /* display: block; */
        position: relative !important;
        width: 133px !important;
    }
    .common-veh-body .el-input--suffix .el-input__inner{height: 28px !important;line-height: 28px !important;}
    .common-veh-handlebox .el-form-item {
        display: inline-flex;
        height: 28px !important;
        position: relative !important;
        top: -20px !important;
        margin-bottom: 0px !important;
    }
    .common-veh-body .el-form-item__label{
        height: 28px !important;
        line-height: 28px !important;
    }
    .common-veh-body .el-form-item__content{
        height: 28px !important;
        line-height: 28px !important;
    }
    .common-veh-body .el-form-item__label .el-form-item__content{
        
        line-height: 28px !important;
    }
</style>