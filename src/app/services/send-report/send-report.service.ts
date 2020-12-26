import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendReportService {

  constructor(private http: HttpClient) {
  }

  sendReports(emails: string[], idTestCase: number, idProject: number, idHTC: number): Observable<any> {
    const url = `${environment.apiUrl}/api/projects/${idProject}/test-cases/${idTestCase}/send-generate-report/${idHTC}`;
    return this.http.post<any>(url, emails);
  }
}

export interface Emails {
  emails: string[];
}
