<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>Ucare Example</title>
	<script language="javascript" src="/html/js/ucareprogram/ucrUcareEx.js"></script>
	<script language="javascript">
	_editor_url = "/screditor/";
	_userid = "<%=sessioninfo.getUserID()%>";
	UPLOAD_IMG_PATH = "UPLOAD_IMG_PATH";
	UPLOAD_FOLDER_NAME = "";
	</script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>

	<!-- 검색조건 S -->
	<form	name="fQuery" method="post">
	<input type="hidden" name="search" value="">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width="80" align="right">검색조건 :&nbsp;</td>
					<td width="300">
						<select name="searchType" class="combo_text">
							<option value=""> == 선택 == </option>
							<option value="EX_NM">예제명</option>
							<option value="EX_CONT">예제내용</option>
						</select>
						<input type=text class="input_text" name="searchText" size=30 onkeyup="return(isEnterKey()? queryList():false);" >
					</td>
					<td width="80" align="right">&nbsp;</td>
					<td width="800">
					</td>
					<td width="1" bgcolor=#CCCCCC></td>
					<td width="80" align="right">
						<ucare:imgbtn name="btnQuery"	value="조회"	 onClick="queryList()"/><!-- 조회 -->
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<!-- 검색조건 E -->

	<tr>
		<td height="5"></td>
	</tr>

	<!-- 본문 S -->
	<form name="f" method="post">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="ex_seq" value="">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="600" />
				<col width="25" />
				<col width="600" />
				<tr>
					<!-- Example 리스트 S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">Example 리스트</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCUCR303S" width="600" height="720" no="false">
										<tr event="O">
											<td width="50" column="ex_seq" 		title="ex_seq" hidden="true"></td>
											<td width="380" column="ex_nm" 		title="예제명"></td>
											<td width="260" column="ex_cont" 	title="예제내용" hidden="true"></td>
											<td width="80" column="rg_nm" 		title="등록자"		align="center"></td>
											<td width="120" column="rg_dtm" 	title="등록일시"	align="center"></td>
											<td width="60" 	column="mdf_nm" 	title="mdf_nm"		align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_dtm" 	title="mdf_dtm"		align="center"  hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- Example 리스트 E -->
					<td></td>
					<!-- Example 상세정보 S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">Example 상세정보</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="600">
										<tr>
											<td class="MANTDT">예제명</td>
											<td class="MANTDM" colspan="3">
												<input type=text class="input_required" name="ex_nm" required="true" requirednm="예제명" style="width:502;" maxlength="100">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">예제내용</td>
											<td class="MANTDM" colspan="3">
												<textarea class="input_required" name="ex_cont" style="width:502;height:560;"></textarea>
												<SCRIPT language=javascript>
													function editor()
													{
														//onload시에 edit프레임이 생기지 않으므로 onload 시 여기부터 호출해서 다 생신 후 init2를 호출해 초기화를 한다.
														if(editor_generate('ex_cont'))
														{
															init2();
														}
													}
												</SCRIPT>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">등록자</td>
											<td class="MANTDM" width="200">
												<input type=text class=input_readonly readonly name="rg_nm" style="width:197;">
											</td>
											<td class="MANTDT" width="100">등록일시</td>
											<td class="MANTDM" width="200">
												<input type=text class=input_readonly readonly name="rg_dtm" style="width:197;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">수정자</td>
											<td class="MANTDM">
												<input type=text class=input_readonly readonly name="mdf_nm" style="width:197;">
											</td>
											<td class="MANTDT">수정일시</td>
											<td class="MANTDM">
												<input type=text class=input_readonly readonly name="mdf_dtm" style="width:197;">
											</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
							<tr>
								<td height="10"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn name="btnAdd"		value="등록"	onClick="exAdd()"/><!-- 등록 -->
									<ucare:imgbtn name="btnSave"		value="저장"	onClick="exSave()"/><!-- 저장 -->
									<ucare:imgbtn name="btnDel"		value="삭제"	onClick="exDel()"/><!-- 삭제 -->
								</td>
							</tr>
						</table>
					</td>
					<!-- Example 상세정보 E -->
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- 본문 E -->
</table>
</body>
</html>