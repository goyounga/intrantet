<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%> 

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>uCare AtiveX 다운로드</title>
<script language="javascript">

function closeWin(){
//	alert(typeof(DmCallCon.GetLineType) + typeof(ctl_RunDm.DM_IsDMRunning) + typeof(DmMonitor.SiteID) + typeof(UCTcpctl.bConnected) + typeof(LogWriter.log));
	if(!(typeof(DmCallCon.GetLineType) == "undefined" ||
		typeof(ctl_RunDm.IsDmRun) == "undefined" ||
		typeof(DmMonitor.SiteID) == "undefined" ||
		typeof(UCTcpctl.bConnected) == "undefined" ||
		typeof(LogWriter.log) == "undefined")) {
//		opener.location.href = "http://"+window.location.host+"/jsp/common/login.jsp";
		alert("설치가 완료되였습니다.\r\n 다시 접속해 주십시요");
		opener.close();
		window.opener = self; 
		self.close(); 

	} 
}
</script>
</head>
<body style=margin:0 onLoad="closeWin();">
<center>
<br>
<table width="625" border="0" cellspacing="1" cellpadding="28" bgcolor="#C8C8C8">
  <tr>
    <td align="center" valign="middle" bgcolor="#FFFFFF">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td rowspan="9" valign="top" align="right"><img src="/html/images/main/loading_img01.gif"></td>
          <td><img src="/html/images/main/loading_img05.gif"></td>
        </tr>
        <tr>
          <td height="7"></td>
        </tr>
        <tr>
          <td><img src="/html/images/main/loading.gif"></td>
        </tr>
        <tr>
          <td height="15"></td>
        </tr>

        <tr>
          <td>
            <table border='0' cellspacing='0' cellpadding='0'>
              <tr valign='top'>
                <td width='9'><b><img src='/images/main/bu_33.gif' align='absmiddle' border='0' vspace='6'></b></td>
                <td>CTI 설치를 묻는 경고창이 나타나면 반드시 '예'를 선택하여 주십시오<br>
                  이는, 원활한 CTI 사용을 제공하기 위해 필요한 소프트웨어를 설치하는 절차이며,<br>
                  '아니오'를 선택하시는 경우 다음 절차로 넘어갈 수 없습니다
				 </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</center>
</body>
</html>

<!-- CTI-->

<OBJECT ID="DmCallCon" CLASSID="CLSID:E76C5DE1-5C0F-4928-910C-BFFBAC92DF4C" CODEBASE="/cab/DmCallCon.CAB#version=1,0,0,0" style="width:0;height:0;"></OBJECT>

<!-- <OBJECT id="ctl_RunDm" classid="CLSID:67DD642F-590A-4FCA-9F20-23EC2F6FF19D" CODEBASE="/cab/RumDm.CAB#version=1,0,0,1" style="width:0;height:0;"></OBJECT> -->

<OBJECT id="ctl_RunDm" classid="clsid:40367C1F-7772-4303-AB23-6ADD32AA343F" CODEBASE="/cab/DMStart.ocx#version=1,0,0,1" style="width:0;height:0;"></OBJECT>

<OBJECT id="DmMonitor" classid="CLSID:369BA108-B92D-48AF-BD1A-34D23E9672D6" CODEBASE="/cab/DmMonitor.CAB#version=1,0,0,0" style="width:0;height:0;">
</OBJECT>

<!-- 녹취-->
<OBJECT id="UCTcpctl" classid="clsid:D64A6034-81FE-426B-8CC3-0C5B677E42D0" codebase="/cab/UCTCPControl.ocx#version=1,0,0,4" style="width:0;height:0;" ></OBJECT>

<!-- LogWriter -->
<OBJECT ID="LogWriter" CLASSID="clsid:ADAEB55B-35F0-46E2-AC8D-EFDE5B00D6F6" CODEBASE="/cab/uCareLog.ocx#version=1,0,0,1" style="width:0;height:0;">  
<PARAM NAME="LOGPREFIX" value="UCARE_Tour_">
<PARAM NAME="LOGPATH" value="C:\uLog">
</OBJECT>

<!-- RD Viewer -->
<OBJECT id="rdviewer" name="rdviewer" classid="clsid:ADB6D20D-80A1-4AA4-88AE-B2DC820DA076"  codebase="http://211.32.53.141:8080/appeon/rdviewer50.cab#version=5,0,0,180" style="width:0;height:0;">
</OBJECT>


<!-- ERP 연동 -->
<object id="EonProxy" left=0 border="0" width="0" height="0" classid="CLSID:454CFFD6-60E4-4518-984D-0AA473C84E7A" codebase="http://sim.sejoong.com:8080/appeon/apbproxy.cab#version=1,0,0,1"></object>
