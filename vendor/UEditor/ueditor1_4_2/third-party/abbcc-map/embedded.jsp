<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="javax.servlet.http.HttpServletRequest"%>

<!DOCTYPE html>
<%
	request.setCharacterEncoding("UTF-8");
	response.setCharacterEncoding("UTF-8");
	String width = request.getParameter("width");
	String height = request.getParameter("height");
	String x = request.getParameter("x");
	String y = request.getParameter("y");
	String z = request.getParameter("z");
	String ox = request.getParameter("ox");
	String oy = request.getParameter("oy");
	String mapType = request.getParameter("mapType");
	String info = request.getParameter("info");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="Content-Language" content="zh-CN" />
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<script type="text/javascript" src="/js/jquery.js"> </script>
<style type="text/css">
body, html,#mapCaontainer {width: 100%;height: 100%;overflow: hidden;margin:0;}
</style>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.1&services=true"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<title>Insert title here</title>
</head>
<body>
<div id="mapContainer" style="height: <%=height%>px; width: <%=width%>px; overflow: hidden; position: relative; z-index: 0; background-image: url(&quot;http://api.map.baidu.com/images/bg.png&quot;); color: rgb(0, 0, 0); text-align: left;"></div>
<script type="text/javascript">
// 百度地图API功能
var x = <%=x%> ||  120.04739399999994;
var y = <%=y%> || 28.888782;
var z = <%=z%> || 17;
var ox =<%=ox%> ||  120.12235729999998;
var oy =<%=oy%> || 28.930311614094542;
var info = decodeURIComponent("<%=info%>") || "网络公司";
var mapType = <%=mapType%>;

(function(){
	if(mapType == 1){
	if( typeof BMap == 'undefined' ){
	var mapContainer = $('#mapContainer');
	mapContainer.css({ color: 'red', position: 'relative', textAlign: 'center' });
	var msg = $('<div>').css({ position: 'absolute', top:'50%', width:'100%' }).text('加载地图失败，请刷新重试');
	mapContainer.append( msg );
	}else{
	var mMap = new BMap.Map( 'mapContainer' );
	var mPoint = new BMap.Point( x, y );
	var oPoint = new BMap.Point( ox , oy );
	var mInfoWindow = new BMap.InfoWindow( info, { width:'auto', height:'auto', title:'', enableAutoPan:false });
	var mMarker = new BMap.Marker( oPoint );
	mMarker.addEventListener('infowindowopen', function(e) {
		setTimeout(function(){
			var moduleWidth = 728;
			var diff = 0;
			if( moduleWidth < 255 ){
			diff = 728 - 255;
			if( diff < -100 ){ diff = -100; }
			}
			var pop = $('#mapContainer').children('#platform').children('#mask').next().children('div:first').children('div.pop');
			var divTop = pop.children('.top');
			divTop.css({ width: (202+diff) + 'px' });// top-center source [202px]
			divTop.next().css({ left: (227+diff) + 'px' });// top-right-radius source [227px]
			//middle-center source [250px]
			if( $.browser.msie ){
			if( $.browser.version < 8 ){
			pop.children('.center').css({ width: (250+diff+2) + 'px' });
			}else{
			pop.children('.center').css({ width: (250+diff) + 'px' });
			}
			} else {
			pop.children('.center').css({ width: (250+diff) + 'px' });
			}
			var divBottom = pop.children('.bottom');
			divBottom.css({ width: (202+diff) + 'px' });// bottom-center source [202px]
			divBottom.next().css({ left: (227+diff) + 'px' });// bottom-right-radius source [227px]
			pop.children('div:last').css({ width: (220+diff) + 'px' });// middle-center text source [220px]
			pop.children('img:first').css({ left: (227+diff) + 'px' });// close img button source [227px]
		}, 100);
	})
	mMarker.addEventListener('click', function(e) {
			if( mInfoWindow.isOpen() ){
			this.closeInfoWindow();
			} else {
			this.openInfoWindow(mInfoWindow);
			}
			});
	mMap.centerAndZoom( mPoint, z );
	mMap.disableDoubleClickZoom();
	mMap.addControl( new BMap.NavigationControl() );
	mMap.addOverlay( mMarker );
	mMarker.openInfoWindow( mInfoWindow );
	}
	}
	if(mapType == 2){
		if(typeof google.maps.Map == 'undefined'){
			var googleMapContainer = $('#mapContainer');
			mapContainer.css({ color: 'red', position: 'relative', textAlign: 'center' });
			var msg = $('<div>').css({ position: 'absolute', top:'50%', width:'100%' }).text('加载地图失败，请刷新重试');
			mapContainer.append( msg );
		}else{
			//获取承载谷歌地图的容器
			var container = document.getElementById('mapContainer');
			var myLatLng = new google.maps.LatLng( x,y);
			var myOverLatLng = new google.maps.LatLng( x,y);
			//创建谷歌地图
			var googleMap = new google.maps.Map(container,
					{draggable : true,
scrollwheel : false,
zoom : z,
streetViewControl: false,
center:myOverLatLng,
scaleControl: true,
mapTypeId : google.maps.MapTypeId.ROADMAP});
			//创建标记
			marker = new google.maps.Marker({map : googleMap,position:myLatLng,animation: google.maps.Animation.DROP,
					draggable : true});
			marker.setMap(googleMap);
			var infoWin = new google.maps.InfoWindow({content:info,width:"auto",height:"auto"});
			infoWin.open(googleMap,marker);
		}
	}
})(); 






</script>
</body>
</html>