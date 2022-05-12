import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching:boolean=false;
  error=null;

  constructor(
    private http: HttpClient,
    private postsService:PostsService
    ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postsService.sendPostData(postData);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    if (window.confirm('You sure you want to delete all posts?'))
    {
      this.postsService.deleteAll()
      .subscribe(response=>{
        console.log(response);
        this.loadedPosts=[];
        window.alert(response['message'])
      })
    }
  }

  private fetchPosts(){
    this.isFetching=true;
    this.postsService
      .fetchPosts()
      .subscribe(
        posts => {
          // console.log(posts);
          this.loadedPosts = posts;
          this.isFetching=false;
        },error=>{
          this.error=error.message;
          console.log(error);
        });
  }

  handleError(){
    this.isFetching=false;
    this.error=null;
  }
}
