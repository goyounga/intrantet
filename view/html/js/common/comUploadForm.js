
/**
 * ȭ�鿡�� ��ü�� Top ��ǥ�� ���Ѵ�.
 * obj : ��ü
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
 * ȭ�鿡�� ��ü�� Left ��ǥ�� ���Ѵ�.
 * obj : ��ü
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
 * ����÷�� �� �ʱ�ȭ
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

	//÷������ div �ʱ�ȭ
	setUploadFile("&nbsp;");
	
	//���
	contractUploadFile();
}

/**
 * ���ε� ���ϸ� ��������
 * filename : ���� ���ϸ�
 * newfilename : �� ���ϸ� (ex : RE_filename.zip)
 */
function setFileName(filename, newfilename)
{
	f.file_nm.value = filename;
	f.new_file_nm.value = newfilename;
	
	save(); 
}

/**
 * ÷������ ����Ʈ ���
 */
function showUploadFileList()
{
	var cnt = DataSet.getTotalCount(FILE_SELECT_ID);

	var uploadFileHTML = new StringBuffer();

	uploadFileHTML.append("<table border=0 width=100%>");
	
	//var arrSeq = new Array();	//���� �����̷� �����

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
 * ÷������ ����
 * val : ÷������ ��ũ �±�
 */
function setUploadFile(val)
{
	divUploadFile[2].innerHTML = val;	//���� ����Ʈ
}

/**
 * ÷������ ��Ȱ��ȭ ����
 * val : true ��Ȱ��ȭ, false Ȱ��ȭ
 */
function uploadFileDisabled(val)
{
	if(val)
	{
		divUploadFile[0].style.display = "";		//����÷�� ��
		divUploadFile[1].style.display = "none";	//iframe
		divUploadFile[2].style.display = "none";	//���� ����Ʈ
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
 * ÷������ ���� ���� ����
 * seq : ������ Row�� ������
 * newfilename : ������ ���ϸ�
 */
function delUploadFile_DB(seq, newfilename, foldername,filepath)
{	
	if (MessageBox("DelConfirm", "C", "") == false) return;

	f.new_file_nm.value = newfilename;

	//÷������ DB���� ����
	var tran = new Trans();
	tran.setUserParams("file_seq="+seq);
	tran.setSvc(FILE_DELETE_ID);
	tran.open("f", "f", "/common.do");
}

/**
 * ÷������ ����
 * newfilename : ���� ���ϸ�
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
 * ��� ÷������ ����
 * �� �ϳ��� ���� ��� DataSet���� ���ε�� ÷�����ϵ��� �����ͼ� ���ʴ�� �����Ѵ�.
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
 * Upload Ȯ��
 */
function expandUploadFile()
{
	//resizeUploadFile(Number(getUploadFileHeight()) + 80);
	
	resizeUploadFile(150);
}

/**
 * Upload ���
 */
function contractUploadFile()
{
	if(typeof defaultBoxHeight == "undefined" || defaultBoxHeight == "") defaultBoxHeight = 50;
	
	resizeUploadFile(defaultBoxHeight);
}

/**
 * Upload ���� ����
 */
var maxHeight = 400;
function resizeUploadFile(val)
{
	if(val > maxHeight) return;

	document.all.iUpload.style.height = val;

	//divUploadFile[0]�� iframe�� �þ�鼭 �ڵ����� �þ

	divUploadFile[1].style.height = val + 8;	//iframe
	divUploadFile[2].style.height = val + 8;	//���� ����Ʈ
}

/**
 * Upload ���� ��������
 */
function getUploadFileHeight()
{
	var h = document.all.iUpload.style.height;

	//px 2 ��¥�� ����
	return h.substring(0, h.length - 2);
}

/**
 * Upload �� disabled
 * val : true ��Ȱ��ȭ , false Ȱ��ȭ
 */
function uploadFormSetDisabled(val)
{
	iUpload.setDisabled(val);
}

/**
 * File Input Box �߰�
 */
function addFileBox()
{
	if(uploadAvaliable())
	{
		iUpload.addFileBox();
	}
}

/**
 * File Input Box ����
 */
function removeFileBox()
{
	if(uploadAvaliable())
	{
		iUpload.removeFileBox();
	}
}

/**
 * ��� �������� üũ
 * return true ��밡�� false ���Ұ���
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
 * ������ ��Ȱ��ȭ ����
 * arr : ������ �迭
 * val : true ��Ȱ��ȭ, false Ȱ��ȭ
 */
function iconDisabled(arr, inputStatus)
{
	for(var i = 0 ; i < arr.length ; i ++)
	{
		document.getElementById(arr[i]).disabled = inputStatus;
	}
}

/**
 * ���� �ٿ�ε� POST ���
 * filename : ���ϸ�
 * newfilename : �����ϸ�
 * upload_folder_name : ���ε� ������
 * upload_path : ���ε� ���
 * isHTML : HTML ������ ��� �˾�â���� ��� �ٷ� �� �� �ֵ��� ��
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