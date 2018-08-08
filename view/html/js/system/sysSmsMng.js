var SELECT_ID	= "UCSYS004S";			//��ȸ	
var SELECT_ID1	= "UCSYS005S";			//����ȸ
var SELECT_ID2	= "UCSYS006S";			//�ߺ�üũ
var INSERT_ID	= "UCSYS003I";			//���  UCSYS002I
var UPDATE_ID	= "UCSYS004U";			//����
var DELETE_ID	= "UCSYS005D";			//����

var codeFlag = "";
var dupChkFlag = false;

var sortIdx = -1;
var sortObj;
var sortStep;

//�ʱ⼳��
function init()
{	
	//��庯��
	setMode("INIT");

	//Ʈ�� �׸���
	makeTree();
}

/********************
* Ʈ������ 
********************/
function makeTree()
{
	var tran = new Trans();
	tran.setSvc(SELECT_ID);
	tran.setPageRow(999);
	tran.setWiseGrid("1");
	tran.setDefClick(true);
	tran.setForwardId("wgdsl","");
	tran.open("f","f","/wisegrid.do");
}

/********************
* Ʈ�� Ŭ���̺�Ʈ
********************/
function treeClick(obj, strTreeKey, strArea)
{
}

/********************
* ������ �̺�Ʈ
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	setMode("INIT");
	showDetail(SELECT_ID, nRow, f);
}

/********************
* �ߺ�üũ ��ư
********************/
function codeDupChk()
{
	if(f.uppercd.value == "")
	{
		alert("��з� �ڵ带 �Է��ϼ���.");
		return;
	}
	if(f.tpcd.value == "")
	{
		alert("�Һз��ڵ带 �Է��ϼ���.");
		return;
	}

	var tran = new Trans();
	tran.setPageRow(1);
	tran.setSvc(SELECT_ID2);
	tran.open("f","f","/common.do");

	//dupChkFlag
}

/********************
* ���� ��ư
********************/
function codeMod()
{
	dupChkFlag = true;
	setMode("U");		//���
	selfClear("f");

	if(DataSet.getParam(SELECT_ID1, 1, 0, "step") == 1)
	{
		f.tpcd.disabled = true;
	}
}

/********************
* ��з���� ��ư
********************/
function heightAdd()
{
	if(f.btnheightAdd.name == "btnheightAdd")
	{
		dupChkFlag = false;
		//clear(fQuery);		
		setMode("HA");
		selfClear(f);
		f.uppercd.focus();
	}
}

/********************
* �Һз���� ��ư
********************/
function lowAdd()
{
	if(f.btnLowAdd.name == "btnLowAdd" )
	{
		dupChkFlag = false;
		//clear(fQuery);		
		setMode("LA");
		selfClear(f);
		f.tpcd.focus();
	}
}

function codeChange()
{
	dupChkFlag		= false;
	f.btnCdDupChk.disabled	= false;
	
}

/********************
* ���� ��ư
********************/
function save()
{
	
	if(f.uppercd.value=="")
	{
		alert("��з� �ڵ带 �Է����ּ���");
		f.uppercd.focus();
		return;
	}else if(f.codenm.value=="")
	{
		alert("�ڵ���� �Է����ּ���");
		f.codenm.focus();
		return;
	};
	
	
	if(dupChkFlag == false)
	{
		alert("�ߺ�üũ�� �ϼ���.");
		return;
	}

	if(getValidation(f,true)== false) return;
	else if(getPkValidation() == false) return;
	else
	{
		//����϶�			
		if (gsXaFlag == "HA" || gsXaFlag == "LA")
		{
			if(!confirm("��� �Ͻðڽ��ϱ�?")) return;
			var tran = new Trans();
			tran.setSvc(INSERT_ID);
			tran.open("f","f","/common.do");
		}
		//�����϶�
		else if (gsXaFlag == "U")
		{
			if(!confirm("���� �Ͻðڽ��ϱ�?")) return;
			var tran = new Trans();
			tran.setSvc(UPDATE_ID);
			tran.open("f","f","/common.do");	
		}
	}
}

/********************
* ���� ��ư
********************/
function del()
{
	if (f.tpcd.value == "" || f.uppercd.value == "")
	{
		return;
	}	
	if(f.tpcd.value == "")
	{
		alert("�ڵ�� ��ü�� �����Ҽ� �����ϴ�.");
	}
	else if (confirm(f.codenm.value + "("  + f.uppercd.value + f.tpcd.value+ ") " + "Code�� �����Ͻðڽ��ϱ�?"))
	{
		if(f.tpcd.value == "000")
		{
			f.tpcd.value ="";
		}
		
		var tran = new Trans();
		tran.setSvc(DELETE_ID);
		tran.open("f","f","/common.do");
	}
	
}

/********************
* �ݹ��Լ�
********************/
function callback(sid)
{
	/**************************/
	//���
	if(sid == INSERT_ID)
	{
		if (DataSet.getParam(INSERT_ID, 1, 0, "SUCCESS_COUNT") > 0)
		{
			clear(f);
			//clear(fQuery);
			makeTree();
			codeAction();			//��ϵ� �ڵ尩 �޸� ĳ���� ����
		}
	}

	/**************************/
	//����
	else if(sid == UPDATE_ID)
	{	
		if (DataSet.getParam(UPDATE_ID, 1, 0, "SUCCESS_COUNT") > 0)
		{
			clear(f);
			//clear(fQuery);
			makeTree();
			codeAction();			//������ �ڵ尩 �޸� ĳ���� ����
		}
	}

	/**************************/
	//����
	else if(sid == DELETE_ID)
	{	
		if (DataSet.getParam(DELETE_ID, 1, 0, "SUCCESS_COUNT") > 0)
		{
			clear(f);
			//clear(fQuery);
			makeTree();
			codeAction();			//������ �ڵ尩 �޸� ĳ���� ����
		}
	}

	/**************************/
	//��ȸ
	else if(sid == SELECT_ID)
	{
		clear(f);
	}

	/**************************/
	//����ȸ
	else if(sid == SELECT_ID1)
	{
		f.orguppercd.value = f.uppercd.value;
		f.orgcode.value = f.tpcd.value;
	}

	/**************************/
	//�ߺ�üũ
	else if(sid == SELECT_ID2)
	{
		if(DataSet.getParam(SELECT_ID2, 1, 0, "cnt") == 0)
		{
			alert("��밡���� �ڵ��Դϴ�.");
			dupChkFlag = true;
			//setButton(f.btnCdDupChk, true);
			f.btnCdDupChk.disabled = true;
		}
		else
		{
			dupChkFlag = false;
			alert("�̹� ��ϵ� �ڵ��Դϴ�.");
		}
	}
}

/********************
* ��ư �� �ؽ�Ʈ ���� ����
********************/
function setMode(sType)
{
	gsXaFlag = sType;
	switch (sType)
	{
		case "INIT":
			//setButton(f.btnheightAdd, false);
			//setButton(f.btnLowAdd, false);
			//setButton(f.btnMod, false);
			//setButton(f.btnSave, true);
			//setButton(f.btnDel, false);
			//setButton(f.btnCdDupChk, true);
			f.btnheightAdd.disabled		= false;
			f.btnLowAdd.disabled		= false;
			f.btnMod.disabled		= false;
			f.btnSave.disabled		= true;
			f.btnDel.disabled		= false;
			f.btnCdDupChk.disabled		= true;

			f.step.disabled			= true;
			f.uppercd.disabled		= true;
			f.tpcd.disabled			= true;
			f.codenm.disabled		= true;
			f.smscodetxt.disabled		= true;
			f.lupord.disabled		= true;
			f.useyn.disabled		= true;
			f.rg_nm.disabled		= true;
			f.rg_dt.disabled		= true;
			f.rg_tm.disabled		= true;
			f.mdf_nm.disabled		= true;
			f.mdf_dt.disabled		= true;
			f.mdf_tm.disabled		= true;
			
			break;

		case "I":
			//setButton(f.btnheightAdd, false);
			//setButton(f.btnLowAdd, true);
			//setButton(f.btnMod, true);
			//setButton(f.btnSave, true);
			//setButton(f.btnDel, true);
			//setButton(f.btnCdDupChk, false);
			f.btnheightAdd.disabled		= false;
			f.btnLowAdd.disabled		= true;
			f.btnMod.disabled		= true;
			f.btnSave.disabled		= true;
			f.btnDel.disabled		= true;
			f.btnCdDupChk.disabled		= false;

			f.step.disabled			= true;
			f.uppercd.disabled		= true;
			f.tpcd.disabled			= true;						
			f.codenm.disabled		= true;
			f.smscodetxt.disabled		= true;
			f.lupord.disabled		= true;
			f.useyn.disabled		= true;	
			break;

		case "HA":
			//setButton(f.btnheightAdd, false);
			//setButton(f.btnLowAdd, true);
			//setButton(f.btnMod, true);
			//setButton(f.btnSave, false);
			//setButton(f.btnDel, true);
			//setButton(f.btnCdDupChk, false);
			f.btnheightAdd.disabled		= false;
			f.btnLowAdd.disabled		= true;
			f.btnMod.disabled		= true;
			f.btnSave.disabled		= false;
			f.btnDel.disabled		= true;
			f.btnCdDupChk.disabled		= false;

			f.step.disabled			= true;
			f.uppercd.disabled		= false;
			f.tpcd.disabled			= true;
			f.codenm.disabled		= false;
			f.smscodetxt.disabled		= false;
			f.lupord.disabled		= true;
			f.useyn.disabled		= false;
			break;

		case "LA":
			//setButton(f.btnheightAdd, false);
			//setButton(f.btnLowAdd, false);
			//setButton(f.btnMod, true);
			//setButton(f.btnSave, false);
			//setButton(f.btnDel, true);
			//setButton(f.btnCdDupChk, false);
			f.btnheightAdd.disabled		= false;
			f.btnLowAdd.disabled		= false;
			f.btnMod.disabled		= true;
			f.btnSave.disabled		= false;
			f.btnDel.disabled		= true;
			f.btnCdDupChk.disabled		= false;

			f.step.disabled			= true;
			f.uppercd.disabled		= true;
			f.tpcd.disabled			= false;
			f.codenm.disabled		= false;
			f.smscodetxt.disabled		= false;
			f.lupord.disabled		= false;
			f.useyn.disabled		= false;			
			break;

		case "U":
			//setButton(f.btnheightAdd, true);
			//setButton(f.btnLowAdd, true);
			//setButton(f.btnMod, true);
			//setButton(f.btnSave, false);
			//setButton(f.btnDel, false);
			//setButton(f.btnCdDupChk, false);
			f.btnheightAdd.disabled		= true;
			f.btnLowAdd.disabled		= true;
			f.btnMod.disabled		= true;
			f.btnSave.disabled		= false;
			f.btnDel.disabled		= false;
			f.btnCdDupChk.disabled		= true;

			f.step.disabled			= true;
			//f.uppercd.disabled		= false;
			//f.tpcd.disabled		= false;						
			f.codenm.disabled		= false;
			f.smscodetxt.disabled		= false;
			f.useyn.disabled		= false;
			sortNum();
		default:
			break;
	}
}


//��ȸ
function search() 
{	
	codeFlag = "SEARCH";
	var tran = new Trans();
	tran.setPageRow(999);
	tran.setSvc(SELECT_ID);
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.open("fQuery","f","/wisegrid.do");
	//tran.open("","f","/common.do");	
}

//��ȸ�� showDetail
function searchTree()
{	
	codeFlag = "SEARCH";
	//showDetail(SELECT_ID, -1, f);
	setMode("I");
	f.orguppercd.value = f.uppercd.value;
	f.orgcode.value = f.tpcd.value;
}

//Ʈ�� ��Ŭ���� showDetail
function onClickTree(obj, idx, step)
{
	codeFlag = "SELECT";
	sortIdx = idx;
	sortObj = obj;
	sortStep = step;
	
	showDetail(SELECT_ID, idx, f);	
	setMode("U");
	if(step == 1)
	{
		f.useyn.disabled = true;
	}
	f.orguppercd.value = f.uppercd.value;
	f.orgcode.value = f.tpcd.value;
}


function codeAction()
{
	if(f.DB_SERVICEMODE.value == "TEST_")
	{
		ifmCode.location.href = f.codeReload.value;
	}	
	else
	{
	ifmCode.location.href = f.SERVER1.value + f.codeReload.value;	
	ifmCode.location.href = f.SERVER2.value + f.codeReload.value;
	}
}



//��з��ڵ��϶� ���İ� ���� �Ұ�
function sortNum()
{
	if(f.tpcd.value == "000" && f.lupord.value == 0){
		f.lupord.disabled		= true;
	}
	else 
		{
			f.lupord.disabled	= false;
		}
}


//���� ���� ����(�Ѵܰ� ����)
function sortUp()
{
	var newSort = f.lupord.value;					//���簪

	if(DataSet.getParam(SELECT_ID, 1, sortIdx, "tpcd") == "000")
	{
		alert("��з��� �ű�� �����ϴ�");
	}
	else
	{
		if(DataSet.getParam(SELECT_ID, 1, sortIdx-1, "tpcd") == "000")
		{
			alert("���ڵ尡 �޶� �ű�� �����ϴ�");
		}
		else {
			//���簪�� 1�ܰ� ���� sortseq���� �ִ´�.	
			f.lupord.value = DataSet.getParam(SELECT_ID, 1, sortIdx-1, "lupord")
			save();		
			sortIdx = sortIdx-1;	
			showDetail(SELECT_ID, sortIdx, f);			
			f.orguppercd.value = f.uppercd.value;
			f.orgcode.value = f.tpcd.value;	
			f.lupord.value = newSort;
			save();		
		}	
	}
}

//���� ���� ����(�Ѵܰ� ������)
function sortDown()
{
	var newSort = f.lupord.value;					//���簪
	
	if(DataSet.getParam(SELECT_ID, 1, sortIdx, "tpcd") == "000")
	{
		alert("��з��� �ű�� �����ϴ�");
	}
	else{
		
		if(DataSet.getParam(SELECT_ID, 1, parseInt(sortIdx)+1, "tpcd") == "000")
		{
			alert("���ڵ尡 �޶� �ű�� �����ϴ�");
		}
		else {
			f.lupord.value = DataSet.getParam(SELECT_ID, 1, parseInt(sortIdx)+1, "lupord")
			save();		
			sortIdx = parseInt(sortIdx)+1;	
			showDetail(SELECT_ID, sortIdx, f);			
			f.orguppercd.value = f.uppercd.value;
			f.orgcode.value = f.tpcd.value;	
			f.lupord.value = newSort;
			save();		
		}	
	}
}

//��� ������ ���ڵ� + �ڵ� ���翩�� üũ
function getPkValidation()
{	
	if(DataSet.getTotalCount(SELECT_ID, 1, "tpcd") < 1) 
	{	//ó������ �� �Է½�
		return true;		
	}
	else
	{	
		var pkCodeArr=DataSet.getParamArr(SELECT_ID, 1, "tpcd"); 
		var pkUppercdArr=DataSet.getParamArr(SELECT_ID, 1, "uppercd");
		for(i=0; i<pkUppercdArr.length; i++){
			if( gsXaFlag == "HA" || gsXaFlag =="LA")
			{
				if(pkUppercdArr[i] == f.uppercd.value){
					if(pkCodeArr[i] == f.tpcd.value){
						alert("���ڵ� + �ڵ尪�� �̹� ���� �մϴ�.");
						f.uppercd.focus();
						return false;
					}
				}
			}
			else (gsXaFlag == "U")
			{
				/*if( i != sortIdx ){
					if(pkUppercdArr[i] == f.uppercd.value){
						if(pkCodeArr[i] == f.tpcd.value){
							alert("���ڵ� + �ڵ尪�� �̹� ���� �մϴ�.");	
							f.uppercd.focus();
							return false;
						}
					}
				}*/
			}
		}
		return true;
	}	
}

//����Ű ��ȸ
function checkEnterKey()
{
	if(isEnterKey())
	{
		search();
	}
}

//��Ͻ� ���ǿ� �°� Ŭ����
function selfClear(f)
{
	if (!f) f = document.forms[0];

	if (f!=null)
	{	
		for (var i=0; i<f.length; i++)
		{ 
			//��з� ���
			if( gsXaFlag == "HA" )
			{	
				//�ڵ屸�� ��з�			
				if(f.elements[i].name == "step")
				{		
					f.elements[i].value=1;
				}
				//�ڵ尪 000
				else if(f.elements[i].name == "tpcd")
				{
					f.elements[i].value="000";
				}
				//���İ� 0
				else if(f.elements[i].name == "lupord")
				{
					f.elements[i].value=0;
				}
				//��뿩�� �⺻�� = ���
				else if(f.elements[i].name == "useyn")
				{
					f.elements[i].value="Y";
				}
				//������ Clear
				else {
					if (f.elements[i].type == "select-one")
						f.elements[i].selectedIndex=0;
					else if((f.elements[i].type == "text") || (f.elements[i].type == "textarea"))
						f.elements[i].value = "";
				}				
			}
			//�Һз� ���
			else if ( gsXaFlag == "LA" )
			{
				//�ڵ屸�� �Һз�
				if(f.elements[i].name == "step" && f.elements[i].value != "" )
				{		
					f.elements[i].value=3;
				}
				//��뿩�� �⺻�� = ���
				else if(f.elements[i].name == "useyn")
				{
					f.elements[i].value="Y";
				}
				//���ڵ带 ������ ������ Clear
				else if(f.elements[i].name != "uppercd"  )
				{
					if (f.elements[i].type == "select-one")
						f.elements[i].selectedIndex=0;
					else if((f.elements[i].type == "text") || (f.elements[i].type == "textarea"))
						f.elements[i].value = "";
				}
			}
		}		
	}
}

//tree��ġ��
function treeUpView(){
	UCSYS004S_tree.fold = "down";
	UCSYS004S_step.funviewing = "false";
	search();
}

//tree����
function treeDownView(){
	UCSYS004S_tree.fold = "up";	
	UCSYS004S_step.funviewing = "true";
	search();
}

