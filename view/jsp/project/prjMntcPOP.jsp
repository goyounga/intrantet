<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>������������Ʈ ��ȸ</title>
<script language="javascript" src="/html/js/project/prjMntcPOP.js"></script>
</head>
<body topmargin=0 leftmargin=0 onload="init();" >

<table width="800" cellpadding="0" cellspacing="0" border="0">
	<tr>
 		<td>
 			<table width="800" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="popup_tit"><b>������������Ʈ ��ȸ</b></td>
 				</tr>
 			</table>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td style="padding:0 5 0 5;">
			<table width="780" cellpadding="0" cellspacing="0" border="0">
				<form	name="fQuery" method="post">
				<tr>
					<td>
						<ucare:table type="query" width="100%">
							<tr>
								<td align="right">����� : &nbsp;</td>
								<td >
									<input type="text" name="clnt_corp_nm" class="input_text" style="width:200;ime-mode:active" onKeyPress="pressEnter('queryList()')">
								</td>
								<td rowspan=2 width="1" bgcolor=#CCCCCC></td>
								<td rowspan=2 width="80" align="right">
									<ucare:imgbtn width="70" name="btnQuery"	value="��ȸ"	 onClick="queryList()"/><!-- ��ȸ -->
								</td>
							</tr>
						</ucare:table>
					</td>
				</tr>
				</form>
				<form name="f">
				<tr>
					<td class="stitle">������������Ʈ ����Ʈ</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="UCPRJ031S" width="790" height="415" no="true">
							<tr event="D">
								<td width="0"	column="mtnc_nm" 		title="����������" 		align="left" ></td>
								<td width="100"	column="clnt_corp_nm" 	title="����" 			align="left" ></td>
								<td width="110"	column="mtnc_system_nm" title="�ý���" 			align="left" ></td>
								<td width="80"	column="chrg_user_id_nm" 	title="�����η�" 			align="center" ></td>
								<td width="60"	column="cs_user_id_nm" 	title="CS���" 		align="center"></td>
								<td width="120"	column="mtnc_type" 		title="������������" 	align="center" format="COMBO" brcode="PRJ017"></td>
								<td width="40"	column="mtnc_cost" 		title="���" 			align="center" format="COMBO" brcode="PRJ014"></td>
								<td width="110"	column="mtnc_period" 	title="�Ⱓ" 			align="center" ></td>
								<td width="60"	column="regular_chk" 	title="��������" 		align="center" format="COMBO" brcode="PRJ015"></td>
								<td width="80"	column="coop_corp_nm" 	title="���»�" 			align="center" ></td>
								<td width="80"	column="dvlp_frwk" 		title="�����ӿ�ũ" 		align="center" format="COMBO" brcode="PRJ016"></td>
								<td width="170"	column="prj_nm" 		title="������Ʈ��" 		align="left"   ></td>
								<td width="200"	column="rmk" 			title="Ư�̻���" 		align="left" maxlength="2000"></td>
								<td width="80"	column="mtnc_seq" 		title="��������SEQ" 	align="center" hidden="true"></td>
								<td width="80"	column="clnt_corp_seq" 	title="����SEQ" 		align="center" hidden="true"></td>
								<td width="100"	column="mtnc_system" 	title="�ý���cd" 		align="center" hidden="true"></td>
								<td width="80"	column="strt_date" 		title="��������" 		align="center" hidden="true"></td>
								<td width="80"	column="end_date" 		title="��������" 		align="center" hidden="true"></td>
								<td width="80"	column="coop_corp_seq" 	title="���»�SEQ" 		align="center" hidden="true"></td>
								<td width="100"	column="prj_seq" 		title="������ƮSEQ" 	align="center" hidden="true"></td>
								<td width="100"	column="cs_user_id" 		title="CS���" 	align="center" hidden="true"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td height="5"></td>
				</tr>
				<tr>
					<td align="right">
						<ucare:imgbtn name="btnApply" value="����"  width="70"   onClick="Apply();"/>&nbsp;
						<ucare:imgbtn name="btnClose" value="�ݱ�"  width="70"   onClick="self.close();"/>
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