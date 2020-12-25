import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TestCase} from '../../models/test-case/test-case';
import {catchError} from 'rxjs/operators';
import {TestCaseDto} from '../../models/test-case/test-case-dto';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  constructor(private http: HttpClient) {
  }

  save(testCase: TestCase, isEdit: boolean, id: number): Observable<any> {
    const url = `${environment.apiUrl}/api/test-cases`;


    if (isEdit) {
      return this.http.put<TestCase>(`${url}/${id}`, testCase)
        .pipe(
          catchError(error => {
            return of(error);
          })
        );
    } else {
      return this.http.post<TestCase>(url, testCase)
        .pipe(
          catchError(error => {
            return of(error);
          })
        );
    }
  }

  getTestCases(projectId: number, pageNum: number, pageSize: number): Observable<GetResponseTestCases> {
    const url = `${environment.apiUrl}/api/projects/${projectId}/test-cases?page=${pageNum}&size=${pageSize}`;
    return this.http.get<GetResponseTestCases>(url);
  }

  getTestCaseById(projectId: number, id: number): Observable<TestCase> {
    const url = `${environment.apiUrl}/api/projects/${projectId}/test-cases/${id}`;
    return this.http.get<TestCase>(url);
  }

  findTestCaseByResultAndTitle(projectId: number,
                               pageNum: number,
                               pageSize: number,
                               result: string,
                               keyword: string): Observable<GetResponseTestCases> {
    const url = `${environment.apiUrl}/api/projects/${projectId}/test-cases/search/findByTitleAndResult?page=${pageNum}&size=${pageSize}&result=${result}&keyword=${keyword}`;
    return this.http.get<GetResponseTestCases>(url);
  }

  findTestCaseByTitle(projectId: number, pageNum: number, pageSize: number, keyword: string): Observable<GetResponseTestCases> {
    const url = `${environment.apiUrl}/api/projects/${projectId}/test-cases/search/findByTitle?page=${pageNum}&size=${pageSize}&keyword=${keyword}`;
    return this.http.get<GetResponseTestCases>(url);
  }

  deactivateTestCase(id: number): Observable<any> {
    const url = `${environment.apiUrl}/api/test-cases/${id}`;
    return this.http.delete<any>(url, {});
  }

  runTestCases(runTestCaseIdsList: number[]): Observable<any> {
    const url = `${environment.apiUrl}/api/test-cases/run`;
    const testCaseDto: TestCaseDto = new TestCaseDto(runTestCaseIdsList);
    return this.http.post<any>(url, testCaseDto).pipe(
      catchError(error => {
        return of(error);
      })
    );
  }
}

interface GetResponseTestCases {
  elements: TestCase[];
  totalElements: number;
}
