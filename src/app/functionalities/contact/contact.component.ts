import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactFormService } from 'src/app/shared/contact-form.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private contactFormService: ContactFormService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.pattern('[- +()0-9]+')]),
      message: new FormControl('', [Validators.required, Validators.minLength(10)]),
    })
  }

  get nameField(): any {
    return this.contactForm.get('name');
  }

  get emailField(): any {
    return this.contactForm.get('email');
  }

  get messageField(): any {
    return this.contactForm.get('message');
  }

  onSubmit(form: any){
    console.log(form.value);
    this.contactFormService.insertarFormulario(this.contactForm.value).subscribe();
    this.contactForm.reset();
    let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
  }

}
