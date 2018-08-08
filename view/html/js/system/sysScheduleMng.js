var SELECT_ID = "UCSYS051S";
var INSERT_ID = "UCSYS051I";
var DELETE_ID = "UCSYS051D";
var UPDATE_ID = "UCSYS051U";
var SELECT_ID_BRTH = "UCSYS052S";
var SELECT_DEPT_C = "UCSYS053S";


var gsXaFlag = "";
var gsBXaFlag = "";
var gCurDay = "";
var day = "" ;
var CURINDEX = "";
var cntrcd = "";
var showmode = "";


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

	if((f.pos_cd.value=="05")	//����
	|| (f.pos_cd.value=="06")	//����
	|| (f.pos_cd.value=="07")	//����
	|| (f.pos_cd.value=="08")	//����
	|| (f.pos_cd.value=="09")	//���̻�
	|| ((f.org_dept_cd.value=="04" && parent.f.nex_dept_cd.value=="01"))	//���������� - �濵������-������ : �ϴ� hard cording
	){
		document.getElementById("ScheduleNotice").style.display = "";
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
	trans.setSvc(SELECT_ID + "," + SELECT_ID_BRTH);
	//trans.setSvc(SELECT_ID);
	trans.setCallBack("showCalendar");
	trans.setPageRow(300);
	trans.open("fQuery","f","/common.do");
	setMode("C");
}

/**
 * ����� ����
 * day    : �ش� ��¥
 * index  : �޷� ����
 * return : ����� ����
 */
function getAnniversarySchedule( day, index )
{
	try{

	var aArry = DataSet.getParamArrHash(SELECT_ID_BRTH, DataSet.getCurPage(SELECT_ID_BRTH));
	var sHTML = "";

			for (var j=0; j < aArry.length; j++)
			{
				var ht2 = aArry[j];

				if (day == ht2.get("bse_dt"))
				{
					var brthnm = ht2.get("brthnm");
					var no     = ht2.get("no");
					var shortBrthNm = (brthnm.length > 10) ? brthnm.substr(0,9)+"..." : brthnm;
					//sHTML += "<span><font style='font-weight:normal;font-color:black'>"+brthnm+"</font></span>&nbsp;<br>";

					//sHTML += "<span onclick=showDetail_obj('ANNIV',"+index+",'"+day+"','"+encodeURIComponent(brthnm)+"') style='font-weight:bold;font-color:red' style=cursor:hand title="+(brthnm+" ���ϵ帳�ϴ�.")+">";
					//sHTML +=     "<font id='chgtitle' onmouseover=boldChgOver(this,'OVER') onmouseout=boldChgOut(this,'OUT') style='font-weight:normal;font-color:black'>" + shortBrthNm + "</font></span>&nbsp;<br>";

					if((f.pos_cd.value=="05")	//����
					|| (f.pos_cd.value=="06")	//����
					|| (f.pos_cd.value=="07")	//����
					|| (f.pos_cd.value=="08")	//����
					|| (f.pos_cd.value=="09")	//���̻�
					|| ((f.org_dept_cd.value=="04" && parent.f.nex_dept_cd.value=="01"))	//���������� - �濵������-������ : �ϴ� hard cording
					){
						if(no=="1")	//�����
						{
							sHTML += "<span onclick=showDetail_obj('ANNIV',"+index+",'"+day+"','"+encodeURIComponent(brthnm)+"') style='font-weight:bold;font-color:red' style=cursor:hand title="+(brthnm+" ���ϵ帳�ϴ�.")+">";
							sHTML +=     "<font id='chgtitle' onmouseover=boldChgOver(this,'OVER') onmouseout=boldChgOut(this,'OUT') style='font-weight:normal;font-color:black' color='black'>" + shortBrthNm + "</font></span>&nbsp;<br>";
						}
						else		//�ް���ü
						{
							sHTML +=     "<font id='chgtitle' style='font-weight:normal;font-color:blue;cursor:arrow' color='#3070E7'>" + shortBrthNm + "</font>&nbsp;<br>";
						}
					}
					else
					{
						if(no=="1")	//�����
						{
							sHTML += "<span onclick=showDetail_obj('ANNIV',"+index+",'"+day+"','"+encodeURIComponent(brthnm)+"') style='font-weight:bold;font-color:red' style=cursor:hand title="+(brthnm+" ���ϵ帳�ϴ�.")+">";
							sHTML +=     "<font id='chgtitle' onmouseover=boldChgOver(this,'OVER') onmouseout=boldChgOut(this,'OUT') style='font-weight:normal;font-color:black'>" + shortBrthNm + "</font></span>&nbsp;<br>";
						}
						else		//�ް�
						{
							var user_id = ht2.get("user_id");
							if(f.userid.value==user_id)	//�ڽŸ�
							{
								sHTML +=     "<font id='chgtitle' style='font-weight:normal;font-color:blue;cursor:arrow' color='#3070E7'>" + shortBrthNm + "</font>&nbsp;<br>";
							}
						}						
					}
				}
			}//for

	return sHTML;
	}catch(e){alert(e.description);}
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

		var hldy_f  = ht.get("hldy_f");
		var hldy_nm = ht.get("hldy_nm");
//		var brth 	= ht.get("brth");	//��������

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
			if ( hldy_f == "N" )
			{
				obj[index].rows[0].cells[0].className = "cal2";
				obj[index].rows[0].cells[1].className = "cal1";
				if(hldy_nm != "")
				{
					obj[index].rows[0].cells[1].innerText = hldy_nm;
				}
			}
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

			if ( hldy_f == "N" )
			{
				obj[index].rows[0].cells[0].className = "cal3";
				obj[index].rows[0].cells[1].className = "cal1";
				if(hldy_nm != "")
				{
					obj[index].rows[0].cells[1].innerText = hldy_nm;
				}
			}
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
			if(hldy_nm != "")
			{
				obj[index].rows[0].cells[1].innerText = hldy_nm;
			}
		}
		sHTML += getAnniversarySchedule( day, index );	//����� ä���

		//�ش��Ͽ� ������ ������ ȭ�鿡 �׷��ش�.
		if (ht.get("cen_sch_sbjt") != "")
		{
			for (var j=i; j < aArry.length; j++)
			{
				var ht2 = aArry[j];
				//�ش��Ͽ� ������ �����ϸ�
				if (day == ht2.get("date"))
				{
					//���������� 10���� �̻��̸� 9���ڸ� �����ش�.
					if(ht2.get("cen_sch_sbjt").length > 10)
					{
						var changeTitle	= ht2.get("cen_sch_sbjt").substr(0,9);
						changeTitle = changeTitle + "...";
					}
					else changeTitle	= ht2.get("cen_sch_sbjt");

					if(changeTitle != "")

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
		}

		//�ش������� �������� span���� �Է��� ���� ȭ�鿡 �ѷ��ش�.
		obj[index].rows[1].cells[0].innerHTML = sHTML;

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
		try {eval("calDay_"+idx).style.fontWeight="bold";} catch (e) {}
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
		try {eval("calDay_"+idx).style.fontWeight="normal";} catch (e) {}
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
function showDetail_obj(index, divindex, arg3, arg4)
{
	var top;
	var left;

	//ȭ���� 4����Ͽ� divPlan�� ������ ������ǥ�� divPlan�� �׷��ش�.
	if(divindex < 21)
	{
		if(divindex % 7 < 4)
		{
			//������
			top = 200;
			left = 100;
		}
		else
		{
			//������
			top = 200;
			left = 450;
		}
	}
	else
	{
		if(divindex % 7 < 4)
		{
			//�����Ʒ�
			top = 500;
			left = 100;
		}
		else
		{
			//�����Ʒ�
			top = 500;
			left = 450;
		}
	}
	divPlan.style.top  = top;
	divPlan.style.left = left;

	if( index=="ANNIV" )
	{
		showmode = "U";		//showDetail_objȣ���  showPlan�� Ÿ�⶧���� showmode�� ó�����ش�... ������ �ļ��� ó���س��� ����.... ���� �̷����� ��������
		setMode("X");
		divPlan.style.display = "";
		clear(f);
		f.date.value          = dateMask(arg3);
		f.cen_sch_sbjt.value  = decodeURIComponent(arg4);
		f.cen_sch_cont.value  = decodeURIComponent(arg4) + " ���ϵ帳�ϴ�.";
		f.cen_sch_sbjt.readOnly  = true;
		f.cen_sch_cont.readOnly  = true;
	}
	else
	{
		gsXaFlag = "U";
		gsBXaFlag = "U";
		showmode = "U";
		setMode(gsXaFlag);
		divPlan.style.display="";
		CURINDEX = index;

		f.cen_sch_sbjt.readOnly  = false;
		f.cen_sch_cont.readOnly  = false;

		//ȭ�鿡 �󼼳����� �ѷ��ش�.
		showDetail(SELECT_ID, index, f);

		chgDept_cd(DataSet.getParam(SELECT_ID, 1, index, "dept_cd"));

	}
}

/**
  * �μ��ڵ���
  */
function chgDept_cd(dept_cd)
{
	var trans = new Trans();
	trans.setSvc(SELECT_DEPT_C);
	trans.setPageRow(9999);
	trans.setAsync(false);
	trans.setWait(false);
	trans.setMyUserParams("id",   "dept_cd");
	trans.setMyUserParams("etc1",   f.nex_dept_cd.value);
	trans.setCallBack("callbackChgDept_cd('"+dept_cd+"')");
	trans.open("","f","/common.do");
}

/**
  * �μ��ڵ��� �ݹ�
  */
function callbackChgDept_cd(dept_cd)
{
     if(dept_cd == "undefined") dept_cd = "";

	 f.dept_cd.value = dept_cd;
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
	if ( trim(obj[index].rows[0].cells[0].innerText) == "" )
	{
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
			top = 200;
			left = 100;
		}
		else
		{
			//������
			top = 200;
			left = 450;
		}
	}
	else
	{
		if(index % 7 < 4)
		{
			//�����Ʒ�
			top = 500;
			left = 100;
		}
		else
		{
			//�����Ʒ�
			top = 500;
			left = 450;
		}
	}
	divPlan.style.top  = top;
	divPlan.style.left = left;

	//���� Ŭ���� �׸����� ��¥
	f.date.value = day.substr(0,4) + "-" + day.substr(4,2) + "-" + obj[index].rows[0].cells[0].innerText;

	if (gsXaFlag == "U")
	{
		gsBXaFlag = "U";
	}
	gsXaFlag = "A";
	setMode(gsXaFlag);
	f.cen_sch_sbjt.readOnly  = false;
	f.cen_sch_cont.readOnly  = false;
	f.cen_sch_sbjt.focus();
	divPlan.style.display = "";
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
	var sServiceID;
	if (gsXaFlag == "A") sServiceID = INSERT_ID;
	else sServiceID	= UPDATE_ID;

	var tran = new Trans();
	tran.setUserParams(sParam);
	tran.setSvc(sServiceID);
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
		var tran = new Trans();
		tran.setUserParams("cen_sch_id="+cen_sch_id);
		tran.setSvc(DELETE_ID);
		tran.open("","f","/common.do");
	}
}

/**
  * �ݱ��ư Ŭ���� ȣ���Ѵ�.
  * ȭ�鿡 �������� divPlan�� �����.
  */
function closePlan()
{
	divPlan.style.display="none";
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

	var temp = f.date.value;
	clear(f);

	f.date.value = temp;
	f.cen_sch_sbjt.focus();
}

function calPrint()
{
	divbutton.style.display = "none";
	window.print();
	divbutton.style.display = "";
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
		f.date.value = fQuery.year.value+"-"+fQuery.month.value+"-"+document.all[SELECT_ID][CURINDEX].rows[0].cells[0].innerText;
		setMode(gsBXaFlag);
	}
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
			break;
		case "X":
			if (f.btnAdd)  		f.btnAdd.disabled 	 = true;
			if (f.btnSave)  	f.btnSave.disabled 	 = true;
			if (f.btnDel)  		f.btnDel.disabled 	 = true;
			if (f.btnClose)  	f.btnClose.disabled  = false;
			if (f.btnCancel)  	f.btnCancel.disabled = true;
			break;
		default:
			break;
	}
}


/**
  * callback()
  */
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_ID:
			gsXaFlag = "I";
			setMode("gsXaFlag");
			break;
		case UPDATE_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				divPlan.style.display="none";
				getMonth('');
				//top.ifmSubMain.callNote();
			}
			break;
		case INSERT_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				divPlan.style.display="none";
				getMonth('');
				//top.ifmSubMain.callNote();
			}
			break;
		case DELETE_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				divPlan.style.display="none";
				getMonth('');
				//top.ifmSubMain.callNote();
			}
			break;
		default:
			break;
	}
}

/**
  * �ݱ�
  */
function winClose()
{
	parent.window.close();
}


/**
  * �μ��ڵ���ȸ
  **/
function chgDept()
{
	var trans = new Trans();
	trans.setSvc(SELECT_DEPT_C);
	trans.setPageRow(9999);
	trans.setAsync(false);
	trans.setWait(false);
	trans.setMyUserParams("id",   "dept_cd");
	trans.setMyUserParams("etc1",   fQuery.nex_dept_cd.value);
	trans.setCallBack("callbackChgDept");
	trans.open("","fQuery","/common.do");
}

/**
  * �μ��ڵ���ȸ �ݹ�
  **/
function callbackChgDept()
{
	getMonth('');
}

