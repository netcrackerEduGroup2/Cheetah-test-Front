import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Parameter} from '../../models/parameter/parameter';
import {EditDataSetService} from '../../services/edit-data-set/edit-data-set.service';

@Component({
  selector: 'app-parameters-edit',
  templateUrl: './parameters-edit.component.html',
  styleUrls: ['./parameters-edit.component.css']
})
export class ParametersEditComponent implements OnInit{
  user: User;
  parameter: Parameter = new Parameter();
  dataSetId: number;
  dataSetTitle: string;
  theProjectId: number;
  testCaseId: number;
  createParametersForm: FormGroup;
  createParameterSubscription: Subscription;
  parameterSubscription: Subscription;
  querySubscription: Subscription;
  authenticationServiceSubscription: Subscription;
  loading = false;
  isEdit = false;
  id: number;
  errorMessage: string;

  constructor(private authenticationService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private editDataSetService: EditDataSetService,
  ) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.dataSetTitle = queryParam.dataSetTitle;
        this.parameter.value = queryParam.value;
        this.parameter.type = queryParam.type;
      }
    );
    this.theProjectId = +this.route.snapshot.paramMap.get('projectId');
    this.testCaseId = +this.route.snapshot.paramMap.get('testCaseId');
    this.dataSetId = +this.route.snapshot.paramMap.get('dataSetId');
    this.parameter.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.createParametersForm = this.formBuilder.group({
      value: new FormControl(this.parameter.value,
        [Validators.required,
          Validators.maxLength(100),
          Validators.minLength(3)]),
      type: new FormControl(this.parameter.type,
        [Validators.required,
          Validators.maxLength(100),
          Validators.minLength(3)])
    });
  }

  get value(): any {
    return this.createParametersForm.get('value');
  }

  get type(): any {
    return this.createParametersForm.get('type');
  }


  onSubmit(): void {
    this.errorMessage = '';
    if (this.value.value === this.parameter.value && this.type.value === this.parameter.type) {
      this.errorMessage = 'Parameter Already Exists';
    } else {
      this.parameter.value = this.value.value;
      this.parameter.type = this.type.value;
      this.parameter.idDataSet = this.dataSetId;
      this.parameterSubscription = this.editDataSetService.editParameter(this.parameter).subscribe();
    }
  }

  backToParameters(): void{
    this.router.navigate(['projects', this.theProjectId, 'test-cases', this.testCaseId, 'data-set', this.dataSetId, 'parameters'], {queryParams: {title: this.dataSetTitle}});
  }
}
