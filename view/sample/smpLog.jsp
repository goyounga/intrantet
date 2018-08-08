<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%> 
<html>
<head>
<script language = "javascript">
	
	function onClickButton()
	{
		testLog(f.logTxt.value);
	}
	
	function testLog(msg)
	{
		log("Test Log : " + msg);
	}
	
	function log(msg) {
		LogWriter.log(msg);
	}
</script>
</head> 
<body>
<form name="f">

<input type="text" name="logTxt" style="width:200">
<ucare:imgbtn width="70" name="btnReg" value="TestLog" onClick="onClickButton()"/> 


</form>

<OBJECT ID="LogWriter"
CLASSID="CLSID:ECF3779E-0D2C-4206-8913-605B5EB7C6DE"
CODEBASE="http://127.0.0.1:8088/cab/LogWriter.CAB#version=1,0,0,1" width="0" height="0">   
<PARAM NAME="LOG_PREFIX" value="REC">
<PARAM NAME="LOG_PATH" value="C:\TestLog">
</OBJECT>

</body>
</html>