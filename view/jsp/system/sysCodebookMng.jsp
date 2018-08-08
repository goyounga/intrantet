<!--
  PROJ : Nexfron Intranet
  NAME : sysWeeklyRptMng.jsp
  DESC : �ý��� - �ڵ��� ���� ȭ��
  Author : ������ ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.19		������		�ּ��߰�
  -->
  
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>  
<html>
<head>
	<title>�ڵ��� ����</title>
	<script language="javascript" src="/html/js/system/sysCodebookMng.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 5;">

<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>
	
	<!-- �˻� -->
	<form name="fQuery" method="post">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<col width="80"	/>
				<col width="120"/>
				<col width="80"	/>
				<col width="120"/>
				<col width="80"	/>
				<col width=""	/>
				<col width="1"	/>
				<col width="60"	/>
				<tr>
					<td align=right> �ڵ�� :&nbsp;</td>					
					<td>
						<input type=text class=input_text name="codenm" size=20 required=false onKeyPress="pressEnter('makeTree()')">
					</td>					
					<td align=right> ��з��ڵ� :&nbsp;</td>
					<td>
						<input type=text class=input_text name="uppercd" size=20 required=false onKeyPress="pressEnter('makeTree()')">
					</td>					
					<td align=right> ��뿩�� : &nbsp</td>
					<td>
						<ucare:select name="useyn" brcode="COM001" code="code" codename="codenm" option="10" width="100" styleClass="combo_text"/>
					</td>
					<td bgcolor=#CCCCCC></td>
					<td width="80"align=center>
						<ucare:imgbtn name="btnQuery" kind="R"  onClick="makeTree()" /><!-- ��ȸ -->
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	
	<!-- ����  -->
	<form name="f" method="post" target="iLog">
	<input type="hidden" name="codeReload" value="<%=CIni.getString("CODEBOOK_RELOAD")%>">
	<input type="hidden" name="SERVER1" value="<%=CIni.getString("SERVER1")%>">
	<input type="hidden" name="SERVER2" value="<%=CIni.getString("SERVER2")%>">
	<input type="hidden" name="DB_SERVICEMODE" value="<%=ucare.jaf.common.CIni.getParam("DB_SERVICEMODE").asString("")%>">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="500"	/>
				<col width="25"	/>
				<col width="700"	/>
				<tr>
					<!-- Ʈ�� -->
					<td valign="top">
		
						<table width="500" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�ڵ��� ����</td>
							</tr>
							<tr>
								<td>
		
									<ucare:grid id="UCSYS001S" width="500" height="700" tree="true">
										<tr class="LIST" event="O">
											<td  width="480" column="codev" image="doc" format="TREE" action="true"></td>
										</tr>
									</ucare:grid>
		
								</td>
							</tr>
						</table>
		
					</td>
					<!-- ���� -->
					<td></td>
					<!-- ������ -->
					<td valign="top">
		
						<table width="700" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�ڵ��� ����</td>
							</tr>
							<tr>
								<td>
									
									<table width="700" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td>
		
												<ucare:table type="detail" width="700">
													<tr>
														<td class="MANTDT" width="100">�з�</td>
														<td class="MANTDM">
															<ucare:select name="step" brcode="SYS001" code="code" codename="codenm" option="4" width="130" styleClass="combo_disabled"/>							
														</td>
													</tr>
													<tr>
														<td class="MANTDT">��з��ڵ�</td>
														<td class="MANTDM">
															<input type=text class=input_required name=uppercd style="width:130;" maxlength="10" required="true" requirednm="���ڵ�" onChange="codeChange(this.value)">
															<input type=text class=input_required name=orguppercd  size=0 style="display:none">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">�ڵ�</td>
														<td class="MANTDM">
															<input type=text class=input_required name=code style="width:130;" maxlength="10" required="true" requirednm="�ڵ�" onChange="codeChange(this.value)">
															<input type=text class=input_required name=orgcode size=0 style="display:none">
															<ucare:imgbtn name="btnCdDupChk" value="�ڵ��ߺ�üũ"  		onClick="codeDupChk()"/>
														</td>
													</tr>
													<tr>
														<td class="MANTDT">�ڵ��</td>
														<td class="MANTDM">
															<input type=text class=input_required name=codenm style="width:565;" maxlength="100" required="true" requirednm="�ڵ��">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">��Ÿ1</td>
														<td class="MANTDM">
															<input type=text class=input_text name="etc1" maxlength="30" style="width:565;" required="false">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">��Ÿ2</td>
														<td class="MANTDM">
															<input type=text class=input_text name="etc2" maxlength="30" style="width:565;" required="false">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">��Ÿ3</td>
														<td class="MANTDM">
															<input type=text class=input_text name="etc3" maxlength="30" style="width:565;" required="false">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">����</td>
														<td class="MANTDM">
															<input type=text class=input_required_number name="sortseq" format="NUMBER" style="width:130;"  maxlength="3" onchange="sortNum()" format="NUMBER">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">��뿩��</td>
														<td class="MANTDM">
															<ucare:select name="useyn" brcode="COM001" code="code" codename="codenm" option="4" styleClass="combo_required" width="130" tag="required='true' requirednm='��뿩��'"/>
														</td>
													</tr>
													<tr>
														<td class="MANTDT">�����</td>
														<td class="MANTDM">
															<input type=text class=input_readonly name="rg_nm" maxlength="30" style="width:130;"">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">�������</td>
														<td class="MANTDM">
															<input type=text class=input_readonly name="rg_dt" maxlength="30" style="width:130;" format="DATE">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">��Ͻð�</td>
														<td class="MANTDM">
															<input type=text class=input_readonly name="rg_tm" maxlength="30" style="width:130;" format="TIME">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">������</td>
														<td class="MANTDM">
															<input type=text class=input_readonly name="mdf_nm" maxlength="30" style="width:130;">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">��������</td>
														<td class="MANTDM">
															<input type=text class=input_readonly name="mdf_dt" maxlength="30" style="width:130;" format="DATE">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">�����ð�</td>
														<td class="MANTDM">
															<input type=text class=input_readonly name="mdf_tm" maxlength="30" style="width:130;" format="TIME">
														</td>
													</tr>
												</ucare:table>
		
											</td>
										</tr>
										<tr height="5">
											<td></td>
										</tr>
										<tr>
											<td>
												
												<table width="700" cellpadding="0" cellspacing="0" border="0">
													<col width="100"	/>
													<col width="325"	/>
													<col width="150"	/>
													<tr>
														<td align="left">
															<ucare:imgbtn name="btnCodeBook" value="�����ݿ�" type="G" onClick="codereload();"	/>
														</td>
														<td align="right">
															<ucare:imgbtn name="btnheightAdd"	value="��з����"	onClick="heightAdd()"/>
															<ucare:imgbtn name="btnLowAdd"		value="�Һз����"	onClick="lowAdd()"/>
															<ucare:imgbtn name="btnMod"			value="����"  		onClick="codeMod()"/>
															<ucare:imgbtn name="btnSave"	kind="S"	onClick="save()"/><!-- ���� -->
															<ucare:imgbtn name="btnDel"	kind="D"   	onClick="del()"/><!-- ���� -->
														</td>
													</tr>
													<tr>
														<td colspan="2">
															<iframe name=ifmCode src="/jsp/common/blank.jsp" style="height:10" scrolling="no" frameborder="0" ></iframe>
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

		</td>
	</tr>
	</form>

</table>
</body>
</html>