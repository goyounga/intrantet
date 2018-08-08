function selectSample()
{
	var tran = new Trans();
	tran.setSvc("samplemyselect1");
	tran.open("f","f","/common.do");
}

function pageSample()
{
	var tran = new Trans();
	tran.setSvc("samplemypage1");
	tran.open("f","f","/common.do");
}

function updateSample()
{
	var tran = new Trans();
	tran.setSvc("samplemyupdate1");
	tran.open("f","f","/common.do");
}

function batchSample()
{
	var tran = new Trans();
	tran.setSvc("samplemybatch1");
	tran.open("f","f","/common.do");
}

function multiSample()
{
	var tran = new Trans();
	tran.setSvc("samplemymulti1");
	tran.setUserParams("no="+noArr+"&name="+nameArr);
	tran.open("f","f","/common.do");
}

function multiselectSample()
{
	var tran = new Trans();
	tran.setSvc("samplemymultiselect1");
	tran.setUserParams("no=1,5");
	tran.open("f","f","/common.do");
}

function makeQuery()
{
	var tran = new Trans();
	tran.setSvc("samplemyquery1");
	tran.open("f","f","/common.do");
}

// for batch and multi sample
var noArr = new Array();
var nameArr = new Array();
var addcount = 0;

function addEmployee(obj)
{
	var no = obj.value;
	var name = getSelectedText(obj);
	
	// for batch
	f.batchData.value += no + "," + name + "|";
	
	// for multi
	noArr[addcount] = no;
	nameArr[addcount] = name;
	addcount++;
}