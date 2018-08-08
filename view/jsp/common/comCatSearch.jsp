<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>단말기 조회</title>
<script language="javascript" src="/html/js/common/comCatSearch.js"></script>
</head>
<body topmargin=0 leftmargin=0 onload="init()">
<form name="fQuery">
<table border=0 cellpadding=0 cellspacing=0 width=1000>
	<tr>
		<td>
			<table width="100%" height="30" border="0" cellpadding="0" cellspacing="0" background="/html/images/common/popupbg.gif">
				<tr>
					<td class="popup_tit"><b>단말기 조회</b></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<table border=0 cellpadding=1 cellspacing=1 width=1000>
	<tr valign=top>
		<td>
			<table border=0 cellpadding=1 cellspacing=1 width=100%>
				<tr>
					<td>
						<ucare:table type="query" width="100%">
							<tr>
								<td width=100 align=right>가맹점번호 :&nbsp;</td>
								<td width=110><input type="text" name="kmps_mbr_no" class="frm_text" maxlength="10" format="NUMBER" requirednm="가맹점번호" style="width:100" onKeyPress="checkKey();"></td>
								<td width=100 align=right>단말기번호 :&nbsp;</td>
								<td width=110><input type="text" name="cat_id" class="frm_text" maxlength="10" format="NUMBER" requirednm="단말기번호" style="width:100" onKeyPress="checkKey();"></td>
								<td width=80 align=right>제품번호 :&nbsp;</td>
								<td width=110><input type="text" name="serial_no" class="frm_text" maxlength="10" format="NUMBER" requirednm="제품번호" style="width:100" onKeyPress="checkKey();"></td>
								<td width=100 align=right>단말기상태 :&nbsp;</td>
								<td width=110>
									<select class="frm_select" name="cat_status" style="width:100px">
															<option>전체</option>
<%
	/**
	 * EIS 단말기 상태 코드 가져오기
	 */
	String cat_status[] = CM.getCat_statusKeys();
	
	for(int i = 0 ; i < cat_status.length ; i++)
	{
		out.println("<option value='"+cat_status[i]+"'>" + CM.getCat_status(cat_status[i]) + "</option>");
	}
%>
								</td>
								<td>&nbsp;</td>
								<td width=1 bgcolor=#CCCCCC></td>
				 				<td width=120 align=center>
				 					<ucare:imgbtn name="btnCatQuery" value="조회"  width="40" onClick="query()" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" />
				 					<ucare:imgbtn name="btnCatInit" value="초기화"  width="50" onClick="clearView()" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" />
							</tr>
						</ucare:table>
					</td>
				</tr>
				<tr>
					<td>
						<ucare:table id="CATDATASET" rows="20" type="list" width="990" height="438" pageman="true" no="true">
							<tr event="D">
								<td width="100" column="cat_id" title="단말기번호" align="center"></td>
								<td width="100" column="serial_no" title="제품번호" align="center"></td>
								<td width="80" column="cat_status" title="상태" align="center"></td>
								<td width="80" column="agent_code" title="대리점코드" align="center"></td>
								<td width="150" column="settle_type" title="정산방식" align="center"></td>
								<td width="120" column="draft_bill_code" title="전표구분" align="center"></td>
								<td width="100" column="rom_version" title="ROM버전" align="center"></td>
								<td width="120" column="model_code" title="모델" align="center"></td>
								<td width="80" column="install_user" title="설치자" align="center"></td>
								<td width="80" column="install_dt" title="설치일" align="center"></td>
								<td width="80" column="modify_user" title="수정자" align="center"></td>
								<td width="80" column="modify_dt" title="수정일" align="center"></td>
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