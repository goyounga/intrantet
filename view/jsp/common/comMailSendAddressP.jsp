<!--
  PROJ   : Nexfron Intranet
  NAME   : comMailSendAddressP.jsp
  DESC   : 이메일 주소록
  Author : 박준규 과장
  VER    : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2012.04.08		박준규		개발
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>이메일 주소록</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%=scriptPath%>/js/common/comMailSendAddressP.js"></script>
	<%
		String job = CUtil.nvl(request.getParameter("job"),"");
	%>
	<style>
		.receiver_view {border:1px solid #B5C5DE;overflow-y:auto;padding:5 5 5 5;text-align:left;}
		.spnReceiver   {border:1px solid #C0C0C0;height:20px; padding:4 4 4 4;margin:0 4 4 0;cursor:pointer;font-weight:bold;  }
		.spnReceiverDel{border:1px solid #C0C0C0;height:20px; padding:4 4 4 4;margin:0 4 4 0;cursor:pointer;font-weight:bold;text-decoration:line-through;color:red}
		.spnCnt		   {border:0px solid #FF9BCD;padding:2 0 0 0;width:45;text-align:right;vertical-align:text-bottom;font-weight:bold;text-decoration:underline;}
	</style>
</head>
<body topmargin="0" leftmargin="0"  onload="init();" style="text-align:center">
<table width="100%" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
	<tr height="30">
		<td class="ptitle"><b> 이메일 주소록 </b></td>
	</tr>
</table>
<form name="f" onsubmit="return false;">
<input type="hidden" name="job"   	value="<%=job%>">
<input type="hidden" name="dept_cd" value="<%=sessioninfo.getUserPartCD()%>">
<input type="hidden" name="view_org_1" 	value="<%=sessioninfo.getViewOrg1Cd()%>">
<input type="hidden" name="view_org_2" 	value="<%=sessioninfo.getViewOrg2Cd()%>">
<input type="hidden" name="view_org_3" 	value="<%=sessioninfo.getViewOrg3Cd()%>">
<table width="99%" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td>
			<table width="100%" cellpadding="0" cellspacing="0" border="0">
				<col width="370"/>
				<col width="10"	/>
				<col width="460"/>
				<tr>
					<td valign="top">
						<table width="100%" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">주소록</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCCOM041S_1" width="390" height="550" tree="true">
										<tr event="O">
											<td width="30" 	column="chk" 		format="CHECKBOX" editable="false"></td>
											<td width="190" column="full_orgnm" format="TREE" image="home,doc,man" action="false"></td>
											<td width="150" column="em_addr" 	></td>
											<td width="150" column="hdp_no" 	hidden="true"></td>
											<td width="50" 	column="gubun" 		hidden="true"></td>
											<td width="160" column="orgnm"		hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<td class="wmargin"></td>
					<td valign="top">
						<table width="100%" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td>
									<table width="100%" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td class="stitle">받는사람</td>
											<td align="right"><span class="spnCnt">총&nbsp;<span id="cnt">0</span>&nbsp;명</span></td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td>
									<table width="100%" height="550" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td valign="top">
												<div id="divReceiver" class="receiver_view" style="height:550"></div>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr><td class="hmargin5"></td></tr>
							<tr>
								<td align="right">
									<table class="tbl_button" border="0" cellpadding="0" cellspacing="0">
										<tr>
											<td><ucare:imgbtn name="btnReset"	kind="A" onClick="setReceiver()" width="50"	value="확인" /></td>
											<td><ucare:imgbtn name="btnClose" 	kind="X" onClick="self.close()"	 width="50"/></td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>
</body>
</html>