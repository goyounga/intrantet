<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>  
<html>
<head>
<title>메뉴 관리</title>

<script language="javascript" src="<%=scriptPath%>/js/system/sysMenuMng.js"></script>
</head>
<body topmargin="0" leftmargin="5" onload="eventGrid();init()">

<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>
	
	<!-- 검색조건 S -->
	<form name="fQuery">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width=80 align=right style="padding:2 0 0 0 ">메뉴 이름 :&nbsp;</td>
					<td width=100>
						<input type="text" name="menunm" class="input_text" size=12 onKeyPress="pressEnter('query()')">
					</td>
					<td width=80 align=right style="padding:2 0 0 0 ">메뉴 ID :&nbsp;</td>
					<td width=100>
						<input type="text" name="menuid" class="input_text" size=12 onKeyPress="pressEnter('query()')">
					</td>
					<td>&nbsp;</td>
					<td width=1 bgcolor=#CCCCCC></td>
	 				<td width=80 align=center>
	 					<ucare:imgbtn name="btnQuery"	kind="R"	onClick="query()" /><!-- 조회 -->
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
	<form name="f">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="step">
	<input type="hidden" name="menudel">
	<input type="hidden" name="orgmenuid">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="500"	/>
				<col width="25"		/>
				<col width="700"	/>
				<tr>
					<!-- 트리 S -->
					<td valign="top">
						<table width="500" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td>
									<table width="500" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td class="stitle">메뉴 구성</td>
											<td align="right">
												<ucare:imgbtn name="downXML" value="서버 적용"  onClick="setMenu()" />
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS031S" width="500" height="705" tree="true">
						            	<tr class="LIST" event="O">
						                	<td  width="480" column="menunm" image="doc" format="TREE" action="true"></td>
						                </tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- 트리 E -->
					
					<td></td>
					
					<!-- 상세정보 S -->
					<td valign="top">
						<table width="500" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">메뉴 상세정보</td>
							</tr>
							<tr>
								<td>
									<ucare:table id="uc1" type="detail" width="700">
									<col width="120"	/>
									<col width=""		/>
										<tr>
											<td class="MANTDT">상위메뉴 ID</td>
											<td class="MANTDM">
												<input type="text" name="upmnu_id"  class="input_required" style="width:170;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">상위메뉴명</td>
											<td class="MANTDM">
												<input type="text" name="upmnu_nm"  class="input_required" style="width:569;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">메뉴 ID</td>
											<td class="MANTDM">
												<input type="text" 		name="fst_id" 	maxlength="3" 	class="input_required" 		required="true" 	requirednm="메뉴 ID" 	onChange="menuIdMarge()" style="width:83;">
												<input type="text" 		name="lst_id" 	maxlength="3" 	class="input_required" 		required="true" 	requirednm="메뉴 ID" 	onChange="menuIdMarge()" style="width:83;">
												<input type="hidden" 	name="mnu_id" 	maxlength="6" 	class="input_required"  	required="false" 	requirednm="메뉴 ID" 	readonly	style="width:100;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">메뉴명</td>
											<td class="MANTDM">
												<input type="text" name="mnu_nm" maxlength="25" class="input_required" required="true" requirednm="메뉴 이름" style="width:569;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">화면 위치</td>
											<td class="MANTDM">
												<select name="urlType" class="combo_required" onChange="selectURL()"  >
													<option value="">== 선택 ==</option>
													<option value="PATH">PATH</option>
													<option value="LINK">LINK</option>
												</select>
												<input type="text" name="sr_url" maxlength="50" class="input_required" required="true" requirednm="화면 위치" style="width:483;">
												<!--
												<span class="search" onClick="openFileDir()"></span>
												-->
											</td>
										</tr>
										<tr>
											<td class="MANTDT">화면 형태</td>
											<td class="MANTDM">
												<ucare:select name="sr_frm_cd"  option="4" brcode="SYS004" width="83" styleClass="combo_text" onChange="selectType()" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT">팝업화면 폭</td>
											<td class="MANTDM">
												<input type="text" maxlength="5" name="pup_sr_wth" class="input_number"  style="width:170;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">팝업화면 높이</td>
											<td class="MANTDM">
												<input type="text" maxlength="5" name="pup_sr_hgt" class="input_number"  style="width:170;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">팝업 X좌표</td>
											<td class="MANTDM">
												<input type="text" maxlength="5" name="pup_x_cdt" class="input_number"  style="width:170;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">팝업 Y좌표</td>
											<td class="MANTDM">
												<input type="text" maxlength="5" name="pup_y_cdt" class="input_number"  style="width:170;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">정렬 순서</td>
											<td class="MANTDM">
												<input type="text" maxlength="3" name="lup_ord" class="input_number" style="width:170;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">설 명</td>
											<td class="MANTDM">
												<textarea name="mnu_desc" maxlength="500" class="input_text" style="width:569;height:180"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">등록자</td>
											<td class="MANTDM">
												<input type="text" name="rg_idnm" class="input_readonly"	readonly	 style="width:170;" required="false" requirednm="등록자">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">등록 일시</td>
											<td class="MANTDM">
												<input type="text" name="rg_dtm" class="input_readonly"	readonly	 format="DATET" style="width:170;" required="false" requirednm="등록자">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">수정자</td>
											<td class="MANTDM">
												<input type="text" name="mdf_idnm" class="input_readonly"	readonly	 style="width:170;" required="false" requirednm="등록자">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">수정 일시</td>
											<td class="MANTDM">
												<input type="text" name="mdf_dtm" class="input_readonly"	readonly	 format="DATET" style="width:170;" required="false" requirednm="등록자">
											</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
							<tr>					
								<td>
									<table width="700" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td align="left">
												<ucare:imgbtn name="btnHAdd" 	value="상위메뉴 등록"  	onClick="hAdd()"/>
												<ucare:imgbtn name="btnLAdd" 	value="하위메뉴 등록"  	onClick="lAdd()"/>
											</td>
											<td align="right">
												<ucare:imgbtn name="btnMod" 	value="수정"		onClick="mod()" />
												<ucare:imgbtn name="btnSave" 	kind="S"		onClick="save()"/><!-- 저장 -->
												<ucare:imgbtn name="btnDel" 	kind="D"	 	onClick="del()" /><!-- 삭제 -->
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td align="right">
									<ucare:table type="border" cellspacing="0">
										<tr>
											<td colspan="4"><iframe name=ifmMenu src="/jsp/common/blank.jsp"  style="height:100" scrolling="no" frameborder="0" ></iframe></td>
										</tr>
									</ucare:table>
								</td>
							</tr>
						</table>
					</td>
					<!-- 상세정보 E -->
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- 본문 E -->
</table>

</body>
</html>