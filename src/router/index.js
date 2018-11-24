import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import { resolve } from 'dns';

Vue.use(Router)

export default new Router({
    mode: "history",
    fallback:false,
//     base: "/jjbx/",
    routes: [ 
        {
            path:'/test2',
            name:'test2',
            component: resolve => require(['../components/page/test2.vue'], resolve) 
        },
        {
            path:'/login',
            name:'login',
            component: resolve => require(['../components/page/Login.vue'], resolve) 
        }, {
            path: '/dydp/',  
            redirect:'/dydp/main'
        },
        {
            path:'/403',
            component: resolve => require(['../components/page/403.vue'], resolve),
            meta: { title: '403' }
        },
        {
            path:'/404',
            component: resolve => require(['../components/page/404.vue'], resolve),
            meta: { title: '404' }
        },
        {
            path: '/',  
            redirect:'/main'
        }, 
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'],resolve),
            meta:{
                title:'一点科技'
            },
            children:[
                /* 东营大屏 */
                {
                    path:'/dydp/main',
                    name:'dy_main',
                    component: resolve => require(['../components/page/dydp/Main.vue'], resolve),
                    meta: { title: '东营大屏' }
                },     
                /* 紧急避险 */
                {
                    path:'/main',
                    name:'jj_main',
                    component: resolve => require(['../components/page/jjbx/Main.vue'], resolve),
                    meta: { title: '紧急避险' }
                },           
                /* 系统管理 */
                /* 系统管理-->用户管理 */
                {
                    path:'/jjbx/SysManage/dept/deptMain',
                    name:'sm_dept_deptMain',
                    component: resolve => require(['../components/page/jjbx/SysManage/UserManage/DepartmentManage/DepartmentMain.vue'], resolve),
                    meta: { title: '部门档案' }
                },
                /* 系统管理 */
                /* 系统管理-->用户管理 */
                /* 用户管理-->字典档案管理 */
                { 
                    path:'/jjbx/SysManage/user/userDictionary',
                    name:'sm_user_userDictionary',
                    component: resolve => require(['../components/page/jjbx/SysManage/UserManage/user/userDictionary.vue'], resolve),
                    meta: { title: '字典档案' }
                },{ 
                    path:'/jjbx/SysManage/user/userDicEdit',
                    name:'sm_user_userDicEdit',
                    component: resolve => require(['../components/page/jjbx/SysManage/UserManage/user/userDicEdit.vue'], resolve),
                    meta: { title: '字典档案修改' }
                },{ 
                    path:'/jjbx/SysManage/user/userdicAdd',
                    name:'sm_user_userdicadd',
                    component: resolve => require(['../components/page/jjbx/SysManage/UserManage/user/userDicAdd.vue'], resolve),
                    meta: { title: '字典档案添加' }
                },
                /* 系统管理 */
                /* 系统管理-->用户管理 */
                /* 用户管理-->用户档案管理 */
                {
                    path:'/jjbx/SysManage/user/userFiles',
                    name:'sm_user_userfiles',
                    component: resolve => require(['../components/page/jjbx/SysManage/UserManage/user/UserFiles.vue'], resolve),
                    meta: { title: '用户档案' }
                },{ 
                    path:'/jjbx/SysManage/user/userfileAdd',
                    name:'sm_user_userfileAdd',
                    component: resolve => require(['../components/page/jjbx/SysManage/UserManage/user/UserFileAdd.vue'], resolve),
                    meta: { title: '用户档案添加' }
                },{ 
                    path:'/jjbx/SysManage/user/userfileEdit',
                    name:'sm_user_userfileedit',
                    component: resolve => require(['../components/page/jjbx/SysManage/UserManage/user/UserFileEdit.vue'], resolve),
                    meta: { title: '用户档案修改' }
                },
                /* 系统管理 */
                /* 系统管理-->用户管理 */
                /* 用户管理-->角色档案管理 */
                {
                    path:'/jjbx/SysManage/user/userRole',
                    name:'sm_user_userrole',
                    component: resolve => require(['../components/page/jjbx/SysManage/UserManage/user/UserRole.vue'], resolve),
                    meta: { title: '角色档案' }
                },{ 
                    path:'/jjbx/SysManage/user/userroleAdd',
                    name:'sm_user_userroleadd',
                    component: resolve => require(['../components/page/jjbx/SysManage/UserManage/user/UserRoleAdd.vue'], resolve),
                    meta: { title: '角色档案添加' }
                },{ 
                    path:'/jjbx/SysManage/user/userroleEdit',
                    name:'sm_user_userroleedit',
                    component: resolve => require(['../components/page/jjbx/SysManage/UserManage/user/UserRoleEdit.vue'], resolve),
                    meta: { title: '角色档案修改' }
                }, 
                /* 系统管理-->用户管理-->菜单档案管理 */
                {
                    path:'/jjbx/SysManage/user/menuMain',
                    name:'sm_user_menuMain',
                    component: resolve => require(['../components/page/jjbx/SysManage/UserManage/menu/MenuMain.vue'], resolve),
                    meta: { title: '菜单档案' }
                },
                /* 系统管理-->车辆管理 */
                /* 系统管理-->车辆管理-->主车档案 */
                {
                    path:'/jjbx/SysManage/vehicle/vehicle',
                    name:'sm_vehicle_vehicle',
                    component: resolve => require(['../components/page/jjbx/SysManage/VehicleManage/vehicle/vehicle.vue'], resolve),
                    meta: { title: '主车档案' }
                },
                {
                    path:'/jjbx/SysManage/vehicle/CarEdit',
                    name:'sm_vehicle_carEdit',
                    component: resolve => require(['../components/page/jjbx/SysManage/VehicleManage/vehicle/CarEdit.vue'], resolve),
                    meta: { title: '主车编辑' }
                },
                {
                    path:'/jjbx/SysManage/vehicle/carAdd',
                    name:'sm_vehicle_carAdd',
                    component: resolve => require(['../components/page/jjbx/SysManage/VehicleManage/vehicle/CarAdd.vue'], resolve),
                    meta: { title: '主车添加' }
                },
                {
                    path:'/jjbx/SysManage/vehicle/CarDetails',
                    name:'sm_vehicle_CarDetails',
                    component: resolve => require(['../components/page/jjbx/SysManage/VehicleManage/vehicle/CarDetails.vue'], resolve),
                    meta: { title: '主车详细信息' }
                },
                {
                    path:'/jjbx/SysManage/vehicle/carAdd',
                    name:'sm_vehicle_carAdd',
                    component: resolve => require(['../components/page/jjbx/SysManage/VehicleManage/vehicle/CarAdd.vue'], resolve),
                    meta: { title: '主车添加' }
                },
                /* 系统管理-->车辆管理 */
                /* 系统管理-->车辆管理-->挂车档案 */
                {
                    path:'/jjbx/SysManage/trailer/trailer',
                    name:'sm_trailer_trailer',
                    component: resolve => require(['../components/page/jjbx/SysManage/VehicleManage/trailer/Trailer.vue'], resolve),
                    meta: { title: '挂车档案' }
                },
                {
                    path:'/jjbx/SysManage/trailer/TrailerAdd',
                    name:'sm_trailer_trailerAdd',
                    component: resolve => require(['../components/page/jjbx/SysManage/VehicleManage/trailer/TrailerAdd.vue'], resolve),
                    meta: { title: '挂车添加' }
                },
                {
                    path:'/jjbx/SysManage/trailer/TrailerEdit',
                    name:'sm_trailer_trailerEdit',
                    component: resolve => require(['../components/page/jjbx/SysManage/VehicleManage/trailer/TrailerEdit.vue'], resolve),
                    meta: { title: '挂车编辑' }
                },
                {
                    path:'/jjbx/SysManage/trailer/TrailerDetails',
                    name:'sm_trailer_trailerDetails',
                    component: resolve => require(['../components/page/jjbx/SysManage/VehicleManage/trailer/TrailerDetails.vue'], resolve),
                    meta: { title: '挂车详情' }
                },
                /* 系统管理-->车辆管理 */
                /* 系统管理-->车辆管理-->车队档案 */
                {
                    path:'/jjbx/SysManage/fleet/fleet',
                    name:'sm_fleet_fleet',
                    component: resolve => require(['../components/page/jjbx/SysManage/VehicleManage/fleet/fleet.vue'], resolve),
                    meta: { title: '车队档案' }
                },
                {
                    path:'/jjbx/SysManage/fleet/fleetDetails',
                    name:'sm_fleet_fleetDetails',
                    component: resolve => require(['../components/page/jjbx/SysManage/VehicleManage/fleet/fleetDetails.vue'], resolve),
                    meta: { title: '车队详情' }
                },
                {
                    path:'/jjbx/SysManage/fleet/fleetAdd',
                    name:'sm_fleet_fleetAdd',
                    component: resolve => require(['../components/page/jjbx/SysManage/VehicleManage/fleet/fleetAdd.vue'], resolve),
                    meta: { title: '车队添加' }
                },
                {
                    path:'/jjbx/SysManage/fleet/fleetEdit',
                    name:'sm_fleet_fleetEdit',
                    component: resolve => require(['../components/page/jjbx/SysManage/VehicleManage/fleet/fleetEdit.vue'], resolve),
                    meta: { title: '车队修改' }
                },
                /* 系统管理-->人员管理 */
                /* 系统管理-->人员管理-->驾驶员档案 */
                {
                    path:'/jjbx/SysManage/driver/driverMain',
                    name:'sm_driver_driver',
                    component: resolve => require(['../components/page/jjbx/SysManage/PeopleManage/driver/Driver.vue'], resolve),
                    meta: { title: '驾驶员档案' }
                },
                {
                    path:'/jjbx/SysManage/driver/driverDetails',
                    name:'sm_driver_driverDetails',
                    component: resolve => require(['../components/page/jjbx/SysManage/PeopleManage/driver/DriverDetails.vue'], resolve),
                    meta: { title: '驾驶员详细信息' }
                },
                {
                    path:'/jjbx/sysManage/driver/addDriver',
                    name:'sm_driver_addDriver',
                    component: resolve => require(['../components/page/jjbx/SysManage/PeopleManage/driver/DriverAdd.vue'], resolve),
                    meta: { title: '添加驾驶员' }
                }, 
                {
                    path:'/jjbx/sysManage/driver/driverEdit',
                    name:'sm_driver_driverEdit',
                    component: resolve => require(['../components/page/jjbx/SysManage/PeopleManage/driver/DriverEdit.vue'], resolve),
                    meta: { title: '驾驶员编辑' }
                },   
                /* 系统管理-->人员管理 */
                /* 系统管理-->人员管理-->供应商档案 */
                { 
                    path:'/jjbx/SysManage/supplier/supplier',
                    name:'sm_supplier_supplier',
                    component: resolve => require(['../components/page/jjbx/SysManage/PeopleManage/supplier/Supplier.vue'], resolve),
                    meta: { title: '供应商档案' }
                },{ 
                    path:'/jjbx/SysManage/supplier/supplierAdd',
                    name:'sm_supplier_supplieradd',
                    component: resolve => require(['../components/page/jjbx/SysManage/PeopleManage/supplier/SupplierAdd.vue'], resolve),
                    meta: { title: '供应商档案添加' }
                },{ 
                    path:'/jjbx/SysManage/supplier/supplierEdit',
                    name:'sm_supplier_supplieredit',
                    component: resolve => require(['../components/page/jjbx/SysManage/PeopleManage/supplier/SupplierEdit.vue'], resolve),
                    meta: { title: '供应商档案修改' }
                },
                /* 系统管理-->终端管理 */
                /* 终端管理-->设备档案 */
                { 
                    path:'/jjbx/SysManage/device/device',
                    name:'sm_device_device',
                    component: resolve => require(['../components/page/jjbx/SysManage/EquipmentManage/device/Device.vue'], resolve),
                    meta: { title: '设备档案' }
                },{ 
                    path:'/jjbx/SysManage/device/deviceAdd',
                    name:'sm_device_deviceadd',
                    component: resolve => require(['../components/page/jjbx/SysManage/EquipmentManage/device/DeviceAdd.vue'], resolve),
                    meta: { title: '设备档案添加' }
                },{ 
                    path:'/jjbx/SysManage/device/deviceEdit',
                    name:'sm_device_deviceedit',
                    component: resolve => require(['../components/page/jjbx/SysManage/EquipmentManage/device/DeviceEdit.vue'], resolve),
                    meta: { title: '设备档案修改' }
                },
                /* 系统管理-->终端管理 */
                /* 终端管理-->设备消息 */
                { 
                    path:'/jjbx/SysManage/dmessage/dmessage',
                    name:'sm_dmessage_dmessage',
                    component: resolve => require(['../components/page/jjbx/SysManage/EquipmentManage/DeviceMessage/DMessage.vue'], resolve),
                    meta: { title: '设备信息档案' }
                },
                { 
                    path:'/jjbx/SysManage/dmessage/dmessageAdd',
                    name:'sm_dmessage_dmessageAdd',
                    component: resolve => require(['../components/page/jjbx/SysManage/EquipmentManage/DeviceMessage/DMAdd.vue'], resolve),
                    meta: { title: '设备信息添加' }
                },
                { 
                    path:'/jjbx/SysManage/dmessage/dmessageEdit',
                    name:'sm_dmessage_dmessageEdit',
                    component: resolve => require(['../components/page/jjbx/SysManage/EquipmentManage/DeviceMessage/DMEdit.vue'], resolve),
                    meta: { title: '设备信息添加' }
                },
                /* 系统管理-->系统配置 */


                /* 财务中心 */
                /* 报表中心 */
                /* 报表中心-->里程统计 */
                { 
                    path:'/jjbx/ReportManage/mileStat/milState',
                    name:'sm_milestat_milestat',
                    component: resolve => require(['../components/page/jjbx/ReportManage/MileStatistics/MileStat.vue'], resolve),
                    meta: { title: '里程统计' }
                },
                /* 报表中心 */
                /* 报表中心-->设备疑似故障统计表 */
                { 
                    path:'/jjbx/ReportManage/ESFStat/esfstat',
                    name:'sm_esfstat_esfstat',
                    component: resolve => require(['../components/page/jjbx/ReportManage/ESFStat/ESFStat.vue'], resolve),
                    meta: { title: '设备疑似故障统计表' }
                },
                /* 报表中心 */
                /* 报表中心-->设备疑似故障统计表 */
                { 
                    path:'/jjbx/ReportManage/VehOnlineRate/vehOnlineRate',
                    name:'sm_vehonrate_vehonrate',
                    component: resolve => require(['../components/page/jjbx/ReportManage/VehOnlineRate/VehOnlineRate.vue'], resolve),
                    meta: { title: '车辆在线率统计' }
                },
                /* 监控中心 */
                {
                    path:'/jjbx/MntManage/Map/Monit',
                    name:'mm_map_monit',
                    component: resolve => require(['../components/page/jjbx/MonitorManage/RealtimeMonitor/RealtimeMonitor.vue'], resolve),
                    meta: { title: '实时定位' }
                },
                { 
                    path:'/jjbx/MntManage/Map/Track',
                    name:'mm_map_track',
                    component: resolve => require(['../components/page/jjbx/MonitorManage/TrackMonitor/TrackMain.vue'], resolve),
                    meta: { title: '轨迹回放' }
                },
                { 
                    path:'/jjbx/MonitorManage/VehicleAlarm/VehicleAlarm',
                    name:'mm_alarm__alarm',
                    component: resolve => require(['../components/page/jjbx/MonitorManage/VehicleAlarm/VehicleAlarm.vue'], resolve),
                    meta: { title: '车辆报警' }
                },
                // { 
                //     path:'/jjbx/MonitorManage/AlarmSetting/AlarmSetting',
                //     name:'mm_alarmSetting__alarmSetting',
                //     component: resolve => require(['../components/page/jjbx/MonitorManage/AlarmSetting/AlarmSetting.vue'], resolve),
                //     meta: { title: '报警设置' }
                // },
                { 
                    path:'/jjbx/MonitorManage/AlarmSetting/AlarmSetting',
                    name:'mm_alarmSetting_alarmSetting',
                    component: resolve => require(['../components/page/jjbx/MonitorManage/AlarmSetting/AlarmSetting2.vue'], resolve),
                    meta: { title: '报警设置' }
                },
                { 
                    path:'/jjbx/MonitorManage/AlarmSetting/AlarmSettingDet',
                    name:'mm_alarmSetting__alarmSettingDet',
                    component: resolve => require(['../components/page/jjbx/MonitorManage/AlarmSetting/AlarmSettingDetails.vue'], resolve),
                    meta: { title: '报警设置明细' }
                },
                {
                    path:'/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试',permission:true }
                }
            ]
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
