<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="kr" xml:lang="kr">
<head>
	<title>�۾��� ��ȸ</title>
<script type="text/javascript" src="http://kr.open.gugi.yahoo.com/Client/AjaxMap.php?v=3.7&appid=JE6hwU7V34FTU9QfD3bL2nOG9Wb2gnrVGxvU5IVY_rKY8y7zoC0o4KzMSSklBT8-">
</script>
</head>
	<script language="JavaScript" type="text/javascript">
	var SELECT_ID = "UCMAP001S";
	var SELECT_POS_ID = "UCMAP002S";

	var gMap = null;
	
	var gWimage = null;
	var gPimage = null;
	
	var gPiconurl = "";
	var gPiconSize = null;
	var gPiconOffset = null;
	var gPmarkerIcon = null;
	
	var gWInfoWin = null;
	var gPInfoWin = null;
	var gWInfoWinStt = new Array();

	var gPMarker = null;
	var gBase_point = null;

	var gCenterLat = 37.526900253948835; //����
	var gCenterLng = 127.01714443206787; //�浵

	function init()
	{
		gMap = new YMap(document.getElementById('map'));
		var point = new YGeoPoint(gCenterLat, gCenterLng);

		gMap.addTypeControl();
		gMap.addZoomLong();
		gMap.addPanControl();
		gMap.drawZoomAndCenter(point, 6);

		var point = null;
		var url = "/html/images/sample/worker.jpg";
		var size = new YSize(32,33);
		//��Ŀ�� offset����
		var offset = new YCoordPoint(0, 0);
		var smartWindowOffset = new YCoordPoint(32 ,33);

		gWimage = new YImage(url,size,smartWindowOffset,offset);

		url = "/html/images/sample/place.jpg";
		gPimage = new YImage(url,size,smartWindowOffset,offset);

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

		for (var i=0; i < rowCnt; i++)
		{
			point = new YGeoPoint(parseFloat(gridObj.GetCellValue("lat", i)), parseFloat(gridObj.GetCellValue("lng", i)));
			desc = "<div style='background-color:#FFFFFF;width:150px;height:40px;border:0px solid #009966;font-family:dotum;font-weight:bold;color:#0099FF'>" +
				gridObj.GetCellValue("user_nm", i) + "&nbsp;" + gridObj.GetCellValue("tel", i);
			gMap.addOverlay(createMarker(point, desc, "W"));
		}
	}

	function createMarker(point, desc, flag)
	{
		if (flag == "W") //�۾���
		{
			var marker = new YMarker(point, gWimage);

			YEvent.Capture(marker, EventsList.MouseOver, function()
			{
				var desc2 = desc;

				if (gBase_point != null)
				{
					var dist = point.distance(gBase_point).kilometers;
					dist = (parseFloat(dist)).toFixed(1);
					desc2 += "<br>�Ÿ�: " + dist + "km";
				}

				desc2 += "</div>";
				marker.openSmartWindow(desc2);
			});
		}
		else //�۾���
		{
			var marker = new YMarker(point, gPimage);

			YEvent.Capture(marker, EventsList.MouseOver, function(point)
			{
				marker.openSmartWindow(desc);
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

		ifmResult.location.href= "yahooReturnXY.jsp?query="+address;
	}

	// �ּ� ��ǥ ��� ��ȯ
	function showResult()
	{
//		alert(f.queryresult.value); return;
		var objXml = new ActiveXObject("Microsoft.XMLDOM"); 
		objXml.loadXML(f.queryresult.value); 

   		var totcnt = objXml.getElementsByTagName("Found")[0].firstChild.nodeValue;

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

			x[i] = objXml.getElementsByTagName("longitude")[i].firstChild.nodeValue;
			y[i] = objXml.getElementsByTagName("latitude")[i].firstChild.nodeValue;
			address[i] = objXml.getElementsByTagName("name")[i].firstChild.nodeValue;

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

				gBase_point = new YGeoPoint(parseFloat(gridObj.GetCellValue("y", nRow)), parseFloat(gridObj.GetCellValue("x", nRow)));
				var desc = "<div style='background-color:#FFFFFF;width:200px;border:0px solid #009966;font-family:dotum;font-weight:bold;color:#22991F'>" +
					gridObj.GetCellValue("address", nRow) + "</div>";

				if (gPMarker != null)
					gMap.removeOverlay(gPMarker);

				gPMarker = createMarker(gBase_point, desc, "P");
				gMap.addOverlay(gPMarker);
				
				gMap.drawZoomAndCenter(gBase_point, 6);

				gridObj = document.all(SELECT_ID);
				var rowCnt = gridObj.GetRowCount();
				var cur_point = null;
				var dist = 0;

				for (var i=0; i < rowCnt; i++)
				{
					cur_point = new YGeoPoint(parseFloat(gridObj.GetCellValue("lat", i)), parseFloat(gridObj.GetCellValue("lng", i)));
					dist = cur_point.distance(gBase_point).kilometers;
					gridObj.SetCellValue("distance", i, (parseFloat(dist)).toFixed(5));
					gridObj.SetCellValue("dist", i, (parseFloat(dist)).toFixed(1));
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