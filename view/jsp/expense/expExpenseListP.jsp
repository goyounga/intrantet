<!-------------------------------------------------------->
<!--  Intranet	    	         	 					-->
<!-- @version 1.0                 	 					-->
<!-- @author  lee,chang-uk             					-->
<!-- @since  2009.06.18                 				-->
<!-------------------------------------------------------->

<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>��� ��û</title>
<script language="javascript" src="/html/js/expense/expExpenseListP.js"></script>

</head>
<body>
<form name="f" method="post">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	
<table border=0 cellpadding=1 cellspacing=1 id=tblList width="775">
	<tr>
		<td><ucare:xtitle title="��� ��û"/></td>
	</tr>
	<tr>
		<td valign="top">
			<ucare:table type="detail" width="775">
				<tr>
					<td class=MANTDT width="100">������Ʈ��</td>
					<td class=tbl_td width="200"><input name="prj_nm" type="text" class="input_required" style="width:100%" required=true title="������Ʈ��"></td>
					<td class=MANTDT width="100">������</td>
					<td class=tbl_td width="130"><ucare:select name="snc_id" option="4" brcode="EXP001" width="130" styleClass="combo_required" required="true" requirednm="������"/></td>
					<td class=MANTDT width="100">������</td>
					<td class=tbl_td><ucare:select name="coprt_id" option="4" brcode="EXP001" width="130" styleClass="combo_required" required="true" requirednm="������"/></td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	<tr>
		<td valign="top">
			<table border=0 cellpadding=0 cellspacing=0 width="100%" background='/images/common/tabbg.gif'>
				<tr>
					<td width="100%" height="30"><font class='stitle'><b>���� �� ����</td>
				</tr>
			</table>
			<ucare:grid id="UCEXP013S" width="775" height="300" no="true">
				<tr event="D">
					<td width="100" column="expt_dt"		title="��������"	align="center" format="DATE" editable="true"></td>
					<td width="80"	column="expt_amt"		title="����ݾ�"	align="center" editable="true"></td>
					<td width="80"	column="expt_c_cd"		title="���ⱸ��"	align="center" format="COMBO" brcode="EXP002" editable="true"></td>
				    <td width="100"	column="expt_act_cd"	title="�������"	align="center" format="COMBO" brcode="EXP003" editable="true"></td>
				    <td width="70"	column="rip_doc_f"		title="����������"	align="center" format="COMBO" brcode="COM002" editable="true"></td>
				    <td width="270" column="expt_rmk"		title="��������"	align="left" editable="true"></td>
				 </tr>
			</ucare:grid>
		</td>
	</tr>
	<tr>
		<td align=right>
			<table border=0 cellpadding=0 cellspacing=0>
				<tr>
					<td>
						<ucare:imgbtn name="btnPlus" value="�߰�" width="60" onClick="fn_ExpsHstAdd();"/>
						<ucare:imgbtn name="btnSave" value="����" width="60" onClick="on_Save();"/>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>

</body>
</html>
