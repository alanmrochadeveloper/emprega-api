import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { Observable, map } from "rxjs";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((data) => instanceToPlain(this.transform(data))));
  }

  transform(data) {
    return Array.isArray(data)
      ? data.map((obj) => obj.toObject())
      : data.toObject();
  }
}
