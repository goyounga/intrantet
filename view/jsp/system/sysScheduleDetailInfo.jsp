<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<%
 	String scheduleid = request.getParameter("scheduleid");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>�ֿ� ����</title>
<script language="javascript" src="/html/js/system/sysScheduleDetailInfo.js"></script>
</head>
<body topmargin=0 leftmargin=0 onload="init()">
<form name="fQuery">
<input type="hidden" name="scheduleid" value="<%=scheduleid%>" >
<table border=0 cellpadding=0 cellspacing=0 width=800>
	<tr>
		<td>
			<table width="100%" height="30" border="0" cellpadding="0" cellspacing="0" background="/html/images/common/popupbg.gif">
				<tr>
					<td class="popup_tit"><b>�ֿ� ����</b></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<table border=0 cellpadding=1 cellspacing=1 width=800>
	<tr>
		<td><span class="stitle">�� ����</span></td>
	</tr>
	<tr valign=top>		
		<td>
			<ucare:table id="" type="detail" width="100%">
				<tr>
					<td class=MANTDT width=80>���� ����</td>
					<td class=tbl_td width=650 colspan=3>
						<input type="text" class="frm_noborder" maxlength="100"readonly name="scheduletitle" style="width:350;" required="true" requirednm="����">	
					</td>
				</tr>
				<tr>
					<td class=MANTDT width=120>��������</td>
					<td class=tbl_td colspan=3>					
						<input type=text class="frm_noborder" maxlength="8" readonly rmode="Y,Y,Y" rclear="N" name=basedt size=10 required=true title="�ԽñⰣ"  pattern="D" format="DATE">&nbsp; 
					</td>
				</tr>
				<tr>
					<td class=MANTDT>�� ��</td>
					<td class=tbl_td colspan=3><span id=scheduledesc  style="width:655;height:380; overflow-y:scroll"></span>
						<!--<textarea class="frm_noborder" name="noticedesc"  style="width:655;height:400" required="true" requirednm="����"></textarea>
					--></td>
				</tr>
				<tr>
					<td class=MANTDT >�ۼ���</td>
					<td class=tbl_td >
						<input type="text" class="frm_noborder" maxlength="100" readonly name="usernm" style="width:80;">
					</td>
					<td class=MANTDT width=50>�ۼ���</td>
					<td class=tbl_td>
						<input type="text" class="frm_noborder" maxlength="100" readonly name="regdt" style="width:100;" format="DATE">
					</td>
				</tr>
				<tr>
					<td class=MANTDT>���� ����</td>
					<td class=tbl_td colspan=3>
						<input type="text" class="frm_noborder" readonly name="scheduletypecd" style="width:100;">
						<!--
						<ucare:select name="noticetype" option="4" brcode="SYS003" code="code" codename="codenm" width="100" styleClass="frm_select" tag="required='true' requirednm='�Խñ���'" />
						-->
					</td>
				</tr>					
			</ucare:table>
		</td>
	</tr>
	<tr>
		<td align=right> 
			<ucare:imgbtn name="btnClose"  value="�ݱ�"  width="40" onClick="popupClose()" 	classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" /> &nbsp</td>
		</td>
	</tr>	
</table>
</form>

</body>
</html>