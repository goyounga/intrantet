package ucare.daemon.util;


import java.util.*;
import java.sql.*;
import java.io.FileWriter;
import java.io.File;
import java.io.PrintWriter;
import java.io.LineNumberReader;
import java.io.FileReader;
import org.apache.log4j.PropertyConfigurator;

import ucare.daemon.server.*;
import ucare.echo.server.*;
/**
*    5��¥�� ��ġ.. �ٲ�� ==> ICNAT03
*/
public class INF005 extends Thread  implements ILogger {
		
	
	public INF005(){
	}

	public void run() {	
		process();
	}
	public void process(){
		Connection        conn   = null;
		PreparedStatement pstmt  = null;
		ResultSet         rs     = null;
		String            dburl  = "";
		String            dbuser = "";
		String            dbpass = "";	
		StringBuffer      sql    = null;	
		int cnt  = 0;
		String msg = "";
		ArrayList arResult = null;		
		String result = "";
		StringBuffer where = null;	
		try{
			sql = new StringBuffer();
			where = new StringBuffer();
			UCareDaemonProp ucProp = UCareDaemonProp.getInstance();
			dburl     = ucProp.getProp("dburl");
			dbuser    = ucProp.getProp("dbuser");
			dbpass    = ucProp.getProp("dbpass");
			// db �д� ��ġ�� ���Ϸ� ������ ���´�.
//			String f =  ucProp.getProp("dbpass") + "INF005_SEQ.CONF";
//			File file = new File(f);
//			if(file.isFile()){
//				LineNumberReader lineReader = null;
//		        lineReader = new LineNumberReader(new FileReader(file));		        
//			}
//			 
			arResult = new ArrayList();
			Class.forName( "oracle.jdbc.driver.OracleDriver");		    	
			conn = DriverManager.getConnection(dburl, dbuser, dbpass);
			conn.setAutoCommit(false);			
			//-----------------------------uc_atcl_vrfy_req_hst ���� ��������

			
			sql.append("SELECT                      ");
			sql.append("    acs_snd_seq             ");   // ACS�߼ۼ���     
			sql.append("    ,atcl_no                ");   // �Ź���ȣ       
			sql.append("    ,snd_rslt_cd            ");   // �߼۰���ڵ�   
			sql.append("    ,info_agm_f             ");   // �������ǿ���   
			sql.append("    ,call_trns_succ_f       ");   // ȣ��ȯ�������� 
			sql.append("    ,snd_dt                 ");   // �߼�����       
			sql.append("    ,snd_tm                 ");   // �߼۽ð�   
			sql.append("    ,snd_dt || snd_tm snd_dttm "); // �߼��Ͻ�
			sql.append("    ,rg_dt                   ");
			sql.append("    ,rg_tm                   ");
			sql.append(" FROM uc_acs_snd_hst         ");
			sql.append(" WHERE  nhn_snd_f = 'N'      ");
			sql.append("     AND  rownum <= 30  FOR UPDATE     "); //FOR UPDATE �ߺ����� ����ɶ� �߸��Ȱ�� ���
			pstmt = conn.prepareStatement(sql.toString());
			rs = pstmt.executeQuery();				   
			while (rs.next()) {
				cnt++;
				log.debug("req_seq:" + CUtil.nvl(rs.getString("acs_snd_seq")));
				//�Ź���ȣ, �߽��Ͻ�, �߽Ű���ڵ�,�������ǿ���	
				arResult.add(new String[]{
										CUtil.nvl(rs.getString("atcl_no"))
										,CUtil.nvl(rs.getString("snd_dttm"))
										,CUtil.nvl(rs.getString("snd_rslt_cd"))
										,CUtil.nvl(rs.getString("info_agm_f"))										
										});
				if(cnt == 1){
					where.append(CUtil.nvl(rs.getString("acs_snd_seq")));
				}else{
					where.append(",").append(CUtil.nvl(rs.getString("acs_snd_seq")));
				}
			}			
			SockUtil su = new SockUtil();
			result = su.sendMsgHttpURL(ucProp.getProp("naverurl") + "ICNAT03.nhn", 
										HostUtil.makeXml("ICNAT03"
												,new String[]{"atcl_no","snd_dttm","snd_rslt_cd","info_agm_f"}
												,arResult));
			
			//�����϶� �������� ó��
			String sql2 = "UPDATE uc_acs_snd_hst SET nhn_snd_f = 'Y' WHERE acs_snd_seq IN (" + where.toString() + ")";
			pstmt = conn.prepareStatement(sql2);
			pstmt.executeUpdate();
			conn.commit();
		}catch(Exception e){
			if(conn != null) try{conn.rollback();}catch(Exception ex){log.error(ex);}			
			log.error(e);						
		}finally{
			if(conn != null)  try{conn.setAutoCommit(true);}catch(Exception e){log.error(e);}
			if(rs != null)    try{rs.close();}catch(Exception e){log.error(e);}
			if(pstmt != null) try{pstmt.close();}catch(Exception e){log.error(e);}			
			if(conn != null)  try{conn.close();}catch(Exception e){log.error(e);}
		}		
	}
	
}