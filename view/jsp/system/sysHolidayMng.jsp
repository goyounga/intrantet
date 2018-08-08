<%@ page language="java" contentType="text/html; charset=EUC-KR"%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>휴무일관리</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="/html/js/system/sysHolidayMng.js"></script>
</head>

<body onload="setInit('<%=CDateUtil.getFormatString("yyyyMM")%>');" class="mainbody">

<form name="f">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
</form>
<table border="0" cellpadding="0" cellspacing="0" width="1225" height="100%">
	<tr>
		<td valign="top">
			<form name="fCalendar">

			<!-- 날짜 선택 -->
			<table border=0 cellpadding=0 cellspacing=0 width=200 align="center" style="margin-top:5px;margin-bottom:5px">
				<tr align=center height="28">
					<td align=right><span class=calprev onclick=getMonth("-")></span></td>
					<td width=120>
						<ucare:select name="year" brcode="COM011" width="60" option="-1" step="1" onChange="getMonth('0')"/>
						<ucare:select name="month" brcode="COM012" width="48" option="-1" step="1" onChange="getMonth('0')"/>
					</td>
					<td align=left><span class=calnext onclick=getMonth("+")></span></td>
				</tr>
			</table>

			<!-- 달력 -->
			<table cellpadding="0" cellspacing="0" border="1" bordercolor="#e3e3e3" id="tblCalendar">
				<tr>
					<td width="120" class="sch_th01"><b class="cal2">일</b></td>
					<td width="120" class="sch_th01"><b>월</b></td>
					<td width="120" class="sch_th01"><b>화</b></td>
					<td width="120" class="sch_th01"><b>수</b></td>
					<td width="120" class="sch_th01"><b>목</b></td>
					<td width="120" class="sch_th01"><b>금</b></td>
					<td width="120" class="sch_th02"><b class="cal3">토</b></td>
 				</tr>
				<tr>
					<td colspan="7" height="3"><img src="<%=scriptPath%>/images/layout/sp.gif" width="1" height="1" border="0"></td>
				</tr>
				<%
					for (int i=0; i < 6; i++)
					{
						out.println("<tr height='120' id='calTr"+i+"'>");
						for (int j=0; j <7; j++)
						{
							out.println("<td valign='top' style='padding:5 5 5 5' onclick=\"calendar_onclick('tblDuty"+i+""+j+"')\" ondblclick=\"calendar_edit('tblDuty"+i+""+j+"', "+i+", "+j+")\">");
							out.println("<table width='100%' border='0' cellspacing='0' cellpadding='0' id='tblDuty"+i+""+j+"'>");
							out.println("	<tr>");
							if (j == 0)
							{
								out.println("		<td align='left' class='cal2' valign='top'></td>");
							}
							else if (j == 6)
							{
								out.println("		<td align='left' class='cal3' valign='top'></td>");
							}
							else
							{
								out.println("		<td align='left' class='cal1' valign='top'></td>");
							}
							// 주차
							out.println("		<td height='20' align='right' class='sch06'>");
							out.println("		");
							out.println("		</td>");
							//
							out.println("		<td style='display:none'>");
							out.println("			<input type='text' name='lunar_dd"+i+""+j+"' size='7'/>");
							out.println("			<input type='text' name='weekday"+i+""+j+"' size='2'/>");
							out.println("			<input type='text' name='hldy_yn"+i+""+j+"' size='2'/>");
							out.println("			<input type='text' name='hldy_nm"+i+""+j+"' size='2'/>");
							out.println("		</td>");
							out.println("	</tr>");
							out.println("	<tr>");
							out.println("		<td height=50 colspan='3' align='left' valign='top' class='sch06'>");
							out.println("		");
							out.println("		</td>");
							out.println("	</tr>");
							out.println("	<tr>");
							//out.println("		<td height=10 colspan='2' align='center' valign='bottom' class='sch06'>");
							//out.println("		");
							//out.println("		</td>");
							out.println("	</tr>");
							out.println("</table>");
							out.println("</td>");
						}
						out.println("</tr>");
					}
				%>
			</table>

			</form>
		</td>
		<td class="vmargin"></td>
		<td valign="top">
			<table border="0" cellpadding="0" cellspacing="0" style="margin-top:12px">
				<tr>
					<td>
						<form name="fHoliday">
							<input type="hidden" name="ofd_seq"/>
							<input type="hidden" name="vld_st_dt"/>
							<input type="hidden" name="vld_end_dt"/>
							<input type="hidden" name="org_hldy_nm"/>
							<input type="hidden" name="org_slr_f_cd"/>

						<!-- 타이틀  -->
						<table border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td><span class="stitle">휴무일 관리</span></td>
							</tr>
						</table>

						<ucare:grid id="UCSYS131S" width="440" height="500" crud="false" no="false">
							<tr event="O">
								<td width="180" column="ofd_nm" title="휴일명" maxlength="100"></td>
								<td width="50" column="ofd_dt" title="일자" align="center"></td>
								<td width="70" column="vld_st_dt" title="유효시작일" align="center"></td>
								<td width="70" column="vld_end_dt" title="유효종료일" align="center"></td>
								<td width="40" column="slr_f_cd" title="양/음" format="COMBO" brcode="COM013" align="center"></td>
								<td width="40" column="hldy_f" title="휴일여부" format="COMBO" brcode="COM002" align="center"></td>
								<!-- for detail -->
								<td width="0" column="ofd_seq" title="ofd_seq"></td>
								<td width="0" column="org_hldy_nm" title="org_hldy_nm"></td>
								<td width="0" column="org_slr_f_cd" title="org_slr_f_cd"></td>
								<td width="0" column="effectyear" title="effectyear"></td>
								<td width="0" column="expireyear" title="expireyear"></td>
							</tr>
						</ucare:grid>
						<!-- for 공백 -->
						<table border="0" cellpadding="0" cellspacing="0">
							<tr><td class="hmargin5"></td></tr>
						</table>

						<ucare:table type="detail" width="440">
							<tr height="30">
								<td class="MANTDT" width="100">휴일명</td>
								<td class="MANTDM">
									<ucare:input type="text" name="ofd_nm" width="330" required="true" requirednm="휴일명" maxsize="100" mode="active"/>
								</td>
							</tr>
							<tr>
								<td class="MANTDT">일자</td>
								<td class="MANTDM">
									<ucare:input type="text" name="ofd_dt" width="34" required="true" title="일자" onBlur="onBlurDD(this)"/>
									<ucare:input type="checkbox" name="chkHoliType" onClick="setEffectDate(this)"/>올해만 적용
								</td>
							</tr>
							<tr height="30">
								<td class="MANTDT">유효기간</td>
								<td class="MANTDM">
									<ucare:input type="text" name="effectyear" width="34" format="NUMBER" required="true" title="유효시작년도" maxlength="4"/>년
									 ~
									<ucare:input type="text" name="expireyear" width="34" format="NUMBER" required="true" title="유효종료년도" maxlength="4"/>년
								</td>
							</tr>
							<tr>
								<td class="MANTDT">양력/음력</td>
								<td class="MANTDM">
									<ucare:input type="radio" name="slr_f_cd" value="Y" checked="true"/>양력
									<ucare:input type="radio" name="slr_f_cd" value="N"/>음력
								</td>
							</tr>
							<tr>
								<td class="MANTDT">휴일/기념일</td>
								<td class="MANTDM">
									<ucare:input type="radio" name="hldy_f" value="Y" checked="true"/>휴일
									<ucare:input type="radio" name="hldy_f" value="N"/>기념일
								</td>
							</tr>
						</ucare:table>

						<!-- 버튼 -->
						<table class="tbl_button" border="0" cellpadding="0" cellspacing="0" align="right">
							<tr>
								<td><ucare:imgbtn name="btnAdd_H" kind="A" onClick="setAddMode('H')" /></td>
								<td><ucare:imgbtn name="btnSave_H" kind="S" onClick="checkSave()"/></td>
								<td><ucare:imgbtn name="btnDel_H" kind="D" onClick="remove()"/></td>
								<td><ucare:imgbtn name="btnCancel_H" kind="C" onClick="setCancelMode('H')"/></td>
							</tr>
						</table>

						</form>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>


<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>