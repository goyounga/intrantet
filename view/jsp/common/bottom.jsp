<%@ include file="/jsp/include/include.jsp" %>
<%@ page contentType="text/html;charset=euc-kr" %>

<html>
<head>
<title>BOTTOM</title>
<script language="javascript">
//var SELECT_NOTICE_ID	= "UCSYS070S";		//�ǽð� ��������
var SELECT_MEMO_ID	= "UCSYS104S"; 	   	//�ǽð� ����
var STATUS_ID				= "UCCOM101S";

var Timer = null;
var g_flag = "N";

//##############################
// ONLOAD
//##############################
function setInit(){
	//realQuery();
	//noticeTimer();		//Ÿ�̸� ����
}

//##############################
// �ϴ� �Ǽ� ��������
//##############################
function realQuery() {
	if(g_flag == "Y") return;
	
	g_flag = "Y";
	
	var trans = new Trans();
	trans.setSvc(SELECT_MEMO_ID + "," + STATUS_ID);
	trans.setUserParams("userid="+ top.f.userid.value);
	trans.setWait(false);
	trans.open("f", "f", "/common.do");
}

//###################################
//Ÿ�̸�
//###################################
function noticeTimer() {
	if(Timer == null) {	
		Timer = setInterval(realQuery, 1000 * 300);		// 1000 = 1��
	}
}

//###################################
//CALLBACK
//###################################
function callback(sServiceID) {		
	switch (sServiceID) {		
		case SELECT_MEMO_ID + "," + STATUS_ID:
			/* ���� */
			var memoCnt = checkUndefined(DataSet.getParam(SELECT_MEMO_ID, 1, 0, "msgcnt"));
			if(nvl(memoCnt, 0) != "0")
			{
				f.newMemo.src="/html/images/icon/ico_slip02.gif";
			}
			else if(nvl(memoCnt, 0) == 0)
			{
				f.newMemo.src="/html/images/icon/ico_slip01.gif";
			}
			
			/* ���� / �������� / �������� / ���ε */
			var status_cnt1 = checkUndefined(DataSet.getParam(STATUS_ID, 1, 0, "status_cnt1"));		//����
			var status_cnt2 = checkUndefined(DataSet.getParam(STATUS_ID, 1, 0, "status_cnt2"));		//��������
			var status_cnt3 = checkUndefined(DataSet.getParam(STATUS_ID, 1, 0, "status_cnt3"));		//������������
			var status_cnt4 = checkUndefined(DataSet.getParam(STATUS_ID, 1, 0, "status_cnt4"));		//���ε

			var res_yn = checkUndefined(DataSet.getParam(STATUS_ID, 1, 0, "res_yn"));		//���ε
			
			document.getElementById("status_cnt1").innerHTML = nvl(status_cnt1, 0);
			document.getElementById("status_cnt2").innerHTML = nvl(status_cnt2, 0);
			document.getElementById("status_cnt3").innerHTML = nvl(status_cnt3, 0);
			document.getElementById("status_cnt4").innerHTML = nvl(status_cnt4, 0);
			document.getElementById("res_yn").innerHTML = nvl(res_yn, '');

			g_flag = "N";
			break;
		default :		
			break;
	}
}

//###################################
//������ ����Ʈ
//###################################
function openReservedCallList()
{
	topFrame.menu[0].click();
	setOpener();
	openPopup("/jsp/common/comReservedCall.jsp", "ReservedCall", 605, 500);
}

function openMemo(obj)
{
	//setOpener(obj);
	//openPopup("/system/sysMemoMng.jsp?userid="+top.f.userid.value, "MemoMng", 800, 590);	
	openPopup("/jsp/system/sysMemoMng.jsp", "userid="+top.f.userid.value, "MemoMng", "0", "0", "800", "590", "", "")
}
</script>
</head>

<body topmargin="0" leftmargin="0" rightmargin="0" onLoad="setInit()">
<form name="f" method="post">
	<table width="1270" height="20" border="0" cellpadding="0" cellspacing="0">
		<tr bgcolor="CCCCCC">
			<td width="576">
				<table width="100%" height="20" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td width="200" align="center" valign="middle" background="/html/images/main/time_bg.gif">
							<font id="logtime" color="white"></font>&nbsp;<font color="white"></font>
						</td>
						<td width=370></td>
						<!--
						<td width="4"></td>
						<td width="90" align=center  background="/html/images/main/b_bg01.gif" style="padding:0 0 0 0;" onclick="openReservedCallList()" style="cursor:hand">�ѰǼ�:<span id="status_cnt1">0</span> / <span id="res_yn"></span></td>
						<td width="3"></td>
						<td width=90 align=center background="/html/images/main/b_bg01.gif" style="padding:0 0 0 0;"> ARS�ݹ�:<span id="status_cnt2">0</span></td>
						<td width="3"></td>
						<td width=90 align=center background="/html/images/main/b_bg01.gif" style="padding:0 0 0 0;">����ȭ����:<span id="status_cnt4">0</span></td>
						<td width="3"></td>
						<td width=90 align=center background="/html/images/main/b_bg01.gif" style="padding:0 0 0 0;">��ȭ���:<span id="status_cnt4">0</span></td>
						<td width="3"></td>
						-->
					</tr>
				</table>
			</td>
			<td width="101">&nbsp;</td>
			<td width="280" align=right style="padding:2 0 0 0 ">
				<b><%=sessioninfo.getUserCorpName()%> <%=sessioninfo.getUserName()%>(<%=sessioninfo.getUserID()%>)</b> �� �α���
			</td>
			<td width=20><!-- <img id="newMemo" name="newMemo" src="/html/images/icon/ico_slip01.gif" border=0 style="margin:5 0 0 0;cursor:hand" onclick="openMemo(this)"> --></td>
			<td width=2></td>
		</tr>
	</table>
</form>
</body>
</html>