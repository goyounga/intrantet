var DEBUG=false;				//debug 상태 설정
var THISTRANS;
var HASHTRANS = new Hashtable();

/*** transaction object */
Trans = function()
{
	this.g_async=true;				//비동기여부
	this.g_svctype="SQLSERVICE";	//서비스타입(DB or HOST)
	this.g_svcid=null;				//쿼리아이디
	//this.g_wisegrid="0";            //wisegrid로 출력할 지 여부
	this.g_wisegrid;            //wisegrid로 출력할 지 여부
	this.g_mode="";
	this.g_page="1";				//현재페이지
	this.g_recrow="";				//rownum갯수(분기점)DB or Chace
	this.g_pagerow="";				//한페이지당 화면출력수
	this.g_startrow=1;				//리스트시작번호
	this.g_userparam=null;			//사용자 parameter
	this.g_arruserparam=null;		//사용자 parameter Array용
	this.g_activeObj=null;			//xml데이타오브젝트
	this.g_callback="callback";		//사용자콜백(기본 callback)
	this.g_checkcallback="callback";//체크용 사용자콜백(기본 callback)
	this.g_hasArguments=false;		//사용자콜백에 arguments가 있는지 여부 
	this.g_forward_id="dsl";		//forword id
	this.g_forward_page=null;		//포워드할 jsp페이지
	//this.g_enc="EUC-KR";
	this.g_enc="";

	this.g_exectype=null;		//실행타입
	this.g_viewtype=null;		//출력형식

	this.g_ressvcid=null;			//action처리후 찾을 datasetname(쿼리아이디)
	this.g_waityn=true;				//wait
	this.g_message="처리중입니다.";	//wait 메세지
	this.g_dsnotf=true;				//data 없을 경우 메세지 출력여부
	this.g_defclick=false;			//첫번째  row 클릭여부

	this.g_dissvcid=null;			//출력 id
	this.g_pageing = false;

	this.g_pagegroup = 10;			//pageing에 표시될 갯수
	this.g_wisepagetype="N";		//pageing type (N:NEXTMODE P:PAGEING)
	this.g_tranlog="N";				//Trans log YN
	this.g_saveautoselect="false";	//save 모드시 처리후 자동 조회 여부
	this.g_savedsnm="";				//save 모드시 콜백을 받을 DataSet ID
	this.g_encode_id="";			//encode parameter
	this.g_decode_id="";			//decode parameter
	this.g_callbackFlag=false;			//callback 호출여부 (세팅 함수는 없음)
	this.g_waitbox = "";
	
	this.g_dataset_mode="U";
}

/* 사용자 콜백 */
Trans.prototype.setCallBack = function(callback)
{
	this.g_callback = callback;
	
	var firstIndex = callback.indexOf("(");
	var lastIndex = callback.indexOf(")");
	
	if (firstIndex > 0 && lastIndex > 0)
	{
		this.g_hasArguments = true;
		this.g_checkcallback = callback.substring(0, firstIndex); 
	}
	else
	{
		this.g_hasArguments = false;
		this.g_checkcallback = callback;
	}
}

/* 동기 ,비동기 */
Trans.prototype.setAsync = function (asyncyn)
{
	this.g_async = asyncyn;
}

/* 현재페이지 수 */
Trans.prototype.setPage = function (page)
{
	this.g_page = page;
}

/* rownum갯수 (분기점) */
Trans.prototype.setRecRow = function (recrow)
{
	this.g_recrow = recrow;
}

/* 서비스 쿼리 명 */
Trans.prototype.setSvc = function(svc)
{
	this.g_svcid = svc;
}

/* 서비스 쿼리 명 (연속으로 넣기)*/
Trans.prototype.setMySvc = function(svc)
{
	this.g_svcid = (this.g_svcid!=null?this.g_svcid+",":"")+svc;
}

/* 서비스 타입 default(SQLSERVICE) */
Trans.prototype.setSvcType = function(svct)
{
	this.g_svctype = svct;
}

/* WiseGrid여부 default(SQLSERVICE) */
Trans.prototype.setWiseGrid = function(wisegrid)
{
	this.g_wisegrid = wisegrid;
}

/* WiseGrid여부 default(SQLSERVICE) */
Trans.prototype.setMode = function(mode)
{
	this.g_mode = mode;
}

/* pagerow */
Trans.prototype.setPageRow = function (pg)
{
	this.g_pagerow = pg;
}

/* 사용자 parameter */
Trans.prototype.setUserParams = function(param)
{
	this.g_userparam = param;
}

/* 사용자 parameter (세팅) */
Trans.prototype.setMyUserParams = function(key, value)
{
	this.g_arruserparam += "&" + key + "=" + encodeURIComponent(value);
}

/* 사용자 parameter (Array용) */
Trans.prototype.setArrUserParams = function(keyArr, valArr)
{
	if (keyArr && valArr)
	{
		var params = "";
		
		for (var i=0; i<keyArr.length; i++)
		{
			params += "&" + keyArr[i] + "=" + encodeURIComponent(valArr[i]);
		}
		
		this.g_arruserparam = params;
	}
}

/* 리스트시작번호 */
Trans.prototype.setStartRow = function(startnum)
{
	this.g_startrow = startnum;
}

/* forwardid */
Trans.prototype.setForwardId = function(forwardid, forwardpage)
{
	this.g_forward_id = forwardid;
	this.g_forward_page = forwardpage;
}

/* 실행 타입 */
Trans.prototype.setExecType = function(exectype)
{
	this.g_exectype = exectype;
}

/* display 타입 */
Trans.prototype.setViewType = function(viewtype)
{
	this.g_viewtype = viewtype;
}

//action처리후 변경되는 datasetname(쿼리아이디) 설정(2007.07.14)
Trans.prototype.setResSvc=function (ressvcid){
	this.g_ressvcid=ressvcid;
}

//기다림창여부 (2007.07.27)
Trans.prototype.setWait=function(tf, msg){
	this.g_waityn=tf;
	this.g_message=HtmlUtil.decode(msg,undefined,"처리중입니다...", msg);

}

//Data not Found 여부 (2007.08.07)
Trans.prototype.setDsNotF=function(tf){
	this.g_dsnotf=tf;
}

//첫번째 row click  (2008.01.15)
Trans.prototype.setDefClick=function(tf){
	this.g_defclick=tf;
}

//출력할 disp id  (2008.02.01)
Trans.prototype.setDisSvc=function(tf){
	this.g_dissvcid=tf;
}

//pageing 여부  (2008.02.13)
Trans.prototype.setPageing=function(tf){
	this.g_pageing=tf;
}

//pageing시 count 숫자 여부  (2008.02.13)
Trans.prototype.setPageGroup=function(tf){
	this.g_pagegroup=tf;
}

//wise grid pageing mode
Trans.prototype.setWisePageType=function(t){
	this.g_wisepagetype=t;
}

//trnas log
Trans.prototype.setTranLog=function(t){
	this.g_tranlog=t;
}

//save 모드시 처리후 자동 조회 여부
Trans.prototype.setSaveAutoSelect=function(t){
	this.g_saveautoselect=t;
}

//save 모드시 처리후 콜백에서 받을 DataSet ID를 세팅
Trans.prototype.setSaveDataSetId=function(dsnm){
	if (this.g_saveautoselect == "true" || this.g_saveautoselect == true)
	{
		MessageBox("TransNoAutoMode", "E", "");
	}
	else
	{
		this.g_savedsnm=dsnm;
	}
}

// endcode parameter 세팅
Trans.prototype.setEncodeParamId=function(paramId) {
	this.g_encode_id = paramId;
}

// dedcode parameter 세팅
Trans.prototype.setDecodeParamId=function(paramId) {
	this.g_decode_id = paramId;
}

// datasetmode 세팅
Trans.prototype.setDataSetMode=function(paramId) {
	this.g_dataset_mode = paramId;
}
/* new trans */
Trans.prototype.newTrans = function ()
{
	var xmlreq = false;
	if(window.XMLHttpRequest)
		xmlreq = new XMLHttpRequest();
	else if(window.ActiveXObject){
		try{
			xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e1){
			try{
				xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e2){
				alert("create Trans Exception : "+e2.decription);
			}
		}
	}

	return xmlreq;
}
Trans.prototype.abort = function ()
{
	//alert("abort");
	this.g_activeObj.abort();	
}
/* ajax(open) */
Trans.prototype.open = function (formnm,outformnm,uri)
{
	var params=new StringBuffer();

	//uri check
	if(uri==null || uri.length==0){
		//alert("URL을 설정하세요.\n\nex) open('x','xxx.do')");
		MessageBox("TransURL", "I", "");
		return;
	}
	//g_svcid , g_svctype check
	if(this.g_svcid==null || this.g_svcid.length==0){
		//alert("서비스 아이디를 설정하세요.\n\nex) setSvc('xxxx')");
		MessageBox("TransSvc", "I", "");
		return;
	}

	if(this.g_waityn){
		showwait(this.g_message);
	}
	
	var svcidarr = this.g_svcid.split(",");
	var svctypearr = this.g_svctype.split(",");
	if(svctypearr.length!=svcidarr.length){
		this.g_svctype="";
		for(var i=0;i<svcidarr.length;i++){
			this.g_svctype+="SQLSERVICE";
			if(i+1 != svcidarr.length) this.g_svctype+=",";
		}
	}
	
	//wise가 아닌경우 default 0 셋팅
	if(typeof(this.g_wisegrid)=="undefined"){
		var arr=this.g_svcid.split(",");
		for(var i=0;i<arr.length;i++){
			arr[i]="0";
		}
		this.g_wisegrid=arr.toString();
	}
	
	params.append(encodeURIComponent("_SERVICE_TYPE")+"="+encodeURIComponent(this.g_svctype)+"&"+encodeURIComponent("_SERVICE_ID"));
	params.append("="+encodeURIComponent(this.g_svcid)+"&"+encodeURIComponent("_PAGE_ROW")+"="+encodeURIComponent(this.g_pagerow));
	params.append("&"+encodeURIComponent("_PAGE")+"="+encodeURIComponent(this.g_page)+"&"+encodeURIComponent("_REC_ROW"));
	params.append("="+encodeURIComponent(this.g_recrow)+"&"+encodeURIComponent("_ASYNC")+"="+encodeURIComponent(this.g_async));
	params.append("&"+encodeURIComponent("_START_ROW")+"="+encodeURIComponent(this.g_startrow));
	params.append("&"+encodeURIComponent("_ACTIONPAGE")+"="+encodeURIComponent(uri));
//	params.append("&"+encodeURIComponent("_FORWARD_ID")+"="+encodeURIComponent(this.g_forward_id));
	params.append("&"+encodeURIComponent("_ENC")+"="+encodeURIComponent(this.g_enc));
	params.append("&"+encodeURIComponent("_PAGEINGTYPE")+"="+encodeURIComponent(this.g_wisepagetype));
	params.append("&"+encodeURIComponent("_SAVEAUTOSELECT")+"="+encodeURIComponent(this.g_saveautoselect));
	params.append("&"+encodeURIComponent("_DATASET_MODE")+"="+encodeURIComponent(this.g_dataset_mode));
	
	//for tran log
	params.append("&"+encodeURIComponent("_TRANLOG")+"="+encodeURIComponent(this.g_tranlog));
	try{
		params.append("&"+encodeURIComponent("_USERID")+"="+encodeURIComponent(getUserID()));
		params.append("&"+encodeURIComponent("_CORPCD")+"="+encodeURIComponent(getCorpCD()));
		//params.append("&"+encodeURIComponent("_screenid")+"="+encodeURIComponent(getMenuId()));		//탑메뉴에서 선택한,메인프레임에 열려있는 메뉴IDgetMenuId() (ucare_util.js)
		params.append("&"+encodeURIComponent("_SCREENID")+"="+encodeURIComponent(g_menuid));		//자기자신화면의 메뉴ID
	}catch(e){}

	if (!this.g_pageing && this.g_forward_id) params.append("&"+encodeURIComponent("_FORWARD_ID")+"="+encodeURIComponent(this.g_forward_id));
	if (!this.g_pageing && this.g_forward_page) params.append("&"+encodeURIComponent("_FORWARD_PAGE")+"="+encodeURIComponent(this.g_forward_page));
	if (!this.g_pageing && this.g_exectype) params.append("&"+encodeURIComponent("_EXEC_TYPE")+"="+encodeURIComponent(this.g_exectype));
	if (!this.g_pageing && this.g_viewtype) params.append("&"+encodeURIComponent("_VIEW_TYPE")+"="+encodeURIComponent(this.g_viewtype));
	if (!this.g_pageing && this.g_dsnotf) params.append("&"+encodeURIComponent("_DSNOTF")+"="+encodeURIComponent(this.g_dsnotf));
	if (!this.g_pageing && this.g_defclick) params.append("&"+encodeURIComponent("_DEFCLICK")+"="+encodeURIComponent(this.g_defclick));

	if (!this.g_pageing && !this.g_waityn) params.append("&"+encodeURIComponent("_WAITYN")+"="+encodeURIComponent(this.g_waityn));
	if (!this.g_pageing && this.g_ressvcid) params.append("&"+encodeURIComponent("_RESSVCID")+"="+encodeURIComponent(this.g_ressvcid));
	if (!this.g_pageing && this.g_dissvcid) params.append("&"+encodeURIComponent("_DISSVCID")+"="+encodeURIComponent(this.g_dissvcid));
	if (!this.g_pageing && this.g_pagegroup) params.append("&"+encodeURIComponent("_PAGEGROUP")+"="+encodeURIComponent(this.g_pagegroup));

	if (!this.g_pageing && this.g_wisegrid) params.append("&"+encodeURIComponent("_WISEGRID")+"="+encodeURIComponent(this.g_wisegrid));
	if (!this.g_pageing && this.g_mode) params.append("&"+encodeURIComponent("_MODE")+"="+encodeURIComponent(this.g_mode));
	
	params.append("&" + encodeURIComponent("_ENCODE_ID") + "=" + encodeURIComponent(this.g_encode_id));
	params.append("&" + encodeURIComponent("_DECODE_ID") + "=" + encodeURIComponent(this.g_decode_id));

	if(outformnm != null && outformnm.length>0){
		params.append("&"+encodeURIComponent("_OUTFORMNM")+"="+encodeURIComponent(outformnm));
	}
	//formparam
	if(formnm != null && formnm.length>0){
		params.append("&"+this.formToString(formnm));
	}
	
	if (this.g_wisegrid)
	{
    	var wisegrid=this.g_wisegrid.split(",");
        var wiseparam = "";//"""WISEGRID_DATA=";
        var dissvcidarr;
        
        if  (this.g_dissvcid)
        {
        	dissvcidarr = this.g_dissvcid.split(",");
        }
		var iWsIndex =0;
		for(var i=0;i<wisegrid.length;i++)
		{
		    //if (i>0) wiseparam+="^";
		    if (wisegrid[i] == "" || wisegrid[i] == "0") continue;

		    var obj = document.all[svcidarr[i]];
		    
		    if (dissvcidarr && dissvcidarr[i])
		    {
		    	obj = document.all[dissvcidarr[i]];
		    }
		    if (iWsIndex == 0) wiseparam += "&WISEGRID_DATA=";
		    else               wiseparam += "&WISEGRID_SUB"+iWsIndex+"=";
		    
		    //obj.RemoveAllData();
		    if (this.g_mode == "save") wiseparam += encodeURIComponent(obj.GetGridRawData("CRUD").substring(14));
		    else wiseparam += encodeURIComponent(obj.GetGridRawData().substring(14));
		    iWsIndex++;
        }
    }    

	params.append("&"+wiseparam);
	 if(this.g_userparam != null){
	    var aData = this.g_userparam.split("&");

	    for (var i=0; i < aData.length; i++)
	    {
	        if (aData[i] =="") continue;;
	        var iFind = aData[i].indexOf("=");
	       // params.append("&"+encodeURIComponent(aData[i].substring(0,iFind))+"="+encodeURIComponent(aData[i].substring(iFind+1)));
	        params.append("&"+aData[i].substring(0,iFind)+"="+aData[i].substring(iFind+1));
    	}	
	} 
	
	//params.append("&" + this.g_userparam);
	params.append(this.g_arruserparam);
	
	try
	{
		HASHTRANS.get(this.g_svcid).g_activeObj.abort();
	}
	catch(e)
	{
		//alert(e.message);
	}

	THISTRANS=this;

	
	this.g_activeObj = this.newTrans();
	//callback transaction
	this.g_activeObj.onreadystatechange=this.callBackMethod;

	if (DEBUG == true) window.open(uri+"?"+params, "debug");
	
	//Trans 객체 Hashtable에 저장
	HASHTRANS.put(this.g_svcid, THISTRANS);
	
	this.g_activeObj.open("POST", uri, this.g_async);
	this.g_activeObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
	this.g_activeObj.setRequestHeader('Accept-Charset', 'utf-8');
	this.g_activeObj.setRequestHeader('Ajax', 'true');
	this.g_activeObj.send(params.toString());
}

Trans.prototype.abortRequest = function(request) 
{
    function doNothing() {
    }
//    request.onreadystatechange = doNothing;
 //   request.abort();
 //   delete THISTRANS;
}


/* callBackMethod */
Trans.prototype.callBackMethod = function (svcid)
{
	//서버완료
	if (THISTRANS.g_activeObj.readyState == 4)
	{	
		var bCallback = false;	// callback 함수 호출여부
		//성공
		if(THISTRANS.g_waityn) removewait();

   	  	if(THISTRANS.g_activeObj.status == 200)
   	  	{
   	  		var objXml = THISTRANS.g_activeObj.responseXML;
//   	  		var obj=window.open("/jsp/common/blank.jsp","k","width=300 height=500");
//obj.document.write(THISTRANS.g_activeObj.responseText);
			THISTRANS.g_activeObj = "";
   	  		var error = objXml.getElementsByTagName("error")[0].firstChild.nodeValue;
   	  		if(error == "true"){
   	  			var errorcode = objXml.getElementsByTagName("error-code")[0].firstChild.nodeValue;
   	  			var errorclass = objXml.getElementsByTagName("error-class")[0].firstChild.nodeValue;
   	  			var errortype = objXml.getElementsByTagName("error-type")[0].firstChild.text;
   	  			var errormessage = objXml.getElementsByTagName("error-message")[0].firstChild.text;
				
				var myMsg = "[에러코드] "+errorcode+"\n\n[에러클래스] "+errorclass+ "\n\n[에러유형] "+errortype + "\n\n[에러메세지] "+errormessage;
				MessageBox("TransError", "E", myMsg);
   	  			
				//dataset clear
				var svcidarr=THISTRANS.g_svcid.split(",");
				for (var i=0; i < svcidarr.length; i++ )
				{
					InitUcareData.removeDataSet(svcidarr[i]);
				}
   	  		}

  	  		var $$svcid=THISTRANS.g_svcid;
  	  		var $$dissvcid=THISTRANS.g_svcid;
			if(THISTRANS.g_ressvcid!=null){
				$$svcid=THISTRANS.g_ressvcid;
			}

			if(THISTRANS.g_dissvcid!=null){
				$$dissvcid=THISTRANS.g_dissvcid;
			}

   	  		try{
	   	  		var initds = new InitUcareData();
				initds.setUcareData(objXml);
			}catch(dse){
				alert("+Function[InitUcareData.setUcareData]\n+msg["+dse.message+"]\n+decription["+dse.decription+"]");
			}
			//display view
			var g_tran;			
			try{
				g_tran = THISTRANS.displayView($$svcid, $$dissvcid, THISTRANS.g_page, THISTRANS.g_callback, THISTRANS.g_hasArguments, THISTRANS.g_svcid, THISTRANS.g_defclick);
				
			}catch(e){
				alert("+Function[Trans.displayView]\n+msg["+e.message+"]\n+decription["+e.decription+"]");
			}
			//callback call 사용자콜백(기본 callback 함수호출)
  	  		$$svcid=g_tran.g_svcid;
  	  		$$dissvcid=g_tran.g_svcid;
			if(g_tran.g_ressvcid!=null){
				$$svcid=g_tran.g_ressvcid;
			}

			if(g_tran.g_dissvcid!=null){
				$$dissvcid=g_tran.g_dissvcid;
			}
			try{
				var fun=eval(g_tran.g_checkcallback);
				
				if(typeof(fun)=="function")
				{
					// wisegrid가 아닐 경우에만 callback함수 호출, wisegrid는 HtmlUtil.getWiseGridMan에서 한다.
					// wisegrid가 crud이면서 자동조회가 아닌 경우 callback을 호출해야한다.
					
					var dsArr = g_tran.g_wisegrid.split(',');
					//alert($$svcid + ' : wisegrid -> ' + THISTRANS.g_wisegrid);
//					alert(hasStr(dsArr, "1"));
					if (dsArr != 0 && hasStr(dsArr, "1") == true && dsArr.length == 1 && g_tran.g_callbackFlag == false && g_tran.g_mode != "save")
					{ 
						// wisegrid가 1개인경우 호출 안함. HtmlUtil.getWiseGridMan에서 한다.
						//alert('wisegrid가 1개인경우 호출 안함. HtmlUtil.getWiseGridMan에서 한다.');
					}
					else
					{ 
						if (g_tran.g_hasArguments == true)
						{
							eval(g_tran.g_callback);
						}
						else
						{
							eval(g_tran.g_callback+"('"+$$svcid+"')");
						}
					}
				}

				//g_tran.callDefClick($$svcid.split(',')[0], $$dissvcid.split(',')[0]);

				objXml = null;
			}catch(e){
   	  		//	alert("+Function["+g_callback+"]\n+msg["+e.message+"]\n+decription["+e.decription+"]");
   	  		}
		}else{
			top.status="Server Error : "+THISTRANS.g_activeObj.status+","+THISTRANS.g_activeObj.readyState;
		}
	}

}

Trans.prototype.callDefClick = function(dsnm, disnm)
{
	if (DataSet.isError() == "true")	return;
	
	// 
	HtmlUtil.WiseGridDefClick(dsnm, disnm);
}

/* Form element string */
Trans.prototype.formToString = function (formnm)
{
	var rtnSb=new StringBuffer();
	try{
		var f;
		if(typeof(formnm)=="string") f=document.all(formnm);
		else f=formnm;
		var itag=f.getElementsByTagName("input");
		var stag=f.getElementsByTagName("select");
		var ttag=f.getElementsByTagName("textarea");
		var radiopool=new Hashtable();	//radio name
		var eobj;
		var eobjval;
		var tp;

		//input
		for(var i=0;i<itag.length;i++){
			eobj=itag[i];
			eobjval="";
			tp=eobj.type;

			if(tp=="radio" || tp=="checkbox"){
				if(eobj.checked){
					eobjval=eobj.value;
					if(tp=="radio"){
						radiopool.put(eobj.name,eobjval);
					}else{
						if(rtnSb.toString().length>0) rtnSb.append("&");
						rtnSb.append(encodeURIComponent(eobj.name)+"="+encodeURIComponent(eobjval));
					}
				}
			}else if(tp=="hidden" || tp=="text" || tp=="password"){
				eobjval=eobj.value;
				if(rtnSb.toString().length>0) rtnSb.append("&");
				rtnSb.append(encodeURIComponent(eobj.name)+"="+encodeURIComponent(eobjval));
			}
		}
		//select
		for(var i=0;i<stag.length;i++)
		{
			eobj=stag[i];

			eobjval="";
			tp=eobj.type;

			if (eobj.multiple == true)
			{
				for (var j=0; j < eobj.options.length; j++)
				{
					if (eobj.options[j].selected == true)
						eobjval += (eobjval!=''?'|':'')+eobj.options[j].value;
				}
			}
			else
				eobjval=eobj.value;
			if(rtnSb.toString().length>0) rtnSb.append("&");
			rtnSb.append(encodeURIComponent(eobj.name)+"="+encodeURIComponent(eobjval));
		}
		//textarea
		for(var i=0;i<ttag.length;i++){
			eobj=ttag[i];
			eobjval="";
			tp=eobj.type;

			eobjval=eobj.value;
			if(rtnSb.toString().length>0) rtnSb.append("&");
			rtnSb.append(encodeURIComponent(eobj.name)+"="+encodeURIComponent(eobjval));
		}
		//radio
		var rnmarr=radiopool.getNames();
		for(var i=0;i<rnmarr.length;i++){
			if(rtnSb.toString().length>0) rtnSb.append("&");
			rtnSb.append(encodeURIComponent(rnmarr[i])+"="+encodeURIComponent(radiopool.get(rnmarr[i])));
		}
		return rtnSb.toString();
	}catch(e){
		alert("Trans.formToString: " + e.decription);
		return null;
	}
}

/* display view */
Trans.prototype.displayView = function(dsnm, disdsnm, g_page, g_callback, g_hasArguments, svcid, g_defclick)
{
	var g_tran = THISTRANS;
	if (DataSet.isError() == "true")	return g_tran;
	// CRUD일 경우 svcid 세팅
	if (g_tran.g_mode == "save" && g_tran.g_saveautoselect != "true" && g_tran.g_saveautoselect != true &&  g_tran.g_savedsnm != "")
	{
		dsnm = g_tran.g_savedsnm;
		g_tran.g_svcid = g_tran.g_savedsnm;
		g_tran.g_callbackFlag = true;
	}

	var dsnmarr=dsnm.split(",");
	var disdsnmarr=disdsnm.split(",");
    var gridtypearr ;

    try{
		if (DataSet.getReqParam(dsnmarr[0],"_WISEGRID") != "") gridtypearr=  DataSet.getReqParam(dsnmarr[0],"_WISEGRID").split(",");
	}catch(e){}

	try{
		for(var o=0;o<dsnmarr.length;o++)
		{
			var datasetnm=dsnmarr[o];							//dataset name
			var disdatasetnm=disdsnmarr[o];							//dataset name
			var gridtypeid = "0";
			if (gridtypearr!="" && (gridtypearr.length>o)) 
			{
			    gridtypeid=gridtypearr[o];							//dataset name
			}    

			//#1.returns
			try{
				//화면아이디가 없을 경우
				var viewtype = DataSet.getViewType(datasetnm).toLowerCase();

				if(viewtype == "grid" || viewtype == "free" || viewtype == "tree" )
				{
					//alert(DataSet.getTotalCount(datasetnm))
					//if(DataSet.getTotalCount(datasetnm) > 0) MessageBox("ReadSuccess", "I", "");
					//else MessageBox("ReadZero", "I", "");
				}
				switch (viewtype)
				{
					case "grid":
					    if (gridtypeid == "1")	//wisegrid
					    {
					    	HtmlUtil.getWiseGridMan(datasetnm,disdatasetnm,g_page, g_callback, g_hasArguments, svcid, o, g_defclick);
					    	
					    	if(DataSet.getReqParam(datasetnm,"_SAVEAUTOSELECT")=="true"){
						    	var message=DataSet.getMessage(datasetnm);
								if (message != "")
								{
									 MessageBox(message, "I", "");//alert (message);
								}
								else
								{
									MessageBox("Success", "I", ""); //alert ("처리되었습니다.");
								}
							}
    					}
                        else
                        {
                        	HtmlUtil.getPageMan(datasetnm,disdatasetnm,g_page);
                        	//alert(2);
                        }
						break;
					case "append":
						HtmlUtil.getAppendMan(datasetnm,disdatasetnm,g_page);
						break;
					case "free":
						HtmlUtil.getFreeMan(datasetnm);
						break;
					case "code":
						HtmlUtil.getCodeMan(datasetnm, o);
						break;
					//case "tree":
					//	HtmlUtil.getTreeMan(datasetnm);
					//	break;
					//case "folder":
					//	HtmlUtil.getFolderMan(datasetnm);
					//	break;
					case "none":
						//HtmlUtil.getPageMan(datasetnm,g_page);
						break;
					default:
						if (DataSet.getParam(datasetnm, 1, 0, "SUCCESS_COUNT") > "0")
						{
							var message=DataSet.getMessage(datasetnm);

							if (message != "")
							{
								 MessageBox(message, "I", "");//alert (message);
							}
							else
							{
								MessageBox("Success", "I", ""); //alert ("처리되었습니다.");
							} 
						}
						else if (DataSet.getParam(datasetnm, 1, 0, "SUCCESS_COUNT") == "0")
						{
							MessageBox("Fail", "I", "");
						}

						//save 일때 callback호출(naver fix)
						if (THISTRANS.g_mode=="save"){
							if (THISTRANS.g_hasArguments==true){
								eval(THISTRANS.g_callback);
							}else{
								eval(THISTRANS.g_callback+"('"+datasetnm+"')");
							}
						}
					}
			}catch(e){
			    continue;
			}
		}
	}catch(e){
		alert("+Function[HtmlUtil.getPageMan]\n+msg["+ e.message +"]\n+decription["+ e.decription+"]");
	}

	return g_tran;
		//		HtmlUtil.getPageMan(dsnm,g_page);	//grid
	//HtmlUtil.getFreeMan(dsnm);			//free
	//HtmlUtil.getTreeMan(dsnm);			//tree
	//HtmlUtil.getCodeMan(dsnm);			//code
	//HtmlUtil.getFolderMan(dsnm);		//folder
}
function EndQuery(dissvcid)
{
}
