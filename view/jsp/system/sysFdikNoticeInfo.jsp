<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>FDIK ���� ����</title>
<script language="javascript" src="/html/js/system/sysFdikNoticeInfo.js"></script>
</head>
<!--
<body topmargin=0 leftmargin=0 onload="init(<%=request.getParameter("frame")%>);">
-->
<body topmargin=0 leftmargin=0 onload="init()">
<form name="fQuery">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<table border=0 cellpadding=0 cellspacing=0 width=800>
	<tr>
		<td>
			<table width="100%" height="30" border="0" cellpadding="0" cellspacing="0" background="/html/images/common/popupbg.gif">
				<tr>
					<td class="popup_tit"><b>FDIK ��������</b></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<table border=0 cellpadding=1 cellspacing=1 width=800>
	<tr>
		<!--<td><span class="stitle">FDIK ���� ����</span></td>-->
		<!--<td><span class="stitle">�� ����</span></td>-->
	</tr>
	<tr valign=top>
		<td>
			<table border=0 cellpadding=1 cellspacing=1 width=100%>
				<tr>
					<td>
						<ucare:table type="query" width="100%">
							<tr>
								<td width=80 align=right style="padding:2 0 0 0 ">�� �� :&nbsp;</td>
								<td width=100><input type="text" name="subject" class="frm_text" size=12 onKeyPress="checkEnterKey();"></td>
								<td width=80 align=right style="padding:2 0 0 0 ">�ۼ��� :&nbsp;</td>
								<td width=100><input type="text" name="writer" class="frm_text" size=12 onKeyPress="checkEnterKey();"></td>
								<!--
								<td width=80 align=right style="padding:2 0 0 0 ">�Խñ��� :&nbsp;</td>
								<td width=100><ucare:select name="" option="4" brcode="SYS003" code="code" codename="codenm" width="100" styleClass="frm_select" /></td>
								-->
								<td>&nbsp;</td>
								<td width=1 bgcolor=#CCCCCC></td>
				 				<td width=60 align=center>
				 					<ucare:imgbtn name="btnQuery" value="��ȸ"  width="40" onClick="query()" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" />
							</tr>
						</ucare:table>
					</td>
				</tr>
				<tr>
					<td>
						<ucare:table id="UCSYS094S" rows="18" type="list" width="790" height="425" pageman="true" summary="false" no="true">
							<tr class="LIST" event="D">
								<td width="450" column="subject" title="����"  align="left" style="padding:0 0 0 10 "></td>
								<!--
								<td width="50" column="agent_code"	title="�Խñ���" align="center"></td>
								-->
								<td width="100" column="create_dt"	title="�ۼ���" align="center"></td>
								<!--
								<td width="70" column="enddt" 		title="�Խ� ������" align="center" format="DATE"></td>
								-->
								<td width="70" column="writer" 		title="�ۼ���" 		align="center" ></td>
								<td width="50" column="query_cnt"	title="��ȸ��" align="center"></td>
							</tr>                                                                           
						</ucare:table>	
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr><td colspan=3 align=right><ucare:imgbtn name="btnClose"  value="�ݱ�"  width="40" onClick="popupClose()" 	classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" /></td></tr>
</table>
</form>
<form name="f">
	<input type="hidden" name="seq_no">
</form>
</body>
</html>