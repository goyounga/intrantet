<!--
  PROJ : Nexfron Intranet
  NAME : sysWeeklyRpt.jsp
  DESC : 주간보고 화면
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.12		김은수		주석추가
  1.1		2011.03.12		김은수		화면수정
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>

<html>
<head>
	<title>주간보고</title>
	<script language="javascript" src="/html/js/management/mngWeeklyRpt.js"></script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>

	<!-- 검색조건 S -->
	<form name="fQuery" method="post">
	<input type="hidden" name="dept_cd" value="<%=sessioninfo.getUserPartCD()%>">
	<input type="hidden" name="subQuery2">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width="80" align="right">작성일자 :&nbsp;</td>
					<td width="240">
						<ucare:input type="text" name="date_from" width="70" title="시작일" format="DATE" value="<%=CUtil.getMyDate(-1, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="시작일" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
						<span class=calendar onclick="openCalendar('fQuery.date_from' , fQuery.date_from.value)"></span>&nbsp;
						~&nbsp;
						<ucare:input type="text" name="date_to" width="70" title="종료일" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="종료일" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
						<span class=calendar onclick="openCalendar('fQuery.date_to' , fQuery.date_to.value)"></span>
					</td>
					<td width="80" align="right">제목 :&nbsp;</td>
					<td width="140">
						<ucare:input type="text" name="qsubject" width="130" title="제목" required="false" requirednm="제목" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
					</td>
					<td width="80" align="right">작성자 :&nbsp;</td>
					<td width="250">
						<ucare:input type="text" name="qrg_id" width="60" title="작성자ID" required="false" requirednm="작성자ID" readonly="true"/>
						<ucare:input type="text" name="qrg_nm" width="100" title="작성자" required="false" requirednm="작성자" tag="onKeyUp=\"pressEnter('queryList(this)')\"" onBlur="usernm_onBlur(this)"/>
						<span id="btnUserId" class=search onClick="openUserOrg('qrg_id')"></span>
					</td>
					<td width="250"></td>
					<td width="1" bgcolor="#CCCCCC"></td>
					<td width="80" align="right">
						<ucare:imgbtn name="btnSearch"	kind="R" onClick="queryList()"/><!-- 조회 -->
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
	<input type="hidden" name="userid"			value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="user_id"			value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="usernm"			value="<%=sessioninfo.getUserName()%>">
	<input type="hidden" name="gradecd"			value="<%=sessioninfo.getUserGradeCD()%>">
	<input type="hidden" name="today"			value="<%=CUtil.getMyDate(0, "yyyy-MM-dd")%>">
	<!--input type="hidden" name="user_prj_seq"	value="<%=ucare.jaf.common.CUtil.nvlNequal(sessioninfo.getUserPrjID() ,"17")%>"-->
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="590" />
				<col width="5" />
				<col width="630" />
				<tr>
					<!-- Function 리스트 S -->
					<td valign="top">
						<table width="590" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">주간보고 리스트</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS100S" width="590" height="330" no="true">
										<tr event="O">
											<td width="0"	column="id"				title="순번"			editable="false"	align="center"></td>
											<td width="252"	column="subject"		title="제목"			editable="false"></td>
											<td width="0"	column="statcd"			title="진행상태코드"	editable="false"></td>
											<td width="70"	column="start_dt"		title="업무시작일"		editable="false"	format="DATE"	align="center"></td>
											<td width="70"	column="end_dt"			title="업무종료일"		editable="false"	format="DATE"	align="center"></td>
											<td width="100"	column="statcdnm"		title="진행상태"		editable="false"></td>
											<td width="60"	column="rg_nm"			title="작성자"			editable="false" align="center"></td>
											<td width="70"	column="rg_dt"			title="작성일자"		editable="false"	format="DATE"	align="center"></td>
											<td width="80"	column="mdf_nm"			title="수정자"			editable="false" hidden="true"></td>
											<td width="70"	column="mdf_dt"			title="수정일자"		editable="false"	format="DATE"	align="center" hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td class="stitle">주간보고 상세정보</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="590">
										<tr>
											<td class="MANTDT" width="100">제목</td>
											<td class="MANTDM" width="240">
												<ucare:input type="text" name="subject" width="240" title="제목" required="true" requirednm="제목" mode="active"/>
											</td>
											<td class="MANTDT" width="100">진행상태</td>
											<td class="MANTDM" width="180">
												<input type="hidden" name="statcd">
												<ucare:input type="text" name="statcdnm" width="160" title="진행상태" required="false" requirednm="진행상태" readonly="true"/>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">프로젝트</td>
											<td class="MANTDM" colspan="3">
												<ucare:select name="user_prj_seq" queryid="UCHLD001S" tag="required='true' requirednm='프로젝트'" option="4" width="240" styleClass="combo_required" onChange="setCheck();"/>
												<input type="checkbox" name="chk" onclick="setCurPrj();"> 현재 프로젝트를 요일별 프로젝트에 일괄 선택
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="100">업무시작일</td>
											<td class="MANTDM" width="240">
												<ucare:input type="text" name="start_dt" width="70" title="업무시작일" format="DATE" value="" pattern="D" required="true" requirednm="업무시작일" maxlength="10" readonly="true"/>
												<span class=calendar onclick="openCalendar('f.start_dt' , f.start_dt.value)"></span>
											</td>
											<td class="MANTDT" width="100">업무종료일</td>
											<td class="MANTDM" width="180">
												<ucare:input type="text" name="end_dt" width="70" title="업무종료일" format="DATE" value="" pattern="D" required="true" requirednm="업무종료일" maxlength="10" readonly="true"/>
												<!--<span class=calendar onclick="openCalendar('f.end_dt' , f.end_dt.value)"></span>-->
											</td>
										</tr>
										<tr>
											<td class="MANTDT">금주<br>업무내용</td>
											<td class="MANTDM" colspan="3">
												<textarea name="weekly_content" required="true" requirednm="금주업무내용" style="width:502;height:80;"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">차주<br>업무계획</td>
											<td class="MANTDM" colspan="3">
												<textarea name="next_weekly_content" required="false" requirednm="차주업무계획" style="width:502;height:50;"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">이슈사항</td>
											<td class="MANTDM" colspan="3">
												<textarea class="input_text" name="issue" style="width:502;height:50;" required="false" requirednm="이슈사항" readonly="true"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">답변</td>
											<td class="MANTDM" colspan="3">
												<textarea class="input_text" name="response" style="width:502;height:50;" required="false" requirednm="답변" readonly="true"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">등록자</td>
											<td class="MANTDM">
												<input type=text class="input_readonly" readonly name="rg_nm" style="width:180; required="false" requirednm="등록자"">
											</td>
											<td class="MANTDT">등록일자</td>
											<td class="MANTDM">
												<ucare:input type="text" name="rg_dt" width="160" title="등록일자" format="DATE" pattern="D" required="false" requirednm="등록일자" maxlength="10" readonly="true"/>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">수정자</td>
											<td class="MANTDM">
												<input type=text class="input_readonly" readonly name="mdf_nm" style="width:180;" required="false" requirednm="수정자">
											</td>
											<td class="MANTDT">수정일자</td>
											<td class="MANTDM">
												<ucare:input type="text" name="mdf_dt" width="160" title="수정일자" format="DATE" pattern="D" required="false" requirednm="수정일자" maxlength="10" readonly="true"/>
											</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
						</table>
					</td>
					<!-- Function 리스트 E -->
					<td></td>
					<!-- Function 상세정보 S -->
					<td valign="top">
						<table width="630" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">요일별 상세정보</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="630">
									<%
										String dayNm[] = {"월요일","화요일","수요일","목요일","금요일","토요일","일요일"};
										for (int i=0; i<7; i++) { %>
										<tr>
											<td class="MANTDT" width="80" rowspan="2" ><%=dayNm[i]%><br><span id=spnDayNm></span></td>
											<td class="MANTDM" rowspan="2">
												<textarea name="content" style="width:340;height:98" maxsize="2000" class="Input_text" required="false" requirednm="금주업무내용"></textarea>
											</td>
											<td class="MANTDM" colspan="2">
												<ucare:input type="text" name="start_tm" width="45" format="TIME" tag="onKeyDown=\"checkOnlyNumber()\" style='text-align:center;font-size:11px;height:18'" maxlength="5" maxsize="5"/>
												~
												<ucare:input type="text" name="end_tm" width="45" format="TIME" tag="onKeyDown=\"checkOnlyNumber()\" style='text-align:center;font-size:11px;height:18'" maxlength="5" maxsize="5"/>

												<ucare:select name="holi_gb" brcode="SYS021" width="55" option="0" onChange="changeHoliGb(this)" tag="style='font-size:11px'"/>
											</td>
										</tr>
										<tr>
											<td class="MANTDM" colspan="2">
												<ucare:select name="prj_seq" queryid="UCHLD001S" width="200" option="0" tag="style='font-size:11px'"/>
											</td>
										</tr>
									<% } %>
									</ucare:table>
								</td>
							</tr>
							<tr>
								<td height="10"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn name="btnAdd"		kind="A"	onClick="add()"/><!-- 등록 -->
									<ucare:imgbtn name="btnTempSave"		kind="S"	value="임시저장" onClick="save('temp')"/><!-- 저장 -->
									<ucare:imgbtn name="btnSave"		kind="S"	value="승인요청" onClick="save('save')"/><!-- 저장 -->
									<ucare:imgbtn name="btnEdit"		kind="U"	onClick="save('edit')"/><!-- 저장 -->
									<ucare:imgbtn name="btnDel"		kind="D"	onClick="del()"/><!-- 삭제 -->
								</td>
							</tr>
						</table>
					</td>
					<!-- Function 상세정보 E -->
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