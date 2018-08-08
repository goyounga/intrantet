<!--
  PROJ : Intranet
  NAME : smpFTP.jsp
  DESC : FTP File Upload Sample
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.09.17		김은수		최초작성
  -->
  
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%> 
<html>
<head>
<script language = "javascript">
	function deleteFile()
	{
	    var k = ucutil.RemoveMyFile("c:\\test\\tab_menu02.gif");
	    if (k ==0) alert("파일삭제성공");
	}
	
	function downloadFile()
	{
	   //ip, port, 사용자, 비밀번호, 서버에서 다운받을파일명(경로포함),  localpc 디렉토리,  다운받을때 사용할 이름
	   var k = ucutil.DownloadFile("210.221.221.104", "ucare", "ucare", "/tab_menu02.gif", "c:\\test", "tab_menu02.gif");
	   if (k ==0) alert("파일download성공");
	}
	
	function uploadFile()
	{
	   //ip, port, 사용자, 비밀번호, localpc에서 upload할 파일명(경로포함),  서버에 넣을 위치(경로+파일명)
	   var k = ucutil.UploadFile("127.0.0.1", "ucare", "ucare", "d:\\백업데이터목록.txt", "/백업데이터목록.txt");
	   if (k ==0) alert("파일 upload 성공");
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
    alert("보낸주소:"+sIp+"<br>"+sData);
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