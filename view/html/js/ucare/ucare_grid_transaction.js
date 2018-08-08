var DEBUG=false;				//debug ���� ����
var THISTRANS;
var HASHTRANS = new Hashtable();	// 2010.02.04

/*** transaction object */
GridTrans = function()
{
	this.g_async=true;				//�񵿱⿩��
	this.g_svctype="SQLSERVICE";	//����Ÿ��(DB or HOST)
	this.g_svcid=null;				//�������̵�
	//this.g_wisegrid="0";            //wisegrid�� ����� �� ����
	this.g_wisegrid;            //wisegrid�� ����� �� ����
	this.g_mode="";
	this.g_page="1";				//����������
	this.g_recrow="";				//rownum����(�б���)DB or Chace
	this.g_pagerow="";				//���������� ȭ����¼�
	this.g_startrow=1;				//����Ʈ���۹�ȣ
	this.g_userparam=null;			//����� parameter
	this.g_arruserparam=null;		//����� parameter Array��
	this.g_activeObj=null;			//xml����Ÿ������Ʈ
	this.g_callback="callback";		//������ݹ�(�⺻ callback)
	this.g_checkcallback="callback";//üũ�� ������ݹ�(�⺻ callback)
	this.g_hasArguments=false;		//������ݹ鿡 arguments�� �ִ��� ���� 
	this.g_forward_id="dsl";		//forword id
	this.g_forward_page=null;		//�������� jsp������
	this.g_enc="EUC-KR";

	this.g_exectype=null;		//����Ÿ��
	this.g_viewtype=null;		//�������

	this.g_ressvcid=null;			//actionó���� ã�� datasetname(�������̵�)
	this.g_waityn=true;				//wait
	this.g_message="ó�����Դϴ�.";	//wait �޼���
	this.g_dsnotf=true;				//data ���� ��� �޼��� ��¿���
	this.g_defclick=false;			//ù��°  row Ŭ������

	this.g_dissvcid=null;			//��� id
	this.g_pageing = false;

	this.g_pagegroup = 10;			//pageing�� ǥ�õ� ����
	this.g_wisepagetype="N";		//pageing type (N:NEXTMODE P:PAGEING)
	this.g_tranlog="N";				//Trans log YN
	this.g_saveautoselect="false";	//save ���� ó���� �ڵ� ��ȸ ����
	this.g_savedsnm="";				//save ���� �ݹ��� ���� DataSet ID

	this.g_dataset_mode="U";
}

/* ����� �ݹ� */
GridTrans.prototype.setCallBack = function(callback)
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

/* ���� ,�񵿱� */
GridTrans.prototype.setAsync = function (asyncyn)
{
	this.g_async = asyncyn;
}

/* ���������� �� */
GridTrans.prototype.setPage = function (page)
{
	this.g_page = page;
}

/* rownum���� (�б���) */
GridTrans.prototype.setRecRow = function (recrow)
{
	this.g_recrow = recrow;
}

/* ���� ���� �� */
GridTrans.prototype.setSvc = function(svc)
{
	this.g_svcid = svc;
}

/* ���� Ÿ�� default(SQLSERVICE) */
GridTrans.prototype.setSvcType = function(svct)
{
	this.g_svctype = svct;
}

/* WiseGrid���� default(SQLSERVICE) */
GridTrans.prototype.setWiseGrid = function(wisegrid)
{
	this.g_wisegrid = wisegrid;
}

/* WiseGrid���� default(SQLSERVICE) */
GridTrans.prototype.setMode = function(mode)
{
	this.g_mode = mode;
}

/* pagerow */
GridTrans.prototype.setPageRow = function (pg)
{
	this.g_pagerow = pg;
}

/* ����� parameter */
GridTrans.prototype.setUserParams = function(param)
{
	this.g_userparam = param;
}

/* ����� parameter (����) */
GridTrans.prototype.setMyUserParams = function(key, value)
{
	var gridId = this.getGridId();
	var objGrid = document.all[gridId];
	objGrid.SetParam(key	,value);
//	this.g_arruserparam += "&" + key + "=" + encodeURIComponent(value);
}

/* ����� parameter (Array��) */
GridTrans.prototype.setArrUserParams = function(keyArr, valArr)
{
	var gridId = this.getGridId();
	var objGrid = document.all[gridId];
	if (keyArr && valArr)
	{
		var params = "";
		
		for (var i=0; i<keyArr.length; i++)
		{
			objGrid.SetParam(keyArr[i]	,valArr[i]);
		}
		
		this.g_arruserparam = params;
	}
}

/* ����Ʈ���۹�ȣ */
GridTrans.prototype.setStartRow = function(startnum)
{
	this.g_startrow = startnum;
}

/* forwardid */
GridTrans.prototype.setForwardId = function(forwardid, forwardpage)
{
	this.g_forward_id = forwardid;
	this.g_forward_page = forwardpage;
}

/* ���� Ÿ�� */
GridTrans.prototype.setExecType = function(exectype)
{
	this.g_exectype = exectype;
}

/* display Ÿ�� */
GridTrans.prototype.setViewType = function(viewtype)
{
	this.g_viewtype = viewtype;
}

//actionó���� ����Ǵ� datasetname(�������̵�) ����(2007.07.14)
GridTrans.prototype.setResSvc=function (ressvcid){
	this.g_ressvcid=ressvcid;
}

//��ٸ�â���� (2007.07.27)
GridTrans.prototype.setWait=function(tf, msg){
	this.g_waityn=tf;
	this.g_message=HtmlUtil.decode(msg,undefined,"ó�����Դϴ�...", msg);

}

//Data not Found ���� (2007.08.07)
GridTrans.prototype.setDsNotF=function(tf){
	this.g_dsnotf=tf;
}

//ù��° row click  (2008.01.15)
GridTrans.prototype.setDefClick=function(tf){
	this.g_defclick=tf;
}

//����� disp id  (2008.02.01)
GridTrans.prototype.setDisSvc=function(tf){
	this.g_dissvcid=tf;
}

//pageing ����  (2008.02.13)
GridTrans.prototype.setPageing=function(tf){
	this.g_pageing=tf;
}

//pageing�� count ���� ����  (2008.02.13)
GridTrans.prototype.setPageGroup=function(tf){
	this.g_pagegroup=tf;
}

//wise grid pageing mode
GridTrans.prototype.setWisePageType=function(t){
	this.g_wisepagetype=t;
}

//trnas log
GridTrans.prototype.setTranLog=function(t){
	this.g_tranlog=t;
}

//save ���� ó���� �ڵ� ��ȸ ����
GridTrans.prototype.setSaveAutoSelect=function(t){
	this.g_saveautoselect=t;
}

//save ���� ó���� �ݹ鿡�� ���� DataSet ID�� ����
GridTrans.prototype.setSaveDataSetId=function(dsnm){
	if (this.g_saveautoselect == "true" || this.g_saveautoselect == true)
	{
		MessageBox("TransNoAutoMode", "E", "");
	}
	else
	{
		this.g_savedsnm=dsnm;
	}
}


// datasetmode ����
GridTrans.prototype.setDataSetMode=function(paramId) {
	this.g_dataset_mode = paramId;
}


//trnas log
GridTrans.prototype.getGridId=function(){
	var arr = new Array();
	var gridId;
	var svcidarr = this.g_svcid.split(",");
	if(typeof(this.g_wisegrid)=="undefined"){
		for(var i=0;i<svcidarr.length;i++){
			arr[i]="1";
		}
		this.g_wisegrid=arr.toString();
	}

	if (this.g_dissvcid==null || this.g_dissvcid.length==0)	this.g_dissvcid = this.g_svcid;
	var dissvcidarr = this.g_dissvcid.split(",");
	var wisegridarr = this.g_wisegrid.split(",");
	if (wisegridarr.length)
	{
		for(var i=0;i<wisegridarr.length;i++)
		{
			if (wisegridarr[i] == "1") 
			{
				gridId = dissvcidarr[i];
				break;
			}	
		}
	}
	else 	gridId = this.g_dissvcid;
	
	return gridId;
}

/* grid (open) */
GridTrans.prototype.open = function (formnm,outformnm,uri)
{
	//g_svcid , g_svctype check
	if(this.g_svcid==null || this.g_svcid.length==0){
		//alert("���� ���̵� �����ϼ���.\n\nex) setSvc('xxxx')");
		MessageBox("TransSvc", "I", "");
		return;
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

	//wise�� �ƴѰ�� default 0 ����
	var arr = new Array();
	var gridId;
	if(typeof(this.g_wisegrid)=="undefined"){
		for(var i=0;i<svcidarr.length;i++){
			arr[i]="1";
		}
		this.g_wisegrid=arr.toString();
	}


	if (this.g_dissvcid==null || this.g_dissvcid.length==0)	this.g_dissvcid = this.g_svcid;
	var dissvcidarr = this.g_dissvcid.split(",");
	var wisegridarr = this.g_wisegrid.split(",");

	var gridId = this.getGridId();
	var objGrid = document.all[gridId];

	if (objGrid == null)
	{
		MessageBox("TransSvc", "I", "");
		return;
	}

	objGrid.SetParam("_SERVICE_TYPE",this.g_svctype);
	objGrid.SetParam("_SERVICE_ID"  ,this.g_svcid);
	objGrid.SetParam("_PAGE_ROW"	,this.g_pagerow);
	objGrid.SetParam("_START_ROW"	,this.g_startrow);
	objGrid.SetParam("_SAVEAUTOSELECT",this.g_saveautoselect);
	objGrid.SetParam("_TRANLOG"		,this.g_tranlog);
	objGrid.SetParam("_WISEGRID"	,this.g_wisegrid);
	objGrid.SetParam("_DATASET_MODE",this.g_dataset_mode);
	var gridIndex=0;
	for(var i=0;i<wisegridarr.length;i++)
	{
		if (wisegridarr[i] == "1" ) 
		{
			if (gridIndex > 0)	
			{
				objGrid.AddGridRawData("WISEGRID_SUB"+(gridIndex),document.all[dissvcidarr[i]].GetGridRawData());
			}	
			gridIndex ++;	
		}	
	}

	try{
		objGrid.SetParam("_USERID",getUserID());
		objGrid.SetParam("_SCREENID",g_menuid);
	}catch(e){}
/*
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

	if (!this.g_pageing && this.g_wisegrid) params.append("&"+encodeURIComponent("_WISEGRID")+"="+encodeURIComponent(this.g_wisegrid));*/
//	if (!this.g_pageing && this.g_mode) params.append("&"+encodeURIComponent("_MODE")+"="+encodeURIComponent(this.g_mode));

	objGrid.SetParam("_MODE"	,this.g_mode);
	objGrid.SetParam("_TRANLOG"	,this.g_tranlog);
	objGrid.SetParam("_PAGEINGTYPE",encodeURIComponent(this.g_wisepagetype));

	//formparam
	if(formnm != null && formnm.length>0){
		this.setForm(formnm, objGrid);
	}


	if(this.g_userparam != null)
	{
		this.g_userparam = replaceStr(this.g_userparam,"&nbsp;", " ");
		this.g_userparam = replaceStr(this.g_userparam,"&gt;", ">");
		this.g_userparam = replaceStr(this.g_userparam,"&lt;", ">");
		
		var aData = this.g_userparam.split("&");

		var p_name		= "";
		var p_value		= "";
		var p_flag		= false;	//�ɷ� ���� �Ķ����� ����

		for (var i=0; i < aData.length; i++)
		{
			if (aData[i] =="") continue;;
	        var iFind = aData[i].indexOf("=");
			objGrid.SetParam(aData[i].substring(0,iFind)	,aData[i].substring(iFind+1));
		} 
	}

/*	if(this.g_waityn){
		showwait(this.g_message);
	}*/
	objGrid.SetParam("_FORWARD_ID", "wgwrite");
	var sPagingParam  = "pagingParam( '"+this.g_svcid+"','" + this.g_dissvcid +"')"
	var sCallback = "";
	var sDefClick = "";
	var sSummary = "setSumaryBar('"+this.g_dissvcid+"')"
	var sCallBackMethod = "callBackMethod('"+gridId+"', '"+this.g_svcid+"')"

	var fun=eval(this.g_checkcallback);
			
	if(typeof(fun)=="function")
		sCallback = this.g_checkcallback+"('"+this.g_svcid+"')";
	if (this.g_defclick == true)
	{
		fun=eval("showDetailO_obj");
		if(typeof(fun)=="function")
			sDefClick = "if (document.all['"+this.g_dissvcid+"'].GetRowCount()>0 )  showDetailO_obj('"+this.g_dissvcid+"', '', document.all['"+this.g_dissvcid+"'].GetActiveRowIndex()  )";
	}
			
	THISTRANS=this;
	if (g_attachEvent.get(this.g_dissvcid) == false) 
	{
		objGrid.attachEvent("EndQuery", function EndQuery() { 	   	 eval(sCallBackMethod) 		});
/*		objGrid.attachEvent("EndQuery", function EndQuery() { eval(sPagingParam) } );
		if (htGridOpt.get(this.g_dissvcid)) objGrid.attachEvent("EndQuery", function EndQuery() { eval(sSummary) } );
		if (sCallback != "")				objGrid.attachEvent("EndQuery", function EndQuery() { eval(sCallback) } );
		if (sDefClick != "") 				objGrid.attachEvent("EndQuery", function EndQuery() { eval(sDefClick) } );*/
		g_attachEvent.put(this.g_dissvcid, true);
	}	
	if (this.g_mode == "save")
		objGrid.DoQuery(uri, "CRUD");
	else
		objGrid.DoQuery(uri);

}


/* callBackMethod */
function callBackMethod (gridId, svcid)
{
	var obj = document.all[gridId];
	var gridIndex = 0;
	var dissvcidarr = THISTRANS.g_dissvcid.split(",");
	var wisegridarr = THISTRANS.g_wisegrid.split(",");
	var fun=eval(THISTRANS.g_checkcallback);

	for(var i=0;i<wisegridarr.length;i++)
	{
		if (wisegridarr[i] == "1" ) 
		{
//			pagingParam( svcid,gridId);
			if (gridIndex > 0)	
			{
				document.all[dissvcidarr[i]].SetGridRawData(obj.GetRecvRawData("WISEGRID_SUB"+(gridIndex)),true);
			}	
			if (htGridOpt.get(THISTRANS.g_dissvcid)) setSumaryBar(THISTRANS.g_dissvcid);
			if (THISTRANS.g_defclick == true)
			{
				fun=eval("showDetailO_obj");
				if(typeof(fun)=="function")
					if (obj.GetRowCount()>0 )  showDetailO_obj(dissvcidarr[i] , '', document.all[dissvcidarr[i]].GetActiveRowIndex()  );
			}
			gridIndex ++;	
		}	
		else
		{
			var datasetnm = dissvcidarr[i];
			var sXml = "<datasets><params></params>"+obj.GetParam(datasetnm)+"</datasets>";
			var objXml = new ActiveXObject('Microsoft.XMLDOM');
      		objXml.async = false;
      		objXml.loadXML(sXml);
   	  		var initds = new InitUcareData();
			initds.setUcareData(objXml);
			
			var viewtype = DataSet.getViewType(datasetnm).toLowerCase();

			switch (viewtype)
			{
				case "free":
					HtmlUtil.getFreeMan(datasetnm);
					break;
				case "code":
					HtmlUtil.getCodeMan(datasetnm, o);
					break;
				case "none":
					//HtmlUtil.getPageMan(datasetnm,g_page);
					break;
				default:
					if (DataSet.getParam(datasetnm, 1, 0, "SUCCESS_COUNT") > 0)
					{
						var message=DataSet.getMessage(datasetnm);

						if (message != "")
						{
							 MessageBox(message, "I", "");//alert (message);
						}
						else
						{
							MessageBox("Success", "I", ""); //alert ("ó���Ǿ����ϴ�.");
						} 
					}
					else if (DataSet.getParam(datasetnm, 1, 0, "SUCCESS_COUNT") == 0)
					{
						MessageBox("Fail", "I", "");
					}
			}
		}
	}

	if(typeof(fun)=="function")
	{
		sCallback = THISTRANS.g_checkcallback+"('"+THISTRANS.g_svcid+"')";
		eval(sCallback);
	}
	
}

GridTrans.prototype.callDefClick = function(dsnm, disnm)
{
	if (DataSet.isError() == "true")	return;
	
	// 
	HtmlUtil.WiseGridDefClick(dsnm, disnm);
}

/* Form element string */
GridTrans.prototype.setForm = function (formnm, oGrid)
{
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
						oGrid.SetParam(eobj.name,eobjval);
					}
				}
			}else if(tp=="hidden" || tp=="text" || tp=="password"){
				eobjval=eobj.value;
				oGrid.SetParam(eobj.name,eobjval);
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
			
			oGrid.SetParam(eobj.name,eobjval);
		}
		//textarea
		for(var i=0;i<ttag.length;i++){
			eobj=ttag[i];
			eobjval="";
			tp=eobj.type;

			eobjval=eobj.value;
			oGrid.SetParam(eobj.name,eobjval);
		}
		//radio
		var rnmarr=radiopool.getNames();
		for(var i=0;i<rnmarr.length;i++){
			
			oGrid.SetParam(rnmarr[i],radiopool.get(rnmarr[i]));
		}
	}catch(e){
		alert("Trans.setForm: " + e.decription);
	}
}

/* display view */
GridTrans.prototype.displayView = function(dsnm, disdsnm, g_page, g_callback, g_hasArguments, svcid)
{
	var g_tran = THISTRANS;
	if (DataSet.isError() == "true")	return;
	
	// 
	var dsnmarr=dsnm.split(",");
	var disdsnmarr=disdsnm.split(",");
    var gridtypearr ;
    if (DataSet.getReqParam(dsnmarr[0],"_WISEGRID") != "") gridtypearr=  DataSet.getReqParam(dsnmarr[0],"_WISEGRID").split(",");

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
				//ȭ����̵� ���� ���
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
					    if (gridtypeid == "1")
					    {
    						HtmlUtil.getWiseGridMan(datasetnm,disdatasetnm,g_page, g_callback, g_hasArguments, svcid, o);
    					}
                        else
                        {
                        	HtmlUtil.getPageMan(datasetnm,disdatasetnm,g_page);
                        	//alert(2);
                        }
						break;
					case "append":
						HtmlUtil.getAppendMan(datasetnm,disdatasetnm,g_page);
					case "free":
						HtmlUtil.getFreeMan(datasetnm);
						break;
					case "tree":
						HtmlUtil.getTreeMan(datasetnm);
						break;
					case "code":
						HtmlUtil.getCodeMan(datasetnm, o);
						break;
					case "folder":
						HtmlUtil.getFolderMan(datasetnm);
						break;
					case "simple":
						HtmlUtil.getSimpleMan(datasetnm,disdatasetnm,g_page);
						break;
					case "none":
						//HtmlUtil.getPageMan(datasetnm,g_page);
						break;
					default:
						if (DataSet.getParam(datasetnm, 1, 0, "SUCCESS_COUNT") > 0)
						{
							var message=DataSet.getMessage(datasetnm);
							if (message != "")
							{
								 MessageBox(message, "I", "");//alert (message);
							}
							else
							{
								MessageBox("Success", "I", ""); //alert ("ó���Ǿ����ϴ�.");
							} 
						}
						/*
						//save �϶� callbackȣ��(naver fix)
						if(DataSet.getReqParam(datasetnm,"_MODE")=="save"){
							if (THISTRANS.g_hasArguments==true){
								eval(THISTRANS.g_callback);
							}else{
								eval(THISTRANS.g_callback+"('"+datasetnm+"')");
							}
						}*/
				}
			}catch(e){
			    continue;}
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