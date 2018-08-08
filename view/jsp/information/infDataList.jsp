<!--
  PROJECT : INTRANET
  NAME    : infDataList.jsp
  DESC    : 자료실
  AUTHOR  : 박준규 과장
  VERSION : 1.0
  Copyright ⓒ 2012 Nexfron. All rights reserved.
  ============================================================================================
  							변		경		사		항
  ============================================================================================
  VERSION	   DATE		  	AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2012.04.04		박준규 		수정
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>자료실</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="/html/js/information/infDataList.js"></script>
</head>
<body class="mainbody" onLoad="init()">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<form name="fQuery" method="post" onsubmit="return false;">
	<input type="hidden" name="search" value="">
	<tr>
		<td>
			<table class="tblSearch" width="100%">
				<tr>
					<th width="80">검색조건</th>
					<td>
						<select name="searchType" class="combo_text" style="width:100">
							<option value="data_sbjt">자료제목</option>
							<option value="data_cont">자료내용</option>
							<option value="user_nm">등록자명</option>
							<option value="user_id">등록자ID</option>
							<option value="atch_file_nm">파일명</option>
						</select>
						<ucare:input type="text" name="searchText" width="200" maxsize="15" onKeyPress="pressEnter('queryList()')" />
					</td>
					<td class="rbtn"><ucare:imgbtn name="btnQuery" kind="R" onClick="queryList()"/></td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<form name="f" method="post">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="data_seq" value="">
	<input type="hidden" name="file_nm">
	<tr>
		<td>
			<table width="100%" cellpadding="0" cellspacing="0" border="0">
				<col width="640" />
				<col width="10px"/>
				<col width="" 	 />
				<tr>
					<td valign="top">
						<table width="640" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
							<tr>
								<td class="stitle">자료 리스트</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCINF216S" width="640" height="705">
										<tr event="O">
											<td width="180" column="data_sbjt" 		title="자료제목"	align="left"></td>
											<td width="201" column="atch_file_nm" 	title="파일명"		align="left"></td>
											<td width="120"	column="rg_nm_id" 		title="등록자"		align="center"></td>
											<td width="120" column="rg_dtm" 		title="등록일시"	align="center"></td>
											<td width="0"	column="rg_nm" 			title="등록자"		hidden="true"></td>
											<td width="0" 	column="data_seq" 		title="data_seq"	hidden="true"></td>
											<td width="0" 	column="mdf_nm" 		title="mdf_nm"		hidden="true"></td>
											<td width="0" 	column="mdf_dtm" 		title="mdf_dtm"		hidden="true"></td>
											<td width="0" 	column="data_cont" 		title="내용"		hidden="true"></td>

										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<td></td>
					<td valign="top">
						<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
							<tr>
								<td class="stitle">자료 상세정보</td>
							</tr>
							<tr>
								<td>
									<table class="tblData" width="100%">
										<col width="80"/>
										<col width="200"/>
										<col width="80"/>
										<col width=""/>
										<tr>
											<th>자료제목</td>
											<td colspan="3"><ucare:input type="text" name="data_sbjt" required="true" requirednm="자료제목" width="495" maxsize="100" /></td>
										</tr>
										<tr>
											<th>내용</td>
											<td colspan="3"><textarea name="data_cont" class="input_textarea_text"  style="width:495;height:590;ime-mode:active" maxlength="2000"></textarea></td>
										</tr>
										<tr>
											<th>파일</td>
											<td colspan="2"><iframe name="iUpload" height="25" width="300" src="/jsp/common/upload.jsp?folder_name=data&file_path=UPLOAD_PATH" frameborder="0"></iframe></td>
											<td >
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
											<th>등록자</td>
											<td><ucare:input type="text" name="rg_nm"  width="190" styleClass="input_transparent" readonly="true" tag="style=\"text-align:center\""/></td>
											<th>등록일시</td>
											<td><ucare:input type="text" name="rg_dtm" width="190" styleClass="input_transparent" readonly="true" tag="style=\"text-align:center\""/></td>
										</tr>
										<tr>
											<th>수정자</td>
											<td><ucare:input type="text" name="mdf_nm" width="190" styleClass="input_transparent" readonly="true" tag="style=\"text-align:center\""/></td>
											<th>수정일시</td>
											<td><ucare:input type="text" name="mdf_dtm" width="190" styleClass="input_transparent" readonly="true" tag="style=\"text-align:center\""/></td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td class="hmargin5"></td>
							</tr>
							<tr>
								<td align="right">
									<table class="tbl_button" border="0" cellpadding="0" cellspacing="0">
										<tr>
											<td><ucare:imgbtn name="btnAdd" 	kind="A" onClick="dataAdd()"	/></td>
											<td><ucare:imgbtn name="btnSave" 	kind="S" onClick="dataSave()"	/></td>
											<td><ucare:imgbtn name="btnDel" 	kind="D" onClick="dataDel()"	/></td>
										</tr>
									</table>
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