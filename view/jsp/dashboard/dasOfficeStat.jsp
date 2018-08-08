<!--
  PROJ : Nexfron Intranet
  NAME : dasOfficeStat.jsp
  DESC : 현황판 - 본사인력현황
  Author : 박준규 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2010.09.06		박준규		개발
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
	<title>본사인력현황</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%=scriptPath%>/js/dashboard/dasOfficeStat.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 0;">
<table width="1250" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>
	<form name="f" method="post">
	<input type="hidden" name="prj_seq" value="">
	<tr>
		<td>
			<table width="1238" cellpadding="0" cellspacing="0" border="0">
				<col width="1238" />
				<tr>
					<td valign="top">
						<ucare:grid id="UCDAS031S" width="1238" height="775" no="true">
							<tr event="O">
								<td width="100"		column="user_nm" 		title="성명"			align="center" ></td>
								<td width="130" 	column="dept_cd" 		title="소속"			align="center" ></td>
								<td width="130" 	column="in_offc_stat" 	title="재실여부"		align="center" ></td>
								<td width="260" 	column="work_scdl" 		title="외근일정"		align="left"   ></td>
								<td width="200" 	column="rtn_scdl" 		title="귀사예정"		align="left"   ></td>
								<td width="380" 	column="work_rmk" 		title="비고"			align="left"   ></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td height="5"></td>
				</tr>
				<tr>
					<td align="right">
						<ucare:imgbtn width="60" name="btnQuery"	value="조회"	 onClick="queryList()"/>
					</td>
				</tr>
			</table>
		</td>
	</tr>
<!--
	<tr>
		<td>
			<fieldset style="width:298; height:240">
				<legend  class="stitle">근무설정&nbsp;</legend>
				<table border="0" cellpadding="0" cellspacing="0" width="100%" >
					<tr>
						<td>
							<ucare:table type="detail" width="290">
								<tr>
									<td class="MANTDT3" colspan="2" style="height:27px;">
										<input type="checkbox" name="work_type_cd" id="ccc" value="01" onClick="work_type_cd_onClick(this);" style="cursor:hand"/><label for="ccc" style="cursor:hand">본사근무</label>&nbsp;&nbsp;
										<input type="checkbox" name="work_type_cd" id="ddd" value="02" onClick="work_type_cd_onClick(this);" style="cursor:hand"/><label for="ddd" style="cursor:hand">프로젝트파견</label>&nbsp;&nbsp;
										<input type="checkbox" name="work_type_cd" id="eee" value="03" onClick="work_type_cd_onClick(this);" style="cursor:hand"/><label for="eee" style="cursor:hand">SM상주근무</label>
									</td>
								</tr>
							</ucare:table>
						</td>
					</tr>
					<tr><td class="hmargin5"></td></tr>
					<tr >
						<td >
							<ucare:table type="detail" width="290">
								<tr >
									<td class="MANTDT" colspan="2" style="background-color:#ffffff">
										<input type="radio" name="in_offc_stat" id="aaa" value="01" onClick="in_offc_stat_onClick(this);" style="cursor:hand"/><label for="aaa" style="cursor:hand">&nbsp;재 실</label>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="radio" name="in_offc_stat" id="bbb" value="02" onClick="in_offc_stat_onClick(this);" style="cursor:hand"/><label for="bbb" style="cursor:hand">&nbsp;외 근</label>
									</td>
								</tr>
								<tr >
									<td class="MANTDT" width="70">귀사예정</td>
									<td class="MANTDM"><ucare:input type="text" name="rtn_scdl" width="213" maxsize="100" mode="active"  /></td>
								</tr>
								<tr >
									<td class="MANTDT">외근일정</td>
									<td class="MANTDM"><ucare:input type="text" name="work_scdl" width="213" maxsize="100" mode="active"  /></td>
								</tr>
								<tr >
									<td class="MANTDT">비고</td>
									<td class="MANTDM"><textarea name="work_rmk" class="input_textarea_text" style="width:213px;height:60px;ime-mode:active;border-color:#CECECE; " maxsize="2000" requirednm="비고"></textarea></td>
								</tr>
							</ucare:table>
						</td>
					</tr>
					<tr><td class="hmargin5"></td></tr>
					<tr>
						<td align="right">
							<input type="hidden" name="user_id"	value="<%=sessioninfo.getUserID()%>">
							<ucare:imgbtn width="60" name="btnSave"	 kind="S" value="저장" 	onClick="saveWork()"/>
						</td>
					</tr>
				</table>
			</fieldset>
		</td>
	</tr>
-->
	</form>
</table>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>