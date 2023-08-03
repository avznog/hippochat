import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, timeout } from "rxjs";

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor(@Inject("DEFAULT_TIMEOUT") protected defaultTimeout: number) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const timeoutValue = req.headers.get("timeout") || this.defaultTimeout;
      const timeoutValueNumeric = Number(timeoutValue);
      return next.handle(req).pipe(timeout(timeoutValueNumeric));
  }
}