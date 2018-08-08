function selectMyTable1()
{
	var tran = new Trans();
	tran.setSvc("samplemytable1");
	tran.open("f","f","/common.do");
}

function selectMyTable2()
{
	var tran = new Trans();
	tran.setSvc("samplemytable2");
	tran.open("f","f","/common.do");
}

function selectMyTable3()
{
	var tran = new Trans();
	tran.setSvc("samplemytable3");
	tran.open("f","f","/common.do");
}

// combobox event
function editevent(obj, objName)
{
	alert(obj.value);
}

function showDetail_obj(obj)
{
	f.memo.value = obj.cells[0].id;		// Table ±¸ºÐ
	
	if (obj.cells[0].id == "samplemytable1_IDX" || obj.cells[0].id == "samplemytable1_LEFTIDX" )
	{
		showDetail("samplemytable1", getRowIndex(obj), f);
	} else if (obj.cells[0].id == "samplemytable3_IDX" || obj.cells[0].id == "samplemytable3_IDXLEFT" )
	{
		var curPageNo = DataSet.getCurPage("samplemytable3");
		f.memo.value += " ::: " + DataSet.getParam("samplemytable3", curPageNo, getRowIndex(obj), "codenm");
	} 
}

var gIndex;
function showDetailC_obj(obj, size)
{
	gIndex = getRowIndex(obj);
	
	if(obj.cells[0].id == "samplemytable2_IDX") {
		document.all("amtlabel").innerText = document.all("samplemytable2").rows(gIndex).cells(2).innerText;
	}
}

function showDetailB_obj(obj, size)
{
	if(obj.cells[0].id == "samplemytable2_IDX") {
		document.all("sidlabel").innerText = document.all("samplemytable2").rows(gIndex).cells(4).innerText;
	}
}
