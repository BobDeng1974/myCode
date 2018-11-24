<template>
  <div id="body">
        <div id="app">
            <div class="wrapper">
                <div class="error-page">
                    <div class="error-code">
                        4<span>0</span>3
                    </div>
                    <div class="error-desc">啊哦~ 你没有权限访问该页面哦</div>
                    <div class="error-handle">
                        <a href="/" class="el-button el-button--primary">返回首页</a>
                        <a href="#" class="el-button el-button--primary error-btn" @click="goBack">返回上一页</a>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  methods: {
      goBack(){
          this.$router.go(-1);
      }
  }
}
</script>


<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    template,#body,.wrapper{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    template{
        display: block;
    } 
    #app,.wrapper{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #1f2b3b;
        background: -webkit-gradient( radial, 50% 50%, 0, 50% 50%, 460, from(#27556f), to(#1f2b3b));
    }
    .error-page{
        /* display: flex; */
        align-items: center;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        text-align: center;
        position: absolute;
        top: 102px;
    }
    .error-code{
        line-height: 1;
        font-size: 250px;
        font-weight: bolder;
        color: #f02d2d;
    }
    .error-code span{
        color: #00a854;
    }
    .error-desc{
        font-size: 30px;
        color: #777;
    }
    .error-handle{
        margin-top: 30px;
        padding-bottom: 200px;
    }
    a{
        text-decoration: none;
    }
    .el-button--primary{
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF;
    }
    .el-button{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        border: 1px solid #409EFF;
        text-align: center;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }
    .error-btn{
        margin-left: 100px;
    }
</style>
