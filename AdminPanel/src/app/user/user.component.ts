
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiGetUserService } from '../api-get-user.service'; 
import { UserService } from '../satatemangementlocal.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  user: any;
  posts: any[] = [];
  albums: any[] = [];
  tasks: any[] = [];
  currentView: string = 'posts';
  userIdSlected:any = [];

  constructor(private route: ActivatedRoute, private apiService:  ApiGetUserService, private router: Router,private userService: UserService ) { }


  ngOnInit(): void {
    // this.apiService.getDataFromUsers().subscribe(data => {
    //   this.users = data;
    
    this.userService.users$.subscribe(users => {
      this.users = users;
      
        this.route.params.subscribe((param)=>{
          const userId = +param['id'];
        this.getUser(userId);
        });
      })

}

getUser(userId: number) {
    if (this.users) { 
        this.user = this.users.find(userdata => userdata.id === userId);
        if (this.user) {
            this.fetchPosts(this.user.id, 'posts');
          }
        }
      }


  switchView(view: string) {
    this.currentView = view;
  }

  fetchPosts(UserId: string, viwe: string) {
    this.apiService.getDataFromPost(UserId).subscribe(data => {
      this.posts = data;
      
      this.switchView(viwe);
    })
  }

  fetchAlbums(userId: string, viwe: string) {
    this.apiService.getDataFromaAlbums(userId).subscribe(data => {
      this.albums = data;
      this.switchView(viwe);
    });
  }

  fetchTasks(userId: string, viwe: string) {
    this.apiService.getDataFromaTask(userId).subscribe(data => {
      this.tasks = data;
      this.switchView(viwe);
    });
  }
  edite(userId:any) {
    this.router.navigate(['admin', 'edite', userId]);
    
  }

  
}
