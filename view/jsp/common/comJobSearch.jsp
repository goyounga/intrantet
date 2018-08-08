<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<%
	request.setCharacterEncoding("EUC-KR");
	String frm = request.getParameter("frm");
%>
<html>
<head>
<title>직업조회</title>
<script language="javascript" src="/html/js/common/comJobSearch.js"></script>
</head>
<body topmargin="0" leftmargin="0" onload="init();">

<form name="fQuery">
<input type="hidden" name="frm" value="<%=frm%>"	/>
<table cellpadding="0" cellspacing="0" border="0" width="610">
	<tr>
 		<td>
 			<table width="610" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="ptitle">직업 조회</td>
 				</tr>
 			</table>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td><ucare:xtitle title="직업 조회"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td>
			<table width="610" cellpadding="0" cellspacing="0" border="0">
				<col width="5"	/>
				<col width="600"	/>
				<col width="5"	/>
				<tr>
					<td></td>
					<td>
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td>
									<ucare:table type="query" width="590">
										<tr>
											<td width="80" align="right" style="padding:2 0 0 0 ">직업 :&nbsp;</td>
											<td width="400">
												<ucare:select name="etc2" option="4" brcode="CST028" width="300" styleClass="combo_text" onChange="chngJob()"/>
											</td>
											<td width="1" bgcolor="#CCCCCC" rowspan="2"></td>
							 				<td width="80" align="center"  rowspan="2">
							 					<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="queryList()" /><!-- 조회 -->
							 				</td>
										</tr>
										<tr>
											<td width="80" align="right" style="padding:2 0 0 0 ">직업명칭 :&nbsp;</td>
											<td width="400">
												<input type="text" name="code_nm" class="input" style="width:300" onKeyPress="checkKeyPress();">
											</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td>
									<input type="hidden" name="job_cd">
									<input type="hidden" name="job_cd_nm">
									<ucare:grid id="SEARCH_JOB" width="600" height="330" no="true">
										<tr event="B">
											<td width="100"		column="job_cd" 		title="코드"		align="left"></td>
											<td width="340" 	column="job_cd_nm" 	title="직업명칭" 	align="left"></td>
											<td width="115" 	column="etc1" 		title="위험등급"	align="center"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<td></td>
				</tr>
			</table>		
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td align="right">
			<ucare:imgbtn width="70" name="btnAdd" value="적용"	onClick="corpApply()"/>
		</td>
	</tr>
</table>
</form>

</body>
</html>