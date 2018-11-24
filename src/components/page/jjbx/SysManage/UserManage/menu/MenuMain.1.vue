<!--   
import func from './vue-temp/vue-editor-bridge';
    name：菜单管理主页面
    desc：
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.11.13
-->
<template>
    <div class="common-menumain-body">
        <div style="padding-left:10px;height:22px;padding-top:8px;border-bottom:1px solid rgba(232,238,243,1);box-shadow:0px 2px 6px 0px rgba(47,149,244,0.13);">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>菜单档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="common-menumain-formbox">
            <div class="common-menumain-handlebox">
                <button type="button" class="button-info" @click="search();">添加</button>
            </div>
        </div>
        <div style="width:auto;min-width:1200px;height:calc( 100% - 80px );overflow:auto;margin:0 10px; ">
            <div style="width:100%;height:30px; ">
                <div class="li-border-top li-border-bottom li-border-left li-border-right" style="background:rgb(238, 245, 251);width:15%;height: 18px;padding:5px 10px;line-height: 19px; float: left;list-style: none;font-size: 14px;font-weight: bold;">
                    菜单名称
                </div>
                <div class="li-border-top li-border-bottom li-border-right" style="background:rgb(238, 245, 251);width:10%;height: 18px;padding:5px 10px;line-height: 19px; float: left;list-style: none;font-size: 14px;font-weight: bold;">
                    菜单类型
                </div>
                <div class="li-border-top li-border-bottom li-border-right" style="background:rgb(238, 245, 251);width:15%;height: 18px;padding:5px 10px;line-height: 19px; float: left;list-style: none;font-size: 14px;font-weight: bold;">
                    唯一标示
                </div>
                <div class="li-border-top li-border-bottom li-border-right" style="background:rgb(238, 245, 251);width:40%;height: 18px;padding:5px 10px;line-height: 19px; float: left;list-style: none;font-size: 14px;font-weight: bold;">
                    使用说明
                </div>
                <div class="li-border-top li-border-bottom li-border-right" style="background:rgb(238, 245, 251);width:10%;height: 18px;padding:5px 10px;line-height: 19px; float: left;list-style: none;font-size: 14px;font-weight: bold;">
                    操作
                </div>
            </div>
            <div v-for="(item,key,index) in treeData" :key="index" style="width:100%;height:40px;background:#fff; ">
                <div class="li-border-bottom li-border-left li-border-right" style="width:15%;height: 29px;padding:5px 10px;line-height: 30px;float: left;list-style: none;">
                    <span :style="{'margin-left':((item.level-1)*( item.type=='D'?20:25 )) +'px'}">
                        <i v-show="item.type=='D'" class="el-icon-caret-right"></i>
                        {{ item.label }}
                    </span>
                </div>
                <div class="li-border-bottom li-border-right" style="width:10%;height: 29px;padding:5px 10px;line-height: 30px;float: left;list-style: none;">
                    {{item.type=='D'?'目录':'页面'}}
                </div>
                <div class="li-border-bottom li-border-right" style="width:15%;height: 29px;padding:5px 10px;line-height: 30px;float: left;list-style: none;">
                    {{ item.nCode }}
                </div>
                <div class="li-border-bottom li-border-right" style="width:40%;height: 29px;padding:5px 10px;line-height: 30px;float: left;list-style: none;">
                    {{ item.note }}
                </div>
                <div class="li-border-bottom li-border-right" style="width:10%;height: 29px;padding:5px 10px;line-height: 30px;float: left;list-style: none;">
                    <el-button type="text" size="mini">修改</el-button>
                    <el-button type="text" size="mini">删除</el-button>
                </div>
            </div>
        </div>

        <!--    <div style="width:100%;height:auto;background:blue;">

           <w-tree :tbData="menuData"></w-tree> -->
        <!-- <ul v-for="(item,key,index) in menuData" :key="index" style="width:100%;height:30px;background:yellow;">
                <li style="width:20%;height: 30px;background: violet;float: left;list-style: none;line-height: 30px;"
                    :style="{'padding-left':'30px'}">
                    <i class="el-icon-caret-right"></i>{{ item.label }}
                </li>
                <li style="width:20%;height: 30px;background: brown;float: left;list-style: none;">aa</li>
            </ul> <ul >
        <li v-for='a in tbData' >
          {{a.label}}
          <wtree :tbData='a.children'   ></wtree>
        </li>
      </ul><div>
                <ul v-for="item in tbData"  style="width:200px;height:auto;background:yellow;">
                <li style="width:100px;height: 30px;background: violet;float: left;list-style: none;line-height: 30px;"
                    :style="{'padding-left':'30px'}">
                    <i class="el-icon-caret-right"></i>{{ item.label }}<wtree :tbData="item.children"></wtree>
                </li> 
            </ul>
                </div>
        </div>-->
    </div>
</template>
<script>
    export default {
        components: {
            wTree: {
                name: "wtree",
                template: `
                <div style="width:auto;max-width:150px;">
                    <div v-for='(item,key,index) in tbData' style="width:150px;box-sizing: border-box;height: auto;background: violet; list-style: none;line-height: 30px;"
                    :style="{'padding-left': (item.level==1?0:20) +'px'}">
                        <div  style="background:#888;max-width:150px;">
                            <i v-show="item.children!=null" class="el-icon-caret-bottom" @click.stop.self="item.show=!item.show"></i>{{ item.label }}
                            <wtree :tbData="item.children"></wtree>
                        </div>
                    </div>
                </div> `,
                props: ["tbData"],
                data() {
                    return {
                        show: false
                    };
                }
            }
        },
        props: {
            optionParam: {
                type: Object
            }
        },
        data() {
            return {
                menuData: [{
                        id: 1,
                        label: "系统管理",
                        nCode: 'a_01',
                        level: 1,
                        type: "D", //D:目录，P:页面
                        note: "这是一个treetable",
                        isShow: false,
                        children: [{
                                id: 11,
                                label: "用户管理",
                                nCode: 'a_02',
                                level: 2,
                                type: "D",
                                note: "这是一个treetable",
                                isShow: false,
                                children: [{
                                        id: 111,
                                        label: "用户档案",
                                        nCode: 'a_02',
                                        level: 3,
                                        type: "D",
                                        note: "这是一个treetable",
                                        isShow: false,
                                        children: [{
                                            id: 111,
                                            label: "用户档案",
                                            nCode: 'a_02',
                                            level: 4,
                                            type: "P",
                                            note: "这是一个treetable",
                                            isShow: false
                                        },{
                                            id: 111,
                                            label: "用户档案",
                                            nCode: 'a_02',
                                            level: 4,
                                            type: "P",
                                            note: "这是一个treetable",
                                            isShow: false
                                        },{
                                            id: 111,
                                            label: "用户档案",
                                            nCode: 'a_02',
                                            level: 4,
                                            type: "P",
                                            note: "这是一个treetable",
                                            isShow: false
                                        },{
                                            id: 111,
                                            label: "用户档案",
                                            nCode: 'a_02',
                                            level: 4,
                                            type: "P",
                                            note: "这是一个treetable",
                                            isShow: false
                                        },{
                                            id: 111,
                                            label: "用户档案",
                                            nCode: 'a_02',
                                            level: 4,
                                            type: "P",
                                            note: "这是一个treetable",
                                            isShow: false
                                        }]
                                    },
                                    {
                                        id: 112,
                                        label: "角色档案",
                                        nCode: 'a_03',
                                        level: 3,
                                        type: "P",
                                        note: "这是一个treetable",
                                        isShow: false
                                    },
                                    {
                                        id: 113,
                                        label: "部门档案",
                                        nCode: 'a_01',
                                        level: 3,
                                        type: "P",
                                        note: "这是一个treetable",
                                        isShow: false
                                    }
                                ]
                            },
                            {
                                id: 12,
                                label: "车辆管理",
                                nCode: 'a_01',
                                level: 2,
                                type: "D",
                                note: "这是一个treetable",
                                isShow: false,
                                children: [{
                                        id: 121,
                                        label: "主车档案",
                                        nCode: 'a_01',
                                        level: 3,
                                        type: "P",
                                        note: "这是一个treetable",
                                        isShow: false
                                    },
                                    {
                                        id: 122,
                                        label: "挂车档案",
                                        nCode: 'a_01',
                                        level: 3,
                                        type: "P",
                                        note: "这是一个treetable",
                                        isShow: false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: "报表管理",
                        nCode: 'a_01',
                        level: 1,
                        type: "D",
                        note: "这是一个treetable",
                        isShow: false,
                        children: [{
                                id: 21,
                                label: "车辆报表分析",
                                nCode: 'a_01',
                                level: 2,
                                type: "P",
                                note: "这是一个treetable",
                                isShow: false
                            },
                            {
                                id: 22,
                                label: "停车报表分析",
                                nCode: 'a_01',
                                level: 2,
                                type: "P",
                                note: "这是一个treetable",
                                isShow: false
                            }
                        ]
                    }
                ],
                treeData: []
            };
        },
        computed: {},
        mounted() {
            this.treeDataFormat();
        },
        methods: {
            treeDataFormat() {
                let _this = this;
                let arr = [];
                let initExec = function (obj) {
                    obj.forEach((ele, i) => {
                        let option = {
                            id: ele.id,
                            label: ele.label,
                            nCode: ele.nCode,
                            level: ele.level,
                            type: ele.type,
                            note: ele.note,
                            isShow: ele.isShow
                        };
                        arr.push(option);
                        if (ele.children) {
                            initExec(ele.children);
                        }
                    });
                };
                initExec(_this.menuData);
                _this.treeData = arr;
            }
        },
        beforeDestroy() {}
    };

</script>
<style scoped>
    .common-menumain-body {
        position: relative;
        width: 100%;
        height: calc(100% - 112px);
    }

    /* 表单整体背景 */
    .common-menumain-formbox {
        width: 100%;
        background-color: #fff;
    }

    .common-menumain-body .common-menumain-handlebox {
        width: 97.8% !important;
        height: 50px !important;
        line-height: 50px !important;
        padding-left: 10px !important;
        font-size: 12px !important;
        color: #5A5E66;
    }

    /* 查询按钮 */
    .common-menumain-handlebox .button-info {
        display: inline-block;
        width: 73px;
        height: 29px;
        background-color: #2F95F4;
        color: #fff;
        border: 1px solid;
        border-radius: 4px;
        float: right;
        margin-top: 10px;
        line-height: 29px;
        margin-right: 5px;
    }

    .common-menumain-body .li-border-bottom {
        border-bottom: 1px solid #777;
    }

    .common-menumain-body .li-border-right {
        border-right: 1px solid #777;
    }

    .common-menumain-body .li-border-top {
        border-top: 1px solid #777;
    }

    .common-menumain-body .li-border-left {
        border-left: 1px solid #777;
    }

</style>
