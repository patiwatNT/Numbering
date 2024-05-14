import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhoneInfo } from '../models/phoneInfo';
import { BlockDetailDtoC } from '../models/blockDetailDtoC';


@Injectable({
    providedIn: 'root'
  })
  export class BackendService {

    private apiUrl = 'http://10.0.53.192:9090'; // Replace with your backend API URL
  
    constructor(private http: HttpClient) {}
  
    saveNews(data: undefined): Observable<any> {
      // Send data to backend using HTTP POST request
      return this.http.post(`${this.apiUrl}/news/saveNews`,  data ,{responseType: 'text'});
    }

    init(): Observable<any>{
      return this.http.get(`${this.apiUrl}/news/main`);
    }

    findNewsById(id: string): Observable<any>{
      return this.http.get(`${this.apiUrl}/news/findById/${id}`);
    }

    findPhoneInfoById(serviceNo: string): Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-service-numbers/findByServiceNo/${serviceNo}`);
    }
    // findPhoneInfoById(serviceNo: string): Observable<any>{
    //   return this.http.get(`${this.apiUrl}/nbr-service-numbers/findAll`);
    // }

    findAllBlock(): Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-blocks/getBlockList`);
    }

    findAllProvider(): Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-providers/findAll`);
    }

    findBlockDetail(data: BlockDetailDtoC): Observable<any>{
      return this.http.post(`${this.apiUrl}/nbr-blocks/findBlockDetail`,data);
    }

    findByStatusGroup(statusGroup: String): Observable<any>{
      return this.http.get(`${this.apiUrl}/config-code/findByStatusGroup/${statusGroup}`);
    }

    findNumberingLocation(): Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-assigned/findAssignedRegion`);
    }

    findAllAssigned(): Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-assigned/findAllAssigned`);
    }

    findAllDivision(): Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-assigned/findAssignedSector`)
    }

    findAssignedRange(data:any): Observable<any>{
      return this.http.post(`${this.apiUrl}/nbr-assigned/findAssigned`,data)
    }

    findAssignedRangeDetail(id:any): Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-service-numbers/findByAssignedId/${id}`)
    }

    findPhoneDetail(assignRangeId:string): Observable<any>{
      return this.http.get(`${this.apiUrl}/phone-detail/findPhoneDetail/${assignRangeId}`)
    }

    findServiceLocation(): Observable<any>{
      return this.http.get(`${this.apiUrl}/tot-service-center/findServiceCenter`)
    }

    updateServiceLocation(data:any): Observable<any>{
      return this.http.post(`${this.apiUrl}/nbr-service-numbers/updateServiceLocation`,data)
    }
 
    findAllNumberingReport():Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-report/findAll`)
    }

    findReportN11Active():Observable<any>{
      return this.http.get(`${this.apiUrl}/report-n-11/findReportN11Active`)
    }
    findReportN11Inactive():Observable<any>{
      return this.http.get(`${this.apiUrl}/report-n-11/findReportN11Inactive`)
    }
    findReportN11InProgress():Observable<any>{
      return this.http.get(`${this.apiUrl}/report-n-11/findReportN11InProgress`)
    }

    findAllReportN12():Observable<any>{
      return this.http.get(`${this.apiUrl}/report-n-12/findAll`)
    }

    findAllReportN13():Observable<any>{
      return this.http.get(`${this.apiUrl}/report-n-13/findAll`)
    }

    findAllReportN15():Observable<any>{
      return this.http.get(`${this.apiUrl}/report-n-15/findAll`)
    }

    findAllReportN16Inc():Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-report-1000/findReportN16Inc`)
    }

    findAllReportN16Only():Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-report-1000/findReportN16Only`)
    }

    findDataExport():Observable<any>{
      return this.http.get(`${this.apiUrl}/numbering-data-export/findAll`)
    }

    findReportN16Block1000():Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-report-1000/findAll`)
    }
    findReportN16Block500Inc():Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-report-500/findAllOnly`)
    }
    findReportN16Block100Inc():Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-report-100/findAll`)
    }
    findReportN16Block500Only():Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-report-500/findAll`)
    }
    findReportN16Block100Only():Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-report-100/findAllOnly`)
    }
    // findUserDetail(username:string):Observable<any>{
    //   return this.http.get(`${this.apiUrl}/numbering-users/findUserDetail/${username}`)
    // }
    findByEmpCode(empCode:string):Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-users-roles/findByEmpId/${empCode}`)
    }
    findAllPrivilegs():Observable<any>{
      return this.http.get(`${this.apiUrl}/numbering-privileges/findAll`)
    }
    findAllRole(empCode:string):Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-roles/findAll/${empCode}`)
    }
    findLocationCode(locationCode:string):Observable<any>{
      return this.http.get(`${this.apiUrl}/tot-service-center/findByLocationCode/${locationCode}`)
    }
    findProviderById(id:string):Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-providers/findByProviderId/${id}`)
    }findAssignedById(id:string):Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-assigned/findByAssignedId/${id}`)
    }findBlockById(id:number):Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-blocks/findByBlockId/${id}`)
    }
    findCrmStatus(telNo:string):Observable<any>{
      return this.http.get(`${this.apiUrl}/nbr-crm-asset/findByTelNo/${telNo}`)
    }
    findAssignedAmount(data:any):Observable<any>{
      return this.http.post(`${this.apiUrl}/nbr-assigned/findAssignedAmount`,data)
    }
  }