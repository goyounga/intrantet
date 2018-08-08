
function openDetail(tp_seq, seq){
	var fObj = document.getElementById("f");
	fObj.board_tp_seq.value = tp_seq;
	fObj.board_seq.value = seq;
	fObj.action = "boardDtl.jsp";
	fObj.submit();
}