
var SELECT_CODEBOOK_ID  = "UCSYS001S";		//조회
var SELECT_CODEBOOK_ID1 = "UCSYS002S";		//상세조회
var SELECT_CODEBOOK_ID2 = "UCSYS003S";		//중복채크
var INSERT_CODEBOOK_ID  = "UCSYS002I";		//등록
var UPDATE_CODEBOOK_ID  = "UCSYS003U";		//수정
var DELETE_CODEBOOK_ID  = "UCSYS004D";		//삭제

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
	tran.setSvc(SELECT_CODEBOOK_ID);
	tran.setPageRow(9999);
	tran.setWiseGrid("1");
	tran.setDefClick(true);
	tran.setForwardId("wgdsl","");
	tran.open("fQuery","f","/wisegrid.do");
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
* 중복체크 버튼
********************/
function codeDupChk()
{
	if(f.uppercd.value == "")
	{
		alert("대분류 코드를 입력하세요.");
		return;
	}
	if(f.code.value == "")
	{
		alert("소분류코드를 입력하세요.");
		return;
	}

	var tran = new Trans();
	tran.setPageRow(1);
	tran.setSvc(SELECT_CODEBOOK_ID2);
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

	if(DataSet.getParam(SELECT_CODEBOOK_ID1, 1, 0, "step") == 1)
	{
		f.code.disabled = true;
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
		f.code.focus();
	}
}

function codeChange()
{
	dupChkFlag				= false;
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
	else
	{
		//등록일때			
		if (gsXaFlag == "HA" || gsXaFlag == "LA")
		{
			if(!confirm("등록 하시겠습니까?")) return;
			var tran = new Trans();
			tran.setSvc(INSERT_CODEBOOK_ID);
			tran.open("f","f","/common.do");
		}
		//수정일때
		else if (gsXaFlag == "U")
		{
			if(!confirm("수정 하시겠습니까?")) return;
			var tran = new Trans();
			tran.setSvc(UPDATE_CODEBOOK_ID);
			tran.open("f","f","/common.do");		
		}
	}
}

/********************
* 삭제 버튼
********************/
function del()
{
	if (f.code.value == "" || f.uppercd.value == "")
	{
		return;
	}	
	if(f.code.value == "")
	{
		alert("코드북 전체를 삭제할수 없습니다.");
	}
	else if (confirm(f.codenm.value + "("  + f.uppercd.value + f.code.value+ ") " + "Code를 삭제하시겠습니까?"))
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
* 콜백함수
********************/
function callback(sid)
{
	/**************************/
	//등록
	if(sid == INSERT_CODEBOOK_ID)
	{
		if (DataSet.getParam(INSERT_CODEBOOK_ID, 1, 0, "SUCCESS_COUNT") > 0){
			clear(f);
			//clear(fQuery);
			codeAction();			//등록된 코드갑 메모리 캐쉬에 적용
		}
	}

	/**************************/
	//수정
	else if(sid == UPDATE_CODEBOOK_ID)
	{	
		if (DataSet.getParam(UPDATE_CODEBOOK_ID, 1, 0, "SUCCESS_COUNT") > 0){
			clear(f);
			//clear(fQuery);
			codeAction();			//수정된 코드갑 메모리 캐쉬에 적용
		}
	}

	/**************************/
	//삭제
	else if(sid == DELETE_CODEBOOK_ID)
	{	
		if (DataSet.getParam(DELETE_CODEBOOK_ID, 1, 0, "SUCCESS_COUNT") > 0){
			clear(f);
			//clear(fQuery);
			codeAction();			//삭제된 코드갑 메모리 캐쉬에 적용
		}
	}

	/**************************/
	//조회
	else if(sid == SELECT_CODEBOOK_ID)
	{
		document.all(SELECT_CODEBOOK_ID).CollapseTreeAll();
		clear(f);
	}

	/**************************/
	//상세조회
	else if(sid == SELECT_CODEBOOK_ID1)
	{
		f.orguppercd.value = f.uppercd.value;
		f.orgcode.value = f.code.value;
	}

	/**************************/
	//중복체크
	else if(sid == SELECT_CODEBOOK_ID2)
	{
		if(DataSet.getParam(SELECT_CODEBOOK_ID2, 1, 0, "cnt") == 0)
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
	else if(sid == "codebook")
	{
		makeTree();
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
  * 수정된 코드값을 서버 메모리에 반영한다.
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

//대분류코드일때 정렬값 변경 불가
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

//엔터키 조회
function checkEnterKey()
{
	if(isEnterKey())
	{
		makeTree();
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
				else if(f.elements[i].name == "code")
				{
					f.elements[i].value="000";
				}
				//정렬값 0
				else if(f.elements[i].name == "sortseq")
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

/**
 * 수정된 코드값을 서버 메모리에 반영한다.
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
