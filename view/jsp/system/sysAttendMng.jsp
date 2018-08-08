<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>상담원 근태정보 관리</title>

<script language="javascript" src="/html/js/system/sysAttendMng.js">
</script>
</head>
<body topmargin="0" leftmargin="5" onload="init();">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="상담원 근태정보 관리"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<!-- 조회조건 S -->
	<form name="fQuery">
	<input type="hidden" name="corp_cd" />
	<input type="hidden" name="corp_nm" />
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width="80" align=right style="padding:2 0 0 0 ">기준일자 :&nbsp;</td>
					<td width="210">						
						<input type=text class=input_readonly rmode="Y,Y,Y" rclear="N" name=startdt size=10 readonly required=true title="게시기간"  pattern="D" format="DATE" value="<%=CUtil.getMyDate(-1, "yyyy-MM-dd") %>"><span class=calendar onclick="return ifrmCal.service(fQuery.startdt, 'pop')"></span>&nbsp; 
						~
						<input type=text class=input_readonly rmode="Y,Y,Y" rclear="N" name=enddt size=10 readonly required=true title="게시기간"  pattern="D" format="DATE" value="<%=CUtil.getMyDate(0, "yyyy-MM-dd") %>"><span class=calendar onclick="return ifrmCal.service(fQuery.enddt, 'pop')"></span>		
					</td>
					<td width="80" align=right>상담원 :&nbsp;</td>
					<td width="210">
						<input type="text" name="user_id" readOnly class="input_text" onKeyPress="pressEnter('quer()')" style="width:80;">
						<input type="text" name="user_nm" class="input_text" onKeyPress="checkEnterKey();" style="width:80;">
						<span class="search" onClick="openUserOrg(fQuery)"></span>
						<span class="minus" onClick="del_userID();"></span>
					</td>
					<td width="80" align=right>조직 :&nbsp;</td>
					<td width="210">
						<select name="up_org_cd" class="combo_text" onChange="makeOrgCombo(this.form, this, fQuery.corp_cd.value)" style="width:100">
							<option value="">전체</option>
						</select>
						<select name="org_cd1" style="width:100" class="combo_text">
							<option value="">전체</option>
						</select>
					</td>
					<td width="80" align=right>근태구분 :&nbsp;</td>
					<td width="100">
						<ucare:select name="workcd" option="4" brcode="SYS005" width="100" styleClass="combo_text"/>
					</td>
					<td>&nbsp;</td>
					<td width="1" bgcolor=#CCCCCC></td>
	 				<td width="80" align=center>
	 					<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="query()" /><!-- 조회 -->
	 				</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<!-- 조회조건 E -->
	
	<!-- 본문 S -->
	<form name="f">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="today" value="<%=CUtil.getMyDate(0, "yyyy-MM-dd") %>">
	<input type="hidden" name="corp_cd" />
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
			<col width="800"	/>
			<col width="25"		/>
			<col width="400"	/>
				<tr>
					<!-- 근태리스트 S -->
					<td>
						<table width="800" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">상담원 근태 리스트</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS051S" width="800" height="670" no="true">
										<tr event="O">
											<td width="154" column="org_nm"		title="조직"		align="center"></td>
											<td width="146" column="user_id"	title="상담원 ID"	align="center"></td>
											<td width="154" column="user_nm"	title="상담원 성명" align="center"></td>
											<td width="154" column="work_nm"	title="근태구분"	align="center"></td>
											<td width="154" column="work_dt"	title="근태일"		align="center"	format="DATE"></td>
											<td width="154" column="up_org_cd"	title="up_org_cd"	align="center"	hidden="true"></td>
											<td width="154" column="org_cd1"	title="org_cd1"		align="center"	hidden="true"></td>
											<td width="154" column="loi_tm"		title="loi_tm"		align="center"	hidden="true"></td>
											<td width="154" column="lot_tm"		title="lot_tm"		align="center"	hidden="true"></td>
											<td width="154" column="rg_nm"		title="rg_nm"		align="center"	hidden="true"></td>
											<td width="154" column="rg_dt"		title="rg_dt"		align="center"	hidden="true"></td>
											<td width="154" column="rg_tm"		title="rg_tm"		align="center"	hidden="true"></td>
											<td width="154" column="mdf_nm"		title="mdf_nm"		align="center"	hidden="true"></td>
											<td width="154" column="mdf_dt"		title="mdf_dt"		align="center"	hidden="true"></td>
											<td width="154" column="mdf_tm"		title="mdf_tm"		align="center"	hidden="true"></td>
											<td width="154" column="work_rmk"	title="work_rmk"	align="center"	hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- 근태리스트 E -->
					<td></td>
					<!-- 근태상세정보 S -->
					<td valign="top">
						<table width="400" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">상세정보</td>
							</tr>
							<tr>
								<td>
									<ucare:table id="" type="detail" width="400">
										<tr>
											<td class="MANTDT" width=120>상담원 ID</td>
											<td class="MANTDM">
												<input type="text" name="user_id" readonly class="input_required" style="width:130;">
												<span id="selectUser" style="display:none" class="search" name="searchUser" onClick="openUserOrg(f)"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">상담원 성명</td>
											<td class="MANTDM">
												<input type="text" name="user_nm" readonly class="input_required" style="width:130;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">조직</td>
											<td class="MANTDM">
												<select name="up_org_cd" class="combo_text" onChange="makeOrgCombo(this.form, this, fQuery.corp_cd.value)" style="width:100">
													<option value="">전체</option>
												</select>
												<select name="org_cd1" style="width:100" class="combo_text">
													<option value="">전체</option>
												</select>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">근태일</td>
											<td class="MANTDM">
												<input type=text class=input_required readonly rmode="Y,Y,Y" rclear="N" name="work_dt" required=true title="근태일"  pattern="D" format="DATE" value="" style="width:130">
												&nbsp<span id="workdate" style="display:none" class=calendar onclick="return top.ifrmCal.service(f.work_dt)"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">근태구분</td>
											<td class="MANTDM">
												<ucare:select name="work_cd" option="4" brcode="SYS005" width="130" styleClass="combo_required"/>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">로그인 시간</td>
											<td class="MANTDM">
												<input type="text" name="loi_tm" maxlength="6" readOnly class="input_readonly" style="width:130;" format="TIME">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">로그아웃 시간</td>
											<td class="MANTDM">
												<input type="text" name="lot_tm" maxlength="6" readOnly class="input_readonly" style="width:130;" format="TIME">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">등록자</td>
											<td class="MANTDM">
												<input type="text" name="rg_nm" readonly class="input_readonly" style="width:130;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">등록일자</td>
											<td class="MANTDM">
												<input type="text" name="rg_dt" readonly class="input_readonly" style="width:130;" format="DATE">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">등록시간</td>
											<td class="MANTDM">
												<input type="text" name="rg_tm" readonly class="input_readonly" style="width:130;" format="TIME">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">수정자</td>
											<td class="MANTDM">
												<input type="text" name="mdf_nm" readonly class="input_readonly" style="width:130;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">수정일자</td>
											<td class="MANTDM">
												<input type="text" name="mdf_dt" readonly class="input_readonly" style="width:130;" format="DATE">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">수정시간</td>
											<td class="MANTDM">
												<input type="text" name="mdf_tm" readonly class="input_readonly" style="width:130;" format="TIME">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">비고</td>
											<td class="MANTDM">
												<textarea name="work_rmk" maxlength="500" class="input_text" style="width:263;height:150"></textarea>
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
									<ucare:imgbtn name="btnAdd"		kind="A"   width="70" onClick="add()" /><!-- 등록 -->
									<ucare:imgbtn name="btnSave"	kind="S"   width="70" onClick="save()" /><!-- 저장 -->
									<ucare:imgbtn name="btnDel"		kind="D"   width="70" onClick="del()" /><!-- 삭제 -->
								</td>
							</tr>
						</table>
					</td>
					<!-- 근태상세정보 E -->
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- 본문 E -->
</table>

</body>
</html>