<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>Grid Sample</title>
<script language="javascript" src="js/tesGrid.js"></script>
</head>
<body onLoad="">
<form name="f" target="iLog">

<ucare:table type="detail" width="100%">
	<tr>
		<td class=MANTDT width=100 rowspan="3">��ȣ�ֱ�</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="query()" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="UCTES001S" width="400" height="200">
				<tr event="O">
					<td  width="100" column="code" title="�̸�"></td>
					<td  width="100" column="hdp_no" title="��ȭ��ȣ"></td>
					<td  width="0" column="grade" title="���"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
</ucare:table>	

</form>

<form>
	<input type="text" name="grade" />
</form>




</body>
</html>