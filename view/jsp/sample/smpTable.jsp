<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
	<title></title>
	<script language="javascript">
	/*
	function addTableRow(tObj)
	{
		 var tObjTable = document.all("tbl" + tObj.Name);
		 
		 var objCell = new Array();
		  
		 var newTrObj = tObjTable.insertRow();
		 newTrObj.id  = "tr"+tObj.Name;
		 newTrObj.className  = "CListDetail";
		 newTrObj.height = tObj.RowHeight;
		 for (var x=0; x < tObj.DisCol; x++)
		 {
		  objCell[x] = newTrObj.insertCell();
		  objCell[x].align = tObj.Table[x][3];
		  objCell[x].style.display = tObj.Table[x][4];
		  if(tObj.Table[x][2] == 0) tObj.Table[x][2] = 1;
		  objCell[x].width = tObj.Table[x][2];
		 }
	}*/
	
	function addTableRow(tblname)
	{
		var tableobj = document.all(tblname);
		HtmlUtil.addTableRow(tableobj, 1, 1);
		upTr(tableobj, 2);
	}
	
	/**
	  * 기능 : tr 위로 이동
	  * tableObj : table 객체
	  * checkindex : 옮기려는 index
	  **/
	function upTr(tableObj, checkindex) {
		var temp;
		var trObj = tableObj.rows;
	
		if (trObj.length) {
			var noTdId = "";
			if (tableObj.id) {
				noTdId = tableObj.id + "_NO";
			}
			
			var i = trObj.length;
			while (--i) {
				if (i == checkindex) {
					break;
				}

				// 여기서부터 교환시작
				for (var j=0; j<trObj[i].cells.length; j++) {
					if (trObj[i].cells[j].id != noTdId) {
						temp = trObj[i-1].cells[j].innerHTML;
						trObj[i-1].cells[j].innerHTML = trObj[i].cells[j].innerHTML;
						trObj[i].cells[j].innerHTML = temp;
					}
				}
			}
		}
	}
	
	function setInit()
	{
		var tran = new Trans();							
		tran.setSvc("smptbl");
		tran.setPageRow("50");			
		//DEBUG = true;
		tran.open("f", "f", "/common.do");
	}
	
	function showDetail_obj(obj)
	{
		// 로직추가
	}
		
	</script>
</head>
<body onload="setInit()">
<form name="f">

<!-- Table Tag Sample -->
			
<ucare:table id="smptbl" rows="13" type="list" width="400" height="150" no="true">
	<tr event="O">
		<td width="70" column="code" title="코드" align="center"></td>
		<td width="150" column="code_nm" title="코드명"></td>
		<td width="80" column="use_f" title="사용여부(combo)"><ucare:select name="combo0" brcode="USEYN" width="80" option="4" event="true"/></td>
		<td width="0" column="up_cd" title="대분류" style="display:none"></td>
	</tr>
</ucare:table>
<br>

<input type="button" value="TEST" onClick="addTableRow('smptbl')"> 
			
</form>
</body>
</html>