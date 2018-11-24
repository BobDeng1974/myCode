<!--   
    name：紧急避险驾驶员管理
    desc：紧急避险主界面
    param：None        
    return Value : None
    author：qiaoyh
    date：2018.9.3
-->
<template>

    <div class="common-driver-body">
        <div style="padding-left:10px;height:22px;padding-top:8px;border-bottom:1px solid rgba(232,238,243,1);box-shadow:0px 2px 6px 0px rgba(47,149,244,0.13);">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>人员管理</el-breadcrumb-item>
                <el-breadcrumb-item>驾驶员档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="common-driver-formbox">
            <div class="common-driver-handlebox">
                <form :model="ruleForm" ref="ruleForm">
                    姓名： <input  class="sys-common-input" placeholder="请输入姓名" v-model.trim="ruleForm.personName">
                    驾驶证号： <input class="sys-common-input" placeholder="请输入驾驶证号" v-model.trim="ruleForm.credentNum">
                    所属机构： <el-cascader :options="options" filterable clearable
                                    change-on-select v-model="ruleForm.orgname" class="sys-common-select" :props="props" @change="getOrganNameLabel();"></el-cascader>
                    <button type="button" class="button-info" @click="search();">查询</button>
                </form>
                
            </div>
        </div>
        <div class="common-driver-menu">
            <div class="el-button-text">
                <button type="button" class="button-info-2" @click="exportExcel()"><img src="../../../../../../../static/img/jjbx/vehicle/dc.png" class="img-3">导出</button>
                <button type="button" class="button-info-2" @click="goAdd();"><img src="../../../../../../../static/img/jjbx/vehicle/tj.png" class="img-3">添加</button>
                <!-- <button type="button" class="button-info-2"><img src="../../../../../../../static/img/jjbx/vehicle/pl.png" class="img-3">批量设置百公里油耗</button>
                <button type="button" class="button-info-2"><img src="../../../../../../../static/img/jjbx/vehicle/xl.png" class="img-3">表格列设置</button> -->
            </div>
        </div>
        <div class="common-driver-table" v-loading="deptLoad">
            <el-table id="out-table" :data="tableData" :highlight-current-row="true" :stripe="true" :header-cell-style="{background:'rgba(238,245,251,1)'}"
                height="calc( 100% - 70px )" :row-class-name="onSetRowIndex"
                @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" @cell-dblclick="handleDbl">
                <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="60">
                </el-table-column>  
                <el-table-column prop="name" align="center" label="详情" width="60">
                    <template slot-scope="scope">
                        <img v-if="scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/xq.png" class="img-1"
                         @click="goDetail(scope.$index, scope.row);">
                        <img v-if="!scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/xq2.png" class="img-1"
                         @click="goDetail(scope.$index, scope.row);">
                    </template>
                </el-table-column>
                <el-table-column prop="province" align="center" label="操作" width="80">
                    <template slot-scope="scope">
                        <img v-if="scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/bj.png" class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)">
                        <img v-if="!scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/bj2.png"  class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)">                         
                        <img v-if="scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/sc.png" @click="handleDelete(scope.$index, scope.row)" class="img-1">
                        <img v-if="!scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/sc2.png" @click="handleDelete(scope.$index, scope.row)" class="img-1">
                    </template>
                </el-table-column>
                <el-table-column prop="personName" align="left" label="姓名" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="sex" align="left" label="性别" >
                </el-table-column>
                <el-table-column prop="credentNum" align="left" label="驾驶证号"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="carDriverType" align="left" label="准驾车型" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="personWorknum" align="left" label="工号"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="phone" align="left" label="手机号"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="personIdcard" align="left" label="身份证号"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="personAddress" align="left" label="地址"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="personJoindate" align="left" label="入职日期"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="status" align="left" label="工作状态" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="organName" align="left" label="所属机构"  :show-overflow-tooltip="true">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :page-size="pageSize"  layout="total, prev, pager, next" :total="totalElements">
                </el-pagination>
            </div>
            <!-- 删除提示框 -->
            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteRow();">确 定</el-button>
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
                selectOrg: [],
                selectOrganNameLabel:'',//组织机构名称
                selectStatus: [],
                tableData: [],
                cur_page: 1,
                pageSize:20,
                options:[{
                    id:'',
                    label:'',
                    children:[{
                        id:'',
                        label:'',
                    }]
                }],
                props: {
                    value: "id"
                },
                totalElements: 0, //总条数
                delVisible: false,
                ruleForm: {
                    personName: '',
                    credentNum: '',
                    orgname: []
                },
                idx: -1,
                idx2:-1,
                deptLoad:false,
            };
        },
        created() {
            let _this = this;
           _this.search();
           _this.getOrg();
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                let _this = this;
                _this.cur_page = val;
                _this.getData();
            },
            /**
             * @function {获取下一行}
             * @param  {number} index {行索引}
             * @return {number} {下一行索引}
             */
            indexMethod(index) {
                return index + 1;
            },
            onSetRowIndex({
                row,
                rowIndex
            }) {
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
            /**
             * @function {鼠标双击时间}
             * @param  {type} row    {description}
             * @param  {type} event  {description}
             * @param  {type} column {description}
             * @return {type} {description}
             */
            handleDbl:function(row,event,column){
                let _this = this;
                var index = row.index;
                _this.goDetail(index, row);
            },
            goDetail(index, row) {
                let _this = this;
                _this.$router.push({
                    // path: "/jjbx/SysManage/VehicleManage/vehicle/DriverDetails",
                    name:'sm_driver_driverDetails',
                    params:{id: _this.tableData[row.index].id}
                });
                console.log(_this.tableData[row.index].id);
            },
            /**
             * @function {function name}
             * @param  {type} formName {currentPage,pageSize}
             * @return {type} {驾驶员列表 , 总数}
             */
            getData(){
                let _this = this;
                _this.deptLoad = true;
                var data = [];
                let  param = {
                        personName: _this.ruleForm.personName,
                        credentNum: _this.ruleForm.credentNum,
                        organName: _this.selectOrganNameLabel,
                };
                console.log(param);
                ajax.get(_this.global_.apiUrlJj + "/get/person-credent?currentPage="+_this.cur_page+"&pageSize=" + _this.pageSize,{params: param}
                ).then(function (res) {
                    console.log(res);
                    _this.deptLoad = false;
                    for (let i = 0; i < res.data.data.content.length; i++) {
                        var obj = {}
                        obj.personName = res.data.data.content[i].infoPersonEntity.personName
                        // if(res.data.data.content[i].infoPersonEntity.sex === "0"){
                        //     obj.sex ='男'
                        // }else{
                        //     obj.sex ='女'
                        // }
                        obj.sex = res.data.data.content[i].infoPersonEntity.sex
                        obj.credentNum = res.data.data.content[i].infoCredentEntity.credentNum
                        obj.personWorknum = res.data.data.content[i].infoPersonEntity.personWorknum
                        obj.phone = res.data.data.content[i].infoPersonEntity.phone
                        obj.personIdcard = res.data.data.content[i].infoPersonEntity.personIdcard
                        obj.personAddress = res.data.data.content[i].infoPersonEntity.personAddress
                        obj.personJoindate = res.data.data.content[i].infoPersonEntity.personJoindate
                        obj.companyName = res.data.data.content[i].fleetId
                        obj.status = res.data.data.content[i].status
                        obj.organName = res.data.data.content[i].infoPersonEntity.organName
                        obj.isSele = res.data.data.content[i].isSele
                        obj.id = res.data.data.content[i].personId
                        data[i] = obj
                    }
                    _this.tableData = data;
                    _this.totalElements = res.data.data.number;
                    console.log(_this.tableData);
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
            /**
         * @function 根据机构ID获取其名称
         * @return {type} {description}
         */
        getOrganNameLabel(){
            let _this = this;
            console.log(_this.ruleForm.carOrgName);
            if(_this.ruleForm.orgname.length === 0){_this.selectOrganNameLabel = ''}
            else{
                let str = _this.ruleForm.orgname;
                console.log(str[str.length-1]);
                ajax.get(_this.global_.apiUrlJj + "/get/select-organ-id?id=" + str[str.length-1])
                    .then(function (res) {
                        console.log(res);
                        if( res.data.data){
                            _this.selectOrganNameLabel = res.data.data.organName;
                            console.log(_this.selectOrganNameLabel);
                        }
                        // else{
                        //     _this.ruleForm.parentId = 0;
                        // }
                        
                    });
            }
            
            
        },
        handleEdit(index, row){
            let _this = this;
            _this.$router.push({
                // path: "/jjbx/SysManage/VehicleManage/vehicle/CarEdit",
                name:'sm_driver_driverEdit',
                params: {id:_this.tableData[row.index].id}
            });
        },
        goAdd(){
            let _this = this; 
            _this.$router.push({name:'sm_driver_addDriver'});
            
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
            // _this.tableData.splice(this.idx, 1);
            ajax.get(_this.global_.apiUrlJj + "/get/delete-person?id=" + _this.idx2)
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
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '驾驶员档案表.xlsx')
            } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
            return wbout
            console.log("aaa");
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
    },
    beforeMount(){
        let _this = this;
        _this.search();
    },
};
</script>
<style>
    /* 设置滚动条的样式 */
     scrollbar-base-color{
        width: 5px; 
        
        background: #E7EAEE
    }
 
    /* 表格整体布局 */
    .common-driver-table{
		/*scrollbar-arrow-color: #f4ae21; *//*三角箭头的颜色*/ 
		 /*scrollbar-face-color: #333;*//*立体滚动条的颜色*/ 
		/*scrollbar-3dlight-color: #666; *//*立体滚动条亮边的颜色*/ 
		/*scrollbar-highlight-color: #666; *//*滚动条空白部分的颜色*/ 
		/*scrollbar-shadow-color: #999; *//*立体滚动条阴影的颜色*/ 
		/*scrollbar-darkshadow-color: #666; *//*立体滚动条强阴影的颜色*/ 
		/*scrollbar-track-color: #666; *//*立体滚动条背景颜色*/ 
		/*scrollbar-base-color:#f8f8f8; *//*滚动条的基本颜色*/ 
        width:98%;height:calc( 100% - 110px );
	}
    /*定义滚动条的轨道颜色、内阴影及圆角*/
    .common-driver-table ::-webkit-scrollbar-track { 
        background-color: #E7EAEE !important; 
    }

    /*定义滑块颜色、内阴影及圆角*/
    .common-driver-table ::-webkit-scrollbar-thumb {
        border-radius: 17px !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3) !important;
        background-color: #fff !important;
    }

    /*定义两端按钮的样式*/
    .common-driver-table ::-webkit-scrollbar-button {
        background-color: #E7EAEE !important;
    }

    /*定义右下角汇合处的样式*/
    .common-driver-table ::-webkit-scrollbar-corner {
        background:#E7EAEE !important;
    }
    /* .common-driver-table .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
        padding-left: 0px !important;
    } */
    /* 整体布局 */
    .common-driver-body{height:calc( 100% - 111px );
    }
    /* 表单整体背景 */
    .common-driver-formbox{
        width:100%;
        background-color:#F8F8F8;
    }
    /* .demo-form-inline{padding-top:0.5%;} */
    /* .el-select{width: 60%} */
    
    /* 操作按钮整体布局 */
    .common-driver-menu{height:50px;width:99.2%;background-color:#FFFFFF;border:none;}
    /* 按钮左对齐 */
    .el-button--primary.is-plain{width: 68px !important;height: 32px !important; float: left !important;background: #2F95F4 !important;color: #fff !important;}
    .common-driver-menu .el-button-text{ 
        width:158px !important;
        float:right !important;
        margin-top:10px !important;
        /* margin-left: 1400px; */
        font-size: 12px !important;
        }
    .common-driver-menu .el-button-text button:nth-of-type(1),.common-driver-menu button:nth-of-type(2){
        width: 73px;
    }
    .common-driver-menu .el-button-text button:nth-of-type(3){
        width: 150px;
    }
    .common-driver-menu .el-button-text button:nth-of-type(4){
        width: 105px;
    }
    /* 按钮图标设置 */
    .common-driver-menu .el-button-text .img-3{display:inline-block;width:13px;height:12px;margin-right: 5px;position: relative;top: 1px;}
    .common-driver-body .el-table__body {
        /* margin-top: 10px; */
        border-radius: 4px !important;
    }

    .common-driver-body .el-table__body tr {
        height: 30px !important;
    }
    .common-driver-table .el-table{width: 100% !important;border:1px solid rgba(237,241,245,1) !important;margin-left: 10px !important;}
    .common-driver-body .el-table td,
    .el-table th {
        padding: 2px !important;
    }

    .common-driver-body .icon {
        width: 2em !important;
        height: 2em !important;
        color: #5eaee3 !important;
    }

    .common-driver-body .common-driver-handlebox {
        /* margin-bottom: 20px; */
        width: 97.8% !important;
        height: 50px !important;
        line-height: 50px !important;
        padding-left: 10px !important;
        font-size: 12px !important;
        color: #5A5E66;
    }
    .common-driver-handlebox .common-driver-select{
        height:28px;width:133px;color:#B4BCCC;border-radius:4px;margin-right:12px;font-size:12px;
    }
    .common-driver-body .handle-select {
        width: 8.4% !important;
        height: 32px !important;
        margin: 0 8px !important;
    }

    .common-driver-body .handle-input {
        width: 280px !important;
        display: inline-block !important;
    }

    .common-driver-body .el-input--small .el-input__inner {
        height: 32px !important;
        line-height: 32px !important;
    }

    .common-driver-body .el-input__inner {
        box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1) !important;
    }

    .common-driver-body .el-input--suffix .el-input__inner {
        padding-right: 10px !important;
    }

    .common-driver-body .el-table  { 
        color: #909090 !important;
    }
    .common-driver-body .el-table th>.cell {
        font-size: 14px !important;
        font-family: PingFang-SC-Medium !important;
        font-weight: 700 !important;
        color: rgba(30, 30, 30, 1) !important;
    }

    .common-driver-body .el-table .cell {
        font-size: 12px !important;
        font-family: PingFang-SC-Bold !important;   
    }

    .common-driver-body .el-table--enable-row-hover .el-table__body tr:hover>td {
        background: #2f95f4 !important;
        color: #fff;
    }
    .common-driver-table .el-table td, .el-table th.is-leaf{
        border-right: 1px solid #ebeef5 !important;
    }
    .common-driver-body .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #f6f8f9 ;
    }
    .common-driver-table .img-1{width:11px;height:15px;vertical-align: middle;cursor:pointer;}
    .common-driver-table .img-2{margin-right:14px;}
    /* 查询按钮 */
    .common-driver-handlebox .button-info{
        display: inline-block;
        width: 68px;
        height: 29px;
        background-color: #2F95F4;
        color: #fff;
        border: 1px solid;
        border-radius: 4px;
        float: right;
        margin-top: 10px;
        line-height: 29px;
        cursor:pointer;
    }
    .common-driver-menu .button-info-2{
        display: inline-block;height: 29px;background-color: #2F95F4;color: #fff;border: 1px solid;border-radius: 4px;cursor:pointer;
    }
    .common-driver-body .el-input--suffix .el-input__inner{
        height: 28px !important;
        line-height: 28px !important;
    }
    .common-driver-body .el-input__icon{
        line-height: 28px !important;
    }
    .common-driver-body .el-cascader{
        line-height: 28px !important;
    }
</style>
