import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase'

import { DbService } from '../../../services/db.service'
import { ProgressService } from 'src/app/services/progress.service';
import { interval, Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators'
import { ErrorHandlerService } from 'src/app/services/errorhandler.service';

@Component({
  selector: 'app-include-publications',
  templateUrl: './include-publications.component.html'
})
export class IncludePublicationsComponent implements OnInit {

  public email: string;
  private image: any;

  @Output() public updateTimeline: EventEmitter<any> = new EventEmitter<any>();

  public progressPublish: string = 'pending';
  public percentageUpload: number;

  private subject = new Subject<any>();

  public form: FormGroup = new FormGroup({
    'title': new FormControl(null)
  })

  constructor(
    private dbService: DbService,
    private progressService: ProgressService,
    private errorHandler: ErrorHandlerService
    ) { }

    ngOnInit() {
      try {
        firebase.auth().onAuthStateChanged((user) => {
          this.email = user.email
        })
      } catch (error) {
        this.errorHandler.errorMessage(error)
      }

    }

    public publicar(): void {
      this.dbService.publicar({
        email: this.email,
        title: this.form.value.title,
        image: this.image[0]
      })

      let upload = interval(1500);


      this.subject.next(true)

      upload
      .pipe(takeUntil(this.subject))
      .subscribe(() => {
        this.progressPublish = 'in progress'
        this.percentageUpload = Math.round((this.progressService.state.bytesTransferred / this.progressService.state.totalBytes) * 100);

        if (this.progressService.status === 'finished') {
          this.progressPublish = 'finished'
          this.updateTimeline.emit();
          this.subject.next(false)
        }
      }, (error: Error) => {
        this.errorHandler.errorMessage(error)
      })
    }

    public prepareUploadImage(event: Event): void {
      this.image = (<HTMLInputElement>event.target).files

    }

  }
