/* *******************************
	Multi Check SelectBox [MCS]
******************************* */

var cpPart;								//creat popup : partcd
var cpPartBody;							//creat popup : body in partcd
var cp_heigth = 0;						//creat popup height
var cp_width  = 0;						//creat popup width
var cp_maxcnt = 8;						//creat popup default size

var SELECT_PART_ID = "UCRST108S";	//query for part combo

/**
  * create popup Create.
  */
function init_cp()
{
	cpPart = window.createPopup();
	cpPart.document.createStyleSheet(scriptPath+"/style/common.css");
 	cpPartBody = cpPart.document.body;
	//makeCheckCombo('reset');
}

/**
  * search part code for partcombo
  * obj   		: from object
  * toObj 		: to object
  * step  		: call step
  * val   		: will setting value of mcs
  * callback  	: call back method that is called after mcs maded
  */
var MSC_CALLBACK;
var MSC_VAL;
function makecombo( obj, toObj, step, val ,callback )
{
	if (obj.option!=-1  )
	{
		
		if(fQuery.cntrcd.value == "")
		{
			makeCheckCombo('reset');
		}else{
			MSC_CALLBACK = callback;
			MSC_VAL = val;
			var sStr = "";
			sStr += "cntrcd="  + fQuery.cntrcd.value;
			sStr += "&teamcd=" + fQuery.teamcd.value;
	
			var tran = new Trans();
			tran.setRecRow("9999");
			tran.setPageRow("9999");
			tran.setSvc(SELECT_PART_ID);
			tran.setCallBack("callback_makecombo");
			tran.setUserParams(sStr);
			tran.setWait(false,"");
			tran.setAsync(false);
			tran.open("", "f","/common.do");
		}
	}
}

/**
  * call back method for makecombo
  */
function callback_makecombo(svcid)
{
	switch (svcid)
	{
		case SELECT_PART_ID : makeCheckCombo(); break;
		default:break;
	}
}
/**
  * making multi checked combo object
  */
function makeCheckCombo(arg)
{
	try {

	var strTag    = "";
	var strTagSum = "";
	var code      = "";
	var codenm    = "";
	var tbl_width = 0;

	var selclassnm = document.all("partcd").className;	//mcs classname matching mcs width
	var classWidth = selclassnm.substr(12,3);			//ex: select_muti_110_sel_req
	var classReq   = trim(selclassnm.substr(19));
	var selwidth   = parseInt(classWidth);	//mcs width from mcs classname
	var tot        = DataSet.getTotalCount(SELECT_PART_ID);
	var tbl_height = tot*20+2;	//20px for 1 row + margin 2

	if ( (cp_maxcnt*20+2) < tbl_height)
	{
		tbl_height = (cp_maxcnt*20+2);
	}

	if(tot<1){arg="reset";}

	if(arg=="reset")
	{
		tbl_height = (1*20+2);
		tbl_width  = (selwidth-2);

		strTagSum  = tagDiv(tbl_width, tbl_height, "== 선택 ==");
		strTagSum  = tagtable(tbl_width, strTagSum);
	}
	else
	{
		for (var i=0; i<tot; i++)
		{
			code   = DataSet.getParam(SELECT_PART_ID, 1, i, "code"   );
			codenm = DataSet.getParam(SELECT_PART_ID, 1, i, "codenm" );
			strTag = tagCheckbox(code,codenm,classReq);
			strTag = tagLabel(code,strTag);
			strTag = tagLi(strTag);
			strTagSum += strTag;

			if(tbl_width<codenm.length)
			{
				tbl_width = codenm.length;
			}
		}
		tbl_width = tbl_width*13+30; //13px for 1 char + margin 30 for checkbox
		if(tbl_width<selwidth) { tbl_width=selwidth-2; }
		strTagSum = tagUl(strTagSum);
		strTagSum = tagDiv(tbl_width, tbl_height, strTagSum);
		strTagSum = tagtable(tbl_width, strTagSum,classReq);
	}

	cp_width  = tbl_width  + 2;
	cp_heigth = tbl_height + 2;

	}catch(e){alert(e.description);}

	cpPartBody.innerHTML = strTagSum;

	setValueMCS(MSC_VAL);

	eval(MSC_CALLBACK);
}

/**
  * show part Multi Check Selectbox(MCS)
  */
function showCheckCombo()
{
	/*if(cpPart.isOpen)
	{
		cpPart.hide();
	}else{*/

		var partcd  = document.all("partcd");
		var vLeft   = findPosX(partcd);
		var vTop    = findPosY(partcd);
		var vWidth  = partcd.offsetWidth;
		var vHeight = partcd.offsetHeight;
		cpPart.show(0,vHeight ,cp_width ,cp_heigth, partcd);
	//}
}

/**
  * find X position of object
  */
function findPosX(obj)
{
	var curleft = 0;
	if(obj.offsetParent)
	{
		while(obj.offsetParent)
		{
			curleft += obj.offsetLeft;
			obj = obj.offsetParent;
		}
	}else{
		if(obj.x) curleft += obj.x;
	}

	return curleft;
}

/**
  * find Y position of object
  */
function findPosY(obj)
{
	var curtop = 0;
	if(obj.offsetParent)
	{
		while(obj.offsetParent)
		{
			curtop += obj.offsetTop;
			obj = obj.offsetParent;
		}
	}else{
		if(obj.y) curtop += obj.y;
	}

	return curtop;
}

/**
  * make Tag of checkbox for MCS
  */
function tagCheckbox(code,codenm,req)
{
	 var tag = "<input type='checkbox' class='input_checkbox"+req+"' name='chkPartcd' id='"+code+"' value='"+code+"' />"+codenm;
	 return tag;
}
/**
  * make Tag of label for MCS
  */
function tagLabel(code,innerTag)
{
	var tag = "<label class='label_multi' for='"+code+"'>"+innerTag+"</label>";
	return tag;
}
/**
  * make Tag of li for MCS
  */
function tagLi(innerTag)
{
	var tag = "<li class='li_multi'>"+innerTag+"</li>";
	return tag;
}
/**
  * make Tag of ul for MCS
  */
function tagUl(innerTag)
{
	var tag = "<ul class='ul_multi'>"+innerTag+"</ul>";
	return tag;
}
/**
  * make Tag of div for MCS
  */
function tagDiv( nWidth, nHeight, innerTag)
{
	var tag = "<div style='overflow-y:scroll;width:"+nWidth+";height:"+nHeight+"'><form name='f'>"+innerTag+"</form></div>";
	return tag;
}
/**
  * make Tag of table for MCS
  */
function tagtable(nWidth, innerTag,req)
{
	var tag = "";
	tag  = "<table border='0' cellpadding='0' cellspacing='0' width='"+nWidth+"' class='tbl_multi'>";
	tag += "<tr " + ( (req=="_required") ? "class='tr_multi_required'" : "" ) + ">"
	tag += "<td nowrap>" + innerTag + "</td>";
	tag += "</tr></table>";
	return tag;
}

/**
  * check validation of multi check select box
  */
function getValidataionMCS()
{
	var chkPartcdstr = "";
	var chkPartcd    = cpPart.document.f.chkPartcd;

	if( !chkPartcd )							//파트가 없을때
	{
		//MessageBox("Required","I","파트");
		return false;
	}
	else										//파트가 있을때
	{
		if(chkPartcd.length)					//파트가 여러개일때
		{
			for(var i=0; i<chkPartcd.length; i++)
			{
				if(chkPartcd[i].checked)			//체크되었을때
				{
					if(chkPartcdstr.length>0){chkPartcdstr += ",";}
					chkPartcdstr += ("'"+chkPartcd[i].value+"'");
				}
			}

			if(chkPartcdstr.length<1)			//체크가 안되었을때
			{
				//MessageBox("Required","I","파트");
				return false;
			}
		}
		else									//파트가 1개일때
		{
			if(chkPartcd.checked)				//체크되었을때
			{
				chkPartcdstr += ("'"+chkPartcd.value+"'");
			}else{								//체크가 안되었을때
				//MessageBox("Required","I","파트");
				return false;
			}
		}
	}

	return chkPartcdstr;
}
/**
  * arrArg : will setting value Array of mcs
  */
function setValueMCS(arrArg)
{
	var arrValueMCS = arrArg;

	var chkPartcd = cpPart.document.f.chkPartcd;
	var flg = "";
	if( !chkPartcd )
	{
		return false;
	}
	else
	{
		if(chkPartcd.length)
		{
			for(var i=0; i<chkPartcd.length; i++)
			{
				flg = false;
				for(var j=0; j<arrValueMCS.length; j++)
				{
					if(chkPartcd[i].value==arrValueMCS[j])
					{
						flg = true;
						break;
					}
				}
				chkPartcd[i].checked = flg;
			}
		}
		else
		{
			flg = false;
			for(var j=0; j<arrValueMCS.length; j++)
			{
				if(chkPartcd.value==arrValueMCS[j])
				{
					flg = true;
					break;
				}
			}
			chkPartcd.checked = flg;
		}
	}
}