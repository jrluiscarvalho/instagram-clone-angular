import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService{

  constructor(private toastrService: ToastrService){}

  public errorMessage(error: Error): void {
    let message;

    if(!error) return;

    if(typeof error.message === 'string'){
      message = error.message
    }

    if(typeof error.message === 'object'){
      const parsedError: any = JSON.parse(error.message)
      message = parsedError.error.message
    }

    if(error.message === undefined){
      message = '';
    }

    this.toastrService.error(message)
  }
}
