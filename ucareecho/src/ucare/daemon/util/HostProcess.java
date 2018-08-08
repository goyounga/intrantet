package ucare.daemon.util;

import java.io.*;
import java.util.*;
import java.sql.*;
import ucare.daemon.server.*;
import ucare.echo.server.*;

//import org.apache.log4j.PropertyConfigurator;
/**
*  
*/
public class HostProcess implements ILogger {
	
	private int    relayport  = 0;
	private String relayip    = "";
	private String dburl      = "";
	private String dbuser     = "";
	private String dbpass     = "";
		
	public HostProcess(){
		try{
			UCareDaemonProp ucProp = UCareDaemonProp.getInstance();
			relayport = Integer.parseInt(ucProp.getProp("relayport"));
			relayip   = ucProp.getProp("relayip");
			dburl     = ucProp.getProp("dburl");
			dbuser    = ucProp.getProp("dbuser");
			dbpass    = ucProp.getProp("dbpass");
		}catch(Exception e){
			log.error(e.getMessage());
		}
	}
	
	//IFU001 ��ȭ��  ����Ÿ �߰輭����  �Ѱ��ֱ�
	public void INCAT01(){
		Connection        conn   = null;
		PreparedStatement pstmt  = null;
		ResultSet         rs     = null;
		StringBuffer      sql    = null;		
		int               cnt    = 0;
		String            result = "";
		String            msg_key    = "";
		ByteArrayOutputStream bout = null;
		ByteArrayOutputStream bout2 = null;
		try{
			log.debug("******INCAT01 started******");
			bout = new ByteArrayOutputStream();
			bout2 = new ByteArrayOutputStream();
			Class.forName( "oracle.jdbc.driver.OracleDriver");		    	
			conn = DriverManager.getConnection(dburl, dbuser, dbpass);
			conn.setAutoCommit(false);			
			//-----------------------------uc_atcl_vrfy_req_hst ���� ��������

			sql = new StringBuffer();
			sql.append("SELECT atcl_vrfy_req_seq, atcl_no, cust_tel_no  ");
			sql.append("        ,rltr_mbr_nm,rltr_tel_no,snd_st_tm      ");
			sql.append("        ,snd_end_tm,rg_dt,rg_tm, acs_snd_f      ");
			sql.append("    FROM uc_atcl_vrfy_req_hst                   ");
			sql.append("    WHERE acs_snd_f = 'N'                       ");  
			sql.append("         AND atcl_vrfy_step_cd  = '30'          ");  
			sql.append("         AND ROWNUM <= 50                       ");  
			//Ÿ�̸ӷ� ���Ƽ�..���� ���ʿ� ����..FOR UPDATE
			
			
			//ó���� ����Ÿ�� �����´�.
			pstmt = conn.prepareStatement(sql.toString());		
			rs = pstmt.executeQuery();
			
			while (rs.next()) {
				cnt++;
				msg_key = CUtil.nvl(rs.getString("atcl_vrfy_req_seq"));
				log.debug("req_seq:" + CUtil.pad(CUtil.nvl(rs.getString("atcl_vrfy_req_seq")),11 ,'0' ,true));
//				msg += CUtil.pad(CUtil.nvl(rs.getString("atcl_vrfy_req_seq")),11 ,'0' ,true); //10 �Ź�������û����     
//				msg += CUtil.pad(CUtil.nvl(rs.getString("atcl_no"))          ,10 ,' ' ,false); //10 �Ź���ȣ             
//				msg += CUtil.pad(CUtil.nvl(rs.getString("cust_tel_no"))      ,11 ,' ' ,false); //11 ����ȭ��ȣ         
//				msg += CUtil.pad(CUtil.nvl(rs.getString("rltr_mbr_nm"))      ,50 ,' ' ,false); //50 �߰����Ҹ�           
//				msg += CUtil.pad(CUtil.nvl(rs.getString("rltr_tel_no"))      ,11 ,' ' ,false); //11 �߰�������ȭ��ȣ     
//				msg += CUtil.pad(CUtil.nvl(rs.getString("snd_st_tm"))        ,6  ,' ' ,false); //6	 �߽Ž��۽ð�         
//				msg += CUtil.pad(CUtil.nvl(rs.getString("snd_end_tm"))       ,6  ,' ' ,false); //6	 �߽�����ð� 	
//				
				bout.write(CUtil.pad2(CUtil.nvl(rs.getString("atcl_vrfy_req_seq")),11 ,"0" ,true)); //10 �Ź�������û����     
				bout.write(CUtil.pad2(CUtil.nvl(rs.getString("atcl_no"))          ,10 ," " ,false)); //10 �Ź���ȣ             
				bout.write(CUtil.pad2(CUtil.nvl(rs.getString("cust_tel_no"))      ,11 ," " ,false)); //11 ����ȭ��ȣ         
				bout.write(CUtil.pad2(CUtil.nvl(rs.getString("rltr_mbr_nm"))      ,50 ," " ,false)); //50 �߰����Ҹ�           
				bout.write(CUtil.pad2(CUtil.nvl(rs.getString("rltr_tel_no"))      ,11 ," " ,false)); //11 �߰�������ȭ��ȣ     
				bout.write(CUtil.pad2(CUtil.nvl(rs.getString("snd_st_tm"))        ,6  ," " ,false)); //6	 �߽Ž��۽ð�         
				bout.write(CUtil.pad2(CUtil.nvl(rs.getString("snd_end_tm"))       ,6  ," " ,false)); //6	 �߽�����ð� 
			}
			
			rs.close();
			rs = null;
			pstmt.close();
			if( cnt > 0){
				SockUtil su = new SockUtil();
				bout2.write( CUtil.pad2("IFU001" , 6, " ", false) );
				bout2.write( CUtil.pad2((bout.toByteArray().length + 15) + "" , 6, "0", true) );
				bout2.write( CUtil.pad2(cnt + "" , 3, "0", true) );
				bout2.write( bout.toByteArray() );				
				result = su.sendMsgSocket(relayip, relayport, bout2.toByteArray(), 1000 * 55); //���� ���
//				result = su.sendMsgSocket(relayip, relayport, "IFU001", msg, cnt); //���� ���
				// ���� ������� �޾Ƽ� ����� ArrayList�� �־��ش�.
				ArrayList arlResult = null;
				try{
					arlResult = HostUtil.repackMsg(result);
				}catch(Exception e){
					log.error(e.getMessage());
					arlResult = new ArrayList();
				}
				
				//-----------------------ó����� ������ DB�� UPDATE ó��.
				String[] arLst = null;	
				String sql2 = "UPDATE uc_atcl_vrfy_req_hst SET acs_snd_f = 'Y' WHERE atcl_vrfy_req_seq = ?";                    
				pstmt = conn.prepareStatement(sql2);			
				for(int i=0; i< arlResult.size(); i++){
					arLst = (String[])arlResult.get(i);
					log.debug("Receive arLst[0]:" + arLst[0]);
					log.debug("Receive arLst[1]:" + arLst[1]);
					log.debug("Receive arLst[2]:" + arLst[2]);
					if("0".equals(arLst[2])){  //�����̸� update 
						pstmt.setInt(1, Integer.parseInt(arLst[0]));
						pstmt.addBatch();
					}
				}
				pstmt.executeBatch();
			}
//			else{
//				log.debug("[*****************������ ����Ÿ ����*******************]");
//			}
			conn.commit();
		}catch(Exception e){
			if(conn != null) try{conn.rollback();}catch(Exception ex){log.error(ex);}			
			log.error(e);						
		}finally{
			if(conn != null)  try{conn.setAutoCommit(true);}catch(Exception e){log.error(e);}
			if(rs != null)    try{rs.close();}catch(Exception e){log.error(e);}
			if(pstmt != null) try{pstmt.close();}catch(Exception e){log.error(e);}			
			if(conn != null)  try{conn.close();}catch(Exception e){log.error(e);}
			log.debug("******INCAT01 end******");
		}
	}
	//-----------------IFU003 
//	UCareDaemonRecv���� ȣ���Ѵ�.
	//���󿡼� �޾Ƽ� uc_acs_snd_hst(ACS�߼��̷� ���̺� �������ش�.) , uc_atcl_vrfy_info ��
	// �̰� ó���� 5�и��� ICNAT03.java�� Ÿ�̸ӿ��� ȣ���ؼ� ����Ȱ��� nhn�� ������ �ش�.
	public byte[] IFU003(String content){
		Connection conn = null;
		PreparedStatement pstmt  = null;
		PreparedStatement pstmt2  = null;
		ResultSet  rs   = null;
		String msg = "";
		StringBuffer sql = null;
		StringBuffer sql2 = null;
		int cnt = 0;
		String result = "";
		ByteArrayOutputStream bout = null;
		ByteArrayOutputStream bout2 = null;
		try{			
			log.debug("******IFU003 started******");
			bout = new ByteArrayOutputStream();
			bout2 = new ByteArrayOutputStream();
			Class.forName( "oracle.jdbc.driver.OracleDriver");		    	
			conn = DriverManager.getConnection(dburl, dbuser, dbpass);
			conn.setAutoCommit(false);

			sql = new StringBuffer();
			sql.append(" INSERT INTO uc_acs_snd_hst(                      ");
			sql.append("                        acs_snd_seq               ");
			sql.append("                        ,atcl_vrfy_req_seq        ");
			sql.append("                        ,atcl_no                  ");
			sql.append("                        ,snd_rslt_cd              ");
			sql.append("                        ,info_agm_f               ");
			sql.append("                        ,call_trns_succ_f         ");
			sql.append("                        ,snd_dt                   ");
			sql.append("                        ,snd_tm                   ");
			sql.append("                        ,nhn_snd_f                ");
			sql.append("                        ,rg_dt                    ");
			sql.append("                        ,rg_tm                    ");
			sql.append("                )                                 ");
			sql.append("        VALUES( lpad(SEQ_UC_ACS_SND_HST.NEXTVAL, 11,'0') ");
			sql.append("                , ?, ?,?, ?, ?, ?, ?, 'N'         ");
			sql.append("                , TO_CHAR(SYSDATE, 'YYYYMMDD')    ");
			sql.append("                , TO_CHAR(SYSDATE, 'HH24MISS')    ");
			sql.append("               )                                  ");
			sql2 = new StringBuffer();
			sql2.append(" UPDATE uc_atcl_vrfy_info SET       "); 
			sql2.append("              acs_snd_rslt_cd = ?    ");   //acs �߼۰���ڵ�
			sql2.append("             ,acs_info_agm_f = ?    ");   //acs �������ǿ���
            sql2.append("             ,acs_snd_dt = ?    ");   // 
            sql2.append("             ,acs_snd_tm = ?    ");   // 
			sql2.append("             ,mdf_dt      = TO_CHAR(SYSDATE, 'YYYYMMDD')  "); 
			sql2.append("             ,mdf_tm      = TO_CHAR(SYSDATE, 'HH24MISS')  "); 
			sql2.append("             ,mdf_id      = 'BATCH'               ");
			sql2.append("     WHERE atcl_no = ?                            ");
			
			//���� ���밪����  ArrayList �� �ٲ۴�.
			ArrayList arlResult = HostUtil.repackIFU003Msg(content);
			pstmt = conn.prepareStatement(sql.toString());
			pstmt2 = conn.prepareStatement(sql2.toString());
			String[] arResult = null;

			for(int i=0; i< arlResult.size(); i++){
				try{
					arResult = (String[])arlResult.get(i);
					log.debug("0:" + (String)arResult[0]); //����
					log.debug("1:" + (String)arResult[1]); //�Ź���ȣ
					log.debug("2:" + (String)arResult[2]); //�߽�����	
					log.debug("3:" + (String)arResult[3]); //�߽Žð�
					log.debug("4:" + (String)arResult[4]); //�߽Ű���ڵ� trim	
					log.debug("5:" + (String)arResult[5]); //���������ڵ�	
					log.debug("6:" + (String)arResult[6]); //ȣ��ȭ��������
					
					cnt++;
					pstmt.setString(1, (String)arResult[0]);  //����
					pstmt.setString(2, (String)arResult[1]);  //�Ź���ȣ
					pstmt.setString(3, CUtil.trim((String)arResult[4])); //�߽Ű���ڵ�	
					pstmt.setString(4, (String)arResult[5]); //���������ڵ�	
					pstmt.setString(5, (String)arResult[6]); //ȣ��ȭ��������
					pstmt.setString(6, (String)arResult[2]); //�߽�����	
					pstmt.setString(7, (String)arResult[3]); //�߽Žð�					
					pstmt.executeUpdate();
										
					pstmt2.setString(1, CUtil.trim((String)arResult[4]));  //�߽Ű���ڵ�	
					pstmt2.setString(2, (String)arResult[5]);  //���������ڵ�	
                    pstmt2.setString(3, (String)arResult[2]);  // �߽�����	
                    pstmt2.setString(4, (String)arResult[3]);  // �߽Žð�
					pstmt2.setString(5, (String)arResult[1]);  //�Ź���ȣ
					pstmt2.executeUpdate();
					conn.commit();
					bout.write(CUtil.pad2((String)arResult[0],11 ," " ,false));
					bout.write(CUtil.pad2((String)arResult[1],10 ," " ,false));
					bout.write(CUtil.pad2("0",1 ," " ,false));
//					result += (String)arlResult.get(0) + (String)arlResult.get(1) + "0";
				}catch(Exception e){
					bout.write(CUtil.pad2((String)arResult[0],11 ," " ,false));
					bout.write(CUtil.pad2((String)arResult[1],10 ," " ,false));
					bout.write(CUtil.pad2("1",1 ," " ,false));
//					result += (String)arlResult.get(0) + (String)arlResult.get(1) + "1";
					log.error("*************************************");
					log.error("[IFU003 ������ ����]" + e.getMessage());
					log.error("*************************************");
				}
			}
			
			bout2.write( CUtil.pad2("IFU004" , 6, " ", false) );
			bout2.write( CUtil.pad2((bout.toByteArray().length + 15) + "" , 6, "0", true) );
			bout2.write( CUtil.pad2(cnt + "" , 3, "0", true) );
			bout2.write( bout.toByteArray() );	
			log.debug("RETURN VALUE[" + new String(bout2.toByteArray()) + "]");
			return 	bout2.toByteArray();			
		}catch(Exception e){			
			if(conn != null) try{conn.rollback();}catch(Exception ex){log.error(ex);}			
			log.error(e);
			bout2 = new ByteArrayOutputStream();
			try{			
				bout2.write( CUtil.pad2("IFN004" , 6, " ", false) );
				bout2.write( CUtil.pad2((15) + "" , 6, "0", true) );
				bout2.write( CUtil.pad2(cnt + "" , 3, "0", true) );				
			}catch(Exception ex){
				log.error(ex);
			}
			return 	bout2.toByteArray();
		}finally{
			if(conn != null)  try{conn.setAutoCommit(true);}catch(Exception e){log.error(e);}
			if(rs != null)    try{rs.close();}catch(Exception e){log.error(e);}
			if(pstmt != null) try{pstmt.close();}catch(Exception e){log.error(e);}			
			if(conn != null)  try{conn.close();}catch(Exception e){log.error(e);}
			log.debug("******IFU003 end******");
		}		
	}
}