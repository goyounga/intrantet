package ucare.biz.common.util;

import java.io.*;
import java.net.Socket;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;
import ucare.biz.common.bean.*;

//import java.text.DecimalFormat;//import javax.net.ssl.HostnameVerifier;
//import javax.net.ssl.HttpsURLConnection;
//import javax.net.ssl.SSLSession;

//import java.text.SimpleDateFormat;
//import java.util.Calendar;
//import java.util.StringTokenizer;
import java.sql.Types;
import java.util.*;

import org.jdom.*;
import org.jdom.input.SAXBuilder;
import ucare.jpattern.common.actionform.ComActionForm;
import ucare.jpattern.common.bean.ComDB;
import ucare.jpattern.xmlhandler.CXmlParser;
import ucare.jaf.common.*;
import ucare.jaf.database.IPrepareCall;
import ucare.jaf.database.IQuery;
import ucare.jaf.database.CDataSet;
import ucare.jaf.database.IDataSet;
import ucare.jaf.exception.CUserException;

public class HostProcess implements ILogger {
   	/**
     * ������<BR>
     * @param  none 
     */
   	public HostProcess() {}
   
   	//INF001 NHN���� �Ź�������û ���� ���� �����Ѵ�.
//   	ATCL_NO	                          �Ź���ȣ	          
//   	ATCL_VRFC_STP_CD  �Ź�������û�ܰ��ڵ�	
//   	CUST_TEL_NO	               ����ȭ��ȣ	      
//   	RTRL_MBR_NM	               �߰����Ҹ�	          
//   	RTRL_MBR_TEL_NO	     �߰�������ȭ��ȣ	  
//   	SND_YMD	                         �߽�����	          
//   	SND_ST_TM	               ������۽ð�	      
//   	SND_END_TM	               �߽�����ð�	      
//   	RGN_DOC_CF_F	     ���εȮ�ο���
   		public String INCAT01(Hashtable hstArg) throws Exception{
   			ComDB  comDB  = null;
   			String result = "";
   			Hashtable hst =  null;
   			IPrepareCall	iPrepareCall = null;
   			try{   				
   				ArrayList arlArg    = (ArrayList)hstArg.get("data");			
   				comDB = new ComDB();
   				
   				iPrepareCall = comDB.createPrepareCall();   				
   				iPrepareCall.open();
   				iPrepareCall.setAutoCommit(false);
   				iPrepareCall.call("{call SP_UC_ATCL_VRFY_REQ_HST_I(?,?,?,?,?,?,?,?,?,?)}");
   				for(int i=0; i<arlArg.size(); i++){		   						   				
	   				hst = (Hashtable)arlArg.get(i);  //�̰� �׻� �ѰǸ� �´�.
	   				//�� üũ..
	   				if("".equals(CUtil.nvl((String)hst.get("atcl_no")))) 
	   					throw new Exception("atcl_no ���� �����ϴ�.");	

	   				iPrepareCall.setString(1,CUtil.nvl((String)hst.get("atcl_no")         )); //�Ź���ȣ
	   				iPrepareCall.setString(2,CUtil.nvl((String)hst.get("atcl_vrfc_stp_cd"))); //�Ź�������û�ܰ��ڵ�
	   				iPrepareCall.setString(3,CUtil.nvl((String)hst.get("cust_tel_no")     )); //����ȭ��ȣ
	   				iPrepareCall.setString(4,CUtil.nvl((String)hst.get("rltr_mbr_nm")     )); //�߰����Ҹ�
	   				iPrepareCall.setString(5,CUtil.nvl((String)hst.get("rltr_mbr_tel_no") )); //�߰�������ȭ��ȣ
	   				iPrepareCall.setString(6,CUtil.nvl((String)hst.get("snd_tm")          )); //������۽ð�
	   				iPrepareCall.setString(7,CUtil.nvl((String)hst.get("rgn_doc_cf_f")    )); //���εȮ�ο���
	   				iPrepareCall.setString(8,CUtil.nvl((String)hst.get("atcl_tp_cd")    )); //�ŷ������ڵ�
	   				iPrepareCall.registerOutParameter(9, Types.VARCHAR);
	   				iPrepareCall.registerOutParameter(10, Types.VARCHAR);	   				
	   				iPrepareCall.exec();
	   				log.debug("���:" + iPrepareCall.getString(9));
	   				log.debug("���:" + iPrepareCall.getString(10));
	   				if(!"0".equals(iPrepareCall.getString(9))){
	   					throw new Exception(iPrepareCall.getString(10));
	   				}
   				}	
   				iPrepareCall.commit();
   				result =  HostUtil.makeXmlError("00000", "����ó���Ǿ����ϴ�." );			   				
   			}catch(Exception e){
   				iPrepareCall.rollback();
   				throw e;
   			}finally{
   				iPrepareCall.setAutoCommit(true);
   				if(iPrepareCall != null) iPrepareCall.close();
   				if(comDB != null) comDB.close(); 
   			}	
   			return result;
   		}  
   		
   		
   	//INCAT07 ���θŹ���� �� ó�� �ð��� ����ǿ� O/B�� �����͸� �����Ѵ�.								
//   		ATCL_NO	               �Ź���ȣ
//		ATCL_TP_NM	           �Ź�������
//		ATCL_NM	               �Ź���
//		RTRL_MBR_ID	           �߰�����ȸ��ID
//		RTRL_MBR_NM	           �߰����Ҹ�
//		RTRL_MBR_TEL_NO	       �߰�������ȭ��ȣ
//		ATCL_INS_DTTM	       �Ź���Ͻð�
   		public String INCAT07(Hashtable hstArg) throws Exception{
   			ComDB  comDB  = null;
   			IPrepareCall	iPrepareCall = null;
   			
   			String result = "";
   			Hashtable hst =  null;
   			try{   		
   				ArrayList arlArg = (ArrayList)hstArg.get("data");
   				
   				comDB = new ComDB();
   				
   				iPrepareCall = comDB.createPrepareCall();   				
   				iPrepareCall.open();
   				iPrepareCall.setAutoCommit(false);
   				iPrepareCall.call("{call SP_UC_PSNL_ATCL_PRCS_DLY_I(?,?,?,?,?,?,?,?,?,?) }");
   				
   				for(int i=0; i<arlArg.size(); i++){		   						   				
	   				hst = (Hashtable)arlArg.get(i);  //�̰� �׻� �ѰǸ� �´�.
	   				
	   				if("".equals(CUtil.nvl((String)hst.get("atcl_no")))) 
	   					throw new Exception("atcl_no ���� �����ϴ�.");
	   					
	   				iPrepareCall.setString(1,CUtil.nvl((String)hst.get("atcl_no")));
	   				iPrepareCall.setString(2,CUtil.nvl((String)hst.get("atcl_tp_nm")));
	   				iPrepareCall.setString(3,CUtil.nvl((String)hst.get("atcl_nm")));
	   				iPrepareCall.setString(4,CUtil.nvl((String)hst.get("rltr_mbr_id")));
	   				iPrepareCall.setString(5,CUtil.nvl((String)hst.get("rltr_mbr_nm")));
	   				iPrepareCall.setString(6,CUtil.nvl((String)hst.get("rltr_mbr_tel_no")));
	   				iPrepareCall.setString(7,CUtil.nvl((String)hst.get("atcl_ins_dttm")));	   				
	   				iPrepareCall.setString(8,CUtil.nvl((String)hst.get("")));	   				
	   				iPrepareCall.registerOutParameter(9, Types.VARCHAR);
	   				iPrepareCall.registerOutParameter(10, Types.VARCHAR);
	   				iPrepareCall.exec();
	   				log.debug("���:" + iPrepareCall.getString(9));
	   				log.debug("���:" + iPrepareCall.getString(10));
	   				if(!"0".equals(iPrepareCall.getString(9))){
	   					throw new Exception(iPrepareCall.getString(10));
	   				}	   					   					   				
   				}	
   				iPrepareCall.commit();
   				result =  HostUtil.makeXmlError("00000", "����ó���Ǿ����ϴ�." );			   				
   			}catch(Exception e){
   				iPrepareCall.rollback();
   				throw e;
   			}finally{   				
   				iPrepareCall.setAutoCommit(true);
   				if(iPrepareCall != null) iPrepareCall.close();
   				if(comDB != null) comDB.close();   				
   			}	
   			return result;
   		}   
   		
   		//�Ź��� �������� ��û�Ҷ� �����̸� ��ȸ�̷��� �׾��ش�.
   		public boolean INCAT06(ComActionForm comForm) {
   			IQuery iQuery = null;
   			ComDB  comDB  = null;
   			boolean b_result = true;
   			CParamSet cParamSet = null;
   			try{
   				cParamSet = comForm.getParamset();   				
   				comDB = new ComDB();
   				iQuery = comDB.createQuery();   				   				   			   				
   				iQuery.open();   				   				
   				String ls_sqlid 	= ((String)CXmlParser.getQuery("HOST_UC_PSNL_INFO_NQRY_HST_INS", "query-id")).toUpperCase();
   				String ls_sql1		=  (String)CXmlParser.getQuery(ls_sqlid, "query-statement");   					   				
   				iQuery.setSQL(ls_sql1);
   				iQuery.setString(1, CUtil.nvl(cParamSet.getParam("atcl_no").asString() )); //�Ź���ȣ
   				iQuery.setString(2, CUtil.nvl(cParamSet.getParam("user_id").asString() )); //�����id
   				iQuery.setString(3, CUtil.nvl(cParamSet.getParam("user_id").asString() )); //�����ID
   				iQuery.setString(4, CUtil.nvl(cParamSet.getParam("user_ip").asString() )); //�����Ip   				
   				iQuery.exec().getINT().throwException().toInteger();   				
   				iQuery.commit();
   			}catch(Exception e){
   				iQuery.rollback();
   				log.error(e);
   				b_result = false;
   			}finally{   			
   				try{if(iQuery != null) iQuery.close();}catch(Exception e){log.error(e);}
   				try{if(comDB != null)  comDB.close();}catch(Exception e){log.error(e);}
   			}	
   			return b_result;
   		}  
}