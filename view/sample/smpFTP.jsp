<!--
  PROJ : Intranet
  NAME : smpFTP.jsp
  DESC : FTP File Upload Sample
  Author : ������ ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.09.17		������		�����ۼ�
  -->
  
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%> 
<html>
<head>
<script language = "javascript">
	function deleteFile()
	{
	    var k = ucutil.RemoveMyFile("c:\\test\\tab_menu02.gif");
	    if (k ==0) alert("���ϻ�������");
	}
	
	function downloadFile()
	{
	   //ip, port, �����, ��й�ȣ, �������� �ٿ�������ϸ�(�������),  localpc ���丮,  �ٿ������ ����� �̸�
	   var k = ucutil.DownloadFile("210.221.221.104", "ucare", "ucare", "/tab_menu02.gif", "c:\\test", "tab_menu02.gif");
	   if (k ==0) alert("����download����");
	}
	
	function uploadFile()
	{
	   //ip, port, �����, ��й�ȣ, localpc���� upload�� ���ϸ�(�������),  ������ ���� ��ġ(���+���ϸ�)
	   var k = ucutil.UploadFile("127.0.0.1", "ucare", "ucare", "d:\\��������͸��.txt", "/��������͸��.txt");
	   if (k ==0) alert("���� upload ����");
	}
	
	iPort = 2121;
	
	function init()
	{
	   ucutil.SetInit(iPort,1);
	}
	
	function send()
	{
	   ucutil.SendMsg(ip.value, iPort, senddata.value);
	}
	
	function onClickButton()
	{
		uploadFile();
	}
</script>
<script language=javascript    event="OnRcvData(sIp, sData)" for=ucutil>
    alert("�����ּ�:"+sIp+"<br>"+sData);
</script>
</head> 
<body>
<form name="f">

<input type="text" name="logTxt" style="width:200">
<ucare:imgbtn name="btnReg" type="S" value="TestFTPUpload" onClick="onClickButton()"/> 


</form>

<OBJECT
	id="ucutil"
	name="ucutil"
	style="WIDTH:0px;HEIGHT:0px"
	classid="CLSID:75AB3445-283A-4E84-BED6-1EF585839CB7"
	codebase="/cab/ucutil.cab#Version=1,0,0,3">
</OBJECT>

</body>
</html>