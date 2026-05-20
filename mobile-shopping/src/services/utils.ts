import { of, Observable } from 'rxjs'
import { delay } from 'rxjs/operators'

export const mockApiCall = <T>(data: T): Observable<T> => {
  return of(data).pipe(delay(500))
}