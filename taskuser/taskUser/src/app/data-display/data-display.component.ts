
import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent {
  users: any[] = [];
  posts: any[] = [];
  albums: any[] = [];
  tasks: any[] = [];
  currentView: string = '';


  constructor(private apiService: ApiService) {
    this.apiService.getDataFromUsers().subscribe(data => {
      this.users = data;
    });
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