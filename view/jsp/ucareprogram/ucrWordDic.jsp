<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>�������</title>
<%@ include file="/jsp/include/include.jsp"%>
<script language="javascript" src="/html/js/ucareprogram/ucrWordDic.js"></script>
</head>
<body onload="init()" leftmargin="5">

<form name="fQuery" method="post" target="iLog" action="/common.do">

<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>
		<td colspan=5>
			<ucare:table type="query" width="1215">
				<tr>
					<td width=80 align="right">��������&nbsp;</td>
					<td>
						<ucare:select name="word_type" option="10" brcode="UCR003" width="100" required="false" requirednm="��������"/>
					</td>
					<td width=50>&nbsp;</td>
					<td width=100>
						<ucare:select name="keycode_t" option="-1" brcode="UCR002" width="100" required="true" requirednm="�˻�����"/>
					</td>
					<td>
						<ucare:input type="text" styleClass="input_text" name="keyword" width="200" mode="active" tag="onKeyUp=\"pressEnter('query(this)')\""/>
					</td>
					<td width=700>&nbsp;<div style=display:none><ucare:input type="text" styleClass="input_text" name="keycode" /></div></td>
	 				<td width="70" align="right">
	 					<ucare:imgbtn name="btnsearch" type="G" kind="R" onClick="query()"/>
	 				</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
</form>
<form name="f" method="post" target="iLog" action="/common.do">

<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="user_nm" value="<%=sessioninfo.getUserName()%>">


	<tr class=hmargin><td></td></tr>
	<tr class=hmargin><td align="right">
			�� �÷��� �ۼ���� : ������ �ܾ�� �ܾ� ���̿��� '_'�� �����Ѵ�. ex) ���_��з�  => CONSL_LCD, ��ȭ_���� => CALL_DATE
		</td></tr>

	<tr>
		<td class="stitle">����������</td>

	</tr>
	<tr>
		<td valign="top" colspan=2>
			<ucare:grid id="UCUCR305S" width="1225" height="680" crud="true" no="false">
				<tr event="O">
					<td width="70"	column="colm_nm" 		title="�÷�������"		align="left" editable="true" maxlength="5"></td>
					<td width="120"	column="kor_nm"			title="�ѱ۸�"	 		align="left" editable="true" maxlength="20"></td>
					<td width="100"	column="word_type" 		title="��������"			align="left" format="COMBO" brcode="UCR003" editable="true"></td>
					<td width="530"	column="word_desc" 			title="����" 		align="left" maxlength="1000" editable="true"></td>
					<td width="80"	column="rg_dt" 				title="�������"		align="center" format="DATE"></td>
					<td width="70"	column="rg_tm" 				title="��Ͻð�"		align="center" format="TIME"></td>
					<td width="60"	column="rg_nm" 				title="�����"		align="center"></td>
					<td width="80"	column="mdf_dt" 			title="��������"		align="center" format="DATE"></td>
					<td width="70"	column="mdf_tm" 			title="�����ð�"		align="center" format="TIME"></td>
					<td width="60"	column="mdf_nm" 			title="������"		align="center"></td>
				</tr>
			</ucare:grid>
		</td>
	</tr>
	<tr class=hmargin><td></td></tr>
</table>


<table border=0 cellpadding=0 cellspacing=0 width="100%">
	<tr>
		<td align="right">
			<table cellpadding=2 cellspacing=0>
				<tr>
					<td align="right"><ucare:imgbtn name="btnAdd" kind="A" value="�߰�" onClick="appendRow()"/></td>
					<td align="right"><ucare:imgbtn name="btnSave" 	kind="S" onClick="save()"/></td>
					<!-- td align="right"><ucare:imgbtn name="btnDel"  kind="D" onClick="deleteRow()"/></td-->
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>

<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>
