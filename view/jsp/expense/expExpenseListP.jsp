<!-------------------------------------------------------->
<!--  Intranet	    	         	 					-->
<!-- @version 1.0                 	 					-->
<!-- @author  lee,chang-uk             					-->
<!-- @since  2009.06.18                 				-->
<!-------------------------------------------------------->

<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>경비 신청</title>
<script language="javascript" src="/html/js/expense/expExpenseListP.js"></script>

</head>
<body>
<form name="f" method="post">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	
<table border=0 cellpadding=1 cellspacing=1 id=tblList width="775">
	<tr>
		<td><ucare:xtitle title="경비 신청"/></td>
	</tr>
	<tr>
		<td valign="top">
			<ucare:table type="detail" width="775">
				<tr>
					<td class=MANTDT width="100">프로젝트명</td>
					<td class=tbl_td width="200"><input name="prj_nm" type="text" class="input_required" style="width:100%" required=true title="프로젝트명"></td>
					<td class=MANTDT width="100">결재자</td>
					<td class=tbl_td width="130"><ucare:select name="snc_id" option="4" brcode="EXP001" width="130" styleClass="combo_required" required="true" requirednm="결재자"/></td>
					<td class=MANTDT width="100">협조자</td>
					<td class=tbl_td><ucare:select name="coprt_id" option="4" brcode="EXP001" width="130" styleClass="combo_required" required="true" requirednm="협조자"/></td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	<tr>
		<td valign="top">
			<table border=0 cellpadding=0 cellspacing=0 width="100%" background='/images/common/tabbg.gif'>
				<tr>
					<td width="100%" height="30"><font class='stitle'><b>지출 상세 내역</td>
				</tr>
			</table>
			<ucare:grid id="UCEXP013S" width="775" height="300" no="true">
				<tr event="D">
					<td width="100" column="expt_dt"		title="지출일자"	align="center" format="DATE" editable="true"></td>
					<td width="80"	column="expt_amt"		title="지출금액"	align="center" editable="true"></td>
					<td width="80"	column="expt_c_cd"		title="지출구분"	align="center" format="COMBO" brcode="EXP002" editable="true"></td>
				    <td width="100"	column="expt_act_cd"	title="지출계정"	align="center" format="COMBO" brcode="EXP003" editable="true"></td>
				    <td width="70"	column="rip_doc_f"		title="영수증여부"	align="center" format="COMBO" brcode="COM002" editable="true"></td>
				    <td width="270" column="expt_rmk"		title="지출적요"	align="left" editable="true"></td>
				 </tr>
			</ucare:grid>
		</td>
	</tr>
	<tr>
		<td align=right>
			<table border=0 cellpadding=0 cellspacing=0>
				<tr>
					<td>
						<ucare:imgbtn name="btnPlus" value="추가" width="60" onClick="fn_ExpsHstAdd();"/>
						<ucare:imgbtn name="btnSave" value="저장" width="60" onClick="on_Save();"/>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>

</body>
</html>
