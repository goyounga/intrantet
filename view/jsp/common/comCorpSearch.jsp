<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<%
	request.setCharacterEncoding("EUC-KR");
	String frm = request.getParameter("frm");
%>
<html>
<head>
<title>��ü�˻�</title>
<script language="javascript" src="/html/js/common/comCorpSearch.js"></script>
</head>
<body topmargin="0" leftmargin="0" onload="init();">

<form name="fQuery">
<input type="hidden" name="frm" value="<%=frm%>"	/>
<table cellpadding="0" cellspacing="0" border="0" width="610">
	<tr>
 		<td>
 			<table width="610" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="ptitle">��ü �˻�</td>
 				</tr>
 			</table>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td><ucare:xtitle title="��ü �˻�"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td>
			<table width="610" cellpadding="0" cellspacing="0" border="0">
				<col width="5"	/>
				<col width="600"	/>
				<col width="5"	/>
				<tr>
					<td></td>
					<td>
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td>
									<ucare:table type="query" width="590">
										<tr>
											<td width="80" align="right" style="padding:2 0 0 0 ">��ü�� :&nbsp;</td>
											<td width="400">
												<input type="text" name="corp_nm_s" class="input_text" width="80" onKeyPress="checkKeyPress();">
											</td>
											<td width="1" bgcolor="#CCCCCC"></td>
							 				<td width="80" align="center">
							 					<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="queryList()" /><!-- ��ȸ -->
							 				</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<input type="hidden" class="input" name="corp_cd">
							<input type="hidden" class="input" name="corp_nm">
							<tr>
								<td>
									<ucare:grid id="UCSYS114S" width="600" height="370" no="true">
										<tr event="B">
											<td width="0"		column="corp_cd" 	title="��ü�ڵ�"	hidden="true"></td>
											<td width="200" 	column="corp_nm" 	title="��ü��" 		align="left"></td>
											<td width="150" 	column="tel_no1" 	title="��ȭ��ȣ1"	align="center" format="TEL"></td>
											<td width="210" 	column="adr1" 		title="�ּ�1"		align="left"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<td></td>
				</tr>
			</table>		
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td align="right">
			<ucare:imgbtn width="70" name="btnAdd" value="����"	onClick="corpApply()"/>
		</td>
	</tr>
</table>
</form>

</body>
</html>