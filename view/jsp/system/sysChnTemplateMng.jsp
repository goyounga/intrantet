<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>ä�� ���ø� ����</title>
<script language="javascript" src="/html/js/system/sysChnTemplateMng.js"></script>
</head>
<body onLoad="on_Load()">
<form name="fQuery" method="post">

<table border=0 cellpadding=1 cellspacing=1 id=tblList width="100%">
 	<tr><td colspan=9><ucare:xtitle title="ä�� ���ø� ����"/></td></tr>	
 	<tr>
		<td colspan=9>
			<ucare:table type="query" width="100%">
				<tr>
					<td width="80" align=right >��ȸ�Ⱓ :&nbsp;</td>
					<td width="200">
						<input type="text" class="frm_text" name="q_date_from" size=10 required=true requirednm="�������" title="�������"  pattern="D" value="<%=CUtil.getMyDate(-1, "yyyy/MM/dd")%>"><span class=calendar onclick="return ifrmCal.service(fQuery.q_date_from)"></span>&nbsp; 
						~
						<input type="text" class="frm_text" name="q_date_to" size=10 required=true requirednm="�������" title="�������"  pattern="D" value="<%=CDateUtil.getDateString()%>"><span class=calendar onclick="return ifrmCal.service(fQuery.q_date_to)"></span>
					</td>
					<td width="90" align="right">ä������ :&nbsp;</td>
					<td width="70">
						<ucare:select name="q_channel_type" brcode="SYS001" code="code" codename="codenm" option="10" width="100" styleClass="frm_select"/>
						<!--<select name="" class="frm_select" style="width:80" >
							<option >��ü</option>c
							<option >FAX</option>
							<option >SMS</option>
							<option >Email</option>
						</select>-->
					</td>
					<td width=85 align=right>���ø��� :&nbsp;</td>
					<td width=190>
						<input type=q_templatenm class=frm_text name=q_template_nm size=27 required=false>
					</td>
					<td>&nbsp;</td>
					<td width=1 bgcolor=#CCCCCC></td>
	 				<td width=60><ucare:imgbtn name="btnQuery" value="��ȸ"  width="40"   onClick="on_Search()" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" /></td>
	 			</tr>		
			</ucare:table>
		</td>
	</tr>
</form>

<form name="f" method="post">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="mode">
<input type="hidden" name="worktemplateid">
	
	<tr>
		<td valign="top">
			<ucare:table type="border">
				<tr>
					<td class="stitle">ä�� ���ø� ����Ʈ</td>
				</tr>
			</ucare:table>
			<ucare:table id="UCSYS001S" rows="32" type="list" width="630" height="685" pageman="true" summary="false" no="true">
			  <tr class="LIST" event="O">
			    <td width="80" column="channeltypenm" title="ä������" align="center"></td>
			    <td width="400" column="templatenm" title="���ø���" align="center"></td>
			    <td width="100" column="useyn" title="��뿩��" align="center"></td>
			  </tr>
			</ucare:table>
		</td>
		<td valign="top">
			<ucare:table type="border">
				<tr>
					<td class="stitle">ä�� ���ø� ����</td>
					<td>&nbsp;</td>
				</tr>
			</ucare:table>
			<ucare:table type="detail" width="100%">
				<tr>
					<td class=MANTDT width=100>ä������</td>
					<td class=tbl_td><ucare:select name="channeltype" brcode="SYS001" code="code" codename="codenm" option="4" width="100" styleClass="Input_mb05" tag="required='true' requirednm='ä������'" onChange="on_Change(this)"/></td>
				</tr>
				<tr>
					<td class=MANTDT>���ø���</td>
					<td class=tbl_td><input name="templatenm" type="text" class="frm_text" size=40  required="true" requirednm="���ø���"></td>
				</tr>
				<tr>	
					<td class=MANTDT>���ø����</td>
					<td class=tbl_td><input name="templatepath" type="text" class="frm_readonly" size=40 readOnly><span id="pathBtn" class=search onClick="openFileDir()"></span></td>
				</tr>
				<tr>
					<td class=MANTDT>��뿩��</td>
					<td class=tbl_td>
						<select name="useyn" class="frm_select" style="width:100px">
							<option value="">== ���� ==</option>
							<option value="Y">���</option>
							<option value="N">�̻��</option>
						</select>
					</td>
				</tr>
				<tr>
					<td class=MANTDT>����</td>
					<td class=tbl_td><textarea name="templatedesc" cols=70 rows=20></textarea></td>
				</tr>								
			</ucare:table>
			<ucare:table type="border" width="100%">
				<tr>
					<td align="right">
						<ucare:table type="border">
							<tr>
								<td align="right">
									<ucare:imgbtn width="40" name="btnAdd" value="���"  classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight"  onClick="addTemplate()"/>
									<!--<ucare:imgbtn width="40" name="btnEdit" value="����"  classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight"  onClick="objectReadOnly(false)"/>-->
									<ucare:imgbtn width="40" name="btnSave" value="����"  classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight"  onClick="on_Save()"/>
									<ucare:imgbtn width="40" name="btnDel" value="����"  classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight"  onClick="on_Delete()"/>
								</td>
							</tr>
							<tr>
								<td height="10"></td>
							</tr>
							
						</ucare:table>
					</td>					
				</tr>
			</ucare:table>
		</td>
	</tr>
</form>
</table>

</body>
</html>