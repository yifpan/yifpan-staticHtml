require('../css/about.less');
require('../css/common.less');
import $ from 'jquery';
import Footer from '../footer/footer'
$(function () {
  const App=function(){
      var dom=document.getElementById('footerHtml');
      let footer=new Footer();
      dom.innerHTML=footer.tpl;
  }
  new App();

  new articel();
  function articel() {
      // 生产地址
      this.apiUrl = "https://api.cocogc.cn/";
      $(".close").on('click',function(){
          $(".zizhi-wrap").hide();
          $(".zizhi").css('transform','translateY(0px)');
      })
      $(".zizhi-wrap .bnt").on('click',function(){
          $(".zizhi-wrap").hide();
          $(".zizhi").css('transform','translateY(0px)');
      })
      $('.showZizhi').on('click',function(){
          $(".zizhi-wrap").show();
          $(".zizhi").show().css('transform','translateY(150px)');
      })
    function initMap(){
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMapOverlay();//向地图添加覆盖物
      }
      function createMap(){ 
        map = new BMap.Map("map"); 
        map.centerAndZoom(new BMap.Point(110.126402,19.959163),12);
      }
      function setMapEvent(){
        map.enableScrollWheelZoom();
        map.enableKeyboard();
        map.enableDragging();
        map.enableDoubleClickZoom()
      }
      function addClickHandler(target,window){
        target.addEventListener("click",function(){
          target.openInfoWindow(window);
        });
      }
      function addMapOverlay(){
          var markers = {content:"海南省澄迈县老城镇海南生态软件园8857号楼",title:"中国海南生态软件园",imageOffset: {width:-46,height:-21},position:{lat:19.952503,lng:110.127696}}
          var point = new BMap.Point(markers.position.lng,markers.position.lat);
          var circle = new BMap.Circle(point,60,{strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}); //创建圆
          var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
            imageOffset: new BMap.Size(markers.imageOffset.width,markers.imageOffset.height)
          })});
          var label = new BMap.Label(markers.title,{offset: new BMap.Size(-75,-40)});
          var opts = {
            width: 200,
            title: markers.title,
            enableMessage: false,
            offset : new BMap.Size(30, -30) 
          };
          var infoWindow = new BMap.InfoWindow(markers.content,opts);
          marker.setLabel(label);
          map.addOverlay(marker);
          map.addOverlay(circle);  
          addClickHandler(marker,infoWindow);
          label.setStyle({
            color : "#333",
            fontSize : "14px",
            height : "30px",
            lineHeight : "30px",
            fontFamily:"微软雅黑",
            padding:"2px 10px",
            'border-radius':"4px",
          'box-shadow':'0 0 10px #ccc',
          'font-weight':'blod',
          'border':'1px solid #fff'
          })
      }
    //向地图添加控件
    function addMapControl(){
      var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
      scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
      map.addControl(scaleControl);
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
      map.addControl(navControl);
    }
    var map;
    initMap();
  }
})
