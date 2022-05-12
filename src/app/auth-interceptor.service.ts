import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log(req.method+' request to url: '+req.url)
        const modifiedReq=req.clone({
            headers:req.headers.append('Auth','authkey')
        });
        return next
        .handle(modifiedReq)
        // .pipe(tap(event=>{
        //     console.log(event)
        //     if(event.type==HttpEventType.Response){
        //         console.log('Response arrived, body data: ')
        //         console.log(event.body)
        //     }
        // }));
    }
}