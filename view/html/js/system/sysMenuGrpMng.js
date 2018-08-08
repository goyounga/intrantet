

var SELECT_GROUPMENULIST_ID = "UCSYS041S";			//�޴��׷� ����Ʈ SELECT
var INSERT_GROUPMENULIST_ID = "UCSYS042I";
var UPDATE_GROUPMENULIST_ID = "UCSYS043U";
var DELETE_GROUPMENULIST_ID = "UCSYS044D";

var SELECT_GROUPMENULISTYN_ID	= "UCSYS045S,UCSYS046S";		//���� �ο� ������ ����Ʈ SELECT
var SELECT_GROUPMENULISTYES_ID	= "UCSYS046S";		//���� �ο��� ����Ʈ SELECT
var INSERT_GROUPMENULISTNO_ID	= "UCSYS047I";		//���� �ο� ������ ����Ʈ INSERT
var DELETE_GROUPMENULISTYES_ID	= "UCSYS048D";		//���� �ο��� ����Ʈ DELETE
var DELETE_USERGROUP_ID			= "UCSYS049D";


/********************
* ��ü����� ����ȸ
********************/
function getComCorp()
{
	init();
}

//�ʱ�ȭ
function init()
{
	query();
}

function initForm()
{
	setMode(f,"I");
	setMode(f2,"I");
	
	f.reset();
	f2.reset();
	
	document.UCSYS045S.RemoveAllData();
	document.UCSYS046S.RemoveAllData();
}

/*****************/
//��ȸ
//�޴��׷� ����Ʈ
/*****************/
function query()
{
	initForm();
	//getCorp();

	var trans = new Trans();
	trans.setPageRow(9999);
	trans.setSvc(SELECT_GROUPMENULIST_ID);
	trans.setDefClick(true);
	trans.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("fQuery", "f","/wisegrid.do");
}

/*************************
* ��ü������ �����´�.
*************************/
function getCorp()
{
	corp_cd = top.document.all("corp_cd_chng").value;
	corp_nm = top.document.all("corp_nm_chng").value;

	fQuery.corp_cd.value = corp_cd;
	fQuery.corp_nm.value = corp_nm;
}

/*****************/
//��ȸ
//���� �ο� �޴� ����Ʈ
/*****************/
function query1()
{
	var trans = new Trans();
	trans.setPageRow(9999);
	trans.setSvc(SELECT_GROUPMENULISTYN_ID);
	trans.setWiseGrid("1,1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");		// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("f", "f2","/wisegrid.do")
}


/*****************/
//������
//�׸��� onclick �̺�Ʈ �Լ�
/*****************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	//�޴� �׷츮��Ʈ Ŭ����
	if(id == SELECT_GROUPMENULIST_ID)
	{
		if(DataSet.getTotalCount(SELECT_GROUPMENULIST_ID) == "0")
			return;
		
		setMode(f,"U");

		showDetailByWise(SELECT_GROUPMENULIST_ID, nRow,f);

		f2.mnu_grp_id.value = f.mnu_grp_id.value;

		query2 = true;
		query1();
	}
}

/*****************/
//������
//��� ��ư Ŭ����
/*****************/
function add()
{
	setMode(f,"A");	

	f.mnu_grp_nm.focus();

	clear(f);

	f.corp_cd.value = fQuery.corp_cd.value;
}

/*****************/
//������
//���� ��ư Ŭ���� 
/*****************/
function save()
{		
	if(f.mnu_grp_nm.value=="")
	{
		MessageBox("Required", "E", "�޴��׷���")
		f.mnu_grp_nm.focus();
		return;
	}
	
	
	//����϶�			
	if (gsXaFlag == "A")
	{
		if(!MessageBox("SavConfirm", "C", ""))
			return;
		var tran = new Trans();
		tran.setSvc(INSERT_GROUPMENULIST_ID);
		tran.open("f","f","/common.do");
	}
	//�����϶�
	else if (gsXaFlag == "U")
	{	
		if(!MessageBox("ChgConfirm", "C", ""))
			return;
		var tran = new Trans();
		tran.setSvc(UPDATE_GROUPMENULIST_ID);
		tran.open("f","f","/common.do");		
	}
}

/*****************/
//������
//���� ��ư Ŭ���� 
/*****************/
function del()
{	
	if(f.mnu_grp_id.value == "")
	{
		MessageBox("SYSDel", "E", "�޴��׷� ��ü��");
	}
	else if (confirm("'" + f.mnu_grp_nm.value + "' �޴��׷��� �����Ͻðڽ��ϱ�?"))
	{	
		var tran = new Trans();
		tran.setSvc(DELETE_GROUPMENULISTYES_ID + "," + DELETE_GROUPMENULIST_ID + "," + DELETE_USERGROUP_ID);
		tran.open("f","f","/common.do");
	}
}

/*****************/
//���Ѻο� �� �������
//�� Ŭ����
/*****************/
function nextMenu()
{
	var obj	= document.UCSYS045S;
	var mnu_id		= "";
	var wrt_f		= "";
	
	for(var i=0; i<obj.GetRowCount(); i++)
	{
		if(obj.GetCellValue("mnuid_chk", i) == "1")	//äũ�Ǿ��ٸ�..
		{
			//���Ѻο��� �޴�ID
			if(mnu_id)
				mnu_id	+=	""+obj.GetCellValue("mnu_id", i);
			else
				mnu_id	=	obj.GetCellValue("mnu_id", i);
		}
	}

	if(!mnu_id)
	{
		alert("���õ� ROW�� �����ϴ�.");
		return;
	}
	
	var params = "&mnu_id="+mnu_id+"&wrt_f="+wrt_f;
	
	//����
	var trans = new Trans();
	trans.setSvc(INSERT_GROUPMENULISTNO_ID);
	trans.setUserParams(params);
	trans.open("f2", "","/common.do")
}

/*****************/
//���Ѻο� ���� �������
//�� Ŭ����
/*****************/
function prevMenu()
{
	var obj	= document.UCSYS046S;
	var mnu_id		= "";
	
	for(var i=0; i<obj.GetRowCount(); i++)
	{
		if(obj.GetCellValue("mnuid_chk", i) == "1")	//äũ�Ǿ��ٸ�..
		{
			//���Ѻο��� �޴�ID
			if(mnu_id)
				mnu_id	+=	""+obj.GetCellValue("mnu_id", i);
			else
				mnu_id	=	obj.GetCellValue("mnu_id", i);
			
		}
	}

	if(!mnu_id)
	{
		MessageBox("SYSSelectRow", "E", "");
		return;
	}
	
	var params = "&mnu_id="+mnu_id;
	
	//����
	var trans = new Trans();
	trans.setSvc(DELETE_GROUPMENULISTYES_ID);
	trans.setUserParams(params);
	trans.open("f2", "","/common.do")
}

/*****************/
//�ݹ�
/*****************/
function callback(sServiceID)
{
	switch (sServiceID)
	{	
		//�޴� �׷� ����Ʈ
		case SELECT_GROUPMENULIST_ID:
			//setMode(f,"I");
			break;
		//�޴� ����Ʈ(���Ѻο��ȵȰ�, �Ȱ�)
		case SELECT_GROUPMENULISTYN_ID:
			break;
		case INSERT_GROUPMENULISTNO_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0){
				query1();
			}
			break;
		case DELETE_GROUPMENULISTYES_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0){
				query1();
			}
			break;
		case INSERT_GROUPMENULIST_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0){
				query();
			}
			break;
		case UPDATE_GROUPMENULIST_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0){
				query();
			}
			break;
		//�޴� �׷� ����Ʈ ����
		case DELETE_GROUPMENULISTYES_ID + "," + DELETE_GROUPMENULIST_ID + "," + DELETE_USERGROUP_ID:
			query();

			break;			
		default :
			break;
	}		
}
			
//Ű üũ
function checkKeyPress()
{
	if(isEnterKey())
	{
		query();
	}
}

//��Ͻ� ���ǿ� �°� Ŭ����
function setMode(formName,sType)
{
	gsXaFlag = sType;
	if (!formName) formName = document.forms[0];

	if (formName!=null)
	{	
		for (var i=0; i<formName.length; i++)
		{ 	
			if(gsXaFlag == "I"){	
				if(formName.elements[i].name == "btnAdd")
						formName.elements[i].disabled = false;
				else				
					formName.elements[i].disabled = true;
			}	
			else if(gsXaFlag == "A")
			{
				if(formName.elements[i].name == "btnDel")
						formName.elements[i].disabled = true;
				else				
					formName.elements[i].disabled = false;
			}	
			else {				
				/*
				if(formName.elements[i].name == "btnSave")
					formName.elements[i].disabled = false;
				else if(formName.elements[i].name == "btnDel")
					formName.elements[i].disabled = false;
				else if(formName.elements[i].name == "menugroupnm")
					formName.elements[i].disabled = false;
				else if(formName.elements[i].name == "menugroupdesc")
				*/
					formName.elements[i].disabled = false;	
			}	
			if (formName.elements[i].type == "select-one")
				formName.elements[i].selectedIndex=0;
			else if((formName.elements[i].type == "text") || (formName.elements[i].type == "textarea"))
				formName.elements[i].value = "";
						
		}
	}		
}