/*------------------------------------------------------------------
 ��       �� : ���� ����/�߽�
 ��  ��  �� : ������
 �����ۼ��� : 2009.01.15
 ���������� : 
 ��ɿ��   : ������ �����ϰ� �߽��Ѵ�.
 ���泻��
---------------------------------------------------------------------
 ��������			������	             ����
---------------------------------------------------------------------*/

var SELECT_MEMORECEIVEINFO_ID		= "UCSYS095S";		//�������ų��� SELECT
var UPDATE_MEMORECEIVEINFO_ID	= "UCSYS095U";		//���� �б⿩�� ���
var SELECT_MEMOSENDINFO_ID		= "UCSYS096S";		//�����߽ų��� SELECT
var SELECT_MEMOSENDINFO_ID2		= "UCSYS096S_2";	//�����߽ų��� SELECT2
var SELECT_MEMOKEEPINFO_ID			= "UCSYS097S";		//������������ SELECT
var INSERT_MEMOINFO_ID				= "UCSYS098I";		//���� INSERT
var INSERT_MEMORECEIVEINFO_ID		= "UCSYS099I";		//�������ų��� INSERT
var INSERT_MEMOKEEPINFO_ID			= "UCSYS101I";		//������������ INSERT
var UPDATE_MEMODELETE_ID			= "UCSYS100U";		//���� ���� ��� ����
var UPDATE_MEMODELETE_ID2			= "UCSYS101U";		//���� �߽� ��� ����
var UPDATE_MEMODELETE_ID3			= "UCSYS102U";		//���� ������ ��� ����
var SELECT_USER_ID							= "UCSYS103S";		// IP ��������

var formFlag ="Q1"; 			//�۽�,�߽�,������ ����
var iPort = 8000;
var g_index;

//###################################
// ONLOAD
//###################################
function init() {
	btnControlA("S");
	btnControlB("S");
	btnControlC("S");

	memo[1].style.display = "none";
	memo[2].style.display = "none";

	queryList();
}

//###################################
//���� �������� ��ȸ
//###################################
function queryList() {
	var gridObj = document.all(SELECT_MEMORECEIVEINFO_ID);
	gridObj.setParam("snd_tm_format", "TIME");

	var trans = new Trans();							
	trans.setSvc(SELECT_MEMORECEIVEINFO_ID);			// ����ID
	trans.setDisSvc(SELECT_MEMORECEIVEINFO_ID);		// gridID
	trans.setWait(true);
	trans.setAsync(true);
	trans.setDefClick(false);
	trans.setPageRow(999);			// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	trans.setWiseGrid("1");				// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("fQuery", "f","/wisegrid.do");
}

//###################################
//�߽� �������� ��ȸ
//###################################
function queryList2() {
	var gridObj = document.all(SELECT_MEMOSENDINFO_ID);
	gridObj.setParam("snd_tm_format", "TIME");

	var trans = new Trans();							
	trans.setSvc(SELECT_MEMOSENDINFO_ID);			// ����ID
	trans.setDisSvc(SELECT_MEMOSENDINFO_ID);		// gridID
	trans.setWait(true);
	trans.setAsync(true);
	trans.setDefClick(false);
	trans.setPageRow(999);			// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	trans.setWiseGrid("1");				// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("fQuery2","f2","/wisegrid.do");
}

//###################################
//���� �������� ��ȸ
//###################################
function queryList3() {	
	var gridObj = document.all(SELECT_MEMOKEEPINFO_ID);
	gridObj.setParam("snd_tm_format", "TIME");

	var trans = new Trans();							
	trans.setSvc(SELECT_MEMOKEEPINFO_ID);			// ����ID
	trans.setDisSvc(SELECT_MEMOKEEPINFO_ID);		// gridID
	trans.setWait(true);
	trans.setAsync(true);
	trans.setDefClick(false);
	trans.setPageRow(999);			// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	trans.setWiseGrid("1");				// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("fQuery3","f3","/wisegrid.do");
}

//###################################
// ONCLICK - LEFT CLICK
//###################################
function showDetailO_obj(id, strColumnKey, nRow)  {
	if(id == SELECT_MEMORECEIVEINFO_ID) {
		btnControlA("C");
		showDetail(id, nRow, f);
		
		f.db_msg_id.value = DataSet.getParam(id, 1, nRow, "msg_id");
		f.user_id.value = opener.top.f.userid.value;
		var rcv_yn = f.rcv_useyn.value;
		var ntm=new Date();
		var yy = ntm.getYear();
		var mm = ntm.getMonth()+1;
		var dd = ntm.getDate();
		var hh = ntm.getHours();
		var mi = ntm.getMinutes();
		var ss = ntm.getSeconds();
		
		if(rcv_yn == "Y") return;
		
		if(yy < 10) yy = "0"+ yy;
		if(mm < 10) mm = "0"+ mm;
		if(dd < 10) dd = "0"+ dd;

		if(hh < 10) hh = "0"+ hh;
		if(mi < 10) mi = "0"+ mi;
		if(ss < 10) ss = "0"+ ss;

		f.insp_dt.value = getFormatData(yy + mm + dd,"DATE");
		f.insp_tm.value = getFormatData(hh +":"+ mi +":"+ ss,"TIME");
		
		var trans = new Trans();
		trans.setSvc(UPDATE_MEMORECEIVEINFO_ID);
		trans.setWait(false);
		trans.open("f","f","/common.do");
	}
	else if(id == SELECT_MEMOSENDINFO_ID) {
		btnControlB("C");
		
		if(g_index == 1 && opener.top.f.gradecd.value == "01") btnControlB("A");
		else btnControlB("R");

		var curpage  = DataSet.getCurPage(id);

		var trans = new Trans();
		trans.setSvc(SELECT_MEMOSENDINFO_ID2);
		trans.setUserParams("msg_id="+ DataSet.getParam(id, curpage, nRow, "msg_id"));
		trans.setCallBack("cb_sendList('"+ SELECT_MEMOSENDINFO_ID2 +"','"+ nRow +"')");
		trans.setWait(false);
		trans.open("f2","f2","/common.do");
	}
	else if(id == SELECT_MEMOKEEPINFO_ID) {
		btnControlC("C");
		showDetail(id, nRow, f3);
	}
} 

//###################################
//�߽ų�����ȸ 2
//###################################
function cb_sendList(svcid, nRow){
	showDetail(svcid, nRow, f2);
	
	var curpage  = DataSet.getCurPage(svcid);
	var dataCnt = DataSet.getTotalCount(svcid);
	var munm = "";

	for(var i=0; i<dataCnt; i++){
		munm += DataSet.getParam(svcid, curpage, i, "rcvr_nm");
		if(dataCnt > (i+1)) munm += ",";
	}

	f2.rcvr_nm.value = munm;
}

//###################################
//����,�߽� ��Ŭ��
//###################################
function tab02_onclick(index) {
	g_index = index;

	if(g_index == 1 && opener.top.f.gradecd.value == "01") btnControlB("A");
	else btnControlB("R");

	for (var i=0; i < memo.length; i++)
	{	
		memo[i].style.display = "none";
	}		
	memo[index].style.display = "";
	
	if(index == 0) {
		formFlag = "Q1";
	}
	else if(index == 1) {
		formFlag = "Q2"; 
	}
	else if(index == 2) {
		formFlag = "Q3";
	}
}

//###################################
//CALLBACK
//###################################
function callback(sServiceID) {
	switch (sServiceID) {
		case SELECT_MEMORECEIVEINFO_ID:
			f.reset();
			break;
		case SELECT_MEMOSENDINFO_ID:
			if(confirm("Ȯ���� ������ �Է��� ������ �ʱ�ȭ�˴ϴ�. ��� �����Ͻðڽ��ϱ�?")){
				f2.reset();
			}
			break;
		case SELECT_MEMOKEEPINFO_ID:
			f3.reset();
			break;
		case INSERT_MEMOINFO_ID+","+INSERT_MEMORECEIVEINFO_ID:
			if(g_index == 1 && opener.top.f.gradecd.value == "01") btnControlB("A");
			else btnControlB("R");

			if (DataSet.getParam(INSERT_MEMORECEIVEINFO_ID, 1, 0, "SUCCESS_COUNT") > 0){
				
				queryList2();
			}
			break;
		case UPDATE_MEMODELETE_ID:
		case INSERT_MEMOKEEPINFO_ID +","+ UPDATE_MEMODELETE_ID:
			if (DataSet.getParam(UPDATE_MEMODELETE_ID, 1, 0, "SUCCESS_COUNT") > 0){
				queryList();
			}
			break;
		case UPDATE_MEMODELETE_ID2:
		case INSERT_MEMOKEEPINFO_ID +","+ UPDATE_MEMODELETE_ID2:
			if (DataSet.getParam(UPDATE_MEMODELETE_ID2, 1, 0, "SUCCESS_COUNT") > 0){
				queryList2();
			}
			break;
		case UPDATE_MEMODELETE_ID3:
			if (DataSet.getParam(UPDATE_MEMODELETE_ID3, 1, 0, "SUCCESS_COUNT") > 0){
				queryList3();
			}
			break;
		case SELECT_USER_ID:
			f2.ip.value = DataSet.getParam(SELECT_USER_ID, 1, 0, "loi_ip");
			break;
		default : 
			break;
		}
}	

//###################################
//����Ű ��ȸ
//###################################
function checkEnterKey() {
	if(isEnterKey()) {
		if(formFlag == "Q1") queryList();
		else if(formFlag == "Q2") queryList2();
		else if(formFlag == "Q3") queryList3();	
	}
}

//###################################
//����� ������ �˾�
//###################################
function openUserOrg() {
	if(opener.top.f.gradecd.value == "01") return;

	setOpener(f2);
	openPopup("/jsp/system/sysUserOrg.jsp?memo=Y", "UserOrg", 800, 582);
}

//###################################
//����� ���������� ���õ� ����� ���� �ޱ�
//###################################
function setData(fileName1, fileName2, fileName3, fileName4){
	if(f2.rcvr_nm.value != "")
	{
		f2.rcvr_id.value = f2.rcvr_id.value + "," + fileName1;
		f2.rcvr_nm.value = f2.rcvr_nm.value + "," + fileName4;
		f2.ip.value = f2.ip.value + "," + fileName3;	
	}
	else { 
		f2.rcvr_id.value = fileName1;
		f2.rcvr_nm.value = fileName4;
		f2.ip.value = fileName3;
	}
}

//###################################
//�������� Ŭ��
//###################################
function memoWrite() {
	f2.reset();
	
	var ntm=new Date();
	var yy = ntm.getYear();
	var mm = ntm.getMonth()+1;
	var dd = ntm.getDate();

	var hh = ntm.getHours();
	var mi = ntm.getMinutes();
	var ss = ntm.getSeconds();
	
	if(yy < 10) yy = "0"+ yy;
	if(mm < 10) mm = "0"+ mm;
	if(dd < 10) dd = "0"+ dd;

	if(hh < 10) hh = "0"+ hh;
	if(mi < 10) mi = "0"+ mi;
	if(ss < 10) ss = "0"+ ss;

	f2.msg_sbjt.readOnly = false;
	f2.msg_txt.readOnly = false;
	f2.snd_dt.value = getFormatData(yy + mm + dd,"DATE");
	f2.snd_tm.value = getFormatData(hh +":"+ mi +":"+ ss,"TIME");
	
	btnControlMain(f2.btnWrite, true);
	btnControlMain(f2.btnSend, false);
}

//###################################
//�����߽� Ŭ��
//###################################
function memoSend() {
	//send();
	save();
}

//###################################
//�޽�������
//###################################
function send() {
//	var arrIP = f2.ip.value.split(",");
//	for( i=0 ; i < f2.ip.value.split(",").length ; i++ ) {	
//		if(arrIP[i] != "") {
//			opener.topFrame.ucutil.SendMsg(f2.ip.value, iPort, f2.msg_txt.value);
//		}
//	}
	
	if(f2.msg_txt.value=="") return;
				
	opener.top.EchoApplet.sendFixedMsg(f2.rcvr_id.value,f2.msg_txt.value);
	//f2.message2.value="";
}

//###################################
//�߽ų��� ����
//###################################
function save() {
	if(getValidation(f2,true)== false) return false;
	else{
		btnControlMain(f2.btnSend, true);

		if(confirm("������ �߼��Ͻðڽ��ϱ�?")){
			send();
			var trans = new Trans();
			trans.setSvc(INSERT_MEMOINFO_ID+","+INSERT_MEMORECEIVEINFO_ID);
			trans.open("f2","f2","/common.do");
		}
	}
}

//###################################
//��������
//###################################
function keepMsg(ktc, m){
	var s_msg_id = "";
	var s_kep_tp_cd = "";
	var s_snd_dt = "";
	var s_snd_tm = "";
	var obj;
	var fnm;
	var msg;
	var msg2;
	var svcid;
	
	if(ktc == "01") {
		fnm = "f";
		obj = document.UCSYS095S;
	}
	else if(ktc == "02") {
		fnm = "f2";
		obj = document.UCSYS096S;
	}
	else if(ktc == "03") {
		fnm = "f3";
		obj = document.UCSYS097S;
	}
	
	if(obj.GetRowCount() == 0) {
		alert("���õ� ������ �����ϴ�.");
		return;
	}

    if (obj.GetRowCount()) {
        for (var i=0; i < obj.GetRowCount(); i++) {
            if (obj.GetCellValue("seq", i) == 1) {
                s_msg_id += (s_msg_id!=""?",":"") + obj.GetCellValue("msg_id", i);
                s_snd_dt += (s_snd_dt!=""?",":"") + obj.GetCellValue("snd_dt", i);
                s_snd_tm += (s_snd_tm!=""?",":"") + obj.GetCellValue("snd_tm", i);
				if(ktc == "03") s_kep_tp_cd += (s_kep_tp_cd!=""?",":"") + obj.GetCellValue("kep_tp_cd", i);
            }    
        }
    }
    else {
        if (obj.GetCellValue("seq") == 1) {
            s_msg_id += obj.GetCellValue("msg_id");
            s_snd_dt += obj.GetCellValue("snd_dt");
            s_snd_tm += obj.GetCellValue("snd_dt");
            if(ktc == "03") s_kep_tp_cd += obj.GetCellValue("kep_tp_cd");
        }    
    }
	
	if(m == "D") {
		msg = "���õ� ������ �����ϴ�.";
		msg2 = "������ ������ �����Ͻðڽ��ϱ�?";
		if(ktc == "01") svcid = UPDATE_MEMODELETE_ID;
		else if(ktc == "02") svcid = UPDATE_MEMODELETE_ID2;
		else if(ktc == "03") {
			ktc = s_kep_tp_cd;
			svcid = UPDATE_MEMODELETE_ID3;
		}
	}
	else if(m == "K") {
		msg = "���õ� ������ �����ϴ�.";
		msg2 = "������ ������ �����Կ� ���� �Ͻðڽ��ϱ�?";
		if(ktc == "01") svcid = INSERT_MEMOKEEPINFO_ID +","+ UPDATE_MEMODELETE_ID;
		else if(ktc == "02") svcid = INSERT_MEMOKEEPINFO_ID +","+ UPDATE_MEMODELETE_ID2;
	}

    if (s_msg_id == "")   {
        alert(msg)
    }
    else {   
    	if(confirm(msg2)){
    		var trans = new Trans();
    		trans.setSvc(svcid);
			if(ktc == "01") {
				trans.setUserParams("kep_tp_cd="+ ktc +"&msg_id="+ s_msg_id+"&psnd_dt="+s_snd_dt+"&psnd_tm="+s_snd_tm);
			} else {
				trans.setUserParams("kep_tp_cd="+ ktc +"&msg_id="+ s_msg_id+"&psnd_dt="+s_snd_dt+"&psnd_tm="+s_snd_tm);
			}
    		trans.open(fnm,fnm,"/common.do");	
    	}
    }
}

//###################################
//���徲�� Ŭ��
//###################################
function getMemoUserId(argFlag) {
	if(f.sndr_id.value == ""){
		alert("���õ� ������ �����ϴ�.");
		return;
	}
	
	tabclick('tbltab02',1,'');
	tab02_onclick(1);

	if(argFlag == "Q1"){
		f2.btnSend.disabled = false;

		var ntm=new Date();
		var yy = ntm.getYear();
		var mm = ntm.getMonth()+1;
		var dd = ntm.getDate();

		var hh = ntm.getHours();
		var mi = ntm.getMinutes();
		var ss = ntm.getSeconds();
		
		if(yy < 10) yy = "0"+ yy;
		if(mm < 10) mm = "0"+ mm;
		if(dd < 10) dd = "0"+ dd;

		if(hh < 10) hh = "0"+ hh;
		if(mi < 10) mi = "0"+ mi;
		if(ss < 10) ss = "0"+ ss;

		f2.msg_sbjt.readOnly = false;
		f2.msg_txt.readOnly = false;
		f2.snd_dt.value = getFormatData(yy + mm + dd,"DATE");
		f2.snd_tm.value = getFormatData(hh +":"+ mi +":"+ ss,"TIME");

		f2.rcvr_id.value = f.sndr_id.value;
		f2.rcvr_nm.value = f.sndr_nm.value;
		f2.msg_sbjt.value = "RE_"+f.msg_sbjt.value;
		f2.msg_txt.focus();
	}

	getClientIP(f.sndr_id.value);	
}

//###################################
//ip ������
//###################################
function getClientIP(uid) {	
	var trans = new Trans();
	trans.setPageRow(9999);
	trans.setUserParams("user_id="+ uid);
	trans.setSvc(SELECT_USER_ID);
	trans.open("","","/common.do");
}

//###################################
//��ư ��Ʈ�� �ϱ�
//###################################
function btnControlMain(obj, flag) {
	obj.disabled = flag;
}

//###################################
//��ư ��Ʈ�� �ϱ�(����)
//###################################
function btnControlA(b){
	switch (b){
		case "S":
			btnControlMain(f.btnKeep, true);
			btnControlMain(f.btnDel, true);
			btnControlMain(f.btnTab, true);
			break;
		case "C":
			btnControlMain(f.btnKeep, false);
			btnControlMain(f.btnDel, false);
			btnControlMain(f.btnTab, false);
			break;
		default:
			break;
	}
}

//###################################
//��ư ��Ʈ�� �ϱ�(�߽�)
//###################################
function btnControlB(b){
	switch (b){
		case "S":
			btnControlMain(f2.btnKeep, true);
			btnControlMain(f2.btnDel, true);
			btnControlMain(f2.btnWrite, true);
			btnControlMain(f2.btnSend, true);
			break;
		case "C":
			btnControlMain(f2.btnKeep, false);
			btnControlMain(f2.btnDel, false);
			btnControlMain(f2.btnWrite, true);
			btnControlMain(f2.btnSend, true);
			break;
		case "A":
			btnControlMain(f2.btnWrite, true);
			btnControlMain(f2.btnSend, true);
			break;
		case "R":
			btnControlMain(f2.btnWrite, false);
			btnControlMain(f2.btnSend, true);
			break;
		default:
			break;
	}
}

//###################################
//��ư ��Ʈ�� �ϱ�(������)
//###################################
function btnControlC(b){
	switch (b){
		case "S":
			btnControlMain(f3.btnDel, true);
			break;
		case "C":
			btnControlMain(f3.btnDel, false);
			break;
		default:
			break;
	}
}





















/*








var SELECT_MEMORECEIVEDETAILINFO_ID = "UCSYS103S";		//���� ID�� SELECT
var SELECT_MEMO_ID = "UCSYS104S"; 	   			//�ǽð� ����




var grid1 = new comGrid(); //���� ��������
var grid2 = new comGrid(); //�߽� ��������
var grid3 = new comGrid(); //������ ��������












function userQuery(argForm)
{
	var tran = new Trans();
	tran.setPageRow(10);
	tran.setSvc(SELECT_MEMORECEIVEDETAILINFO_ID);
	tran.open(argForm,argForm,"/common.do");
}


//�����Կ��� �����ð� ��ȸ
function query4()
{		
	fQuery.infomemoid.value = f.memoid.value;
	var tran = new Trans();
	tran.setPageRow(10);
	tran.setSvc(SELECT_MEMOKEEPINFO_ID);
	tran.open("fQuery","f4","/common.do");
}

//�������� ��������
function query5()
{	
	var tran = new Trans();
	tran.setPageRow(10);
	tran.setSvc(SELECT_MEMO_ID);
	tran.open("","","/common.do");
}



//������ ����
function userDel()
{
	f2.receivernm.value = f2.receivernm.value.substr(0, f2.receivernm.value.lastIndexOf(","))
	f2.receiverid.value = f2.receiverid.value.substr(0, f2.receiverid.value.lastIndexOf(","))
}



//���� ��Ͽ��� ����
function receiveTargetDel()
{
	//üũ ����
	var multiMemo = "";
	var multiUser = "";
	var chkObj = f.UCSYS095S_memoid;
	if (chkObj){
		//üũ�ڽ��� ������  ������
		if (chkObj.length) {
			for (var i=0; i<chkObj.length; i++) {
				if (chkObj[i].checked) {
					if(chkObj[i].value != "")
					{
						multiMemo += chkObj[i].value + ",";	
						multiUser += fQuery.userid.value + ",";	
						//multiUser += DataSet.getParam("UCSYS095S", 1, i, "senderid") + ",";	
					}								
				}
			}
		}
		else if(chkObj.checked)
		{
			multiMemo += chkObj.value + ",";	
			multiUser += fQuery.userid.value + ",";	
			//multiUser += DataSet.getParam("UCSYS095S", 1, 0, "senderid") + ",";	
		}
		fQuery.multiMemo.value = multiMemo.substr(0,multiMemo.length-1);	
		fQuery.multiUser.value = multiUser.substr(0,multiUser.length-1);

	}
	if(multiMemo == "")
	{
		alert("���õ� �����Ͱ� �����ϴ�.");
	}
	else if (confirm("�����Ͻðڽ��ϱ�?"))
	{
		var tran = new Trans();
		tran.setSvc(UPDATE_MEMOKEEPINFO_ID);
		tran.open("fQuery","fQuery","/common.do");		
	}
}

//�߽� ��Ͽ��� ����
function sendTargetDel()
{
	//üũ ����
	var multiMemo = "";
	var multiUser = "";
	var multiReceiver = "";
	var chkObj = f2.UCSYS096S_memoid;
	if (chkObj){
		//üũ�ڽ��� ������  ������
		if (chkObj.length) {
			for (var i=0; i<chkObj.length; i++) {
				if (chkObj[i].checked) {
					if(chkObj[i].value != "")
					{

						multiMemo += chkObj[i].value + ",";	
						multiUser += fQuery.userid.value + ",";	
						multiReceiver += DataSet.getParam("UCSYS096S", 1, i, "receiverid") + ",";	
					}								
				}
			}
		}
		else if(chkObj.checked)
		{
			multiMemo += chkObj.value + ",";
			multiUser += fQuery.userid.value + ",";		
			multiReceiver += DataSet.getParam("UCSYS096S", 1, i, "receiverid") + ",";	
		}
		fQuery2.multiMemo.value = multiMemo.substr(0,multiMemo.length-1);	
		fQuery2.multiUser.value = multiUser.substr(0,multiUser.length-1);
		fQuery2.receiverid.value = multiReceiver.substr(0,multiReceiver.length-1);

	}
	if(multiMemo == "")
	{
		alert("���õ� �����Ͱ� �����ϴ�.");
	}
	else if (confirm("�����Ͻðڽ��ϱ�?"))
	{
		var tran = new Trans();
		tran.setSvc(UPDATE_MEMOKEEPINFO_ID);
		tran.open("fQuery2","fQuery2","/common.do");		
	}	
}







//���Ϲޱ�
function fileDown()
{
	var path;
	//path = f.file_Path.value + "/" + f.filenm.value;
	if(formFlag == "Q1")
	{
		ifmMenu.location.href= "/jsp/common/downFile.jsp?filename="+ f.filenm.value+"&delete=NO&flag=mypath&filepath=" + MEMO_FILE_PATH.value;
	}
	if(formFlag == "Q3")
	{
		ifmMenu.location.href= "/jsp/common/downFile.jsp?filename="+ f3.filenm.value+"&delete=NO";
	}
}


//�������� ó�� ������
function checkUseyn()
{
	if(f.receive_useyn.value == "N")
	{
		f.userid.value = fQuery.receiverid.value;
		useYNFlag = "Y";
		var tran = new Trans();
		tran.setSvc(UPDATE_MEMORECEIVEINFO_ID);
		tran.open("f","fQuery","/common.do");	
	}
}



//���Ͼ��ε� ���ϸ� �ޱ�
function setFileName(filenm) 
{
    f2.filenm.value = filenm;
	save();
}






function showDetailC_obj(obj)
{
	if (obj.cells[0].id == SELECT_MEMORECEIVEINFO_ID+"_IDX"){//�������� ���  �׸���Ŭ����
		grid1.rowIndex = getRowIndex(obj);
		grid1.rowObj = obj;
		if(!comShowDetail(SELECT_MEMORECEIVEINFO_ID,obj,f)){
			setMode(f,"I");
		}
		else{
			setMode(f,"I");
			showDetail(SELECT_MEMORECEIVEINFO_ID, grid1.rowIndex,f);					
			checkUseyn();
			//÷�������� ����  ���ϴٿ� ��ư ��밡��
			if(f.filenm.value != "")
			{
				f.btnFile.disabled = false;
			}	
			f.btnTab.disabled = false;			
		}		
	}
	else if(obj.cells[0].id == SELECT_MEMOSENDINFO_ID+"_IDX"){//�߽����� ���  �׸���Ŭ����
		grid2.rowIndex = getRowIndex(obj);
		grid2.rowObj = obj;
		if(!comShowDetail(SELECT_MEMOSENDINFO_ID,obj,f2)){
			setMode(f2,"I");
			iUpload.location.reload();	
			//userQuery("f2");
		}
		else{
			setMode(f2,"I");
			showDetail(SELECT_MEMOSENDINFO_ID, grid2.rowIndex,f2);	
			iUpload.location.reload();	
			//userQuery("f2");			
		}		
	}
	else if(obj.cells[0].id == SELECT_MEMOKEEPINFO_ID+"_IDX"){//������ ���� ���  �׸���Ŭ����
		grid3.rowIndex = getRowIndex(obj);
		grid3.rowObj = obj;
		if(!comShowDetail(SELECT_MEMOKEEPINFO_ID,obj,f3)){
			setMode(f3,"I");	
			//userQuery();
		}
		else{
			setMode(f3,"I");
			showDetail(SELECT_MEMOKEEPINFO_ID, grid3.rowIndex,f3);	
			if(f3.keepboxgb.value == "01")
			{
				if(f3.filenm.value != ""){
					f3.btnFile.disabled = false;
				}
				else if(f3.sendtype.value == "01")
				{
					f3.btnTab.disabled = false;
				}
			}
			else if(f3.keepboxgb.value == "02")
			{
				userQuery("f3");	
			}			
		}
		
	}
}

function showDetailB_obj(obj) 
{
	if (obj.cells[0].id == SELECT_MEMORECEIVEINFO_ID+"_IDX"){//�������� ���  �׸���Ŭ����					
		tabclick('tbltab02',1,'');
		tab02_onclick(1);
		getMemoUserId('Q1');			
	}
	else if(obj.cells[0].id == SELECT_MEMOSENDINFO_ID+"_IDX"){//�߽����� ���  �׸���Ŭ����
			setMode(f2,"A");
			iUpload.location.reload();	
			//userQuery("f2");	
			getMemoUserId('Q2');			
	}
	else if(obj.cells[0].id == SELECT_MEMOKEEPINFO_ID+"_IDX"){//������ ���� ���  �׸���Ŭ����
		tabclick('tbltab02',1,'');
		tab02_onclick(1);
		getMemoUserId('Q3');			
	}
}









*/