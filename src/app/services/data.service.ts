import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import 'rxjs/operator/catch';
import 'rxjs/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/Not-Found-Error';
import { BadRequest } from './../common/bad-request';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( @Inject(String) private URL: string,private http: HttpClient) { }


  getALL() {

    return this.http.get(this.URL)
    .map(response => JSON.parse(JSON.stringify(response)))
      .catch(this.handlError)
  }
  //ajouter un post
  create(resource:any) {
    return this.http.post(this.URL, resource)
    .map(response => JSON.parse(JSON.stringify(response)))
      .catch(this.handlError)


  }

  //modifier un post
  Update(resource: any) {
    return this.http.put(this.URL + '/' + resource.id, resource)
    .map(response => JSON.parse(JSON.stringify(response)))
      .catch(this.handlError)
  }

  ///suprimer un post
  delete(resource: any) {
    return this.http.delete(this.URL + '/' + resource.id)
    .map(response => JSON.parse(JSON.stringify(response)))
      .catch( this.handlError)

  }


handlError( error:Response){
  if (error.status === 404) {
    return Observable.throwError(new NotFoundError)
  }
  if (error.status === 400) {

    return Observable.throwError(new BadRequest)
  }
  return Observable.throwError(new AppError)

}

}
