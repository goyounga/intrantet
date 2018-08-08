<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<%
	request.setCharacterEncoding("EUC-KR");
	String frm = request.getParameter("frm");
%>
<html>
<head>
<title>업체검색</title>
<script language="javascript" src="/html/js/common/comCorpSearch.js"></script>
</head>
<body topmargin="0" leftmargin="0" onload="init();">

<form name="fQuery">
<input type="hidden" name="frm" value="<%=frm%>"	/>
<table cellpadding="0" cellspacing="0" border="0" width="610">
	<tr>
 		<td>
 			<table width="610" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="ptitle">업체 검색</td>
 				</tr>
 			</table>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td><ucare:xtitle title="업체 검색"/></td>
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
											<td width="80" align="right" style="padding:2 0 0 0 ">업체명 :&nbsp;</td>
											<td width="400">
												<input type="text" name="corp_nm_s" class="input_text" width="80" onKeyPress="checkKeyPress();">
											</td>
											<td width="1" bgcolor="#CCCCCC"></td>
							 				<td width="80" align="center">
							 					<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="queryList()" /><!-- 조회 -->
							 				</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<input type="hidden" class="input" name="corp_cd">
							<input type="hidden" class="input" name="corp_nm">
							<tr>
								<td>
									<ucare:grid id="UCSYS114S" width="600" height="370" no="true">
										<tr event="B">
											<td width="0"		column="corp_cd" 	title="업체코드"	hidden="true"></td>
											<td width="200" 	column="corp_nm" 	title="업체명" 		align="left"></td>
											<td width="150" 	column="tel_no1" 	title="전화번호1"	align="center" format="TEL"></td>
											<td width="210" 	column="adr1" 		title="주소1"		align="left"></td>
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