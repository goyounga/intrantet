
var SELECT_ID = "SEARCH_JOB";

/********************
* �ʱ� �̺�Ʈ
********************/
function init()
{

}

/********************
* ��ȸ
********************/
function queryList()
{	
	var trans = new Trans();							
	trans.setSvc(SELECT_ID);			// ����ID
	trans.setDefClick(true);
	trans.setPageRow("999");				// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	trans.setWiseGrid("1");					// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("fQuery", "f","/wisegrid.do");
}

function chngJob()
{
	queryList();
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
	
	apply();
}


/********************
* �����ư
********************/
function apply()
{
	opener.setJob(fQuery.frm.value, fQuery.job_cd.value, fQuery.job_cd_nm.value);

	self.close();
}