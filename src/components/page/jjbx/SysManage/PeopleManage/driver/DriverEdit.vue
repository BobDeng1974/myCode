<!--   
    name：紧急避险司机管理添加页面
    desc：紧急避险二级界面
    param：None        
    return Value : None
    author：qiaoyh
    date：2018.9.11
-->
<template>
<div class="child-driEdit-body">
            <!-- 添加司机信息 -->
            <div class="child-driEdit-top">
            <div style="float:left;height:48px;line-height:48px;">
                <span style="font-size:16px;">修改驾驶员信息 </span>
                <span style="font-size:12px;color:#999999">“
                    <span style="color:red;"> * </span>”为必填项</span>
            </div>
            <div style="float:right;font-size:14px;height:48px;line-height:48px;margin-right:20px;">
                <a>驾驶员信息</a>
                <span style="color:#999999"> > 修改驾驶员信息</span>
            </div>
        </div>
        <div class="child-driEdit-center">
            <div class="child-driEdit-centerbox">
                <!-- <img> -->
                <span style="font-size:14px;color:#999999;">驾驶员信息自动识别</span>
            </div>
        </div>
            <!-- 管理信息 -->
            <div class="child-driEdit-form">
                <el-form :model="ruleForm" :rules="rulesForm"  :label-position="labelPosition" ref="ruleForm" label-width="110px" class="demo-ruleForm" size="mini"
                    style=" margin: 0px auto !important;width: 1150px !important;border-bottom: 1px solid rgba(238, 238, 238, 1) !important;">
                    <div style="width:100%;height:650px;background-color:#fff;">
                        <div class="child-driEdit-title"><img>驾驶员基本信息</div>
                            <el-col :span=6>
                                <el-form-item label="姓名" prop="personName">
                                    <el-input v-model="ruleForm.personName" class="sys-common-input" style="border:none;"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span=6>
                                <el-form-item label="性别" prop="sex">
                                    <el-select v-model="ruleForm.sex" placeholder="请选择" style="height:28px;">
                                        <el-option label="男" value="男"></el-option>
                                        <el-option label="女" value="女"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span=6>
                                <el-form-item label="工号" prop="personWorknum">
                                    <el-input v-model="ruleForm.personWorknum" class="sys-common-input" style="border:none;"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span=6>
                                <el-form-item label="手机号" prop="phone">
                                    <el-input v-model="ruleForm.phone" class="sys-common-input" style="border:none;"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span=6>
                                <el-form-item label="身份证号" prop="personIdcard">
                                    <el-input v-model="ruleForm.personIdcard" class="sys-common-input" style="border:none;"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span=6>
                                <el-form-item label="居住地" prop="province">
                                    <el-select v-model="ruleForm.province" @change="getArea();" @click.native="clearAll();" placeholder="请选择省" label-width="150px">
                                        <el-option v-for="item in selectProvince" :key="item.id" :label="item.text" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span=6>
                                <el-form-item label="" prop="area">
                                    <el-select v-model="ruleForm.area" @change="getDistrict();" placeholder="请选择市">
                                        <el-option v-for="item in selectArea" :key="item.id" :label="item.text" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span=6>
                                <el-form-item label="" prop="district">
                                    <el-select v-model="ruleForm.district" @change="getDistrictLabel();" placeholder="请选择区">
                                        <el-option v-for="item in selectDistrict" :key="item.id" :label="item.text" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span=6>
                                <el-form-item label="地址" prop="personAddress" class="child-driEdit-addr">
                                    <el-input v-model="ruleForm.personAddress"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span=6>
                                <el-form-item label="入职日期" prop="personJoindate">
                                    <el-date-picker v-model="ruleForm.personJoindate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span=12>
                                <el-form-item label="所属机构" prop="organName" v-loading="orgLoad">
                                    <el-cascader :options="options" filterable  clearable @change="getParentsId();" change-on-select v-model="ruleForm.organName" class="sys-common-select" :props="props">
                                    </el-cascader>
                                </el-form-item>
                            </el-col>
                            
                            <el-col :span=24>
                            <div class="child-driEdit-title">
                                <!-- <img> -->
                                驾驶证信息
                            </div>
                            </el-col>
                            <el-col :span=6>
                                <el-form-item label="驾驶证号" prop="credentNum">
                                    <el-input v-model="ruleForm.credentNum" class="sys-common-input" style="border:none;"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span=6>
                                <el-form-item label="初次领证日期" prop="credentFirstDate">
                                    <el-date-picker v-model="ruleForm.credentFirstDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span=6>
                                <el-form-item label="驾驶证有效期" prop="credentStartDate">
                                    <el-date-picker v-model="ruleForm.credentStartDate" type="date" placeholder="开始日期" :picker-options="pickerOptions0">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span=6>
                                <el-form-item label="至" prop="credentEndDate" style="width:110px;">
                                    <el-date-picker v-model="ruleForm.credentEndDate" type="date" placeholder="结束日期" :picker-options="pickerOptions1">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span=6>
                                <el-form-item label="准驾车型" prop="carDriverType">
                                    <el-select v-model="ruleForm.carDriverType" placeholder="请选择">
                                        <el-option label="A1" value="A1"></el-option>
                                        <el-option label="A2" value="A2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        <el-col :span=24>
                            <div class="child-driEdit-title">
                                <div style="float:left;font-size: 14px;font-family: PingFang-SC-Bold;font-weight: bold;color: #2f95f4;height: 38px;line-height: 34px;">
                                    <!-- <img> -->
                                    紧急联系人
                                </div>
                                <!-- <div class="el-button-text"> -->
                                    <!-- <button type="button" class="button-info-2" @click="goAdd();"> -->
                                        <img src="../../../../../../../static/img/jjbx/vehicle/bj2.png" @click="goAdd();" class="img-3">
                                        <!-- 添加</button> -->
                                <!-- </div> -->
                            </div>
                            </el-col>
                            <el-table :data="tableData" border style="width: 96%;margin-left:0.5%;" ref="multipleTable" max-height="155">
                                <el-table-column prop="personRelation" label="紧急联系人关系" align="center">
                                </el-table-column>
                                <el-table-column prop="personName" label="紧急联系人姓名" align="center">
                                </el-table-column>
                                <el-table-column prop="phone" label="紧急联系人电话" align="center">
                                </el-table-column>
                                <el-table-column prop="province" align="center" label="操作">
                                <template slot-scope="scope">
                                    <img src="../../../../../../../static/img/jjbx/vehicle/sc2.png" @click="handleDelete(scope.$index, scope.row)"
                                    class="img-3">
                                </template>
                            </el-table-column>
                            </el-table>
                        <el-col :span=24>
                        <div class="child-driEdit-title">
                            <!-- <img> -->
                            照片信息
                        </div>
                        </el-col>
                        <div style="width:98.3%;height:190px;background-color:#fff;padding-top:10px;padding-left:20px;">
                            <el-upload class="avatar-uploader" name="fileupload" ref="upload1" :action="importFileUrl" :data="upLoadData1" :show-file-list="false" :on-success="handleAvatarSuccess1" :on-change="imgPreview1" :before-upload="beforeAvatarUpload" :auto-upload="false">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <div class="el-upload__text">
                                    <em>上传身份证正面照片</em>
                                </div>
                            </el-upload>
                            <el-upload class="avatar-uploader" name="fileupload" ref="upload2" :action="importFileUrl" :data="upLoadData2" :show-file-list="false" :on-success="handleAvatarSuccess2" :on-change="imgPreview2" :before-upload="beforeAvatarUpload" :auto-upload="false">
                                <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <div class="el-upload__text">
                                    <em>上传身份证反面照片</em>
                                </div>
                            </el-upload>
                            <el-upload class="avatar-uploader" name="fileupload" ref="upload3" :action="importFileUrl" :data="upLoadData3" :show-file-list="false" :on-success="handleAvatarSuccess3" :on-change="imgPreview3" :before-upload="beforeAvatarUpload" :auto-upload="false">
                                <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <div class="el-upload__text">
                                    <em>上传驾驶证正面照片</em>
                                </div>
                            </el-upload>
                            <el-upload class="avatar-uploader" name="fileupload" ref="upload4" :action="importFileUrl" :data="upLoadData4" :show-file-list="false" :on-success="handleAvatarSuccess4" :on-change="imgPreview4" :before-upload="beforeAvatarUpload" :auto-upload="false">
                                <img v-if="imageUrl4" :src="imageUrl4" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <div class="el-upload__text">
                                    <em>上传驾驶证反面照片</em>
                                </div>
                            </el-upload>
                            <el-upload class="avatar-uploader" name="fileupload" ref="upload5" :action="importFileUrl" :data="upLoadData5" :show-file-list="false" :on-success="handleAvatarSuccess5" :on-change="imgPreview5" :before-upload="beforeAvatarUpload" :auto-upload="false">
                                <img v-if="imageUrl5" :src="imageUrl5" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <div class="el-upload__text">
                                    <em>上传驾驶员照片</em>
                                </div>
                            </el-upload>
                        </div>
                    </div>
                </el-form>
                <div style="text-align:center;height: 49px;background: #EEEEEE;">
                    <button type="button" class="button-info" @click="onSave('ruleForm');">保存</button>
                    <button type="button" class="button-info" @click="onBack();">返回</button>
                </div>
            </div>
            <!-- 添加紧急联系人 -->
            <div v-show="editVisible" id="drag" class="child-driEdit-linkman"  :style="{border:dragBorder,borderRadius:dragBorderRad}">
                <div  class="car-header" @mousedown="onDragStart" @mouseup="onDragClose">
                    <div class="car-hearder-desc">
                        添加紧急联系人
                    </div>
                    <div class="car-hearder-close">
                        <i class="el-icon-close" style="color: #fff;cursor:pointer;" @click="close();"></i>
                    </div>
                </div>
                <el-form ref="form" :model="form" :rules="rules" label-width="200px" style="margin-top:10px;">
                    <el-form-item label="紧急联系人关系" prop="relation">
                        <el-select v-model="form.relation" placeholder="请选择"  class="sys-common-select" style="border:none;">
                            <el-option label="亲属" value="亲属"></el-option>
                            <el-option label="朋友" value="朋友"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="紧急联系人姓名" prop="linkname">
                        <el-input v-model="form.linkname" placeholder="姓名"  class="sys-common-input" style="border:none;"></el-input>
                    </el-form-item>
                    <el-form-item label="紧急联系人电话" prop="phone">
                        <el-input v-model="form.phone" placeholder="联系电话"  class="sys-common-input" style="border:none;"></el-input>
                    </el-form-item>

                </el-form>
                <div class="button-handle">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit();">确 定</el-button>
                </div>
            </div>
    </div>
</template>
<script>
import ajax from "axios";
  export default {
    data() {
        // var checkSex = (rule, value, callback) => {
        //     if (!value) {
        //         return callback(new Error('请输入性别'));
        //     }
        //     setTimeout(() => {
        //         if (value === '女'||value ==='男') {
        //             callback();
        //         }else{
        //             callback(new Error('请输入正确的性别'));
        //         }
        //     })
        // };
        return {
        ruleForm: {
            personName:'',
            sex:'',
            personWorknum:'',
            phone:'',
            personIdcard:'',
            province:'',
            area:'',
            district:'',
            personAddress:'',
            personJoindate:'',
            organName:[],
            credentNum:'',
            credentFirstDate:'',
            credentStartDate:'',
            credentEndDate:'',  
            // imageUrl: '',
        },
        form: {
            relation: '',
            linkname: '',
            phone: ''
        },
        tableData: [],
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
        editVisible: false,
        labelPosition:'left',
        orgLoad:false,
        //拖拽改变样式
        dragBorder: "0",
        dragBorderRad: "6px",
        imageUrl: '',
        imageUrl2: '',
        imageUrl3: '',
        imageUrl4: '',
        imageUrl5: '',
        importFileUrl:'http://192.168.80.184:8089/post/update-person-img',
        upLoadData1:{
            id:'',
            pername:'',
            credent:'',
            credentObj:'正面',
            credentName:'身份证'
        },
        upLoadData2:{
            id:'',
            pername:'',
            credent:'',
            credentObj:'反面',
            credentName:'身份证'
        },
        upLoadData3:{
            id:'',
            pername:'',
            credent:'',
            credentObj:'正面',
            credentName:'驾驶证'
        },
        upLoadData4:{
            id:'',
            pername:'',
            credent:'',
            credentObj:'反面',
            credentName:'驾驶证'
        },
        upLoadData5:{
            id:'',
            pername:'',
            credent:'',
            credentObj:'',
            credentName:'用户照'
        },
        selectProvince:[],
        selectArea:[],
        selectDistrict:[],
        credentId:'',
        selectProvinceLabel:{},
        selectAreaLabel:{},
        selectDistrictLabel:{},
        selectOrganNameLabel:'',
        rulesForm: {
            personName:[
                { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
            personWorknum:[
                { required: true, message: '请输入工号', trigger: 'blur' },
            ],
            credentNum: [
                { required: true, message: '请输入驾驶证号', trigger: 'blur' },
                { min: 12, max: 12, message: '请输入12位证件号', trigger: 'blur' }
            ],
            phone:[
                { required: true, message: '请输入手机号', trigger: 'blur' },
                { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' },
                { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式错误', trigger: 'blur'}
            ],
            personIdcard:[
                { required: true, message: '请输入身份证号', trigger: 'blur' },
                { min: 18, max: 18, message: '请输入18位身份证号', trigger: 'blur' },
                { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式错误', trigger: 'blur'}
            ],
            organName:[
                {required: true, message: '请选择所属机构', trigger: 'blur'}
            ],
            // sex:[
            //     {  validator: checkSex, trigger: 'blur'},
            // ],
        },
        rules:{
            phone: [
                // {
                //     required: true,
                //     message: "请输入手机号",
                //     trigger: "blur"
                // },
                {
                    pattern: /^1[3|4|5|7|8][0-9]{9}$/,
                    message: "请输入有效的手机号码",
                    trigger: "blur"
                }
            ],
        },
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
        _this.getDate();
        _this.getProvince();
        _this.getOrg();
    },
    methods: {
        /**
         * @function {获取省}
         * @return {type} {selectProvince[]}
         */
        getProvince(){
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
        getArea(){
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
            _this.selectProvinceLabel = _this.selectProvince.find((item)=>{//这里的userList就是上面遍历的数据源
                return item.id === _this.ruleForm.province;//筛选出匹配数据
            });
            console.log(_this.selectProvinceLabel.text);
        },
        /**
         * @function {获取区}
         * @return {type} {selectDistrict[]}
         */
        getDistrict(){
            let _this = this;
            ajax.get(_this.global_.apiUrlJj + "/get/area?id=" + _this.ruleForm.area)
                    .then(function (res) {
                        console.log(_this.ruleForm.province);
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
            _this.selectAreaLabel = _this.selectArea.find((item)=>{//这里的userList就是上面遍历的数据源
                return item.id === _this.ruleForm.area;//筛选出匹配数据
            });
            console.log(_this.selectAreaLabel.text);
        },
        getDistrictLabel(value){
            let _this = this;
            _this.selectDistrictLabel = _this.selectDistrict.find((item)=>{//这里的userList就是上面遍历的数据源
                return item.id === _this.ruleForm.district;//筛选出匹配数据
            });
            console.log(_this.selectDistrictLabel.text);
        },
        /**
         * @function {清空市区下拉框的值}
         * @return {type} {description}
         */
        clearAll(){
            let _this = this;
            _this.ruleForm.province = '';
            _this.ruleForm.area = '';
            _this.ruleForm.district = '';
        },
        /**
        * @function {获取所属机构信息}
        * @return {string} {机构名称}
        */
        getOrg() {
            let _this = this;
            _this.orgLoad = true;
            ajax.get(_this.global_.apiUrlJj + "/get/select-organ?id=1")
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
        /**
         * @function 根据机构ID获取其父id，名称
         * @return {type} {description}
         */
        getParentsId(){
            let _this = this;
            // console.log(_this.ruleForm.organName);
            let str = _this.ruleForm.organName;
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
            var data = [];
                // _this.param = _this.$route.params;
                // console.log(param);
                let param = _this.$route.params.id;
                console.log(param);
                ajax.get(_this.global_.apiUrlJj + "/get/select-person-id?id=" + param)
                .then(function (res) {
                    console.log(res);
                    _this.ruleForm.personName = res.data.data.infoPersonEntity.personName
                    _this.ruleForm.sex = res.data.data.infoPersonEntity.sex
                    _this.ruleForm.personWorknum = res.data.data.infoPersonEntity.personWorknum
                    _this.ruleForm.phone = res.data.data.infoPersonEntity.phone
                    _this.ruleForm.personIdcard = res.data.data.infoPersonEntity.personIdcard
                    _this.ruleForm.province =  res.data.data.infoPersonEntity.province
                    _this.ruleForm.area = res.data.data.infoPersonEntity.area
                    _this.ruleForm.district = res.data.data.infoPersonEntity.district
                    _this.ruleForm.personAddress = res.data.data.infoPersonEntity.personAddress
                    _this.ruleForm.personJoindate = res.data.data.infoPersonEntity.personJoindate
                    _this.ruleForm.organName = res.data.data.infoPersonEntity.organParentsId.split(",").map(Number)
                    _this.ruleForm.credentNum = res.data.data.infoCredentEntity[0].credentNum
                    _this.ruleForm.credentFirstDate = res.data.data.infoCredentEntity[0].credentFirstDate //初次领证日期
                    _this.ruleForm.credentStartDate = res.data.data.infoCredentEntity[0].credentStartDate
                    _this.ruleForm.credentEndDate = res.data.data.infoCredentEntity[0].credentEndDate
                    for(let i = 0; i < res.data.data.personList.length;i++){
                        var obj = {}
                        obj.personRelation =  res.data.data.personList[i].personRelation
                        obj.personName  =  res.data.data.personList[i].personName
                        obj.phone  =  res.data.data.personList[i].phone
                        data[i] = obj
                    }
                    _this.tableData = data;
                    //照片信息
                    _this.imageUrl = res.data.data.infoCredentEntity[2].credentImgUrl
                    _this.imageUrl2 = res.data.data.infoCredentEntity[3].credentImgUrl
                    _this.imageUrl3 = res.data.data.infoCredentEntity[0].credentImgUrl
                    _this.imageUrl4 = res.data.data.infoCredentEntity[1].credentImgUrl
                    _this.imageUrl5 = res.data.data.infoPersonEntity.personImgUrl
                    _this.credentId = res.data.data.infoCredentEntity[0].id + "," + res.data.data.infoCredentEntity[1].id + ","
                                        res.data.data.infoCredentEntity[2].id + "," + res.data.data.infoCredentEntity[3].id
                    console.log(_this.ruleForm);
                    console.log(_this.imageUrl);
                    console.log(_this.imageUrl5);
                })
                .catch(function (error) {
                    console.log(error);
                }); 
        },
      /**
       * @function {上传照片}
       * @param  {type} file     {description}
       * @param  {type} fileList {description}
       * @return {type} {description}
       */

        /**
         * @function {修改联系人}
         * @return {type} {description}
         */
        goAdd() {
            let _this = this;
            for(let i=0;i<_this.tableData.length;i++){
                _this.tableData[i].personRelation=''
                _this.tableData[i].personName=''
                _this.tableData[i].phone=''
            }
            _this.editVisible = true;
            _this.form.relation = '';
            _this.form.linkname= '';
            _this.form.phone= '';
        },
        //删除紧急联系人
        handleDelete(index, row){
            let _this = this;
            _this.tableData.splice(index, 1);
            console.log(_this.tableData);
        },
        // 保存紧急联系人
        saveEdit() {
            let _this = this;
            var obj = {}
            obj.personRelation = _this.form.relation;
            obj.personName = _this.form.linkname;
            obj.phone = _this.form.phone;
            _this.tableData.push(obj);
            this.editVisible = false;
            console.log(_this.tableData);
        },
        close(){
            let _this = this;
            _this.editVisible = false;
        },
        handleAvatarSuccess1(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log("aaa");
        },
        handleAvatarSuccess2(res, file) {
        this.imageUrl2 = URL.createObjectURL(file.raw);
        },
        handleAvatarSuccess3(res, file) {
        this.imageUrl3 = URL.createObjectURL(file.raw);
        },
        handleAvatarSuccess4(res, file) {
        this.imageUrl4 = URL.createObjectURL(file.raw);
        },
        handleAvatarSuccess5(res, file) {
            let _this = this;
        this.imageUrl5 = URL.createObjectURL(file.raw);
        console.log(_this.imageUrl5);
        },
        beforeAvatarUpload(file) {
            let _this = this;
            _this.upLoadData1.id = _this.$route.params.id;
            _this.upLoadData1.pername = _this.ruleForm.personName;
            _this.upLoadData1.credent = _this.ruleForm.personIdcard;
            _this.upLoadData2.id = _this.$route.params.id;
            _this.upLoadData2.pername = _this.ruleForm.personName;
            _this.upLoadData2.credent = _this.ruleForm.personIdcard;
            _this.upLoadData3.id = _this.$route.params.id;
            _this.upLoadData3.pername = _this.ruleForm.personName;
            _this.upLoadData3.credent = _this.ruleForm.credentNum;
            _this.upLoadData4.id = _this.$route.params.id;
            _this.upLoadData4.pername = _this.ruleForm.personName;
            _this.upLoadData4.credent = _this.ruleForm.credentNum;
            _this.upLoadData5.id = _this.$route.params.id;
            _this.upLoadData5.pername = _this.ruleForm.personName;
            _this.upLoadData5.credent = _this.ruleForm.personIdcard;
            const isJPG = file.type === 'image/jpeg'||'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 或 png 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        onSave(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let _this = this;
                    let getPersonOrganIds = function() {
                        let ids = "";
                        _this.ruleForm.organName.forEach((ele, i) => {
                            if (i == _this.ruleForm.organName.length - 1) {
                                ids = ids + ele.toString();
                            } else {
                                ids = ids + ele.toString() + ",";
                            }
                        });
                        return ids;
                    };
                    let postData = {
                        person : {
                            personName: _this.ruleForm.personName,
                            sex: _this.ruleForm.sex,
                            personWorknum: _this.ruleForm.personWorknum,
                            phone: _this.ruleForm.phone,
                            personIdcard: _this.ruleForm.personIdcard,
                            province: _this.selectProvinceLabel.text,
                            area: _this.selectAreaLabel.text,
                            district: _this.selectDistrictLabel.text,
                            personAddress: _this.ruleForm.personAddress,
                            personJoindate: _this.ruleForm.personJoindate,
                            organId: _this.ruleForm.organName[_this.ruleForm.organName.length-1],
                            organName:_this.selectOrganNameLabel,
                            organParentsId: getPersonOrganIds(),
                            type:"1",
                        },                             
                        credent : {
                            credentNum: _this.ruleForm.credentNum,
                            credentStartDate: _this.ruleForm.credentStartDate,
                            credentEndDate: _this.ruleForm.credentEndDate,
                            credentFirstDate:_this.ruleForm.credentFirstDate
                        },
                        personList : _this.tableData
                    };
                    ajax.post(_this.global_.apiUrlJj + "/post/update-person?credentId=" + _this.credentId + "&id=" + _this.$route.params.id, postData)
                        .then(function(res) {
                        console.log(res);
                        console.log(postData);
                        if (res.data.isSuccess) {
                            //上传图片
                            // _this.$refs.upload1.submit();
                            // _this.$refs.upload2.submit();
                            // _this.$refs.upload3.submit();
                            // _this.$refs.upload4.submit();
                            // _this.$refs.upload5.submit();
                            //跳转页面
                            _this.$message({
                            showClose: true,
                            message: "修改成功！",
                            type: "success"
                            });
                            _this.$router.push({name:"sm_driver_driver"});
                        } else {
                            _this.$message({
                            message: "保存失败！"
                            });
                        }
                    })
                    .catch(function(error) {
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
        imgPreview1 (file, fileList){
            let _this = this;
            _this.imageUrl = URL.createObjectURL(file.raw); 
            console.log(_this.imageUrl);
            console.log(_this.$route.params.id);
        },
        imgPreview2 (file, fileList){
            let _this = this;
            _this.imageUrl2 = URL.createObjectURL(file.raw); 
            console.log(_this.imageUrl2)
        },
        imgPreview3 (file, fileList){
            let _this = this;
            _this.imageUrl3 = URL.createObjectURL(file.raw); 
            console.log(_this.imageUrl3)
        },
        imgPreview4 (file, fileList){
            let _this = this;
            _this.imageUrl4 = URL.createObjectURL(file.raw); 
            console.log(_this.imageUrl4)
        },
        imgPreview5 (file, fileList){
            let _this = this;
            _this.imageUrl5 = URL.createObjectURL(file.raw); 
            console.log(_this.imageUrl5)
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
    },
    //从详情页返回主页时把主页的keepAlive值设置为true
    beforeRouteLeave(to, from, next) {
        if (to.path == "/jjbx/SysManage/driver/driverMain") {
        to.meta.keepAlive = true;
        } else {
        to.meta.keepAlive = false;
        }
        next();
    },
}
</script>
<style>
.child-driEdit-body {
    /* background-color: #eeeeee; */
    /* padding-top: 12px; */
    width: 1200px;
    margin: 0px auto;
}
.child-driEdit-top {
    height: 48px;
    background-color: #f6f6f6;
    padding: 0px 20px;
    border-bottom: 1px solid #e7e7e7;
}
.child-driEdit-center{width:1198px;height:98px;line-height:98px;border:1px solid #E4E4E4;background-color:#fff;box-shadow:0px 0px 8px 0px rgba(47,149,244,0.16);}
.child-driEdit-centerbox{width:1160px;height:56px;line-height:56px;border:1px dashed #CCCCCC;text-align:center;margin-left:20px;margin-top:18px;background-color:#F8F8F8;}
.child-driEdit-form {
    width: 1198px;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    box-shadow: 0px 0px 8px 0px rgba(47, 149, 244, 0.16);
}
.child-driEdit-form .sys-common-input{
    padding-left: 0px !important;
}
.child-driEdit-form .sys-common-select{
    padding-left: 0px;
}
.child-driEdit-form .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 133px !important;
}
.child-driEdit-title {
    height:38px;line-height:38px;font-size:14px;font-family:PingFang-SC-Bold;font-weight:bold;color: #2f95f4;
}
.child-driEdit-body .el-input--mini .el-input__inner{
    width: 133px !important;
}
.child-driEdit-linkman .el-input__inner {
    width: 133px !important;
    height: 28px;
    line-height: 28px;
}
.child-driEdit-linkman .el-input__icon{
    line-height: 28px !important;
}
/* .child-driEdit-addr .el-input--mini .el-input__inner {
    width: 383px !important;
} */
.child-driEdit-body .button-info-2 {
    display: inline-block;
    height: 29px;
    background-color: #2f95f4;
    color: #fff;
    border: 1px solid;
    border-radius: 4px;
    cursor: pointer;
}
.child-driEdit-body .el-button-text {
    width: 75px !important;
    float: right !important;
    margin-top: 2px !important;
    /* margin-left: 1400px; */
    font-size: 12px !important;
}
.child-driEdit-body .el-button-text button:nth-of-type(1) {
    width: 73px;
}
.img-3 {
    display: inline-block;
    width: 13px;
    height: 12px;
    margin-left: 3px;
    position: relative;
    top: 1px;
}
.child-driEdit-body .child-driEdit-linkman .el-input,
.el-input--prefix .el-input__inner {
    width: 100%;
}
.child-driEdit-body .avatar-uploader {
    width: 220px !important;
    height: 152px !important;
    display: inline !important;
    float: left !important;
}
.child-driEdit-body .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px !important;
    cursor: pointer !important;
    position: relative !important;
    overflow: hidden !important;
}
.child-driEdit-body .avatar-uploader .el-upload:hover {
    border-color: #409eff !important;
}
.child-driEdit-body .avatar-uploader-icon {
    font-size: 28px !important;
    color: #8c939d !important;
    width: 178px !important;
    height: 148px !important;
    line-height: 148px !important;
    text-align: center !important;
}
.child-driEdit-body .avatar {
    width: 198px !important;
    height: 178px !important;
    display: block !important;
}
.child-driEdit-body .el-upload--text {
    width: 200px !important;
    height: 180px !important;
}
.child-driEdit-body .button-info {
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
    cursor: pointer;
}
.child-driEdit-body .el-table td,
.el-table th {
    padding: 0px;
}
.child-driEdit-body .el-table__empty-block {
    min-height: 30px;
}
.child-driEdit-body .el-dialog__footer{
    text-align: center;
}
.child-driEdit-linkman{
    position: absolute;
        top: 180px;
        right: 30%;
        width: 480px;
        height: auto;
        background-color: #fff;
        z-index: 1;
        box-shadow: 0px 0px 8px 0px rgba(47, 149, 244, 0.16);
}
.child-driEdit-linkman .car-header {
    cursor: move;
    width: auto;
    height: 40px;
    line-height: 40px;
    background: #2e92f6;
    border-radius: 6px 6px 0 0;
    padding: 0 16px;
}
.child-driEdit-linkman .car-hearder-desc {
        float: left;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
        font-size: 12px;
        color: #fff;
    }
.child-driEdit-linkman .car-hearder-close {
        float: right;
        cursor: default;
        text-align: right;
        width: 40px;
        height: 40px;
        line-height: 40px;
    }
.child-driEdit-linkman .button-handle{
        /* width: 600px; */
        margin: 10px 140px;
    }
.child-driEdit-linkman .el-input__suffix{
    right: -5px;
}
</style>
