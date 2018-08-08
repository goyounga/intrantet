<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>워드사전</title>
<%@ include file="/jsp/include/include.jsp"%>
<script language="javascript" src="/html/js/ucareprogram/ucrWordDic.js"></script>
</head>
<body onload="init()" leftmargin="5">

<form name="fQuery" method="post" target="iLog" action="/common.do">

<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>
		<td colspan=5>
			<ucare:table type="query" width="1215">
				<tr>
					<td width=80 align="right">워드유형&nbsp;</td>
					<td>
						<ucare:select name="word_type" option="10" brcode="UCR003" width="100" required="false" requirednm="워드유형"/>
					</td>
					<td width=50>&nbsp;</td>
					<td width=100>
						<ucare:select name="keycode_t" option="-1" brcode="UCR002" width="100" required="true" requirednm="검색유형"/>
					</td>
					<td>
						<ucare:input type="text" styleClass="input_text" name="keyword" width="200" mode="active" tag="onKeyUp=\"pressEnter('query(this)')\""/>
					</td>
					<td width=700>&nbsp;<div style=display:none><ucare:input type="text" styleClass="input_text" name="keycode" /></div></td>
	 				<td width="70" align="right">
	 					<ucare:imgbtn name="btnsearch" type="G" kind="R" onClick="query()"/>
	 				</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
</form>
<form name="f" method="post" target="iLog" action="/common.do">

<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="user_nm" value="<%=sessioninfo.getUserName()%>">


	<tr class=hmargin><td></td></tr>
	<tr class=hmargin><td align="right">
			※ 컬럼명 작성방법 : 각각의 단어와 단어 사이에는 '_'로 구분한다. ex) 상담_대분류  => CONSL_LCD, 통화_일자 => CALL_DATE
		</td></tr>

	<tr>
		<td class="stitle">워드사전목록</td>

	</tr>
	<tr>
		<td valign="top" colspan=2>
			<ucare:grid id="UCUCR305S" width="1225" height="680" crud="true" no="false">
				<tr event="O">
					<td width="70"	column="colm_nm" 		title="컬럼영문명"		align="left" editable="true" maxlength="5"></td>
					<td width="120"	column="kor_nm"			title="한글명"	 		align="left" editable="true" maxlength="20"></td>
					<td width="100"	column="word_type" 		title="워드유형"			align="left" format="COMBO" brcode="UCR003" editable="true"></td>
					<td width="530"	column="word_desc" 			title="설명" 		align="left" maxlength="1000" editable="true"></td>
					<td width="80"	column="rg_dt" 				title="등록일자"		align="center" format="DATE"></td>
					<td width="70"	column="rg_tm" 				title="등록시간"		align="center" format="TIME"></td>
					<td width="60"	column="rg_nm" 				title="등록자"		align="center"></td>
					<td width="80"	column="mdf_dt" 			title="수정일자"		align="center" format="DATE"></td>
					<td width="70"	column="mdf_tm" 			title="수정시간"		align="center" format="TIME"></td>
					<td width="60"	column="mdf_nm" 			title="수정자"		align="center"></td>
				</tr>
			</ucare:grid>
		</td>
	</tr>
	<tr class=hmargin><td></td></tr>
</table>


<table border=0 cellpadding=0 cellspacing=0 width="100%">
	<tr>
		<td align="right">
			<table cellpadding=2 cellspacing=0>
				<tr>
					<td align="right"><ucare:imgbtn name="btnAdd" kind="A" value="추가" onClick="appendRow()"/></td>
					<td align="right"><ucare:imgbtn name="btnSave" 	kind="S" onClick="save()"/></td>
					<!-- td align="right"><ucare:imgbtn name="btnDel"  kind="D" onClick="deleteRow()"/></td-->
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>

<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>
