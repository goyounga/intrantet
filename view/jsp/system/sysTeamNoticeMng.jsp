<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>파트공지사항 관리</title>
<script language="javascript" src="/html/js/system/sysTeamNoticeMng.js"></script>
</script>
</head>
<body topmargin=0 leftmargin=5 onload="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td  colspan="3"><ucare:xtitle title="파트공지사항 관리"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<!-- 조회조건 S -->
	<form name="fQuery" method="post">
	<input type="hidden" name="corp_cd" />
	<input type="hidden" name="corp_nm" />
	<tr>
		<td colspan="3">
			<ucare:table type="query" width="1215">
				<tr>
					<td align="right" width="100">게시기간 :&nbsp;</td>
					<td width="210">
						<input type="text" readonly class="input_readonly" name="startdt" size=10  pattern="D" value="<%=CUtil.getMyDate(-1, "yyyy-MM-dd")%>">
						<span class=calendar onClick="return ifrmCal.service(fQuery.startdt,'pop')"></span>&nbsp; 
						~
						<input type=text readonly class="input_readonly" name="enddt" size=10  pattern="D" value="<%=CUtil.getMyDate(0, "yyyy-MM-dd")%>">
						<span class=calendar onClick="return ifrmCal.service(fQuery.enddt,'pop')"></span>
					</td>
					<td width="80" align=right style="padding:2 0 0 0 ">제 목 :&nbsp;</td>
					<td width="100"><input type="text" name="ntce_sbjt" class="input_text" size=30 onKeyPress="checkEnterKey();"></td>
					<td width="80" align=right style="padding:2 0 0 0 ">작성자 :&nbsp;</td>
					<td width="100"><input type="text" name="reg_nm" class="input_text" size=20 onKeyPress="checkEnterKey();"></td>
					<td>&nbsp;</td>
					<td width="1" bgcolor=#CCCCCC></td>
	 				<td width="80" align=center>
	 					<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="team_ntce_query()" /><!-- 조회 -->
	 				</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<!-- 조회조건 E -->
	
	<tr>
		<td height="5"></td>
	</tr>
	
	<!-- 본문 S -->
	<form name="f" method="post">
	<input type="hidden"	name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden"	name="team_ntce_id" value="">
	<input type="hidden"	name="atch_file_nm" value="">
	<input type="hidden"	name="corp_cd" />
	<tr>
		<td>
			<table border=0 cellspacing=0 cellpadding=0>
				<tr>
					<td class="stitle">파트공지사항</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="UCSYS120S" width="680" height="720" no="true">
							<tr event="O">
								<td width="50" 	column="ntce_tp_nm"		title="구분"		align="center"/>
								<td width="212" column="ntce_sbjt"		title="제  목"		align="left"	length="35" />					
								<td width="80"  column="anc_st_dt"		title="게시 시작일"	align="center"	format="DATE" />
								<td width="80"  column="anc_end_dt"		title="게시 종료일"	align="center"	format="DATE" />
								<td width="60"  column="qry_cnt"		title="조회수"		align="center"/>
								<td width="80"  column="rg_name"		title="작성자"		align="center"/>
								<td width="80"  column="rg_dt"			title="작성일자"	align="center"	format="DATE" />
								<td width="80"  column="filenm"			title="filenm"	 	align="center"	hidden="true" />
								<td width="80"  column="corp_cd"		title="corp_cd"	 	align="center"	hidden="true" />
								<td width="80"  column="corp_nm"		title="corp_nm"	 	align="center"	hidden="true" />
								<td width="80"  column="rg_dtm"			title="rg_dtm"	 	align="center"	hidden="true" />
								<td width="80"  column="rg_nm"			title="rg_nm"	 	align="center"	hidden="true" />
								<td width="80"  column="mdf_dtm"		title="mdf_dtm"	 	align="center"	hidden="true" />
								<td width="80"  column="mdf_nm"			title="mdf_nm"	 	align="center"	hidden="true" />
								<td width="80"  column="ntce_txt"		title="ntce_txt"	align="center"	hidden="true" />
								<td width="80"  column="ntce_tp_cd"		title="ntce_tp_cd"	align="center"	hidden="true" />
								<td width="80"  column="team_ntce_id"	title="team_ntce_id"	align="center"	hidden="true" />
							</tr>
						</ucare:grid>
					</td>
				</tr>
			</table>
		</td>
		<td width="10">
		</td>
		<td>
			<table width="530" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td valign="top">
						<table width="530" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">상세정보</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="530">
										<col width="60"	/>
										<col width="205"/>
										<col width="60"	/>
										<col width="205"/>
										<tr>
											<td class="MANTDT" >제 목</td>
											<td class="MANTDM" colspan="3">
												<input type="text" class="input_required" name="ntce_sbjt" maxlength="100" style="width:465;" required="true" requirednm="제목">	
											</td>
										</tr>
										<tr>
											<td class="MANTDT">게시기간</td>
											<td class="MANTDM">					
												<input type=text class="input_readonly" rmode="Y,Y,Y" rclear="N" name="anc_st_dt" readonly required=true requirednm="게시 기간"  pattern="D" format="DATE" value="" style="width:70;"><span class=calendar onclick="return top.ifrmCal.service(f.anc_st_dt)"></span>
												~
												<input type=text class="input_readonly" rmode="Y,Y,Y" rclear="N" name="anc_end_dt" readonly required=true requirednm="게시 기간"  pattern="D" format="DATE" value="" style="width:70;"><span class=calendar onclick="return top.ifrmCal.service(f.anc_end_dt)"></span>	
											</td>
											<td class="MANTDT">게시구분</td>
											<td class="MANTDM">
												<ucare:select name="ntce_tp_cd" option="4" brcode="SYS003" code="code" codename="codenm" width="200" styleClass="combo_required" tag="required='true' requirednm='게시구분'" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT">내 용</td>
											<td class="MANTDM" colspan="3">
												<textarea class="input_textarea" name="ntce_txt" style="width:465;height:260" requirednm="내용"></textarea>
												<SCRIPT language=javascript>
													function editor(){
													//onload시에 도 edit프레임이 생기지 않으므로 onload시에 여기부터 호출해서 다 생신 후 init2를 호출해 초기화를 한다. 
														if(editor_generate('ntce_txt')){
															//init2();	
														}
													}
												</SCRIPT>
											</td>
										</tr>
										
										<tr style="display:none">
											
											<td class="MANTDT">파일첨부</td>
											<td class="MANTDM" colspan="3">
												<div style="display:" id="file_up">
												<iframe name="iUpload" height="25" width="450" src="/jsp/common/upload.jsp?file_path=UPLOAD_PATH" frameborder="0"></iframe>						
												<iframe name="fRemove" height="0" width="0%" src="/jsp/common/blank.jsp" frameborder="0"></iframe>	
												</div>
												<div style="display:none" id="file_down">
												<label width ="200" style="cursor:hand" onClick="openFile()"><font color=blue id=filenm></font></label>&nbsp; <ucare:imgbtn type="btn60" name="btnSave" width="70" value="파일삭제" onClick="delFile(this)"/>
												</div>				
											</td>
										</tr>
										<tr>
											<td class="MANTDT">등 록 자</td>
											<td class="MANTDM" id="rg_nm">&nbsp;</td>
											<td class="MANTDT">등록일시</td>
											<td class="MANTDM" id="rg_dtm" format="DATET">&nbsp;</td>
										</tr>
										<tr>
											<td class="MANTDT">수 정 자</td>
											<td class="MANTDM" id="mdf_nm">&nbsp;</td>
											<td class="MANTDT">수정일시</td>
											<td class="MANTDM" id="mdf_dtm" format="DATET">&nbsp;</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn name="btnAdd"  	kind="A"  width="70" 	onClick="add()"/><!-- 등록 -->
									<ucare:imgbtn name="btnSave"  	kind="S"  width="70" 	onClick="save()"/><!-- 저장 -->
									<ucare:imgbtn name="btnDel"  	kind="D"  width="70" 	onClick="del()"/><!-- 삭제 -->
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td valign="top">
						<table width="530" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">열람조직 추가</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="530">
										<tr>
											<td class="MANTDT"  align=right>조직 :&nbsp;</td>
											<td class="MANTDM">
												<select name="up_org_cd" class="combo_text" onChange="makeOrgCombo(this.form, this, fQuery.corp_cd.value)" style="width:100">
													<option value="">전체</option>
												</select>
												<select name="org_cd1" style="width:100" class="combo_text">
													<option value="">전체</option>
												</select>
												&nbsp;&nbsp;<ucare:imgbtn name="selectUser"	value="대상추가"  	width="70" 	onClick="addTeam()"/>	
											</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td valign="top">
						<table width="530" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">열람 조직</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS121S" width="530" height="160" no="true">
										<tr event="O">
											<td  width="40" column="selected" 		title="선택"			format="CHECKBOX" hcheckbox="true" editable="true"></td>
											<td width="212" column="team_nm1" 		title="팀" 				align="center"	required="true" requirednm="부서"	></td>
											<td width="240" column="team_nm2"		title="부서"			align="center"	required="true" requirednm="부서"	></td>
											<td width="240" column="team_cd"		title="team_cd"			hidden="true"></td>
											<td width="240" column="insp_obj_seq"	title="insp_obj_seq"	hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn name="btnTargetDel"	value="대상제외"  	width="70" 	onClick="targetDel()"/>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<!-- 본문 E -->
	</form>
</table>
</body>
</html>