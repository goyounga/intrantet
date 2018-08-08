
var SELECT_ID = "UCCOM005S";

function init()
{
	fQuery.constype.focus();
	
	query();
}


//조회
function query()
{
	var trans = new Trans();	
	trans.setSvc(SELECT_ID);
	trans.setRecRow(999999);
	trans.setPageRow("999");					// 1Page에 몇 개의 Row를 출력할 것인가?			
	trans.setWiseGrid("1");						// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");				// wisegrid를 사용하는 경우 반드시 추가
	trans.open("fQuery", "fQuery","/wisegrid.do");
}


//더블클릭시
function showDetailB_obj(obj, strColumnKey, nRow) 
{
	var lcode;
	var mcode;
	var scode;
	var frm;

	frm = fQuery.frame.value;

	showDetailByWise(obj, nRow, fQuery);

	lcode = fQuery.lcode.value;
	mcode = fQuery.mcode.value;
	scode = fQuery.scode.value;

	opener.setConsTypeCombo(lcode,mcode,scode,frm, fQuery.corp_cd.value);

	window.close();
}


/********************
* 엔터키
********************/
function checkEnterKey()
{
	if(isEnterKey())
	{
		query();
	}
}


//callback
function callback(svcID)
{
	switch(svcID)
	{
		case SELECT_ID :

			break;
	}
}