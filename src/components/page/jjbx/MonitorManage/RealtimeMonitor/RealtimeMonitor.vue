<!--   
    name：车辆实时监控
    desc：车辆实时监控界面 v 1.4
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.10.10
-->
<template>
    <div class="common-monitor-body food">
        <div v-show="!isLeftPanelVisible" @click="isLeftPanelVisible=!isLeftPanelVisible" class="left-open"></div>

        <transition name="common-monitor-left-move">
            <div v-show="isLeftPanelVisible" class="common-monitor-left">
                <div class="left-close">
                    <div class="butControl butSwitch" @click="isLeftPanelVisible=!isLeftPanelVisible">
                        <i class="el-icon-arrow-left" style="font-size: 14px;vertical-align: middle;"></i>
                    </div>
                    <div class="butControl butTips" @click="isEqtipsVisible=!isEqtipsVisible">
                        <i class="iconTip"></i>
                    </div>

                    <div v-show="isEqtipsVisible" class="equipment-tips">
                        <a id="equipTipsCloseA" href="javascript:void(0)" @click="isEqtipsVisible=!isEqtipsVisible"
                            title="关闭">关闭</a>
                        <p><img src="../../../../../../static/img/jjbx/monitor/position/Equipment/jkShare.png" alt=""><span>表示监控共享的车辆</span></p>
                        <p><img src="../../../../../../static/img/jjbx/monitor/position/Equipment/e_camera.png" alt=""><span>表示车辆装有摄像头</span></p>
                        <p><img src="../../../../../../static/img/jjbx/monitor/position/Equipment/e_lock.png" alt=""><span>表示可以检测开关门</span></p>
                        <p><img src="../../../../../../static/img/jjbx/monitor/position/Equipment/e_temperature.png"
                                alt=""><span>表示可以采集温度</span></p>
                        <p><img src="../../../../../../static/img/jjbx/monitor/position/Equipment/e_LCD.png" alt=""><span>表示车辆装有LCD显示屏</span></p>
                        <p><img src="../../../../../../static/img/jjbx/monitor/position/Equipment/e_oil.png" alt=""><span>表示车辆装有油尺</span></p>
                        <p><img src="../../../../../../static/img/jjbx/monitor/position/Equipment/e_humidity.png" alt=""><span>表示可以采集湿度</span></p>
                    </div>
                </div>
                <div class="left-search">
                    <div class="sea-select">
                        <input class="search-input" placeholder="请输入车牌号" v-model="filterText" />
                        <el-button type="primary" icon="el-icon-search"></el-button>
                    </div>
                </div>
                <div class="left-close">
                    <div class="left-search" style="padding-left: 20px;">
                        <label @click='seleRadio=0;ajaxUtilFun(1, {id: appConfig.getUserInfo().organParentsId});' :style="{color:seleRadio==0?'#4178d7':'#b3b9c8',background:seleRadio==0?'url(../../../../../static/img/jjbx/monitor/position/radio-select.jpg)  no-repeat left center':'url(../../../../../static/img/jjbx/monitor/position/radio-noselect.jpg)  no-repeat left center'}">
                            <span>所有</span>
                        </label>
                        <label @click='seleRadio=1;ajaxUtilFun(1, {id: appConfig.getUserInfo().organParentsId});' :style="{color:seleRadio==1?'#4178d7':'#b3b9c8',background:seleRadio==1?'url(../../../../../static/img/jjbx/monitor/position/radio-select.jpg)  no-repeat left center':'url(../../../../../static/img/jjbx/monitor/position/radio-noselect.jpg)  no-repeat left center'}">
                            <span >上线</span>
                        </label>
                        <label @click='seleRadio=2;ajaxUtilFun(1, {id: appConfig.getUserInfo().organParentsId});' :style="{color:seleRadio==2?'#4178d7':'#b3b9c8',background:seleRadio==2?'url(../../../../../static/img/jjbx/monitor/position/radio-select.jpg)  no-repeat left center':'url(../../../../../static/img/jjbx/monitor/position/radio-noselect.jpg)  no-repeat left center'}">
                            <span>离线</span>
                        </label>
                    </div>
                </div>
                <div style="border-top:1px solid #e7e7e7;clear: both; "></div>
                <div ref="carsList" style="width:auto;overflow-y:auto; overflow-x:hidden;background:#fff;font-size:12px;">
                    <!--  <el-tree ref="monDeptTree" :data="data2"  default-expand-all show-checkbox node-key="id" :default-expanded-keys="[1,2]"
                        :default-checked-keys="[5]" :props="defaultProps" :render-content="renderContent"  :filter-node-method="filterNode">
                    </el-tree>
                     -->
                    <el-tree v-loading="deptLoading" ref="deptTree" class="filter-tree" :style="{height:'100%'}" :data="deptData"
                        :props="defaultProps" node-key="id" :expand-on-click-node="false" default-expand-all
                        :render-content="renderContent" :highlight-current="true" :filter-node-method="filterNode">
                    </el-tree>
                </div>
                <div class="bottom">
                    <div class="column">
                        <a title="取消监控" @click="onMoniterCancelClick();"><i class="cancel">取消监控</i></a>
                    </div>
                    <div v-show="!startLo"  class="column">
                        <a title="开始监控" @click="onMoniterStartClick();"><i class="start">开始监控</i></a>
                    </div>
                    <div v-show="startLo"   class="column">
                        <a title="暂停监控" @click="onMoniterSuspendClick()"><i class="pause">暂停监控</i></a>
                    </div>
                   <!--  <div class="column">
                        <el-button type="primary" size="mini" @click="isDialogVisible = true">消息批量下发</el-button>
                    </div> -->

                </div>
                <el-dialog title="消息批量下发" :visible.sync="isDialogVisible" width="30%">
                    <div class="el-dialogs-row">
                        <span style="">设备:</span>
                        <select id="deviceSelect" class="selectDevice">
                            <option name="device" value="DFSS" selected="">AI设备</option>
                            <option name="device" value="401P">DSM</option>
                            <option name="device" value="402P">ADAS</option>
                        </select>
                        <!-- <span style="cursor:pointer;position:initial;    width: 19%;
                                font-size: 12px;color: #3F3F3F;
                                letter-spacing: -0.34px;
                                display: inline-block; 
                                text-align: right;
                                margin-right: 5px;">
                            消息模板管理</span> -->
                    </div>
                    <div class="el-dialogs-row">
                        <select class="selectTemp">
                            <option value="">选择消息模板</option>
                            <option value="师傅您好，为了您的安全，请勿违规驾驶，谢谢！" title="师傅您好，为了您的安全，请勿违规驾驶，谢谢！">师傅您好，为了您的安全，请勿违规驾驶，谢谢！</option>
                            <option value="师傅您好，为了您的安全，请勿分神驾驶，注意安全！谢谢" title="师傅您好，为了您的安全，请勿分神驾驶，注意安全！谢谢">师傅您好，为了您的安全，请勿分神驾驶，注意安全！谢谢</option>
                            <option value="师傅您好，为了您的安全，请勿遮挡摄像头!" title="师傅您好，为了您的安全，请勿遮挡摄像头!">师傅您好，为了您的安全，请勿遮挡摄像头!</option>
                            <option value="师傅您好，为了您的安全，请不要在行驶过程中玩手机与打电话！谢谢" title="师傅您好，为了您的安全，请不要在行驶过程中玩手机与打电话！谢谢">师傅您好，为了您的安全，请不要在行驶过程中玩手机与打电话！谢谢</option>
                            <option value="师傅您好，您遮挡摄像头已经出现多次报警，如再不修改将执行罚款" title="师傅您好，您遮挡摄像头已经出现多次报警，如再不修改将执行罚款">师傅您好，您遮挡摄像头已经出现多次报警，如再不修改将执行罚款</option>
                            <option value="师父您好,辛苦了!夜间行车请保持安全车速和车距.谢谢!康瑞众链爱心使者提醒您." title="师父您好,辛苦了!夜间行车请保持安全车速和车距.谢谢!康瑞众链爱心使者提醒您.">师父您好,辛苦了!夜间行车请保持安全车速和车距.谢谢!康瑞众链爱心使者提醒您.</option>
                            <option value="师父您好,辛苦了.为了您的自身安全,请勿疲劳驾驶.谢谢  康瑞众链  爱心使者提醒你." title="师父您好,辛苦了.为了您的自身安全,请勿疲劳驾驶.谢谢  康瑞众链  爱心使者提醒你.">师父您好,辛苦了.为了您的自身安全,请勿疲劳驾驶.谢谢
                                康瑞众链 爱心使者提..</option>
                            <option value="押运员师傅您好,为了您自身安全夜间行车,多关注驾驶员的操作行为.多陪同关注.谢谢" title="押运员师傅您好,为了您自身安全夜间行车,多关注驾驶员的操作行为.多陪同关注.谢谢">押运员师傅您好,为了您自身安全夜间行车,多关注驾驶员的操作行为.多陪同关注.谢谢</option>
                            <option value="师傅您好，为了您的安全，注意前方路况 与前车保持安全车距行驶！请勿分神驾驶！谢谢" title="师傅您好，为了您的安全，注意前方路况 与前车保持安全车距行驶！请勿分神驾驶！谢谢">师傅您好，为了您的安全，注意前方路况
                                与前车保持安全车距行驶！请勿分神驾驶！谢谢</option>
                            <option value="师傅您好. 您车内摄像头已严重偏离！！请及时调整.谢谢您的配合.祝您一路顺风" title="师傅您好. 您车内摄像头已严重偏离！！请及时调整.谢谢您的配合.祝您一路顺风">师傅您好.
                                您车内摄像头已严重偏离！！请及时调整.谢谢您的配合.祝您一路顺风</option>
                        </select>
                    </div>
                    <div class="el-dialogs-row">
                        <textarea maxlength="50" id="sendTextarea" placeholder="下发内容" style=""></textarea>
                    </div>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="isDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="isDialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </transition>
        <!-- map -->
        <div id="carPosition" ref="carPosition" style="float: left;width:100%;height: 100%;">
            <!-- <cars-position :isBegin="startLo" :carId="carId" :carIdChecked="carCheckedStr"></cars-position> -->
            <cars-position  :carIdChecked="carCheckedStr"></cars-position>
        </div>
    </div>
</template>
<script>
    const cityOptions = [
        "超速报警",
        "前碰撞",
        "行人碰撞",
        "车距监控",
        "车道偏离",
        "疲劳驾驶"
    ];
    import ajax from "axios";
    import carsPosition from "@/components/child/jjbx/MonitorManage/RealtimeMonitor/CarsPosition.vue";
    export default {
        components: {
            carsPosition
        },
        props: {
            optionParam: {
                type: Object
            }
        },
        data() {
            return {
                carId:'',
                carCheckArr:[],//已选车辆array
                carCheckedStr:'',//已选车辆字符串
                carsClientHeight: 0, //左侧车队列表高度
                isLeftPanelVisible: true, //左侧面板开关
                isEqtipsVisible: false, //设备图标提示框开关
                isDialogVisible: false, //批量下发开关
                startLo: false, //监控开始
                filterText: '',
                seleRadio: 0,
                deptLoading: true,
                deptData: [""],
                data2: [""]
                    /* {
                                        id: 1,
                                        equipmentId: "0",
                                        label: '恒通物流股份有限公司',
                                        children: [{
                                            id: 2,
                                            equipmentId: "0",
                                            label: 'LPG车队1'
                                        } 
                                    }]*/
                    ,
                defaultProps: {
                    children: "children",
                    value: "id"
                }
            };
        },
        computed: {},
        mounted() {
            let _this = this;
            _this.$nextTick(function () {
                _this.init();
                window.onresize = function temp() {
                    _this.execCarsClientHight();
                };
            });
        },
        methods: {
            init() {
                let _this = this;
                //获取组织tree
                let param = {
                    id: _this.appConfig.getUserInfo().organParentsId
                };
                _this.ajaxUtilFun(1, param);
            },

            //ajax public fun
            ajaxUtilFun(tId, param) {
                let _this = this;
                let aUrl = _this.global_.apiUrlJj + "";
                let ajaxFun = function (callFun,errMsg) {
                    ajax.get(aUrl, {
                            params: param
                        })
                        .then(function (res) {
                            _this.deptLoading = false;
                            if (res.data.isSuccess) {
                                if (typeof callFun == "function") {
                                    callFun(res);
                                }
                            }  else {
                                _this.$message({
                                    showClose: true,
                                    type: "error",
                                    message: errMsg
                                });
                            }
                        })
                        .catch(function (error) {
                            _this.deptLoading = false;
                            _this.$message({
                                showClose: true,
                                message: error.data.errMessage,
                                type: 'error'
                            });
                        });
                };
                switch (tId) {
                    case 1: //获取组织车辆tree
                        aUrl += "/get/select-all-organ";
                        ajaxFun(function (res) {
                            _this.getDeptData(res);
                        },'部门机构数据获取失败!');
                        break;
                }
            },
            //获取组织机构data
            getDeptData(res) {
                let _this = this;
                if (res.data.isSuccess) {
                    _this.deptData = res.data.data;
                    _this.carCheckArr.forEach((ele,i)=>{ 
                        let opts = {
                            attrKey:'organId',
                            attrVal: ele+''
                        };
                        //判断定位车辆是否移出
                        if(!_this.$arrayAttrcheck(_this.deptData,opts)){
                            _this.$arrayRemove(_this.carCheckArr,ele);
                        }
                    });
                }
            },
            execCarsClientHight() {
                let _this = this;
                if(_this.$refs["carsList"]){
                    _this.$refs["carsList"].style.height = window.innerHeight - 260 + "px";
                }
                
            },
            setPropCarId(node){
                let _this = this;
                if(Boolean(node.data.isCar)){
                    if(node.data.organId){
                        _this.carId = node.data.organId.toString(); 
                        let checkboxDom = document.getElementsByClassName("realMonitorCheckbox"); 
                        for(let i=0;i<checkboxDom.length;i++){ 
                            let ele = JSON.parse(checkboxDom[i]._value);
                            if(ele.organId == node.data.organId.toString()){
                                if(checkboxDom[i].checked){
                                    checkboxDom[i].checked = false;
                                    _this.$arrayRemove(_this.carCheckArr,ele.organId);
                                }else{
                                    checkboxDom[i].checked = true;
                                    _this.carCheckArr.push(ele.organId);
                                }
                            }
                        }
                        _this.onMoniterStartClick();
                    }
                }
            },            
            carTreeChange(val) {
                let _this = this;
                let checked = val.target.checked;
                let checkVal = JSON.parse(val.target.defaultValue).organId; 
                if (checked) {
                    _this.carCheckArr.push(checkVal);
                } else {
                    _this.carCheckArr.forEach((ele, i) => {
                        if (ele === checkVal) {
                            _this.carCheckArr.splice(i, 1)
                        }
                    });
                }
                console.log(_this.carCheckArr);
            },
            renderContent(h, {
                node,
                data,
                store
            }) {
                if(!data){
                    return;
                }
                let _this = this;
                var getCheckbox = (isCar,id) => {
                    let res = [];
                    if(isCar === "true"){ 
                       res.push( <input class="realMonitorCheckbox" type="checkbox" value={JSON.stringify(id)}  onChange={this.carTreeChange}/> , <span  onClick={ _this.setPropCarId.bind(_this,node) } > { node.label } </span> )
                    }else{                        
                        res.push(  node.label ); 
                    }
                    return res;
                }; 
                var getEquipmentImg = (equipmentId) => {
                    let res = [];
                    let eqIdArr = equipmentId.split(",");
                    eqIdArr.forEach((eqId, index) => {
                        let imgSrc = '../../../../../../static/img/jjbx/monitor/position/Equipment/';
                        switch (eqId) {
                            case "0":
                                imgSrc = "";
                                break;
                            case "1": //表示监控共享的车辆 
                                imgSrc += "jkShare.png";
                                break;
                            case "2": //表示车辆装有摄像头
                                imgSrc += "e_camera.png";
                                break;
                            case "3": //表示可以检测开关门
                                imgSrc += "e_lock.png";
                                break;
                            case "4": //表示可以采集温度
                                imgSrc += "e_temperature.png";
                                break;
                            case "5": //表示车辆装有LCD显示屏
                                imgSrc += "e_LCD.png";
                                break;
                            case "6": //表示车辆装有油尺
                                imgSrc += "e_oil.png";
                                break;
                            case "7": //表示可以采集湿度
                                imgSrc += "e_humidity.png";
                                break;
                        }
                        if (eqId !== "0") res.push( < img src = { imgSrc } style = 'vertical-align: middle;' /> );
                    });
                    return res;
                }; 
                return (
                    <span class = "custom-tree-node" >
                        <span > { getCheckbox(data.isCar,data) } </span>                        
                        <span > { getEquipmentImg(data.equipmentId) } </span> 
                    </span>
                );
            },/*  <span  onClick={ _this.setPropCarId.bind(_this,node) } > { node.label } </span>   */
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value ) !== -1 || data.label.indexOf( value.toUpperCase()  ) !== -1 ||data.label.indexOf( value.toLowerCase()) !== -1;
            },
            onMoniterStartClick() {
                let _this = this; 
                if(_this.carCheckArr.length <= 0) {
                    this.$message({
                        showClose: true,
                        message: '请先选择车辆！',
                        type: 'warning'
                    });
                    return
                };
                _this.startLo= true;
                
                let t = setInterval(() => {
                    if(!_this.startLo ){ 
                        // console.log("---------------------stop");
                        clearInterval(t);
                        t = null;
                        return;
                    }
                 //   console.log(_this.carCheckArr);
                    _this.carCheckedStr = '';
                    _this.carCheckArr.forEach((ele, i) => {
                        if(i == (_this.carCheckArr.length-1)){
                            _this.carCheckedStr += ele ;
                        }else{
                            _this.carCheckedStr += ele + ',';
                        }                    
                    });
                    // console.log("---------------------start");
                }, 1300);
                console.log(_this.carCheckedStr);
            },
            onMoniterSuspendClick(){
                let _this = this;  
                _this.startLo = false; 
                console.log(_this.startLo);
                console.log(_this.carCheckArr);
                console.log(_this.carCheckedStr);
            },
            onMoniterCancelClick(){
                let _this = this;
                _this.startLo = false;
                _this.carCheckedStr = '';
                _this.carCheckArr = [];
                let checkboxDom = document.getElementsByClassName("realMonitorCheckbox");
                console.log(checkboxDom.length);
                for(let i=0;i<checkboxDom.length;i++){
                    checkboxDom[i].checked = false;
                }
            }
        },
        beforeDestroy() {},
        watch: {
            filterText(val) {
                this.$refs.deptTree.filter(val);
            }
        },
    };

</script>
<style>
    .common-monitor-body {
        position: relative;
        width: 100%;
        height: calc(100% - 81px);
    }

    .common-monitor-body .common-monitor-left {
        position: absolute;
        z-index: 2222;
        top: 0;
        left: 0;
        float: left;
        width: 250px;
        height: 100%;
        background-color: #f6f6f6;
        border-right: 1px solid #e7e7e7;
    }

    .common-monitor-body ::-webkit-scrollbar {
        width: 8px;
        border-radius: 10px;
        background-color: #e7eaee;
    }

    /*定义滚动条的轨道颜色、内阴影及圆角*/
    .common-monitor-left ::-webkit-scrollbar-track {
        background-color: #e7eaee;
    }

    /*定义滑块颜色、内阴影及圆角*/
    .common-monitor-left ::-webkit-scrollbar-thumb {
        border-radius: 17px;
        width: 5px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #fff;
    }

    /*定义两端按钮的样式*/
    .common-monitor-left ::-webkit-scrollbar-button {
        background-color: #e7eaee;
    }

    /*定义右下角汇合处的样式*/
    .common-monitor-left ::-webkit-scrollbar-corner {
        background: #e7eaee;
    }

    .common-monitor-left .left-close {
        z-index: 2222;
        width: 100%;
        height: 36px;
        border-bottom: 1px solid #e7e7e7;
        background-color: #f6f6f6;
    }

    .common-monitor-body .left-open {
        z-index: 2222;
        width: 27px;
        height: 27px;
        background: url("../../../../../../static/img/jjbx/monitor/icon.png") no-repeat -315px -447px;
        position: absolute;
        left: 0;
        top: 0;
        cursor: pointer;
    }

    .common-monitor-body .left-open:hover {
        background: url("../../../../../../static/img/jjbx/monitor/icon.png") no-repeat -315px -474px;
    }

    .left-close .butControl {
        cursor: pointer;
        text-align: center;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        background-color: #f3f3f3;
    }

    .left-close .butControl:hover {
        background: #e0f2fd;
    }

    .left-close .butSwitch {
        float: left;
        width: 21px;
        height: 36px;
        line-height: 36px;
        border-right: 1px solid #e7e7e7;
    }


    .left-close .equipment-tips {
        position: absolute;
        z-index: 999;
        top: 30px;
        left: 15px;
        padding: 20px 15px 10px 15px;
        background: #f8f8f8;
        border: 1px solid #fff;
        border-radius: 3px;
        box-shadow: 0 1px 5px #666;

    }

    .equipment-tips a {
        z-index: 1000;
        position: absolute;
        display: block;
        right: 6px;
        top: 6px;
        width: 20px;
        height: 18px;
        text-indent: -9999px;
        background: url('../../../../../../static/img/jjbx/monitor/icon.png') no-repeat -480px -448px;
    }

    .equipment-tips a:hover {
        background: url('../../../../../../static/img/jjbx/monitor/icon.png') no-repeat -460px -448px;
    }

    .equipment-tips p {
        margin: 5px 0;
        display: block;
        font-size: 12px;
        color: #444;
    }

    .equipment-tips img {
        margin-right: 5px;
        display: inline-block;
        vertical-align: middle;
        line-height: 14px;
    }

    .equipment-tips span {
        display: inline-block;
        vertical-align: middle;
        line-height: 14px;
    }

    .left-close .butTips {
        float: right;
        width: 36px;
        height: 36px;
        line-height: 36px;
        border-left: 1px solid #e7e7e7;
    }

    .butTips .iconTip {
        background: url('../../../../../../static/img/jjbx/monitor/icon.png') no-repeat -441px -149px;
        display: block;
        width: 15px;
        height: 15px;
        margin: 10px 0 0 10px;
        vertical-align: middle;
    }

    .common-monitor-left .left-search {
        width: auto;
        height: 36px;
        border-bottom: 1px solid #e7e7e7;
        background-color: #f6f6f6;
    }

    .left-search .sea-select {
        width: auto;
        height: 33px;
        padding-left: 4px;
        padding-top: 3px;
    }

    .left-search label {
        display: inline-block;
        width: 60px;
        color: #b3b9c8;
        font-size: 12px;
    }

    .left-search label span {
        height: 37px;
        line-height: 37px;
        /* background: url('../../../../../static/img/jjbx/monitor/position/radio-noselect.jpg') no-repeat left center; */
        background-Repeat: 'no-repeat';
        background-position: left center;
        cursor: pointer;
        padding-left: 20px;
    }

    .sea-conditions .sea-option {
        width: 150px;
        font-size: 12px;
        cursor: pointer;
        background-color: #fff;
        box-shadow: 0 1px 0 #fff;
        overflow: hidden;
        clear: both;
        padding: 5px 10px;
    }

    .sea-conditions .sea-option:hover {
        background-color: #f5f5f5;
    }

    .common-monitor-body .el-input__inner {
        height: 30px !important;
        line-height: 30px !important;
    }

    .common-monitor-body .el-select .el-input {
        width: 50px;
    }

    .common-monitor-body .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    /* 搜索按钮 */
    .common-monitor-body .sea-select .el-button--primary {
        float: left;
        width: 23px;
        height: 30px;
        margin-top: 8px;
        margin-left: 6px;
        font-size: 12px;
        color: #aeaeae;
        margin: 0;
        padding: 0;
        border-radius: 0;
        background-color: #f6f6f6 !important;
        background-color: #f6f6f6 !important;
        border: 1px solid #e7e7e7 !important;
    }

    .common-monitor-body .sea-select .el-button--primary:focus,
    .common-monitor-body .sea-select .el-button--primary:hover {
        background: #e0f2fd !important;
        color: #444 !important;
    }

    /* 复选框 */
    .common-monitor-body .el-checkbox__label {
        font-size: 12px !important;
    }

    .search-input {
        float: left;
        font-size: 12px;
        width: calc(100% - 34px);
        height: 28px;
        margin: 0;
        padding: 0 0 0 5px;
        border-radius: 0;
        background-color: #fff;
        border: 1px solid #e7e7e7;
        /* border-left: 0; */
        border-right: 0;
        outline: none;
        overflow: hidden;
    }

    /* 进入 */
    .common-monitor-left-move-enter-active {
        transition: all .8s cubic-bezier(0.3, 0.5, 0.8, 1.0);
    }

    /* 离开 */
    .common-monitor-left-move-leave-active {
        transition: all .8s cubic-bezier(0.3, 0.5, 0.8, 1.0);
    }

    .common-monitor-left-move-enter,
    .common-monitor-left-move-leave-active {
        transform: translateX(-220px);
        opacity: 0.5;
    }

    /* element tree style */
    .common-monitor-body .custom-tree-node {
        flex: 1;
        display: flex;
        height: 18px;
        line-height: 18px;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        padding-right: 8px;
    }

    .common-monitor-body .custom-tree-node span img {
        /* margin-left: 5px; */
        height: 13px;
        width: 13px;
    }

    .common-monitor-body .el-tree-node__content {
        height: 20px !important;
    }

    .common-monitor-body .el-tree-node__label {
        font-size: 12px !important;
    }

    .common-monitor-body .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background: #409EFF !important;
        /* border: 1px solid #1C5180 !important; */
    }

    .common-monitor-body .el-checkbox__inner::after {
        /* border:1px solid #21A121 !important; */
        border: 1px solid #fff !important;
        border-left: 0 !important;
        border-top: 0 !important;
        height: 7px !important;
        left: 4px !important;
    }

    .common-monitor-body .el-checkbox__inner:hover {
        border: 1px solid #dcdfe6 !important;
    }

    /* element el-dialog */
    .common-monitor-body .el-dialog__header {
        background: #409EFF;
        padding: 10px 20px;
    }

    .common-monitor-body .el-dialog__headerbtn {
        top: 10px !important;
    }

    .common-monitor-body .el-dialog__headerbtn .el-dialog__close {
        color: #fff !important;
    }

    .common-monitor-body .el-dialog {
        position: absolute;
        max-height: calc(100% - 30px);
        max-width: calc(100% - 30px);
        top: 50%;
        left: 50%;
        margin: 0 !important;
        transform: translate(-50%, -50%);
        display: flex;

        flex-direction: column
    }

    .common-monitor-body .el-dialog>.el-dialog__body {
        overflow: auto
    }

    .common-monitor-left .bottom {
        position: absolute;
        box-sizing: content-box;
        height: 50px;
        line-height: 10px;
        bottom: 0;
        right: 0;
        text-align: right;
        padding-right: 10px;
        text-align: left;
        width: 100%;
        line-height: 50px;
    }

    .common-monitor-left .bottom .column {
        float: right;
        margin: 0 10px;
        line-height: 50px;
    }

    .common-monitor-left .bottom a {
        display: block;
        width: 21px;
        height: 21px;
        padding: 7px;
        border-radius: 3px;
        border: 1px solid transparent;
    }

    .common-monitor-left .bottom a:link,
    .common-monitor-left .bottom a:visited {
        color: #444;
    }

    .common-monitor-left .bottom a {
        outline: none;
        text-decoration: none;
        margin-top: 7px;
    }

    .common-monitor-left .bottom a:hover {
        border-color: #5eaee3;
        box-shadow: 0 0 5px rgba(94, 174, 227, 0.8);
        background: #fff;
    }

    .common-monitor-left .bottom a i.start {
        background-position: 0 0;
    }

    .common-monitor-left .bottom a i.cancel {
        background-position: -21px 0;
    }

    .common-monitor-left .bottom a i.pause {
        background-position: -63px 0;
    }

    .common-monitor-left .bottom a i {
        display: block;
        width: 21px;
        height: 21px;
        text-indent: -9999px;
        background: url('../../../../../../static/img/jjbx/monitor/icon_new.png') no-repeat;
    }

    .common-monitor-left .el-dialogs-row {
        height: auto;
        line-height: 40px;
        width: auto;
    }

    .el-dialogs-row span {
        font-size: 12px;
        color: #3F3F3F;
        letter-spacing: -0.34px;
        display: inline-block;
        text-align: right;
        margin-right: 5px;
    }

    .el-dialogs-row .selectDevice {
        border: 1px solid #C6CCD7;
        border-radius: 4px;
        height: 30px;
        font-size: 12px;
        width: 50%;
        padding-left: 5px;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
        align-items: center;
        color: black;
        background-color: white;
        cursor: default;
    }

    .el-dialogs-row .selectTemp {
        width: 100%;
        height: 30px;
        border-color: #C6CCD7;
        border-radius: 4px;
        padding-left: 5px;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
    }

    .el-dialogs-row textarea {
        box-sizing: border-box;
        width: 100%;
        height: 100px;
        border: 1px solid #C6CCD7;
        border-radius: 4px;
        resize: none;
    }

</style>
