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
  formulario!: FormGroup;
  mySubscription: Subscription | undefined;

  email1(event: string) {
    // console.log("🚀 ~ file: auth.component.ts:18 ~ AuthComponent ~ email1 ~ event:", event)
    // this.email = event

  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    // console.log(this.formulario.value)
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [''],
      username: [''],
      email: ['matheus'],
      password: ['']
    });
    console.log(this.formulario, this.formulario.value, this.formulario.value.email)
  }

  onEmailChange() {
    // this.authService.showMenu(this.email)
  }

  login(){
    this.router.navigate(['/home']);
  }

}
