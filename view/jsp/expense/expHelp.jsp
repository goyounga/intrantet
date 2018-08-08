<!--
 * PROJ : Nexfron Intranet
 * NAME : expHoliday.jsp
 * DESC : 주말/휴일 근무 조회 화면
 * Author : 김재은	 
 * VER  : 1.0
 * Copyright 2010 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.07.07		김재은			
-->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>

<%
	String flag 		= CUtil.nvl(request.getParameter("flag"), ""); 
	String strOnClick	= "parent.closeHelp('" + flag + "')";
	String strHelp		= "";
	String disHelp1		= "";
	String disHelp2		= "";
	String disHelp3		= "";
	
	if (flag.equals("1")) {
		disHelp1	= "";
		disHelp2	= "none";
		disHelp3	= "none";
	} else if (flag.equals("2")) {
		disHelp1	= "none";
		disHelp2	= "";
		disHelp3	= "none";
	} else if (flag.equals("3")) {
		disHelp1	= "none";
		disHelp2	= "none";
		disHelp3	= "";
	}
%>
<html>
<body>
<table cellspacing='0' border='0'  cellpadding = "0" class="pbody"  style="margin-top:5px">
	<tr>
		<td height="220" valign="top">
			<table class="ptbl_outline" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td height="150" valign="top">
						<table border=0 cellpadding=0 cellspacing=0 width=400 align="center" style="margin-top:5px">
							<tr><td class="popup_tit" style="padding:7 0 0 45" background="/html/images/common/popupbg.gif">상세설명</td></tr>
							<tr><td class="hmargin"></td></tr>
							<tr>
								<td>
									<div style="overflow:auto;width:400px;height:180px">	
									<ucare:table type="detail" width="100%">
										<tr style="display:<%=disHelp1%>">
											<td class=MANTDT width="80">휴일근무<br> 경비신청<br> 방법</td>
											<td class=MANTDM>
												1. 휴일근무 경비신청을 원하는 근무일자를 체크합니다.<br>
												2. 신청월을 입력합니다.(예)201011<br>
												3. 경비신청 버튼을 클릭합니다.<br>
												4. 휴일근무 신청/결재와 휴일근무 신청내역에서 신청된 내역이 조회가 된다면 정상적으로 실행 된 것입니다. 
											</td>											
										</tr>
										<tr style="display:<%=disHelp1%>">
											<td class=MANTDT width="80">휴일근무<br> 추가신청<br> 방법</td>
											<td class=MANTDM>
												1. 휴일근무 신청/결재에서 원하는 신청월을 선택합니다.<br>
												2. 휴일근무 미신청내역에서 추가하려는 근무일자를 체크합니다. <br>
												3. 추가신청 버튼을 클릭합니다.<br>
												4. 휴일근무 신청내역에서 신청된 내역이 조회가 된다면 정상적으로 실행 된 것입니다.<br>
												5. 추가신청을 하게되면 결재를 처음부터 다시 받아야 합니다. 
											</td>											
										</tr>
										<tr style="display:<%=disHelp1%>">
											<td class=MANTDT width="80">휴일근무<br> 미신청내역에<br> 없는 경우</td>
											<td class=MANTDM>
												1. 주간보고 결재상태가 결재완료인지 확인 합니다.<br>
												2. 주간보고 작성시 '근무'로 등록하였는지 확인 합니다.<br>
											</td>											
										</tr>
										<tr style="display:<%=disHelp2%>">
											<td class=MANTDT width="80">휴일근무<br> 신청내역<br> 조회방법</td>
											<td class=MANTDM>
												1. 근무일자를 선택한 후 조회버튼을 클릭하여 휴일근무 신청/결재 내역을 조회합니다.<br>
												2. 해당 신청월을 클릭하면 휴일근무 신청내역이 조회됩니다.<br>
											</td>											
										</tr>
										<tr style="display:<%=disHelp2%>">
											<td class=MANTDT width="80">휴일근무<br> 경비신청취소<br> 방법</td>
											<td class=MANTDM>
												1. 취소하려는 근무일자를 체크합니다.<br>
												2. 경비신청취소 버튼을 클릭합니다.<br>
												3. 취소한 내역이 휴일근무 신청내역에서 빠지고 휴일근무 미신청내역에서 조회되면 정상적으로 실행 된 것입니다.<br>
											</td>											
										</tr>
										<tr style="display:<%=disHelp3%>">
											<td class=MANTDT width="80">휴일근무<br> 경비신청<br> 방법</td>
											<td class=MANTDM>
												1. 아래 휴일근무 미신청내역에서 경비신청을 합니다.<br>
											</td>											
										</tr>
										<tr style="display:<%=disHelp3%>">
											<td class=MANTDT width="80">휴일근무<br> 경비신청<br> 결재방법</td>
											<td class=MANTDM>
												1. 근무일자를 선택한 후 조회버튼을 클릭하여 휴일근무 신청/결재 내역을 조회합니다.<br>
												2. 신청자의 신청월을 클릭하면 아래 휴일근무 신청내역이 조회됩니다.<br>
												3. 신청자의 휴일근무 신청내역을 확인한 후 승인 또는 반려를 체크합니다.<br>
												4. 결재저장 버튼을 클릭합니다.<br>
											</td>											
										</tr>
									</ucare:table>
									</div>
									<!-- 버튼  -->
									<table border=0 cellpadding=0 cellspacing=0 width="400">
										<tr>
											<td align="right">
												<div class="btnbar"></div>
												<table class="tbl_button" border="0" cellpadding="0" cellspacing="0">
													<tr>
														<td align="right"><ucare:imgbtn name="btnClose" kind="X" onClick="<%=strOnClick%>"/></td>
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
		</td>
	</tr>
</table>
</body>	
</html>