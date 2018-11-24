<!--   
    name：紧急避险车辆管理添加页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：qiaoyh
    date：2018.9.5
-->
<template>
    <div  class="child-carAdd-body">
        <div class="child-carAdd-top">
            <div style="float:left;height:48px;line-height:48px;">
                <span style="font-size:16px;">添加车辆信息 </span>
                <span style="font-size:12px;color:#999999">“
                    <span style="color:red;"> * </span>”为必填项</span>
            </div>
            <div style="float:right;font-size:14px;height:48px;line-height:48px;margin-right:20px;">
                <a>车辆信息</a>
                <span style="color:#999999"> > 添加车辆信息</span>
            </div>
        </div>
        <div class="child-carAdd-center">
            <div class="child-carAdd-centerbox">
                <!-- <img> -->
                <span style="font-size:14px;color:#999999;">车辆信息自动识别</span>
            </div>
        </div>
        <div class="common-carAdd-form">
            <el-form :model="ruleForm" :rules="rules"  :label-position="labelPosition" ref="ruleForm" label-width="110px" class="demo-ruleForm" size="mini">
                
                <div style="width:100%;height:620px;background-color:#fff;padding-top:10px;">
                    <div class="child-carAdd-formtop">
                    <!-- <img> -->
                    车辆基本信息
                    </div>
                    <!-- <el-row> -->
                    <el-col :span=6>
                        <el-form-item label="车牌号" prop="carNum">
                            <el-input v-model="ruleForm.carNum" class="sys-common-input" style="border:none;"></el-input>
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
                    <!-- </el-row> -->
                    <el-col :span=6>
                        <el-form-item label="发动机号" prop="carEngineNum">
                            <el-input v-model="ruleForm.carEngineNum" class="sys-common-input" style="border:none;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="所属机构" prop="carOrgName" style="padding-left:5px;width:123px;height:28px;">
                                <el-cascader :options="options" filterable clearable  @change="getParentsId();"
    change-on-select v-model="ruleForm.carOrgName" class="sys-common-select" :props="props" style="width:123px;"></el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="车辆状态" prop="carStates">
                            <el-select v-model="ruleForm.carStates" clearable placeholder="请选择">
                                <el-option v-for="item in selectStatus" :key="item.id" :label="item.text" :value="item.text">
                                </el-option>
                            </el-select>
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
                            <el-select v-model="ruleForm.semiCarNum" clearable placeholder="请选择">
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
                    <!-- <el-col :span=5>
                        <el-form-item label="车队" prop="fleetId">
                            <el-select v-model="ruleForm.fleetId" placeholder="请选择">
                                <el-option v-for="item in selectStatus" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
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
                            <el-select v-model="ruleForm.carDriver1Id" clearable placeholder="请选择">
                                <el-option v-for="item in selectDriver1" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="第二司机" prop="carDriver2Id">
                            <el-select v-model="ruleForm.carDriver2Id" clearable placeholder="请选择">
                                <el-option v-for="item in selectDriver1" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span=24>
                        <div class="child-carAdd-formtop">
                        <!-- <img> -->
                        车辆运营信息
                        </div>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="额定转速" prop="carRateSpeed">
                            <el-input v-model="ruleForm.carRateSpeed" class="sys-common-input" style="border:none;"></el-input>
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
                        <el-form-item label="百公里参考油耗" prop="carOil100">
                            <el-input v-model="ruleForm.carOil100" class="sys-common-input" style="border:none;"></el-input>
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
                        <el-form-item label="购买日期" prop="carBuyDate" >
                            <el-date-picker v-model="ruleForm.carBuyDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0" style="width:123px;"> </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="强制报废期" prop="carOverDate">
                            <el-date-picker v-model="ruleForm.carOverDate" type="date" placeholder="选择日期" :picker-options="pickerOptions1" style="width:123px;"> </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span=6>
                        <el-form-item label="下次保养时间" prop="carNextCareDate">
                            <el-date-picker v-model="ruleForm.carNextCareDate" type="date" placeholder="选择日期" :picker-options="pickerOptions1" style="width:123px;"> </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span=12>
                        <el-form-item label="交强险有效期" prop="carJqxDate">
                            <el-date-picker v-model="ruleForm.carJqxDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:410px;"></el-date-picker>
                            <!-- <el-input v-model="ruleForm.carJqxDate" class="sys-common-input" style="border:none;"></el-input> -->
                        </el-form-item>
                    </el-col>
                    <el-col :span=24>
                        <el-form-item label="商业保险有效期" prop="carSyxDate">
                            <el-date-picker v-model="ruleForm.carSyxDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:410px;"></el-date-picker>
                            <!-- <el-input v-model="ruleForm.carSyxDate" class="sys-common-input" style="border:none;"></el-input> -->
                        </el-form-item>
                    </el-col>
                </div>   
            </el-form>
            <div style="text-align:center;width: 100%;height: 49px;background: #EEEEEE;">
                <button type="button" class="button-info" @click="onSave('ruleForm');">保存</button>
                <button type="button" class="button-info" @click="onBack();">返回</button>
            </div>
        </div>
        <!-- <div style="width:1198px;border:1px solid #E4E4E4;margin-top:10px;box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);">
            <div style="width:1179px;height:38px;line-height:38px;padding-left:19px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);"><img>管理信息</div>
            <div class="common-carAdd-form" style="width:100%;background-color:#fff;">
                <form :model="ruleForm" ref="ruleForm" :rules="rules" style="padding-left:1%;">
                    <table style="width:100%;">
                        <tr style="height:40px;line-height:40px;">
                            <td style="width:8%;line-height:28px;">车牌号码：</td>
                            <td style="width:15%;line-height:28px;">
                                <input class="sys-common-input" prop="name1" placeholder="请输入" v-model="ruleForm.carNum">
                            </td>
                            <td style="width:8%;">车牌颜色：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carPlateColor">
                            </td>
                            <td style="width:8%;">车辆颜色：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carColor">
                            </td>
                            <td style="width:8%;">车辆识别码：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carCode">
                            </td>
                        </tr>
                        <tr style="height:40px;line-height:40px;">
                            <td style="width:8%;line-height:28px;">发动机号：</td>
                            <td style="width:15%;line-height:28px;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carEngineNum">
                            </td>
                            <td style="width:8%;">所属机构：</td>
                            <td style="width:15%;">
                                <select class="sys-common-select" v-model="ruleForm.carOrgName">
                                    <option value="">请选择</option>
                                    <option v-for="item in selectOrg" :key="item.id" :value="item.id">{{item.text}} </option>
                                </select>
                            </td>
                            <td style="width:8%;">所属企业：</td>
                            <td style="width:15%;">
                                <select class="sys-common-select" v-model="ruleForm.companyName">
                                    <option value="">请选择</option>
                                    <option v-for="item in selectOrg" :key="item.id" :value="item.id">{{item.text}} </option>
                                </select>
                            </td>
                            <td style="width:8%;">车辆状态：</td>
                            <td style="width:15%;">
                                <select class="sys-common-select" v-model="ruleForm.carStates">
                                    <option value="">请选择</option>
                                    <option v-for="item in selectStatus" :key="item.id" :value="item.id">{{item.text}}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:8%;">车辆品牌：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carBrand">
                            </td>
                            <td style="width:8%;">购买时间：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carBuyDate">
                            </td>
                            <td style="width:8%;">购买价值：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carBuyPrice">
                            </td>
                            <td style="width:8%;">运输介质：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carMedium">
                            </td>
                        </tr>
                    </table>
                    </form>
                    </div>

                    <div style="width:1179px;height:38px;line-height:38px;padding-left:19px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);"><img>运营信息</div>
                    <div style="width:100%;height:160px;background-color:#fff;">
                <form :model="ruleForm" ref="ruleForm" style="padding-left:1%;">
                    <table style="width:100%;">
                        <tr style="height:40px;line-height:40px;">
                            <td style="width:8%;line-height:28px;">经营范围：</td>
                            <td style="width:15%;line-height:28px;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carScope">
                            </td>
                            <td style="width:8%;">交强险有效期：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carJqxDate">
                            </td>
                            <td style="width:8%;">商业保险有效期：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carSyxDate">
                            </td>
                            <td style="width:8%;">挂车车牌号：</td>
                            <td style="width:15%;">
                                <select class="sys-common-select" v-model="ruleForm.semiCarNum">
                                    <option value="">请选择</option>
                                    <option v-for="item in selectOrg" :key="item.id" :value="item.id">{{item.text}} </option>
                                </select>
                            </td>
                        </tr>
                        <tr style="height:40px;line-height:40px;">
                            <td style="width:8%;line-height:28px;">车长：</td>
                            <td style="width:15%;line-height:28px;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carLength">
                            </td>
                            <td style="width:8%;line-height:28px;">车宽：</td>
                            <td style="width:15%;line-height:28px;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carWide">
                            </td>
                            <td style="width:8%;line-height:28px;">车高：</td>
                            <td style="width:15%;line-height:28px;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carHigh">
                            </td>
                            <td style="width:8%;">箱型：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carCarriage">
                            </td>
                        </tr>
                        <tr>
                            <td style="width:8%;">车队：</td>
                            <td style="width:15%;">
                                <select class="sys-common-select" v-model="ruleForm.fleetId">
                                    <option value="">请选择</option>
                                    <option v-for="item in selectOrg" :key="item.id" :value="item.id">{{item.text}} </option>
                                </select>
                            </td>
                            <td style="width:8%;">Gps设备编号：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.gpsNo">
                            </td>
                            <td style="width:8%;">强制报废期：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carOverDate">
                            </td>
                        </tr>
                    </table>

                    </form> 
            </div>
                    <div style="width:1179px;height:38px;line-height:38px;padding-left:19px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(30,30,30,1);"><img>运营信息</div>
                    <div style="width:100%;height:160px;background-color:#fff;">
                <form :model="ruleForm" ref="ruleForm" style="padding-left:1%;">
                    <table style="width:100%;">
                        <tr style="height:40px;line-height:40px;">
                            
                            <td style="width:8%;">车架号：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carFrameNo">
                            </td>
                            <td style="width:8%;">额定体积：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carVolume">
                            </td>
                            <td style="width:8%;">额定载重：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carWeight">
                            </td>
                        </tr>
                        <tr>
                            <td style="width:8%;">核载人数：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carRealPeople">
                            </td>
                            <td style="width:8%;">标准使用年限：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carServiceYears">
                            </td>
                            <td style="width:8%;">车辆类型：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carType">
                            </td>
                        </tr>
                        <tr>
                            <td style="width:8%;">第一司机：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carDrive1Id">
                            </td>
                            <td style="width:8%;">第二司机：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carServiceYears">
                            </td>
                        </tr>
                        <tr style="height:40px;line-height:40px;">
                            <td style="width:8%;line-height:28px;">本车百公里参考油耗：</td>
                            <td style="width:15%;line-height:28px;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carOil100">
                            </td>
                            <td style="width:8%;line-height:28px;">油耗因子：</td>
                            <td style="width:15%;line-height:28px;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carOilFactor">
                            </td>
                            <td style="width:8%;line-height:28px;">里程因子：</td>
                            <td style="width:15%;line-height:28px;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carMileageFactor">
                            </td>
                            <td style="width:8%;">额定转速：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carRateSpeed">
                            </td>
                        </tr>
                        <tr>
                            <td style="width:8%;">下次保养时间：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carNextCareDate">
                            </td>
                            <td style="width:8%;">每日行驶时间：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carRunTime">
                            </td>
                            <td style="width:8%;">每日行驶里程：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carRunMileage">
                            </td>
                            <td style="width:8%;">车实际运行公里数：</td>
                            <td style="width:15%;">
                                <input class="sys-common-input" placeholder="请输入" v-model="ruleForm.carRealMileage">
                            </td>
                        </tr>
                    </table>
                    <div style="text-align:center;">
                        <button type="button" class="button-info" @click="onSave('ruleForm');">保存</button>
                        <button type="button" class="button-info" @click="onBack();">返回</button>
                    </div>
                </form>
            </div>
        </div> -->
    </div>
</template>
<script>
    import ajax from "axios";
    export default {
        data() {
            return {
                props: {
                    value: "id"
                },
                selectOrg: [],
                selectStatus: [],
                selectDriver1:[],
                selectDriver2:[],
                selectCarType:[],
                selectCarPlateColor:[],
                selectOrganNameLabel:'',
                ruleForm: {},
                options:[{
                    id:'',
                    label:'',
                    children:[{
                        id:'',
                        label:'',
                    }]
                }],
                rules: {
                    carNum: [
                        { required: true, message: '请输入车牌号码', trigger: 'blur' },
                        { min: 7, max: 7, message: '长度 7 个字符', trigger: 'blur' }
                    ],
                    carOrgName: [
                        { required: true, message: '请选择所属机构', trigger: 'change' }
                    ],
                    // carStates:[
                    //     { required: true, message: '请选择车辆状态', trigger: 'change' }
                    // ]
                },
                labelPosition:'left',
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
            };
        },
        created() {
            let _this = this;
            _this.getOrg();
            _this.getStatus();
            _this.getDriver1();
            _this.getCarType();
            _this.getCarPlateColor();
        },
        methods: {
            /**
         * @function 根据机构ID获取其父id，名称
         * @return {type} {description}
         */
        getParentsId(){
            let _this = this;
            // console.log(_this.ruleForm.carOrgName);
            let str = _this.ruleForm.carOrgName;
            // console.log(str.substr(str.length-1,str.length));
            console.log(str[str.length-1]);
            ajax.get(_this.global_.apiUrlJj + "/get/select-organ-id?id=" + str[str.length-1])
                .then(function (res) {
                    console.log(res);
                    if( res.data.data){
                        // _this.ruleForm.parentId = res.data.data.parentId;
                        _this.selectOrganNameLabel = res.data.data.organName;
                        console.log(_this.selectOrganNameLabel);
                    }
                    // else{
                    //     _this.ruleForm.parentId = 0;
                    // }
                    
                });
            
        },
        onSave(formName) {
            this.$refs[formName].validate((valid) => {
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
                        carStates: _this.ruleForm.carStates,
                        carScope: _this.ruleForm.carScope,
                        carLength: _this.ruleForm.carLength,
                        carWide: _this.ruleForm.carWide,
                        carHigh: _this.ruleForm.carHigh,
                        carCarriage: _this.ruleForm.carCarriage,
                        carVolume: _this.ruleForm.carVolume,
                        carWeight: _this.ruleForm.carWeight,
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
                        carOrgName:_this.selectOrganNameLabel,
                        carOrgCode: _this.ruleForm.carOrgName[_this.ruleForm.carOrgName.length-1],
                        organParentsId: getPersonOrganIds(),
                        // fleetId: _this.ruleForm.fleetId,
                        gpsNo: _this.ruleForm.gpsNo,
                        semiCarNum: _this.ruleForm.semiCarNum,
                        carDriver1Id: _this.ruleForm.carDriver1Id,
                        carDriver2Id: _this.ruleForm.carDriver2Id,
                        carOilFactor: _this.ruleForm.carOilFactor,
                    };
                    ajax.post(_this.global_.apiUrlJj + "/post/save-car?OrganParentsId=" + getPersonOrganIds(), postData)
                        .then(function (res) {
                            console.log(res);
                            console.log(getPersonOrganIds);
                            if (res.data.isSuccess) {
                                //跳转页面
                                _this.$message({
                                    showClose: true,
                                    message: "保存成功！",
                                    type: "success"
                                });
                                _this.$router.push({name:'sm_vehicle_vehicle'});
                            } else {
                                _this.$message({
                                    message: "保存失败！"
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
        onBack() {
            let _this = this;
            _this.$router.go(-1);
        },
        /**
         * @function {获取所属机构信息}
         * @return {string} {机构名称}
         */
        getOrg() {
            let _this = this;
            ajax
                .get(_this.global_.apiUrlJj + "/get/select-organ?id=5")
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
        },
    }
};
</script>
<style>
    /* body{
        margin: 50px auto;
    } */

    /* el-form begin */
    .child-carAdd-body{width:1200px;margin: 0px auto;}
    .child-carAdd-top{width:1180px;height:48px;line-height:48px;padding-left:20px;background-color:#F8F8F8;}
    .child-carAdd-center{width:1198px;height:98px;line-height:98px;border:1px solid #E4E4E4;background-color:#fff;box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);}
    .child-carAdd-centerbox{width:1160px;height:56px;line-height:56px;border:1px dashed #CCCCCC;text-align:center;margin-left:20px;margin-top:18px;background-color:#F8F8F8;}
    .common-carAdd-form{
        width:1198px;border-top:1px solid #E4E4E4;border-bottom:1px solid #E4E4E4; box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);
    }
    .child-carAdd-formtop{width:1179px;height:38px;line-height:38px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color: #2f95f4;}
    .common-carAdd-form .el-form {
        margin: 0px auto !important;
        width: 1150px !important;
        height: 630px;
        border-bottom: 1px solid rgba(238, 238, 238, 1) !important;
    }
    .common-carAdd-form .el-date-editor.el-input, .el-date-editor.el-input__inner{
        /* width: 123px; */
        margin-left: 10px;
    }
    
    .button-info {
        /* display: inline-block; */
        width: 68px;
        height: 29px;
        background-color: #2f95f4;
        color: #fff;
        border: 1px solid;
        border-radius: 4px;
        /* float: right; */
        margin-top: 10px;
        line-height: 29px;
        margin-bottom: 10px;
    }
    .common-carAdd-form .el-select {
        display: block !important;
        position: relative !important;
        width: 123px !important;
        padding-left: 10px;
    }
    .common-carAdd-form  .el-input--mini .el-input__inner{
        width: 123px;
    }
    /* .el-form-item__label{
        width: 100px !important;
        text-align: left;
    } */
    .common-carAdd-form .el-form-item--mini .el-form-item__error{
        width: 84px;
    }
    /* .common-carAdd-form .el-date-picker{
        background-color: none !important;
    }
    .common-carAdd-form .el-picker-panel{
        border: 1px solid #2f95f4 !important;
    }
    .common-carAdd-form .el-picker-panel{
        top:none !important;
    }
    .common-carAdd-form .el-date-range-picker .el-picker-panel__content{
        border: 1px solid #2f95f4 !important;
    } */
</style>