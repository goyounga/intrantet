<!--
  PROJ : Nexfron Intranet
  NAME : home.jsp
  DESC : 메인(home) 화면
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

<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>HOME</title>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<script language="JavaScript" src="/html/js/main/home.js"></script>
</head>
<BODY leftmargin="0" topmargin="0" onload="init();">
	<!--init(<%=CDateUtil.getFormatString("yyyyMMdd")%>);-->

<form name=f>
<input type="hidden" name="notice_seq">
<input type="hidden" name="board_seq">
<input type="hidden" name="seq_no">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="gradecd" value="<%=sessioninfo.getUserGradeCD()%>">
<input type="hidden" name="shownotice" value="<%=CDateUtil.getDateString()%>">
<input type="hidden" name="sign_tp" />
<br>
<table width=100% border="0" cellspacing="0" cellpadding="0" style="margin-left:10px;margin-right:20px">
	<tr>
		<td valign="top" width="550">
			<table class="tblTitle" width='100%'>
				<tr>
					<td class='titleL'></td>
					<td class='titleM'>공지사항</td>
					<td class='titleC' onClick="openNoticeInfo(f, 1)"></td>
					<td class='titleR'></td>
				</tr>
			</table>
			<!-- 공지사항 10라인 출력-->
			<span id="tblnotice">
				<table cellspacing='0' cellpadding='0' border='0' defaultRow='2' id='UCSYS110S' summary='true' rowSize='1'  width='100%'>
					<tr>
						<td style=display:none></td>
						<td width='50' class="title_text_no"></td>
						<td width='300' class="title_text_title">&nbsp;</td>
						<td width='100' class="title_text_name"></td>
						<td width='100' class="title_text_date"></td>
					</tr>
					<tr>
						<td colspan="4" style="background: url(<%=scriptPath%>/images/home/home_solidline.gif)"></td>
					</tr>
			<%
					for (int i=0; i < 12; i++)
					{
						out.println("<tr onClick=noticeSelect(f,"+i+");showDetail_obj(this)  height='21'  onMouseOver='mover_obj(this)' onMouseOut='mout_obj(this)' style=cursor:hand>");
						out.println("		<td style=display:none  id='UCSYS110S_IDX'></td>");
						out.println("		<td id='UCSYS110S_notice_seq' width='50' column='notice_seq' align='center'></td>");
						out.println("		<td id='UCSYS110S_notice_sbjt' width='400' column='notice_sbjt' align='left'>&nbsp;</td>");
						out.println("		<td id='UCSYS110S_rg_nm' width='80' column='rg_nm' height='2' align='center'></td>");
						//out.println("		<td colspan='2' align='left' width='125'  height='20'  valign='top' class='cal1' nowrap >&nbsp;</td>");
						out.println("		<td id='UCSYS110S_rg_dt' width='80' column='rg_dt' height='2' align='center'></td>");
						out.println("</tr>");
						out.println("<tr>");
						out.println("		<td colspan=7 background='" + scriptPath + "/images/home/home_dotline.gif'></td>");
						out.println("</tr>");
					}
				%>
					<tr>
						<td colspan="4" background='<%=scriptPath%>/images/home/home_solidline.gif'></td>
					</tr>
				</table>
			</span>
		</td>
		<td width="40"></td>
		<td valign="top" width="660">
			<table class="tblTitle" width='100%'>
				<tr>
					<td class='titleL_h'></td>
					<td class='titleM_h'>게시판</td>
					<td class='titleC_h' onClick="openNoticeInfo(f, 2)"></td>
					<td class='titleR_h'></td>
				</tr>
			</table>
				<span id="tblteamnotice">
					<table cellspacing='0' cellpadding='0' border='0' defaultRow='2' id='UCSYS113S' summary='true' rowSize='1'  width='100%'>
						<tr>
							<td style=display:none></td>
							<td width='50' class="title_text_no"></td>
							<td width='350' class="title_text_title">&nbsp;</td>
							<td width='100' class="title_text_type"></td>
							<td width='80' class="title_text_name"></td>
							<td width='80' class="title_text_date"></td>
						</tr>
						<tr>
							<td colspan="5"  background='<%=scriptPath%>/images/home/home_solidline.gif'></td>
						</tr>
				<%
					for (int i=0; i < 5; i++)
					{
						out.println("<tr onClick=board_noticeselect(f,"+i+");showDetail_obj(this)  height='21'  onMouseOver='mover_obj(this)' onMouseOut='mout_obj(this)' style=cursor:hand>");
						out.println("		<td style=display:none  id='UCSYS113S_IDX'></td>");
						out.println("		<td id='UCSYS113S_seq' width='50' column='seq' align='center'></td>");
						out.println("		<td id='UCSYS113S_ntce_sbjt' width='350' column='ntce_sbjt' align='left'>&nbsp;</td>");
						out.println("		<td id='UCSYS113S_board_nm' width='100' column='board_nm' height='2' align='left'></td>");
						out.println("		<td id='UCSYS113S_rg_nm' width='80' column='rg_nm' height='2' align='center'></td>");
						out.println("		<td id='UCSYS113S_rg_dt' width='80' column='rg_dt' height='2' align='center'></td>");
						out.println("</tr>");
						out.println("<tr>");
						out.println("		<td colspan=6 background='" + scriptPath + "/images/home/home_dotline.gif'></td>");
						out.println("</tr>");
					}
				%>
					<tr>
						<td colspan="5" background='<%=scriptPath%>/images/home/home_solidline.gif'></td>
					</tr>
					</table>
				</span>
			<table class="tblTitle" width='100%'>
				<tr><td height="24"></td></tr>
				<tr>
					<td class='titleL_h'></td>
					<td class='titleM_h'>Q&A</td>
					<td class='titleC_h' onClick="openNoticeInfo(f, 4)"></td>
					<td class='titleR_h'></td>
				</tr>
			</table>
				<span id="tblteamnotice">
					<table cellspacing='0' cellpadding='0' border='0' defaultRow='2' id='UCSYS119S' summary='true' rowSize='1'  width='100%'>
						<tr>
							<td style=display:none></td>
							<td width='50' class="title_text_no"></td>
							<td width='350' class="title_text_title">&nbsp;</td>
							<td width='100' class="title_text_type"></td>
							<td width='80' class="title_text_name"></td>
							<td width='80' class="title_text_date"></td>
						</tr>
						<tr>
							<td colspan="5"  background='<%=scriptPath%>/images/home/home_solidline.gif'></td>
						</tr>
				<%
					for (int i=0; i < 4; i++)
					{
						out.println("<tr onClick='openNoticeInfo(f, 4);'  height='21'  onMouseOver='mover_obj(this)' onMouseOut='mout_obj(this)' style=cursor:hand>");
						out.println("		<td style=display:none  id='UCSYS113S_IDX'></td>");
						out.println("		<td id='UCSYS119S_seq' width='50' column='seq' align='center'></td>");
						out.println("		<td id='UCSYS119S_quest_title' width='350' column='quest_title' align='left'>&nbsp;</td>");
						out.println("		<td id='UCSYS119S_quest_type_nm' width='100' column='quest_type_nm' height='2' align='center'></td>");
						out.println("		<td id='UCSYS119S_rg_nm' width='80' column='rg_nm' height='2' align='center'></td>");
						out.println("		<td id='UCSYS119S_rg_dt' width='80' column='rg_dt' height='2' align='center'></td>");
						out.println("</tr>");
						out.println("<tr>");
						out.println("		<td colspan=6 background='" + scriptPath + "/images/home/home_dotline.gif'></td>");
						out.println("</tr>");
					}
				%>
					<tr>
						<td colspan="5" background='<%=scriptPath%>/images/home/home_solidline.gif'></td>
					</tr>
					</table>
				</span>
		</td>
		<td width=30></td>
	</tr>
</table>
</form>
<form name=f2>
<input type="hidden" name="scheduleid">
<input type="hidden" name="custkey">
<input type="hidden" name="custgb">
<input type="hidden" name="reserveno">
<input type="hidden" name="telno">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">

<input type="hidden" name="q_query_spd_gl" value="">
<input type="hidden" name="q_query_spd" value="">
<input type="hidden" name="q_query_cnt_gl" value="">
<input type="hidden" name="q_query_cnt" value="">
<table width=100% border="0" cellspacing="0" cellpadding="0" style="margin-left:10px;margin-right:20px">
	<tr>
		<td height="5" colspan="3"></td>
	</tr>
	<tr>
		<td valign="top" width="860">
			<table class="tblTitle" width='100%'>
				<tr>
					<td class='titleL'></td>
					<td class='titleM'>일정조회</td>
					<td class='titleR'></td>
				</tr>
			</table>
			<table border=0 cellpadding=0 cellspacing=0 width="100%" >
				<tr id="divCal" style="display:" class="box_bg02">
					<td>
						<table cellspacing='0' cellpadding='0' border='0'>
							<tr>
								<td>
									<!--iframe name="cal" src=/jsp/system/sysScheduleInfo.jsp marginwidth="0" marginheight="0" frameborder=0 scrolling="no" width=1217 height=455></iframe-->
									<iframe name="cal" src=/jsp/system/sysScheduleInfo.jsp marginwidth="0" marginheight="0" frameborder=0 scrolling="no" width="850" height=455></iframe>
								</td>
							</tr>
						</table>
					</td>
</form>
<form name="f3">
					<td align="center" valign="top" style="display:none">
						<!--근무설정-->
						<table border="0" cellpadding="0" cellspacing="0" width="100%" bordercolor="red"><tr><td style="height:19px;"></td></tr></table>
						<fieldset style="width:298; height:420">
							<legend  class="stitle">근무설정&nbsp;</legend>
							<table border="0" cellpadding="0" cellspacing="0" width="100%" >
								<tr><td class="hmargin5"></td></tr>
								<tr>
									<td>
										<table class="tblData_b" border="0" cellpadding="0" cellspacing="0" width="290" >
											<tr>
												<th class="MANTDT3" colspan="2" style="height:27px;">
													<input type="checkbox" name="work_type_cd" id="ccc" value="01" onClick="work_type_cd_onClick(this);" style="cursor:hand"/><label for="ccc" style="cursor:hand">본사근무</label>&nbsp;&nbsp;
													<input type="checkbox" name="work_type_cd" id="ddd" value="02" onClick="work_type_cd_onClick(this);" style="cursor:hand"/><label for="ddd" style="cursor:hand">프로젝트파견</label>&nbsp;&nbsp;
													<input type="checkbox" name="work_type_cd" id="eee" value="03" onClick="work_type_cd_onClick(this);" style="cursor:hand"/><label for="eee" style="cursor:hand">SM상주근무</label>
												</th>
											</tr>
										</table>
									</td>
								</tr>
								<tr><td class="hmargin5"></td></tr>
								<tr >
									<td >
										<table class="tblData" border="0" cellpadding="0" cellspacing="0" width="290" >
											<tr >
												<td colspan="2" style="text-align:center">
													<input type="radio" name="in_offc_stat" id="aaa" value="01" onClick="in_offc_stat_onClick(this);" style="cursor:hand"/><label for="aaa" style="cursor:hand">&nbsp;재 실</label>
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
													<input type="radio" name="in_offc_stat" id="bbb" value="02" onClick="in_offc_stat_onClick(this);" style="cursor:hand"/><label for="bbb" style="cursor:hand">&nbsp;외 근</label>
												</td>
											</tr>
											<tr >
												<th width="70">귀사예정</th>
												<td ><ucare:input type="text" name="rtn_scdl" width="213" maxsize="100" mode="active"  /></td>
											</tr>
											<tr >
												<th >외근일정</th>
												<td ><ucare:input type="text" name="work_scdl" width="213" maxsize="100" mode="active"  /></td>
											</tr>
											<tr >
												<th >비고</th>
												<td ><textarea name="work_rmk" class="input_textarea_text" style="width:213px;height:70px;ime-mode:active;" maxsize="2000" requirednm="비고"></textarea></td>
											</tr>
										</table>
									</td>
								</tr>
								<tr><td class="hmargin5" ></td></tr>
								<tr>
									<td align="right" >
										<input type="hidden" name="user_id"	value="<%=sessioninfo.getUserID()%>">
										<ucare:imgbtn width="60" name="btnSave"	 kind="S" value="저장" 	onClick="saveWork()"/>
									</td>
								</tr>
								<tr>
									<td style="text-align:right; vertical-align:bottom; height:172">
										<font class="orange" style="font-size:11px">
											* 항상 근무지를 설정후 확인해주세요.
										</font>
									</td>
								</tr>
							</table>
						</fieldset>
						<!--근무설정-->
					</td>
				</tr>
			</table>
		</td>

		<td width="40"></td>

		<td valign="top" width="400">
			<table class="tblTitle" width='100%'>
				<tr>
					<td class='titleL'></td>
					<td class='titleM'>프레임웍 업그레이드 정보</td>
					<td class='titleC' onClick="openNoticeInfo(f3, 3)"></td>
					<td class='titleR'></td>
				</tr>
			</table>
			<!-- upgrade 10라인 출력-->
			<span id="tblnotice">
				<table cellspacing='0' cellpadding='0' border='0' defaultRow='2' id='UCSYS099S' summary='true' rowSize='1'  width='100%'  height='100'>
					<tr>
						<td style=display:none></td>
						<td width='20' class="title_text_no"></td>
						<!--td width='50'  class="title_text_type">&nbsp;</td-->
						<td width='290' class="title_text_title">&nbsp;</td>
						<!--td width='60' class="title_text_name"></td-->
						<td width='70' class="title_text_date"></td>
					</tr>
					<tr>
						<td colspan="4" style="background: url(<%=scriptPath%>/images/home/home_solidline.gif)"></td>
					</tr>
			<%
					for (int i=0; i < 12; i++)
					{
						out.println("<tr onClick=upg_noticeselect(f,"+i+");showDetail_obj(this)  height='21'  onMouseOver='mover_obj(this)' onMouseOut='mout_obj(this)' style=cursor:hand>");
						out.println("		<td style=display:none  id='UCSYS099S_IDX'></td>");
						out.println("		<td id='UCSYS099S_upg_seq'  align='center'></td>");
						//out.println("		<td id='UCSYS099S_upg_type_cd' align='center'></td>");
						out.println("		<td id='UCSYS099S_upg_title' align='left'>&nbsp;</td>");
						//out.println("		<td id='UCSYS099S_reg_user_nm' align='center'></td>");
						//out.println("		<td colspan='2' align='left' width='125'  height='20'  valign='top' class='cal1' nowrap >&nbsp;</td>");
						out.println("		<td id='UCSYS099S_reg_dt' align='center'></td>");
						out.println("</tr>");
						out.println("<tr>");
						out.println("		<td colspan=7 background='" + scriptPath + "/images/home/home_dotline.gif'></td>");
						out.println("</tr>");
					}
				%>
					<tr>
						<td colspan="4" background='<%=scriptPath%>/images/home/home_solidline.gif'></td>
					</tr>
				</table>
			</span>
			<table class="tblTitle" width='100%'>
				<tr><td height="25"></td></tr>
				<tr>
					<td class='titleL'></td>
					<td class='titleM' id='sign_title'>결재 정보</td>
					<td class='titleC_a' id='signInf' onClick='signInfo(this)' style="display:none"></td>
					<td class='titleC_b' id='myInf' onClick='signInfo(this)' style="display:none"></td>
					<td class='titleR'></td>
				</tr>
			</table>
			<table cellspacing='0' cellpadding='0' border='0' bordercolor='red' defaultRow='2' id='UCSYS205S' summary='true' rowSize='1'  width='100%' height='100'>
				<tr><td height="5"></td></tr>
				<tr>
					<td style=display:none></td>
					<td width='20' class="title_text_no"></td>
					<td width='320' class="title_text_title">&nbsp;</td>
					<td width='40' class="title_text_count"></td>
				</tr>
				<tr>
						<td colspan="4" style="background: url(<%=scriptPath%>/images/home/home_solidline.gif)"></td>
					</tr>
			<%
					for (int i=0; i < 4; i++)
					{
						out.println("<tr onClick=sign_noticeselect(f,"+i+");showDetail_obj(this)  height='21'  onMouseOver='mover_obj(this)' onMouseOut='mout_obj(this)' style=cursor:hand>");
						out.println("		<td style=display:none  id='UCSYS205S_IDX'></td>");
						out.println("		<td id='UCSYS205S_sign_seq'  align='center'></td>");
						out.println("		<td id='UCSYS205S_sign_title' align='left'>&nbsp;</td>");
						out.println("		<td id='UCSYS205S_sign_cnt' align='right'></td>");
						out.println("</tr>");
						out.println("<tr>");
						out.println("		<td colspan=7 background='" + scriptPath + "/images/home/home_dotline.gif'></td>");
						out.println("</tr>");
					}
				%>
					<tr>
						<td colspan="4" background='<%=scriptPath%>/images/home/home_solidline.gif'></td>
					</tr>
			</table>
		</td>
		<td width=30></td>
	</tr>
</table>
</form>
<form name=fp>
<center>
</form>
</body>
</html>