function on_Load()
{
	objectControl(false, true, true, true);
	on_Search();
}

/**
 *	ä������ ���ý� Ÿ�Կ� ���� ���ø���θ� Ȱ��/��Ȱ���Ѵ�.
 **/
function on_Change(obj)
{
	// ä��Ÿ���� SMS�� ���� ��Ȱ��ȭ
	if( "02" == obj.value || "" == obj.value )	pathBtn.disabled = true;
	else  										pathBtn.disabled = false;
}

/**
 *	Object Clear
 *  ages1 : ��� ��ư disabled ����
 *	ages2 : ����/���� ��ư disabled ����
 * 	ages3 : form object readOnly/disabled ����
 **/
function objectControl( ages1, ages2, ages3, ages4 )
{
	// ����/���� ��ư ��Ȱ��ȭ
	document.getElementById("btnAdd").disabled = ages1;
	document.getElementById("btnSave").disabled = ages2;
	document.getElementById("btnDel").disabled = ages3;
	
	f.worktemplateid.value	= "";
	f.channeltype.value 	= "";	
	f.templatenm.value 		= "";	
	f.templatedesc.value 	= "";	
	f.templatepath.value 	= "";	
	f.useyn.value 			= "";
	
	f.channeltype.disabled 	= ages4;
	f.templatenm.readOnly 	= ages4;
	f.useyn.disabled 		= ages4;
	f.templatedesc.readOnly = ages4;
	
	f.mode.value			= "";
}

/**
 *	�׸��� Ŭ���� �� ������ �����ش�.
 **/
function showDetailO_obj(obj) 
{
	
	var index = getRowIndex(obj);
	showDetail("UCSYS001S", index, f);
	
	return;
	objectControl(false, false, false, false);
	
	f.channeltype.disabled = true;
	
	var curPageNo = DataSet.getCurPage("UCSYS001S");
	f.worktemplateid.value	= DataSet.getParam("UCSYS001S", curPageNo, getRowIndex(obj), "worktemplateid");
	f.channeltype.value 	= DataSet.getParam("UCSYS001S", curPageNo, getRowIndex(obj), "channeltype");
	f.templatenm.value 		= DataSet.getParam("UCSYS001S", curPageNo, getRowIndex(obj), "templatenm");
	f.templatedesc.value 	= DataSet.getParam("UCSYS001S", curPageNo, getRowIndex(obj), "templatedesc");
	f.templatepath.value 	= DataSet.getParam("UCSYS001S", curPageNo, getRowIndex(obj), "templatepath");
	f.useyn.value 			= DataSet.getParam("UCSYS001S", curPageNo, getRowIndex(obj), "useyn");
	
	f.mode.value			= "UPDATE";
	
	on_Change(f.channeltype);
	
}

/**
 *	��� ��ư Ŭ����
 **/
function addTemplate()
{
	objectControl(true, false, true, false);
	
	f.worktemplateid.value	= "";
	f.channeltype.value 	= "";	
	f.templatenm.value 		= "";	
	f.templatedesc.value 	= "";	
	f.templatepath.value 	= "";	
	f.useyn.value 			= "Y";	
	
	f.useyn.disabled = true;
	/*
	document.all("btnEdit").disabled = true;
	document.all("btnDel").disabled	 = true;
	*/
	
	f.mode.value			= "INSERT";
}

/**
 *	��ȸ ��ư Ŭ����
 **/
function on_Search()
{
	var tran = new Trans();
	tran.setSvc("UCSYS001S");
	tran.open("fQuery","f","/common.do");
}

/**
 *	���� ��ư Ŭ����
 **/
function on_Save()
{
	var tran = new Trans();
	
	var mode = f.mode.value;
	
	if( "UPDATE" == mode )
	{
		tran.setSvc("UCSYS001U");
	}
	else
	{
		if (getValidation(f, true) == false) return;
		
		tran.setSvc("UCSYS001I");
	}
	
	tran.open("f","f","/common.do");

}

/**
 *	���� ��ư Ŭ����
 **/
function on_Delete()
{
	if( confirm("�����Ͻðڽ��ϱ�?") )
	{
		if (getValidation(fQuery, true) == false) return;

		var tran = new Trans();
		tran.setSvc("UCSYS001D");
		tran.open("f","f","/common.do");
	}
	
}


/**
 *	������ �ݹ�
 **/
function callback(serviceId)
{
	if( "UCSYS001U" == serviceId || "UCSYS001I" == serviceId || "UCSYS001D" == serviceId )
	{
		objectControl(false, true, true, true);
		on_Search();
	}
	
}

/**
 *	���ø� ��� ������ Ŭ����
 **/
function openFileDir()
{
	if (getValidation(fQuery, true) == false) return;
	
	var chnType = f.channeltype.value;
	
	if( "" == chnType )
	{
		alert("ä�������� �ʼ����� �׸��Դϴ�.");
		return;
	}
	
	window.open("/jsp/common/comFilePath.jsp?dirType="+chnType, "dirWin", "toolbar=no,scrollbars=no,top=0,left=300,width=320,height=250");	
}

/**
 *	���ø� ���� ��θ� �����ش�.
 **/
function setFilePath(fileNm)
{
	f.templatepath.value= fileNm;
}