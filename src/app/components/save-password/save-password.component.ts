import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResetPasswordService} from '../../services/reset-password/reset-password.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-save-password',
  templateUrl: './save-password.component.html',
  styleUrls: ['./save-password.component.css']
})
export class SavePasswordComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  loading = false;
  resetToken: string;
  password: string;
  passwordConfirm: string;
  message: string;

  constructor(private resetService: ResetPasswordService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.resetToken = params.token;
        }
      );

  }

  resetPassword(): void {
    this.loading = true;
    if (this.password === this.passwordConfirm) {
      this.subscription = this.resetService.sendResetTokenAndPassword(this.resetToken, this.password).subscribe({
        next: body => {
          console.log(body.message);
          if (body.message === 'same.password') {
            this.message = 'Same password as before';
          } else if (body.message === 'message.resetPasswordSuc') {
            this.router.navigate(['']);
          } else if (body.message === 'reset.token.null') {
            this.message = 'Reset token doesn\'t exist';
          } else if (body.message === 'token.expired') {
            this.message = 'You have already changed the password';
          } else if (body.message === 'token.invalid') {
            this.message = 'This link is invalid';
          }
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      this.message = 'Password in confirmation doesn\'t match';
    }

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
