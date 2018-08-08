<!--
  PROJ : INTRANET
  NAME : comUserOrg.jsp
  DESC : ����ڰ˻�
  Author : ��������
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.13		������		�ּ��߰�
  2.0		2013.01.13		���ر�		����
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<%@ include file="/jsp/include/include.jsp"%>
	<title>����ڰ˻�</title>
	<script language="javascript" src="/html/js/common/comUserOrg.js"></script>
	<link rel="stylesheet" href="/html/style/ucareStyle.css" type="text/css">
	<%
		request.setCharacterEncoding("EUC-KR");
		String corp_cd = request.getParameter("corp_cd");
		String mode    = request.getParameter("mode");
		String multiyn = CUtil.nvl(request.getParameter("multiyn"),"N");
	%>
</head>
<body topmargin="0" leftmargin="0" onLoad="init();" onunLoad="unLoad();">

<form name="f" onsubmit="return false;">
<input type="hidden" name="multiyn" value="<%=multiyn %>">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="use_f" value="Y"><!-- ���� ������ΰ͸� ������������ -->
<input type="hidden" name="org_cd" />
<input type="hidden" name="bb_org_cd" />
<input type="hidden" name="user_nm" />
<input type="hidden" name="search" />
<input type="hidden" name="corp_cd" value="<%=corp_cd%>"/>
<input type="hidden" name="mode" value="<%=mode%>"/>

<table width="800" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
	<tr>
		<td>
			<table width="100%" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
				<tr height="30">
					<td class="popup_tit"><b>����� ������</b></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td>
			<table width="800" cellpadding="0" cellspacing="0" border="0">
				<col width="5"	/>
				<col width="790"/>
				<col width="5"	/>
				<tr>
					<td></td>
					<td valign="top">
						<table width="790" cellpadding="0" cellspacing="0" border="0">
							<col width="200"/>
							<col width="10"	/>
							<col width="580"/>
							<tr>
								<td valign="top">
									<table width="200" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td class="stitle">������</td>
										</tr>
										<tr>
											<td>
												<ucare:grid id="UCSYS021S_1" width="200" height="480" tree="true">
													<tr event="O">
														<td width="180" column="orgnm" image="doc" format="TREE" action="false" />
														<td width="0"   column="orgcd_org" />
														<td width="0"   column="depth" />
													</tr>
												</ucare:grid>
											</td>
										</tr>
									</table>
								</td>
								<td class="wmargin"></td>
								<td valign="top">
									<table width="580" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td class="stitle">����ڸ��</td>
										</tr>
										<tr>
											<td>
												<table class="tblSearch" width="100%">
													<col width="80"/>
													<col width=""/>
													<col width=""/>
													<tr>
														<th>�˻���</th>
														<td>
															<select name="searchtype" class="combo_text" required="true" requirednm="�˻�����" style="width:80">
																<option value="q_user_nm">����ڸ�</option>
																<option value="q_user_id">�����ID</option>
															</select>
															<ucare:input type="text" name="searchstr" width="160" tag="onKeyUp=\"pressEnter('userQuery()')\"" mode="active"/>
														</td>
														<td class="rbtn"><ucare:imgbtn name="btnQuery" kind="R" onClick="userQuery()" /></td>
													</tr>
												</table>
											</td>
										</tr>
										<tr>
											<td class="hmargin5"></td>
										</tr>
										<tr>
											<td>
												<ucare:grid id="UCSYS022S" width="580" height="440" no="true">
													<tr event="O,D">
														<%if(multiyn.equals("Y")){ %>
														<td width="50" column="chk" title="����" format="CHECKBOX"	editable="true" hcheckbox="true" />
														<%}else{%>
														<td width="50" column="chk" title="����" format="CHECKBOX"  editable="true"/>
														<%} %>
														<td width="100"	column="user_nm"	title="�� ��"			align="center"></td>
														<td width="110"	column="user_id"	title="����� ID"		align="center"></td>
														<td width="80"	column="pos_nm"		title="�� å"			align="center"></td>
														<td width="110"	column="hdp_no"		title="�޴��� ��ȣ"		align="center"	format="TEL"></td>
														<td width="170"	column="em_addr"	title="EMAIL �ּ�"		align="left"	length="22"></td>
														<td width="110"	column="tel_no"		title="��ȭ��ȣ"		align="center"	format="TEL"></td>
														<td width="0"	column="org_cd1"	title="org_cd"			hidden="true"></td>
														<td width="0"	column="loi_ip"		title="loi_ip"			hidden="true"></td>
													</tr>
												</ucare:grid>
											</td>
										</tr>
										<tr>
											<td class="hmargin5"></td>
										</tr>
										<tr>
											<td align="right">
												<%if(multiyn.equals("Y")){ %>
												<ucare:imgbtn name="btnChoice" value="����"  width="70" onClick="choice_user()" />
												<%}else{ %>
												<ucare:imgbtn name="btnChoice" value="����"  width="70" onClick="check_event()" />
												<%} %>
												<ucare:imgbtn name="btnQuery" kind="X"  width="70" onClick="self.close()" />
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
</form>
</body>
</html>