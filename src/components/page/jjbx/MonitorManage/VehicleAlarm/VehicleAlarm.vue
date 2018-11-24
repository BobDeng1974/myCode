<!--   
    name：车辆报警处理
    desc：车辆报警界面 v 1.2
    param：paramName{param }        
    return Value : None
    author：qiaoyh 
    date：2018.10.12
-->
<template>
    <div class="common-alarm-body">
        <div style="padding-left:10px;height:22px;padding-top:8px;border-bottom:1px solid rgba(232,238,243,1);box-shadow:0px 2px 6px 0px rgba(47,149,244,0.13);">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>监控中心</el-breadcrumb-item>
                <el-breadcrumb-item>车辆报警</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="common-alarm-formbox">
            <div class="common-alarm-handlebox">
                <el-form :model="ruleForm" ref="ruleForm">
                    车牌号：
                    <input class="sys-common-input" placeholder="请输入车牌号" v-model.trim="ruleForm.carnum"> 
                    车队：<input class="sys-common-input" placeholder="请输入车队" v-model.trim="ruleForm.company"> 
                    <el-form-item label="省：" prop="province">
                        <el-select v-model="ruleForm.province" @change="getArea();" @click.native="clearAll();" placeholder="请选择省" label-width="150px">
                            <el-option v-for="item in selectProvince" :key="item.id" :label="item.text" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="市：" prop="area">
                        <el-select v-model="ruleForm.area"  @change="getDistrict();" placeholder="请选择市">
                            <el-option v-for="item in selectArea" :key="item.id" :label="item.text" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区：" prop="district">
                        <el-select v-model="ruleForm.district" placeholder="请选择区">
                            <el-option v-for="item in selectDistrict" :key="item.id" :label="item.text" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-date-picker clearable
                        v-model="ruleForm.startDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期" :picker-options="pickerOptions0">
                    </el-date-picker>
                    <button type="button" class="button-info" @click="exportExcel()">导出</button>
                    <button type="button" class="button-info" @click="search();">查询</button>
                </el-form>

            </div>
        </div>
        <div class="common-alarm-table" v-loading="deptLoad">
            <el-table id="out-table" :data="tableData" :highlight-current-row="true" :stripe="true" :header-cell-style="{background:'rgba(238,245,251,1)'}"
                height="calc( 100% - 70px )" :row-class-name="onSetRowIndex" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut"
                @cell-dblclick="handleDbl">
                <el-table-column align="center" type="index" :index="indexMethod" label="序号">
                </el-table-column>
                <!-- <el-table-column prop="name" align="center" label="详情" width="100">
                    <template slot-scope="scope">
                        <img v-if="scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/xq.png" class="img-1" @click="goDetail(scope.$index, scope.row);">
                        <img v-if="!scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/xq2.png" class="img-1" @click="goDetail(scope.$index, scope.row);">
                    </template>
                </el-table-column>
                <el-table-column prop="province" align="center" label="操作" width="100">
                    <template slot-scope="scope">
                        <img v-if="scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/bj.png" class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)">
                        <img v-if="!scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/bj2.png" class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)">
                        <img v-if="scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/sc.png" @click="handleDelete(scope.$index, scope.row)"
                            class="img-1">
                        <img v-if="!scope.row.isSele" src="../../../../../../../static/img/jjbx/vehicle/sc2.png" @click="handleDelete(scope.$index, scope.row)"
                            class="img-1">
                    </template>
                </el-table-column> -->
                <el-table-column prop="grad" align="left" label="报警颜色" :show-overflow-tooltip="true" width="80px;">
                </el-table-column>
                <el-table-column prop="carNum" align="left" label="车牌号码" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="carDriver" align="left" label="驾驶员"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="fleetId" align="left" label="车队" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="warningType" align="left" label="报警类型" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="warningTime" align="left" label="报警时间"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="carVolume" align="left" label="处理时间" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="warningLast" align="left" label="持续时长(s)"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="style" align="left" label="处理方式"  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="speed" align="left" label="速度(km/h)" :show-overflow-tooltip="true">
                </el-table-column>
                <!-- <el-table-column prop="semiCarNum" align="center" label="位置" width="120">
                    <template slot-scope="scope"><a>显示地图</a></template>
                </el-table-column> -->
                <el-table-column prop="address" align="left" label="报警地点"  :show-overflow-tooltip="true">
                </el-table-column>
                <!-- <el-table-column prop="carDriver1Id" align="center" label="查看视频" width="100">
                    <template slot-scope="scope">
                        <img v-if="scope.row.isSele" src="../../../../../../static/img/jjbx/vehicle/bj.png" class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)">
                        <img v-if="!scope.row.isSele" src="../../../../../../static/img/jjbx/vehicle/bj2.png" class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)">
                        <img v-if="scope.row.isSele" src="../../../../../../static/img/jjbx/vehicle/sc.png" @click="handleDelete(scope.$index, scope.row)"
                            class="img-1">
                        <img v-if="!scope.row.isSele" src="../../../../../../static/img/jjbx/vehicle/sc2.png" @click="handleDelete(scope.$index, scope.row)"
                            class="img-1">
                    </template>
                </el-table-column> -->
                <el-table-column prop="status" align="left" label="处理状态"  :show-overflow-tooltip="true">
                </el-table-column>
                 <el-table-column prop="province" align="center" label="操作" >
                    <template slot-scope="scope">
                        <span v-if="!scope.row.isSele" style="color:#2F95F4;cursor:pointer;" @click="handleEdit(scope.$index, scope.row);" >处理</span>
                        <span v-if="scope.row.isSele" style="color:#fff;cursor:pointer;" @click="handleEdit(scope.$index, scope.row);" >处理</span>
                        <!-- <img v-if="scope.row.isSele" src="../../../../../../static/img/jjbx/vehicle/bj.png" class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)">
                        <img v-if="!scope.row.isSele" src="../../../../../../static/img/jjbx/vehicle/bj2.png" class="img-1 img-2" @click="handleEdit(scope.$index, scope.row)"> -->
                    </template>
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
        </div>
        <div v-show="delVisible" id="drag" class="child-alarm-dialog"  :style="{border:dragBorder,borderRadius:dragBorderRad}">
            <!-- 车牌号 -->
            <div  class="car-header" @mousedown="onDragStart" @mouseup="onDragClose">
                <div class="car-hearder-icon">
                    <img src="../../../../../../static/img/jjbx/monitor/position/carNum.png" />
                </div>
                <div class="car-hearder-desc">
                    车牌号：{{data.carNum}}
                </div>
                <div class="car-hearder-close">
                    <i class="el-icon-close" style="color: #fff;cursor:pointer;" @click="close();"></i>
                </div>
            </div>
            <!-- 报警信息 -->
            <div class="car-edit">
                <div class="car-edit-title">
                    报警信息
                </div>
                <div style="height:47px;margin-left:290px;">
                    <div class="car-edit-tab" style="background: cornflowerblue; ">
                        <img  src="../../../../../../static/img/jjbx/monitor/position/jg1.png"
                            class="img_1" />
                        <!-- <img v-show="!carWindow.menuSwitch[0]" src="../../../../../../static/img/jjbx/monitor/position/jg-1.png"
                            class="img_1" /> -->
                    </div>
                    <div class="car-edit-tab" style="background:#EEEEEE; ">
                        <img  src="../../../../../../static/img/jjbx/monitor/position/jg2.png"
                            class="img_2" />
                        <!-- <img v-show="!carWindow.menuSwitch[1]" src="../../../../../../static/img/jjbx/monitor/position/jg-2.png"
                            class="img_2" /> -->
                    </div>
                    <div class="car-edit-tab" style="background: #EEEEEE; ">
                        <img  src="../../../../../../static/img/jjbx/monitor/position/jg3.png"
                            class="img_3" />
                        <!-- <img v-show="!carWindow.menuSwitch[2]" src="../../../../../../static/img/jjbx/monitor/position/jg-3.png"
                            class="img_3" /> -->
                    </div>
                    <div class="car-edit-tab" style="background: #EEEEEE; ">
                        <img  src="../../../../../../static/img/jjbx/monitor/position/jg4.png"
                            class="img_4" />
                        <!-- <img v-show="!carWindow.menuSwitch[3]" src="../../../../../../static/img/jjbx/monitor/position/jg-4.png"
                            class="img_4" /> -->
                    </div>
                    <div class="car-edit-tab" style="background: #EEEEEE; ">
                        <img  src="../../../../../../static/img/jjbx/monitor/position/jg5.png"
                            class="img_5" />
                        <!-- <img v-show="!carWindow.menuSwitch[4]" src="../../../../../../static/img/jjbx/monitor/position/jg-5.png"
                            class="img_5" /> -->
                    </div>
                    <div class="car-edit-tab" style="background: #EEEEEE; ">
                        <img  src="../../../../../../static/img/jjbx/monitor/position/jg6.png"
                            class="img_6" />
                        <!-- <img v-show="!carWindow.menuSwitch[5]" src="../../../../../../static/img/jjbx/monitor/position/jg-6.png"
                            class="img_6" /> -->
                    </div>
                </div>
            </div>
            <div style="width: auto;height: 320px;">
                <!-- 车辆信息 -->
                <div class="car-Detailinfo">
                    <div class="car-Detailinfo-driverinfo">
                        <div class="car-driverinfo-photo">
                            <video loop controls autoplay="autoplay" width="275px;" height="205px;" v-if="videoUrlDetail" :src="videoUrlDetail" ></video>
                        </div>
                    </div>
                    <div class="car-Detailinfo-dInfo">
                        <div class="dInfo-row">
                            <div class="dInfo-column-name">车牌号</div>
                            <div class="dInfo-column-val">：{{data.carNum}}</div>
                        </div>
                        <div class="dInfo-row">
                            <div class="dInfo-column-name">司机</div>
                            <div class="dInfo-column-val">：{{data.carDriver}}</div>
                        </div>
                        <div class="dInfo-row">
                            <div class="dInfo-column-name">报警颜色</div>
                            <div class="dInfo-column-val">：{{data.grad}}</div>
                        </div>
                        <div class="dInfo-row">
                            <div class="dInfo-column-name">时速</div>
                            <div class="dInfo-column-val">：{{data.speed}} km/h</div>
                        </div>
                        <div class="dInfo-row">
                            <div class="dInfo-column-name">位置</div>
                            <div class="dInfo-column-val">：{{data.address}}</div>
                        </div>
                        <div class="dInfo-row">
                            <div class="dInfo-column-name">时间</div>
                            <div class="dInfo-column-val">：{{data.warningTime}}</div>
                        </div>
                        <div class="dInfo-row">
                            <div class="dInfo-column-name">持续时长</div>
                            <div class="dInfo-column-val">：{{data.warningLast}} 秒</div>
                        </div>
                        <div class="dInfo-row">
                            <div class="dInfo-column-name">报警类型</div>
                            <div class="dInfo-column-val">：{{data.warningType}}</div>
                        </div>
                    </div>
                </div>
                <!-- 信息列表 -->
                <div class="car-tabs">
                    <div class="car-tab">
                        <span>
                            处理方式
                        </span>
                        <span style="margin: 5px 0px 5px 42%;">
                            处理描述
                        </span>
                    </div>
                </div>
                <!-- 处理方式选框 -->
                <div class="car-bj-lists">
                    <el-radio-group v-model="radio">
                        <el-radio :label="1" style="margin: 0px 10px;">短信</el-radio>
                        <el-radio :label="2" style="margin: 0px 10px;">微信</el-radio>
                        <el-radio :label="3" style="margin: 0px 10px;">钉钉</el-radio>
                        <el-radio :label="4" style="margin: 0px 10px;">APP</el-radio>
                        <!-- <el-radio :label="5" style="margin: 5px 3px 5px 0px;">停车调整</el-radio>
                        <el-radio :label="6" style="margin: 5px 3px 5px 0px;">停车休息</el-radio>
                        <el-radio :label="7" style="margin: 5px 3px 5px 0px;">强制停车</el-radio>
                        <el-radio :label="8" style="margin: 5px 3px 5px 0px;">其他</el-radio> -->
                    </el-radio-group>
                </div>
                <div style="float:right;margin: 0px 100px 0px 0px;">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea">
                    </el-input>
                </div>
            </div>
            <div class="button-handle">
                <el-button @click="delVisible = false">取 消</el-button>
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
                data:{
                    address:'',
                    carDriver:'',
                    carNum:'',
                    grad:'',
                    imageUrls:'',
                    videoUrls:'',
                    speed:'',
                    warningLast:'',
                    warningTime:'',
                    warningType:'',
                },
                cur_page: 1,
                pageSize:20,
                totalElements: 0, //总条数
                delVisible: false,
                ruleForm: {
                    carnum: "",
                    // company: "",
                    startDate:  "",
                    province:'',
                    area:'',
                    district:'',
                },
                idx: -1,
                idx2: -1,
                radio: -1,
                textarea: '',
                //拖拽改变样式
                dragBorder: "0",
                dragBorderRad: "6px",
                radio:'',
                textarea:'',
                deptLoad:false,
                videoUrlDetail:'',
                localUrl:'https://jjbx2-java-bucket.oss-cn-beijing.aliyuncs.com/',
                selectProvince:[],
                selectArea:[],
                selectDistrict:[],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6
                    }
                }, 
            };
        },
        created() {
            let _this = this;
            _this.search();
            _this.getProvince();
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
            handleDbl: function (row, event, column) {
                var index = row.index;
                this.goDetail(index, row);
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
                    province:_this.ruleForm.province,
                    area:_this.ruleForm.area,
                    district:_this.ruleForm.district,

                };
                console.log(param);
                ajax.get(_this.global_.apiUrlJj +"/get/car-warning?currentPage=" +_this.cur_page + "&pageSize="+ _this.pageSize)
                    .then(function (res) {
                        console.log(res);
                        _this.deptLoad = false;
                        res.data.data.content.forEach((item, index) => {
                            var obj = {};
                            obj.carNum = item.carNum;
                            obj.warningType = item.warningType;
                            obj.grad = item.grad;
                            switch(item.grad){
                                case 'red':obj.grad ='红色';break;
                                case 'yellow':obj.grad ='黄色';break;
                                case 'blue':obj.grad ='蓝色';break;
                                case 'orange':obj.grad ='橙色';break;
                            }
                            obj.speed = item.speed;
                            obj.warningLast = item.warningLast;
                            obj.address = item.address;
                            obj.fleetId = item.fleetId;
                            obj.carDriver = item.carDriver;
                            // obj.warningTime = _this.$dateFormat('item.warningTime');
                            obj.warningTime = item.warningTime;
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
                // _this.idx = index;
                // _this.idx2 = _this.tableData[row.index].id;
                _this.delVisible = true;
                // obj.imageUrl = _this.localUrl + item.imageUrls;
                ajax.get(_this.global_.apiUrlJj +"/get/warning-id?id=" + _this.tableData[row.index].id)
                    .then(function (res) {
                        console.log(res);
                        let item = res.data.data;
                        _this.data.address = item.address;
                        _this.data.carDriver = item.carDriver;
                        _this.data.carNum = item.carNum;
                        _this.data.fleetId = item.fleetId;
                        _this.data.grad = item.grad;
                        switch(item.grad){
                            case 'red':_this.data.grad ='红色';break;
                            case 'yellow':_this.data.grad ='黄色';break;
                            case 'blue':_this.data.grad ='蓝色';break;
                            case 'orange':_this.data.grad ='橙色';break;
                        }
                        _this.data.speed = item.speed;
                        _this.data.warningLast = item.warningLast;
                        _this.data.warningTime = item.warningTime;
                        _this.data.warningType = item.warningType;
                        _this.videoUrlDetail =  _this.localUrl + item.videoUrls;
                        console.log(_this.videoUrlDetail);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //处理完成
            handleRow(idx) {
                let _this = this;
                // this.tableData.splice(this.idx, 1);
                // ajax
                //     .delete(_this.global_.apiUrlJj + "/del/delete-car?id=" + _this.idx2)
                //     .then(function (res) {
                //         console.log(res);
                //     });
                this.$message.success("处理成功");
                this.delVisible = false;
            },
            close(){
                let _this = this;
                _this.delVisible = false;
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
                    params: { id: _this.tableData[row.index].id }
                });
                console.log(_this.tableData[row.index].id);
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
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '车辆报警明细表.xlsx')
                } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                return wbout
            },
            /**
             * @function {获取省}
             * @return {type} {selectProvince[]}
             */
            getProvince(vId){
                let _this = this;
                    ajax.get(_this.global_.apiUrlJj + "/get/area?id=0")
                        .then(function (res) {
                            console.log(res);
                            // var obj = {}
                            if (res.data) {
                                if (res.data.data) {
                                    res.data.data.forEach((item, index) => {
                                        _this.selectProvince.push({
                                            id: item.id,
                                            text: item.areaName,
                                        });
                                    });
                                }
                            }
                        }); 
            },
            /**
             * @function {获取市}
             * @return {type} {selectArea[]}
             */
            getArea(vId){
                let _this = this;
                ajax.get(_this.global_.apiUrlJj + "/get/area?id=" + _this.ruleForm.province)
                        .then(function (res) {
                            console.log(_this.ruleForm.province);
                            console.log(res);
                            // var obj = {}
                            if (res.data) {
                                if (res.data.data) {
                                    _this.selectArea = [];
                                    res.data.data.forEach((item, index) => {
                                        _this.selectArea.push({
                                            id: item.id,
                                            text: item.areaName,
                                        });
                                    });
                                }
                            }
                        });
            },
            /**
             * @function {获取区}
             * @return {type} {selectDistrict[]}
             */
            getDistrict(vId){
                let _this = this;
                ajax.get(_this.global_.apiUrlJj + "/get/area?id=" + _this.ruleForm.area)
                        .then(function (res) {
                            console.log(_this.ruleForm.area);
                            console.log(res);
                            // var obj = {}
                            if (res.data) {
                                if (res.data.data) {
                                    _this.selectDistrict = [];
                                    res.data.data.forEach((item, index) => {
                                        _this.selectDistrict.push({
                                            id: item.id,
                                            text: item.areaName,
                                        });
                                    });
                                }
                            }
                        });
            },
            /**
             * @function {清空市区下拉框的值}
             * @return {type} {description}
             */
            clearAll(){
                let _this = this;
                console.log("aaa");
                _this.ruleForm.province = '';
                _this.ruleForm.area = '';
                _this.ruleForm.district = '';
            },
        },
        mounted(){
            let _this = this;
            if(_this.timer){
                clearInterval(_this.timer);
            }else{
                _this.timer = setInterval(() =>{
                    _this.search();
                },300000);
            }
        },
        destroyed(){
            let _this = this;
            clearInterval(_this.timer);
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

    .common-alarm-table {
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

    .common-alarm-table ::-webkit-scrollbar-track {
        background-color: #e7eaee;
    }

    /*定义滑块颜色、内阴影及圆角*/

    .common-alarm-table ::-webkit-scrollbar-thumb {
        border-radius: 17px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #fff;
    }

    /*定义两端按钮的样式*/

    .common-alarm-table ::-webkit-scrollbar-button {
        background-color: #e7eaee;
    }

    /*定义右下角汇合处的样式*/

    .common-alarm-table ::-webkit-scrollbar-corner {
        background: #e7eaee;
    }

    /* 整体布局 */

    .common-alarm-body {
        /* margin-left: 10px; */
        height: calc(100% - 96px);
    }

    .common-alarm-body {
        box-sizing: content-box;
        /* margin-left: 10px;
        margin-right: 10px; */
        height: calc(100% - 96px);
    }

    /* 表单整体背景 */

    .common-alarm-formbox {
        width: 100%;
        background-color: #f8f8f8;
    }

    /* .demo-form-inline{padding-top:0.5%;} */

    /* .el-select{width: 60%} */

    /* 操作按钮整体布局 */

    .common-alarm-menu {
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

    .common-alarm-menu .el-button-text {
        width: 422px !important;
        float: right !important;
        margin-top: 10px !important;
        /* margin-left: 1400px; */
        font-size: 12px !important;
    }

    .common-alarm-menu .el-button-text button:nth-of-type(1),
    .common-alarm-menu button:nth-of-type(2) {
        width: 73px;
    }

    .common-alarm-menu .el-button-text button:nth-of-type(3) {
        width: 150px;
    }

    .common-alarm-menu .el-button-text button:nth-of-type(4) {
        width: 105px;
    }

    /* 按钮图标设置 */

    .common-alarm-menu .el-button-text .img-3 {
        display: inline-block;
        width: 13px;
        height: 12px;
        margin-right: 5px;
        position: relative;
        top: 1px;
    }

    .common-alarm-body .el-table__body {
        /* margin-top: 10px; */
        border-radius: 4px !important;
    }

    .common-alarm-body .el-table__body tr {
        height: 30px !important;
    }

    .common-alarm-table .el-table {
        margin-left: 10px !important;
        width: 100% !important;
        border: 1px solid rgba(237, 241, 245, 1) !important;
    }
    .common-alarm-table .el-table td, .el-table th.is-leaf{
        border-right: 1px solid #ebeef5 !important;
    }
    .common-alarm-body .el-table td,
    .el-table th {
        padding: 2px !important;
    }

    .common-alarm-body .icon {
        width: 2em !important;
        height: 2em !important;
        color: #5eaee3 !important;
    }

    .common-alarm-body .common-alarm-handlebox {
        /* margin-bottom: 20px; */
        width: 98% !important;
        height: 50px !important;
        line-height: 50px !important;
        padding-left: 10px !important;
        font-size: 12px !important;
        color: #5a5e66;
    }
    .common-alarm-body .handle-select {
        width: 8.4% !important;
        height: 32px !important;
        margin: 0 8px !important;
    }

    .common-alarm-body .handle-input {
        width: 280px !important;
        display: inline-block !important;
    }

    .common-alarm-body .el-input--small .el-input__inner {
        height: 32px !important;
        line-height: 32px !important;
    }

    .common-alarm-body .el-input__inner {
        box-shadow: 0px 0px 6px 0px rgba(25, 107, 255, 0.1) !important;
    }

    .common-alarm-body .el-input--suffix .el-input__inner {
        padding-right: 10px !important;
    }

    .common-alarm-body .el-table {
        color: #909090 !important;
    }

    .common-alarm-body .el-table th>.cell {
        font-size: 14px !important;
        font-family: PingFang-SC-Medium !important;
        font-weight: 700 !important;
        color: rgba(30, 30, 30, 1) !important;
    }

    .common-alarm-body .el-table .cell {
        font-size: 12px !important;
        font-family: PingFang-SC-Bold !important;
    }

    .common-alarm-body .el-table--enable-row-hover .el-table__body tr:hover>td {
        background: #2f95f4 !important;
        color: #fff;
    }

    .common-alarm-body .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #f6f8f9 ;
    }

    .common-alarm-table .img-1 {
        width: 11px;
        height: 15px;
        vertical-align: middle;
    }

    .common-alarm-table .img-2 {
        margin-right: 14px;
    }
    .common-alarm-body .el-input__inner{
        height: 28px !important;
        line-height: 28px !important;
    }

    /* 查询按钮 */

    .common-alarm-handlebox .button-info {
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
    .common-alarm-handlebox .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 225px !important;
    }
    .common-alarm-handlebox .el-form-item__label{
        padding:0px;
    }
    table {
        padding-top: 0!important;
    }

    select::-ms-expand {
        display: none !important;
    }

    .common-alarm-handlebox .el-range-editor.el-input__inner {
        padding:0px 10px !important;
    }
    .common-alarm-handlebox .el-input__icon{
        height: 28px !important;
    }
    .common-alarm-handlebox .el-date-editor {
        top:1px !important;
        margin-left: 12px;
    }
    .common-alarm-handlebox .el-date-editor .el-range-separator{
        line-height: 25px !important;
        color: #5A5E66;
    }
    .common-alarm-handlebox .el-cascader  {
        line-height: 28px !important;
    }
    .common-alarm-handlebox .el-select {
        /* display: block; */
        position: relative !important;
        width: 105px !important;
    }
    .common-alarm-handlebox .el-input__icon{
        line-height: 28px;
    }
    .common-alarm-body .el-input--suffix .el-input__inner{height: 28px !important;line-height: 28px !important;}
    .common-alarm-handlebox .el-form-item {
        display: inline-flex !important;
        height: 28px !important;
        position: relative !important;
        top: -18px !important;
        margin-bottom: 0px !important;
    }
    .common-alarm-body .el-form-item__label{
        height: 28px !important;
        line-height: 28px !important;
    }
    .common-alarm-body .el-form-item__content{
        height: 28px !important;
        line-height: 28px !important;
    }
    .common-alarm-body .el-form-item__label .el-form-item__content{
        
        line-height: 28px !important;
    }
    .common-alarm-table .el-dialog--center{
        height: 520px !important;
        border-radius:4px !important;
    }
    /* .common-alarm-table .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
        padding-left: 0px !important;
    } */
    /* 车辆信息弹出窗口 */
    .child-alarm-dialog {
        position: absolute;
        top: 180px;
        right: 30%;
        width: 600px;
        height: auto;
        background-color: #fff;
        z-index: 9999;
    }

    /* 窗口头部 */
    .child-alarm-dialog .car-header {
        cursor: move;
        width: auto;
        height: 40px;
        line-height: 40px;
        background: #2e92f6;
        border-radius: 6px 6px 0 0;
        padding: 0 16px;
    }

    .car-header .car-hearder-icon {
        float: left;
        height: 100%;
        line-height: 35px;
    }

    .car-hearder-icon img {
        width: 17px;
        height: 11px;
        vertical-align: middle;
    }

    .car-hearder-desc {
        float: left;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
        font-size: 12px;
        color: #fff;
    }

    .car-hearder-close {
        float: right;
        cursor: default;
        text-align: right;
        width: 40px;
        height: 40px;
        line-height: 40px;
    }

    /* 操作按钮 */
    .child-alarm-dialog .car-edit {
        height: 44px;
        width: auto;
        box-sizing: content-box;
        padding: 3px 16px 0 16px;
    }

    .car-edit .car-edit-title {
        float: left;
        height: 30px;
        line-height: 30px;
        margin: 7px 16px 7px 0;
    }

    .car-edit .car-edit-tab {
        float: left;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 7px 6px;
        border-radius: 4px;
    }

    .car-edit-tab img {
        vertical-align: middle;
    }

    .car-edit-tab .img_1 {
        height: 12px;
        width: 12px;
    }

    .car-edit-tab .img_2 {
        height: 13px;
        width: 13px;
    }

    .car-edit-tab .img_3 {
        height: 16px;
        width: 16px;
    }

    .car-edit-tab .img_4 {
        height: 13px;
        width: 14px;
    }

    .car-edit-tab .img_5 {
        height: 14px;
        width: 14px;
    }

    .car-edit-tab .img_6 {
        height: 14px;
        width: 14px;
    }

    /* 详细信息 */
    .child-alarm-dialog .car-Detailinfo {
        height: 205px;
        width: auto;
        margin: 7px 0;
        box-sizing: content-box;
        margin: 7px 16px;
    }

    .car-Detailinfo .car-Detailinfo-driverinfo {
        float: left;
        height: 205px;
        width: 275px;
        margin-right: 22px;
    }

    .car-Detailinfo-driverinfo .car-driverinfo-photo {
        height: 205px;
        line-height: 205px;
        text-align: center;
        width: 100%;
        background-color: #f7f7f7;
    }

    .car-driverinfo-photo img {
        height: 44px;
        width: 44px;
        vertical-align: middle;
    }
    .child-alarm-dialog .button-handle{
        /* width: 600px; */
        margin: 10px 210px;
    }
    /* .car-Detailinfo-driverinfo .car-driverinfo-name {
        height: 30px;
        line-height: 30px;
        width: 100%;
        font-size: 12px;
        color: #909090;
    }

    .car-driverinfo-name span {
        color: #242424;
    } */

    .car-Detailinfo .car-Detailinfo-dInfo {
        float: left;
        width: auto;
    }

    .car-Detailinfo-dInfo .dInfo-row {
        width: auto;
        height: 27px;
        line-height: 27px;
    }

    .car-Detailinfo-dInfo .dInfo-column-name {
        float: left;
        width: 52px;
        height: 27px;
        line-height: 27px;
        font-size: 12px;
        color: #909090;
    }

    .car-Detailinfo-dInfo .dInfo-column-val {
        float: left;
        width: auto;
        height: 27px;
        line-height: 27px;
        color: #242424;
        font-size: 12px;
    }

    /* tab栏 */
    .child-alarm-dialog .car-tabs {
        width: auto;
        height: 41px;
        box-sizing: content-box;
        margin: 3px 16px;
        /* border-bottom: 1px solid #e2e2e2; */
    }

    .car-tabs .car-tab {
        float: left;
        width: 100%;
        height: auto;
    }

    .car-tab span {
        cursor: pointer;
        width: auto;
        height: 25px;
        line-height: 25px;
        display: inline-block;
    }

    /* 报警列表  */
    .child-alarm-dialog .car-bj-lists {
        width: 45%;
        height: 30px;
        box-sizing: content-box;
        margin: 10px 16px 20px 16px;
        /* border: 1px solid #dae3f2;
        border-radius:4px; */
        color: #B3B9C8;
        font-size: 12px;
        float: left;
    }
    .child-alarm-dialog .el-radio__label{
        font-size: 12px;
        padding-left: 0px !important;
    }
    .child-alarm-dialog .el-radio__inner{
        width: 12px;
        height: 12px;
        margin-right: 3px;
    }
</style>