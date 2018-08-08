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
     * 생성자<BR>
     * @param  none 
     */
   	public HostProcess() {}
   
   	//INF001 NHN에서 매물검증요청 들어온 값을 저장한다.
//   	ATCL_NO	                          매물번호	          
//   	ATCL_VRFC_STP_CD  매물검증요청단계코드	
//   	CUST_TEL_NO	               고객전화번호	      
//   	RTRL_MBR_NM	               중개업소명	          
//   	RTRL_MBR_TEL_NO	     중개업소전화번호	  
//   	SND_YMD	                         발신일자	          
//   	SND_ST_TM	               예약시작시간	      
//   	SND_END_TM	               발신종료시간	      
//   	RGN_DOC_CF_F	     등기부등본확인여부
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
	   				hst = (Hashtable)arlArg.get(i);  //이건 항상 한건만 온다.
	   				//값 체크..
	   				if("".equals(CUtil.nvl((String)hst.get("atcl_no")))) 
	   					throw new Exception("atcl_no 값이 없습니다.");	

	   				iPrepareCall.setString(1,CUtil.nvl((String)hst.get("atcl_no")         )); //매물번호
	   				iPrepareCall.setString(2,CUtil.nvl((String)hst.get("atcl_vrfc_stp_cd"))); //매물검증요청단계코드
	   				iPrepareCall.setString(3,CUtil.nvl((String)hst.get("cust_tel_no")     )); //고객전화번호
	   				iPrepareCall.setString(4,CUtil.nvl((String)hst.get("rltr_mbr_nm")     )); //중개업소명
	   				iPrepareCall.setString(5,CUtil.nvl((String)hst.get("rltr_mbr_tel_no") )); //중개업소전화번호
	   				iPrepareCall.setString(6,CUtil.nvl((String)hst.get("snd_tm")          )); //예약시작시간
	   				iPrepareCall.setString(7,CUtil.nvl((String)hst.get("rgn_doc_cf_f")    )); //등기부등본확인여부
	   				iPrepareCall.setString(8,CUtil.nvl((String)hst.get("atcl_tp_cd")    )); //거래유형코드
	   				iPrepareCall.registerOutParameter(9, Types.VARCHAR);
	   				iPrepareCall.registerOutParameter(10, Types.VARCHAR);	   				
	   				iPrepareCall.exec();
	   				log.debug("결과:" + iPrepareCall.getString(9));
	   				log.debug("결과:" + iPrepareCall.getString(10));
	   				if(!"0".equals(iPrepareCall.getString(9))){
	   					throw new Exception(iPrepareCall.getString(10));
	   				}
   				}	
   				iPrepareCall.commit();
   				result =  HostUtil.makeXmlError("00000", "정상처리되었습니다." );			   				
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
   		
   		
   	//INCAT07 개인매물등록 후 처리 시간이 경과되여 O/B할 데이터를 수신한다.								
//   		ATCL_NO	               매물번호
//		ATCL_TP_NM	           매물유형명
//		ATCL_NM	               매물명
//		RTRL_MBR_ID	           중개업소회원ID
//		RTRL_MBR_NM	           중개업소명
//		RTRL_MBR_TEL_NO	       중개업소전화번호
//		ATCL_INS_DTTM	       매물등록시간
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
	   				hst = (Hashtable)arlArg.get(i);  //이건 항상 한건만 온다.
	   				
	   				if("".equals(CUtil.nvl((String)hst.get("atcl_no")))) 
	   					throw new Exception("atcl_no 값이 없습니다.");
	   					
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
	   				log.debug("결과:" + iPrepareCall.getString(9));
	   				log.debug("결과:" + iPrepareCall.getString(10));
	   				if(!"0".equals(iPrepareCall.getString(9))){
	   					throw new Exception(iPrepareCall.getString(10));
	   				}	   					   					   				
   				}	
   				iPrepareCall.commit();
   				result =  HostUtil.makeXmlError("00000", "정상처리되었습니다." );			   				
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
   		
   		//매물의 상세정보를 요청할때 성공이면 조회이력을 쌓아준다.
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
   				iQuery.setString(1, CUtil.nvl(cParamSet.getParam("atcl_no").asString() )); //매물번호
   				iQuery.setString(2, CUtil.nvl(cParamSet.getParam("user_id").asString() )); //사용자id
   				iQuery.setString(3, CUtil.nvl(cParamSet.getParam("user_id").asString() )); //등록자ID
   				iQuery.setString(4, CUtil.nvl(cParamSet.getParam("user_ip").asString() )); //등록자Ip   				
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