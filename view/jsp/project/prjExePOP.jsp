<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>프로젝트조회</title>
<script language="javascript" src="/html/js/project/prjExePOP.js"></script>
</head>
<body topmargin=0 leftmargin=0 onload="init();" >

<table width="800" cellpadding="0" cellspacing="0" border="0">
	<tr>
 		<td>
 			<table width="800" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="popup_tit"><b>프로젝트조회</b></td>
 				</tr>
 			</table>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td style="padding:0 5 0 5;">
			<table width="780" cellpadding="0" cellspacing="0" border="0">
				<form	name="fQuery" method="post">
				<tr>
					<td>
						<ucare:table type="query" width="780">
							<tr>
								<td width="100" align="right">프로젝트일자 :&nbsp;</td>
								<td width="215">
									<ucare:input type="text" name="startdt" width="70" value="2007-01-01" requirednm="프로젝트시작일자"/>
									<span class=calendar onclick="openCalendar('fQuery.startdt', fQuery.startdt.value)"></span>&nbsp;
									~
									<ucare:input type="text" name="enddt" width="70" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" requirednm="프로젝트종료일자"/>
									<span class=calendar onclick="openCalendar('fQuery.enddt', fQuery.enddt.value)"></span>
								</td>
								<td width="100" align="right">프로젝트구분 :&nbsp;</td>
								<td width="170" >
									<ucare:select name="prj_c_cd"  option="10" brcode="PRJ001" code="code" codename="codenm"  width="150" styleClass="combo_text" />
								</td>
								<td rowspan=2>&nbsp;</td>
								<td rowspan=2 width="1" bgcolor=#CCCCCC></td>
								<td rowspan=2 width="80" align="right">
									<ucare:imgbtn width="70" name="btnQuery"	value="조회"	 onClick="queryList()"/><!-- 조회 -->
								</td>
							</tr>
							<tr>
								<td align="right">프로젝트명 : &nbsp;</td>
								<td >
									<input type="text" name="prj_nm" class="input_text" style="width:100" onKeyPress="pressEnter('queryList()')">
								</td>
								<td align="right">진행현황 :&nbsp;</td>
								<td >
									<ucare:select name="pogr_stat"  option="10" brcode="PRJ011" code="code" codename="codenm"  width="80" styleClass="combo_text" />
								</td>
							</tr>
						</ucare:table>
					</td>
				</tr>
				</form>
				<form name="f">
				<tr>
					<td class="stitle">프로젝트 리스트</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="UCPRJ010S" width="790" height="415" no="true">
							<tr event="D">
								<td width="75" 	column="rl_st_dt" 		title="시작일자"			align="center" format="DATE"></td>
								<td width="75" 	column="rl_end_dt" 		title="종료일자"			align="center" format="DATE"></td>
								<td width="80" column="prj_c_cd_nm"	title="프로젝트구분"		align="center" ></td>
								<td width="232" column="prj_nm" 		title="프로젝트명"		align="left"></td>
								<td width="70" 	column="cntr_man_m" 	title="계약M/M"			align="right" format="MONEY"></td>
								<td width="70" 	column="rl_etrn_m_m" 	title="실투입M/M"		align="right" format="MONEY"></td>
								<td width="90" 	column="clnt_co" 		title="고객사"			align="center" ></td>
								<td width="60" 	column="pogr_stat_nm"	title="진행현황"			align="center"></td>
								<td width="60" 	column="prj_seq" 		title="프로젝트순번"		align="center"  hidden="true"></td>
								<td width="60" 	column="prj_c_cd" 		title="프로젝트구분코드"	align="center"  hidden="true"></td>
								<td width="60" 	column="prj_desc" 		title="프로젝트설명"		align="center"  hidden="true"></td>
								<td width="60" 	column="prj_loc" 		title="프로젝트위치"		align="center"  hidden="true"></td>
								<td width="60" 	column="end_f_cd" 		title="완료여부CD"		align="center"  hidden="true"></td>
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
					<td align="right">
						<ucare:imgbtn name="btnApply" value="적용"  width="70"   onClick="Apply();"/>&nbsp;
						<ucare:imgbtn name="btnClose" value="닫기"  width="70"   onClick="self.close();"/>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>