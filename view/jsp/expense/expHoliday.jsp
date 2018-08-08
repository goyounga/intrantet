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
	ucare.jaf.common.CParamSet	cParamSet 	= new ucare.jaf.common.CParamSet() ;
	ucare.jaf.database.IDataSet	iDataSet 	= new ucare.jaf.database.CDataSet();
	ucare.jaf.database.IDataSet dsSign = null;
//	String	myDeptCd	= sessioninfo.getUserPartCD();
	String	myDeptCd	= "03";
	String	myPrjSeq	= null;
	String	mySignId1	= null;
	String	mySignId2	= null;
	String	mySignId3	= null;	

	try {
		//UCEXP001S : 결재라인 정보

		cParamSet.setParam("_SERVICE_TYPE", "SQLSERVICE");
		cParamSet.setParam("_SERVICE_ID", "UCEXP001S");
		cParamSet.setParam("user_id", sessioninfo.getUserID());

		ucare.jpattern.service.ServiceManagerBean serviceManager = (ucare.jpattern.service.ServiceManagerBean)Class.forName("ucare.jpattern.service.ServiceManagerBean").newInstance();
		iDataSet = serviceManager.callService(cParamSet);

		iDataSet.next();
		dsSign 	= (ucare.jaf.database.IDataSet)iDataSet.getParam("UCEXP001S").toObject();
		dsSign.next();
		
		myPrjSeq	= dsSign.getParam("prj_seq").asString("");
		mySignId1	= dsSign.getParam("sign_id1").asString("");
		mySignId2	= dsSign.getParam("sign_id2").asString("");
		mySignId3	= dsSign.getParam("sign_id3").asString("");

	} catch (Exception e) {
		System.out.println(e.toString());
	}
%>

<html>
<head>
	<title>휴일근무 경비신청 및 관리</title>                    
	<script language="javascript" src="/html/js/expense/expHoliday.js"></script>
</head>
<body style = "margin: 0" onLoad="init();">

<table width="100%" cellspacing="0" cellpadding="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>
	
	<form name = "fQuery" method="post">
	<input type="hidden" name="mng_grp_id" value="<%=sessioninfo.getUserMenuGroupID()%>">
	 
		<ucare:table type="query" width="1210">
			<tr>
				<td width="80" align=right>근무일자 :&nbsp;</td>
				<td width="230">
					<ucare:input type="text" name="q_date_from" width="70" title="작성일자" format="DATE" value="<%=CUtil.getMyDate(-1, \"yyyy-MM-dd\")%>" pattern="D" required="true" maxlength="10" tag="onKeyUp=\"pressEnter('query()')\""/>
					<span class=calendar onclick="openCalendar('fQuery.q_date_from', fQuery.q_date_from.value)"></span>
					&nbsp;~&nbsp;
					<ucare:input type="text" name="q_date_to"  width="70" title="작성일자"  format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>"   pattern="D" required="true" maxlength="10" tag="onKeyUp=\"pressEnter('query()')\""/>
					<span class=calendar onclick="openCalendar('fQuery.q_date_to', fQuery.q_date_to.value)"></span>
				</td>
				<td width="80" align="right">신청자 :&nbsp;</td>
				<td width="200"> 
					<ucare:input type="text" name="rg_id" width="60" title="신청자ID" required="false" requirednm="신청자ID" readonly="true"/>
					<ucare:input type="text" name="qrg_nm" width="100" title="신청자명" required="false" requirednm="신청자명" readonly="true" tag="onKeyUp=\"pressEnter('query(this)')\""/>
					<span id="btnUserId" class=search onClick="openUserOrg('rg_id')"></span>
				</td>
				<td width="80" align="right">결재대상 :&nbsp;</td>
				<td width="450">
					<ucare:select name="subGubun" brcode="SYS022" width="100" option="10"/>
				</td>
				<td>&nbsp;</td>
				<td width=1 bgcolor=#CCCCCC></td>
 				<td align="right">
 					<td><ucare:imgbtn name="btnSearch" value="조회" 		width="60" onClick="query()"/></td>
 				</td>
 			</tr>
		</ucare:table>
		
	</form>
	
	<form name="f" method="post">
	<input type="hidden" name="userid"		value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="usernm"		value="<%=sessioninfo.getUserName()%>">
	<input type="hidden" name="deptcd"		value="<%=sessioninfo.getUserPartCD()%>">
	<input type="hidden" name="gradecd"		value="<%=sessioninfo.getUserGradeCD()%>">
	<input type="hidden" name="prj_seq"		value="<%=myPrjSeq%>">
	<input type="hidden" name="sign_id1"	value="<%=mySignId1%>">
	<input type="hidden" name="sign_id2"	value="<%=mySignId2%>">
	<input type="hidden" name="sign_id3"	value="<%=mySignId3%>">
	<input type="hidden" name="today"		value="<%=CUtil.getMyDate(0, "yyyyMMdd")%>">
	<input type="hidden" name="appl_seq"	value="">
	<input type="hidden" name="appl_month"	value="">
	
	<tr>
		<td>
			<table border=0 cellpadding=0 cellspacing=0>
				<tr>
					<td valign="top">
						
						<ucare:table type="border">
							<tr>
								<td class="stitle">휴일근무 신청/결재<span class="help" onClick="openHelpDiv('3')"></span></td>
							</tr>
						</ucare:table>
						
						<ucare:grid id="UCEXP028S" width="1210" height="200">
							<tr event="O">
								<td width="30"		column="appchk"			title="승인"			align="center"	editable="true"	format="CHECKBOX" 	hcheckbox="false" ></td>
								<td width="30"		column="rtnchk"			title="반려"			align="center"	editable="true"	format="CHECKBOX" 	hcheckbox="false" ></td>
								<td width="110"		column="appl_user_nm"	title="신청자"		align="center"	merge="true"></td>
								<td width="100"		column="appl_month"		title="신청월"		align="center"></td>
								<td width="90"		column="time_blw" 		title="5시간 미만"	align="center"></td>
								<td width="90"		column="time_more" 		title="5시간 이상"	align="center"></td>
								<td width="100" 	column="work_tm"		title="근무시간"		align="center"></td>
								<td width="100"		column="work_cnt" 		title="근무일수"		align="center"	format="MONEY"></td>
								<td width="100" 	column="work_amt" 		title="총 신청금액"	align="right"	format="MONEY"></td>
								<td width="120" 	column="sign_prgs_stts_cd" 		title="상태"			align="center"  editable="false" format="COMBO"  brcode="SYS019"></td>
								<td width="110"		column="nowsignnm"		title="결재자명"		align="center"></td>

								<td width="0" 		column="appl_seq" 		title="appl_seq"	align="center"  ></td>
								<td width="0" 		column="appl_user" 		title="신청자ID"		align="center"  hidden="true"></td>
								<td width="0" 		column="nowsignid"		title="현재결재자ID"	align="center"  hidden="true"></td>
								<td width="0"		column="nowdepth"		title="nowdepth"	align="center"	hidden="true"></td>
								<td width="0"		column="sign_stg_cd"	title="sign_stg_cd"	align="center"	hidden="true"></td>
								<td width="0"		column="statcd"			title="statcd"		align="center"	 hidden="true"></td>
								<td width="0" 		column="rg_id" 			title="등록자ID"		align="center"  hidden="true"></td>
								<td width="0" 		column="rg_dt" 			title="등록일자"		align="center"  hidden="true"></td>
								<td width="0" 		column="rg_tm" 			title="등록시간"		align="center"  hidden="true"></td>
								<td width="110"		column="sign_f_cd1"		title="상태"		align="center"  ></td>
							</tr>			
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td height="5"></td>
				</tr>
				<tr>
					<td>
						<table border=0 cellpadding=0 cellspacing=0 width="100%">
							<tr>
								<td id="msgTD1" style="color:red;" align="center">&nbsp;</td>
								<td align="right" width="150"><ucare:imgbtn name="btnSign" value="결재저장" 	onClick="Sign()"/></td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>

	<tr>
		<td>
			<table border=0 cellpadding=0 cellspacing=0>
				<tr>
					<td valign="top">

						<ucare:table type="border">
							<tr>
								<td class="stitle">휴일근무 신청내역<span class="help" onClick="openHelpDiv('2')"></span></td>
							</tr>
						</ucare:table>
						<ucare:grid id="UCEXP029S" width="1210" height="200"> 
							<tr>
								<td width="18"		column="chk"			title=" "			format="CHECKBOX" 	hcheckbox="true" editable="true" align="center"></td>
								<td width="90"		column="appl_user_nm"	title="신청자"		align="center"  merge="true"></td>
								<td width="100"		column="work_dt" 		title="근무일자"		align="center"	format="DATE"></td>
								<td width="90"		column="week" 			title="요일"			align="center"></td>
								<td width="70" 		column="start_tm" 		title="출근시간"		align="center"	format="TIME"></td>
								<td width="70" 		column="end_tm"			title="퇴근시간"		align="center"	format="TIME"></td>
								<td width="80" 		column="work_tm"		title="근무시간"		align="center"></td>
								<td width="100" 	column="work_amt" 		title="금액"			align="center"	format="MONEY"></td>
								<td width="200" 	column="prj_nm" 		title="프로젝트"		align="left"></td>
								<td width="310" 	column="content" 		title="작업내역"		align="left"></td>
								
								<td width="0"		column="appl_user"		title="신청자"		align="center"  hidden="true"></td>
								<td width="0" 		column="rg_dt" 			title="등록일자"		align="center"  hidden="true"></td>
								<td width="0" 		column="rg_tm" 			title="등록시간"		align="center"  hidden="true"></td>
								<td width="0" 		column="rg_id" 			title="등록자ID"		align="center"  hidden="true"></td>
								<td width="0" 		column="mdf_dt"			title="변경일자"		align="center"  hidden="true"></td>
								<td width="0" 		column="mdf_tm"			title="변경시간"		align="center"  hidden="true"></td>
								<td width="0" 		column="mdf_id"			title="변경자ID"		align="center"  hidden="true"></td>
							</tr>			
						</ucare:grid>
						
					</td>
				</tr>
				<tr>
					<td height="5"></td>
				</tr>
				<tr>
					<td>
						<table border=0 cellpadding=0 cellspacing=0 width="100%">
							<tr>
								<td id="msgTD2" style="color:red;" align="center">&nbsp;</td>
								<td align="right" width="150"><ucare:imgbtn name="btnCancel" value="경비신청취소" 	onClick="cancelExpAppl();"/></td>
								<%--<td align="right" width="60"><ucare:imgbtn name="btnExcel"  value="Excel" 	width="60" onClick="downExcel()"/></td>--%>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td>
			<table border=0 cellpadding=0 cellspacing=0>
				<tr>
					<td valign="top">
						<ucare:table type="border">
							<tr>
								<td class="stitle">휴일근무 미신청내역<span class="help" onClick="openHelpDiv('1')"></span> </td>
							</tr>
						</ucare:table>
						<ucare:grid id="UCEXP025S" width="1210" height="200">
							<tr event="">
								<td width="18"		column="chk"			title=" "			format="CHECKBOX" 	hcheckbox="true" editable="true" align="center"></td>
								<td width="90"		column="usernm"			title="사원명"		align="center" merge="true"></td>
								<td width="100"		column="work_dt" 		title="근무일자"		align="center"	format="DATE"></td>
								<td width="90"		column="week" 			title="요일"			align="center"></td>
								<td width="70" 		column="start_tm" 		title="출근시간"		align="center"	format="TIME"></td>
								<td width="70" 		column="end_tm"			title="퇴근시간"		align="center"	format="TIME"></td>
								<td width="80" 		column="work_tm"		title="근무시간"		align="center"	></td>
								<td width="260" 	column="prj_nm" 		title="프로젝트"		align="left"></td>
								<td width="350" 	column="content" 		title="작업내역"		align="left"></td>
								
								<td width="0"		column="work_tm_sec"	title="근무시간(초)"	align="center"	hidden="true"></td>
								<td width="0" 		column="rg_dt" 			title="등록일자"		align="center"  hidden="true"></td>
								<td width="0" 		column="rg_tm" 			title="등록시간"		align="center"  hidden="true"></td>
								<td width="0" 		column="rg_id" 			title="등록자ID"		align="center"  hidden="true"></td>
								<td width="0" 		column="mdf_dt"			title="변경일자"		align="center"  hidden="true"></td>
								<td width="0" 		column="mdf_tm"			title="변경시간"		align="center"  hidden="true"></td>
								<td width="0" 		column="mdf_id"			title="변경자ID"		align="center"  hidden="true"></td>
							</tr>			
						</ucare:grid>
						
					</td>
				</tr>
				<tr>
					<td height="5"></td>
				</tr>
				<tr>
					<td>
						<table border=0 cellpadding=0 cellspacing=0 width="100%">
							<tr>
								<td id="msgTD3" style="color:red;" align="center">&nbsp;</td>
								<td width="60" align="right">신청월 : </td>
								<td width="70" align="right"><ucare:input type="text" name="req_appl_month" width="60" format="DATE" pattern="M" value="<%=CUtil.getMyDate(0, \"yyyy-MM\")%>"/></td>
								<td width="10"></td>
								<td align="right" width="100"><ucare:imgbtn name="btnReqNew" value="경비신청" onClick="checkExpAppl('NEW')"/></td>
								<td align="right" width="100"><ucare:imgbtn name="btnReqAdd" value="추가신청" onClick="checkExpAppl('ADD')"/></td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
</table>	
<%@ include file="/jsp/include/include_car.jsp"%>

<div id="divHelp1" style="position:absolute; left:200px;top:400px;z-index:10000;display:none;width:460;height:300">
	<iframe name="ifrmHelp" src="expHelp.jsp?flag=1"  frameBorder=0 width=460 scrolling=no height=300></iframe>	
</div>
<div id="divHelp2" style="position:absolute; left:200px;top:200px;z-index:10000;display:none;width:460;height:300">
	<iframe name="ifrmHelp" src="expHelp.jsp?flag=2"  frameBorder=0 width=460 scrolling=no height=300></iframe>	
</div>
<div id="divHelp3" style="position:absolute; left:200px;top:50px;z-index:10000;display:none;width:460;height:300">
	<iframe name="ifrmHelp" src="expHelp.jsp?flag=3"  frameBorder=0 width=460 scrolling=no height=300></iframe>	
</div>
</body>
</html>	