import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, map, throwError } from 'rxjs';

export class ApiException extends Error {
  status: number;
  data: any;

  constructor(status: number, data?: any) {
    super(`ApiException: ${status}`);
    this.data = data;
    this.name = 'ApiException';
    this.status = status;

    // 👇 让 TypeScript 正确识别为 ApiException
    Object.setPrototypeOf(this, ApiException.prototype);
  }
}

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const message = inject(NzMessageService);
  const router = inject(Router);
  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const body = event.body;
        if (!body) {
          return event;
        }

        // 👉 如果 status === 0，返回 data
        if (body.status === 0) {
          return event.clone({ body: body.data });
        } else {
          // 👉 如果状态码不是 0，抛出异常（用于全局捕获
          throw new ApiException(body?.status, body?.data);
        }
      }
      return event;
    }),
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400) {
          message.warning('客户端错误');
          return throwError(() => new Error('400'));
        } else if (err.status === 500) {
          message.warning('网络错误');
          return throwError(() => new Error('500'));
        } else if (err.status === 403) {
          // 403 Forbidden
          message.warning('没有权限访问该接口');
          return throwError(() => new Error('403'));
        } else if (err.status === 401) {
          // 401 Unauthorized
          if (!router.url.startsWith('/login')) {
            router.navigate(['/login'], {
              replaceUrl: true,
              queryParams: { r: router.url },
            });
          }
          return throwError(() => new Error('401'));
        } else {
          message.warning('网络错误');
          return throwError(() => err);
        }
      }
      return throwError(() => err);
    })
  );
};
