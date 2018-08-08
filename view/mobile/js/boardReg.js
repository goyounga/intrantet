
function init(mode, cnt, seq){
	if(mode != "saveContent" && mode != "updateContent") return;
	var fObj = document.getElementById("f");
	if (cnt == '1') {
		if(mode == "saveContent") fObj.board_seq.value = fObj.reg_board_seq.value;
		fObj.action = "boardDtl.jsp";
		fObj.submit();
	}
	else{
		return alert('실패했습니다. 관리자에게 문의 바랍니다.');
	}
}

function cancelReg(){
	
	if(!confirm("취소하시겠습니까?")) return;
	
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
		return alert("제목을 입력하세요.");
	}
	if(fObj.board_cont.value == "" || fObj.board_cont.value == null){
		return alert("내용을 입력하세요.");
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
	if(fObj.board_sbjt.value.indexOf("제목을 입력해주세요.") > -1
		|| fObj.board_cont.value.indexOf("내용을 입력해주세요.") > -1){
		obj.value = "";
	}
}