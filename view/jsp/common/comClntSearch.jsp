<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<%
	String clntGbn = request.getParameter("clntGbn");
	String callNo = request.getParameter("callNo");
	String clntNo = request.getParameter("clntNo");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>����ȸ</title>
<script language="javascript" src="/html/js/common/comClntSearch.js"></script>
</head>
<body style=margin:0 onLoad="init();" onUnload="unload();">
<table width="730" cellpadding="0" cellspacing="0" border="0">
	<tr>
 		<td>
 			<table width="730" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="ptitle">����ȸ</td>
 				</tr>
 			</table>
		</td>
	</tr> 
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td><ucare:xtitle title="����ȸ"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td style="padding:0 5 0 5;">
			<table width="720" cellpadding="0" cellspacing="0" border="0">
				<form name="fQuery">
				<input type="hidden" name="clntGbn" value="<%=clntGbn%>">
				<input type="hidden" name="callNo" value="<%=callNo%>">
				<input type="hidden" name="corp_cd" value="<%=sessioninfo.getUserCorpID()%>">
				<input type="hidden" name="command" value="encrypt">
				<tr>
					<td>
						<ucare:table type="query" width="710">
							<tr>
								<td width="80" align="right">���� :&nbsp;</td>
								<td width="120">
									<input type=text class="input_text" name="q_clnt_nm" size=15 onkeyup="return(isEnterKey()? queryList():false);" style="ime-mode:active">
								</td>
								<td width="80" align="right">�ֹι�ȣ :&nbsp;</td>
								<td width="120">
									<input type="hidden" name="q_clnt_ssn">
									<input type=text class="input_text" name="qq_clnt_ssn" size=15 onkeyup="return(isEnterKey()? queryList():false);">
								</td>
								<td width="80" align="right">����ȣ :&nbsp;</td>
								<td width="120">
									<input type=text class="q_clnt_no" name="q_clnt_no" size=15 onkeyup="return(isEnterKey()? queryList():false);" value="<%=clntNo%>">
								</td>
								<td ></td>
								<td width="1" bgcolor="#CCCCCC" rowspan="3"></td>
				 				<td width="100" align="center" rowspan="3">
				 					<ucare:imgbtn name="btnQuery" kind="R"  width="70"   onClick="xeCure('encrypt');"/>
				 				</td>
							</tr>
							<tr>
								<td height="2" colspan="5"></td>
							</tr>
							<tr>
								<td width="80" align="right">�˻��� :&nbsp;</td>
								<td colspan="6">
									<select name="searchType" class="combo_text">
										<option value=""> == ��ü == </option>
										<option value="hdp_n">�ڵ�����ȣ</option>
										<option value="hm_phn_n">������ȭ��ȣ</option>
										<option value="offc_phn_n">������ȭ��ȣ</option>
									</select>
									<input type=text class="input_text" name="searchText" size=31 onkeyup="return(isEnterKey()? queryList():false);"  >
								</td>
							</tr>
						</ucare:table>
					</td>
				</tr>
				</form>
				<form name="f">
				<tr>
					<td>
						<table width="480" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�� ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCCUS001S" width="720" height="275" no="true">
										<tr class="LIST" event="B">
											<td width="100"	column="clnt_nm" title="����" align="center"></td>
											<td width="120"	column="clnt_ssn" title="�ֹι�ȣ" align="center"></td>
											<td width="100"	column="hdp_n" title="�ڵ���" align="center"></td>
											<td width="100"	column="hm_phn_n" title="������ȭ" align="center"></td>
											<td width="100"	column="offc_phn_n" title="������ȭ" align="center"></td>
											<td width="200"	column="hm_adr" title="�����ּ�" align="left"></td>
											<td width="100"	column="clnt_no" title="����ȣ" hidden="true"></td>
										</tr>
									</ucare:grid>
									<!-- <ucare:table id="UC_A_HST_CHL_HST_S_1" pageman="true"  no="true" rows="17" type="list"width="720" height="275">
									<tr event="B">
										<td width="100"	column="clnt_nm" title="����" align="center"></td>
										<td width="120"	column="clnt_ssn" title="�ֹι�ȣ" align="center"></td>
										<td width="100"	column="hdp_n" title="�ڵ���" align="center"></td>
										<td width="100"	column="hm_phn_n" title="������ȭ" align="center"></td>
										<td width="100"	column="offc_phn_n" title="������ȭ" align="center"></td>
										<td width="200"	column="hm_adr" title="�����ּ�" align="left"></td>
									</tr>
									</ucare:table> -->
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn name="btnApply" kind="Z"  width="70"   onClick="apply();"/>&nbsp;
									<ucare:imgbtn name="btnClose" kind="X"  width="70"   onClick="self.close();"/>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				</form>
			</table>
		</td>
	</tr>
</table>
</body>
</html>