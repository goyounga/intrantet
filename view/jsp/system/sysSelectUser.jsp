<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>사용자 조직도</title>
<script language="javascript" src="/html/js/system/sysSelectUser.js"></script>
</head>
<body topmargin=0 leftmargin=0 onload="init();">
<form name="fQuery">
<input type="hidden" name="code">
<input type="hidden" name="nm_code">
<input type="hidden" name="step">
<input type="hidden" name="user_id">
<input type="hidden" name="user_name">
<table border=0 cellpadding=0 cellspacing=0 width=800>
	<tr>
		<td>
			<table width="100%" height="30" border="0" cellpadding="0" cellspacing="0" background="/html/images/common/popupbg.gif">
				<tr>
					<td class="popup_tit"><b>사용자 조직도</b></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<table border=0 cellpadding=1 cellspacing=1 width=800>
	<tr>
		<td><span class="stitle">조직도</span></td>
		<td><span class="stitle">사용자 리스트</span></td>
	</tr>
	<tr valign=top>
		<td>
			<step id="UCSYS022S_step" column="step" funstep="0" funname="onClickMenu" funviewing="true">
			<tree id="UCSYS022S_tree" column="nm_code" checkbox="false" imgcolumn="img" fold="down">
			<div id="UCSYS022S" class="tree" style="width:200;height:503px"></div>
		</td>
		<td>
			<table border=0 cellpadding=1 cellspacing=1 width=100%>
				<tr>
					<td>
						<ucare:table type="query" width="100%">
							<tr>
								<td width=80 align=right style="padding:2 0 0 0 ">검색어 :&nbsp;</td>
								<td width=100><input type="text" name="username" class="frm_text" size=12 onKeyPress="pressEnter('userQuery()')"></td>
								<td>&nbsp;</td>
								<td width=1 bgcolor=#CCCCCC></td>
				 				<td width=60 align=center>
				 					<ucare:imgbtn name="btnQuery" value="조회"  width="40" onClick="userQuery()" />
							</tr>
						</ucare:table>
					</td>
				</tr>
				<tr>
					<td>
						<ucare:table id="UCSYS023S" rows="20" type="list" width="588" height="397" pageman="true" no="true">
							<tr event="O">
								<td width="120" column="user_name" title="상담원명" align="center"></td>
								<td width="120" column="user_id" title="상담원ID" align="center"></td>
								<td width="275" column="nm_code" title="부서" align="center"></td>
							</tr>
						</ucare:table>
					</td>
				</tr>
				
				<tr>
					<td>
						<ucare:table type="border" width="100%">
							<tr>
								<td width=700 align="right">
				 					<ucare:imgbtn name="btnSave" value="적용"  width="40" onClick="save()" /> 
				 					<ucare:imgbtn name="btnClose" value="닫기"  width="40" onClick="self.close();" /> 
							</tr>
						</ucare:table>
					</td>
				</tr>
				
			</table>
		</td>
	</tr>
</table>
</form>

</body>
</html>