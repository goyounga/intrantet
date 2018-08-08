
function init(mode, cnt){
	if(mode == "deleteBord" && cnt == "1"){
		goList();
	}
}

function openDetail(tp_seq, seq){
	var fObj = document.getElementById("f");
	fObj.board_tp_seq.value = tp_seq;
	fObj.board_seq.value = seq;
	fObj.action = "boardDtl.jsp";
	fObj.submit();
}

function goList(){
	var fObj = document.getElementById("f");
	fObj.action = "board.jsp";
	fObj.submit();
}

function goRply(){
	var fObj = document.getElementById("f");
	fObj.content.focus();
}


function saveRply(type){
	var fObj = document.getElementById("f");
	if(type == "UPDATE"){
		if(fObj.rply_seq.value == "" || fObj.rply_seq.value == null){
			return alert("변경하려는 댓글을 선택하세요.");
		}
		fObj.mode.value = "updateRply";
	}
	else{
		fObj.mode.value = "insertRply";
	}
	if(fObj.content.value == "" || fObj.content.value == null){
		return alert("댓글을 입력하세요.");
	}
	fObj.action = "boardDtl.jsp";
	fObj.submit();
}

function deleteRply(seq){
	
	if(!confirm("댓글을 삭제하시겠습니까?")) return;
	var fObj = document.getElementById("f");
	fObj.rply_seq.value = seq;
	fObj.mode.value = "deleteRply";
	fObj.action = "boardDtl.jsp";
	fObj.submit();
}

function updateRply(seq){
	var fObj = document.getElementById("f");
	fObj.rply_seq.value = seq;
	fObj.content.value =eval('fObj.cont_'+seq).value;
	document.getElementById("rply_wrt").style.display="none";
	document.getElementById("rply_upt").style.display="";
}


function cancelRply(){
	var fObj = document.getElementById("f");
	fObj.rply_seq.value = "";
	fObj.content.value = "";
	document.getElementById("rply_wrt").style.display="";
	document.getElementById("rply_upt").style.display="none";
}

function deleteBord(){
	
	if(!confirm("게시글을 삭제하시겠습니까?")) return;
	var fObj = document.getElementById("f");
	fObj.mode.value = "deleteBord";
	fObj.action = "boardDtl.jsp";
	fObj.submit();
} 

function updateBord(){
	var fObj = document.getElementById("f");
	fObj.mode.value = "updateView";
	fObj.action = "boardReg.jsp";
	fObj.submit();
}
