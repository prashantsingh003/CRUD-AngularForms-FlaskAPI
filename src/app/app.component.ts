import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http.post('http://127.0.0.1:5000/',postData,)
    .subscribe(responseData=>{
      console.log(responseData);
    });
  }

  onGetPosts(){
    this.http.get('http://127.0.0.1:5000/')
    .subscribe(responseData=>{
      console.log(responseData);
    })
  }

  onFetchPosts() {
    this.fetchPosts
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.http
    .get('http://127.0.0.1:5000/')
    .pipe(map(responceData=>{
      const postArray=[];
      for(const key in responceData){
        if(responceData.hasOwnProperty(key)){
          postArray.push({ ...responceData[key],id:key})
        }
      }
      return postArray;
    }))
    .subscribe(
      post=>{
        console.log(post);
      }
    );
  };
}
