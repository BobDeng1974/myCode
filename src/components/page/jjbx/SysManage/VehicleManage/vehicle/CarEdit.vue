<!--   
    name：紧急避险车辆管理编辑页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：qiaoyh
    date：2018.9.5
-->
<template>
    <div class="child-carEdit-body">
        <div class="child-carEdit-top">
            <div style="float:left;height:48px;line-height:48px;">
                <span style="font-size:16px;">修改车辆信息 </span>
                <span style="font-size:12px;color:#999999">“<span style="color:red;"> * </span>”为必填项</span>
            </div>
            <div class="child-carEdit-topbot"><a>车辆信息</a><span style="color:#999999"> > 修改车辆信息</span></div>
        </div>
        <div class="child-carEdit-center">
            <div class="child-carEdit-cenbox">
                <!-- <img> -->
                <span style="font-size:14px;color:#999999;">车辆信息自动识别</span>
            </div>
        </div>
        <div class="common-CarEdit-form" >
            <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" ref="ruleForm" label-width="110px" class="demo-ruleForm" size="mini">
                
                <div style="width:100%;height:620px;background-color:#fff;padding-top:10px;">
                    <div class="child-carAdd-formtop">
                    <!-- <img> -->
                    车辆基本信息
                    </div>
                    <el-col :span=6>
                        <el-form-item label="车牌号" prop="carNum">
                            <el-input v-model="ruleForm.carNum" class="sys-common-input" style="border:none;" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="车牌颜色" prop="carPlateColor">
                            <!-- <el-input v-model="ruleForm.carPlateColor" class="sys-common-input" style="border:none;"></el-input> -->
                            <el-select v-model="ruleForm.carPlateColor" clearable placeholder="请选择">
                                <el-option v-for="item in selectCarPlateColor" :key="item.id" :label="item.text" :value="item.text">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="车辆颜色" prop="carColor">
                            <el-input v-model="ruleForm.carColor" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="车辆识别码" prop="carCode">
                            <el-input v-model="ruleForm.carCode" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span=6>
                        <el-form-item label="发动机号" prop="carEngineNum" >
                            <el-input v-model="ruleForm.carEngineNum" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="所属机构" prop="carOrgName"  v-loading="orgLoad" style="height:28px;">
                            <el-cascader :options="options" filterable clearable  @change="getParentsId();" style="padding-left:10px;"
    change-on-select v-model="ruleForm.carOrgName" class="sys-common-select" :props="props"></el-cascader>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span=5>
                        <el-form-item label="所属企业" prop="companyName">
                            <el-select v-model="ruleForm.companyName" placeholder="请选择">
                                <el-option v-for="item in selectOrg" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span=6>
                        <el-form-item label="车辆状态" prop="carStates">
                            <el-select v-model="ruleForm.carStates" placeholder="请选择">
                                <el-option v-for="item in selectStatus" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span=6>
                        <el-form-item label="车辆品牌" prop="carBrand">
                            <el-input v-model="ruleForm.carBrand" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    
                    <el-col :span=6>
                        <el-form-item label="购买价值" prop="carBuyPrice">
                            <el-input v-model="ruleForm.carBuyPrice" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="运输介质" prop="carMedium">
                            <el-input v-model="ruleForm.carMedium" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span=6>
                        <el-form-item label="经营范围" prop="carScope">
                            <el-input v-model="ruleForm.carScope" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="挂车车牌号" prop="semiCarNum">
                            <el-select v-model="ruleForm.semiCarNum" placeholder="请选择">
                                <el-option v-for="item in selectStatus" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="车长" prop="carLength">
                            <el-input v-model="ruleForm.carLength" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="车宽" prop="carWide">
                            <el-input v-model="ruleForm.carWide" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="车高" prop="carHigh">
                            <el-input v-model="ruleForm.carHigh" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="箱型" prop="carCarriage">
                            <el-input v-model="ruleForm.carCarriage" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- // <el-col :span=5>
                    //     <el-form-item label="车队" prop="fleetId">
                    //         <el-select v-model="ruleForm.fleetId" placeholder="请选择">
                    //             <el-option v-for="item in selectStatus" :key="item.id" :label="item.text" :value="item.id">
                    //             </el-option>
                    //         </el-select>
                    //     </el-form-item>
                    // </el-col> -->
                    <el-col :span=6>
                        <el-form-item label="Gps设备编号" prop="gpsNo">
                            <el-input v-model="ruleForm.gpsNo" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="车架号" prop="carFrameNo">
                            <el-input v-model="ruleForm.carFrameNo" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span=6>
                        <el-form-item label="额定体积" prop="carVolume">
                            <el-input v-model="ruleForm.carVolume" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="额定载重" prop="carWeight">
                            <el-input v-model="ruleForm.carWeight" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="核载人数" prop="carRealPeople">
                            <el-input v-model="ruleForm.carRealPeople" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="标准使用年限" prop="carServiceYears">
                            <el-input v-model="ruleForm.carServiceYears" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span=6>
                        <el-form-item label="车辆类型" prop="carType">
                            <el-select v-model="ruleForm.carType" clearable placeholder="请选择">
                                <el-option v-for="item in selectCarType" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span=24>
                        <div class="child-carAdd-formtop">
                        <!-- <img> -->
                        司机信息
                        </div>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="第一司机" prop="carDriver1Id">
                            <el-select v-model="ruleForm.carDriver1Id" placeholder="请选择">
                                <el-option v-for="item in selectDriver1" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="第二司机" prop="carDriver2Id">
                            <el-select v-model="ruleForm.carDriver2Id" placeholder="请选择">
                                <el-option v-for="item in selectDriver1" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span=24>
                        <div class="child-carEdit-formtop">
                        <!-- <img> -->
                        车辆运营信息
                        </div>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="百公里参考油耗" prop="carOil100">
                            <el-input v-model="ruleForm.carOil100" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="油耗因子" prop="carOilFactor">
                            <el-input v-model="ruleForm.carOilFactor" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="里程因子" prop="carMileageFactor">
                            <el-input v-model="ruleForm.carMileageFactor" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="额定转速" prop="carRateSpeed">
                            <el-input v-model="ruleForm.carRateSpeed" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="每日行驶时间" prop="carRunTime">
                            <el-input v-model="ruleForm.carRunTime" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="每日行驶里程" prop="carRunMileage">
                            <el-input v-model="ruleForm.carRunMileage" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="实际运行公里数" prop="carRealMileage">
                            <el-input v-model="ruleForm.carRealMileage" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="购买日期" prop="carBuyDate">
                            <el-date-picker v-model="ruleForm.carBuyDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0" style="width:123px;"> </el-date-picker>
                        </el-form-item>
                    </el-col>
                    
                    <el-col :span=6>
                        <el-form-item label="下次保养时间" prop="carNextCareDate">
                            <el-date-picker v-model="ruleForm.carNextCareDate" type="date" placeholder="选择日期" :picker-options="pickerOptions1" style="width:123px;"> </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="强制报废期" prop="carOverDate">
                            <el-date-picker v-model="ruleForm.carOverDate" type="date" placeholder="选择日期" :picker-options="pickerOptions1" style="width:123px;"> </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span=12>
                        <el-form-item label="交强险有效期" prop="carJqxDate">
                            <el-date-picker v-model="ruleForm.carJqxDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:410px;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span=24>
                        <el-form-item label="商业保险有效期" prop="carSyxDate">
                            <el-date-picker v-model="ruleForm.carSyxDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:410px;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </div>
            </el-form>
            <div style="text-align:center;width: 100%;height: 49px;background: #EEEEEE;">
                <button type="button" class="button-info" @click="onSave('ruleForm');">保存</button>
                <button type="button" class="button-info" @click="onBack();">返回</button>
            </div>
        </div>
        
    </div>
</template>
<script>
import ajax from "axios";
  export default {
    data() {
        return {
            selectOrg: [],
            selectStatus: [],
            selectDriver1:[],
            selectDriver2:[],
            selectCarType:[],
            selectCarPlateColor:[],
            selectOrganNameLabel:'',
            props: {
                value: "id"
            },
            options:[{
                    id:'',
                    label:'',
                    children:[{
                        id:'',
                        label:'',
                    }]
                }],
            ruleForm: {
                carOrgName:[]
            },
            rules: {
                // carOrgName: [
                //     { required: true, message: '请选择所属机构', trigger: 'change' }
                // ]
            },
            labelPosition:'left',
            orgLoad:false,
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6
                }
            }, 
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },   
        }
    },
    created() {
        let _this = this;
        _this.getOrg();
        _this.getStatus();
        _this.getDriver1();
        _this.getDate();
        _this.getCarPlateColor();
    },
    methods: {
        /**
         * @function 根据机构ID获取其父id，名称
         * @return {type} {description}
         */
        getParentsId(){
            let _this = this;
            // console.log(_this.ruleForm.organName);
            let str = _this.ruleForm.carOrgName;
            // console.log(str.substr(str.length-1,str.length));
            console.log(str[str.length-1]);
            ajax.get(_this.global_.apiUrlJj + "/get/select-organ-id?id=" + str[str.length-1])
                .then(function (res) {
                    console.log(res);
                    if( res.data.data){
                        // _this.ruleForm.organParentsId = res.data.data.parentId;
                        _this.selectOrganNameLabel = res.data.data.organName;
                        console.log(_this.selectOrganNameLabel);
                    }
                    // else{
                    //     _this.ruleForm.organParentsId = 0;
                    // }
                    
                });
            
        },
        getDate(){
            let _this = this;
            // _this.param = _this.$route.params;
            // console.log(param);
            let param = this.$route.params.id;
            ajax.get(_this.global_.apiUrlJj + "/get/select-car?id=" + param)
                .then(function (res) {
                    console.log(res);
                    _this.ruleForm.carNum = res.data.data.carNum
                    _this.ruleForm.carBrand = res.data.data.carBrand
                    _this.ruleForm.carPlateColor = res.data.data.carPlateColor
                    _this.ruleForm.carColor = res.data.data.carColor
                    _this.ruleForm.CarType = res.data.data.CarType
                    _this.ruleForm.carCode = res.data.data.carCode
                    _this.ruleForm.carEngineNum = res.data.data.carEngineNum
                    _this.ruleForm.carJqxDate = res.data.data.carJqxDate
                    _this.ruleForm.CarStates = res.data.data.CarStates
                    _this.ruleForm.CarScope = res.data.data.CarScope
                    _this.ruleForm.carMedium = res.data.data.carMedium
                    _this.ruleForm.carOrgName = res.data.data.organParentsId.split(",").map(Number)
                    _this.ruleForm.carLength = res.data.data.carLength
                    _this.ruleForm.carWide = res.data.data.carWide
                    _this.ruleForm.carHigh = res.data.data.carHigh
                    _this.ruleForm.carCarriage = res.data.data.carCarriage
                    _this.ruleForm.carVolume = res.data.data.carVolume
                    _this.ruleForm.carWeight = res.data.data.carWeight
                    _this.ruleForm.carOil100 = res.data.data.carOil100
                    _this.ruleForm.carOverDate = res.data.data.carOverDate
                    _this.ruleForm.carRateSpeed = res.data.data.carRateSpeed
                    _this.ruleForm.carMileageFactor = res.data.data.carMileageFactor
                    _this.ruleForm.carNextCareDate = res.data.data.carNextCareDate
                    _this.ruleForm.carRealMileage = res.data.data.carRealMileage
                    _this.ruleForm.carDriver1Id = res.data.data.carDriver1Id
                    _this.ruleForm.carDriver2Id = res.data.data.carDriver2Id
                    _this.ruleForm.Gpsno = res.data.data.Gpsno
                    _this.ruleForm.carRealPeople = res.data.data.carRealPeople
                    _this.ruleForm.carBuyDate = res.data.data.carBuyDate
                    _this.ruleForm.carBuyPrice = res.data.data.carBuyPrice
                    _this.ruleForm.carFrameNo = res.data.data.carFrameNo
                    _this.ruleForm.carRunMileage = res.data.data.carRunMileage
                    _this.ruleForm.carRunTime = res.data.data.carRunTime
                    _this.ruleForm.carServiceYears = res.data.data.carServiceYears
                    _this.ruleForm.companyName = res.data.data.companyName
                    _this.ruleForm.carSyxDate = res.data.data.carSyxDate
                    _this.ruleForm.fleetId = res.data.data.fleetId
                    _this.ruleForm.carOilFactor = res.data.data.carOilFactor
                    console.log(_this.ruleForm.carOrgName);
                })
                .catch(function (error) {
                    console.log(error);
                }); 
        },
        onSave(formName) {
            // let _this = this; 
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let _this = this;
                    let getPersonOrganIds = function() {
                        let ids = "";
                        _this.ruleForm.carOrgName.forEach((ele, i) => {
                            if (i == _this.ruleForm.carOrgName.length - 1) {
                                ids = ids + ele.toString();
                            } else {
                                ids = ids + ele.toString() + ",";
                            }
                        });
                        return ids;
                    };
                    let postData = {
                        // id:_this.$route.params.id,
                        carNum: _this.ruleForm.carNum,
                        carPlateColor: _this.ruleForm.carPlateColor,
                        carColor: _this.ruleForm.carColor,
                        carCode: _this.ruleForm.carCode,
                        carBrand: _this.ruleForm.carBrand,
                        carBuyDate: _this.ruleForm.carBuyDate,
                        carBuyPrice: _this.ruleForm.carBuyPrice,
                        carEngineNum: _this.ruleForm.carEngineNum,
                        carJqxDate: _this.ruleForm.carJqxDate,
                        carMedium: _this.ruleForm.carMedium,
                        carMileageFactor: _this.ruleForm.carMileageFactor,
                        carNextCareDate: _this.ruleForm.carNextCareDate,
                        carFrameNo: _this.ruleForm.carFrameNo,
                        carOrgName: _this.selectOrganNameLabel,
                        carOrgCode: _this.ruleForm.carOrgName[_this.ruleForm.carOrgName.length-1],
                        organParentsId: getPersonOrganIds(),
                        carStates: _this.ruleForm.carStates,
                        carScope: _this.ruleForm.carScope,
                        carLength: _this.ruleForm.carLength,
                        carWide: _this.ruleForm.carWide,
                        carHigh: _this.ruleForm.carHigh,
                        carCarriage: _this.ruleForm.carCarriage,
                        carVolume: _this.ruleForm.carVolume,
                        carWeight: _this.ruleForm.carWeight,
                        carDriver1Id: _this.ruleForm.carDriver1Id,
                        carDriver2Id: _this.ruleForm.carDriver2Id,
                        carOil100: _this.ruleForm.carOil100,
                        carOverDate: _this.ruleForm.carOverDate,
                        carRateSpeed: _this.ruleForm.carRateSpeed,
                        carRealMileage: _this.ruleForm.carRealMileage,
                        carRealPeople: _this.ruleForm.carRealPeople,
                        carRunMileage: _this.ruleForm.carRunMileage,
                        carRunTime: _this.ruleForm.carRunTime,
                        carServiceYears: _this.ruleForm.carServiceYears,
                        carSyxDate: _this.ruleForm.carSyxDate,
                        carType: _this.ruleForm.carType,
                        companyName: _this.ruleForm.companyName,
                        fleetId: _this.ruleForm.fleetId,
                        gpsNo: _this.ruleForm.gpsNo,
                        semiCarNum: _this.ruleForm.semiCarNum,
                        carOilFactor: _this.ruleForm.carOilFactor
                    };
                    ajax.post(_this.global_.apiUrlJj + "/post/update-car?id=" + _this.$route.params.id,postData)
                        .then(function (res) {
                            console.log(res);
                            console.log(postData);
                            console.log(_this.$route.params.id);
                            if(res.data.isSuccess){
                                //跳转页面
                                _this.$message({
                                showClose: true,
                                message: '修改成功！',
                                type: 'success'
                                });
                                _this.$router.push({name:'sm_vehicle_vehicle'})
                            }else{
                                _this.$message({
                                message: '修改失败！'
                                });
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
        },
        onBack(){
            let _this = this; 
            _this.$router.go(-1)
        },
        /**
        * @function {获取所属机构信息}
        * @return {string} {机构名称}
        */
        getOrg(){
            let _this = this;
            _this.orgLoad = true;
            ajax.get(_this.global_.apiUrlJj + "/get/select-organ?id=5")
                .then(function (res) {
                    console.log(res);
                    _this.orgLoad = false;
                    // var obj = {}
                    if (res.data) {
                        if (res.data.data) {
                            _this.options = res.data.data;
                        }
                    }
                })
                .catch(function(error) {
                _this.orgLoad=false;
                console.log(error);
                });
        },
        getStatus(){
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
        getDriver1(){
                let _this = this;
                ajax.get(_this.global_.apiUrlJj + "/get/person-credent?currentPage=1&pageSize=20",null)
                    .then(function (res) {
                        console.log(res);
                        // var obj = {}
                        if (res.data) {
                            if (res.data.data) {
                                res.data.data.content.forEach((item, index) => {
                                    _this.selectDriver1.push({
                                        id: item.credentId,
                                        text: item.infoPersonEntity.personName
                                    });
                                });
                            }
                        }
                    });
            },
            getCarType(){
                let _this = this;
                ajax.get(_this.global_.apiUrlJj + "/get/status?type=carType")
                    .then(function (res) {
                        console.log(res);
                        // var obj = {}
                        if (res.data) {
                            if (res.data.data) {
                                res.data.data.forEach((item, index) => {
                                    _this.selectCarType.push({
                                        id: item.id,
                                        text: item.dictNumName,
                                    });
                                });
                            }
                        }
                    });
            },
        getCarPlateColor(){
            let _this = this;
            ajax.get(_this.global_.apiUrlJj + "/get/status?type=carPlateColor")
                .then(function (res) {
                    console.log(res);
                    // var obj = {}
                    if (res.data) {
                        if (res.data.data) {
                            res.data.data.forEach((item, index) => {
                                _this.selectCarPlateColor.push({
                                    id: item.id,
                                    text: item.dictNumName,
                                });
                            });
                        }
                    }
                });
        }
    },
    //从详情页返回主页时把主页的keepAlive值设置为true
    beforeRouteLeave(to, from, next) {
        if (to.path == "/jjbx/SysManage/vehicle/vehicle") {
            to.meta.keepAlive = true;
        } else {
            to.meta.keepAlive = false;
        }
        next();
    }
}
</script>
<style>
    /* body{
        margin: 50px auto;
    } */
    .child-carEdit-body{
        width:1200px;margin:0px auto;
    }
    .child-carEdit-body .child-carEdit-top{width:1180px;height:48px;line-height:48px;padding-left:20px;background-color:#F8F8F8;}
    .child-carEdit-body .child-carEdit-topbot{float:right;font-size:14px;height:48px;line-height:48px;margin-right:20px;}
    .child-carEdit-body .child-carEdit-center{width:1198px;height:98px;line-height:98px;border:1px solid #E4E4E4;background-color:#fff;box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);}
    .child-carEdit-body .child-carEdit-cenbox{width:1160px;height:56px;line-height:56px;border:1px dashed #CCCCCC;text-align:center;margin-left:20px;margin-top:18px;background-color:#F8F8F8;}
    /* el-form begin */
    .common-CarEdit-form{
        width:1198px;border-top:1px solid #E4E4E4;border-bottom:1px solid #E4E4E4; box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);
    }
    .child-carAdd-formtop{width:1179px;height:38px;line-height:38px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color: #2f95f4;}
    .common-CarEdit-form .el-form{
        margin: 0px auto !important;
        width: 1150px !important;
        height: 630px;
        border-bottom: 1px solid rgba(238,238,238,1) !important;
    }
    .child-carEdit-body .el-input--mini .el-input__inner{
        box-shadow: 0px 0px 6px 0px rgba(25,107,255,0.1) !important;
        width: 123px;
    }
    .button-info{
        /* display: inline-block; */
        width: 68px;
        height: 29px;
        background-color: #2F95F4;
        color: #fff;
        border: 1px solid;
        border-radius: 4px;
        /* float: right; */
        margin-top: 10px;
        line-height: 29px;
        margin-bottom: 10px;
    }
    .common-CarEdit-form .el-select {
        display: block !important;
        position: relative !important;
        width: 123px !important;
        padding-left: 10px;
    }
    .child-carEdit-formtop{width:1179px;height:38px;line-height:38px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color: #2f95f4;}
    .common-CarEdit-form .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label{height: 28px;}
</style>
