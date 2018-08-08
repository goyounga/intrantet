<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>메뉴그룹 관리</title>

<script language="javascript" src="/html/js/system/sysMenuGrpMng.js">
</script>
</head>
<body topmargin=0 leftmargin=5 onload="eventGrid();init();">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>
	
	<!-- 검색조건 S -->
	<form name="fQuery">
	<input type="hidden" name="corp_cd" />
	<input type="hidden" name="corp_nm" />
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width=80 align=right style="padding:2 0 0 0 ">메뉴 그룹명 :&nbsp;</td>
					<td width=100>
						<input type="text" name="menugroupnm" class="input_text" onKeyPress="checkKeyPress();" size=12>
					</td>
					<td>&nbsp;</td>
					<td width=1 bgcolor=#CCCCCC></td>
	 				<td width=80 align=center>
	 					<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="query()" /><!-- 조회 -->
	 				</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<!-- 검색조건 E -->
	
	<!-- 본문 S -->
	<form name="f">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="mnu_grp_id">
	<input type="hidden" name="corp_cd" />
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
			<col width="600"	/>
			<col width="25"		/>
			<col width="600"	/>
				<tr>
					<!-- 메뉴그룹 리스트 S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">메뉴그룹 리스트</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS041S" width="600" height="250" no="true">
										<tr event="O">
											<td width="282" column="mnu_grp_nm"	title="권한명"	align="left"	length="20"></td>
											<td width="140" column="rg_nm"		title="등록자"	align="center"></td>
											<td width="140" column="rg_dt"		title="등록일"	align="center" 	format="DATE"></td>
											<td width="140" column="rg_dtm"		title="등록일"	align="center" 	hidden="true"></td>
											<td width="140" column="mdf_nm"		title="수정자"	align="center"	hidden="true"></td>
											<td width="140" column="mdf_dtm"	title="수정일"	align="center" 	hidden="true"></td>
											<td width="140" column="mnu_grp_id"	title="메뉴그룹" align="center" 	hidden="true"></td>
											<td width="140" column="mnu_grp_desc"	title="메뉴그룹" align="center" 	hidden="true"></td>
											<td width="140" column="corp_cd"	title="corp_cd"	 align="center" 	hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- 메뉴그룹 리스트 E -->
					<td></td>
					<!-- 메뉴그룹 정보 S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">메뉴그룹 정보</td>
							</tr>
							<tr>
								<td>
									<table width="600" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td>
												<ucare:table id="" type="detail" width="600">
												<col  width="100"	/>
												<col  width="500"	/>
													<tr>
														<td class="MANTDT">메뉴 그룹명</td>
														<td class="MANTDM">
															<input type="text" class="input_required" name="mnu_grp_nm" maxlength="25" style="width:499;">	
														</td>
													</tr>
													<tr>
														<td class="MANTDT">설명</td>
														<td class="MANTDM">
															<textarea class="input_text" name="mnu_grp_desc" maxlength="300" style="width:499;height:95"></textarea>
														</td>
													</tr>
													<tr>
														<td class="MANTDT">등록자</td>
														<td class="MANTDM">									
															<input type="text" name="rg_nm" class="input_readonly" readonly style="width:150;">
														</td>
													</tr>
													<tr>
														<td class=MANTDT>등록 일시</td>
														<td class="MANTDM">									
															<input type="text" name="rg_dtm" class="input_readonly" readonly style="width:150;" format="DATET">
														</td>
													</tr>
													<tr>
														<td class=MANTDT>수정자</td>
														<td class="MANTDM">
															<input type="text" name="mdf_nm" class="input_readonly" readonly style="width:150;">
														</td>
													</tr>
													<tr>
														<td class=MANTDT>수정 일시</td>
														<td class="MANTDM">
															<input type="text" name="mdf_dtm" class="input_readonly" readonly style="width:150;" format="DATET">
														</td>
													</tr>
												</ucare:table>
											</td>
										</tr>
										<tr>
											<td height="5"></td>
										</tr>
										<tr>
											<td align="right">
												<ucare:imgbtn name="btnAdd"  kind="A"  width="70" onClick="add()" /><!-- 등록 -->
												<ucare:imgbtn name="btnSave" kind="S"  width="70" onClick="save()" /><!-- 저장 -->
												<ucare:imgbtn name="btnDel"  kind="D"  width="70" onClick="del()" /><!-- 삭제 -->
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
					<!-- 메뉴그룹 정보 E -->
				</tr>
				</form>
				
				<form name="f2">
				<input type="hidden" name="mnu_grp_id">
				<input type="hidden" name="corp_cd">
				<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
				<tr>
					<!-- 권한 부여 가능한 메뉴 리스트 S -->
					<td>
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">권한 부여 가능한 메뉴 리스트</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS045S" width="600" height="440" no="true">
										<tr event="O">
											<td width="40" column="mnuid_chk" 	title="선택" 		align="center" format="CHECKBOX" hcheckbox="true" editable="true"></td>
											<td width="400" column="mnu_nm" 	title="메뉴명" 		align="left"	length="30"></td>
											<td width="120" column="mnu_id" 	title="메뉴ID" 		align="center"	name="menuid"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- 권한 부여 가능한 메뉴 리스트 E -->
					<td align="center">
						<span class="prev" onclick="prevMenu()"></span><br>
						<span class="next" onclick="nextMenu()"></span>
					</td>
					<!-- 권한 부여 된 메뉴 리스트 S -->
					<td>
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">권한 부여 된 메뉴 리스트</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS046S" width="600" height="440" no="true">
										<tr event="O">
											<td  width="40" column="mnuid_chk" title="선택" format="CHECKBOX" hcheckbox="true" editable="true"></td>
											<td width="400" column="mnu_nm" title="메뉴명" align="left"></td>
											<td width="120" column="mnu_id" title="메뉴ID" align="center"></td>
											<!--
											<td width="40" column="read_auth_f" title="읽기" align="center"></td>
											<td width="40" column="wrt_auth_f" title="쓰기" align="center"></td>
											-->
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- 권한 부여 된 메뉴 리스트 E -->
				</tr>
				</form>
			</table>
		</td>
	</tr>
	<!-- 본문 E -->
</table>

</body>
</html>