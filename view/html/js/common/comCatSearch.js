var SELECT_ID = "CATDATASET";

function init()
{
	fQuery.cat_id.focus();
	
	fQuery.kmps_mbr_no.value = getGlobalCustInfo("custkey");
	fQuery.cat_id.value = getGlobalCustInfo("cat_id");
}

function clearView()
{
	fQuery.reset();
	
	//���̺� Ŭ����
	HtmlUtil.clearTable(SELECT_ID);
}

function query()
{
	if(checkValue(fQuery) == false) return false;
	
	if(getValidation(fQuery, true) == false) return false;
	
	var tran = new Trans();	
	tran.setSvc(SELECT_ID);
	tran.setPageRow(20);
	tran.open("fQuery", "fQuery","/catsearchaction.do");
}

//����Ŭ����
function showDetailB_obj(obj)
{
	gIndex = getRowIndex(obj);
	
	if(obj.cells[0].id == SELECT_ID + "_IDX" )
	{
		if(DataSet.getTotalCount(SELECT_ID) > 0)
		{
			var cat_id = DataSet.getParam(SELECT_ID, DataSet.getCurPage(SELECT_ID), gIndex, "cat_id");
			
			//Opener ���� ������
			
			var thisForm = topFrame.getThisForm();
			var thisFrame = topFrame.getThisFrame();

			thisFrame.setCatInfo(thisForm, cat_id);
			
			window.close();
		}
	}
}

function callback(svcID)
{
	switch(svcID)
	{
		case SELECT_ID :	
			break;
	}
}