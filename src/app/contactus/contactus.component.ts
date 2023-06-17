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
  isDisabled: boolean = true;
  maximumCharacters: number = 150;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.createContactForm();
    this.subscribeToFormChanges();
  }

  createContactForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  subscribeToFormChanges() {
    this.contactForm.statusChanges.subscribe((value) => {
      this.contactForm.updateValueAndValidity;
      if (value == 'VALID') {
        this.isDisabled = false;
      } else this.isDisabled = true;
    });
  }

  updateMessage() {
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

  onSubmit() {
    if (this.contactForm.valid) {
      this.updateMessage();
      this.contactForm.reset();
    }
  }
}
