<!--   
    name：紧急避险设备疑似故障统计表
    desc：紧急避险主界面
    param：None        
    return Value : None
    author：suny
    date：2018.10.19
-->
<template>

    <div class="common-esfstat-body">
        <div style="padding-left:10px;height:22px;padding-top:8px;border-bottom:1px solid rgba(232,238,243,1);box-shadow:0px 2px 6px 0px rgba(47,149,244,0.13);">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>报表中心</el-breadcrumb-item>
                <el-breadcrumb-item>设备疑似故障统计表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="common-esfstat-formbox">
            <div class="common-esfstat-handlebox">
                <form :model="ruleForm" ref="ruleForm">
                    
                    车牌号：<input style="padding:0px" class="sys-common-input" placeholder="请输入车牌号" v-model="ruleForm.carNum">
                    故障类型：<el-select v-model="ruleForm.typec">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select> 
                    时间范围：
                     <el-date-picker format="yyyy-MM-dd" class="sys-common-input" style="height:30px;padding:0px;margin-top:4px" v-model="ruleForm.timev" type="daterange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                    </el-date-picker>
                    <button type="button" class="button-info" @click="search();">查询</button>
                </form>

            </div>
        </div>
        <div class="common-esfstat-menu">
            <div class="el-button-text" >
                <button type="button" class="button-info-2" @click="exportExcel();">
                    <img src="../../../../../../static/img/jjbx/vehicle/dc.png" class="img-3">导出</button>
                <el-popover > 

                    <el-col :span="12"><el-checkbox @change="car">车牌号</el-checkbox></el-col>
                    <el-col :span="12"><el-checkbox @change="org">所属机构</el-checkbox></el-col>
                    <el-col :span="12"><el-checkbox @change="lix">离线</el-checkbox></el-col>
                    <el-col :span="12"><el-checkbox @change="budwei">不定位</el-checkbox></el-col>
                    <el-col :span="12"><el-checkbox @change="sudu">速度异常</el-checkbox></el-col>
                    <el-col :span="12"><el-checkbox @change="adas">无前向ADAS</el-checkbox></el-col>
                    <el-col :span="12"><el-checkbox @change="mbsb">无面部识别</el-checkbox></el-col>
                    <el-col :span="12"><el-checkbox @change="tianshu">天数</el-checkbox></el-col>
                    <button slot="reference" type="button" class="button-info-2" style="width:120px;">
                        <img src="../../../../../../static/img/jjbx/vehicle/xl.png" class="img-3">表格列设置
                    </button>
                </el-popover>
            </div>
        </div>
        <div class="common-esfstat-table" >
            <el-table style="height:100%" id="out-table" :data="tableData" :highlight-current-row="true" :stripe="true" :header-cell-style="{background:'rgba(238,245,251,1)'}"
                height="calc( 100% - 70px )" :row-class-name="onSetRowIndex" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut"
                tooltip-effect="dark" @selection-change="handleSelectionChange">
                <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80px">
                </el-table-column>
                <el-table-column prop="carNum" align="left" label="车牌号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="carOrg" align="left" label="所属机构">
                </el-table-column>
                <el-table-column prop="carOutline" align="left" label="离线">
                </el-table-column>
                <el-table-column prop="noLocation" align="left" label="不定位">
                </el-table-column>
                <el-table-column prop="velAnomaly" align="left" label="速度异常">
                </el-table-column>
                <el-table-column prop="noAdas" align="left" label="无前向ADAS数据">
                </el-table-column>
                <el-table-column prop="noFace" align="left" label="无面部识别系统数据">
                </el-table-column>
                <el-table-column prop="day" align="left" label="天数">
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
                tian:true,
                qianxiang:true,
                lixian:true,
                dingwei:true,
                shibie :true,
                sud:true,
                tableData: [],
                tyoec:'',
                cur_page: 1,
                pageSize:20,
                totalElements: 0, //总条数
                is_search: false,
                ruleForm: {
                    carNum: '',
                    carOrg:'',
                    carOutline:'',
                    noLocation:'',
                    velAnomaly:'',
                    noAdas:'',
                    noFace:'',
                    day:'',
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
                    options: [{
                        value: '1',
                        label: '离线'
                        }, {
                        value: '2',
                        label: '不定位'
                        }, {
                        value: '3',
                        label: '速度异常'
                        }, {
                        value: '4',
                        label: '无前向ADAS数据'
                        }, {
                        value: '5',
                        label: '无面部识别数据'
                        }],
                        value: '1',
                        };
                },

        created() {
            let _this = this;
            
            this.getData();
            

        },
        methods: {
            tianshu(){
                if(this.tian){
                    this.tian=false;
                }else{
                    this.tian=true;
                }
            },
            lix(){
                if(this.lixian){
                    this.lixian=false;
                }else{
                    this.lixian=true;
                }
            },
            adas(){
                if(this.qianxiang){
                    this.qianxiang=false;
                }else{
                    this.qianxiang=true;
                }
            },
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
            mbsb(){
                if(this.shibie){
                    this.shibie=false;
                }else{
                    this.shibie=true;
                }
            },
            sudu(){
                if(this.sud){
                    this.sud=false;
                }else{
                    this.sud=true;
                }
            },
            budwei(){
                if(this.dingwei){
                    this.dingwei=false;
                }else{
                    this.dingwei=true;
                }
            },
            //导出
            exportExcel () {
                /* generate workbook object from table */
                var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
                /* get binary string as output */
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '设备疑似故障统计表.xlsx')
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
                

                let url = _this.global_.apiUrlJj + "/get/car-mileage-day?currentPage=" + _this.cur_page + "&pageSize="+_this.pageSize;

                ajax.get(url).then(function (res) {
                    for (let i = 0; i < res.data.data.content.length; i++) {
                        var obj = {}

                        obj.id = res.data.data.content[i].id
                        obj.carNum = res.data.data.content[i].carNum  
                        obj.carOrg = res.data.data.content[i].carOrg
                        obj.carOutline = res.data.data.content[i].carOutline
                        obj.noLocation = res.data.data.content[i].noLocation
                        obj.velAnomaly = res.data.data.content[i].velAnomaly
                        obj.noAdas = res.data.data.content[i].noAdas
                        obj.noFace = res.data.data.content[i].noFace
                        obj.day = res.data.data.content[i].day
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

            search() {
                let _this = this;
                let ido=this.appConfig.getUserInfo().organParentsId
                let carNum=_this.ruleForm.carNum
                let typec=_this.ruleForm.typec
                var data = [];
                let timec=_this.ruleForm.timev
                let end = new Date(new Date(timec[1]).setHours(23, 59,59, 59))

                var datetime=_this.ruleForm.timev[0].getFullYear() + '-' + (_this.ruleForm.timev[0].getMonth() + 1) + '-' + _this.ruleForm.timev[0].getDate() //+ ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                var datetime1=_this.ruleForm.timev[1].getFullYear() + '-' + (_this.ruleForm.timev[1].getMonth() + 1) + '-' + _this.ruleForm.timev[1].getDate() //+ ' ' + c.getHours() + ':' + c.getMinutes() + ':' + c.getSeconds();

                var datetime2=_this.ruleForm.timev[0].getFullYear() + '-' + (_this.ruleForm.timev[0].getMonth() + 1) + '-' + _this.ruleForm.timev[0].getDate() + ' ' + _this.ruleForm.timev[0].getHours() + ':' + _this.ruleForm.timev[0].getMinutes() + ':' + _this.ruleForm.timev[0].getSeconds();
                var datetime3=end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' ' + end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds();
                this.ruleForm.timet=[datetime2,datetime3]
                let totlTime=((new Date(datetime1.replace(/-/g, "/"))-new Date(datetime.replace(/-/g, "/")))/60/60/24/1000)+1
                console.log(this.ruleForm.timet+"   "+totlTime)
                if(carNum!=""&&timec==""&&typec==""){
                    var url = _this.global_.apiUrlJj + "/get/dict?currentPage=1&pageSize="+_this.pageSize+"&carNum="+carNum;
                }
                else if(carNum==""&&timec!=""&&typec==""){
                    var url = _this.global_.apiUrlJj + "/get/dict?currentPage=1&pageSize="+_this.pageSize+"&startTime="+this.ruleForm.timet[0]+"&endTime="+this.ruleForm.timet[1];
                }
                else if(carNum!=""&&timec!=""&&typec==""){
                    var url = _this.global_.apiUrlJj + "/get/dict?currentPage=1&pageSize="+_this.pageSize+"&carNum="+carNum+"&startTime="+this.ruleForm.timet[0]+"&endTime="+this.ruleForm.timet[1];
                }
                else if(carNum==""&&timec==""&&typec!=""){
                    var url = _this.global_.apiUrlJj + "/get/dict?currentPage=1&pageSize="+_this.pageSize+"&typec="+typec;
                }
                else if(carNum!=""&&timec==""&&typec!=""){
                    var url = _this.global_.apiUrlJj + "/get/dict?currentPage=1&pageSize="+_this.pageSize+"&carNum="+carNum+"&typec="+typec;
                }
                else if(carNum!=""&&timec!=""&&typec!=""){
                    var url = _this.global_.apiUrlJj + "/get/dict?currentPage=1&pageSize="+_this.pageSize+"&typec="+typec+"&startTime="+this.ruleForm.timet[0]+"&endTime="+this.ruleForm.timet[1];
                }
                else if(carNum!=""&&timec!=""&&typec!=""){
                    var url = _this.global_.apiUrlJj + "/get/dict?currentPage=1&pageSize="+_this.pageSize+"&carNum="+carNum+"&startTime="+this.ruleForm.timet[0]+"&endTime="+this.ruleForm.timet[1]+"&typec="+typec;
                }
                else{
                    var url = _this.global_.apiUrlJj + "/get/dict?currentPage=1&pageSize="+_this.pageSize;
                }
                ajax.get(url).then(function (res) {

                    for (let i = 0; i < res.data.data.content.length; i++) {
                        var obj = {}
                        obj.id = res.data.data.content[i].id
                        obj.carNum = res.data.data.content[i].carNum  
                        obj.carOrg = res.data.data.content[i].carOrg
                        obj.carOutline = res.data.data.content[i].carOutline
                        obj.noLocation = res.data.data.content[i].noLocation
                        obj.velAnomaly = res.data.data.content[i].velAnomaly
                        obj.noAdas = res.data.data.content[i].noAdas
                        obj.noFace = res.data.data.content[i].noFace
                        obj.day = res.data.data.content[i].day
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
    .common-esfstat-table{
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
    .common-esfstat-table ::-webkit-scrollbar-track { 
        background-color: #E7EAEE !important; 
    }

    /*定义滑块颜色、内阴影及圆角*/
    .common-esfstat-table ::-webkit-scrollbar-thumb {
        border-radius: 17px !important;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3) !important;
        background-color: #fff !important;
    }

    /*定义两端按钮的样式*/
    .common-esfstat-table ::-webkit-scrollbar-button {
        background-color: #E7EAEE !important;
    }

    /*定义右下角汇合处的样式*/
    .common-esfstat-table ::-webkit-scrollbar-corner {
        background:#E7EAEE !important;
    }

    /* 整体布局 */
    .common-esfstat-body{height:calc( 100% - 96px );
    }
    /* 表单整体背景 */
    .common-esfstat-formbox{
        width:100%;
        background-color:#F8F8F8;
    }
    /* .demo-form-inline{padding-top:0.5%;} */
    /* .el-select{width: 60%} */
    
    /* 操作按钮整体布局 */
    .common-esfstat-menu{height:50px;width:99.2%;background-color:#FFFFFF;border:none;width: 97.8%;padding-left: 10px}
    /* 按钮左对齐 */
    .el-button--primary.is-plain{width: 68px !important;height: 32px !important; float: left !important;background: #2F95F4 !important;color: #fff !important;}
    .common-esfstat-menu .el-button-text{ 
        /* width:213px !important; */
        float:right !important;
        margin-top:10px !important;
        text-align: right !important;
        /* margin-left: 1400px; */
        font-size: 12px !important;
        }
    .common-esfstat-menu .el-button-text button:nth-of-type(1),.common-esfstat-menu button:nth-of-type(2){
        width: 73px;
    }
    .common-esfstat-menu .el-button-text button:nth-of-type(3){
        width: 150px;
    }
    .common-esfstat-menu .el-button-text button:nth-of-type(4){
        width: 105px;
    }
    /* 按钮图标设置 */
    .common-esfstat-menu .el-button-text .img-3{display:inline-block;width:13px;height:12px;margin-right: 5px;position: relative;top: 1px;}
    .common-esfstat-body .el-table__body {
        /* margin-top: 10px; */
        border-radius: 4px !important;
    }

    .common-esfstat-body .el-table__body tr {
        height: 30px !important;
    }
    .common-esfstat-table .el-table{width: 100% !important;border:1px solid rgba(237,241,245,1) !important;margin-left: 10px !important;}
    .common-esfstat-body .el-table td,
    .el-table th {
        padding: 2px !important;
    }

    .common-esfstat-body .icon {
        width: 2em !important;
        height: 2em !important;
        color: #5eaee3 !important;
    }

    .common-esfstat-body .common-esfstat-handlebox {
        /* margin-bottom: 20px; */
        width: 97.8% !important;
        height: 50px !important;
        line-height: 50px !important;
        padding-left: 10px !important;
        font-size: 12px !important;
        color: #5A5E66;
    }
    .common-esfstat-handlebox .common-esfstat-input{
        height:25px;width:133px;color:#B4BCCC;border-radius:4px;border: 1px solid;margin-right:12px;font-size:12px;
    }
    .common-esfstat-handlebox .common-esfstat-select{
        height:28px;width:133px;color:#B4BCCC;border-radius:4px;margin-right:12px;font-size:12px;
    }
    .common-esfstat-body .handle-select {
        width: 8.4% !important;
        height: 32px !important;
        margin: 0 8px !important;
    }

    .common-esfstat-body .handle-input {
        width: 280px !important;
        display: inline-block !important;
    }

    .common-esfstat-body .el-input--small .el-input__inner {
        height: 32px !important;
        line-height: 32px !important;
    }

    .common-esfstat-body .el-input__inner {
        box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1) !important;
    }

    .common-esfstat-body .el-input--suffix .el-input__inner {
        padding-right: 10px !important;
    }

    .common-esfstat-body .el-table  { 
        color: #333 !important;
    }
    .common-esfstat-body .el-table th>.cell {
        font-size: 12px !important;
        font-family: PingFang-SC-Medium !important;
        font-weight: 700 !important;
        color: rgba(30, 30, 30, 1) !important;
    }

    .common-esfstat-body .el-table .cell {
        font-size: 12px !important;
        font-family: PingFang-SC-Bold !important;   
    }

    .common-esfstat-body .el-table--enable-row-hover .el-table__body tr:hover>td {
        background: #2f95f4 !important;
        color: #fff;
    }

    .common-esfstat-body .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #f6f8f9 ;
    }
    .common-esfstat-table .img-1{width:11px;height:15px;vertical-align: middle;}
    .common-esfstat-table .img-2{margin-right:14px;}
    /* 查询按钮 */
    .common-esfstat-handlebox .button-info{
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
    .common-esfstat-menu .button-info-2{
        display: inline-block;height: 29px;background-color: #2F95F4;color: #fff;border: 1px solid;border-radius: 4px;
    }
    .common-esfstat-body .el-input--suffix .el-input__inner{
        height: 28px !important;
        line-height: 28px !important;
    }
    .common-esfstat-body .el-input__icon{
        line-height: 28px !important;
    }
    .common-esfstat-body .el-cascader{
        line-height: 28px !important;
    }
    .common-esfstat-table .el-table td, .el-table th.is-leaf {
    border-right: 1px solid #ebeef5 !important;
    }
</style>