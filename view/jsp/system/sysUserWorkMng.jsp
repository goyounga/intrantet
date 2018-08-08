<!--
  PROJECT : INTRANET
  NAME    : prjMtncMng.jsp
  DESC    : 근무관리
  AUTHOR  : 박준규 과장
  VERSION : 1.0
  Copyright ⓒ 2010 Nexfron. All rights reserved.
  ============================================================================================
  							변		경		사		항
  ============================================================================================
  VERSION	   DATE		  	AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2010.09.12		박준규 		개발
  -->
<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
	<title>근무관리</title>
	<%@ include file="/jsp/include/include.jsp" %>
	<script language="javascript" src="<%=scriptPath%>/js/system/sysUserWorkMng.js"></script>
</head>
<body class="mainbody" onLoad="init()">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<form  name="fQuery" method="post" onsubmit="return false;">
	<tr>
		<td>
			<ucare:table type="query" width="100%">
				<tr>
					<th width="60" align="right">부서 :&nbsp;</th>
					<td width="100">
						<ucare:select name="dept_cd" width="100"  option="10" brcode="SYS012" />
					</td>
					<th width="60" align="right">직급 :&nbsp;</th>
					<td width="100">
						<ucare:select name="pos_cd" width="100"  option="10" brcode="SYS013" />
					</td>
					<th width="60" align="right">이름 :&nbsp;</th>
					<td width="150">
						<ucare:input type="text" name="user_nm" width="150" tag="onKeyUp=\"pressEnter('query(this)')\""   />
					</td>
					<td>&nbsp;</td>
					<td width="1" bgcolor="#CCCCCC"></td>
					<td width="60" class="rbtn"  align="right">
						<ucare:imgbtn name="btnSearch" kind="R" onClick="query()"/>
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<tr>
		<td class="hmargin"></td>
	</tr>
	<form name="f" method="post" onsubmit="return false;">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<tr>
		<td>
			<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red" >
				<tr>
					<td valign="top">
						<table width="208" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">조직도</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS091S" width="208" height="710" tree="true">
										<tr class="LIST" event="O">
											<td  width="188" column="orgnm" image="doc" format="TREE" action="false"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<td class="vmargin" ></td>
					<td valign="top">
						<table width="100%" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">사용자 근무설정 목록</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS092S" width="716" height="710" no="false" crud="true" fixed="3">
										<tr event="O">
											<td width="95" 	column="dept_nm" 			title="부서" 			align="center" ></td>
											<td width="55" 	column="pos_nm" 			title="직급"			align="center" ></td>
											<td width="75"	column="user_nm" 			title="이름" 			align="center" ></td>
											<td width="100" column="work_type_cd" 		title="근무유형"		align="center" format="COMBO" brcode="DAS002" editable="true" ></td>
											<td width="85" 	column="in_offc_stat" 		title="재실여부"		align="center" format="COMBO" brcode="DAS001" editable="true" ></td>
											<td width="115" column="rtn_scdl" 			title="귀사예정"		align="left"   editable="true" ></td>
											<td width="135" column="work_scdl" 			title="외근일정" 		align="left"   editable="true" ></td>
											<td width="300"	column="work_rmk" 			title="비고" 			align="left"   editable="true" maxlength="2000"></td>
											<td width="95" 	column="dept_cd" 			title="부서" 			align="center" hidden="true"></td>
											<td width="150"	column="user_nm2" 			title="이름 [ID]" 		align="left"   hidden="true"></td>
											<td width="100"	column="user_id" 			title="사용자ID" 		align="center" hidden="true"></td>
											<td width="100" column="pos_cd" 			title="직급"			align="center" hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
						<table class="tbl_button" border="0" cellpadding="0" cellspacing="0" align="right">
							<tr><td class="hmargin5"></td></tr>
							<tr >
								<td ><ucare:imgbtn name="btnSaveMulti" kind="S" value="일괄저장" onClick="saveWorkMulti()"/></td>
							</tr>
						</table>
					</td>
					<td class="vmargin" ></td>
					<td valign="top">
						<table border="0" cellpadding="0" cellspacing="0" width="100%" >
							<tr>
								<td class="stitle">상세정보</td>
							</tr>
							<tr >
								<td >
									<table class="MANTBL" border="0" cellpadding="0" cellspacing="1" width="290" >
										<tr >
											<td class="MANTDT" width="70">부서</th>
											<td class="MANTDM" ><ucare:input type="text" name="dept_nm" width="213" maxsize="100" mode="active"  readonly="true" tag="style='text-align:center'" /></td>
										</tr>
										<tr >
											<td class="MANTDT" width="70">사용자명</th>
											<td class="MANTDM" ><ucare:input type="text" name="user_nm2" width="150" maxsize="100" mode="active"  readonly="true" tag="style='text-align:center'" />
																<ucare:input type="text" name="pos_nm"   width="60" maxsize="100" mode="active"  readonly="true" tag="style='text-align:center'" />
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr><td class="hmargin"></td></tr>
							<tr>
								<td>
									<table class="MANTBL" border="0" cellpadding="0" cellspacing="1" width="290" >
										<tr>
											<td class="MANTDT" colspan="2" style="height:27px;">
												<input type="checkbox" name="work_type_cd" id="ccc" value="01" onClick="work_type_cd_onClick(this);" style="cursor:hand"/><label for="ccc" style="cursor:hand">본사근무</label>&nbsp;&nbsp;
												<input type="checkbox" name="work_type_cd" id="ddd" value="02" onClick="work_type_cd_onClick(this);" style="cursor:hand"/><label for="ddd" style="cursor:hand">프로젝트파견</label>&nbsp;&nbsp;
												<input type="checkbox" name="work_type_cd" id="eee" value="03" onClick="work_type_cd_onClick(this);" style="cursor:hand"/><label for="eee" style="cursor:hand">SM상주근무</label>
											</th>
										</tr>
									</table>
								</td>
							</tr>
							<tr><td class="hmargin5"></td></tr>
							<tr >
								<td >
									<table class="MANTBL" border="0" cellpadding="0" cellspacing="1" width="290" >
										<tr >
											<td class="MANTDM" colspan="2" style="text-align:center">
												<input type="radio" name="in_offc_stat" id="aaa" value="01" onClick="in_offc_stat_onClick(this.value);" style="cursor:hand"/><label for="aaa" style="cursor:hand">&nbsp;재 실</label>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												<input type="radio" name="in_offc_stat" id="bbb" value="02" onClick="in_offc_stat_onClick(this.value);" style="cursor:hand"/><label for="bbb" style="cursor:hand">&nbsp;외 근</label>
											</td>
										</tr>
										<tr >
											<td class="MANTDT" width="70">귀사예정</th>
											<td class="MANTDM" ><ucare:input type="text" name="rtn_scdl" width="213" maxsize="100" mode="active"  /></td>
										</tr>
										<tr >
											<td class="MANTDT" >외근일정</th>
											<td class="MANTDM" ><ucare:input type="text" name="work_scdl" width="213" maxsize="100" mode="active"  /></td>
										</tr>
										<tr >
											<td class="MANTDT" >비고</th>
											<td class="MANTDM" ><textarea name="work_rmk" class="input_textarea_text" style="width:213px;height:70px;ime-mode:active;" maxsize="2000" requirednm="비고"></textarea></td>
										</tr>
									</table>
								</td>
							</tr>
							<tr><td class="hmargin5" ></td></tr>
							<tr>
								<td align="right" >
									<input type="hidden" name="user_id"	>
									<ucare:imgbtn width="60" name="btnSave"	 kind="S" value="저장" 	onClick="saveWork()"/>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
</table
</body>
</html>