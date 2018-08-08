<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>고객항목 관리</title>
	<script language="javascript" src="/html/js/system/sysClntItmMng.js"></script>
</head>
<body onLoad="init()">

<table width="1225" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td>
			<ucare:xtitle title="고객항목 관리"/>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<!-- 업체명 검색 S-->
	<form name="fQuery">
	<input type="hidden" name="corp_cd">
	<input type="hidden" name="corp_nm">
 	<tr>
		<td>
			<ucare:table type="query" width="1216">
				<tr>
					<td>
						<table border='0' cellpadding="0" cellspacing="0" >
							<tr>
								<td width="100" align="right">업체명 : &nbsp;</td>
								<td>
									<input type="text" name="corp_nm_s" class="input_readonly" style="width:150" onKeyPress="Search_Press()" readOnly />
								</td>
								<td width="1000">
									&nbsp;<span class="search" onClick="openConsType()"></span><!-- 업체명 검색 버튼(팝업)-->
								</td>
								<td width="1"	bgcolor="#CCCCCC"></td>
								<td width="80"	align="right">
									<ucare:imgbtn width="70" name="btnQuery"	kind="R"	 onClick="queryList()"/><!-- 조회 -->
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<!-- 업체명 검색 E-->
	<tr>
		<td height="5"></td>
	</tr>
		<!-- 본문 S -->
	<form name="f">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>" />
	<tr>
		<td>
			<table border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td>
						<table border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="stitle">추가할 고객항목</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS115S" width="600" height="700" no="true">
										<tr class="LIST" event="O" >
											<td width="30"	column="selected"	title="선택"	format="CHECKBOX" hcheckbox="true" editable="true"></td>
											<td width="303" column="itm_nm" 	title="항목명"></td>
											<td width="230" column="itm_id"		title="항목ID"></td>
											<td width="230" column="corp_cd"	title="업체코드" hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>						
					<td>
						<span class="next" onclick="fieldMOVE('UCSYS115S','UCSYS116S');"></span><br><br>
						<span class="prev" onclick="fieldMOVE('UCSYS116S','UCSYS115S');"></span>&nbsp;
					</td>
					<td>
						<table border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="stitle">추가된 고객항목</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS116S" width="600" height="700" no="true">
										<tr class="LIST" event="O" >
											<td width="30"	column="selected"	title="선택"	format="CHECKBOX" hcheckbox="true" editable="true"></td>
											<td width="303" column="itm_nm" 	title="항목명"></td>
											<td width="230" column="itm_id"		title="항목ID"></td>
											<td width="230" column="corp_cd"	title="업체코드" hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>	
			<!-- 본문 E -->	
			<!-- 버튼 S -->	
			<ucare:table type="border" width="1224">
				<tr>
					<td height="5"></td>
				</tr>
				<tr>
					<td align="right">
						<ucare:table type="border">
							<tr>
								<td align="right">
									<ucare:imgbtn width="70" name="btnSave" kind="S"   onClick="saveClnt()"/>	<!-- 저장 -->
								</td>
							</tr>
							<tr>
								<td height="10"></td>
							</tr>
						</ucare:table>
					</td>					
				</tr>
			</ucare:table>
			<!-- 버튼 E -->	
		</td>
	</tr>
	</form>
</table>
</body>
</html>