<!--
  PROJ : Nexfron Intranet
  NAME : sysWeeklyRptMng.jsp
  DESC : 프로젝트 - 실행 화면
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.19		김은수		주석추가
  1.1		2010.09.07		박준규		프로젝트 상세항목추가
  -->

<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>프로젝트관리</title>
	<script language="javascript" src="/html/js/project/prjExeMng.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 0;">
<table width="1238" height="" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
	<tr>
		<td width="5"></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<!-- 검색조건 S -->
	<form name="fQuery" method="post">
	<tr>
		<td>
			<ucare:table type="query" width="100%">
				<tr>
					<td width="100" align="right">프로젝트일자 :&nbsp;</td>
					<td width="225">
						<ucare:input type="text" name="startdt" width="70" title="시작일" format="DATE" value="<%=CUtil.getMyDate(-1, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="시작일" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
						<span class=calendar onclick="openCalendar('fQuery.startdt' , fQuery.startdt.value)"></span>&nbsp;
						~&nbsp;
						<ucare:input type="text" name="enddt" width="70" title="종료일" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="종료일" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
						<span class=calendar onclick="openCalendar('fQuery.enddt' , fQuery.enddt.value)"></span>
					</td>
					<td width="100" align="right">프로젝트종류 : &nbsp;</td>
					<td width="">
						<ucare:select name="prj_knd_cd" option="10" brcode="PRJ009" code="code" codename="codenm"  width="100" styleClass="combo_text" />
					</td>
					<td width="100" align="right">프로젝트구분 :&nbsp;</td>
					<td width="170" >
						<ucare:select name="prj_c_cd"  option="10" brcode="PRJ001" code="code" codename="codenm"  width="150" styleClass="combo_text" />
					</td>
					<td width="80" align="right">프로젝트명 : &nbsp;</td>
					<td width="115">
						<input type="text" name="prj_nm" class="input_text" style="width:100" onKeyPress="pressEnter('queryList()')">
					</td>
					<td width="70" align="right">진행현황 :&nbsp;</td>
					<td width="100" >
						<ucare:select name="pogr_stat"  option="10" brcode="PRJ011" code="code" codename="codenm"  width="80" styleClass="combo_text" />
					</td>
					<td>&nbsp;</td>
					<td width="1" bgcolor=#CCCCCC></td>
					<td width="80" align="right">
						<ucare:imgbtn width="60" name="btnQuery"	value="조회"	 onClick="queryList()"/><!-- 조회 -->
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
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="prj_seq" value="">
	<tr>
		<td>
			<table width="100%" border="0" cellpadding="0" cellspacing="0" border="0" >
				<col width="800" />
				<col width="5" />
				<col width="430" />
				<tr>
					<!-- 프로젝트리스트 S -->
					<td valign="top" colspan="5">
						<table width="800" cellpadding="0" cellspacing="0" border="0" >
							<tr>
								<td class="stitle">프로젝트 리스트</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCPRJ010S" width="1230" height="295" no="true">
										<tr event="O">
											<td width="75" 	column="rl_st_dt" 		title="시작일자"			align="center" format="DATE"></td>
											<td width="75" 	column="rl_end_dt" 		title="종료일자"			align="center" format="DATE"></td>
											<td width="80" column="prj_c_cd_nm"	title="프로젝트구분"		align="center" ></td>
											<td width="242" column="prj_nm" 		title="프로젝트명"			align="left"></td>
											<td width="70" 	column="cntr_man_m" 	title="계약M/M"				align="right" format="MONEY"></td>
											<td width="70" 	column="rl_etrn_m_m" 	title="실투입M/M"			align="right" format="MONEY"></td>
											<td width="60" 	column="pgs_rt" 		title="진행율%"				align="right" format="MONEY" hidden="true"></td><!--사용안함-->
											<td width="60" 	column="end_f_cd_nm"	title="완료여부"			align="center"  hidden="true"></td>
											<td width="60" 	column="prj_seq" 		title="프로젝트순번"		align="center"  hidden="true"></td>
											<td width="60" 	column="prj_c_cd" 		title="프로젝트구분코드"	align="center"  hidden="true"></td>
											<td width="60" 	column="prj_desc" 		title="프로젝트설명"		align="center"  hidden="true"></td>
											<td width="60" 	column="prj_loc" 		title="프로젝트위치"		align="center"  hidden="true"></td>
											<td width="60" 	column="end_f_cd" 		title="완료여부CD"			align="center"  hidden="true"></td>
											

											<td width="60" 	column="prj_c_dtl_cd"	title="프로젝트구분상세"	align="center"  hidden="true"></td>
											<td width="60" 	column="coper_co"		title="협력사"				align="center"  hidden="true"></td>
											<td width="90" 	column="clnt_co"		title="고객사"				align="center"  hidden="false"></td>
											<td width="60" 	column="etrn_m"			title="투입인원"			align="center"  hidden="true"></td>
											<td width="60" 	column="dvlp_tool"		title="개발툴"				align="center"  hidden="true"></td>
											<td width="60" 	column="dbms"			title="DBMS"				align="center"></td>
											<td width="60" 	column="prj_knd_cd"		title="프로젝트종류"		align="center"  hidden="true"></td>
											<td width="60" 	column="jdk_ver"		title="JDK버전"				align="center"></td>
											<td width="60" 	column="was_type"		title="WAS종류"				align="center"></td>
											<td width="0" 	column="pogr_stat"		title="진행현황"			align="center"  hidden="true"></td>
											<td width="0" 	column="work_range"		title="업무범위"			align="center"  hidden="true"></td>
											<td width="0" 	column="rmk"			title="비고"				align="center"  hidden="true"></td>
											<td width="60" 	column="pogr_stat_nm"	title="진행현황"			align="center"  ></td>
											<td width="65" 	column="rg_dt" 			title="등록일자"			align="center" format="DATE"></td>
											<td width="60" 	column="rg_tm" 			title="등록시간"			align="center"  hidden="true"></td>
											<td width="60" 	column="rg_id" 			title="등록자ID"			align="center"  hidden="true"></td>
											<td width="60" 	column="rg_nm" 			title="등록자"				align="center"></td>
											<td width="65" 	column="mdf_dt"			title="변경일자"			align="center" format="DATE"></td>
											<td width="60" 	column="mdf_tm"			title="변경시간"			align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_id"			title="변경자ID"			align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_nm"			title="변경자"				align="center"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<!-- 프로젝트리스트 E -->
				<tr>
				<!-- 프로젝트정보 S -->
					<td valign="top">
						<table width="430" cellpadding="0" cellspacing="0" border="0" bordercolor="red" >
							<tr>
								<td class="stitle">프로젝트 상세정보</td>
							</tr>
							<tr>
								<td>
									<table class="MANTBL" cellspacing='1' cellpadding = "0" border='0' width="430" height="0" style="table-layout:fixed;">
									<!--ucare:table type="detail" width="430" -->
									<col width="100"  />
									<col width="180" />
									<col width="100" />
									<col width="180"/>
										<tr>
											<td class="MANTDT" width="80">프로젝트명</td>
											<td class="MANTDM" width="" colspan="3">
												<input type=text class=input_required  name="prj_nm" style="width:348;ime-mode:active" maxlength="50">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">프로젝트구분</td>
											<td class="MANTDM" colspan="3">
												<ucare:select name="prj_c_cd"  option="4" brcode="PRJ001" code="code" codename="codenm"  width="172" styleClass="combo_text" onChange="onChange_prj_c_cd()"/>
												<select name="prj_c_dtl_cd"  style="width:172" code="code" codename="codenm" class="combo_text"  option="4"><option value="">== 선택 ==</option></select>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">시작일자</td>
											<td class="MANTDM" width="">
												<ucare:input type="text" name="rl_st_dt" width="105" title="프로젝트시작일자" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="업무시작일" maxlength="10"/>
												<span class=calendar onclick="openCalendar('f.rl_st_dt' , f.rl_st_dt.value)"></span>
											</td>
											<td class="MANTDT" width="80">종료일자</td>
											<td class="MANTDM" width="">
												<ucare:input type="text" name="rl_end_dt" width="105" title="프로젝트종료일자" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="업무종료일" maxlength="10"/>
												<span class=calendar onclick="openCalendar('f.rl_end_dt' , f.rl_end_dt.value)"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >프로잭트종류</td>
											<td class="MANTDM" >
												<ucare:select name="prj_knd_cd"  option="4" brcode="PRJ009" code="code" codename="codenm"  width="131" styleClass="combo_required" />
											</td>
											<td class="MANTDT" >투입인원</td>
											<td class="MANTDM">
												<input type="text" class="input_number" name="etrn_m" style="width:131;"  maxlength="10" onKeyDown="checkOnlyNumber()">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >협력사</td>
											<td class="MANTDM" >
												<input type="text" class="input_text" name="coper_co" style="width:131;ime-mode:active;"  maxlength="50">
											</td>
											<td class="MANTDT" >고객사</td>
											<td class="MANTDM" >
												<input type="text" class="input_text" name="clnt_co" style="width:131;ime-mode:active;" maxlength="50" >
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >개발툴</td>
											<td class="MANTDM" >
												<ucare:select name="dvlp_tool"  option="4" brcode="PRJ007" code="code" codename="codenm"  width="131" styleClass="combo_text" />
											</td>
											<td class="MANTDT" >DBMS</td>
											<td class="MANTDM" >
												<ucare:select name="dbms"  option="4" brcode="PRJ008" code="code" codename="codenm"  width="131" styleClass="combo_text" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >계약M/M</td>
											<td class="MANTDM" >
												<input type="text" class="input_number" name="cntr_man_m" style="width:131;"  maxlength="10" onKeyDown="checkOnlyNumber()">
											</td>
											<td class="MANTDT" >실투입M/M</td>
											<td class="MANTDM" >
												<input type="text" class="input_number" name="rl_etrn_m_m" style="width:131;" maxlength="10" onKeyDown="checkOnlyNumber()">
											</td>
										</tr>
										<!--tr>
											<td class="MANTDT" >진행율</td>
											<td class="MANTDM" >
												<input type="text" class="input_number" name="pgs_rt" style="width:115;" maxlength="10" onKeyDown="checkOnlyNumber()"> %
											</td>
											<td class="MANTDT" >완료여부</td>
											<td class="MANTDM" >
												<ucare:select name="end_f_cd"  option="-1" brcode="USEYN" code="code" codename="codenm"  width="131" styleClass="combo_text" />
											</td>
										</tr-->
										<tr>
											<td class="MANTDT" >JDK버전</td>
											<td class="MANTDM" >
												<input type="text" class="input_text" name="jdk_ver" style="width:131; maxlength="50">
											</td>
											<td class="MANTDT" >WAS종류</td>
											<td class="MANTDM" >
												<ucare:select name="was_type"  option="4" brcode="PRJ012" code="code" codename="codenm"  width="131" styleClass="combo_text" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">프로젝트위치</td>
											<td class="MANTDM" colspan="3">
												<input type=text class="input_text"  name="prj_loc" style="width:348;ime-mode:active" maxlength="100">
											</td>
										</tr>
										<tr height="50">
											<td class="MANTDT" width="80">프로젝트설명</td>
											<td class="MANTDM"  colspan="3">
												<textarea name="prj_desc" class="input_textarea_text" style="width:380;height:50;ime-mode:active" maxlength="1000"></textarea>
											</td>
										</tr>
										<tr height="62">
											<td class="MANTDT" width="80" >비고</td>
											<td class="MANTDM" colspan="3"><textarea name="rmk" class="input_textarea_text"  style="width:380;height:56;ime-mode:active" maxlength="1000"></textarea></td>
										</tr>
										<tr height="27" >
											<td class="MANTDT" width="80"   >진행현황</td>
											<td class="MANTDM" width="215" colspan="3"><ucare:select name="pogr_stat"  option="4" brcode="PRJ011" code="code" codename="codenm"  width="210" required="true" requirednm="진행현황"  /></td>
										</tr>
									<!--/ucare:table-->
									</table>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn width="60" name="btnAdd"		value="등록"		onClick="Add()"/><!-- 등록 -->
									<ucare:imgbtn width="60" name="btnSave"		value="저장"		onClick="Save()"/><!-- 저장 -->
								</td>
							</tr>
						</table>
					</td>
					<td width="10px"></td>
					<td valign="top" algin="center">
						<table cellpadding="0" cellspacing="0" border="0" width="100%">
							<tr>
								<td class="stitle">업무구분</td>
								<td></td>
							</tr>
						</table>
						<ucare:grid id="UCPRJ012S" width="135" height="395" no="false">
							<tr event="O">
								<td width="18"	column="chk" 		title="업무범위" 			align="center" format="CHECKBOX" hcheckbox="true" editable="true" />
								<td width="98"  column="code_nm"	title="업무범위"	align="center"></td>
								<td width="80"  column="code"		title="업무범위cd"	align="center" hidden="true"></td>
							</tr>
						</ucare:grid>
					</td>
					<td width="10px"></td>
					<td>
						<table width="430" cellpadding="0" cellspacing="0" border="0" bordercolor="red" >
							<tr>
								<td>
									<table cellpadding="0" cellspacing="0" border="0" width="100%">
										<tr>
											<td class="stitle">프로젝트 팀원</td>
											<td></td>
										</tr>
									</table>
								</td>
							</tr>
	</form>
	<form name="fmb" method="post">
							<tr>
								<td>
									<ucare:grid id="UCPRJ011S" width="530" height="225" no="true">
										<tr event="O">
											<td width="76" 	column="user_nm"		title="이름"				align="center" ></td>
											<td width="55"  column="etrn_c_cd_nm"	title="투입구분"			align="center"></td>
											<td width="70" 	column="etrn_dt" 		title="투입일자"			align="center" format="DATE"></td>
											<td width="70" 	column="ot_dt" 			title="철수일자"			align="center" format="DATE"></td>
											<td width="70" 	column="etrn_du_dt" 	title="투입예정일자"		align="center" format="DATE" ></td>
											<td width="70" 	column="ot_du_dt" 		title="철수예정일자"		align="center" format="DATE" ></td>
											<td width="60" 	column="user_id" 		title="이름ID"			align="center"  hidden="true"></td>
											<td width="60" 	column="prj_seq" 		title="프로젝트순번"		align="center"  hidden="true"></td>
											<td width="60" 	column="etrn_c_cd" 		title="투입구분코드"		align="center"  hidden="true"></td>
											<td width="60" 	column="job_c_cd" 		title="업무구분코드"		align="center"  hidden="true"></td>
											<td width="60" 	column="chrgjob" 		title="담당업무"		align="center"  hidden="true"></td>
											<td width="60" 	column="rg_dt" 			title="등록일자"			align="center"  hidden="true"></td>
											<td width="60" 	column="rg_tm" 			title="등록시간"			align="center"  hidden="true"></td>
											<td width="60" 	column="rg_id" 			title="등록자ID"			align="center"  hidden="true"></td>
											<td width="60" 	column="rg_nm" 			title="등록자"			align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_dt"			title="변경일자"			align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_tm"			title="변경시간"			align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_id"			title="변경자ID"			align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_nm"			title="변경자"			align="center"  hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td >
									<table class="MANTBL" cellspacing='1' cellpadding = "0" border='0' width="430" height="0" style="table-layout:fixed;">
									<!--ucare:table type="detail" width="430" -->
									<col width="100"  />
									<col width="165" />
									<col width="100" />
									<col width="165"/>
										<tr>
											<td class="MANTDT" >팀원</td>
											<td class="MANTDM" colspan="3">
												<input type="text" name="user_id" readOnly class="input_readonly" style="width:80;">
												<input type="text" name="user_nm" readOnly class="input_readonly" style="width:80;">
												<span class="search" onClick="openUserOrg(fmb)"></span>
												<span class="minus" onClick="del_userID(fmb);"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >투입구분</td>
											<td class="MANTDM">
												<ucare:select name="etrn_c_cd"  option="-1" brcode="PRJ002" code="code" codename="codenm"  width="131" styleClass="combo_text" />
											</td>
											<td class="MANTDT" >업무구분</td>
											<td class="MANTDM">
												<ucare:select name="job_c_cd"  option="-1" brcode="PRJ010" code="code" codename="codenm"  width="131" styleClass="combo_text" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">투입예정일자</td>
											<td class="MANTDM" >
												<ucare:input type="text" name="etrn_du_dt" width="105" title="투입예정일자" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="투입예정일자" maxlength="10"/>
												<span class=calendar onclick="openCalendar('fmb.etrn_du_dt' , fmb.etrn_du_dt.value)"></span>
											</td>
											<td class="MANTDT" width="80">철수예정일자</td>
											<td class="MANTDM" width="">
												<ucare:input type="text" name="ot_du_dt" width="105" title="철수예정일자" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="철수예정일자" maxlength="10"/>
												<span class=calendar onclick="openCalendar('fmb.ot_du_dt' , fmb.ot_du_dt.value)"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">투입일자</td>
											<td class="MANTDM">
												<ucare:input type="text" name="etrn_dt" width="105" title="투입일자" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="투입일자" maxlength="10"/>
												<span class=calendar onclick="openCalendar('fmb.etrn_dt' , fmb.etrn_dt.value)"></span>
											</td>
											<td class="MANTDT">철수일자</td>
											<td class="MANTDM">
												<ucare:input type="text" name="ot_dt" width="105" title="철수일자" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="철수일자" maxlength="10"/>
												<span class=calendar onclick="openCalendar('fmb.ot_dt' , fmb.ot_dt.value)"></span>
											</td>
										</tr>
										<tr height="50">
											<td class="MANTDT" width="80">담당업무</td>
											<td class="MANTDM" colspan="3">
												<textarea name="chrgjob" class="input_textarea_text"  style="width:348;height:48;ime-mode:active" maxlength="1000"></textarea>
											</td>
										</tr>
									<!--/ucare:table-->
									</table>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn width="60" name="btnAddMB"		value="등록"		onClick="AddMB()"/><!-- 등록 -->
									<ucare:imgbtn width="60" name="btnSaveMB"		value="저장"		onClick="SaveMB()"/><!-- 저장 -->
									<ucare:imgbtn width="60" name="btnDelMB"		value="삭제"		onClick="DelMB()"/><!-- 삭제 -->
								</td>
							</tr>
						</table>
					</td>
					<!-- 프로젝트정보 E -->
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