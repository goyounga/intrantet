
/**
 * 화면에서 객체의 Top 좌표를 구한다.
 * obj : 객체
 */
function getObjTop(obj)
{
	if(obj.offsetParent == document.body)
	{
		return obj.offsetTop;
	}
	else
	{
		return obj.offsetTop + getObjTop(obj.offsetParent);
	}
}

/**
 * 화면에서 객체의 Left 좌표를 구한다.
 * obj : 객체
 */
function getObjLeft(obj)
{
	if(obj.offsetParent == document.body)
	{
		return obj.offsetLeft;
	}
	else
	{
		return obj.offsetLeft + getObjLeft(obj.offsetParent);
	}
}

/**
 * 파일첨부 폼 초기화
 */
function initUploadFile()
{
	iUpload.init();

	var obj = document.getElementById("uploadFileArea");
	var objTop = getObjTop(obj);
	var objLeft = getObjLeft(obj);

	divUploadFile[0].style.top = objTop-1;
	divUploadFile[0].style.left = objLeft-(f.minus_width.value*1);
	divUploadFile[1].style.top = objTop-1;
	divUploadFile[1].style.left = objLeft-(f.minus_width.value*1);
	divUploadFile[2].style.top = objTop-1;
	divUploadFile[2].style.left = objLeft-(f.minus_width.value*1);

	//첨부파일 div 초기화
	setUploadFile("&nbsp;");
	
	//축소
	contractUploadFile();
}

/**
 * 업로드 파일명 가져오기
 * filename : 실제 파일명
 * newfilename : 새 파일명 (ex : RE_filename.zip)
 */
function setFileName(filename, newfilename)
{
	f.file_nm.value = filename;
	f.new_file_nm.value = newfilename;
	
	save(); 
}

/**
 * 첨부파일 리스트 출력
 */
function showUploadFileList()
{
	var cnt = DataSet.getTotalCount(FILE_SELECT_ID);

	var uploadFileHTML = new StringBuffer();

	uploadFileHTML.append("<table border=0 width=100%>");
	
	//var arrSeq = new Array();	//파일 변경이력 저장용

	for (var i = 0; i < cnt; i++)
	{
		var seq		= DataSet.getParam(FILE_SELECT_ID, 1, i, "file_seq");
		var filename = trim(DataSet.getParam(FILE_SELECT_ID, 1, i, "file_nm"));
		var newfilename = trim(DataSet.getParam(FILE_SELECT_ID, 1, i, "new_file_nm"));

		var arrfilename = filename.split(".");		
		
		//arrSeq.push(seq);

		uploadFileHTML.append("<tr>");
		uploadFileHTML.append("<td>");
		
		var args = "filename=" + escape(encodeURIComponent(filename)) + "&newfilename=" + escape(encodeURIComponent(newfilename)) + "&delete=NO&foldername=" + UPLOAD_FOLDER_NAME + "&filepath=" + UPLOAD_PATH;
		
		if(arrfilename.length > 1 && (trim(arrfilename[arrfilename.length - 1]).toUpperCase() == "HTML" || trim(arrfilename[arrfilename.length - 1]).toUpperCase() == "HTM"))
		{
			
			uploadFileHTML.append("<a target='iDownFile' href=\"\" onclick=\"javascript:openPopup('/jsp/common/downFile.jsp', '" + args + "' , 'down', '', '', '1000', '600', 'scrollbars=yes');\">" + filename + "</a>&nbsp;");
		}
		else
		{		
			uploadFileHTML.append("<a target='iDownFile' href=\"/jsp/common/downFile.jsp?" + args + "\">" + filename + "</a>&nbsp;");
																				
		}
		
		uploadFileHTML.append("<label onClick=\"delUploadFile_DB("+seq+", '" + newfilename + "','"+UPLOAD_FOLDER_NAME+"','"+UPLOAD_PATH+"')\" style=\"cursor:hand\">");
		uploadFileHTML.append("<font color=red>X</font></label>");

		uploadFileHTML.append("</td>");
		uploadFileHTML.append("</tr>");
	}
	
	//f.arr_uploadfileseq.value = makeParamArray(arrSeq);

	uploadFileHTML.append("</table>");
	
	//alert(uploadFileHTML.toString());
	
	setUploadFile(uploadFileHTML.toString());
}

/**
 * 첨부파일 셋팅
 * val : 첨부파일 링크 태그
 */
function setUploadFile(val)
{
	divUploadFile[2].innerHTML = val;	//파일 리스트
}

/**
 * 첨부파일 비활성화 설정
 * val : true 비활성화, false 활성화
 */
function uploadFileDisabled(val)
{
	if(val)
	{
		divUploadFile[0].style.display = "";		//파일첨부 폼
		divUploadFile[1].style.display = "none";	//iframe
		divUploadFile[2].style.display = "none";	//파일 리스트
		icoUploadFiles.style.display = "none";
		icoShowFiles.style.display = "";
	}
	else
	{
		divUploadFile[0].style.display = "none";
		divUploadFile[1].style.display = "";
		divUploadFile[2].style.display = "";
		icoUploadFiles.style.display = "";
		icoShowFiles.style.display = "none";
	}
}

/**
 * 첨부파일 삭제 쿼리 실행
 * seq : 삭제할 Row의 시퀀스
 * newfilename : 삭제할 파일명
 */
function delUploadFile_DB(seq, newfilename, foldername,filepath)
{	
	if (MessageBox("DelConfirm", "C", "") == false) return;

	f.new_file_nm.value = newfilename;

	//첨부파일 DB에서 삭제
	var tran = new Trans();
	tran.setUserParams("file_seq="+seq);
	tran.setSvc(FILE_DELETE_ID);
	tran.open("f", "f", "/common.do");
}

/**
 * 첨부파일 삭제
 * newfilename : 실제 파일명
 */
function delUploadFile(newfilename, foldername, filepath)
{
	var tran = new Trans();
	tran.setSvc(FILE_REMOVE_ID);
	tran.setMyUserParams("filename",newfilename);
	tran.setMyUserParams("foldername",foldername);
	tran.setMyUserParams("filepath",filepath);
	tran.setForwardId("commonjsp","/jsp/common/removeFile.jsp");
	tran.open("", "f", "/forward.do");
}

/**
 * 모든 첨부파일 삭제
 * 글 하나를 지울 경우 DataSet에서 업로드된 첨부파일들을 가져와서 차례대로 삭제한다.
 */
function delUploadFileAll()
{
	var sFileNm = "";
	for(var i = 0; i < DataSet.getTotalCount(FILE_SELECT_ID) ; i ++)
	{
		var ht = DataSet.getHashParam(FILE_SELECT_ID, 1, i);
		if (sFileNm != "") sFileNm+="";
		sFileNm += ht.get("new_file_nm");

	}
	delUploadFile(sFileNm,UPLOAD_FOLDER_NAME,UPLOAD_PATH);
}

/**
 * Upload 확장
 */
function expandUploadFile()
{
	//resizeUploadFile(Number(getUploadFileHeight()) + 80);
	
	resizeUploadFile(150);
}

/**
 * Upload 축소
 */
function contractUploadFile()
{
	if(typeof defaultBoxHeight == "undefined" || defaultBoxHeight == "") defaultBoxHeight = 50;
	
	resizeUploadFile(defaultBoxHeight);
}

/**
 * Upload 높이 변경
 */
var maxHeight = 400;
function resizeUploadFile(val)
{
	if(val > maxHeight) return;

	document.all.iUpload.style.height = val;

	//divUploadFile[0]은 iframe이 늘어나면서 자동으로 늘어남

	divUploadFile[1].style.height = val + 8;	//iframe
	divUploadFile[2].style.height = val + 8;	//파일 리스트
}

/**
 * Upload 높이 가져오기
 */
function getUploadFileHeight()
{
	var h = document.all.iUpload.style.height;

	//px 2 글짜를 뺀다
	return h.substring(0, h.length - 2);
}

/**
 * Upload 폼 disabled
 * val : true 비활성화 , false 활성화
 */
function uploadFormSetDisabled(val)
{
	iUpload.setDisabled(val);
}

/**
 * File Input Box 추가
 */
function addFileBox()
{
	if(uploadAvaliable())
	{
		iUpload.addFileBox();
	}
}

/**
 * File Input Box 제거
 */
function removeFileBox()
{
	if(uploadAvaliable())
	{
		iUpload.removeFileBox();
	}
}

/**
 * 사용 가능한지 체크
 * return true 사용가능 false 사용불가능
 */
function uploadAvaliable()
{
	var result = false;

	if(gsXaFlag == "U" || gsXaFlag == "A")
	{
		result = true;
	}

	return result;
}

/**
 * 아이콘 비활성화 설정
 * arr : 아이콘 배열
 * val : true 비활성화, false 활성화
 */
function iconDisabled(arr, inputStatus)
{
	for(var i = 0 ; i < arr.length ; i ++)
	{
		document.getElementById(arr[i]).disabled = inputStatus;
	}
}

/**
 * 파일 다운로드 POST 방식
 * filename : 파일명
 * newfilename : 새파일명
 * upload_folder_name : 업로드 폴더명
 * upload_path : 업로드 경로
 * isHTML : HTML 파일인 경우 팝업창으로 열어서 바로 볼 수 있도록 함
 */
function fileDownload(filename, newfilename, upload_folder_name, upload_path, isHTML)
{
	downForm.filename.value =  escape(encodeURIComponent(filename));
	downForm.newfilename.value =  escape(encodeURIComponent(newfilename));
	downForm.foldername.value = upload_folder_name;
	downForm.filepath.value = upload_path;
	
	if(isHTML)
	{
		openPopup('/jsp/common/blank.jsp', '' , 'fileDownload', '', '', '1000', '600', 'scrollbars=yes', 'POST');
		
	//	downForm.target = "fileDownload";
	}
	else
	{
	//	downForm.target = "iDownFile";
	}
	
	downForm.submit();
}