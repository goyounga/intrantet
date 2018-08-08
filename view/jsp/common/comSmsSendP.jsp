<!--
  PROJ   : Nexfron Intranet
  NAME   : comSmsSendP.jsp
  DESC   : SMS전송
  Author : 박준규 과장
  VER    : 1.0
  Copyright 2012 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2012.04.16		박준규		개발
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>SMS전송</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%=scriptPath%>/js/common/comSmsSendP.js"></script>
	<link rel="stylesheet" href="/html/style/ucareStyle.css" type="text/css">
	<style>
		.receiver_view {border:1px solid #B5C5DE;overflow-y:auto;padding:5 5 5 5;text-align:left;}
		.spnReceiver   {border:1px solid #C0C0C0;height:20px; padding:4 4 4 4;margin:0 4 4 0;cursor:pointer;font-weight:bold;  }
		.spnReceiverDel{border:1px solid #C0C0C0;height:20px; padding:4 4 4 4;margin:0 4 4 0;cursor:pointer;font-weight:bold;text-decoration:line-through;color:red}
		.spnCnt		   {border:0px solid #FF9BCD;padding:2 0 0 0;width:45;text-align:right;vertical-align:text-bottom;font-weight:bold;text-decoration:underline;}
		.sms_cntn      {width:100;padding:3 3 3 3;border:0;overflow:hidden;background-color:00F4FE;margin-top:5px;ime-mode:active;}
	</style>
</head>
<body topmargin="0" leftmargin="0"  onload="init();" style="text-align:center">
<table width="100%" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
	<tr height="30">
		<td class="ptitle"><b>SMS 보내기</b></td>
	</tr>
</table>
<form name="f" onsubmit="return false;">
<input type="hidden" name="dept_cd" 	value="<%=sessioninfo.getUserPartCD()%>">
<input type="hidden" name="userid" 		value="">
<input type="hidden" name="username" 	value="">
<input type="hidden" name="hdp_no" 		value="">
<input type="hidden" name="view_org_1" 	value="<%=sessioninfo.getViewOrg1Cd()%>">
<input type="hidden" name="view_org_2" 	value="<%=sessioninfo.getViewOrg2Cd()%>">
<input type="hidden" name="view_org_3" 	value="<%=sessioninfo.getViewOrg3Cd()%>">
	
<table width="99%" cellpadding="0" cellspacing="0" border="0" bordercolor="Red">
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td>
			<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
				<col width="330"/>
				<col width="10"	/>
				<col width="350"/>
				<col width="10"	/>
				<col width="250"/>
				<tr>
					<td valign="top">
						<table width="100%" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">조직도</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCCOM041S_1" width="330" height="550" tree="true">
										<tr event="O">
											<td width="30" 	column="chk" 		format="CHECKBOX" editable="false"></td>
											<td width="190" column="full_orgnm" format="TREE" image="home,doc,man" action="false"></td>
											<td width="0" 	column="em_addr" 	hidden="true"></td>
											<td width="90" 	column="hdp_no" 	format="TEL"></td>
											<td width="0" 	column="gubun" 		hidden="true"></td>
											<td width="0" 	column="orgnm"		hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<td class="wmargin"></td>
					<td valign="top">
						<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
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
						</table>
					</td>
					<td class="wmargin"></td>
					<td  valign="top" align="center" style="width:250px">
						<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
							<tr>
								<td>
									<table width="100%" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td class="stitle">메시지</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr >
								<td align="center" valign="middle" style="border:1px solid #B5C5DE;vertical-align:middle" height="549">
									<table border="0" cellspacing="0" cellpadding="0" id="mobile-phone" >
										<tr>
											<td rowspan="3" ><img src="<%=scriptPath%>/images/common/sms_01.gif" /></td>
											<td valign="top"><img src="<%=scriptPath%>/images/common/sms_02.gif" /></td>
											<td rowspan="3" ><img src="<%=scriptPath%>/images/common/sms_03.gif" /></td>
										</tr>
										<tr>
											<td height="142" valign="top" align="center" bgcolor="00f4fe">
												<textarea class="sms_cntn" name="sms_cntn" cols="15" rows="8" maxLength="114" onBlur="cal_pre_keyup(this, 80);" ></textarea><br>
												<input type="text" name="byte"	value="0"        size="5" readOnly="true" style="border:0;background-color:00F4FE;text-align:right"/>
												<input type="text" name="limit" value="/80 byte" size="8" readOnly="true" style="border:0;background-color:00F4FE;text-align:left"/>
											</td>
										</tr>
										<tr>
											<td valign="bottom"><img src="<%=scriptPath%>/images/common/sms_04.gif" /></td>
										</tr>
										<tr><td class="hmargin5"></td></tr>
										<tr><td class="hmargin5"></td></tr>
										<tr>
											<td align="center" colspan="3">
												<ucare:imgbtn type="G" name="btnSend" kind="S" value="SMS보내기" onClick="sendSMS()"/>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr><td class="hmargin5"></td></tr>
				<tr>
					<td colspan="3" style="text-align:right">
						<b>수신번호 :</b>
						<input type="text" name="receive_value" style="width:100" class="input_text">
						<ucare:imgbtn name="btnAdd"		kind="A" onClick="addReceive()"		value="추가" 	width="50"/>
						<ucare:imgbtn name="btnReset"	kind="D" onClick="delReceiveList()"	value="초기화" 	width="60"/>
					</td>
					<td class="wmargin"></td>
					<td align="right" >
						<table class="tbl_button" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td><ucare:imgbtn name="btnClose" 	kind="X" onClick="self.close()"	width="50"/></td>
							</tr>
						</table>
					</td>
				</tr>
		    </table>
		 	</form>
		</td>
	</tr>
</table>
</body>
</html>