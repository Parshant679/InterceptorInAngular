import { Injectable } from '@angular/core';
import { Observable, tap ,map} from 'rxjs';
import { HttpInterceptor ,HttpClient,HttpHandler,HttpEvent, HttpRequest,HttpResponse} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'your token';
    const request = req.clone({
      setHeaders:{
        Authorization: 'Bearer'+token,
      },
    });
    
    return next.handle(request).pipe(
      tap(
        (event)=> {
                 if(event instanceof HttpResponse){
                  console.log('Resposne' ,event);
                 }
        },
        (error) => {
                if(error instanceof HttpResponse){
                  console.log('response' ,error);
                }
        }
      ),
      map((event) =>{
        if (event instanceof HttpResponse) {
          // For example, you can modify the response data
          const modifiedResponse = event.clone({
            body: event.body && event.body.data.toUpperCase(),
          });
          return modifiedResponse;
        }
        return event;
      })
    );
  }
   
  
 
}