<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>�����ڰ���</title>
<script language="javascript" src="/html/js/system/sysApprovalMng.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 5;">

<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>

	<!-- �˻����� S -->
	<form	name="fQuery" method="post">
	<input type="hidden" name="org_cd" value="">
	<tr>
		<td>
			<table class="tblSearch" width="100%">
				<col width="80"	/>
				<col width="220"/>
				<col width="80"	/>
				<col width="120"/>
				<col width="80"	/>
				<col width="310"/>
				<col width="80"	/>
				<col width="110"/>
				<col width=""/>
				<tr>
					<th>�������</th>
					<td>
						<ucare:input type="text" name="q_date_from" width="70" title="�������" format="DATE" value="2012-01-01" pattern="D" required="true" maxlength="10" tag="onKeyUp=\"pressEnter('queryList()')\""/>
						<span class=calendar onclick="openCalendar('fQuery.q_date_from', fQuery.q_date_from.value)"></span>
						&nbsp;~&nbsp;
						<ucare:input type="text" name="q_date_to"  width="70" title="�������"  format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>"   pattern="D" required="true" maxlength="10" tag="onKeyUp=\"pressEnter('queryList()')\""/>
						<span class=calendar onclick="openCalendar('fQuery.q_date_to', fQuery.q_date_to.value)"></span>
					</td>
					<th>��뿩��</th>
					<td><ucare:select name="use_yn" brcode="COM001" width="100" option="10" required="false" requirednm="��뿩��" selCode="Y"/></td>
					<th>����</th>
					<td>
						<input type="text" name="org_nm" readOnly class="input_readonly" style="width:250;">
						<span class="search" onClick="openOrg(fQuery)"></span>
						<span class="minus" onClick="delOrg(fQuery);"></span>
					</td>
					<th>��������</th>
					<td><ucare:select name="qsign_tp_cd" brcode="SYS017" width="100" option="10" required="false" requirednm="��������"/></td>
					<td class="rbtn"><ucare:imgbtn name="btnSearch" type="G" kind="R" onClick="queryList()"/></td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- �˻����� E -->

	<tr>
		<td height="5"></td>
	</tr>

<form name="f" method="post" target="iLog" action="/common.do">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="org_cd" value="">
	<tr>
		<td valign="top">
			<table border="0" >
				<td width=150 class="stitle">�������� ����Ʈ</td>
			</table>
			<ucare:grid id="UCSYS042S" width="1225" height="526" crud="false" >
				<tr event="O">
					<td width="275" column="org_nm" 		title="������"		></td>
					<td width="90"	column="sign_tp_nm" 	title="��������"		align="center"></td>
					<td width="70"	column="sign_stg_nm"	title="����ܰ�"		align="center"></td>
					<td width="90"	column="sign_nm1"		title="1��������"		align="center"></td>
					<td width="90"	column="sign_nm2"		title="2��������"		align="center"></td>
					<td width="90"	column="sign_nm3"		title="3��������"		align="center"></td>
					<td width="60" 	column="use_yn"			title="��뿩��"		align="center" format="COMBO" brcode="COM001"></td>
					<td width="90"	column="regnm"			title="�����"			align="center"></td>
					<td width="130" column="regdt"			title="����Ͻ�"		align="center"></td>
					<td width="90"	column="chgnm"			title="����������"		align="center"></td>
					<td width="130" column="chgdt"			title="���������Ͻ�"	align="center"></td>
					<td width="0" 	column="org_cd" 		title="�����ڵ�"	hidden="true"></td>
					<td width="0"	column="sign_tp_cd" 	title="���������ڵ�"	hidden="true"></td>
					<td width="0"	column="sign_stg_cd"	title="����ܰ��ڵ�"	hidden="true"></td>
					<td width="0"	column="sign_id1"		title="1��������"		hidden="true"></td>
					<td width="0"	column="sign_id2"		title="2��������"		hidden="true"></td>
					<td width="0"	column="sign_id3"		title="3��������"		hidden="true"></td>
				</tr>
			</ucare:grid>
		</td>
	</tr>
	<tr><td class="hmargin"></td></tr>
	<tr>
		<td valign="top">
			<table border="0" border=0 cellpadding=0 cellspacing=0>
				<tr>
					<td width=150 class="stitle">��������</td>
				</tr>
			</table>
			<ucare:table type="detail" width="100%">
				<tr>
					<td class="MANTDT" >��������</td>
					<td class="MANTDM" >
						<ucare:select name="sign_tp_cd" brcode="SYS017" code="code" codename="codenm" width="160" option="4" required="true" requirednm="��������" />
					</td>
					<td class="MANTDT" >����</td>
					<td class="MANTDM" colspan="5">
						<input type="text" name="org_nm" readOnly class="input_readonly" style="width:250;">
						<span class="search" onClick="openOrg(f)"></span>
						<span class="minus" onClick="delOrg(f);"></span>
					</td>
				</tr>
				<tr>
					<td class="MANTDT" width="80">����ܰ�</td>
					<td class="MANTDM" width="160">
						<ucare:select name="sign_stg_cd" brcode="SYS018" code="code" codename="codenm" width="160" option="4" required="true" requirednm="����ܰ�" onChange="onChange_sign_stg_cd(this);"/>
					</td>
					<td class="MANTDT" width="80">1��������</td>
					<td class="MANTDM" width="220">
						<input type="text" name="sign_id1" readOnly class="input_readonly" style="width:80;" requirednm="1��������" >
						<input type="text" name="sign_nm1" readOnly class="input_readonly" style="width:80;">
						<span class="search" onClick="openUserOrg(1)"></span>
						<span class="minus" onClick="del_userID(1);"></span>
					</td>
					<td class="MANTDT" width="80">2��������</td>
					<td class="MANTDM" width="220">
						<input type="text" name="sign_id2" readOnly class="input_readonly" style="width:80;" requirednm="2��������" >
						<input type="text" name="sign_nm2" readOnly class="input_readonly" style="width:80;">
						<span class="search" onClick="openUserOrg(2)"></span>
						<span class="minus" onClick="del_userID(2);"></span>
					</td>
					<td class="MANTDT" width="80">3��������</td>
					<td class="MANTDM" width="220">
						<input type="text" name="sign_id3" readOnly class="input_readonly" style="width:80;" requirednm="3��������" >
						<input type="text" name="sign_nm3" readOnly class="input_readonly" style="width:80;">
						<span class="search" onClick="openUserOrg(3)"></span>
						<span class="minus" onClick="del_userID(3);"></span>
					</td>
				</tr>
				<tr>
					<td class="MANTDT" >�����</td>
					<td class="MANTDM" >
						<input type="text" name="regnm" width="160" readonly="true" class="input_transparent">
					</td>
					<td class="MANTDT" >����Ͻ�</td>
					<td class="MANTDM" >
						<input type="text" name="regdt" width="160" readonly="true" class="input_transparent">
					</td>
					<td class="MANTDT" >������</td>
					<td class="MANTDM" >
						<input type="text" name="chgnm" width="160" readonly="true" class="input_transparent">
					</td>
					<td class="MANTDT" >�����Ͻ�</td>
					<td class="MANTDM" >
						<input type="text" name="chgdt" width="160" readonly="true" class="input_transparent">
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
</table>
<!-- ��ư  -->
<table border=0 cellpadding=0 cellspacing=0 width="100%">
	<tr>
		<td align="right">
			<div class="btnbar"></div>
			<table class="tbl_button" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td align="right"><ucare:imgbtn name="btnAdd" kind="A" onClick="add(this)"/></td>
					<td align="right"><ucare:imgbtn name="btnSave" kind="S" onClick="save(this)"/></td>
					<td align="right"><ucare:imgbtn name="btnDel" kind="D" onClick="del(this)"/></td>
					<td align="right"><ucare:imgbtn name="btnCancel" kind="C" onClick="cancel(this)"/></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>