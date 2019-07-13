import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService{

  constructor(private toastrService: ToastrService){}

  public errorMessage(error: Error): void {
    const parsetError: any = JSON.parse(error.message)

    this.toastrService.error(parsetError.error.message)
  }
}
