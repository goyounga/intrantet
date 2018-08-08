var SELECT_ID="UCSMS001S";

function init() 
{
	
}

/**
* SMS 리스트 조회
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
 * 그리드 로우 추가
 * gridID : 그리드 ID
 */
function addRow() 
{
	smsfrm.szusername.value  = "test";
	smsfrm.szcallphone.value = "011";
	
	if(getGridObj(gridID).getRowCount()==5){
		alert("5개 까지 추가 가능합니다.");
		return;
	}
	
	//getGridObj(gridID).AddRow();
}

/**
 * 그리드 로우 삭제
 * gridID : 그리드 ID
 */
function delRow(gridID) {
	var grobj=getGridObj(gridID);
	var actrow=grobj.GetActiveRowIndex();
	
	if(actrow < 0){
		alert("삭제 할 건을 선택하세요.");
		return;
	}
	
	if(!confirm((actrow+1)+"번째 행을 삭제 하시겠습니까?")) return;
	
	grobj.DeleteRow(actrow);
}

/**
 * SMS 리스트 클릭시
 * id : WiseGrid 객체 ID
 * strColumnKey : 컬럼
 * nRow : Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow) 
{
	if(id==SELECT_ID)
		showDetailByWise(SELECT_ID, nRow, f);
}

//엔터키 입력시
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
		alert("메시지 내용은 " + max_len +" Byte 이상 전송 하실 수 없습니다.");
		query = GetTextByteEx(query, max_len);
		len = StrByteLength(query);
		obj.value = query;
	}

	smsfrm.BYTE.value = len;
}

// 리턴 문자가 2Byte(13+10) 계산됨...
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

// 해당 바이트 만큼만 가져오기
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

//sms보내기
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
			alert((i+1)+"번째 행에 휴대번호를 입력하세요.");
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
		alert("고객명과 휴대번호를 입력하세요.");
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

//재전송
function reSend() {
	var obj=document.UCSYS004I;
	var szcallphone="";
	var szcallphone1="";
	var szcallphone2="";
	var szcallphone3="";
	var szusername="";
	var szcallmessage="";
	
	if(f.szusername.value=="" || f.szcallphone.value=="") {
		alert("고객명과 휴대번호를 입력하세요.");
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
		alert("정상처리 되었습니다.");
		clearForm();
		queryList();
	}
}

//초기화
function clearForm() {
	f.szusername.value="";
	f.szcallphone.value="";
	f.szusercode.value="";
	f.szdate.value="";
	f.szcallmessage.value="";
	
	smsfrm.BODY.value="안녕하십니까.현대MOBIS입니다.";
	smsfrm.BYTE.value="0";
	
	var gridObj=document.all(INSERT_ID);
	gridObj.RemoveAllData();
}

/**
* 사용자 조직도 팝업
*/
function openUserOrg(gb)
{
	popupGubun = gb;

	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", "width=800,height=580");
}

/** 
* 사용자 정보 셋팅
*/ 
function setOrgUserInfo(user_id, user_name)
{
		fQuery.rg_id.value = user_id;
		fQuery.qrg_nm.value = user_name;
}