var dsParamMap=new Array();
var dsNameMap=new Array();
var dsMap=new Array();
var dsErrMap=new Array();
var dsListMap= new Array();

/*** DataSet init object */
InitUcareData = function ()
{
	//dataset setting
	this.setUcareData=InitUcareData.setUcareData;
	//dataset get
	this.getUcareData=InitUcareData.getUcareData;
	//params get
	this.getParamsData=InitUcareData.getParamsData;
	this.getParamList=InitUcareData.getParamList;
}

/* Dataset set */
InitUcareData.setUcareData = function(ucaredataObj, datasetmode)
{
	if(ucaredataObj == null) return -1;
	
	try{
		var xroot=ucaredataObj.getElementsByTagName("dataset");	//dataset object
		var paramsobj=ucaredataObj.getElementsByTagName("params");	//params obejct

		// Error 관련정보
		if (ucaredataObj.getElementsByTagName("error").length > 0)
		{
			dsErrMap["error"] = ucaredataObj.getElementsByTagName("error")[0].firstChild.nodeValue;
			
	   	  	if (dsErrMap["error"] == "true") {
	   	  		dsErrMap["errorcode"] = ucaredataObj.getElementsByTagName("error-code")[0].firstChild.nodeValue;
	   	  	}
		}
		for(var i=0;i<xroot.length;i++)
		{
			var datasetnm=xroot[i].getAttribute("id");
			var datasetobj=xroot[i];
			var chkcnt = 0;
			for(var j=0;j<dsNameMap.length;j++){
				//같은이름의 ucaredata가 있으면 그자리에 overwriting
				if(dsNameMap[j]==datasetnm){
					dsMap[j]=datasetobj;
					dsParamMap[j]=paramsobj;
					dsListMap[j]=InitUcareData.getParamList(datasetobj);
					chkcnt++;
					break;
				}
			}
			//Dataset이 없으면 추가한다.
			if(chkcnt == 0){
				dsNameMap[dsNameMap.length] = datasetnm;
				dsMap[dsMap.length] = datasetobj;
				dsParamMap[dsParamMap.length]=paramsobj;
				dsListMap[dsListMap.length]=InitUcareData.getParamList(datasetobj);
			}
		}

	}catch(e){
		alert("initDataSet.setUcareData: "+e.decription);
	}
}

/*입력된 값 전부돌려주기*/
InitUcareData.getParamList=function(xmlobj, dsmode)
{
//alert(xmlobj.getElement.xml);
	var rowcount=xmlobj.getAttribute("maxcount");
	var dsmode=xmlobj.getAttribute("datasetmode");

	var aList = {};
	for (var k=0; k<xmlobj.childNodes.length; k++)
	{
		var pagenm=xmlobj.childNodes[k].nodeName;							//page number create
		var arr=new Array();
		var dsroot=xmlobj.childNodes[k];			//page xml get
		
		if (dsmode == "U")
		{
			for (var j=0; j<rowcount;j++)
			{
				var hs=new Hashtable();
				for(var i=0;i<dsroot.childNodes.length;i++)
				{
					var oc=dsroot.childNodes[i];
		    		var aArray = oc.text.split("");
					hs.put(oc.nodeName,aArray[j]);
				}
				arr[j]=hs;
			}	
		}
		else
		{
			for (var j=0; j< dsroot.childNodes.length; j++)
			{
				var hs=new Hashtable();
				var objRs = dsroot.childNodes.item(j);
				for(var i=0;i<objRs.childNodes.length;i++){
					var oc=objRs.childNodes[i];
					hs.put(oc.nodeName,oc.text);
				}
				arr[j]=hs;
			}
		}	
		aList[pagenm] = arr;
	}	
	return aList;
}




/* Dataset get */
InitUcareData.getUcareData = function(datasetnm)
{
	if(datasetnm.length == 0) return -1;
	var rtnXml;
	
	try{
		//ucaredata find
		for(var i=0;i<dsNameMap.length;i++)
			if(dsNameMap[i] == datasetnm) rtnXml = dsMap[i];
		
		return rtnXml;
	}catch(e){
		alert("initDataSet.getUcareData : "+ e.decription);
		return null;
	}
}

/* params get */
InitUcareData.getParamsData = function(datasetnm)
{
	if(datasetnm.length == 0) return -1;
	var rtnXml;
	
	try{
		//ucaredata find
		for(var i=0;i<dsNameMap.length;i++)
			if(dsNameMap[i] == datasetnm) rtnXml = dsParamMap[i];
		
		return rtnXml;
	}catch(e){
		alert("initDataSet.getParamsData : "+ e.decription);
		return null;
	}
}

/* params get */
InitUcareData.getUCareParamsData = function(datasetnm)
{
	if(datasetnm.length == 0) return -1;
	var rtnList;
	
	try{
		//ucaredata find
		for(var i=0;i<dsNameMap.length;i++)
		{
			if(dsNameMap[i] == datasetnm) 
			{
				rtnList = dsListMap[i];
			}
		}	

		return rtnList;
	}catch(e){
		alert("InitUcareData.getUCParamsData : "+ e.decription);
		return null;
	}
}

InitUcareData.removeDataSet = function(datasetnm)
{
	if (datasetnm.length == 0) return -1;
	try{
		//ucaredata find
		for(var i=0; i<dsNameMap.length; i++)
		{
			if (dsNameMap[i] == datasetnm) {
				dsNameMap[i] = "";
				dsMap[i] = "";
				return;
			}
		}
		
	}catch(e){
		alert("initDataSet.removeDataSet : "+ e.decription);
		return null;
	}
}

/*** DataSet Object */
DataSet = function() {}

/* get dataset */
DataSet.getUcareData = function (datasetnm)
{
	try{
		var xmlObj = InitUcareData.getUcareData(datasetnm);
		
		return xmlObj;
	}catch(e){
		alert("DataSet.getUcareData : "+ e.decription);
		return null;
	}
}

/* get paramsdata */
DataSet.getParamsData = function (datasetnm)
{
	try{
		var xmlObj = InitUcareData.getParamsData(datasetnm);
		
		return xmlObj;
	}catch(e){
		alert("DataSet.getParamsData : "+ e.decription);
		return null;
	}
}

/* get paramsdata */
DataSet.getUCareParamsData = function (datasetnm)
{
	try{
		var aList = InitUcareData.getUCareParamsData(datasetnm);
		
		return aList;
	}catch(e){
		alert("DataSet.getUCareParamsData : "+ e.decription);
		return null;
	}
}

/* 해당 Dataset 의 TotalPage 를 리턴한다. */
DataSet.getXmlTotalPage = function (datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var totalpage=xmlobj.childNodes.length;
		return totalpage;
	}catch(e){
		alert("DataSet.getXmlTotalPage : "+ e.decription);
		return -1;
	}
}

/* 해당 Dataset 의 QueryTotalPage 를 리턴한다. */
DataSet.getQueryTotalPage = function (datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var rowcount=xmlobj.getAttribute("totalrowcount");
		var pagerow=xmlobj.getAttribute("pagerow");
		var totalpage=Math.ceil(rowcount/pagerow);
		
		return totalpage;
	}catch(e){
		//alert("DataSet.getQueryTotalPage : "+ e.decription);
		return 0;
	}
}

/* 현재 DataSet의 첫번째 페이지번호를 리턴한다. */
DataSet.getXmlFirstPage = function (datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var firstpage=xmlobj.firstChild.nodeName;
		firstpage=firstpage.split("-")[1];
		
		return firstpage;
	}catch(e){
		//alert("DataSet.getXmlFirstPage : "+ e.decription);
		return 0;
	}
}

/* 현재 DataSet의 마지막 페이지번호를 리턴한다. */
DataSet.getXmlLastPage = function (datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var lastpage=xmlobj.lastChild.nodeName;
		lastpage=lastpage.split("-")[1];
		
		return lastpage;
	}catch(e){
		//alert("DataSet.getXmlLastPage : "+ e.decription);
		return 0;
	}
}

/* Dataset속성중 recrow 리턴 */
DataSet.getRecRow = function (datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var recrow=xmlobj.getAttribute("recrow");
		return recrow;
	}catch(e){
		//alert("DataSet.getRecRow : "+ e.decription);
		return 0;
	}
}

/* Dataset속성중 pagerow리턴 */
DataSet.getPageRow = function (datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var pagerow=xmlobj.getAttribute("pagerow");
		return pagerow;
	}catch(e){
		//alert("DataSet.getPageRow : "+ e.decription);
		return 0;
	}
}

/* Dataset속성중 totalcount 리턴 */
DataSet.getTotalCount = function (datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var totalcount=xmlobj.getAttribute("totalrowcount");
		return totalcount;
	}catch(e){
		//alert("DataSet.getTotalCount : "+ e.decription);
		return 0;
	}
}

/* Dataset속성중 totalcount 리턴 */
DataSet.getRowCount = function (datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var rowcount=xmlobj.getAttribute("maxcount");
		return rowcount;
	}catch(e){
		//alert("DataSet.getTotalCount : "+ e.decription);
		return 0;
	}
}

/* Dataset속성중  비동기여부 */
DataSet.getAsync = function (datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var async=xmlobj.getAttribute("async");
		return async;
	}catch(e){
		//alert("DataSet.getAsync : "+ e.decription);
		return -1;
	}
}

/* Dataset속성중 action page를 리턴한다. */
DataSet.getActionPage = function (datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var actionpage=xmlobj.getAttribute("actionpage");
		return actionpage;
	}catch(e){
		//alert("DataSet.getActionPage : "+ e.decription);
		return -1;
	}
}

/* Dataset속성중 viewtype 을 리턴한다 .*/
DataSet.getViewType = function(datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var viewtype=xmlobj.getAttribute("viewtype");
		return viewtype;
	}catch(e){
		//alert("DataSet.getViewType : "+ e.decription);
		return -1;
	}
}

/* Dataset속성중 viewtype 을 리턴한다 .*/
DataSet.getMessage = function(datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var message=xmlobj.getAttribute("message");
		return message;
	}catch(e){
		//alert("DataSet.getViewType : "+ e.decription);
		return -1;
	}
}

/* Dataset속성중 svctype(서비스타입:SQLSERVICE) 을 리턴한다 .*/
DataSet.getSvcType = function(datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var svctype=xmlobj.getAttribute("svctype");
		return svctype;
	}catch(e){
		//alert("DataSet.getSvcType : "+ e.decription);
		return -1;
	}
}

/* Dataset속성중 현재페이지를 리턴한다 .*/
DataSet.getCurPage = function(datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var curpage=xmlobj.getAttribute("curpage");
		return curpage;
	}catch(e){
		//alert("DataSet.getCurPage : "+ e.decription);
		return -1;
	}
}

/* Dataset속성중 현재페이지를 리턴한다 .*/
DataSet.getDsMode = function(datasetnm)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var dsmode=xmlobj.getAttribute("datasetmode");
		return dsmode;
	}catch(e){
		//alert("DataSet.getCurPage : "+ e.decription);
		return "";
	}
}

/* 입력된 Dataset속성값을 리턴한다. */
DataSet.getDsAttribute = function(datasetnm,attr)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var attr=xmlobj.getAttribute(attr);
		return attr;
	}catch(e){
		//alert("DataSet.getSvcType : "+ e.decription);
		return -1;
	}
}

/* DataSet 속성중 현재페이지 값을 setting */
DataSet.setAttribute=function(datasetnm,attr,attrVal)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		xmlobj.setAttribute(attr,attrVal);
	}catch(e){
		//alert("DataSet.setAttribute : "+ e.decription);
	}
}

/* params value(transaction 시 넘겨준 param(request의값)의 정보를 가져온다. */
DataSet.getReqParam = function (datasetnm,key)
{
	try{
		var xmlobj=DataSet.getParamsData(datasetnm);	//dataset obj
		var param="";
		for(var i=0;i<xmlobj[0].childNodes.length;i++){
			if(key==xmlobj[0].childNodes[i].getAttribute("key")){
				param=xmlobj[0].childNodes[i].firstChild.text;
				break;
			}
		}
		
		return param;
	}catch(e){
		alert("DataSet.getParam : "+ e.decription);
		return "";
	}
}

/* params value(transaction 시 넘겨준 param(request의값)의 정보를 가져온다. */
DataSet.existReqParam = function (datasetnm,key)
{
	try{
		var xmlobj=DataSet.getParamsData(datasetnm);	//dataset obj
		var param="";
		for(var i=0;i<xmlobj[0].childNodes.length;i++){
			if(key==xmlobj[0].childNodes[i].getAttribute("key")){
				param=xmlobj[0].childNodes[i].firstChild.text;
				return true;
			}
		}
		
		return false;
	}catch(e){
		alert("DataSet.getParam : "+ e.decription);
		return false;
	}
}


/* params value들을 param형태의 string으로 만듬
 * 타입으로 바꾼다.(transaction 시 넘겨준 request의값이기준  
 */
DataSet.getReqParamString = function (datasetnm)
{
	try{
		var xmlobj=DataSet.getParamsData(datasetnm);	//dataset obj
		var params="";
		for(var i=0;i<xmlobj[0].childNodes.length;i++)
		{
			//if (xmlobj[0].childNodes[i].getAttribute("key") == "_FORWARD_ID" 
			//	|| xmlobj[0].childNodes[i].getAttribute("key") == "_ACTIONPAGE" ) continue;
			params+=encodeURIComponent(xmlobj[0].childNodes[i].getAttribute("key"))+"=";
			params+=encodeURIComponent(xmlobj[0].childNodes[i].firstChild.text);
			if(i+1 != xmlobj[0].childNodes.length) params+="&";
		}
		
		return params;
	}catch(e){
		alert("DataSet.getReqParamString : "+ e.decription);
		return "";
	}
}

/* key에해당되는 param 노드를 지운다.*/
DataSet.removeReqParam = function (datasetnm,key)
{
	try{
		var xmlobj=DataSet.getParamsData(datasetnm);	//dataset obj
		for(var i=0;i<xmlobj[0].childNodes.length;i++){
			if(key==xmlobj[0].childNodes[i].getAttribute("key")){
				xmlobj[0].removeChild(xmlobj[0].childNodes[i]);
				break;
			}
		}
	}catch(e){
		alert("DataSet.removeReqParam: "+ e.decription);
	}
}

/* page tag의 child 갯수 를 리턴 */
DataSet.getPageChildCount = function (datasetnm,pagenum)
{
	try{
		var xmlobj=DataSet.getUcareData(datasetnm);	//dataset obj
		var pagetag="page-"+pagenum;
		var lengh=0;
		for(var i=0;i<xmlobj.childNodes.length;i++){
			if(xmlobj.childNodes[i].nodeName == pagetag){
				lengh=xmlobj.childNodes[i].childNodes.length;
				break;
			}
		}
	}catch(e){
		alert("DataSet.getPageChildCount: "+ e.decription);
	}
	finally{
		return lengh;
	}
}

/* 입력된 컬럼의 값을 넘겨줍니다. */
DataSet.getParam = function (datasetnm, pageNo, rowIndex, key)
{
	var val;
	try{
		var aList = DataSet.getUCareParamsData(datasetnm);
		var pagenm="page-"+pageNo;							//page number create
		var obj = aList[pagenm];
		var ht = obj[rowIndex];
    	val = HtmlUtil.decode(ht.get(key),"undefined","");
	}catch(e)
	{
		//alert("DataSet.getPageChildCount: "+ e.decription);
	}
	finally{
    	return val;
	}

}

/* 입력된 row의 값을 Hashtable 타입으로 넘겨줍니다. */
DataSet.getHashParam=function(datasetnm,pageNo,rowIndex){
	var ht ;
	try{
		var aList = DataSet.getUCareParamsData(datasetnm);
		var pagenm="page-"+pageNo;							//page number create
		var obj = aList[pagenm];
		ht = obj[rowIndex];
	}catch(e)
	{
		//alert("DataSet.getPageChildCount: "+ e.decription);
	}
	finally{
    	return ht;
	}
}

/* 입력된 컬럼의 값을 배열로 넘겨줍니다.*/
DataSet.getParamArr=function(datasetnm,pageNo,column)
{
	var aList = DataSet.getUCareParamsData(datasetnm);
	var pagenm="page-"+pageNo;							//page number create
	var obj = aList[pagenm];
	var arr = new Array();
	for(var i=0;i<obj.length;i++)
	{
		arr[i]=obj[i].get(column);
	}
	return arr;
}

/*입력된 값 전부돌려주기*/
DataSet.getParamArrHash=function(datasetnm,pageNo)
{
	//getUCParamsData
	var aList = DataSet.getUCareParamsData(datasetnm);
	var pagenm="page-"+pageNo;							//page number create
	return aList[pagenm];
}

/**
 * DataSet에 대한 success count 건수 
 * return true : 에러, false : 성공
 */
DataSet.getSuccessCount=function(datasetnm)
{
	var val = -1;
	try{
		val = DataSet.getParam(datasetnm, "1", "0", "SUCCESS_COUNT");
	}catch(e)
	{
		//alert("DataSet.getPageChildCount: "+ e.decription);
	}
	finally{
    	return val;
	}
	
}


/**
 * DataSet에 대한 에러여부 
 * return true : 에러, false : 성공
 */
DataSet.isError=function(datasetnm)
{
	var obj = document.all(datasetnm);
	if (obj && obj.tagName == "OBJECT") 
	{
		if (obj.GetStatus() == "false") return true;
		else return false;
	}
	return dsErrMap["error"];
}

/**
 * 에러일 경우 DataSet에 대한 에러코드 
 */
DataSet.getErrorCode=function()
{
	return dsErrMap["errorcode"];
}

