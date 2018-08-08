<!--
 * PROJ : 넥스프론 테스트
 * NAME : sysScheduleBusiP.jsp
 * DESC : 영업팀주요일정관리 팝업
 * Author : 김성규 
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.06.25		김성규		신규작성
	-->
<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<%
	String pop_type = request.getParameter("pop_type");
 	String cen_sch_id = request.getParameter("cen_sch_id");
 	String user_id = sessioninfo.getUserID();
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>영업팀주요일정관리 팝업</title>
	<script language="javascript" src="/html/js/system/sysScheduleBusi.js"></script>
</head>

<body onLoad="setInit('<%=pop_type%>');" style = "margin: 0">
<form name="fDetail">
<table width="100%" cellspacing="0" cellpadding="0" border="0">
	<tr>
		<input type="hidden" name="cen_cd"  value="B" width="150"/>	<!-- 일반,영업 구분코드 -->
		<input type="hidden" name="cen_sch_id"  value="<%=cen_sch_id%>" width="150"/> <!-- 일정ID -->
		<input type="hidden" name="user_id" value="<%=user_id%>" width="150"/><!-- 담당자 -->
		<input type="hidden" name="userid"  value="<%=user_id%>" width="150"/><!-- 등록 , 수정자 -->
	</tr>
</table>
<table width="100%" cellspacing="0" cellpadding="0" border="0">
	<tr>
		<td>
			<table class="tblData" width="750">
				<tr>
					<th width="100" align="right">예약일시 :&nbsp;</th>
					<td>
						<ucare:input type="text" name="bse_dt" width="70" title="예약일자" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="예약일자" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
						<span class=calendar onclick="openCalendar('fDetail.bse_dt' , fDetail.bse_dt.value)"></span>&nbsp;
						<ucare:input type="text" name="bse_tm" format="TIME" maxlength="6" />
					</td>
					<th width="100">담당자</th>
					<td>
						<ucare:input type="text" name="user_nm" width="200"/>
					</td>
				</tr>
				<tr>
					<th>방문처</th>
					<td>
						<ucare:input type="text" name="clnt_co" width="200"/>
					</td>
					<th>협력사</th>
					<td>
						<ucare:input type="text" name="visit_pat" width="200"/>
					</td>
				</tr>
				<tr>
					<th>방문사유</th>
					<td colspan="3">
						<ucare:input type="text" name="visit_cd" width="600"/>
					</td>
				</tr>
				<tr>
					<th>일정제목</th>
					<td colspan="3">
						<ucare:input type="text" name="cen_sch_sbjt" width="600"/>
					</td>
				</tr>
				<tr>
					<th>주요내용</th>
					<td colspan="3">
						<textarea name="cen_sch_cont" class="input_textarea_required" style="width:600;height:100"  ></textarea>
					</td>
				</tr>
				<tr>
					<th>방문결과</th>
					<td colspan="3">
						<textarea name="visit_reg" class="input_textarea_required" style="width:600;height:100"  ></textarea>
					</td>
				</tr>
			</table>
			<!-- 버튼  -->
			<table border=0 cellpadding=0 cellspacing=0 width="750">
			 <tr>
				  <td align="right">
				   <div class="btnbar"></div>
					   <table class="tbl_button" border="0" cellpadding="0" cellspacing="0">
						    <tr>
							     <td><ucare:imgbtn name="btnSave" value="저장" onClick="saves()"/></td>
							     <td><ucare:imgbtn name="btnClose" value="취소" onClick="self.close()"/></td>
						    </tr>
					   </table> 
				  </td>
			 </tr>
			</table>
		</td>
	</tr>
</table>
</form>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>