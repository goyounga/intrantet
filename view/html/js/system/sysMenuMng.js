
var SELECT_MENUMNG_ID	= "UCSYS031S";		//�޴� Ʈ��
var SELECT_MENUMNG_ID1	= "UCSYS032S";		//�޴� ����ȸ
var INSERT_MENUMNG_ID	= "UCSYS032I";
var UPDATE_MENUMNG_ID	= "UCSYS033U";
var DELETE_MENUMNG_ID	= "UCSYS034D";
var UPDATE_SORT_ID	 	= "UCSYS035U";
var DELETE_GROUPMENULISTYES_ID = "UCSYS048D";	

var radioFlag ="DOWN";
var gsXaFlag ="";
var sortIdx = -1;

/****************/
// �ʱ�ȭ
/*****************/
function init()
{
	makeTree();		
}

//Ʈ������ 
function query()
{	
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_MENUMNG_ID);
	trans.setWiseGrid("1");
	trans.setDefClick(true);
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

//Ʈ������ 
function makeTree()
{
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_MENUMNG_ID);
	trans.setWiseGrid("1");
	trans.setDefClick(true);
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

//wiseGrid Ʈ���̺�Ʈ
function treeClick(obj, strTreeKey, strArea)
{
	var params = "";
	
	params = "mnu_id="+strTreeKey;

	var trans = new Trans();
	trans.setPageRow(1);
	trans.setUserParams(params);
	trans.setSvc(SELECT_MENUMNG_ID1);
	trans.open("","f","/common.do");
}

function detailView()
{
	setMode(f,"I");

	showDetail(SELECT_MENUMNG_ID1, 0, f);

	f.fst_id.value	= f.mnu_id.value.substr(0,2);
	f.lst_id.value	= f.mnu_id.value.substr(2,2);

	upMenuState();
	
	f.orgmenuid.value = f.mnu_id.value;
	
	selectType();
}

//�����޴��� ���� �Ұ�
function upMenuState()
{	
	if(f.upmnu_id.value == "0000")
	{
		f.fst_id.disabled = true;
		f.lst_id.disabled = true;				
	}
}

//ȭ����ġ �Է� ���
function selectURL()
{
	if(f.urlType.value == "PATH")
	{
		f.sr_url.readOnly = false;
		f.sr_url.disabled = false;
		f.sr_url.value = "" ;
		openFileDir();
	}
	else if(f.urlType.value == "LINK")
	{
		f.sr_url.readOnly = false;
		f.sr_url.disabled = false;
		f.sr_url.focus();
		//f.screenURL.value = "" ;
	}
	else
	{
		//f.sr_url.readOnly = true;
		//f.sr_url.disabled = true;
	}
}

function callback(sid)
{
	switch (sid)
	{
		case INSERT_MENUMNG_ID:

			if (DataSet.getParam(INSERT_MENUMNG_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				init();
			}

			break;
			
		case UPDATE_MENUMNG_ID:

			if (DataSet.getParam(UPDATE_MENUMNG_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				init();
			}

			break;
			
		case UPDATE_SORT_ID:

			if (DataSet.getParam(UPDATE_SORT_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				init();
			}

			break;
			
		case DELETE_GROUPMENULISTYES_ID+","+ DELETE_MENUMNG_ID:

			init();

			break;
			
		case SELECT_MENUMNG_ID:

			if (DataSet.getTotalCount(SELECT_MENUMNG_ID) > 0)
			{
				document.all(SELECT_MENUMNG_ID).CollapseTreeAll();

				treeClick(SELECT_MENUMNG_ID, DataSet.getParam(SELECT_MENUMNG_ID, 1, 0, "mnu_id"), '');
			}

			break;
			
		case SELECT_MENUMNG_ID1:

			detailView();

			break;
			
		default:
			break;			
	}
}
















//ȭ������ ����
function selectType()
{
	if(f.sr_frm_cd.value == "01")
	{
		f.pup_sr_wth.disabled = true;
		f.pup_sr_hgt.disabled = true;
		f.pup_x_cdt.disabled = true;
		f.pup_y_cdt.disabled = true;
		f.pup_sr_wth.value = "";
		f.pup_sr_hgt.value = "";
		f.pup_x_cdt.value = "";
		f.pup_y_cdt.value = "";
	}	
	else if(f.sr_frm_cd.value == "02")
	{		
		f.pup_sr_wth.disabled = false;
		f.pup_sr_hgt.disabled = false;
		f.pup_x_cdt.disabled = false;
		f.pup_y_cdt.disabled = false;
		f.pup_sr_wth.focus();
	}
	else
	{
		f.pup_sr_wth.disabled = true;
		f.pup_sr_hgt.disabled = true;
		f.pup_x_cdt.disabled = true;
		f.pup_y_cdt.disabled = true;
		f.pup_sr_wth.value = "";
		f.pup_sr_hgt.value = "";
		f.pup_x_cdt.value = "";
		f.pup_y_cdt.value = "";
	}
}

//�����ޱ�
function setMenu()
{
	if (confirm("���� �޴��� �����Ͻðڽ��ϱ�?"))
	{
		ifmMenu.location.href= "/common.do?_SERVICE_ID=UCSYS031S&_FORWARD_ID=commonjsp&_FORWARD_PAGE=/jsp/system/sysMenuWrite.jsp&_PAGE_ROW=9999&_START_ROW=1&column=1&keyword=1";
	}
}

function msg()
{
	alert("ó���Ǿ����ϴ�.");	
}

//���� ���
function openFileDir(){
	window.open("/jsp/common/comFilePath.jsp", "dirWin", "toolbar=no,scrollbars=no,top=0,left=300,width=320,height=250");	
	//setOpener(f);
	//openPopup("/common/comFilePath.jsp","FilePath" ,320,250);	
}
//���� ��� �ޱ�
function setFilePath(fileName){
	//alert(fileName);
	f.sr_url.value = fileName;	
}

//�����޴� ���
function hAdd()
{   
	setMode(f,"HA");
	//�����޴� ����Ͻ� �⺻�� ����
	f.fst_id.focus(); 
	f.upmnu_id.value ="0000";
	f.upmnu_nm.value = "ROOT";
	f.lst_id.value	= f.upmnu_id.value.substr(2,2);
	f.mnu_id.value = "";
	f.lup_ord.value = 0;
}

//�����޴� ���
function lAdd()
{   
	if(!f.mnu_id.value) return;
	setMode(f,"LA");
	//�����޴� ����Ͻ� �⺻�� ����
	f.lst_id.focus();
	f.upmnu_id.value = f.mnu_id.value.substr(0,2) + "00";
	//upMenunm();	
	f.fst_id.value	= f.mnu_id.value.substr(0,2);
	f.mnu_id.value = "";
}

function mod()
{
	setMode(f,"M");
}

// ���� ��ư Ŭ���� 
function save(){	
	//if(getValidation(f,true)== false || idValue() == false) return false;
	
	if(f.fst_id.value=="" ||f.lst_id.value=="")
	{
		alert("�޴�ID�� �Է��� �ּ���");
		return;
	}else if(f.mnu_nm.value =="")
	{
		alert("�޴����� �Է��� �ּ���");
		f.mnu_nm.focus();
		return;
//	}else if(f.urlType.value =="")
//	{
//		alert("ȭ����ġ�� �Է��� �ּ���");
//		f.urlType.focus();
//		return;
	}else if(f.sr_url.value =="")
	{
		alert("ȭ����ġ�� �Է��� �ּ���");
		f.sr_url.focus();
		return;
	}
	alert(1);
	//if(gsXaFlag != "M" && getPkValidation() == false )return false;
	if(false )return false;
	else
	{
		//����϶�
		if (gsXaFlag == "HA" ||gsXaFlag == "LA" )
		{
		
			if(!confirm("��� �Ͻðڽ��ϱ�?")) return;
			var trans = new Trans();
			trans.setSvc(INSERT_MENUMNG_ID);
			trans.open("f","f","/common.do");
		}
		//�����϶�
		else if (gsXaFlag == "M")
		{
			if(!confirm("���� �Ͻðڽ��ϱ�?")) return;
			var trans = new Trans();
			trans.setSvc(UPDATE_MENUMNG_ID);
			trans.open("f","f","/common.do");		
		}
	}
}

//���� ��ư Ŭ����
function del()
{
	var temp = f.mnu_id.value;
	if( f.step.value == 1 ) f.mnu_id.value = f.mnu_id.value.substr(0,2);	
	if(f.mnu_id.value == "" || temp == ""){
		alert("�޴� ��ü�� �����Ҽ� �����ϴ�.");
	}
	else if (!confirm(f.mnu_nm.value + "(" + temp + ") " + "�޴��� �����Ͻðڽ��ϱ�?"))
		return;
		
	f.menudel.value = f.mnu_id.value;
	var trans = new Trans();
	trans.setSvc(DELETE_GROUPMENULISTYES_ID + "," + DELETE_MENUMNG_ID);
	trans.open("f","f","/common.do");
}

//�޴� ���̵� Validationüũ
function getPkValidation()
{
	var menuFlag="F";
	if(f.mnu_id.value.length == 4){
		if(DataSet.getTotalCount(SELECT_MENUMNG_ID, 1, "mnu_id") < 1) {	//ó������ �� �Է½�
			return true;		
		}
		else
		{	//���� ���� �Ҷ� �Է�			
			var pkMenuIDArr=DataSet.getParamArr(SELECT_MENUMNG_ID, 1, "mnu_id"); 
			for(i=0; i<pkMenuIDArr.length; i++){
				if(gsXaFlag == "HA" || gsXaFlag == "LA")
				{
					if(pkMenuIDArr[i] == f.mnu_id.value){			
						alert("�޴� ID���� �̹� ���� �մϴ�.");
						f.mnu_id.value= "";	
						if(gsXaFlag == "HA")
							f.fst_id.focus();
						else 
							f.lst_id.focus();
							
						return false;
					}
					else if(pkMenuIDArr[i] == (f.mnu_id.value.substr(0,2) + "00"))
					{
						menuFlag = "T";
					}
				}
				else if( gsXaFlag == "M" )
				{
					if( i != sortIdx )
					{
						if(pkMenuIDArr[i] == f.mnu_id.value)
						{			
							alert("�޴� ID���� �̹� ���� �մϴ�.");
							f.mnu_id.value= "";	
							return false;
						}
						else if(pkMenuIDArr[i] == (f.mnu_id.value.substr(0,2) + "00"))
						{
							menuFlag = "T";
						}
					}
				}
				
			}
		}
	}
	else {
		alert("�޴�ID ���̰� ���� �ʽ��ϴ�");
		return false;
	}
	if(menuFlag == "T" || gsXaFlag == "HA" || f.step.value == 1)
	{
		return true;
	}
	else 
	{
		alert("�����޴��� �������� �ʽ��ϴ�");
		f.fst_id.focus();
		return false;
	}
}

//�޴� ���̵� �� ����
function idValue()
{
	if(f.mnu_id.value.length == 4){

	}	else { 
			alert("ID ���̰� ���� �ʽ��ϴ�");
			if(gsXaFlag == "HA" || f.step.value == 1)
			{
				f.fst_id.focus();	
			}
			else if(gsXaFlag == "LA" || f.step.value == 3)
			{
				f.lst_id.focus();	
			}	
			return false;
		}
	return true;
}

//�޴��ڵ� ��ġ��
function menuIdMarge()
{
	f.mnu_id.value = f.fst_id.value + f.lst_id.value;
}

//��Ͻ� ���ǿ� �°� ���� ����
function setMode(f,sType)
{
	gsXaFlag = sType;
	if (!f) f = document.forms[0];
	if (f!=null)
	{	
		for (var i=0; i<f.length; i++)
		{
			//�����޴� ��ư�� ��� ����
			if(gsXaFlag == "I")
			{
				if(f.elements[i].name == "btnHAdd")				
					f.elements[i].disabled = false;
				else if(f.elements[i].name == "btnLAdd" && DataSet.getParam(SELECT_MENUMNG_ID1, 1, 0, "step") == "1")
					f.elements[i].disabled = false;
				else if(f.elements[i].name == "btnMod")
					f.elements[i].disabled = false;
				else if(f.elements[i].name == "btnDel")
					f.elements[i].disabled = false;
				else
					f.elements[i].disabled = true;
					
				f.upmnu_id.value = "";
				f.upmnu_nm.value = "";
			}
			else if(gsXaFlag == "HA")
			{
				if(f.elements[i].name == "lst_id")			
					f.elements[i].disabled = true;
				else if(f.elements[i].name == "btnLAdd")			
					f.elements[i].disabled = true;
				else if(f.elements[i].name == "btnDel")			
					f.elements[i].disabled = true;
				else if(f.elements[i].name == "lup_ord")			
					f.elements[i].disabled = true;
				else if(f.elements[i].name == "btnMod")
					f.elements[i].disabled = true;
				else f.elements[i].disabled = false;
			}
			else if(gsXaFlag == "LA")
			{
				if(f.elements[i].name == "fst_id")				
					f.elements[i].disabled = true;
				else if(f.elements[i].name == "btnDel")			
					f.elements[i].disabled = true;
				else if(f.elements[i].name == "btnMod")
					f.elements[i].disabled = true;
				else f.elements[i].disabled = false;
			}
			else if(gsXaFlag == "M")
			{
				if(
					f.elements[i].name == "btnHAdd"
					|| f.elements[i].name == "btnLAdd"
					|| f.elements[i].name == "btnMod"
				)
					f.elements[i].disabled = true;
				else
					f.elements[i].disabled = false;
					
			}
			else f.elements[i].disabled = false;	

			//�׻� ������ ��ҵ�		
			/*
			if(f.elements[i].name == "ordertype")
				f.elements[i].disabled = false;
			else if(f.elements[i].name == "orderby")
				f.elements[i].disabled = false;
			else if(f.elements[i].name == "btnOK")
				f.elements[i].disabled = false;	
			else 
			*/
			if(f.elements[i].name == "downXML")
				f.elements[i].disabled = false;
			else if(f.elements[i].name == "upmnu_id")
				f.elements[i].disabled = true;
			else if(f.elements[i].name == "upmnu_nm")
				f.elements[i].disabled = true;
			else if(f.elements[i].name == "sr_url")
				f.elements[i].disabled = true;
			else if(f.elements[i].name == "pup_sr_wth")
				f.elements[i].disabled = true;	
			else if(f.elements[i].name == "pup_sr_hgt")
				f.elements[i].disabled = true;
			else if(f.elements[i].name == "pup_x_cdt")
				f.elements[i].disabled = true;
			else if(f.elements[i].name == "pup_y_cdt")
				f.elements[i].disabled = true;		
					
				
			//������ Clear
			if(gsXaFlag == "M" || f.elements[i].name == "upmnu_id" || f.elements[i].name == "upmnu_nm" || f.elements[i].name == "mnu_id")
			{  //���� �޴��� Ŭ���� X
			}
			else if (f.elements[i].type == "select-one")
				f.elements[i].selectedIndex=0;
			else if((f.elements[i].type == "text") || (f.elements[i].type == "textarea"))
				f.elements[i].value = "";			
		}
	}		
}

//����Ű �Է½�
function checkEnterKey()
{
	if(isEnterKey())
	{
		query();
	}
}

