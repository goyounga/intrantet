<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%> 
<html>
<head>
<title>�ݹ��׽�Ʈ(sample)</title>
<script language="javascript" src="js/smpCallback.js"></script>
</head>
<body onLoad="">
<form name="f">

<ucare:table type="detail" width="980">
	<tr>
		<td class=MANTDT width=100>��з��ڵ�</td>
		<td class=MANTDM width=150><input class=input_required name=myuppercd size=20 required=true title=��з��ڵ� ></td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode()" /></td>
		<td align="right">
			<ucare:table type="border" cellspacing="0">
				<tr>
					<td align="right"><ucare:imgbtn name="btnAdd" value="�߰�" onClick="lineInsert()" /></td>
					<td align="right"><ucare:imgbtn name="btnCancel" value="���" onClick="cancel()"/></td>
					<td align="right"><ucare:imgbtn name="btnDel" value="����" onClick="removeCode()"/></td>					
					<td align="right"><ucare:imgbtn name="btnSave" value="����" onClick="saveCode()"/></td>
				</tr>
			</ucare:table>	
		</td>
	</tr>
	<tr>
		<td class="MANTDM" colspan="5">
			<!-- ����Ʈ  -->
			<ucare:grid id="SMPCODEBOOKS" width="980" height="220" crud="true" no="true">
				<tr event="L">
					<td  width="100" column="up_cd" title="��з�" editable="true"></td>
					<td  width="100" column="code" title="�Һз�" editable="true"></td>
					<td  width="100" column="code_nm" title="�ڵ��" editable="true"></td>
					<td  width="100" column="etc1" title="��Ÿ1" editable="true"></td>
					<td  width="100" column="etc2" title="��Ÿ2" editable="true"></td>
					<td  width="100" column="etc3" title="��Ÿ3" editable="true"></td>
					<td  width="100" column="lup_ord" title="����" editable="true"></td>
					<td  width="100" column="use_f" title="��뿩��" editable="true" format="COMBO" brcode="USEYN"></td>
				</tr>
			</ucare:grid>		
			
			<ucare:grid id="grid2" width="980" height="220" crud="true" no="true">
				<tr event="O,L">
					<td  width="100" column="up_cd" title="��з�" editable="true"></td>
					<td  width="100" column="code" title="�Һз�" editable="true"></td>
					<td  width="100" column="code_nm" title="�ڵ��" editable="true"></td>
					<td  width="100" column="etc1" title="��Ÿ1" editable="true"></td>
					<td  width="100" column="etc2" title="��Ÿ2" editable="true"></td>
					<td  width="100" column="etc3" title="��Ÿ3" editable="true"></td>
					<td  width="100" column="lup_ord" title="����" editable="true"></td>
					<td  width="100" column="use_f" title="��뿩��" editable="true" format="COMBO" brcode="USEYN"></td>
				</tr>
			</ucare:grid>	
		</td>
	</tr>
</ucare:table>	

</form>




</body>
</html>