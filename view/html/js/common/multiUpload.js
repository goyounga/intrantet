/**
 * 초기화
 */
function init()
{
	showUploadForm();
}

/**
 * 업로드 실행
 * path : global.properties에 정해준 업로드 경로명
 * foldernm : 다운받을 폴더 지정
 */
function upload(path, foldernm, userid, img_link)
{
	showwait("처리중입니다");
	
	fUpload.file_path.value = path;
	fUpload.folder_name.value = typeof foldernm == "undefined" ? "" : foldernm; //파라미터 주지 않을 경우 빈값
	fUpload.userid.value = typeof userid == "undefined" ? "" : userid; 			//파라미터 주지 않을 경우 빈값
	fUpload.img_link.value = typeof img_link == "undefined" ? "" : img_link; 	//파라미터 주지 않을 경우 빈값
	fUpload.submit();
}

/**
 * Callback
 * filename : 업로드된 실제 파일명
 * newfilename : 업로드 시 변경된 파일명
 */
function callback(filename, newfilename)
{
	parent.setFileName(filename, newfilename);
}

/**
 * Upload Form 보이기
 * cnt : File Input Box 갯수
 */
function showUploadForm(cnt)
{
	makeUploadForm(typeof cnt == "undefined" ? 1 : cnt);
}

/**
 * Upload Form 만들기
 * cnt : File Input Box 갯수
 */
function makeUploadForm(cnt)
{
	var i = 0;
	var sb = new StringBuffer();

	sb.append("<table id=tblUpload border=0 cellpadding=1 cellspacing=1 width=100%>");
	sb.append("</table>");

	document.getElementById("divUploadForm").innerHTML = sb.toString();
	
	while(i < cnt)
	{
		addFileBox();

		i ++;
	}
}

/**
 * File Input Box 추가
 */
function addFileBox()
{
	var cnt = 0;
	
	//아무것도 정의되지 않았을 경우
	if(typeof document.all.trUpload == "undefined")
	{
		cnt = 0;
	}
	//하나만 정의되었을 경우
	else if (typeof document.all.trUpload.length == "undefined")
	{
		cnt = 1;
	}
	//두 개 이상 정의되었을 경우
	else
	{
		cnt = document.all.trUpload.length;
	}
	
	var objTbody = document.createElement("tbody");
	document.getElementById("tblUpload").appendChild(objTbody);
	
	var objTr = document.createElement("tr");
	objTr.setAttribute("id", "trUpload");
	objTbody.appendChild(objTr);
	
	var objTd = document.createElement("td");
	objTr.appendChild(objTd);
	
	var fileBox = document.createElement("input");
	fileBox.setAttribute("type", "file");	
	fileBox.setAttribute("name", "_UPLOAD_FILES[" + cnt + "]");
	fileBox.style.width = "100%";
	objTd.appendChild(fileBox);
	
	//name 속성은 alert를 찍어도 나타나지 않지만 적용된것임!!!
	//alert(document.getElementById("divUploadForm").innerHTML);
}

/**
 * File Input Box 제거
 * 마지막에 그린 Input Box 부터 삭제한다.
 */
function removeFileBox()
{
	var trUpload = document.all.trUpload;
	
	if(trUpload.length > 1)
	{
		var fileBox = trUpload[trUpload.length - 1];
		fileBox.parentNode.removeChild(fileBox);
	}
}

/**
 * File Input Box Disabled 설정
 * val : true 비활성화, false 활성화
 */
function setDisabled(val)
{
	var len = fUpload.elements.length;
	
	for(var i = 0 ; i < len ; i++)
	{
		//File Input Box 만 설정한다.
		if(fUpload.elements[i].type == "file")
		{
			fUpload.elements[i].disabled = val;
		}
	}
}

/**
 * 업로드할 파일이 있는지 체크
 * return result : 파일이 있으면 true 없으면 false 리턴
 */
function existsUploadFile()
{
	var len = fUpload.elements.length;
	var result = false;
	
	for(var i = 0 ; i < len ; i++)
	{
		//File Input Box 만 설정한다.
		if(fUpload.elements[i].type == "file" && fUpload.elements[i].value != "")
		{
			result = true;
					
			break;
		}
	}
	
	return result;
}

/**
 * 배경색 설정 (Editor에서 사용)
 */
function setBgColor(color)
{
	document.body.style.backgroundColor = color;
}