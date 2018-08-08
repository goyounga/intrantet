<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<%
	//EIS 에 내주는 대리점 민원 화면에서 사용하는 화면이다.
	String agent_code = CUtil.nvl(request.getParameter("agent_code"));
	
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>가맹점 조회</title>
<script language="javascript" src="/html/js/common/comCustSearch.js"></script>
</head>
<body topmargin=0 leftmargin=0 onload="init();">
	
<table border=0 cellpadding=0 cellspacing=0 width=1000>
	<tr>
		<td>
			<table width="100%" height="30" border="0" cellpadding="0" cellspacing="0" background="/html/images/common/popupbg.gif">
				<tr>
					<td class="popup_tit"><b>가맹점 조회</b></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<table border=0 cellpadding=5 cellspacing=0 width=1000>
	<form name="fMbrQuery" method="post">
		<input type="hidden" name="agent_code" value="<%=agent_code%>">
	<tr id="divTab" style="display:" align="center" class="box_bg02">
		<td>
			<table border=0 cellpadding=1 cellspacing=1>
				<tr>
					<td>
						<ucare:table type="query" width="100%">
							<tr>
								<td width=80 align=right style="padding:2 0 0 0 ">사업자번호 :&nbsp;</td>
								<td width=100><input type="text" name="registration_no" class="frm_text" style="width:80" format="NUMBER" requirednm="사업자번호" maxlength="10" onKeyPress="checkKeyPress('M')"></td>
								<td width=50 align=right style="padding:2 0 0 0 ">상 호 :&nbsp;</td>
								<td width=170><input type="text" name="shop_name" class="frm_text" style="width:160" requirednm="상호" onKeyPress="checkKeyPress('M')"></td>
								<td width=90>
									<select name="searchType" class="frm_select" style="width:85;margin-top:1">
										<option value="3">유사어 검색</option>
										<option value="2">동의어 검색</option>
										<option value="1">상세 검색</option>
									</select>
								</td>
								<td align=right style="padding:2 0 0 0 ">대표자 :&nbsp;</td>
								<td><input type="text" name="chief_name" class="frm_text" style="width:80" requirednm="대표자" onKeyPress="checkKeyPress('M')"></td>
								<td align=right style="padding:2 0 0 0 ">점번호 :&nbsp;</td>
								<td><input type="text" name="mbr_seq_code" class="frm_text" style="width:80" requirednm="점번호" maxlength="5" onKeyPress="checkKeyPress('M')"></td>
								<td width=50>&nbsp;</td>
								<td width=1 bgcolor=#CCCCCC rowspan=2></td>
				 				<td width=120 align=center rowspan=2>
				 					<ucare:imgbtn name="btnQuery" value="조회" width="40" onClick="mbrQuery()" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" />
				 					<ucare:imgbtn name="btnInit" value="초기화" width="50" onClick="mbrInit()" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" />
							</tr>
						</ucare:table>
					</td>
				</tr>
				<tr valign=top>
					<td>
						<ucare:table id="MBRPOPDATASET" rows="1" type="list" width="980" height="438" pageman="true" no="true" fixed="1">
							<tr event="D">
								<td width="260" column="shop_name" title="상호" align="left"></td>
								<td width="90" 	column="kmps_mbr_no" title="가맹점번호" align="center"></td>
								<td width="100" column="registration_no" title="사업자번호" align="center" format="REG"></td>
								<td width="100" column="chief_name" title="대표자명" align="center"></td>
								<td width="299" column="agent_name" title="관리 대리점명" align="left" length="30"></td>
								<td width="80" 	column="agent_code" title="대리점코드" align="center"></td>
								<td width="80" 	column="mbr_seq_code" title="점번호" align="center"></td>
								<td width="80" 	column="cust_status" title="고객상태" align="center"></td>
								<td width="80" 	column="zip_code_office" title="우편번호" align="center"></td>
								<td width="250" column="office_address" title="사무실 주소" align="left"></td>
								<td width="250" column="address_office" title="사무실 상세 주소" align="left"></td>
								<td width="80" 	column="cell_phone_no" title="휴대폰 번호" format="TEL" align="center"></td>
								<td width="100" column="office_phone_no" title="사무실 전화번호" format="TEL" align="center"></td>
								<td width="80"	column="fax_no" title="FAX번호" format="TEL" align="center"></td>
								<td width="250" column="email_addr" title="EMAIL 주소" align="left"></td>
							</tr>
						</ucare:table>
<script language="javascript">
/*
No 셀 늘리기
화면 딜레이를 줄이기 위해 그리드를 그리자 마자 늘려준다.
*/
extendFixedNoSize(MBRSELECT_ID, 30, 30);
</script>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
</table>

</body>
</html>