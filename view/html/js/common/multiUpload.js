/**
 * �ʱ�ȭ
 */
function init()
{
	showUploadForm();
}

/**
 * ���ε� ����
 * path : global.properties�� ������ ���ε� ��θ�
 * foldernm : �ٿ���� ���� ����
 */
function upload(path, foldernm, userid, img_link)
{
	showwait("ó�����Դϴ�");
	
	fUpload.file_path.value = path;
	fUpload.folder_name.value = typeof foldernm == "undefined" ? "" : foldernm; //�Ķ���� ���� ���� ��� ��
	fUpload.userid.value = typeof userid == "undefined" ? "" : userid; 			//�Ķ���� ���� ���� ��� ��
	fUpload.img_link.value = typeof img_link == "undefined" ? "" : img_link; 	//�Ķ���� ���� ���� ��� ��
	fUpload.submit();
}

/**
 * Callback
 * filename : ���ε�� ���� ���ϸ�
 * newfilename : ���ε� �� ����� ���ϸ�
 */
function callback(filename, newfilename)
{
	parent.setFileName(filename, newfilename);
}

/**
 * Upload Form ���̱�
 * cnt : File Input Box ����
 */
function showUploadForm(cnt)
{
	makeUploadForm(typeof cnt == "undefined" ? 1 : cnt);
}

/**
 * Upload Form �����
 * cnt : File Input Box ����
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
 * File Input Box �߰�
 */
function addFileBox()
{
	var cnt = 0;
	
	//�ƹ��͵� ���ǵ��� �ʾ��� ���
	if(typeof document.all.trUpload == "undefined")
	{
		cnt = 0;
	}
	//�ϳ��� ���ǵǾ��� ���
	else if (typeof document.all.trUpload.length == "undefined")
	{
		cnt = 1;
	}
	//�� �� �̻� ���ǵǾ��� ���
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
	
	//name �Ӽ��� alert�� �� ��Ÿ���� ������ ����Ȱ���!!!
	//alert(document.getElementById("divUploadForm").innerHTML);
}

/**
 * File Input Box ����
 * �������� �׸� Input Box ���� �����Ѵ�.
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
 * File Input Box Disabled ����
 * val : true ��Ȱ��ȭ, false Ȱ��ȭ
 */
function setDisabled(val)
{
	var len = fUpload.elements.length;
	
	for(var i = 0 ; i < len ; i++)
	{
		//File Input Box �� �����Ѵ�.
		if(fUpload.elements[i].type == "file")
		{
			fUpload.elements[i].disabled = val;
		}
	}
}

/**
 * ���ε��� ������ �ִ��� üũ
 * return result : ������ ������ true ������ false ����
 */
function existsUploadFile()
{
	var len = fUpload.elements.length;
	var result = false;
	
	for(var i = 0 ; i < len ; i++)
	{
		//File Input Box �� �����Ѵ�.
		if(fUpload.elements[i].type == "file" && fUpload.elements[i].value != "")
		{
			result = true;
					
			break;
		}
	}
	
	return result;
}

/**
 * ���� ���� (Editor���� ���)
 */
function setBgColor(color)
{
	document.body.style.backgroundColor = color;
}