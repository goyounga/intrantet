<!--
 * PROJ : Nexfron Intranet
 * NAME : expHoliday.jsp
 * DESC : �ָ�/���� �ٹ� ��ȸ ȭ��
 * Author : ������	 
 * VER  : 1.0
 * Copyright 2010 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.07.07		������			
-->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>

<%
	String flag 		= CUtil.nvl(request.getParameter("flag"), ""); 
	String strOnClick	= "parent.closeHelp('" + flag + "')";
	String strHelp		= "";
	String disHelp1		= "";
	String disHelp2		= "";
	String disHelp3		= "";
	
	if (flag.equals("1")) {
		disHelp1	= "";
		disHelp2	= "none";
		disHelp3	= "none";
	} else if (flag.equals("2")) {
		disHelp1	= "none";
		disHelp2	= "";
		disHelp3	= "none";
	} else if (flag.equals("3")) {
		disHelp1	= "none";
		disHelp2	= "none";
		disHelp3	= "";
	}
%>
<html>
<body>
<table cellspacing='0' border='0'  cellpadding = "0" class="pbody"  style="margin-top:5px">
	<tr>
		<td height="220" valign="top">
			<table class="ptbl_outline" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td height="150" valign="top">
						<table border=0 cellpadding=0 cellspacing=0 width=400 align="center" style="margin-top:5px">
							<tr><td class="popup_tit" style="padding:7 0 0 45" background="/html/images/common/popupbg.gif">�󼼼���</td></tr>
							<tr><td class="hmargin"></td></tr>
							<tr>
								<td>
									<div style="overflow:auto;width:400px;height:180px">	
									<ucare:table type="detail" width="100%">
										<tr style="display:<%=disHelp1%>">
											<td class=MANTDT width="80">���ϱٹ�<br> ����û<br> ���</td>
											<td class=MANTDM>
												1. ���ϱٹ� ����û�� ���ϴ� �ٹ����ڸ� üũ�մϴ�.<br>
												2. ��û���� �Է��մϴ�.(��)201011<br>
												3. ����û ��ư�� Ŭ���մϴ�.<br>
												4. ���ϱٹ� ��û/����� ���ϱٹ� ��û�������� ��û�� ������ ��ȸ�� �ȴٸ� ���������� ���� �� ���Դϴ�. 
											</td>											
										</tr>
										<tr style="display:<%=disHelp1%>">
											<td class=MANTDT width="80">���ϱٹ�<br> �߰���û<br> ���</td>
											<td class=MANTDM>
												1. ���ϱٹ� ��û/���翡�� ���ϴ� ��û���� �����մϴ�.<br>
												2. ���ϱٹ� �̽�û�������� �߰��Ϸ��� �ٹ����ڸ� üũ�մϴ�. <br>
												3. �߰���û ��ư�� Ŭ���մϴ�.<br>
												4. ���ϱٹ� ��û�������� ��û�� ������ ��ȸ�� �ȴٸ� ���������� ���� �� ���Դϴ�.<br>
												5. �߰���û�� �ϰԵǸ� ���縦 ó������ �ٽ� �޾ƾ� �մϴ�. 
											</td>											
										</tr>
										<tr style="display:<%=disHelp1%>">
											<td class=MANTDT width="80">���ϱٹ�<br> �̽�û������<br> ���� ���</td>
											<td class=MANTDM>
												1. �ְ����� ������°� ����Ϸ����� Ȯ�� �մϴ�.<br>
												2. �ְ����� �ۼ��� '�ٹ�'�� ����Ͽ����� Ȯ�� �մϴ�.<br>
											</td>											
										</tr>
										<tr style="display:<%=disHelp2%>">
											<td class=MANTDT width="80">���ϱٹ�<br> ��û����<br> ��ȸ���</td>
											<td class=MANTDM>
												1. �ٹ����ڸ� ������ �� ��ȸ��ư�� Ŭ���Ͽ� ���ϱٹ� ��û/���� ������ ��ȸ�մϴ�.<br>
												2. �ش� ��û���� Ŭ���ϸ� ���ϱٹ� ��û������ ��ȸ�˴ϴ�.<br>
											</td>											
										</tr>
										<tr style="display:<%=disHelp2%>">
											<td class=MANTDT width="80">���ϱٹ�<br> ����û���<br> ���</td>
											<td class=MANTDM>
												1. ����Ϸ��� �ٹ����ڸ� üũ�մϴ�.<br>
												2. ����û��� ��ư�� Ŭ���մϴ�.<br>
												3. ����� ������ ���ϱٹ� ��û�������� ������ ���ϱٹ� �̽�û�������� ��ȸ�Ǹ� ���������� ���� �� ���Դϴ�.<br>
											</td>											
										</tr>
										<tr style="display:<%=disHelp3%>">
											<td class=MANTDT width="80">���ϱٹ�<br> ����û<br> ���</td>
											<td class=MANTDM>
												1. �Ʒ� ���ϱٹ� �̽�û�������� ����û�� �մϴ�.<br>
											</td>											
										</tr>
										<tr style="display:<%=disHelp3%>">
											<td class=MANTDT width="80">���ϱٹ�<br> ����û<br> ������</td>
											<td class=MANTDM>
												1. �ٹ����ڸ� ������ �� ��ȸ��ư�� Ŭ���Ͽ� ���ϱٹ� ��û/���� ������ ��ȸ�մϴ�.<br>
												2. ��û���� ��û���� Ŭ���ϸ� �Ʒ� ���ϱٹ� ��û������ ��ȸ�˴ϴ�.<br>
												3. ��û���� ���ϱٹ� ��û������ Ȯ���� �� ���� �Ǵ� �ݷ��� üũ�մϴ�.<br>
												4. �������� ��ư�� Ŭ���մϴ�.<br>
											</td>											
										</tr>
									</ucare:table>
									</div>
									<!-- ��ư  -->
									<table border=0 cellpadding=0 cellspacing=0 width="400">
										<tr>
											<td align="right">
												<div class="btnbar"></div>
												<table class="tbl_button" border="0" cellpadding="0" cellspacing="0">
													<tr>
														<td align="right"><ucare:imgbtn name="btnClose" kind="X" onClick="<%=strOnClick%>"/></td>
													</tr>
												</table>	
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</body>	
</html>