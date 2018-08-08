<%@ include file="/jsp/include/include.jsp" %>
<%@ page contentType="text/html;charset=euc-kr" %>

<html>
<head>
<title>전화걸기/호전환</title>
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
	
	txch(2);	//그룹호전환 기본 선택
	
	queryList();
	
}

//###################################
//상담 그룹 가져오기
//###################################
function queryList()
{	
	var trans = new Trans();							
	trans.setSvc(SELECT_ID);			// 쿼리ID
	trans.setDisSvc(SELECT_ID);		// gridID
	trans.setWait(false);
	trans.setUserParams("up_cd=COM006");
	trans.setPageRow("200");					// 1Page에 몇 개의 Row를 출력할 것인가?			
	trans.setWiseGrid("1");						// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");			// wisegrid를 사용하는 경우 반드시 추가
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
//상태확인
//###################################
function checkStatus()
{
	var mtelno = f.mtelno.value;
	
	//호전환 할 상담원 DN 상태 호출
	opener.getAgentStatus(mtelno);
}

//###################################
//상담원 DN 상태 셋팅
//###################################
function setAgentStatus(callStatus, agentStatus)
{
	g_callStatus = callStatus;
	g_agentStatus = agentStatus;
	
	//통화중 아니고 NotReady나 AfterCallWork 인 경우
	if(callStatus == 0 && (agentStatus == 3 || agentStatus == 4 || agentStatus == 2))
	{
		//호전환 가능
		document.getElementById("status").innerText = "호전환 가능";
	}
	else
	{
		document.getElementById("status").innerText = "호전환 불가능";
	}
}

//###################################
//호전환
//###################################
function conference(){
	var telno = numberMask(f.telno.value);
	var mtelno = f.mtelno.value;
	
	//그룹 호전환
	if(f.gubun[0].checked) {
		//호전환 가능
		if(g_callStatus == 0 && (g_agentStatus == 3 || g_agentStatus == 4))
		{
			opener.MuteTransfer(mtelno);
			window.close();
		}
		else {
			alert("호전환 가능한 상태가 아닙니다.");
			return;
		}
	}
	else {
		if(f.telno.value=="") {
			alert("전화번호를 입력하세요.");
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
//연결
//###################################
function confComplete(){
	opener.CompleteTransfer();
	window.close();
}

//###################################
//취소
//###################################
function cancel(){
	opener.ReconnectCall();
	
	document.all("btntxt").disabled=false;
	document.all("btnconn").disabled=true;
	document.all("btncancel").disabled=true;
}

//###################################
//글자변경
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
			<td class="stitle">호전환</td>
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
									<td width="100" column="user_nm"	title="상담원"		align="center"></td>
									<td width="80" column="ext_no"		title="내선번호"	align="center"></td>
									<td width="170" column="code_nm" title="상담그룹"	align="left"></td>
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
				<input type="radio" name="gubun" class="frm_radio" onclick="txch('1')">그룹호전환
			</td>
			<td>
				<ucare:select name="svcGrp" brcode="COM006" option="-1" width="100" styleClass="frm_select"/>
			</td>
		</tr>
		<tr>
			<td class="box_td01"  width="110" align="center">
				<input type="radio" name="gubun" class="frm_radio" onclick="txch('2')" checked>일반호전환
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
	  			&nbsp;<ucare:imgbtn name="btntxt" value="호전환시도"  width="80" onClick="conference()"  />
	  			&nbsp;<ucare:imgbtn name="btnconn" value="호전환연결"  width="80" onClick="confComplete()" />
	  			&nbsp;<ucare:imgbtn name="btncancel" value="취소"  width="50" onClick="cancel()" />
	  		</td>
	  	</tr>
	</table>
</form>
</body>
</html>