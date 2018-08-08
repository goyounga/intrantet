<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="kr" xml:lang="kr">
<head>
	<title>�۾��� ��ȸ</title>
<!--	<script 
		type="text/javascript" 
		src="http://map.naver.com/js/naverMap.naver?key=2673549ab8a01a30b0e7d90e66a90341"> //127.0.0.1
	</script>-->
	<script 
		type="text/javascript" 
		src="http://map.naver.com/js/naverMap.naver?key=9c99cd9d3bf226560e85db14db18dc7b"> //210.221.221.104
	</script>
	<script language="JavaScript" type="text/javascript">
	var SELECT_ID = "UCMAP001S";
	var SELECT_POS_ID = "UCMAP002S";

	var gMap = null;
	
	var gWiconurl = "";
	var gWiconSize = null;
	var gWiconOffset = null;
	var gWmarkerIcon = null;
	
	var gPiconurl = "";
	var gPiconSize = null;
	var gPiconOffset = null;
	var gPmarkerIcon = null;
	
	var gWInfoWin = null;
	var gPInfoWin = null;
	var gWInfoWinStt = new Array();

	var gPMarker = null;
	var gBase_latlng = null;
	var gBase_point = null;

	var gCenterLat = 37.526900253948835; //����
	var gCenterLng = 127.01714443206787; //�浵

	function init()
	{
		gMap = new NMap(document.getElementById('map'),905,560);

		gMap.setCenterAndZoom(gMap.fromLatLngToTM128(new NLatLng(gCenterLat, gCenterLng)),6);

//		gWiconurl = "http://static.asjs.net/map/spot_green.png";
		gWiconurl = "/html/images/sample/worker.jpg";
		gWiconSize = new NSize(32,33);
		gWiconOffset = new NSize(42,33);
		//��Ŀ�� offset����
		gWmarkerIcon = new NIcon(gWiconurl,gWiconSize,gWiconOffset);

		gPiconurl = "/html/images/sample/place.jpg";
		gPiconSize = new NSize(32,33);
		gPiconOffset = new NSize(42,33);
		//��Ŀ�� offset����
		gPmarkerIcon = new NIcon(gPiconurl,gPiconSize,gPiconOffset);

		var zoom =new NZoomControl();
		zoom.setAlign("left");
		zoom.setValign("top");
		gMap.addControl(zoom);

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
		var marker = null;
		var latlng = null;
		var point = null;
		var desc = "";
		var tempLatlng = null;
		var tempPoint = null;

		for (var i=0; i < rowCnt; i++)
		{
			//ǥ���� ��Ŀ(������) �����
			latlng = new NLatLng(parseFloat(gridObj.GetCellValue("lat", i)), parseFloat(gridObj.GetCellValue("lng", i)));
			point = gMap.fromLatLngToTM128(latlng);
			desc = "<div style='background-color:#FFFFFF;width:200px;height:50px;margin-bottom:67px;margin-left:2px;border:3px solid #009966;padding:10px;font-family:dotum;font-weight:bold;color:#0099FF'>" +
				gridObj.GetCellValue("user_nm", i) + "&nbsp;" + gridObj.GetCellValue("tel", i);

//			marker = new NMark(point, gWmarkerIcon);
			//��Ŀ ������ �����ϱ�
//			gMap.addOverlay(marker);
			gMap.addOverlay(createMarker(point, desc, "W"));

			tempLatlng = new NLatLng(parseFloat(gridObj.GetCellValue("lat", i))-0.007, parseFloat(gridObj.GetCellValue("lng", i))-0.019);
			tempPoint = gMap.fromLatLngToTM128(tempLatlng);
			desc = "<div style='background-color:#FFFFFF;width:50px;height:8px;margin-bottom:67px;margin-left:2px;border:1px solid #009966;padding:2px;font-family:dotum;font-weight:bold;color:#000000;text-align:center'>" + gridObj.GetCellValue("user_nm", i) + "</div>";

			gWInfoWinStt[i] = new NInfoWindow();
			gWInfoWinStt[i].set(tempPoint,desc);
			gMap.addOverlay(gWInfoWinStt[i]);
			//���� ������ indowWindow ���̰� �ϱ�
			gWInfoWinStt[i].showWindow();

		}
	}

	function createMarker(point, desc, flag)
	{
		if (flag == "W") //�۾���
		{
			var marker = new NMark(point, gWmarkerIcon);

			NEvent.addListener(marker, "mouseover", function(point) 
			{
				var desc2 = desc;

				if (gBase_point != null)
				{
					var dist = point.distanceFrom(gBase_point);
					dist = (parseFloat(dist)/1000).toFixed(1);
					desc2 += "<br>�Ÿ�: " + dist + "km";
				}

				desc2 += "</div>";

				if (gWInfoWin != null)
					gMap.removeOverlay(gWInfoWin);

				//marker�� infoWindow�ֱ�
				gWInfoWin = new NInfoWindow();
				gWInfoWin.set(point,desc2);
				gMap.addOverlay(gWInfoWin);
				//���� ������ indowWindow ���̰� �ϱ�
				gWInfoWin.showWindow();
				gWInfoWin.delayHideWindow(1000);
			});
		}
		else //�۾���
		{
			var marker = new NMark(point, gPmarkerIcon);
			NEvent.addListener(marker, "mouseover", function() 
			{
				var desc2 = desc;

				if (gPInfoWin != null)
					gMap.removeOverlay(gPInfoWin);

				//marker�� infoWindow�ֱ�
				gPInfoWin = new NInfoWindow();
				gPInfoWin.set(point,desc2);
				gMap.addOverlay(gPInfoWin);
				//���� ������ indowWindow ���̰� �ϱ�
				gPInfoWin.showWindow();
				gPInfoWin.delayHideWindow(1000);
			});
		}

		return marker;
	}

	function showAddress()
	{
		if (gPMarker != null)
			gMap.removeOverlay(gPMarker);

		var address = fQuery.address.value;
		address = replaceStr(address, ' ', '');

		if (trim(address) == "")
		{
			alert("�ּҸ� �Է��ϼ���!");
			return;
		}

		ifmResult.location.href= "naverReturnXY.jsp?query="+address;
	}

	// �ּ� ��ǥ ��� ��ȯ
	function showResult()
	{
//		alert(f.queryresult.value);
		var objXml = new ActiveXObject("Microsoft.XMLDOM"); 
		objXml.loadXML(f.queryresult.value); 

   		var totcnt = objXml.getElementsByTagName("total")[0].firstChild.nodeValue;

		var address = new Array();
		var x = new Array();
		var y = new Array();

		var gridObj = document.all(SELECT_POS_ID);

		gridObj.RemoveAllData();

		if (totcnt == 0)
		{
			var gridObj2 = document.all(SELECT_ID);
			var rowCnt = gridObj2.GetRowCount();

			for (var i=0; i<rowCnt; i++)
			{
				gridObj2.SetCellValue("dist", i, "");
				gridObj2.SetCellValue("distance", i, "");
			}

			return;
		}

		for (var i=0; i<totcnt; i++)
		{
			gridObj.AddRow();

			x[i] = objXml.getElementsByTagName("x")[i].firstChild.nodeValue;
			y[i] = objXml.getElementsByTagName("y")[i].firstChild.nodeValue;
			address[i] = objXml.getElementsByTagName("address")[i].firstChild.nodeValue;

			gridObj.SetCellValue("x", i, x[i]);
			gridObj.SetCellValue("y", i, y[i]);
			gridObj.SetCellValue("address", i, address[i]);
		}

		gridObj.MoveRow(0);
		showDetailO_obj(SELECT_POS_ID, "address", 0);
	}

	/*****************/
	//������
	//�׸��� onclick �̺�Ʈ �Լ�
	/*****************/
	function showDetailO_obj(id, strColumnKey, nRow)
	{
		switch(id)
		{
			case SELECT_POS_ID:
				var gridObj = document.all(id);
				gBase_latlng = new NLatLng(parseFloat(gridObj.GetCellValue("y", nRow)), parseFloat(gridObj.GetCellValue("x", nRow)));
				gBase_point = gMap.fromLatLngToTM128(gBase_latlng);
				var desc = "<div style='background-color:#FFFFFF;width:200px;height:50px;margin-bottom:67px;margin-left:2px;border:3px solid #009966;padding:10px;font-family:dotum;font-weight:bold;color:#22991F'>" +
					gridObj.GetCellValue("address", nRow) + "</div>";

				if (gPMarker != null)
					gMap.removeOverlay(gPMarker);

				gPMarker = createMarker(gBase_point, desc, "P");
				gMap.addOverlay(gPMarker);
				
				gMap.setCenterAndZoom(gMap.fromLatLngToTM128(gBase_latlng),6);

				gridObj = document.all(SELECT_ID);
				var rowCnt = gridObj.GetRowCount();
				var cur_latlng = null;
				var dist = 0;

				for (var i=0; i < rowCnt; i++)
				{
					cur_latlng = new NLatLng(parseFloat(gridObj.GetCellValue("lat", i)), parseFloat(gridObj.GetCellValue("lng", i)));
					dist = cur_latlng.distanceFrom(gBase_latlng);
					gridObj.SetCellValue("distance", i, (parseFloat(dist)/1000).toFixed(5));
					gridObj.SetCellValue("dist", i, (parseFloat(dist)/1000).toFixed(1));
				}

				gridObj.SetColCellSort("distance", "asceding");

			break;
		}
	}
	</script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="eventGrid();init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="�۾��� ��ȸ"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>

	<!-- �˻����� S -->
	<form  name="fQuery" method="post" onsubmit="return false;">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width=80 align=right style="padding:2 0 0 0 ">�ּ� :&nbsp;</td>
					<td width=875>
						<ucare:input type="text" name="address" width="580" title="�ּ�" required="true" requirednm="�ּ�" mode="active" tag="onKeyUp=\"pressEnter('showAddress()')\""/>
					</td>
					<td width=1 bgcolor=#CCCCCC></td>
					<td width="80" align="right">
						<ucare:imgbtn width="70" name="btnQuery"	kind="R" value="��ȸ"	 onClick="showAddress()"/><!-- ��ȸ -->
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<!-- �˻����� E -->

	<tr>
		<td height="5"></td>
	</tr>

	<!-- ���� S -->
	<form name="f" method="post">
	<input type="hidden" name="query">
	<input type="hidden" name="queryresult">
	<tr>
		<td>
			<iframe src=""  marginwidth="0" marginheight="0" height="0" frameborder="0" width="0" framespacing="0" name="ifmResult" scrolling="no">
			</iframe>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="300">
				<col width="20">
				<col width="905">
				<tr>
					<td class="stitle" colspan="3">��ġ����</td>
				</tr>
				<tr>
					<td valign="top">
						<ucare:grid id="UCMAP002S" width="300" height="300" no="true">
							<tr event="O">
								<td width="260"	column="address" 		title="�ּ�"></td>
								<td width="65"	column="x" 		title="x" 				hidden="true"></td>
								<td width="65"	column="y" 		title="y" 				hidden="true"></td>
							</tr>
						</ucare:grid>
					</td>
					<td>
					</td>
					<td>
						<div id="map" style="width: 905px; height: 580px"></div>
					</td>
				</tr>
				<tr>
					<td height="5" colspan="3"></td>
				</tr>
			</table>
			<table width="200" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td class="stitle">�۾��� ����Ʈ</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="UCMAP001S" width="1225" height="170" no="true">
							<tr event="O">
								<td width="65"	column="user_id" 		title="user_id"			hidden="true"></td>
								<td width="65"	column="user_nm" 		title="����" 			align="center"></td>
								<td width="400"	column="cur_pos" 		title="������ġ"		align="left"></td>
								<td width="80"	column="aaa" 			title="�������"		align="center"></td>
								<td width="80"	column="work_stts"		title="��������"		align="center"></td>
								<td width="65"	column="call_recv" 		title="��������"		format="MONEY"></td>
								<td width="65"	column="call_proc" 		title="��ó����"		format="MONEY"></td>
								<td width="100"	column="tel" 			title="�޴�����ȣ" 		align="center"></td>
								<td width="100"	column="pda_tel"		title="PDA��ȭ��ȣ" 	align="center"></td>
								<td width="65"	column="lat"	 		title="lat"				hidden="true"></td>
								<td width="65"	column="lng" 			title="lng"				hidden="true"></td>
								<td width="65"	column="distance"		title="distance"		hidden="true"	format="MONEY"	maxlength="5.5"></td>
								<td width="65"	column="dist"			title="�Ÿ�(km)"		format="MONEY"	maxlength="5.1"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- ���� E -->
</table>
</body>
</html>