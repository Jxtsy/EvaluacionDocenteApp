import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { saveResult } from 'src/main';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.page.html',
  styleUrls: ['./evaluacion.page.scss'],
})
export class EvaluacionPage implements OnInit {

  constructor(private http: HttpClient, private route: Router) { }
  public questions: any = [];
  public evaluationData: any = {};
  teacher: Teacher = {};
  userId: number = 0;
  teacherId: number = 0;

  ngOnInit() {
    const state = this.route.getCurrentNavigation()?.extras?.state;
    if(state) {
      this.userId = state['idUser']
      this.teacherId = state['teacher']["id"]
      console.log(this.userId, this.teacherId)
    }

    let url = "./../assets/data/questions.json";
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
      this.questions = result;
      console.log(result);
    })
  }

  close() {
    this.route.navigate(['home/teacher']);
  }

  submitEvaluation() {
    console.log("Recogiendo datos", this.userId, this.teacherId);
    this.questions.forEach((question: Question) => {
    });

    console.log(this.questions)

    saveResult(this.userId, this.teacherId, this.questions);

    this.route.navigate(['home/teacher']);
  }  
}

interface Question {
  PreguntaId: number,
  Pregunta: string,
  Ranking: number
}

interface Teacher {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  schedules?: string[];
  officeLocation?: string;
  yearsOfExperience?: number;
  degree?: string;
}