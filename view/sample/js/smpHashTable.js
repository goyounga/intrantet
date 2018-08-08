function testHashTable()
{
	var tran = new Trans();
	tran.setSvc("samplemytest1");
	tran.open("f","f","/common.do");
}

function callback(dsnm)
{
	var size = DataSet.getTotalCount(dsnm);
	for (var i=0; i<size; i++)
	{
		var ht = DataSet.getHashParam(dsnm, 1, i);
		
		f.log.value += "\r\n"
		            + ht.get("uppercd")
		            + ht.get("code")
		            + ht.get("codenm")
		            + ht.get("etc1")
		            + ht.get("etc2")
		            + ht.get("etc3")
		            + ht.get("useyn")
		            + ht.get("sort");
	}
}