<!--
  PROJ : Nexfron Intranet
  NAME : dasProjectStatTab.jsp
  DESC : 현황판 - 프로젝트현황 메인
  Author : 박준규 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2010.09.06		박준규		개발
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
	<title>프로젝트현황</title>
	<%@ include file="/jsp/include/include.jsp"%>
</head>
<script language="javascript">
var loadingCheck = new Hashtable();
function moveTab_onclick(index)
{
	for (var i=0; i < itab.length; i++)
	{
		itab[i].style.display = "none";
	}

	itab[index].style.display = "";

	var ifmReport = document.all('ifmReport')(index);

	if (loadingCheck.get(ifmReport.alias) == false)
	{
		ifmReport.src = ifmReport.alias+".jsp";
		loadingCheck.put(ifmReport.alias, true);
	}
}
</script>
</head>
<body onload="moveTab_onclick(0)" style="border-color:red;border-width:0;border-style:solid;">
	<table><tr><td height="5"></td></tr></table>
	<ucare:table id="moveTab" type="tab" name="프로젝트현황,개인별 프로젝트현황" width="130" >
		<tr >
			<td id="itab" style="display:"     valign="top" align="left">
				<Iframe id="ifmReport" alias="dasProjectStat"  src="" scrolling="NO" height="820" width="1250" frameborder="0" marginwidth="0" marginheight="0" framespacing="0"></Iframe>
			</td>
			<td id="itab" style="display:none" valign="top" align="left">
				<Iframe id="ifmReport" alias="dasProjectStatOfMan" src="" scrolling="NO" height="820" width="1250" frameborder="0" marginwidth="0" marginheight="0" framespacing="0"></Iframe>
			</td>
			<!--td id="itab" style="display:none" valign="top" align="left">
				<Iframe id="ifmReport" alias="rstReportFlow"    src="" scrolling="NO" height="740" width="984" frameborder="0" marginwidth="0" marginheight="0" framespacing="0"></Iframe>
			</td-->
		</tr>
	</ucare:table>
</body>
</html>