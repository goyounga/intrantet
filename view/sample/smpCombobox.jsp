<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>�޺��ڽ� ����</title>
<script language="javascript" src="js/smpCombobox.js"></script>
</head>
<body>
<form name="f">

<ucare:table type="detail">
	<tr>
		<td class=MANTDT>
			�⺻ �޺��ڽ� (0)
		</td>
		<td>
			<!-- Select Tag Sample -->
			<ucare:select name="combo0" brcode="CAMSTATUS" width="100" option="0"/>
		</td>
		<td>
			<input name="option0" type="text" value="<option value=''></option>" readOnly style='width:300;border:none'>			
		</td>
	</tr>
	<tr>
		<td class=MANTDT>
			�⺻ �޺��ڽ� (1)
		</td>
		<td>
			<!-- Select Tag Sample -->
			<ucare:select name="combo1" brcode="CAMSTATUS" width="100" option="1"/>
		</td>
		<td>
			<input name="option1" type="text" value="<option value='00'>��ü</option>" readOnly style='width:300;border:none'>			
		</td>
	</tr>
	<tr>
		<td class=MANTDT>
			�⺻ �޺��ڽ� (2)
		</td>
		<td>
			<!-- Select Tag Sample -->
			<ucare:select name="combo2" brcode="CAMSTATUS" width="100" option="2"/>
		</td>
		<td>
			<input name="option2" type="text" value="<option value='00'>����</option>" readOnly style='width:300;border:none'>			
		</td>
	</tr>
	<tr>
		<td class=MANTDT>
			�⺻ �޺��ڽ� (3)
		</td>
		<td>
			<!-- Select Tag Sample -->
			<ucare:select name="combo3" brcode="CAMSTATUS" width="100" option="3"/>
		</td>
		<td>
			<input name="option3" type="text" value="<option value='%'>��ü</option>" readOnly style='width:300;border:none'>			
		</td>
	</tr>
	<tr>
		<td class=MANTDT>
			�⺻ �޺��ڽ� (4)
		</td>
		<td>
			<!-- Select Tag Sample -->
			<ucare:select name="combo4" brcode="CAMSTATUS" width="100" option="4"/>
		</td>
		<td>
			<input name="option4" type="text" value="<option value=''>== ���� ==</option>" readOnly style='width:300;border:none'>			
		</td>
	</tr>
	<tr>
		<td class=MANTDT>
			�⺻ �޺��ڽ� (6)
		</td>
		<td>
			<!-- Select Tag Sample -->
			<ucare:select name="combo6" brcode="CAMSTATUS" width="100" option="6"/>
		</td>
		<td>
			<input name="option6" type="text" value="<option value='0'>== ���� ==</option>" readOnly style='width:300;border:none'>			
		</td>
	</tr>
	<tr>
		<td class=MANTDT>
			�⺻ �޺��ڽ� (10)
		</td>
		<td>
			<!-- Select Tag Sample -->
			<ucare:select name="combo10" brcode="CAMSTATUS" width="100" option="10"/>
		</td>
		<td>
			<input name="option10" type="text" value="<option value=''>��ü</option>" readOnly style='width:300;border:none'>			
		</td>
	</tr>
	<tr>
		<td class=MANTDT>
			�⺻ �޺��ڽ� (�� �� ����)
		</td>
		<td>
			<!-- Select Tag Sample -->
			<ucare:select name="combo" brcode="CAMSTATUS" width="100" option="-1"/>
		</td>
		<td>
			<input name="option" type="text" value="ù° �ɼ� ���� ���� ���� �ڵ尪�� ä��� ù�༱��" readOnly style='width:300;border:none'>			
		</td>
	</tr>
</ucare:table>
<br>
<ucare:table type="detail">	
	<tr>
		<td class=MANTDT>
			�����ٲٱ�
		</td>
		<td>
			<!-- Select Tag Sample -->
			<ucare:select name="query1" queryid="samplecombobyquery" code="etc1" codename="codenm" width="100" option="-1"/> 
		</td>
		<td>
			<input name="tipquery1" type="text" value="brcode�� 1���� ���" readOnly style='width:300;border:none'>				
		</td>
	</tr>
	<tr>
		<td class=MANTDT>
			multiple
		</td>
		<td>
			<!-- Select Tag Sample -->
			<ucare:select name="multiple1" brcode="CAMSTATUS" width="100" option="-1" multiple="true" height="3" onDblClick="onDbClickMultiple(this)"/>
		</td>
		<td>
			<input name="tipmultiple1" type="text" value="onChange, onclick, ondbclick ����" readOnly style='width:300;border:none'>		
		</td>
	</tr>
	<tr>
		<td class=MANTDT>
			�޺��ڽ� text��������
		</td>
		<td>
			<!-- Select Tag Sample -->
			<ucare:select name="text1" brcode="CAMSTATUS" width="100" option="0" onChange="getComboText(this)"/>
		</td>
		<td>
			<input name="tiptext1" type="text" value="getSelectedText(�޺���ü):ucare_util.js �����Լ�" readOnly style='width:300;border:none'>		
		</td>
	</tr>
	<tr>
		<td class=MANTDT>
			�ٴܰ� COMBOBOX 
		</td>
		<td>
			<!-- Select Tag Sample -->
			<ucare:select name="cptcd" brcode="CRS003" width="80" option="4" step="3"/>
		</td>
		<td>
			<input name="tipstep1" type="text" value="" readOnly style='width:100;border:none'>		
		</td>
	</tr>
	<tr>
		<td class=MANTDT>
			���� COMBOBOX
		</td>
		<td>
			<!-- Select Tag Sample -->
			<ucare:select name="parentcombo1" queryid="sampleparentcombo1" brcode="CRS003" code="code" codename="codenm" width="80" option="4" onChange="makeMyCombo(this)"/>
			<select name="mycombo1" style="width:100" option="-1" onChange="getMyCombo1Value(this)"/>
		</td>
		<td>
			<input name="tipmycombo1" type="text" value="���� �÷��� �׻� 3���̻� �̾�� �Ѵ�." readOnly style='width:250;border:none'>	
		</td>
	</tr>
	<tr>
		<td class=MANTDT>
			java ������ brcode �ѱ��
		</td>
		<td>
			<%
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("ss");
				java.util.Date xDate = new java.util.Date();
				String cursecond = formatter.format(xDate);
			%>
			<ucare:select name="mycombo2" queryid="samplemycombo2" brcode="<%=cursecond %>" code="code" codename="codenm" width="80" option="4"/>
		</td>
		<td>
			<input name="tipmycombo2" type="text" value="" readOnly style='width:250;border:none'>	
		</td>
	</tr>
	<!--  ����  : ���ǻ��� -->
</ucare:table>

</form>

</body>
</html>