function setInit()
{
	var tran = new Trans();							
	tran.setSvc("SMPTREES");
	tran.setPageRow("9999");			
	tran.setWiseGrid("1");			
	tran.setForwardId("wgdsl","");
	//tran.setDefClick("true");	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");	
}

// Tree Event 
function treeClick(obj, strTreeKey, strArea) {
	alert(strTreeKey);
	alert(strArea);
}
