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
	
	//테이블 클리어
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

//더블클릭시
function showDetailB_obj(obj)
{
	gIndex = getRowIndex(obj);
	
	if(obj.cells[0].id == SELECT_ID + "_IDX" )
	{
		if(DataSet.getTotalCount(SELECT_ID) > 0)
		{
			var cat_id = DataSet.getParam(SELECT_ID, DataSet.getCurPage(SELECT_ID), gIndex, "cat_id");
			
			//Opener 정보 가져옴
			
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