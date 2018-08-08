<!--
  PROJ : Nexfron Intranet
  NAME : hldHolidayList.jsp
  DESC : �ް� ��û/��ȸ
  Author : ���ر� ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2012.03.20		���ر�		�����ۼ�
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>�ް���û/��ȸ</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="/html/js/holiday/hldHolidayList.js"></script>
	<link rel="stylesheet" href = "/html/style/ucareStyle.css" type = "text/css">
</head>
<body class="mainbody" onLoad="init();">
<table border="0" cellpadding="0" cellspacing="0" id="tblList" width="100%" bordercolor="red">
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td>
			<form name="fQuery">
			<input type="hidden" name="q_userid" value="<%=sessioninfo.getUserID()%>">
			<input type="hidden" name="q_bse_y" value="">
			<input type="hidden" name="thisYear" value="<%=CDateUtil.getYear()%>">
			<table class="tblSearch" width="100%">
				<col width="80"	/>
				<col width="205"/>
				<col width="80"	/>
				<col width=""/>
				<col width=""/>
				<tr>
					<th>��ȸ�Ⱓ</th>
					<td><ucare:search 	name="q_date" type="TERM" width="70"
										required="true" requirednm="��ȸ�Ⱓ"
										formnm="fQuery" format="DATE" pattern="D"
										strtval="<%=CUtil.getCurrDate(\"yyyy-MM-dd\")%>"
										endval="<%=CUtil.getCurrDate(\"yyyy-MM-dd\")%>"
										onKeyPress="pressEnter('searchHldyInfo()')">
						</ucare:search>
					</td>
					<th>�������</th>
					<td><ucare:select name="q_sign_prgs_stts_cd" width="145" brcode="SYS019" option="10" /></td>
					<td class="rbtn"><ucare:imgbtn name="btnQuery" kind="R" onClick="searchHldyInfo()"/></td>
				</tr>
			</table>
			</form>
		</td>
	</tr>
	<tr><td class="hmargin5"></td></tr>
	<tr>
		<td class="stitle">�� �ް� ����</td>
	</tr>
	<tr>
		<td>
			<form name="fInfo">
			<input type="hidden" name="bse_y" value="">
			<table class="tblData" width="100%">
				<col width="80"	/>
				<col width="200"/>
				<col width="80"	/>
				<col width="200"/>
				<col width="100"/>
				<col width="200"/>
				<col width="100"/>
				<col width=""/>
				<tr>
					<th>���س⵵</th>
					<td><ucare:select name="bse_y_nm" option="-1" width="190" onChange="chgBseYNm()"/></td>
					<th>�ް� �����ϼ�</th>
					<td style="text-align:center"><ucare:input type="text" name="pmt_dy" width="95%" styleClass="input_transparent" readonly="true" /></td>
					<th>�ް� �� ����ϼ�</th>
					<td style="text-align:center"><ucare:input type="text" name="use_dy" width="95%" styleClass="input_transparent" readonly="true" /></td>
					<th>�ް� �ܿ��ϼ�</th>
					<td style="text-align:center"><ucare:input type="text" name="rmn_dy" width="95%" styleClass="input_transparent" readonly="true" /></td>
				</tr>
			</table>
			</form>
		</td>
	</tr>
	<tr><td class="hmargin5"></td></tr>
	<tr>
		<td>
			<form name="f">
			<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
			<table border="0" cellpadding="0" cellspacing="0" id="tblList" width="100%" bordercolor="red">
			<!--<tr>
					<td class="stitle">�� �ް� ����</td>
					<td></td>
					<td class="stitle">�ް� ��û ����</td>-->
				</tr>
				<tr>
				<!--<td width="300">
						<ucare:grid id="UCHLD023S" width="321" height="350" no="true">
							<tr event="O">
								<td width="60"	column="bse_y"	title="���س⵵" align="center" ></td>
								<td width="80"	column="pmt_dy"	title="�����ϼ�" align="center" ></td>
								<td width="80"	column="use_dy"	title="����ϼ�" align="center" ></td>
								<td width="80" 	column="rmn_dy"	title="�ܿ��ϼ�" align="center" ></td>
							 </tr>
						</ucare:grid>
					</td>
					<td class="wmargin5"></td>
					<td> -->
						<ucare:grid id="UCHLD021S" width="100%" height="350" no="true">
							<tr event="O">
								<td width="60"	column="bse_y"				title="���س⵵"		align="center" format="COMBO" brcode="HLD002"></td>
								<td width="80"	column="rg_dt"				title="��û����"		align="center" format="DATE"></td>
								<td width="100"	column="hldy_knd_seq"		title="�ް�����"		align="center" format="COMBO" queryid="UCHLD000S"></td>
								<td width="80" 	column="prj_seq"			title="������Ʈ"		align="center" format="COMBO" queryid="UCEXP000S"></td>
							    <td width="80"	column="strt_dt"			title="�ް�������"		align="center" format="DATE"></td>
							    <td width="80"	column="end_dt"				title="�ް�������"		align="center" format="DATE"></td>
							    <td width="40"	column="hldy_dy"			title="�ϼ�"			align="right"></td>
							    <td width="150" column="hldy_plc"			title="�༱��"			align="left"></td>
							    <td width="90" 	column="cntc_tel_no"		title="����ó"			align="center" format="TEL"></td>
							    <td width="150" column="sign_prgs_stts_cd"	title="�������"		align="center" format="COMBO" brcode="SYS019"></td>
							    <td width="70"	column="rtn_f_cd"			title="�ݷ�����"		align="center"></td>
							    <td width="70"	column="sign_nm"			title="�����ڸ�"		align="center"></td>
							    <td width="70"	column="sign_stg_cd"		title="����ܰ�"		align="center" format="COMBO" brcode="SYS018"></td>
							    <td width="80"	column="now_sign_stg"		title="�������ܰ�"	align="center"></td>
							    <td width="0" 	column="hldy_rsn"			hidden="true"></td>
							    <td width="0" 	column="hldy_rmk"			hidden="true"></td>
							    <td width="0"	column="hldy_id" 			hidden="true"></td>
							    <td width="0"	column="hldy_seq" 			hidden="true"></td>
							    <td width="0"  	column="sign_prgs_stts_nm" 	hidden="true"></td>
							    <td width="0"	column="sign_stg_nm" 		hidden="true"></td>
							 </tr>
						</ucare:grid>
					</td>
				</tr>
			</table>
			</form>
		</td>
	</tr>
	<tr><td class="hmargin5"></td></tr>
	<tr>
		<td class="stitle">�� ����</td>
	</tr>
	<form name="f1">
	<tr>
		<td>
			<table border="0" cellpadding="0" cellspacing="0" id="tblList" width="100%" bordercolor="red">
				<tr>
					<td width="760">
						<input type="hidden" name="hldy_seq">
						<input type="hidden" name="hldy_id" value="<%=sessioninfo.getUserID()%>">
						<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">
						<table class="tblData" width="760">
							<col width="80"	/>
							<col width="300"/>
							<col width="80"	/>
							<col width="300"/>
							<tr>
								<th>���س⵵</th>
								<td><ucare:select name="bse_y" width="200" brcode="HLD005" option="4" required="true" requirednm="���س⵵"/></td>
								<th >�ް�����</th>
								<td><ucare:select name="hldy_knd_seq" width="300" queryid="UCHLD000S" option="4" required="true" requirednm="�ް�����" /></td>
							</tr>
							<tr>
								<th>�ް�����</th>
								<td>
									<ucare:search 	name="dt" type="TERM" width="70"
													required="true" requirednm="�ް�����"
													formnm="f1" format="DATE" pattern="D"
													strtval="<%=CUtil.getCurrDate(\"yyyy-MM-dd\")%>"
													endval="<%=CUtil.getCurrDate(\"yyyy-MM-dd\")%>">
									</ucare:search>
								</td>
								<th>������Ʈ</th>
								<td><ucare:select name="prj_seq"  width="300" queryid="UCHLD001S" option="4" required="true" requirednm="������Ʈ" /></td>
							</tr>
							<tr>
								<th>�ް��ϼ�</th>
								<td><ucare:input type="text" name="hldy_dy" width="100%" styleClass="input_transparent" readonly="true" /></td>
								<th>����ó</th>
								<td><ucare:input type="text" name="cntc_tel_no" width="300" required="true" requirednm="����ó" format="TEL" /></td>
							</tr>
							<tr>
								<th>��û����</th>
								<td><ucare:input type="text" name="rg_dt" format="DATE" width="100%" styleClass="input_transparent" readonly="true" /></td>
								<th>�༱��</th>
								<td><ucare:input type="text" name="hldy_plc" width="300" /></td>
							</tr>
							<tr>
								<th></th>
								<td>
								</td>
								<th>�ް�����</th>
								<td><textarea name="hldy_rsn" class="input_textarea_required" style="width:300px;height:145px;" maxlength="500" required="true" title="�ް�����"></textarea></td>
							</tr>
						</table>
						<table class="tbl_button" align="right">
							<tr><td class="hmargin5"></td></tr>
							<tr>
								<td><ucare:imgbtn kind="A" name="btnReg"	 width="60" onClick="regHldy();"  	/></td>
								<td><ucare:imgbtn kind="S" name="btnSave"	 width="60" onClick="saveHldy();"	/></td>
								<td><ucare:imgbtn kind="D" name="btnDelete"	 width="60" onClick="deleteHldy();"	/></td>
								<td><ucare:imgbtn kind="C" name="btnCancel"	 width="60" onClick="canlHldy();"	/></td>
							</tr>
						</table>
					</td>
					<td class="wmargin5"></td>
					<td valign="top">
						<table class="tblData" width="100%">
							<col width="80"	/>
							<col width="300"/>
							<tr >
								<th style="height:26px">�������</th>
								<td><ucare:input type="text" name="sign_prgs_stts_nm" width="100%" styleClass="input_transparent" readonly="true" /></td>
							</tr>
							<tr>
								<th style="height:27px">�������ܰ�</th>
								<td><ucare:input type="text" name="now_sign_stg" width="100%" styleClass="input_transparent" readonly="true" /></td>
							</tr>
							<tr>
								<th style="height:27px">������</th>
								<td><ucare:input type="text" name="sign_nm" width="100%" styleClass="input_transparent" readonly="true" /></td>
							</tr>
							<tr>
								<th style="height:27px">�� ����ܰ�</th>
								<td><ucare:input type="text" name="sign_stg_nm" width="100%" styleClass="input_transparent" readonly="true" /></td>
							</tr>
							<tr>
								<th>���</th>
								<td><textarea name="hldy_rmk" class="input_textarea_readonly" style="width:100%;height:145px;" maxlength="500" readonly="true" ></textarea></td>
							</tr>
						</table>
						<table class="tbl_button" align="right">
							<tr><td class="hmargin5"></td></tr>
							<tr>
								<td><ucare:imgbtn kind="S" name="btnRegSign"  width="80"  onClick="saveHldy('Y');" 	value="������"/></td>
								<!--td><ucare//:imgbtn kind="C" name="btnCanlSign" width="100" onClick="canlSignReq();" value="���������"/></td-->
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
</table>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>