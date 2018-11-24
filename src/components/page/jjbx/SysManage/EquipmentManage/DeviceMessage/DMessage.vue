<!--   
    name：紧急避险设备消息管理
    desc：紧急避险主界面
    param：None        
    return Value : None
    author：qiaoyh
    date：2018.11.14
-->
<template>

    <div class="common-dmessage-body">
        <div style="padding-left:10px;height:22px;padding-top:8px;border-bottom:1px solid rgba(232,238,243,1);box-shadow:0px 2px 6px 0px rgba(47,149,244,0.13);">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>终端管理</el-breadcrumb-item>
                <el-breadcrumb-item>设备消息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <div class="common-dmessage-formbox">
            <div class="common-dmessage-handlebox">
                <el-form :model="ruleForm" ref="ruleForm">
                    信息名称名称：<input class="sys-common-input" placeholder="请输入信息名称" v-model="ruleForm.organName"> 
                    <button type="button" class="button-info" @click="search();">查询</button>
                </el-form>
            </div>
        </div> -->
        <div class="common-dmessage-menu">
            <div class="el-button-text">
                <button type="button" class="button-info-2" @click="exportExcel()">
                    <img src="../../../../../../../static/img/jjbx/vehicle/dc.png" class="img-3">导出</button>
                <button type="button" class="button-info-2" @click="goAdd();">
                    <img src="../../../../../../../static/img/jjbx/vehicle/tj.png" class="img-3">添加</button>
            </div>
        </div>
        <div class="common-dmessage-table" v-loading="deptLoad">
            <el-table id="out-table" :data="tableData" :highlight-current-row="true" :stripe="true" :header-cell-style="{background:'rgba(238,245,251,1)'}"
                height="calc( 100% - 70px )" :row-class-name="onSetRowIndex" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80">
                </el-table-column>
                <!-- <el-table-column prop="name" align="center" label="详情">
                    <template slot-scope="scope">
                        <img v-if="scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/xq.png" class="img-1" @click="goDetail(scope.$index, scope.row);">
                        <img v-if="!scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/xq2.png" class="img-1" @click="goDetail(scope.$index, scope.row);">
                    </template>
                </el-table-column> -->
                <el-table-column prop="province" align="center" label="操作" >
                    <template slot-scope="scope">
                        <img v-if="scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/bj.png" class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)">
                        <img v-if="!scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/bj2.png" class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)">
                        <img v-if="scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/sc.png" @click="handleDelete(scope.$index, scope.row)"
                            class="img-1">
                        <img v-if="!scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/sc2.png" @click="handleDelete(scope.$index, scope.row)"
                            class="img-1">
                    </template>
                </el-table-column>
                <el-table-column prop="mergerName" align="left" label="信息名称" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="shortName" align="left" label="简称" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="fromDevice" align="left" label="数据来自哪个设备" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="content" align="left" label="内容"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="sense" align="left" label="传感"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="perform" align="left" label="执行" :show-overflow-tooltip="true">
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div> -->
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :page-size="20"  layout="total, prev, pager, next" :total="totalElements">
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
                tableData: [],
                cur_page: 1,
                pageSize:20,
                totalElements: 0, //总条数
                delVisible: false,
                ruleForm: {
                    organName: "",
                    leaderName: ""
                },
                idx2: -1,
                deptLoad:false,
            };
        },
        created() {
            let _this = this;
            this.search();
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                let _this = this;
                this.cur_page = val;
                this.getData();
            },
            /**
             * @function {获取下一行}
             * @param  {number} index {行索引}
             * @return {number} {下一行索引}
             */
            indexMethod(index) {
                return index + 1;
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
                    //  * @return {type} {车辆列表 , 总数}
                     */
            getData() {
                let _this = this;
                _this.deptLoad = true;
                var data = [];
                // let param = {
                //     organName: _this.ruleForm.organName,
                //     leaderName: _this.ruleForm.leaderName
                // };
                // console.log(param);
                ajax.get(_this.global_.apiUrlJj + "/get/adas-dict?currentPage=" + _this.cur_page + "&pageSize=" + _this.pageSize)
                    .then(function (res) {
                        console.log(res);
                        _this.deptLoad = false;
                        res.data.data.content.forEach((item,index)=>{
                            var obj = {};
                            obj.shortName = item.shortName;
                            obj.mergerName = item.mergerName;
                            obj.fromDevice = item.fromDevice;
                            obj.content = item.content;
                            obj.sense = item.sense;
                            obj.perform = item.perform;
                            obj.isSele = item.isSele;
                            obj.id = item.id;
                            data[index] = obj;
                        });
                        _this.tableData = data;
                        console.log(_this.tableData);
                        _this.totalElements = res.data.data.totalElements;
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
                _this.$router.push({
                    // path: "/jjbx/SysManage/VehicleManage/vehicle/CarEdit",
                    name: "sm_dmessage_dmessageEdit",
                    params: { id: _this.tableData[row.index].id }
                });
            },
            goAdd() {
                let _this = this;
                _this.$router.push({ name: "sm_dmessage_dmessageAdd" });
            },
            /**
             * @function {删除}
             * @param  {type} index {description}
             * @param  {type} row   {description}
             * @return {type} {description}
             */
            handleDelete(index, row) {
                let _this = this;
                _this.idx2 = _this.tableData[row.index].id;
                this.delVisible = true;
            },
            //确定删除
            deleteRow(idx) {
                let _this = this;
                ajax.delete(_this.global_.apiUrlJj + "/del/delete-adas-dict?id=" + _this.idx2)
                    .then(function (res) {
                        console.log(res);
                        if(res.data.isSuccess){
                            _this.$message.success("删除成功！");
                            _this.getData();
                        }else{
                            _this.$message.success("删除失败！");
                        }
                    });
                this.delVisible = false;
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
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '车队档案表.xlsx')
                } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                return wbout
            },
        },
        //详情页返回列表页时不刷新页面，其他情况下是需要刷新的,主页跳转到其他页面时把主页的keepAlive值设置为false
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
        width: 5px !important;

        background: #e7eaee !important;
    }

    /* 表格整体布局 */

    .common-dmessage-table {
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

    .common-dmessage-table ::-webkit-scrollbar-track {
        background-color: #e7eaee !important;
    }

    /*定义滑块颜色、内阴影及圆角*/

    .common-dmessage-table ::-webkit-scrollbar-thumb {
        border-radius: 17px !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
        background-color: #fff !important;
    }

    /*定义两端按钮的样式*/

    .common-dmessage-table ::-webkit-scrollbar-button {
        background-color: #e7eaee !important;
    }

    /*定义右下角汇合处的样式*/

    .common-dmessage-table ::-webkit-scrollbar-corner {
        background: #e7eaee !important;
    }

    /* 整体布局 */

    .common-dmessage-body {
        margin-left: 10px;
        height: calc(100% - 125px);
    }

    .common-dmessage-body {
        box-sizing: content-box;
        margin-left: 10px;
        /* height: calc(100% - 96px); */
    }

    /* 表单整体背景 */

    .common-dmessage-formbox {
        width: 100%;
        background-color: #f8f8f8;
    }

    /* .demo-form-inline{padding-top:0.5%;} */

    /* .el-select{width: 60%} */

    /* 操作按钮整体布局 */

    .common-dmessage-menu {
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

    .common-dmessage-menu .el-button-text {
        width: 167px !important;
        float: right !important;
        margin-top: 10px !important;
        /* margin-left: 1400px; */
        font-size: 12px !important;
    }

    .common-dmessage-menu .el-button-text button:nth-of-type(1),
    .common-dmessage-menu button:nth-of-type(2) {
        width: 73px;
    }

    .common-dmessage-menu .el-button-text button:nth-of-type(3) {
        width: 150px;
    }

    .common-dmessage-menu .el-button-text button:nth-of-type(4) {
        width: 105px;
    }

    /* 按钮图标设置 */

    .common-dmessage-menu .el-button-text .img-3 {
        display: inline-block;
        width: 13px;
        height: 12px;
        margin-right: 5px;
        position: relative;
        top: 1px;
    }

    .common-dmessage-body .el-table__body {
        /* margin-top: 10px; */
        border-radius: 4px !important;
    }

    .common-dmessage-body .el-table__body tr {
        height: 35px !important;
    }

    .common-dmessage-table .el-table {
        width: 100% !important;
        border: 1px solid rgba(237, 241, 245, 1) !important;
    }

    .common-dmessage-body .el-table td,
    .el-table th {
        padding: 2px !important;
    }

    .common-dmessage-body .icon {
        width: 2em !important;
        height: 2em !important;
        color: #5eaee3 !important;
    }

    .common-dmessage-body .common-dmessage-handlebox {
        /* margin-bottom: 20px; */
        width: 96.8% !important;
        height: 50px !important;
        line-height: 50px !important;
        padding-left: 1.2% !important;
        font-size: 12px !important;
        color: #5a5e66;
    }

    /* .common-veh-handlebox .common-veh-input{
        height:25px;width:133px;color:#B4BCCC;border-radius:4px;border: 1px solid;margin-right:12px;font-size:12px;
    } */

    /* .common-veh-handlebox .common-veh-select{
        height:28px;width:133px;color:#B4BCCC;border-radius:4px;margin-right:12px;font-size:12px;
    } */

    .common-dmessage-body .handle-select {
        width: 8.4% !important;
        height: 32px !important;
        margin: 0 8px !important;
    }

    .common-dmessage-body .handle-input {
        width: 280px !important;
        display: inline-block !important;
    }

    .common-dmessage-body .el-input--small .el-input__inner {
        height: 32px !important;
        line-height: 32px !important;
    }

    .common-dmessage-body .el-input__inner {
        box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1) !important;
    }

    .common-dmessage-body .el-input--suffix .el-input__inner {
        padding-right: 10px !important;
    }

    .common-dmessage-body .el-table {
        color: #909090 !important;
        height: calc(100% - 0px) !important;
    }

    .common-dmessage-body .el-table th>.cell {
        font-size: 14px !important;
        font-family: PingFang-SC-Medium !important;
        font-weight: 700 !important;
        color: rgba(30, 30, 30, 1) !important;
    }

    .common-dmessage-body .el-table .cell {
        font-size: 12px !important;
        font-family: PingFang-SC-Bold !important;
    }

    .common-dmessage-body .el-table--enable-row-hover .el-table__body tr:hover>td {
        background: #2f95f4 !important;
        color: #fff;
    }

    .common-dmessage-body .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #f6f8f9 ;
    }

    .common-dmessage-table .img-1 {
        width: 11px;
        height: 15px;
        vertical-align: middle;
        cursor:pointer;
    }

    .common-dmessage-table .img-2 {
        margin-right: 14px;
    }
    .common-dmessage-body .el-table td, .el-table th.is-leaf{
        border-right: 1px solid #ebeef5 !important;
    }
    /* 查询按钮 */

    .common-dmessage-handlebox .button-info {
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

    .common-dmessage-menu .button-info-2 {
        display: inline-block;
        height: 29px;
        background-color: #2f95f4;
        color: #fff;
        border: 1px solid;
        border-radius: 4px;
        cursor:pointer;
    }

    table {
        padding-top: 0;
    }

    select::-ms-expand {
        display: none !important;
    }

    .common-dmessage-handlebox .el-input__icon {
        line-height: 28px !important;
    }

    .common-dmessage-handlebox .el-cascader .el-input,
    .el-cascader .el-input__inner {
      /*   height: 28px; */
    }
    .common-dmessage-handlebox .el-select {
        /* display: block; */
        position: relative !important;
        width: 133px !important;
    }
    .common-dmessage-body .el-input--suffix .el-input__inner{height: 28px !important;}
    .common-dmessage-handlebox .el-form-item {
        display: inline-flex !important;
        height: 28px !important;
        position: relative !important;
        top: -25px !important;
    }
</style>