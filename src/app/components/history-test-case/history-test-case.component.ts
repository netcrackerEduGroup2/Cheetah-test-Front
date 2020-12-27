import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../services/auth/auth.service';
import {GetHistoryTestCase, HistoryService} from '../../services/history/history.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-history-test-case',
  templateUrl: './history-test-case.component.html',
  styleUrls: ['./history-test-case.component.css']
})
export class HistoryTestCaseComponent implements OnInit {

  pageSize = 8;

  numPage = 1;

  testCase: GetHistoryTestCase;

  emptyRow = [];
  projectId: number;
  testCaseId: number;
  titleTestCase: string;

  constructor(private auth: AuthService,
              private historyService: HistoryService,
              private route: ActivatedRoute,
              private router: Router) {
    this.testCaseId = +this.route.snapshot.paramMap.get('idTestCase');
    this.projectId = +this.route.snapshot.paramMap.get('idProject');
    this.route.queryParams
      .subscribe(params =>
        this.titleTestCase = params[Object.keys(params)[0]]);
    this.testCase = {
      historyTestCases: [],
      totalTestCases: 0
    };
    this.historyService.getHistoryTestCase(
      this.testCaseId, this.pageSize, this.numPage)
      .subscribe(elem => {
        this.testCase = elem;
        this.emptyRow = new Array(this.pageSize - this.testCase.historyTestCases.length + 3);
      });
  }

  pageChange(page: number): void {
    this.historyService.getHistoryTestCase(this.testCaseId,
      this.pageSize, page)
      .subscribe(elem => {
        this.testCase = elem;
        this.emptyRow = new Array(this.pageSize - this.testCase.historyTestCases.length + 3);
      });
  }

  detailsTestCase(id: number, date: string): void {
    let HTCTitle;
    this.route.queryParams
      .subscribe(params => {
        HTCTitle = params[Object.keys(params)[0]];
        this.router.navigate(['projects', this.projectId, 'test-cases', this.testCaseId, 'history', id],
          {queryParams: { HTCTitle: HTCTitle}});
      });
  }

  goBack(): Promise<boolean> {
    return this.router.navigate(['/projects', this.projectId, 'test-cases']);
  }

  ngOnInit(): void {

  }

}
