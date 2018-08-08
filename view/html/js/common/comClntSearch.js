var SELECT_ID	= "UCCUS001S";	

var g_clnt_ssn = "";

var g_rowIdx;
var gridObj;

function init()
{
	document.all("corp_cd").value = "00";

	gridObj = document.all(SELECT_ID);

	fQuery.q_clnt_nm.focus();

	if(fQuery.clntGbn.value == "CALL")
	{
		if(fQuery.q_clnt_no.value != "")	//넘어온 파라미터 중 고객번호, 전화번호 있을 경우 고객번호 조건만 타도록 처리.
		{
			fQuery.callNo.value == "";	
		}
		queryList();
	}
	else if(fQuery.clntGbn.value == "ENTER")
	{
		document.all("q_clnt_nm").value = opener.document.all("clnt_nm").value;
		queryList();
	}
}

function xeCure(command)
{
	if(command == "encrypt")
		openPopup("/jsp/customer/crsClntSsnXecure.jsp", "command=encrypt&input="+document.all("qq_clnt_ssn").value+"&row="+0,"xecure", "1024", "800", "0", "0", "scrollbars=no, status=no");
}

function queryList()
{
	if(fQuery.q_clnt_nm.value == "" 
		&& fQuery.q_clnt_ssn.value == "" 
		&& fQuery.q_clnt_no.value == "" 
		&& fQuery.searchType.value == "" 
		&& fQuery.callNo.value == "")
	{
		MessageBox("InputFail", "E", "검색조건");
		fQuery.q_clnt_nm.focus();
		return;
	}

	if(fQuery.searchType.value && !fQuery.searchText.value)
	{
		MessageBox("Required", "E", "검색단어");
		fQuery.searchText.focus();
		return;
	}
	if(!fQuery.searchType.value && fQuery.searchText.value)
	{
		MessageBox("Required", "E", "검색어");
		fQuery.searchType.focus();
		return;
	}

	gridObj.setParam("hdp_n_format", "TEL");
	gridObj.setParam("hm_phn_n_format", "TEL");
	gridObj.setParam("offc_phn_n_format", "TEL");


	var tran = new Trans();
	tran.setSvc(SELECT_ID);
	tran.setDefClick(true);
	tran.setPageRow("50");			// 1Page에 몇 개의 Row를 출력할 것인가?			
	tran.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	tran.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	tran.open("fQuery","f","/xecure.do");
//	tran.open("fQuery","f","/wisegrid.do");

//	var tran = new Trans();
//	tran.setSvc(SELECT_ID);
//	tran.setDefClick(true);
//	tran.setPageRow("50");			// 1Page에 몇 개의 Row를 출력할 것인가?			
//	tran.open("fQuery","f","/xecure.do");
}

/**********************
* 상세정보
**********************/
function showDetailO_obj(id, strColumnKey, nRow)	//원클릭
{
	if(DataSet.getTotalCount(id) < 1)
		return;
		
	switch(id)
	{
		case SELECT_ID:
			
			g_rowIdx = nRow;
			
			break;
		
		default:
			break;
	}
}

/**********************
* 상세정보
**********************/
function showDetailB_obj(id, strColumnKey, nRow)	//더블클릭
{
	if(DataSet.getTotalCount(id) < 1)
		return;
		
	switch(id)
	{
		case SELECT_ID:	
			
			g_rowIdx = nRow;
			apply();

			break;
		
		default:
			break;
	}
}

/**********************
* 적용
**********************/
function apply()
{
	var clnt_no		= "";
	var call_no		= "";
	var clnt_ssn	= "";

	if(DataSet.getTotalCount(SELECT_ID) < 1)
	{
		call_no = document.all("callNo").value;
	}	
	else
	{
		clnt_no		= gridObj.GetCellValue("clnt_no", g_rowIdx );
		clnt_ssn	= gridObj.GetCellValue("clnt_ssn", g_rowIdx );
	}

	opener.setClntInfo(clnt_no, call_no, clnt_ssn);
	window.close();
}

 
function callback(svcid)
{

	switch(svcid)
	{
		case SELECT_ID:

			var tot_cnt = DataSet.getTotalCount(SELECT_ID);

			var ssn = "";

			for(var i=0; i < tot_cnt; i++)
			{
				ssn = DataSet.getParam(SELECT_ID, 1, i, "clnt_ssn");
			}	

			if(document.all("clntGbn").value == "CALL")
			{
				//if(tot_cnt < 1)
					apply();
			}
			
			break;

		default:
			break;
	}
}

function unload()
{
}