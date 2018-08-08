<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>Ucare Help 카테고리 관리</title>
	<script language="javascript" src="/html/js/system/sysUcareHelpCtgr.js"></script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="Ucare Help 카테고리 관리"/></td>
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
					<td width="80" align="right">언어유형 :&nbsp;</td>
					<td width="220">
						<ucare:select name="lang_tp_cd"  option="4" brcode="UCR001" code="code" codename="codenm"  width="150" styleClass="combo_required" />
					</td>
					<td width="80" align="right">검색조건 : &nbsp;</td>
					<td width="300">
						<select name="searchType" class="combo_text">
							<option value=""> == 선택 == </option>
							<option value="CTGR_NM">카테고리명</option>
							<option value="CTGR_DESC">카테고리설명</option>
						</select>
						<input type=text class="input_text" name="searchText" size=15 onkeyup="return(isEnterKey()? queryList():false);" >
					</td>
					<td width="80" align="right">&nbsp;</td>
					<td width="500">
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
	<input type="hidden" name="help_ctgr_seq" value="">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="600" />
				<col width="25" />
				<col width="600" />
				<tr>
					<!-- 카테고리 리스트 S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">카테고리 리스트</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS300S" width="600" height="680" no="false">
										<tr event="O">
											<td width="50" column="help_ctgr_seq" 	title="help_ctgr_seq" hidden="true"></td>
											<td width="50" column="lang_tp_cd" 	title="lang_tp_cd" hidden="true"></td>
											<td width="100" column="ctgr_nm" 	title="카테고리"></td>
											<td width="260" column="ctgr_desc" 	title="카테고리설명"></td>
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
					<!-- 카테고리 리스트 E -->
					<td></td>
					<!-- 카테고리 상세정보 S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">카테고리 상세정보</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="600">
										<tr>
											<td class="MANTDT" width="100">언어 유형</td>
											<td class="MANTDM" width="500" colspan="3">
												<ucare:select name="lang_tp_cd" option="4" brcode="UCR001" code="code" codename="codenm" width="150" styleClass="combo_required" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT">카테고리명</td>
											<td class="MANTDM" colspan="3">
												<input type=text class="input_required" name="ctgr_nm" required="true" requirednm="카테고리명" style="width:502;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="100">설명</td>
											<td class="MANTDM" width="390" colspan="3">
												<textarea class="input_required" name="ctgr_desc" style="width:502;height:180;"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">사용여부</td>
											<td class="MANTDM" colspan="3">
												<ucare:select name="use_f"  option="4" brcode="COM002" code="code" codename="codenm"  width="150" styleClass="combo_required" />
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
									<ucare:imgbtn width="70" name="btnAdd"		kind="A"	onClick="ctgrAdd()"/><!-- 등록 -->
									<ucare:imgbtn width="70" name="btnSave"		kind="S"	onClick="ctgrSave()"/><!-- 저장 -->
									<ucare:imgbtn width="70" name="btnDel"		kind="D"	onClick="ctgrDel()"/><!-- 삭제 -->
								</td>
							</tr>
						</table>
					</td>
					<!-- 카테고리 상세정보 E -->
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- 본문 E -->
</table>
</body>
</html>