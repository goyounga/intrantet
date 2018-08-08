<!--
  PROJECT : INTRANET
  NAME    : prjMtncMng.jsp
  DESC    : ������������
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
	<title>������������</title>
	<%@ include file="/jsp/include/include.jsp" %>
	<script language="javascript" src="<%=scriptPath%>/js/project/prjMtncMng.js"></script>
</head>
<body class="mainbody" onLoad="init();">
<form name="fQuery" method="post" onsubmit="return false;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr><td class="hmargin5"></td></tr>
	<tr>
		<td>
			<ucare:table type="query" width="100%">
				<tr>
					<td width="100" >������</td>
					<td width="250">
						<ucare:select name="mtnc_cd" brcode="PRJ022" width="80" option="4" required="false" requirednm="���" />
						<ucare:select name="mtnc_cost" brcode="PRJ014" width="80" option="4" required="false" requirednm="���" />
					</td>
					<td width="100" >��������</td>
					<td width="250" ><ucare:select name="regular_chk" brcode="PRJ015" width="80" option="4" required="false" requirednm="��������" />
						<ucare:select name="mtd_cd" brcode="PRJ005" width="80" option="4" required="false" requirednm="��������" />
					</td>
					<td width="100">
						<select name="user_type"  style="width:80" size="1" class="combo_text"  requirednm="����" option="4">
							<option value="">== ���� ==</option>
							<option value='chrg'>�����η�</option>
							<option value='cs'>CS</option>
							<option value='bsn'>����</option>
						</select>
					</td>
					<td width="250">
						<input type="text" name="user_id_nm" readOnly class="input_readonly" style="width:80;">
						<input type="hidden" name="user_id" readOnly class="input_readonly" style="width:80;">
						<span class="search" onClick="openUserOrg('fQuery.user_id')"></span>
						<span class="minus" onClick="del_userID('fQuery.user_id');"></span>
					</td>
					
<!--  					<th width="80" >��������</th>
					<td width="140">
						<ucare:select name="sheet_kind_cd" brcode="QMS002" width="140" option="10" />
					</td>
-->
					<th width="80" >���� : </th>
					<td >
						<ucare:input type="text" name="clnt_corp_nm" width="150" maxsize="100" mode="active" tag="onKeyUp=\"pressEnter('query()')\"" />
					</td>
					<td>&nbsp;</td>
					<td width="1" bgcolor="#CCCCCC"></td>
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
<table border="0" cellpadding="0" cellspacing="0" width="100%" bordercolor="red">
	<tr>
		<td class="hmargin"></td>
	</tr>
	<tr>
		<td>
			<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red" >
				<tr>
					<td class="stitle">�����������</td>
				</tr>
				<tr>
					<td  width="730">
						<ucare:grid id="UCPRJ031S" width="1235" height="450" no="true" >
							<tr event="O,D">
								<td width="0"	column="mtnc_nm" 		title="����������" 		align="left" ></td>
								<td width="100"	column="clnt_corp_nm" 	title="����" 			align="left" ></td>
								<td width="110"	column="mtnc_system_nm" title="�ý���" 			align="left" ></td>
								<td width="120"	column="mtnc_type" 		title="������������" 	align="left"   format="COMBO" brcode="PRJ017"></td>
								<td width="40"	column="mtnc_cd" 		title="���" 			align="center" format="COMBO" brcode="PRJ022"></td>
								<td width="40"	column="mtnc_cost" 		title="��/��" 			align="center" format="COMBO" brcode="PRJ014"></td>
								<td width="110"	column="mtnc_period" 	title="�Ⱓ" 			align="center" ></td>
								<td width="80"	column="coop_corp_nm" 	title="���»�" 			align="left" ></td>
								<td width="200"	column="rmk" 			title="Ư�̻���" 		align="left" maxlength="2000"></td>
								<td width="60"	column="regular_chk" 	title="��������" 		align="center" format="COMBO" brcode="PRJ015"></td>
								<td width="40"	column="mtd_cd" 		title="����" 			align="center" format="COMBO" brcode="PRJ005"></td>
								<td width="100"	column="corp_chrg_nm" 	title="��������" 			align="left" ></td>
								<td width="80"	column="chrg_user_id_nm" 	title="�����η�" 			align="center" ></td>
								<td width="60"	column="cs_user_id_nm" 	title="CS���" 		align="center"></td>
								<td width="60"	column="bsn_user_id_nm" 	title="�������" 		align="center"></td>
								<td width="60"	column="rmt_tool" 	title="������" 		align="center" ></td>
								<td width="60"	column="rmt_rmk" 	title="���������� ����" 		align="center" ></td>
								
								<td width="80"	column="dvlp_frwk" 		title="�����ӿ�ũ" 		align="center" format="COMBO" brcode="PRJ016"></td>
								<td width="170"	column="prj_nm" 		title="������Ʈ��" 		align="left"   ></td>
								<td width="100"	column="mtnc_system" 	title="�ý���cd" 		align="center" hidden="true"></td>
								<td width="80"	column="strt_date" 		title="��������" 		align="center" hidden="true"></td>
								<td width="80"	column="end_date" 		title="��������" 		align="center" hidden="true"></td>
								<td width="75"	column="mdf_dt"		 	title="��������" 		align="center" format="DATE"></td>
								<td width="75"	column="mdf_nm"		 	title="������"	 		align="center" ></td>
								<td width="0"	column="mtnc_seq" 		title="��������SEQ" 	align="center" hidden="true"></td>
								<td width="0"	column="clnt_corp_seq" 	title="����SEQ" 		align="center" hidden="true"></td>
								<td width="0"	column="coop_corp_seq" 	title="���»�SEQ" 		align="center" hidden="true"></td>
								<td width="0"	column="prj_seq" 		title="������ƮSEQ" 	align="center" hidden="true"></td>
								<td width="0"	column="chrg_user_id" 		title="������ƮSEQ" 	align="center" hidden="true"></td>
								<td width="0"	column="cs_user_id" 		title="������ƮSEQ" 	align="center" hidden="true"></td>
								<td width="0"	column="bsn_user_id" 		title="������ƮSEQ" 	align="center" hidden="true"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>	
		<td valign="top" >
			<table class="MANTBL" border="0" cellpadding="0" cellspacing="1" width="1230" style="table-layout:fixed;">
				<col width="80" >
				<col width="140">
				<col width="80">
				<col width="140">
				<col width="80">
				<col width="250">
				<col width="80">
				<col width="140">
				<tr>
					<td class="MANTDT" >����������</td>
					<td class="MANTDM" colspan="3"><input type="hidden" name="mtnc_seq">
													<ucare:input type="text" name="mtnc_nm" width="358" maxsize="100" mode="active" required="true" requirednm="����������" /></td>
					<td class="MANTDT" >����</td>
					<td class="MANTDM">
							<input type="hidden" name="clnt_corp_seq">
							<ucare:input type="text" name="clnt_corp_nm" width="170" maxsize="100" mode="active" required="false" requirednm="����" readonly="true"/>
							<span id="spnSheetNm" class="search" onclick="openClntCorp()" ></span><span class="minus" onclick="delInfo('clnt_corp')"></span>
					</td>
					<td class="MANTDT" rowspan="5" >�ý���</td>
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
				<tr>	
					<td class="MANTDT" >��������</td>
					<td class="MANTDM" colspan="3">
						<ucare:input type="text" name="corp_chrg_nm" width="400" maxsize="100" mode="active" required="false" requirednm="��������"/>
					</td>
					<td class="MANTDT" >�Ⱓ</td>
					<td class="MANTDM"><ucare:input type="text"  name="strt_date" width="80" maxlength="10" required="false" requirednm="��������" format="DATE" pattern="D"  /><span id="calStrt_date" class="calendar" onClick="openCalendar('f.strt_date',f.strt_date.value)"></span>
					 ~<ucare:input type="text"  name="end_date"  width="80" maxlength="10" required="false" requirednm="��������" format="DATE" pattern="D"  /><span id="calEnd_date"  class="calendar" onClick="openCalendar('f.end_date' ,f.end_date.value)" ></span></td>
				</tr>
				<tr>
					<td class="MANTDT" >������������</td>
					<td class="MANTDM" ><ucare:select name="mtnc_type" brcode="PRJ017" width="150" option="4" required="false" requirednm="������������" /></td>
					<td class="MANTDT" >��������</td>
					<td class="MANTDM" ><ucare:select name="regular_chk" brcode="PRJ015" width="80" option="4" required="false" requirednm="��������" />
						<ucare:select name="mtd_cd" brcode="PRJ005" width="80" option="4" required="false" requirednm="��������" />
					
					</td>
					<td class="MANTDT" >������Ʈ��</td>
					<td class="MANTDM"><input type="hidden" name="prj_seq">
						<ucare:input type="text" name="prj_nm" width="200" maxsize="100" mode="active" required="false" requirednm="������Ʈ��" readonly="true"/>
						<span id="spnSheetNm" class="search" onclick="openProject(f)" ></span><span class="minus" onclick="delInfo('prj')"></span>
					</td>
				</tr>
				<tr>
					<td class="MANTDT" >������</td>
					<td class="MANTDM" >
						<ucare:select name="mtnc_cd" brcode="PRJ022" width="80" option="4" required="false" requirednm="���" />
						<ucare:select name="mtnc_cost" brcode="PRJ014" width="80" option="4" required="false" requirednm="���" /></td>
					<td class="MANTDT" >���»�</td>
					<td class="MANTDM">
						<input type="hidden" name="coop_corp_seq">
						<ucare:input type="text" name="coop_corp_nm" width="100" maxsize="100" mode="active" required="false" requirednm="���»�" readonly="true" />
						<span id="spnSheetNm" class="search" onclick="openCoopCorp()" ></span><span class="minus" onclick="delInfo('coop_corp')"></span>
					</td>
					<td class="MANTDT" >�����ӿ�ũ</td>
					<td class="MANTDM"><ucare:select name="dvlp_frwk" brcode="PRJ016" width="150" option="4" required="false" requirednm="�����ӿ�ũ" /></td>
				</tr>
				<tr>
					<td class="MANTDT">�����η�</td>
					<td class="MANTDM">
						<input type="text" name="chrg_user_id_nm" readOnly class="input_readonly" style="width:80;">
						<input type="hidden" name="chrg_user_id" readOnly class="input_readonly" style="width:80;">
						<span class="search" onClick="openUserOrg('f.chrg_user_id')"></span>
						<span class="minus" onClick="del_userID('f.chrg_user_id');"></span>
					</td>
					<td class="MANTDT">CS���</td>
					<td class="MANTDM">
						<input type="text" name="cs_user_id_nm" readOnly class="input_readonly" style="width:80;">
						<input type="hidden" name="cs_user_id" readOnly class="input_readonly" style="width:80;">
						<span class="search" onClick="openUserOrg('f.cs_user_id')"></span>
						<span class="minus" onClick="del_userID('f.cs_user_id');"></span>
					</td>
					<td class="MANTDT">�������</td>
					<td class="MANTDM">
						<input type="text" name="bsn_user_id_nm" readOnly class="input_readonly" style="width:80;">
						<input type="hidden" name="bsn_user_id" readOnly class="input_readonly" style="width:80;">
						<span class="search" onClick="openUserOrg('f.bsn_user_id')"></span>
						<span class="minus" onClick="del_userID('f.bsn_user_id');"></span>
					</td>
				</tr>				
				<tr>
					<td class="MANTDT" >������</td>
					<td class="MANTDM" colspan=3>
						<ucare:input type="text" name="rmt_tool" width="170" maxsize="100" mode="active" required="false" requirednm="������"/>
					</td>
					<td class="MANTDT" rowspan=2>Ư�̻���</td>
					<td class="MANTDM" rowspan=2 colspan=3><textarea name="rmk" class="input_textarea_text" style="width:500px;height:75px;ime-mode:active" maxsize="2000" requirednm="Ư�̻���"></textarea></td>
				</tr>
				<tr height="60px">
					<td class="MANTDT" >��������</td>
					<td class="MANTDM" colspan="3" >
						<textarea name="rmt_rmk" class="input_textarea_text" style="width:400px;height:45px;ime-mode:active" maxsize="2000" requirednm="Ư�̻���"></textarea></td>
				</tr>
			</table>
			<table class="tbl_button" border="0" cellpadding="0" cellspacing="0" >
				<tr><td class="hmargin5"></td></tr>
				<tr>
					<td align="left" ><ucare:imgbtn name="btnOpen"	 kind="O"	value="ȸ����" onClick="openCorpMng();"	/></td>
					<td style="width:150">&nbsp;</td>
					<td align="right"><ucare:imgbtn name="btnAdd"	 kind="A"	value="" onClick="add();"	/></td>
					<td align="right"><ucare:imgbtn name="btnSave"	 kind="S"	value="" onClick="save();"	/></td>
					<td align="right"><ucare:imgbtn name="btnDel"	 kind="D"	value="" onClick="del()"	/></td>
					<td align="right"><ucare:imgbtn name="btnCancel" kind="C"	value="" onClick="cancel()"	/></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>