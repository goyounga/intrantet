<!--
  PROJ : Nexfron Intranet
  NAME : infMsgList.jsp
  DESC : ���� - ���� Ȯ��
  Author : ������ ���
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.20		������		���� �ۼ�
  -->
<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>Grid Sample</title>
<script language="javascript" src="/html/js/information/infMsgList.js"></script>
</head>

<body onLoad="msgSendList()">

<form name="f" target="iLog">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>"/>
	
	<ucare:table type="detail" width="50%">
		<tr>
			<td class="MANTDM" >
				<ucare:grid id="UCINF021S" width="640" height="200">
					<!--id�� db��  -->
					<tr event="O">
						
						<td width="20" column="chk" title=" " format="CHECKBOX"
							hcheckbox="true" editable="true" ></td>
						<td width="60" column="read_yn" title="���ſ���"></td>
						<td width="80" column="send_dt" title="��������" format="DATE"></td>
						<td width="80" column="send_tm" title="�����ð�" format="TIME"></td>
						<td width="300" column="title" title="����" ></td>
						<td width="80" column="send_nm" title="�������"></td>
						<!-- �ش� ���� ��ȸ��ư Ŭ����  �ѷ����� ���� -->
						<td width="0" column="contents" title="����" hidden="true"></td>
						<td width="0" column="send_id" title="�������ID" hidden="true"></td>
					</tr>
				</ucare:grid>
			</td>
		</tr>
		
		<tr>
			<td align="right">
				<ucare:imgbtn name="btnSearch" kind="D" onClick="msgRemove()" />
				<ucare:imgbtn name="btnSearch" value="����" onClick="msgReply()" />
			</td>
			
		</tr>
		<tr>
			<td >
				<textarea rows="10" cols="105"  name="contents">
				</textarea>
				
			</td>
			
		</tr>	
	</ucare:table>

</form>

</body>
</html>