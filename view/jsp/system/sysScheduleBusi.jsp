<!--
 * PROJ : �ؽ����� 
 * NAME : sysScheduleBusi.jsp
 * DESC : �������ֿ���������
 * Author : �輺�� 
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.06.24		�輺��		�ű��ۼ�
	-->
<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>�������ֿ���������</title>
	<%
		String query = comBean.getParam("query").asString();
		
		
		// 01 -> �ַ�ǻ���� , 02 -> ����1�� , 03 -> ����2�� , 04 -> �濵������ , 05 -> ��ǥ�̻�
		// ���� �ּ������� ���
		
		if(!sessioninfo.getUserPartCD().equals("01") || !sessioninfo.getUserPartCD().equals("05"))
		{
		%>
			<script>
				//alert('������ �����ϴ�. �����ڿ��� �����ϼ���.');
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
		<td width=100%><ucare:xtitle title="������������"/></td>
	</tr>
	<ucare:table type="tab" width="100" name="�޷�,����Ʈ" id="Tab">
	<tr id="divTab" style="display:" align="center" >
		<td>
			<div style="width:1220; height:100">
			<form name=f>
			<input type="hidden" name="cen_cd"  value="B" width="150"/>	<!-- �Ϲ�,���� �����ڵ� -->
			<input type=hidden name="cen_sch_id"> <!-- ����ID -->
			<input type=hidden name="userid" value="<%=sessioninfo.getUserID()%>"> <!-- ��� , ������ -->
			<input type=hidden name="query" value="<%=query%>">
			<center>
			<div id=divPlan style="position:absolute; left:50px;top:80px; z-index:10000;display:none;width:400;height:180">
				<table cellspacing='0' border='0'  cellpadding = "0" class="pbody"  style="margin-top:5px"><tr><td height="218" valign="top">
					<table class="ptbl_outline" border="0" cellpadding="0" cellspacing="0"><tr><td height="228" valign="top">
						<table border=0 cellpadding=0 cellspacing=0 width=200 align="center" style="margin-top:5px"><tr>
							<td class="popup_tit" style="padding:7 0 0 45" background="/html/images/common/popupbg.gif">������</td></tr>
							<tr>
								<td class="hmargin"></td>
							</tr>
							<tr>
								<td>	
									<ucare:table type="detail">
										<tr height="30">
											<td class=MANTDT width="80">��������</td>
											<td class=MANTDM width="100">
												<ucare:input type="text" name="bse_dt" readonly="true" required="true" title="��������" width="70" format="DATE" />
											</td>
											<td class=MANTDT width="80">�湮�ð�</td>
											<td class=MANTDM width="100">
												<ucare:input type="text" name="bse_tm" title="�湮�ð�" width="70" maxlength="6" format="TIME" />
											</td>
										</tr>
										<tr height="30">
											<td class=MANTDT >�����</td>
											<td class=MANTDM >
												<ucare:input type="text" name="user_id" title="�����" width="70" />
											</td>
											<td class=MANTDT >�湮����</td>
											<td class=MANTDM >
												<ucare:input type="text" name="visit_cd" title="�湮����" width="100%" mode="active" maxlength="100" maxsize="100" format="MAX"/>
											</td>
										</tr>
										<tr height="30">
											<td class=MANTDT >�湮ó</td>
											<td class=MANTDM colspan="3">
												<ucare:input type="text" name="clnt_co" title="�湮ó" width="100%" mode="active" maxlength="100" maxsize="100" format="MAX"/>
											</td>
										</tr>
										<tr height="30">
											<td class=MANTDT >���»�</td>
											<td class=MANTDM colspan="3">
												<ucare:input type="text" name="visit_pat" title="���»�" width="100%" mode="active" maxlength="100" maxsize="100" format="MAX"/>
											</td>
										</tr>
										<tr height="30">
											<td class=MANTDT >��������</td>
											<td class=MANTDM colspan="3">
												<ucare:input type="text" name="cen_sch_sbjt" required="true" requirednm="��������" title="��������" width="100%" mode="active" maxlength="100" maxsize="100" format="MAX"/>
											</td>
										</tr>
										<tr height="30">
											<td class=MANTDT >��������</td>
											<td class=MANTDM colspan="3" style="padding: 2 3 2 3">
												<textarea name="cen_sch_cont" class="input_text" style="width:100%;height:60;ime-mode:active" maxsize="600" format="MAX"></textarea>
											</td>
										</tr>
										<tr height="30">
											<td class=MANTDT >�湮���</td>
											<td class=MANTDM colspan="3" style="padding: 2 3 2 3">
												<textarea name="visit_reg" class="input_text" style="width:100%;height:60;ime-mode:active" maxsize="600" format="MAX"></textarea>
											</td>
										</tr>
									</ucare:table>
									<!-- ��ư  -->
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
				<!-- ��ȸ����  -->
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
										<option value='01'>1��</option>
										<option value='02'>2��</option>
										<option value='03'>3��</option>
										<option value='04'>4��</option>
										<option value='05'>5��</option>
										<option value='06'>6��</option>
										<option value='07'>7��</option>
										<option value='08'>8��</option>
										<option value='09'>9��</option>
										<option value='10'>10��</option>
										<option value='11'>11��</option>
										<option value='12'>12��</option>
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
								<td width="170" class="sch_th01"><b class="cal2">��</b></td>
								<td width="170" class="sch_th01"><b>��</b></td>
								<td width="170" class="sch_th01"><b>ȭ</b></td>
								<td width="170" class="sch_th01"><b>��</b></td>
								<td width="170" class="sch_th01"><b>��</b></td>
								<td width="170" class="sch_th01"><b>��</b></td>
								<td width="170" class="sch_th02"><b class="cal3">��</b></td>								
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
			
				<!-- ��ư  -->
			
				<tr>
					<td align="right" id=divbutton style="display:">
						<div class="btnbar"></div>
						<table class="tbl_button" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td align="left" width ="100%"><font color="red">�ش޷��� ���ڳ� ���������� Ŭ���ϸ� �������� �˾��� �� �� �ֽ��ϴ�.</font></td>
								<td align="right"><ucare:imgbtn name="btnPrint"  kind="P" onClick="calPrint()"/></td>
			<%
				//�˾����� ���� ��� �ݱ��ư ���̱�
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
			<!-- �˻����� S -->
			<form name="fQuerys" method="post">
			<table width="1215" cellpadding="0" cellspacing="0" border="0">
			<tr>
				<td>
					<ucare:table type="query" width="1215">
						<tr>
							<td width="80" align="right">������� :&nbsp;</td>
							<td width="300">
								<ucare:input type="text" name="startdt" width="70" title="������" format="DATE" value="<%=CUtil.getMyDate(-12, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="������" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
								<span class=calendar onclick="openCalendar('fQuerys.startdt' , fQuerys.startdt.value)"></span>&nbsp;
								~&nbsp;
								<ucare:input type="text" name="enddt" width="70" title="������" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="������" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
								<span class=calendar onclick="openCalendar('fQuerys.enddt' , fQuerys.enddt.value)"></span>
							</td>
							<td width="80" align="right">�˻����� :&nbsp;</td>
							<td width="300">
								<select name="searchType" class="combo_text">
									<option value=""> == ���� == </option>
									<option value="user_id">�����ID</option>
									<option value="user_nm">����ڸ�</option>
									<option value="cen_sch_sbjt">����</option>
									<option value="cen_sch_cont">�ֿ䳻��</option>
									<option value="visit_reg">�湮���</option>
								</select>
								<input type=text class="input_text" name="searchText" size=15 onkeyup="return(isEnterKey()? queryList():false);" >
							</td>
							<td>&nbsp;</td>
							<td width="1" bgcolor=#CCCCCC></td>
							<td width="80" align="right">
								<ucare:imgbtn name="btnQuery"	value="��ȸ"	onClick="queryList()"/><!-- ��ȸ -->
							</td>
						</tr>
					</ucare:table>
				</td>
			</tr>
			</table>
			</form>
			<!-- �˻����� E -->
			<!-- ���� S -->
			<form name="fs">
				<ucare:grid id="UCSYS1510S" width="1215" height="600" no="true" >
					 <tr event="O">
						<td title=" "  			column="chk1"		align="center"	width="20" 		format="CHECKBOX" hcheckbox="true" editable="true" ></td>
						<td title="�湮����"		column="bse_dt"		format="DATE" 	align="center"	width="80"  />
						<td title="�湮�ð�"		column="bse_tm"		format="SEC" 	align="center"	width="80"  />
						<td title="�湮ó"		column="clnt_co"	align="center"	width="100"  />
						<td title="�湮����"		column="visit_cd"	align="center"	width="100"   />
						<td title="��������"		column="cen_sch_sbjt"		align="center"	width="200"  />
						<td title="�ֿ䳻��"		column="cen_sch_cont"		align="center"	width="200"  />
						<td title="�����"	 	column="user_nm"	align="center"	width="80"  />
						<td title="�湮���"		column="visit_reg"	align="center"	width="200"  />
						<td title="���»�"	 	column="visit_pat"	align="center"	width="100"  />
						<td title="�������"	 	column="rg_dt" 		format="DATE" 	align="center"	width="80"  />
						<td title="��Ͻð�"	 	column="rg_tm" 		format="SEC" 	align="center"	width="80"  />
						<td title="�����"	 	column="rg_id"		align="center"	width="80"  />
						<td title="��������"	 	column="mdf_dt" 	format="DATE" 	align="center"	width="80"  />
						<td title="�����ð�"	 	column="mdf_tm" 	format="SEC" 	align="center"	width="80"  />
						<td title="������"	 	column="mdf_id"		align="center"	width="80"  />
						
						<td title="����ID"		column="cen_sch_id"	align="center"	width="100"  hidden="true"/>
					 </tr>
				</ucare:grid>
			
			<!-- ���� E -->
			<table>
				<tr><td class=hmargin></td></tr>
			</table>
			<!-- ��ư  -->
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