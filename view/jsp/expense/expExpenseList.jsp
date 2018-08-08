<!-------------------------------------------------------->
<!--  Intranet	    	         	 					-->
<!-- @version 1.0                 	 					-->
<!-- @author  lee,chang-uk             					-->
<!-- @since  2009.06.18                 				-->
<!-------------------------------------------------------->

<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>��� ��û/��ȸ</title>
<script language="javascript" src="/html/js/expense/expExpenseList.js"></script>

</head>
<body onLoad="on_Load();">
<table border=0 cellpadding=1 cellspacing=1 id=tblList width="1217">
	<tr>
		<td width="5"></td>
	</tr>
 	<tr>
		<td>
			<form name="fQuery" method="post">
			<input type="hidden" name="q_userid" value="<%=sessioninfo.getUserID()%>">

				<ucare:table type="query" width="1215">
					<tr>
						<td width="80" align=right>��ȸ�Ⱓ&nbsp;</td>
						<td width="235">
							<input type="text" class="frm_text" name="q_date_from" style="width:80" required=true title="��ȸ����"  pattern="D" value="<%=CUtil.getMyDate(-1, "yyyy-MM-dd")%>" onkeyup="return(isEnterKey()? on_Search():false);">
							<span class=calendar onclick="openCalendar('fQuery.q_date_from', fQuery.q_date_from)"></span>
							&nbsp;~&nbsp;
							<input type="text" class="frm_text" name="q_date_to" style="width:80" required=true title="��ȸ����"  pattern="D" value="<%=CUtil.getMyDate(0, "yyyy-MM-dd")%>" onkeyup="return(isEnterKey()? on_Search():false);">
							<span class=calendar onclick="openCalendar('fQuery.q_date_to', fQuery.q_date_to)"></span>
						</td>
						<td width="80" align="right">��û����&nbsp;</td>
						<td width="80" id="stateTd">
							<ucare:select name="q_ptt_stts_cd" brcode="EXP004" code="code" codename="codenm" option="10" width="108" styleClass="combo_text"/>
						</td>
						<td width="80" align="right">�������&nbsp;</td>
						<td width="145" id="stateTd">
							<ucare:select name="q_sign_prgs_stts_cd" brcode="SYS019" code="code" codename="codenm" option="10" width="140" styleClass="combo_text"/>
						</td>
						<td>&nbsp;</td>
						<td width=1 bgcolor=#CCCCCC></td>
		 				<td width=140 align="center">
		 					<ucare:imgbtn name="btnQuery" value="��ȸ" width="60" onClick="on_Search()"/>
		 					<ucare:imgbtn name="btnInit" value="�ʱ�ȭ" width="60" onClick="on_Init()"/>
		 				</td>
		 			</tr>
				</ucare:table>
			</form>
		</td>
	</tr>
	<tr>
		<td>
			<table border=0 cellpadding=0 cellspacing=0>
				<tr>
					<td valign="top">
						<form name="f" method="post">
						<ucare:table type="border">
							<tr>
								<td class="stitle">��� ��û ����</td>
							</tr>
						</ucare:table>
						<ucare:grid id="UCEXP010S" width="610" height="730" no="true">
							<tr event="O">
								<td width="35" 	column="chk"				title="����" 			align="center"	format="CHECKBOX" editable="true" sortable="false"></td>
								<td width="80"	column="rg_dt"				title="��û��"			align="center"	format="DATE"></td>
								<td width="70"	column="exps_sum"			title="����հ�"		align="right"	format="NUMBER"></td>
							    <td width="80"	column="pmt_dt"				title="������"			align="center"	format="DATE"></td>
							    <td width="70"	column="pmt_amt"			title="���޾�"			align="right"	format="NUMBER"></td>
							    <td width="70"  column="upmt_amt"			title="������"			align="right"	format="NUMBER"></td>
							    <td width="70" 	column="prcs_stts_nm"		title="���޻���"		align="center"></td>
							    <td width="70" 	column="ptt_stts_cd"		title="��û����"		align="center"	format="COMBO" brcode="EXP004"></td>
							    <td width="150"	column="prj_seq"			title="������Ʈ"		align="left"	format="COMBO" queryid="UCEXP000S"></td>
							    <td width="150" column="sign_prgs_stts_cd"	title="�������"		align="center" 	format="COMBO" brcode="SYS019"></td>
							    <td width="60"	column="rtn_f_cd"			title="�ݷ�����"		align="center"></td>
							    <td width="70"	column="sign_nm"			title="�����ڸ�"		align="center"></td>
							    <td width="70"	column="sign_stg_cd"		title="����ܰ�"		align="center" 	format="COMBO" brcode="SYS018"></td>
							    <td width="80"	column="now_sign_stg"		title="�������ܰ�"	align="center"></td>

							    <td width="0"	column="exps_seq" 				hidden="true"></td>

							    <td width="0"	column="sign_prgs_stts_nm"		hidden="true"></td>
							    <td width="0"	column="sign_stg_nm"			hidden="true"></td>


							 </tr>
						</ucare:grid>
						</form>
					</td>
					<td width="7"></td>
					<td valign="top">
						<form name="f0" method="post">
						<input type="hidden" name="exps_seq">
						<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">
						<input type="hidden" name="cmplt_dt">

						<ucare:table type="border">
							<tr>
								<td class="stitle">�� ����</td>
							</tr>
						</ucare:table>
						<ucare:table type="detail" width="600">
							<tr>
								<td class="MANTDT" width="80">��û����</td>
								<td class="MANTDM" width="155">
									<input type="text" name="rg_dt" format="DATE" class="input_transparent" style="width:100%;" readonly>
								</td>
								<td class="MANTDT" width="80">����հ�</td>
								<td class="MANTDM">
									<input type="text" name="exps_sum" format="MONEY" class="input_transparent" style="width:100%;" readonly>
								</td>
							</tr>
							<tr>
								<td class="MANTDT">��û����</td>
								<td class="MANTDM">
									<ucare:select name="ptt_stts_cd" brcode="EXP004" tag="required='true' requirednm='��û����'" option="4" width="178" styleClass="combo_required"/>
								</td>
								<td class="MANTDT">������Ʈ</td>
								<td class="MANTDM">
									<ucare:select name="prj_seq" queryid="UCHLD001S" tag="required='true' requirednm='������Ʈ'" option="4" width="178" styleClass="combo_required"/>
								</td>
							</tr>
							<tr>
								<td class="MANTDT">��������</td>
								<td class="MANTDM">
									<input type="text" name="pmt_dt" format="DATE" class="input_transparent" style="width:100%;" readonly>
								</td>
								<td class="MANTDT">���޾�</td>
								<td class="MANTDM">
									<input type="text" name="pmt_amt" format="MONEY" class="input_transparent" style="width:100%;" readonly>
								</td>
							</tr>
							<tr>
								<td class="MANTDT">�����޾�</td>
								<td class="MANTDM">
									<input type="text" name="upmt_amt" format="MONEY" class="input_transparent" style="width:100%;" readonly>
								</td>
								<td class="MANTDT">�������</td>
								<td class="MANTDM">
									<input type="text" name="sign_prgs_stts_nm" class="input_transparent" style="width:100%;" readonly>
								</td>
							</tr>
							<tr>
								<td class="MANTDT">�ݷ�����</td>
								<td class="MANTDM">
									<input type="text" name="rtn_f_cd" class="input_transparent" style="width:100%;" readonly>
								</td>
								<td class="MANTDT">������</td>
								<td class="MANTDM">
									<input type="text" name="sign_nm" class="input_transparent" style="width:100%;" readonly>
								</td>
							</tr>
							<tr>
								<td class="MANTDT">����ܰ�</td>
								<td class="MANTDM">
									<input type="text" name="sign_stg_nm" class="input_transparent" style="width:100%;" readonly>
								</td>
								<td class="MANTDT">�������ܰ�</td>
								<td class="MANTDM">
									<input type="text" name="now_sign_stg" class="input_transparent" style="width:100%;" readonly>
								</td>
							</tr>
						</ucare:table>

						<table border=0 cellpadding=0 cellspacing=0 width="100%">
							<tr><td height="3"></td></tr>
							<tr>
								<td align="right">
									<ucare:imgbtn name="btnPlus" value="���" width="60" onClick="fn_ExpenseAdd();"/>
									<ucare:imgbtn name="btnSave" value="����" width="60" onClick="fn_Save()"/>
									<ucare:imgbtn name="btnDelete" value="����" width="60" onClick="on_Delete()"/>
								</td>
							</tr>
						</table>
						</form>

						<ucare:table type="border">
							<tr>
								<td class="stitle">���� �� ����</td>
							</tr>
						</ucare:table>

						<form name="f1" method="post">
						<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
						<input type="hidden" name="exps_seq" value="">

						<ucare:grid id="UCEXP011S" width="600" height="495" no="true" crud="true">
							<tr>
								<td width="30" 	column="chk"			title="����" 		align="center" 	format="CHECKBOX" editable="true" sortable="false"></td>
								<td width="85" column="expt_dt"			title="��������"	align="center" 	format="DATE" editable="true"></td>
								<td width="65"	column="expt_amt"		title="����ݾ�"	align="right" 	format="NUMBER" editable="true"></td>
								<td width="60"	column="expt_c_cd"		title="���ⱸ��"	align="center" 	format="COMBO" brcode="EXP002" editable="true"></td>
							    <td width="85"	column="expt_act_cd"	title="�������"	align="center" 	format="COMBO" brcode="EXP003" editable="true"></td>
							    <td width="55"	column="rip_doc_f"		title="������"		align="center" 	format="COMBO" brcode="COM002" editable="true"></td>
							    <td width="240" column="expt_rmk"		title="��������"	align="left" 	editable="true"></td>

							    <td width="0"	column="exps_seq" 		hidden="true"></td>
							    <td width="0"	column="expt_hst_seq" 	hidden="true"></td>
							 </tr>
						</ucare:grid>
						</form>

						<table border=0 cellpadding=0 cellspacing=0 align="right">
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td>
									<ucare:imgbtn name="btnPlus1" value="�߰�" width="60" onClick="fn_ExpenseDtailAdd();"/>
									<ucare:imgbtn name="btnSave1" value="����" width="60" onClick="on_DetailSave();"/>
									<ucare:imgbtn name="btnDelete1" value="����" width="60" onClick="fn_DetailDelete();"/>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>
