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
		<td class=MANTDT width=100 rowspan="3">��ȣ�ֱ�</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid01')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid01" width="350" height="120" no="true">
				<tr event="">
					<td  width="100" column="uppercd" title="��з�"></td>
					<td  width="100" column="code" title="�Һз�"></td>
					<td  width="100" column="codenm" title="�ڵ��"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	</table>

	</form>
</body>
</html>