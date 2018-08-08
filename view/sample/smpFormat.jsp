<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>Grid Sample</title>
<script language="javascript" src="js/smpFormat.js"></script>
</head>
<body onLoad="eventGrid();setInit();">
<form name="f" target="iLog">

<ucare:table type="detail" width="100%">
	<tr>
		<td class=MANTDT width=100 rowspan="3">번호주기</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid01')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid01" width="350" height="120" no="true">
				<tr event="">
					<td  width="100" column="user_nm" title="이름"></td>
					<td  width="100" column="hdp_no" title="전화번호"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
</ucare:table>	

</form>




</body>
</html>