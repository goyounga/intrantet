<!--
 * PROJ : 넥스프론 
 * NAME : sysScheduleBusi.jsp
 * DESC : 영업팀주요일정관리
 * Author : 김성규 
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.06.24		김성규		신규작성
	-->
<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>영업팀주요일정관리</title>
	<%
		String query = comBean.getParam("query").asString();
		
		
		// 01 -> 솔루션사업팀 , 02 -> 개발1팀 , 03 -> 개발2팀 , 04 -> 경영관리팀 , 05 -> 대표이사
		// 사용시 주석해제후 사용
		
		if(!sessioninfo.getUserPartCD().equals("01") || !sessioninfo.getUserPartCD().equals("05"))
		{
		%>
			<script>
				//alert('권한이 없습니다. 관리자에게 문의하세요.');
				//history.back(-1);
			</script>
		<%
		}
	%>
	<script language="javascript" src="/html/js/system/sysScheduleBusi.js"></script>
</head>
	<style type="text/css" <%=(CUtil.nvl(request.getParameter("mode"),"").equals("A") ? "" : "media='print'")%>>
	.noprint { display: none; }
	</style>
<body onload="init('<%=CDateUtil.getFormatString("yyyyMMdd")%>','<%=CUtil.nvl(request.getParameter("mode"),"")%>')" style="padding:0 0 0 5;">
<table width="1225" cellspacing="0" cellpadding="0" border="0" >
	<tr>
		<td width=100%><ucare:xtitle title="영업일정관리"/></td>
	</tr>
	<ucare:table type="tab" width="100" name="달력,리스트" id="Tab">
	<tr id="divTab" style="display:" align="center" >
		<td>
			<div style="width:1220; height:100">
			<form name=f>
			<input type="hidden" name="cen_cd"  value="B" width="150"/>	<!-- 일반,영업 구분코드 -->
			<input type=hidden name="cen_sch_id"> <!-- 일정ID -->
			<input type=hidden name="userid" value="<%=sessioninfo.getUserID()%>"> <!-- 등록 , 수정자 -->
			<input type=hidden name="query" value="<%=query%>">
			<center>
			<div id=divPlan style="position:absolute; left:50px;top:80px; z-index:10000;display:none;width:400;height:180">
				<table cellspacing='0' border='0'  cellpadding = "0" class="pbody"  style="margin-top:5px"><tr><td height="218" valign="top">
					<table class="ptbl_outline" border="0" cellpadding="0" cellspacing="0"><tr><td height="228" valign="top">
						<table border=0 cellpadding=0 cellspacing=0 width=200 align="center" style="margin-top:5px"><tr>
							<td class="popup_tit" style="padding:7 0 0 45" background="/html/images/common/popupbg.gif">상세일정</td></tr>
							<tr>
								<td class="hmargin"></td>
							</tr>
							<tr>
								<td>	
									<ucare:table type="detail">
										<tr height="30">
											<td class=MANTDT width="80">기준일자</td>
											<td class=MANTDM width="100">
												<ucare:input type="text" name="bse_dt" readonly="true" required="true" title="기준일자" width="70" format="DATE" />
											</td>
											<td class=MANTDT width="80">방문시간</td>
											<td class=MANTDM width="100">
												<ucare:input type="text" name="bse_tm" title="방문시간" width="70" maxlength="6" format="TIME" />
											</td>
										</tr>
										<tr height="30">
											<td class=MANTDT >담당자</td>
											<td class=MANTDM >
												<ucare:input type="text" name="user_id" title="담당자" width="70" />
											</td>
											<td class=MANTDT >방문사유</td>
											<td class=MANTDM >
												<ucare:input type="text" name="visit_cd" title="방문사유" width="100%" mode="active" maxlength="100" maxsize="100" format="MAX"/>
											</td>
										</tr>
										<tr height="30">
											<td class=MANTDT >방문처</td>
											<td class=MANTDM colspan="3">
												<ucare:input type="text" name="clnt_co" title="방문처" width="100%" mode="active" maxlength="100" maxsize="100" format="MAX"/>
											</td>
										</tr>
										<tr height="30">
											<td class=MANTDT >협력사</td>
											<td class=MANTDM colspan="3">
												<ucare:input type="text" name="visit_pat" title="협력사" width="100%" mode="active" maxlength="100" maxsize="100" format="MAX"/>
											</td>
										</tr>
										<tr height="30">
											<td class=MANTDT >일정제목</td>
											<td class=MANTDM colspan="3">
												<ucare:input type="text" name="cen_sch_sbjt" required="true" requirednm="일정제목" title="일정제목" width="100%" mode="active" maxlength="100" maxsize="100" format="MAX"/>
											</td>
										</tr>
										<tr height="30">
											<td class=MANTDT >일정내용</td>
											<td class=MANTDM colspan="3" style="padding: 2 3 2 3">
												<textarea name="cen_sch_cont" class="input_text" style="width:100%;height:60;ime-mode:active" maxsize="600" format="MAX"></textarea>
											</td>
										</tr>
										<tr height="30">
											<td class=MANTDT >방문결과</td>
											<td class=MANTDM colspan="3" style="padding: 2 3 2 3">
												<textarea name="visit_reg" class="input_text" style="width:100%;height:60;ime-mode:active" maxsize="600" format="MAX"></textarea>
											</td>
										</tr>
									</ucare:table>
									<!-- 버튼  -->
									<table border=0 cellpadding=0 cellspacing=0 width="400">
										<tr>
											<td align="right">
												<div class="btnbar"></div>
												<table class="tbl_button" border="0" cellpadding="0" cellspacing="0">
													<tr>
														<td align="right"><ucare:imgbtn name="btnAdd" kind="A" onClick="add(this)"/></td>
														<td align="right"><ucare:imgbtn name="btnSave" kind="S" onClick="save(this)"/></td>	
														<td align="right"><ucare:imgbtn name="btnDel" kind="D" onClick="del()"/></td>	
														<td align="right"><ucare:imgbtn name="btnCancel" kind="C" onClick="setCancelMode()"/></td>
														<td align="right"><ucare:imgbtn name="btnClose" kind="X" onClick="closePlan()"/></td>
													</tr>
												</table>	
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</table>
				</table>
			</div>
			</form>
			<form name="fQuery" method="post" target="iLog" action="/common.do">
			<table border=0 cellpadding=0 cellspacing=0 width=100%>
				<!-- 조회조건  -->
				<tr>
					<td colspan=5>
						<table border=0 cellpadding=0 cellspacing=0 width=250 align="center" style="margin-top:5px">
							<tr align=center height=33>
								<td align=right><span class=calprev onclick=getMonth("-")></span></td>
								<td width=150>
									<select name=year class="frm_select" onchange="getMonth('')" style="width:60">
										<option value=2013>2013</option>
										<option value=2012>2012</option>
										<option value=2011>2011</option>
										<option value=2010>2010</option>
										<option value=2009>2009</option>
										<option value=2008>2008</option>
										<option value=2007>2007</option>
										<option value=2006>2006</option>
										<option value=2005>2005</option>
										<option value=2005>2004</option>
										<option value=2003>2003</option>
										<option value=2002>2002</option>
									</select>
									<select name=month class="frm_select" onchange="getMonth('')" style="width:50">
										<option value='01'>1월</option>
										<option value='02'>2월</option>
										<option value='03'>3월</option>
										<option value='04'>4월</option>
										<option value='05'>5월</option>
										<option value='06'>6월</option>
										<option value='07'>7월</option>
										<option value='08'>8월</option>
										<option value='09'>9월</option>
										<option value='10'>10월</option>
										<option value='11'>11월</option>
										<option value='12'>12월</option>
									</select>
								</td>
								<td align=left><span class=calnext onclick=getMonth("+")></span></td>
							</tr>
						</table>
					</td>
				</tr>
			
				<tr><td colspan=3 class=hmargin></td></tr>
			
			</table>
			</form>
			<form name=fv>
			<table id=caltbl border=0 cellpadding=0 cellspacing=0 width="100%" height="90%">	
				<tr><td  valign=top height=100%>
						<table cellpadding="0" width="100%" height="100%" cellspacing="0" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/images/common/sch_bg_crop.gif', sizingMethod='scale');z-index;0">	
							<tr>
								<td></td>
							</tr>
						</table>
						<table cellpadding="0" width="100%" height="100%" cellspacing="0" border="1" bordercolorlight="#D8D8D8" bordercolordark="#FFFFFF" style="position:relative;top:-100%;z-index;9999">
							<tr>					
								<td width="170" class="sch_th01"><b class="cal2">일</b></td>
								<td width="170" class="sch_th01"><b>월</b></td>
								<td width="170" class="sch_th01"><b>화</b></td>
								<td width="170" class="sch_th01"><b>수</b></td>
								<td width="170" class="sch_th01"><b>목</b></td>
								<td width="170" class="sch_th01"><b>금</b></td>
								<td width="170" class="sch_th02"><b class="cal3">토</b></td>								
			 				</tr>
							<tr>
								<td colspan="7" height="3"><img src="/html/images/layout/sp.gif" width="1" height="1" border="0"></td>
							</tr>
							<%
								for (int i=0; i < 6; i++)
								{
									out.println("<tr height='16%' id='calTr"+i+"'>");
									for (int j=0; j <7; j++)
									{
										out.println("<td valign='top' id='calTd_"+(i*7+j)+"' style='padding:5 5 5 5;' onmouseover=boldChgOver(this,'','"+(i*7+j)+"') onmouseout=boldChgOut(this,'','"+(i*7+j)+"') onclick=\"showPlan(this, "+(i*7+j)+")\" ) valign='top'>");
										out.println("<table width='100%' height='99' border='0' cellspacing='0' cellpadding='0' id='UCSYS1512S' style='overflow-y:scroll;width:100%;'>");
										out.println("	<tr>");
										out.println("		<td align='left'  class='cal1' height='16%' nowrap >&nbsp;</td>");
										out.println("		<td align='rignt' class='cal1' width='50%' nowrap >&nbsp;</td>");
										out.println("	</tr>");
										out.println("	<tr>");
										out.println("		<td colspan='2' align='left' width='125'  height='20'  valign='top' class='cal1' nowrap >&nbsp;</td>");
										out.println("	</tr>");
										out.println("</table>");
										out.println("</td>");
									}
									out.println("</tr>");
								}
							%>
						</table>
					</td>
				</tr>
			
				<!-- 버튼  -->
			
				<tr>
					<td align="right" id=divbutton style="display:">
						<div class="btnbar"></div>
						<table class="tbl_button" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td align="left" width ="100%"><font color="red">※달력의 일자나 일정제목을 클릭하면 센터일정 팝업을 볼 수 있습니다.</font></td>
								<td align="right"><ucare:imgbtn name="btnPrint"  kind="P" onClick="calPrint()"/></td>
			<%
				//팝업으로 띄우는 경우 닫기버튼 보이기
				if(!query.equals(""))
				{
			%>
								<td align="right"><ucare:imgbtn name="btnWinClose"  kind="X" onClick="winClose()"/></td>
			<%
				}
			%>
							</tr>
						</table>	
					</td>
				</tr>
			</table>
			</form>
			</div>
		</td>
	</tr>
	<tr id="divTab" style="display:none" align="center">
		<td>
			<!-- 검색조건 S -->
			<form name="fQuerys" method="post">
			<table width="1215" cellpadding="0" cellspacing="0" border="0">
			<tr>
				<td>
					<ucare:table type="query" width="1215">
						<tr>
							<td width="80" align="right">등록일자 :&nbsp;</td>
							<td width="300">
								<ucare:input type="text" name="startdt" width="70" title="시작일" format="DATE" value="<%=CUtil.getMyDate(-12, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="시작일" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
								<span class=calendar onclick="openCalendar('fQuerys.startdt' , fQuerys.startdt.value)"></span>&nbsp;
								~&nbsp;
								<ucare:input type="text" name="enddt" width="70" title="종료일" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="종료일" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
								<span class=calendar onclick="openCalendar('fQuerys.enddt' , fQuerys.enddt.value)"></span>
							</td>
							<td width="80" align="right">검색조건 :&nbsp;</td>
							<td width="300">
								<select name="searchType" class="combo_text">
									<option value=""> == 선택 == </option>
									<option value="user_id">담당자ID</option>
									<option value="user_nm">담당자명</option>
									<option value="cen_sch_sbjt">제목</option>
									<option value="cen_sch_cont">주요내용</option>
									<option value="visit_reg">방문결과</option>
								</select>
								<input type=text class="input_text" name="searchText" size=15 onkeyup="return(isEnterKey()? queryList():false);" >
							</td>
							<td>&nbsp;</td>
							<td width="1" bgcolor=#CCCCCC></td>
							<td width="80" align="right">
								<ucare:imgbtn name="btnQuery"	value="조회"	onClick="queryList()"/><!-- 조회 -->
							</td>
						</tr>
					</ucare:table>
				</td>
			</tr>
			</table>
			</form>
			<!-- 검색조건 E -->
			<!-- 본문 S -->
			<form name="fs">
				<ucare:grid id="UCSYS1510S" width="1215" height="600" no="true" >
					 <tr event="O">
						<td title=" "  			column="chk1"		align="center"	width="20" 		format="CHECKBOX" hcheckbox="true" editable="true" ></td>
						<td title="방문일자"		column="bse_dt"		format="DATE" 	align="center"	width="80"  />
						<td title="방문시간"		column="bse_tm"		format="SEC" 	align="center"	width="80"  />
						<td title="방문처"		column="clnt_co"	align="center"	width="100"  />
						<td title="방문사유"		column="visit_cd"	align="center"	width="100"   />
						<td title="일정제목"		column="cen_sch_sbjt"		align="center"	width="200"  />
						<td title="주요내용"		column="cen_sch_cont"		align="center"	width="200"  />
						<td title="담당자"	 	column="user_nm"	align="center"	width="80"  />
						<td title="방문결과"		column="visit_reg"	align="center"	width="200"  />
						<td title="협력사"	 	column="visit_pat"	align="center"	width="100"  />
						<td title="등록일자"	 	column="rg_dt" 		format="DATE" 	align="center"	width="80"  />
						<td title="등록시간"	 	column="rg_tm" 		format="SEC" 	align="center"	width="80"  />
						<td title="등록자"	 	column="rg_id"		align="center"	width="80"  />
						<td title="수정일자"	 	column="mdf_dt" 	format="DATE" 	align="center"	width="80"  />
						<td title="수정시간"	 	column="mdf_tm" 	format="SEC" 	align="center"	width="80"  />
						<td title="수정자"	 	column="mdf_id"		align="center"	width="80"  />
						
						<td title="일정ID"		column="cen_sch_id"	align="center"	width="100"  hidden="true"/>
					 </tr>
				</ucare:grid>
			
			<!-- 본문 E -->
			<table>
				<tr><td class=hmargin></td></tr>
			</table>
			<!-- 버튼  -->
			<table align="right" cellpadding="0" cellspacing="0" border="0">
				<tr>
				     <td>
				     	<ucare:imgbtn name="btnAdd"  kind="A" onClick="conslpop('A')"/>
				     	<ucare:imgbtn name="btnSave" kind="U" onClick="conslpop('U')"/>
				     	<ucare:imgbtn name="btnDel"  kind="D" onClick="remove()"/>
				     </td>
			    </tr>
		   </table>
		   </form>	
		</td>
	</tr>
	</ucare:table>
</table>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>