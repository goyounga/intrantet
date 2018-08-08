/*
	1. 각 사용자에게 할당된 부서정보가 부서테이블에 없을 경우 출력되지 않도록 하였음.
	   그렇기 때문에 사용자 정보가 테이블에 있는데도 조회되지 않을 수 있음.
	2. 상위 부서를 선택하면 하위 부서들에 속한 사용자만 출력됨.
	   또한 사용여부가 사용인 부서의 사용자만 조회됨.
	3. 사용자 정보를 받을때는 opener의 이름이 메인인 경우와 메인이 아닌경우로 나뉘어
	   해당 opener로 getOrgUserInfo(user_id, user_name, user_dept) 함수를 이용하여 정보를 넘겨줌.
*/
var SCHEDULEMANAGE_ID= "UCSYS091S";		//일정관리 

function init()
{	
	query();
}

//조회
function query()
{	
	var tran = new Trans();
	tran.setPageRow(999);
	tran.setSvc(SCHEDULEMANAGE_ID);
	tran.open("fQuery","fQuery","/common.do");
}

function popupClose()
{
	window.close();
}

function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SCHEDULEMANAGE_ID:
			showDetail(SCHEDULEMANAGE_ID, 0, fQuery);	
			break;
		default : 
			break;
	}				
}	