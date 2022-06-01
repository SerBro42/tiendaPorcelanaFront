import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  editProfileForm!: FormGroup;
  errors: any = null;
  UserProfile!: User;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
  ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
    });
    this.editProfileForm = this.fb.group({
       name: [''],
       email: [''],
       address: [''],
       password: [''],
       password_confirmation: [''],
    });
   }

  ngOnInit() {
    this.editProfileForm.get('name')?.setValue(this.UserProfile.name);
    this.editProfileForm.get('email')?.setValue(this.UserProfile.email);
    this.editProfileForm.get('address')?.setValue(this.UserProfile.address);
    this.editProfileForm.get('password')?.setValue('');
    this.editProfileForm.get('password_confirmation')?.setValue('');

  }


  onSubmit() {
    this.userService.editUser(this.UserProfile.id, this.editProfileForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.editProfileForm.reset();
        this.router.navigate(['profile']);
      }
    )
  }

}
