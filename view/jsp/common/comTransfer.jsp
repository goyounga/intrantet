<%@ include file="/jsp/include/include.jsp" %>
<%@ page contentType="text/html;charset=euc-kr" %>

<html>
<head>
<title>��ȭ�ɱ�/ȣ��ȯ</title>
<script language="javascript">
var SELECT_ID = "UCCOM103S";
var g_callStatus = "";
var g_agentStatus = "";

//###################################
// ONLOAD
//###################################
function setInit()
{
	f.telno.value = "";
	
	document.all("btnconn").disabled=true;
	document.all("btncancel").disabled=true;
	
	txch(2);	//�׷�ȣ��ȯ �⺻ ����
	
	queryList();
	
}

//###################################
//��� �׷� ��������
//###################################
function queryList()
{	
	var trans = new Trans();							
	trans.setSvc(SELECT_ID);			// ����ID
	trans.setDisSvc(SELECT_ID);		// gridID
	trans.setWait(false);
	trans.setUserParams("up_cd=COM006");
	trans.setPageRow("200");					// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	trans.setWiseGrid("1");						// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("f", "f","/wisegrid.do");
}

//###################################
//Callback
//###################################
function callback(svcID)
{
	switch(svcID)
	{
		case SELECT_ID :
			break;		
	}
}

//###################################
// ONCLICK - LEFT CLICK
//###################################
function showDetail_obj(id, strColumnKey, nRow) 
{ 
	document.getElementById("status").innerText = "";

	if(f.gubun[1].checked){
		f.telno.value = DataSet.getParam(SELECT_ID, 1, nRow, "ext_no");
		f.mtelno.value = DataSet.getParam(SELECT_ID, 1, nRow, "ext_no");
		checkStatus();
		txch(2);
	}
} 

//###################################
//����Ȯ��
//###################################
function checkStatus()
{
	var mtelno = f.mtelno.value;
	
	//ȣ��ȯ �� ���� DN ���� ȣ��
	opener.getAgentStatus(mtelno);
}

//###################################
//���� DN ���� ����
//###################################
function setAgentStatus(callStatus, agentStatus)
{
	g_callStatus = callStatus;
	g_agentStatus = agentStatus;
	
	//��ȭ�� �ƴϰ� NotReady�� AfterCallWork �� ���
	if(callStatus == 0 && (agentStatus == 3 || agentStatus == 4 || agentStatus == 2))
	{
		//ȣ��ȯ ����
		document.getElementById("status").innerText = "ȣ��ȯ ����";
	}
	else
	{
		document.getElementById("status").innerText = "ȣ��ȯ �Ұ���";
	}
}

//###################################
//ȣ��ȯ
//###################################
function conference(){
	var telno = numberMask(f.telno.value);
	var mtelno = f.mtelno.value;
	
	//�׷� ȣ��ȯ
	if(f.gubun[0].checked) {
		//ȣ��ȯ ����
		if(g_callStatus == 0 && (g_agentStatus == 3 || g_agentStatus == 4))
		{
			opener.MuteTransfer(mtelno);
			window.close();
		}
		else {
			alert("ȣ��ȯ ������ ���°� �ƴմϴ�.");
			return;
		}
	}
	else {
		if(f.telno.value=="") {
			alert("��ȭ��ȣ�� �Է��ϼ���.");
			f.telno.focus()
			return;
		}
		
		opener.InitiateTransfer(telno);
		
		document.all("btncancel").disabled=false;
		document.all("btntxt").disabled=true;
		document.all("btnconn").disabled=false;
	}
}

//###################################
//����
//###################################
function confComplete(){
	opener.CompleteTransfer();
	window.close();
}

//###################################
//���
//###################################
function cancel(){
	opener.ReconnectCall();
	
	document.all("btntxt").disabled=false;
	document.all("btnconn").disabled=true;
	document.all("btncancel").disabled=true;
}

//###################################
//���ں���
//###################################
function txch(v){
	if(v=="1")
	{
		f.svcGrp.disabled = false;

		f.telno.disabled = true;
		f.telno.className = "frm_readonly";
	}
	else if(v=="2")
	{
		f.btntxt.disabled = false;
		f.btnconn.disabled = true;
		f.btncancel.disabled = true;

		f.svcGrp.disabled = true;
		
		f.telno.disabled = false;
		f.telno.className = "frm_text";
		f.telno.focus();
	}
}

</script>
</head>

<body topmargin="0" leftmargin="0" rightmargin="0" onLoad="setInit()">
<center>
<form name="f" method="post">
	<input type="hidden" name="mtelno">
	<table border="0" cellpadding="0" cellspacing="0" width="95%">
		<tr>
			<td class="stitle">ȣ��ȯ</td>
		</tr>
	</table>
	<ucare:table type="query" width="280">
		<tr>
			<td height="3" colspan="2"></td>
		</tr>
		<tr>
			<td colspan="2" align=center>
				<table border=0 cellpadding=0 cellspacing=0>
					<tr>
						<td>
							<ucare:grid id="UCCOM103S" width="390" height="344" no="true">
								<tr event="O">
									<td width="100" column="user_nm"	title="����"		align="center"></td>
									<td width="80" column="ext_no"		title="������ȣ"	align="center"></td>
									<td width="170" column="code_nm" title="���׷�"	align="left"></td>
								</tr>
							</ucare:grid>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr height=10>
			<td colspan="2"></td>
		</tr>
		<tr> 
			<td class="box_td02" align="center" width="110">
				<input type="radio" name="gubun" class="frm_radio" onclick="txch('1')">�׷�ȣ��ȯ
			</td>
			<td>
				<ucare:select name="svcGrp" brcode="COM006" option="-1" width="100" styleClass="frm_select"/>
			</td>
		</tr>
		<tr>
			<td class="box_td01"  width="110" align="center">
				<input type="radio" name="gubun" class="frm_radio" onclick="txch('2')" checked>�Ϲ�ȣ��ȯ
			</td>
			<td class="box_td02" width="160" align="left">
				<input type="text" name="telno" class="frm_text" size="20" onkeypress="checkKey('makeCall');">				
			</td>
		</tr>
		<tr height=25>
			<td colspan="2" align=center><font color="red"><span id="status">&nbsp;</span></font></td>
		</tr>
	</ucare:table>
	<table border="0" width="380">
	  	<tr height=35>
	  		<td align="right">
	  			&nbsp;<ucare:imgbtn name="btntxt" value="ȣ��ȯ�õ�"  width="80" onClick="conference()"  />
	  			&nbsp;<ucare:imgbtn name="btnconn" value="ȣ��ȯ����"  width="80" onClick="confComplete()" />
	  			&nbsp;<ucare:imgbtn name="btncancel" value="���"  width="50" onClick="cancel()" />
	  		</td>
	  	</tr>
	</table>
</form>
</body>
</html>