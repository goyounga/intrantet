<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>유지보수요청관리</title>
	<script language="javascript" src="/html/js/project/prjMtncReqMng.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 5;">

<form name="gInfo">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="usernm" value="<%=sessioninfo.getUserName()%>">
<input type="hidden" name="today" value="<%=CUtil.getMyDate(0, "yyyy-MM-dd")%>">
</form>

<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>

	<!-- 검색조건 S -->
	<form	name="fQuery" method="post">
	<input type="hidden" name="mtnc_seq" value="">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width="80" align="right">유지보수명 :&nbsp;</td>
					<td width="230">
						<input type="text" name="mtnc_nm" readOnly class="input_readonly" style="width:180;">
						<span class="search" onClick="openProject(fQuery)"></span>
						<span class="minus" onClick="del_Project(fQuery);"></span>
					</td>
					<td width="80" align="right">요청일 :&nbsp;</td>
					<td width="210" >
						<input type=text class="input_text"  name="req_strt_date"  value="<%=CUtil.getMyDate(-1, "yyyy-MM-dd")%>"  style="width:70;ime-mode:active" maxlength="50" format="DATE" value="">
						<span class=calendar onclick="openCalendar('fQuery.req_strt_date', fQuery.req_strt_date.value)"></span>~
						<input type=text class="input_text"  name="req_end_date"  value="<%=CUtil.getMyDate(0, "yyyy-MM-dd")%>" style="width:70;ime-mode:active" maxlength="50" format="DATE">
						<span class=calendar onclick="openCalendar('fQuery.req_end_date', fQuery.req_end_date.value)"></span>&nbsp;
					</td>
					<td width="80" align="right">작업자 :&nbsp;</td>
					<td width="200" >
						<input type="text" name="prcs_k_id" readOnly class="input_readonly" style="width:60;">
						<input type="text" name="prcs_k_nm" readOnly class="input_readonly" style="width:60;">
						<span class="search" onClick="openUserOrg(fQuery)"></span>
						<span class="minus" onClick="del_userID(fQuery);"></span>
					</td>
					<td rowspan=2>&nbsp;</td>
					<td rowspan=2 width="1" bgcolor=#CCCCCC></td>
					<td rowspan=2 width="80" align="right">
						<ucare:imgbtn name="btnQuery"	value="조회"	 onClick="queryList()"/><!-- 조회 -->
					</td>
				</tr>
				<tr>
					<td width="80" align="right">계약구분 :&nbsp;</td>
					<td width="60">
						<ucare:select name="cntr_cd"  option="10" brcode="PRJ003" code="code" codename="codenm"  width="80" styleClass="combo_text" />
					</td>
					<td width="80" align="right">유지보수 :&nbsp;</td>
					<td width="60" >
						<ucare:select name="mtnc_cd"  option="10" brcode="PRJ004" code="code" codename="codenm"  width="80" styleClass="combo_text" />
					</td>
					<td width="80" align="right">완료여부 :&nbsp;</td>
					<td width="60">
						<ucare:select name="end_yn"  option="10" brcode="PRJ019" code="code" codename="codenm"  width="80" styleClass="combo_text" />
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
	<input type="hidden" name="sch_seq" value="">
	<input type="hidden" name="mtnc_seq" value="">
	<input type="hidden" name="up_seq" value="">
	<input type="hidden" name="prg_id" value="COM_SCH">
	<input type="hidden" name="file_nm" value="">
	<input type="hidden" name="new_file_nm" value="">
	<input type="hidden" name="file_cnt" value="">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td class="stitle">프로젝트 리스트</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="UCPRJ020S" width="1225" height="275" no="true">
							<tr event="O">
								<td width="50" column="end_yn_nm" 		title="완료여부"		align="center" ></td>
								<td width="250" column="mtnc_nm" 		title="유지보수명"		align="left" ></td>
								<td width="277" column="pgm_nm" 		title="화면명"			align="left" ></td>
								<td width="80" column="req_nm" 			title="요청자"			align="left" ></td>
								<td width="70" column="req_date"		title="요청일자"		align="center"	format="DATE" ></td>
								<td width="80" column="proc_time" 		title="소요시간"		align="left"></td>
								<td width="60" column="rnm_mtd_cd" 		title="작업구분"		align="center"	format="COMBO" brcode="PRJ005"></td>
								<td width="80" column="rnm_strt_date" 	title="작업시작일"		align="center"	format="DATE" ></td>
								<td width="80" column="rnm_end_date" 	title="작업종료일"		align="center"	format="DATE" ></td>
								<td width="60" column="prcs_k_nm" 		title="작업자"			align="left"></td>
								<td width="80" column="cf_nm"			title="확인자"			align="left"></td>
								<td width="20" column="file_cnt"		title="F"				align="center"></td>

								<td width="60" 	column="req_tel" 		title="요청자전화번호"		align="center"  hidden="true"></td>
								<td width="60" 	column="clnt_nm" 		title="고객사"				align="center"  hidden="true"></td>
								<td width="60" 	column="system_nm" 		title="시스템"				align="center"  hidden="true"></td>
								<td width="60" 	column="sch_seq" 		title="일정순번"			align="center"  hidden="true"></td>
								<td width="60" 	column="mtnc_seq" 		title="프로젝트순번"		align="center"  hidden="true"></td>
								<td width="60" 	column="cntr_cd" 		title="계약구분코드"		align="center"  hidden="true"></td>
								<td width="60" 	column="mtnc_cd" 		title="유지보수구분코드"	align="center"  hidden="true"></td>
								<td width="60" 	column="sch_cont" 		title="요청내용"			align="center"  hidden="true" ></td>
								<td width="60" 	column="rsn_cont" 		title="원인"				align="center"  hidden="true"></td>
								<td width="60" 	column="prcs_cont" 		title="작업내용"			align="center"  hidden="true"></td>
								<td width="60" 	column="prcs_k_id" 		title="작업자ID"			align="center"  hidden="true"></td>
								<td width="60" 	column="rg_dt" 			title="등록일자"			align="center"  hidden="true"></td>
								<td width="60" 	column="rg_tm" 			title="등록시간"			align="center"  hidden="true"></td>
								<td width="60" 	column="rg_dtm"			title="등록일시"			align="center"  hidden="true"></td>
								<td width="60" 	column="rg_id" 			title="등록자ID"			align="center"  hidden="true"></td>
								<td width="60" 	column="rg_nm" 			title="등록자"			align="center"  hidden="true"></td>
								<td width="60" 	column="mdf_dt"			title="변경일자"			align="center"  hidden="true"></td>
								<td width="60" 	column="mdf_tm"			title="변경시간"			align="center"  hidden="true"></td>
								<td width="60" 	column="mdf_dtm"		title="변경일시"			align="center"  hidden="true"></td>
								<td width="60" 	column="mdf_id"			title="변경자ID"			align="center"  hidden="true"></td>
								<td width="60" 	column="mdf_nm"			title="변경자"				align="center"  hidden="true"></td>
								<td width="50"	column="end_yn" 		title="완료여부"			align="center"	hidden="true"></td>
							</tr>
						</ucare:grid>
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
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td class="stitle">요청내용</td>
					<td class="stitle">작업내용</td>
				</tr>
				<tr>
					<td rowspan=2 style="padding:0 10 0 0">
						<table cellspacing='1' border='0' class="MANTBL" cellpadding = "0" width="595" height="0" style="table-layout:fixed">
						<col width="80">
						<col width="220">
						<col width="80">
						<col width="70">
						<col width="80">
						<col width="65">

							<tr>
								<td class="MANTDT">유지보수명</td>
								<td class="MANTDM">
									<input type="text" name="mtnc_nm" readOnly class="input_readonly" style="width:160;">
									<span class="search" onClick="openProject(f)"></span>
									<span class="minus" onClick="del_Project(f);"></span>
								</td>
								<td class="MANTDT">고객사</td>
								<td class="MANTDM" colspan=3>
									<input type=text class=input_required  name="clnt_nm" style="width:100%;ime-mode:active" maxlength="50">
								</td>
							</tr>
							<tr>
								<td class="MANTDT">시스템</td>
								<td class="MANTDM">
									<input type=text class="input_text"  name="system_nm" style="width:100%;ime-mode:active" maxlength="50">
								</td>
								<td class="MANTDT">화면명</td>
								<td class="MANTDM"  colspan=3>
									<input type=text class="input_text"  name="pgm_nm" style="width:100%;ime-mode:active" maxlength="50">
								</td>
							</tr>
							<tr>
								<td class="MANTDT">요청자</td>
								<td class="MANTDM">
									<input type=text class="input_text"  name="req_nm" style="width:100;ime-mode:active" maxlength="50">
								</td>
								<td class="MANTDT">요청자전화</td>
								<td class="MANTDM"  colspan=3>
									<input type=text class="input_text"  name="req_tel" style="width:100;ime-mode:active" maxlength="50" format="TEL">
								</td>
							</tr>
							<tr>
								<td class="MANTDT">요청일</td>
								<td class="MANTDM">
									<input type=text class="input_text"  name="req_date" style="width:70;ime-mode:active" maxlength="50" format="DATE">
									<span class=calendar onclick="openCalendar('f.req_date' , f.req_date.value)"></span>&nbsp;
								</td>
								<td class="MANTDT">계약구분</td>
								<td class="MANTDM">
									<ucare:select name="cntr_cd"  option="-1" brcode="PRJ003" code="code" codename="codenm"  width="60" styleClass="combo_text" />
								</td>
								<td class="MANTDT">유지보수</td>
								<td class="MANTDM">
									<ucare:select name="mtnc_cd"  option="-1" brcode="PRJ004" code="code" codename="codenm"  width="60" styleClass="combo_text" />
								</td>
							</tr>
							<tr>
								<td class="MANTDT">요청내용</td>
								<td class="MANTDM" colspan=5 style="height:240">
									<textarea name="sch_cont" class="input_textarea_text"  style="width:100%;height:100%;ime-mode:active" maxlength="1500"></textarea>
								</td>
							</tr>
							<tr>
								<td colspan=6>
								<jsp:include page="/jsp/common/comUploadForm.jsp" flush="true">
									<jsp:param name="title_width"			value="80"/>
									<jsp:param name="fileBox_width"			value="500"/>
									<jsp:param name="fileListBox_width"		value="520"/>
									<jsp:param name="fileListBox_height"	value="52"/>
								</jsp:include>
								</td>
							</tr>
						</table>
					</td>
					<td>
						<table cellspacing='1' border='0' class="MANTBL" cellpadding = "0" width="600" height="0" style="table-layout:fixed">
						<col width="80">
						<col width="220">
						<col width="80">
						<col width="220">
							<tr>
								<td class="MANTDT">작업구분</td>
								<td class="MANTDM">
									<ucare:select name="rnm_mtd_cd"  option="-1" brcode="PRJ005" code="code" codename="codenm"  width="100" styleClass="combo_text" />
								</td>
								<td class="MANTDT">작업자</td>
								<td class="MANTDM">
									<input type="text" name="prcs_k_id" readOnly class="input_readonly" style="width:80;">
									<input type="text" name="prcs_k_nm" readOnly class="input_readonly" style="width:80;">
									<span class="search" onClick="openUserOrg(f)"></span>
									<span class="minus" onClick="del_userID(f);"></span>
								</td>
							</tr>
							<tr>
								<td class="MANTDT">작업기간</td>
								<td class="MANTDM" colspan=3>
									<input type=text class="input_text"  name="rnm_strt_date" style="width:80;ime-mode:active" maxlength="50"  format="DATE">
									<span class=calendar onclick="openCalendar('f.rnm_strt_date' , f.rnm_strt_date.value)"></span>&nbsp;~
									<input type=text class="input_text"  name="rnm_end_date" style="width:80;ime-mode:active" maxlength="50"  format="DATE">
									<span class=calendar onclick="openCalendar('f.rnm_end_date' , f.rnm_end_date.value)"></span>&nbsp;
									<input type="checkbox" name="isRnmDate" onclick="f.rnm_end_date.value =f.rnm_strt_date.value;">시작일과 종료일 같게 처리
									<input type="checkbox" name="isReqDate" onclick="f.rnm_strt_date.value =f.req_date.value;f.rnm_end_date.value =f.req_date.value;">요청일 같게 처리
								</td>
							</tr>
							<tr>
								<td class="MANTDT">소요시간</td>
								<td class="MANTDM" >
									<input type=text class="input_text"  name="proc_time" style="width:155;ime-mode:active" maxlength="50">
								</td>
								<td class="MANTDT">확인자</td>
								<td class="MANTDM">
									<input type=text class="input_text"  name="cf_nm" style="width:155;ime-mode:active" maxlength="50">
								</td>
							</tr>
							<tr>
								<td class="MANTDT" >원인</td>
								<td class="MANTDM" colspan=3 style="height:100">
									<textarea name="rsn_cont" class="input_textarea_text"  style="width:100%;height:100%;ime-mode:active" maxlength="1500"></textarea>
								</td>
							</tr>
							<tr>
								<td class="MANTDT" >조치사항</td>
								<td class="MANTDM" colspan=3 style="height:110">
									<textarea name="prcs_cont" class="input_textarea_text"  style="width:100%;height:100%;ime-mode:active" maxlength="1500"></textarea>
								</td>
							</tr>
							<tr>
								<td class="MANTDT">등록자</td>
								<td class="MANTDM" >
									<input type=text class=input_readonly readonly name="rg_nm" style="width:120;">
								</td>
								<td class="MANTDT" >등록일시</td>
								<td class="MANTDM" >
									<input type=text class=input_readonly readonly name="rg_dtm" style="width:120;">
								</td>
							</tr>
							<tr>
								<td class="MANTDT">수정자</td>
								<td class="MANTDM">
									<input type=text class=input_readonly readonly name="mdf_nm" style="width:120;">
								</td>
								<td class="MANTDT">수정일시</td>
								<td class="MANTDM">
									<input type=text class=input_readonly readonly name="mdf_dtm" style="width:120;">
								</td>
							</tr>
							<tr>
								<td class="MANTDT" width="100">완료여부</td>
								<td class="MANTDM" width="" colspan="3">
									<ucare:select name="end_yn"  option="-1" brcode="PRJ019"  width="120" styleClass="combo_text" />
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td align="right">
						<ucare:imgbtn name="btnAdd"		value="등록"		onClick="Add()"/><!-- 등록 -->
						<ucare:imgbtn name="btnUpdate"	value="수정"		onClick="Update()"/><!-- 수정 -->
						<ucare:imgbtn name="btnSave"	value="저장"		onClick="saveData()"/><!-- 저장 -->
						<ucare:imgbtn name="btnDel"		value="삭제"		onClick="Del()"/><!-- 삭제 -->
						<ucare:imgbtn name="btnCancel"	value="취소"		onClick="Cancel()"/><!-- 취소 -->
					</td>
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