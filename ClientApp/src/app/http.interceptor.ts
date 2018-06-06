import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from "@angular/common/http";
import { Observable } from "rxjs";
 
@Injectable()
export class HttpInterceptorClass implements HttpInterceptor {
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		const customHeaderRequest = request.clone({
			headers: request.headers
				.set("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT")
				.set("Cache-Control", "no-cache")
				.set("Pragma", "no-cache")
		});

		return next.handle(customHeaderRequest);
  }
}