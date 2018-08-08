<!--
  PROJ : Nexfron Intranet
  NAME : dasMtncStatP.jsp
  DESC : 현황판 - 유지보수현황 -유지보수상세내역
  Author : 강성진 대리
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2010.12.07		강성진		개발
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
	<title>유지보수 상세내역</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%=scriptPath%>/js/dashboard/dasMtncStatP.js"></script>
	<% 
		String mtnc_seq 	= request.getParameter("mtnc_seq"); 
	%>
</head>
<body class="pbody" onLoad="init()" style="padding:5 5 5 5;">
<form name="gInfo">
<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="user_nm" value="<%=sessioninfo.getUserName()%>">
<input type="hidden" name="today" value="<%=CUtil.getMyDate(0, "yyyy-MM-dd")%>">
</form>
<form name="fQuery" method="post" onsubmit="return false;">
<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="mtnc_seq" value="<%=mtnc_seq%>">
<input type="hidden" name="mtnc_dtl_seq" value="">
<input type="hidden" name="mtnc_system" value="">
<input type="hidden" name="strt_date" value="">
<input type="hidden" name="end_date" value="">

<!-- 서버정보 GRID CRUD param -->
<!--  insert -->
<input type="hidden" name="grid1_i_prm_kind" value=""> <!-- 프로그램종류 -->
<input type="hidden" name="grid1_i_prm_nm" value=""> <!-- 프로그램명 -->
<input type="hidden" name="grid1_i_srvr_ip" value=""> <!-- IP -->
<input type="hidden" name="grid1_i_srvr_os" value=""> <!-- OS -->
<input type="hidden" name="grid1_i_os_cnet_inf" value=""> <!-- OS 접속정보 -->
<input type="hidden" name="grid1_i_prm_cnet_inf" value=""> <!-- 프로그램 접속정보 -->
<input type="hidden" name="grid1_i_user_id" value=""> <!-- user_id -->

<!--  update -->
<input type="hidden" name="grid1_u_prm_kind" value=""> <!-- 프로그램종류 -->
<input type="hidden" name="grid1_u_prm_nm" value=""> <!-- 프로그램명 -->
<input type="hidden" name="grid1_u_srvr_ip" value=""> <!-- IP -->
<input type="hidden" name="grid1_u_srvr_os" value=""> <!-- OS -->
<input type="hidden" name="grid1_u_os_cnet_inf" value=""> <!-- OS 접속정보 -->
<input type="hidden" name="grid1_u_prm_cnet_inf" value=""> <!-- 프로그램 접속정보 -->
<input type="hidden" name="grid1_u_user_id" value=""> <!-- user_id -->
<input type="hidden" name="grid1_u_srvr_inf_seq" value=""> <!-- srvr_inf_seq -->

<!--  delete -->
<input type="hidden" name="grid1_d_srvr_inf_seq" value=""> <!-- srvr_inf_seq -->

<!-- 프로그램/인터페이스/작업정보 GRID CRUD param -->
<!--  insert -->
<input type="hidden" name="grid2_i_pgm_lrg" value=""> <!-- 프로그램(대) -->
<input type="hidden" name="grid2_i_pgm_mrg" value=""> <!-- 프로그램(중) -->
<input type="hidden" name="grid2_i_pgm_nm" value=""> <!-- 프로그램명 -->
<input type="hidden" name="grid2_i_user_id" value=""> <!-- user_id -->

<!--  update -->
<input type="hidden" name="grid2_u_pgm_lrg" value=""> <!-- 프로그램(대) -->
<input type="hidden" name="grid2_u_pgm_mrg" value=""> <!-- 프로그램(중) -->
<input type="hidden" name="grid2_u_pgm_nm" value=""> <!-- 프로그램명 -->
<input type="hidden" name="grid2_u_user_id" value=""> <!-- user_id -->
<input type="hidden" name="grid2_u_work_inf_seq" value=""> <!-- work_inf_seq -->

<!--  delete -->
<input type="hidden" name="grid2_d_work_inf_seq" value=""> <!-- work_inf_seq -->

<!-- 업무 담당자 GRID CRUD param -->
<!--  insert -->
<input type="hidden" name="grid3_i_chrg_corp" value=""> <!-- 회사 -->
<input type="hidden" name="grid3_i_chrg_usr_nm" value=""> <!-- 성명 -->
<input type="hidden" name="grid3_i_chrg_duty" value=""> <!-- 직책 -->
<input type="hidden" name="grid3_i_chrg_job" value=""> <!-- 담당업무 -->
<input type="hidden" name="grid3_i_mobl_no" value=""> <!-- 휴대폰 -->
<input type="hidden" name="grid3_i_tel_no" value=""> <!-- 사무실 -->
<input type="hidden" name="grid3_i_email" value=""> <!-- E-Mail -->
<input type="hidden" name="grid3_i_user_id" value=""> <!-- user_id -->

<!--  update -->
<input type="hidden" name="grid3_u_chrg_corp" value=""> <!-- 회사 -->
<input type="hidden" name="grid3_u_chrg_usr_nm" value=""> <!-- 성명 -->
<input type="hidden" name="grid3_u_chrg_duty" value=""> <!-- 직책 -->
<input type="hidden" name="grid3_u_chrg_job" value=""> <!-- 담당업무 -->
<input type="hidden" name="grid3_u_mobl_no" value=""> <!-- 휴대폰 -->
<input type="hidden" name="grid3_u_tel_no" value=""> <!-- 사무실 -->
<input type="hidden" name="grid3_u_email" value=""> <!-- E-Mail -->
<input type="hidden" name="grid3_u_chrg_usr_seq" value=""> <!-- chrg_usr_seq -->
<input type="hidden" name="grid3_u_user_id" value=""> <!-- user_id -->

<!--  delete -->
<input type="hidden" name="grid3_d_chrg_usr_seq" value=""> <!-- chrg_usr_seq -->

<table border="0" cellpadding="0" cellspacing="0" width="1015" >
	<tr>
 		<td colspan="3">
 			<table width="100%" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="popup_tit"><b>유지보수 상세내역</b></td>
 				</tr>
 			</table>
		</td>
	</tr>
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td class="stitle" width="500">고객사 정보</td>
		<td class="wmargin5"></td>
		<td class="stitle" width="500">계약정보</td>
	</tr>
	<tr>
		<td>
			<table class="MANTBL" border="0" cellpadding="0" cellspacing="1" width="500" style="table-layout:fixed;">
				<col width="100" >
				<col width="150">
				<col width="100">
				<col width="150">
				<tr>
					<td class="MANTDT">고객사</td>
					<td class="MANTDM">
						<ucare:input type="text" name="clnt_corp_nm" width="99%" maxsize="100" mode="active" required="true" requirednm="고객사" />
					</td>
					<td class="MANTDT">상담실</td>
					<td class="MANTDM">
						<ucare:input type="text" name="consl_offc" width="99%" maxsize="100" mode="active" required="true" requirednm="상담실" />
					</td>
				</tr>
				<tr>
					<td class="MANTDT">위치</td>
					<td class="MANTDM">
						<ucare:input type="text" name="clnt_corp_loc" width="99%" maxsize="100" mode="active" required="true" requirednm="고객사 위치" />
					</td>
					<td class="MANTDT">위치</td>
					<td class="MANTDM">
						<ucare:input type="text" name="consl_offc_loc" width="99%" maxsize="100" mode="active" required="true" requirednm="상담실 위치" />
					</td>
				</tr>
				<tr>
					<td class="MANTDT">시스템</td>
					<td class="MANTDM" colspan="3">
						<ucare:input type="text" name="mtnc_system_nm" width="99%" maxsize="100" mode="active" required="false" requirednm="시스템" />
					</td>
				</tr>
			</table>
		</td>
		<td class="wmargin5"></td>
		<td>
			<table class="MANTBL" border="0" cellpadding="0" cellspacing="1" width="500" style="table-layout:fixed;">
				<col width="100" >
				<col width="150">
				<col width="100">
				<col width="150">

				<tr>
					<td class="MANTDT">계약구분</td>
					<td class="MANTDM">
						<ucare:select name="mtnc_cost" brcode="PRJ014" width="147" option="10" required="false" requirednm="계약구분" />
					</td>
					<td class="MANTDT">계약기간</td>
					<td class="MANTDM">
						<ucare:input type="text" name="mtnc_date" width="99%" maxsize="100" mode="active" required="false" requirednm="상담실" />
					</td>
				</tr>
				<tr>
					<td class="MANTDT">정기점검</td>
					<td class="MANTDM">
						<ucare:select name="regular_chk" brcode="PRJ015" width="147" option="10" required="false" requirednm="정기점검" />
					</td>
					<td class="MANTDT">유지보수유형</td>
					<td class="MANTDM">
						<ucare:select name="mtnc_type" brcode="PRJ017" width="147" option="10" required="false" requirednm="유지보수유형" />
					</td>
				</tr>
				<tr>
					<td class="MANTDT">협력사</td>
					<td class="MANTDM">
						<ucare:input type="text" name="ptnr_offc" width="99%" maxsize="100" mode="active" required="true" requirednm="협력사" />
					</td>
					<td class="MANTDT"></td>
					<td class="MANTDM"></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td class="stitle">서버정보</td>
	</tr>
	<tr>
		<td colspan="3">
			<ucare:grid id="UCPRJ035S" width="100%" height="155" no="true" crud="true" >
				<tr event="O,S">
					<td width="60"	column="add_del" 		title="추가/삭제"		align="center"		format="IMAGE"	image="plus,minus"></td>
					<td width="110"	column="prm_kind" 		title="프로그램종류"		align="left"		editable="true"></td>
					<td width="110"	column="prm_nm" 		title="프로그램명"		align="left"		editable="true"></td>
					<td width="100"	column="srvr_ip" 		title="IP" 				align="left"		editable="true"></td>
					<td width="80"	column="srvr_os" 		title="OS" 				align="left"		editable="true"></td>
					<td width="150"	column="os_cnet_inf" 	title="OS 접속정보" 		align="left"		editable="true"></td>
					<td width="330"	column="prm_cnet_inf" 	title="프로그램 접속정보"	align="left"		editable="true"></td>
					
					<td width="0"	column="srvr_inf_seq" 	title="srvr_inf_seq"	hidden="true"></td>
					<td width="0"	column="mtnc_seq" 		title="mtnc_seq"		hidden="true"></td>
					<td width="0"	column="prm_kind_cd" 	title="prm_kind_cd"		hidden="true"></td>
				</tr>
			</ucare:grid>
		</td>
	</tr>
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td class="stitle" width="500">프로그램/인터페이스/작업정보</td>
		<td class="wmargin5"></td>
		<td class="stitle" width="500" >원격 접속정보</td>
	</tr>
	<tr>
		<td rowspan="4">
			<ucare:grid id="UCPRJ036S" width="500" height="331" no="true" crud="true" >
				<tr event="O">
					<td width="60"	column="add_del" 		title="추가/삭제"		align="center"		format="IMAGE"	image="plus,minus"></td>
					<td width="100"	column="pgm_lrg" 		title="프로그램(대)"		align="left"		editable="true"></td>
					<td width="100"	column="pgm_mrg" 		title="프로그램(중)"		align="left"		editable="true"></td>
					<td width="260"	column="pgm_nm" 		title="프로그램명"		align="left"		editable="true"></td>
					
					<td width="0"	column="work_inf_seq" 	title="work_inf_seq"	hidden="true"></td>
					<td width="0"	column="mtnc_seq" 		title="mtnc_seq"		hidden="true"></td>
				</tr>
			</ucare:grid>
		</td>
		<td class="wmargin5" rowspan="4"></td>
		<td>
			<table class="MANTBL" border="0" cellpadding="0" cellspacing="1" width="500" style="table-layout:fixed;">
			<col width="100">
			<col width="150">
			<col width="100">
			<col width="150">
				<tr>
					<td class="MANTDT">원격프로그램</td>
					<td class="MANTDM">
						<ucare:input type="text" name="rmt_pgm" width="99%" maxsize="100" mode="active" required="false" requirednm="원격프로그램" />
					</td>
					<td class="MANTDT">접속정보</td>
					<td class="MANTDM">
						<ucare:input type="text" name="cnet_inf" width="99%" maxsize="100" mode="active" required="false" requirednm="접속정보" />
					</td>
				</tr>
				<tr>
					<td class="MANTDT">원격 ID</td>
					<td class="MANTDM">
						<ucare:input type="text" name="rmt_id" width="99%" maxsize="100" mode="active" required="false" requirednm="ID" />
					</td>
					<td class="MANTDT">원격 Password</td>
					<td class="MANTDM">
						<ucare:input type="text" name="rmt_pwd" width="99%" maxsize="100" mode="active" required="false" requirednm="Password" />
					</td>
				</tr>
				<tr height="91">
					<td class="MANTDT">원격정보 비고</td>
					<td class="MANTDM" colspan="3">
						<textarea name="rmt_rmk" class="input_textarea_text" style="width:99%;height:85px;ime-mode:active" maxsize="2000" requirednm="비고"></textarea>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td class="stitle" width="500" >Ucare 접속정보</td>
	</tr>
	<tr>
		<td valign="top">
			<table class="MANTBL" border="0" cellpadding="0" cellspacing="1" width="335" style="table-layout:fixed;">
			<col width="100">
			<col width="150">
			<col width="100">
			<col width="150">

				<tr>
					<td class="MANTDT">Ucare URL</td>
					<td class="MANTDM" colspan="3">
						<ucare:input type="text" name="ucare_url" width="99%" maxsize="100" mode="active" required="false" requirednm="Ucare URL" />
					</td>
				</tr>
				<tr>
					<td class="MANTDT">Ucare ID</td>
					<td class="MANTDM">
						<ucare:input type="text" name="ucare_id" width="99%" maxsize="100" mode="active" required="false" requirednm="Ucare URL" />
					</td>
					<td class="MANTDT">Ucare Password</td>
					<td class="MANTDM">
						<ucare:input type="text" name="ucare_pwd" width="99%" maxsize="100" mode="active" required="false" requirednm="Ucare URL" />
					</td>
				</tr>
				<tr height="92">
					<td class="MANTDT">Ucare 비고</td>
					<td class="MANTDM" colspan="3">
						<textarea name="ucare_rmk" class="input_textarea_text" style="width:99%;height:86px;ime-mode:active" maxsize="2000" requirednm="비고"></textarea>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td class="stitle" colspan="3">업무 담당자</td>
	</tr>
	<tr>
		<td colspan="3">
			<ucare:grid id="UCPRJ037S" width="100%" height="156" no="true" crud="true" >
				<tr event="O">
					<td width="60"	column="add_del" 		title="추가/삭제"	align="center"		format="IMAGE"	image="plus,minus"></td>
					<td width="110"	column="chrg_corp" 		title="회사" 		align="left"		editable="true"></td>
					<td width="80"	column="chrg_usr_nm" 	title="성명"			align="center"		editable="true"></td>
					<td width="80"	column="chrg_duty" 		title="직책"			align="center"		editable="true"></td>
					<td width="80"	column="chrg_job" 		title="담당업무"		align="left"		editable="true"></td>
					<td width="100"	column="mobl_no" 		title="휴대폰"		align="center"		editable="true"	format="TEL"></td>
					<td width="100"	column="tel_no" 		title="사무실"		align="center"		editable="true"	format="TEL"></td>
					<td width="332"	column="email" 			title="E-Mail"		align="left"		editable="true"></td>
					
					<td width="0"	column="chrg_usr_seq" 	title="chrg_usr_seq"	hidden="true"></td>
					<td width="0"	column="mtnc_seq" 		title="mtnc_seq"		hidden="true"></td>
				</tr>
			</ucare:grid>
		</td>
	</tr>
	<tr>
		<td align="right" colspan="3">
			<table class="tbl_button" border="0" cellpadding="0" cellspacing="0" >
				<tr><td class="hmargin5"></td></tr>
				<tr>
					<!--td align="right"><ucare:imgbtn name="btnSave"	 kind="S"	value="서버정보 저장" onClick="saveGrid('UCPRJ035S');"	/></td>
					<td align="right"><ucare:imgbtn name="btnSave"	 kind="S"	value="작업정보 저장" onClick="saveGrid('UCPRJ036S');"	/></td>
					<td align="right"><ucare:imgbtn name="btnSave"	 kind="S"	value="담당자 저장" onClick="saveGrid('UCPRJ037S');"	/></td>
					<td align="right"><ucare:imgbtn name="btnSave"	 kind="S"	value="필드 저장" onClick="save();"	/></td-->
					<td align="right"><ucare:imgbtn name="btnSave"	 kind="S"	value="저장" onClick="save();"	/></td>
					<td align="right"><ucare:imgbtn name="btnCancel" kind="C"	value="" onClick="queryList();"	/></td>
					<td align="right"><ucare:imgbtn name="btnDel"	 kind="E"	value="" onClick="excel()"	/></td>
					<td align="right"><ucare:imgbtn name="btnCancel" kind="X"	value="" onClick="self.close()"	/></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>
<form method="post" name=fExcel action="stst_call_dur_excel.jsp" target="iLog">
</form>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>