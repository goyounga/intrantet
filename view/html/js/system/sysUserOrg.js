
var SELECT_ORG_ID		= "UCSYS021S";
var SELECT_USER_ID		= "UCSYS022S";
var INSERT_TARGET_ID	= "UCSYS066I";



/********************
* init
********************/
function init()
{
	query();
}

/********************
* ���� ��ȸ
********************/
function query()
{
	getCorp();

	var trans = new Trans();	
	trans.setSvc(SELECT_ORG_ID);
	trans.setPageRow(-1);
	trans.setDefClick(true);
	trans.setWiseGrid("1");				// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");		// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("f", "f","/wisegrid.do");
}

/*************************
* ����� ����Ʈ
*************************/
function userQuery()
{
	getCorp();

	//ID, �̸� �˻�
	if(f.searchtype.value && f.searchstr.value)
	{
		f.search.value = "and u."+f.searchtype.value+" like '"+f.searchstr.value+"%'";
	}
	else if(f.searchtype.value && !f.searchstr.value)
	{
		alert(f.searchtype.options[f.searchtype.selectedIndex].text+"��(��) �Է��ϼ���.");
		f.search.value = "";
		f.searchstr.focus();
		return;
	}
	else if(!f.searchtype.value && f.searchstr.value)
	{
		alert("�˻������� �����ϼ���.");
		f.search.value = "";
		f.searchtype.focus();
		return;
	}
	
	var trans = new Trans();	
	trans.setSvc(SELECT_USER_ID);
	trans.setPageRow(-1);
	trans.setDefClick(true);
	trans.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("f", "f","/wisegrid.do");
}

/*************************
* ��ü������ �����´�.
*************************/
function getCorp()
{
	corp_cd = opener.top.document.all("corp_cd_chng").value;
	corp_nm = opener.top.document.all("corp_nm_chng").value;

	f.corp_cd.value = corp_cd;
	f.corp_nm.value = corp_nm;

//	var params;
//	params = "&corp_cd="+corp_cd;
//	params += "&corp_nm="+corp_nm;
//	
//	return params;
}

/********************
* Ʈ�� Ŭ���̺�Ʈ
* ������ �ַ���..
* ���������� showDetailO_obj function ����
********************/
function treeClick(obj, strTreeKey, strArea)
{
}

/********************
* ������ �̺�Ʈ[Ʈ��Ŭ��]
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	//����� ����Ʈ Ŭ����
	if(id == SELECT_ORG_ID)
	{
		if(DataSet.getTotalCount(SELECT_ORG_ID) == "0")
			return;

		var org_cd = DataSet.getParam(SELECT_ORG_ID, DataSet.getCurPage(SELECT_ORG_ID), nRow, "org_cd");

		f.org_cd.value = org_cd == '0' ? '' : org_cd;

		userQuery();
	}
}

/********************
* ���� �̺�Ʈ
********************/
function save()
{
	var obj	= document.UCSYS022S;
	var user_id		= "";
	var team_cd		= "";
	var seq			= "";
	var cnt			= 0;
	var loi_ip		= "";
	var org_cd		="";
	var user_nm		= "";
	
	for(var i=0; i<obj.GetRowCount(); i++)
	{
		if(obj.GetCellValue("user_chk", i) == "1")	//äũ�Ǿ��ٸ�..
		{
			cnt++;
			
			//���õ� ����� id
			if(user_id) user_id	+=	""+obj.GetCellValue("user_id", i);
			else user_id	=	obj.GetCellValue("user_id", i);
			
			//�Ҽ�
			if(team_cd) team_cd	+=	""+obj.GetCellValue("org_cd", i);
			else team_cd	=	obj.GetCellValue("org_cd", i);
			
			// ������
			if(seq) seq +=	""+obj.GetCellValue("max_seq", i);
			else seq =	parseInt(obj.GetCellValue("max_seq", i))+cnt;
			
			//IP
			if(loi_ip) loi_ip	+=	""+obj.GetCellValue("loi_ip", i);
			else loi_ip	=	obj.GetCellValue("loi_ip", i);
			
			//�̸�
			if(user_nm) user_nm	+=	""+obj.GetCellValue("user_nm", i);
			else user_nm	=	obj.GetCellValue("user_nm", i);
			
		}
	}

	if(!user_id)
	{
		alert("���õ� ROW�� �����ϴ�.");
		return;
	}
	
	if(f.memo.value == "" || f.memo.value == "null") {
		var params = "&user_id="+user_id+"&team_cd="+team_cd+"&seq="+seq;
		
		//����
		var trans = new Trans();
		trans.setSvc(INSERT_TARGET_ID);
		trans.setUserParams(params);
		trans.open("f", "","/common.do");
	}
	else {
		var thisFrame = topFrame.getThisFrame();

		if(user_id =="")
		{
			alert("������ �����Ͱ� �����ϴ�.");
		}
		else {
			thisFrame.setData(user_id, "", loi_ip, user_nm);
		}

		this.close();
	}
}

/********************
* ����Ű �̺�Ʈ
********************/
function checkEnterKey()
{
	if(isEnterKey())
	{
		userQuery();
	}
}

/********************
* �ݹ�
********************/
function callback(serviceID)
{
	switch(serviceID)
	{
		case INSERT_TARGET_ID:
			if (DataSet.getParam(INSERT_TARGET_ID, 1, 0, "SUCCESS_COUNT") > 0){
				opener.tarQuery();
				userQuery();
			}
			else {
				alert("�������");
			}				
			break;
		default:
			break;
	}
}

/********************
* �ݱ� �̺�Ʈ
********************/
function unLoad()
{
	opener.popObj = "";
	//opener.tarQuery();
	self.close();
}

