import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-call.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  users: any[] = [];
  user: any;
  posts: any[] = [];
  albums: any[] = [];
  tasks: any[] = [];
  currentView: string = 'posts';
  userIdSlected:any = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }


  ngOnInit(): void {
    this.apiService.getDataFromUsers().subscribe(data => {
        this.users = data;

        const userId = +this.route.snapshot.params['id'];
        this.getUser(userId);
    });

 
    this.route.params.subscribe(params => {
        const userIdSelected = +params['id'];
        this.getUser(userIdSelected); 
    });
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
