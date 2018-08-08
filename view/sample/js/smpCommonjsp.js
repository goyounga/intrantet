function callCommonjsp1()
{
	var tran = new Trans();
	tran.setSvc("samplemyjsp1,samplemyjsp1_sum");		
	tran.setForwardId("commonjsp","/jsp/sample/smpCommonjspAct.jsp");
	tran.open("f", "f","/forward.do");
}

function callCommonjsp2()
{
	var params = "_SERVICE_TYPE=SQLSERVICE"
			   + "&_SERVICE_ID=selectmytest"
	           + "&_FORWARD_ID=commonjsp&_FORWARD_PAGE=/jsp/sample/smpCommonjspAct2.jsp"
	           + "&_PAGE_ROW=9999&_START_ROW=1";
	f.action = "/common.do?"+params;
	f.submit();
}