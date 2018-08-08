<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>경비 관리 Excel Export</title>
<script language="javascript" src="/html/js/expense/expExpenseExcel.js"></script>

</head>
<body onLoad="" topmargin=2 leftmargin=2>
<table border=0 cellpadding=1 cellspacing=1 id=tblList width="390">
	<tr>
		<td><ucare:xtitle title="경비 관리 Excel Export "/></td>
	</tr>
 	<tr>
		<td>
			<form name="fQuery" method="post">			
				<ucare:table type="query" width="380">
					<tr>
						<td width="100" align=right>조회기간 :&nbsp;</td>
						<td width="200">
							<input type="text" class="frm_text" name="q_date_from" maxlength="7" style="width:50" required=true title="조회일자"  pattern="D" value="<%=CUtil.getMyDate(-1, "yyyy-MM")%>">
							&nbsp;~&nbsp;
							<input type="text" class="frm_text" name="q_date_to" maxlength="7" style="width:50" required=true title="조회일자"  pattern="D" value="<%=CUtil.getMyDate(0, "yyyy-MM")%>">
						</td>
						<td>&nbsp;</td>
						<td width=1 bgcolor=#CCCCCC></td>
		 				<td width=80 align="center">
		 					<ucare:imgbtn name="btnExcel" value="Excel" width="60" onClick="Excel()"/>
		 				</td>
		 			</tr>
				</ucare:table>
			</form>
		</td>
	</tr>
</table>
</body>
</html>
<iframe name="iLog" width="0" height="0"></iframe>