import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase'

import { DbService } from '../../../services/db.service'
import { ProgressService } from 'src/app/services/progress.service';
import { Observable, interval, Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators'

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string;
  private imagem: any;
  private subject = new Subject<any>();

  public form: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private dbService: DbService,
    private progressService: ProgressService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void {
    this.dbService.publicar({
      email: this.email,
      titulo: this.form.value.titulo,
      imagem: this.imagem[0]
    })

    let upload = interval(1500);


    this.subject.next(true)

    upload
      .pipe(takeUntil(this.subject))
      .subscribe(() => {
        console.log(this.progressService.status)
        console.log(this.progressService.estado)

        if (this.progressService.status === 'concluido') {
          this.subject.next(false)
        }
      })
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files

  }

}
