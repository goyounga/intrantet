<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>���� �ۼ���</title>
<script language="javascript" src="/html/js/system/sysMemoMng.js"></script>
</head>
<body topmargin=0 leftmargin=0 onload="init();">
<table border=0 cellpadding=0 cellspacing=0 width=800>
	<tr>
		<td>
			<table width="100%" height="30" border="0" cellpadding="0" cellspacing="0" background="/html/images/common/popupbg.gif">
				<tr>
					<td class="popup_tit"><b>����</b></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<table border=0 cellpadding=1 cellspacing=1 width=800>
	<tr valign=top>
		<td>
			<ucare:table type="tab" width="100" name="����,�߽�,������" id="tab02" >
				<!--###################################################### ���� ########################################################-->
				<tr id="memo" style="display:" class="box_bg02">
					<td>
						<form name="fQuery" method="post">
							<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">
							<table width="795" cellspacing='0' cellpadding='0' border='0'>							
								<tr>
									<td>	
										<ucare:table type="query" width="100%">
											<tr>
												<td width=60 align=right style="padding:2 0 0 0 ">�߽��� :&nbsp;</td>
												<td width=80><input type="text" name="s_sndr_nm" class="frm_text" size=8 onKeyPress="checkEnterKey();" required="false"></td>
												<td width=40 align=right style="padding:2 0 0 0 ">���� :&nbsp;</td>
												<td width=110><input type="text" name="s_msg_sbjt" class="frm_text" size=15 onKeyPress="checkEnterKey();" required="false"></td>
												<td width=60 align=right style="padding:2 0 0 0 ">������ :&nbsp;</td>
												<td width=210>						
													<input type=text class=frm_text rmode="Y,Y,Y" rclear="N" name=startdt size=10 onKeyPress="checkEnterKey();" required=true title="���� ��������"  pattern="D" format="DATE" value="<%=CUtil.getMyDate(-1, "yyyy-MM-dd") %>"><span class=calendar onclick="return top.ifrmCal.service(fQuery.startdt)"></span>&nbsp; 
													~
													<input type=text class=frm_text rmode="Y,Y,Y" rclear="N" name=enddt size=10 onKeyPress="checkEnterKey();" required=true title="���� ����������"  pattern="D" format="DATE" value="<%=CUtil.getMyDate(0, "yyyy-MM-dd")%>"><span class=calendar onclick="return top.ifrmCal.service(fQuery.enddt)"></span>		
												</td>
												<td width=80 align=right style="padding:2 0 0 0 "><!--�б⿩�� :&nbsp;--></td>
												<td>&nbsp;</td>
												<td width=1 bgcolor=#CCCCCC></td>
								 				<td width=80 align=right>
								 					<ucare:imgbtn name="btnQuery" value="��ȸ"  width="70" onClick="queryList()"/>
												</td>
											</tr>
										</ucare:table>										
									</td>
								</tr>							
							</table>
						</form>
						<form name="f" method="post">
						<input type="hidden" name="rcv_useyn">
						<input type="hidden" name="user_id">
						<input type="hidden" name="db_msg_id">
							<table width="795" cellspacing='0' cellpadding='0' border='0'>
								<tr>		
									<td colspan=2>
										<ucare:grid id="UCSYS095S" width="793" height="175" no="false">
										  <tr event="O">
											<td width="20"	column="seq"					title=" "				format="CHECKBOX" hcheckbox="true" editable="true"></td> 
											<td width="0"		column="msg_id"			title=" " 				style="display:none"></td>
											<td width="360" column="msg_sbjt"			title="�� ��" 		align="left"></td>
											<td width="120" column="sndr_nm"			title="�߽��ڸ�" 	align="center"></td>													
											<td width="100" column="snd_dt" 			title="�߽�����" 	align="center" format="DATE"></td>
											<td width="100" column="snd_tm" 			title="�߽Žð�" 	align="center"></td>
											<td width="73"	column="rcv_useyn"		 	title="�б⿩��" 	align="center"></td>
										  </tr>
										</ucare:grid>
									</td>
								</tr>
								<tr>
									<td width="795" align=right style="padding:1 5 0 0 ">
										<ucare:imgbtn name="btnKeep" value="��������"  width="70" onClick="keepMsg('01','K')"/>&nbsp;
										<ucare:imgbtn name="btnDel" value="��ϻ���"  width="70" onClick="keepMsg('01','D')"/>
									</td>
								</tr>								
							</table>						
							<table border=0 cellpadding=0 cellspacing=0 width="100%">
								<tr>
									<td width="795"><span class="stitle">��������</span></td>
								</tr>
								<tr>
									<td>
										<ucare:table type="detail" width="100%">
											<tr>
												<td class=MANTDT width=100>�߽���</td>
												<td class=tbl_td colspan=5>
													<input type="text" name="sndr_nm" class="frm_noborder" readonly style="width:693;" required="true" requirednm="�߽���">
													<input type="hidden" name="sndr_id">
												</td>
											</tr>
											<tr>
												<td class=MANTDT>����</td>
												<td class=tbl_td colspan=5><input type="text" name="msg_sbjt" readonly class="frm_noborder" style="width:693;" required="true" requirednm="����"></td>
											</tr>
											<tr>
												<td class=MANTDT>����</td>
												<td class=tbl_td colspan=5>
													<textarea class="frm_textarea" name="msg_txt" readonly cols=112 rows=9 required="true" requirednm="����"></textarea>
												</td>
											</tr>
											<tr>
												<td class=MANTDT>��������</td>
												<td class=tbl_td><input type="text" name="snd_dt" readonly	class="frm_noborder" style="width:100;" format="DATE"></td>
												<td class=MANTDT>���Žð�</td>
												<td class=tbl_td><input type="text" name="snd_tm" readonly	class="frm_noborder" style="width:100;" format="TIME"></td>
												<td class=MANTDT>�߼�����</td>
												<td class=tbl_td><input type="text" name="snd_tp_nm" readonly	class="frm_noborder" style="width:100;"></td>
											</tr>
											<tr>
												<td class=MANTDT>��������</td>
												<td class=tbl_td><input type="text" name="insp_dt" readonly class="frm_noborder" style="width:100;" format="DATE"></td>
												<td class=MANTDT>�����ð�</td>
												<td class=tbl_td colspan=3><input type="text" name="insp_tm" readonly class="frm_noborder" style="width:100;" format="TIME"></td>
											</tr>
										</ucare:table>
									</td>
								</tr>	
								<tr>
									<td align=right style="padding:0 7 0 0 ">
										<ucare:imgbtn name="btnTab" value="���徲��"  width="70" onClick="getMemoUserId('Q1');"/>
									</td>									
								</tr>
							</table>	
						</form>			
					</td>
				</tr>
				<!--###################################################### �߽� ########################################################-->
				<tr id="memo" style="display:" align="center" class="box_bg02">
					<td>
						<form name="fQuery2" method="post">
							<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">
							<table width="795" cellspacing='0' cellpadding='0' border='0'>							
								<tr>
									<td>	
										<ucare:table type="query" width="100%">
											<tr>
												<td width=60 align=right style="padding:2 0 0 0 ">������ :&nbsp;</td>
												<td width=80><input type="text" name="s_rcvr_nm" class="frm_text" size=8 onKeyPress="checkEnterKey();" required="false"></td>
												<td width=40 align=right style="padding:2 0 0 0 ">���� :&nbsp;</td>
												<td width=110><input type="text" name="s_msg_sbjt" class="frm_text" size=15 onKeyPress="checkEnterKey();" required="false"></td>
												<td width=60 align=right style="padding:2 0 0 0 ">�߽��� :&nbsp;</td>
												<td width=210>						
													<input type=text class=frm_text rmode="Y,Y,Y" rclear="N" name=startdt size=10 onKeyPress="checkEnterKey();" required=true title="���� ��������"  pattern="D" format="DATE" value="<%=CUtil.getMyDate(-1, "yyyy-MM-dd") %>"><span class=calendar onclick="return top.ifrmCal.service(fQuery2.startdt)"></span>&nbsp; 
													~
													<input type=text class=frm_text rmode="Y,Y,Y" rclear="N" name=enddt size=10 onKeyPress="checkEnterKey();" required=true title="���� ����������"  pattern="D" format="DATE" value="<%=CUtil.getMyDate(0, "yyyy-MM-dd")%>"><span class=calendar onclick="return top.ifrmCal.service(fQuery2.enddt)"></span>		
												</td>										
												<td>&nbsp;</td>
												<td width=1 bgcolor=#CCCCCC></td>
								 				<td width=80 align=right>
								 					<ucare:imgbtn name="btnQuery" value="��ȸ"  width="70" onClick="queryList2()"/>
												</td>	
											</tr>
										</ucare:table>										
									</td>
								</tr>							
							</table>
						</form>
						<form name="f2" method="post">
						<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">
						<input type="hidden" name="rcvr_id">
						<input type="hidden" name="ip">
							<table width="795" cellspacing='0' cellpadding='0' border='0'>
								<tr>		
									<td colspan=2>
										<ucare:grid id="UCSYS096S" width="793" height="175" no="false">
										  <tr event="O">
											<td width="20"	column="seq"					title=" "				format="CHECKBOX" hcheckbox="true" editable="true"></td> 
											<td width="0"		column="msg_id"			title=" "				style="display:none"></td> 
											<td width="553" column="msg_sbjt"			title="�� ��" 		align="left"></td>
											<td width="0"		column="rcvr_nm"			title="�����ڸ�" 	align="center" style="display:none"></td>													
											<td width="100" column="snd_dt" 			title="�߽�����" 	align="center" format="DATE"></td>
											<td width="100" column="snd_tm" 			title="�߽Žð�" 	align="center"></td>
										  </tr>
										</ucare:grid>
									</td>
								</tr>
								<tr>
									<td width="795" align=right style="padding:1 5 0 0 ">
										<ucare:imgbtn name="btnKeep" value="��������"  width="70" onClick="keepMsg('02','K')"/>&nbsp;
										<ucare:imgbtn name="btnDel" value="��ϻ���"  width="70" onClick="keepMsg('02','D')"/>
									</td>
								</tr>
							</table>	
							<table border=0 cellpadding=0 cellspacing=0 width="100%">
								<tr>
									<td width="795"><span class="stitle">��������</span></td>
									
								</tr>
								<tr>
									<td colspan=2>
										<ucare:table type="detail" width="100%">
											<tr>
												<td class=MANTDT width=100>������</td>
												<td class=tbl_td colspan=5>
													<input type="text" 		name="rcvr_nm" 		class="frm_text" 	style="width:645;" 	 	readonly required="true" requirednm="������" style='padding:0 20 0 0'>
													<span id="userDel" 		name="userDel" 		class="xClose" 	style="display:"  		onclick="userDel()"  	style='padding:0 20 0 0'></span>
													<span id="selectUser" 	name="searchUser"	class="search"		style="display:"   		onClick="openUserOrg()"></span>
												</td>
											</tr>
											<tr>
												<td class=MANTDT>����</td>
												<td class=tbl_td colspan=5><input type="text" name="msg_sbjt" readonly class="frm_text" style="width:693;" required="true" requirednm="����"></td>
											</tr>
											<tr>
												<td class=MANTDT>����</td>
												<td class=tbl_td colspan=5>
													<textarea class="frm_textarea" name="msg_txt" readonly cols=112 rows=11  required="true" requirednm="����"></textarea>
												</td>
											</tr>
											<tr>
												<td class=MANTDT>�߽�����</td>
												<td class=tbl_td><input type="text" name="snd_dt" readonly	class="frm_noborder" style="width:100;" format="DATE"></td>
												<td class=MANTDT>�߽Žð�</td>
												<td class=tbl_td><input type="text" name="snd_tm" readonly	class="frm_noborder" style="width:100;" format="TIME"></td>
												<td class=MANTDT>�߼�����</td>
												<td class=tbl_td><ucare:select name="snd_tp_cd" brcode="SYS009" code="code" codename="codenm" option="4" tag="required='true' requirednm='�߼�����'"/></td>
											</tr>
										</ucare:table>
									</td>
								</tr>	
								<tr><td height=5></td></tr>
								<tr>
									<td align=right style="padding:0 5 0 0 ">
										<ucare:imgbtn name="btnWrite" value="��������"  width="70" onClick="memoWrite()" />&nbsp;
										<ucare:imgbtn name="btnSend" value="�߽�"  width="70" onClick="memoSend()"/>
									</td>
								</tr>
							</table>	
						</form>			
					</td>
				</tr>
				<!--###################################################### ������ ########################################################-->
				<tr id="memo" style="display:" align="center" class="box_bg02">
					<td>
						<form name="fQuery3" method="post">
							<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">
							<table width="795" cellspacing='0' cellpadding='0' border='0'>							
								<tr>
									<td>	
										<ucare:table type="query" width="100%">
											<tr>
												<td width=60 align=right style="padding:2 0 0 0 ">�߽��� :&nbsp;</td>
												<td width=80><input type="text" name="s_sndr_nm" class="frm_text" size=8 onKeyPress="checkEnterKey();" required="false"></td>
												<td width=40 align=right style="padding:2 0 0 0 ">���� :&nbsp;</td>
												<td width=110><input type="text" name="s_msg_sbjt" class="frm_text" size=15 onKeyPress="checkEnterKey();" required="false"></td>
												<td width=60 align=right style="padding:2 0 0 0 ">������ :&nbsp;</td>
												<td width=220>						
													<input type=text class=frm_text rmode="Y,Y,Y" rclear="N" name=startdt size=10 onKeyPress="checkEnterKey();" required=true title="���� ��������"  pattern="D" format="DATE" value="<%=CUtil.getMyDate(-1, "yyyy-MM-dd") %>"><span class=calendar onclick="return top.ifrmCal.service(fQuery3.startdt)"></span>&nbsp; 
													~
													<input type=text class=frm_text rmode="Y,Y,Y" rclear="N" name=enddt size=10 onKeyPress="checkEnterKey();" required=true title="���� ����������"  pattern="D" format="DATE" value="<%=CUtil.getMyDate(0, "yyyy-MM-dd")%>"><span class=calendar onclick="return top.ifrmCal.service(fQuery3.enddt)"></span>		
												</td>
												<td width=85 align=right style="padding:2 0 0 0 ">�ۼ������� :&nbsp;</td>
												<td width=80><ucare:select name="s_kep_tp_cd" brcode="SYS010" code="code" codename="codenm" option="4"/></td>
												</td>												
												<td>&nbsp;</td>
												<td width=1 bgcolor=#CCCCCC></td>
								 				<td width=80 align=center>
								 					<ucare:imgbtn name="btnQuery" value="��ȸ"  width="70" onClick="queryList3()"/>
												</td>
											</tr>
										</ucare:table>										
									</td>
								</tr>							
							</table>
						</form>
						<form name="f3" method="post">
							<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">
							<table width="795" cellspacing='0' cellpadding='0' border='0'>
								<tr>		
									<td colspan=2>
										<ucare:grid id="UCSYS097S" width="793" height="175" no="false">
										  <tr event="O">
											<td width="20"	column="seq"				title=" "				format="CHECKBOX" hcheckbox="true" editable="true"></td> 
											<td width="0"		column="msg_id"		title=" " 					style="display:none"></td>												
											<td width="0"		column="kep_tp_cd"	title=" " 					style="display:none"></td>												
											<td width="60"	column="kep_tp_nm"	title="����" 			align="center"></td>												
											<td width="375" column="msg_sbjt"		title="�� ��" 			align="left"></td>
											<td width="120" column="user_nm"		title="�ۼ����ڸ�" 	align="center"></td>													
											<td width="100" column="snd_dt" 		title="�ۼ�������" 	align="center" format="DATE"></td>
											<td width="100" column="snd_tm" 		title="�ۼ��Žð�" 	align="center" format="TIME"></td>
										  </tr>
										</ucare:grid>
									</td>
								</tr>
								<tr>
									<td width="795" align=right style="padding:1 5 0 0 ">
										<ucare:imgbtn name="btnDel" value="��ϻ���"  width="70" onClick="keepMsg('03','D')"/>
									</td>
								</tr>							
							</table>						
							<table border=0 cellpadding=0 cellspacing=0 width="100%">
								<tr>
									<td width="795"><span class="stitle">��������</span></td>
								</tr>
								<tr>
									<td>
										<ucare:table type="detail" width="100%">
											<tr>
												<td class=MANTDT width=100>�ۼ����ڸ�</td>
												<td class=tbl_td colspan=5>
													<input type="text" name="user_nm" readonly class="frm_noborder" style="width:690;">
													<input type="hidden" name="senderid">
																									
												</td>
											</tr>
											<tr>
												<td class=MANTDT>����</td>
												<td class=tbl_td colspan=5><input type="text" name="msg_sbjt" class="frm_noborder" style="width:693;" required="true" requirednm="����"></td>
											</tr>
											<tr>
												<td class=MANTDT>����</td>
												<td class=tbl_td colspan=5>
													<textarea class="frm_textarea" name="msg_txt" cols=112 rows=11 required="true" requirednm="����"></textarea>
												</td>
											</tr>
											<tr>
												<td class=MANTDT>�߽�����</td>
												<td class=tbl_td><input type="text" name="snd_dt"	class="frm_noborder"	readonly	style="width:100;" format="DATE"></td>
												<td class=MANTDT>�߽Žð�</td>
												<td class=tbl_td><input type="text" name="snd_tm"	class="frm_noborder" 	readonly	style="width:100;" format="TIME"></td>
												<td class=MANTDT>�߼�����</td>
												<td class=tbl_td><ucare:select 	name="snd_tp_cd" brcode="SYS009" code="code" codename="codenm" option="4"/></td>
											</tr>
											<tr>
												<td class=MANTDT>��������</td>
												<td class=tbl_td><input type="text" name="insp_dt" class="frm_noborder"	readonly	style="width:100;" format="DATE"></td>
												<td class=MANTDT>�����ð�</td>
												<td class=tbl_td ><input type="text" name="insp_tm" class="frm_noborder" 	readonly	style="width:100;" format="TIME"></td>
												<td class=MANTDT>�ۼ�������</td>
												<td class=tbl_td>
													<input type="text" name="kep_tp_nm" class="frm_noborder" 	readonly	style="width:100;">
												</td>	
											</tr>
										</ucare:table>
									</td>
								</tr>	
								<tr>
									<td align=right style="padding:0 7 0 0 ">
										<!--<ucare:imgbtn name="btnTab" value="���徲��"  width="70" onClick="tabclick('tbltab02',1,'');tab02_onclick(1);getMemoUserId('Q3')" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight"/>-->
									</td>									
								</tr>
								<tr>
									<td><iframe name=ifmMenu src="/jsp/common/blank.jsp"  style="height:0" scrolling="no" frameborder="0" ></iframe></td>
								</tr>
							</table>	
						</form>	
						<form name="f4" method="post">
							<input type="hidden" name="inspectdt">
							<input type="hidden" name="inspecttm">
							<input type="hidden" name="memoid">
						</form>		
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
</table>

</body>
</html>