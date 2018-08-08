<!--
  PROJ : Intranet
  NAME : smpImageButton.jsp
  DESC : 화면설명
  Author : 작성자명 직위
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ======================================================================
		변		경		사		항 ======================================================================
  VERSION	DATE		AUTHOR		DESCRIPTION
======================================================================
  1.0		2009.09.08	김은수	주석추가
  -->

<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>이미지버튼 샘플</title>
<script language="javascript" src="js/smpImageButton.js"></script>
</head>
<body onLoad="setInit()">
<form name="f">

<table border=0>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn name="btnEvent" value="버튼 이벤트" kind="read" onClick="imageButtonTest()"/> 
		</td>
	</tr>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn width="90" name="btnActive" value="버튼 비활성화" kind="write" disable="true"/> 
		</td>
	</tr>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn width="90" name="btnActive" value="버튼 활성화" kind="write" disable="false"/> 
		</td>
	</tr>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn width="90" name="btnTooltip" value="버튼 툴팁" kind="write" title="버튼 설명은 여기에 하세요. 글씨말고 이미지에 마우스 포인터를 두세요."/> 
		</td>
	</tr>
	<tr>
		<td>
			type : 사용안함 <br/>
			src : 사용안함<br/>
			tabIndex : 사용안함<br/>
		</td>
	</tr>
</table>

</form>

</body>
</html>