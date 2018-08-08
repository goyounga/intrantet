var SELECT_ID="UCSMS001S";

function init() 
{
	
}

/**
* SMS ����Ʈ ��ȸ
*/
function queryList() 
{
	var tran = new Trans();
	tran.setSvc(SELECT_ID);
	tran.setPageRow("999");
	tran.setDefClick(true);
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl", "", "");
	tran.open("fQuery", "", "/wisegrid.do");
}

/**
 * �׸��� �ο� �߰�
 * gridID : �׸��� ID
 */
function addRow() 
{
	smsfrm.szusername.value  = "test";
	smsfrm.szcallphone.value = "011";
	
	if(getGridObj(gridID).getRowCount()==5){
		alert("5�� ���� �߰� �����մϴ�.");
		return;
	}
	
	//getGridObj(gridID).AddRow();
}

/**
 * �׸��� �ο� ����
 * gridID : �׸��� ID
 */
function delRow(gridID) {
	var grobj=getGridObj(gridID);
	var actrow=grobj.GetActiveRowIndex();
	
	if(actrow < 0){
		alert("���� �� ���� �����ϼ���.");
		return;
	}
	
	if(!confirm((actrow+1)+"��° ���� ���� �Ͻðڽ��ϱ�?")) return;
	
	grobj.DeleteRow(actrow);
}

/**
 * SMS ����Ʈ Ŭ����
 * id : WiseGrid ��ü ID
 * strColumnKey : �÷�
 * nRow : Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow) 
{
	if(id==SELECT_ID)
		showDetailByWise(SELECT_ID, nRow, f);
}

//����Ű �Է½�
function checkEnterKey(){
	if(isEnterKey()){
		queryList();
	}
}

//byte check
function cal_pre_keyup(obj, max_len) 
{
	var query = obj.value;
	var len = StrByteLength(query);

	if(len > max_len) {
		alert("�޽��� ������ " + max_len +" Byte �̻� ���� �Ͻ� �� �����ϴ�.");
		query = GetTextByteEx(query, max_len);
		len = StrByteLength(query);
		obj.value = query;
	}

	smsfrm.BYTE.value = len;
}

// ���� ���ڰ� 2Byte(13+10) ����...
function StrByteLength(strVal) 
{
	var strLen = 0;

	for(var i=0; i<strVal.length; i++) {
		var chrCode = strVal.charCodeAt(i);
		strLen++;

		if(chrCode > 255)
			strLen++;
	}
	return strLen;
}

// �ش� ����Ʈ ��ŭ�� ��������
function GetTextByteEx(strVal, limitByte) 
{
	var strLen = 0;

	var retVal = "";

	for(var i=0; i<strVal.length; i++) {
		var chrCode = strVal.charCodeAt(i);
		strLen++;
		
		if(chrCode > 255)
			strLen++;

		if(strLen > limitByte)
			break;
			
		retVal += strVal.charAt(i);
	}
	return retVal;
}

//sms������
function sendSms() 
{
	var obj=document.UCSYS004I;
	var szcallphone="";
	var szcallphone1="";
	var szcallphone2="";
	var szcallphone3="";
	var szusername="";
	var szcallmessage="";
	
	for(var i=0; i<obj.GetRowCount(); i++) {
		var phonenum=obj.GetCellValue("szcallphone", i);
		phonenum=getFormatData(numberMask(phonenum),"TEL",0);
		
		if(phonenum=="") {
			alert((i+1)+"��° �࿡ �޴��ȣ�� �Է��ϼ���.");
			return;
		}
		
		var arrTel=phonenum.split("-");
		if(szcallphone1)
			szcallphone1+=""+arrTel[0];
		else
			szcallphone1+=arrTel[0];
		
		if(szcallphone2)
			szcallphone2+=""+arrTel[1];
		else
			szcallphone2+=arrTel[1];
		
		if(szcallphone3)
			szcallphone3+=""+arrTel[2];
		else
			szcallphone3+=arrTel[2];
			
		if(szcallphone)
			szcallphone+=""+phonenum;
		else
			szcallphone+=phonenum;
		
		if(szusername)
			szusername+=""+obj.GetCellValue("szusername", i);
		else
			szusername+=obj.GetCellValue("szusername", i);
	}
	
	if(szcallphone=="" || szusername=="") {
		alert("����� �޴��ȣ�� �Է��ϼ���.");
		return;
	}
	
	var params=new StringBuffer();
	params.append("szcallphone=");
	params.append(szcallphone);
	
	params.append("&szcallphone1=");
	params.append(szcallphone1);
	
	params.append("&szcallphone2=");
	params.append(szcallphone2);
	
	params.append("&szcallphone3=");
	params.append(szcallphone3);
	
	params.append("&szusercode=");
	//params.append(opener.f.user_id.value);
	params.append(fQuery.user_id.value);
	
	params.append("&szusername=");
	params.append(szusername);
	
	params.append("&szcallmessage=");
	params.append(smsfrm.BODY.value);
	
	var trans=new Trans();
	trans.setSvc(INSERT_ID);
	trans.setUserParams(params.toString());
	trans.open("", "","/common.do");
}

//������
function reSend() {
	var obj=document.UCSYS004I;
	var szcallphone="";
	var szcallphone1="";
	var szcallphone2="";
	var szcallphone3="";
	var szusername="";
	var szcallmessage="";
	
	if(f.szusername.value=="" || f.szcallphone.value=="") {
		alert("����� �޴��ȣ�� �Է��ϼ���.");
		if(f.szusername.value=="") f.szusername.focus();
		else f.szcallphone.focus();
		return;
	}
	
	var phonenum=f.szcallphone.value;
	phonenum=getFormatData(numberMask(phonenum),"TEL",0);
	
	var arrTel=phonenum.split("-");
	szcallphone1+=arrTel[0];
	szcallphone2+=arrTel[1];
	szcallphone3+=arrTel[2];
	szcallphone+=phonenum;
	szusername+=f.szusername.value;
	
	var params=new StringBuffer();
	params.append("szcallphone=");
	params.append(szcallphone);
	
	params.append("&szcallphone1=");
	params.append(szcallphone1);
	
	params.append("&szcallphone2=");
	params.append(szcallphone2);
	
	params.append("&szcallphone3=");
	params.append(szcallphone3);
	
	params.append("&szusercode=");
	//params.append(opener.f.user_id.value);
	params.append(fQuery.user_id.value);
	
	params.append("&szusername=");
	params.append(szusername);
	
	params.append("&szcallmessage=");
	params.append(f.szcallmessage.value);

	var trans=new Trans();
	trans.setSvc(INSERT_ID);
	trans.setUserParams(params.toString());
	trans.open("", "","/common.do");
}

//callback
function callback(svcid) {
	if(svcid == INSERT_ID) {
		alert("����ó�� �Ǿ����ϴ�.");
		clearForm();
		queryList();
	}
}

//�ʱ�ȭ
function clearForm() {
	f.szusername.value="";
	f.szcallphone.value="";
	f.szusercode.value="";
	f.szdate.value="";
	f.szcallmessage.value="";
	
	smsfrm.BODY.value="�ȳ��Ͻʴϱ�.����MOBIS�Դϴ�.";
	smsfrm.BYTE.value="0";
	
	var gridObj=document.all(INSERT_ID);
	gridObj.RemoveAllData();
}

/**
* ����� ������ �˾�
*/
function openUserOrg(gb)
{
	popupGubun = gb;

	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", "width=800,height=580");
}

/** 
* ����� ���� ����
*/ 
function setOrgUserInfo(user_id, user_name)
{
		fQuery.rg_id.value = user_id;
		fQuery.qrg_nm.value = user_name;
}