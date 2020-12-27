import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {User} from '../../models/user/user';
import {Parameter} from '../../models/parameter/parameter';
import {EditDataSetService} from '../../services/edit-data-set/edit-data-set.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {
  user: User;
  dataSetId: number;
  dataSetTitle: string;
  theTestCaseId: number;
  isFound = true;
  authenticationServiceSubscription: Subscription;
  private querySubscription: Subscription;
  parametersSubscription: Subscription;
  value = '';
  searchMode = false;
  previousKeyword: string = null;
  parameterValue: string;
  parameterType: string;
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements: number;
  parameters: Parameter[] = [];
  theProjectId: number;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private parametersService: EditDataSetService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.dataSetTitle = queryParam.title;
      }
    );
    this.dataSetId = +this.route.snapshot.paramMap.get('id');
    this.theProjectId = +this.route.snapshot.paramMap.get('projectId');
    this.theTestCaseId = +this.route.snapshot.paramMap.get('testCaseId');
  }

  ngOnInit(): void {
    this.listParameters();
  }

  doSearch(value: string): void {
    this.value = value;
    this.listParameters();
  }

  listParameters(): void {
    this.searchMode = !!this.value;

    if (this.searchMode) {
      this.handleSearchDataSets();

    } else {
      this.handleDataSets();
    }
  }

  createParameter(): void{
    const parameter: Parameter = new Parameter();
    parameter.value = this.parameterValue;
    parameter.type = this.parameterType;
    parameter.idDataSet = this.dataSetId;
    this.parametersService.createParameter(parameter).subscribe();
    this.parameterType = '';
    this.parameterValue = '';
    this.listParameters();
  }

  private handleDataSets(): void {
    this.parametersSubscription = this.parametersService
      .getParameters(this.thePageNumber, this.thePageSize, this.dataSetId)
      .subscribe(data => {
        this.parameters = data.parameters;
        this.theTotalElements = data.totalParameters;
      });
  }

  private handleSearchDataSets(): void {
    const theKeyword: string = this.value;
    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.parametersSubscription = this.parametersService.searchParameters(
      this.thePageNumber,
      this.dataSetId,
      this.thePageSize,
      theKeyword)
      .subscribe(data => {
        this.parameters = data.parameters;
        this.theTotalElements = data.totalParameters;
      });
  }

  backToDataSet(): string{
    return `/projects/${this.theProjectId}/test-cases/${this.theTestCaseId}/data-set`;
  }

  deleteParameter(id: number): void{
    this.parametersService.deleteParameter(id).subscribe();
    this.listParameters();
  }

  editParameter(parameter: Parameter): void{
    this.router.navigate(['projects', this.theProjectId, 'test-cases', this.theTestCaseId, 'data-set', this.dataSetId, 'parameters', parameter.id],
      {
        queryParams: {
          dataSetTitle: this.dataSetTitle,
          value: parameter.value,
          type: parameter.type,
      }
    });
  }
}
