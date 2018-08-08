var DELETE_SERVICE_01 	= "UCINF021D";
var SELECT_SERVICE_01   = "UCINF021S";
var UPDATE_SERVICE_01	= "UCINF021U";   

/**
*	쪽지 목록
* author  하지윤   
* since   2009/08/19 	                                              
*/ 
function msgSendList()
{
	var userid = f.userid.value;
	var trans = new Trans();							
	trans.setSvc(SELECT_SERVICE_01);					// 쿼리ID
	trans.setMyUserParams("recv_id",userid);		
	trans.setWiseGrid("1");								// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");						// wisegrid를 사용하는 경우 반드시 추가
				
	trans.open("f", "f","/wisegrid.do");
}



/**
*	쪽지 보기
* author  하지윤   
* since   2009/08/21 	                                              
*/ 
function showDetailO_obj(id, strColumnKey, nRow)
{ 	
	var gridObj = document.all(SELECT_SERVICE_01);	
	
	var params = new StringBuffer();

		if( gridObj.GetCellValue("read_yn", nRow) != 'Y')
		{
				
			params.append("&send_dt=" + gridObj.GetCellValue("send_dt", nRow));
			params.append("&send_tm=" + gridObj.GetCellValue("send_tm", nRow));
			params.append("&send_id=" + gridObj.GetCellValue("send_id", nRow));
			params.append("&recv_id=" + f.userid.value);
			
			var trans = new Trans();
			trans.setSvc(UPDATE_SERVICE_01);						// 쿼리ID
			trans.setUserParams(params.toString());	
			trans.open("f", "f","/common.do");
			msgSendList()											// 리스트 호출	<==	열람 여부 Y로 바꿔서 보여줌
		}
		f.contents.value = gridObj.GetCellValue("contents",nRow);	//내용보기


}

/**
*	쪽지 삭제
* author  하지윤   
* since   2009/08/20 	                                              
*/ 
function msgRemove()
{
	
	var g_Obj = document.all(SELECT_SERVICE_01);

	var params = new StringBuffer();
	
	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("삭제할 쪽지를 선택하세요.");
		return;
	}	
	
	for( var i = g_Obj.GetRowCount()-1; i >=0 ; i-- )
	{
		if( g_Obj.GetCellValue("chk", i) == 1 )
		{
				
			params.append("&send_dt=" + g_Obj.GetCellValue("send_dt", i));
			params.append("&send_tm=" + g_Obj.GetCellValue("send_tm", i));
			params.append("&send_id=" + g_Obj.GetCellValue("send_id", i));
			params.append("&recv_id=" + f.userid.value);					
		}		
	}
	//alert(params.toString());	
	var trans = new Trans();
	trans.setSvc(DELETE_SERVICE_01);					// 쿼리ID
	trans.setUserParams(params.toString());	
	trans.open("f", "f","/common.do");
	msgSendList()										// 삭제 후 리스트 호출
}

/**
*	답장 쓰기
* author  하지윤   
* since   2009/08/19 	                                              
*/ 
function msgReply()
{

	var g_Obj = document.all(SELECT_SERVICE_01);
	
	var params = new StringBuffer();
	var send_nm = new Array();
	var send_id = new Array();
	var reMsg = new Array();
	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("답장 쓸 대상을 선택하세요.");
		return;
	}		
	var index = 0;
	
	for( var i = g_Obj.GetRowCount()-1; i >=0 ; i-- )
	{

		if( g_Obj.GetCellValue("chk", i) == 1 )
		{	
			send_nm[index] = g_Obj.GetCellValue("send_nm", i);
			send_id[index] = g_Obj.GetCellValue("send_id", i);
			reMsg[index] = "Y";
			index++;
		}		
	}
	
				
		
	window.open("/jsp/information/infMsgSend.jsp?send_nm="+send_nm+"&send_id="+send_id+"&reMsg="+reMsg,'intranet','left=400, top=200, width=310, height=450 ,status=no, scrollbars=yes'); //width=310, height=450		
}



