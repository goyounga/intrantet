<!--
  PROJECT : INTRANET
  NAME    : prjCorpMng.jsp
  DESC    : ��ü����
  AUTHOR  : ���ر� ����
  VERSION : 1.0
  Copyright �� 2010 Nexfron. All rights reserved.
  ============================================================================================
  							��		��		��		��
  ============================================================================================
  VERSION	   DATE		  	AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2010.09.12		���ر� 		����
  -->
<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
	<title>��ü����</title>
	<%@ include file="/jsp/include/include.jsp" %>
	<script language="javascript" src="<%=scriptPath%>/js/project/prjCorpMng.js"></script>
</head>
<body class="mainbody" onLoad="init();" style="padding:0 5 0 5;">
<form name="fQuery" method="post" onsubmit="return false;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" >
	<tr>
		<td><ucare:xtitle title="��ü����"/></td>
	</tr>
	<tr><td class="hmargin5"></td></tr>
	<tr>
		<td>
			<ucare:table type="query" width="100%">
				<tr>
<!--
					<th width="100" >������� : </th>
					<td width="250">
						<ucare:input type="text"  name="from_date" width="70" styleClass="input_required"  maxlength="10" required="true" requirednm="��������"  format="DATE" pattern="D" value='<%=CUtil.getDisplayDate(String.valueOf(CDateUtil.getYear()-1)+"0101")%>' tag="onKeyUp=\"pressEnter('query()')\""/><span class="calendar" onClick="openCalendar('fQuery.reg_dt_s',fQuery.reg_dt_s.value)"></span>
		   &nbsp;~&nbsp;<ucare:input type="text"  name="to_date"   width="70" styleClass="input_required"  maxlength="10" required="true" requirednm="��������"  format="DATE" pattern="D" value="<%=CUtil.getDisplayDate(CDateUtil.getToday())%>" tag="onKeyUp=\"pressEnter('query()')\""/><span class="calendar" onClick="openCalendar('fQuery.reg_dt_e',fQuery.reg_dt_e.value)"></span>
					</td>
					<th width="80">��뿩��</th>
					<td width="150">
						<ucare:input type="radio" name="use_yn" brcode="USEYN" checkcode="Y" option="10" />
					</td>
					<th width="80" >��������</th>
					<td width="140">
						<ucare:select name="sheet_kind_cd" brcode="QMS002" width="140" option="10" />
					</td>
-->
					<th width="80" >��ü�� : </th>
					<td class="lbtn">
						<ucare:input type="text" name="corp_nm" width="150" maxsize="100" mode="active" tag="onKeyUp=\"pressEnter('query()')\"" />
					</td>

					<td>&nbsp;</td>
					<td width="1" bgcolor=#CCCCCC></td>
					<td width="60" class="rbtn" align="right">
						<ucare:imgbtn name="btnSearch" kind="R" onClick="query()"/>
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
</table>
</form>
<form name="f">
<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">
<table border="0" cellpadding="0" cellspacing="0" width="100%" bordercolor="red" >
	<tr>
		<td class="hmargin"></td>
	</tr>
	<tr>
		<td>
			<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red" >
				<tr>
					<td class="stitle">��ü���</td>
				</tr>
				<tr>
					<td>
					<!--td  width="730"-->
						<!--ucare:grid id="UCPRJ041S" width="780" height="734" no="true" -->
						<ucare:grid id="UCPRJ041S" width="265" height="475" no="true" >
							<tr event="O">
								<td width="225"	column="corp_nm" 		title="��ü��" 		align="left" ></td>
								<td width="80"	column="corp_seq" 		title="��ü����" 	align="center" hidden="true"></td>
								<td width="542"	column="rmk" 			title="���" 		align="left" maxlength="2000"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
			</table>
		</td>
		<td class="vmargin" ></td>
		<td valign="top" >
			<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red" >
				<tr>
					<td class="stitle">������</td>
				</tr>
				<tr>
					<td>
						<table class="MANTBL" border="0" cellpadding="0" cellspacing="1" width="440" style="table-layout:fixed;">
							<col width="80" >
							<col width="140">
							<col width="80">
							<col width="140">
							<tr>
								<td class="MANTDT" >��ü��</td>
								<td class="MANTDM" colspan="3"><input type="hidden" name="corp_seq">
																<ucare:input type="text" name="corp_nm" width="358" maxsize="100" mode="active" required="true" requirednm="����������" /></td>
							</tr>
							<tr height="124">
								<td class="MANTDT" >���</td>
								<td class="MANTDM" colspan="3" ><textarea name="rmk" class="input_textarea_text" style="width:358px;height:118px;ime-mode:active" maxsize="2000" requirednm="Ư�̻���"></textarea></td>
							</tr>
<!--
							<tr>
								<td class="MANTDT" >��������</td>
								<td class="MANTDM" ><ucare:input type="text"  name="strt_date" width="110" maxlength="10" required="false" requirednm="��������" format="DATE" pattern="D"  /><span id="calStrt_date" class="calendar" onClick="openCalendar('f.strt_date',f.strt_date.value)"></span></td>
								<td class="MANTDT" >��������</td>
								<td class="MANTDM" ><ucare:input type="text"  name="end_date"  width="110" maxlength="10" required="false" requirednm="��������" format="DATE" pattern="D"  /><span id="calEnd_date"  class="calendar" onClick="openCalendar('f.end_date' ,f.end_date.value)" ></span></td>
							</tr>
							<tr>
								<td class="MANTDT" >������Ʈ��</td>
								<td class="MANTDM" colspan="3">	<input type="hidden" name="prj_seq">
																<ucare:input type="text" name="prj_nm" width="311" maxsize="100" mode="active" required="false" requirednm="������Ʈ��" readonly="true"/>
																<span id="spnSheetNm" class="search" onclick="openProject(f)" ></span><span class="minus" onclick="delInfo('prj')"></span>
								</td>
							</tr>
							<tr>
								<td class="MANTDT" >����</td>
								<td class="MANTDM" colspan="2">
													<input type="hidden" name="clnt_corp_seq">
													<ucare:input type="text" name="clnt_corp_nm" width="170" maxsize="100" mode="active" required="false" requirednm="����" readonly="true"/>
													<span id="spnSheetNm" class="search" onclick="openSearchSheet()" ></span><span class="minus" onclick="delInfo('clnt_corp')"></span>
								</td>
								<td class="MANTDT" >�ý���</td>
							</tr>
							<tr>
								<td class="MANTDT" >������������</td>
								<td class="MANTDM" colspan="2"><ucare:select name="mtnc_type" brcode="PRJ017" width="217" option="4" required="false" requirednm="������������" /></td>
								<td rowspan="5" valign="top"><input type="hidden" name="mtnc_system">
									<ucare:grid id="UCPRJ012S" width="141" height="140" no="false">
										<tr event="O">
											<td width="18"	column="chk" 		title=" " 			align="center" format="CHECKBOX" hcheckbox="true" editable="true" />
											<td width="104"	column="code_nm"	title="��������"	align="center"></td>
											<td width="80"  column="code"		title="��������cd"	align="center" hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr >
								<td class="MANTDT" >��������</td>
								<td class="MANTDM" colspan="2"><ucare:select name="regular_chk" brcode="PRJ015" width="217" option="4" required="false" requirednm="��������" /></td>
							</tr>
							<tr>
								<td class="MANTDT" >���</td>
								<td class="MANTDM" colspan="2"><ucare:select name="mtnc_cost" brcode="PRJ014" width="217" option="4" required="false" requirednm="���" /></td>
							</tr>
							<tr>
								<td class="MANTDT" >���»�</td>
								<td class="MANTDM" colspan="2">
													<input type="hidden" name="coop_corp_seq">
													<ucare:input type="text" name="coop_corp_nm" width="170" maxsize="100" mode="active" required="false" requirednm="���»�" readonly="true" />
													<span id="spnSheetNm" class="search" onclick="openSearchSheet()" ></span><span class="minus" onclick="delInfo('coop_corp')"></span>
								</td>
							</tr>


							<tr>
								<td class="MANTDT" >�����ӿ�ũ</td>
								<td class="MANTDM" colspan="2"><ucare:select name="dvlp_frwk" brcode="PRJ016" width="217" option="4" required="false" requirednm="�����ӿ�ũ" /></td>
							</tr>

-->
						</table>
					</td>
				</tr>
				<tr>
					<td align="right" >
						<table class="tbl_button" border="0" cellpadding="0" cellspacing="0" >
							<tr><td class="hmargin5"></td></tr>
							<tr>
								<td align="right"><ucare:imgbtn name="btnAdd"	 kind="A"	value="" onClick="add();"	/></td>
								<td align="right"><ucare:imgbtn name="btnSave"	 kind="S"	value="" onClick="save();"	/></td>
								<td align="right"><ucare:imgbtn name="btnDel"	 kind="D"	value="" onClick="del()"	/></td>
								<td align="right"><ucare:imgbtn name="btnCancel" kind="C"	value="" onClick="cancel()"	/></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td style="text-align:right; vertical-align:bottom; height:300">
						<font class="blue" style="font-size:11px">
							* ��ü ������ �׸��� �߰��ɼ� �ֽ��ϴ�.
						</font>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>