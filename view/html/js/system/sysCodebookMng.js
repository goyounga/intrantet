
var SELECT_CODEBOOK_ID  = "UCSYS001S";		//��ȸ
var SELECT_CODEBOOK_ID1 = "UCSYS002S";		//����ȸ
var SELECT_CODEBOOK_ID2 = "UCSYS003S";		//�ߺ�äũ
var INSERT_CODEBOOK_ID  = "UCSYS002I";		//���
var UPDATE_CODEBOOK_ID  = "UCSYS003U";		//����
var DELETE_CODEBOOK_ID  = "UCSYS004D";		//����

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
	tran.setSvc(SELECT_CODEBOOK_ID);
	tran.setPageRow(9999);
	tran.setWiseGrid("1");
	tran.setDefClick(true);
	tran.setForwardId("wgdsl","");
	tran.open("fQuery","f","/wisegrid.do");
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
//	showDetail(SELECT_CODEBOOK_ID, nRow, f);
	var obj = document.all[SELECT_CODEBOOK_ID];
	var sKey = obj.GetTreeKeyFromRowIndex(nRow);
	var upcd =sKey.substring(0,6);
	var cd   =sKey.substring(6);
	
	var tran = new Trans();
	tran.setSvc(SELECT_CODEBOOK_ID1);
	tran.setPageRow(9999);
	tran.setMyUserParams("upcd", upcd);
	tran.setMyUserParams("cd", cd);
	tran.open("f","f","/common.do");
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
	if(f.code.value == "")
	{
		alert("�Һз��ڵ带 �Է��ϼ���.");
		return;
	}

	var tran = new Trans();
	tran.setPageRow(1);
	tran.setSvc(SELECT_CODEBOOK_ID2);
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

	if(DataSet.getParam(SELECT_CODEBOOK_ID1, 1, 0, "step") == 1)
	{
		f.code.disabled = true;
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
		f.code.focus();
	}
}

function codeChange()
{
	dupChkFlag				= false;
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
	else
	{
		//����϶�			
		if (gsXaFlag == "HA" || gsXaFlag == "LA")
		{
			if(!confirm("��� �Ͻðڽ��ϱ�?")) return;
			var tran = new Trans();
			tran.setSvc(INSERT_CODEBOOK_ID);
			tran.open("f","f","/common.do");
		}
		//�����϶�
		else if (gsXaFlag == "U")
		{
			if(!confirm("���� �Ͻðڽ��ϱ�?")) return;
			var tran = new Trans();
			tran.setSvc(UPDATE_CODEBOOK_ID);
			tran.open("f","f","/common.do");		
		}
	}
}

/********************
* ���� ��ư
********************/
function del()
{
	if (f.code.value == "" || f.uppercd.value == "")
	{
		return;
	}	
	if(f.code.value == "")
	{
		alert("�ڵ�� ��ü�� �����Ҽ� �����ϴ�.");
	}
	else if (confirm(f.codenm.value + "("  + f.uppercd.value + f.code.value+ ") " + "Code�� �����Ͻðڽ��ϱ�?"))
	{
		if(f.code.value == "000")
		{
			f.code.value ="";
		}
		
		var tran = new Trans();
		tran.setSvc(DELETE_CODEBOOK_ID);
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
	if(sid == INSERT_CODEBOOK_ID)
	{
		if (DataSet.getParam(INSERT_CODEBOOK_ID, 1, 0, "SUCCESS_COUNT") > 0){
			clear(f);
			//clear(fQuery);
			codeAction();			//��ϵ� �ڵ尩 �޸� ĳ���� ����
		}
	}

	/**************************/
	//����
	else if(sid == UPDATE_CODEBOOK_ID)
	{	
		if (DataSet.getParam(UPDATE_CODEBOOK_ID, 1, 0, "SUCCESS_COUNT") > 0){
			clear(f);
			//clear(fQuery);
			codeAction();			//������ �ڵ尩 �޸� ĳ���� ����
		}
	}

	/**************************/
	//����
	else if(sid == DELETE_CODEBOOK_ID)
	{	
		if (DataSet.getParam(DELETE_CODEBOOK_ID, 1, 0, "SUCCESS_COUNT") > 0){
			clear(f);
			//clear(fQuery);
			codeAction();			//������ �ڵ尩 �޸� ĳ���� ����
		}
	}

	/**************************/
	//��ȸ
	else if(sid == SELECT_CODEBOOK_ID)
	{
		document.all(SELECT_CODEBOOK_ID).CollapseTreeAll();
		clear(f);
	}

	/**************************/
	//����ȸ
	else if(sid == SELECT_CODEBOOK_ID1)
	{
		f.orguppercd.value = f.uppercd.value;
		f.orgcode.value = f.code.value;
	}

	/**************************/
	//�ߺ�üũ
	else if(sid == SELECT_CODEBOOK_ID2)
	{
		if(DataSet.getParam(SELECT_CODEBOOK_ID2, 1, 0, "cnt") == 0)
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
	else if(sid == "codebook")
	{
		makeTree();
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
			f.btnheightAdd.disabled		= false;
			f.btnLowAdd.disabled		= false;
			f.btnMod.disabled			= false;
			f.btnSave.disabled			= true;
			f.btnDel.disabled			= false;
			f.btnCdDupChk.disabled		= true;

			f.step.disabled				= true;
			f.uppercd.disabled			= true;
			f.code.disabled				= true;
			f.codenm.disabled			= true;
			f.etc1.disabled				= true;
			f.etc2.disabled				= true;
			f.etc3.disabled				= true;
			f.sortseq.disabled			= true;
			f.useyn.disabled			= true;
			f.rg_nm.disabled			= true;
			f.rg_dt.disabled			= true;
			f.rg_tm.disabled			= true;
			f.mdf_nm.disabled			= true;
			f.mdf_dt.disabled			= true;
			f.mdf_tm.disabled			= true;
			
			break;

		case "I":
			f.btnheightAdd.disabled		= false;
			f.btnLowAdd.disabled		= true;
			f.btnMod.disabled			= true;
			f.btnSave.disabled			= true;
			f.btnDel.disabled			= true;
			f.btnCdDupChk.disabled		= false;

			f.step.disabled			= true;
			f.uppercd.disabled		= true;
			f.code.disabled			= true;						
			f.codenm.disabled		= true;
			f.etc1.disabled			= true;
			f.etc2.disabled			= true;
			f.etc3.disabled			= true;
			f.sortseq.disabled		= true;
			f.useyn.disabled		= true;	
			break;

		case "HA":
			f.btnheightAdd.disabled		= false;
			f.btnLowAdd.disabled		= true;
			f.btnMod.disabled			= true;
			f.btnSave.disabled			= false;
			f.btnDel.disabled			= true;
			f.btnCdDupChk.disabled		= false;

			f.step.disabled			= true;
			f.uppercd.disabled		= false;
			f.code.disabled			= true;
			f.codenm.disabled		= false;
			f.etc1.disabled			= false;
			f.etc2.disabled			= false;
			f.etc3.disabled			= false;
			f.sortseq.disabled		= true;
			f.useyn.disabled		= false;
			break;

		case "LA":
			f.btnheightAdd.disabled		= false;
			f.btnLowAdd.disabled		= false;
			f.btnMod.disabled			= true;
			f.btnSave.disabled			= false;
			f.btnDel.disabled			= true;
			f.btnCdDupChk.disabled		= false;

			f.step.disabled			= true;
			f.uppercd.disabled		= true;
			f.code.disabled			= false;
			f.codenm.disabled		= false;
			f.etc1.disabled			= false;
			f.etc2.disabled			= false;
			f.etc3.disabled			= false;
			f.sortseq.disabled		= false;
			f.useyn.disabled		= false;			
			break;

		case "U":
			f.btnheightAdd.disabled		= true;
			f.btnLowAdd.disabled		= true;
			f.btnMod.disabled			= true;
			f.btnSave.disabled			= false;
			f.btnDel.disabled			= false;
			f.btnCdDupChk.disabled		= true;

			f.step.disabled			= true;
			//f.uppercd.disabled		= false;
			//f.code.disabled			= false;						
			f.codenm.disabled		= false;
			f.etc1.disabled			= false;
			f.etc2.disabled			= false;
			f.etc3.disabled			= false;
			f.useyn.disabled		= false;
			sortNum();
		default:
			break;
	}
}

/**
  * ������ �ڵ尪�� ���� �޸𸮿� �ݿ��Ѵ�.
  */
function codeAction()
{
	var tran=new Trans();
	tran.setSvc("codebook");
	tran.setUserParams("flag=codebook");
	tran.setAsync(false);
	tran.open("","","/cachereaction.do");
	
	var tran=new Trans();
	tran.setSvc("codebook");
	tran.setUserParams("flag=codebook");
	tran.setAsync(false);
	tran.open("","","http://222.112.196.235:89/cachereaction.do");
}

//��з��ڵ��϶� ���İ� ���� �Ұ�
function sortNum()
{
	if(f.code.value == "000" && f.sortseq.value == 0){
		f.sortseq.disabled		= true;
	}
	else 
		{
			f.sortseq.disabled	= false;
		}
}

//����Ű ��ȸ
function checkEnterKey()
{
	if(isEnterKey())
	{
		makeTree();
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
				else if(f.elements[i].name == "code")
				{
					f.elements[i].value="000";
				}
				//���İ� 0
				else if(f.elements[i].name == "sortseq")
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

/**
 * ������ �ڵ尪�� ���� �޸𸮿� �ݿ��Ѵ�.
 **/
function codereload()
{
	//for TEST SERVER
	var trans = new Trans();
	trans.setSvc("codebook");
	trans.setTranLog("N");
	trans.setMyUserParams("flag", "codebook");
	trans.open("","","/cachereaction.do");
}
