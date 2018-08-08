<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>상담유형 관리</title>

<script language="javascript" src="/html/js/system/sysConsTypeMng.js">
</script>
</head>
<body topmargin=0 leftmargin=5 onload="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="상담유형 관리"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	
	<form name="fQuery" method="post">
	<input type="hidden" name="corp_cd">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width=100 align=right style="padding:1 0 0 0 ">상담유형명 :&nbsp;</td>
					<td width=70>
						<input type="text" name="cnsl_tp_nm" class="input_text" size=11 onKeyPress="checkEnterKey();" required="false">
					</td>
					<td width=100 align=right style="padding:1 0 0 0 ">상담유형코드 :&nbsp;</td>
					<td width=70>
						<input type="text" name="cnsl_tp_cd" class="input_text" size=11 onKeyPress="checkEnterKey();" required="false">
					</td>
					<td width=100 align=right style="padding:1 0 0 0 ">사용여부 :&nbsp;</td>
					<td width=70>
						<ucare:select name="use_f" brcode="COM001" code="code" codename="codenm" option="10" styleClass="combo_text"/>
					</td>
					<td>&nbsp;</td>
					<td width=1 bgcolor=#CCCCCC></td>
	 				<td width=80 align=center>
	 					<!-- <ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="makeTree()"/> --><!-- 조회 -->
	 					<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="queryList()"/><!-- 조회 -->
	 				</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	
	<form name="f" method="post">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
			<col width="500"	/>
			<col width="25"		/>
			<col width="700"	/>
				<tr>
					<!-- 트리 -->
					<td valign="top">
						<table width="500" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">상담유형 구성</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS011S" width="500" height="700"	no="true">
										<tr event="O">
											<td width="0"	column="cnsl_tp_cd"		title="상담유형코드"	hidden="true"	></td>
											<td width="0"	column="curtpcd"		title="curtpcd"			hidden="true"	></td>
											<td width="0"	column="up_tp_cd"		title="상위유형코드"	hidden="true"	></td>
											<td width="0"	column="cnsl_tp_nm"		title="CNSL_TP_NM"		hidden="true"	></td>
											<td width="0"	column="up_tp_nm"		title="UP_TP_NM"		hidden="true"	></td>
											<td width="140"	column="lrg_nm"			title="대분류"			align="left"	></td>
											<td width="130"	column="mdm_nm"			title="중분류"			align="left"	></td>
											<td width="130"	column="smll_nm"		title="소분류"			align="left"	></td>
											<td width="60"	column="use_f"			title="사용여부"		align="center"	></td>
											<td width="0"	column="lup_ord"		title="순번"			hidden="true"	></td>
											<td width="0"	column="step"			title="STEP"			hidden="true"	></td>
											<td width="0"	column="rg_dt"			title="RG_DT"			hidden="true"	></td>
											<td width="0"	column="rg_tm"			title="RG_TM"			hidden="true"	></td>
											<td width="0"	column="rg_nm"			title="RG_NM"			hidden="true"	></td>
											<td width="0"	column="mdf_dt"			title="MDF_DT"			hidden="true"	></td>
											<td width="0"	column="mdf_tm"			title="MDF_TM"			hidden="true"	></td>
											<td width="0"	column="mdf_nm"			title="MDF_NM"			hidden="true"	></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					
					<!-- 공백 -->
					<td></td>
					
					<!-- 상세정보 -->
					<td valign="top">
						<table width="700" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">상담유형 정보</td>
							</tr>
							<tr>
								<td>
									<table width="700" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td>
												<ucare:table type="detail" width="700">
													<col width="150" />
													<col width="200" />
													<col width="150" />
													<col width="200" />
													<tr>
														<td class="MANTDT">코드 구분</td>
														<td class="MANTDM" colspan="3">
															<ucare:select name="step" brcode="SYS002" code="code"  codename="codenm" option="4" tag="required='true' requirednm='코드구분' disabled='true'" width="194" styleClass="combo_disabled"/>
														</td>
													</tr>
													<tr>
														<td class="MANTDT">상위 코드</td>
														<td class="MANTDM" colspan="3">
															<input type="text" name="up_tp_cd" class="input_readonly" style="width:194;" maxlength="10" required="true" requirednm="상위코드" disabled="true">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">상위 상담유형명</td>
														<td class="MANTDM" colspan="3">
															<input type="text" name="up_tp_nm" class="input_readonly" style="width:549;" maxlength="100" required="true" requirednm="상담유형명" disabled="true">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">상담유형코드</td>
														<td class="MANTDM" colspan="3">
															<input type="text" name="cnsl_tp_cd" maxlength="10" class="input_required" style="width:194;" onChange="codeChange()">
															<input type="hidden" name="curtpcd">
															<ucare:imgbtn name="btnDupChk" value="중복체크"  width="70" onClick="dubCheck()" />
														</td>
													</tr>
													<tr>
														<td class="MANTDT">상담유형명</td>
														<td class="MANTDM" colspan="3">
															<input type="text" name="cnsl_tp_nm" maxlength="100" class="input_required" style="width:549;" required="true" requirednm="상담유형명">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">사용여부</td>
														<td class="MANTDM">
															<ucare:select name="use_f" brcode="COM001" code="code" codename="codenm" option="4" width="194"  tag="required='true' requirednm='사용여부'" styleClass="combo_required"/>
														</td>
														<td class="MANTDT">정렬 순서</td>
														<td class="MANTDM">
															<input type="text" name="lup_ord" maxlength="3" class="input_required_number" style="width:194;" format="NUMBER" requirednm="정렬순서">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">등록자</td>
														<td class="MANTDM">
															<input type="text" name="rg_nm" class="input_readonly" style="width:194;" required="false" requirednm="등록자" disabled="true">
														</td>
														<td class="MANTDT">수정자</td>
														<td class="MANTDM">
															<input type="text" name="mdf_nm" class="input_readonly" style="width:194;" required="false" requirednm="수정자" disabled="true">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">등록일</td>
														<td class="MANTDM">
															<input type="text" name="rg_dt" class="input_readonly" style="width:194;" format="DATE" required="false" requirednm="등록일" disabled="true">
														</td>
														<td class="MANTDT">수정일</td>
														<td class="MANTDM">
															<input type="text" name="mdf_dt" class="input_readonly" style="width:194;" format="DATE" required="false" requirednm="수정일" disabled="true">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">등록시간</td>
														<td class="MANTDM">
															<input type="text" name="rg_tm" class="input_readonly" style="width:194;" format="TIME" required="false" requirednm="등록시간" disabled="true">
														</td>
														<td class="MANTDT">수정시간</td>
														<td class="MANTDM">
															<input type="text" name="mdf_tm" class="input_readonly" style="width:194;" format="TIME" required="false" requirednm="수정시간" disabled="true">
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
												<table border=0 cellpadding=0 cellspacing=0 width="100%">
													<td align=left>
														<ucare:imgbtn name="btnHAdd" value="대분류등록"  width="90" onClick="hAdd()" />
														<ucare:imgbtn name="btnMAdd" value="중분류등록"  width="90" onClick="mAdd()" />
														<ucare:imgbtn name="btnLAdd" value="소분류등록"  width="90" onClick="lAdd()" />
													</td>	
													<td align=right>
														<ucare:imgbtn name="btnSave"	kind="S"	width="70" onClick="save()" /><!-- 저장 -->
														<ucare:imgbtn name="btnDel"		kind="D"	width="70" onClick="del()" /><!-- 삭제 -->
													</td>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td class="stitle">일괄등록</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS015S" width="700" height="345" no="true" crud="true">
										<tr event="O,H">
											<td width="150"	column="cnsl_tp_cd1"		title="상담유형코드"	align="left"	length="10"		editable="true"></td>
											<td width="215"	column="cnsl_tp_nm1"		title="상담유형명"		align="left"	length="100"	editable="true"></td>
											<td width="150"	column="up_tp_cd1"		title="상위유형코드"	align="left"	length="10"		editable="true"></td>
											<td width="60"	column="use_f1"			title="사용여부"		align="center"	length="3"		editable="true"></td>
											<td width="50"	column="lup_ord1"		title="순번"			align="right"	length="3"		editable="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td>
									<table border=0 cellpadding=0 cellspacing=0 width="100%">
										<td align=left>
											<ucare:imgbtn name="btnExcelImp"	value="불러오기"	width="90" onClick="excelImport()" />
											<ucare:imgbtn name="btnClear"		value="CLEAR"		width="90" onClick="wgclear(UCSYS015S)" />
											<ucare:imgbtn name="btnRowAdd"		value="줄추가"		width="90" onClick="rowAdd()" />
											<ucare:imgbtn name="btnRowDel"		value="줄삭제"		width="90" onClick="rowDel()" />
										</td>	
										<td align=right>
											<ucare:imgbtn name="btnAply"	kind="Z"	width="70" onClick="ExcelSave()" /><!-- 저장 -->
										</td>
									</table>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td>
									<font color="red" style="font-weight:bold;">※</font>&nbsp; <b>*.CSV</b>, <b>*.TXT</b>&nbsp;파일만 그리드적용이 됩니다.<br />
									<font color="red" style="font-weight:bold;">※ 변환방법 : </font>EXCEL작성후 다른이름으로 저장 -&gt; "<b>CSV (쉼표로 분리)</b>" 또는 "<b>텍스트 (탭으로 분리)</b>"를 선택하고 저장<br />
									<font color="red" style="font-weight:bold;">※ 다운로드 : </font><a href="./cnsl_sample.zip" target="_NEW">SAMPLE FILE</a>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
</table>

</body>
</html>