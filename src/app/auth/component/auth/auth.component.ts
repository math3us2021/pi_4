import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {
//   formulario!: FormGroup;
//   mySubscription: Subscription | undefined;


//   email = new FormControl('', [Validators.required, Validators.email]);
//   password = new FormControl('', [Validators.required, Validators.email]);

//   matcher = new MyErrorStateMatcher();

//   constructor(
//     private formBuilder: FormBuilder,
//     private authService: AuthService,
//     private router: Router,
//   ) {
//     // console.log(this.formulario.value)
//   }

//   ngOnInit(): void {
//     this.formulario = this.formBuilder.group({
//       email: [''],
//       password: ['']
//     });
//     console.log(this.formulario, this.formulario.value, this.formulario.value.email)
//   }

//   onEmailChange() {
//     // this.authService.showMenu(this.email)
//   }

//   login(data: any){
//     console.log("🚀 ~ file: auth.component.ts:58 ~ AuthComponent ~ login ~ data:", data,
//     this.formulario.value.email, this.formulario.value.password)
//     // this.router.navigate(['/home']);
//   }
// onSubmit(data: any){
//   console.log("🚀 ~ file: auth.component.ts:62 ~ AuthComponent ~ onSubmit ~ data", data)
//   // this.router.navigate(['/home']);
// }

userForm!: FormGroup;

constructor(
  private fb: FormBuilder,
  private authServes : AuthService
  ) {
  this.createForm();
}



createForm() {
  this.userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
}

onSubmit(data: any) {
  this.authServes.showMenu(data.email, data.password)
}

}
