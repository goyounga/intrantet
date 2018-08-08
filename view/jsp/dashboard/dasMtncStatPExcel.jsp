<%@ page language="java" contentType="text/html; charset=EUC-KR"
	import ="java.io.*,java.util.*,java.text.*,ucare.jaf.common.*"%>
<%@ include file="/jsp/include/include.jsp"%>

<%
	request.setCharacterEncoding("EUC-KR");

	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyyMMdd");
	String today = formatter.format(new java.util.Date());
	String projectnm = request.getParameter("prj_nm");
	String mtnc_system = CUtil.nvl(request.getParameter("mtnc_system"), "");
	
	response.setHeader("Content-Disposition", "attachment; filename="+projectnm+"_"+today+".xls"); 
    response.setHeader("Content-Description", "JSP Generated Data");
%>
 

<%
	ComActionForm comForm = (ComActionForm)request.getAttribute("comForm");
	CParamSet cParamSet 	= comForm.getParamset();
	ucare.jaf.database.IDataSet ds = comForm.getDataset();
	ds.next();
	String[] ids = ds.getColumnName();
	ucare.jaf.database.IDataSet dataset1 = (ucare.jaf.database.IDataSet)ds.getParam(ids[0]).toObject();
	ucare.jaf.database.IDataSet dataset2 = (ucare.jaf.database.IDataSet)ds.getParam(ids[1]).toObject();
	ucare.jaf.database.IDataSet dataset3 = (ucare.jaf.database.IDataSet)ds.getParam(ids[2]).toObject();
	ucare.jaf.database.IDataSet dataset4 = (ucare.jaf.database.IDataSet)ds.getParam(ids[3]).toObject();
	ucare.jaf.database.IDataSet dataset5 = (ucare.jaf.database.IDataSet)ds.getParam(ids[4]).toObject();
	
	int maxcount1=dataset1.getMaxRowCount();
	int maxcount2=dataset2.getMaxRowCount();
	int maxcount3=dataset3.getMaxRowCount();
	int maxcount4=dataset4.getMaxRowCount();
	int maxcount5=dataset5.getMaxRowCount();
%>

<html>
<meta http-equiv="Content-Type" content="text/html;charset=EUC-KR">
<style>
<!--
tr
	{mso-height-source:auto;
	mso-ruby-visibility:none;}
col
	{mso-width-source:auto;
	mso-ruby-visibility:none;}
br
	{mso-data-placement:same-cell;}
ruby
	{ruby-align:left;}
.style0
	{mso-number-format:General;
	text-align:general;
	vertical-align:middle;
	white-space:nowrap;
	mso-rotate:0;
	mso-background-source:auto;
	mso-pattern:auto;
	color:black;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:"맑은 고딕", monospace;
	mso-font-charset:129;
	border:none;
	mso-protection:locked visible;
	mso-style-name:표준;
	mso-style-id:0;}
td
	{mso-style-parent:style0;
	padding-top:1px;
	padding-right:1px;
	padding-left:1px;
	mso-ignore:padding;
	color:black;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:"맑은 고딕", monospace;
	mso-font-charset:129;
	mso-number-format:General;
	text-align:general;
	vertical-align:middle;
	border:none;
	mso-background-source:auto;
	mso-pattern:auto;
	mso-protection:locked visible;
	white-space:nowrap;
	mso-rotate:0;}
.xl65
	{mso-style-parent:style0;
	color:black;
	font-size:24.0pt;
	font-weight:700;
	font-family:Tahoma, sans-serif;
	mso-font-charset:0;
	white-space:normal;}
.xl66
	{mso-style-parent:style0;
	color:black;
	font-size:9.0pt;
	font-family:Tahoma, sans-serif;
	mso-font-charset:0;
	text-align:center;
	border:.5pt solid black;
	background:#E1EDED;
	mso-pattern:black none;
	white-space:normal;}
.xl67
	{mso-style-parent:style0;
	color:black;
	font-size:9.0pt;
	font-family:Tahoma, sans-serif;
	mso-font-charset:0;
	text-align:center;
	border:.5pt solid black;
	white-space:normal;}
.xl68
	{mso-style-parent:style0;
	color:black;
	font-size:9.0pt;
	font-family:Tahoma, sans-serif;
	mso-font-charset:0;
	text-align:left;
	border:.5pt solid black;
	white-space:normal;}
.xl69
	{mso-style-parent:style0;
	color:black;
	font-size:9.0pt;
	font-family:Tahoma, sans-serif;
	mso-font-charset:0;
	text-align:center;
	border-top:.5pt solid black;
	border-right:none;
	border-bottom:.5pt solid black;
	border-left:.5pt solid black;
	background:#E1EDED;
	mso-pattern:black none;
	white-space:normal;}
.xl70
	{mso-style-parent:style0;
	color:black;
	font-size:9.0pt;
	font-family:Tahoma, sans-serif;
	mso-font-charset:0;
	text-align:center;
	border-top:.5pt solid black;
	border-right:none;
	border-bottom:.5pt solid black;
	border-left:none;
	background:#E1EDED;
	mso-pattern:black none;
	white-space:normal;}
.xl71
	{mso-style-parent:style0;
	color:black;
	font-size:9.0pt;
	font-family:Tahoma, sans-serif;
	mso-font-charset:0;
	text-align:center;
	border-top:.5pt solid black;
	border-right:.5pt solid black;
	border-bottom:.5pt solid black;
	border-left:none;
	background:#E1EDED;
	mso-pattern:black none;
	white-space:normal;}
.xl72
	{mso-style-parent:style0;
	color:black;
	font-size:9.0pt;
	font-family:Tahoma, sans-serif;
	mso-font-charset:0;
	text-align:left;
	border-top:.5pt solid black;
	border-right:none;
	border-bottom:.5pt solid black;
	border-left:.5pt solid black;
	white-space:normal;}
.xl73
	{mso-style-parent:style0;
	color:black;
	font-size:9.0pt;
	font-family:Tahoma, sans-serif;
	mso-font-charset:0;
	text-align:left;
	border-top:.5pt solid black;
	border-right:none;
	border-bottom:.5pt solid black;
	border-left:none;
	white-space:normal;}
.xl74
	{mso-style-parent:style0;
	color:black;
	font-size:9.0pt;
	font-family:Tahoma, sans-serif;
	mso-font-charset:0;
	text-align:left;
	border-top:.5pt solid black;
	border-right:.5pt solid black;
	border-bottom:.5pt solid black;
	border-left:none;
	white-space:normal;}
.xl75
	{mso-style-parent:style0;
	color:black;
	font-size:9.0pt;
	font-family:Tahoma, sans-serif;
	mso-font-charset:0;
	border-top:.5pt solid black;
	border-right:none;
	border-bottom:.5pt solid black;
	border-left:.5pt solid black;
	white-space:normal;}
.xl76
	{mso-style-parent:style0;
	color:black;
	font-size:9.0pt;
	font-family:Tahoma, sans-serif;
	mso-font-charset:0;
	border-top:.5pt solid black;
	border-right:none;
	border-bottom:.5pt solid black;
	border-left:none;
	white-space:normal;}
.xl77
	{mso-style-parent:style0;
	color:black;
	font-size:9.0pt;
	font-family:Tahoma, sans-serif;
	mso-font-charset:0;
	border-top:.5pt solid black;
	border-right:.5pt solid black;
	border-bottom:.5pt solid black;
	border-left:none;
	white-space:normal;}
-->

</style>
<table border=0 cellpadding=0 cellspacing=0 width=616 style='border-collapse:
 collapse;table-layout:fixed;width:463pt'>
<col width=89 style='mso-width-source:userset;mso-width-alt:2848;width:67pt'>
<col width=72 style='width:54pt'>
<col width=66 style='mso-width-source:userset;mso-width-alt:2112;width:50pt'>
<col width=76 style='mso-width-source:userset;mso-width-alt:2432;width:57pt'>
<col width=89 style='mso-width-source:userset;mso-width-alt:2848;width:67pt'>
<col width=99 style='mso-width-source:userset;mso-width-alt:3168;width:74pt'>
<col width=125 style='mso-width-source:userset;mso-width-alt:4000;width:94pt'>
	<tr height=22 style='height:16.5pt'>
		<td colspan=7 rowspan=2 height=44 class=xl65 width=616 style='height:33.0pt;width:463pt' align="center"><H1>유지보수 상세내역</H1></td> 
	</tr>
	 <tr height=22 style='height:16.5pt'>
	</tr>
	<tr height=22 style='height:16.5pt'>
	 <td height=22 colspan=7 style='height:16.5pt;mso-ignore:colspan'></td>
	</tr>
	<!-- 고객사 정보 START -->
	<tr>
		<td colspan=7 class=xl69 width=616 style='border-right:.5pt solid black;'>고객사 정보</td>
	</tr>
	<% if(maxcount1 <= 0){ %>
	<tr>
		<td class=xl66 width=89 style='height:16.5pt;border-top:none;'>고객사</td>
		<td colspan=3 class=xl72 width=214 style='border-right:.5pt solid black;border-left:none;'></td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;'>상담실</td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;'></td>
	</tr>
	<tr>
		<td height=22 class=xl66 width=89 style='height:16.5pt;border-top:none;'>위치</td>
		<td colspan=3 class=xl72 width=214 style='border-right:.5pt solid black;border-left:none;'></td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;'>위치</td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;'></td>
	</tr>
	<tr>
		<td class=xl66 width=89 style='height:16.5pt;border-top:none;'>시스템</td>
		<td colspan=6 class=xl72 width=527 style='border-right:.5pt solid black;border-left:none;'></td>
	</tr>
	<%	
		}
		else if(maxcount1 > 0)
		{
			dataset1.next();
	%>
	<tr>
		<td class=xl66 width=89 style='height:16.5pt;border-top:none;'>고객사</td>
		<td colspan=3 class=xl72 width=214 style='border-right:.5pt solid black;border-left:none;'><%=dataset1.getParam("clnt_corp_nm").asString("") %></td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;'>상담실</td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;'><%=dataset1.getParam("consl_offc").asString("") %></td>
	</tr>
	<tr>
		<td height=22 class=xl66 width=89 style='height:16.5pt;border-top:none;'>위치</td>
		<td colspan=3 class=xl72 width=214 style='border-right:.5pt solid black;border-left:none;'><%=dataset1.getParam("clnt_corp_loc").asString("") %></td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;'>위치</td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;'><%=dataset1.getParam("consl_offc_loc").asString("") %></td>
	</tr>
	<tr>
		<td class=xl66 width=89 style='height:16.5pt;border-top:none;'>시스템</td>
		<td colspan=6 class=xl72 width=527 style='border-right:.5pt solid black;border-left:none;'>
		<%if(maxcount5 <= 0){
			
		}
		else if(maxcount5 > 0)
		{
			if(!mtnc_system.equals(""))
			{
				String[] aCodes = mtnc_system.split(",");
				
				String codenm = "";
				
				for(int j=0; j<aCodes.length ;j++)
				{
					for(int k=0; k<maxcount5; k++)
					{
						dataset5.next();
						
						if(aCodes[j].equals(dataset5.getParam("code").asString(""))) 
						{
							codenm += ((!codenm.equals("") ? ", " : "") + dataset5.getParam("code_nm").asString(""));
							break;
						}
					}
				}
				out.println(codenm);
			}
		}
		%>
		</td>
	</tr>
	<%
			dataset1.first();
		}
	%>
	<!-- 고객사 정보 END -->
	<tr><td height="5" colspan="7"></td></tr>
	<!-- 계약정보 START -->
	<tr>
		<td colspan=7 class=xl69 width=616 style='border-right:.5pt solid black;'>계약정보</td>
	</tr>
	<% if(maxcount1 <= 0){ %>
	<tr>
		<td class=xl66 width=89 style='height:16.5pt;border-top:none;'>계약구분</td>
		<td colspan=3 class=xl72 width=214 style='border-right:.5pt solid black;border-left:none;'></td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;'>계약기간</td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;'></td>
	</tr>
	<tr>
		<td class=xl66 width=89 style='height:16.5pt;border-top:none;'>정기점검</td>
		<td colspan=3 class=xl72 width=214 style='border-right:.5pt solid black;border-left:none;'></td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;'>유지보수 내용</td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;'></td>
	</tr>
	<tr>
		<td class=xl66 width=89 style='height:16.5pt;border-top:none;'>협력사</td>
		<td colspan=6 class=xl72 width=527 style='border-right:.5pt solid black;border-left:none;'></td>
	</tr>
	<%
		}
		else if(maxcount1 > 0)
		{
			dataset1.next();
	%>
	<tr>
		<td class=xl66 width=89 style='height:16.5pt;border-top:none;'>계약구분</td>
		<td colspan=3 class=xl72 width=214 style='border-right:.5pt solid black;border-left:none;'><%=dataset1.getParam("mtnc_cost_excel").asString("") %></td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;'>계약기간</td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;'><%=dataset1.getParam("mtnc_date").asString("") %></td>
	</tr>
	<tr>
		<td class=xl66 width=89 style='height:16.5pt;border-top:none;'>정기점검</td>
		<td colspan=3 class=xl72 width=214 style='border-right:.5pt solid black;border-left:none;'><%=dataset1.getParam("regular_chk_excel").asString("") %></td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;'>유지보수 내용</td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;'><%=dataset1.getParam("mtnc_type_excel").asString("") %></td>
	</tr>
	<tr>
		<td class=xl66 width=89 style='height:16.5pt;border-top:none;'>협력사</td>
		<td colspan=6 class=xl72 width=527 style='border-right:.5pt solid black;border-left:none;'><%=dataset1.getParam("ptnr_offc").asString("") %></td>
	</tr>
	<%
			dataset1.first();
		}
	%>
	<!-- 계약정보 END -->
	<tr><td height="5" colspan="7"></td></tr>
	<!-- 담당자 START -->
	<tr>
		<td colspan=7 class=xl69 width=616 style='border-right:.5pt solid black;'>담당자 정보</td>
	</tr>
	<tr>
		<td height=22 class=xl66 width=89 style='height:16.5pt;border-top:none;width:67pt'>회사</td>
		<td class=xl66 width=72 style='border-top:none;border-left:none;width:54pt'>성명</td>
		<td class=xl66 width=66 style='border-top:none;border-left:none;width:50pt'>직책</td>
		<td class=xl66 width=76 style='border-top:none;border-left:none;width:57pt'>담당업무</td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;width:67pt'>휴대폰</td>
		<td class=xl66 width=99 style='border-top:none;border-left:none;width:74pt'>사무실</td>
		<td class=xl66 width=125 style='border-top:none;border-left:none;width:94pt'>E-Mail</td>
	</tr>
	<% if(maxcount4 <= 0){ %>
	<tr>
		<td height=22 class=xl67 width=89 style='height:16.5pt;border-top:none;width:67pt'></td>
		<td class=xl67 width=72 style='border-top:none;border-left:none;width:54pt'></td>
		<td class=xl67 width=66 style='border-top:none;border-left:none;width:50pt'></td>
		<td class=xl68 width=76 style='border-top:none;border-left:none;width:57pt'></td>
		<td class=xl67 width=89 style='border-top:none;border-left:none;width:67pt'></td>
		<td class=xl67 width=99 style='border-top:none;border-left:none;width:74pt'></td>
		<td class=xl68 width=125 style='border-top:none;border-left:none;width:94pt'></td>
	</tr>
	<%
		}
		else if(maxcount4 > 0)
		{
			for (int i=0; i < maxcount4; i++)
			{
				dataset4.next();
				%>
	<tr>
		<td height=22 class=xl67 width=89 style='height:16.5pt;border-top:none;width:67pt'><%=dataset4.getParam("chrg_corp").asString("") %></td>
		<td class=xl67 width=72 style='border-top:none;border-left:none;width:54pt'><%=dataset4.getParam("chrg_usr_nm").asString("") %></td>
		<td class=xl67 width=66 style='border-top:none;border-left:none;width:50pt'><%=dataset4.getParam("chrg_duty").asString("") %></td>
		<td class=xl68 width=76 style='border-top:none;border-left:none;width:57pt'><%=dataset4.getParam("chrg_job").asString("") %></td>
		<td class=xl67 width=89 style='border-top:none;border-left:none;width:67pt'><%=dataset4.getParam("mobl_no_excel").asString("") %></td>
		<td class=xl67 width=99 style='border-top:none;border-left:none;width:74pt'><%=dataset4.getParam("tel_no_excel").asString("") %></td>
		<td class=xl68 width=125 style='border-top:none;border-left:none;width:94pt'><%=dataset4.getParam("email").asString("") %></td>		
	</tr>
				<%
			}
		}
	%>
	<!-- 담당자 END -->
	<tr><td height="5" colspan="7"></td></tr>
	<!-- 서버정보 START -->
	<tr>
		<td colspan=7 class=xl69 width=616 style='border-right:.5pt solid black;'>서버정보(운영)</td>
	</tr>
	<tr>
		<td class=xl66 width=89 style='border-top:none;width:67pt'>프로그램종류</td>
		<td class=xl66 width=72 style='border-top:none;border-left:none;width:54pt'>프로그램명</td>
		<td class=xl66 width=66 style='border-top:none;border-left:none;width:50pt'>IP</td>
		<td class=xl66 width=76 style='border-top:none;border-left:none;width:57pt'>OS</td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;width:67pt'>OS 접속정보</td>
		<td colspan=2 class=xl69 width=224 style='border-right:.5pt solid black;border-left:none;width:168pt'>프로그램 접속정보</td>
	</tr>
	<% if(maxcount2 <= 0){ %>
	<tr>
		<td height=22 class=xl68 width=89 style='height:16.5pt;border-top:none;width:67pt'></td>
		<td class=xl68 width=72 style='border-top:none;border-left:none;width:54pt'></td>
		<td class=xl67 width=66 style='border-top:none;border-left:none;width:50pt'></td>
		<td class=xl67 width=76 style='border-top:none;border-left:none;width:57pt'></td>
		<td class=xl68 width=89 style='border-top:none;border-left:none;width:67pt'></td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;width:168pt'></td>
	</tr>
	<%
		}
		else if(maxcount2 > 0)
		{
			for (int i=0; i < maxcount2; i++)
			{
				dataset2.next();
	%>
	<tr>
		<td height=22 class=xl68 width=89 style='height:16.5pt;border-top:none;width:67pt'><%=dataset2.getParam("prm_kind").asString("") %></td>
		<td class=xl68 width=72 style='border-top:none;border-left:none;width:54pt'><%=dataset2.getParam("prm_nm").asString("") %></td>
		<td class=xl67 width=66 style='border-top:none;border-left:none;width:50pt'><%=dataset2.getParam("srvr_ip").asString("") %></td>
		<td class=xl67 width=76 style='border-top:none;border-left:none;width:57pt'><%=dataset2.getParam("srvr_os").asString("") %></td>
		<td class=xl68 width=89 style='border-top:none;border-left:none;width:67pt'><%=dataset2.getParam("os_cnet_inf").asString("") %></td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;width:168pt'><%=dataset2.getParam("prm_cnet_inf").asString("") %></td>
	</tr>
	<%
			}
		}
	%>
	<!-- 서버정보 END -->
	<tr><td height="5" colspan="7"></td></tr>
	<!-- 프로그램/인터페이스/작업정보 START -->
	<tr>
		<td colspan=7 class=xl69 width=616 style='border-right:.5pt solid black;'>프로그램/인터페이스/작업정보</td>
	</tr>
	<tr>
		<td colspan=2 class=xl69 width=161 style='border-right:.5pt solid black;width:121pt'>프로그램(대)</td>
		<td colspan=2 class=xl69 width=142 style='border-right:.5pt solid black;border-left:none;width:107pt'>프로그램(중)</td>
		<td colspan=3 class=xl69 width=313 style='border-right:.5pt solid black;border-left:none;width:235pt'>프로그램명</td>
	</tr>
	<% if(maxcount3 <= 0){ %>
	<tr>
		<td colspan=2 height=22 class=xl72 width=161 style='border-right:.5pt solid black;height:16.5pt;width:121pt'></td>
		<td colspan=2 class=xl72 width=142 style='border-right:.5pt solid black;border-left:none;width:107pt'></td>
		<td colspan=3 class=xl72 width=313 style='border-right:.5pt solid black;border-left:none;width:235pt'></td>
	</tr>
	<%
		}
		else if(maxcount3 > 0)
		{
			for (int i=0; i < maxcount3; i++)
			{
				dataset3.next();
	%>
	<tr>
		<td colspan=2 height=22 class=xl72 width=161 style='border-right:.5pt solid black;height:16.5pt;width:121pt'><%=dataset3.getParam("pgm_lrg").asString("") %></td>
		<td colspan=2 class=xl72 width=142 style='border-right:.5pt solid black;border-left:none;width:107pt'><%=dataset3.getParam("pgm_mrg").asString("") %></td>
		<td colspan=3 class=xl72 width=313 style='border-right:.5pt solid black;border-left:none;width:235pt'><%=dataset3.getParam("pgm_nm").asString("") %></td>
	</tr>
	<%
			}
		}
	%>
	<!-- 프로그램/인터페이스/작업정보 END -->
	<tr><td height="5" colspan="7"></td></tr>
	<!-- 원격정보 START -->
	<tr>
		<td colspan=7 class=xl69 width=616 style='border-right:.5pt solid black;'>원격정보</td>
	</tr>
	<% if(maxcount1 <= 0){ %>
	<tr>
		<td height=22 class=xl66 width=89 style='height:16.5pt;border-top:none;width:67pt'>원격프로그램</td>
		<td colspan=3 class=xl72 width=214 style='border-right:.5pt solid black;border-left:none;width:161pt'></td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;width:67pt'>접속정보</td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;width:168pt'></td>
	</tr>
	<tr>
		<td height=22 class=xl66 width=89 style='height:16.5pt;border-top:none;width:67pt'>원격 ID</td>
		<td colspan=3 class=xl72 width=214 style='border-right:.5pt solid black;border-left:none;width:161pt'></td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;width:67pt'>원격 PWD</td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;width:168pt'></td>
	</tr>
	<tr>
		<td align="center" bgcolor="#E1EDED" height="60">원격정보 비고</td>
		<td colspan=6 class=xl72 width=527 style='border-right:.5pt solid black;border-left:none;width:396pt'></td>
	</tr>
	<%
		}
		else if(maxcount1 > 0)
		{
			dataset1.next();
	%>
	<tr>
		<td height=22 class=xl66 width=89 style='height:16.5pt;border-top:none;width:67pt'>원격프로그램</td>
		<td colspan=3 class=xl72 width=214 style='border-right:.5pt solid black;border-left:none;width:161pt'><%=dataset1.getParam("rmt_pgm").asString("") %></td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;width:67pt'>접속정보</td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;width:168pt'><%=dataset1.getParam("cnet_inf").asString("") %></td>
	</tr>
	<tr>
		<td height=22 class=xl66 width=89 style='height:16.5pt;border-top:none;width:67pt'>원격 ID</td>
		<td colspan=3 class=xl72 width=214 style='border-right:.5pt solid black;border-left:none;width:161pt'><%=dataset1.getParam("rmt_id").asString("") %></td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;width:67pt'>원격 PWD</td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;width:168pt'><%=dataset1.getParam("rmt_pwd").asString("") %></td>
	</tr>
	<tr>
		<td height=60 class=xl66 width=89 style='height:45.0pt;border-top:none;width:67pt'>원격정보 비고</td>
		<td colspan=6 class=xl72 width=527 style='border-right:.5pt solid black;border-left:none;width:396pt'><%=dataset1.getParam("rmt_rmk").asString("") %></td>
	</tr>
	<%
			dataset1.first();
		}
	%>
	<!-- 원격정보 END -->
	<tr><td height="5" colspan="7"></td></tr>
	<!-- UCARE 정보 START -->
	<tr>
		<td colspan=7 class=xl69 width=616 style='border-right:.5pt solid black;'>UCARE 정보</td>
	</tr>
	<% if(maxcount1 <= 0){ %>
	<tr>
		<td height=60 class=xl66 width=89 style='height:45.0pt;border-top:none;width:67pt'>Ucare URL</td>
		<td colspan=6 class=xl72 width=527 style='border-right:.5pt solid black;border-left:none;width:396pt'></td>
	</tr>
	<tr>
		<td height=22 class=xl66 width=89 style='height:16.5pt;border-top:none;width:67pt'>Ucare ID</td>
		<td colspan=3 class=xl72 width=214 style='border-right:.5pt solid black;border-left:none;width:161pt'></td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;width:67pt'>Ucare PWD</td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;width:168pt'></td>
	</tr>
	<tr>
		<td height=60 class=xl66 width=89 style='height:45.0pt;border-top:none;width:67pt'>Ucare 비고</td>
	<td colspan=6 class=xl72 width=527 style='border-right:.5pt solid black;border-left:none;width:396pt'></td>
	</tr>
	
	<%
		}
		else if(maxcount1 > 0)
		{
			dataset1.next();
	%>
	<tr>
		<td height=60 class=xl66 width=89 style='height:45.0pt;border-top:none;width:67pt'>Ucare URL</td>
		<td colspan=6 class=xl72 width=527 style='border-right:.5pt solid black;border-left:none;width:396pt'><%=dataset1.getParam("ucare_url").asString("") %></td>
	</tr>
	<tr>
		<td height=22 class=xl66 width=89 style='height:16.5pt;border-top:none;width:67pt'>Ucare ID</td>
		<td colspan=3 class=xl72 width=214 style='border-right:.5pt solid black;border-left:none;width:161pt'><%=dataset1.getParam("ucare_id").asString("") %></td>
		<td class=xl66 width=89 style='border-top:none;border-left:none;width:67pt'>Ucare PWD</td>
		<td colspan=2 class=xl72 width=224 style='border-right:.5pt solid black;border-left:none;width:168pt'><%=dataset1.getParam("ucare_pwd").asString("") %></td>
	</tr>
	<tr>
		<td height=60 class=xl66 width=89 style='height:45.0pt;border-top:none;width:67pt'>Ucare 비고</td>
	<td colspan=6 class=xl72 width=527 style='border-right:.5pt solid black;border-left:none;width:396pt'><%=dataset1.getParam("ucare_rmk").asString("") %></td>
	</tr>
	<%	
		}
	%>
	<!-- UCARE 정보 END -->
</table> 

