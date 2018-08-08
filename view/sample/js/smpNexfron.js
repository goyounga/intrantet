var SERVICE_ID 	= "UCSMP001S";

function setInit()
{
	LoadOcx();
	searchUser();
}

// ��ȸ
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

//Row �߰�
function lineInsert()
{
	var GridObj = document.all("UCSMP002S");
	GridObj.AddRow();
}

//Row �������·� ����
function removeCode()
{
	var GridObj = document.all("UCSMP002S");
	GridObj.DeleteRow(GridObj.GetActiveRowIndex());
}

//CRUD ��� : grid�� �ٽ� �ʱ�ȭ��
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
	tran.setMode("save");		// �ݵ�� �߰�
	tran.setSaveAutoSelect(true);
	tran.open("f", "f","/wisegrid.do");	
}

function call()
{
	MakeCall(f.telno.value);
}

/****************** zphone ���� ******************************/

/**
* @function name : LoadOcx()
* @��       	  ��     : LoadOcx function (��ȭ��� �ʱ�ȭ �Լ�)
* @param 		 : null
* @return 		 : null
* @exception ����:
*/
function  LoadOcx() {
	iPhone.MakeDeviceObject("2");

	devConnect();
}

/**
* @function name : devConnect()
* @��       	  ��     : devConnect function (��ȭ��� ��ġ���� �Լ�)
* @param 		 : null
* @return 		 : null
* @exception ����:
*/
function devConnect(){
	var init = iPhone.DeviceConnect();

	if (!init) {
		//alert("��ȭ��� �ʱ�ȭ ���� �ʾƼ� ��ȭ����� ����� �� �����ϴ�.\r\nPC�� ��ȭ�� ���� ������¸� üũ�Ͻðų� ����������� ��ȭ�� ������\r\n�����Ǿ� �ִ��� Ȯ���Ͻñ� �ٶ��ϴ�.\r\r��������� ��ȭ�ⱸ�а� ���� ��ȭ ��� Ʋ�� ��� ���� ��ȭ�����\r\n������ ����������� �Է��Ͻ� �� �ٽ� �α��� �Ͻʽÿ�.");
		return false;
	}
}

/**
* @function name : hookOnTel()
* @��       	  ��     : hookOnTel function (��ȭ��� ��ȭ���� �Լ�)
* @param 		 : null
* @return 		 : null
* @exception ����:
*/
function hookOnTel() {
	//top.ifmCallInfo.fCall.hookOnTelGubun.value = "button";
	iPhone.MakeHookOn_Tel();
}

/**
* @function name : hookOffTel()
* @��       	  ��     : hookOffTel function (��ȭ��� ��ȭ�⳻��(����) �Լ�)
* @param 		 : null
* @return 		 : null
* @exception ����:
*/
function hookOffTel() {
	//top.ifmCallInfo.fCall.hookOnTelGubun.value = "";
	iPhone.MakeHookOff_PC();
}

/**
* @function name : MakeCall()
* @��       	  ��     : MakeCall function (��ȭ��� ��ȭ�ɱ� �Լ�)
* @param 		 : gubun => ��ȭ�ⱸ��(����,�޴���,����,��Ÿ,�����ȣ)	telNo => ��ȭ��ȣ
* @return 		 : null
* @exception ����:
*/
function MakeCall(telNum) {
	if (f.phoneStatus.value == "3" || f.phoneStatus.value == "4")
	{
		hookOnTel();
	}
	
	var bUsePBX = true;
	var pPrefix = "9"; //�ܺ�ȸ�� ���๮��
	var pTelNumber = removeMask(telNum);

	bResult = iPhone.MakeCall(bUsePBX, pPrefix, pTelNumber);

	if (!bResult)
	{
		alert('��ȭ�ɱ⿡ �����Ͽ����ϴ�. ����� �� ����ϼ���.\n����ؼ� ������ �߻��Ǹ� �������� �����ֽñ� �ٶ��ϴ�.');
		return;
	}
//	getNowTime();
//	RecordControl('RECORD_START');
}
/****************** zphone ��******************************/