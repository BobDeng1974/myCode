<!--   
    name：车辆定位组件
    desc：紧急避险车辆定位组件
    param：paramName{param }        
    return Value : None
    author：wenls 
    date：2018.9.10
-->
<template>
    <div id="carposiMap" ref="carposiMap" style="width:100%;height: 100%;"></div>
</template>
<script>
    import {
        MP
    } from '@/utils/map.js'
    export default {
        components: {},
        props: {
            optionParam: {
                type: Object
            }
        },
        data() {
            return {
                map: null,
                markers: [],
                marker: null,
                markerClusterer: null
            };
        },
        computed: {},
        mounted() {
            let _this = this;
            let count = 0;
            MP(_this.ak).then(BMap => {
                //在此调用api
                _this.initmap();
                console.log(111);
                //  setInterval(() => {
                count += 0.01;
                console.log(count);
                //_this.setTheLocation(116.3449 + count, 39.93995 + count);
                _this.setMarkerClusterer();
                //  }, 300);
            });
        },
        methods: {
            //map
            initmap() {
                let _this = this;
                _this.map = new BMap.Map(this.$refs.carposiMap); // 创建Map实例
                _this.map.centerAndZoom(new BMap.Point(116.40411, 39.91511), 11); // 初始化地图,设置中心点坐标和地图级别 
                _this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
            },
            //init marker
            initMarker(count) {
                alert(count);
            },
            // 用经纬度设置地图中心点
            setTheLocation(longitude, latitude) {
                let _this = this;
                // _this.map.clearOverlays();
                var new_point = new BMap.Point(longitude, latitude);
                var myIcon = new BMap.Icon("static/img/jjbx/monitor/position/tb2.png", new BMap.Size(300, 157));
                var marker = new BMap.Marker(new_point, {
                    icon: myIcon
                }); // 创建标注 
                _this.map.addOverlay(marker); // 将标注添加到地图中
                // _this.map.panTo(new_point);//设置改标注为地图中心点
                // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            },
            //设置点聚合
            setMarkerClusterer() {
                let _this = this; 
                _this.markers = []; 
                let pt = null;
                let label = null;
                let i = 0;
                let myIcon = new BMap.Icon("static/img/jjbx/monitor/position/tb2.png", new BMap.Size(300, 157));
                //-----------------------------
                pt = new BMap.Point("116.3449", "39.93995");
                _this.marker = new BMap.Marker(pt, {
                    icon: myIcon,
                    title: '鲁A12345'
                });
                label = new BMap.Label("鲁A12345", {
                    offset: new BMap.Size(-30,-38)
                });
                label.setStyle({
                    width: "80px",
                    color: '#000',
                    background: '#fff',
                    border: '1px solid #CADFF4',
                    borderRadius: "3px",
                    textAlign: "center",
                    height: "30px",
                    lineHeight: "30px"
                });
                _this.marker.setLabel(label);
                _this.marker.addEventListener('click',function(){
                    _this.initMarker("鲁A12345")
                });
                _this.markers.push(_this.marker);
                _this.marker = null;
                // -------------------------------------
                pt = new BMap.Point("117.3449", "39.93999");
                
                _this.marker = new BMap.Marker(pt, {
                    icon: myIcon,
                    title: '鲁A12345'
                });
                label = new BMap.Label("鲁A12346", {
                    offset: new BMap.Size(-30,-38)
                });
                label.setStyle({
                    width: "80px",
                    color: '#000',
                    background: '#fff',
                    border: '1px solid #CADFF4',
                    borderRadius: "3px",
                    textAlign: "center",
                    height: "30px",
                    lineHeight: "30px"
                });
                _this.marker.setLabel(label);
                _this.markers.push(_this.marker);
                
                pt = new BMap.Point("118.3449", "39.94004");
                _this.markers.push(new BMap.Marker(pt, {
                    icon: myIcon
                }));
                pt = new BMap.Point("119.3449", "39.94009");
                _this.markers.push(new BMap.Marker(pt, {
                    icon: myIcon
                }));
                //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
                _this.markerClusterer = new BMapLib.MarkerClusterer(_this.map, {
                    markers: _this.markers
                });
            }
        },
        beforeDestroy() {}
    }

</script>
<style scoped>
</style>
