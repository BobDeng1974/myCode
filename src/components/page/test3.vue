<template >
  <div>
    <ggg :msg='msg'></ggg> //组件使用 父组件传msg 子组件接收(：msg）
  </div>
</template>


<script> 
export default {  //这儿用的脚手架，若是普通文件，这儿就是new Vue（{}）
  data(){
    return {
    msg:[{
        text:1,
        next:[{
          text:'1-1',
          next:[{
            text:'1-1-1',
            next:[{
              text:'1-1-1-1',
            }]
          }]
        },{
          text:'1-2' //1-2写在这儿，第二层数据数组中的a[1].text就是‘1-2’
        }]
      },{
        text:2,
      
      },{
        text:3,
      
      }]
    }
  },
  components:{
    ggg:{
      name:'gsss',
      template:`
      <ul >
        <li v-for='a in msg' @click.stop.self='show=!show'>
          {{a.text}}
          <gsss :msg='a.next' v-if='show' ></gsss>
        </li>
      </ul>`,
      props:['msg'],
      data(){
        return {
          show:true
        }
      }
    }
  }
}
</script>