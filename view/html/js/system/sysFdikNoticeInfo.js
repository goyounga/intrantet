/*
	1. 각 사용자에게 할당된 부서정보가 부서테이블에 없을 경우 출력되지 않도록 하였음.
	   그렇기 때문에 사용자 정보가 테이블에 있는데도 조회되지 않을 수 있음.
	2. 상위 부서를 선택하면 하위 부서들에 속한 사용자만 출력됨.
	   또한 사용여부가 사용인 부서의 사용자만 조회됨.
	3. 사용자 정보를 받을때는 opener의 이름이 메인인 경우와 메인이 아닌경우로 나뉘어
	   해당 opener로 getOrgUserInfo(user_id, user_name, user_dept) 함수를 이용하여 정보를 넘겨줌.
*/

var SELECT_NOTICE_ID = "UCSYS094S";

var grid1 = new comGrid(); //공지사항

function init()
{	
	query();
}

//조회
function query()
{	
	var tran = new Trans();
	tran.setPageRow(20);
	tran.setSvc(SELECT_NOTICE_ID);
	tran.open("fQuery","fQuery","/common.do");		
}


/*
그리드 onclick 이벤트 함수 
*/
function showDetailO_obj(obj){
	var descHtml="";
	if (obj.cells[0].id == SELECT_NOTICE_ID+"_IDX"){//공지사항 그리드클릭시
		grid1.rowIndex = getRowIndex(obj);
		grid1.rowObj = obj;
		if(!comShowDetail(SELECT_NOTICE_ID,obj,f)){
		}
		else{
			showDetail(SELECT_NOTICE_ID, grid1.rowIndex,f);
			openFdikNoticeDetail(obj);			
		}
	}
}
function openFdikNoticeDetail(obj)
{
	location.href="/jsp/system/sysFdikNoticeDetailInfo.jsp?seq_no="+f.seq_no.value;
	return;
}

function popupClose()
{
	window.close();
}

//엔터키 조회
function checkEnterKey()
{
	if(isEnterKey())
	{
		query();
	}
}

function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_NOTICE_ID:
		/*
			if(fQuery.idx.value != null)
			{
				showDetail(SELECT_NOTICE_ID, fQuery.idx.value, fQuery);	
				clear(fQuery)
				fQuery.idx.value = null;
			}
		*/
			/*
			스크립트 리스트에서 캠페인이 이스크립트를 사용하고 있다면 리스트에서 텍스트 색깔을  바꾼다. 
			*/
			/*
			var objTbl = document.all[SELECT_NOTICE_ID];
			var noticeArry = DataSet.getParamArr(SELECT_NOTICE_ID,1,"noticetype_nm");
			for(var i=0; i< noticeArry.length; i++){
				if( noticeArry[i] == "긴급"){
					objTbl.rows[i].style.color = "red";
				}
				else{
					objTbl.rows[i].style.color = "#555555";
				}
			}
			*/
			break;
		default : 
			break;
	}				
}	