<!--   
    name：报警设置明细
    desc：报警设置明细界面 v 1.2
    param：paramName{param }        
    return Value : None
    author：qiaoyh 
    date：2018.10.26
-->
<template>  
    <div >  
        <tree-grid :columns="columns" :tree-structure="true" :data-source="dataSource" v-on:callMethod="getData"></tree-grid>  
    </div>  
</template>  
  
<script>  
import ajax from "axios";
import TreeGrid from './TreeGrid'  
export default {
    name: 'hello',  
    data () {  
        return {  
            columns: [  
                {  
                    text: '报警类型名称',  
                    dataIndex: 'templateName'  
                },  
                {  
                    text: '描述',  
                    dataIndex: 'templateDesc'  
                },  
                {  
                    text: '触发条件',  
                    dataIndex: 'templateCon'  
                },  
                {  
                    text: '播报内容',  
                    dataIndex: 'sendContent'  
                },  
                {  
                    text: '报警颜色',  
                    dataIndex: 'templateColor'  
                }      
            ],  
        dataSource: [  
            {  
                id: '',  
                parentId: '',  
                templateName: '',  
                templateDesc: '', 
                templateCon:'', 
                templateColor:'',
                sendContent: '',  
                children: [  
                    {  
                        id: '',  
                        parentId: '',  
                        templateName: '',  
                        templateDesc: '',
                        templateCon:'',  
                        templateColor:'', 
                        sendContent: ''  
                    }  
                ]  
            },  
        ]  
    }  
},  
    components: {  
      TreeGrid  
    },  
    created() {
      let _this = this;
      _this.getData();
  },
  methods: {
      getData(){
          let _this = this;
          ajax.get(_this.global_.apiUrlJj + "/get/select-warning")
              .then(function (res) {
                  console.log(res);
                  // var obj = {}
                  if (res.data) {
                      if (res.data.data) {
                          _this.dataSource = res.data.data;
                      }
                  }
                  console.log(_this.dataSource);
              });
      }
  }
}  
</script>