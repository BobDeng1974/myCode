<template>
    <div id="home" class="wrapper">
        <v-head v-show="isHeaderShow" v-on:on-home-FullScrren-show="onFullScreenClick(true)"></v-head>
        <div v-show="!isHeaderShow" style="width:16px;height: 30px;line-height: 30px;position: absolute;top:0;right: 0;margin-right:15px;">
            <i @click="onFullScreenClick(false);" class="el-icon-jjbx-nofullscrren" style="vertical-align: middle;color:#fff;"></i>
        </div>
        <router-view class="common-home-body"></router-view>
    </div>
</template>

<script>
    import vHead from "@/components/common/Header.vue";
    export default {
        data() {
            return {
                isHeaderShow: true
            };
        },
        components: {
            vHead
        },

        created() {},
        mounted() {},
        methods: {
            onFullScreenClick(val) {
                let self = this;
                if (val) {
                    self.fullScreen();
                    self.isHeaderShow = false;
                } else {
                    self.exitFullScreen();
                    self.isHeaderShow = true;
                }
            },
            //全屏
            fullScreen() {
                console.log(111);
                var el = document.documentElement,
                    rfs =
                    el.requestFullScreen ||
                    el.webkitRequestFullScreen ||
                    el.mozRequestFullScreen ||
                    el.msRequestFullScreen,
                    wscript;
                if (typeof rfs != "undefined" && rfs) {
                    rfs.call(el);
                    return;
                }
                if (typeof window.ActiveXObject != "undefined") {
                    wscript = new ActiveXObject("WScript.Shell");
                    if (wscript) {
                        wscript.SendKeys("{F11}");
                    }
                }
            },
            //取消全屏
            exitFullScreen() {
                var el = document,
                    cfs =
                    el.cancelFullScreen ||
                    el.webkitCancelFullScreen ||
                    el.mozCancelFullScreen ||
                    el.exitFullScreen,
                    wscript;
                if (typeof cfs != "undefined" && cfs) {
                    cfs.call(el);
                    return;
                }
                if (typeof window.ActiveXObject != "undefined") {
                    wscript = new ActiveXObject("WScript.Shell");
                    if (wscript != null) {
                        wscript.SendKeys("{F11}");
                    }
                }
            }
        }
    };

</script>

<style scoped>
    .common-home-body{
        min-width:1200px;
      /*   height:calc( 100% - 81px )  ; */
    }
</style>
