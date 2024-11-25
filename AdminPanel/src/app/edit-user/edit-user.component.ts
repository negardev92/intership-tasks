
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiGetUserService } from '../api-get-user.service';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../satatemangementlocal.service';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: number;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  users: User[] = [];
  userForm!: FormGroup;
  user!: User;
  findUserEdite!: User;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiGetUserService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,

  ) { }

ngOnInit(): void {
  this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
  });

  this.userService.users$.subscribe(users => {
      this.users = users;

      this.route.params.subscribe(param => {
          const userId = +param['id'];
          this.getUser(userId);
          this.findMatchingUser(userId);
      });
  });
}  
getUser(userId: number) {
  if (this.users) {
      this.user = this.users.find(userdata => userdata.id === userId);
      if (this.user) {
          if (this.userForm) {
              this.userForm.patchValue({
                username: this.user.name,
                  password: this.user.password,
                  phone: this.user.phone,
                  email: this.user.email,
              });
          } 
      } else {
          alert('کاربر پیدا نشد.');
      }
  }
}

  findMatchingUser(userId: number) {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUserFromApi = this.users.find(userdata => userdata.id === userId);

    console.log(foundUserFromApi)

    if (foundUserFromApi) {
      const matchingUser = storedUsers.find(storedUser => storedUser.name === foundUserFromApi.name);

      if (matchingUser) {
        console.log('user found:', matchingUser);
        this.findUserEdite = matchingUser;
      } else {
        console.log('No matching user found in local storage.');
      }
    }
  }
  onSubmit() {
    
    if (this.userForm.valid) {

      if (!this.findUserEdite) {
        console.error('No user found to update.');
        alert('No user found to update.');
        return;
      }

      const updatedUser = {
        ...this.findUserEdite,
        name: this.userForm.value.username,
        password: this.userForm.value.password,
        phone: this.userForm.value.phone,
        email: this.userForm.value.email,
      };

      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

      const index = storedUsers.findIndex(user => user.name === this.findUserEdite.name)

      if (index !== -1) {
        storedUsers[index] = updatedUser;
        this.userService.updateUsers(storedUsers);

        alert('Changes saved successfully!');
        this.router.navigate(['admin']);
      } else {
        console.error('User not found in local storage.');
        alert('User not found in local storage.');
      }
    }
  }
}