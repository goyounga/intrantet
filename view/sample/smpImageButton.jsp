<!--
  PROJ : Intranet
  NAME : smpImageButton.jsp
  DESC : ȭ�鼳��
  Author : �ۼ��ڸ� ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ======================================================================
		��		��		��		�� ======================================================================
  VERSION	DATE		AUTHOR		DESCRIPTION
======================================================================
  1.0		2009.09.08	������	�ּ��߰�
  -->

<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>�̹�����ư ����</title>
<script language="javascript" src="js/smpImageButton.js"></script>
</head>
<body onLoad="setInit()">
<form name="f">

<table border=0>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn name="btnEvent" value="��ư �̺�Ʈ" kind="read" onClick="imageButtonTest()"/> 
		</td>
	</tr>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn width="90" name="btnActive" value="��ư ��Ȱ��ȭ" kind="write" disable="true"/> 
		</td>
	</tr>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn width="90" name="btnActive" value="��ư Ȱ��ȭ" kind="write" disable="false"/> 
		</td>
	</tr>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn width="90" name="btnTooltip" value="��ư ����" kind="write" title="��ư ������ ���⿡ �ϼ���. �۾����� �̹����� ���콺 �����͸� �μ���."/> 
		</td>
	</tr>
	<tr>
		<td>
			type : ������ <br/>
			src : ������<br/>
			tabIndex : ������<br/>
		</td>
	</tr>
</table>

</form>

</body>
</html>