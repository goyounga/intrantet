<!--
  PROJ : Intranet
  NAME : smpIcon.jsp
  DESC : Icon Sample
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.09.09		김은수		주석추가
  -->
<%@ page language="java" contentType="text/html; charset=euc-kr"%>

<html>
<head>
	<%@ include file="/jsp/include/include.jsp"%>
	
	<script language="javascript">
		function searchCode(dissvc)
{
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS");	// 쿼리ID
	tran.setDisSvc(dissvc);		// gridID
	tran.setPageRow("9999");		// 1Page에 몇 개의 Row를 출력할 것인가?			
	tran.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	tran.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	//tran.setDefClick("true");	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");	
}
		
	</script>
</head>
<body onload="searchCode('grid07')">

<%
	String test = CUtil.stringPadding(String.valueOf(1), "LEFT", "0", 2);
	
	int nTest = Integer.parseInt("3000000");
%>

<form name=f>

<ucare:grid id="grid07" width="800" height="120">
	<tr event="">
		<td  width="50" column="codenm1" title="search" format="IMAGE" image="search"></td>
		<td  width="50" column="codenm2" title="doc" format="IMAGE" image="doc"></td>
		<td  width="50" column="codenm3" title="scissors" format="IMAGE" image="scissors"></td>
		<td  width="50" column="codenm4" title="del" format="IMAGE" image="del"></td>
		<td  width="50" column="codenm5" title="play" format="IMAGE" image="play"></td>
		<td  width="50" column="codenm6" title="save" format="IMAGE" image="save"></td>
		<td  width="50" column="codenm7" title="arrow" format="IMAGE" image="arrow"></td>
	</tr>
</ucare:grid>
	
<br>
<br>

<ucare:table border="detail">
	<tr><td class=MANTDT>calendar</td><td><span class=calendar></span></td></tr>
	<tr><td class=MANTDT>calnext</td><td><span class=calnext></span></td></tr>
	<tr><td class=MANTDT>calprev</td><td><span class=calprev></span></td></tr>
	<tr><td class=MANTDT>pageprev0</td><td><span class=pageprev0></span></td></tr>
	<tr><td class=MANTDT>pageprev</td><td><span class=pageprev></span></td></tr>
	<tr><td class=MANTDT>pagenext</td><td><span class=pagenext></span></td></tr>
	<tr><td class=MANTDT>pagenext0</td><td><span class=pagenext0></span></td></tr>
	<tr><td class=MANTDT>search</td><td><span class=search></span></td></tr>
	<tr><td class=MANTDT>prev</td><td><span class=prev></span></td></tr>
	<tr><td class=MANTDT>prev0</td><td><span class=prev0></span></td></tr>
	<tr><td class=MANTDT>next</td><td><span class=next></span></td></tr>
	<tr><td class=MANTDT>next0</td><td><span class=next0></span></td></tr>
	<tr><td class=MANTDT>minus</td><td><span class=minus></span></td></tr>
	<tr><td class=MANTDT>plus</td><td><span class=plus></span></td></tr>
	<tr><td class=MANTDT>doc</td><td><span class=doc></span></td></tr>
	<tr><td class=MANTDT>save</td><td><span class=save></span></td></tr>
	<tr><td class=MANTDT>light</td><td><span class=light></span></td></tr>
	<tr><td class=MANTDT>up</td><td><span class=up></span></td></tr>
	<tr><td class=MANTDT>down</td><td><span class=down></span></td></tr>
	<tr><td class=MANTDT>left</td><td><span class=left></span></td></tr>
	<tr><td class=MANTDT>right</td><td><span class=right></span></td></tr>
	<tr><td class=MANTDT>big</td><td><span class=big></span></td></tr>
	<tr><td class=MANTDT>small</td><td><span class=small></span></td></tr>
</ucare:table>

</form>
</body>
</html>
