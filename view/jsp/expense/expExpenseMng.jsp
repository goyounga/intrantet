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
<title>��� ����</title>
<script language="javascript" src="/html/js/expense/expExpenseMng.js"></script>

</head>
<body onLoad="on_Load();">
<table border=0 cellpadding=1 cellspacing=1 id=tblList width="1217">
	<tr>
		<td width="5"></td>
	</tr>
 	<tr>
		<td>
			<form name="fQuery" method="post">
			<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">
			<input type="hidden" name="q_sign_id" value="">
			<input type="hidden" name="q_alnc_rtn" value="">
			<input type="hidden" name="q_chk" value="">
			<input type="hidden" name="gradecd" value="<%=sessioninfo.getUserGradeCD()%>">

				<ucare:table type="query" width="1215">
					<tr>
						<td width="80" align=right>��ȸ�Ⱓ&nbsp;</td>
						<td width="230">
							<input type="text" class="frm_text" name="q_date_from" style="width:80" required=true title="��ȸ����"  pattern="D" value="<%=CUtil.getMyDate(-1, "yyyy-MM")+"-26"%>" onkeyup="return(isEnterKey()? on_Search():false);"><span class=calendar onclick="openCalendar('fQuery.q_date_from', fQuery.q_date_from.value)"></span>
							&nbsp;~&nbsp;
							<input type="text" class="frm_text" name="q_date_to" style="width:80" required=true title="��ȸ����"  pattern="D" value="<%=CUtil.getMyDate(0, "yyyy-MM")+"-25"%>" onkeyup="return(isEnterKey()? on_Search():false);"><span class=calendar onclick="openCalendar('fQuery.q_date_to', fQuery.q_date_to.value)"></span>
						</td>
						<td width="80" align="right">������&nbsp;</td>
						<td width="125">
							<ucare:select name="q_sign_obj" brcode="SYS022" width="120" option="1" styleClass="combo_required" selCode=""/>
						</td>
						<td width="80" align="right">�������&nbsp;</td>
						<td width="80">
							<ucare:select name="q_sign_prgs_stts_cd" brcode="SYS019" code="code" codename="codenm" option="10" width="140" styleClass="combo_text"/>
						</td>
						<td width=80 align=right>��û�� :&nbsp;</td>
						<td width=110>
							<input type=hidden name=q_user_id>
							<input type=text class=frm_readonly name=q_user_nm style="width:80" readOnly>
							<span id="btnUserId" class=search onClick="openUserOrg();"></span>
						</td>
						<td>&nbsp;</td>
						<td width=1 bgcolor=#CCCCCC></td>
		 				<td width=250 align="center">
		 					<ucare:imgbtn name="btnQuery" value="��ȸ" onClick="on_Search()"/>
		 					<ucare:imgbtn name="btnInit" value="�ʱ�ȭ" onClick="on_Init()"/>
		 					<ucare:imgbtn width="60" name="btnExcel" value="Excel" onClick="Excel()"/>
		 				</td>
		 			</tr>
				</ucare:table>
			</form>
		</td>
	</tr>
	<tr>
		<td valign="top">
			<table border=0 cellpadding=0 cellspacing=0>
				<tr>
					<td valign="top">
						<form name="f" method="post">
						<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">

						<ucare:table type="border">
							<tr>
								<td class="stitle">��� ��û ����</td>
							</tr>
						</ucare:table>
						<ucare:grid id="UCEXP020S" width="610" height="710" no="true">
							<tr event="O">
								<td width="30" 	column="chk"				title="����" 			align="center"	format="CHECKBOX" editable="true" sortable="false"></td>
								<td width="30" 	column="alnc"				title="����" 			align="center"	format="CHECKBOX" editable="true" sortable="false"></td>
								<td width="30" 	column="rtn"				title="�ݷ�" 			align="center"	format="CHECKBOX" editable="true" sortable="false"></td>
								<td width="70"	column="rg_dt"				title="��û����"		align="center" 	format="DATE"></td>
								<td width="65"	column="rg_nm"				title="��û��"			align="center"></td>
								<td width="65"	column="exps_sum"			title="����հ�"		align="right"	format="NUMBER"></td>
							    <td width="90"	column="pmt_dt"				title="��������"		align="center" 	format="DATE" 	editable="true"></td>
							    <td width="70"	column="pmt_amt"			title="���޾�"			align="right" 	format="NUMBER" editable="true"></td>
							    <td width="65" 	column="upmt_amt"			title="������"			align="right" 	format="NUMBER" editable="true"></td>
							    <td width="120" column="sign_prgs_stts_cd"	title="�������"		align="center" 	format="COMBO" brcode="SYS019"></td>
							    <td width="70"	column="rtn_f_cd"			title="�ݷ�����"		align="center"></td>
							    <td width="70"	column="sign_nm"			title="�����ڸ�"		align="center"></td>
							    <td width="70"	column="sign_stg_cd"		title="����ܰ�"		align="center" 	format="COMBO" brcode="SYS018"></td>
							    <td width="80"	column="now_sign_stg"		title="�������ܰ�"	align="center"></td>

							    <td width="0"	column="prj_seq"			hidden="true"></td>
							    <td width="0"	column="prj_nm"				hidden="true"></td>
							    <td width="0"	column="sign_prgs_stts_nm"	hidden="true"></td>
							    <td width="0"	column="ptt_stts_cd"		hidden="true"></td>
							    <td width="0"	column="ptt_stts_nm"		hidden="true"></td>
							    <td width="0"	column="sign_stg_nm"		hidden="true"></td>
							    <td width="0"	column="exps_seq" 			hidden="true"></td>
							 </tr>
						</ucare:grid>

						<table border=0 cellpadding=0 cellspacing=0 width="100%">
							<tr><td height="3"></td></tr>
							<tr>
								<td align="right">�������� :
									<input type="text" class="frm_text" name="pmt_date" style="width:80" pattern="D" value="<%=CUtil.getMyDate(0, "yyyy-MM-dd")%>"><span class=calendar onclick="openCalendar('f.pmt_date', f.pmt_date.value)"></span>
									<ucare:imgbtn name="btnPmtApply" value="���޼���" onClick="on_PmtLumpApply()"/>
									<ucare:imgbtn name="btnPmtSave" value="��������" onClick="on_PmtSave()"/>&nbsp;&nbsp;
									<ucare:imgbtn name="btnApply" value="�����޼���" onClick="on_LumpApply()"/>
									<ucare:imgbtn name="btnSave" value="��������" onClick="on_Save()"/>
								</td>
							</tr>
						</table>
						</form>

					</td>
					<td width="7"></td>
					<td valign="top">
						<form name="f0" method="post">
						<input type="hidden" name="exps_seq">
						<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">

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
									<input type="text" name="exps_sum" class="input_transparent" style="width:100%;" readonly>
								</td>
							</tr>
							<tr>
								<td class="MANTDT">��û����</td>
								<td class="MANTDM">
									<input type="text" name="ptt_stts_nm" class="input_transparent" style="width:100%;" readonly>
								</td>
								<td class="MANTDT">������Ʈ</td>
								<td class="MANTDM">
									<input type="text" name="prj_nm" class="input_transparent" style="width:100%;" readonly>
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
						</form>

						<ucare:table type="border">
							<tr>
								<td class="stitle">���� �� ����</td>
							</tr>
						</ucare:table>

						<form name="f1" method="post">
						<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
						<input type="hidden" name="exps_seq" value="">

						<ucare:grid id="UCEXP021S" width="600" height="522" no="true">
							<tr>
								<td width="70" column="expt_dt"		title="��������"	align="center" 	format="DATE"></td>
								<td width="65"	column="expt_amt"		title="����ݾ�"	align="right"	format="NUMBER" ></td>
								<td width="60"	column="expt_c_cd"		title="���ⱸ��"	align="center" 	format="COMBO" brcode="EXP002"></td>
							    <td width="80"	column="expt_act_cd"	title="�������"	align="center" 	format="COMBO" brcode="EXP003"></td>
							    <td width="45"	column="rip_doc_f"		title="������"	align="center" 	format="COMBO" brcode="COM002"></td>
							    <td width="240" column="expt_rmk"		title="��������"	align="left"></td>

							    <td width="0"	column="exps_seq" 		hidden="true"></td>
							    <td width="0"	column="expt_hst_seq" 	hidden="true"></td>
							 </tr>
						</ucare:grid>
						</form>

					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<%@ include file="/jsp/include/include_car.jsp"%>
</body>
</html>