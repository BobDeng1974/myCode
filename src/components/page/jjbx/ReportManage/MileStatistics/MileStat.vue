<!--   
    name：紧急避险里程统计
    desc：紧急避险主界面
    param：None        
    return Value : None
    author：suny
    date：2018.10.15
-->
<template>

    <div class="common-mileStat-body">
        <div style="padding-left:10px;height:22px;padding-top:8px;border-bottom:1px solid rgba(232,238,243,1);box-shadow:0px 2px 6px 0px rgba(47,149,244,0.13);">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>报表中心</el-breadcrumb-item>
                <el-breadcrumb-item>里程统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="common-mileStat-formbox">
            <div class="common-mileStat-handlebox">
                <form :model="ruleForm" ref="ruleForm">
                    车牌号：<input style="height:27px;margin-bottom:8px" class="sys-common-input" placeholder=" 请输入车牌号" v-model="ruleForm.carNum">
                    时间范围：
                    <el-date-picker format="yyyy-MM-dd" class="sys-common-input" style="width:280px;height:30px;padding:0px;margin-top:4px" v-model="ruleForm.timev" type="daterange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                    </el-date-picker>
                    <button type="button" class="button-info" @click="search();" >查询</button>
                </form>

            </div>
        </div>
        <div class="common-mileStat-menu">
            <div class="el-button-text" >
                <button type="button" class="button-info-2" @click="exportExcel();">
                    <img src="../../../../../../static/img/jjbx/vehicle/dc.png" class="img-3">导出</button>
                <el-popover > 
                    <el-col :span="6"><el-checkbox @change="org">所属部门</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox @change="car">车牌号</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox @change="startT">开始时间</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox @change="endT">结束时间</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox @change="runM">行驶里程</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox @change="runT">行驶时间</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox @change="avgS">平均速度</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox @change="startM">开始里程</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox @change="endM">结束里程</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox @change="startL">开始位置</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox @change="endL">结束位置</el-checkbox></el-col>
                    
                    <button slot="reference" type="button" class="button-info-2" style="width:120px;">
                        <img src="../../../../../../static/img/jjbx/vehicle/xl.png" class="img-3">表格列设置
                    </button>
                </el-popover>
            </div>
        </div>
        <div class="common-mileStat-table" v-loading="mileLoad">
            <el-table style="height:100%;" id="out-table" :data="tableData" :highlight-current-row="true" :stripe="true" :header-cell-style="{background:'rgba(238,245,251,1)'}"
                height="calc( 100% - 70px )" :row-class-name="onSetRowIndex" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut"
                tooltip-effect="dark" @selection-change="handleSelectionChange">
                <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80px">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="comNum" align="left" label="所属部门" v-if="bumen"  sortable>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="carNum" align="left" label="车牌号" v-if="chep" sortable>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="startTime" align="left" label="开始时间" v-if="kait">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="endTime" align="left" label="结束时间" v-if="jiet">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="mileage" align="left" label="行驶里程(km)" v-if="xingl" sortable>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="mileageTime" align="left" label="行驶时间" v-if="xingt">
                </el-table-column>
                <el-table-column prop="avgSpeed" align="left" label="平均速度(km/h)" v-if="pings">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="startMileage" align="left" label="开始里程" v-if="kail">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="endMileage" align="left" label="结束里程" v-if="jiel">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="startLocation" align="left" label="开始位置" v-if="kaiw">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="endLocation" align="left" label="结束位置" v-if="jiew">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :page-size="pageSize"
                    layout="total,prev, pager, next" :total="totalElements">
                </el-pagination>
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
                bumen:true,
                chep:true,
                kait:true,
                jiet:true,
                xingl:true,
                xingt:true,
                pings:true,
                kail:true,
                jiel:true,
                kaiw:true,
                jiew:true,
                mileLoad:false,
                tableData: [],
                showcomNum:'',
                showcarNum:'',
                show_comNum:'',
                show_carNum:'',
                cur_page: 1,
                pageSize:20,
                totalElements: 0, //总条数
                is_search: false,
                ruleForm: {
                    comNum:'',
                    carNum: '',
                    startTime:'',
                    endTime:'',
                    mileage:'',
                    mileageTime:'',
                    avgSpeed:'',
                    startMileage:'',
                    endMileage:'',
                    startLocation:'',
                    endLocation:'',
                    timev:[],
                    timet:[]
                },
                idx: -1,
                pickerOptions2: {
                    shortcuts:  [
                        {
                        text: '最近一天',
                        onClick(picker) {
                        const end = new Date(new Date().setHours(23, 59,59, 59))
                        const start = new Date(new Date().setHours(0, 0, 0, 0))
                        end.setTime(end.getTime()-24*60*60*1000);
                        start.setTime(start.getTime()-24*60*60*1000);
                        picker.$emit('pick', [start, end]);
                        }
                    },{
                        text: '最近七天',
                        // onClick(picker) {
                        // const end = new Date();
                        // const start = new Date();
                        // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        // picker.$emit('pick', [start, end]);
                        // }
                        onClick(picker) {
                        const end = new Date(new Date().setHours(23, 59,59, 59))
                        const start = new Date(new Date().setHours(0, 0, 0, 0))
                        end.setTime(end.getTime()-24*60*60*1000);
                        start.setTime(start.getTime()-24*60*60*1000*7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三十天',
                        onClick(picker) {
                        const end = new Date(new Date().setHours(23, 59,59, 59))
                        const start = new Date(new Date().setHours(0, 0, 0, 0))
                        end.setTime(end.getTime()-24*60*60*1000);
                        start.setTime(start.getTime()-24*60*60*1000*30);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                    },
                    value5: '',
                    options: [{
                        value: '1',
                        label: '里程日报'
                        }, {
                        value: '2',
                        label: '里程周报'
                        }, {
                        value: '3',
                        label: '里程月报'
                        }, {
                        value: '4',
                        label: '里程明细'
                        }],
                        value: '1',
                        };
                },

        created() {
            let _this = this;
            this.getData();
        },
        methods: {
            org(){
                if(this.bumen){
                    this.bumen=false;
                }else{
                    this.bumen=true;
                }
            }, 
            car(){
                if(this.chep){
                    this.chep=false;
                }else{
                    this.chep=true;
                }
            }, 
            startT(){
                if(this.kait){
                    this.kait=false;
                }else{
                    this.kait=true;
                }
            }, 
            endT(){
                if(this.jiet){
                    this.jiet=false;
                }else{
                    this.jiet=true;
                }
            }, 
            runM(){
                if(this.xingl){
                    this.xingl=false;
                }else{
                    this.xingl=true;
                }
            },
            runT(){
                if(this.xingt){
                    this.xingt=false;
                }else{
                    this.xingt=true;
                }
            }, 
            avgS(){
                if(this.pings){
                    this.pings=false;
                }else{
                    this.pings=true;
                }
            }, 
            startM(){
                if(this.kail){
                    this.kail=false;
                }else{
                    this.kail=true;
                }
            }, 
            endM(){
                if(this.jiel){
                    this.jiel=false;
                }else{
                    this.jiel=true;
                }
            }, 
            startL(){
                if(this.kaiw){
                    this.kaiw=false;
                }else{
                    this.kaiw=true;
                }
            }, 
            endL(){
                if(this.jiew){
                    this.jiew=false;
                }else{
                    this.jiew=true;
                }
            },
            //导出
            exportExcel () {
                /* generate workbook object from table */
                var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
                /* get binary string as output */
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '里程统计表.xlsx')
                } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                return wbout
            },
            // 分页导航
            handleCurrentChange(val) {
                let _this = this;
                this.cur_page = val;
                this.getData();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;

            },
            handleSelectionChange(val) {
                this.selected = val;
            },
            /**
             * @function {获取下一行}
             * @param  {number} index {行索引}
             * @return {number} {下一行索引}
             */
            indexMethod(index) {
                
                return index =  (index+1)+(this.cur_page-1)*this.pageSize;
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
                var data = [];
                _this.mileLoad=true;

                let url = _this.global_.apiUrlJj + "/get/car-mileage-day?currentPage=" + _this.cur_page + "&pageSize="+_this.pageSize;

                ajax.get(url).then(function (res) {
                    _this.mileLoad=false;
                    for (let i = 0; i < res.data.data.content.length; i++) {
                        var obj = {}

                        obj.id = res.data.data.content[i].id
                        obj.comNum = res.data.data.content[i].comNum
                        obj.carNum = res.data.data.content[i].carNum  
                        obj.startTime = res.data.data.content[i].startTime
                        obj.endTime = res.data.data.content[i].endTime
                        obj.mileage = res.data.data.content[i].mileage
                        obj.mileageTime = res.data.data.content[i].mileageTime
                        obj.avgSpeed = res.data.data.content[i].avgSpeed
                        obj.startMileage = res.data.data.content[i].startMileage
                        obj.endMileage = res.data.data.content[i].endMileage
                        obj.startLocation = res.data.data.content[i].startLocation
                        obj.endLocation = res.data.data.content[i].endLocation
                        obj.isSele = res.data.data.content[i].isSele;
                        data[i] = obj
                    }

                    _this.tableData = data;
                    _this.totalElements = res.data.data.number;
                })
                    .catch(function (error) {
                        _this.mileLoad=false;
                        console.log(error);
                    });
            },

            search() {
                let _this = this;
                let carNum=_this.ruleForm.carNum
                var data = [];
                let timec=_this.ruleForm.timev
                let end = new Date(new Date(timec[1]).setHours(23, 59,59, 59))

                var datetime=_this.ruleForm.timev[0].getFullYear() + '-' + (_this.ruleForm.timev[0].getMonth() + 1) + '-' + _this.ruleForm.timev[0].getDate() //+ ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                var datetime1=_this.ruleForm.timev[1].getFullYear() + '-' + (_this.ruleForm.timev[1].getMonth() + 1) + '-' + _this.ruleForm.timev[1].getDate() //+ ' ' + c.getHours() + ':' + c.getMinutes() + ':' + c.getSeconds();

                var datetime2=_this.ruleForm.timev[0].getFullYear() + '-' + (_this.ruleForm.timev[0].getMonth() + 1) + '-' + _this.ruleForm.timev[0].getDate() + ' ' + _this.ruleForm.timev[0].getHours() + ':' + _this.ruleForm.timev[0].getMinutes() + ':' + _this.ruleForm.timev[0].getSeconds();
                var datetime3=end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' ' + end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds();
                this.ruleForm.timet=[datetime2,datetime3]
                let totlTime=((new Date(datetime1.replace(/-/g, "/"))-new Date(datetime.replace(/-/g, "/")))/60/60/24/1000)+1
                console.log(datetime.replace(/-/g, "/")+"       "+datetime1+"     "+   this.ruleForm.timet+"   "+totlTime)
                const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                loading.close();
                }, 2000);
                if(carNum!=""&&timec==""){
                    var url = _this.global_.apiUrlJj + "/get/car-mileage-day?currentPage=1&pageSize="+_this.pageSize+"&carNum="+carNum;
                }
                else if(carNum==""&&timec!=""){
                    var url = _this.global_.apiUrlJj + "/get/car-mileage-day?currentPage=1&pageSize="+_this.pageSize+"&startTime="+this.ruleForm.timet[0]+"&endTime="+this.ruleForm.timet[1];
                }
                else if(carNum!=""&&timec!=""){
                    var url = _this.global_.apiUrlJj + "/get/car-mileage-day?currentPage=1&pageSize="+_this.pageSize+"&carNum="+carNum+"&startTime="+this.ruleForm.timet[0]+"&endTime="+this.ruleForm.timet[1];
                }
                else{
                    var url = _this.global_.apiUrlJj + "/get/car-mileage-day?currentPage=1&pageSize="+_this.pageSize;
                }
                ajax.get(url).then(function (res) {

                    for (let i = 0; i < res.data.data.content.length; i++) {
                        var obj = {}
                        obj.id = res.data.data.content[i].id
                        obj.comNum = res.data.data.content[i].comNum
                        obj.carNum = res.data.data.content[i].carNum  
                        obj.startTime = res.data.data.content[i].startTime
                        obj.endTime = res.data.data.content[i].endTime
                        obj.mileage = res.data.data.content[i].mileage
                        obj.mileageTime = res.data.data.content[i].mileageTime
                        obj.avgSpeed = res.data.data.content[i].avgSpeed
                        obj.startMileage = res.data.data.content[i].startMileage
                        obj.endMileage = res.data.data.content[i].endMileage
                        obj.startLocation = res.data.data.content[i].startLocation
                        obj.endLocation = res.data.data.content[i].endLocation
                        obj.isSele = res.data.data.content[i].isSele;
                        data[i] = obj
                    }
                    _this.tableData = data;
                    _this.totalElements = res.data.data.number;
                })
                    .catch(function (error) {
                        console.log(error);
                    });
                    
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
    .common-mileStat-table{
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
    .common-mileStat-table ::-webkit-scrollbar-track { 
        background-color: #E7EAEE !important; 
    }

    /*定义滑块颜色、内阴影及圆角*/
    .common-mileStat-table ::-webkit-scrollbar-thumb {
        border-radius: 17px !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3) !important;
        background-color: #fff !important;
    }

    /*定义两端按钮的样式*/
    .common-mileStat-table ::-webkit-scrollbar-button {
        background-color: #E7EAEE !important;
    }

    /*定义右下角汇合处的样式*/
    .common-mileStat-table ::-webkit-scrollbar-corner {
        background:#E7EAEE !important;
    }

    /* 整体布局 */
    .common-mileStat-body{height:calc( 100% - 96px );
    }
    /* 表单整体背景 */
    .common-mileStat-formbox{
        width:100%;
        background-color:#F8F8F8;
    }
    /* .demo-form-inline{padding-top:0.5%;} */
    /* .el-select{width: 60%} */
    
    /* 操作按钮整体布局 */
    .common-mileStat-menu{height:50px;width:99.2%;background-color:#FFFFFF;border:none;width: 97.8%;padding-left: 10px}
    /* 按钮左对齐 */
    .el-button--primary.is-plain{width: 68px !important;height: 32px !important; float: left !important;background: #2F95F4 !important;color: #fff !important;}
    .common-mileStat-menu .el-button-text{ 
       /* width:213px !important; */
        float:right !important;
        margin-top:10px !important;
        text-align: right !important;
        /* margin-left: 1400px; */
        font-size: 12px !important;
        }
    .common-mileStat-menu .el-button-text button:nth-of-type(1),.common-mileStat-menu button:nth-of-type(2){
        width: 73px;
    }
    .common-mileStat-menu .el-button-text button:nth-of-type(3){
        width: 150px;
    }
    .common-mileStat-menu .el-button-text button:nth-of-type(4){
        width: 105px;
    }
    /* 按钮图标设置 */
    .common-mileStat-menu .el-button-text .img-3{display:inline-block;width:13px;height:12px;margin-right: 5px;position: relative;top: 1px;}
    .common-mileStat-body .el-table__body {
        /* margin-top: 10px; */
        border-radius: 4px !important;
    }

    .common-mileStat-body .el-table__body tr {
        height: 30px !important;
    }
    .common-mileStat-table .el-table{width: 100% !important;border:1px solid rgba(237,241,245,1) !important;margin-left: 10px !important;}
    .common-mileStat-body .el-table td,
    .el-table th {
        padding: 2px !important;
    }

    .common-mileStat-body .icon {
        width: 2em !important;
        height: 2em !important;
        color: #5eaee3 !important;
    }

    .common-mileStat-body .common-mileStat-handlebox {
        /* margin-bottom: 20px; */
        width: 97.8% !important;
        height: 50px !important;
        line-height: 50px !important;
        padding-left: 10px !important;
        font-size: 12px !important;
        color: #5A5E66;
    }
    .common-mileStat-handlebox .common-mileStat-input{
        height:25px;width:133px;color:#B4BCCC;border-radius:4px;border: 1px solid;margin-right:12px;font-size:12px;
    }
    .common-mileStat-handlebox .common-mileStat-select{
        height:28px;width:133px;color:#B4BCCC;border-radius:4px;margin-right:12px;font-size:12px;
    }
    .common-mileStat-body .handle-select {
        width: 8.4% !important;
        height: 32px !important;
        margin: 0 8px !important;
    }

    .common-mileStat-body .handle-input {
        width: 280px !important;
        display: inline-block !important;
    }

    .common-mileStat-body .el-input--small .el-input__inner {
        height: 32px !important;
        line-height: 32px !important;
    }

    .common-mileStat-body .el-input__inner {
        box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1) !important;
    }

    .common-mileStat-body .el-input--suffix .el-input__inner {
        padding-right: 10px !important;
    }

    .common-mileStat-body .el-table  { 
        color: #333 !important;
    }
    .common-mileStat-body .el-table th>.cell {
        font-size: 12px !important;
        font-family: PingFang-SC-Medium !important;
        font-weight: 700 !important;
        color: rgba(30, 30, 30, 1) !important;
    }

    .common-mileStat-body .el-table .cell {
        font-size: 12px !important;
        font-family: PingFang-SC-Bold !important;   
    }

    .common-mileStat-body .el-table--enable-row-hover .el-table__body tr:hover>td {
        background: #2f95f4 !important;
        color: #fff;
    }

    .common-mileStat-body .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #f6f8f9 ;
    }
    .common-mileStat-table .img-1{width:11px;height:15px;vertical-align: middle;}
    .common-mileStat-table .img-2{margin-right:14px;}
    /* 查询按钮 */
    .common-mileStat-handlebox .button-info{
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
    .common-mileStat-menu .button-info-2{
        display: inline-block;height: 29px;background-color: #2F95F4;color: #fff;border: 1px solid;border-radius: 4px;
    }
    .common-mileStat-body .el-input--suffix .el-input__inner{
        height: 28px !important;
        line-height: 28px !important;
    }
    .common-mileStat-body .el-input__icon{
        line-height: 28px !important;
    }
    .common-mileStat-body .el-cascader{
        line-height: 28px !important;
    }

    .common-mileStat-handlebox .sys-common-input{
    height: 25px;
    width: 123px;
    color: #333;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    margin-right: 12px;
    font-size: 12px;
    padding-left: 10px;
    }
    .common-mileStat-handlebox .el-date-editor .el-range__icon{
        padding-left:10px;
    }
    .common-mileStat-table .el-table .caret-wrapper{
        height:35px;
    }
    .common-mileStat-table .el-table td, .el-table th.is-leaf {
    border-right: 1px solid #ebeef5 !important;
    }
</style>