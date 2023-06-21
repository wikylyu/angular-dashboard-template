import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, EMPTY, throwError, NEVER } from 'rxjs';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpService } from './http.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private message: NzMessageService,
    private http: HttpService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.message.error('参数错误');
        } else if (err.status === 401) {
          this.router.navigateByUrl('/login');
          this.http.reset();
          return NEVER;
        } else if (err.status === 403) {
          this.message.error('无权访问该接口');
        } else if (err.status === 404) {
          this.message.error('接口不存在');
        } else if (err.status === 500) {
          this.message.error('接口错误');
        } else {
          this.message.error('网络错误');
        }
        return EMPTY;
      })
    );
  }
}
