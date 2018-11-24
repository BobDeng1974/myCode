<!--   
    name：紧急避险设备档案界面
    desc：紧急避险主界面
    param：None        
    return Value : None
    author：suny
    date：2018.10.10
-->
<template>

    <div class="common-device-body">
        <div style="padding-left:10px;height:22px;padding-top:8px;border-bottom:1px solid rgba(232,238,243,1);box-shadow:0px 2px 6px 0px rgba(47,149,244,0.13);">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>终端管理</el-breadcrumb-item>
                <el-breadcrumb-item>设备档案</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <div class="common-device-formbox">
            <div class="common-device-handlebox">
                <el-form :model="ruleForm" ref="ruleForm">
                    设备名称：<input class="sys-common-input" placeholder="请输入设备名称" v-model="ruleForm.deviceMakerBrand"> 
                    设备编号：<input class="sys-common-input" placeholder="请输设备编号" v-model="ruleForm.deviceNum"> 
                    <button type="button" class="button-info" @click="search();" >查询</button>
                </el-form>
                
            </div>
        </div>
        <div class="common-device-menu">
            <div class="el-button-text">
                <button type="button" class="button-info-2" @click="exportExcel()">
                    <img src="../../../../../../../static/img/jjbx/vehicle/dc.png" class="img-3">导出</button>
                <button type="button" class="button-info-2" @click="goAdd();">
                    <img src="../../../../../../../static/img/jjbx/vehicle/tj.png" class="img-3">添加</button>
            </div>
        </div>
        <div class="common-device-table" >
            <el-table id="out-table" :data="tableData" :highlight-current-row="true" :stripe="true" :header-cell-style="{background:'rgba(238,245,251,1)'}"
                height="calc( 100% - 70px )" :row-class-name="onSetRowIndex" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut"
                @cell-dblclick="handleDbl">
                <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80px">
                </el-table-column>
                <!-- <el-table-column prop="name" align="center" label="详情" width="100">
                    <template slot-scope="scope">
                        <img v-if="scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/xq.png" class="img-1" @click="goDetail(scope.$index, scope.row);">
                        <img v-if="!scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/xq2.png" class="img-1" @click="goDetail(scope.$index, scope.row);">
                    </template>
                </el-table-column> -->
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
                <el-table-column show-overflow-tooltip prop="modelNum" align="left" label="型号" >
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="deviceMakerBrand" align="left" label="设备名称">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="deviceType" align="left" label="设备类型" >
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="devicePrice" align="left" label="设备价格" >
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="deviceNum" align="left" label="设备编号" >
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="deviceSize" align="left" label="设备尺寸" >
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="deviceSpec" align="left" label="设备规格" >
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="status" align="left" label="状态" >
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="deviceBuy" align="left" label="购买时间" >
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="deviceCompanyName" align="left" label="设备公司名称"  >
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="deviceMaker" align="left" label="制造商"  >
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="deviceCode" align="left" label="产品代码" >
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="deviceHvn" align="left" label="设备硬件版本号" >
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="deviceSvn" align="left" label="设备软件版本号" >
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="deviceCustomerCode" align="left" label="设备客户代码" >
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange"  :current-page.sync="cur_page"
                    layout="total,prev, pager, next"
                    :total="totalElements" :page-size="pageSize">
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
                uid: this.$router.id,
                delVisible: false,
                tableData: [],
                isIndeterminate: false,
                pageSize:20,
                cur_page: 1,
                totalElements: 0, //总条数
                is_search: false,
                ruleForm: {
                    deviceMaker: '',
                    deviceMakerBrand:'',
                    deviceCompanyName: '',
                    deviceCode: '',
                    deviceHvn: '',
                    deviceSvn: '',
                    deviceCustomerCode: '',
                    modelNum: '',
                    deviceType: '',
                    devicePrice: '',
                    deviceNum: '',
                    deviceSize: '',
                    deviceSpec: '',
                    status: '',
                    deviceBuy: ''  
                },
                idx: -1,
                idx2: -1,
            };
        },
        created() {
            let _this = this;
            this.getData();
        },
        mounted() {
            let _this = this; 
            if (_this.$route.query.temp) { 
                _this.cur_page = _this.$route.query.temp; 
            } 
            this.getData();
        }, 
        methods: {
            exportExcel () {
                /* generate workbook object from table */
                var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
                /* get binary string as output */
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '设备档案表.xlsx')
                } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                return wbout
            },
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
            handleDbl: function (row, event, column) {
                var index = row.index;
                this.goDetail(index, row);
            },
            /**
                     * @function {function name}
                     * @param  {type} formName {currentPage,pageSize}
                    //  * @return {type} {车辆列表 , 总数}
                     */
            getData() {
                let _this = this;
                var data = [];
                let url = _this.global_.apiUrlJj + "/get/device?currentPage=" + _this.cur_page + "&pageSize="+_this.pageSize;


                ajax.get(url).then(function (res) {
                    if (_this.$route.query.temp) {
                        _this.cur_page = _this.$route.query.temp;
                        _this.$route.query.temp = "";
                    }
                        for (let i = 0; i < res.data.data.content.length; i++) {
                            var obj = {};
                            obj.deviceMaker = res.data.data.content[i].deviceMaker;
                            obj.deviceMakerBrand = res.data.data.content[i].deviceMakerBrand;
                            obj.deviceCompanyName = res.data.data.content[i].deviceCompanyName;
                            obj.deviceCode = res.data.data.content[i].deviceCode;
                            obj.deviceHvn = res.data.data.content[i].deviceHvn;
                            obj.deviceSvn = res.data.data.content[i].deviceSvn;
                            obj.deviceCustomerCode = res.data.data.content[i].deviceCustomerCode;
                            obj.modelNum = res.data.data.content[i].modelNum;
                            obj.deviceType = res.data.data.content[i].deviceType;
                            obj.devicePrice = res.data.data.content[i].devicePrice;
                            obj.deviceNum = res.data.data.content[i].deviceNum;
                            obj.deviceSize = res.data.data.content[i].deviceSize;
                            obj.deviceSpec = res.data.data.content[i].deviceSpec;
                            obj.status = res.data.data.content[i].status;
                            obj.deviceBuy = res.data.data.content[i].deviceBuy;
                            obj.isSele = res.data.data.content[i].isSele;
                            obj.id = res.data.data.content[i].id;
                            data[i] = obj;
                        }
                        _this.tableData = data;
                        _this.totalElements = res.data.data.number;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            trim(str){
                   return str.replace(/\s+/g,"");
            },
            search() {
                let _this = this;

                var data = [];
                
                let deviceMakerBrand= _this.ruleForm.deviceMakerBrand;
                let deviceNum= _this.ruleForm.deviceNum;
                let pp=this.trim(deviceMakerBrand);
                let oo=this.trim(deviceNum);
                if(pp!=""&&oo==""){
                    var url = _this.global_.apiUrlJj + "/get/device?currentPage=1&pageSize="+_this.pageSize+"&deviceMakerBrand="+pp;
                }else if(pp!=""&&oo!=""){
                    var url = _this.global_.apiUrlJj + "/get/device?currentPage=1&pageSize="+_this.pageSize+"&deviceMakerBrand="+pp+"&deviceNum="+oo;
                }else if(pp==""&&oo!=""){
                    var url = _this.global_.apiUrlJj + "/get/device?currentPage=1&pageSize="+_this.pageSize+"&deviceNum="+oo;
                }
                else{
                    var url = _this.global_.apiUrlJj + "/get/device?currentPage=1&pageSize="+_this.pageSize;
                }
                
                ajax.get(url).then(function (res) {
                    for (let i = 0; i < res.data.data.content.length; i++) {
                        var obj = {}
                        obj.maker = res.data.data.content[i].maker;
                            obj.deviceMaker = res.data.data.content[i].deviceMaker;
                            obj.deviceMakerBrand = res.data.data.content[i].deviceMakerBrand;
                            obj.deviceCompanyName = res.data.data.content[i].deviceCompanyName;
                            obj.deviceCode = res.data.data.content[i].deviceCode;
                            obj.deviceHvn = res.data.data.content[i].deviceHvn;
                            obj.deviceSvn = res.data.data.content[i].deviceSvn;
                            obj.deviceCustomerCode = res.data.data.content[i].deviceCustomerCode;
                            obj.modelNum = res.data.data.content[i].modelNum;
                            obj.deviceType = res.data.data.content[i].deviceType;
                            obj.devicePrice = res.data.data.content[i].devicePrice;
                            obj.deviceNum = res.data.data.content[i].deviceNum;
                            obj.deviceSize = res.data.data.content[i].deviceSize;
                            obj.deviceSpec = res.data.data.content[i].deviceSpec;
                            obj.status = res.data.data.content[i].status;
                            obj.deviceBuy = res.data.data.content[i].deviceBuy;
                            obj.isSele = res.data.data.content[i].isSele;
                            obj.id = res.data.data.content[i].id;
                            data[i] = obj;
                    }
                    _this.tableData = data;
                    _this.totalElements = res.data.data.number;
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleEdit(index, row) {
                let _this = this;
                let id = row.id
                this.getId(id);
                
            },
            getId(val) {
                let _this = this;
                let id = val;
                let page = _this.cur_page
                _this.$router.push({name:'sm_device_deviceedit', query: { userId: id,page: page }});
            },
            goAdd() {
                let _this = this;
                _this.$router.push({ name: "sm_device_deviceadd" });
            },
            goDetail(index, row) {
                let _this = this;
                _this.$router.push({
                    // path: "/jjbx/SysManage/VehicleManage/vehicle/CarDetails",
                    name: "sm_vehicle_CarDetails",
                    params: { id: _this.tableData[row.index].id }
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
                this.delVisible = true;
            },
            //确定删除
            deleteRow(idx) {
                let _this = this;
                this.tableData.splice(this.idx, 1);
                ajax
                    .delete(_this.global_.apiUrlJj + "/del/delete-device?id=" + _this.idx2)
                    .then(function (res) {
                        console.log(res);
                        if(res.data.isSuccess){
                            _this.$message.success("删除成功！");
                            if(((_this.totalElements-1)/_this.pageSize)%1==0){
                                _this.cur_page=_this.cur_page-1
                             }
                            _this.getData();
                        }else{
                            _this.$message.success("删除失败！");
                        }
                    });
                _this.delVisible = false;
            },
            
        }
    };
</script>
<style>
    /* 设置滚动条的样式 */
     scrollbar-base-color{
        width: 5px;
        background: #E7EAEE
    } 
    /* 表格整体布局 */
    .common-device-table{
		/*scrollbar-arrow-color: #f4ae21; *//*三角箭头的颜色*/ 
		 /*scrollbar-face-color: #333;*//*立体滚动条的颜色*/ 
		/*scrollbar-3dlight-color: #666; *//*立体滚动条亮边的颜色*/ 
		/*scrollbar-highlight-color: #666; *//*滚动条空白部分的颜色*/ 
		/*scrollbar-shadow-color: #999; *//*立体滚动条阴影的颜色*/ 
		/*scrollbar-darkshadow-color: #666; *//*立体滚动条强阴影的颜色*/ 
		/*scrollbar-track-color: #666; *//*立体滚动条背景颜色*/ 
		/*scrollbar-base-color:#f8f8f8; *//*滚动条的基本颜色*/ 
        width:98%;height:calc( 100% - 120px );
	}
    /*定义滚动条的轨道颜色、内阴影及圆角*/
    .common-device-table ::-webkit-scrollbar-track { 
        background-color: #E7EAEE !important; 
    }

    /*定义滑块颜色、内阴影及圆角*/
    .common-device-table ::-webkit-scrollbar-thumb {
        border-radius: 17px !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3) !important;
        background-color: #fff !important;
    }

    /*定义两端按钮的样式*/
    .common-device-table ::-webkit-scrollbar-button {
        background-color: #E7EAEE !important;
    }

    /*定义右下角汇合处的样式*/
    .common-device-table ::-webkit-scrollbar-corner {
        background:#E7EAEE !important;
    }

    /* 整体布局 */
    .common-device-body{height:calc( 100% - 96px );
    }
    /* 表单整体背景 */
    .common-device-formbox{
        width:100%;
        background-color:#F8F8F8;
    }
    /* .demo-form-inline{padding-top:0.5%;} */
    /* .el-select{width: 60%} */
    
    /* 操作按钮整体布局 */
    .common-device-menu{height:50px;width:97.8%;background-color:#FFFFFF;border:none;padding-left: 10px ;}
    /* 按钮左对齐 */
    .el-button--primary.is-plain{width: 68px !important;height: 32px !important; float: left !important;background: #2F95F4 !important;color: #fff !important;}
    .common-device-menu .el-button-text{ 
        /* width:97.8% !important; */
        float:right !important;
        text-align: right !important;
        margin-top:10px !important;
        /* margin-left: 1400px; */
        font-size: 12px !important;
        }
    .common-device-menu .el-button-text button:nth-of-type(1),.common-device-menu button:nth-of-type(2){
        width: 73px;
    }
    .common-device-menu .el-button-text button:nth-of-type(3){
        width: 150px;
    }
    .common-device-menu .el-button-text button:nth-of-type(4){
        width: 105px;
    }
    /* 按钮图标设置 */
    .common-device-menu .el-button-text .img-3{display:inline-block;width:13px;height:12px;margin-right: 5px;position: relative;top: 1px;}
    .common-device-body .el-table__body {
        /* margin-top: 10px; */
        border-radius: 4px !important;
    }

    .common-device-body .el-table__body tr {
        height: 30px !important;
    }
    .common-device-table .el-table{width: 100% !important;border:1px solid rgba(237,241,245,1) !important;margin-left: 10px !important;}
    .common-device-body .el-table td,
    .el-table th {
        padding: 2px !important;
    }

    .common-device-body .icon {
        width: 2em !important;
        height: 2em !important;
        color: #5eaee3 !important;
    }

    .common-device-body .common-device-handlebox {
        /* margin-bottom: 20px; */
        width: 97.8% !important;
        height: 50px !important;
        line-height: 50px !important;
        padding-left: 10px !important;
        font-size: 12px !important;
        color: #5A5E66;
    }
    .common-device-handlebox .common-device-input{
        height:25px;width:133px;color:#B4BCCC;border-radius:4px;border: 1px solid;margin-right:12px;font-size:12px;
    }
    .common-device-handlebox .common-device-select{
        height:28px;width:133px;color:#B4BCCC;border-radius:4px;margin-right:12px;font-size:12px;
    }
    .common-device-body .handle-select {
        width: 8.4% !important;
        height: 32px !important;
        margin: 0 8px !important;
    }

    .common-device-body .handle-input {
        width: 280px !important;
        display: inline-block !important;
    }

    .common-device-body .el-input--small .el-input__inner {
        height: 32px !important;
        line-height: 32px !important;
    }

    .common-device-body .el-input__inner {
        box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1) !important;
    }

    .common-device-body .el-input--suffix .el-input__inner {
        padding-right: 10px !important;
    }

    .common-device-body .el-table  { 
        color: #333 !important;
    }
    .common-device-body .el-table th>.cell {
        font-size: 12px !important;
        font-family: PingFang-SC-Medium !important;
        font-weight: 700 !important;
        color: rgba(30, 30, 30, 1) !important;
    }

    .common-device-body .el-table .cell {
        font-size: 12px !important;
        font-family: PingFang-SC-Bold !important;   
    }

    .common-device-body .el-table--enable-row-hover .el-table__body tr:hover>td {
        background: #2f95f4 !important;
        color: #fff;
    }

    .common-device-body .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #f6f8f9 ;
    }
    .common-device-table .img-1{width:11px;height:15px;vertical-align: middle;}
    .common-device-table .img-2{margin-right:14px;}
    /* 查询按钮 */
    .common-device-handlebox .button-info{
        display: inline-block;
        width: 73px !important;
        height: 29px;
        background-color: #2F95F4;
        color: #fff;
        border: 1px solid;
        border-radius: 4px;
        float: right;
        margin-top: 10px;
        line-height: 29px;
    }
    .common-device-menu .button-info-2{
        display: inline-block;height: 29px;background-color: #2F95F4;color: #fff;border: 1px solid;border-radius: 4px;
    }
    .common-device-body .el-input--suffix .el-input__inner{
        height: 28px !important;
        line-height: 28px !important;
    }
    .common-device-body .el-input__icon{
        line-height: 28px !important;
    }
    .common-device-body .el-cascader{
        line-height: 28px !important;
    }
    .common-device-table .el-table td, .el-table th.is-leaf {
        border-right: 1px solid #ebeef5 !important;
    }
</style>