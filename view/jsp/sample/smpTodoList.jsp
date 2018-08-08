<!--
  PROJ : Intranet
  NAME : smpTodoList.jsp
  DESC : ���� Todo List ���� ȭ��
  Author : ������ ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.09.10		������		�����ۼ�
  -->
  
<%@ page language="java" contentType="text/html; charset=euc-kr"%>

<html>
<head>
	<title>ToDo List</title>
	<%@ include file="/jsp/include/include.jsp"%>    
	<script language="javascript" src="<%= scriptPath %>/js/sample/smpTodoList.js"></script>
</head>

<body class="mainbody" onload="setInit()">
<form name="f">

<table border=0 cellpadding=0 cellspacing=0>
	<tr>
		<td rowspan="10" width="10"></td>
		<td>
			<table class="tblSearch" width="100%">
				<tr>
					<td>
						<ucare:imgbtn width="70" name="btnSearch" kind="R" onClick="query()"/>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class="hmargin"></td>
	</tr>
	<tr>
		<td>
		
			<table class="tblData">
				<tr>
					<th>����</th>
					<td></td>
					<th>����</th>
					<td></td>
					<th>�Ϸ�</th>
					<td></td>
					<th>����</th>
				</tr>
				<tr>
					<td>
						<ucare:grid id="UCSMP011S" width="300" height="500" no="false"> 
							<tr>
								<td width="20" column="chk" title=" " align="center" format="CHECKBOX" hcheckbox="true" editable="true"></td>
								<td width="40" column="jobid" title="����ID" align="center"></td>
								<td width="120" column="jobnm" title="������"></td>
								<td width="100" column="usr_prj_seq" title="������Ʈ" align="center" format="COMBO" queryid="UCSYS105S"></td>
							</tr>
						</ucare:grid>
					</td>
					<td>
						<div class="right" ></div><br/>
						<div class="left" ></div> 
					</td>
					<td>
						<ucare:grid id="UCSMP012S" width="300" height="500" no="false" stylegb="Green"> 
							<tr>
								<td width="20" column="chk" title=" " align="center" format="CHECKBOX" hcheckbox="true" editable="true"></td>
								<td width="40" column="jobid" title="����ID" align="center"></td>
								<td width="120" column="jobnm" title="������"></td>
								<td width="100" column="usr_prj_seq" title="������Ʈ" align="center" format="COMBO" queryid="UCSYS105S"></td>
							</tr>
						</ucare:grid>
					</td>
					<td>
						<div class="right" ></div><br/>
						<div class="left" ></div> 
					</td>
					<td>
						<ucare:grid id="UCSMP013S" width="300" height="500" no="false"> 
							<tr>
								<td width="20" column="chk" title=" " align="center" format="CHECKBOX" hcheckbox="true" editable="true"></td>
								<td width="40" column="jobid" title="����ID" align="center"></td>
								<td width="120" column="jobnm" title="������"></td>
								<td width="100" column="usr_prj_seq" title="������Ʈ" align="center" format="COMBO" queryid="UCSYS105S"></td>
							</tr>
						</ucare:grid>
					</td>
					<td>
						<div class="right" ></div><br/>
						<div class="left" ></div> 
					</td>
					<td>
						<ucare:grid id="UCSMP014S" width="300" height="500" no="false">
							<tr>
								<td width="20" column="chk" title=" " align="center" format="CHECKBOX" hcheckbox="true" editable="true"></td>
								<td width="40" column="jobid" title="����ID" align="center"></td>
								<td width="120" column="jobnm" title="������"></td>
								<td width="100" column="prj_seq" title="������Ʈ" align="center" format="COMBO" queryid="UCSYS105S"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
			</table>
			
		</td>
	</tr>
	<tr>
		<td class="hmargin"></td>
	</tr>
	<tr>
		<td>
			<table class="tblData" width="100%">
				<tr>
					<th>������</th>
					<td>
						<ucare:input type="text" name="jobnm" width="400" title="������" required="true" maxsize="200"/>
					</td>
					<th>�����</th>
					<td>
						<ucare:input type="text" name="rg_id" width="60" title="�ۼ���ID" required="true"/>
						<ucare:input type="text" name="rg_nm" width="100" title="�ۼ���" required="false" readonly="true"/>
						<span id="btnUserId" class=search onClick="openUserOrg('rg_id')"></span>
					</td>
					
				</tr>
				<tr>
					<th>�������</th>
					<td>
						<ucare:select name="statcd" brcode="SYS021" width="100" option="4" required="true" requirednm="�������"/>
					</td>
					<th>������Ʈ</th>
					<td>
						<ucare:select name="prj_seq" queryid="UCSYS105S" code="code" codename="codenm" width="200" option="4" required="true" requirednm="������Ʈ"/>
					</td>
				</tr>
				<tr>
					<th>�޸�</th>
					<td colspan="3">
						<textarea name="memo" style="width:700;height:100" maxsize="2000" class="Input_text" required="false" requirednm="�޸�"></textarea>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr><td class="hmargin5"></td></tr>
	<tr>
		<td>
			<!-- ��ư  -->
			<table border=0 cellpadding=0 cellspacing=0 width="100%">
				<tr>
					<td align="right">
						<div class="btnbar"></div>
						<table class="tbl_button" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td><ucare:imgbtn name="btnAdd" kind="A" onClick="setAddMode()"/></td>
								<td><ucare:imgbtn name="btnSave" kind="S" onClick="save()"/></td>
								<td><ucare:imgbtn name="btnDel" kind="D" onClick="remove()"/></td>
								<td><ucare:imgbtn name="btnCancel" kind="C" onClick="setCancelMode()"/></td>
							</tr>
						</table>	
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>

</form>

</body>
</html>