<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; application/x-www-form-urlencoded; charset:euc-kr" Accept-Charset="euc-kr"/>
<title>고객상담</title>
<script language="javascript">
var opener = window.dialogArguments;

function closePopAnswerWin(){
	self.close();
}

function popAnswer(){
	opener.Answer();
	self.close();
}
</script>
</head>
<body  style="margin:0">
  <!-- 전화받기 창 -->
<table id="CallRinging" bgcolor=white border=0 cellpadding=0 cellspacing=0 style="border:0px solid #DDDDDD;position:absolute;top:0;left:0;width:300;">
	<tr>
		<td>
			<ucare:table type="query" width="100%">
				<tr valign=top>
					<td colspan=2>
						<table border=0 cellpadding=0 cellspacing=0 width=100%>
							<tr>
								<td style="padding-top:2px; padding-left:5">
									<span class="stitle">전화 오는 중</span>
								</td>
								<td width=30 align=right style="padding-right:5px;"><span class="xclose" onclick="closePopAnswerWin()"></span></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr height="120">
					<td align=center colspan=2><img src="/html/images/bar_cti/phonecall.gif" border=0 style="border:1px solid #E4E4E4"></td>
				</tr>
				<tr>
					<td align=center colspan="2">
						<ucare:imgbtn name="btnAnswer" value="전화받기" width="80" onClick="popAnswer();"/>
					</td>
				</tr>
				<tr height="3">
					<td colspan="2"></td>
				</tr>
			</ucare:table>
		</td>
	</tr>
</table>
 </BODY>
</HTML>
