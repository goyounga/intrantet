/*** HtmlUtil Object */
myDocument = document;
HtmlUtil = function () 
{
	//페이지단위 화면 그리기
	this.getPageMan=HtmlUtil.getPageMan;
}

/* parameter 로 넘어온 page 부분만 스캔 objnm-'datasetnm' */
HtmlUtil.getPageMan = function (datasetnm, dispdatasetnm,pagenum)
{
    var obj;
    var objLeft; 
    obj = myDocument.getElementById(dispdatasetnm);
    objLeft = myDocument.all[dispdatasetnm+"_left"];
    var xmlobj=DataSet.getUcareData(datasetnm);			//dataset obj
    var pagemanid=dispdatasetnm+"_PAGEMAN";
    var arr;
    var pageobj;
    var pagehtml="";
    var totalcount=DataSet.getTotalCount(datasetnm);				//쿼리한총갯수
    var pagelength	= DataSet.getRowCount(datasetnm);	//레코드갯수
    try{
    	pageobj = myDocument.getElementById(pagemanid);
    }catch(e){}
    //no data continue
    
    if (myDocument.getElementById("div"+dispdatasetnm+"_msg")) 
    	var dObj = myDocument.getElementById("div"+dispdatasetnm+"_msg").removeNode(true);
    
    if(totalcount<=0)
    {
    	if (obj) HtmlUtil.clearTable(dispdatasetnm);		//table clear
		//원래 개수로 돌리기...
	    if(obj.defaultRow > obj.rows.length)
	    {
	    	var rowplus=obj.defaultRow-obj.rows.length;
	    	HtmlUtil.addTableRow(obj,rowplus, obj.rowSize);	//table tr tag clone
	    	if (objLeft) HtmlUtil.addTableRow(objLeft,rowplus, obj.rowSize);	//table tr tag clone
	    }else{
	    	var rowminus=obj.rows.length-obj.defaultRow;
	    	if(rowminus>0)
	    	{
	    		HtmlUtil.removeTableRow(obj,rowminus, obj.rowSize);
		    	if (objLeft) HtmlUtil.removeTableRow(objLeft,rowminus, obj.rowSize);	//table tr tag clone
	    	}	
	    }
		if(DataSet.getReqParam(datasetnm,"_DSNOTF")=="true")
		{
			if(myDocument.getElementById("span"+dispdatasetnm+"_title"))
			{
				var divobj  = myDocument.all["span"+dispdatasetnm];
				//titleobj.style.position="absolute";
				/* 2009-04-19 : LIG 화면 디자인 공통을 위해 제거   
				var myObj = myDocument.createElement("DIV");     
				divobj.appendChild(myObj);          
				myObj.id        = "div"+dispdatasetnm+"_msg";
				myObj.innerText = "☞ 조회된 데이타가 없습니다.";
				myObj.className = "BOLD";
				myObj.style.position="absolute";
				myObj.style.top=10;

				myObj.style.left=parseInt(divobj.offsetWidth, 10)/2-myObj.offsetWidth/2;
				//titleobj.style.position="static";
				*/
			}
		}
    	if(pageobj!=null) pageobj.innerHTML="";	//pageman clear
		return;
    }
    var totalpage=DataSet.getQueryTotalPage(datasetnm);		//쿼리한총페이지수
    var xmlfirstpage=DataSet.getXmlFirstPage(datasetnm);	//현재 dataset의 첫번째페이지 번호
    var xmllastpage=DataSet.getXmlLastPage(datasetnm);		//현재 dataset의 마지막페이지 번호
    var pagerow=parseInt(DataSet.getPageRow(datasetnm), 10);
    /*#3.분기점(현재페이지(pagenum)가 실제 데이타 페이지보다 크거나 작으면 이전,이후의데이타를 가져온다.
     *마지막페이지가 번호가 같은경우 데이타가 pagerow 보다 작고 totalcount 보다작으면 데이타를 가져온다.
     */
    if(parseInt(pagenum, 10)>=parseInt(xmllastpage, 10) 
    	|| parseInt(pagenum, 10)<parseInt(xmlfirstpage, 10)){
    		var tranyn=false;
    		if(parseInt(pagenum, 10)==parseInt(xmllastpage, 10)){
    			//데이타는 있으나 보여줘야할 갯수(pagerow) 보다 작고 가져올수 있는 데이타가 더 있을경우.
    			if(pagenum>1&&(pagelength<pagerow)&&(pagerow<=(totalcount-(pagenum*pagerow)))) tranyn=true;
    		}else tranyn=true;
    		if(tranyn){
    			var recindex=HtmlUtil.getRecRowIndex(datasetnm,pagenum);
    			var stnum=((recindex-1)*DataSet.getPageRow(datasetnm))+1;
    			var tran = new Trans();
    			tran.setAsync(DataSet.getAsync(datasetnm));
    			tran.setPage(recindex);
    			tran.setStartRow(stnum);
    			tran.setRecRow(DataSet.getRecRow(datasetnm));
    			tran.setPageRow(DataSet.getPageRow(datasetnm));
    			tran.setSvc(datasetnm);
    			tran.setDataSetMode(DataSet.getDsAttribute(datasetnm,"datasetmode"));
    			tran.setUserParams(DataSet.getReqParamString(datasetnm)+"&_VIEWPAGE="+pagenum);
    			tran.setPageing(true);
    			if (DataSet.getReqParam(datasetnm,"_WAITYN")=="false")
    				tran.setWait(false);
    			if (DataSet.getReqParam(datasetnm,"_RESSVCID"))
    				tran.setResSvc(DataSet.getReqParam(datasetnm,"_RESSVCID"));
    			if (DataSet.getReqParam(datasetnm,"_DISSVCID"))
    				tran.setDisSvc(DataSet.getReqParam(datasetnm,"_DISSVCID"));
    			//else tran.setWait(true);
    			tran.open("","",DataSet.getActionPage(datasetnm));
    			return;
    		}
    }

	if (obj == null) return;
    var viewpage=DataSet.getReqParam(datasetnm,"_VIEWPAGE");//볼페이지
    var curpagenum=parseInt(pagenum, 10);						//현재페이지
    if(viewpage.length>0){
    	curpagenum=parseInt(viewpage, 10);
    	DataSet.removeReqParam(datasetnm,"_VIEWPAGE");		//view param remove
    }
    var pagenm="page-"+curpagenum;							//page number create
    
    //2007.04.11 cell clear -> 2008.10.10 ?§?¡ ???¿ clear?? ?? º¹???? ¼? ????·? ??´?.
    if (obj) HtmlUtil.clearTable(dispdatasetnm);		//table clear
    if(pageobj!=null) pageobj.innerHTML="";	//pageman clear
    
    //#4.table row create or remove
    var rowsize = 1;
    if (obj.rowSize) rowsize = obj.rowSize;
    var rowCount = obj.rows.length/rowsize;
    var dsRowCount = DataSet.getRowCount(datasetnm);

    if(rowCount<dsRowCount){
    	var rowplus=dsRowCount-rowCount;
    	HtmlUtil.addTableRow(obj,rowplus, rowsize);	//table tr tag clone
    	if (objLeft) HtmlUtil.addTableRow(objLeft,rowplus, rowsize);	//table tr tag clone
    }else{
    	var rowminus=rowCount-dsRowCount;
    	if(rowminus>0)
    	{
    		HtmlUtil.removeTableRow(obj,rowminus, rowsize);
    		if (objLeft) HtmlUtil.removeTableRow(objLeft,rowminus, rowsize);
    	}	
    }
    
    //#5.table data insert(data loop)
    if(obj.rows.length > 1) arr=true;
    else arr=false;
    
    var objRs = DataSet.getParamArrHash(datasetnm,curpagenum);//dsroot[0];	//page

    var colArray = Array();
    
    var objTbl = myDocument.all[dispdatasetnm];
    for(var i=0;i<objRs.length;i++)		//recordset
    {
    	var objNode = objRs[i];				//recordset

    	var m =1;									// TODO : 왜 추가했는지 기억이 나지 않음. 아마 sort와 관련이 있는 거 같다.
    	var rowSize = objTbl.rowSize;
    	var iRow = i*rowSize;
    	
    	var ojno;
    	if (objLeft)
    	{
    		ojno = objLeft.rows[iRow].cells[0];
    	}
    	else
    	{
    		ojno = objTbl.rows[iRow].cells[1];
    	}
    	objTbl.rows[iRow].cells[0].innerText=i;	//IDX
    	if (ojno.id == dispdatasetnm+"_"+"NO")
    	{
    		ojno.innerText = ((pagenum-1)*pagerow)+(i+1);
    		m++;
    	}

    	for (var n=0; n < rowSize; n++)
    	{
    		var iRow = (i*rowSize)+n;
    		if (objLeft)
    		{
    			for (var k=0; k < objLeft.rows[iRow].cells.length; k++)
    			{
    				setTdData(objRs, i, objLeft.rows[iRow].cells[k]);
    			}
    		}
    		for (var k=0; k < objTbl.rows[iRow].cells.length; k++)
    		{
    			setTdData(objRs, i, objTbl.rows[iRow].cells[k]);
    		}	
    	}
    }
    //scrollbar top
    myDocument.all["span"+dispdatasetnm].scrollTop="top";
    //#6.paging
    if(pageobj != null)
    {
    	var pagegroup = DataSet.getReqParam(datasetnm,"_PAGEGROUP");//페이지그룹단위
    	if (!pagegroup) pagegroup=10;					//페이지그룹단위
    	else pagegroup = parseInt(pagegroup, 10);

    	var startnum=parseInt((curpagenum-1)/pagegroup)+1;	//시작페이지
    	if((startnum*pagegroup)>pagegroup) 
    		startnum=(startnum*pagegroup+1)-pagegroup;
    	var endnum=startnum+pagegroup;					//끝페이지
    	if (endnum>totalpage) endnum = totalpage+1;

    	pagehtml += " <a href=javascript:HtmlUtil.getPageMan('"+datasetnm+"','"+dispdatasetnm+"','"+1+"');><span class=pageprev0></span></a>";
    	pagehtml += " <a href=javascript:HtmlUtil.getPageMan('"+datasetnm+"','"+dispdatasetnm+"','"+(curpagenum<2?1:curpagenum-1)+"');><span class=pageprev></span></a> ";
    	pagehtml += "|&nbsp;&nbsp;";
    	for(var i=startnum;i<endnum;i++){
    		var pn = i;
    		if (curpagenum == pn)
    			pagehtml += "<font color='#FF6633'><b>"+pn+"</b></font>";
    		else
    			pagehtml += "<a href=javascript:HtmlUtil.getPageMan('"+datasetnm+"','"+dispdatasetnm+"','"+pn+"');>"+pn+"</a>";
    		pagehtml += "&nbsp;&nbsp;|&nbsp;&nbsp;";
    	}
    	pagehtml += " <a href=javascript:HtmlUtil.getPageMan('"+datasetnm+"','"+dispdatasetnm+"','"+(totalpage<=curpagenum?curpagenum:curpagenum+1)+"');><span class=pagenext></span></a>";
    	pagehtml += " <a href=javascript:HtmlUtil.getPageMan('"+datasetnm+"','"+dispdatasetnm+"','"+totalpage+"');><span class=pagenext0></span></a>";
    /*	if ((startnum+pagegroup)<(totalpage+1))
    		pagehtml +="<a href=javascript:HtmlUtil.getPageMan('"+datasetnm+"','"+(endnum)+"');> 다음▶</a>";*/
    	pageobj.innerHTML = pagehtml+"<!-- ["+curpagenum+"/"+totalpage+"]-->";
    }
    
    //현재페이지 set
    DataSet.setAttribute(datasetnm,"curpage",curpagenum);
    
	if(DataSet.getReqParam(datasetnm,"_DEFCLICK")=="true")
	{
		mrowSelect_obj(obj.rows(0));
		var fun=eval("showDetail_obj");
		if(typeof(fun)=="function")
			showDetail_obj(obj.rows(0));
	}
}

HtmlUtil.getAppendMan = function (datasetnm, dispdatasetnm, pagenum)
{
    var obj 	= myDocument.getElementById(dispdatasetnm);	// table obj
    var objLeft = myDocument.all[dispdatasetnm+"_left"];	// left table obj 
    var xmlobj 	= DataSet.getUcareData(datasetnm);			// dataset obj
    var arr;
    var totalcount	= DataSet.getTotalCount(datasetnm);					//쿼리한총갯수
    var pagelength	= DataSet.getRowCount(datasetnm);	//레코드갯수
   
    // 조회된 값 없다는 메시지 출력 div 제거
    if (myDocument.getElementById("div"+dispdatasetnm+"_msg")) 
    	var dObj = myDocument.getElementById("div"+dispdatasetnm+"_msg").removeNode(true);
    
    // 조회된 값 없음
    if (totalcount <= 0)
    {
    	// 우선 보류
    }
    
    var totalpage 	 = DataSet.getQueryTotalPage(datasetnm);	// 쿼리한총페이지수
    var xmlfirstpage = DataSet.getXmlFirstPage(datasetnm);		// 현재 dataset의 첫번째페이지 번호
    var xmllastpage  = DataSet.getXmlLastPage(datasetnm);		// 현재 dataset의 마지막페이지 번호
    var pagerow		 = parseInt(DataSet.getPageRow(datasetnm, 10));
    
    /*#3.분기점(현재페이지(pagenum)가 실제 데이타 페이지보다 크거나 작으면 이전,이후의데이타를 가져온다.
     *마지막페이지가 번호가 같은경우 데이타가 pagerow 보다 작고 totalcount 보다작으면 데이타를 가져온다.
     */
    if (   parseInt(pagenum, 10) >= parseInt(xmllastpage, 10) 
    	|| parseInt(pagenum, 10) < parseInt(xmlfirstpage, 10))
    {
		var tranyn = false;
		if ( parseInt(pagenum, 10) == parseInt(xmllastpage, 10)) {
			// 데이타는 있으나 보여줘야할 갯수(pagerow) 보다 작고 가져올수 있는 데이타가 더 있을경우.
			if( pagenum>1 && (pagelength<pagerow) && (pagerow<=(totalcount-(pagenum*pagerow))) ) tranyn = true;
		}
		else tranyn = true;
		
		if (tranyn) 
		{
			var recindex = HtmlUtil.getRecRowIndex(datasetnm, pagenum);
			var stnum = ((recindex-1)*DataSet.getPageRow(datasetnm)) + 1;
			
			var tran = new Trans();
			tran.setAsync(DataSet.getAsync(datasetnm));
			tran.setPage(recindex);
			tran.setStartRow(stnum);
			tran.setRecRow(DataSet.getRecRow(datasetnm));
			tran.setPageRow(DataSet.getPageRow(datasetnm));
			tran.setSvc(datasetnm);
			tran.setDataSetMode(DataSet.getDsAttribute(datasetnm,"datasetmode"));
			tran.setUserParams(DataSet.getReqParamString(datasetnm)+"&_VIEWPAGE="+pagenum);
			tran.setPageing(true);
			if (DataSet.getReqParam(datasetnm,"_WAITYN")=="false")
				tran.setWait(false);
			if (DataSet.getReqParam(datasetnm,"_RESSVCID"))
				tran.setResSvc(DataSet.getReqParam(datasetnm,"_RESSVCID"));
			if (DataSet.getReqParam(datasetnm,"_DISSVCID"))
				tran.setDisSvc(DataSet.getReqParam(datasetnm,"_DISSVCID"));
			//else tran.setWait(true);
			tran.open("","",DataSet.getActionPage(datasetnm));
			return;
		}
    }
    
	if (obj == null) return;
    var viewpage 	= DataSet.getReqParam(datasetnm,"_VIEWPAGE");	// 볼페이지
    var curpagenum 	= parseInt(pagenum, 10);						// 현재페이지
    
    if ( viewpage.length > 0)
    {
    	curpagenum = parseInt(viewpage, 10);
    	DataSet.removeReqParam(datasetnm, "_VIEWPAGE");		//view param remove
    }
     
    var pagenm = "page-"+curpagenum;						//page number create
        
    //#4.table row create
    var beforeRowSize = obj.rows.length;   
    var rowsize = 1;
    if (obj.rowSize) rowsize = obj.rowSize;
    
    //var rowCount = obj.rows.length / rowsize;
	var rowplus  = pagelength;
	
	if (objLeft)	
		HtmlUtil.addTableRow(objLeft, rowplus, rowsize);	//table tr tag clone
    HtmlUtil.addTableRow(obj, rowplus, rowsize);	//table tr tag clone
    
    if (obj) HtmlUtil.clearTable(dispdatasetnm, beforeRowSize);		//table clear
   	
	/*    
    if ( rowCount < dsroot[0].childNodes.length )
    {
    	var rowplus = dsroot[0].childNodes.length - rowCount;
    	HtmlUtil.addTableRow(obj, rowplus, rowsize);	//table tr tag clone
    	
    	if (objLeft) HtmlUtil.addTableRow(objLeft, rowplus, rowsize);	// table tr tag clone
    }
    else
    {
    	var rowminus = rowCount-dsroot[0].childNodes.length;
    	if(rowminus>0)
    	{
    		HtmlUtil.removeTableRow(obj,rowminus, rowsize);
    		if (objLeft) HtmlUtil.removeTableRow(objLeft,rowminus, rowsize);
    	}	
    }
    */
    
    //#5.table data insert(data loop)
    if (obj.rows.length > 1) arr = true;
    else 					 arr = false;
    
    var objRs = DataSet.getParamArrHash(datasetnm,curpagenum);//dsroot[0];	//page
    var colArray = Array();
    var objTbl = myDocument.all[dispdatasetnm];
    
    for (var i=0; i<objRs.length; i++)		//recordset
    {
    	var objNode = objRs[i];				//recordset
    	var m = 1;										// TODO : 왜 추가했는지 기억이 나지 않음. 아마 sort와 관련이 있는 거 같다.
    	var rowSize = objTbl.rowSize;
    	var iRow = beforeRowSize + (i*rowSize);
    	
    	var ojno;
    	if (objLeft)
    	{
    		ojno = objLeft.rows[iRow].cells[0];
    	}
    	else
    	{
    		ojno = objTbl.rows[iRow].cells[1];
    	}
    	
    	objTbl.rows[iRow].cells[0].innerText =  i;	//IDX
    	
    	if (ojno.id == dispdatasetnm+"_"+"NO")
    	{
    		ojno.innerText = ((pagenum-1)*pagerow)+(i+1);
    		m++;
    	}

    	for (var n=0; n < rowSize; n++)
    	{
    		var iRow = beforeRowSize + (i*rowSize)+n;
    		if (objLeft)
    		{
    			for (var k=0; k < objLeft.rows[iRow].cells.length; k++)
    			{
    				setTdData(objRs, i, objLeft.rows[iRow].cells[k]);
    			}
    		}
    		for (var k=0; k < objTbl.rows[iRow].cells.length; k++)
    		{
    			setTdData(objRs, i, objTbl.rows[iRow].cells[k]);
    		}	
    	}
    }
    
    //scrollbar top
    //myDocument.all["span"+dispdatasetnm].scrollTop="top";
    
    //현재페이지 set
    DataSet.setAttribute(datasetnm, "curpage", curpagenum);
    
	if(DataSet.getReqParam(datasetnm,"_DEFCLICK") == "true")
	{
		mrowSelect_obj(obj.rows(beforeRowSize));
		var fun = eval("showDetail_obj");
		if ( typeof(fun) == "function" )
			showDetail_obj(obj.rows(beforeRowSize));
	}
}

function setTdData(objRs, i, oj)
{
	//var oj = objTbl.rows[iRow].cells[k];
	var objNode = objRs[i];				//recordset
	var column=oj.getAttribute("column");
	format=oj.getAttribute("format");
	len=oj.getAttribute("length");
	distinct=oj.getAttribute("distinct");

	/*try{
		var col=objNode.getElementsByTagName(column);
	}catch(ecol){ return;}
	if (col.length >0)*/
	{
		//if (!col[0].text ) return;
		var val = objNode.get(column);

		if(distinct=="true" && i!=0)
		{
			var beforeval=objRs[i-1].get(column);
			if(trim(beforeval)==trim(val)) val="";
		}
		var objCont = oj.getElementsByTagName("input");
		for (var l=0; l<objCont.length; l++)
		{
			if (objCont[l].type == "checkbox"){
				if(objCont[l].value.length==0){
					objCont[l].value=val;
				}else{
					objCont[l].checked=HtmlUtil.decode(val,objCont[l].value,true,false);
				}
			}
			else objCont[l].value=getFormatData(val,format,len);
		}
		if (objCont.length == 0)
		{
			objCont = oj.getElementsByTagName("select");
			if (objCont.length >0) 
			{
				if (objCont[0].multiple)
				{
					var suboj = objCont[0];
					var aArr = val.split("|");
					suboj.value = "";

					for (var m=0; m < aArr.length; m++)
					{
						for (var j=0; j < suboj.options.length; j++)
						{	
							if (aArr[m] == suboj.options[j].value) 
							{
								suboj.options[j].selected=true;
								break;
							}	
						}	
					}	
				}
				else
					objCont[0].value=val;
			}	
		}	
		if (objCont.length == 0)
		{
			var ret = getFormatData(HtmlUtil.decode(val,"undefined",""),format,len);	
			if (format == "HTML")
				oj.innerHTML = ret;	
			else
				oj.innerText = ret;	
		}	
		oj.setAttribute("title",getFormatData(val,format,""));
	}	
}
/* rec_row기준 페이지 리턴 */
HtmlUtil.getRecRowIndex = function (datasetnm,pagenum)
{
	var recrow=DataSet.getRecRow(datasetnm);			//rec_row
	var pagerow=DataSet.getPageRow(datasetnm);			//pagerow
	var modnum=Math.floor(recrow/pagerow);
	if(modnum==0) modnum=1;
	var rtn=pagenum%modnum;
	if(rtn==0) rtn=modnum-1;
	else rtn=rtn-1;
	rtn=parseInt(pagenum)-parseInt(rtn);
	
	return rtn;
}

/* decode */
HtmlUtil.decode = function (val,cmp,mov,xmov)
{
	if(val==cmp) return mov;
	else{
		if(xmov!=null) return xmov;
		else return val;
	}
}

/* table object 의데이타를 지운다. */
HtmlUtil.clearTable = function(datasetnm, sIndex, eIndex)
{
	var aObj = new Array(datasetnm, datasetnm+"_left");
	 
	try{
		for (var k=0; k < aObj.length; k++)
		{
			var tableobj = myDocument.getElementById(aObj[k]);
			if (tableobj )
			{
				if (!sIndex)	sIndex = 0;
				if (!eIndex)	eIndex = tableobj.rows.length;

				// 2008.10.10 - ¼±???? tr ?? ??±??­ 
				for(var i=sIndex; i<eIndex; i++)
				{
					//tableobj.rows[i].className = "tbl_tr01";
					tableobj.rows[i].className = "GRIDTR";
				}

				for(var i=sIndex; i<eIndex; i++)
				{
					for(var j=0;j<tableobj.rows(i).cells.length;j++)
					{
						if(tableobj.rows(i).cells(j).getElementsByTagName("img").length>0) continue;
						var col=tableobj.rows(i).cells(j).column;
						var oj ;
						var objCont = tableobj.rows(i).cells(j).getElementsByTagName("input");
						for (var l=0; l<objCont.length; l++)
						{
							if (objCont[l].type == "checkbox")	
							{
								objCont[l].checked=false;
								if (objCont[l].className != "dbcheck") objCont[l].value =""; 
							}	
							else objCont[l].value="";
						}
						if (objCont.length == 0)
						{
							objCont = tableobj.rows(i).cells(j).getElementsByTagName("select");
							if (objCont.length >0) objCont.value="";
						}	
						if (objCont.length == 0) tableobj.rows(i).cells(j).innerText = "";
						
						tableobj.rows(i).cells(j).title = "";
					}
				}
			}	
		}
    	var pageobj = myDocument.getElementById(datasetnm+"_PAGEMAN");
		if(pageobj!=null) pageobj.innerHTML="";	//pageman clear
	}catch(e){
		alert("+Function[HtmlUtil.clearTable]\n+msg["+ e.message +"]\n+decription["+ e.decription+"]");
	}
}

/* table row(tr) add */
HtmlUtil.addTableRow = function(tableobj,rowplus, rowsize)
{
	for(var i=0;i<rowplus;i++)
	{
		for (var j=0; j<rowsize; j++)
		{
			var rowobj=tableobj.rows[j].cloneNode(true);
			tableobj.tBodies[0].appendChild(rowobj);
		}	
	}
}

/* table row(tr) remove */
HtmlUtil.removeTableRow = function(tableobj,rowminus, rowsize)
{
	for(var i=0;i<(rowminus*rowsize);i++)
	{//alert(tableobj.rows.length-1);
		var trobj=tableobj.rows(0);
		tableobj.tBodies[0].removeChild(trobj);
	}
}

/* table free insert */
HtmlUtil.getFreeMan = function(datasetnm, obj)
{
	var obj;
	//#2.data insert
	var totalcount=DataSet.getTotalCount(datasetnm);				//쿼리한총갯수
	if(totalcount<=0){
		if((obj?obj.GetParam("_DSNOTF"):DataSet.getReqParam(datasetnm,"_DSNOTF"))=="true")
		{
			alert("조회된 데이타가 없습니다.");		//table clear
		}	
		return;
	}
	
	var outform=obj?obj.GetParam("_OUTFORMNM"):DataSet.getReqParam(datasetnm,"_OUTFORMNM");
	//#2-1.data loop
    var objRs = DataSet.getParamArrHash(datasetnm,"1");//dsroot[0];	//page

	for(var i=0;i<objRs.length;i++)	//recordeset
	{
		var objNode = objRs[i];
		var aKey = objNode.getNames();
		for(var k=0;k<aKey.length;k++)
		{
			try{
				var len,format,oj,otype;
				var col=aKey[k];	//column
				var objItem = objNode.get(col);
				var val = "";
				var oj ="";

				val=HtmlUtil.decode(objItem,"undefined","");	//value
				//form name 정해진 경우
				if(trim(outform).length>0)
					oj=myDocument.forms[outform].elements[col];
				if(typeof(oj) != 'object')
					oj=myDocument.all(col);

				var loop=1;
				var suboj;

				if (!oj) continue;
				if(oj.length>0 && oj.type!="select-one" && oj.type!="select-multiple") loop=oj.length;
				for(var l=0;l<loop;l++){
					if(typeof(oj[l])=="undefined" || oj.type=="select-one"|| oj.type=="select-multiple") suboj=oj;
					else suboj=oj[l];
					otype=suboj.getAttribute("type");
					if(otype==null){//innerText
						format=suboj.getAttribute("format");
						len=suboj.getAttribute("length");
						suboj.innerText=nvl(getFormatData(val,format,len), " ");
						//tip attribute
						suboj.setAttribute("title",getFormatData(val,format,""));
					}else if(otype=="HTML") {
						format=suboj.getAttribute("format");
						len=suboj.getAttribute("length");
						suboj.innerHTML=nvl(getFormatData(val,format,len), "");
					}else if(otype=="checkbox" || otype=="radio"){//checked
						suboj.checked=HtmlUtil.decode(val,suboj.value,true,false);
					}else if (otype=="select-multiple")
					{
/*						var aArr = val.split("|");
						suboj.value = "";

						for (var m=0; m < aArr.length; m++)
						{
							for (var j=0; j < suboj.options.length; j++)
							{	
								if (aArr[m] == suboj.options[j].value) 
								{
									suboj.options[j].selected=true;
									break;
								}	
							}	
						}		*/				
					}
					//otype=="select-one" 기능 추가 2009/02/26 
					else if(otype=="select-one")
					{
						suboj.value = val;
					}
					else{//value
						format=suboj.getAttribute("format");
						len=suboj.getAttribute("length");
						suboj.value=getFormatData(val,format,len);
						//tip attribute
						suboj.setAttribute("title",getFormatData(val,format,""));
					}
				}
			}catch(ee){
				//alert(ee.number & 0xFFFF);
				//alert("Message:"+ee.message);
				continue;
			}
		}
	}
}

/* Tree 구조 */
HtmlUtil.getTreeMan=function(datasetnm)
{
	var obj;
	var totalcount=DataSet.getTotalCount(datasetnm);				//쿼리한총갯수
	if(totalcount<=0)
	{
		document.all(datasetnm).innerHTML="";
		return;
	}
	var xmlobj=DataSet.getUcareData(datasetnm);			//dataset obj
	var dsroot=xmlobj.getElementsByTagName("page-1");	//page xml get
	var stepobj=myDocument.all(datasetnm+"_step");		//step tage find
	if(stepobj==null) stepobj=myDocument.getElementsByTagName("step")[0]
	var stepcolumn=stepobj.getAttribute("column");			//step 컬럼명
	var funstep=stepobj.getAttribute("funstep");			//이벤트 줄 step
	var funname=stepobj.getAttribute("funname");			//이벤트 명
	var funviewing=stepobj.getAttribute("funviewing");		//이벤트 발생시 하위 노드가 있을경우 활성,비활성여부(기본값:false)
	var arr=DataSet.getParamArr(datasetnm,"1",stepcolumn);	//step arr
	var smallnum=parseInt(getSmallNum(arr));				//step중 가장 작은수
	var largenum=parseInt(getLargeNum(arr));				//step중 가장큰수
	var objtreenm=myDocument.all(datasetnm+"_tree");			//tree tag find
	if(objtreenm==null) objtreenm=myDocument.getElementsByTagName("tree")[0];
	if(typeof(stepcolumn)=="undefined") stepcolumn="step"; //default(query alias)
	var sb=new StringBuffer();
	var hsImg=new Hashtable();
	//tree tag object
	var viewtreenm=objtreenm.getAttribute("column");
	var viewcheckyn=objtreenm.getAttribute("checkbox");
	var viewfold=objtreenm.getAttribute("fold");
	var parentIndex=0;				//div name parent index
	var spanOpenCnt=0;				//span open count
	var divnm="";
	//활성여부
	var vnone="none";
	var mark="<img id='_t' src='"+scriptPath+"/images/icon/pnode.gif' align='absmiddle' border='0'>";
		mark+="<img id='_t1' src='"+scriptPath+"/images/icon/folderclosed.gif' align='absmiddle' border='0'>";
	if(viewfold=="down") {
		vnone="";
		mark="<img id='_t' src='"+scriptPath+"/images/icon/mnode.gif' align='absmiddle' border='0'>";
		mark+="<img id='_t1' src='"+scriptPath+"/images/icon/folderopen.gif' align='absmiddle' border='0'>";
	}
	//#2-1.data loop(tree)
	var objRs = dsroot[0];

	for(var i=0;i<objRs.childNodes.length;i++){
		//image
		var viewimgtag="";
		var objItem = objRs.childNodes[i];
		try{
			//image
			var imgcol=objtreenm.getAttribute("imgcolumn");
			if(imgcol!=null && imgcol.length>0)
			{
				var col = objItem.getElementsByTagName(imgcol);
				if (col.length >0)
				{
					var viewimgsrc = col[0].text;
					if(viewimgsrc.length>0)
						viewimgtag="<img src='"+viewimgsrc+"' align='absmiddle' border='0'>";
				}		
			}
		}catch(ig){}
		
		var step=parseInt(DataSet.getParam(datasetnm,"1",i,stepcolumn));
		for(var k=0;k<objItem.childNodes.length;k++){
			try{
				var col=objItem.childNodes[k].nodeName;	//columns
				if(viewtreenm!=col || col==stepcolumn) continue;
				var val="";
				if (objItem.childNodes[k].firstChild)
					val=HtmlUtil.decode(objItem.childNodes[k].firstChild.text,"undefined","");	//value
				var space="";
				if(smallnum<step) {
					var n=2;
					if(step==largenum) n++;
					space=mkString("&nbsp;",step*n);
				}
				if(largenum==step) space+="<img id='_t2' src='"+scriptPath+"/images/icon/doc.gif' align='absmiddle' border='0'>";
				else space+=mark;
				//buffer
				if(smallnum==step){
					divnm=datasetnm+"_m"+(++parentIndex)+"_"+step+"_"+(i);
					//root span start
					sb.append("<span id='"+divnm+"'>");
				}else {
					//before spanname
					var divarrstep=divnm.substring(datasetnm.length+1).split("_")[1];
					//child span start
					if(parseInt(divarrstep)!=step || (parseInt(divarrstep)==step && largenum>step)){
						if((parseInt(divarrstep)==step && largenum>step)) sb.append("</span>");
						else ++spanOpenCnt;
						divnm=datasetnm+"_m"+(parentIndex)+"_"+step+"_"+(i);
						sb.append("<span id='"+divnm+"' style='display:"+vnone+"'>");
					}
				}
				sb.append(space);
				if(viewcheckyn=="true")
					sb.append("<input type='checkbox' name=tree_chk_"+i+" onClick=treeClick(this,"+i+")>");
				sb.append("<a id="+datasetnm+"_tree_node_"+i+(largenum==step?" class='dragsrc'":"")+"  href=javascript:HtmlUtil.treeViewTF('"+divnm+"','"+funstep+"','"+funname+"','"+funviewing+"','"+i+"');>");
				sb.append(viewimgtag);
				sb.append(val);
				sb.append("</a>");
				sb.append("<br>");
				
				if (i+1<objRs.childNodes.length)
					var nextstep=parseInt(DataSet.getParam(datasetnm,"1",i+1,stepcolumn));
				
				//root span end
				if(nextstep==smallnum || i+1==objRs.childNodes.length){
					sb.append("</span>");
				}
				//child span ends
				if(nextstep<step){
					sb.append(mkString("</span>",step-nextstep+1));
					spanOpenCnt=0;
				}
			}catch(ee){
				//alert("decription:"+ee.message+"\n"+"Message:"+ee.decription);
				continue;
			}
		}
	}
	//inner
	var objid=myDocument.all(datasetnm);
	objid.innerHTML=sb.toString();
}

/* tree view or not view */
HtmlUtil.treeViewTF=function(objnm,funstep,funname,funviewing,idx){
	var obj=myDocument.all(objnm);
	var fig="true";
	
	//이벤트여부
	if(funname!="null" || funname.length>0){
		var evCallyn=true;
		var objArr=objnm.split("_");
		//step이 지정된 경우 해당 step 에서만 이벤트 호출
		if(funstep!=null && funstep.length!=0){
			if(parseInt(objArr[1])==parseInt(funstep)) evCallyn=true;
			else if ( parseInt(funstep)==0 ) evCallyn=true;
			else evCallyn=false;
		}
		if(evCallyn){
			fig=funviewing=="null"||funviewing.length==0 ? false : funviewing;
			try{
				eval(funname+"('"+obj+"','"+idx+"','"+objArr[1]+"')");	//parameter(span obj,Dataset index(rownum))
			}catch(e){
				alert("+Function[HtmlUtil.treeViewTF]\n+msg["+ e.message +"]\n+decription["+ e.decription+"]");
			}
		}
	}
	
	//trew view or not view
	if(fig=="true"){
		for(var i=0;i<obj.childNodes.length;i++){
			var cobj=obj.childNodes[i];
			var nodenm=obj.childNodes[i].nodeName.toLowerCase();
			//font +,-
			if(nodenm=="img"){
				if(cobj.getAttribute("id")=="_t"){
					var sr=cobj.src.split("/");
					if(sr[sr.length-1]=="pnode.gif"){
						cobj.src=scriptPath+"/images/icon/mnode.gif";
						obj.childNodes[i+1].src=scriptPath+"/images/icon/folderopen.gif";
					}else{
						cobj.src=scriptPath+"/images/icon/pnode.gif";
						obj.childNodes[i+1].src=scriptPath+"/images/icon/folderclosed.gif";
					}
				}
			}
			//span

			if(nodenm=="span"){
				var dis=cobj.style.display;
				if(dis=="none") dis="";
				else dis="none";
				cobj.style.display=dis;
			}
		}
	}
}


HtmlUtil.getCodeMan=function(datasetnm, rowIndex)
{
	var aCode = new Array();
	var aName = new Array();
	var obj;
	var index=0;

	var outform=DataSet.getReqParam(datasetnm,"_OUTFORMNM");
	var sIds = DataSet.getReqParam(datasetnm, "id").split(",");
	var sId ;
	if ( sIds[rowIndex]) sId = sIds[rowIndex];
	else sId = sIds;

	var iStep = DataSet.getReqParam(datasetnm, "step");
	var obj;

	if (iStep == 1)
	{
		if (outform) 		obj = document.forms[outform].elements[sId+"M"];
		else obj = document.all[sId+"M"];
		//var subObj = document.all[sId];
		if (obj)
		{
			obj.options.length = 1;
		}
	}	
	else
	{
		if (outform) 		obj = document.forms[outform].elements[sId];
		else obj = document.all[sId];
	}	

	// option은 각 사이트별에 맞게 수정해주세요.
	obj.options.length = 0;
	var optionIndex = 1;
				
	if (obj.option == "0")
	{
		obj.options[0] = new Option("", "", false, false) ; 
	}
	else if (obj.option == "1")
	{
		obj.options[0] = new Option("전체", "00", false, false) ; 
	}
	else if (obj.option == "2")
	{
		obj.options[0] = new Option("선택", "00", false, false) ; 
	}
	else if (obj.option == "3")
	{
		obj.options[0] = new Option("전체", "%", false, false) ; 
	}
	else if (obj.option == "4")
	{
		obj.options[0] = new Option("== 선택 ==", "", false, false) ; 
	}
	else if (obj.option == "6")
	{
		obj.options[0] = new Option("== 선택 ==", "0", false, false) ; 
	}
	else if (obj.option == "10")
	{
		obj.options[0] = new Option("전체", "", false, false) ; 
	}
	else
	{
		optionIndex = 0;
	}
	
	var totalcount=DataSet.getTotalCount(datasetnm);				//쿼리한총갯수
	if(totalcount<=0)		return;

	//#2-1.data loop
    var objRs = DataSet.getParamArrHash(datasetnm,"1");//dsroot[0];	//page

	var aKey = objRs[0].getNames();

	for(var i=0;i<objRs.length;i++)	//recordeset
	{
		var objNode = objRs[i];
		var objCode = objNode.get(aKey[1]);
		var objNm = objNode.get(aKey[2]);
		aCode[index]=HtmlUtil.decode(objCode,"undefined","");	//value
		aName[index++]=HtmlUtil.decode(objNm,"undefined","");	//value

	}
	
	for (j=0; j<aCode.length; j++ ) 
	{ 
		obj.options[optionIndex++] = new Option(aName[j], aCode[j], false, false) ; 
	}
}

/* Folder 구조 */
HtmlUtil.getFolderMan=function(datasetnm)
{
	var obj;

	//no data continue
	var totalcount=DataSet.getTotalCount(datasetnm);				//쿼리한총갯수
	if(totalcount<=0)
	{
		document.all(datasetnm).innerHTML="";
		return;
	}
				
	var rstsb = new StringBuffer();
	var sb = new StringBuffer();
	var rows = totalcount;
	var obj = document.all[datasetnm];
	var xmlobj = DataSet.getUcareData(datasetnm);		//dataset obj
	var pagenm = "page-"+1;								//page number create
	var dsroot = xmlobj.getElementsByTagName(pagenm);	//page xml get
	var objRs = dsroot[0];	//page
	for(var i=0;i<objRs.childNodes.length;i++)		//recordset
	{
		var objNode = objRs.childNodes[i];
		var path = objNode.getElementsByTagName("FILE_PATH")[0].text;
		var name = objNode.getElementsByTagName("FILE_NAME")[0].text;
		var prev = objNode.getElementsByTagName("PARENT_DIR")[0].text;
		var comp = objNode.getElementsByTagName("COMP_PATH")[0].text;
		var isdir = objNode.getElementsByTagName("ISDIR")[0].text;
		
		sb.append("<span id=folder_" + i + " style=cursor:hand ");
		sb.append("onMouseOver=\"this.style.color='#3399CC'\" ");
		sb.append("onMouseOut=\"this.style.color='#555555'\" "); 
		sb.append("onDblClick=openFolder('"+path+"','"+name+"','"+prev+"','"+comp+"','"+isdir+"');>&nbsp;");
		if (isdir == "Y")
		{
			sb.append("<img id='_t1' src='"+scriptPath+"/images/icon/folderclosed.gif' align='absmiddle' border='0'>");
		}
		sb.append(objNode.getElementsByTagName("FILE_NAME")[0].text);
		sb.append("</span>");
		sb.append("<br>");
	}
	rstsb.append(sb.toString());
	var objid = myDocument.all(datasetnm);
	objid.innerHTML = rstsb.toString();
}

/* Grid 구조 */
var g_attachEvent = new Hashtable();
HtmlUtil.getWiseGridMan=function(datasetnm,disdatasetnm,g_page, g_callback, g_hasArguments, svcid, dsIndex, g_defclick)
{
	var xmlobj = DataSet.getUcareData(datasetnm);		//dataset obj
	var dsroot = xmlobj.getElementsByTagName("griddata");	//page xml get
	var obj = document.all[disdatasetnm];
	var val = "WISEGRID_DATA=";
	if (dsroot.length >0) val += dsroot[0].text;

	//wisegrid page시 callback 추가
	obj.SetParam("_FORWARD_ID", "wgwrite");
	obj.SetParam("WISEGRID_REQUESTURL", "/wisegrid.do");
	var sSummary = "setSumaryBar('"+disdatasetnm+"')"
//	pagingParam(datasetnm,disdatasetnm);

	//if (g_attachEvent.get(svcid) == false && dsIndex == "0") {

	if (g_attachEvent.get(disdatasetnm + dsIndex) == false) 
	{
		if (g_hasArguments == true)
		{
			// FIXME : 우선 보류
			obj.attachEvent("EndQuery", new Function ( "pagingParam('"+datasetnm+"','"+disdatasetnm+"');"+g_callback  ) );
			if (htGridOpt.get(disdatasetnm)) obj.attachEvent("EndQuery", new Function ( sSummary ) );
		}
		else
		{
			//obj.attachEvent("EndQuery", function EndQuery() { pagingParam(datasetnm,disdatasetnm); eval(g_callback+"('"+datasetnm+"')") } );
			obj.attachEvent("EndQuery", new Function ( "pagingParam('"+datasetnm+"','"+disdatasetnm+"');"+g_callback+"('"+datasetnm+"')" ) );
			if (htGridOpt.get(disdatasetnm)) obj.attachEvent("EndQuery", new Function ( eval(sSummary) ) );
/*			if (datasetnm == svcid)
			{
				obj.attachEvent("EndQuery", function EndQuery() { pagingParam(datasetnm,disdatasetnm); eval(g_callback+"('"+datasetnm+"')") } );
			}
			else
			{
				obj.attachEvent("EndQuery", function EndQuery() { pagingParam(datasetnm,disdatasetnm); eval("wiseCallback('"+datasetnm+"')") } );
			}*/
		}
				
		HtmlUtil.WiseGridDefClick(datasetnm, disdatasetnm, g_defclick);
		/*if (g_defclick == true)
		{
			fun=eval("showDetailO_obj");
			if(typeof(fun)=="function")
			{
				sDefClick = "if (document.all['"+disdatasetnm+"'].GetRowCount()>0 )  showDetailO_obj('"+disdatasetnm+"', '', document.all['"+disdatasetnm+"'].GetActiveRowIndex()  )";
				obj.attachEvent("EndQuery", new Function (  sDefClick  ));
			}	
		}*/
		g_attachEvent.put(disdatasetnm + dsIndex, true);
	}
//alert(val);
	obj.ClearAreaMerge(); 
	obj.SetGridRawData(val, false);
  
	HtmlUtil.setRowActive(obj, DataSet.getReqParam(datasetnm, "_DEFCLICK"));
}

/**
 * rowactive bg color 처리
 * obj : Wise Grid 객체
 * deflick : 첫 번째 Row 선택
 */
HtmlUtil.setRowActive=function(obj, deflick)
{
	if(deflick == "true")
	{
		if (obj.GetParam("rowactivebg") == "true")
		{
			obj.strActiveRowBgColor = gRowActiveBg;
		}
	}
	else
	{
		if (obj.GetParam("rowactivebg") == "true")
		{
			obj.strActiveRowBgColor = gRowActiveBg;
			if (obj.GetParam("tree") == "true")
			{
			}
			else
			{
				obj.InsertRow(0);
				obj.DeleteRow(0);
			}
		}
	}
}

/**
 */
HtmlUtil.WiseGridDefClick=function(datasetnm,disdatasetnm, defclick)
{
	var obj = document.all[disdatasetnm];

	if (defclick == true || defclick == "true")
	{
		fun=eval("showDetailO_obj");
		if(typeof(fun)=="function")
		{
			sDefClick = "if (document.all['"+disdatasetnm+"'].GetRowCount()>0 )  showDetailO_obj('"+disdatasetnm+"', '', document.all['"+disdatasetnm+"'].GetActiveRowIndex()  )";
			obj.attachEvent("EndQuery", new Function (  sDefClick  ));
		}	
	}
	else
	{
		sDefClick = "document.all['"+disdatasetnm+"'].SetActiveRowIndex(-1);";
		obj.attachEvent("EndQuery", new Function (  sDefClick  ));
	}

}

/* parameter 로 넘어온 page 부분만 스캔 objnm-'datasetnm' */
HtmlUtil.getSimpleMan = function (datasetnm, dispdatasetnm,pagenum)
{
//    alert("simple");
    var obj;
    var objLeft; 
    obj = myDocument.getElementById(dispdatasetnm);
    objLeft = myDocument.all[dispdatasetnm+"_left"];
    var xmlobj=DataSet.getUcareData(datasetnm);			//dataset obj
    var pagemanid=dispdatasetnm+"_PAGEMAN";
    var arr;
    var pageobj;
    var pagehtml="";
    var totalcount=DataSet.getTotalCount(datasetnm);				//쿼리한총갯수
    var pagelength=DataSet.getPageChildCount(datasetnm,pagenum);	//레코드갯수
    try{
    	pageobj = myDocument.getElementById(pagemanid);
    }catch(e){}
    //no data continue
    
    if (myDocument.getElementById("div"+dispdatasetnm+"_msg")) 
    	var dObj = myDocument.getElementById("div"+dispdatasetnm+"_msg").removeNode(true);

    if(totalcount<=0)
    {
    	if (obj) HtmlUtil.clearTable(dispdatasetnm);		//table clear
		//원래 개수로 돌리기...
	    if(obj.defaultRow > obj.rows.length)
	    {
	    	var rowplus=obj.defaultRow-obj.rows.length;
	    	HtmlUtil.addTableRow(obj,rowplus, obj.rowSize);	//table tr tag clone
	    	if (objLeft) HtmlUtil.addTableRow(objLeft,rowplus, obj.rowSize);	//table tr tag clone
	    }else{
	    	var rowminus=obj.rows.length-obj.defaultRow;
	    	if(rowminus>0)
	    	{
	    		HtmlUtil.removeTableRow(obj,rowminus, obj.rowSize);
		    	if (objLeft) HtmlUtil.removeTableRow(objLeft,rowminus, obj.rowSize);	//table tr tag clone
	    	}	
	    }
		if(DataSet.getReqParam(datasetnm,"_DSNOTF")=="true")
		{
			if(myDocument.getElementById("span"+dispdatasetnm+"_title"))
			{
				var titleobj = myDocument.getElementById("span"+dispdatasetnm+"_title");
				//var listobj  = myDocument.all[dispdatasetnm];
				titleobj.style.position="absolute";
				var myObj = myDocument.createElement("DIV");     
				myDocument.body.appendChild(myObj);          
				myObj.id        = "div"+dispdatasetnm+"_msg";
				myObj.innerText = "☞ 조회된 데이타가 없습니다.";
				myObj.className = "BOLD";
				myObj.style.position="absolute";
				myObj.style.top=titleobj.offsetTop+titleobj.offsetHeight+30+listobj.offsetTop;
				myObj.style.left=titleobj.offsetLeft+titleobj.offsetWidth/3;
				//titleobj.style.position="static";
			}
		}
    	if(pageobj!=null) pageobj.innerHTML="";	//pageman clear
		return;
    }
    var totalpage=DataSet.getQueryTotalPage(datasetnm);		//쿼리한총페이지수
    var xmlfirstpage=DataSet.getXmlFirstPage(datasetnm);	//현재 dataset의 첫번째페이지 번호
    var xmllastpage=DataSet.getXmlLastPage(datasetnm);		//현재 dataset의 마지막페이지 번호
    var pagerow=parseInt(DataSet.getPageRow(datasetnm));
    /*#3.분기점(현재페이지(pagenum)가 실제 데이타 페이지보다 크거나 작으면 이전,이후의데이타를 가져온다.
     *마지막페이지가 번호가 같은경우 데이타가 pagerow 보다 작고 totalcount 보다작으면 데이타를 가져온다.
     */
    if(parseInt(pagenum)>=parseInt(xmllastpage) 
    	|| parseInt(pagenum)<parseInt(xmlfirstpage)){
    		var tranyn=false;
    		if(parseInt(pagenum)==parseInt(xmllastpage)){
    			//데이타는 있으나 보여줘야할 갯수(pagerow) 보다 작고 가져올수 있는 데이타가 더 있을경우.
    			if(pagenum>1&&(pagelength<pagerow)&&(pagerow<=(totalcount-(pagenum*pagerow)))) tranyn=true;
    		}else tranyn=true;
    		if(tranyn){
    			var recindex=HtmlUtil.getRecRowIndex(datasetnm,pagenum);
    			var stnum=((recindex-1)*DataSet.getPageRow(datasetnm))+1;
    			var tran = new Trans();
    			tran.setAsync(DataSet.getAsync(datasetnm));
    			tran.setPage(recindex);
    			tran.setStartRow(stnum);
    			tran.setRecRow(DataSet.getRecRow(datasetnm));
    			tran.setPageRow(DataSet.getPageRow(datasetnm));
    			tran.setSvc(datasetnm);
    			tran.setUserParams(DataSet.getReqParamString(datasetnm)+"&_VIEWPAGE="+pagenum);
    			tran.setPageing(true);
    			if (DataSet.getReqParam(datasetnm,"_WAITYN")=="false")
    				tran.setWait(false);
    			if (DataSet.getReqParam(datasetnm,"_RESSVCID"))
    				tran.setResSvc(DataSet.getReqParam(datasetnm,"_RESSVCID"));
    			if (DataSet.getReqParam(datasetnm,"_DISSVCID"))
    				tran.setDisSvc(DataSet.getReqParam(datasetnm,"_DISSVCID"));
    			//else tran.setWait(true);
    			tran.open("","",DataSet.getActionPage(datasetnm));
    			return;
    		}
    }
    
//	if (obj == null) return;
    var viewpage=DataSet.getReqParam(datasetnm,"_VIEWPAGE");//볼페이지
    var curpagenum=parseInt(pagenum);						//현재페이지
    if(viewpage.length>0){
    	curpagenum=parseInt(viewpage);
    	DataSet.removeReqParam(datasetnm,"_VIEWPAGE");		//view param remove
    }

    var pagenm="page-"+curpagenum;							//page number create
    var dsroot=xmlobj.getElementsByTagName(pagenm);			//page xml get
    var columninfo = xmlobj.getElementsByTagName("columninfo")[0].text.split("|");			//page xml get
    var htCol = new Hashtable();

//    alert("before create");
    //#4.table row create or remove
    var rowsize = 1;
    if (obj.rowSize) rowsize = obj.rowSize;
    var rowCount = obj.rows.length/rowsize;

/*    if(rowCount<dsroot[0].childNodes.length){
    	var rowplus=dsroot[0].childNodes.length-rowCount;
    	HtmlUtil.addTableRow(obj,rowplus, rowsize);	//table tr tag clone
    	if (objLeft) HtmlUtil.addTableRow(objLeft,rowplus, rowsize);	//table tr tag clone
    }else{
    	var rowminus=rowCount-dsroot[0].childNodes.length;
    	if(rowminus>0)
    	{
    		HtmlUtil.removeTableRow(obj,rowminus, rowsize);
    		if (objLeft) HtmlUtil.removeTableRow(objLeft,rowminus, rowsize);
    	}	
    }
    //2007.04.11 cell clear
    if (obj) HtmlUtil.clearTable(dispdatasetnm);		//table clear
*/
    if(pageobj!=null) pageobj.innerHTML="";	//pageman clear
    //#5.table data insert(data loop)
    if(obj.rows.length > 1) arr=true;
    else arr=false;
    
    var objRs = dsroot[0];	//page
    var colArray = Array();
    
    var objTbl = myDocument.all[dispdatasetnm];
    for(var i=0;i<objRs.childNodes.length;i++)		//recordset
    {
    	var objNode = objRs.childNodes[i];				//recordset
    	var m =1;									// TODO : 왜 추가했는지 기억이 나지 않음. 아마 sort와 관련이 있는 거 같다.
    	var rowSize = objTbl.rowSize;
    	var iRow = i*rowSize;
    	
    	var ojno;
    	if (objLeft)
    	{
    		ojno = objLeft.rows[iRow].cells[0];
    	}
    	else
    	{
    		ojno = objTbl.rows[iRow].cells[1];
    	}
    	objTbl.rows[iRow].cells[0].innerText=objNode.getAttribute("row");	//IDX
    	if (ojno.id == dispdatasetnm+"_"+"NO")
    	{
    		ojno.innerText = ((pagenum-1)*pagerow)+(i+1);
    		m++;
    	}

    	for (var n=0; n < columninfo.length; n++)
    	{
    	    htCol.put(columninfo[n],n);
        }    

    	for (var n=0; n < rowSize; n++)
    	{
    		var iRow = (i*rowSize)+n;
/*    		if (objLeft)
    		{
    			for (var k=0; k < objLeft.rows[iRow].cells.length; k++)
    			{
    				setTdData(objRs, i, objLeft.rows[iRow].cells[k]);
    			}
    		}*/

    		var sData = objNode.text.split("|");
    		for (var k=0; k < objTbl.rows[iRow].cells.length; k++)
    		{
    		    var oj  = objTbl.rows[iRow].cells[k];
            	var column=oj.getAttribute("column");
            	if (column == null) continue;
            	var format=oj.getAttribute("format");
            	var len=oj.getAttribute("length");
            	var distinct=oj.getAttribute("distinct");
    		    var index = htCol.get(column);
    		   // alert(objTbl.rows[iRow].cells.column);
    		    objTbl.rows[iRow].cells[k].innerText = sData[index]; 
//    			setTdData(objRs, i, objTbl.rows[iRow].cells[k]);
    		}	
    	}
    }
    //scrollbar top
    myDocument.all["span"+dispdatasetnm].scrollTop="top";
    //#6.paging
    if(pageobj != null)
    {
    	var pagegroup = DataSet.getReqParam(datasetnm,"_PAGEGROUP");//페이지그룹단위
    	if (!pagegroup) pagegroup=10;					//페이지그룹단위
    	else pagegroup = parseInt(pagegroup);

    	var startnum=parseInt((curpagenum-1)/pagegroup)+1;	//시작페이지
    	if((startnum*pagegroup)>pagegroup) 
    		startnum=(startnum*pagegroup+1)-pagegroup;
    	var endnum=startnum+pagegroup;					//끝페이지
    	if (endnum>totalpage) endnum = totalpage+1;

    	pagehtml += " <a href=javascript:HtmlUtil.getPageMan('"+datasetnm+"','"+dispdatasetnm+"','"+1+"');><span class=pageprev0></span></a>";
    	pagehtml += " <a href=javascript:HtmlUtil.getPageMan('"+datasetnm+"','"+dispdatasetnm+"','"+(curpagenum<2?1:curpagenum-1)+"');><span class=pageprev></span></a> ";
    	pagehtml += "|&nbsp;&nbsp;";
    	for(var i=startnum;i<endnum;i++){
    		var pn = i;
    		if (curpagenum == pn)
    			pagehtml += "<font color='#FF6633'><b>"+pn+"</b></font>";
    		else
    			pagehtml += "<a href=javascript:HtmlUtil.getPageMan('"+datasetnm+"','"+dispdatasetnm+"','"+pn+"');>"+pn+"</a>";
    		pagehtml += "&nbsp;&nbsp;|&nbsp;&nbsp;";
    	}
    	pagehtml += " <a href=javascript:HtmlUtil.getPageMan('"+datasetnm+"','"+dispdatasetnm+"','"+(totalpage<=curpagenum?curpagenum:curpagenum+1)+"');><span class=pagenext></span></a>";
    	pagehtml += " <a href=javascript:HtmlUtil.getPageMan('"+datasetnm+"','"+dispdatasetnm+"','"+totalpage+"');><span class=pagenext0></span></a>";
    /*	if ((startnum+pagegroup)<(totalpage+1))
    		pagehtml +="<a href=javascript:HtmlUtil.getPageMan('"+datasetnm+"','"+(endnum)+"');> 다음▶</a>";*/
    	pageobj.innerHTML = pagehtml+"<!-- ["+curpagenum+"/"+totalpage+"]-->";
    }
    
    //현재페이지 set
    DataSet.setAttribute(datasetnm,"curpage",curpagenum);
    
	if(DataSet.getReqParam(datasetnm,"_DEFCLICK")=="true")
	{
		mrowSelect_obj(obj.rows(0));
		var fun=eval("showDetail_obj");
		if(typeof(fun)=="function")
			showDetail_obj(obj.rows(0));
	}
}