<!--
  PROJ : Nexfron Intranet
  NAME : hldHolidayMng.jsp
  DESC : �ް� ���� ȭ��
  Author : ������ ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.14		������		�ּ��߰�
  -->
  
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>�ް� ����</title>
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
						<td width="80" align="right">�������� :&nbsp;</td>
						<td width="130" id="stateTd">
							<ucare:select name="q_ddct_f_cd" brcode="HLD001" code="code" codename="codenm" option="4" width="125" styleClass="input_select"/>
						</td>
						<td width="120" align=right>�ް������� :&nbsp;</td>
						<td>
							<input type="text" class="frm_text" name="q_hldy_knd_nm" style="width:170" onkeyup="return(isEnterKey()? on_Search():false);">
						</td>
						<td>&nbsp;</td>
						<td width=1 bgcolor=#CCCCCC></td>
		 				<td width=180 align="center">
		 					<ucare:imgbtn name="btnQuery" value="��ȸ"   onClick="on_Search()"/>&nbsp;
		 					<ucare:imgbtn name="btnInit"  value="�ʱ�ȭ" onClick="on_Init()"/>
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
						<td class="stitle">�ް� ���� ����</td>
					</tr>
				</ucare:table>
				<table border=0 cellpadding=0 cellspacing=0>
					<tr>
						<td align="right">
							<ucare:grid id="UCHLD010S" width="1225" height="200" no="true" crud="true">
								<tr class="LIST" event="O">
									<td width="35" 	column="chk"			title="����" 				align="center" format="CHECKBOX" editable="true" sortable="false"></td>
									<td width="250"	column="hldy_knd_nm"	title="�ް�������"			align="left" editable="true"></td>
									<td width="60"	column="hf_hldy_f_cd"	title="���޿���"			align="right" format="COMBO" brcode="COM002" editable="true"></td>
									<td width="60"	column="hldy_dy"		title="�ް��ϼ�"			align="right" editable="true"></td>
									<td width="200" column="ddct_f_cd"		title="�ް��ϼ���������" 	align="center" format="COMBO" brcode="HLD001" editable="true"></td>
									<td width="40" column="hldy_ord"		title="����" 				align="center" format="NUMBER" editable="true"></td>
									
									<td width="0"	column="hldy_knd_seq"	hidden="true"></td>
								</tr>
							</ucare:grid>
						</td>
					</tr>
					<tr><td height="5"></td></tr>
					<tr>
						<td align="right">
							<ucare:imgbtn name="btnAdd" value="�߰�" onClick="fn_HolidayKindAdd()"/>
							<ucare:imgbtn name="btnSave1" value="����" onClick="fn_HolidayKindSave()"/>
							<ucare:imgbtn name="btnDelete" value="����" onClick="fn_HolidayKindDelete()"/>
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
								<td width="100%" height="30"><font class='stitle'><b>����� �˻�</td>
							</tr>
						</table>
						<ucare:table  type="query" width="550" >
							<tr>
								<td>
						 			<table border=0 cellpadding=0 cellspacing=0 >
						 				<tr>
											<td width="50" align=right>�⵵ :&nbsp;</td>
											<td>
												<!--<select name="q_bse_y" style="width:70" class="combo_required" required="true" requirednm="�⵵"></select>-->
												<ucare:select name="q_bse_y" brcode="HLD002" code="code" codename="codenm" option="5" width="80" styleClass="combo_required"/>
											</td>
											<td width=75 align=right>�˻����� :&nbsp;</td>
											<td>
												<select name="searchType" class="frm_select" style="width:80" >
													<option value="usernm">����ڸ�</option>
													<option value="userid">���̵�</option>
												</select>
												<input type=text class=frm_text name="searchText" style="width:90px" onkeyup="return(isEnterKey()? on_UserSearch():false);">
											</td>
										</tr>
									</table>
								</td>
								<td width=1 bgcolor=#CCCCCC></td>
								<td width=80 align="center" ><ucare:imgbtn name="btnQuery" value="��ȸ"  width="70"   onClick="on_UserSearch();"/></td>
				 			</tr>
				 		</ucare:table>
						<table border=0 cellpadding=0 cellspacing=0>
				 			<tr><td height="5"></td></tr>
				 		</table>
						<ucare:grid id="UCHLD011S" width="560" height="440" no="true" crud="true">
							<tr event="">
								<td width="50" 	column="chk" 			title="����" 		align="center" format="CHECKBOX" hcheckbox="true" editable="true" sortable="false"></td>
						    	<td width="100" column="user_nm" 		title="����ڸ�" 	align="center"></td>
						    	<td width="100" column="user_id" 		title="���̵�" 		align="center"></td>
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
								<td width="100%" height="30"><font class='stitle'><b>�ް� �ϼ� ����</td>
							</tr>
						</table>
						<ucare:table type="query" width="628">
							<tr>
								<td width="120" align=right><font color="#FF0000">�ϰ� ���� �ϼ�</font> :&nbsp;</td>
								<td width="100">
									<input type=text class=input_required name="lumpDay" onkeyup="fn_chkDay(this);" style="width:70px;text-align:right;">&nbsp;��
								</td>
								<td>&nbsp;</td>
								<td width=1 bgcolor=#CCCCCC></td>
				 				<td width=250 align="center">
				 					<ucare:imgbtn name="btnBalance" value="�ϰ�����" onClick="fn_setLump();"/>
									<ucare:imgbtn name="btnSave2" value="����" onClick="fn_HolidayDaySave();"/>
									<ucare:imgbtn name="btnDelete2" value="����" onClick="fn_HolidayDelete();"/>
				 				</td>
				 			</tr>
						</ucare:table>
						<!--
						<ucare:table type="border">
							<tr>
								<td class="stitle">�̰� ����� ����Ʈ</td>
							</tr>
						</ucare:table>-->
						<table border=0 cellpadding=0 cellspacing=0>
				 			<tr><td height="5"></td></tr>
				 		</table>
						<ucare:grid id="UCHLD012S" width="638" height="440" no="true" crud="true">
							<tr event="">
								<td width="50" 	column="chk"		title="����" 		align="center" format="CHECKBOX" editable="true" sortable="false"></td>
								<td width="80" column="bse_y" 		title="����⵵" 	align="center" format="COMBO" brcode="HLD002"></td>
						    	<td width="80" column="user_nm"		title="����ڸ�" 	align="center"></td>
						    	<td width="80" column="user_id"		title="���̵�" 		align="center"></td>
						    	<td width="80" column="use_dy"		title="����ϼ�"	align="center"></td>
						    	<td width="80" column="rmn_dy"		title="�ܿ��ϼ�"	align="center"></td>
						    	<td width="90" 	column="pmt_dy"		title="�����ϼ�" 	align="right" editable="true"></td>
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
