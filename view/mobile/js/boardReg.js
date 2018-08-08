
function init(mode, cnt, seq){
	if(mode != "saveContent" && mode != "updateContent") return;
	var fObj = document.getElementById("f");
	if (cnt == '1') {
		if(mode == "saveContent") fObj.board_seq.value = fObj.reg_board_seq.value;
		fObj.action = "boardDtl.jsp";
		fObj.submit();
	}
	else{
		return alert('�����߽��ϴ�. �����ڿ��� ���� �ٶ��ϴ�.');
	}
}

function cancelReg(){
	
	if(!confirm("����Ͻðڽ��ϱ�?")) return;
	
	var fObj = document.getElementById("f");
	if(fObj.mode.value.indexOf("updateContent") > -1){
		fObj.action = "board.jsp";
		fObj.submit();
	}
	else{
		fObj.action = "boardDtl.jsp";
		fObj.submit();
	}
}

function saveContent(){
	var fObj = document.getElementById("f");
	if(fObj.board_sbjt.value == "" || fObj.board_sbjt.value == null){
		return alert("������ �Է��ϼ���.");
	}
	if(fObj.board_cont.value == "" || fObj.board_cont.value == null){
		return alert("������ �Է��ϼ���.");
	}
	if(fObj.mode.value == "new"){
		fObj.mode.value = "saveContent";
	}else{
		fObj.mode.value = "updateContent";
	}
	fObj.action = "boardReg.jsp";
	fObj.submit();
}

function clearText(obj){
	var fObj = document.getElementById("f");
	if(fObj.board_sbjt.value.indexOf("������ �Է����ּ���.") > -1
		|| fObj.board_cont.value.indexOf("������ �Է����ּ���.") > -1){
		obj.value = "";
	}
}