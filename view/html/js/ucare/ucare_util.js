/**
  * ��� : button ��Ȱ��/Ȱ��ȭ �̹��� ó��
  * obj  : button ��ü
  * flag : ��Ȱ��ȭ ����(boolean)
  **/
var winProgress;
var gAuth ;
var myDiv ;
var gMaxDay = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var htGrid = new Hashtable();
var htGridOpt = new Hashtable();
var aGridPrp = {}	//�׸��� default Param ���ð�
var gWaitBox ;
var	UPLOAD_IMG_PATH = "UPLOAD_IMG_PATH";//"""d:/project/workspace/ucareapp/ucareapp/view/html/upload/fileimg";
var UPLOAD_FOLDER_NAME = "";
if (this != top)
{
	var aList  = document.location.href.split("/");
	var sFile = aList[aList.length-1];
	var sId = sFile.substring(0, sFile.length-4);
	gAuth = 2;
	//gAuth = top.gMenuAuth.get(sId);
	//if (gAuth == undefined)
	//{
//		alert("�������� �����ϴ�.");
		//gAuth = 2;
	//}
}

//parent,opener �� �ش�.
function getExtendObj(){
	var obj = getTopOpener();

	// ��� üũ�� ����.
	if (obj == this)
	{
		if (window.dialogArguments)
		{
			obj = window.dialogArguments;
		}
	}

	if (obj.whoAreU && obj.whoAreU == "top"){
		// obj = getTopOpener(); // �״��
	}else{
		obj = obj.top;
		if (obj.whoAreU && obj.whoAreU == "top"){
			//obj = getTopOpener(); // �״��
		}else{
			obj = obj.parent.getTopOpener();	//�θ�â���� �ѹ��� �̾��ش�.
			obj = obj.top;

			if (obj.whoAreU && obj.whoAreU == "top"){
				//obj = getTopOpener(); // �״��
			}else{
				obj = obj.parent.getTopOpener();	//���� ����..getTopOpener()�� ����� �۵����� �ʴ´�...getTopOpener()���� whoAreU�� Ȯ���� ���� �ʿ�
				obj = obj.top;
			}
		}
	}
	return obj;
}

//������������ ���ϸ��� �����Ѵ�.
function getThisFileName(){
	var thisurl=location.href;
	var urlarr=thisurl.split("?");
	var url1=urlarr[0];
	var url2=url1.split("/");
	var filename=url2[url2.length-1];
	var temp=filename.split(".");
	filename=temp[0];
	return filename;
}

//������������ ������ �����Ѵ�.
var tspagename="";
var g_menuid="";
var myCreateYN="Y";
var myReadYN="Y";
var myUpdateYN="Y";
var myDeleteYN="Y";
var myFileYN="Y";
var myPrintYN="Y";
var myOpenYN="Y";
var myTabYN="Y";

function setPageAuth(){
	tspagename=getThisFileName();
	var oj=getExtendObj();
	var i=0;

	//auth (�޴����̵�:���:��ȸ:����:����:����:����Ʈ)
	var crud=oj.g_auth_hs.get(tspagename).split(":");
	g_menuid=crud[i++];
	myCreateYN=crud[i++];
	myReadYN=crud[i++];
	myUpdateYN=crud[i++];
	myDeleteYN=crud[i++];
	myFileYN=crud[i++];
	myPrintYN=crud[i++];
}

//MenuId �� �����Ѵ�.
function getMenuId(){

	try{
		if(whoAreU == "login") return "";
	}catch(e){}

	var obj = getTopOpener();

	if (obj.whoAreU && obj.whoAreU == "top")
	{
		// obj = getTopOpener(); // �״��
	}
	else
	{
		obj = obj.top;

		if (obj.whoAreU && obj.whoAreU == "top")
		{
			// obj = getTopOpener(); // �״��
		}
		else
		{
			obj = obj.parent.getTopOpener();	//�θ�â���� �ѹ��� �̾��ش�.
			obj = obj.top;
		}
	}

	try
	{
		//���â���� ������ Ȯ��.
		var pOpener = window.dialogArguments;
		if(pOpener) obj = pOpener.top;
	}catch(e){}

	return obj.gMenuId;
}

//�޴����� �����Ѵ�.
function getMenuNm(sSrcNm){
	var oj=getExtendObj();
	var i=0;

	var crud=oj.g_auth_hs.get(sSrcNm).split(":");
	var sMenuNm = crud[7];
	return sMenuNm;
}


// ���ѿ� ���� ��ư ��Ʈ��
function setButtonByAuth(){
	//����üũ�� Ǯ�����.
	//return;
	setPageAuth();
	var obj=document.getElementsByTagName("button");

	if(typeof(obj)=="undefined"){
		var auth=obj.auth;
		setButtonDisable(obj[i],getBtnAuth(auth));
	}else{

		for(var i=0;i<obj.length;i++){
			var auth=obj[i].auth;
			if(typeof(auth) != "undefined")
			{
				setButtonDisable(obj[i],getBtnAuth(auth));
			}
		}
	}
}

//��ư ����(�ʱ�ȭ)
function getBtnAuth(auth){
	var bl=true;

	if (!auth || auth == "" || auth == "X")	// �ݱ��ư�� �츰��.
	{
		bl = false;
	}
	else if(auth=="A")	//���۾�
	{
		//alert(myCreateYN);
		if(myCreateYN=="Y" || myCreateYN=="" || !myCreateYN)	bl=false;
	}
	else if(auth=="R")
	{
		if(myReadYN=="Y" || myCreateYN==""  || !myReadYN)	bl=false;
	}
	else if(auth=="U" || auth=="S")
	{
		if(myUpdateYN=="Y" || myUpdateYN==""  || !myUpdateYN)	bl=false;
	}
	else if(auth=="D")
	{
		if(myDeleteYN=="Y" || myDeleteYN==""  || !myDeleteYN)	bl=false;
	}
	else if(auth=="C")
	{
		bl = false;
	}
	else if(auth=="P")
	{
		bl = false;
	}
	return bl;
}

//��ư detail ����(���۾�:A , ��ȸ:R , ����:U , ����:D , ���:C) 2009.3.10 ���ر�
function getBtnDetailAuth(auth, userflag){
	var bl=userflag;

	if(auth=="A"){
		if(gsXaFlag=="A"){
			if(myCreateYN!="Y") bl=true;
		}
	}else if(auth=="R"){
		if(myReadYN=="Y") bl=false;
	}else if(auth=="U"){
		if(gsXaFlag=="A"){
			if(myCreateYN!="Y") bl=true;
		}else if(gsXaFlag=="U"){
			if(myUpdateYN!="Y") bl=true;
		}
	}else if(auth=="D"){
		if(gsXaFlag=="A"){
			if(myCreateYN!="Y") bl=true;
		}else if(gsXaFlag=="U"){
			if(myDeleteYN!="Y") bl=true;
		}
	}else if(auth=="C" ){
		if(gsXaFlag=="A"){
			if(myCreateYN!="Y") bl=true;
		}else if(gsXaFlag=="U"){
			if(myUpdateYN!="Y") bl=true;
		}
	}

	return bl;
}

// Button Display ����
function setButtonDisplay(obj, flag)
{
	var bl=flag;

	if (!obj)
	{
		return;
	}

	if (obj && obj.auth)
	{
		//if (obj.auth == "C" && myCreateYN	== "N")	bl = true;
		if (obj.auth == "A" && myCreateYN	== "N")	bl = true;
		if (obj.auth == "R" && myReadYN		== "N")	bl = true;
		if (obj.auth == "U"  || obj.auth == "S" || obj.auth == "Z")
		{
			if(myCreateYN	== "N" && myUpdateYN 	== "N") bl = true;
			else if(myCreateYN	== "Y" && myUpdateYN 	== "N" && gsXaFlag!="A") bl = true;
		}
		if (obj.auth == "D" && myDeleteYN 	== "N")	bl = true;
		if (obj.auth == "F" && myFileYN 	== "N")	bl = true;
		if (obj.auth == "P" && myPrintYN 	== "N")	bl = true;
		if (obj.auth == "O" && myOpenYN 	== "N")	bl = true;
	}
//alert(obj.name + " / " + obj.auth + "/" + myUpdateYN + " / " + bl);
	//obj.style.display = flag;
	return bl;
}

// Button disabled ����
function setButton(obj, flag)
{
	setButtonDisable(obj, flag);
}

// Button disabled ����
function setButtonDisable(obj, flag)
{

	if (!obj)
	{
		return;
	}

	//����üũ(�ּ� Ǯ��� ���Ѽ��� ������.)
	flag=setButtonDisplay(obj, flag);

	var objName = obj.name;

	if(flag)
	{
		document.all("spn" + objName).style.display = "none";
		document.all("spn" + objName + "_d").style.display = "";
	}
	else
	{
		document.all("spn" + objName).style.display = "";
		document.all("spn" + objName + "_d").style.display = "none";

	}

	if (obj && obj.kind)
	{
		if (obj.kind == "read" && myReadYN == "N")
		{
			flag = true;
		}

		if (obj.kind == "write" && myWriteYN == "N")
		{
			flag = true;
		}
	}
/*
	//obj.disabled = flag;
	var sClassM, sClassI, sClassL, sClassR;
	var objL, objR;
    var objName = obj.name;
	obj.disabled = flag;
    if (obj.name == "") return;

    objL = document.all[objName+"_TdL"];
    objI = document.all[objName+"_TdI"];
    objM = document.all[objName+"_TdM"];
    objR = document.all[objName+"_TdR"];

    sClassL = (objL.className.indexOf("_d")==-1?objL.className:objL.className.substring(0, objL.className.length-2));

    if (objI)
    {
    	sClassI = (objI.className.indexOf("_d")==-1?objI.className:objI.className.substring(0, objI.className.length-2));
    }

    sClassM = (objM.className.indexOf("_d")==-1?objM.className:objM.className.substring(0, objM.className.length-2));
    sClassR = (objR.className.indexOf("_d")==-1?objR.className:objR.className.substring(0, objR.className.length-2));

	if (flag == true)
	{
		sClassL = sClassL+"_d";
		sClassI = sClassI+"_d";
		sClassM = sClassM+"_d";
		sClassR = sClassR+"_d";
	}
	else
	{
		sClassL = sClassL;
		sClassI = sClassI;
		sClassM = sClassM;
		sClassR = sClassR;
	}

	objL.className=sClassL;

	if (objI)
	{
		objI.className=sClassI;
	}

	objM.className=sClassM;
	objR.className=sClassR;
*/
}

// ���Ѽ��� ���� iframe �߰�
function makeIframe(url, height, width, name, params)
{
	url += "?readyn=" + myReadYN + "&writeyn=" + myWriteYN;
	if (params && params != "")
	{
		url += "&" + params;
	}
	var ifameHtml = "<iframe src='"+url+"' marginwidth='0' marginheight='0' height='"+height+"' width='"+width+"' frameborder='0' framespacing='0' id='"+name+"' name='"+name+"' scrolling='no'></iframe>";
	document.write( ifameHtml );
}

// ModelessWin������  ����
function showModelessWin(sURL, winName, iWidth, iHeight, winEtc)
{
	var popupProperties = "status:no;dialogWidth:"+iWidth+";dialogHeight:"+iHeight+";center:yes";

	if(typeof winEtc != "urndefined" && winEtc != "") {popupProperties += ";" + winEtc;}

	try
	{
		if(htPopWins.get(winName) != "")
		{
			htPopWins.get(winName).close();
		}

		//return window.showModelessDialog(sURL,self,"status:no;dialogWidth:"+iWidth+";dialogHeight:"+iHeight+";center:yes");
		var winObj = window.showModelessDialog(sURL,self,popupProperties);

		htPopWins.put(winName, winObj);

		return winObj;
	}
	catch(e){}
}

//��ȸ���� ǥ��
function showStatus(msg, mode)
{
	if (parent)
	{
		if (parent.gTid)
		{
			clearInterval(parent.gTid);
			parent.tdCurrent.innerText = msg;
//			alert(msg);
			if (mode == "E")
			{
			    setTimeout(parent.setDate,60000/60*10);

			    //parent.setDate();
			    parent.gTid=setInterval(parent.setDate,60000);
			}
		}
	}
}

//��ȸ���� ǥ��
function setQueryStatus(msg, waittime)
{
	winProgress = showModelessWin("/jsp/common/ComProgress.jsp?msg="+msg+"&waittime="+waittime, "360px", "120px");

	var winStatus = 	top.opener;
	if (!msg) msg = "��ȸ��.....";

}

//��ȸ���� ����
function setQueryStatusClose(msg)
{
	if(winProgress != null)
	{
		winProgress.close();
		winProgress = null;
	}
	var winStatus = 	top.opener;
	if (!msg) msg = "��ȸ�Ϸ�";
}

//rowspan�� ���
function getRowIndex(obj)
{
	var curRow = obj.sectionRowIndex;
	var tblObj = obj.parentNode.parentNode;
	var size   = tblObj.rowSize;
	var j = Math.floor(curRow/size);
	return j;
}

// TR Select
function mrowSelect_obj(obj)
{
	var j = getRowIndex(obj);
	var tblObj = obj.parentNode.parentNode;
	var tblLeft;

	if(tblObj.id.substring(tblObj.id.length-5, tblObj.id.length) == "_left") {
		var tblLeft = document.all[tblObj.id.substring(0,tblObj.id.length-5)];
	} else {
		var tblLeft = document.all[tblObj.id+"_left"];
	}

	for (var i = 0; i < tblObj.rows.length ; i++)
	{
		tblObj.rows[i].className = "GRIDTR";
		if (tblLeft) tblLeft.rows[i].className = "GRIDTR";
	}
	var size= tblObj.rowSize;

	for (var i=0; i <size; i++)
	{
		var index =j*size+i;
		tblObj.rows[index].className = "tbl_sl01";
		if (tblLeft) tblLeft.rows[index].className = "tbl_sl01";
	}

	CURROW = j;
}

// TR Select
function mrowSelect(tableid, start, end)
{
	var table = document.all(tableid);
	var index = 0;

	for (var i = 0; i < table.rows.length - 1; i++)
		table.rows[i].className = "tbl_tr01";

	for (var i = start; i <= end; i++)
		table.rows[i].className = "tbl_sl01";


	for (var i = start; i <= end; i++)
		for (var j = 0; j < table.rows[i].cells.length; j++)
			ROWDATA[index++] = removeHTMLSPACE(table.rows[i].cells[j].innerHTML);

	CURROW = start;
}

//������
function showDetail_obj(obj)
{
}

// TR MOUSE over
function mover_obj(obj)
{
	return; // LIG������ mouse over�� ������� ����

	if (obj.className == "tbl_sl01") return;
	var tblObj = obj.parentNode.parentNode;
	var tblLeft;

	if(tblObj.id.substring(tblObj.id.length-5, tblObj.id.length) == "_left") {
		tblLeft = document.all[tblObj.id.substring(0,tblObj.id.length-5)];
	} else {
		tblLeft = document.all[tblObj.id+"_left"];
	}

	var j = getRowIndex(obj);
	var size= tblObj.rowSize;
	var i=0;
	for (var i=0; i <size; i++)
	{
		var index =j*size+i;
		tblObj.rows[index].className = "tbl_ov01";
		if (tblLeft) tblLeft.rows[index].className = "tbl_ov01";
	}
}

// TR MOUSE out
function mout_obj(obj)
{
	return; // LIG������ mouse over�� ������� ����

	if (obj.className == "tbl_sl01") return;
	var tblObj = obj.parentNode.parentNode;
	var tblLeft;

	if(tblObj.id.substring(tblObj.id.length-5, tblObj.id.length) == "_left") {
		tblLeft = document.all[tblObj.id.substring(0,tblObj.id.length-5)];
	} else {
		tblLeft = document.all[tblObj.id+"_left"];
	}

	var j = getRowIndex(obj);
	var size= tblObj.rowSize;
//	alert(size);
	for (var i=0; i <size; i++)
	{
		var index =j*size+i;
		tblObj.rows[index].className = "tbl_tr01";
		if (tblLeft) tblLeft.rows[index].className = "tbl_tr01";
	}
}

// TR MOUSE over
function mover(tableid, start, end)
{
	var table = document.all(tableid);

	if (table.rows[start].className == "tbl_sl01") return;

	for (var i = start; i <= end; i++)
		table.rows[i].className = "tbl_ov01";
}

// TR MOUSE out
function mout(tableid, start, end)
{
	var table = document.all(tableid);

	if (table.rows[start].className == "tbl_sl01s") return;

	for (var i = start; i <= end; i++)
		table.rows[i].className = "tbl_tr01";
}


// ���ڸ� �����´�.
function numberMask(str)
{
	var val = "";

	str = "" + str;

	if (str == null || str == "") return val;

	for (var i = 0; i < str.length; i++)
	{
		// ������ ��쵵 �����´�. �Ҽ����� ����
		if (isOnlyNumberic(str.charAt(i)) || (i == 0 && str.charAt(i) == "-") || str.charAt(i) == ".")
		{
			val += str.charAt(i);
		}
	}

	return val;
}

//���ڸ� �ִ����� �˻��Ѵ�.
function isOnlyNumberic(string)
{
	var regExp 	= /[^\d]/i;
	var isVaild	= !(regExp.test(string));

	return isVaild;
}

/* form clear*/
function clear(f)
{
	if (!f) f = document.forms[0];

	if (f!=null)
	{
		for (var i=0; i<f.length; i++)
		{
			if (f.elements[i].type == "select-one")
				f.elements[i].selectedIndex=0;
			else if((f.elements[i].type == "text") || (f.elements[i].type == "password") || (f.elements[i].type == "textarea"))
				f.elements[i].value = "";
		}
	}
}


/* ��Ʈ�� -> ����  */
function parseNumeric(str) {
	var ls_num = "";

	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) != '0'){
			ls_num = str.substring(i);
			break;
		}
	}

	if (ls_num == "") return 0;
	else return parseInt(ls_num);
}

/*sort table*/
function sortTable(col, tableName)
{
	var objLeft = document.all(tableName+"_left");
	if (objLeft)
	{
		col = col - objLeft.rows[0].cells.length;
	}
	var rowArray = new Array();
	var objTable = eval(tableName);
	var colName  = eval(tableName + "_title").rows[0].cells[col].innerText;
	var colIndex = 0;
	var sortType = trim(colName).indexOf("��");

//	alert(objTable.rows.length);
	for (var i=0; i < objTable.rows.length; i++)
	{
		var colArray = new Array();
	 	if (objLeft)
	 	{
	 		colIndex = objLeft.rows[i].cells.length;
	 		for (var j=0; j<colIndex; j++)
	 		{
	 			colArray[j] = objLeft.rows[i].cells[j].innerText;
	 		}
	 	}
		for (var j=colIndex; j<objTable.rows[i].cells.length; j++)
		{
			colArray[j] = objTable.rows[i].cells[j].innerText;
		}

		if (trim(objTable.rows[i].cells[col].innerText) == "")
		{
			rowArray[i]= new Array("������", colArray);
		}
		else
			rowArray[i]= new Array(getDataType(objTable.rows[i].cells[col].innerText), colArray);
	}
//	alert(rowArray);
	if (sortType == -1) {
		rowArray.sort();			// ��������
	} else {
		rowArray.sort(compare);		// ��������
	}

//	alert(rowArray);
	for (var i=0; i < rowArray.length; i++)
	{
			var obj = rowArray[i][1];
			if (objLeft)
		 	{
		 		colIndex = objLeft.rows[i].cells.length;
		 		for (var j=0; j<colIndex; j++)
		 		{
		 			if (objLeft.rows[i].cells[j].id.substring(objLeft.rows[i].cells[j].id.length-3) != "_NO")
						objLeft.rows[i].cells[j].innerText = obj[j];
		 		}
		 	}

			for (var j=colIndex; j < obj.length; j++)
			{
				if (objTable.rows[i].cells[j].id.substring(objTable.rows[i].cells[j].id.length-3) != "_NO")
					objTable.rows[i].cells[j].innerText = obj[j];
			}
	}

	colName = colName.replace(/��/g, "");
	colName = colName.replace(/��/g, "");

	if (sortType == -1) {
		eval(tableName + "_title").rows[0].cells[col].innerText = trim(colName) + " ��";
	} else {
		eval(tableName + "_title").rows[0].cells[col].innerText = trim(colName) + " ��";
	}

}

/*sort table*/
function sortTable(col, dsnm)
{
    var pagecount =   DataSet.getXmlTotalPage(dsnm);
	var rowArray = new Array();

	var colName  = eval(dsnm + "_title").rows[0].cells[col].innerText;
	var colId      = eval(dsnm).rows[0].cells[col].column;
	var colIndex = 0;
	var sortType = trim(colName).indexOf("��");

	var index=0;
    for (var i=0; i <pagecount ; i++)
    {
        var vData = DataSet.getParamArrHash(dsnm, i+1);
        for(var j=0; j < vData.length; j++)
        {
            var ht = vData[j];
            rowArray[index++] = new Array(getDataType(ht.get(colId)), vData[j]);
        }
    }

	if (sortType == -1) {
		rowArray.sort();			// ��������
	} else {
		rowArray.sort(compare);		// ��������
	}

	var xmlobj=DataSet.getUcareData(dsnm);			//dataset obj
	index=0;
    for (var i=0; i <pagecount ; i++)
    {
    	var pagenm="page-"+(i+1);							//page number create
        var dsroot=xmlobj.getElementsByTagName(pagenm);			//page xml get
    	for (var j=0; j< dsroot[0].childNodes.length; j++)
    	{
    		var objRs = dsroot[0].childNodes.item(j);
    		var ht = rowArray[index++][1];
    		for(var k=0;k<objRs.childNodes.length;k++)
    		{
    			var oc=objRs.childNodes[k];
        		oc.text = ht.value(k);
    		}
    	}
    }

    HtmlUtil.getPageMan(dsnm,dsnm,DataSet.getCurPage(dsnm));
	colName = colName.replace(/��/g, "");
	colName = colName.replace(/��/g, "");

	if (sortType == -1) {
		eval(dsnm + "_title").rows[0].cells[col].innerText = trim(colName) + " ��";
	} else {
		eval(dsnm + "_title").rows[0].cells[col].innerText = trim(colName) + " ��";
	}

}

// date �����
function getDataType(cValue)
{
	var isDate = new Date(cValue);
	if (isDate == "NaN")
	{
		cValue = replaceStr(cValue, ",", "");
		if (isNaN(cValue))
		{
			cValue = cValue.toUpperCase();
			return cValue;
		}
		else
		{
			var myNum;
			myNum = String.fromCharCode(48 + cValue.length) + cValue;
			return myNum;
		}
	}
	else
	{
		var myDate = new String();
		myDate = isDate.getFullYear() + " " ;
		myDate = myDate + isDate.getMonth() + " ";
		myDate = myDate + isDate.getDate(); + " ";
		myDate = myDate + isDate.getHours(); + " ";
		myDate = myDate + isDate.getMinutes(); + " ";
		myDate = myDate + isDate.getSeconds();
		return myDate ;
	}
}

// a,b ��
function compare(a, b)
{
	if(a < b) return 1;       //-1�̰�
	else if(a > b) return -1; //1�̸� ��������
 	else return 0;
}

/* �Էµ� ���ڸ� �Էµ� ������ŭ */
function mkString(wstr,wnum){
	var sb=new StringBuffer();
	for(var i=0;i<wnum;i++){
		sb.append(wstr);
	}
	return sb.toString();
}

/* ������ ���ϱ� */
function getSmallNum(numArr){
	numArr.sort();
	return numArr[0];
}

/* ū�� ���ϱ� */
function getLargeNum(numArr){
	numArr.sort();
	return numArr[numArr.length-1];
}

/* ��ũ�� �̵��� Ÿ��Ʋ�� �հ� ���� ������*/
function autoScroll(id)
{
	var objTitle = document.all[id+"_title"];
	var objSum = document.all[id+"_sum"];
	var objLeft = document.all[id+"_left"];
	var obj = document.all[id];

	if (objTitle)  objTitle.scrollLeft = obj.scrollLeft;
	if (objSum) objSum.scrollLeft = obj.scrollLeft;
	if (objLeft) objLeft.scrollTop = obj.scrollTop;
}

/**
  * �޷¿���
  * sType : ��¥�� ���� text ��ü
  * sDate : text ��ü ��
  * �� ) openCalendar('f.mydate',f.mydate.value)
  */
function openCalendar(sType, sDate)
{
//top.screenLeft+(document.body.clientWidth - 267)/2)+"px;dialogTop:"+((document.body.clientHeight - 205)/2)

	if (sType == null) sType = "";

	if (sDate ==null) sDate = "";
	else sDate = removeMask(checkDate(sDate));

	var objIfm;
	var objEvent;
	var aArry = sType.split(".");

	var vTop = 0;
	var vLeft = 0;
	var flag = "";
	if(aArry.length > 2)
	{
		objIfm = eval(aArry[0]);
		objEvent = objIfm.event;
	}
	else
	{
		objEvent = event;
		flag = "client";
	}

	var objCal = document.all("divCal");
	if(objCal != null)
	{
		if(flag == "client")
		{
			vTop = objEvent.clientY + document.body.scrollTop;
			vLeft = objEvent.clientX + document.body.scrollLeft;
		}
		else
		{
			vTop = objEvent.screenY - window.screenTop + document.body.scrollTop;
			vLeft = objEvent.screenX - window.screenLeft + document.body.scrollLeft;
		}

		var vClientW = document.body.clientWidth + document.body.scrollLeft;
		var vClientH = document.body.clientHeight + document.body.scrollTop;

		if(vClientH - vTop < 240) vTop = vClientH-240<0?0:vClientH-240;
		if(vClientW - vLeft < 272) vLeft = vClientW - 272;

		objCal.style.left = vLeft;
		objCal.style.top = vTop;
		objCal.style.display = "";
		ifmCal.location.href = "/jsp/common/comDivCalendar.jsp?type="+sType+"&date="+sDate;
	}
	else
	{
		var vTop = event.screenY ;
		var vLeft = event.screenX+10 ;

		if(vTop > 740) vTop = 740;
		if(vLeft > 1090) vLeft = 1090;

		window.showModalDialog ("/jsp/common/comCalendar.jsp?type="+sType+"&date="+sDate,self,"dialogLeft:"+vLeft+";dialogTop:"+vTop+";dialogWidth:260px;dialogHeight:260px;");
	}
}

/**
  * ���õ� ��¥ ����
  * sType : ��¥�� ���� text ��ü
  * sDate : text ��ü ��
  * �� ) setCalendar('f.mydate',f.mydate.value)
  * sType(��¥�� ���� text ��ü)�� ������� ����� ������� ��ü�� pattern�Ӽ��� �ְ� ���� M���� �����صд�.
  * �� ) <input type="text" name="smonth" pattern="M" title="��ȸ������">
  */
function setCalendar(sType, sDate)
{
	try
	{
		//if ( eval(sType).readOnly == true || eval(sType).disabled == true )	return;

		if( eval(sType).pattern )
		{
			//�Ŀ� �ʿ信 ���� ��=Y, ��=M, ��=D�� Ȯ���Ѵ�.
			if( eval(sType).pattern=="M" )
			{
				sDate = sDate.substr(0,7);
			}
		}
		(eval(sType)).value = sDate;
	}catch(e){}

}

/**
  * ������ȸ ����
  * svcid  : ����ID
  */
function openUser(sType, sMode, formName)
{
	if(getGradeCD() == "20") return;
	if (sType == null) sType = "";
	if (sMode == null) sMode = "";
	if (!formName) formName = "fQuery";

	var url = "/jsp/common/comUserFind.jsp";

	//����� �ҽ�
	var args = "type=" + sType;
	args += "&mode=" + sMode;
	args += "&teamset=false";			//�Ҽ� �޺��ڽ��� ���� false
	args += "&formName=" + formName;

	openPopup(url, args, "winUser", "", "", 580, 483, "");

	/* ���� �ҽ�
	url += "?type=" + sType;
	url += "&mode=" + sMode;

	window.open(url,"winUser","width=580 height=483");
	*/
}

/**
  * ������ȸ ����
  * svcid  : ����ID
  */
function openUser_team(sType, sMode , oCntrcd , oTeamcd , oPartcd, formName)
{
	if(getGradeCD() == "20") return;
	if (sType == null) sType = "";
	if (sMode == null) sMode = "";
	if (oCntrcd == null) oCntrcd = "";
	if (oTeamcd == null) oTeamcd = "";
	if (oPartcd == null) oPartcd = "";
	if (!formName) formName = "fQuery";

	var url = "/jsp/common/comUserFind.jsp";

	var args = "type=" + sType;
	args += "&mode=" + sMode;
	args += "&cntrcd=" + oCntrcd.value;
	args += "&teamcd=" + oTeamcd.value;
	args += "&partcd=" + oPartcd.value;
	args += "&teamset=true";				//�Ҽ� �޺��ڽ��� ���� true
	args += "&formName=" + formName;

	openPopup(url, args, "winUser", "", "", 580, 483, "");

	/* ���� �ҽ�
	url += "?type=" + sType;
	url += "&mode=" + sMode;
	url += "&cntrcd=" + oCntrcd.value;
	url += "&teamcd=" + oTeamcd.value;
	url += "&partcd=" + oPartcd.value;
	url += "&formName=" + formName;

	window.open(url,"winUser","width=580 height=483");
	*/
}

//���õ� ���� ����
function setUser(sType, sUserId, sUserNm, sTeamLCD, sTeamMCD, sTeamSCD, formName, bTeamset)
{
	try
	{
		if (!formName || formName =="") formName = "fQuery";
		if (!bTeamset) bTeamset = "false";

		var objForm = document.all[formName];

		var obj = objForm.all[sUserId]
		var objNm = objForm.all[sUserNm];

		if(bTeamset == "true")
		{
			if(objForm.team_lcd)
			{
				objForm.team_lcd.value = sTeamLCD;
				Team_OnChange(objForm.team_lcd, 'team_mcd', 1);
			}

			if(objForm.team_mcd)
			{
				objForm.team_mcd.value = sTeamMCD;
				Team_OnChange(objForm.team_mcd, 'team_scd', 2);
			}

			if(objForm.team_scd)
			{
				objForm.team_scd = sTeamSCD;
			}
		}

		if (obj) obj.value = sUserId;
		if (objNm) objNm.value = sUserNm;

	}catch(e){}

}

/**
 * �� Ŭ���� �ʿ��� �Լ� ȣ�� (�� ���� üũ�� ���� �߰���)
 * id : Tab Table ID
 * index : Tab Index
 * tabType : Tab Class ������
 * gubun : tab - ����, vtab - ����
 */
function callTabClick(id, index, tabType, gubun)
{
	//if(tabauthcheck(id,index)){	//Tab ���� üũ�� �ּ� ����
		if (gubun == "vtab")
		{
			vtabclick("tbl"+id, index, tabType);
			eval(id+"_onclick("+index+")");
		}
		else
		{
			tabclick("tbl"+id, index, tabType);
			eval(id+"_onclick("+index+")");
		}
	//}
}

/**
 * �� ����üũ
 * �̵��Ϸ��� tab ȭ�鿡 ������ �ϳ��� ������ �̵�.
 * index : Tab Index
 */
function tabauthcheck(id,index){
	var obj=eval(id);
	var alias="null";
	var tabauth=false;

	obj=obj.getElementsByTagName("IFRAME")[index];

	var objName = "";
	try
	{
		objName = obj.alias;
	}catch(e){}

	if(objName)
	{
		if(obj.getAttribute("authyn")=="Y"){
			tabauth=true;
		}else{
			alias=obj.getAttribute("alias");
			if(alias!="null"){
				var oj=getExtendObj();
				var authtxt=oj.g_auth_hs.get(alias);

				//auth (�޴����̵�:���:��ȸ:����:����:����:����Ʈ)
				if(authtxt.length>0){
					var autharr=authtxt.split(":");
					for(var j=1;j<7;j++){
						if(autharr[j]=="Y"){
							tabauth=true;
							obj.setAttribute("authyn","Y");
							break;
						}
					}
				}
			}
		}
	}else tabauth=true;

	return tabauth;
}

//�� Ŭ���� ȭ�� ����
function tabclick(id, index, tabType)
{
	var obj =	document.all[id];
	var flag;


	for (var i=0; i < obj.length; i++)
	{
		if (i == index) flag= "on";
		else flag="off";
		obj[i].className = "tabbg_"+flag+tabType;
		obj[i].rows[0].cells[0].className = "tableft_"+flag+tabType;
		obj[i].rows[0].cells[1].className = "tab_"+flag+tabType;
		obj[i].rows[0].cells[2].className = "tabright_"+flag+tabType;
	}
}

//�� Ŭ���� ȭ�� ����
function vtabclick(id, index, tabType)
{
	var tab;
	var obj =	document.all[id];
	var flag;


	for (var i=0; i < obj.length; i++)
	{
		if (i == index) flag= "on";
		else flag="off";
		obj[i].className = "vtabbg_"+flag+tabType;
		obj[i].rows[0].cells[0].className = "vtabtop_"+flag+tabType;
		obj[i].rows[1].cells[0].className = "vtab_"+flag+tabType;
		obj[i].rows[2].cells[0].className = "vtabbottom_"+flag+tabType;
	}
}

//���� ��°��� Ÿ�� ���� ��� ����
function writeChart(width, height, x, data, chartType)
{
	var chartServlet;
	var chartPath;
	var objWidth;
	var objHeight;

	switch (chartType)
	{
		case "P":
			chartServlet = "ComPieServlet";
			chartPath = "SmartChart_pie(Beta).swf";
			objWidth = height*4;
			objHeight = height*2;
			break;
		case "H":
			chartServlet = "ComGraphServlet";
			chartPath = "SmartChart_heightbar.swf";
			objWidth = width;
			objHeight = height;
			break;
		default:
			chartServlet = "ComGraphServlet";
			chartPath = "SmartChart_line2(Beta).swf";
			objWidth = width;
			objHeight = height;
			break;

	}
	sParam = "page_name=/"+chartServlet;
	sParam += "&data_1="+width;
	sParam += "&data_2="+height;
	sParam += "&data_3="+x;
	sParam += "&data_4="+data;
	var sRet ='<embed src="'+scriptPath+'/chart/'+chartPath+'?'+sParam+'" quality="high" menu="false" quality="best" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width='+objWidth+' height='+objHeight+'></embed>';
//	document.write(sRet);
	return sRet;
}

//�÷��� �׵θ� ���ֱ�
function writeFlashTag(FileName, Width, Height) {
	document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="'+ Width +'" height="'+ Height +'">');
	document.write('<param name="movie" value="'+ FileName +'">');
	document.write('<param name="wmode" value="transparent">');
	document.write('<param name="quality" value="high">');
	document.write('<embed src="'+ FileName +'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+ Width +'" height="'+ Height +'"></embed></object>');
}

// ó���� ���� - ������
function showAlert(sMsg, top, left)
{
}

// ó���� �ݱ� - ������
function closeAlert()
{
}

//üũ �ڽ� Ŭ����
function onCheck(obj, id)
{
	var objChk = document.all[id];
	if (objChk.length){
		for (var i=0; i < objChk.length; i++)
		{
			objChk[i].checked = obj.checked;
		}
	}else{
		objChk.checked=obj.checked;
	}
}

/**
  * Select Box �ʱ�ȭ
  * arrobj: �ʱ�ȭ�� select box array obj
  */
function removeOptios(arrobj)
{
	for(var i=0; i < arrobj.length; i++)
	{
		for(var j=arrobj[i].options.length-1; j > 0 ; j--)
		{
			arrobj[i].remove(j);

		}
		if(	arrobj[i].option=="0" || arrobj[i].option=="1" ||
			arrobj[i].option=="2" || arrobj[i].option=="3" ||
			arrobj[i].option=="4" || arrobj[i].option=="6" ||
			arrobj[i].option=="10" )
		{
			arrobj[i][0].selected = true;
		}else
		{
			arrobj[i].remove(0);
		}
	}
}
/**
 * ���з� onChange
 * @param sId : obj : obj , �޺��ڽ�ID ,  lcd : �ڵ�, gCorpCd:��ü�ڵ�
 * @return
 */
function Consl_OnChange(obj, sTrgId,  lcd, gCorpCd)
{

	//���� ���� ������ ó�� �Ұ�
	if(gCorpCd == "")
	{
		MessageBox("NotFindCorpCD", "E", "");
		return;
	}

	var aClearCombo;

	switch(sTrgId)
	{
		case "consl_mcd":
			aClearCombo = new Array(obj.form.consl_mcd, obj.form.consl_scd);
			break;

		case "consl_scd":
			aClearCombo = new Array(obj.form.consl_scd);
			break;

		default:
			break;
	}
	removeOptios(aClearCombo);

	var trans = new Trans();
	trans.setSvc("UCCOMCODELIST");
	trans.setPageRow(9999);
	trans.setAsync(false);
	trans.setWait(false);
	trans.setMyUserParams("id",   sTrgId);
	trans.setMyUserParams("etc_1",obj.value);
	trans.setMyUserParams("lcd",lcd);
	trans.open("",obj.form.name,"/common.do");
}

function Team_OnChange(obj, id, step, bClear)
{

	if(id != "")
	{
		//obj.disabled = false;
		var trans = new Trans();
		var sParam = "id="+id;

		if (step == 1)
		{
			lcd = "TEAM_MCD";
			if (id == "teammcd")
			{
				obj.form.teamscd.options.length = 1;  //����Ʈ �ʱ�ȭ
				obj.form.teamscd.options.index = 0;   //����Ʈ ����
			}
			else if(id == "team_mcd")
			{
				obj.form.team_scd.options.length = 1;  //����Ʈ �ʱ�ȭ
				obj.form.team_scd.options.index = 0;   //����Ʈ ����
			}
		}
		else if(step == 2)
		{
			lcd = "TEAM_SCD";
		}

		trans.setUserParams(sParam);
		trans.setSvc("UCCOMCODELIST");
		trans.setPageRow(9999);
		trans.setAsync(false);
		trans.setWait(false);
		trans.setUserParams("id="+id+"&etc_1="+obj.value+"&lcd="+lcd);
		trans.open("",obj.form.name,"/common.do");

	}

	try
	{
		if (bClear == true)
		{
			obj.form.user_id.value = "";
			obj.form.user_nm.value = "";
		}
	}catch(e){}
}
//------------------------------------------------------------------------
function setTeam(obj , id , step , userYn){
	Team_Setting(obj, id, step, getGradeCD(), getTeamLCD(), getTeamMCD(), getTeamSCD(), getUserID(), userYn);
}

function Team_Setting(obj, id, step, grade, cntrcd, teamcd, partcd, userid, userYn){

	if(grade == "50" ||grade == "20" )
	{
		obj.value = cntrcd;
		obj.disabled = true;
		obj.className = "combo_disabled";
	}
	else
	{
		obj.value = cntrcd;
	}

/* if(grade == "99"){ //������
		obj.value = cntrcd;
		//return;
	}
	else{ //�������̿�....
		obj.value = cntrcd;
		obj.disabled = true;
		obj.className = "combo_disabled";
	} */

	Team_SettingChg(obj, id, step, grade, cntrcd, teamcd, partcd, userid, userYn);
}

function Team_SettingChg(obj, id, step, grade, cntrcd, teamcd, partcd, userid, userYn)
{
	var trans = new Trans();
	var sParam = "id="+id;

	if (step == 1)	sSvc = "UCCOM010S";
	else if(step == 2)	sSvc = "UCCOM011S";
	else sSvc = "UCCOM012S";

	trans.setUserParams(sParam);
	trans.setCallBack("chgCallback('"+obj.form.name+"','"+id+"','"+step+"','"+grade+"','"+cntrcd+"','"+teamcd+"','"+partcd+"','"+userid+"','"+userYn+"')");
	trans.setSvc(sSvc);
	trans.setPageRow(9999);
	trans.setAsync(false);
	trans.open(obj.form.name,obj.form.name,"/common.do");

	if (step == 1)
	{
		if(!obj.form.team_scd)	return;

		Team_SettingChg(obj,'team_scd', 2, grade, cntrcd, teamcd, partcd, userid, userYn);
	}
	else if (step == 2)
	{
		//if(!obj.form.userid)	return;
		if(userYn != "Y")	return;

		Team_SettingChg(obj,'userid', 3, grade, cntrcd, teamcd, partcd, userid, userYn);
	}
}

function chgCallback(obj, id, step, grade, cntrcd, teamcd, partcd, userid, userYn){
	var objt = document.forms[obj].elements[id];

	if(step == 1){
		objt.value = teamcd;

		if(grade == "50" ||grade == "20" ){
			objt.disabled = true;
			objt.className = "combo_disabled";
		}
	}else if(step == 2){
		objt.value = partcd;

		if(grade == "50" || grade == "20"){
			objt.disabled = true;
			objt.className = "combo_disabled";
		}
	}else if(step == 3){
		if(grade == "20"){
			objt.value = userid;
			objt.disabled = true;

			var objnm = document.forms[obj].elements[id+"nm"];
			objnm.value = getUserNM();
			if(objt.type == "text") objt.className = "input_readonly";
			else objt.className = "combo_disabled";

		}
	}
}

//----------------------------------------------------------------------

//
function getCodeBook(obj, id, upperCd, code, step)
{
	if (upperCd == "") {
		getCodeBookByUser(id, upperCd, code, step);
	} else {
	    var toObj;
	    var outform=obj.form.name;
    	if (step == 1)
    	{
    		if (outform) 		toObj = document.forms[outform].elements[id+"M"];
    		else toObj = document.all[id+"M"];
    	}
    	else
    	{
    		if (outform) 		toObj = document.forms[outform].elements[id];
    		else toObj = document.all[id];
    	}

	    if (obj.option!=-1  && obj.selectedIndex == 0)
	    {
	       toObj.options.length = 1;
	       toObj.disabled = true;
	    }
	    else
	    {
	        toObj.disabled = false;
    		var trans = new Trans();
    		var sParam = "id="+id;
    		sParam += "&step="+step;
    		sParam += "&uppercd="+upperCd;
    		sParam += "&largecd="+code.substring(0,3);
    		sParam += "&middlecd="+code.substring(0,6);

    		if (step == 1)	sSvc = "COM000008";
    		else sSvc = "COM000009";

    		trans.setUserParams(sParam);
    		trans.setSvc(sSvc);
    		trans.setPageRow(30);
    		trans.open(obj.form.name,obj.form.name,"/common.do");
    	}
	}
}

//
function getEtcTypeCode(id, upperCd, code, step) {
	var trans = new Trans();

	var sParam = "id=" + id;
	sParam += "&step=" + step;

	if (step == 1) sParam += "&etc1=C";
	else sParam += "&etc1=P";

	if (code == "") sParam += "&etc2=''";
	sParam += "&etc2=" + code;

	trans.setAsync(false);
	trans.setUserParams(sParam);
	trans.setSvc("COM000013");
	trans.setCallBack("afterEtcTypeCode");
	trans.setPageRow(100);
	trans.open("f", "f", "/common.do");
}

//
function afterEtcTypeCode(dsnm) {
	var sStep 	= DataSet.getReqParam(dsnm, "step");
	var sID		= DataSet.getReqParam(dsnm, "id");

	if (sStep == 1) {
		// step 3 object clear
		var obj = document.all(sID);
		var len = obj.options.length;

		for (var i = 0; i < len; i++) {
			obj.options[1] = null;
		}
	}
}

//
function openFolder(path, name, prev, comp, isdir)
{
//	alert(path + "\n" + name + "\n" + prev + "\n" + isdir);
	if (isdir == "Y")
	{
		var trans = new Trans();
		var sParam = "curdir="+path+"/";
		sParam += "&pardir="+prev;
		sSvc = "FOLDER";

		trans.setUserParams(sParam);
		trans.setSvc(sSvc);
		trans.open("f","f","/readdir.do");
	}
	else
	{
		opener.setFilePath(comp+name);
		this.close();
	}
}

/**
  * ���         : table tr �ű��
  * fromTableObj : tr�� �Ѱ��ִ� table ��ü
  * fromCheckbox : tr�� �Ѱ��ִ� table checkbox ��ü
  * toTableObj   : tr�� �޴� table ��ü
  * toCheckbox   : tr�� �޴� table checkbox ��ü
  * isDelete     : tr�� �Ѱ��� �� ������ �� ����(boolean)
  **/
function addRow(fromTableObj, fromCheckbox, toTableObj, toCheckbox, isDelete) {
	// �� TR �����ϱ�
	var rowobj = fromTableObj.rows[0].cloneNode(true);

	var ar_num = -1; // infoArray index�� ����
	var infoArray = new Array();

	// 1. üũ�� td ��������
	if (fromCheckbox) {
		// checkbox�� ������ ������ ���
		if (fromCheckbox.length) {
			for (var i=0; i<fromCheckbox.length; i++) {
				if (fromCheckbox[i].checked) {
					ar_num++;
					infoArray[ar_num] = new Array();

					for (var j=0; j<fromTableObj.rows[i].cells.length; j++) {
						if (fromCheckbox[i].value != "") {
							if (j == getCheckTdIndex(fromTableObj)) {
								infoArray[ar_num][j] = fromCheckbox[i].value;
							} else {
								infoArray[ar_num][j] = trim(fromTableObj.rows[i].cells[j].innerText);
							}
						}
					}

					infoArray[ar_num][fromTableObj.rows[i].cells.length] = i;
				}
			}
		// checkbox�� �� ���� ���
		} else if (fromCheckbox.checked) {
			ar_num++;
			infoArray[ar_num] = new Array();

			for (var j=0; j<fromTableObj.rows[0].cells.length; j++) {
				if (fromCheckbox.value != "") {
					if (j == getCheckTdIndex(fromTableObj)) {
						infoArray[ar_num][j] = fromCheckbox.value;
					} else {
						infoArray[ar_num][j] = trim(fromTableObj.rows[0].cells[j].innerText);
					}
				}
			}

			infoArray[ar_num][fromTableObj.rows[0].cells.length] = 0;
		}

		if (ar_num == -1) {
			alert("���õ� ROW�� �����ϴ�.");
			return;
		}/* else { // �� �κ��� �׽�Ʈ���Դϴ�. ���������� ����� �Ǿ����� Ȯ���մϴ�.
			var temp = '';
			for (var i=0; i<infoArray.length; i++) {
				temp += infoArray[i] + "\r\n";
			}
			alert(temp);
		}*/ // for test
	} else {
		alert("���õ� ROW�� �����ϴ�.");
		return;
	}

	// 2. ���⼭���� ü���� ����
	var deleteRowIndex	= -1;	// ������ tr index
	var updateRowIndex	= -1; 	// ������ tr index
	var newTrCount		= -1;	// ��ĭ�� ä���� tr ����

	// 2-1. tr�� �־��� index�� ��ĭ�� ä�� ���� ������ ���Ѵ�.
	if (toCheckbox) {
		// �޴� table�� ���� �� tr�� ������ ���
		if (toCheckbox.length) {
			for (var i=0; i<toCheckbox.length; i++) {
				if (toCheckbox[i].value == "") {
					updateRowIndex = i;
					break;
				}
			}

			if (updateRowIndex == -1) {
				updateRowIndex = toCheckbox.length;
			}

			newTrCount = checkLimit(toTableObj.rows.length - updateRowIndex, infoArray.length);
			/*
			if (toCheckbox[0].value == "") {
				updateRowIndex = 0;
					newTrCount = checkLimit(toTableObj.rows.length - 0, infoArray.length);
			} else {
				updateRowIndex = toCheckbox.length;
				newTrCount = checkLimit(toTableObj.rows.length - toCheckbox.length, infoArray.length);
			}
			*/

		// �޴� table�� �� �� tr�� ������ ���
		} else if (toCheckbox) {
			if (toCheckbox.value == "" || toCheckbox.value == "NULL") {
				updateRowIndex = 0;
				newTrCount = checkLimit(toTableObj.rows.length, infoArray.length);
			} else {
				updateRowIndex = 1;
				newTrCount = checkLimit(toTableObj.rows.length - 1, infoArray.length);
			}
		}

	} else {
		// �޴� table�� ������� ���
		updateRowIndex = 0;
		//toTableObj.deleteRow(1);	//"��ȸ�� ����� �����ϴ�." row Delete
		//createRow(toTableObj, getTrClassname(toTableObj), getWidthInfo(toTableObj));
		//setDisplay(toTableObj);
		HtmlUtil.addTableRow(toTableObj, 1, 1);
		newTrCount = checkLimit(toTableObj.rows.length, infoArray.length);
	}

	// 2-2. ���� tr�̵�
	for (var i=0; i<infoArray.length; i++) {
		if (isDelete) {
			// table���� tr�� �Ѱ��ָ� �����Ѵ�.
			deleteRowIndex = infoArray[i][infoArray[i].length-1] - i;
			fromTableObj.deleteRow(deleteRowIndex);

			// table�� �� tr�� ������ش�.
			//createRow(fromTableObj, getTrClassname(fromTableObj), getWidthInfo(fromTableObj));
			//setDisplay(fromTableObj);
			//HtmlUtil.addTableRow(fromTableObj, 1, 1);

			if (fromTableObj.rows.length <= 0) {
				//fromTableObj.tBodies[0].appendChild(getCloneTr(fromTableObj));
				fromTableObj.tBodies[0].appendChild(rowobj);
				if (fromCheckbox) {
					if (fromCheckbox.length) {
						fromCheckbox[fromCheckbox.length-1].value = "NULL";
						for (var x=0; x<rowobj.cells.length; x++) {
							if (getCheckTdIndex() != x) {
								rowobj.cells[x].innerText = "";
							}
						}
					} else {
						fromCheckbox.value = "NULL";
						for (var x=0; x<rowobj.cells.length; x++) {
							rowobj.cells[x].innerText = "";
						}
					}
				}
			}
		}

		// �Ѱܹ��� tr�� �ߺ����� ������ tr�� �־��ش�.
		//alert(checkDuplication(infoArray[i][getCheckTdIndex(toTableObj)], toCheckbox));
		if (!checkDuplication(infoArray[i][getCheckTdIndex(toTableObj)], toCheckbox)) {
			if (i < newTrCount) {
				//createRow(toTableObj, getTrClassname(toTableObj), getWidthInfo(toTableObj));
				//setDisplay(toTableObj);
				HtmlUtil.addTableRow(toTableObj, 1, 1);
			}

			for (var j=0; j<toTableObj.rows[updateRowIndex].cells.length; j++) {
				if (j == getCheckTdIndex(toTableObj)) {
					///*
					toTableObj.rows[updateRowIndex].cells[j].innerHTML
						= "<input type='checkbox' name='"+getCheckboxName(toTableObj)+"' value='"
						+ infoArray[i][j]
						+ "' checked>";
					//*/
					/*
					if (toCheckbox) {
						if (toCheckbox.length) {
							toCheckbox[i].checked = true;
							toCheckbox[i].value = infoArray[i][j];
						} else {
							toCheckbox.checked = true;
							toCheckbox.value = infoArray[i][j];
						}
					}
					*/
				} else if (j == getEditTdIndex(toTableObj, j)) {
					var tmpCell = "&nbsp;<input type='text' name='"+getEditName(toTableObj, j)+"' value='"
								+ getEditValue(infoArray[i][j])
								+ "' style='width:90%;text-align:right;border:none' ";
					if (getEditEvent(toTableObj)) {
						tmpCell = tmpCell + "onBlur=editevent(this,'"+updateRowIndex+"')";
					}

					tmpCell = tmpCell + " tabindex="+(updateRowIndex + 1)+">";

					toTableObj.rows[updateRowIndex].cells[j].innerHTML = tmpCell;
				}/*else if (j == getEditBoxTdIndex(toTableObj, j)) {	//��ȣ������ ���
				    alert("DDDDD");
					var tmpCell = "<input type='text' name='"+getEditName(toTableObj, j)+"' value='"
								+ getEditValue(infoArray[i][j])
								+ "' style='width:98%;text-align:right;' ";
					if (getEditEvent(toTableObj)) {
						tmpCell = tmpCell + "onBlur=editevent(this,'"+updateRowIndex+"')";
					}

					tmpCell = tmpCell + " tabindex="+(updateRowIndex + 1)+">";

					toTableObj.rows[updateRowIndex].cells[j].innerHTML = tmpCell;
				}*/ else {
					//toTableObj.rows[updateRowIndex].cells[j].innerHTML = "&nbsp;" + infoArray[i][j] + "&nbsp;";
					toTableObj.rows[updateRowIndex].cells[j].innerText = infoArray[i][j];
				}

				toTableObj.rows[updateRowIndex].cells[j].title = infoArray[i][j];
			}
			updateRowIndex++;
		}
	}

	// 3. NO ������
//	sortTableNoTd(fromTableObj, fromCheckbox);
//	sortTableNoTd(toTableObj, toCheckbox);

	// 4. tr �̵� �� setting �Լ� ȣ��
	afterAddRow(fromTableObj, fromCheckbox, toTableObj, toCheckbox);
}

/**
  * ���      : tr�� �������� ���ο�tr �󸶳� ������ �ϴ��� ������ش�.
  * restTrCnt : �޴� table�� �����ִ� tr����
  * addTrCnt  : ���������� tr����
  * return    : �ʿ��� tr����
  **/
function checkLimit(restTrCnt, addTrCnt) {
	if (restTrCnt >= addTrCnt) {
		return 0;
	} else {
		return addTrCnt - restTrCnt;
	}
}

/**
  * ���        : table�� ���ο� tr�� ������ش�.
  * tableObj    : table��ü
  * trClassname : tr classname
  * cellsWidth  : td width ���� �迭��ü
  **/
function createRow(tableObj, trClassName, cellsWidth) {
	var cel_cnt = tableObj.rows[0].cells.length;	// cell ����
	var newRow = tableObj.insertRow();				// ���� �߰� �Ǵ� row
	newRow.id = tableObj.rows[0].id;
	//newRow.height = 18;
	newRow.className = trClassName;

	var aRows = tableObj.rows;
	var aCells = newRow.cells;
	var newCells = new Array(cel_cnt);

	for (var i=0; i<cel_cnt; i++) {
		newCells[i] = aRows(newRow.rowIndex).insertCell(aCells.length);

		if (cellsWidth[i] > 0) {
			newCells[i].width = cellsWidth[i];
		}

		newCells[i].align = tableObj.rows[0].cells(i).align;
		newCells[i].style.display = tableObj.rows[0].cells(i).style.display;
		newCells[i].innerHTML = "&nbsp;";
	}
}

/**
  * ���     : table�� �ߺ��Ǵ� tr�� �ִ��� �˻��Ѵ�.
  * value    : �񱳰�
  * checkObj : ���Ϸ��� table�� checkbox��ü
  **/
function checkDuplication(value, checkObj) {
	if (checkObj && checkObj.length) {
		for (var i=0; i<checkObj.length; i++) {
			if (value == checkObj[i].value) {
				return true;
			}
		}

		return false;
	} else if (checkObj) {
		if (value == checkObj.value) {
			return true;
		}

		return false;
	} else {
		return false;
	}
}

/**
  * ���     : checkbox�� üũ�ϸ� �� tr�� ���� �ٲ��ش�.
  * tableObj : table ��ü
  * checkObj : checkbox ��ü
  **/
function onChangeColorMulti(tableObj, checkObj) {
	if (checkObj.length) {
		for (var i=0; i<checkObj.length; i++) {
			if (checkObj[i].checked) {
				tableObj.rows[i].className = "SELECT";
			} else {
				tableObj.rows[i].className = parent.getTrClassname(tableObj);
			}
		}
	} else if (checkObj) {
		if (checkObj.checked) {
			tableObj.rows[0].className = "SELECT";
		} else {
			tableObj.rows[0].className = parent.getTrClassname(tableObj);
		}
	}
}

//
function sortTableNoTd(tableObj, checkbox) {
	var noTdId = "";

	if (tableObj.id) {
		noTdId = tableObj.id + "_NO";
	}

	if (tableObj.rows.length <= 0 || tableObj.rows[0].cells[1].id != noTdId) {
		return;
	}

	if (checkbox) {
		if (checkbox.length) {
			for (var i=0; i<checkbox.length; i++) {
				if (checkbox[i].value == "") {
					tableObj.rows[i].cells[1].innerText = "";
				} else {
					tableObj.rows[i].cells[1].innerText = (i + 1);
				}
			}
		} else {
			if (checkbox.value == "") {
				tableObj.rows[0].cells[1].innerText = "";
			} else {
				tableObj.rows[0].cells[1].innerText = "1";
			}
		}
	}
}

/**
  * addRow�Լ����� �ʿ��� Table���� �Լ� �� �ҽ����� �������ؼ� �� �� �ִ�.
  **/
// table�� td width������ �迭�� �Ѱ��ش�.
function getWidthInfo() {
	return new Array(0);
}
// table���� checkbox td�� ��ġ�� �˷��ش�. �⺻���� ù ��° TD�� checkbox��� �Ѵ�.
function getCheckTdIndex() {
	return 0;
}
// table���� text td�� ��ġ�� �˷��ش�. �⺻���� edit�� ���ٰ� ����.
function getEditTdIndex() {
	return -1;
}
// table���� tr class ������ �Ѱ��ش�.
function getTrClassname() {
	return "LIST";
}
// checkbox name ������ �Ѱ��ش�.
function getCheckboxName() {
	return "checkbox";
}
// text name ������ �Ѱ��ش�.
function getEditName() {
	return "edit";
}
// text event ���翩�θ� �Ѱ��ش�.
function getEditEvent() {
	return false;
}
// table�� td display�� �����Ѵ�.
function setDisplay() {
}
// tr�� �̵��� �� ó���� ������ �����Ѵ�.
function afterAddRow() {
}
// edit value���� �Ѱ��ش�.
function getEditValue(value) {
	return value;
}

/**
  * ��� : tr ���� �̵�
  * tableObj : table ��ü
  * checkObj : checkbox ��ü
  **/
function upTr(tableObj, checkObj) {
	var temp;
	var checkindex = 0;	// �� �̻� �ű��� �ʾƵ� �Ǵ� ����

	if (!checkObj) {
		return;
	}

	if (checkObj.length) {
		var noTdId = "";
		if (tableObj.id) {
			noTdId = tableObj.id + "_NO";
		}

		for (var i=0; i<checkObj.length; i++) {
			if (checkObj[i].checked) {
				if (i == checkindex) {
					checkindex++;
					continue;
				}

				// ���⼭���� ��ȯ����
				for (var j=0; j<tableObj.rows[i].cells.length; j++) {
					if (tableObj.rows[i].cells[j].id != noTdId) {
						temp = tableObj.rows[i-1].cells[j].innerHTML;
						tableObj.rows[i-1].cells[j].innerHTML = tableObj.rows[i].cells[j].innerHTML;
						tableObj.rows[i].cells[j].innerHTML = temp;
					}
				}
			}
		}
	}
}

/**
  * ���     : tr �Ʒ��� �̵�
  * tableObj : table ��ü
  * checkObj : checkbox ��ü
  **/
function downTr(tableObj, checkObj) {
	var temp;
	var checkindex;

	if (!checkObj) {
		return;
	}

	if (checkObj.length) {
		var noTdId = "";
		if (tableObj.id) {
			noTdId = tableObj.id + "_NO";
		}

		checkindex = checkObj.length - 1;

		for (var i=(checkObj.length-1); i>=0; i--) {
			if (checkObj[i].checked) {
				if (i == checkindex) {
					checkindex--;
					continue;
				}

				// ���⼭���� ��ȯ����
				for (var j=0; j<tableObj.rows[i].cells.length; j++) {
					if (tableObj.rows[i].cells[j].id != noTdId) {
						temp = tableObj.rows[i+1].cells[j].innerHTML;
						tableObj.rows[i+1].cells[j].innerHTML = tableObj.rows[i].cells[j].innerHTML;
						tableObj.rows[i].cells[j].innerHTML = temp;
					}
				}
			}
		}
	}
}

// Ư������ ����
function paddingStr(str, direct, chr, len)
{
	str = str + "";
	if (str.length >= len) return str;

	if (direct == "L")
		for (var i = str.length; i < len; i++)
			str = chr + str;
	else
		for (var i = str.length; i < len; i++)
			str = str + chr;

	return str;
}

//�׸��� updown
function updown(id,obj, iMin, iMax)
{

	if (isNaN(iMin)) iMin= 180;
	if (isNaN(iMax)) iMax= 360;
	var spanobj=document.all(id);
	if (obj.className == "up")
	{
		spanobj.style.height=iMin;
		obj.className = "down";
	}
	else
	{
		spanobj.style.height=iMax;
		obj.className = "up";
	}
}

//�׸��� show/hidden
function show(id,obj)
{
	var spanobj=document.all(id);
	if (obj.className == "up")
	{
		spanobj.style.display="none";
		obj.className = "down";
	}
	else
	{
		spanobj.style.display="";
		obj.className = "up";
	}
}

/**
  * ���   : �ֻ��� opener�� ã�� �Ѱ��ش�.
  * return : �ֻ��� opener
  **/
function getTopOpener() {
	var obj = this;

	for (var i=0; i<10 ;i++) {
		if (obj.whoAreU && obj.whoAreU == "top")
		{
			break;
		}

		if (obj.opener) {
			obj = obj.opener;
		} else {
			break;
		}
	}

	return obj;
}

/**
  * ������� �����ڵ�� ���ѿ� ���� �����ڵ� �޺��ڽ��� ��Ʈ�� �Ѵ�.
  * obj : �޺��ڽ� ��ü
  * code : �������Ͱ� �ƴ� ��� ������ �����ڵ�
  */
function setTeamLCDCombo(obj, code)
{
	if (obj)
	{
		obj.value = getCenterView(code);

		if (getGradeCD() == "20" || getGradeCD() == "50")
		{
			//obj.disabled = false;
			setDisabledObj(new Array(obj), true);
		}
		else
		{
			//obj.disabled = true;
			setDisabledObj(new Array(obj), false);
		}
	}
}

/**
  * �޺��ڽ��� option�� �߰��Ѵ�.
  * obj : �޺��ڽ� ��ü
  * aCode : option value Array
  * aName : option text Array
  * isAdd : append ���� (true - option �߰�, false - ���� option ���� �� �߰� )
  * isOption : �޺��ڽ��� ������ option ����(����) ���� (true - ������(������), false - �������(���þ���))
  */
function setOptions(obj, aCode, aName, isAdd, isOption)
{
	if (!isAdd)
	{
		obj.options.length = 0;
	}

	if (isOption)
	{
		if (obj.option == "0")
		{
			obj.options[0] = new Option("", "", false, false) ;
		}
		else if (obj.option == "1")
		{
			obj.options[0] = new Option("��ü", "00", false, false) ;
		}
		else if (obj.option == "2")
		{
			obj.options[0] = new Option("����", "00", false, false) ;
		}
		else if (obj.option == "3")
		{
			obj.options[0] = new Option("��ü", "%", false, false) ;
		}
		else if (obj.option == "4")
		{
			obj.options[0] = new Option("== ���� ==", "", false, false) ;
		}
		else if (obj.option == "6")
		{
			obj.options[0] = new Option("== ���� ==", "0", false, false) ;
		}
		else if (obj.option == "10")
		{
			obj.options[0] = new Option("��ü", "", false, false) ;
		}
	}

	var index = obj.options.length;

	for (var j=0; j<aCode.length; j++ )
	{
		obj.options[index++] = new Option(aName[j], aCode[j], false, false) ;
	}
}

/*�ֻ��� ��ü ã��*/
function getTopObject(obj) {
//	var obj = this;
//	alert(obj.parentNode);
	for (;;) {
		if (obj.parentNode) {
			obj = obj.parentNode;
		} else {
			break;
		}
	}

	return obj;
}

/**
  * �޺��ڽ��� ���õ� option text�� �����´�.
  * obj : �޺��ڽ� ��ü
  * return option text
  */
function getSelectedText(obj) {
	try	{
		var text = "";

		if (obj && obj.options && obj.selectedIndex > -1) {
			text = obj.options[obj.selectedIndex].text;
		} else {
			text = "";
		}

		return text;
	} catch (e) {}
}

/**
  * ���ڿ� byte�� �Ѱ��ش�.
  * return ���ڿ� byte
  */
String.prototype.bytes = function() {
 	var str = this;
 	var l = 0;
 	for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? getCharsetByte() : 1;
 	return l;
}

/**
  * Array�� ��� �ִ� elements value�� �ʱ�ȭ �Ѵ�.
  * fields : element���� ����ִ� Array
  * str : �ʱ�ȭ�� ������ ���ڿ�
  * f : form ��ü
  */
function clearObjValue(fields, str, f)
{
	for (var i=0; i<fields.length; i++)
	{
		if (f)
		{
			//var form = document.all(f);
			var form = f;
			form.elements[fields[i]].value = str;
		}
		else
		{
			document.all(fields[i]).value = str;
		}
	}
}

var FullChar = [
	"��", "��","��","��","��","��","��","��","��",   		//33~
	"��","��","��","��","��","��","��","��","��","��",      //41~
	"��","��","��","��","��","��","��","��","��","��",      //51~
	"��","��","��","��","��","��","��","��","��","��",      //61~
	"��","��","��","��","��","��","��","��","��","��",      //71~
	"��","��","��","��","��","��","��","��","��","��",      //81~
	"��","��","��","��","��","��","��","��","��","��",      //91~
	"��","��","��","��","��","��","��","��","��","��",      //101~
	"��","��","��","��","��","��","��","��","��","��",      //111~
	"��","��","��","��","��","��"                        	//121~
	];

var HalfChar = [
	" ", "!","\"","#","$","%","&","'","(",   	  //33~
	")","*","+",",","-",".","/","0","1","2",      //41~
	"3","4","5","6","7","8","9",":",";","<",      //51~
	"=",">","?","@","A","B","C","D","E","F",      //61~
	"G","H","I","J","K","L","M","N","O","P",      //71~
	"Q","R","S","T","U","V","W","X","Y","Z",      //81~
	"[","\\","Q","^","_","'","A","B","C","D",     //91~
	"E","F","G","H","I","J","K","L","M","N",      //101~
	"O","P","Q","R","S","T","U","V","W","X",      //111~
	"Y","Z","{","|","}","~"                       //121~
	];

/**------------------------------------------------------------------
' �Լ��� : Half2Full()
' ��  �� :
' ��  �� : HOST ���۽� �ʿ�(�ݰ����� -> ���� (myHalf2Full(HalfVal) ȣ��)
' �÷ο� :
' ������ : 2001/12/19 ������
' ��  �� :
'**------------------------------------------------------------------ */
function Half2Full(HalfVal)
{
	var arg;
	arg = myHalf2Full(HalfVal);
	return arg;
}

/**------------------------------------------------------------------
' �Լ��� : Half2Full()
' ��  �� :
' ��  �� : HOST ���۽� �ʿ�(�������� -> �ݰ� (myFull2Half(HalfVal) ȣ��)
' �÷ο� :
' ������ : 2001/12/19 ������
' ��  �� :
'**------------------------------------------------------------------ */
function Full2Half(HalfVal)
{
	var arg;
	arg = myFull2Half(HalfVal);
	return arg;
}

/**------------------------------------------------------------------
' �Լ��� : myHalf2Full()
' ��  �� :
' ��  �� : HOST ���۽� �ʿ�(�ݰ����� -> ����)
' �÷ο� :
' ������ : 2001/12/19 ������
' ��  �� :
'**------------------------------------------------------------------ */
function myHalf2Full(HalfVal)
{
	var stFinal = "";
	var ascii;
	for( i = 0; i < HalfVal.length; i++)
	{
		ascii = HalfVal.charCodeAt(i);
		if( (31 < ascii && ascii < 128))
		{
			stFinal += FullChar[ascii-32];
		}
		else
		{
			stFinal += HalfVal.charAt(i);
		}
	}
	return stFinal;
}

/**------------------------------------------------------------------
' �Լ��� : myFull2Half()
' ��  �� :
' ��  �� : HOST ���۽� �ʿ�(�������� -> �ݰ�)
' �÷ο� :
' ������ : 2002/4/3 ������
' ��  �� : 2007/10/01 ������
'**------------------------------------------------------------------ */
function myFull2Half(HalfVal)
{
	var stFinal = "";
	var ascii;
	for( i = 0; i < HalfVal.length; i++)
	{
		ascii = HalfVal.charCodeAt(i);

		if( (65279 < ascii && ascii < 65375) || ascii == 12288)
		{
			//"��" 2Byte ���鹮�ڰ� ������� �ʾƼ� ���� �߰�
			//12288�� ��� ascii�� 65280���� �ٲ㼭 0��° �迭�� ���� �������� ��
			if(ascii == 12288)
			{
				ascii = 65280;
			}
			stFinal += HalfChar[ascii-65280];
		}
		else
		{
			stFinal += HalfVal.charAt(i);
		}
	}
	return stFinal;
}

/**
  * ���ڿ� ���� �ޱ� - ���¹�ȣ üũ ����
  * str : ���ڿ�
  * return : �յڰ����� ������ ���ڿ� ����
  */
function strLen(str)
{
	return trim(str).length;
}

/**
  * ���ڿ��� Ư�� ���ڿ��� ���� ���ڿ��� ġȯ���ش�.
  * str : ���ڿ�
  * delimeter1 : ġȯ��� ���ڿ�
  * delimeter2 : ġȯ ���ڿ�
  * return ġȯ�� ���ڿ�
  */
 function replaceStr(str, delimeter1, delimeter2)
{
	var s_Data = "";
	var s_Tmp = str;
	var i = s_Tmp.indexOf(delimeter1);

	while (i!= -1)
	{
		s_Data = s_Data + s_Tmp.substring(0,i) + delimeter2;
		s_Tmp = s_Tmp.substring(i+delimeter1.length);
		i = s_Tmp.indexOf(delimeter1);
	}
	s_Data = s_Data + s_Tmp;
	return s_Data;
}

/**
  * ���鹮�ڿ��� ġȯ�Ѵ�.
  * oldstr : ���� ���ڿ�
  * newstr : ġȯ ���ڿ�
  * return : ������ �ƴϸ� ���� ���ڿ��� �����̸� ġȯ ���ڿ��� �ѱ��.
  */
function nvl(oldstr, newstr)
{
	if (oldstr == "")
	{
		return newstr;
	}
	else
	{
		return oldstr;
	}
}

// ���̺�ID, Fomr��ü, �Ķ����, ���ϸ�
function Excel(tablenm, form, userParams, filenm)
{
	var tblObj = document.all(tablenm + "_title");
	if (tblObj)
	{
		var index = 0;
		var colArr = new Array();
		var txtArr = new Array();
		var algArr = new Array();
		var forArr = new Array();
		var widArr = new Array();
		var trObj = tblObj.rows;

		var leftTblObj = document.all(tablenm + "_left_title");
		var leftTrObj = leftTblObj.rows;

		if (leftTblObj)
		{
			for (var i=0; i<leftTrObj[0].cells.length; i++)
			{
				if (   leftTrObj[0].cells[i].style.display != "none"
				    && leftTrObj[0].cells[i].innerText != "No"
					&& leftTrObj[0].cells[i].innerText != "")
				{
					colArr[index] = nvl(leftTrObj[0].cells[i].column," ");
					txtArr[index] = nvl(leftTrObj[0].cells[i].innerText," ");
					algArr[index] = nvl(leftTrObj[0].cells[i].align,"left");
					forArr[index] = nvl(leftTrObj[0].cells[i].format," ");
					widArr[index] = nvl(leftTrObj[0].cells[i].exwidth,"10");
					index++;
				}
			}
		}

		for (var i=0; i<trObj[0].cells.length; i++)
		{
			if (   trObj[0].cells[i].style.display != "none"
			    && trObj[0].cells[i].innerText != "No"
				&& trObj[0].cells[i].innerText != "")
			{
				colArr[index] = nvl(trObj[0].cells[i].column," ");
				txtArr[index] = nvl(trObj[0].cells[i].innerText," ");
				algArr[index] = nvl(trObj[0].cells[i].align,"left");
				forArr[index] = nvl(trObj[0].cells[i].format," ");
				widArr[index] = nvl(trObj[0].cells[i].exwidth,"10");
				index++;
			}
		}

//		alert(colArr);
//		alert(txtArr);
//		alert(algArr);
//		alert(forArr);

		var params = "_SERVICE_TYPE=SQLSERVICE&_SERVICE_ID="+tablenm
	           	   + "&_FORWARD_ID=commonjsp&_FORWARD_PAGE=/jsp/common/comDownExcel.jsp"
	           	   + "&_PAGE_ROW=9999999&_START_ROW=1&_EXEC_TYPE=SELECT"
	           	   + "&_title="+filenm
	           	   + "&column="+colArr
	           	   + "&text="+txtArr
	           	   + "&align="+algArr
	           	   + "&format="+forArr
	           	   + "&width="+widArr
	           	   + "&"+userParams;
	    form.method = "post";
	    form.target = "iLog";
		form.action = "/common.do?"+params;
		form.submit();
	}
}

// ���̺�ID, Fomr��ü, �Ķ����, ���ϸ�
function makeText(tablenm, form, userParams, filenm)
{
	var tblObj = document.all(tablenm + "_title");
	if (tblObj)
	{
		var index = 0;
		var colArr = new Array();
		var txtArr = new Array();
		var forArr = new Array();
		var trObj = tblObj.rows;
		for (var i=0; i<trObj[0].cells.length; i++)
		{
			if (   trObj[0].cells[i].style.display != "none"
			    && trObj[0].cells[i].innerText != "No")
			{
				colArr[index] = nvl(trObj[0].cells[i].column," ");
				txtArr[index] = nvl(trObj[0].cells[i].innerText," ");
				forArr[index] = nvl(trObj[0].cells[i].format," ");
				index++;
			}
		}

//		alert(colArr);
//		alert(txtArr);
//		alert(forArr);

		var params = "_SERVICE_TYPE=SQLSERVICE&_SERVICE_ID="+tablenm
	           	   + "&_FORWARD_ID=commonjsp&_FORWARD_PAGE=/jsp/common/comDownText.jsp"
	           	   + "&_PAGE_ROW=9999&_START_ROW=1&_EXEC_TYPE=SELECT"
	           	   + "&_title="+filenm
	           	   + "&column="+colArr
	           	   + "&text="+txtArr
	           	   + "&format="+forArr
	           	   + "&"+userParams;
	    form.method = "post";
	    form.target = "iLog";
		form.action = "/common.do?"+params;
		form.submit();
	}
}

// ���ϰ��, ���ϸ�
function downExcelFile(filepath, filename) {
	iLog.location.href = "/jsp/common/downFile.jsp?flag=mypath&filepath="+trim(filepath)+"&filename="+trim(filename);
}

/**
  * ó����â ����
  * msg : ó���� â�� �־��� �޽���
  */
function showwait(sMsg){

//	gWaitBox = openPopup("/jsp/common/comAlert.jsp", "sMsg="+sMsg, "", "", "", "390", "133", "toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=0");
//	gWaitBox = window.open("/jsp/common/comAlert.jsp?sMsg="+sMsg,"","width=390 height=133");
	var $$lf=document.body.clientWidth/3+document.body.clientLeft;
	var $$tp=top.document.body.clientHeight/2-80;
//	var $$lf=top.document.body.clientWidth/3+(105);//+document.body.clientLeft;
//	var $$tp=top.document.body.clientHeight/2-80;

	myDiv = top.document.createElement("DIV");   // �ּ� 1
	top.document.body.appendChild(myDiv);           // �ּ� 2
	var sIframe, sHTML;

	sIframe ="<iframe id=ifmMsg width=350 height=80  frameborder=0 scrolling=no marginheight=0 marginwidth=0></iframe>";
    //sIframe ="<iframe id='ifmMsg' name='ifmMsg' src='"+scriptPath+"/html/knowledge/kmsBlank.htm' frameborder=0 width='1000' height='810'></iframe>";
	sHTML  ="<table id=tblAlert width=350 height=80 border=0 cellpadding=0 cellspacing=0 align=center background='"+scriptPath+"/images/slider/ingbg.gif'>";
    sHTML +="<Tr><td align=right height=18><img onclick='top.removewait1(this)' border=0 src="+scriptPath+"/images/slider/btn_delete02.gif></td></Tr>";
	sHTML +="<tr><td align=center class=txt01 valign=bottom style='font-size:12;font-weight:bold;color:blue'>"+sMsg+"</td></tr>";
	sHTML +="<tr><Td align=center valign=top><img src='"+scriptPath+"/images/slider/ingbar.gif' width=252 height=7 vspace=5></td></tr>";
    sHTML +="</table>";
    myDiv.innerHTML = sIframe;
    top.ifmMsg.document.write(sHTML);

    myDiv.id = "divAlert";
	myDiv.style.display="";
	//myDiv.style.filter = "Alpha(Opacity=10)";
	myDiv.style.left=$$lf+"px";
	myDiv.style.top=$$tp+"px";
	myDiv.style.position = "absolute";
	myDiv.style.zIndex = 10000;
}

//remove wait
function removewait(){

/*	if (gWaitBox)
	{
		gWaitBox.close();
		gWaitBox ="";
	}*/
	if (myDiv)
	{
        if (top.divAlert.length)
        {
            var iSize = top.divAlert.length;
            for(var i=0; i < iSize-1; i++)
            {
                top.document.body.removeChild(top.divAlert[i]);
            }
    	    try
    	    {
				top.document.body.removeChild(myDiv);
    	    }catch(e){}
        }
        else
            top.document.body.removeChild(top.divAlert);
//	    top.document.body.removeChild(myDiv);
    }
//	top.document.body.removeChild(myDiv);

}

//
function removewait1(obj){

    if (divAlert.length)
    {
        for(var i=0; i < divAlert.length; i++)
        {
            top.document.body.removeChild(top.divAlert[i]);
        }
    }
    else
        top.document.body.removeChild(top.divAlert);

}

/**
  * Ư�� ���̸�ŭ�� ���ڿ��� ä���ش�. ��) lpad("1", "0", 2) -> "01"
  * str : ��� ���ڿ�
  * chr : ä���� ����
  * cnt : ���ڿ� ����
  */
function lpad(str, chr, cnt) {
	var temp = "";

	for (var i=0; i<(cnt-str.length); i++) {
		temp += chr;
	}

	return temp + str;
}

/**
  * Ư�� ���̸�ŭ�� ���ڿ��� �����ʿ� ä���ش�. ��) rpad("1", "0", 2) -> "10"
  * str : ��� ���ڿ�
  * chr : ä���� ����
  * cnt : ���ڿ� ����
  */
function rpad(str, chr, cnt) {
	var temp = "";
	for (var i=0; i<(cnt-str.length); i++)
	{
		temp += chr;
	}

	return str+temp;
}

/**
  * ���ýý����� �������ڸ� �����´�.
  * flag : ��¥ ���� ����
  * return : ��������
  */
function getCurDay(flag, type)
{
	var now = new Date();

	if (type == "T")
	{
		return lpad(now.getHours().toString(), "0", 2) + ":" + lpad(now.getMinutes().toString(), "0", 2) + ":" + lpad(now.getSeconds().toString(), "0", 2);
	}
	else if (type == "DT")
	{
		return now.getYear() + flag + lpad((now.getMonth()+1).toString(), "0", 2) + flag + lpad(now.getDate().toString(), "0", 2) + " "
			 + lpad(now.getHours().toString(), "0", 2) + ":" + lpad(now.getMinutes().toString(), "0", 2) + ":" + lpad(now.getSeconds().toString(), "0", 2);
	}
	else
	{
		return now.getYear() + flag + lpad((now.getMonth()+1).toString(), "0", 2) + flag + lpad(now.getDate().toString(), "0", 2);
	}
}

// ���ϻ���
function removeFile(filePath, fileName)
{
	var tran = new Trans();
	tran.setSvc("removefile");
	tran.setForwardId("commonjsp","/jsp/common/removeFile.jsp");
	tran.setUserParams("file_path="+filePath+"&file_name="+fileName);
	tran.open("f", "f","/forward.do");
}

// log ����Լ�
function log(msg) {
	var today = new Date();
//	top.LogWriter.log(today.getTime()+" " + today.getMilliseconds()+ " " + msg);
	top.uCareUtil.log(msg);
}

//Check Enter Key And Return Boolean Value
function isEnterKey()
{
   if(event.keyCode == 13)	//13:EnterKey
   {
	 event.keyCode = 0;
	 return true;
   }
   else
   {
	 return false;
   }
}

//grid event ����
function eventGrid()
{
	// FIXME : display:none�� ��� grid�� �ʱ�ȭ���� ���ϴ� ������ ��������.
	//         �� �Լ��� ���� ���������� ����ϹǷ� �켱 return ��Ŵ. ���� ������ ������.
	return;
	var aKey = htGrid.getNames();
	for (var i=0; i < aKey.length; i++)
	{
		var sFun  = "setHeader_"+aKey[i]+"('"+aKey[i]+"')";
		eval(sFun);	//
		var aEvent = htGrid.get(aKey[i]);
		var objGrid = document.all[aKey[i]];
		for (var j=0; j < aEvent.length; j++)
		{
			var sEventFun = "";
			switch (aEvent[j])
			{
				case "CellClick":
					setCellClickEvent(objGrid, aKey[i], aEvent[j]);
					break;

				case "CellDblClick":
					setCellDbClickEvent(objGrid, aKey[i], aEvent[j]);
					break;

				case "RowActivate":
					setRowActivateEvent(objGrid, aKey[i], aEvent[j]);
					break;

				case "CellRClick":
					setCellClickEvent(objGrid, aKey[i], aEvent[j]);
					break;

				case "ChangeCell":
					setChangeCellEvent(objGrid, aKey[i], aEvent[j]);
					break;

				case "TreeNodeClick":
					setTreeNodeClickEvent(objGrid, aKey[i], aEvent[j]);
				    break;
			}
		}
	}
}

/**
 * grid event ����
 * obj : WiseGrid ��ü
 * rowactivebg : rowactive�� ���� �� �� ����
 */
function initializedGrid(obj, rowactivebg)
{
//	var aKey = htGrid.getNames();
//	for (var i=0; i < aKey.length; i++)
//	{
//		if (aKey[i] == obj.id)
//		{
	var objId = obj.id
	var sFun  = "setHeader_"+objId+"('"+objId+"')";
	eval(sFun);	//
	var aEvent = htGrid.get(objId);
	var objGrid = document.all[objId];
	objGrid.SetParam("rowactivebg", rowactivebg);

	var hs={};
	for(var i=0;i<objGrid.GetParamCount();i++){
		hs[objGrid.GetParamKey(i)]= objGrid.GetParam(objGrid.GetParamKey(i));
	}
	aGridPrp[objId] = hs;

	for (var j=0; j < aEvent.length; j++)
	{
		var sEventFun = "";
		switch (aEvent[j])
		{
			case "CellClick":
				setCellClickEvent(objGrid, objId, aEvent[j]);
				break;

			case "CellDblClick":
				setCellDbClickEvent(objGrid, objId, aEvent[j]);
				break;
			break;

			case "RowActivate":
				setRowActivateEvent(objGrid, objId, aEvent[j]);
				break;

			case "CellRClick":
				setCellClickEvent(objGrid, objId, aEvent[j]);
				break;

			case "ChangeCell":
				setChangeCellEvent(objGrid, objId, aEvent[j]);
				break;

			case "ChangeCombo":
				setChangeComboEvent(objGrid, objId, aEvent[j]);
				break;

			case "TreeNodeClick":
				setTreeNodeClickEvent(objGrid, objId, aEvent[j]);
				break;

			// ���� �ڵ������ ���󰡱� ����
			case "CellClickCellDblClick":
				setCellBClickEvent(objGrid, objId, aEvent[j]);
				break;

			case "RowScroll":
				setScrollRowEvent(objGrid, objId, aEvent[j]);
				break;

			case "HeaderClick":
				setHeaderClickEvent(objGrid, objId, aEvent[j]);
				break;
		}
	}
}

// Grid CellClick Event setting
function setCellClickEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function CellClick(strColumnKey, nRow) {
		eval("showDetailO_obj('"+id+"', strColumnKey, nRow)") } );
}

// Grid CellDblClick Event setting
function setCellDbClickEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function CellDblClick(strColumnKey, nRow) {
		eval("showDetailB_obj('"+id+"', strColumnKey, nRow)") } );
}

// Grid RowActivate Event setting
function setRowActivateEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function RowActivate(nRow) {
		eval("showDetailA_obj('"+id+"', '', nRow)") } );
}

// Grid CellRClick Event setting
function setCellRClickEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function CellClick(strColumnKey, nRow) {
		eval("showDetailR_obj('"+id+"', strColumnKey, nRow)") } );
}

// Grid ChangeCell Event setting
function setChangeCellEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function ChangeCell(strColumnKey, nRow, vtOldValue, vtNewValue) {
		eval("showDetailC_obj('"+id+"', strColumnKey, nRow, vtOldValue, vtNewValue)") } );
}

// Grid ChangeCombo Event setting
function setChangeComboEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function ChangeCombo(strColumnKey, nRow, nOldIndex, nNewIndex) {
		eval("showDetailS_obj('"+id+"', strColumnKey, nRow, nOldIndex, nNewIndex)") } );
}

// Grid TreeNodeClick Event setting
function setTreeNodeClickEvent(obj, id, aEvent, rowactivebg)
{
 obj.attachEvent(aEvent, function TreeNodeClick(strTreeKey, strArea) { eval("treeClick('"+id+"', strTreeKey, strArea)") } );
}

// Grid CellClick & CellDblClick Event setting
function setCellBClickEvent(obj, id, aEvent)
{
	obj.attachEvent("CellClick", function CellClick(strColumnKey, nRow) {
		eval("showDetailO_obj('"+id+"', strColumnKey, nRow)") } );
	obj.attachEvent("CellDblClick", function CellDblClick(strColumnKey, nRow) {
		eval("showDetailB_obj('"+id+"', strColumnKey, nRow)") } );
}

// Grid Scroll Event setting
function setScrollRowEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function RowScroll(nFirstRow, nLastRow) { eval("scrollRow_obj('"+id+"', nFirstRow, nLastRow)") } );
}

// Grid HeaderClick Event setting
function setHeaderClickEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function HeaderClick(strColumnKey) { eval("showDetailH_obj('"+id+"', strColumnKey)") } );
}

//param ���� ����
function pagingParam(datasetnm, disdatasetnm, service_type)
{
	var aKey = new Array(new Array("_SERVICE_ID","id")
					,new Array("_PAGE_ROW","pagerow")
					,new Array("_SERVICE_TYPE","svctype"));

	var obj = document.all[disdatasetnm];
	var xmlobj=DataSet.getParamsData(datasetnm);	//dataset obj

	setGridDefault(disdatasetnm);	//�׸����� default �� ����

	if (xmlobj)
	{
		for(var i=0;i<xmlobj[0].childNodes.length;i++)
		{
			if (xmlobj[0].childNodes[i].getAttribute("key") == "WISEGRID_DATA"
				|| xmlobj[0].childNodes[i].getAttribute("key").indexOf("WISEGRID_SUB") != -1) continue;
			obj.SetParam(xmlobj[0].childNodes[i].getAttribute("key"),xmlobj[0].childNodes[i].firstChild.text);
		}
		for (var i=0; i < aKey.length; i++)
		{
			obj.SetParam(aKey[i][0], DataSet.getDsAttribute(datasetnm,aKey[i][1]));
		}
	}

	if (service_type == undefined) service_type = "SQLSERVICE";

	var svctypearr = service_type.split(",");

	obj.SetParam("_WS_SERVICE_ID",datasetnm);
	obj.SetParam("_WS_SERVICE_TYPE",svctypearr[0]);
	obj.SetParam("_DISSVCID",disdatasetnm);
	obj.SetParam("_WISEGRID","1");
	obj.SetParam("_FORWARD_ID", "wgwrite");
	obj.SetParam("WISEGRID_REQUESTURL", "/wisegrid.do");
}

/**
  * id : ��Ʈ�� �׷��� ��ü�̸�
  * chartId : ��Ʈ��
  * aTitle : x�� �̸�
  * aData : �׷��� ����Ÿ (2���� �迭)
  * iWidth, iHeight : �׷��� ũ��
  * sCaption : �׷��� ��
  * xName : x�� ��
  * yName : y���
  * y2Name: ������  y���
  * chartType : ��Ʈ ����
  * ibaseFont : font
  * showValues : ����ǥ��
  * sAlpha : ������(1~5 �Է�)
  */
function writeFusionChart(id, chatId, aTitle, aData, iWidth, iHeight, sCaption, xName, yName, yName2, chartType, ibaseFont, showValues, sAlpha)
{
	if(!ibaseFont) ibaseFont = 10;
	if(!showValues) showValues = 0;

	if(!sAlpha) sAlpha= "";
	else sAlpha = " plotFillAlpha='" +sAlpha+ "'";

    var chartFile = "";
    var multi = true;
    switch (chartType)
    {
        case "LINE":
            chartFile = scriptPath + "/chart/LINE.swf";
            multi= false;
            break;

        case "COLUMN":
            chartFile = scriptPath + "/chart/Column2D.swf";
            multi= false;
            break;

        case "COLUMN3D":
            chartFile = scriptPath + "/chart/Column3D.swf";
            multi= false;
            break;

        case "BAR":
            chartFile = scriptPath + "/chart/Bar2D.swf";
            multi= false;
            break;

        case "PIE":
            chartFile = scriptPath + "/chart/Pie2D.swf";
            multi= false;
            break;

        case "RADER":
            chartFile = scriptPath + "/chart/Radar.swf";
            multi= true;
            break;

        case "MSCOLUMN":
            chartFile = scriptPath + "/chart/MSColumn2D.swf";
            multi= true;
            break;

        case "MSBAR":
            chartFile = scriptPath + "/chart/MSBar2D.swf";
            multi= true;
            break;

        case "MSCOLUMN3D":
            chartFile = scriptPath + "/chart/MSColumn3D.swf";
            multi= true;
            break;

        case "MSCOLUMN3DDY":
            chartFile = scriptPath + "/chart/MSColumn3DLineDY.swf";
            multi= true;
            break;

        case "MULTIAXISLINE":
            chartFile = scriptPath + "/chart/MultiAxisLine.swf";
            multi= true;
            break;

        case "STACKEDBAR2D":
            chartFile = scriptPath + "/chart/StackedBar2D.swf";
            multi= true;
            break;

        case "STACKEDBAR3D":
            chartFile = scriptPath + "/chart/StackedBar3D.swf";
            multi= true;
            break;

        case "STACKEDCOLUMN2D":
            chartFile = scriptPath + "/chart/StackedColumn2D.swf";
            multi= true;
            break;

        case "STACKEDCOLUMN3D":
            chartFile = scriptPath + "/chart/StackedColumn3D.swf";
            multi= true;
            break;

        default :
            chartFile = scriptPath + "/chart/MSLine.swf";
    }
    var myChart = new FusionCharts(chartFile, chatId, iWidth, iHeight, "0", "1");
    var sXml = "<chart  caption='"+sCaption+"' xAxisName='"+xName+"' baseFont='����' baseFontSize='"+ibaseFont+"' bgcolor='#FFFFFF' divLineIsDashed='1' divLineDashLen='0' divLineDashGap='1' ";
	    sXml += yName2==""?"yAxisName='"+yName+"'" : "PYAxisName='"+yName+"' SYAxisName='"+yName2+"' ";
        sXml +=" showValues='"+ showValues +"' decimals='2' formatNumberScale='0' ";
	//if (document.all["fc"+id])	//export ����
//   		sXml += "exportEnabled='1' exportAtClient='1' exportHandler='fcExporter1'";
    sXml +=" exportEnabled='1' exportAtClient='1' exportHandler='fcExporter1' imageSave='1' imageSaveURL='http://localhost:8089/jsp/common/FusionChartsSave.jsp' >";
	sXml +=" "+ sAlpha +">";

    if (multi == true)
    {
        sXml += " <categories>";
        for (var i=0; i < aTitle.length; i++)
        {
            sXml += "<category label='"+replaceStr(aTitle[i],'&','')+"'/>";
        }

        sXml += "</categories>";
    }

    for (var i=0; i < aData.length; i++)
    {
        if (multi == true)
        {
              var series = aData[i][0].split("|");
              var seriesName = series.length ? series[0] :series;
              var parentYAxis = series.length ? series[1] : "";
              sXml += "<dataset seriesName='"+seriesName+"'  parentYAxis='"+parentYAxis+"' >";
		}

        for (var j=1; j < aData[i].length; j++)
        {
            //sXml += "<set "+(multi == false?"label='"+aTitle[j-1]+"' ":"")+" value='"+aData[i][j]+"' />";
            //sXml += "<set "+(multi == false?"label='"+aData[i][0]+"' ":"")+" value='"+aData[i][j]+"' />";

            sXml += "<set ";

			if(multi == false)
			{
				if(chartType=="COLUMN3D")
				{
					sXml += "label='"+aTitle[j-1]+"' ";
				}
				else
				{
					sXml +="label='"+aData[i][0]+"' "
				}
			}

            sXml += " value='"+aData[i][j]+"' />";
        }

        if (multi == true) sXml += "</dataset>";
    }

    sXml += " <styles>";
    sXml += "  <definition>";
    sXml += "     <style name='CanvasAnim' type='animation' param='_xScale' start='0' duration='1' />";
    sXml += "  </definition>";
    sXml += "  <application>";
    sXml += "     <apply toObject='Canvas' styles='CanvasAnim' />";
    sXml += "  </application>   ";
    sXml += "</styles>";
    sXml += "</chart>";

    myChart.setDataXML(sXml);
    myChart.render(id);
	if (document.all["fc"+id])
	{
	    var myExportComponent = new FusionChartsExportObject("fcExporter1", scriptPath +"/chart/FCExporter.swf");
	    myExportComponent.Render("fc"+id);
    }
}

function writePowerChart(id, chatId, aTitle, aData, aData2, iWidth, iHeight, sCaption, xName, yName, yName2, chartType, ibaseFont, showValues, sAlpha)
{
	var aColor = new Array("AFD8F8","F6BD0F","8BBA00","FF8E46","008E8E","F0BFBF");
	if(!ibaseFont) ibaseFont = 10;
	if(!showValues) showValues = 0;

    var chartFile = "";
    switch (chartType)
    {
		default:
            chartFile = scriptPath + "/chart/MultiAxisLine.swf";
            break;
    }

    var myChart = new FusionCharts(chartFile, chatId, iWidth, iHeight, "0", "1");
//    var sXml = "<chart caption='Power Generator' xAxisName='Time' showValues='0' divLineAlpha='100' numVDivLines='4' vDivLineAlpha='0' showAlternateVGridColor='1' alternateVGridAlpha='5' canvasPadding='0'>";
//  var sXml = "<chart caption='Power Generator' xAxisName='Time' showValues='0' divLineAlpha='100' numVDivLines='4' vDivLineAlpha='0' showAlternateVGridColor='1' alternateVGridAlpha='5' canvasPadding='0'>";
    var sXml = "<chart caption='"+sCaption+"' xAxisName='"+xName+"' baseFont='����' baseFontSize='"+ibaseFont+"' numVDivLines='4' vDivLineAlpha='0' showAlternateVGridColor='1' alternateVGridAlpha='5' canvasPadding='0'";
        sXml +=" showValues='"+ showValues +"' decimals='2' formatNumberScale='0' ";
        sXml +=" exportEnabled='1' exportAtClient='1' exportHandler='fcExporter1' imageSave='1' imageSaveURL='http://localhost:8089/jsp/common/FusionChartsSave.jsp' >";

    sXml += " <categories>";
    for (var i=0; i < aTitle.length; i++)
    {
        sXml += "<category label='"+aTitle[i]+"'/>";
    }

    sXml += "</categories>";
	var iRow=0;
    sXml += "<axis title='"+yName+"' titlePos='left' tickWidth='10' divlineisdashed='1'>";
    for (var i=0; i < aData.length; i++)
    {
        sXml += "<dataset seriesName='"+aData[i][0]+"' color='"+aColor[iRow++]+"'>";
        for (var j=1; j < aData[i].length; j++)
        {
            sXml += "<set value='"+aData[i][j]+"' />";
//    	alert(aData[i][j]);
        }
        sXml += "</dataset>";
    }
	sXml += "  </axis>";

    sXml += "<axis title='"+yName2+"' titlePos='right' axisOnLeft='0' tickWidth='10' divlineisdashed='1'>";
    for (var i=0; i < aData2.length; i++)
    {
        sXml += "<dataset seriesName='"+aData2[i][0]+"'  color='"+aColor[iRow++]+"'>";
        for (var j=1; j < aData2[i].length; j++)
        {
            sXml += "<set value='"+aData2[i][j]+"' />";
        }
        sXml += "</dataset>";
    }

	sXml += "  </axis>";
    sXml += "</chart>";

    myChart.setDataXML(sXml);
    myChart.render(id);
}

// save
function saveChart(chartid){

	alert(chartid);

   var chartToPrint = getChartFromId(chartid);
   alert("dddd");
//   alert(chartToPrint.hasRendered());
	chartToPrint.saveAsImage();
	if (chartToPrint.hasRendered()==true){
		chartToPrint.exportChart();
	}else{
		alert("Please wait for the chart to finish rendering, before you can invoke exporting");
	}

}

// ���
 function printChart(chartid){

   //Get chart from its ID
	alert(chartid);

   var chartToPrint = getChartFromId(chartid);
   alert(chartToPrint.hasRendered());
	if (chartToPrint.hasRendered()==true){
		chartToPrint.exportChart();
	}else{
		alert("Please wait for the chart to finish rendering, before you can invoke exporting");
	}

   //chartToPrint.print();

}

function imgExport()
{
	alert("dddd");
}
/**
 * �迭�ȿ� ���ϴ� ���ڿ��� �����ϴ��� üũ�Ѵ�.
 * arr : Array
 * str : ���ڿ�
 * return : ���翩��
 */
function hasStr(arr, str)
{
	for (var i=0; i<arr.length; i++)
	{
		if (arr[i] == str)
		{
			return true;
		}
	}

	return false;
}


/*
* �׸��忡�� ����� �޷� �� ��� ������ �ٿ��ش�.
*/
function chg_header(month , id , startColumn , size)
{

	var tran = new Trans();
	tran.setPageRow("31");
	tran.setSvc("UCCOM009S");
	tran.setUserParams("month="+month);
	tran.setCallBack("chg_header_callback('"+id+"' , '"+startColumn+"' , "+size+")");
	tran.open("","f","/common.do");
}

//
function chg_header_callback(id , startColumn , size){
	var obj = document.all[id];
	var columnNm = "";
	var day = 1;
	var daynm = "";

	for(var i = 0 ; i < DataSet.getTotalCount("UCCOM009S") ; i++){

		switch (DataSet.getParam("UCCOM009S", 1, i, "week_nm"))
		{
		case "1":
			daynm = "��";
			break;
		case "2":
			daynm = "��";
			break;
		case "3":
			daynm = "ȭ";
			break;
		case "4":
			daynm = "��";
			break;
		case "5":
			daynm = "��";
			break;
		case "6":
			daynm = "��";
			break;
		case "7":
			daynm = "��";
			break;
		}

		columnNm = startColumn+DataSet.getParam("UCCOM009S", 1, i, "std_date").substr(6,2);
		obj.SetColHDText(columnNm , day+"\n"+daynm+"");
		obj.SetColWidth(columnNm , size);
		//obj.nHDLineSize = 20;
		obj.nHDLines = 2;

		if(DataSet.getParam("UCCOM009S", 1, i, "hldy_yn") == "Y"){
			obj.SetColHDFgColor(columnNm,'255|10|10');
			if(DataSet.getParam("UCCOM009S", 1, i, "hldy_nm") == ""
				&& DataSet.getParam("UCCOM009S", 1, i, "week_nm") == "7") obj.SetColHDFgColor(columnNm,'58|90|228');
		}else{
			obj.SetColHDFgColor(columnNm,'35|73|118');
		}

		if(day < DataSet.getTotalCount("UCCOM009S")){
			day++;
		}
	}

	//��ȸ�� ���� ���ں��� ū ���ڵ��� ȭ�鿡�� �������ʰ� �Ѵ�.
	if(day < 31){
		day++;
		for(day ; day < 32 ; day++){
			obj.SetColWidth(startColumn+day , 0);
		}
	}
}

/**
  * �׸����� row����
  * obj : ���׸���
  * idx : ������Row Index
  * return : Void
  */
function selectRow(obj, idx)
{
	obj.strSelectedCellBgColor = "255|255|255";
	obj.MoveRow(idx);
	obj.strActiveRowBgColor = gRowActiveBg;
}


/**
 * �޼����� �о �����Ѵ�.  ��)MessageBox("DelConfirm", "C", "�������ٺ�");
 * id : �޼��� �ڵ�
 * type : alert ����(C:Confirm-Ȯ��/��ҹ�ư, I:Information-Ȯ��, E:Error-Ȯ�ι�ư)
 * msg : �޼����� �߰��� ���ڿ� ��) msg + �׸��� �ʼ��Է��Դϴ�.
 */
var xmlMessageDoc; //�޼��� xml������ �����ͼ� ������ �ִ� xmlDoc��ü
function MessageBox(id, type, msg)
{
	if(!msg) msg = "";
	if(!xmlMessageDoc)	getXMLFile(scriptPath + "/xml/message.xml", "getXMLFileResult");

 	var strMsg = "";
 	var strType = "";

	if(xmlMessageDoc != null)
	{
		var xmlData = xmlMessageDoc.selectNodes("/MESSAGE/MSG[@id='"+ id +"']");

		if(xmlData.length > 0)
		{
			strMsg = xmlData(0).getAttribute("desc");
			strType = xmlData(0).getAttribute("type");
		}
	}

	strMsg = replaceStr(strMsg, "\\n", "\n");
	try
	{
		if(strType == "B" || strType == "Y") top.tdStatus.innerHTML = strMsg;
		else top.tdStatus.innerHTML = "";

	}catch(e){}

	if(strType == "Y") return;

	switch(type)
	{
		case "C":
			return confirm("[UCARE MESSAGE]\r\n\r\n" + msg + " " + strMsg);
		case "I":
		case "E":
			return alert("[UCARE MESSAGE]\r\n\r\n" + msg + " " + strMsg);
	}
}

/**
 * callback�Լ�
 * xmlDoc : �о�� xml ����
 */
function getXMLFileResult(xmlDoc)
{
	if(xmlDoc != null)
	{
		xmlMessageDoc = xmlDoc;
	}
}

/**
 * xml������ Load�Ѵ�.
 * actionUrl : xml ���� ��ġ
 * resultFunction : ������ ȣ���� callback�Լ���
 */
function getXMLFile(actionUrl, resultFunction)
{
	var submitParameter = "";
	var xmlHttpRequest;

	if(window.ActiveXObject)
	{
		try {
			xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e1) {
			try {
				xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e2) {
			}
		}

	}
	else
	{
		xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.overrideMimeType('text/xml');
	}

	xmlHttpRequest.open("GET", actionUrl, false);

	xmlHttpRequest.onreadystatechange = function() {

		if(xmlHttpRequest.readyState == 4)
		{
			switch (xmlHttpRequest.status)
			{
				case 401:
					log('����: ���Ѿ���');
					break;
				case 403:
					log('����: ���ٰź�');
					break;
				case 404:
					log('����: ' + actionUrl + ' �� �������� ����');
					break;
				case 500:
					log('����: ���μ������� 500' + xmlHttpRequest.responseText);
					break;
				case 200:
					var xmlDoc;
					xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.loadXML(xmlHttpRequest.responseText);

					//alert(xmlHttpRequest.responseText);
					//xmlDoc = xmlHttpRequest.responseXML;
					eval(resultFunction + '(xmlDoc);');

					break;
				default:
					break;
			}
		}
	}

	xmlHttpRequest.send(submitParameter);
}

/*
* �� ��¥���� ���̸� ����Ѵ�.
*/
function calDay(sdate , edate){
	var sDate = new Date(sdate.substr(0,4),sdate.substr(4,2)-1,sdate.substr(6,2)).getTime();;
	var eDate = new Date(edate.substr(0,4),edate.substr(4,2)-1,edate.substr(6,2)).getTime();

	var result = (eDate-sDate)/(1000*60*60*24) +1;


	return result;
}

/*
* Ư���� ��¥�� ���ڸ� ���Ѵ�.
*/
function addDay(yyyy, mm, dd, pDay) // ��, ��, ��, ����� ���� (�⵵�� �ݵ�� 4�ڸ��� �Է�)
{
	var oDate; // ������ ��¥ ��ü ����

	dd = dd*1 + pDay*1; // ��¥ ���

	mm--; // ���� 0~11 �̹Ƿ� �ϳ� ���ش�

	oDate = new Date(yyyy, mm, dd) // ���� ��¥ ��ü ���� (��ü���� �ڵ� ���)

	var year = oDate.getFullYear();
	var month = oDate.getMonth()+1;
	var day = oDate.getDate();

		if(month < 10) month = "0"+month;
		if(day < 10) day = "0"+day;

	oDate = year+""+month+""+day;

	return oDate;
}

/**
 * todate > fromdate üũ
 * fromdate : �������� ��ü
 * todate : �������� ��ü
 * bMsg : �޽��� ��¿���
 * bFocus : ��Ŀ�� ����
 * flag : ���ָ� ��¥üũ, "TIME"���� �ָ� �ð�üũ (�ᱹ �޽����� �޶���)
 */
function checkTermDate(fromdate, todate, bMsg, bFocus, flag)
{
	if (!fromdate)
	{
		MessageBox("NotFromdate", "I", "");
		return false;
	}

	if (!todate)
	{
		MessageBox("NotTodate", "I", "");
		return false;
	}

	var fdate = parseInt(numberMask(fromdate.value), 10);
	var tdate = parseInt(numberMask(todate.value), 10);

	if (fdate > tdate)
	{
		if (bMsg)
		{
			if      (flag == "TIME")	MessageBox("BadTermTime"  , "I", "");
			else if (flag == "MONTH")	MessageBox("BadTermMonth" , "I", "");
			else				        MessageBox("BadTerm"      , "I", "");
		}
		if (bFocus)	setFocus(todate);
		return false;
	}

	return true;
}

/*
 * ���ڸ� �Է¹��� �� �ֵ��� onKeyDown="checkOnlyNumber()"
 */
function checkOnlyNumber()
{
	// . : (190, 110), - : (189, 109)
	if ( event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 17 || event.keyCode == 86
		 || event.keyCode == 109|| event.keyCode == 110
		 || event.keyCode == 189 || event.keyCode == 190 || event.keyCode == 13) {
		event.returnValue = true;
	}
	else {
		if (!event.shiftKey) {
			if (event.keyCode > 47) {
				if ( event.keyCode < 58){
					event.returnValue = true;
				}
				else if (event.keyCode > 95 ){
					if (event.keyCode < 106) {
						event.returnValue = true;
					}
					else
						event.returnValue = false;
				}
				else
					event.returnValue = false;
			}
			else if ( event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 32 ) {
				event.returnValue = true;
			}
			else
				event.returnValue = false;
		}else {
			event.returnValue = false;
		}
	}
}

/*
 * ���ڿ� ������ �Է¹��� �� �ֵ��� onKeyDown="checkNotHangul()"
 */
function checkNotHangul()
{
	if(event.keyCode > 128) event.returnValue = false;
	else event.returnValue = true;
}

/**
  * ���ڿ��� ������ ���̸�ŭ �����Ѵ�.
  * str : Ÿ�ٹ��ڿ�
  * len : �����Ϸ��� ���ڼ�
  */
function wordrap(str , len)
{
	len = parseInt(len);
	if( (isNaN(len)) || (len<1) ){ return str; }	//�ڸ��� ���ڼ���  ���ڰ�  �ƴϰų� ����� �ƴϸ� ���ѷ���

	str = str+"";
	var rval = "";
	while (str.length>0)
	{
		if(rval.length>0){rval += "\n";}
		rval += str.substr(0,len);
		str = str.substr(len);
	}

	return rval;
}

/**
  * �ʸ� �ð� ��������
  * sec : ��
  * return : ��:��:�� (00:00:00)
  */
function fn_sec_to_time(sec)
{
	var v_sec = parseFloat(sec);

	if(isNaN(v_sec)) return "";

	var v_temp		    = Math.round(v_sec);
	var v_hour_temp 	= Math.floor(v_temp / 3600);
	var v_minute_temp	= Math.floor(v_temp%3600/60);
	var v_second_temp	= v_temp%60;

	if(v_hour_temp < 10)
	{
		v_hour_temp = '0'+v_hour_temp;
	}
	if(v_minute_temp < 10)
	{
		v_minute_temp = '0'+v_minute_temp;
	}
	if(v_second_temp < 10)
	{
		v_second_temp = '0'+v_second_temp;
	}

	return v_hour_temp + ':' + v_minute_temp + ':' + v_second_temp;
}

/*
 * ������ư�� �迭�� ��� type�� ���� �ε������� �ѱ�ų� value���� �ѱ�
 * obj : �迭��ü
 * type ; index = �ε���, value = �� ����
 */
function getArrayData(obj, type)
{
	if(obj.length < 1 ) return "";
	if(!(obj(0).type == "radio" || obj(0).type == "checkbox")) return "";

	var ret;
	for(var i=0; i<obj.length; i++)
	{
		if(obj(i).checked)
		{
			if(type == "index") ret = i;
			else if(type == "value") ret = obj(i).value;
			break;
		}
	}

	return ret;
}
/*
 * checkbox �� radio button���� �Լ�
 * obj      : �迭��ü
 * type     : ���� ���� - index = �ε���, value = ��
 * objvalue : �����Ϸ��� �� �Ǵ� �ε���
 * boolean_checked : üũ���� - ���ڰ��� ������ ����Ʈ TRUE
 * �� : setArrayData(f.useyn,"value","Y");
 */
function setArrayData(obj, type, objvalue, boolean_checked)
{
	if(typeof(boolean_checked) == "undefined")
	{
		boolean_checked=true;
	}

	if(obj.length)
	{
		if(!(obj[0].type == "radio" || obj[0].type == "checkbox")) return "";

		for(var i=0; i<obj.length; i++)
		{
			if( ((type=="value")&&(obj[i].value==objvalue))
			  ||((type=="index")&&(i==objvalue))
			){
				obj[i].checked = boolean_checked;
			}
		}
	}
	else if(obj)
	{
		if(!(obj.type == "radio" || obj.type == "checkbox")) return "";

		if((obj.value==objvalue)
		 ||(0==objvalue)//1���϶� ,index�� 0���ͽ���..
		){
			obj.checked = eval(boolean_checked);
		}
	}
}

/*
 * ���� ������ ���� merge���ش�.
 * tableObj :  table id
 * rowIndex : table�� ���� row index(0���� ����)
 * cellIndex : �ش� row�� cell index(0���� ����)
 * displayIndex : cellIndex ���� display none �Ǿ��ִ� cell�� ����
 * funccallcnt : cellMerge�Լ��� ȣ���ϴ� Ƚ��
 */
function cellMerge(tableObj, rowIndex, cellIndex, displayIndex, funccallcnt)
{
	if(!displayIndex) displayIndex = 0;
	if(!funccallcnt) funccallcnt = 0;

	var rowsCn = tableObj.rows.length;

	if(rowsCn-1 <= rowIndex) return;

	var compareCellsLen = tableObj.rows(rowIndex).cells.length;  //���� row�� cell ����

	//�ʱ�ȭ
	var compareObj = tableObj.rows(rowIndex).cells(cellIndex);
	var compareValue = compareObj.innerText;
	var cn = 1;
	var delCells = new Array();
	var arrCellIndex = new Array();

	for(i=rowIndex+1; i < rowsCn; i++)
	{
		var cellsLen = tableObj.rows(i).cells.length;
		var bufCellIndex = cellIndex;

		//�������� row�� cellIndex�� ������.
		if(compareCellsLen != cellsLen && funccallcnt != 0)
		{
			bufCellIndex = cellIndex - 1;
		}


		if ( bufCellIndex < 0 )
		{
			continue;
		}

		cellObj = tableObj.rows(i).cells(bufCellIndex);

		if(compareValue == cellObj.innerText)
		{
			delCells[cn-1] = tableObj.rows(i);  //������ cell�� row�� �����Ѵ�.
			arrCellIndex[cn - 1] = bufCellIndex; //�ش� row cell index�� �����Ѵ�.
			cn++;
		}
		else
		{
			//����
			compareObj.rowSpan = cn;

			//����
			for(j=0; j < delCells.length; j++)
			{
			 	delCells[j].deleteCell(arrCellIndex[j]-displayIndex);
			}

			//�ʱ�ȭ
			compareObj = cellObj;
			compareValue = cellObj.innerText;
			cn = 1;
			delCells = new Array();
			arrCellIndex = new Array();
		}
	}

	//����
	compareObj.rowSpan = cn;
	//����
	for(j=0; j < delCells.length; j++)
	{
		delCells[j].deleteCell(arrCellIndex[j]-displayIndex);
	}
}

/* �׸��� ��ü�� ������ export ������ ����Ѵ�.
 * GridObj : gird ��ü
 * sTitle : ���������� Ÿ��Ʋ (option)
 * sCondition : ��ȸ���� ����ϰ� ������ ���� (option)
 */
function excelExport(GridObj, sTitle, sCondition)
{
	if(!GridObj)
	{
		MessageBox("NotWiseGrid", "E", "������ �������� �� ��ü");
		return;
	}

	var toDay = new Date();

	// Ÿ��Ʋ, ��ȸ����, Copyright���� �����մϴ�.
	GridObj.ClearExcelInfo();
	if(sTitle) GridObj.SetExcelHeader(sTitle, 40, 15, "center", "0|0|0", "240|240|240");
	GridObj.SetExcelFooter("����� (" + toDay.toLocaleString() + ")", 20, 10, 'right', "100|100|100", "220|220|220");
	if(sCondition) GridObj.AddExcelLine(sCondition , 20, 10, "left", "0|0|0", "255|255|255");

	// ���� �������⸦ �����մϴ�.
	GridObj.ExcelExport('', '', true, true);
}



/**
  * �򰡽��� �˾� ���� - LIG QM����
  * callscreenid : ȣ�� ȭ�� ID(�ʼ�)
  * evalid : ��ID(INSERT mode �ƴҶ� �ʼ�)
  * qmid : �򰡰�ȹ ID(INSERT mode �� �ʼ�)
  * sheetid : ���� ID(INSERT mode �� �ʼ�)
  * innumbers : �������� ID(INSERT mode �� �ʼ�)
  * qaaid : ���� ID(INSERT mode �� �ʼ�)
  * userid : ����� ID(INSERT mode �� �ʼ�)
  * mode : ȭ���� (�ʼ�)
  * objseq : ���ǽ�ûID (���ǽ�û�� �ʼ�)
  */
function evalSheetPOP(callscreenid,  mode, evalid, qmid, sheetid, innumbers, qaaid, userid, objseq)
{
	var check = true;

	if(	callscreenid 	== "" || typeof(callscreenid) 	== "undefined"  ||
		mode 			== "" || typeof(mode) 			== "undefined"
	){
		check = false;
	}else if(mode=="INSERT" && (	qmid 			== "" || typeof(qmid) 			== "undefined"  ||
									sheetid 		== "" || typeof(sheetid) 		== "undefined"  ||
									innumbers 		== "" || typeof(innumbers) 		== "undefined"  ||
									qaaid 			== "" || typeof(qaaid) 			== "undefined"  ||
									userid 			== "" || typeof(userid) 		== "undefined"
								  )
	)
	{
		check = false;
	}else if( mode=="SELECT" && (evalid == "" || typeof(evalid) == "undefined") )
	{
		check = false;
	}else if( mode=="UPDATE" && callscreenid=="ObjectionMngList" && (evalid == "" || typeof(evalid) == "undefined") && (objseq == "" || typeof(objseq) == "undefined"))
	{
		check = false;
	}else if( mode=="UPDATE" && (evalid == "" || typeof(evalid) == "undefined"))
	{
		check = false;
	}else
	{
		check = false;
	}

	if(check)
	{
		var msg = "=========================================";
		msg += "\n ȣ�� ȭ�� ID(�ʼ�):" + callscreenid ;
		msg += "\n ȭ���� (�ʼ�):" + mode ;
		msg += "\n ��ID(UPDATE, SELECT mode �� �ʼ�):" + evalid ;
		msg += "\n �򰡰�ȹ ID(INSERT mode �� �ʼ�):" + qmid ;
		msg += "\n ���� ID(INSERT mode �� �ʼ�):" + sheetid ;
		msg += "\n �������� ID(INSERT mode �� �ʼ�):" + innumbers ;
		msg += "\n ���� ID(INSERT mode �� �ʼ�):" + qaaid ;
		msg += "\n ����� ID(INSERT mode �� �ʼ�):" + userid ;
		msg += "\n ���ǽ�ûID(���ǽ�û�� �ʼ�):" + objseq ;
		msg += "\n=========================================";

		MessageBox("ExeFail", "E", msg+"\n\n�򰡽��� ����" );
		return;

	}

	var param = "";
	param += "reqcallscreenid="+callscreenid
	param += "&reqmode=" + mode;
	param += "&reqevalid=" + evalid;
	param += "&reqqmid=" + qmid;
	param += "&reqsheetid=" + sheetid;
	param += "&reqinnumbers=" + innumbers;
	param += "&reqqaaid=" + qaaid;
	param += "&requserid=" + userid;
	param += "&reqobjseq=" + objseq;

	openPopup("/jsp/quality/qmsEvalSheetPOP.jsp", param, "evalsheetpop", "0", "140", "1060", "920", "scrollbars=no, status=no");

}

/**
 * ����� �ѱ�� ���ؼ� ����� xml�� ��ȯ�Ѵ�.
 * dsnm : ��ȯ�ϰ��� �ϴ� ����ID
 */
function convertReportXML(dsnm)
{
	var aArray = dsnm.split(",");

	var sXml = "<DATASETLIST>\r\n";
	var sTemp = "";

	for(var k=0; k<aArray.length; k++)
	{
		sXml += "\t<DATASET name=\"" + aArray[k]+ "\">\r\n";

		var xmlobj=DataSet.getUcareData(aArray[k]);			//dataset obj
//alert(xmlobj.xml);
		var pagenm="page-1";							//page number create
		var dsroot=xmlobj.getElementsByTagName(pagenm);			//page xml get
		for (var j=0; j< dsroot[0].childNodes.length; j++)
		{
			sXml += "\t\t<" + aArray[k]+ ">\r\n";
			var objRs = dsroot[0].childNodes.item(j);
			for(var i=0;i<objRs.childNodes.length;i++){
				var oc=objRs.childNodes[i];
				sTemp = "<![CDATA[" + oc.text + "]]>";
				sXml += "\t\t\t<"+oc.nodeName+">" + sTemp + "</"+oc.nodeName+">\r\n";
				//hs.put(oc.nodeName,oc.text);
			}
			sXml += "\t\t</" + aArray[k]+ ">\r\n";
		}
		sXml += "\t</DATASET>\r\n";
	}

	sXml += "</DATASETLIST>";

	return sXml;
}

/**
 * �ؽ�Ʈ ��� ����¡�� ���� �Ǿ����� ȣ��Ǵ� �Լ�.
 * id : ����ID
 * nFirst : ���� ��ũ�� ��ġ��  ù��° index
 * nLast :  ���� ��ũ�� ��ġ�� ������ index
 */
function scrollRow_obj(id, nFirst, nLast)
{
	var gridObj = document.all(id);
	if(gridObj.IsDoQuery() == true) return;
	if(gridObj.IsPagingMode()) return;
	if( (nLast == gridObj.GetRowCount()-1) )//&& (DataSet.getTotalCount(sDsId) > gridObj.GetRowCount()) )
	{
		try {
			gridObj.NextNavigate();
		} catch(e) {}
	}
}

/*
 * �ؽ�Ʈ ��� ȣ��ǰ� callback�� �ڵ����� ȣ���ϹǷ� callback �Լ� ���� �������� ���ؼ� �߰�.
 */
function callback(dsnm)
{

}

/**
 * round �Լ�
 * num : ���
 * pos : �ڸ���
 */
function myRound(num, pos) {
	var posV = Math.pow(10, (pos ? pos : 2))
	return Math.round(num*posV)/posV

	// trace(Math.round(25.5525/0.01)*0.01);	// ��� : 25.55
}

/*******************************************************
 * ���� �˾�â ���� ����
 *******************************************************/

//�˾�â Hashtable
var htPopWins = new Hashtable();

/**
 * ȭ�� ����� ������ ����
 * winUrl 		: �˾� ������ URL (ex: "/jsp/knowledge/kmsSearchDetailP.jsp")
 * winArgs 		: �������� ���� �� ���ڰ�, ����ǥ(?)���� (ex: "userid=000000&seq=100001")
 * winName 		: �˾� â �̸� (ex: "SearchDetailP")
 * winTop 		: ȭ�� ������κ����� ��ġ, ���� "" �̸�  �߾����� (ex: "" or "400")
 * winLeft 		: ȭ�� �������κ����� ��ġ, ���� "" �̸�  �߾����� (ex: "" or "400")
 * winWidth 	: �˾� â ��, ���� "" �̸� �⺻�� �ڵ� �Ҵ� (ex: "" or "400")
 * winHeight 	: �˾� â ����, ���� "" �̸� �⺻�� �ڵ� �Ҵ� (ex: "" or "400")
 * winEtc 		: window ��Ÿ �Ӽ���, �޸��� ���� (ex: "scrollbars=yes, status=yes")
 * formMethod 	: post ����� ��� target�� ����� �� �ֵ��� �̸��� �ֱ� ���� ���, �� �� ������ �̸��� ���� ����
 * return winObj: ������ �˾�â ��ü�� ��ȯ
 * �Լ� ��뿹	: openPopup("/jsp/knowledge/kmsSearchDetailP.jsp", "userid=000000&seq=100001", "SearchDetailP", "", "", "1000", "700", "scrollbars=no");
 */
function openPopup(winUrl, winArgs, winName, winTop, winLeft, winWidth, winHeight, winEtc, formMethod)
{
	//�˾�â �Ӽ� ���� �����´�.
	var popupProperties = getPopupProperties(winTop, winLeft, winWidth, winHeight, winEtc);
	var winNM = "";

	try
	{
		//â�̸��� Ű�� â�� ��ü�� �ִ��� Ȯ���Ͽ� ������ �ݴ´�.
		if(htPopWins.get(winName) != "")
		{
			htPopWins.get(winName).close();
		}

		//Post ����� ��� target�� ����ؾ� �ϱ� ������ window �̸��� �ش�.
		if(typeof formMethod != "undefined" && formMethod.toUpperCase() == "POST")
		{
			winNM = winName;
		}

		//�˾� ����!!
		var winObj = window.open(winUrl + "?" + winArgs, winNM, popupProperties);

		//Hashtable�� â�̸��� key��, â ��ü�� value�� �ִ´�.
		htPopWins.put(winName, winObj);

		return winObj;
	}
	catch(e)
	{
	}
}

/**
 * ��� �˾� â �ݱ�
 */
function closeAllPopWin()
{
	//��� �˾�â �̸��� �����´�.
	var htPopWinNames = htPopWins.getNames();

	//��� â ����ŭ üũ
	for(var i = 0 ; i < htPopWinNames.length ; i ++)
	{
		try
		{
			htPopWins.get(htPopWinNames[i]).close();
		}
		catch(e)
		{
		}
	}

	try
	{
		if(this.name == "appmain")
		{
			logout();
		}
	}
	catch(e)
	{
	}
}

/**
 * ��� �˾� â �ݱ�
 */
function closePopWin()
{
	//��� �˾�â �̸��� �����´�.
	var htPopWinNames = htPopWins.getNames();

	//��� â ����ŭ üũ
	for(var i = 0 ; i < htPopWinNames.length ; i ++)
	{
		try
		{
			htPopWins.get(htPopWinNames[i]).close();
		}
		catch(e)
		{
		}
	}
}

/**
 * �˾�â�� �Ӽ��� ���� ����
 * winTop		: ȭ�� ������κ����� ��ġ
 * winLeft		: ȭ�� �������κ����� ��ġ
 * winWidth     : �˾� â ��
 * winHeight    : �˾� â ����
 * winEtc       : ��Ÿ
 */
function getPopupProperties(winTop, winLeft, winWidth, winHeight, winEtc)
{
	//Default
	var winW = 800;
	var winH = 600;

	if(typeof winWidth != "undefined" && winWidth != "")
		winW = winWidth;

	if(typeof winHeight != "undefined" && winHeight != "")
		winH = winHeight;

	//Center Position
	//������ ��ü ����� ���־�� ��Ȯ�� ��ġ����� ����
	//var winX = (screen.width - Number(winW) - 8) / 2;
	//var winY = (screen.height - Number(winH) - 66) / 2;

	//����� ������ ����ص� ��𼭵� ���α׷� ����� �� �� �ֵ��� ���� - 2010-01-08 nexfron
	var winX = top.screenLeft+(document.body.clientWidth - winW)/2;
	var winY = top.screenTop +(document.body.clientHeight - winH)/2;

	if(typeof winTop != "undefined" && winTop != "")
		winY = winTop;

	if(typeof winLeft != "undefined" && winLeft != "")
		winX = winLeft;

	var popupProperties = "width=" + winW + "px,height=" + winH + "px,top=" + winY + "px,left=" + winX + "px";

	if(typeof winEtc != "urndefined" && winEtc != "")
		popupProperties += "," + winEtc;

	return popupProperties;
}

/*******************************************************
 * ���� �˾�â ���� ��
 *******************************************************/


 /**
 * string�� URI��� string���� ��ȯ�Ѵ�.
 * paramValue : ��ȯ�� string
 */
function paramEscape(paramValue)
{
	return encodeURIComponent(paramValue);
 	//return escape(paramValue).replace(/\+/g, '%2B');
}

/**
 * �迭�� ,������ �ƴ϶�  �������� �����Ͽ� �ش�.
 * arr : �迭
 */
function makeParamArray(arr)
{
	var str   = "";
	var check = arr.length - 1;

	for (var i=0; i<arr.length; i++)
	{
		str += arr[i] + (i < check ? "" : "");
	}

	return str;
}

/**
  * ���� �˸����
  * msgtitle    : ��������
  * msgcontext  : ��������
  * teamTarget  : ����,��,��Ʈ�� ��� (ex 'JO|104000|104001','JO|101000|101001 ������ �迭�� �ѱ��.)
  * userTarget  : ���� ID�� (ex '1015036|1002285' �������� �ѱ��.)
  * hs          : menu, mode, page, seq�� data�� �ʿ��Ҷ� �ؽ����̺�� �ѱ��.
  * menu        : �޴�����
  * mode        : �˸�����
  * page        : ȭ���
  * seq         : �˸��� ��ȣ
  */
function msgNotice(msgtitle, msgcontext, teamTarget, userTarget, hs)
{
	var menu = "";
	var mode = "";
	var page = "";
	var seq  = "";
	var temp = "";

	//menu, mode, page, seq ������ ������ "default"
	if(hs)
	{
		menu = hs.get("menu");
		mode = hs.get("mode");
		page = hs.get("page");
		seq = hs.get("seq");
	}

	if(!menu) menu = "default";
	if(!mode) mode = "default";
	if(!page) page = "default";
	if(!seq)  seq  = "default";

	//ex) KMS_NOTICE_01_.
	var msgKey = menu + "_" + page + "_" + seq + "_";

	//userid ��ȸ�� ���� �ۼ�
	temp = "";
	var setuser="setuser=";

	if(typeof teamTarget[0] == "undefined")
	{
		temp = teamTarget.split("|");
		if ( temp.length > 0 ) setuser+="WHERE cntrcd='" + temp[0] + "'\r\n";
		if ( temp.length > 1 ) setuser+="  AND teamcd='" + temp[1] + "'\r\n";
		if ( temp.length > 2 ) setuser+="  AND partcd='" + temp[2] + "'\r\n";
	}
	else
	{
		for( var i=0; i < teamTarget.length; i++)
		{
			//var temp = new Array();
			temp = teamTarget[i].split("|");
			if ( setuser == "setuser=" && temp.length > 0 ) setuser+="WHERE (cntrcd='" + temp[0] + "'\r\n";
			else if ( setuser != "setuser=" && temp.length > 0) setuser+="  OR (cntrcd='" + temp[0] + "'\r\n";
			if ( temp.length > 1 ) setuser+="  AND teamcd='" + temp[1] + "'\r\n";
			if ( temp.length > 2 ) setuser+="  AND partcd='" + temp[2] + "')\r\n";
		}
	}

	//teamTarget�� ���� �ϸ� ��ȸ������ Ÿ�� ������ �ٷ� ���� �������� �̵�
	if ( teamTarget != "" )
	{
		var tran=new Trans();
		tran.setSvc("UCCOM062S");
		tran.setUserParams(setuser);
		tran.setRecRow("9999");
		tran.setCallBack("msgNotice_callback('"+msgtitle+"','"+msgcontext+"','"+userTarget+"','"+msgKey+"')");
		tran.open("","","/common.do");
	}
	else
	{
		comMsgSend(useridStr,  msgcontext);
	}
}

/**
  * ���� �˸���� �ݹ�
  */
function msgNotice_callback(msgtitle, msgcontext, userTarget, msgKey)
{
	if(DataSet.getTotalCount("UCCOM062S") > 0)
	{
		var useridArr = DataSet.getParamArr("UCCOM062S", 1, "userid");
		var useridStr = "";

		//teamTarget�� userid�� '1015036|1002285'�������� ��ȯ�Ѵ�.
		for(var i = 0 ; i < useridArr.length ; i++ )
		{
			if (useridStr != "") useridStr += "|";
			useridStr += useridArr[i];
		}
		//teamTarget + userTarget�� ��ģ��.
		useridStr += userTarget;

		comMsgSend(useridStr,  msgcontext);
	}
}

/**
 * ���� DB �Է� �� ���� �̺�Ʈ ȣ��
 * ���� ����
 * ���ε��� ���� �̸��� ���� �����̸�
 * sUserId      : ����� ID (���� ����) ex)test|test2|test3
 * sContent     : �޽��� ���� ������ 1��
 * sFileGubun   : file update ��/��
 * sOldFileName : ���� ������ ����� ���� �̸�
 * sNewFileName : ����ڿ��� �������� ���� �̸�
 **/
function comMsgSend(aUserId, sContent, sFileGubun, sOldFileNm, sNewFileNm)
{
	var sSvcId = "";

	if(sFileGubun == "Y") sSvcId = "UCINF062I,UCINF061I,UCINF030I"; //�������� �б⹮ �߰�
	else sSvcId = "UCINF062I,UCINF061I";	                        //�������� ���� �б⹮

	var tran=new Trans();
	tran.setSvc(sSvcId);
	for (var i=0; i < aUserId.length; i++)
	{
		tran.setMyUserParams('recv_user_id', aUserId[i]);
	}
	tran.setMyUserParams('cntn',sContent);

	tran.setMyUserParams("prg_type_cd", "MEMO");
	tran.setMyUserParams("prg_seq", "SQ_UC_INF_MEMO_SEND.currval");

	tran.setMyUserParams("old_file_nm",sOldFileNm);
	tran.setMyUserParams("new_file_nm",sNewFileNm);

	tran.setCallBack("MsgSend_callback('"+sSvcId+"','"+sOldFileNm+"','"+sNewFileNm+"')");
	tran.open("","","/common.do");

	//�˸����� ȣ��
	try
	{
		if (getExtendObj().getMsgLoginYN() == "Y") getExtendObj().sendFixedMsg(aUserId, sContent);
	}
	catch(E)
	{
		//���� ���� �̻����� ��� �׳� �Ѿ ó��
	}
}

/**
 * ���� �ݹ�
 **/
function MsgSend_callback(sServiceID, sOldFileName, sNewFileName)
{
	if (DataSet.getSuccessCount("UCINF062I") >"0")
	{
		MessageBox("Success","I","");
		f.content.value ="";   //ȭ���ʱ�ȭ
		initUploadFile();      //�����Է� �ʱ�ȭ



		parent.tabclick("tbltabMnt",1,""); //�߽���tab �̵�
		parent.tabMnt_onclick(1);          //�߽������� �̵�
		parent.ifmMsgSendHist.queryList();
	}
}


/*
* �� ��¥���� ���̸� ����Ѵ�.
*/
function calDay(sdate , edate){
	var sDate = new Date(sdate.substr(0,4),sdate.substr(4,2)-1,sdate.substr(6,2)).getTime();;
	var eDate = new Date(edate.substr(0,4),edate.substr(4,2)-1,edate.substr(6,2)).getTime();

	var result = (eDate-sDate)/(1000*60*60*24) +1;


	return result;
}

/*
* Ư���� ��¥�� ���ڸ� ���Ѵ�.
*/
function addDay(yyyy, mm, dd, pDay, pType) // ��, ��, ��, ����� ���� (�⵵�� �ݵ�� 4�ڸ��� �Է�), ����׸�('Y':year, 'M':month, 'D':day)
{
	var oDate; // ������ ��¥ ��ü ����

	dd = dd*1

	switch (pType) // ��¥ ���
	{
		case "Y": yyyy = yyyy+pDay*1;break;
		case "M": mm = mm+pDay*1;break;
		default:  dd = dd+pDay*1;break;
	}

	mm--; // ���� 0~11 �̹Ƿ� �ϳ� ���ش�

	oDate = new Date(yyyy, mm, dd) // ���� ��¥ ��ü ���� (��ü���� �ڵ� ���)

	var year = oDate.getFullYear();
	var month = oDate.getMonth()+1;
	var day = oDate.getDate();

		if(month < 10) month = "0"+month;
		if(day < 10) day = "0"+day;

	oDate = year+""+month+""+day;

	return oDate;
}


/**
 * combobox, checkbox, radio, text ��ü�迭�� �޾� disabled, readonly ������ ���ش�.
 * objArr : ��ü �迭
 * flag : disabled �Ǵ� readonly ����
 */
function setDisabledObj(objArr, flag)
{
	if (objArr && objArr.length)
	{
		var obj;
		var objType;
		var objRequired;
		var i = objArr.length;
		while (i--)
		{
			obj = objArr[i];
			if (obj.type)
			{
				objType = obj.type;
			}
			else
			{
				objType = "";
			}

			objRequired = (!obj.required ? "" : obj.required);

			switch(objType)
			{
				case "select-one":
				case "select-multiple":
					obj.className = (flag == true ? "combo_disabled" : (objRequired == "true" ? "combo_required" : "combo_text"));
					obj.disabled = flag;
					break;
				case "checkbox":
				case "radio":
				case "file":
					obj.disabled = flag;
					obj.className = (flag == true ? "input_"+objType+"_readonly" : (objRequired== "true" ? "input_"+objType+"_required" : "input_"+objType));
					break;
				case "text":
				case "password":
					obj.readOnly = flag;
					if(obj.format == "MONEY" || obj.format =="NUMBER" || obj.format =="FLOAT")
						obj.className = (flag == true ? "input_readonly_number" : (objRequired == "true" ? "input_required_number" : "input_number"));
					else
						obj.className = (flag == true ? "input_readonly" : (objRequired == "true" ? "input_required" : "input_text"));

					break;

				case "textarea":
					obj.readOnly = flag;
					obj.className = (flag == true ? "input_textarea_readonly" : (objRequired == "true" ? "input_textarea_required" : "input_textarea_text"));
					break;
				default :
					//obj.disabled = flag;
					break;
			}
		}
	}
}

/**
 * todate > fromdate üũ
 * fromdate : �������� ��ü
 * todate : �������� ��ü
 * bMsg : �޽��� ��¿���
 * bFocus : ��Ŀ�� ����
 * flag : ���ָ� ��¥üũ, "TIME"���� �ָ� �ð�üũ (�ᱹ �޽����� �޶���)
 */
function checkTermDate(fromdate, todate, bMsg, bFocus, flag)
{
	if (!fromdate)
	{
		MessageBox("NotFromdate", "I", "");
		return false;
	}

	if (!todate)
	{
		MessageBox("NotTodate", "I", "");
		return false;
	}

	var fdate = parseInt(numberMask(fromdate.value), 10);
	var tdate = parseInt(numberMask(todate.value), 10);

	if (fdate > tdate)
	{
		if (bMsg)
		{
			if      (flag == "TIME")	MessageBox("BadTermTime"  , "I", "");
			else if (flag == "MONTH")	MessageBox("BadTermMonth" , "I", "");
			else				        MessageBox("BadTerm"      , "I", "");
		}
		if (bFocus)	setFocus(todate);
		return false;
	}

	return true;
}

/**
 *���÷κ����� ��¥
 *@param period �Ⱓ
 *@param flag ������
 *@return ���� ��¥
 *ex) getUserDate(-10, "/"); ���÷� ���� 10�� �� ��¥�� �����Ѵ�.
 */
function getUserDate(period, flag)
{
	var now = new Date();
	now.addDate(period);
	return now.getYear() + flag + lpad((now.getMonth()+1).toString(), "0", 2) + flag + lpad(now.getDate().toString(), "0", 2);
}

/**
 *�����Ϸκ����� ��¥
 *@param stdDate ������
 *@param period �Ⱓ
 *@param flag ������
 *@return ���� ��¥
 *ex) getDateWithOffset("2008/11/20", -10, "/"); ������(2008/11/20)�κ��� 10�� �� ��¥�� �����Ѵ�.
 */
function getDateWithOffset(stdDate, period, flag)
{
	var tmpDate = removeMask(stdDate);
	var rstDate = new Date(tmpDate.substr(0,4),tmpDate.substr(4,2)-1,tmpDate.substr(6,2));

	rstDate.addDate(period);
	return rstDate.getYear() + flag + lpad((rstDate.getMonth()+1).toString(), "0", 2) + flag + lpad(rstDate.getDate().toString(), "0", 2);
}

/**
 *�� ��¥ ������ �� ��
 *@param sdate ������
 *@param edate ������
 *@return ���� ��¥
 *ex) getIntervalDay("2008/11/20", "2008/11/25");
 */
function getIntervalDay(sdate, edate)
{
	//"/"����
	sdate = removeMask(sdate);
	edate = removeMask(edate);

	var sDate = new Date(sdate.substr(0,4),sdate.substr(4,2)-1,sdate.substr(6,2));
	var eDate = new Date(edate.substr(0,4),edate.substr(4,2)-1,edate.substr(6,2));

	var interval = eDate - sDate;	// �� ��¥ ������ �� ��
	var day = 1000*60*60*24;		// �Ϸ� �� ��

	return Number(interval/day);	// �ϼ� = �� ��¥ ������ �� �� / �Ϸ� �� ��
}

Date.prototype.addDate = addDate;
function addDate(period)
{
	var curDate;
	curDate = this.getDate() + period * 1;
	this.setDate(curDate);
}

/**
 *	RD ActiveX�� �׸���. KOVA ����
 **/
function RD_activex_build(RDviewControlLocationID)
{
	try
	{
	  	var tag = "<OBJECT id=Rdviewer classid='clsid:29F38C37-F822-4A61-9041-C891C8F15713' codebase='"+scriptPath+"/cab/rdviewer35.cab#version=3,5,0,247' name=Rdviewer width=100% height=90%></OBJECT>";

		var RDViewerObjectElement = document.createElement(tag);

	 	document.all[RDviewControlLocationID].appendChild(RDViewerObjectElement);
	}
	catch(E)
	{
		alert("Error : RD_activex_build() " + E.discription);
	}
}

/**
 *	RD ActiveX �����ش�. KOVA ����
 **/
function RD_activex_buildViewer(rptnm, sConditionData, sReportData)
{
	try
	{
	  	var sUrl =document.location.protocol+"//"+document.location.hostname+":"+document.location.port;

			document.all.Rdviewer.AutoAdjust = true;
			document.all.Rdviewer.ZoomRatio = 100;
			document.all.Rdviewer.FileOpen(sUrl + "/report/mrd/" + rptnm , "/rv" + sConditionData + " /rdata [" + sReportData + "]" );
	}
	catch(E)
	{
		alert("Error : RD_activex_buildViewer() " + E.discription);
	}
}




/************************************************************
* �ۼ��� : 2009/9/15
* �ۼ��� : �ؽ����� ������
* ��  �� : �ְ��� kpi��Ȳ
* ��  �� : �ְ��� kpi��Ȳ
************************************************************/

//crosstab ���� �׸��� ����
//aRowKey : ���ΰ��� col (�� : ��¥)
//aColKey : �׷����� ���� �÷� (��: ���� ID)
//aColGroup : �׷���� �׸� (��: �ιٿ���ݼ�, �ƿ��ٿ�� �ݼ�)
function showCrossTab(gridObj, dsnm, aRowKey, aColKey, aColGroup, aRowSum, aColSum)
{
	var hRowKey = new Hashtable();
	var hColKey = new Hashtable();

	var hGrid = new Hashtable();
	var aGubun = new Array();
	var aData = DataSet.getParamArrHash(dsnm, DataSet.getCurPage(dsnm));
	var aFormat = new Array();

	gridObj.AddHeader(aRowKey[0],aRowKey[2],aRowKey[4]?aRowKey[4]:"t_text", 12, aRowKey[3], false);
	aFormat[0] = new Array( aRowKey[0], aRowKey[5], aColGroup[6]);

	for (var j=0; j < aData.length; j++)
	{
		var hRowData = aData[j];

		//row �߰�
		var sKey = "R_"+ hRowData.get(aRowKey[0]);
		if (hRowKey.get(sKey) == "" )
		{
				hRowKey.put(sKey, hRowKey.size()+1 );
				aGubun[aGubun.length] = hRowData.get(aRowKey[1]);
		}

	}

	if (aRowSum)
	{
		var aSum = new Array(aGubun.length);
		for (var i=0; i < aSum.length; i++)
		{
			aSum[i]=0;
		}
		hGrid.put("SUM", aSum);
	}

	for (var j=0; j < aData.length; j++)
	{
		var hRowData = aData[j];

		var sKey = "R_"+ hRowData.get(aRowKey[0]);
		var iRow = hRowKey.get(sKey)-1;
		//col�߰�

		var sGroupKey = "C_"+hRowData.get(aColKey[0]);

		if (hColKey.get(sGroupKey) == "")
		{
			if (aColGroup.length>1) gridObj.AddGroup(sGroupKey, hRowData.get(aColKey[1]));

			for (var k=0; k < aColGroup.length; k++)
			{
					hColKey.put(sGroupKey, 1);

					gridObj.AddHeader(sGroupKey+"~"+aColGroup[k][0], aColGroup.length>1?aColGroup[k][1]:hRowData.get(aColKey[1])
												, aColGroup[k][3]?aColGroup[k][3]:"t_text", 12.2, aColGroup[k][2], false);
					if (aColGroup.length>1)  gridObj.AppendHeader(sGroupKey, sGroupKey+"~"+aColGroup[k][0]);
					aFormat[aFormat.length] = new Array( sGroupKey+"~"+aColGroup[k][0], aColGroup[k][4], aColGroup[k][5]);
			}
		}

		hGrid.put("SUM", aSum);

		for (var k=0; k < aColGroup.length; k++)
		{
				var aTmp = hGrid.get(sGroupKey+"~"+aColGroup[k][0]);
				var aSum = hGrid.get("SUM");
				if (!aTmp)
				{
					aTmp = new Array(aGubun.length);
					for (var l=0; l < aGubun.length; l++)
					{
						aTmp[l]="";
					}
				}

				aTmp[iRow]=  getFormatData(hRowData.get(aColGroup[k][0]), aColGroup[k][5]);
				hGrid.put(sGroupKey+"~"+aColGroup[k][0], aTmp);
				if (aRowSum)
				{
					aSum[iRow] = aSum[iRow]+ parseNumeric(hRowData.get(aColGroup[k][0]));
					hGrid.put("SUM", aSum);
				}
		}
	}

	hGrid.put(aRowKey[0],aGubun );
	if (aRowSum)	gridObj.AddHeader("SUM",aRowSum[0],"t_number",15, aRowSum[2],true);
		//ȭ�鿡 ���
	gridObj.BoundHeader();
	if (aRowSum)
	{
		gridObj.SetColCellAlign("SUM", "right");
		gridObj.SetNumberFormat("SUM","#,###");
	}


/*
�׸��忡 ���� �����ϴ� �κ��Դϴ�. �ּ� ������ ������...
	for (var i=0; i  < aGubun.length; i++)
	{
		gridObj.addRow();
		gridObj.SetCellValue (aRowKey[0],i, aGubun[i]);
		for (var j=0; j < gridObj.GetColCount(); j++)
		{
			var aTmp = hGrid.get(gridObj.GetColHDKey(j));
			gridObj.SetCellValue (gridObj.GetColHDKey(j), i, aTmp[i]);

		}
	}
*/


	gridObj.SetGridRawData(makeGridRawData(gridObj, hGrid), true);

//
	for (var i=0; i < aFormat.length; i++)
	{
		if (aFormat[i][1]!="") gridObj.SetColCellAlign(aFormat[i][0], aFormat[i][1]);
	}
	gridObj.SetColCellSort(aRowKey[0],'asceding') ;

	if (aColSum)
	{
		var sSumList = "";
		for (var i=1; i < gridObj.GetColCount(); i++)
		{
			if (sSumList !="") sSumList += ",";
			sSumList += gridObj.GetColHDKey(i);
		}

		gridObj.AddSummaryBar ("summary01","�հ�","summaryall","sum",sSumList);
	}
}

function showCrossTabRowFix(gridObj, dsnm, aFix, aKey, aCol, sKeyNm, bSum, iSize, iSumSize)
{
	var mCnt = DataSet.getTotalCount(dsnm);
	var aGridKey = new Array();
	setProperty(gridObj);

	htGrid = new Hashtable();
	for (var i=0; i < aFix.length; i++)
	{
		gridObj.AddHeader(aFix[i][0], aFix[i][1],aFix[i][2],aFix[i][3],aFix[i][4],aFix[i][5]);
	}
	for(var i = 0 ; i < mCnt ; i++)
	{
		var htHeader = DataSet.getHashParam(dsnm, DataSet.getCurPage(dsnm), i);
		var sKey = "C_";
		for (var j=0; j < aKey.length; j++)
		{
			if (j > 0 ) sKey += "~";
			sKey += htHeader.get(aKey[j]);
		}
		aGridKey[i] = sKey;
		gridObj.AddHeader(sKey, htHeader.get(sKeyNm), "t_text", 12.2, iSize, true);
//		gridObj.SetNumberFormat(sKey,"#,##.00");

	}
	var aColNm = new Array();
	for (var i=0; i < aCol.length; i++)
	{
		aColNm [i]= aCol[i][1];
	}
	for (var i=0; i < aFix.length; i++)
	{
		htGrid.put(aFix[i][0],aColNm);
//		gridObj.AddHeader(aFix[i][0], aFix[i][1],aFix[i][2],aFix[i][3],aFix[i][4],aFix[i][5]);
	}

//	if (bSum == true)
	{
		gridObj.AddHeader("SUM", "Total", "t_text", 12.2, iSumSize, true);

		var	aData = DataSet.getParamArrHash(dsnm, DataSet.getCurPage(dsnm));
		var aSum = new Array();

		for (var i=0; i < aData.length; i++)
		{
			var ht = aData[i];
			var iSum = 0;
			for (var j=0; j < aCol.length; j++)
			{
				var aTmp = htGrid.get(aGridKey[i]);
				if (aTmp.length == 0) aTmp = new Array();

				aTmp[aTmp.length] = getFormatData(ht.get(aCol[j][0]),"MONEY");

				htGrid.put(aGridKey[i], aTmp);
				aSum[j] = (aSum[j]==undefined?0:aSum[j]) + 	parseInt(ht.get(aCol[j][0]));
			}
		}

			for (var j=0; j < aCol.length; j++)
			{
				if (aCol[j][2]  == "AVG") aSum[j] = Math.round((aSum[j]/aGridKey.length)*100)/100;
				else aSum[j] = getFormatData(aSum[j],"MONEY");
			}
			htGrid.put("SUM", aSum);
	}
	gridObj.nHDLineSize = 20;
	gridObj.bRowSelectorVisible = false;
	gridObj.bRowSelectorIndex = true;

	gridObj.strHDClickAction = "select";	//Group Merge ��

	//ȭ�鿡 ���
	gridObj.BoundHeader();
	gridObj.SetGridRawData(makeGridRawData(gridObj, htGrid), true);

	for (var i=0; i < aFix.length; i++)
	{
		gridObj.SetColFix(aFix[i][0]);
	}
//		gridObj.SetNumberFormat("SUM","#,##.00");

}
//crosstab ��� ����
function showCrossTabHeader(gridObj, aFix, dsnm, aColKey, aColKeyData, aGroupTitle)
{

	var aFormat = new Array();
	var hGroupKey = new Hashtable();
	// �ʱ�ȭ
	gridObj.ClearGrid();
	// �����ʵ�
	var hGroup = new Hashtable;
	for (var i=0; i < aFix.length; i++)
	{
		gridObj.AddHeader(aFix[i][0],aFix[i][1],aFix[i][3], 15.2, aFix[i][2], true);
		if (aFix[i].length>6)
		{
			var aTmp = aFix[i][6];

			for (var j=0; j < aTmp.length; j++)
			{
				if (hGroup.get(aTmp[j][0]) =="")
				{
					gridObj.AddGroup(aTmp[j][0], aTmp[j][1]);
					hGroup.put(aTmp[j][0],"1");
					if (j>0) 	gridObj.AppendGroup(aTmp[j-1][0], aTmp[j][0]);
				}
			}

			gridObj.AppendHeader(aTmp[aTmp.length-1][0], aFix[i][0]);
		}
		aFormat[aFormat.length] = new Array(aFix[i][0], aFix[i][4], aFix[i][5]);
	}

	// DataSet ���� ��������
	var aData = DataSet.getParamArrHash(dsnm, DataSet.getCurPage(dsnm));

	if (aGroupTitle) gridObj.AddGroup(aGroupTitle[0],aGroupTitle[1]);

	// Header �߰�
	for (var i=0; i < aData.length; i++)
	{
		  var hData = aData[i];
		  var sGroupKey = "C_"+hData.get(aColKey[0]);

		  if (hGroupKey.get(sGroupKey) != "") continue;
		  gridObj.AddGroup(sGroupKey,hData.get(aColKey[1]));

		  if (aGroupTitle) gridObj.AppendGroup(aGroupTitle[0],sGroupKey);
		  hGroupKey.put(sGroupKey,"1");
		  for (var j=0; j < aColKeyData.length; j++)
		  {
				gridObj.AddHeader(sGroupKey+"~"+aColKeyData[j][0],aColKeyData[j][1],aColKeyData[j][3], 12, aColKeyData[j][2], true);
				gridObj.AppendHeader(sGroupKey,sGroupKey+"~"+aColKeyData[j][0]);
				aFormat[aFormat.length] = new Array(sGroupKey+"~"+aColKeyData[j][0], aColKeyData[j][4], aColKeyData[j][5]);
			}
	}
	gridObj.BoundHeader();

	for (var i=0; i < aFormat.length; i++)
	{
		if (aFormat[i][1]!="") gridObj.SetColCellAlign(aFormat[i][0], aFormat[i][1]);
		if (aFormat[i][2]=="MONEY") gridObj.SetNumberFormat(aFormat[i][0], "#,###");
	}

}

//�ΰ��� ����Ʈ ������ ũ�ν� �� �����
function showCrossTabMulti(gridObj, fix_dsnm, aFix, dsnm, aColKeyData, sRowKey, sColKey, aRowSum, aColSum)
{
	var hGrid = new Hashtable();
	var aFixData = DataSet.getParamArrHash(fix_dsnm, DataSet.getCurPage(fix_dsnm));
	var nCnt = parseInt(DataSet.getTotalCount(fix_dsnm));

	for (var j=0; j < gridObj.GetColCount(); j++)
	{
		var aTmp = new Array(nCnt);

		for (var m=0; m<aTmp.length; m++)
		{
			aTmp[m] = "0";
		}
		hGrid.put(gridObj.GetColHDKey(j), aTmp);
	}

	for (var j=0; j < aFixData.length; j++)
	{
		var hData = aFixData[j];
		for (var i=0; i < aFix.length; i++)
		{
			var sKey = aFix[i][0];
			var aTmp = hGrid.get(sKey);
			aTmp[j]=hData.get(sKey);
			hGrid.put(sKey, aTmp);
		}
	}

	var aData = DataSet.getParamArrHash(dsnm, DataSet.getCurPage(dsnm));
	var aRowKey = DataSet.getParamArr(fix_dsnm, DataSet.getCurPage(fix_dsnm),sRowKey);

	for (var j=0; j < aData.length; j++)
	{
		var hData = aData[j];

		for (var i=0; i < aColKeyData.length; i++)
		{
			var sKey = aColKeyData[i][0];  //cnt

			if (hData.get(sColKey) == "") continue;
			var aTmp = hGrid.get("C_"+hData.get(sColKey)+"~"+sKey);
			for (var k=0; k < aRowKey.length; k++)
			{
				if (aRowKey[k] == hData.get(sRowKey))
				{
						aTmp[k]=hData.get(sKey);
						continue;
				}

			}
			hGrid.put("C_"+hData.get(sColKey)+"~"+sKey, aTmp);
		}
	}
	gridObj.SetGridRawData(makeGridRawData(gridObj, hGrid), true);

/*	if (aColSum)
	{
		var sSumList = "";
		for (var i=1; i < gridObj.GetColCount(); i++)
		{
			if (sSumList !="") sSumList += ",";
			sSumList += gridObj.GetColHDKey(i);
		}

		gridObj.AddSummaryBar ("summary01","�հ�","summaryall","sum",sSumList);
	}
*/
}

function 	setGridFormat(aCol)
{
}


function getGroupId(obj)
{
	var group_id= "";
	if (obj.elements["partcd"] && obj.elements["partcd"].value != "") group_id = f.elements["partcd"].value;
	else if (obj.elements["teamcd"] && obj.elements["teamcd"].value != "") group_id = f.elements["teamcd"].value;
	else if (obj.elements["cntrcd"] && obj.elements["cntrcd"].value != "") group_id = f.elements["cntrcd"].value;
	return group_id;
}


/********************
* �����ȣ �˻�â
********************/
function openZip(gubun)
{
	 openPopup("/jsp/common/comZip.jsp", "frm="+ gubun, "comZip", "", "", "610", "500", "scrollbars=no");
}


//���� ã�� â ����
function openUserFind(gubun)
{
	 openPopup("/jsp/common/comUserFind.jsp", "frm="+ gubun, "comUser", "", "", "610", "500", "scrollbars=no");
}

//ķ���� ã�� â ����
function openCampFind(sGubun)
{
	 openPopup("/jsp/common/comCampOrg.jsp", "frm="+ sGubun, "comCamp", "", "", "680", "335", "scrollbars=no");
}

//ũ�ν��� select �÷� ����� -- ȣ�� makeSelectColumn(dsnm, "consl_mcd", "consl_mcd", "rate")
function makeSelectColumn(dsnm, colnm, dscolnm, rate)
{

	var cnt = DataSet.getTotalCount(dsnm);
	if(cnt < 1) return;

	var ret = "";
	for(var i=0; i<cnt; i++)
    {
		ret += " SUM(CASE WHEN "+ colnm +" = '" + DataSet.getParam(dsnm, 1, i, dscolnm) + "' THEN 1 ELSE 0 END) C_" + DataSet.getParam(dsnm, 1, i, dscolnm) + " \n";
		if(rate == "rate") ret += ", CASE WHEN SUM(CASE WHEN "+ colnm +" = '" + DataSet.getParam(dsnm, 1, i, dscolnm) + "' THEN 1 ELSE 0 END)*count("+ colnm +") = 0 THEN 0 ELSE ROUND(SUM(CASE WHEN "+ colnm +" = '" + DataSet.getParam(dsnm, 1, i, dscolnm) + "' THEN 1 ELSE 0 END)/count("+ colnm +"), 2) END CR_" + DataSet.getParam(dsnm, 1, i, dscolnm) + " \n";
		if((i+1) < cnt) ret += ", ";
    }

	return ret;
}

//�� ���� ��� �����
function makeGridHeader(oGrid, aColInfo)
{

	var htTmp = new Hashtable();
	oGrid.ClearGrid();
	for (var i=0; i < aColInfo.length; i++)
	{
		oGrid.AddHeader(aColInfo[i][0],aColInfo[i][1],aColInfo[i][2], aColInfo[i][3], aColInfo[i][4], aColInfo[i][5]);
	}
	oGrid.BoundHeader();

	for (var i=0; i < aColInfo.length; i++)
	{
		if (aColInfo[i].length>6 && aColInfo[i][6]!=undefined && aColInfo[i][6] != "") oGrid.SetColCellAlign(aColInfo[i][0], aColInfo[i][6]);
		if (aColInfo[i].length>7 && aColInfo[i][7]!="")
		{
			oGrid.SetParam(aColInfo[i][0]+"_format", aColInfo[i][7]);
		}
		if (aColInfo[i].length>8 && aColInfo[i][8]!="") htTmp.put(aColInfo[i][0], new Array( aColInfo[i][8], aColInfo[i][7]));
	}

	if (htTmp.size()>0) htGridOpt.put(oGrid.id, htTmp);

}

/*************************************************************************************************************
 * QMS������ ���
 * ***********************************************************************************************************
 * insertLstnHist         : û���̷� ���
 * callbackInsertLstnHist : û���̷� ��� �� �ݹ�
 * openPlayRecord         : ����û���˾�
 * openListening          : Ư��û�� ����û���˾�
 * openEvalSheet          : �򰡽��� �˾�
 * user_id_onBlur         : ������ Blur�� ó��
 * user_id_callback       : ���� �� �ڵ���ȸ callback
 * openUserFind_QMS       : ��-������ȸ ����
 * GetGridComboValue      : �׸��忡�� �޺��� �ڵ尪 ����
 **************************************************************************************************************/
/**
 * û���̷� ��� (QMS)
 * p_eval_seq    : �򰡼���
 * p_lstn_tc     : û�뱸���ڵ�
 * sParam1       : UCAREAPP -> p_rec_file_nm(�������ϸ�)
                 : KIPO -> call_id(����̷�)
 * sParam2       : KIPO -> dt(�������)
 */
function insertLstnHist(p_eval_seq, p_lstn_tc, sParam1, sParam2)
{
	var sProject       = "KIPO";		//Ư��û
	var INSERT_ID_LSTN = "UCQMS106I";	//û���̷�
	var sUserParam     = "";
	sUserParam += ( "&eval_seq="    + p_eval_seq );
	sUserParam += ( "&lstn_tc="     + p_lstn_tc  );
	sUserParam += ( "&reg_user_id=" + getUserID());
	var tran = new Trans();
	tran.setSvc(INSERT_ID_LSTN);
	tran.setUserParams(sUserParam);

	if(sProject=="KIPO")			//Ư��û
	{
		var call_id = sParam1;
		var dt      = sParam2;
		tran.setCallBack("callbackInsertLstnHist('"+call_id+"','"+dt+"')");
	}
	else //if(sProject=="UCARE")	//UCAREAPP
	{
		var p_rec_file_nm = sParam1;
		tran.setCallBack("callbackInsertLstnHist('"+p_rec_file_nm+"')");
	}

	tran.open("","","/common.do");
}
/**
 * û���̷� ��� �� �ݹ�(QMS)
 * sParam1       : UCAREAPP -> p_rec_file_nm(�������ϸ�)
                 : KIPO -> call_id(����̷�)
 * sParam2       : KIPO -> dt(�������)
 */
function callbackInsertLstnHist( sParam1, sParam2 )
{
	var sProject       = "KIPO";		//Ư��û
	var INSERT_ID_LSTN = "UCQMS106I";	//û���̷�

	if (DataSet.getParam(INSERT_ID_LSTN, 1, 0, "SUCCESS_COUNT") > 0)
	{
		if(sProject=="KIPO")			//Ư��û
		{
			var call_id = sParam1;
			var dt      = sParam2;
			openListening(call_id, dt)
		}
		else //if(sProject=="UCARE")	//UCAREAPP
		{
			var p_rec_file_nm = sParam1;
			openPlayRecord(p_rec_file_nm);
		}
	}
	else
	{
		MessageBox("Fail", "E", "");
	}
}
/**
 * ����û���˾�(QMS)
 * p_rec_file_nm : �������ϸ�
 */
function openPlayRecord(p_rec_file_nm)
{
	if(	p_rec_file_nm == ""){MessageBox("QMSNoRecFileName", "I", ""); return;} //�������ϸ��� �������� �ʽ��ϴ�.
	var sParams = "rec_file_nm="+p_rec_file_nm;
	openPopup("qmsPlayRecordP.jsp", sParams, "qmsPlayRecordP", "", "", "490", "165", "scrollbars=no, status=no");
}
/**
 * ���� û�� �˾�(Ư��û)
 * call_id : ����̷�
 * dt      : �������
 */
function openListening(call_id, dt)
{
	openPopup("http://10.133.45.161/Voicerec/support/audio_player.asp", "callid=" + call_id + "&starttime=" + dt, "ListeningWin", "", "", "500", "100", "", "");
}
/**
  * �򰡽��� �˾� (QMS)
  * callscreenid : ȣ�� ȭ�� ID
  * mode         : ȭ����
  * eval_seq     : ��ID
  * plan_seq     : �򰡰�ȹ ID
  * sheet_seq    : ���� ID
  * eval_nmt     : ��������
  * qaa_id       : ���� ID
  * obj_user_id  : ����� ID
  * appl_seq     : ���ǽ�ûID
  */
function openEvalSheet(callscreenid,  mode, eval_seq, plan_seq, sheet_seq, eval_nmt, qaa_id, obj_user_id, appl_seq, consl_no)
{
	var sParam = "";
	sParam += "req_callscreenid=" + callscreenid
	sParam += "&req_mode=" 		  + mode;
	sParam += "&req_eval_seq=" 	  + eval_seq;
	sParam += "&req_plan_seq=" 	  + plan_seq;
	sParam += "&req_sheet_seq="	  + sheet_seq;
	sParam += "&req_eval_nmt=" 	  + eval_nmt;
	sParam += "&req_qaa_id=" 	  + qaa_id;
	sParam += "&req_obj_user_id=" + obj_user_id;
	sParam += "&req_appl_seq=" 	  + appl_seq;
	sParam += "&req_consl_no=" 	  + consl_no;
	openPopup("qmsExecuteSheetP.jsp", sParam, "qmsExecuteSheetP", "", "", "1080", "923", "scrollbars=no, status=no, resizable=no");
}


/**
  * ������ Blur�� ó��(QMS)
  * obj  : object
  */
function user_id_onBlur(obj, formName, bTeamset, sType, sId, sNm)
{

	if (obj.readOnly == true) return false;
//	alert("onblr");
	if (!formName || formName =="") formName = "fQuery";
	if (!bTeamset) bTeamset = "false";

	var objForm =document.all[formName];
	var objId = objForm.all[sId];
	var objNm = objForm.all[sNm];

	if(obj.value == "")
	{
		if (sType =="user_id") objId.value = "";
		else objNm.value = "";
	}
	else
	{
		var tran = new Trans();
		tran.setSvc("UCCOM026S");	// ����ID
		tran.setWait(false);
		tran.setMyUserParams(sType,obj.value);
		tran.setCallBack("user_id_callback('"+ formName+"', '"+sId+"','"+sNm+"','"+bTeamset+"', '"+sType+"')");
		tran.open("", "", "/common.do");
	}
}
/*
 * ���� �� �ڵ���ȸ callback(QMS)
 */
function user_id_callback(formName, sId, sNm, bTeamset, sType)
{
	var objForm = document.all[formName];
	if(DataSet.getTotalCount("UCCOM026S") > 0)
	{
		if( bTeamset == "true" &&
			((objForm.team_lcd&& objForm.team_lcd.disabled && objForm.team_lcd.value != DataSet.getParam("UCCOM026S", 1, 0, "team_lcd"))
			|| (objForm.team_mcd && objForm.team_mcd.disabled && objForm.team_mcd.value != DataSet.getParam("UCCOM026S", 1, 0, "team_mcd"))
			|| (objForm.team_scd && objForm.team_scd.disabled && objForm.team_scdvalue  != DataSet.getParam("UCCOM026S", 1, 0, "team_scd"))) )
		{
			MessageBox("TeamNotUser", "I");
			objForm[sNm].value = "";
			return;
		}

		//var userid = objForm[sId].value;
		if(bTeamset == "true")
		{
			if(objForm.team_lcd.value != DataSet.getParam("UCCOM026S", 1, 0, "team_lcd"))
			{
				objForm.team_lcd.value = DataSet.getParam("UCCOM026S", 1, 0, "team_lcd");
				Team_OnChange(objForm.team_lcd, 'team_mcd', 1);
			}

			if(objForm.team_mcd.value != DataSet.getParam("UCCOM026S", 1, 0, "team_mcd"))
			{
				objForm.team_mcd.value = DataSet.getParam("UCCOM026S", 1, 0, "team_mcd");
				Team_OnChange(objForm.team_mcd, 'team_scd', 2);
			}

			objForm.team_scd.value = DataSet.getParam("UCCOM026S", 1, 0, "team_scd");
		}

		objForm.all[sId].value = DataSet.getParam("UCCOM026S", 1, 0, "user_id");
		objForm.all[sNm].value = DataSet.getParam("UCCOM026S", 1, 0, "user_nm");
	}
	else
	{
		if (sType =="user_id") objForm.all[sId].value = "";
		else objForm.all[sNm].value = "";
	}
}
/**
 * ��-������ȸ ����(QMS)
 * sType : �������� : �� ȭ�鿡 ������ ������  ���� ���а��� �Ѱ��ְ� �޴´�.
 * sMode : 'SINGLE':�ѻ������, MULTI->�����������(����Ʈ)
 */
function openUserFind_QMS(sType, sMode)
{
	if (sType == null) sType = "";
	if (sMode == null) sMode = "";
	var url = "qmsUserFindP.jsp";
	var str = "";
	str += "pType="  + sType;
	str += "&pMode=" + sMode;
	openPopup(url, str, "qmsUserFindP", "", "", "580", "531", "status=no,scrollbars=no");
}
/**
 * �׸��忡�� �޺��ڵ尪 ����(QMS)
 * obj    : ������ �׸��尴ü
 * col    : ������ �÷���
 * index  : ������ Row Index
 * return : ������ �ڵ尪
 */
function GetGridComboValue(obj, col, index)
{
	try{
		return obj.GetComboHiddenValue(col, obj.GetComboSelectedIndex(col, index));
	}catch(e){
		return "";
	}
}
/**************************************************************************************************************/

/*
aColIndex : ����� �÷� �ε���(�迭
aRow : ����� Row �ε���
iTitleIndex : Ÿ��Ʋ�� �� �÷�
*/

function viewGridFusionGraph(obj, tdId, chatId, aCol, aRow, iTitleIndex, iWidth, iHeight, sCaption, xName, yName, y2Name, chartType)
{
	var aData = new Array();
	var aTitle = new Array();
	for (var j=0; j < aCol.length; j++)
	{
		aTitle[j]=obj.GetColHDText(obj.GetColHDKey(aCol[j]));
	}

	for (var i=0; i < aRow.length; i++)
	{
		var iRowIndex ;
		if (aRow[i].length>0) iRowIndex =  aRow[i][0];
		else iRowIndex = aRow[i];

		var aTmp = new Array();
		aTmp[0] = obj.GetCellValueIndex(iTitleIndex, iRowIndex);
		if (chartType=="MSCOLUMN3DDY" && aRow[i].length>0 && aRow[i][1]=="1") aTmp[0]+="|S";
		for (var j=0; j < aCol.length; j++)
		{
			if (obj.GetCellHiddenValueIndex(aCol[j], iRowIndex) == "")
				aTmp[j+1]=parseNumeric(removeComma(obj.GetCellValueIndex(aCol[j], iRowIndex)));
			else
				aTmp[j+1]=parseNumeric(removeComma(obj.GetCellHiddenValueIndex(aCol[j], iRowIndex)));

//			aTmp[j+1]=parseNumeric(removeComma(obj.GetCellValueIndex(aCol[j], iRowIndex)));
		}
		aData[i] = aTmp;
	}
//	writeFusionChart(tdId, chatId, aTitle, aData, iWidth, iHeight, sCaption, xName, yName, y2Name, chartType);

}

/*
aColIndex : ����� �÷� �ε���(�迭
aRow : ����� Row �ε���
iTitleIndex : Ÿ��Ʋ�� �� �÷�
*/

function viewGridCellFusionGraph(obj, tdId, chatId, aRow, aCol, iTitleIndex, iWidth, iHeight, sCaption, xName, yName, y2Name, chartType, aLineRow)
{
	var aData = new Array();
	var aTitle = new Array();
	var iMaxRow;
	if (aRow == "ALL") iMaxRow = obj.GetRowCount();
	else iMaxRow = aRow.length;
	for (var j=0; j < iMaxRow; j++)
	{
		var index;
		if (aRow == "ALL") index = j;
		else index = aRow[j];
		aTitle[j]=obj.GetCellValueIndex(iTitleIndex,index);
	}

	for (var i=0; i < aCol.length; i++)
	{
		var sColKey ;
		if (aCol[i][0]) sColKey =  aCol[i][0];
		else sColKey = aCol[i];

		var aTmp = new Array();

		aTmp[0] = obj.GetColHDText(sColKey);
		if (chartType=="MSCOLUMN3DDY" && aCol[i].length>0 && aCol[i][1]=="1") aTmp[0]+="|S";
		for (var j=0; j < iMaxRow; j++)
		{
			var index;
			if (aRow == "ALL") index = j;
			else index = aRow[j];
			if (obj.GetCellHiddenValue(sColKey, index) == "")
				aTmp[j+1]=parseNumeric(removeComma(obj.GetCellValue(sColKey, index)));
			else
				aTmp[j+1]=parseNumeric(removeComma(obj.GetCellHiddenValue(sColKey, index)));
		}
		aData[i] = aTmp;
	}
	writeFusionChart(tdId, chatId, aTitle, aData, iWidth, iHeight, sCaption, xName, yName, y2Name, chartType);

}

/*
obj : �׸��� ��ü
tdId : �׷����� ��µ� ��ġ ���̵�
chatId : �׷��� ��
aCol : ����� �÷���(�迭�� �÷� �ε����� �ش� ��: new Array(2,3)/ ALL : ��ü �÷� Ÿ��Ʋ �÷� ����
aRow,: ����� �÷���(�迭�� �÷� �ε����� �ش� ��: new Array(2,3)/
iColTtlIndex : ������ �̸����� ����� �÷� �ε���
iWidth, iHeight, sCaption, xName, yName, y2Name, chartType

*/


function viewGridGraph(obj, tdId, chatId, aCol, aRow, iColTtlIndex, iWidth, iHeight, sCaption, xName, yName, aOption, chartType)
{
	var aData = new Array();
	var aTitle = new Array();
	var iMaxRow = 0;
	var iMaxCol = 0;
	if (aRow == "ALL") iMaxRow = obj.GetRowCount();
	else iMaxRow = aRow.length;

	if (aCol == "ALL") iMaxCol = obj.GetColCount();
	else iMaxCol = aCol.length;

	for (var i=0; i < iMaxRow; i++)	//����
	{
		var iRowIndex ;
		if (aRow == "ALL") iRowIndex =  i;
		else iRowIndex = aRow[i];

		aTitle[i] = obj.GetCellValueIndex(iColTtlIndex, iRowIndex);
	}

	for (var j=0; j < iMaxCol; j++)
	{
		var aTmp = {};	//�����迭 ����
		var iColIndex=0;
		if (aCol == "ALL") iColIndex = j;
		else iColIndex = obj.GetColHDIndex(aCol[j]);

		if (iColIndex == iColTtlIndex) continue;

		aTmp["xField"] = trim(obj.GetColHDText(obj.GetColHDKey(iColIndex)));//x�� �̸�
		for (var i=0; i < iMaxRow; i++)
		{
			var iRowIndex ;
			if (aRow == "ALL") iRowIndex =  i;
			else iRowIndex = aRow[i];

			if (obj.GetCellHiddenValueIndex(iColIndex, iRowIndex) == "")
				aTmp["col_"+i]=parseNumeric(removeComma(obj.GetCellValueIndex(iColIndex, iRowIndex)));
			else
				aTmp["col_"+i]=parseNumeric(removeComma(obj.GetCellHiddenValueIndex(iColIndex, iRowIndex)));
		}
		aData[aData.length] = aTmp;
	}

	writeRMateChart(tdId, chatId, aTitle, aData, iWidth, iHeight, sCaption, xName, yName, aOption, chartType);

}


/*
obj : �׸��� ��ü
tdId : �׷����� ��µ� ��ġ ���̵�
chatId : �׷��� ��
aCol : ����� �÷���(�迭�� �÷� �ε����� �ش� ��: new Array(2,3)/
aRow,: ����� �÷���(�迭�� �÷� �ε����� �ش� ��: new Array(2,3)/ ALL : ��ü row ��
iRowTtlIndex : x���� �̸����� ����� �÷� �ε���(�����̸��� �׸����� Ÿ��Ʋ�� ����Ѵ�.)
iWidth, iHeight, sCaption, xName, yName, y2Name, chartType

*/

function viewGridCellGraph(obj, tdId, chatId, aCol, aRow, iRowTtlIndex, iWidth, iHeight, sCaption, xName, yName, aOption, chartType, aCombiChart)
{
	var aData = new Array();
	var aTitle = new Array();
	var iMaxRow;
	if (aRow == "ALL") iMaxRow = obj.GetRowCount();
	else iMaxRow = aRow.length;

	for (var j=0; j < aCol.length; j++)//����
	{
		aTitle[j]=trim(obj.GetColHDText(aCol[j]));
	}

	for (var j=0; j < iMaxRow; j++)
	{
		var aTmp = {};	//�����迭 ����
		var iRowIndex=0;
		if (aRow== "ALL") iRowIndex = j;
		else iRowIndex = aRow[j];

		aTmp["xField"] = obj.GetCellValueIndex(iRowTtlIndex, iRowIndex);//x�� �̸�
		for (var i=0; i < aCol.length; i++)
		{
			var iColIndex=obj.GetColHDIndex(aCol[i]);

			if (obj.GetCellHiddenValueIndex(iColIndex, iRowIndex) == "")
				aTmp["col_"+i]=parseNumeric(removeComma(obj.GetCellValueIndex(iColIndex, iRowIndex)));
			else
				aTmp["col_"+i]=parseNumeric(removeComma(obj.GetCellHiddenValueIndex(iColIndex, iRowIndex)));
		}
		aData[aData.length] = aTmp;
	}

	writeRMateChart(tdId, chatId, aTitle, aData, iWidth, iHeight, sCaption, xName, yName, aOption, chartType, aCombiChart);

}
var gChartData = new Hashtable();
function writeRMateChart(tdId, chartId, aTitle, aData, iWidth, iHeight, sCaption, xName, yName, aOption, chartType, aCombiChart)
{
	if (tdId == undefined) tdId= "tdGraph";
	if (chartId == undefined) chartId= "chatSheet";
	var sRegend = "true";
	if (aOption["legend"]=="false") sRegend = "false";

	var sLayout = "<rMateChart cornerRadius='12' backgroundColor='0xFFFFEE' borderStyle='solid'>\r\n"+
					"<Options>\r\n"+
						"<Caption text='"+sCaption+"'/>\r\n"+
							"<Legend useVisibleCheck='"+sRegend+"' fontSize='10' />\r\n"+
					"</Options>\r\n"+
					"<NumberFormatter id='fmt' /> \r\n"+
					"<"+chartType+"Chart showDataTips='true' "+(aOption["ttl_style"]?"styleName='ttl'":"")+">\r\n"+
						"<horizontalAxis>\r\n"+
							"<CategoryAxis categoryField='xField'/>\r\n"+
						"</horizontalAxis>\r\n"+
						"<series>\r\n";

	if (chartType == "Combination3D")
	{
		for (var i=0; i < aCombiChart.length; i++)
		{
			if (aCombiChart[i][3].length > 1)
			{
				sLayout += "<"+aCombiChart[i][0]+"Set type='clustered'>\r\n";
				sLayout += 	"<series>\r\n";
			}
			for (var j=0; j < aCombiChart[i][3].length; j++)
			{
				var index = aCombiChart[i][3][j];
				sLayout +=		"<"+aCombiChart[i][0]+"Series yField='col_"+index+"' displayName='"+aTitle[index]+"'>\r\n"+
									"<verticalAxis>\r\n"+
								  	"	<LinearAxis id='"+aCombiChart[i][1]+"' formatter='{fmt}' />\r\n"+
								  	"	</verticalAxis>\r\n"+
									"<showDataEffect><SeriesInterpolate/></showDataEffect>\r\n"+
								"</"+aCombiChart[i][0]+"Series>\r\n";
			}
			if (aCombiChart[i][3].length > 1)
			{
				sLayout += 	"</series>\r\n";
				sLayout += "</"+aCombiChart[i][0]+"Set>\r\n";
			}
		}
		sLayout += 	"</series>\r\n";

	}
	else if (chartType == "Pie2D")
	{
		for(var i=0; i < aTitle.length; i++)
		{
			sLayout +=		"<"+chartType+"Series nameField='xField' field='col_"+i+"'>\r\n"+
								"<showDataEffect><SeriesInterpolate/></showDataEffect>\r\n"+
							"</"+chartType+"Series>\r\n";
		}
		sLayout +=				"</series>\r\n";
	}
	else
	{
		for(var i=0; i < aTitle.length; i++)
		{
			sLayout +=		"<"+chartType+"Series yField='col_"+i+"' displayName='"+aTitle[i]+"' >\r\n"+
								"<showDataEffect><SeriesInterpolate/></showDataEffect>\r\n"+
							"</"+chartType+"Series>\r\n";
		}
		sLayout +=				"</series>\r\n";
	}

	if (chartType == "Combination3D")
	{
		sLayout += "	<verticalAxisRenderers>\r\n";
		for	(var i=0; i < aCombiChart.length; i++)
		{
			sLayout += "<AxisRenderer axis='{"+aCombiChart[i][1]+"}' placement='"+aCombiChart[i][2]+"'></AxisRenderer>\r\n";
		}
		sLayout += "	</verticalAxisRenderers>\r\n";
	}


	sLayout +=		"</"+chartType+"Chart>\r\n";
	sLayout +=		"<Style>\r\n";
	if (aOption["ttl_style"])	sLayout +=		".ttl{ "+aOption["ttl_style"]+" }\r\n ";
	sLayout +=		"</Style>\r\n";
	sLayout +=		"</rMateChart>";

	var hData = new Hashtable();
	hData.put("layout", sLayout);
	hData.put("data", aData);
	gChartData.put(chartId, hData);

	var sFunction = "rMateChartOnLoad('"+chartId+"')";
	var flashVars = "rMateOnLoadCallFunction="+ sFunction;

	var obj = document.all[tdId];
	obj.innerHTML = ucare_rMateChartCreate(chartId,scriptPath+"/chart/rMateChart",flashVars, iWidth, iHeight, "#FFFFFF");
}


function rMateChartOnLoad(chartId)
{
	var hData = gChartData.get(chartId);
	if (hData)
	{
		var sChartLayout = hData.get("layout");
		var aChartData = hData.get("data");

		var oChart = document.all[chartId];
//		console.log(sChartLayout);
//		console.log(aChartData[0]["xName"]+","+aChartData[0]["col_0"]);
		oChart.setLayout(sChartLayout);
		oChart.setData(aChartData);
	}
}



/**
 * �׷��� �ʱ�ȭ
 */
function clearGraph(tdId, chartId)
{


// ����Ÿ�� URL ��θ� ���� ������ ��� �����Ͻʽÿ�.
// �迭���·� �����͸� ������ ��� �ּ�ó���� �����Ͻʽÿ�.
// �迭���¿� ���� ����� ���, �켱������ �迭���� ������ �����Դϴ�.
//var dataURL =encodeURIComponent("./DataXml/multiData.xml");
//flashVars += "&dataURL="+dataURL;

	if (tdId == undefined) tdId= "tdGraph";
	if (chartId == undefined) chartId= "chatSheet";
//	writeFusionChart(tdId,  chartId, new Array(""), new Array(new Array("")), 1250, 330, "", "", "", "","");
	var obj = document.all[tdId];
//	obj.innerHTML = ucare_rMateChartCreate(chartId,scriptPath+"/chart/rMateChart",flashVars, 600, 400, "#FFFFFF");
//	alert("write ok");
}
/**************************************************************************************************************/

// ������� ����
/**
 * �޺��ڽ� �����
 * obj		: �޺��ڽ� ��ü
 * uppercd	: �����ڵ�
 */
function makeCombo(obj, uppercd) {
	var tmpArr = getCodeArray(uppercd);
	var aCode  = tmpArr[0];
	var aName  = tmpArr[1];

	setOptions(obj, aCode, aName, false, true);
}

/**
 * �޺��ڽ��� �ʿ��� �迭�� ���´�.
 * uppercd	: �����ڵ�
 */
function getCodeArray(uppercd)
{
	var codArr = getExtendObj().ifmBottom.codeArr;
	var valArr = new Array();
	var txtArr = new Array();
	var index  = 0;
	var lcd	   = uppercd.substring(0,3);
	var mcd	   = uppercd.substring(3,6);
	var scd    = uppercd.substring(6);

	if (mcd == "000" && scd == "000")
	{
		for (var i=0; i<codArr.length; i++)
		{
			if (codArr[i][0] == lcd && codArr[i][1] != "000" && codArr[i][2] == "000")
			{
				valArr[index] = codArr[i][3];
				txtArr[index] = codArr[i][4];
				index++;
			}
		}
	}
	else if (scd == "000")
	{
		for (var i=0; i<codArr.length; i++)
		{
			if (codArr[i][0] == lcd && codArr[i][1] == mcd && codArr[i][2] != "000")
			{
				valArr[index] = codArr[i][3];
				txtArr[index] = codArr[i][4];
				index++;
			}
		}
	}

	var cmbArr = new Array(valArr, txtArr);

	return cmbArr;
}

function setSummaryBarFunction(oGrid, sSummaryKey, sFunc, sColumnKey, sFormat)
{
	if (!sFormat || sFormat=="") sFormat = "#,###,##0";
	oGrid.SetSummaryBarFunction(sSummaryKey, sFunc, sColumnKey);
//	oGrid.SetSummaryBarFormat(sSummaryKey,sFormat,sColumnKey);

}

function setSummaryTime(oGrid, sSummaryKey, sFunc, sColumnKey)
{
	var iSum=0;
	var iCount=0;
	for (var i=0; i < oGrid.GetRowCount(); i++)
	{
		if (oGrid.GetCellValue(sColumnKey, i) =="") continue;
		iSum += convertStrToSec(oGrid.GetCellValue(sColumnKey, i));
		iCount++;
	}

	if (sFunc == "average") iSum= iSum/iCount;

	oGrid.SetSummaryBarFunction(sSummaryKey, 'custom', sColumnKey);
	oGrid.SetSummaryBarValue(sSummaryKey, sColumnKey, 0, convertSecToStr(iSum));
	oGrid.SetSummaryBarFormat(sSummaryKey,"###0",sColumnKey);

}
function setSumaryBar(id)
{
	var gridObj = document.all[id];
	var htTmp =htGridOpt.get(id);

	var aKey = htTmp.getNames();

	gridObj.AddSummaryBar ("summary01","�հ�","summaryall","sum",aKey[0]);
	gridObj.SetSummaryBarColor('summary01', '0|0|0', '218|226|234');

	gridObj.SetSummaryBarFont('summary01', '����', '9', false, false, false, false);
	for (var i=0; i < aKey.length; i++)
	{
		var aList = htTmp.get(aKey[i]);
		if (aList[1] == "SEC")
			setSummaryTime(gridObj,"summary01",  aList[0],aKey[i]);
		else
			setSummaryBarFunction(gridObj,"summary01", aList[0], aKey[i], "#,##0");
	}
/*
	var sSumList= "";
	for (var i=1; i <9; i++)
	{
		if (sSumList !="") sSumList += ",";
		sSumList += gridObj.GetColHDKey(i);
	}


	setSummaryBarFunction(gridObj,"summary01", "average", "work_agnt_cnt", "#,##0")
	setSummaryBarFunction(gridObj,"summary01", "average", "rspn_rate", "##.##")
	setSummaryTime(gridObj,"summary01", "average", "ib_avg_time")*/
}

/**
 * ÷������ ����Ʈ ���
 */
function showUploadFileList(SVC_ID, sFileSeq, sOldFileNm, sNewFileNm)
{
	var cnt = DataSet.getTotalCount(SVC_ID);

	var uploadFileHTML = new StringBuffer();

	uploadFileHTML.append("<table id=tblUpload border=0 cellpadding=1 cellspacing=1 width=100%>");

	for (var i = 0; i < cnt; i++)
	{
		var seq			= DataSet.getParam(SVC_ID, 1, i, sFileSeq);
		var old_file_nm = DataSet.getParam(SVC_ID, 1, i, sOldFileNm);
		var new_file_nm = DataSet.getParam(SVC_ID, 1, i, sNewFileNm);

		uploadFileHTML.append("<tr>");
		uploadFileHTML.append("<td>");

		uploadFileHTML.append("<a href=\"/jsp/common/downFile.jsp?filename=" + old_file_nm + "&newfilename=" + new_file_nm + "&delete=NO&filepath=" + UPLOAD_PATH +"\">" + old_file_nm + "</a>&nbsp;");

		uploadFileHTML.append("</td>");
		uploadFileHTML.append("</tr>");
	}

	uploadFileHTML.append("</table>");

	setUploadFile(uploadFileHTML);
}

//�׸��� default�� ����
function setGridDefault(gridId)
{
	var objGrid= document.all[gridId];
	//�׸����� default �� ����
	var aCol = aGridPrp[gridId];
	var keys = new Array; // Ű���� ������ �迭 ����
	for( key in aCol ){ // ��ü Ű�� �迭�� �����մϴ�.
		objGrid.SetParam(key,aCol[key]);
	}
}
/**************************************************************************************************************/

/*****************F5,F11����********/
document.onkeydown = function() {
	try{
		if(gAppMode == "TEST")
		{
			return true;
		}

		if (event.keyCode == 116) {      //116 : F5
	             event.keyCode = 505;
	    }

		if(event.keyCode == 8){          //8 : backspace
			if(event.srcElement.type != "textarea" && event.srcElement.type != "text")
	    	{
	        	event.keyCode = 505;
	        }
	   }
	   if (event.keyCode == 27) { //27 : ESC
	         event.keyCode = 505;
	   }

	   if (event.keyCode == 505) {
	         return false;
	   }
	}catch(e){}
}

/*****�����ʸ��콺 ����********/
document.oncontextmenu=function()
{
	try
	{
		if(gAppMode == "TEST")
		{
			return true;
		}
		else
		{
			return false;
		}
	}catch(e){}
}
/***********************************/
/*window onload�� ���ѿ� ���� ��ư �ڵ帵
window::onload() �� �����ؾ� body�� load�� �ߺ����� ����� ���ִ�.
body�� onload �����Ŀ� ����ȴ�.	2010.02.23. hykim
 */

document.onload =ucareInit();

//function window::onload()
function ucareInit()
{
	try{
		if (whoAreU=="login" || whoAreU=="top" || whoAreU=="logout" || whoAreU == "main") return;
		winInit();
	}catch(e){}
}
/***********************************/
/*window unload�� transcation ��ü ���ֱ�
window::onunload() �� �����ؾ� body�� unload�� �ߺ����� ����� ���ִ�.
body�� unload ������ ����ȴ�.	2010.02.23. hykim
 */
function window::onunload()
{
	var aKey = HASHTRANS.getNames();
	for (var i=0; i < aKey.length;i++)
	{
		var sKey =  aKey[i];
		try
		{
			HASHTRANS.get(sKey).g_activeObj.abort();
			HASHTRANS.get(sKey).g_activeObj = null;
		}
		catch(e)
		{
			//alert(e.message);
		}
	}
}

//document.onke

/**
 *�׸����� ã�� ���
 *@param obj �׸��� ��ü
 *@param sKey �˻���
 *@param sCol �˻��� �÷�
 *@return ã�� ����Ÿ�� rowindex���� �迭
 *ex)	var aList = findRowList(obj, "1", "chk");
 */
function findRowList(obj, sKey, sCol)
{
	if(obj.GetRowCount() < 1) return -1;
	var sFind = (obj.FindArea(sKey,sCol,0,sCol,obj.GetRowCount()-1));
	var aList = sFind.split(",");
	var aRet = new Array();
	for (var i=1; i<aList.length ;i=i+2 )
	{
		aRet[aRet.length]=aList[i];
	}
	return aRet;
}
