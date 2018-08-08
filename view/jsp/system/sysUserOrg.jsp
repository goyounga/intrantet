<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<%
	String memo = request.getParameter("memo");
	String ntce_id = CUtil.nvl(request.getParameter("ntce_id"));
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>사용자 조직도</title>
<script language="javascript" src="/html/js/system/sysUserOrg.js"></script>
</head>
<body topmargin=0 leftmargin=0 onload="init();" onUnLoad="unLoad();">
<form name="f">
<input type="hidden" name="memo" value="<%=memo%>">
<input type="hidden" name="ntce_id" value="<%=ntce_id%>">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="use_f" value="Y"><!-- 조직 사용중인것만 가져오기위해 -->
<input type="hidden" name="org_cd">
<input type="hidden" name="search">
<input type="hidden" name="corp_cd" />
<input type="hidden" name="corp_nm" />
<!-- 
<input type="hidden" name="memoUser">
<input type="hidden" name="code">
<input type="hidden" name="nm_code">
<input type="hidden" name="step">
<input type="hidden" name="userArr">
<input type="hidden" name="userNMArr">
<input type="hidden" name="codeArr">
<input type="hidden" name="loginip">
<input type="hidden" name="loginyn">
 -->
<table width="800" cellpadding="0" cellspacing="0" border="0">
	<tr>
 		<td>
 			<table width="800" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="ptitle">사용자 조직도</td>
 				</tr>
 			</table>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td><ucare:xtitle title="사용자 조직도"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td>
			<table width="800" cellpadding="0" cellspacing="0" border="0">
			<col width="5"/>
			<col width="200"/>
			<col width="10"/>
			<col width="585"/>
				<tr>
					<td></td>
					
					<!-- 조직도 S -->
					<td valign="top">
						<table width="200" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">조직도</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS021S" width="212" height="470" tree="true">
										<tr event="O">
											<td  width="195" column="orgnm" image="doc" format="TREE" action="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- 조직도 E -->
					
					<td></td>
					
					<!-- 사용자리스트 S -->
					<td valign="top">
						<table width="570" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">사용자 리스트</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="query" width="560">
										<tr>
											<td width="90">
												<select name="searchtype" class="frm_select" style="width:85">
													<option value="">== 선택 ==</option>
													<option value="user_id">사용자 ID</option>
													<option value="user_nm">성명</option>
												</select>
											</td>
											<td width="100">
												<input type="text" name="searchstr" class="frm_text" onKeyPress="checkEnterKey()" style="width:95">
											</td>
											<td>&nbsp;</td>
											<td width="1" bgcolor=#CCCCCC></td>
											<td width="80" align=center>
												<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="userQuery()" /><!-- 조회 -->
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
									<ucare:grid id="UCSYS022S" width="570" height="410" no="true">
										<tr event="O">
											<td width="30"	column="user_chk"		title="SEQ"			alugn="center" format="CHECKBOX" hcheckbox="true" editable="true"></td>
											<td width="120"	column="user_nm"		title="성명"		align="center"></td>
											<td width="120"	column="user_id"		title="사용자 ID"	align="center"></td>
											<td width="150"	column="org_nm"			title="조직"		align="center"></td>
											<td width="113"	column="grd_nm"			title="등급"		align="left"></td>
											<td width="120"	column="org_cd"			title="org_cd"		hidden="true"></td>
											<td width="120"	column="max_seq"		title="max_seq"		hidden="true"></td>
											<td width="120"	column="loi_ip"			title="loi_ip"		hidden="true"></td>
											<td width="120"	column="userid"			title="userid"		hidden="true"></td>
											<td width="120"	column="corp_cd"		title="userid"		hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn name="btnSave"  kind="Z"  width="70" onClick="save()" /><!-- 적용 -->
									<ucare:imgbtn name="btnClose" kind="X"  width="70" onClick="unLoad();" /><!-- 닫기 -->
								</td>
							</tr>
						</table>
					</td>
					<!-- 사용자리스트 E -->
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>

</body>
</html>