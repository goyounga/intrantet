<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>작업자 조회</title>
	<script src="http://maps.google.co.kr/maps?file=api&amp;v=2&amp;sensor=true&amp;key=ABQIAAAAo74BCJq-9lVqb5HBN8kerhQSKEGRo65bMUWqwarPdVeYjnE4YRQHvYQWmNWQa_LSzq77ofAc51eqEg" type="text/javascript">
	</script>
	<script language="JavaScript" type="text/javascript">
	var SELECT_ID = "UCMAP001S";
	var gMap = null;
    var gGeocoder = null;
    var gSiteMarker = null;
	var gWIcon, gPIcon;
	var gBase_latlng = null;
	var gHt		= new Hashtable();

	var gCenterLat = 37.526900253948835; //위도
	var gCenterLng = 127.01714443206787; //경도

	function init()
	{
		if (GBrowserIsCompatible()) {
			gMap = new GMap2(document.getElementById("map"));
			gMap.addControl(new GLargeMapControl());
			gMap.addControl(new GMapTypeControl());
			gMap.setCenter(new GLatLng(gCenterLat, gCenterLng), 12);

			gGeocoder = new GClientGeocoder();
		}

		gWIcon = new GIcon();
//		gWIcon.image = "http://labs.google.com/ridefinder/images/mm_20_red.png";
		gWIcon.image = "/html/images/sample/worker.jpg";
//		gWIcon.shadow = "http://labs.google.com/ridefinder/images/mm_20_shadow.png";
		gWIcon.iconSize = new GSize(32, 33);
		gWIcon.shadowSize = new GSize(42, 33);
		gWIcon.iconAnchor = new GPoint(6, 20);
		gWIcon.infoWindowAnchor = new GPoint(5, 1);

		gPIcon = new GIcon();
		gPIcon.image = "/html/images/sample/place.jpg";
		gPIcon.iconSize = new GSize(32, 33);
		gPIcon.shadowSize = new GSize(42, 33);
		gPIcon.iconAnchor = new GPoint(6, 20);
		gPIcon.infoWindowAnchor = new GPoint(5, 1);

/*		GEvent.addListener(gMap, "click", function(marker, point) {
//alert(point);
			if (point)
			{
				var coord = document.getElementById("coord");
				coord.innerText = point.toString();
			}
			else
			{
				coord.innerText = "";
			}
		});
*/
/*		GEvent.addListener(gMap, "click", function(overlay,point) {
            base_latlng = gMap.fromContainerPixelToLatLng(point);
            var lmarker = new GMarker(point);
            gMap.addOverlay(lmarker);
            lmarker.setImage("http://maps.google.com/mapfiles/ms/icons/red-pushpin.png");
        });

        GEvent.addListener(gMap, "singlerightclick", function(point, src, overlay){
            cur_latlng = gMap.fromContainerPixelToLatLng(point);

            var rmarker = new GMarker(cur_latlng);
            gMap.addOverlay(rmarker);
            rmarker.setImage("http://maps.google.com/mapfiles/ms/icons/purple-pushpin.png");

            var dist = cur_latlng.distanceFrom(base_latlng);
            var myHtml = "Distance: " + dist;
            gMap.openInfoWindow(cur_latlng, myHtml);
        });
*/
		query();
	}

	function query()
	{
		var gridObj = document.all(SELECT_ID);
		gridObj.setParam("tel_format", "TEL");
		gridObj.setParam("pda_tel_format", "TEL");

		var trans = new Trans();
		trans.setPageRow(999);
		trans.setSvc(SELECT_ID);
		trans.setWiseGrid("1");
		trans.setCallBack("showWorker");
		trans.setForwardId("wgdsl","");
		trans.open("fQuery","f","/wisegrid.do");
	}

	function showWorker()
	{
		var gridObj = document.all(SELECT_ID);
		var rowCnt = gridObj.GetRowCount();
		var point = null;
		var desc = "";

		for (var i=0; i < rowCnt; i++)
		{
			point = new GLatLng(parseFloat(gridObj.GetCellValue("lat", i)), parseFloat(gridObj.GetCellValue("lng", i)));
			desc = "<div style='background-color:#FFFFFF;font-family:dotum;font-weight:bold;color:#0099FF'>" +
				gridObj.GetCellValue("user_nm", i) + "&nbsp;" + gridObj.GetCellValue("tel", i);

			gMap.addOverlay(createMarker(point, desc));
		}
	}

	function createMarker(point, desc) 
	{
		var marker = new GMarker(point, gWIcon);
		GEvent.addListener(marker, "mouseover", function() 
		{
			var desc2 = desc;

			if (gSiteMarker != null)
			{
				var cur_latlng = marker.getLatLng();
				var dist = cur_latlng.distanceFrom(gBase_latlng);

				dist = (parseFloat(dist)/1000).toFixed(1);

				desc2 += "<br>거리: " + dist + "km";
			}

			desc2 += "</div>";

			marker.openInfoWindowHtml(desc2);
		});
	  	return marker;
	}

	function showAddress()
	{
		var address = fQuery.address.value;

		address = replaceStr(address, ' ', '+');

//		window.open("googleReturnXY.jsp?query="+address, "googleReturnXY", "top=0,left=300,width=980,height=620,scrollbars=no,status=no,resizable=yes");

//		return;

		if (gSiteMarker != null)
			gMap.removeOverlay(gSiteMarker);

		var gridObj = document.all(SELECT_ID);
		var rowCnt = gridObj.GetRowCount();

		if (gGeocoder) {
			gGeocoder.getLatLng(
				address,
				function(point)
				{
					if (!point)
					{
						alert(address + " not found");

						for (var i=0; i<rowCnt; i++)
						{
							gridObj.SetCellValue("dist", i, "");
							gridObj.SetCellValue("distance", i, "");
						}
					}
					else
					{
						var desc = "<div style='background-color:#FFFFFF;font-family:dotum;font-weight:bold;color:#22991F'>" + address + "</div>";
						gMap.setCenter(point, 12);
						gSiteMarker = new GMarker(point, gPIcon);
						gMap.addOverlay(gSiteMarker);
						gSiteMarker.openInfoWindowHtml(desc);

						GEvent.addListener(gSiteMarker, "mouseover", function() 
						{
							gSiteMarker.openInfoWindowHtml(desc);
						});

						gBase_latlng = gSiteMarker.getLatLng();

						alert("주소 조회 성공");

						var cur_latlng = null;
						var dist = 0;

						for (var i=0; i < rowCnt; i++)
						{
							cur_latlng = new GLatLng(parseFloat(gridObj.GetCellValue("lat", i)), parseFloat(gridObj.GetCellValue("lng", i)));
							dist = cur_latlng.distanceFrom(gBase_latlng);
							gridObj.SetCellValue("distance", i, (parseFloat(dist)/1000).toFixed(5));
							gridObj.SetCellValue("dist", i, (parseFloat(dist)/1000).toFixed(1));
						}

						gridObj.SetColCellSort("distance", "asceding");
					}
				}
			);
		}

	}
	</script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="eventGrid();init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="작업자 조회"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>

	<!-- 검색조건 S -->
	<form  name="fQuery" method="post" onsubmit="return false;">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width=80 align=right style="padding:2 0 0 0 ">주소 :&nbsp;</td>
					<td width=875>
						<ucare:input type="text" name="address" width="580" title="주소" required="true" requirednm="주소" mode="active" tag="onKeyUp=\"pressEnter('showAddress()')\""/>
					</td>
					<td width=1 bgcolor=#CCCCCC></td>
					<td width="80" align="right">
						<ucare:imgbtn width="70" name="btnQuery"	kind="R" value="조회"	 onClick="showAddress()"/><!-- 조회 -->
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<!-- 검색조건 E -->

	<tr>
		<td height="5"></td>
	</tr>

	<!-- 본문 S -->
	<form name="f" method="post">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td class="stitle">위치정보</td>
				</tr>
				<tr>
					<td>
						<div id="map" style="width: 1225px; height: 560px"></div>
					</td>
				</tr>
				<tr>
					<td>
						<div id="coord" style="width: 1225px; height: 20px"></div>
					</td>
				</tr>
				<tr>
					<td height="5"></td>
				</tr>
			</table>
			<table width="200" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td class="stitle">작업자 리스트</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="UCMAP001S" width="1225" height="170" no="true">
							<tr event="O">
								<td width="65"	column="user_id" 		title="user_id"			hidden="true"></td>
								<td width="65"	column="user_nm" 		title="성명" 			align="center"></td>
								<td width="400"	column="cur_pos" 		title="현재위치"		align="left"></td>
								<td width="80"	column="aaa" 			title="기술인증"		align="center"></td>
								<td width="80"	column="work_stts"		title="업무상태"		align="center"></td>
								<td width="65"	column="call_recv" 		title="콜접수건"		format="MONEY"></td>
								<td width="65"	column="call_proc" 		title="콜처리건"		format="MONEY"></td>
								<td width="100"	column="tel" 			title="휴대폰번호" 		align="center"></td>
								<td width="100"	column="pda_tel"		title="PDA전화번호" 	align="center"></td>
								<td width="65"	column="lat"	 		title="lat"				hidden="true"></td>
								<td width="65"	column="lng" 			title="lng"				hidden="true"></td>
								<td width="65"	column="distance"		title="distance"		hidden="true"	format="MONEY"	maxlength="5.5"></td>
								<td width="65"	column="dist"			title="거리(km)"		format="MONEY"	maxlength="5.1"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- 본문 E -->
</table>
</body>
</html>