<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>  
<html>
<head>
<title>�޴� ����</title>

<script language="javascript" src="<%=scriptPath%>/js/system/sysMenuMng.js"></script>
</head>
<body topmargin="0" leftmargin="5" onload="eventGrid();init()">

<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>
	
	<!-- �˻����� S -->
	<form name="fQuery">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width=80 align=right style="padding:2 0 0 0 ">�޴� �̸� :&nbsp;</td>
					<td width=100>
						<input type="text" name="menunm" class="input_text" size=12 onKeyPress="pressEnter('query()')">
					</td>
					<td width=80 align=right style="padding:2 0 0 0 ">�޴� ID :&nbsp;</td>
					<td width=100>
						<input type="text" name="menuid" class="input_text" size=12 onKeyPress="pressEnter('query()')">
					</td>
					<td>&nbsp;</td>
					<td width=1 bgcolor=#CCCCCC></td>
	 				<td width=80 align=center>
	 					<ucare:imgbtn name="btnQuery"	kind="R"	onClick="query()" /><!-- ��ȸ -->
 					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<!-- �˻����� E -->
	<tr>
		<td height="5"></td>
	</tr>
	<!-- ���� S -->
	<form name="f">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="step">
	<input type="hidden" name="menudel">
	<input type="hidden" name="orgmenuid">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="500"	/>
				<col width="25"		/>
				<col width="700"	/>
				<tr>
					<!-- Ʈ�� S -->
					<td valign="top">
						<table width="500" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td>
									<table width="500" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td class="stitle">�޴� ����</td>
											<td align="right">
												<ucare:imgbtn name="downXML" value="���� ����"  onClick="setMenu()" />
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS031S" width="500" height="705" tree="true">
						            	<tr class="LIST" event="O">
						                	<td  width="480" column="menunm" image="doc" format="TREE" action="true"></td>
						                </tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- Ʈ�� E -->
					
					<td></td>
					
					<!-- ������ S -->
					<td valign="top">
						<table width="500" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�޴� ������</td>
							</tr>
							<tr>
								<td>
									<ucare:table id="uc1" type="detail" width="700">
									<col width="120"	/>
									<col width=""		/>
										<tr>
											<td class="MANTDT">�����޴� ID</td>
											<td class="MANTDM">
												<input type="text" name="upmnu_id"  class="input_required" style="width:170;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�����޴���</td>
											<td class="MANTDM">
												<input type="text" name="upmnu_nm"  class="input_required" style="width:569;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�޴� ID</td>
											<td class="MANTDM">
												<input type="text" 		name="fst_id" 	maxlength="3" 	class="input_required" 		required="true" 	requirednm="�޴� ID" 	onChange="menuIdMarge()" style="width:83;">
												<input type="text" 		name="lst_id" 	maxlength="3" 	class="input_required" 		required="true" 	requirednm="�޴� ID" 	onChange="menuIdMarge()" style="width:83;">
												<input type="hidden" 	name="mnu_id" 	maxlength="6" 	class="input_required"  	required="false" 	requirednm="�޴� ID" 	readonly	style="width:100;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�޴���</td>
											<td class="MANTDM">
												<input type="text" name="mnu_nm" maxlength="25" class="input_required" required="true" requirednm="�޴� �̸�" style="width:569;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">ȭ�� ��ġ</td>
											<td class="MANTDM">
												<select name="urlType" class="combo_required" onChange="selectURL()"  >
													<option value="">== ���� ==</option>
													<option value="PATH">PATH</option>
													<option value="LINK">LINK</option>
												</select>
												<input type="text" name="sr_url" maxlength="50" class="input_required" required="true" requirednm="ȭ�� ��ġ" style="width:483;">
												<!--
												<span class="search" onClick="openFileDir()"></span>
												-->
											</td>
										</tr>
										<tr>
											<td class="MANTDT">ȭ�� ����</td>
											<td class="MANTDM">
												<ucare:select name="sr_frm_cd"  option="4" brcode="SYS004" width="83" styleClass="combo_text" onChange="selectType()" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�˾�ȭ�� ��</td>
											<td class="MANTDM">
												<input type="text" maxlength="5" name="pup_sr_wth" class="input_number"  style="width:170;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�˾�ȭ�� ����</td>
											<td class="MANTDM">
												<input type="text" maxlength="5" name="pup_sr_hgt" class="input_number"  style="width:170;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�˾� X��ǥ</td>
											<td class="MANTDM">
												<input type="text" maxlength="5" name="pup_x_cdt" class="input_number"  style="width:170;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�˾� Y��ǥ</td>
											<td class="MANTDM">
												<input type="text" maxlength="5" name="pup_y_cdt" class="input_number"  style="width:170;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">���� ����</td>
											<td class="MANTDM">
												<input type="text" maxlength="3" name="lup_ord" class="input_number" style="width:170;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�� ��</td>
											<td class="MANTDM">
												<textarea name="mnu_desc" maxlength="500" class="input_text" style="width:569;height:180"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�����</td>
											<td class="MANTDM">
												<input type="text" name="rg_idnm" class="input_readonly"	readonly	 style="width:170;" required="false" requirednm="�����">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">��� �Ͻ�</td>
											<td class="MANTDM">
												<input type="text" name="rg_dtm" class="input_readonly"	readonly	 format="DATET" style="width:170;" required="false" requirednm="�����">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">������</td>
											<td class="MANTDM">
												<input type="text" name="mdf_idnm" class="input_readonly"	readonly	 style="width:170;" required="false" requirednm="�����">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">���� �Ͻ�</td>
											<td class="MANTDM">
												<input type="text" name="mdf_dtm" class="input_readonly"	readonly	 format="DATET" style="width:170;" required="false" requirednm="�����">
											</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
							<tr>					
								<td>
									<table width="700" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td align="left">
												<ucare:imgbtn name="btnHAdd" 	value="�����޴� ���"  	onClick="hAdd()"/>
												<ucare:imgbtn name="btnLAdd" 	value="�����޴� ���"  	onClick="lAdd()"/>
											</td>
											<td align="right">
												<ucare:imgbtn name="btnMod" 	value="����"		onClick="mod()" />
												<ucare:imgbtn name="btnSave" 	kind="S"		onClick="save()"/><!-- ���� -->
												<ucare:imgbtn name="btnDel" 	kind="D"	 	onClick="del()" /><!-- ���� -->
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td align="right">
									<ucare:table type="border" cellspacing="0">
										<tr>
											<td colspan="4"><iframe name=ifmMenu src="/jsp/common/blank.jsp"  style="height:100" scrolling="no" frameborder="0" ></iframe></td>
										</tr>
									</ucare:table>
								</td>
							</tr>
						</table>
					</td>
					<!-- ������ E -->
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- ���� E -->
</table>

</body>
</html>