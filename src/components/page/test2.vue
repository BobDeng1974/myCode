<!--   
    name：*****组件
    desc：
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.8.22
-->
<template>
    <div>
        <div class="top">asdf
            <div class="avatar" style="background: red;">
                <img src="chrome-extension://ikkbfngojljohpekonpldkamedehakni/imgs/map/logo.png" />
            </div>
            <app :list="list">
                <template slot-scope="scope">
                    {{ scope.item.id }}
                </template>
            </app>
        </div>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">
                用户管理
                <component v-bind:is="who"></component>
                <!-- <tab-item1 :strInfo="str"></tab-item1> -->
                <!-- <component :is="tab-item1"></component> -->
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">
                配置管理
                <!-- <component :is="tab-item2"></component> -->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import Vue from "vue";
export default {
    components: {},
    data() {
        return {
            who: "tab-item1",
            activeName2: "first",
            list: [
                { id: 1, text: "01" },
                { id: 2, text: "02" },
                { id: 3, text: "03" }
            ],
            str: "测试数据"
        };
    },
    computed: {},
    mounted() {
        let _this = this;
        _this.$nextTick(() => {
            _this.test();
        });
    },
    methods: {
        test() {
            let jsonObj = {
                id: "11",
                name: "阿财",
                age: [28, 29]
            };
            let { aa, name, age: number } = jsonObj;
            console.log(aa, name, number);
            let people = [
                {
                    name: "aa",
                    age: 11,
                    family: {
                        mother: "aya",
                        father: "wq"
                    }
                },
                {
                    name: "bb",
                    age: 12,
                    family: {
                        mother: "ayb",
                        father: "wq"
                    }
                },
                {
                    name: "cc",
                    age: 13,
                    family: {
                        mother: "ayc",
                        father: "wq"
                    },
                    children: [
                        {
                            name: "dd",
                            age: 14,
                            family: {
                                mother: "ayd",
                                father: "wq"
                            }
                        }
                    ]
                }
            ];
            for(let {name:n,family:{mother:mt},children:{name:nn,family:{mother:mtt}}} of people){
                console.log(n+"-"+mt+"-"+nn+"-"+mtt);
            }
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    beforeDestroy() {}
};

Vue.component("app", {
    props: {
        list: {
            type: Array
        }
    },
    data() {
        return {
            count: 0
        };
    },
    template:
        "<div><div v-for='(item,key,index) in list' :key='index'>" +
        "<h1><slot v-bind:item='item'>username:{{ item.text }}</slot></h1>" +
        "<button @click='insert(item.id)'>click to insert new Component</button>" +
        "</div></div>",
    methods: {
        insert(id) {
            alert(id);
        }
    }
});

Vue.component("tab-item1", {
    props: {
        strInfo: {
            type: String
        }
    },
    data() {
        return {
            who: "tab-child1",
            which_to_show: "first",
            isShow: "0",
            str: ""
        };
    },
    methods: {
        onUpinfoClick() {
            this.str = this.str + "A-";
        },
        onUpIsshowClick(index) {
            /* this.$set(this.isShow,index,this.isShow[index]=!this.isShow[index]);
            let _this = this;
            _this.isShow.forEach((ele,i) => {
                _this.$set(_this.isShow,i,index==i?true:false);
            }); */
            this.isShow = index;
            this.who = "tab-child" + index;
            console.log(this.isShow);
        }
    },
    created() {
        console.log("strInfo:" + this.$props.strInfo);
        this.str = this.$props.strInfo;
    },
    template:
        "<div style='width:200px;height:100px;background:red;'>" +
        "<div style='width:100px;height:100%;background:#333;float:left;'>" +
        "<div @click='onUpIsshowClick(1)'  style='width:100%;height:30px;border:1px solid blue;' >111</div>" +
        "<div @click='onUpIsshowClick(2)'  style='width:100%;height:30px;border:1px solid blue;' >222</div>" +
        "<div @click='onUpIsshowClick(3)'  style='width:100%;height:30px;border:1px solid blue;' >333</div>" +
        "</div>" +
        "<component v-bind:is='who' :strInfo='who'></component>" +
        "</div>"
});
Vue.component("tab-item2", {
    props: {
        strInfo: {
            type: String
        }
    },
    template: "<div>{{ strInfo }}</div>"
});
Vue.component("tab-child1", {
    props: {
        strInfo: {
            type: String
        }
    },
    template: "<div>{{ strInfo }}</div>"
});
Vue.component("tab-child2", {
    props: {
        strInfo: {
            type: String
        }
    },
    template: "<div>{{ strInfo }}</div>"
});
Vue.component("tab-child3", {
    props: {
        strInfo: {
            type: String
        }
    },
    template: "<div>{{ strInfo }}</div>"
});
</script>
<style scoped lang="stylus" >
.top
    height: 80px
    line-height: 80px
    background-color: #0e5792
    min-width: 800px
.avatar
    float: left
    width: 300px
    img
        width: 60px
        height: 60px
        display: inline-block
        border-radius: 30px
</style> 