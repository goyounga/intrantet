
var SELECT_ID = "UCSYS114S";	//��ü ��ȸ

/********************
* �ʱ� �̺�Ʈ
********************/
function init()
{
	fQuery.corp_nm_s.focus();

	queryList();
}

/********************
* ��ȸ
********************/
function queryList()
{	
	
//	if(fQuery.corp_nm_s.value == "")
//	{
//		alert("��ü�� �Է��ϼ���.");
//		fQuery.corp_nm_s.focus();
//		return;
//	}

	var trans = new Trans();							
	trans.setSvc(SELECT_ID);			// ����ID
	trans.setDefClick(true);
	trans.setPageRow("999");				// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	trans.setWiseGrid("1");					// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("fQuery", "f","/wisegrid.do");
}

/*****************/
// ����
/*****************/
function checkKeyPress()
{
	if(isEnterKey())
	{
		queryList();
	}
}


/********************
* �׸��� Ŭ��
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(document.all(id).GetRowCount() == 0)
		return;

	showDetailByWise(id, nRow, fQuery);

}

/********************
* �׸��� ����Ŭ��
********************/
function showDetailB_obj(id, strColumnKey, nRow)
{
	if(document.all(id).GetRowCount() == 0)
		return;

	showDetailByWise(id, nRow, fQuery);
	
	corpApply();
}


/********************
* �����ư
********************/
function corpApply()
{
	opener.setCorp(fQuery.frm.value, fQuery.corp_cd.value, fQuery.corp_nm.value);

	self.close();
}