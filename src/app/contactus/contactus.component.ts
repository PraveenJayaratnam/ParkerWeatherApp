import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactInterface } from '../../models/contactus.model';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  onSubmit() {
    const contactUs: ContactInterface = this.contactForm.value;
    this.http
      .post(
        'https://parkerweatherapp-default-rtdb.firebaseio.com/contactUs.json',
        contactUs
      )
      .subscribe(
        () => {},
        (error) => {}
      );
  }
}
