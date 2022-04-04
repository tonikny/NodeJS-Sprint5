import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      nom: [''],
      email: [''],
      password: [''],
    });
  }
  
  registerUser() {
    this.authService.register(this.signupForm.value).subscribe((res) => {
      //console.log(res);
      if (res.result) {
        this.signupForm.reset();
        this.router.navigate(['login']);
      }
      else {console.log('No s\'ha pogut registrar');
      }
    });
  }
}
