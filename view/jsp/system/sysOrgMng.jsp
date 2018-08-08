<!--
 * PROJ : Nexfron
 * NAME : sysOrgMng.jsp
 * DESC : 조직관리
 * Author : 연구개발팀 
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.11.25		연구개발팀		신규작성
	-->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>조직관리</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="/html/js/system/sysOrgMng.js"></script>
</head>
<body topmargin="0" leftmargin="5" onload="eventGrid();init()">

<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="조직 관리"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>

<table width="100%" cellpadding="0" cellspacing="0" border="0">
	<form name="fQuery" method="post">
	<input type="hidden" name="user_id">
<tr>
	<td colspan="3" style="padding:0 0 0 0">
		<table class="tblSearch" cellspacing="0" border="0" width="100%">
			<tr>
				<th width="100">조직명</th>
				<td width="130">
					<ucare:input type="text" name="org_nm" styleClass="input_text" width="160" required="False" requirednm="" tag="onKeyPress=\"checkKeyPress();\"" />
					<ucare:input type="hidden" name="org_cd" styleClass="input_text" width="160" required="False" requirednm="" tag="onKeyPress=\"checkKeyPress();\"" />
				</td>
				 <th width="100">사용여부</th>
				<td width="130" class="lbtn">				
					<ucare:select name="use_yn" brcode="COM001" code="code" codename="codenm" option="10" width="80" selCode="Y"/>			
				</td> 
 				<td class="rbtn" class=lbtn>
 					<ucare:imgbtn name="btnQuery" type="G" kind="R" onClick="query()"/><!-- 조회 -->
 				</td>
			</tr>
		</table>
	</td>
</tr>
</form>

<form name="f" method="post">
<input type="hidden" name="etc_1"/>
<input type="hidden" name="etc_2"/>
<input type="hidden" name="org_id"/>

<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">

<tr>
	<td class="hmargin5" colspan="3"></td>
</tr>
<tr>
	<td class="stitle">조직구성</td>
	<td width="10"></td>
	<td class="stitle">조직정보</td>
</tr>
<tr>
	<td width="400" valign="top">
		<table border="0">
			<tr>
				<td>
					<ucare:grid id="UCSYS201S" width="400" height="700" tree="true">
						<tr class="LIST" event="O">
							<td  width="480" column="org_nm" image="doc" format="TREE" action="true" maxlen="1000"></td>
							<td  width="480" column="org_cd" hidden="true" maxlen="1000"></td>
							<td  width="480" column="org_id" hidden="true"></td>
							<td  width="480" column="ord" hidden="true"></td>
							<td  width="480" column="reg_user_nm" hidden="true"></td>
							<td  width="480" column="reg_dt" hidden="true"></td>
							<td  width="480" column="chg_user_nm" hidden="true"></td>
							<td  width="480" column="chg_dt" hidden="true"></td>
							<td  width="480" column="use_yn" hidden="true"></td>
							
							<td  width="480" column="etc_1" hidden="true"></td>
							<td  width="480" column="up_org_id" hidden="true"></td>
						</tr>
					</ucare:grid>
				</td>
			</tr>
		</table>	
	</td>
	<td width="5">
	</td>
	<td valign="top">
		<table width="700" cellpadding="0" cellspacing="0" border="0">
			<tr>
				<td>
					<ucare:table type="detail" width="700">
						<tr style="display:none">
							<td class="MANTDT" width="100">조직코드</td>
							<td class="MANTDM">
								<ucare:input type="text" name="org_cd" styleClass="input_required" width="194" required="false" requirednm="조직코드" maxlength="10" />
							</td>
						</tr>
						<tr style="display:none">
							<td class="MANTDT" >상위 조직코드</td>
							<td class="MANTDM">
								<ucare:input type="text" name="up_org_id" styleClass="input_readonly" width="194" required="False" requirednm="" readonly="True" />
							</td>
						</tr>
						<tr style="display:none">
							<td class="MANTDT"> 상위 조직명</td>
							<td class="MANTDM">
								<ucare:input type="text" name="up_org_nm" styleClass="input_readonly" width="449" required="False" requirednm="" readonly="True" />
							</td>
						</tr>
						<tr>
							<td class="MANTDT" >조직명</td>
							<td class="MANTDM">
								<ucare:input type="text" name="org_nm" styleClass="input_required" width="449" required="true" requirednm="조직명" maxlength="50" />
							</td>
						</tr>
						<tr>
							<td class="MANTDT">사용여부</td>
							<td class="MANTDM">
								<ucare:select name="use_yn" brcode="COM001" code="code" codename="codenm" option="4" width="194"  tag="required='true' requirednm='사용여부'" styleClass="combo_required"/>
							</td>
						</tr>
						<tr>
							<td class="MANTDT" >정렬 순서</td>
							<td class="MANTDM">
								<ucare:input type="text" name="ord" styleClass="input_text" width="194" required="False" requirednm="정렬순서" readonly="True"  maxlength="3" format="NUMBER"/>
							</td>
						</tr>
							<tr>
							<td class="MANTDT" >등록자</td>
							<td class="MANTDM">
								<ucare:input type="text" name="reg_user_nm" styleClass="input_readonly" width="194" required="False" requirednm="" readonly="True" />
							</td>
						</tr>
							<tr>
							<td class="MANTDT" >등록일</td>
							<td class="MANTDM">
								<ucare:input type="text" name="reg_dt" styleClass="input_readonly" width="194" required="False" requirednm="등록일" readonly="True"format="DATE"/>
							</td>
						</tr>
							<tr>
							<td class="MANTDT" >변경자</td>
							<td class="MANTDM">
								<ucare:input type="text" name="chg_user_nm" styleClass="input_readonly" width="194" required="False" requirednm="수정자" readonly="True" />
							</td>
						</tr>
							<tr>
							<td class="MANTDT" >변경일</td>
							<td class="MANTDM">
								<ucare:input type="text" name="chg_dt" styleClass="input_readonly" width="194" required="False" requirednm="수정일" readonly="True" format="DATE"/>
							</td>
						</tr>
					</ucare:table>
				</td>
			</tr>
			<tr style="display:">
				<td>
					<table class="tbl_button" align=right>
						<tr>
							<td class="hmargin5"></td>
						</tr>
						<tr align=right>
							<td><ucare:imgbtn name="btnUpAdd"	kind="A"	value="코드 등록"  	onClick="addUpData()"/></td>
							<td><ucare:imgbtn name="btnDownAdd" kind="A"	value="하위코드 등록"  onClick="addDownData()"/></td>
							<td width=50%></td>
							<td><ucare:imgbtn name="btnSave"	kind="S"	onClick="saveData()"/><!-- 저장 --></td>
							<td><ucare:imgbtn name="btnDel"		kind="D"	onClick="delData()"/><!-- 삭제 --></td>
							<td><ucare:imgbtn name="btnCanl"	kind="C"	onClick="canlData()"/><!-- 취소--></td>
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