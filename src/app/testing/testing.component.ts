import { Subscription } from 'rxjs';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { User } from '../../models/testing.model';
import { TestService } from '../../services/test.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  userList: any[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private userService: TestService,
    private weatService: WeatherService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadUserList();
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      job: ['', Validators.required],
    });
  }

  // checkWord(control: FormControl) {
  //   const word = control.value;
  //   const regex = /PK/i;
  //   if (regex.test(word)) {
  //     return { pkIncluded: true };
  //   }
  //   return null;
  // }

  loadUserList(): void {
    const subscription = this.userService.listUser().subscribe(
      (response) => {
        this.userList = response.data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
    this.subscriptions.push(subscription);
  }

  update() {
    const user: User = {
      name: this.userForm.value.name,
      job: this.userForm.value.job,
    };
    const subscription = this.userService.createUser(user).subscribe(
      (response) => {
        console.log('User created:', response);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
    this.subscriptions.push(subscription);
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.update();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
