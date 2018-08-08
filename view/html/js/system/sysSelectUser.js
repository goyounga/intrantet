var SELECT_ORG_ID = "UCSYS022S";
var SELECT_USER_ID = "UCSYS023S";

var grid1 = new comGrid(); //������
var grid2 = new comGrid(); //����ڸ���Ʈ

var codeArr="";
var nmcodeArr="";

function init()
{
	query();
}

function query()
{
	var tran = new Trans();	
	tran.setSvc(SELECT_ORG_ID);
	tran.open("fQuery", "fQuery","/common.do");
}

function userQuery()
{
	fQuery.code.selectedIndex=0;
	fQuery.code.value = "";
	var tran = new Trans();	
	tran.setSvc(SELECT_USER_ID);
	tran.open("fQuery", "fQuery","/common.do");
}



function onClickMenu(obj, idx, step)
{
	fQuery.user_name.value="";
	showDetail(SELECT_ORG_ID, idx, fQuery);		
	if(fQuery.step.value == 1){
		
		fQuery.code.value = fQuery.code.value.substr(0,2) ;
		var tran = new Trans();	
		tran.setSvc(SELECT_USER_ID);
		tran.open("fQuery", "fQuery","/common.do");
	}
	
	else if(fQuery.step.value == 2){
		showDetail(SELECT_ORG_ID, idx, fQuery);
		var tran = new Trans();	
		tran.setSvc(SELECT_USER_ID);
		tran.open("fQuery", "fQuery","/common.do");
	}
}

	
function treeClick(obj, idx)
{	
/*
	var nmcodeDel;
	var codeDel;
	
	if(obj.checked){
		showDetail(SELECT_ORG_ID,idx,fQuery);
		nmcodeArr += fQuery.nm_code.value + ",";
		codeArr += fQuery.code.value + ",";
	}else if (!obj.checked){
		showDetail(SELECT_ORG_ID,idx,fQuery);
		nmcodeDel =  nmcodeArr.split(",");
		codeDel = codeArr.split(",");
		for(i=0; i< nmcodeDel.length;i++){
			if(fQuery.nm_code.value == nmcodeDel[i]){
				nmcodeDel[i] = "";	
				nmcodeArr = nmcodeDel;			
			}
			if(fQuery.code.value == codeDel[i]){
				codeDel[i] = "";	
				codeArr = codeDel;					
			}
		}
	}
	*/
}


function showDetail_obj(obj){
	if (obj.cells[0].id == SELECT_USER_ID+"_IDX"){//�������� �׸���Ŭ����
		grid2.rowIndex = getRowIndex(obj);
		grid2.rowObj = obj;
		//DATA�� ��� �󼼺��⸦ ǥ�� ���� ��� 
		if(!comShowDetail(SELECT_USER_ID,obj,fQuery)){
					alert("ǥ�� ����");
		}
	}
	clear(fQuery);
}

/*
�߰� 
*/
function save(){
	opener.setData(fQuery.code.value, fQuery.user_name.value, fQuery.user_id.value, fQuery.nm_code.value);
	this.close();
}


/*
�ݹ�
*/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_ORG_ID:
			grid1.rowIndex = getRowIndex(obj);
			grid1.rowObj = obj;
			showDetail(SELECT_ORG_ID, grid1.rowIndex,fQuery);		
			break;
		case SELECT_USER_ID:	
			grid2.rowIndex = getRowIndex(obj);
			grid2.rowObj = obj;
			showDetail(SELECT_ORG_ID, grid2.rowIndex,fQuery);
			break;
		default:		
			break;
	}
}


//����Ű ��ȸ
function checkEnterKey()
{
	if(isEnterKey())
	{
		userQuery();
	}
}