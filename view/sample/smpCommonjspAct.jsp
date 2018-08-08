<%
	ucare.biz.common.actionform.ComActionForm comForm = null;
	ucare.jaf.common.CParamSet 	cParamSet 	= null;
	ucare.biz.common.bean.ComDB comDB 		= new ucare.biz.common.bean.ComDB();
	ucare.jaf.database.IQuery 	iQuery 		= null;
	ucare.jaf.database.IDataSet iDataSet 	= null;
	ucare.jaf.database.IDataSet aDataSet 	= null;
	ucare.jaf.database.IDataSet bDataSet 	= null;
	
	String reqname			= null;
	String date_from		= null;
	String date_to			= null;
	String SQL_ID			= null;
	String SQL_STATEMENT	= null;
	String tempSql			= null;
	
	int index				= 0;	// setString순서가 변경될 경우 귀찮아서
	int sumUser				= 0;
	
	try 
	{
		comForm 		= (ucare.biz.common.actionform.ComActionForm)request.getAttribute("comForm");
		cParamSet 		= comForm.getParamset();
		
		request.setCharacterEncoding("EUC-KR");
		reqname 		= request.getParameter("name");
		date_from		= cParamSet.getParam("date_from").asString();
		date_to			= cParamSet.getParam("date_to").asString();
		
		// 1. 리스트 가져오기
		SQL_ID 			= ((String)ucare.jpattern.xmlhandler.CXmlParser.getQuery("selectmytest", "query-id"));
		SQL_STATEMENT	=  (String)ucare.jpattern.xmlhandler.CXmlParser.getQuery(SQL_ID, "query-statement");
	
		ucare.jaf.common.ILogger.log.info("---------------------------------------------------");
		ucare.jaf.common.ILogger.log.info("* SQL_ID          : " + SQL_ID);
			
		iQuery = comDB.createQuery();
		iQuery.setAutoCommit(false);
		iQuery.open();
		iQuery.setSQL(SQL_STATEMENT);
		iQuery.setString(++index, date_from);
		iQuery.setString(++index, date_to);
		
		tempSql = SQL_STATEMENT;
		tempSql = ucare.jaf.common.CUtil.tradeString(tempSql, "?", "'"+date_from+"'");
		tempSql = ucare.jaf.common.CUtil.tradeString(tempSql, "?", "'"+date_to+"'");
		ucare.jaf.common.ILogger.log.info(tempSql);
		ucare.jaf.common.ILogger.log.info("---------------------------------------------------");
		
		aDataSet = new ucare.jaf.database.CDataSet();			
		aDataSet = iQuery.select().getDataSet().throwException();
		iQuery.sqlClose();
		
		// 2. 합계 구하기
		while (aDataSet.next())
		{
			if (aDataSet.getParam("name").asString().equals(reqname))
			{
				sumUser++;
			}
		}
		aDataSet.first();	// 한 번 썼을면 다시 처음으로 돌리기
		
		String[] name 	= { "samplemyjsp1_name_sum" };
		Object[] value 	= { new Integer(sumUser)	};
		
		bDataSet = new ucare.jaf.database.CDataSet();
		bDataSet.addNewRow(name, value);
	}
	catch (Exception e)
	{
		iQuery.rollback();
		ucare.jaf.common.ILogger.log.error("[smpCommonjspAct at Exception] " + e.getMessage());
	}
	finally
	{
		comDB.close();
		iQuery.close();
	}
	
	iDataSet = new ucare.jaf.database.CDataSet();

	aDataSet.setViewType("GRID");
	bDataSet.setViewType("FREE");

	String[] sKeys = {"samplemyjsp1", "samplemyjsp1_sum"};
	ucare.jaf.database.IDataSet[] sVals = {aDataSet, bDataSet};

	iDataSet.addNewRow(sKeys, sVals);

	StringBuffer datasetSb = new StringBuffer();

	try
	{
		String dataxml = ucare.jpattern.xmlhandler.CXmlDataSet.getXml(cParamSet, iDataSet);
		datasetSb.append(dataxml);
	}
	catch (Exception e)
	{
		datasetSb.delete(0,datasetSb.length());
		datasetSb.append(ucare.jpattern.xmlhandler.CXmlDataSet.errorXml(this.getClass().getName(),"9000",this.getClass().getName(),e.getMessage()));
	}

	response.setContentType("text/xml;charset=euc-kr");
	out.print(datasetSb.toString());
%>