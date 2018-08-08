//모니터링 tree view
function treeView(spannm){
	var obj=document.all(spannm);
	
	for(var i=0;i<obj.childNodes.length;i++){
		var cobj=obj.childNodes[i];
			if(cobj.nodeName.toLowerCase()=="img"){
			if(cobj.getAttribute("id")=="t"){
				var imgsrc=cobj.src;
				imgsrc=imgsrc.split("/");
				imgsrc=imgsrc[imgsrc.length-1];
				cobj.src=imgsrc=="folderclosed.gif" ? "/webadmin/images/folderopen.gif" : "/webadmin/images/folderclosed.gif";
			}
		}
		if(cobj.nodeName.toLowerCase()=="span"){
			var displ=cobj.style.display;
			if(displ=="none") displ="";
			else displ="none";
			cobj.style.display=displ;
		}
	}
}

//left 메뉴 이동 view
function leftview(gubun){
	if(gubun=="1"){
		document.all("monitor").style.display="";
		document.all("explorer").style.display="none";
		document.all("monitortd").style.backgroundColor="white";
		document.all("explorertd").style.backgroundColor="#E0E0E0";
	}else{
		document.all("monitor").style.display="none";
		document.all("explorer").style.display="";
		document.all("monitortd").style.backgroundColor="#E0E0E0";
		document.all("explorertd").style.backgroundColor="white";
	}
}

//goto page
function getMenu(sc){
	top.adminright.location.href=sc;
}