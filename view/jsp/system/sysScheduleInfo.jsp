<!--
  PROJ : Nexfron Intranet
  NAME : sysScheduleInfo.jsp
  DESC : 일정관리 화면
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
	<title>주요일정관리</title>
	<%
		String query = comBean.getParam("query").asString();
	%>
	<script language="javascript" src="<%=scriptPath%>/js/system/sysScheduleInfo.js"></script>
</head>

<style type="text/css" <%=(CUtil.nvl(request.getParameter("mode"),"").equals("A")?"":"media='print'")%>>
.noprint { display: none; }
</style>

<body onload="init('<%=CDateUtil.getFormatString("yyyyMMdd")%>','<%=CUtil.nvl(request.getParameter("mode"),"")%>')" style="padding:0 0 0 5;">
<form name=f>
<input type=hidden name=cen_sch_id>
<input type="hidden" name="pos_cd" value="<%=sessioninfo.getUserPositionCD()%>">
<input type=hidden name=userid value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="dept_cd" value="<%=sessioninfo.getUserPartCD()%>">
<input type=hidden name=query value="<%=query%>">
<center>
<div id=divPlan style="position:absolute; left:50px;top:80px; z-index:10000;display:none;width:400;height:180">
	<table cellspacing='0' border='0'  cellpadding = "0" class="pbody"  style="margin-top:5px"><tr><td height="170" valign="top">
		<table class="ptbl_outline" border="0" cellpadding="0" cellspacing="0"><tr><td height="180" valign="top">
			<table border=0 cellpadding=0 cellspacing=0 width=200 align="center" style="margin-top:5px">
				<tr><td class="popup_tit" style="padding:7 0 0 45" background="<%=scriptPath%>/images/common/popupbg.gif">상세일정</td></tr>
				<tr>
					<td class="hmargin"></td>
				</tr>
				<tr>
					<td>
						<ucare:table type="detail" width="400">
							<tr height="30">
								<td class=MANTDT width="60">기준일자</td>
								<td class=MANTDM width="330">
									<ucare:input type="text" name="date" readonly="true" required="true" title="기준일자" width="70" format="DATE"/>
								</td>
							</tr>
							<tr height="30">
								<td class=MANTDT width="60">일정제목</td>
								<td class=MANTDM width="330">
									<ucare:input type="text" name="cen_sch_sbjt" required="true" requirednm="일정제목" title="일정제목" width="330" mode="active" maxlength="100" maxsize="100" format="MAX" readonly="true"/>
								</td>
							</tr>
							<tr height="30">
								<td class=MANTDT width="60">일정내용</td>
								<td class=MANTDM width="330" style="padding: 2 3 2 3">
									<textarea name="cen_sch_cont" class="input_text" readonly style="width:330;height:60;ime-mode:active" maxsize="600" format="MAX"></textarea>
								</td>
							</tr>
						</ucare:table>
						<!-- 버튼  -->
						<table border=0 cellpadding=0 cellspacing=0 width="100%">
							<tr>
								<td align="right">
									<table class="tbl_button" border="0" cellpadding="0" cellspacing="0">
										<tr>
											<td align="right"><ucare:imgbtn name="btnClose" kind="X" onClick="closePlan()"/></td>
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
</div>
</form>

<form name="fQuery" method="post" target="iLog" action="/common.do">
<table border=0 cellpadding=0 cellspacing=0 width=100% bordercolor="red">
	<tr>
		<td height="3"></td>
	</tr>
	<!-- 조회조건  -->
	<tr>
		<td colspan="2" align="left">
			<table border=0 cellpadding=0 cellspacing=0 width=255 align=left style="margin-top:5px">
				<tr>
					<td>
						<ucare:select name="view_org_2" option="10" brcode="SYS032" width="95" onChange="chgDept()"/>
						<select name="view_org_3" class="combo_text"  style="width:120" onChange="getMonth('')">
							<option value="">전체</option>
						</select>
					</td>
				</tr>
			</table>
		</td>
		<td width="10%"></td>
		<td colspan=3>
			<table border=0 cellpadding=0 cellspacing=0 width=250 align="left" style="margin-top:5px" bordercolor="red">
				<tr align=center >

					<td align=right><span class=calprev onclick=getMonth("-")></span></td>
					<td width=150>
						<select name=year class="frm_select" onchange="getMonth('')" style="width:60">
							<option value=2017>2017</option>
							<option value=2016>2016</option>
							<option value=2015>2015</option>
							<option value=2014>2014</option>
							<option value=2013>2013</option>
							<option value=2012>2012</option>
							<option value=2011>2011</option>
							<option value=2010>2010</option>
							<option value=2009>2009</option>
							<option value=2008>2008</option>
							<option value=2007>2007</option>
							<option value=2006>2006</option>
						</select>
						<select name=month class="frm_select" onchange="getMonth('')" style="width:50">
							<option value='01'>1월</option>
							<option value='02'>2월</option>
							<option value='03'>3월</option>
							<option value='04'>4월</option>
							<option value='05'>5월</option>
							<option value='06'>6월</option>
							<option value='07'>7월</option>
							<option value='08'>8월</option>
							<option value='09'>9월</option>
							<option value='10'>10월</option>
							<option value='11'>11월</option>
							<option value='12'>12월</option>
						</select>
					</td>
					<td align=left><span class=calnext onclick=getMonth("+")></span></td>
				</tr>
			</table>
		</td>
		<td width="50%" align="right" valign="bottom">
			<font  style="font-size:11px" color="#A0A0A0" id="ScheduleNotice" style="display:none">* 임원분들은 직원들의 휴가정보가 함께 표시됩니다.</font>
		</td>
	</tr>

	<tr><td colspan=3 height="3"></td></tr>

</table>
</form>
<form name=fv>
<table id=caltbl border=0 cellpadding=0 cellspacing=0 width=100% height=90%>
	<tr><td  valign=top height=100%>
			<table cellpadding="0" width="100%" height="100%" cellspacing="0" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='<%=scriptPath%>/images/common/sch_bg_crop.gif', sizingMethod='scale');z-index;0">
				<tr>
					<td></td>
				</tr>
			</table>
			<table cellpadding="0" width="100%" height="100%" cellspacing="0" border="1" bordercolor="#e3e3e3" style="position:relative;top:-100%;z-index;9999;table-layout:fixed">
			<col width="13%"/>
			<col width="14%"/>
			<col width="14%"/>
			<col width="13%"/>
			<col width="13%"/>
			<col width="13%"/>
			<col width="13%"/>
				<tr>
					<td width="13%" class="sch_th01"><b class="cal2">일</b></td>
					<td width="14%" class="sch_th01"><b>월</b></td>
					<td width="14%" class="sch_th01"><b>화</b></td>
					<td width="13%" class="sch_th01"><b>수</b></td>
					<td width="13%" class="sch_th01"><b>목</b></td>
					<td width="13%" class="sch_th01"><b>금</b></td>
					<td width="13%" class="sch_th02"><b class="cal3">토</b></td>
 				</tr>
				<tr>
					<td colspan="7" height="3"><img src="<%=scriptPath%>/images/layout/sp.gif" width="1" height="1" border="0"></td>
				</tr>
				<%
					for (int i=0; i < 6; i++)
					{
						out.println("<tr height='16%' id='calTr"+i+"'>");
						for (int j=0; j <7; j++)
						{
							out.println("<td valign='top' id='calTd_"+(i*7+j)+"' style='padding:5 5 5 5;' onmouseover=boldChgOver(this,'','"+(i*7+j)+"') onmouseout=boldChgOut(this,'','"+(i*7+j)+"') onclick=\"showPlan(this, "+(i*7+j)+")\" ) valign='top'>");
							out.println("<table width='100%' border='0' cellspacing='0' cellpadding='0' id='UCSYS051S' style='overflow-y:scroll;width:100%;'>");
							out.println("	<tr>");
							out.println("		<td align='left'  class='cal1' height='16%' nowrap >&nbsp;</td>");
							out.println("		<td align='rignt' class='cal1' width='50%' nowrap >&nbsp;</td>");
							out.println("	</tr>");
							out.println("	<tr>");
							out.println("		<td colspan='2' align='left' width='100%'  height='20'  valign='top' class='cal1' nowrap >&nbsp;</td>");
							out.println("	</tr>");
							out.println("</table>");
							out.println("</td>");
						}
						out.println("</tr>");
					}
				%>
			</table>
		</td>
	</tr>
</table>
</form>
</body>
</html>