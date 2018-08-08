var sServiceID = "UCCOMCODELIST";
var sServiceIDs = "";

var BUSI_SELECT = "UCSYS1510S"
var BUSI_CHO_SELECT = "UCSYS1511S"
var SELECT_ID = "UCSYS1512S";
var INSERT_ID = "UCSYS1510I";
var DELETE_ID = "UCSYS1510D";
var UPDATE_ID = "UCSYS1510U";

var cen_sch_id;

var gsXaFlag = "";
var gsBXaFlag = "";
var gCurDay = "";
var day = "" ;
var CURINDEX = "";
var cntrcd = "";
var showmode = "";
var mode = "";

/**
  * onLoad�� ȣ��
  * ��ȸ���� �⵵�� ����
  * ��ȸ���� ���� ����
  * ��ȸ���� �������� ��ȸ�Ѵ�.
  * ���ó�¥�� gCurDay�� ����
  * getMonth() ��ȸ���� �������� ��ȸ
  */
function init(sDay, sMode)
{
	gsXaFlag = "I";
	gsBXaFlag = "I";
	setMode(gsXaFlag);
	
	fQuery.year.value = sDay.substring(0,4);
	fQuery.month.value = sDay.substring(4,6);

	gCurDay = sDay;
	
	//ȭ�� �ʱ�ȭ
	var obj = document.all[SELECT_ID];
	for (var i=0; i < 42; i++)
	{	
		obj[i].parentNode.className="";
		obj[i].rows[0].cells[0].innerText = "";
		obj[i].rows[0].cells[1].innerText = "";
		obj[i].rows[1].cells[0].innerText = "";
	}
	//�ε� �� ���� �ڵ� ����
	//if(f.query.value == "true")
	{
		getMonth('');
	}
}

/**
  * ��ȸ���� �������� �޷� ��ȸ
  * sParam ���� ��ȸ�� ����� ��ȸ��(yyyymm)�� ��ȸ��(yyyymmdd)�� �Է�
  * ȭ���� �ʱ�ȭ�Ѵ�.
  * ��ȸ������ ���������Ѵ�.
  */
function getMonth(flag)
{	
	
	if (getValidation(fQuery,true)== false) return false;
	gsXaFlag = "I";
	setMode(gsXaFlag);
	var sParam ="yyyymm=";
	if (gCurDay != "") gCurDay.className= "tbl_td01";
	
	if (flag != "")
	{
		var index = fQuery.month.selectedIndex +(flag=="+"?1:-1) ;
		if (index < 0 )
		{
			if (fQuery.year.options.length  >	fQuery.year.selectedIndex+1)
			{
				fQuery.year.selectedIndex = 	fQuery.year.selectedIndex+1;
				fQuery.month.selectedIndex = 11;
			}	
		}	
		else if (fQuery.month.options.length  <=	index)
		{
			if (fQuery.year.selectedIndex != 0)
			{
				fQuery.year.selectedIndex = 	fQuery.year.selectedIndex-1;
				fQuery.month.selectedIndex = 0;
			}	
		}	
		else
			fQuery.month.selectedIndex = index;
	}		
	
	//��ȸ��
	day = fQuery.year.value+""+fQuery.month.value;
	sParam += day;
	//ȭ�� �ʱ�ȭ

	var obj = document.all[SELECT_ID];
	for (var i=0; i < 42; i++)
	{	
		obj[i].parentNode.className="";
		//obj[i].rows[0].cells[0].innerText = "";
		obj[i].rows[0].cells[0].innerHTML = "<font id='calDay_" + i + "'>&nbsp</font>"
		obj[i].rows[0].cells[1].innerText = "";
		obj[i].rows[1].cells[0].innerText = "";
	}
	//��������
	var trans = new Trans();
	trans.setUserParams(sParam);
	//trans.setSvc(SELECT_ID + "," + CALENDAR_ID);
	trans.setSvc(SELECT_ID);	
	trans.setCallBack("showCalendar");
	trans.setPageRow(300);
	trans.open("","","/common.do");
	setMode("C");
}

/**
  * ���º� ��ư����(disabled)
  */
function setMode(sType)
{
	switch (sType)
	{
		case "I":
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = true;
			if (f.btnDel)  		f.btnDel.disabled = true;
			if (f.btnClose)  	f.btnClose.disabled = true;
			if (f.btnCancel)  	f.btnCancel.disabled = false;
			break;
		case "A":
			if (f.btnAdd)  		f.btnAdd.disabled = true;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = true;
			if (f.btnClose)  	f.btnClose.disabled = false;
			if (f.btnCancel)  	f.btnCancel.disabled = false;
			break;
		case "U":
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = false;
			if (f.btnClose)  	f.btnClose.disabled = false;
			if (f.btnCancel)  	f.btnCancel.disabled = false;
			break;
		case "C":
			if (f.btnAdd)  		f.btnAdd.disabled = true;
			if (f.btnSave)  	f.btnSave.disabled = true;
			if (f.btnDel)  		f.btnDel.disabled = true;
			if (f.btnClose)  	f.btnClose.disabled = true;
			if (f.btnCancel)  	f.btnCancel.disabled = true;
		default:
			break;
	}
}

/**
  * �߰���ư Ŭ���� ȣ���Ѵ�.
  * gsXaFlag�� A�� �ϸ� ��ư�� ��ϸ��(setMode())�� �����Ѵ�.
  * ��� �޺��ڽ��� ��Ȱ��ȭ ��Ų��.
  * ���� ���ڸ� �� ������ Ŭ�����Ѵ�.
  */
function add()
{
	if (gsXaFlag == "U")
	{
		gsBXaFlag = "U";
	}
	gsXaFlag = "A";
	setMode(gsXaFlag);

	var temp = f.bse_dt.value;
	clear(f);

	f.bse_dt.value = temp;	
	f.cen_sch_sbjt.focus();
}

/**
  * �����ư Ŭ���� ȣ���Ѵ�.
  * �Է°��� getValidataion�� üũ�Ѵ�.
  * �Ҽ��� �з��� �����Ѵ�.
  * gsXaFlag�� ������� �������� �����Ѵ�.
  * ������ �����Ѵ�.
  */
function save(obj, f, bMag)
{
	if (!f) f = document.forms[0];
	if (getValidation(f, true) == false) return;
	if (MessageBox("SavConfirm", "C", "") == false) return;
	
	var sParam = "";

	// ��� or ����
	if (gsXaFlag == "A") sServiceIDs = INSERT_ID;
	else sServiceIDs	= UPDATE_ID;
	
	var tran = new Trans();
	tran.setUserParams(sParam);
	tran.setSvc(sServiceIDs);	
	tran.open("f","f","/common.do");		

	setMode("C");
}


/**
  * ������ư Ŭ���� ȣ���Ѵ�.
  * �ٽ��ѹ� �����Ұ����� Ȯ���Ѵ�.
  * ������ �����Ѵ�.
  */
function del(cen_sch_id)
{	
	if( cen_sch_id == undefined ) cen_sch_id = f.cen_sch_id.value;

	showmode = "D";
	if (MessageBox("DelConfirm", "C", ""))
	{
		sServiceIDs	= DELETE_ID;
		
		var tran = new Trans();
		tran.setUserParams("cen_sch_id="+cen_sch_id);
		tran.setSvc(DELETE_ID);			
		tran.open("","f","/common.do");						
	}
}

function setCancelMode()
{
	if (gsBXaFlag == "U")
	{
		setMode("U");
		showDetail(SELECT_ID, CURINDEX, f);
	}	
	else
	{
		clear(f);
		f.bse_dt.value = fQuery.year.value+"-"+fQuery.month.value+"-"+document.all[SELECT_ID][CURINDEX].rows[0].cells[0].innerText;
		setMode(gsBXaFlag);
	}
}

/**
  * ������ ��Ŭ���� ȣ���Ѵ�.
  * gsXaFlag�� U�� �ϸ� ��ư�� �������(setMode())�� �����Ѵ�.
  * ȭ�鿡 ����������(divPlan) �����ش�.
  * top : y��ǥ�� ��Ÿ����.
  * left : x��ǥ�� ��Ÿ����.
  * index ����ȭ�鿡 �ѷ��� ��¥�� index
  * divindex ȭ�� 42ĭ�� index
  * ȭ�鿡 Ŭ���� ������ �󼼳����� ǥ���Ѵ�.
  */
function showDetail_obj(index, divindex)
{
		
	gsXaFlag = "U";
	gsBXaFlag = "U";
	showmode = "U";
	setMode(gsXaFlag);
	divPlan.style.display="";
	CURINDEX = index;

	var top;
	var left;

	//ȭ���� 4����Ͽ� divPlan�� ������ ������ǥ�� divPlan�� �׷��ش�.
	if(divindex < 21)
	{
		if(divindex % 7 < 4)
		{
			//������
			top = 150;
			left = 100;
		}
		else
		{	
			//������
			top = 150;
			left = 450;
		}
	}
	else
	{
		if(divindex % 7 < 4)
		{
			//�����Ʒ�
			top = 400;
			left = 100;
		}
		else
		{
			//�����Ʒ�
			top = 400;
			left = 450;
		}
	}
	divPlan.style.top  = top;
	divPlan.style.left = left;

	//ȭ�鿡 �󼼳����� �ѷ��ش�.
	showDetail(SELECT_ID, index, f);		
}

/**
  * �ݱ��ư Ŭ���� ȣ���Ѵ�.
  * ȭ�鿡 �������� divPlan�� �����.
  */
function closePlan()
{
	divPlan.style.display="none";
}

function calPrint()
{
	divbutton.style.display = "none";
	window.print();
	divbutton.style.display = "";
}

/**
  * �ݱ�
  */
function winClose()
{
	parent.window.close();
}

/**
  * ���������� ���콺 ������ ��Ʈ ����
  */
function boldChgOver(obj, chg, idx)
{
	if(chg == "OVER")
	{
		obj.className="Fblue";
		obj.style.fontWeight="bold";
	}
	else
	{
		eval("calDay_"+idx).style.fontWeight="bold";
	}
}

/**
  * ���������� ���콺 �ƿ��� ��Ʈ ����
  */
function boldChgOut(obj, chg, idx)
{
	if(chg == "OUT")
	{
		obj.className="";
		obj.style.fontWeight="normal";
	}
	else
	{
		eval("calDay_"+idx).style.fontWeight="normal";
	}
}

/**
  * �׸��带 ����Ŭ���� ȣ���Ѵ�.
  * gsXaFlag�� A�� �ϸ� ��ư�� ��ϸ��(setMode())�� �����Ѵ�.
  * ȭ�鿡 ����������(divPlan) �����ش�.
  * top : y��ǥ�� ��Ÿ����.
  * left : x��ǥ�� ��Ÿ����.
  * index ȭ�� 42ĭ�� index
  * ȭ�鿡 Ŭ���� ������ �󼼳����� ǥ���Ѵ�.
  */
function showPlan(obj, index)
{
	if(showmode == "U" || showmode == "D") 
	{
		showmode = "";
		return;
	}
	gsXaFlag = "A";
	gsBXaFlag = "A";
	setMode(gsXaFlag);
	CURINDEX = index;
	clear(f);
	var obj = document.all[SELECT_ID];
	//���� Ŭ���� �׸����� ��¥�� ������ divPlan�� �����.
	if ((obj[index].rows[0].cells[0].innerText) == ""){
		divPlan.style.display="none";
		return;
	}
	divPlan.style.display="";

	var top;
	var left;

	//ȭ���� 4����Ͽ� divPlan�� ������ ������ǥ�� divPlan�� �׷��ش�.
	if(index < 21)
	{
		if(index % 7 < 4)
		{
			//������
			top = 150;
			left = 100;
		}
		else
		{
			//������
			top = 150;
			left = 450;
		}
	}
	else
	{
		if(index % 7 < 4)
		{
			//�����Ʒ�
			top = 400;
			left = 100;
		}
		else
		{
			//�����Ʒ�
			top = 400;
			left = 450;
		}
	}
	divPlan.style.top  = top;
	divPlan.style.left = left;
	
	//���� Ŭ���� �׸����� ��¥
	
	f.bse_dt.value = day.substr(0,4) + "-" + day.substr(4,2) + "-" + obj[index].rows[0].cells[0].innerText;

	if (gsXaFlag == "U")
	{
		gsBXaFlag = "U";
	}
	gsXaFlag = "A";
	setMode(gsXaFlag);
	f.cen_sch_sbjt.focus();
	divPlan.style.display = "";
}

/**
  * getMonth()���� ������ ������ callback�̴�.
  * SELECT_ID�� ��ȸ�Ѱ��� ȭ�鿡 �׷��ش�
  * obj : SELECT_ID�� object�̴�.
  * aArray : ��ȸ�� SELECT_ID�� data���� array���̴�.
  * week : 1���� ��°������ ��Ÿ����.
  * ht : SELECT_ID�� i��° row���� 
  * ht2 : SELECT_ID�� j��° row���� 
  * day : ��ȸ�� ���� ��¥(1~31)
  * index : ȭ���� 42ĭ�߿� ����data�� ���� ���� index�̴�.
  */
function showCalendar()
{
	var obj = document.all[SELECT_ID];
	var aArry = DataSet.getParamArrHash(SELECT_ID,DataSet.getCurPage(SELECT_ID));
	var week = aArry[0].get("week_ord");
	var tempweek = 0;
	for (var i=0; i < aArry.length; i++)
	{
		//SELECT_ID�� i��° row����
		var ht = aArry[i];			
		//�ش���� ����(1~31)
		var day = ht.get("bse_dt");
		//���� data�� �ִ� �׸����� index��
		var index = (parseInt(ht.get("dayw"))-1) + (parseInt(ht.get("week_ord")) - parseInt(week)) * 7;
	
		var hldy_f = ht.get("hldy_f");
		var hldy_nm = ht.get("hldy_nm");
		if (index >41) continue;
		var sHTML = "";
		//���� ������ �׸��� ���� ����
		if (day == gCurDay)
		{
			 obj[index].parentNode.className="cal_today";
		} 
		//ȭ�鿡 ���ڸ� �׷��ش�
		//obj[index].rows[0].cells[0].innerText = ht.get("bse_dt").substr(6,8);
		obj[index].rows[0].cells[0].innerHTML = "<font id='calDay_" + index + "'>" + ht.get("bse_dt").substr(6,8) + "</font>"
		eval("calTd_" + index).style.cursor = "hand";
		//calTr[index].onmouseover = boldChgOver;
		//calTr[index].onmouseout = boldChgOut;
		
		//��,�Ͽ����̸� ���������� ǥ���Ѵ�.
		if (ht.get("dayw") == "1")
		{
			//�ָ�	
			obj[index].rows[0].cells[0].className = "cal2";
			obj[index].rows[0].cells[1].className = "cal2";
			if(hldy_nm != "") 
			{
				obj[index].rows[0].cells[1].innerText = hldy_nm;				
			}
		}	
		else if (ht.get("dayw") == "7")
		{
			//�ָ�	
			obj[index].rows[0].cells[0].className = "cal3";
			obj[index].rows[0].cells[1].className = "cal3";
			if(hldy_nm != "") 
			{
				obj[index].rows[0].cells[1].innerText = hldy_nm;				
			}
		}			
		else if ( hldy_f == "Y" )
		{
			obj[index].rows[0].cells[0].className = "cal2";
			obj[index].rows[0].cells[1].className = "cal2";
			if(hldy_nm != "") 
			{
				obj[index].rows[0].cells[1].innerText = hldy_nm;				
			}
		}
		else	
		{	//����
			obj[index].rows[0].cells[0].className = "cal1";
			obj[index].rows[0].cells[1].className = "cal1";
		}

		//�ش��Ͽ� ������ ������ ȭ�鿡 �׷��ش�.
		if (ht.get("cen_sch_sbjt") != "")
		{
			for (var j=i; j < aArry.length; j++)
			{
				var ht2 = aArry[j];
				//�ش��Ͽ� ������ �����ϸ� 
				if (day == ht2.get("bse_dt"))
				{
					//���������� 10���� �̻��̸� 9���ڸ� �����ش�.
					if(ht2.get("cen_sch_sbjt").length > 10)
					{
						var changeTitle	= ht2.get("cen_sch_sbjt").substr(0,9);
						changeTitle = changeTitle + "...";
					}
					else changeTitle	= ht2.get("cen_sch_sbjt");
					
					//span�� ���� ȭ�鿡 ���������� ǥ���ϰ� onclick=showDetail_obj()�� onclick=del()�� �����Ѵ�.
					sHTML += "<span onclick=showDetail_obj("+j+","+index+") style='font-weight:bold;font-color:red' style=cursor:hand title="+ht2.get("cen_sch_cont")+"><font id='chgtitle' onmouseover=boldChgOver(this,'OVER') onmouseout=boldChgOut(this,'OUT') style='font-weight:normal;font-color:black'>" + changeTitle + "</font></span>&nbsp;"+
					"<font color=red style='font-weight:bold'  onclick=del("+ht2.get("cen_sch_id")+") style=cursor:hand>x</font><br>";
				}
				else
				{
					//������ �������� ������ j-1��  i���� �����ϰ� ���� ����� for���� ����������.
					i = j-1;
					break;
				}
			}
			//�ش������� �������� span���� �Է��� ���� ȭ�鿡 �ѷ��ش�.
			obj[index].rows[1].cells[0].innerHTML = sHTML;
		}	
		if (tempweek < (parseInt(ht.get("week_ord")) - parseInt(week)))
		{
			tempweek = (parseInt(ht.get("week_ord")) - parseInt(week));
		}
	}

	// ������� �ʴ� TR �����
	var trObj;
	var trHeight;
	for (var i=0; i<6; i++)
	{
		trObj = document.all("calTr"+i);
		trHeight = 	100 / (tempweek+1);

		if (i < tempweek+1)
		{
			trObj.style.display = "";
			trObj.style.height =trHeight+"%";
		}
		else
		{
			trObj.style.display = "none";
			trObj.style.height = 0;
		}
	}

}



/******************************************************��������� �� 1 �޷ºκ�*********************************************************************************/

/**
 * ���� ���۽�
 */
function inits()
{
	//setButton(fs.btnSave, true);
}

/**
 * �˾� ���۽�
 */
function setInit(pop_type)
{
	mode = "1";
	gsXaFlag = pop_type;
	gsBXaFlag = pop_type;
	
	if("U" == pop_type){
		update_query();
	}
}

/**
 * ��ȸ��ư Ŭ����
 */
function queryList()
{
	if (getValidation(fQuerys, true) == false) return;

	var tran = new Trans();    
	 
	tran.setSvc(BUSI_SELECT);
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.open("fQuerys","fs","/wisegrid.do");
}

/**
 * ����Ʈ Ŭ����
 */
 
function showDetailO_obj(id, strColumnKey, nRow)
{
	cen_sch_id = DataSet.getParam(BUSI_SELECT, 1, nRow, "cen_sch_id");
	fs.btnSave.disabled = false;
}

/**
 * �˾�â ���� ������ ����
 * obj : ��ư��ü
 */
function update_query()
{
	 var tran = new Trans();    
	 tran.setSvc(BUSI_CHO_SELECT);
	 tran.open("fDetail", "fDetail", "/common.do"); 
}

/**
 * ������˾�
 */
 var winReg;
function conslpop(type)
{
	winReg = openPopup("/jsp/system/sysScheduleBusiP.jsp", "pop_type="+type+"&cen_sch_id="+cen_sch_id, "SchedualBusiPop", "", "", "750", "350", "scrollbars=no");
}

/**
 * �����ư Ŭ����
 */
function saves()
{
	 if (MessageBox("SavConfirm", "C", "") == false) return;
	 if (getValidation(fDetail, true) == false) return;
	 
	 var tran = new Trans();
	 
	 if (gsXaFlag == "A")
	 {
	  	tran.setSvc(INSERT_ID);
		tran.open("fDetail", "fDetail", "/common.do"); 
	 }
	 else if (gsXaFlag == "U" )
	 {
	  	tran.setSvc(UPDATE_ID);
		tran.open("fDetail", "fDetail", "/common.do"); 
	 }
}

 /**
 * ����̷� ������ư Ŭ����
 */
function remove()
{
	var GridObj  = document.getElementById(BUSI_SELECT);
	var rowCount = GridObj.GetRowCount();
	var chk = 0;
	var chkpoint = 0;
	var addchk = new Array();
	var params = "";
	
	if(rowCount > 0)
	{	
		for(var i=0; i<rowCount; i++)
		{
			if(GridObj.GetCellValue("chk1",i) == "1")
			{
				 addchk[chkpoint]= GridObj.GetCellValue("cen_sch_id",i);
				 chk += chk + 1;
				 chkpoint++;
			}
		}
		if(chk < 1) 
		{
			MessageBox("NotChecked", "I", "")
			return;
		}
	}
	
	 if (MessageBox("DelConfirm", "C", "") == false) return;
	 
	 var tran = new Trans(); 
	 tran.setSvc(DELETE_ID);
	 tran.setUserParams(params);
	 tran.open("fs", "fs", "/common.do");
}

/*
  ��� : ������� ��,��,�� ���ý� ��ȭ
*/   
var code_name;
function setConslCd(name, obj, brcode)
{
	 code_name = name;
	 var sUserParams = "lcd=" +brcode +"&etc_1="+obj;
	
	 var tran = new Trans();    
	 tran.setSvc(sServiceID);
	 tran.setUserParams(sUserParams); 
	 tran.open("", "", "/common.do"); 
}

/*
  ��� : check ���ڸ� �Է�������
*/ 
 function f_key(tar)
 {
 	if("1" == tar)
 	{
 		var sLen = checkBytes(fDetail.req_consl_desc.value);
	  	fDetail.inbyte_1.value = sLen;
 	}
 	else
 	{
 		var sLen = checkBytes(fDetail.answ_consl_desc.value);
	  	fDetail.inbyte_2.value = sLen;
 	}
 }

 /*
  ��� :  �ѱ�(2Byte), ����,����(1Byte)�� ���� ���ڿ���
      ���� ����Ʈ���� �����ϴ� �Լ�
*/
 function checkBytes(expression)
 {
  var VLength=0;
  var temp = expression;
  var EscTemp;
  if(temp!="" & temp !=null)
  {
  	for(var i=0;i<temp.length;i++) 
  	{
    	if (temp.charAt(i)!=escape(temp.charAt(i)))  
    	{
     		EscTemp=escape(temp.charAt(i));
     		if (EscTemp.length>=6)
      		VLength+=2;
     		else
      		VLength+=1;
    	}
    	else
     	VLength+=1;
   	}
  }
  return VLength;
 }

/**
 *	�� �̵�
 **/
function Tab_onclick(index)
{
	for( var i = 0; i < divTab.length; i++ )
	{
		divTab[i].style.display = "none";
	}
	divTab[index].style.display = "";
	
	if(index == 1)
	{
		mode = "1";
		fs.btnSave.disabled = true;
	}
	else if(index == 0)
	{
		mode = "0";
		getMonth('');
		top.ifmSubMain.callNote();
	}
}

/********************
* �ݹ�
********************/
function callback(sServiceID)
{
	//alert(sServiceID + "==="+ mode + "==="+ sServiceIDs);
	switch (sServiceID)
	{
		case BUSI_SELECT:
			//alert("��ȸ�Ͽ����ϴ�.");
		break;
		
		case SELECT_ID:
			gsXaFlag = "I";
			setMode("gsXaFlag");
		break;
		
		case INSERT_ID:
			if("1" == mode)
			{
				if (DataSet.getParam(INSERT_ID, 1, 0, "SUCCESS_COUNT") > 0)
				{
					opener.queryList();
					self.close();
				}
			}else if("0" == mode)
			{
				if (DataSet.getParam(sServiceIDs, 1, 0, "SUCCESS_COUNT") > 0)
				{
					divPlan.style.display="none";
					getMonth('');
					top.ifmSubMain.callNote();
				}
			}
		break;
		
		case UPDATE_ID:
			if("1" == mode)
			{
				if (DataSet.getParam(UPDATE_ID, 1, 0, "SUCCESS_COUNT") > 0)
				{
					opener.queryList();
					self.close();
				}
			}else if("0" == mode)
			{
				if (DataSet.getParam(sServiceIDs, 1, 0, "SUCCESS_COUNT") > 0)
				{
					divPlan.style.display="none";
					getMonth('');
					top.ifmSubMain.callNote();
				}
			}
		break;
		
		case DELETE_ID:
			if("1" == mode)
			{
				if (DataSet.getParam(DELETE_ID, 1, 0, "SUCCESS_COUNT") > 0)
				{
					queryList();
				}
			}else if("0" == mode)
			{
				if (DataSet.getParam(sServiceIDs, 1, 0, "SUCCESS_COUNT") > 0)
				{
					divPlan.style.display="none";
					getMonth('');
					top.ifmSubMain.callNote();
				}
			}
		break;
		
		default:		
		break;
	}
}