<!--
  PROJ : Nexfron Intranet
  NAME : sysWeeklyRptSta.jsp
  DESC : 주간보고서  현황 화면
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.13		김은수		최초작성
  -->
  
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>

<html>
<head>
	<title>주간보고 관리</title>
	<script language="javascript" src="/html/js/management/mngWeeklyRptSta.js"></script>
</head>

<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>

	<!-- 검색조건 S -->
	<form name="fQuery" method="post">
	<input type="hidden" name="subQuery">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width="80" align="right">업무기간 :&nbsp;</td>
					<td>
						<ucare:input type="text" name="date_from" width="70" title="시작일" format="DATE" value="<%=CUtil.getMyDate(-1, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="시작일" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
						<span class=calendar onclick="openCalendar('fQuery.date_from' , fQuery.date_from.value)"></span>&nbsp;
						~&nbsp;
						<ucare:input type="text" name="date_to" width="70" title="종료일" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="종료일" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
						<span class=calendar onclick="openCalendar('fQuery.date_to' , fQuery.date_to.value)"></span>
					</td>
					<td width="1" bgcolor="#CCCCCC"></td>
					<td width="80" align="right">
						<ucare:imgbtn name="btnSearch" kind="R" onClick="queryList()"/><!-- 조회 -->
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<!-- 검색조건 E -->

	<tr>
		<td height="5"></td>
	</tr>

	<!-- 본문 S -->
	<form name="f" method="post">
	<input type="hidden" name="userid"	value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="usernm"	value="<%=sessioninfo.getUserName()%>">
	<input type="hidden" name="gradecd" value="<%=sessioninfo.getUserGradeCD()%>">
	<input type="hidden" name="today"	value="<%=CUtil.getCurrDate("yyyyMMdd")%>"/>
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="650" />
				<col width="5" />
				<col width="570" />
				<tr>
					<!-- Function 리스트 S -->
					<td valign="top">
						<table width="650" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">주간보고 현황</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS141S" width="650" height="680">
										<tr event="O">
											<td width="85"	column="s_bse_dt"	title="업무시작일" 	format="DATE"	align="center"></td>
											<td width="85"	column="e_bse_dt"	title="업무종료일" 	format="DATE"	align="center"></td>
											<td width="40"	column="wk"		title="주차" 	align="center"></td>
											<td width="60"	column="cnt"	title="전체"		align="center"></td>
											<td width="60"	column="cnt00"	title="미작성"	align="center"></td>
											<td width="60"	column="cnt01"	title="1차대기"	align="center"></td>
											<td width="60"	column="cnt02"	title="2차대기"	align="center"></td>
											<td width="60"	column="cnt03"	title="3차대기"	align="center"></td>
											<td width="60"	column="cnt04"	title="결재완료"	align="center"></td>
											<td width="60"	column="cnt05"	title="반려"		align="center"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- Function 리스트 E -->
					<td></td>
					<!-- Function 리스트 S -->
					<td valign="top">
						<table width="570" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">대상자 리스트 <label id="status_title"></label></td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="userlist" width="570" height="680" no="true">
										<tr event="">
											<td width="60"	column="user_nm"	title="이름"></td>
											<td width="160"	column="subject"	title="제목"></td>
											<td width="70"	column="start_dt"	title="업무시작일"	format="DATE"	align="center"></td>
											<td width="70"	column="end_dt"		title="업무종료일"	format="DATE"	align="center"></td>
											<td width="100"	column="nowsignnm"	title="결재자"></td>
											<td width="70"	column="rg_dt"		title="작성일자"		format="DATE"	align="center"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="10"></td>
							</tr>
							<tr style="display:none">
								<td align="right">
									<ucare:imgbtn width="70" name="btnSave"	value="답변저장" 	kind="S"	onClick="save()"/><!-- 저장 -->
								</td>
							</tr>
						</table>
					</td>
					<!-- Function 리스트 E -->
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- 본문 E -->
</table>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>