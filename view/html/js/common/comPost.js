
var SELECT_POST_ID = "UCCOM011S";

var nRow;

/********************
* �ʱ� �̺�Ʈ
********************/
function init()
{
	fQuery.address_s.focus();
}

/********************
* ��ȸ
********************/
function queryList()
{	
	if(fQuery.address_s.value == "")
	{
		alert("�ּҸ� �Է��ϼ���.");
		fQuery.address_s.focus();
		return;
	}

	var trans = new Trans();							
	trans.setSvc(SELECT_POST_ID);			// ����ID
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
	
	postApply();
}

/********************
* �����ư
********************/
function postApply()
{	
	opener.setPost(fQuery.frm.value, fQuery.post.value, fQuery.address.value);

	self.close();
}