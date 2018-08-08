var SERVICE_ID 	= "UCSMP001S";

function setInit()
{
	LoadOcx();
	searchUser();
}

// 조회
function searchUser()
{
	var gridObj = document.all(SERVICE_ID);
	gridObj.setParam("hdp_no_format", "TEL");
	
	var tran = new Trans();							
	tran.setSvc(SERVICE_ID);
	tran.setPageRow("9999");			
	tran.setWiseGrid("1");			
	tran.setForwardId("wgdsl","");
	tran.open("f", "f", "/wisegrid.do");	
}

function searchChrg()
{
	var gridObj = document.all("UCSMP002S");
	gridObj.setParam("tel_no_format", "TEL");
	gridObj.setParam("hdp_no_format", "TEL");
	
	var tran = new Trans();							
	tran.setSvc("UCSMP002S");
	tran.setPageRow("9999");			
	tran.setWiseGrid("1");			
	tran.setForwardId("wgdsl","");
	tran.open("f", "f", "/wisegrid.do");
}

function callback(dsnm)
{
//	alert(dsnm);
}

function showDetailO_obj(id, strColumnKey, nRow)
{
	var gridObj = document.all(id);
	
	if (id == "UCSMP002S")
	{
		if (strColumnKey == "hdp_no" || strColumnKey == "tel_no")
		{
			f.telno.value = gridObj.GetCellValue(strColumnKey, nRow);
		}
	}
	else
	{
		f.telno.value = gridObj.GetCellValue("hdp_no", nRow);
	}
}

function tab_onclick(index)
{
	for (var i=0; i < vtabview.length; i++)
	{	
		vtabview[i].style.display = "none";
	}
		
	vtabview[index].style.display = "";
}

//Row 추가
function lineInsert()
{
	var GridObj = document.all("UCSMP002S");
	GridObj.AddRow();
}

//Row 삭제상태로 세팅
function removeCode()
{
	var GridObj = document.all("UCSMP002S");
	GridObj.DeleteRow(GridObj.GetActiveRowIndex());
}

//CRUD 취소 : grid를 다시 초기화함
function cancel()
{
	var GridObj = document.all("UCSMP002S");
	GridObj.CancelCRUD();
}

function saveChrg()
{
	var gridObj = document.all("UCSMP002S");
	gridObj.setParam("tel_no_format", "TEL");
	gridObj.setParam("hdp_no_format", "TEL");
	
	var tran = new Trans();							
	tran.setSvc("UCSMP002S");
	tran.setPageRow("9999");			
	tran.setWiseGrid("1");			
	tran.setForwardId("wgdsl","");
	tran.setMode("save");		// 반드시 추가
	tran.setSaveAutoSelect(true);
	tran.open("f", "f","/wisegrid.do");	
}

function call()
{
	MakeCall(f.telno.value);
}

/****************** zphone 시작 ******************************/

/**
* @function name : LoadOcx()
* @설       	  명     : LoadOcx function (전화장비 초기화 함수)
* @param 		 : null
* @return 		 : null
* @exception 설명:
*/
function  LoadOcx() {
	iPhone.MakeDeviceObject("2");

	devConnect();
}

/**
* @function name : devConnect()
* @설       	  명     : devConnect function (전화장비 장치연결 함수)
* @param 		 : null
* @return 		 : null
* @exception 설명:
*/
function devConnect(){
	var init = iPhone.DeviceConnect();

	if (!init) {
		//alert("전화장비가 초기화 되지 않아서 전화기능을 사용할 수 없습니다.\r\nPC와 전화기 간의 연결상태를 체크하시거나 사용자정보의 전화기 구분이\r\n설정되어 있는지 확인하시기 바랍니다.\r\r사용자정보 전화기구분과 실제 전화 장비가 틀릴 경우 실제 전화장비의\r\n정보를 사용자정보에 입력하신 후 다시 로그인 하십시오.");
		return false;
	}
}

/**
* @function name : hookOnTel()
* @설       	  명     : hookOnTel function (전화장비 수화기들어 함수)
* @param 		 : null
* @return 		 : null
* @exception 설명:
*/
function hookOnTel() {
	//top.ifmCallInfo.fCall.hookOnTelGubun.value = "button";
	iPhone.MakeHookOn_Tel();
}

/**
* @function name : hookOffTel()
* @설       	  명     : hookOffTel function (전화장비 수화기내려(끊기) 함수)
* @param 		 : null
* @return 		 : null
* @exception 설명:
*/
function hookOffTel() {
	//top.ifmCallInfo.fCall.hookOnTelGubun.value = "";
	iPhone.MakeHookOff_PC();
}

/**
* @function name : MakeCall()
* @설       	  명     : MakeCall function (전화장비 전화걸기 함수)
* @param 		 : gubun => 전화기구분(자택,휴대폰,직장,기타,예약번호)	telNo => 전화번호
* @return 		 : null
* @exception 설명:
*/
function MakeCall(telNum) {
	if (f.phoneStatus.value == "3" || f.phoneStatus.value == "4")
	{
		hookOnTel();
	}
	
	var bUsePBX = true;
	var pPrefix = "9"; //외부회선 선행문자
	var pTelNumber = removeMask(telNum);

	bResult = iPhone.MakeCall(bUsePBX, pPrefix, pTelNumber);

	if (!bResult)
	{
		alert('전화걸기에 실패하였습니다. 재부팅 후 사용하세요.\n계속해서 문제가 발생되면 정보팀에 연락주시기 바랍니다.');
		return;
	}
//	getNowTime();
//	RecordControl('RECORD_START');
}
/****************** zphone 끝******************************/