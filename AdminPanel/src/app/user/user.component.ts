
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiGetUserService } from '../api-get-user.service'; 


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

  constructor(private route: ActivatedRoute, private apiService:  ApiGetUserService ) { }


  ngOnInit(): void {
    this.apiService.getDataFromUsers().subscribe(data => {
        this.users = data;

        this.route.params.subscribe((param)=>{
          const userId = +param['id'];
          console.log(userId)
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
}
