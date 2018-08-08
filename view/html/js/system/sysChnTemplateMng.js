function on_Load()
{
	objectControl(false, true, true, true);
	on_Search();
}

/**
 *	채널유형 선택시 타입에 따라 템플릿경로를 활성/비활성한다.
 **/
function on_Change(obj)
{
	// 채널타입이 SMS인 경우는 비활성화
	if( "02" == obj.value || "" == obj.value )	pathBtn.disabled = true;
	else  										pathBtn.disabled = false;
}

/**
 *	Object Clear
 *  ages1 : 등록 버튼 disabled 여부
 *	ages2 : 저장/삭제 버튼 disabled 여부
 * 	ages3 : form object readOnly/disabled 여부
 **/
function objectControl( ages1, ages2, ages3, ages4 )
{
	// 저장/삭제 버튼 비활성화
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
 *	그리드 클릭시 상세 정보를 보여준다.
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
 *	등록 버튼 클릭시
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
 *	조회 버튼 클릭시
 **/
function on_Search()
{
	var tran = new Trans();
	tran.setSvc("UCSYS001S");
	tran.open("fQuery","f","/common.do");
}

/**
 *	저장 버튼 클릭시
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
 *	삭제 버튼 클릭시
 **/
function on_Delete()
{
	if( confirm("삭제하시겠습니까?") )
	{
		if (getValidation(fQuery, true) == false) return;

		var tran = new Trans();
		tran.setSvc("UCSYS001D");
		tran.open("f","f","/common.do");
	}
	
}


/**
 *	저장후 콜백
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
 *	템플릿 경로 돋보기 클릭시
 **/
function openFileDir()
{
	if (getValidation(fQuery, true) == false) return;
	
	var chnType = f.channeltype.value;
	
	if( "" == chnType )
	{
		alert("채널유형은 필수선택 항목입니다.");
		return;
	}
	
	window.open("/jsp/common/comFilePath.jsp?dirType="+chnType, "dirWin", "toolbar=no,scrollbars=no,top=0,left=300,width=320,height=250");	
}

/**
 *	템플릿 파일 경로를 돌려준다.
 **/
function setFilePath(fileNm)
{
	f.templatepath.value= fileNm;
}