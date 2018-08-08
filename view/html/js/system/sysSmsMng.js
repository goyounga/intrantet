var SELECT_ID	= "UCSYS004S";			//조회	
var SELECT_ID1	= "UCSYS005S";			//상세조회
var SELECT_ID2	= "UCSYS006S";			//중복체크
var INSERT_ID	= "UCSYS003I";			//등록  UCSYS002I
var UPDATE_ID	= "UCSYS004U";			//수정
var DELETE_ID	= "UCSYS005D";			//삭제

var codeFlag = "";
var dupChkFlag = false;

var sortIdx = -1;
var sortObj;
var sortStep;

//초기설정
function init()
{	
	//모드변경
	setMode("INIT");

	//트리 그리기
	makeTree();
}

/********************
* 트리구조 
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
* 트리 클릭이벤트
********************/
function treeClick(obj, strTreeKey, strArea)
{
}

/********************
* 상세정보 이벤트
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	setMode("INIT");
	showDetail(SELECT_ID, nRow, f);
}

/********************
* 중복체크 버튼
********************/
function codeDupChk()
{
	if(f.uppercd.value == "")
	{
		alert("대분류 코드를 입력하세요.");
		return;
	}
	if(f.tpcd.value == "")
	{
		alert("소분류코드를 입력하세요.");
		return;
	}

	var tran = new Trans();
	tran.setPageRow(1);
	tran.setSvc(SELECT_ID2);
	tran.open("f","f","/common.do");

	//dupChkFlag
}

/********************
* 수정 버튼
********************/
function codeMod()
{
	dupChkFlag = true;
	setMode("U");		//모드
	selfClear("f");

	if(DataSet.getParam(SELECT_ID1, 1, 0, "step") == 1)
	{
		f.tpcd.disabled = true;
	}
}

/********************
* 대분류등록 버튼
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
* 소분류등록 버튼
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
* 저장 버튼
********************/
function save()
{
	
	if(f.uppercd.value=="")
	{
		alert("대분류 코드를 입력해주세요");
		f.uppercd.focus();
		return;
	}else if(f.codenm.value=="")
	{
		alert("코드명을 입력해주세요");
		f.codenm.focus();
		return;
	};
	
	
	if(dupChkFlag == false)
	{
		alert("중복체크를 하세요.");
		return;
	}

	if(getValidation(f,true)== false) return;
	else if(getPkValidation() == false) return;
	else
	{
		//등록일때			
		if (gsXaFlag == "HA" || gsXaFlag == "LA")
		{
			if(!confirm("등록 하시겠습니까?")) return;
			var tran = new Trans();
			tran.setSvc(INSERT_ID);
			tran.open("f","f","/common.do");
		}
		//수정일때
		else if (gsXaFlag == "U")
		{
			if(!confirm("수정 하시겠습니까?")) return;
			var tran = new Trans();
			tran.setSvc(UPDATE_ID);
			tran.open("f","f","/common.do");	
		}
	}
}

/********************
* 삭제 버튼
********************/
function del()
{
	if (f.tpcd.value == "" || f.uppercd.value == "")
	{
		return;
	}	
	if(f.tpcd.value == "")
	{
		alert("코드북 전체를 삭제할수 없습니다.");
	}
	else if (confirm(f.codenm.value + "("  + f.uppercd.value + f.tpcd.value+ ") " + "Code를 삭제하시겠습니까?"))
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
* 콜백함수
********************/
function callback(sid)
{
	/**************************/
	//등록
	if(sid == INSERT_ID)
	{
		if (DataSet.getParam(INSERT_ID, 1, 0, "SUCCESS_COUNT") > 0)
		{
			clear(f);
			//clear(fQuery);
			makeTree();
			codeAction();			//등록된 코드갑 메모리 캐쉬에 적용
		}
	}

	/**************************/
	//수정
	else if(sid == UPDATE_ID)
	{	
		if (DataSet.getParam(UPDATE_ID, 1, 0, "SUCCESS_COUNT") > 0)
		{
			clear(f);
			//clear(fQuery);
			makeTree();
			codeAction();			//수정된 코드갑 메모리 캐쉬에 적용
		}
	}

	/**************************/
	//삭제
	else if(sid == DELETE_ID)
	{	
		if (DataSet.getParam(DELETE_ID, 1, 0, "SUCCESS_COUNT") > 0)
		{
			clear(f);
			//clear(fQuery);
			makeTree();
			codeAction();			//삭제된 코드갑 메모리 캐쉬에 적용
		}
	}

	/**************************/
	//조회
	else if(sid == SELECT_ID)
	{
		clear(f);
	}

	/**************************/
	//상세조회
	else if(sid == SELECT_ID1)
	{
		f.orguppercd.value = f.uppercd.value;
		f.orgcode.value = f.tpcd.value;
	}

	/**************************/
	//중복체크
	else if(sid == SELECT_ID2)
	{
		if(DataSet.getParam(SELECT_ID2, 1, 0, "cnt") == 0)
		{
			alert("사용가능한 코드입니다.");
			dupChkFlag = true;
			//setButton(f.btnCdDupChk, true);
			f.btnCdDupChk.disabled = true;
		}
		else
		{
			dupChkFlag = false;
			alert("이미 등록된 코드입니다.");
		}
	}
}

/********************
* 버튼 및 텍스트 상태 설정
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


//조회
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

//조회시 showDetail
function searchTree()
{	
	codeFlag = "SEARCH";
	//showDetail(SELECT_ID, -1, f);
	setMode("I");
	f.orguppercd.value = f.uppercd.value;
	f.orgcode.value = f.tpcd.value;
}

//트리 원클릭시 showDetail
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



//대분류코드일때 정렬값 변경 불가
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


//정렬 순서 변경(한단계 위로)
function sortUp()
{
	var newSort = f.lupord.value;					//현재값

	if(DataSet.getParam(SELECT_ID, 1, sortIdx, "tpcd") == "000")
	{
		alert("대분류는 옮길수 없습니다");
	}
	else
	{
		if(DataSet.getParam(SELECT_ID, 1, sortIdx-1, "tpcd") == "000")
		{
			alert("상세코드가 달라 옮길수 없습니다");
		}
		else {
			//현재값에 1단계 위의 sortseq값을 넣는다.	
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

//정렬 순서 변경(한단계 밑으로)
function sortDown()
{
	var newSort = f.lupord.value;					//현재값
	
	if(DataSet.getParam(SELECT_ID, 1, sortIdx, "tpcd") == "000")
	{
		alert("대분류는 옮길수 없습니다");
	}
	else{
		
		if(DataSet.getParam(SELECT_ID, 1, parseInt(sortIdx)+1, "tpcd") == "000")
		{
			alert("상세코드가 달라 옮길수 없습니다");
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

//등록 수정시 상세코드 + 코드 존재여부 체크
function getPkValidation()
{	
	if(DataSet.getTotalCount(SELECT_ID, 1, "tpcd") < 1) 
	{	//처음으로 값 입력시
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
						alert("상세코드 + 코드값이 이미 존재 합니다.");
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
							alert("상세코드 + 코드값이 이미 존재 합니다.");	
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

//엔터키 조회
function checkEnterKey()
{
	if(isEnterKey())
	{
		search();
	}
}

//등록시 조건에 맞게 클리어
function selfClear(f)
{
	if (!f) f = document.forms[0];

	if (f!=null)
	{	
		for (var i=0; i<f.length; i++)
		{ 
			//대분류 등록
			if( gsXaFlag == "HA" )
			{	
				//코드구분 대분류			
				if(f.elements[i].name == "step")
				{		
					f.elements[i].value=1;
				}
				//코드값 000
				else if(f.elements[i].name == "tpcd")
				{
					f.elements[i].value="000";
				}
				//정렬값 0
				else if(f.elements[i].name == "lupord")
				{
					f.elements[i].value=0;
				}
				//사용여부 기본값 = 사용
				else if(f.elements[i].name == "useyn")
				{
					f.elements[i].value="Y";
				}
				//나머지 Clear
				else {
					if (f.elements[i].type == "select-one")
						f.elements[i].selectedIndex=0;
					else if((f.elements[i].type == "text") || (f.elements[i].type == "textarea"))
						f.elements[i].value = "";
				}				
			}
			//소분류 등록
			else if ( gsXaFlag == "LA" )
			{
				//코드구분 소분류
				if(f.elements[i].name == "step" && f.elements[i].value != "" )
				{		
					f.elements[i].value=3;
				}
				//사용여부 기본값 = 사용
				else if(f.elements[i].name == "useyn")
				{
					f.elements[i].value="Y";
				}
				//상세코드를 제외한 나머지 Clear
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

//tree펼치기
function treeUpView(){
	UCSYS004S_tree.fold = "down";
	UCSYS004S_step.funviewing = "false";
	search();
}

//tree접기
function treeDownView(){
	UCSYS004S_tree.fold = "up";	
	UCSYS004S_step.funviewing = "true";
	search();
}

