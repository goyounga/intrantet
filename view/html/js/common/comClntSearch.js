var SELECT_ID	= "UCCUS001S";	

var g_clnt_ssn = "";

var g_rowIdx;
var gridObj;

function init()
{
	document.all("corp_cd").value = "00";

	gridObj = document.all(SELECT_ID);

	fQuery.q_clnt_nm.focus();

	if(fQuery.clntGbn.value == "CALL")
	{
		if(fQuery.q_clnt_no.value != "")	//�Ѿ�� �Ķ���� �� ����ȣ, ��ȭ��ȣ ���� ��� ����ȣ ���Ǹ� Ÿ���� ó��.
		{
			fQuery.callNo.value == "";	
		}
		queryList();
	}
	else if(fQuery.clntGbn.value == "ENTER")
	{
		document.all("q_clnt_nm").value = opener.document.all("clnt_nm").value;
		queryList();
	}
}

function xeCure(command)
{
	if(command == "encrypt")
		openPopup("/jsp/customer/crsClntSsnXecure.jsp", "command=encrypt&input="+document.all("qq_clnt_ssn").value+"&row="+0,"xecure", "1024", "800", "0", "0", "scrollbars=no, status=no");
}

function queryList()
{
	if(fQuery.q_clnt_nm.value == "" 
		&& fQuery.q_clnt_ssn.value == "" 
		&& fQuery.q_clnt_no.value == "" 
		&& fQuery.searchType.value == "" 
		&& fQuery.callNo.value == "")
	{
		MessageBox("InputFail", "E", "�˻�����");
		fQuery.q_clnt_nm.focus();
		return;
	}

	if(fQuery.searchType.value && !fQuery.searchText.value)
	{
		MessageBox("Required", "E", "�˻��ܾ�");
		fQuery.searchText.focus();
		return;
	}
	if(!fQuery.searchType.value && fQuery.searchText.value)
	{
		MessageBox("Required", "E", "�˻���");
		fQuery.searchType.focus();
		return;
	}

	gridObj.setParam("hdp_n_format", "TEL");
	gridObj.setParam("hm_phn_n_format", "TEL");
	gridObj.setParam("offc_phn_n_format", "TEL");


	var tran = new Trans();
	tran.setSvc(SELECT_ID);
	tran.setDefClick(true);
	tran.setPageRow("50");			// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	tran.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	tran.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	tran.open("fQuery","f","/xecure.do");
//	tran.open("fQuery","f","/wisegrid.do");

//	var tran = new Trans();
//	tran.setSvc(SELECT_ID);
//	tran.setDefClick(true);
//	tran.setPageRow("50");			// 1Page�� �� ���� Row�� ����� ���ΰ�?			
//	tran.open("fQuery","f","/xecure.do");
}

/**********************
* ������
**********************/
function showDetailO_obj(id, strColumnKey, nRow)	//��Ŭ��
{
	if(DataSet.getTotalCount(id) < 1)
		return;
		
	switch(id)
	{
		case SELECT_ID:
			
			g_rowIdx = nRow;
			
			break;
		
		default:
			break;
	}
}

/**********************
* ������
**********************/
function showDetailB_obj(id, strColumnKey, nRow)	//����Ŭ��
{
	if(DataSet.getTotalCount(id) < 1)
		return;
		
	switch(id)
	{
		case SELECT_ID:	
			
			g_rowIdx = nRow;
			apply();

			break;
		
		default:
			break;
	}
}

/**********************
* ����
**********************/
function apply()
{
	var clnt_no		= "";
	var call_no		= "";
	var clnt_ssn	= "";

	if(DataSet.getTotalCount(SELECT_ID) < 1)
	{
		call_no = document.all("callNo").value;
	}	
	else
	{
		clnt_no		= gridObj.GetCellValue("clnt_no", g_rowIdx );
		clnt_ssn	= gridObj.GetCellValue("clnt_ssn", g_rowIdx );
	}

	opener.setClntInfo(clnt_no, call_no, clnt_ssn);
	window.close();
}

 
function callback(svcid)
{

	switch(svcid)
	{
		case SELECT_ID:

			var tot_cnt = DataSet.getTotalCount(SELECT_ID);

			var ssn = "";

			for(var i=0; i < tot_cnt; i++)
			{
				ssn = DataSet.getParam(SELECT_ID, 1, i, "clnt_ssn");
			}	

			if(document.all("clntGbn").value == "CALL")
			{
				//if(tot_cnt < 1)
					apply();
			}
			
			break;

		default:
			break;
	}
}

function unload()
{
}