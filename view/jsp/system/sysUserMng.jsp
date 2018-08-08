<!--
  PROJ : Nexfron Intranet
  NAME : sysWeeklyRptMng.jsp
  DESC : 시스템 - 사용자 관리 화면
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.19		김은수		주석추가
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<%@ include file="/jsp/include/include.jsp"%>
	<title>사용자 관리</title>
	<script language="javascript" src="/html/js/system/sysUserMng.js"></script>
	<link rel="stylesheet" href="/html/style/ucareStyle.css" type="text/css">
	<%
	double width_CI  = 155*0.85;
	double height_CI = 35 *0.85;
	%>
</head>
<body class="mainbody" onLoad="init()">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td>
			<form  name="fQuery" method="post" onsubmit="return false;">
			<input type="hidden" name="org_cd"    />
			<input type="hidden" name="bb_org_cd" />
			<table class="tblSearch" width="100%">
				<col width="60" />
				<col width="80" />
				<col width="60" />
				<col width="130"/>
				<col width="55" />
				<col width="100"/>
				<col width="55" />
				<col width="310"/>
				<col width="55" />
				<col width=""/>
				<col width=""/>
				<tr>
					<th>사용여부</th>
					<td><ucare:select name="use_f" width="80" brcode="COM001" option="10" selCode="Y"/></td>
					<th>메뉴그룹</th>
					<td><ucare:select name="mnu_grp_id" width="130" queryid="UCSYS049S" code="mnu_grp_id" codename="mnu_grp_nm" option="10" /></td>
					<th>등급</th>
					<td><ucare:select name="grd_cd" width="100" brcode="SYS007" option="10" /></td>
					<th>소속</th>
					<td>
						<ucare:select name="view_org_1" width="100" brcode="SYS031" option="10" onChange="make_view_org('2',this,fQuery.view_org_2,fQuery.view_org_3)"/>
						<ucare:select name="view_org_2" width="100" brcode=""       option="10" onChange="make_view_org('3',this,fQuery.view_org_3)"/>
						<ucare:select name="view_org_3" width="100" brcode=""       option="10" />
					</td>
					<th>검색어</th>
					<td >
						<select name="searchtype" class="combo_text" required="true" requirednm="검색조건" style="width:80">
							<option value="q_user_id">사용자ID</option>
							<option value="q_user_nm">사용자명</option>
						</select>
						<ucare:input type="text" name="searchstr" width="100" tag="onKeyUp=\"pressEnter('userListQuery()')\""/>
					</td>
					<td class="rbtn"><ucare:imgbtn name="btnQuery" kind="R" onClick="userListQuery()"/></td>
				</tr>
			</table>
			</form>
		</td>
	</tr>
	<tr>
		<td class="hmargin"></td>
	</tr>
	<form name="f" method="post" onsubmit="return false;">
	<input type="hidden" name="userid"  value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="UPLOAD_IMG_PATH" value="<%=CUtil.nvlNequal(CIni.getString("USER_IMG_PATH"), "")%>"/>
	<input type="hidden" name="SCRIPT_PATH" value="<%=CUtil.nvlNequal(CIni.getString("SCRIPT_PATH"), "")%>"/>
	<input type="hidden" name="atch_file_nm" value=""/>
	<tr>
		<td>
			<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
				<tr>
					<td valign="top">
						<table width="100%" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">사용자 조직도</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS021S_1" width="200" height="685" tree="true">
										<tr event="O">
											<td width="181" column="orgnm" image="doc" format="TREE" action="false"></td>
											<td width="0"   column="orgcd_org" ></td>
											<td width="0"   column="depth"     ></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<td class="vmargin"></td>
					<td valign="top">
						<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
							<tr>
								<td class="stitle">사용자목록</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS022S" width="100%" height="305" no="true">
										<tr event="O">
											<td width="100"	column="user_nm" 			title="사용자명" 		align="center"	></td>
											<td width="100"	column="user_id" 			title="사용자 ID" 		align="center"	></td>
											<td width="110" column="dept_nm" 			title="(구)부서" 		align="center"	hidden="true"></td>
											<td width="75" 	column="pos_nm" 			title="직급"			align="center"	></td>
											<td width="100" column="hdp_no" 			title="휴대폰번호"		align="center" 	format="TEL"></td>
											<td width="155" column="em_addr" 			title="이메일"			align="left"	></td>
											<td width="70"	column="ext_no" 			title="내선번호" 		align="center"	length="4"></td>
											<td width="120"	column="view_org_1" 		title="조직1레벨" 		align="left" 	format="COMBO" brcode="SYS031" option="10"></td>
											<td width="100"	column="view_org_2" 		title="조직2레벨" 		align="left" 	format="COMBO" brcode="SYS032" option="10"></td>
											<td width="100"	column="view_org_3" 		title="조직3레벨" 		align="left" 	format="COMBO" brcode="SYS033" option="10"></td>
											<td width="66" column="grd_nm" 				title="등급"			align="center"	></td>
											<td width="120" column="mnu_grp_nm" 		title="메뉴그룹" 		align="center"	length="16"></td>
											<td width="70"	column="use_f" 				title="사용여부"		align="center"	format="COMBO" brcode="COM001"></td>
											<td width="0"	column="tel_no" 			title="전화번호" 		align="center" 	format="TEL"></td>
											<td width="0" 	column="user_pwd" 			title="비밀번호"		align="center"></td>
											<td width="0" 	column="brth" 				title="생년월일"		align="center"></td>
											<td width="0" 	column="mnu_grp_id" 		title="메뉴그룹ID"		align="center"></td>
											<td width="0" 	column="pos_cd" 			title="직급코드"		align="center"></td>
											<td width="0" 	column="grd_cd" 			title="등급코드"		align="center"></td>
											<td width="0"	column="eic_dt" 			title="입사일" 			align="center"></td>
											<td width="0"	column="rtrm_dt" 			title="퇴사일" 			align="center"></td>
											<td width="0" 	column="nex_dept_cd" 		title="부서CD" 			align="center"></td>
											<td width="0" 	column="dept_cd" 			title="팀CD" 			align="center"></td>
											<td width="0" 	column="home_zipcd" 		title="자택우편번호"	align="center"></td>
											<td width="0" 	column="home_addr" 			title="자택주소"		align="center"></td>
											<td width="0" 	column="home_detail_addr" 	title="자택상세주소"	align="center"></td>
											<td width="0" 	column="brth_tc" 			title="생일구분"		align="center"></td>
											<td width="0" 	column="wed_mday" 			title="결혼기념일"		align="center"></td>
											<td width="0" 	column="atch_file_nm" 		title="첨부파일명"		align="center"></td>
											<td width="0" 	column="rg_nm" 				title="등록자"			align="center"></td>
											<td width="0" 	column="rg_dt" 				title="등록일자"		align="center"></td>
											<td width="0" 	column="rg_tm" 				title="등록일시"		align="center"></td>
											<td width="0" 	column="mdf_nm" 			title="수정자"			align="center"></td>
											<td width="0" 	column="mdf_dt" 			title="수정일자"		align="center"></td>
											<td width="0" 	column="mdf_tm" 			title="수정일시"		align="center"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr><td class="hmargin"></td></tr>
							<tr>
								<td>
									<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
										<tr>
											<td valign="top" width="345">
												<table width="100%" cellpadding="0" cellspacing="0" border="0">
													<tr>
														<td class="stitle">사용자 메뉴목록</td>
													</tr>
													<tr>
														<td align="left">
															<ucare:grid id="UCSYS046S" width="345" height="367" no="true">
																<tr>
																	<td width="120"	column="mnu_grp_nm"		title="메뉴 그룹"	align="center"	length="14"></td>
																	<td width="57"	column="mnu_id" 		title="메뉴ID" 		align="center"	></td>
																	<td width="130" column="mnu_nm" 		title="메뉴명" 		align="left"	length="14"></td>
																	<!--
																	<td width="40" 	column="read_auth_f" 	title="읽기" 		align="center"></td>
																	<td width="40" 	column="wrt_auth_f" 	title="쓰기" 		align="center"></td>
																	-->
																</tr>
															</ucare:grid>
														</td>
													</tr>
												</table>
											</td>
											<td class="vmargin"></td>
											<td valign="top">
												<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
													<tr>
														<td class="stitle">사용자 상세정보</td>
													</tr>
													<tr>
														<td valign="top" width="500">
															<table class="tblData" width="500">
																<col width="80" >
																<col width="170">
																<col width="80" >
																<col width="170">
																<tr>
																	<th>사용자명</th>
																	<td><ucare:input type="text" name="user_nm" required="true" requirednm="성명" width="99%" /></td>
																	<th>사용자ID</th>
																	<td><ucare:input type="text"   name="user_id"     width="99%" required="true"  requirednm="사용자 ID" maxlength="10" /></td>
																</tr>
																<!--
																<tr>
																	<th>부서</th>
																	<td><ucare:select name="nex_dept_cd" width="166" brcode="SYS025" option="10" required="true" requirednm="부서" onChange="chgDept()" /></td>
																	<th>파트</th>
																	<td><ucare:select name="dept_cd"     width="166" brcode="SYS012" option="10" required="true" requirednm="파트" /></td>
																</tr>
																-->
																<tr>
																	<th>소속</th>
																	<td colspan="3">
																		<ucare:select name="view_org_1" width="166" brcode="SYS031" option="10" required="true" requirednm="조직1레벨" onChange="make_view_org('2',this, f.view_org_2, f.view_org_3)"/>
																		<ucare:select name="view_org_2" width="120" brcode=""       option="10" required="false" requirednm="조직2레벨" onChange="make_view_org('3',this, f.view_org_3)"/>
																		<ucare:select name="view_org_3" width="121" brcode=""       option="10" required="false" requirednm="조직3레벨" />
																	</td>
																</tr>
																<tr>
																	<th>직급</th>
																	<td><ucare:select name="pos_cd" width="166" brcode="SYS013" option="4" required="true" requirednm="직급"/></td>
																	<th>등급</th>
																	<td><ucare:select name="grd_cd" width="166" brcode="SYS007" option="4" required="true" requirednm="등급"/></td>
																</tr>
																<tr>
																	<th>메뉴그룹</th>
																	<td><ucare:select name="mnu_grp_id" width="166" queryid="UCSYS049S" code="mnu_grp_id" codename="mnu_grp_nm" option="4" required="true" requirednm="메뉴그룹" onChange="changeGroup()" /></td>
																	<th>비밀번호</th>
																	<td><ucare:input type="password" name="user_pwd" width="99%" required="true" requirednm="비밀번호" maxlength="10" readonly="true" /></td>
																</tr>
																<tr>
																	<th>사용여부</th>
																	<td><ucare:select name="use_f" width="166" brcode="COM001" option="4" required="true" requirednm="사용여부"/></td>
																	<th>이메일</th>
																	<td><ucare:input type="text" name="em_addr" width="99%" /></td>
																</tr>
																<tr>
																	<th>내선번호</th>
																	<td><ucare:input type="text" name="ext_no" width="99%" maxlength="4"  /></td>
																	<th>전화번호</th>
																	<td><ucare:input type="text" name="tel_no" width="99%" maxlength="13" format="TEL" /></td>
																</tr>
																<tr>
																	<th>휴대폰번호</th>
																	<td><ucare:input type="text" name="hdp_no" width="99%" maxlength="13" format="TEL" /></td>
																	<th>생년월일</th>
																	<td>
																		<ucare:input type="text" name="brth" width="140" maxlength="10" format="DATE" pattern="D" required="false" requirednm="생년월일" title="생년월일" />
																		<span class="calendar" onclick="openCalendar('f.brth' , f.brth.value)"></span>
																	</td>
																</tr>
																<tr>
																	<th>결혼기념일</th>
																	<td>
																		<ucare:input type="text" name="wed_mday" width="140" maxlength="10" format="DATE" pattern="D" required="false" requirednm="결혼기념일" title="결혼기념일" />
																		<span class="calendar" onclick="openCalendar('f.wed_mday' , f.wed_mday.value)"></span>
																	</td>
																	<th>생일구분</th>
																	<td><ucare:select name="brth_tc" width="166" brcode="COM013" option="4" /></td>
																</tr>
																<tr>
																	<th>입사일</th>
																	<td>
																		<ucare:input type="text" name="eic_dt" width="140" maxlength="10" format="DATE" pattern="D" required="false" requirednm="입사일" title="입사일" />
																		<span class="calendar" onclick="openCalendar('f.eic_dt' , f.eic_dt.value)"></span>
																	</td>
																	<th>퇴사일</th>
																	<td>
																		<ucare:input type="text" name="rtrm_dt" width="140" maxlength="10" format="DATE" pattern="D" required="false" requirednm="퇴사일" title="퇴사일" />
																		<span class="calendar" onclick="openCalendar('f.rtrm_dt' , f.rtrm_dt.value)"></span>
																	</td>
																</tr>
																<tr>
																	<th>주소</th>
																	<td colspan="3">
																		<ucare:input type="text" name="home_zipcd" width="50" maxlength="7" format="POST" />
																		<ucare:input type="text" name="home_addr"  width="86.6%" />
																	</td>
																</tr>
																<tr>
																	<th>상세주소</th>
																	<td colspan="3"><ucare:input type="text" name="home_detail_addr" width="99.5%" /></td>
																</tr>
																<tr>
																	<th>등록자</th>
																	<td><ucare:input type="text" name="rg_nm" width="99%" readonly="true" /></td>
																	<th>수정자</th>
																	<td><ucare:input type="text" name="mdf_nm" width="99%" readonly="true" /></td>
																</tr>
																<tr>
																	<th>등록일시</th>
																	<td>
																		<ucare:input type="text" name="rg_dt"  width="49%" readonly="true" format="DATE" />
																		<ucare:input type="text" name="rg_tm"  width="48%" readonly="true" format="TIME" />
																	</td>
																	<th>수정일시</th>
																	<td>
																		<ucare:input type="text" name="mdf_dt" width="49%" readonly="true" format="DATE" />
																		<ucare:input type="text" name="mdf_tm" width="48%" readonly="true" format="TIME" />
																	</td>
																</tr>
															</table>
														</td>
														<td style="width:2px"></td>
														<td valign="top">
															<table class="tblData" width="165">
																<col width="165">
																<tr style="height:291px">
																	<td id="tdIdPhoto" align="center" valign="top" style="height:262px"></td>
																</tr>
																<tr>
																	<td style="text-align:center;height:86px;font-size:20px;font-weight:bold;"><br><span id="spnUserNm"></span>
																		<br><img src="<%=scriptPath%>/images/main/nexfronCI.png" border="0" width="<%=width_CI%>" height="<%=height_CI%>">
																	</td>
																</tr>
															</table>
														</td>
													</tr>
													<tr><td class="hmargin5"></td></tr>
													<tr>
														<td colspan="2">
															<table class="tbl_button" align="right">
																<tr>
																	<td><ucare:imgbtn name="btnAdd"		width="60" kind="A"	onClick="addData()"		/></td>
																	<td><ucare:imgbtn name="btnSave"	width="60" kind="S"	onClick="checkSave()"	/></td>
																	<td><ucare:imgbtn name="btnDel"		width="60" kind="D"	onClick="delData()"		/></td>
																	<td><ucare:imgbtn name="btnCanl"	width="60" kind="C"	onClick="canlData()"	/></td>
																</tr>
															</table>
														</td>
														<td align="right"><ucare:imgbtn name="btnPhoto"	width="80" kind="A"	value="사진등록" 		onClick="photoUpload()"/></td>
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
	</form>
</table>
<div id="divUpload" style="position:absolute; left:590px;top:440px; z-index:10000;display:none;width:400;height:100">
	<form name="fPhoto" method="post" onsubmit="return false;">
	<table cellspacing='0' border='0'  cellpadding = "0" class="pbody"  style="margin-top:5px"><tr><td height="108" valign="top">
		<table class="ptbl_outline" border="0" cellpadding="0" cellspacing="0"><tr><td height="118" valign="top">
			<table border=0 cellpadding=0 cellspacing=0 width=200 align="center" style="margin-top:5px">
				<tr><td class="popup_tit" style="padding:7 0 0 45" background="/html/images/common/popupbg.gif">파일첨부</td></tr>
				<tr>
					<td class="hmargin"></td>
				</tr>
				<tr>
					<td>
						<table class="tblData">
							<tr>
								<th width="100">파일</th>
								<td width="245" colspan="2">
									<iframe name="iUpload" height="25" width="300" src="/jsp/common/upload.jsp?folder_name=&file_path=USER_IMG_PATH" frameborder="0"></iframe>
								</td>
							</tr>
						</table>
						<table cellpadding="0" cellspacing="0" border="0" width="400">
							<tr>
								<td>
									<div class="btnbar"></div>
									<table class="tbl_button" align="right">
										<tr>
											<td><ucare:imgbtn name="btnSave2" kind="S" onClick="photoSave();"/></td>
											<td><ucare:imgbtn name="btnClose" kind="X" onClick="closePhoto();"/></td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</table>
	</table>
	</form>
</div>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>