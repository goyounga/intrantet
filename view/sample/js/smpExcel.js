function selectMyTable2()
{
	var tran = new Trans();
	tran.setSvc("samplemytable2");
	tran.open("f","f","/common.do");
}

// Html ��� : ȭ�鿡 �׷��� Table������ �о �׷��ش�.
function makeExcelByHtml()
{
	// title
	var title = "<table><tr><td>";
	title += "<table border='1'>";
	
	for (var i=0; i<samplemytable2_title.rows.length; i++)
	{
		title += "<tr>";
		for (var j=1; j<samplemytable2_title.rows[i].cells.length; j++)
		{
			title += "<td>"+samplemytable2_title.rows[i].cells[j].innerText+"</td>";
		}
		title += "</tr>";
	}
	title += "</table>";
	
	title += "</td></tr></table>";
	
	// body
	var body = "<table><tr><td>";
	body += "<table border='1'>";
	
	for (var i=0; i<samplemytable2.rows.length; i++)
	{
		body += "<tr>";
		for (var j=1; j<samplemytable2.rows[i].cells.length; j++)
		{
			body += "<td>"+samplemytable2.rows[i].cells[j].innerText+"</td>";
		}
		body += "</tr>";
	}
	body += "</table>";
	
	body += "</td></tr></table>";
	
	fExcel.sHeader.value = title;
	fExcel.sContent.value = body;
	fExcel.submit();
}

function makeExcelByJxl()
{
	Excel("samplemytable2", f, getParam(), "�������");
}

function makeMyText()
{
	makeText("samplemytable2", f, getParam(), "�������");
}

// ���� parameter ���� �־��־�� �� ���
function getParam()
{
	var params = "column1=test";
	           
	return params;	           
}