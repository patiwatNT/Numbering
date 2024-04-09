import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ExcelAssignedObj } from '../models/excelAssignedObj';
import { ExcelBlockObj } from '../models/excelBlockObj';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}
  generateExcelAssignRange(fileName: string, excelAssignedObj: ExcelAssignedObj): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    // Cell A1
    worksheet.getCell('A1').font = {
      name: 'TH SarabunPSK',
      bold: true,
      size: 18,
    };
    let assignedId = excelAssignedObj.assignObj.assignedRangeDetailPK.id;
    worksheet.getCell('A1').value =
      'Export ข้อมูลรายเลขหมาย assignedId: ' + assignedId;
    // Cell A2
    worksheet.getCell('A2').font = {
      name: 'TH SarabunPSK',
      bold: true,
      size: 14,
    };
    worksheet.getCell('A2').value =
      'หมายเลข ' +
      excelAssignedObj.assignObj.startTel +
      ' - ' +
      excelAssignedObj.assignObj.endTel +
      ' จำนวน ' +
      excelAssignedObj.assignObj.amount +
      ' เลขหมาย ';

    // Cell A3
    worksheet.getCell('A3').font = {
      name: 'TH SarabunPSK',
      bold: true,
      size: 14,
    };
    worksheet.getCell('A3').value =
      'ชื่อ Station (ไทย): ' +
      excelAssignedObj.assignObj.stationNameTh +
      ' ชื่อ Station (อังกฤษ): ' +
      excelAssignedObj.assignObj.stationNameEn;

    // Custom Headers
    const customHeaders = [
      'ที่',
      '',
      'รหัสศูนย์บริการ',
      'ชื่อศูนย์บริการ',
      '',
      '',
      '',
    ];

    // Old Headers to keep
    const oldHeaders = ['phoneNumber', 'crmStatus', 'updateBy', 'updateDate'];

    // Add headers
    const headers = Object.keys(excelAssignedObj.listPhoneDetail[0])
      .filter((header) => oldHeaders.includes(header))
      .map((header) => {
        switch (header) {
          case 'phoneNumber':
            return 'หมายเลข';
          case 'crmStatus':
            return 'สถานะใน CRM';
          case 'updateBy':
            return 'ข้อมูลล่าสุดโดย';
          case 'updateDate':
            return 'ข้อมูลล่าสุดเมื่อ';
          default:
            return header;
        }
      });

    // Add Custom Header
    customHeaders[1] = headers[0];
    customHeaders[4] = headers[1];
    customHeaders[5] = headers[2];
    customHeaders[6] = headers[3];
    //const combineHeaders = customHeader.concat(headers.filter(header => !customHeader.includes(header)));

    worksheet.addRow(customHeaders).eachCell((cell) => {
      cell.font = { name: 'TH SarabunPSK', bold: true, size: 14 };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Add data
    excelAssignedObj.listPhoneDetail.forEach((item) => {
      const row: any[] = customHeaders.map((header) => {
        // Modify data if needed
        switch (header) {
          case 'ที่':
            return item['phoneDetailPK'].no;
          case 'หมายเลข':
            return item['phoneNumber'];
          case 'รหัสศูนย์บริการ':
            let serviceLocationCode: string = item['serviceLocation'];
            serviceLocationCode = serviceLocationCode.substring(0, 4);
            console.log(serviceLocationCode);
            return serviceLocationCode;
          case 'ชื่อศูนย์บริการ':
            let serviceLocationName = item['serviceLocation'];
            serviceLocationName = serviceLocationName.substring(7);
            console.log(serviceLocationName);
            return serviceLocationName;
          case 'สถานะใน CRM':
            return item['crmStatus'];
          case 'ข้อมูลล่าสุดโดย':
            return item['updateBy'];
          case 'ข้อมูลล่าสุดเมื่อ':
            return moment(item['updateDate']).format('DD/MM/YYYY');
          default:
            return ''; // Default to empty string if the header doesn't match any property in 'item'
        }
      });
      // worksheet.addRow(row).font={name:'TH SarabunPSK',size:14};
      // worksheet.addRow(row).alignment={vertical:'middle',horizontal:'center'}
      worksheet.addRow(row);

      const lastRowNumber = worksheet.rowCount; // Get the row number of the last added row

      // Apply font and alignment properties to each cell in the last added row
      const lastRow = worksheet.getRow(lastRowNumber);
      lastRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.font = { name: 'TH SarabunPSK', size: 14 };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });

      // Apply border formatting to each cell
      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
          // Apply border to all sides of each cell
          cell.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });
    });
    // Save the workbook to a blob
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `${fileName}.xlsx`);
    });
  }

  generateExcelBlock(fileName: string, excelBlockObj: ExcelBlockObj): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    // Cell A1
    worksheet.getCell('A1').font = {
      name: 'TH SarabunPSK',
      bold: true,
      size: 18,
    };
    worksheet.getCell('A1').value =
      'N-16 : รายงานหมายเลขว่าง '+excelBlockObj.block;
    // Cell A2
    worksheet.getCell('A2').font = {
      name: 'TH SarabunPSK',
      bold: true,
      size: 14,
    };

    // Old Headers to keep
    const oldHeaders = ['id','blockRange','startTel', 'endTel', 'location', 'numberAmount','annualFee'];

    // Add headers
    const headers = Object.keys(excelBlockObj.reportN16DetailList[0])
      .filter((header) => oldHeaders.includes(header))
      .map((header) => {
        switch (header) {
          case 'id':
            return 'ที่';
          case 'blockRange':
            return 'Block Range';
          case 'startTel':
            return 'หมายเลขเริ่มต้น';
          case 'endTel':
            return 'หมายเลขสิ้นสุด';
          case 'location':
            return 'พื้นที่';
          case 'numberAmount':
            return 'จำนวนเลขหมาย';
          case 'annualFee':
            return 'ค่าธรรมเนียมรายเดือน (บาท)';
          default:
            return header;
        }
      });

    worksheet.addRow(headers).eachCell((cell) => {
      cell.font = { name: 'TH SarabunPSK', bold: true, size: 14 };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Add data
    excelBlockObj.reportN16DetailList.forEach((item) => {
      const row: any[] = headers.map((header) => {
        // Modify data if needed
        switch (header) {
          case 'ที่':
            return item['id'];
          case 'Block Range':
            return item['blockRange'];
          case 'หมายเลขเริ่มต้น':
            return item['startTel'];
          case 'หมายเลขสิ้นสุด':
            return item['endTel'];
          case 'พื้นที่':
            return item['location'];
          case 'จำนวนเลขหมาย':
            return this.addComma(item['numberAmount']);
          case 'ค่าธรรมเนียมรายเดือน (บาท)':
            return this.addCommaDecimal(item['annualFee']);
          default:
            return ''; // Default to empty string if the header doesn't match any property in 'item'
        }
      });
      // worksheet.addRow(row).font={name:'TH SarabunPSK',size:14};
      // worksheet.addRow(row).alignment={vertical:'middle',horizontal:'center'}
      worksheet.addRow(row);

      const lastRowNumber = worksheet.rowCount; // Get the row number of the last added row

      // Apply font and alignment properties to each cell in the last added row
      const lastRow = worksheet.getRow(lastRowNumber);
      lastRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.font = { name: 'TH SarabunPSK', size: 14 };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });

      // Apply border formatting to each cell
      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
          // Apply border to all sides of each cell
          cell.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });
    });
    // Save the workbook to a blob
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `${fileName}.xlsx`);
    });
  }

  addComma(data: any) {
    let temp = Number(data).toFixed(0);
    
    temp = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return temp;
  }
  addCommaDecimal(data: any) {
    let temp = Number(data).toFixed(2);
    
    temp = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return temp;
  }
}
