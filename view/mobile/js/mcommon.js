
function showKywd(){
	var obj = document.getElementById("searchBox");
	if(!obj.style.display){
		obj.style.display="none";
	}
	else{
		obj.style.display="";
		document.getElementById("inputBox").focus();
	}
}


function goPage(page) {
	if(page == 0){
		clearSearch();
		page = 1;
	}
	var fObj = document.getElementById("f");
	fObj._START_ROW.value = page;
	fObj.action = "board.jsp";
	fObj.submit();
}

function clearSearch(){
	document.getElementById("inputBox").value = "";
}

function querySearch(){
	var srchText = document.getElementById("inputBox");
	var fObj = document.getElementById("f");
	if(srchText.value == "" || srchText.value == null){
		return alert("검색어를 입력하세요.");
	}
	fObj._START_ROW.value = 1;
	fObj.action = "board.jsp";
	fObj.submit();
}

function goWrite(){
	var fObj = document.getElementById("f");
	fObj.mode.value = "new";
	fObj.action = "boardReg.jsp";
	fObj.submit();
}