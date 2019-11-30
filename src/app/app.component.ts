import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oshope';

  constructor(private auth: AuthService, router: Router, private userService: UserService){
    auth.user$.subscribe(user => {
      if ( !user ) return;
        userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        if( returnUrl ){
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
    });
  }
}
