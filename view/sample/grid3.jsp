<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>Grid Sample</title>
<script language="javascript" src="js/grid3.js"></script>
</head>

<body onLoad="eventGrid();">
<form name="f" target="iLog">


<table>
<tr>
		<td class=MANTDT width=100 rowspan="3">번호주기</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid01')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid01" width="350" height="120" no="true">
				<tr event="">
					<td  width="100" column="uppercd" title="대분류"></td>
					<td  width="100" column="code" title="소분류"></td>
					<td  width="100" column="codenm" title="코드명"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	</table>

	</form>
</body>
</html>