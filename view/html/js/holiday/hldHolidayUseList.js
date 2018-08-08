var SELECT_SERVICE_01 	= "UCHLD033S";

function on_Load()
{
	fQuery.q_bse_y.value = fQuery.thisYear.value;
}

function query()
{
	if( getValidation(fQuery, true) == false ) return false;

	var trans = new Trans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_SERVICE_01);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

