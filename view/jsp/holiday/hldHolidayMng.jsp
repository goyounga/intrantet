<!--
  PROJ : Nexfron Intranet
  NAME : hldHolidayMng.jsp
  DESC : 휴가 관리 화면
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.14		김은수		주석추가
  -->
  
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>휴가 관리</title>
<script language="javascript" src="/html/js/holiday/hldHolidayMng.js"></script>
</head>
<body onLoad="on_Load();">
<table border=0 cellpadding=1 cellspacing=1 id=tblList width="1217">
 	<tr><td height="5"></td></tr>	
 	<tr>
		<td>
			<form name="fQuery" method="post">
				<ucare:table type="query" width="1215">
					<tr>
						<td width="80" align="right">차감여부 :&nbsp;</td>
						<td width="130" id="stateTd">
							<ucare:select name="q_ddct_f_cd" brcode="HLD001" code="code" codename="codenm" option="4" width="125" styleClass="input_select"/>
						</td>
						<td width="120" align=right>휴가종류명 :&nbsp;</td>
						<td>
							<input type="text" class="frm_text" name="q_hldy_knd_nm" style="width:170" onkeyup="return(isEnterKey()? on_Search():false);">
						</td>
						<td>&nbsp;</td>
						<td width=1 bgcolor=#CCCCCC></td>
		 				<td width=180 align="center">
		 					<ucare:imgbtn name="btnQuery" value="조회"   onClick="on_Search()"/>&nbsp;
		 					<ucare:imgbtn name="btnInit"  value="초기화" onClick="on_Init()"/>
		 				</td>
		 			</tr>
				</ucare:table>
			</form>
		</td>
	</tr>
	<tr>
		<td valign="top">
			<form name="f" method="post">
				<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
				
				<ucare:table type="border">
					<tr>
						<td class="stitle">휴가 종류 관리</td>
					</tr>
				</ucare:table>
				<table border=0 cellpadding=0 cellspacing=0>
					<tr>
						<td align="right">
							<ucare:grid id="UCHLD010S" width="1225" height="200" no="true" crud="true">
								<tr class="LIST" event="O">
									<td width="35" 	column="chk"			title="선택" 				align="center" format="CHECKBOX" editable="true" sortable="false"></td>
									<td width="250"	column="hldy_knd_nm"	title="휴가종류명"			align="left" editable="true"></td>
									<td width="60"	column="hf_hldy_f_cd"	title="반휴여부"			align="right" format="COMBO" brcode="COM002" editable="true"></td>
									<td width="60"	column="hldy_dy"		title="휴가일수"			align="right" editable="true"></td>
									<td width="200" column="ddct_f_cd"		title="휴가일수차감여부" 	align="center" format="COMBO" brcode="HLD001" editable="true"></td>
									<td width="40" column="hldy_ord"		title="순서" 				align="center" format="NUMBER" editable="true"></td>
									
									<td width="0"	column="hldy_knd_seq"	hidden="true"></td>
								</tr>
							</ucare:grid>
						</td>
					</tr>
					<tr><td height="5"></td></tr>
					<tr>
						<td align="right">
							<ucare:imgbtn name="btnAdd" value="추가" onClick="fn_HolidayKindAdd()"/>
							<ucare:imgbtn name="btnSave1" value="저장" onClick="fn_HolidayKindSave()"/>
							<ucare:imgbtn name="btnDelete" value="삭제" onClick="fn_HolidayKindDelete()"/>
						</td>
					</tr>
				</table>
			</form>
		</td>
	</tr>
	<tr>
		<td align="top">
			<form name="f1" method="post" onsubmit="return false">
			<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
			<input type="hidden" name="q_userid">
			<input type="hidden" name="q_usernm">
			<input type="hidden" name="q_today" value="<%=CDateUtil.getYear()%>">
			
			<table border=0 cellpadding=0 cellspacing=0>
				<tr>
					<td align="top">
						<table border=0 cellpadding=0 cellspacing=0 width="100%" background='/images/common/tabbg.gif'>
							<tr>
								<td width="100%" height="30"><font class='stitle'><b>사용자 검색</td>
							</tr>
						</table>
						<ucare:table  type="query" width="550" >
							<tr>
								<td>
						 			<table border=0 cellpadding=0 cellspacing=0 >
						 				<tr>
											<td width="50" align=right>년도 :&nbsp;</td>
											<td>
												<!--<select name="q_bse_y" style="width:70" class="combo_required" required="true" requirednm="년도"></select>-->
												<ucare:select name="q_bse_y" brcode="HLD002" code="code" codename="codenm" option="5" width="80" styleClass="combo_required"/>
											</td>
											<td width=75 align=right>검색조건 :&nbsp;</td>
											<td>
												<select name="searchType" class="frm_select" style="width:80" >
													<option value="usernm">사용자명</option>
													<option value="userid">아이디</option>
												</select>
												<input type=text class=frm_text name="searchText" style="width:90px" onkeyup="return(isEnterKey()? on_UserSearch():false);">
											</td>
										</tr>
									</table>
								</td>
								<td width=1 bgcolor=#CCCCCC></td>
								<td width=80 align="center" ><ucare:imgbtn name="btnQuery" value="조회"  width="70"   onClick="on_UserSearch();"/></td>
				 			</tr>
				 		</ucare:table>
						<table border=0 cellpadding=0 cellspacing=0>
				 			<tr><td height="5"></td></tr>
				 		</table>
						<ucare:grid id="UCHLD011S" width="560" height="440" no="true" crud="true">
							<tr event="">
								<td width="50" 	column="chk" 			title="선택" 		align="center" format="CHECKBOX" hcheckbox="true" editable="true" sortable="false"></td>
						    	<td width="100" column="user_nm" 		title="사용자명" 	align="center"></td>
						    	<td width="100" column="user_id" 		title="아이디" 		align="center"></td>
						    	<td width="0" column="bse_y" 		title="bse_y" 		hidden="true"></td>
						  	</tr>
						</ucare:grid>
					</td>
					<td align="center" width="25"><br><br><br><br>
						<div class=move01 onclick="moveData(UCHLD011S, UCHLD012S)"></div>
						<span style="height:1px"></span>
						<div class=move02 onclick="moveData(UCHLD012S, UCHLD011S)"></div>
					</td>
					<td>
						<table border=0 cellpadding=0 cellspacing=0 width="100%" background='/images/common/tabbg.gif'>
							<tr>
								<td width="100%" height="30"><font class='stitle'><b>휴가 일수 관리</td>
							</tr>
						</table>
						<ucare:table type="query" width="628">
							<tr>
								<td width="120" align=right><font color="#FF0000">일괄 지정 일수</font> :&nbsp;</td>
								<td width="100">
									<input type=text class=input_required name="lumpDay" onkeyup="fn_chkDay(this);" style="width:70px;text-align:right;">&nbsp;일
								</td>
								<td>&nbsp;</td>
								<td width=1 bgcolor=#CCCCCC></td>
				 				<td width=250 align="center">
				 					<ucare:imgbtn name="btnBalance" value="일괄지정" onClick="fn_setLump();"/>
									<ucare:imgbtn name="btnSave2" value="저장" onClick="fn_HolidayDaySave();"/>
									<ucare:imgbtn name="btnDelete2" value="삭제" onClick="fn_HolidayDelete();"/>
				 				</td>
				 			</tr>
						</ucare:table>
						<!--
						<ucare:table type="border">
							<tr>
								<td class="stitle">이관 대상자 리스트</td>
							</tr>
						</ucare:table>-->
						<table border=0 cellpadding=0 cellspacing=0>
				 			<tr><td height="5"></td></tr>
				 		</table>
						<ucare:grid id="UCHLD012S" width="638" height="440" no="true" crud="true">
							<tr event="">
								<td width="50" 	column="chk"		title="선택" 		align="center" format="CHECKBOX" editable="true" sortable="false"></td>
								<td width="80" column="bse_y" 		title="적용년도" 	align="center" format="COMBO" brcode="HLD002"></td>
						    	<td width="80" column="user_nm"		title="사용자명" 	align="center"></td>
						    	<td width="80" column="user_id"		title="아이디" 		align="center"></td>
						    	<td width="80" column="use_dy"		title="사용일수"	align="center"></td>
						    	<td width="80" column="rmn_dy"		title="잔여일수"	align="center"></td>
						    	<td width="90" 	column="pmt_dy"		title="지급일수" 	align="right" editable="true"></td>
						  	</tr>
						</ucare:grid>
					</td>
				</tr>
			</table>
			</form>
		</td>
	</tr>
</table>

</body>
</html>
