<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>����� JSP (commonjsp) ����</title>
<script language="javascript" src="js/smpCommonjsp.js"></script>
</head>
<body>
<form name="f" method="post" target="iLog">
<input type="hidden" name="date_from" value="20080101">
<input type="hidden" name="date_to" value="20081231">

<ucare:table type="detail" width="980">
	<tr>
		<td class="MANTDT" rowspan="2">JSP���� �������</td>
		<td class="MANTDM">
			�̸� : <input type="text" name="name" size="10">
			<ucare:imgbtn width="80" name="btnTest1" value="�׽�Ʈ1" onClick="callCommonjsp1()"/>
		</td>
	</tr>
	<tr>
		<td>
			<ucare:table id="samplemyjsp1" rows="13"  type="list" width="300" height="70" no="false" summary="true">
				<tr event="">
					<td width="60" column="no" title="��ȣ" align="center"></td>
					<td width="80" column="name" title="�̸�" align="center"></td>
					<td width="100" column="regdt" title="�������" align="center" format="DATE"></td>
				</tr>
			</ucare:table>	
		</td>
	</tr>
	<tr>
		<td class="MANTDT" rowspan="2">JSP�� DataSet ������</td>
		<td class="MANTDM">
			��ȣ : <input type="text" name="no" size="10">
			<ucare:imgbtn width="80" name="btnTest2" value="�׽�Ʈ2" onClick="callCommonjsp2()"/>
		</td>
	</tr>
	<tr>
		<td>
			��ȣ�հ� : <input type="text" name="sumno" size="10">
		</td>
	</tr>
</ucare:table>	

</form>

<iframe name=iLog width=100% height=100></iframe>

</body>
</html>