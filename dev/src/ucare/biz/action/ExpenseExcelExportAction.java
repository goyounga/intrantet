package ucare.biz.action;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;

import ucare.jpattern.common.actionform.ComActionForm;
import ucare.jpattern.common.action.BaseAction;

import ucare.jaf.common.CParamSet;
import ucare.jaf.common.ILogger;
import ucare.jaf.database.CDataSet;
import ucare.jaf.database.IDataSet;
import ucare.jaf.database.IQuery;
import ucare.jaf.common.CUtil;

import ucare.jpattern.service.ServiceManagerBean;
//import ucare.jpattern.service.HostServiceManagerBean;
import ucare.jaf.common.CIni;

import java.sql.SQLException;
import java.util.Hashtable;
import java.util.StringTokenizer;

import java.util.*;
import java.io.*;
import java.io.File;

import jxl.*;
import jxl.format.*;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableWorkbook;
import jxl.write.NumberFormat;
import jxl.write.DateFormat;
import jxl.write.Number;

public class ExpenseExcelExportAction extends BaseAction {

	private CParamSet 	cParamSet 				= null;
	private IDataSet 	excelInfoDataSet 		= null;
	private IDataSet 	resultRowDataSet		= null;
	private IDataSet 	rDataset 				= null;
	private File 		excelFile				= null;
	
	public void executeLogic(ComActionForm comForm) throws Exception{
		
		log.debug("============ ExpenseExcelExportAction START ================");
		
		cParamSet = comForm.getParamset();
		
		try{
			rDataset = new CDataSet();
						
			String	filePath = CIni.getParam("EXCEL_DOWNLOAD_PATH").asString("");
			String	fTitle   = cParamSet.getParam("fileName").asString();
			String	fileName = fTitle + CUtil.getCurrDate("yyyyMMdd");
			
			excelFile = new File(filePath  + "/" + fileName + ".xls");
			
			selectExpenseData();
			
			//조회된 데이터가 없으면 noRow 라는 파일명을 리턴한다.
			if(resultRowDataSet.getRowCount() > 0)
			{
				exportExcel();
			}
			else
			{
				fileName = "noRow";
			}
			
			String[] arrResultName = new String[2];
			arrResultName[0] = "filePath";
			arrResultName[1] = "fileName";
			
			String[] arrResultData = new String[2];
			arrResultData[0] = filePath;
			arrResultData[1] = fileName;

			excelInfoDataSet = new CDataSet();
			excelInfoDataSet.addNewRow(arrResultName,arrResultData);
			excelInfoDataSet.setViewType("FREE");
			rDataset.addNewRow("EXCELEXPORT",excelInfoDataSet);
			
			comForm.setParamSet(cParamSet);
			comForm.setDataset(rDataset);
		}catch(Exception e){
			throw new Exception(e);
		}
	}
	/**
	 * 엑셀 내보내기 
	 */
	public void exportExcel() throws Exception{
		
		WritableWorkbook workbook = null;
		
		try{
			workbook = Workbook.createWorkbook(excelFile);
			WritableSheet sheet = null;
			
			NumberFormat nf = new NumberFormat("###,##0");

			WritableFont dotum = new WritableFont(WritableFont.createFont("돋움"), 10); 
	 		
			WritableCellFormat titleFormat = new WritableCellFormat(dotum);
			WritableCellFormat rTitleFormat = new WritableCellFormat(dotum);
			WritableCellFormat centerFormat = new WritableCellFormat(dotum);
			WritableCellFormat rightFormat = new WritableCellFormat(dotum);
			WritableCellFormat leftFormat = new WritableCellFormat(dotum);
			WritableCellFormat moneyFormat = new WritableCellFormat(dotum, nf);

			titleFormat.setAlignment(Alignment.CENTRE);
			titleFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
			titleFormat.setBackground(Colour.LIGHT_TURQUOISE );
			titleFormat.setBorder(Border.ALL, BorderLineStyle.THIN);

			rTitleFormat.setAlignment(Alignment.CENTRE);
			rTitleFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
			rTitleFormat.setBackground(Colour.TAN);
			rTitleFormat.setBorder(Border.ALL, BorderLineStyle.THIN);

			centerFormat.setAlignment(Alignment.CENTRE);
			centerFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
			centerFormat.setBorder(Border.ALL, BorderLineStyle.THIN);
			
			rightFormat.setAlignment(Alignment.RIGHT);
			rightFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
			rightFormat.setBorder(Border.ALL, BorderLineStyle.THIN);

			leftFormat.setAlignment(Alignment.LEFT);
			leftFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
			leftFormat.setBorder(Border.ALL, BorderLineStyle.THIN);

			moneyFormat.setAlignment(Alignment.RIGHT);
			moneyFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
			moneyFormat.setBorder(Border.ALL, BorderLineStyle.THIN);
			
			log.debug("================== Excel Export START =======================");

			int rPos = 0;
			int y = 0;
			int num = 0;
			String pre_rg_nm 	= "";
			
			//Columns
			String expt_dt 	    = "";
			int expt_amt 		= 0;
			String expt_c_nm 	= "";
			String expt_act_nm  = "";
			String rip_doc_f 	= "";
			String expt_rmk 	= "";
			String rg_id 		= "";
			String rg_nm 		= "";
			String prj_nm 		= "";
			String pmt_dt 		= "";
			int exps_sum 		= 0;
			int pmt_amt 	    = 0;
			int upmt_amt 		= 0;
			
			String[] arrColumnName = {
				"지출일자"
				,"지출금액"
				,"지출계정"
				,"지출구분"
				,"영수증"
				,"프로젝트"
				,"지출적요"
			};
			
			String[] arrResultName = {
				"총지출금액"
				,"지급일자"
				,"지급액"
				,"미지급액"
			};
			
			WritableCellFormat[] arrColumnFormat = {
				centerFormat 		//지출일자
				, moneyFormat       //지출금액
				, centerFormat      //지출계정
				, centerFormat      //지출구분
				, centerFormat      //영수증
				, centerFormat      //프로젝트
				, leftFormat        //지출적요
			};
			
			WritableCellFormat[] arrResultFormat = {
				moneyFormat			//총지출금액
				, rightFormat		//지급일자
				, moneyFormat		//지급앱
				, moneyFormat		//미지급액
			};
			
			int[] arrCellWidth = {
				15  	//지출일자
				, 15    //지출금액
				, 15    //지출계정
				, 10    //지출구분
				, 10    //영수증
				, 25    //프로젝트
				, 70    //지출적요
			};
			
			Object[] arrColumnData = new Object[arrColumnName.length];
			Object[] arrResultData = new Object[4];
			
			while(resultRowDataSet.isNext())
			{
				resultRowDataSet.next();
				
				rPos = resultRowDataSet.getRecordPos();

				expt_dt 	= resultRowDataSet.getParam(rPos, "expt_dt").asString();			//지출일자
				expt_amt 	= resultRowDataSet.getParam(rPos, "expt_amt").asInt();				//지출금액
				expt_c_nm 	= resultRowDataSet.getParam(rPos, "expt_c_nm").asString();			//지출구분
				expt_act_nm = resultRowDataSet.getParam(rPos, "expt_act_nm").asString();		//지출계정
				rip_doc_f 	= resultRowDataSet.getParam(rPos, "rip_doc_f").asString();			//영수증
				expt_rmk 	= resultRowDataSet.getParam(rPos, "expt_rmk").asString();			//지출적요
				rg_id 		= resultRowDataSet.getParam(rPos, "rg_id").asString();				//신청자ID
				rg_nm 		= resultRowDataSet.getParam(rPos, "rg_nm").asString();				//신청자
				prj_nm 		= resultRowDataSet.getParam(rPos, "prj_nm").asString();				//프로젝트명
				pmt_dt 		= resultRowDataSet.getParam(rPos, "pmt_dt").asString();				//지급일자
				exps_sum 	= resultRowDataSet.getParam(rPos, "exps_sum").asInt();				//총지출금액
				pmt_amt 	= resultRowDataSet.getParam(rPos, "pmt_amt").asInt();				//지급액
				upmt_amt 	= resultRowDataSet.getParam(rPos, "upmt_amt").asInt();				//미지급액

				expt_dt		= CUtil.getDisplayDate(expt_dt, "/");
				pmt_dt 		= CUtil.getDisplayDate(pmt_dt, "/");

				//엑셀에 데이터 쓰기
				Label label = null;
				Number numberCell = null;
								
				//사용자 명이 달라질 경우 sheet를 하나 생성한다.
				if(!"".equals(rg_nm) && !pre_rg_nm.equals(rg_nm))
				{
					if(sheet != null)
					{
						//한  Sheet 에서 마지막 Row를 찍을 경우 추가적으로 총지출금액, 지급일자, 지급액, 미지급액을 출력한다.
						//마지막 Sheet에는 찍히지 않기 때문에 마지막에 처리한다.

						for(int i = 0 ; i < arrResultName.length ; i++)
						{
							label = new Label(0, y + 2 + i, arrResultName[i], rTitleFormat);
							sheet.addCell(label);

							//금액 일 경우
							if(arrResultFormat[i] == moneyFormat)
							{
								numberCell = new Number(1, y + 2 + i, Integer.parseInt(arrResultData[i].toString()), arrResultFormat[i]);
								sheet.addCell(numberCell);
							}
							else
							{
								label = new Label(i, y + 2 + i, arrResultData[i].toString(), arrResultFormat[i]);
								sheet.addCell(label);
							}
						}
					}
					
					//사용자 명으로 Sheet 생성
					sheet = workbook.createSheet(rg_nm, num); 

					log.debug("[" + num + "] " + rg_nm + " Sheet's Created.");
					
					num++;
					y = 0;
				}
				
				arrColumnData[0] = expt_dt;			//지출일자
				arrColumnData[1] = expt_amt;		//지출금액
				arrColumnData[2] = expt_act_nm;		//지출계정
				arrColumnData[3] = expt_c_nm;		//지출구분
				arrColumnData[4] = rip_doc_f;		//영수증
				arrColumnData[5] = prj_nm;			//프로젝트
				arrColumnData[6] = expt_rmk;		//지출적요	

				arrResultData[0] = exps_sum;
				arrResultData[1] = pmt_dt;
				arrResultData[2] = pmt_amt;
				arrResultData[3] = upmt_amt;
				
				//기존 이름을 저장
				pre_rg_nm = rg_nm;
				
				for(int i = 0 ; i < arrColumnName.length ; i++)
				{
					//처음 한번만 실행(Sheet 폭지정, 제목)
					if(y == 0)
					{
						//Sheet 폭 지정
						sheet.setColumnView(i, arrCellWidth[i]);

						//제목 출력
						label = new Label(i, y, arrColumnName[i], titleFormat);
						sheet.addCell(label);
					}
					
					//금액 일 경우
					if(arrColumnFormat[i] == moneyFormat)
					{
						numberCell = new Number(i, y + 1, Integer.parseInt(arrColumnData[i].toString()),arrColumnFormat[i]);
						sheet.addCell(numberCell);
					}
					else
					{
						label = new Label(i, y + 1, arrColumnData[i].toString(), arrColumnFormat[i]);
						sheet.addCell(label);
					}
				}
				
				y++;				

				//마지막 Sheet에 찍기
				if(resultRowDataSet.getRowCount() == rPos)
				{
					//한  Sheet 에서 마지막 Row를 찍을 경우 추가적으로 총지출금액, 지급일자, 지급액, 미지급액을 출력한다.

					for(int i = 0 ; i < arrResultName.length ; i++)
					{
						label = new Label(0, y + 2 + i, arrResultName[i], rTitleFormat);
						sheet.addCell(label);

						//금액 일 경우
						if(arrResultFormat[i] == moneyFormat)
						{
							numberCell = new Number(1, y + 2 + i, Integer.parseInt(arrResultData[i].toString()), arrResultFormat[i]);
							sheet.addCell(numberCell);
						}
						else
						{
							label = new Label(i, y + 2 + i, arrResultData[i].toString(), arrResultFormat[i]);
							sheet.addCell(label);
						}
					}
				}
			}
			
			resultRowDataSet.first();
			
			workbook.write();
			workbook.close();
			log.debug("================== Excel Export END =======================");
		}
		catch(Exception e){
			log.debug("============ ExpenseExcelExportAction Error ================");
			workbook.close();
			throw new Exception(e);
		}
		finally
		{
			log.debug("============ ExpenseExcelExportAction END ================");
		}
	}
	
	/**
	 * 비용 내용 조회
	 */
	public void selectExpenseData() throws Exception{
		try{
			IDataSet iDataSet = null;
			log.debug("============ Query START =================");
			ServiceManagerBean sManager= new ServiceManagerBean();
			cParamSet.setParam("_SERVICE_ID","UCEXP024S");
			cParamSet.setParam("_SERVICE_TYPE","SQLSERVICE");
			iDataSet = sManager.callService(cParamSet);
			iDataSet.next();
			resultRowDataSet = iDataSet.getFindDataSet("UCEXP024S");			
			log.debug("============ Query END ================");
		}
		catch(Exception e){
			throw new Exception(e);
		}
	}
}
