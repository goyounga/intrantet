var SELECT_ID = "UCSYS092S";

function init()
{
	query();
}

function query()
{
	var gridObj = document.all(SELECT_ID);
	
	gridObj.setParam("res_tm_format", "TIME");

	var trans = new Trans();							
	trans.setSvc(SELECT_ID);			// 쿼리ID
	trans.setDisSvc(SELECT_ID);		// gridID
	trans.setWait(false);
	trans.setAsync(false);
	trans.setPageRow("20");			// 1Page에 몇 개의 Row를 출력할 것인가?			
	trans.setWiseGrid("1");				// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	trans.open("fQuery", "fQuery","/wisegrid.do");
}

//###################################
// ONCLICK - LEFT CLICK
//###################################
function showDetailO_obj(id, strColumnKey, nRow)  {
	var curpage  = DataSet.getCurPage(SELECT_ID);
	var atcl_no = DataSet.getParam(SELECT_ID, curpage, nRow, "atcl_no");
	var rltr_mbr_id = DataSet.getParam(SELECT_ID, curpage, nRow, "rltr_mbr_id");

	opener.topFrame.ifmMain.ifmCrsCons.fConsAdd.atcl_no.value = atcl_no;
	opener.topFrame.ifmMain.ifmCrsCons.fConsAdd.calltelno.value = DataSet.getParam(SELECT_ID, curpage, nRow, "res_tel_no");
	opener.topFrame.ifmMain.ifmCrsCons.fConsAdd.m_calltelno.value = DataSet.getParam(SELECT_ID, curpage, nRow, "m_res_tel_no");
	opener.topFrame.ifmMain.ifmCrsCons.fConsAdd.reserveno.value = DataSet.getParam(SELECT_ID, curpage, nRow, "tel_res_no");
	opener.topFrame.ifmMain.ifmCrsCons.fConsAdd.reservedcallyn.value = "Y";

	var res_tp_cd = DataSet.getParam(SELECT_ID, curpage, nRow, "res_tp_cd");
	switch (res_tp_cd) {
		case "10":
			opener.topFrame.ifmMain.tabclick('tbltab01',1,'');
			opener.topFrame.ifmMain.tab01_onclick(1, atcl_no);
			break;
		case "20":
			opener.topFrame.ifmMain.tabclick('tbltab01',0,'');
			opener.topFrame.ifmMain.tab01_onclick(0, atcl_no);
			break;
		case "30":
			opener.topFrame.ifmMain.tabclick('tbltab01',2,'');
			opener.topFrame.ifmMain.tab01_onclick(2, rltr_mbr_id);
			break;
		case "40":
			opener.topFrame.ifmMain.tabclick('tbltab01',3,'');
			opener.topFrame.ifmMain.tab01_onclick(3, atcl_no);
			break;
		default:
			break;	
	}

	window.close();
} 

function callback(svcID)
{
	switch(svcID)
	{
		case SELECT_ID :	
			break;
	}
}