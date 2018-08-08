
var SELECT_ID = "UCSYS115S";		//�߰� �� �׸� ��ȸ

var SELECT_ID1 = "UCSYS116S";		//�߰� �� �׸� ��ȸ
var INSERT_ID1 = "UCSYS116I";		//�߰� �� �׸� ����
var DELETE_ID1 = "UCSYS116D";		//�߰� �� �׸� ����


/********************
* �ʱ� �̺�Ʈ
********************/
function init()
{
	//queryList();
}


/********************************
* �߰��� �׸� + �߰��� �׸� ��ȸ
********************************/
function queryList()
{
	if(fQuery.corp_nm_s.value == "")
	{
		alert("��ü���� �Է��ϼ���.");
		MessageBox("Required", "E", "��ü��");
		openConsType();
		return;
	}

	var trans = new Trans();					
	trans.setSvc(SELECT_ID+","+SELECT_ID1);	// ����ID
	trans.setPageRow("999");				// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	trans.setWiseGrid("1,1");				//���� ����
	trans.setForwardId("wgdsl","wgdsl");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("fQuery", "f","/wisegrid.do");
}

/********************
* ��ü�� �˻�
********************/
function openConsType()
{
	openPopup("/jsp/common/comCorpSearch.jsp", "", "SearchDetailP", "", "", "610", "500", "scrollbars=no");
}

/****************************
* �ʵ� ����Ʈ ���̺� Row �̵�
****************************/
function fieldMOVE(fromObj, toObj)
{
	var fromGridObj = document.all(fromObj);
	var toGridObj = document.all(toObj);

	if(!chkSelected(fromGridObj))
	{
		MessageBox("SYSSelectRow", "E", "");
		return;
	}
	
//	if(fromObj == SELECT_ID)
//	{
//		if(!confirm("������ �׸��� �߰� �Ͻðڽ��ϱ�?")) return;
//	}
//	else
//	{
//		if(!confirm("������ �׸��� ��� �Ͻðڽ��ϱ�?")) return;
//	}
	
	for(i = 0; i < fromGridObj.GetRowCount(); i++)
	{
		if(fromGridObj.GetCellValue("selected", i) == "1")
		{
			toGridObj.AddRow();
			for(j = 0; j < toGridObj.GetColCount(); j++)
			{				
				toGridObj.SetCellValue(toGridObj.GetColHDKey(j), toGridObj.GetRowCount()-1, fromGridObj.GetCellValue(toGridObj.GetColHDKey(j), i));
			}
		}
	} 
	
	for(i = fromGridObj.GetRowCount()-1; i >= 0; i--)
	{
		if(fromGridObj.GetCellValue("selected", i) == "1")
			fromGridObj.DeleteRow(i);
	}	
}

/****************************************
* �׸��忡 ���õ� CheckBox�� �ִ��� üũ
****************************************/
function chkSelected(GridObj)
{
	for(i = 0; i < GridObj.GetRowCount(); i++)
	{
		if(GridObj.GetCellValue("selected", i) == "1")
		{
			return true;
		}
	}
	
	return false;
}


/********************
* ���׸� �߰� ����
********************/
function saveClnt()
{
	var GridObj = document.all(SELECT_ID1);
		
	var itm_id;

	for(i = 0; i < GridObj.GetRowCount(); i++)		//�׸����� row ����ŭ �ݺ��϶�
	{
		if(itm_id)		//itm_id �ִٸ�..
		{		
			itm_id	+= ""+ GridObj.GetCellValue("itm_id", i);	
			itm_nm	+= ""+ GridObj.GetCellValue("itm_nm", i);	
		}
		else
		{
			itm_id = GridObj.GetCellValue("itm_id", i);
			itm_nm = GridObj.GetCellValue("itm_nm", i);
		}
	}	


	var params ;
		params = "itm_id=" +itm_id;		// �׸�ID ��������
		params += "&corp_cd_s=" +document.fQuery.corp_cd.value;				// ��ü�ڵ� ��������
		params += "&itm_nm=" +itm_nm;		// ��ü�� ��������


	var queryID = "";

	if(GridObj.GetRowCount() == 0)	//�׸����� row���� 0�̸� 
	{
		queryID = DELETE_ID1;		//DELETE_ID1 ������ ���ƶ�  �Ҵ���� ��ü ����
	}
	else
	{
		queryID = DELETE_ID1 +","+ INSERT_ID1;	//�ƴϸ� DELETE_ID1 + INSERT_ID1 ������ ���ƶ�
	}


	var trans = new Trans();
	trans.setSvc(queryID);
	trans.setUserParams(params);
	trans.open("f","","/common.do");
}

/********************
* �ݹ�
********************/
function callback(id)
{
	switch(id)
	{

		//�߰��� ���׸� ��ü ����
		case DELETE_ID1:

			if (DataSet.getParam(id, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else			
			{
				MessageBox("Fail", "E", "������");
			}

			break;

		//�߰��� ���׸� ���� �� ����
		case DELETE_ID1 +","+ INSERT_ID1:

			if (DataSet.getParam(DELETE_ID1 , 1, 0, "SUCCESS_COUNT") >= 0)
			{
				MessageBox("InfSuccess", "I", "");		// I = ����
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "");	//E = ����
			}

			break;


		default:
			break;
	}
}



/********************
* ��ü�� ��������
********************/
function setCorp(frm,corp_cd,corp_nm)
{
	document.fQuery.corp_nm_s.value = corp_nm;
	document.fQuery.corp_cd.value	= corp_cd;
}