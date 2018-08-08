var LOGOUT_ID = "UCCOMLOGOUT,UCCOMWORKOUT";

function log_out(userid, clientip)
{
	//window.close();

	var trans = new Trans();
	trans.setUserParams("user_id="+userid+"&loi_ip="+clientip);	
	trans.setSvc(LOGOUT_ID);
	trans.setAsync(false);
	trans.setWait(false);
	trans.open("f", "f","/common.do");
}

function callback(sServiceID)
{
	switch (sServiceID)
	{
		case LOGOUT_ID:
			if (DataSet.getParam("UCCOMLOGOUT", 1, 0, "SUCCESS_COUNT") > 0) 
			{
				window.close();
			}
			break;
		default:
			break;
	}
}