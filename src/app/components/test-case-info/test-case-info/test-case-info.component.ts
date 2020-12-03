import {Component, OnInit} from '@angular/core';
import {ActionResult} from '../../../models/action-result/ActionResult';
import {ActionStatus} from '../../../models/action-result/ActionStatus';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-test-case-info',
  templateUrl: './test-case-info.component.html',
  styleUrls: ['./test-case-info.component.css'],
  styles: []
})
export class TestCaseInfoComponent implements OnInit {
  detailsSwitch: number;
  actionResults: ActionResult[] = [];
  testCaseId: number;
  isCompleted: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.testCaseId = route.snapshot.params.idTestCase;

  }

  ngOnInit(): void {
    this.getActions('');
  }

  getActions(title: string): void {
    this.actionResults = [
      {
        action: {compoundId: 123, actionType: 'read', element: 'test1', argument: 'arg1'},
        status: ActionStatus.SUCCESSFUL,
        description: 'lol',
        screenshotUrl: 'idk.com'
      },
      {
        action: {compoundId: 344, actionType: 'readaasd', element: 'tes1dgt1', argument: 'arg1'},
        status: ActionStatus.SUCCESSFUL,
        description: 'lolfbb',
        screenshotUrl: 'idk.cbafom'
      }, {
        action: {compoundId: 455, actionType: 'reasdgad', element: 'teasfgst1', argument: 'arg1'},
        status: ActionStatus.FAILED,
        description: 'lolbab',
        screenshotUrl: 'idkafb.com'
      }, {
        action: {compoundId: 1234, actionType: 'readgd', element: 'tesat1', argument: 'arg1'},
        status: ActionStatus.SUCCESSFUL,
        description: 'lobbl',
        screenshotUrl: 'idkafb.com'
      }, {
        action: {compoundId: 566, actionType: 'reaghhad', element: 'tehst1', argument: 'arg1'},
        status: ActionStatus.FAILED,
        description: 'lodasfl',
        screenshotUrl: 'idafk.com'
      }, {
        action: {compoundId: 146, actionType: 'rerqad', element: 'testhh1', argument: 'arg1'},
        status: ActionStatus.SUCCESSFUL,
        description: 'lofal',
        screenshotUrl: 'iabfdk.com'
      }, {
        action: {compoundId: 146, actionType: 'rehad', element: 'teafst1', argument: 'arg1'},
        status: ActionStatus.SUCCESSFUL,
        description: 'lvvvol',
        screenshotUrl: 'idk.com'
      }, {
        action: {compoundId: 2355, actionType: 'reafgd', element: 'thsfest1', argument: 'arg1'},
        status: ActionStatus.FAILED,
        description: 'lovvl',
        screenshotUrl: 'idabfk.com'
      },

    ]
    ;
  }

  isSuccessful(actionStatus: ActionStatus): string {
    if (actionStatus === ActionStatus.SUCCESSFUL) {
      return 'green';
    } else {
      return 'red';
    }
  }

  showDetails(index: number): boolean {
    return this.detailsSwitch === index;
  }

  getDetails(index: number): void {
    if (this.detailsSwitch === index) {
      this.detailsSwitch = -1;
    } else {
      this.detailsSwitch = index;
    }
  }

  goBack(): void {
    this.router.navigate(['/data-set', this.testCaseId]);
  }

  sendReport(): void {
    this.router.navigate(['/test-scenario', this.testCaseId, 'send-report']);
  }
}
