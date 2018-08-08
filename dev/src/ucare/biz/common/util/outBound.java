package ucare.biz.common.util;

import java.util.*;
import java.io.*;
import java.sql.*;

import ucare.jpattern.common.actionform.ComActionForm;
import ucare.jpattern.common.bean.ComDB;
import ucare.jpattern.xmlhandler.CXmlParser;

import ucare.jaf.common.CParamSet;
import ucare.jaf.common.ILogger;
import ucare.jaf.database.CDataSet;
import ucare.jaf.database.IDataSet;
import ucare.jaf.common.CUtil;
import ucare.jaf.common.CIni;
import ucare.jaf.database.IQuery;
import ucare.jaf.exception.CSQLException;

import ucare.biz.common.util.*;

public class outBound implements ILogger{

	private outBound(){}
	
	public static IQuery db_connection(IQuery iQuery) throws Exception {
		ComDB 	comDB 				= new ComDB();
		
		try {
			iQuery = comDB.createQuery();
			iQuery.setAutoCommit(false);
			iQuery.open();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println ("[Exception] " + e.getMessage());
		}

		return iQuery;
	}
	
	public static Integer putAtclVrfyData(ComActionForm comForm, IQuery iQuery) throws Exception {
		CParamSet cParamSet		= comForm.getParamset();
		IDataSet aDataSet 			= null;
		IDataSet rDataSet				= null;

		String serviceid=cParamSet.getParam("_SERVICE_ID").asString();
		String SQL_ID					= null;
		String SQL_STATEMENT	= null;
		String tempSql				= null;
		int index							= 0;
		Integer li_success_cnt		= null;

		try{
			SQL_ID 				= ((String)CXmlParser.getQuery(serviceid, "query-id")).toUpperCase();
			SQL_STATEMENT	=  (String)CXmlParser.getQuery(SQL_ID, "query-statement");
			
			iQuery.setSQL(SQL_STATEMENT);

			index = 0;
			iQuery.setString(++index, cParamSet.getParam("atcl_addr_f").asString());
			iQuery.setString(++index, cParamSet.getParam("addr_cf_rmk").asString());
			iQuery.setString(++index, cParamSet.getParam("atcl_price_f").asString());
			iQuery.setString(++index, cParamSet.getParam("prc_cf_rmk").asString());
			iQuery.setString(++index, cParamSet.getParam("pss_k_nm").asString());
			iQuery.setString(++index, cParamSet.getParam("pss_cf_f").asString());
			iQuery.setString(++index, cParamSet.getParam("pss_k_vld_rmk").asString());
			iQuery.setString(++index, cParamSet.getParam("user_id").asString());
			iQuery.setString(++index, cParamSet.getParam("user_id").asString());
			iQuery.setString(++index, cParamSet.getParam("consent_f").asString());
			iQuery.setString(++index, cParamSet.getParam("info_agm_rmk").asString());
			iQuery.setString(++index, cParamSet.getParam("rslt_cd").asString());
			iQuery.setString(++index, cParamSet.getParam("atcl_no").asString());
			
			tempSql = SQL_STATEMENT;
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("atcl_addr_f").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("addr_cf_rmk").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("atcl_price_f").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("prc_cf_rmk").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("pss_k_nm").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("pss_cf_f").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("pss_k_vld_rmk").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("user_id").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("user_id").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("consent_f").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("info_agm_rmk").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("rslt_cd").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("atcl_no").asString()+"'");
			
			System.out.println("=========================================================");
			System.out.println(tempSql);
			System.out.println("=========================================================");
			
			li_success_cnt = iQuery.exec().getINT().throwException().toInteger();
			
			aDataSet = new CDataSet();
			aDataSet.addNewRow("SUCCESS_COUNT", li_success_cnt.toString());
		}
		catch(Exception ex) {
			iQuery.rollback();
			ex.printStackTrace();
			System.out.println ("[Exception] " + ex.getMessage());
		} 

		return li_success_cnt;
	}

	public static Integer putPerAgreeData(ComActionForm comForm, IQuery iQuery) throws Exception {
		CParamSet cParamSet		= comForm.getParamset();
		IDataSet aDataSet 			= null;
		IDataSet rDataSet				= null;

		String serviceid=cParamSet.getParam("_SERVICE_ID").asString();
		String SQL_ID					= null;
		String SQL_STATEMENT	= null;
		String tempSql				= null;
		int index							= 0;
		Integer li_success_cnt		= null;

		try{
			SQL_ID 				= ((String)CXmlParser.getQuery(serviceid, "query-id")).toUpperCase();
			SQL_STATEMENT	=  (String)CXmlParser.getQuery(SQL_ID, "query-statement");
			
			iQuery.setSQL(SQL_STATEMENT);

			index = 0;
			iQuery.setString(++index, cParamSet.getParam("msg_check").asString());
			iQuery.setString(++index, cParamSet.getParam("info_agm_rmk").asString());
			iQuery.setString(++index, cParamSet.getParam("user_id").asString());
			iQuery.setString(++index, cParamSet.getParam("rslt_cd").asString());
			iQuery.setString(++index, cParamSet.getParam("atcl_no").asString());
			
			tempSql = SQL_STATEMENT;
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("msg_check").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("info_agm_rmk").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("user_id").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("rslt_cd").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("atcl_no").asString()+"'");
			
			System.out.println("=========================================================");
			System.out.println(tempSql);
			System.out.println("=========================================================");
			
			li_success_cnt = iQuery.exec().getINT().throwException().toInteger();
			
			aDataSet = new CDataSet();
			aDataSet.addNewRow("SUCCESS_COUNT", li_success_cnt.toString());
		}
		catch(Exception ex) {
			iQuery.rollback();
			ex.printStackTrace();
			System.out.println ("[Exception] " + ex.getMessage());
		} 

		return li_success_cnt;
	}

	public static Integer putRgnDocConfirmData(ComActionForm comForm, IQuery iQuery) throws Exception {
		CParamSet cParamSet		= comForm.getParamset();
		IDataSet aDataSet 			= null;
		IDataSet rDataSet				= null;

		String serviceid=cParamSet.getParam("_SERVICE_ID").asString();
		String SQL_ID					= null;
		String SQL_STATEMENT	= null;
		String tempSql				= null;
		int index							= 0;
		Integer li_success_cnt		= null;

		try{
			SQL_ID 				= ((String)CXmlParser.getQuery(serviceid, "query-id")).toUpperCase();
			SQL_STATEMENT	=  (String)CXmlParser.getQuery(SQL_ID, "query-statement");
			
			iQuery.setSQL(SQL_STATEMENT);
			
			index = 0;
			iQuery.setString(++index, cParamSet.getParam("pss_k_cf_f").asString());
			iQuery.setString(++index, cParamSet.getParam("pss_k_cf_cmnt").asString());
			iQuery.setString(++index, cParamSet.getParam("rslt_cd").asString());
			iQuery.setString(++index, cParamSet.getParam("pss_cf_f").asString());
			iQuery.setString(++index, cParamSet.getParam("pss_k_vld_rmk").asString());
			iQuery.setString(++index, cParamSet.getParam("atcl_no").asString());
			iQuery.setString(++index, cParamSet.getParam("user_id").asString());
			
			tempSql = SQL_STATEMENT;
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("pss_k_cf_f").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("pss_k_cf_cmnt").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("rslt_cd").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("pss_cf_f").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("pss_k_vld_rmk").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("atcl_no").asString()+"'");
			tempSql = CUtil.tradeString(tempSql, "?", "'"+cParamSet.getParam("user_id").asString()+"'");
			
			System.out.println("=========================================================");
			System.out.println(tempSql);
			System.out.println("=========================================================");
			
			li_success_cnt = iQuery.exec().getINT().throwException().toInteger();
			
			aDataSet = new CDataSet();
			aDataSet.addNewRow("SUCCESS_COUNT", li_success_cnt.toString());
		}
		catch(Exception ex) {
			iQuery.rollback();
			ex.printStackTrace();
			System.out.println ("[Exception] " + ex.getMessage());
		} 

		return li_success_cnt;
	}
}