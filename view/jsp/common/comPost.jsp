<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<%
	request.setCharacterEncoding("EUC-KR");
	String frm = request.getParameter("frm");
%>
<html>
<head>
<title>우편번호검색</title>
<script language="javascript" src="/html/js/common/comPost.js"></script>
</head>
<body topmargin="0" leftmargin="0" onload="init();">

<form name="fQuery">
<input type="hidden" name="frm" value="<%=frm%>"	/>
<table cellpadding="0" cellspacing="0" border="0" width="610">
	<tr>
 		<td>
 			<table width="610" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="ptitle">우편번호 검색</td>
 				</tr>
 			</table>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td><ucare:xtitle title="우편번호 검색"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td>
			<table width="610" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td width="5"></td>
					<td>
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td>
									<ucare:table type="query" width="590">
										<tr>
											<td width="80" align="right" style="padding:2 0 0 0 ">주소 :&nbsp;</td>
											<td width="400">
												<input type="text" name="address_s" class="input_text" width="80" onKeyPress="checkKeyPress();" />(동,읍,면)
											</td>
											<td width="1" bgcolor="#CCCCCC"></td>
											<td width="80" align="center">
												<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="queryList()" /><!-- 조회 -->
											</td>
										</tr>
									</ucare:table>
								</td>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td>
									<table width="600" cellpadding="0" cellspacing="0" border="0">
									<input type="hidden" class="input" name="post">
									<input type="hidden" class="input" name="address">
										<td>
											<ucare:grid id="UCCOM011S" width="600" height="360" no="true">
												<tr event="B">
													<td width="145" column="post"		title="우편번호"	align="center"	format="POST"></td>
													<td width="411" column="address"	title="주소"		align="left"></td>
												</tr>
											</ucare:grid>
										</td>
									</table>			
								</td>
							</tr>
						</table>
					</td>
					<td width="5"></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td>
			<table width="600" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td align="right">
						<ucare:imgbtn width="70" name="btnAdd" value="적용"	onClick="postApply()"/>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>
</body>
</html>