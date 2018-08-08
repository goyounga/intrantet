<!--
  PROJ : Intranet
  NAME : smpTab.jsp
  DESC : Tab Tag Sample
  Author : ������ ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.09.09		������		�ּ��߰�
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>��(Tab) ����</title>
<script language="javascript" src="<%= scriptPath %>/js/sample/smpTab.js"></script>
</head>
<body>
<form name="f">

<ucare:table type="border" width="980">
	<tr>
		<td class="MANTDT">tab</td>
		<td>
		
			
			<!-- Tab Sample -->		
			<ucare:table id="tabsample1" type="tab" name="��1,��2" width="70">
				<tr id="tabview">
					<td>
						<div style="width:500; height:100">
							<br><br><br>
							<font color=red size=10>ù ��° ��</font>
						</div>
					</td>
				</tr>
				<tr id="tabview" style="display:none;">
					<td>
						<div style="width:500; height:100">
							<br><br><br>
							<font color=blue size=10>�� ��° ��</font>
						</div>
					</td>
				</tr>
			</ucare:table>

			<!-- Tab Sample -->		
			<ucare:table id="tabsample2" type="tab" tabType="_g" name="��1,��2" width="70">
				<tr id="tabview2">
					<td>
						<div style="width:500; height:100">
							<br><br><br>
							<font color=red size=10>ù ��° ��</font>
						</div>
					</td>
				</tr>
				<tr id="tabview2" style="display:none;">
					<td>
						<div style="width:500; height:100">
							<br><br><br>
							<font color=blue size=10>�� ��° ��</font>
						</div>
					</td>
				</tr>
			</ucare:table>
		
		
		</td>
		<td>
			&nbsp;
		</td>
	</tr>
	<tr>
		<td class="MANTDT">vtab(��� �Ұ�, ���� ���� �ʿ�)</td>
		<td>
		
			
			<!-- VTab Sample -->
			<ucare:table type="detail">
				<tr>
					<td>
						<div id="vtabview" style="display:; width:470; height:100">
							<br><br><br>
							<font color=red size=10>ù ��° ��</font>		
						</div>
						<div id="vtabview" style="display:none; width:470; height:100">
							<br><br><br>
							<font color=blue size=10>�� ��° ��</font>				
						</div>
						<div id="vtabview" style="display:none; width:470; height:100">
							<br><br><br>
							<font color=green size=10>�� ��° ��</font>				
						</div>
					</td>
					<td>
						<ucare:table id="tabsample3" type="vtab" name="��<br>1,��<br>2,��<br>3" height="60">
						</ucare:table>
					</td>
				</tr>
			</ucare:table>
		
		
		</td>
		<td>
			&nbsp;
		</td>
	</tr>
</ucare:table>	

</form>

</body>
</html>