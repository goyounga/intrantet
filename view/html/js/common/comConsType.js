
var SELECT_ID = "UCCOM005S";

function init()
{
	fQuery.constype.focus();
	
	query();
}


//��ȸ
function query()
{
	var trans = new Trans();	
	trans.setSvc(SELECT_ID);
	trans.setRecRow(999999);
	trans.setPageRow("999");					// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	trans.setWiseGrid("1");						// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");				// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("fQuery", "fQuery","/wisegrid.do");
}


//����Ŭ����
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
* ����Ű
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