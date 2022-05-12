import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({providedIn:'root'})
export class PostsService{

    constructor(private http:HttpClient){}

    sendPostData(postData: { title: string, content: string }) {
        this.http
            .post(
                'http://127.0.0.1:5000/',
                postData,
                {
                    observe:'response'
                }
                )
            .subscribe(
                responseData => {
                    console.log(responseData.body);
                }
            );
    }

    fetchPosts(){   
        let searchParams=new HttpParams()
        searchParams=searchParams.append('print','pretty')
        searchParams=searchParams.append('customKey','keyit is')
        return this.http
            .get<Post>(
                'http://127.0.0.1:5000/',
                {
                    headers:new HttpHeaders({
                        'custom_header':'custom header value'
                    }),
                    params: searchParams
                })
            .pipe(
                map(responceData => {
                    const postArray = [];
                    for (const key in responceData) {
                        if (responceData.hasOwnProperty(key)) {
                            postArray.push({ ...responceData[key], id: key })
                        }
                    }
                    return postArray;
                }), catchError(errorRes=>{
                    return throwError(errorRes);
                })
            );
    }
    deleteAll(){
        return this.http
        .delete(
            'http://127.0.0.1:5000/',
            {
                observe:'body'
            }
            )
            // .pipe(tap(event =>{
            //     console.log(event)
            // }));
    }
}