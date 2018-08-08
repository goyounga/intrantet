var MBRSELECT_ID = "MBRPOPDATASET";

//�ʱ�ȭ
function init()
{
	mbrInit();
	
	mbrQuery();
}

//������ �ʱ�ȭ
function mbrInit()
{
	fMbrQuery.reset();
	HtmlUtil.clearTable(MBRSELECT_ID);
}

//������ ����
function mbrQuery()
{
	if(getValidation(fMbrQuery, true) == false) return;
	
	var tran = new Trans();
	tran.setSvc(MBRSELECT_ID);
	tran.setUserParams("searchId=mbrPopSearch");
	tran.setPageRow("20");
	tran.open("fMbrQuery","fMbrQuery","/custsearchaction.do");
}

function showDetailB_obj(obj)
{
	gIndex = getRowIndex(obj);
	
	if(obj.cells[0].id == MBRSELECT_ID + "_IDX" )
	{
		if(DataSet.getTotalCount(MBRSELECT_ID) > 0)
		{
			var kmps_mbr_no = DataSet.getParam(MBRSELECT_ID, DataSet.getCurPage(MBRSELECT_ID), gIndex, "kmps_mbr_no");
			var shop_name = DataSet.getParam(MBRSELECT_ID, DataSet.getCurPage(MBRSELECT_ID), gIndex, "shop_name");
			var registration_no = DataSet.getParam(MBRSELECT_ID, DataSet.getCurPage(MBRSELECT_ID), gIndex, "registration_no");
			
			//Opener ���� ������
			var thisForm = topFrame.getThisForm();
			var thisFrame = topFrame.getThisFrame();

			thisFrame.setCustInfo(kmps_mbr_no, "01", shop_name, registration_no);
			
			window.close();
		}
	}
}

//Ű üũ
function checkKeyPress(tab)
{
	if(isEnterKey())
	{
		if(tab == "M") mbrQuery();
	}
}

function callback(svcID)
{
	switch(svcID)
	{
		case MBRSELECT_ID :
			
			extendFixedNoSize(MBRSELECT_ID, 30, 29);

			break;

	}   
}