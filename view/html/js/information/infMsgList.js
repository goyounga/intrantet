var DELETE_SERVICE_01 	= "UCINF021D";
var SELECT_SERVICE_01   = "UCINF021S";
var UPDATE_SERVICE_01	= "UCINF021U";   

/**
*	���� ���
* author  ������   
* since   2009/08/19 	                                              
*/ 
function msgSendList()
{
	var userid = f.userid.value;
	var trans = new Trans();							
	trans.setSvc(SELECT_SERVICE_01);					// ����ID
	trans.setMyUserParams("recv_id",userid);		
	trans.setWiseGrid("1");								// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");						// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
				
	trans.open("f", "f","/wisegrid.do");
}



/**
*	���� ����
* author  ������   
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
			trans.setSvc(UPDATE_SERVICE_01);						// ����ID
			trans.setUserParams(params.toString());	
			trans.open("f", "f","/common.do");
			msgSendList()											// ����Ʈ ȣ��	<==	���� ���� Y�� �ٲ㼭 ������
		}
		f.contents.value = gridObj.GetCellValue("contents",nRow);	//���뺸��


}

/**
*	���� ����
* author  ������   
* since   2009/08/20 	                                              
*/ 
function msgRemove()
{
	
	var g_Obj = document.all(SELECT_SERVICE_01);

	var params = new StringBuffer();
	
	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("������ ������ �����ϼ���.");
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
	trans.setSvc(DELETE_SERVICE_01);					// ����ID
	trans.setUserParams(params.toString());	
	trans.open("f", "f","/common.do");
	msgSendList()										// ���� �� ����Ʈ ȣ��
}

/**
*	���� ����
* author  ������   
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
		alert("���� �� ����� �����ϼ���.");
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



