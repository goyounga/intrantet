<!--
  PROJ : Nexfron Intranet
  NAME : infMsgSend.jsp
  DESC : 메세지보내기  화면
  Author : 백승우
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.18		백승우		최초작성
  -->
<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%>
<%
	String recv_id = CUtil.nvl(request.getParameter("send_id"),"");
	String send_nm = CUtil.nvl(request.getParameter("send_nm"),"");
	String reMsg = CUtil.nvl(request.getParameter("reMsg"),"");
%>
<html>
<head>
<title></title>
<script language="javascript" src="js/infMsgSend.js"></script>
</head>
<body topmargin=0 leftmargin=0 onload="reMsgSend()">
<form name="f0">
<input type="hidden" name="recv_id" value="<%=recv_id%>" >
<input type="hidden" name="send_nm" value="<%=send_nm%>">
<input type="hidden" name="reMsg" value="<%=reMsg%>">
</form>
<form name="f">
<input type="hidden" name="send_id" value="<%=sessioninfo.getUserID()%>">
<table width="300" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 	<tr height="30">
 		<td class="popup_tit"><b>쪽지 보내기</b><br></td>
	</tr>
</table>
<table align="center">
	<tr>
		<td>
			<ucare:table type="detail" width="300">
				<tr>
					<td class=MANTDT width="60">제 목</td>
					<td class=MANTDM width="240"><ucare:input type="text" name="title" required="true" requirednm="제목" width="220" mode="active"/> </td>
				</tr>
				<tr>
					<td class=MANTDT width="60">내 용</td>
					<td class=MANTDM width="240"><textarea name="contents" rows="10" cols="33" required="true" requirednm="내용" mode="active"></textarea></td>
				</tr>
				<tr>
				<td class=MANTDT width="60" rowspan="2">받는사람</td>
				<td class=MANTDM width="240">
					<ucare:grid id="UCINF002I" width="220" height="150" no="true" title="true">
						<tr event="O">
							<td width="40" column="chk"  title="선택" format="CHECKBOX" hcheckbox="true" editable="true"/>	
							<td width="140" column="recv_nm" title="받는사람"/>
							<td width="0" column="recv_id" title="받는사람 ID"/>
						</tr>
					</ucare:grid>
				</td></tr><tr>
				<td class="MANTDT4" width="220"><ucare:imgbtn width="70" name="btnImage" value="추가" onClick="openUserOrg('UCINF002I')"/>
												<ucare:imgbtn width="70" name="btnImage" value="삭제" onClick="ps_Del()"/></td>
				</tr>
				<tr>
					<td class="MANTDT4" width="275" colspan="2"><ucare:imgbtn width="70" name="btnImage" value="보내기" onClick="send_Query()"/><ucare:imgbtn name="btnQuery" kind="X"  width="70" onClick="self.close()" /></td>
				</tr>
			</ucare:table>	
		</td>
	</tr>
</table>
</form>
<form name="ff">
<input type="hidden" name="recv_nm">
<input type="hidden" name="recv_id">
</form>
</body>
</html>