<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>����(Excel) ����</title>
<script language="javascript" src="js/smpExcel.js"></script>
</head>
<body>
<form name="f" target="iLog">
<input type="hidden" name="name" value="dmtm">

<ucare:table type="border" width="980">
	<tr>
		<td>
			
			<ucare:table id="samplemytable2" rows="20"  type="list" width="750" height="200" no="true" pageman="true">
				<tr event="">
					<td width="60" column="contractornm2" title="����" align="center" exwidth="10"></td>
					<td width="90" column="contractorrid" title="�ֹι�ȣ" align="center" format="SID" exwidth="15"></td>
					<td width="60" column="payamt" title="�ݾ�" align="right" format="MONEY" exwidth="10"></td>
					<td width="60" column="homezipcd" title="�����ȣ" align="center" format="POST" exwidth="10"></td>					
					<td width="80" column="firstregdt" title="��¥" align="center" format="DATE" exwidth="15"></td>
					<td width="80" column="firstregdt" title="��¥2" align="center" format="DATE2" exwidth="15"></td>
					<td width="60" column="firstregtm" title="�ð�" align="center" format="TIME" exwidth="10"></td>
					<td width="120" column="firstregtime" title="��¥�ð�" align="center" format="DATET" exwidth="20"></td>
					<td width="80" column="hometelno" title="��ȭ��ȣ" align="center" format="TEL" exwidth="15"></td>
				</tr>
			</ucare:table>
			
		</td>
		<td>
			<ucare:imgbtn width="80" name="btnTest" value="�׽�Ʈ" onClick="selectMyTable2()"/><br><br><br>
			<ucare:imgbtn width="80" name="btnHtml" value="HTML ���" onClick="makeExcelByHtml()"/><br><br><br>
			<ucare:imgbtn width="80" name="btnJxl" value="jxl ���" onClick="makeExcelByJxl()"/><br><br><br>
			<ucare:imgbtn width="80" name="btnText" value="text ���" onClick="makeMyText()"/>
		</td>
	</tr>
</ucare:table>	

</form>


<!-- Make Excel By HTML Sample -->
<form method="post" name=fExcel action="/jsp/common/comExcel.jsp" target="iLog">
	<input type=hidden name=sTitle>
	<input type=hidden name=sHeader>
	<input type=hidden name=sContent>
	<input type=hidden name=sFooter>
</form>

<!-- Make Excel/Text By JXL/Text Sample -->
<iframe name=iLog width=0 height=0></iframe>


</body>
</html>