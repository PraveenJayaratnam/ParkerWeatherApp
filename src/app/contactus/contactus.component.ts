import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactInterface } from '../../models/contactus.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  contactForm!: FormGroup;
  isDisabled = true;
  maximumCharacters = 150;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

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
      if (value == 'VALID') {
        this.isDisabled = false;
      } else this.isDisabled = true;
    });
  }

  openSnackBar(message: string, action: string | undefined) {
    const snackBarRef = this.snackBar.open(message, action);
    setTimeout(() => {
      snackBarRef.dismiss();
    }, 5000);
  }

  updateMessage() {
    const contactUs: ContactInterface = this.contactForm.value;
    this.http
      .post(
        'https://parkerweatherapp-default-rtdb.firebaseio.com/contactUs.json',
        contactUs
      )
      .subscribe();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.updateMessage();
      this.contactForm.reset();
    }
    this.contactForm.updateValueAndValidity();
  }
}
