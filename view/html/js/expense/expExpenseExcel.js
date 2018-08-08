var EXCELEXPORT			= "EXCELEXPORT";

function Excel()
{
	var tran = new Trans();
	tran.setSvc(EXCELEXPORT);
	tran.setPageRow(9999999);
	tran.open("fQuery","fQuery","/ExpenseExcelExportAction.do");
}

function callback(serviceId)
{
	if( serviceId == EXCELEXPORT)
	{
		if(DataSet.getParam(EXCELEXPORT, 1, 0, "fileName") == "noRow")
		{
			alert("조회된 데이터가 없습니다.");
		}
		else if(typeof DataSet.getParam(EXCELEXPORT, 1, 0, "fileName") == "undefined")
		{
			alert("Excel Export Error.");
		}
		else
		{
			var filename = DataSet.getParam(EXCELEXPORT, 1, 0, "fileName") + ".xls";
			var UPLOAD_PATH = "EXCEL_DOWNLOAD_PATH";
			var UPLOAD_FOLDER_NAME = "";		
			var args = "filename=" + escape(encodeURIComponent(filename)) + "&newfilename=" + escape(encodeURIComponent(filename)) + "&delete=Y&foldername=" + UPLOAD_FOLDER_NAME + "&filepath=" + UPLOAD_PATH;
	
			iLog.location.href = "/jsp/common/downFile.jsp?" + args;
		}
	}
}