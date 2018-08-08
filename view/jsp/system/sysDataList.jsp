<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>자료실</title>
	<script language="javascript" src="/html/js/system/sysDataList.js"></script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="자료실"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>

	<!-- 검색조건 S -->
	<form	name="fQuery" method="post">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width="80" align="right">검색조건 : &nbsp;</td>
					<td width="200">
						<select name="searchType" class="combo_text">
							<option value=""> == 선택 == </option>
							<option value="B.USER_ID">등록자ID</option>
							<option value="B.USER_NM">등록자명</option>
							<option value="A.DATA_SBJT">제목</option>
							<option value="A.ATCH_FILE_NM">파일명</option>
						</select>
						<input type=text class="input_text" name="searchText" size=15 onkeyup="return(isEnterKey()? queryList():false);" >
					</td>
					<td width="80" align="right">&nbsp;</td>
					<td width="800">
					</td>
					<td width="1" bgcolor=#CCCCCC></td>
					<td width="80" align="right">
						<ucare:imgbtn width="70" name="btnQuery"	kind="R"	 onClick="queryList()"/><!-- 조회 -->
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
	<input type="hidden" name="data_seq" value="">
	<input type="hidden" name="file_nm">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="600" />
				<col width="25" />
				<col width="600" />
				<tr>
					<!-- 자료 리스트 S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">자료 리스트</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS216S" width="600" height="680" no="false">
										<tr event="O">
											<td width="50" column="data_seq" 	title="data_seq" hidden="true"></td>
											<td width="160" column="data_sbjt" 	title="자료제목"></td>
											<td width="200" column="atch_file_nm" 	title="파일명"></td>
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
					<!-- 자료 리스트 E -->
					<td></td>
					<!-- 자료 정보 S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">자료 상세정보</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="600">
										<tr>
											<td class="MANTDT">자료제목</td>
											<td class="MANTDM" colspan="3">
												<input type=text class="input_required" name="data_sbjt" required="true" requirednm="자료제목" style="width:502;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="100">파일</td>
											<td class="MANTDM" width="245" colspan="2">
												<iframe name="iUpload" height="25" width="245" src="/jsp/common/upload.jsp?file_path=UPLOAD_PATH" frameborder="0"></iframe>
											</td>
											<td class="MANTDM">
												<span id="file_span" style="display:none;">
													<span width ="100" style="cursor:hand" onClick="openFile()">
														<font color="blue" id=atch_file_nm></font>
													</span>&nbsp;
													<span style="cursor:hand" onClick="delFile()">
														<font color="red"><B>x</B></font>
													</span>
												</span>
												<span id="nbsp_span">&nbsp;</span>
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
									<ucare:imgbtn width="70" name="btnAdd"		kind="A"	onClick="dataAdd()"/><!-- 등록 -->
									<ucare:imgbtn width="70" name="btnSave"		kind="S"	onClick="dataSave()"/><!-- 저장 -->
									<ucare:imgbtn width="70" name="btnDel"		kind="D"	onClick="dataDel()"/><!-- 삭제 -->
								</td>
							</tr>
						</table>
					</td>
					<!-- 자료 정보 E -->
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- 본문 E -->
</table>
</body>
</html>