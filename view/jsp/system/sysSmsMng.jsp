<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>  
<html>
<head>
	<title>SMS유형 관리</title>
	<script language="javascript" src="/html/js/system/sysSmsMng.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 5;">

<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="SMS유형 관리"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	
	<!-- 검색 -->
	<form name="fQuery" method="post">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<col width="80"	/>
				<col width="120"/>
				<col width="80"	/>
				<col width="120"/>
				<col width="80"	/>
				<col width=""	/>
				<col width="1"	/>
				<col width="60"	/>
				<tr>
					<td align=right> 코드명 :&nbsp;</td>					
					<td>
						<input type=text class=input_text name="codenm" size=20 required=false onKeyPress="checkEnterKey();">
					</td>					
					<td align=right> 대분류코드 :&nbsp;</td>
					<td>
						<input type=text class=input_text name="uppercd" size=20 required=false onKeyPress="checkEnterKey();">
					</td>					
					<td align=right> 사용여부 : &nbsp</td>
					<td>
						<ucare:select code="code" brcode="COM001" name="useyn" codename="codenm" option="10" width="100" styleClass="combo_text"/>
					</td>
					<td bgcolor=#CCCCCC></td>
					<td width="80"align=center>
						<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="search()" /><!-- 조회 -->
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	
	<!-- 본문  -->
	<form name="f" method="post" target="iLog">
 	<input type="hidden" name="codeReload" value="<%=CIni.getString("CODEBOOK_RELOAD")%>">
	<input type="hidden" name="SERVER1" value="<%=CIni.getString("SERVER1")%>">
	<input type="hidden" name="SERVER2" value="<%=CIni.getString("SERVER2")%>">
	<input type="hidden" name="DB_SERVICEMODE" value="<%=ucare.jaf.common.CIni.getParam("DB_SERVICEMODE").asString("")%>">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="500"/>
				<col width="25"	/>
				<col width="700"/>
				<tr>
					<!-- 트리 -->
					<td valign="top">
		
						<table width="500" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">SMS유형</td>
							</tr>
							<tr>
								<td>
		
									<ucare:grid id="UCSYS004S" width="500" height="700" tree="true">
										<tr class="LIST" event="O">
											<td  width="480" column="codev" image="doc" format="TREE" action="true"></td>
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
								<td class="stitle">SMS유형 정보</td>
							</tr>
							<tr>
								<td>
									
									<table width="700" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td>
		
												<ucare:table type="detail" width="700">
													<tr>
														<td class="MANTDT" width="100">분류</td>
														<td class="MANTDM">
															<ucare:select name="step" brcode="SYS001" code="code" codename="codenm" option="4" width="130" styleClass="combo_disabled"/>							
														</td>
													</tr>
													<tr>
														<td class="MANTDT">SMS유형코드(대)</td>
														<td class="MANTDM">
															<input type=text class=input_required name="uppercd" style="width:130;" maxlength="10" required="true" requirednm="상세코드" onChange="codeChange(this.value)">
															<input type=text class=input_required name=orguppercd  size=0 style="display:none">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">SMS유형코드(소)</td>
														<td class="MANTDM">
															<input type=text class=input_required name="tpcd" style="width:130;" maxlength="10" required="true" requirednm="코드" onChange="codeChange(this.value)">
															<input type=text class=input_required name=orgcode size=0 style="display:none">
															<ucare:imgbtn width="90" name="btnCdDupChk" value="코드중복체크"  		onClick="codeDupChk()"/>
														</td>
													</tr>
													<tr>
														<td class="MANTDT">SMS유형코드명</td>
														<td class="MANTDM">
															<input type=text class=input_required name="codenm" style="width:565;" maxlength="10" required="true" requirednm="코드명">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">SMS유형내용</td>
														<td class="MANTDM">
															<input type=text class=input_text name="smscodetxt" maxlength="80" style="width:565;" required="false">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">정렬</td>
														<td class="MANTDM">
															<input type=text class=input_required_number name="lupord" format="NUMBER" style="width:130;"  maxlength="3" onchange="sortNum()" format="NUMBER">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">사용여부</td>
														<td class="MANTDM">
															<ucare:select name="useyn" brcode="COM001" code="useyn" codename="codenm" option="4" styleClass="combo_required" width="130" tag="required='true' requirednm='사용여부'"/>
														</td>
													</tr>
													<tr>
														<td class="MANTDT">등록자</td>
														<td class="MANTDM">
															<input type=text class=input_readonly name="rg_nm" maxlength="30" style="width:130;"">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">등록일자</td>
														<td class="MANTDM">
															<input type=text class=input_readonly name="rg_dt" maxlength="30" style="width:130;" format="DATE">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">등록시간</td>
														<td class="MANTDM">
															<input type=text class=input_readonly name="rg_tm" maxlength="30" style="width:130;" format="TIME">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">수정자</td>
														<td class="MANTDM">
															<input type=text class=input_readonly name="mdf_nm" maxlength="30" style="width:130;">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">수정일자</td>
														<td class="MANTDM">
															<input type=text class=input_readonly name="mdf_dt" maxlength="30" style="width:130;" format="DATE">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">수정시간</td>
														<td class="MANTDM">
															<input type=text class=input_readonly name="mdf_tm" maxlength="30" style="width:130;" format="TIME">
														</td>
													</tr>
												</ucare:table>
		
											</td>
										</tr>
										<tr height="5">
											<td></td>
										</tr>
										<tr>
											<td>
												
												<table width="700" cellpadding="0" cellspacing="0" border="0">
													<col width="375"	/>
													<col width="300"	/>
													<tr>
														<td align="left">
															<ucare:imgbtn width="90" name="btnheightAdd"	value="대분류등록"  	onClick="heightAdd()"/>
															<ucare:imgbtn width="90" name="btnLowAdd"		value="소분류등록"  	onClick="lowAdd()"/>
															<ucare:imgbtn width="70" name="btnMod"			value="수정"  			onClick="codeMod()"/>
														</td>
														<td align="right">
															<ucare:imgbtn width="70" name="btnSave" kind="S"	onClick="save()"/>
															<ucare:imgbtn width="70" name="btnDel"	kind="D"   	onClick="del()"/>
														</td>
													</tr>
													<tr>
														<td colspan="2">
															<iframe name="ifmCode" src="/jsp/common/blank.jsp" style="height:10" scrolling="no" frameborder="0" ></iframe>
														</td>
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
			</table>

		</td>
	</tr>
	</form>

</table>
</body>
</html>