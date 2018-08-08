<!--
  PROJ : Nexfron Intranet
  NAME : astMtrlMng.jsp
  DESC : 자재 관리 화면
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.13		김은수		주석추가
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>자재 관리</title>
	<script language="javascript" src="/html/js/asset/astMtrlMng.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 5;">

<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>

	<!-- 검색조건 S -->
	<form	name="fQuery" method="post">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<th width="80" align="right">조회구분 :&nbsp;</th>
					<td width="150">
						<ucare:input type="radio" name="queryType"  tag="style=BACKGROUND-COLOR:#F4F4F4" checked="true" /> 비품별&nbsp;&nbsp;&nbsp;
						<ucare:input type="radio" name="queryType"	tag="style=BACKGROUND-COLOR:#F4F4F4" /> 직원별
					</td>
					<th width="80" align="right">자재구분 :&nbsp;</th>
					<td width="125" ><ucare:select name="mtrl_c_cd"  option="10" brcode="AST001" code="code" codename="codenm"  width="125" styleClass="combo_text" /></td>

					<th width="80" align="right">제품명 :&nbsp;</th>
					<td width="100"><input type="text" name="prdt_nm" class="input_text" style="width:100" onKeyPress="pressEnter('queryList()')"></td>

					<th width="80" align="right">대여여부 :&nbsp;</th>
					<td width="115"><ucare:select name="rnt_c_cd"  option="10" brcode="COM002" code="code" codename="codenm"  width="60" styleClass="combo_text" /></td>
					<td>&nbsp;</td>
					<td width="1" bgcolor=#CCCCCC></td>
					<td width="80" align="right">
						<ucare:imgbtn width="70" name="btnQuery"	value="조회"	 onClick="queryList()"/><!-- 조회 -->
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
	<input type="hidden" name="mtrl_seq" value="">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="800" />
				<col width="5" />
				<col width="420" />
				<tr>
					<!-- 프로젝트리스트 S -->
					<td valign="top">
						<table width="800" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">자재 리스트</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCAST020S" width="800" height="730" no="true">
										<tr event="O">
											<td width="70" 	column="mtrl_c_nm" 		title="자재구분"		align="left" 	></td>
											<td width="100" column="mco" 			title="제조사"			align="left" 	></td>
											<td width="150" column="prdt_nm"		title="제품명"			align="left" 	></td>
											<td width="60" 	column="rnt_c_cd" 		title="대여여부"		align="center" 	></td>
											<td width="70" 	column="rnt_nm"			title="최종대여자"		align="center"	></td>
											<td width="75" 	column="rnt_dt" 		title="최종대여일자"	align="center" 	format="DATE"></td>
											<td width="75" 	column="rtn_dt" 		title="최종반납일자"	align="center" 	format="DATE"></td>
											<td width="75" 	column="buy_dt" 		title="구입일자"		align="center" 	format="DATE"></td>
											<td width="55" 	column="buy_amt" 		title="구입가격"		align="right" 	format="MONEY"></td>
											<td width="50" 	column="cnt" 			title="부속품"			align="center" 	></td>
											<td width="150" column="prdt_no" 		title="제품번호"		align="left" 	></td>
											<td width="60" 	column="mtrl_seq" 		title="자재순번"		align="center"  hidden="true"></td>
											<td width="60" 	column="mtrl_c_cd" 		title="자재구분코드"	align="center"  hidden="true"></td>
											<td width="60"  column="mtrl_rmk"		title="비고"			align="center"  hidden="true"></td>
											<td width="60" 	column="rnt_id" 		title="대여자ID"		align="center"  hidden="true"></td>
											<td width="60" 	column="rg_dt" 			title="등록일자"		align="center"  hidden="true"></td>
											<td width="60" 	column="rg_tm" 			title="등록시간"		align="center"  hidden="true"></td>
											<td width="60" 	column="rg_id" 			title="등록자ID"		align="center"  hidden="true"></td>
											<td width="60" 	column="rg_nm" 			title="등록자"			align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_dt"			title="변경일자"		align="center"  ></td>
											<td width="60" 	column="mdf_tm"			title="변경시간"		align="center"  ></td>
											<td width="60" 	column="mdf_id"			title="변경자ID"		align="center"  ></td>
											<td width="60" 	column="mdf_nm"			title="변경자"			align="center"  ></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- 프로젝트리스트 E -->
					<td></td>
					<!-- 프로젝트정보 S -->
					<td valign="top">
						<table width="420" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">자재 상세정보</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="420">
										<tr>
											<td class="MANTDT" >자재구분</td>
											<td class="MANTDM" >
												<ucare:select name="mtrl_c_cd"  option="-1" brcode="AST001" code="code" codename="codenm"  width="125" styleClass="combo_required" />
											</td>
											<td class="MANTDT" >제품명</td>
											<td class="MANTDM" >
												<input type="text" class="input_required" name="prdt_nm" style="width:125;ime-mode:active;"  maxlength="25">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >제품번호</td>
											<td class="MANTDM" >
												<input type="text" class="input_text" name="prdt_no" style="width:125;ime-mode:active;"  maxlength="25">
											</td>
											<td class="MANTDT" >제조사</td>
											<td class="MANTDM" >
												<input type="text" class="input_text" name="mco" style="width:125;ime-mode:active;" maxlength="25" >
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >구입일자</td>
											<td class="MANTDM" >
												<ucare:input type="text" name="buy_dt" width="70" title="구입일자" format="DATE" pattern="D" required="false" maxlength="10"/>
												<span class=calendar onclick="openCalendar('f.buy_dt', f.buy_dt.value)"></span>
											</td>
											<td class="MANTDT" >구입가격</td>
											<td class="MANTDM" >
												<input type="text" class="input_number" name="buy_amt" style="width:125;" maxlength="20" onKeyDown="checkOnlyNumber()">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >대여여부</td>
											<td class="MANTDM" colspan="3">
												<ucare:select name="rnt_c_cd"  option="-1" brcode="COM002" code="code" codename="codenm"  width="60" styleClass="combo_text" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >대여자</td>
											<td class="MANTDM" colspan="3">
												<input type="text" name="rnt_id" readOnly class="input_readonly" style="width:80;">
												<input type="text" name="rnt_nm" readOnly class="input_readonly" style="width:80;">
												<span class="search" onClick="openUserOrg(f)"></span>
												<span class="minus" onClick="del_userID(f);"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">대여일자</td>
											<td class="MANTDM" width="125">
												<ucare:input type="text" name="rnt_dt" width="70" title="대여일자" format="DATE" pattern="D" required="false" maxlength="10"/>
												<span class=calendar onclick="openCalendar('f.rnt_dt', f.rnt_dt.value)"></span>
											</td>
											<td class="MANTDT" width="80">반납일자</td>
											<td class="MANTDM" width="125">
												<ucare:input type="text" name="rtn_dt" width="70" title="반납일자" format="DATE" pattern="D" required="false" maxlength="10"/>
												<span class=calendar onclick="openCalendar('f.rtn_dt', f.rtn_dt.value)"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">비고</td>
											<td class="MANTDM" colspan="3">
												<textarea name="mtrl_rmk" class="input_textarea_text"  style="width:335;height:100;ime-mode:active" maxlength="500"></textarea>
											</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
							<tr>
								<td height="10"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn width="70" name="btnAdd"		value="등록"		onClick="Add()"/><!-- 등록 -->
									<ucare:imgbtn width="70" name="btnSave"		value="저장"		onClick="Save()"/><!-- 저장 -->
								 	<ucare:imgbtn width="70" name="btnDel"		value="삭제"		onClick="Del()"/><!--삭제 -->
								</td>
							</tr>
	</form>
	<form name="fmb" method="post">
	<input type="hidden" name="sub_mtrl_seq" value="">
							<tr>
								<td class="stitle">자재 부속품</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCAST021S" width="420" height="190" no="false">
										<tr event="O">
											<td width="80" 	column="mtrl_c_nm" 		title="자재구분"			align="left" ></td>
											<td width="160" column="prdt_nm"		title="제품명"			align="left" ></td>
											<td width="70" column="buy_dt" 			title="구입일자"			align="center" format="DATE"></td>
											<td width="90" column="buy_amt" 		title="구입가격"			align="right" format="MONEY"></td>

											<td width="60" column="prdt_no" 		title="제품번호"			align="left" hidden="true"></td>
											<td width="60" column="mtrl_mco" 		title="제조사"			align="left" hidden="true"></td>
											<td width="60" 	column="sub_mtrl_seq" 	title="자재부속품순번"	align="center"  hidden="true"></td>
											<td width="60" 	column="mtrl_seq" 		title="자재순번"			align="center"  hidden="true"></td>
											<td width="60" 	column="mtrl_c_cd" 		title="자재구분코드"		align="center"  hidden="true"></td>
											<td width="60"  column="sub_mtrl_rmk"	title="비고"				align="center"  hidden="true"></td>
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
								<td>
									<ucare:table type="detail" width="420">
										<tr>
											<td class="MANTDT" width="80">자재구분</td>
											<td class="MANTDM" width="125">
												<ucare:select name="mtrl_c_cd"  option="-1" brcode="AST001" code="code" codename="codenm"  width="125" styleClass="combo_required" />
											</td>
											<td class="MANTDT" width="80">제품명</td>
											<td class="MANTDM" width="125">
												<input type="text" class="input_required" name="prdt_nm" style="width:125;ime-mode:active;"  maxlength="25">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >제품번호</td>
											<td class="MANTDM" >
												<input type="text" class="input_text" name="prdt_no" style="width:125;ime-mode:active;"  maxlength="25">
											</td>
											<td class="MANTDT" >제조사</td>
											<td class="MANTDM" >
												<input type="text" class="input_text" name="mtrl_mco" style="width:125;ime-mode:active;" maxlength="25" >
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >구입일자</td>
											<td class="MANTDM" >
												<ucare:input type="text" name="buy_dt" width="70" title="구입일자" format="DATE" pattern="D" required="false" maxlength="10"/>
												<span class=calendar onclick="openCalendar('fmb.buy_dt', fmb.buy_dt.value)"></span>
											</td>
											<td class="MANTDT" >구입가격</td>
											<td class="MANTDM" >
												<input type="text" class="input_number" name="buy_amt" style="width:125;" maxlength="20" onKeyDown="checkOnlyNumber()">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">비고</td>
											<td class="MANTDM" colspan="3">
												<textarea name="sub_mtrl_rmk" class="input_textarea_text"  style="width:335;height:100;ime-mode:active" maxlength="500"></textarea>
											</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
							<tr>
								<td height="10"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn width="70" name="btnAddMB"		value="등록"		onClick="AddMB()"/><!-- 등록 -->
									<ucare:imgbtn width="70" name="btnSaveMB"		value="저장"		onClick="SaveMB()"/><!-- 저장 -->
									<ucare:imgbtn width="70" name="btnDelMB"		value="삭제"		onClick="DelMB()"/><!-- 삭제 -->
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