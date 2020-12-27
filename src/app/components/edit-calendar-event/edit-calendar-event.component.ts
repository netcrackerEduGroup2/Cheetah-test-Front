import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user/user';
import {DatePostDto} from '../../models/date/date-post-dto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CalendarService} from '../../services/calendar/calendar.service';
declare var $: any;

@Component({
  selector: 'app-edit-calendar-event',
  templateUrl: './edit-calendar-event.component.html',
  styleUrls: ['./edit-calendar-event.component.css']
})
export class EditCalendarEventComponent implements OnInit {
  user: User;
  dateDto: DatePostDto = new DatePostDto();
  time: string;
  editEventForm: FormGroup;
  loading = false;
  authenticationServiceSubscription: Subscription;
  private querySubscription: Subscription;
  searchTerm$ = new Subject<string>();
  datesSubscription: Subscription;
  @ViewChild('term') term;

  constructor(private authenticationService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private calendarService: CalendarService) {
    this.authenticationServiceSubscription = this.authenticationService.user.subscribe(
      x => {
        this.user = x;
      }
    );
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.dateDto.testCaseId = +queryParam.testCaseId;
        this.dateDto.repeatable = queryParam.repeatable === 'true';
        console.log(this.dateDto);
      }
    );
  }

  get newTime(): any {
    return this.editEventForm.get('newTime');
  }

  get newDate(): any {
    return this.editEventForm.get('newDate');
  }

  ngOnInit(): void {
    $('#newDate').min = Date.now();
    this.editEventForm = this.formBuilder.group({
      newDate: new FormControl(''),
      newTime: new FormControl('')
    });
  }

  onSubmit(): void {
    this.dateDto.executionCronDate = this.newDate.value + 'T' + this.newTime.value + ':00';
    this.datesSubscription = this.calendarService
      .editEvent(this.dateDto).subscribe();
    this.router.navigate(['/calendar']);
  }

  delete(): void {
    this.datesSubscription = this.calendarService
      .deleteDates(this.dateDto.testCaseId).subscribe();
    this.router.navigate(['/calendar']);
  }
}
