<%@ page language="java" contentType="text/html; charset=EUC-KR"%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>�޹��ϰ���</title>
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

			<!-- ��¥ ���� -->
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

			<!-- �޷� -->
			<table cellpadding="0" cellspacing="0" border="1" bordercolor="#e3e3e3" id="tblCalendar">
				<tr>
					<td width="120" class="sch_th01"><b class="cal2">��</b></td>
					<td width="120" class="sch_th01"><b>��</b></td>
					<td width="120" class="sch_th01"><b>ȭ</b></td>
					<td width="120" class="sch_th01"><b>��</b></td>
					<td width="120" class="sch_th01"><b>��</b></td>
					<td width="120" class="sch_th01"><b>��</b></td>
					<td width="120" class="sch_th02"><b class="cal3">��</b></td>
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
							// ����
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

						<!-- Ÿ��Ʋ  -->
						<table border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td><span class="stitle">�޹��� ����</span></td>
							</tr>
						</table>

						<ucare:grid id="UCSYS131S" width="440" height="500" crud="false" no="false">
							<tr event="O">
								<td width="180" column="ofd_nm" title="���ϸ�" maxlength="100"></td>
								<td width="50" column="ofd_dt" title="����" align="center"></td>
								<td width="70" column="vld_st_dt" title="��ȿ������" align="center"></td>
								<td width="70" column="vld_end_dt" title="��ȿ������" align="center"></td>
								<td width="40" column="slr_f_cd" title="��/��" format="COMBO" brcode="COM013" align="center"></td>
								<td width="40" column="hldy_f" title="���Ͽ���" format="COMBO" brcode="COM002" align="center"></td>
								<!-- for detail -->
								<td width="0" column="ofd_seq" title="ofd_seq"></td>
								<td width="0" column="org_hldy_nm" title="org_hldy_nm"></td>
								<td width="0" column="org_slr_f_cd" title="org_slr_f_cd"></td>
								<td width="0" column="effectyear" title="effectyear"></td>
								<td width="0" column="expireyear" title="expireyear"></td>
							</tr>
						</ucare:grid>
						<!-- for ���� -->
						<table border="0" cellpadding="0" cellspacing="0">
							<tr><td class="hmargin5"></td></tr>
						</table>

						<ucare:table type="detail" width="440">
							<tr height="30">
								<td class="MANTDT" width="100">���ϸ�</td>
								<td class="MANTDM">
									<ucare:input type="text" name="ofd_nm" width="330" required="true" requirednm="���ϸ�" maxsize="100" mode="active"/>
								</td>
							</tr>
							<tr>
								<td class="MANTDT">����</td>
								<td class="MANTDM">
									<ucare:input type="text" name="ofd_dt" width="34" required="true" title="����" onBlur="onBlurDD(this)"/>
									<ucare:input type="checkbox" name="chkHoliType" onClick="setEffectDate(this)"/>���ظ� ����
								</td>
							</tr>
							<tr height="30">
								<td class="MANTDT">��ȿ�Ⱓ</td>
								<td class="MANTDM">
									<ucare:input type="text" name="effectyear" width="34" format="NUMBER" required="true" title="��ȿ���۳⵵" maxlength="4"/>��
									 ~
									<ucare:input type="text" name="expireyear" width="34" format="NUMBER" required="true" title="��ȿ����⵵" maxlength="4"/>��
								</td>
							</tr>
							<tr>
								<td class="MANTDT">���/����</td>
								<td class="MANTDM">
									<ucare:input type="radio" name="slr_f_cd" value="Y" checked="true"/>���
									<ucare:input type="radio" name="slr_f_cd" value="N"/>����
								</td>
							</tr>
							<tr>
								<td class="MANTDT">����/�����</td>
								<td class="MANTDM">
									<ucare:input type="radio" name="hldy_f" value="Y" checked="true"/>����
									<ucare:input type="radio" name="hldy_f" value="N"/>�����
								</td>
							</tr>
						</ucare:table>

						<!-- ��ư -->
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