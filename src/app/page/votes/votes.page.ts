import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { getEvaluaciones } from 'src/main'; // Asegúrate de ajustar la importación según tu estructura de proyecto
import { Observable } from 'rxjs';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.page.html',
  styleUrls: ['./votes.page.scss'],
})
export class VotesPage implements OnInit {
  public teachers = [];
  public thirdPlace = { photo: '', name: '', place: "Tercer Lugar", score: 0 };
  public secondPlace = { photo: '', name: '', place: "Segundo Lugar", score: 0 };
  public firstPlace = { photo: '', name: '', place: "Primer Lugar", score: 0 };

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit() {
    this.loadTeachersAndEvaluations();
  }

  async loadTeachersAndEvaluations() {
    try {
      // Cargar lista de maestros
      let url = "./../assets/data/teachers.json";
      let data: Observable<any> = this.http.get(url);
      data.subscribe(result => {
        this.teachers = result;
        console.log(result);

        this.loadEvaluations();
      });

    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  async loadEvaluations() {
    try {
      const evaluations = await getEvaluaciones();
      this.calculateScores(this.teachers, evaluations);
    } catch (error) {
      console.error("Error loading evaluations:", error);
    }
  }

  calculateScores(teachers: any[], evaluations: any[]) {
    const teacherScores: { [teacherId: number]: { photo: string, name: string, score: number } } = {};

    const teacherMap = new Map(teachers.map(teacher => [teacher.id, `${teacher.first_name} ${teacher.last_name}`]));

    teachers.forEach(teacher => {
      teacherScores[teacher.id] = {photo: teachers.find(t => t.id == teacher.id).urlImage, name: teacherMap.get(teacher.id) || 'N/A', score: 0 };
    });

    evaluations.forEach(evaluation => {
      const teacherId = evaluation.TeacherId;
      const totalScore = evaluation.Questions.reduce((acc: any, question: any) => acc + parseInt(question.rating), 0);
      if (teacherScores[teacherId]) {
        teacherScores[teacherId].score += totalScore;
      }
    });

    const sortedTeachers = Object.values(teacherScores).sort((a, b) => b.score - a.score);
    console.log("Sort teacher",sortedTeachers);

    if (sortedTeachers.length > 0) {
      this.firstPlace = { photo: sortedTeachers[0].photo, name: sortedTeachers[0].name, place: 'Primer Lugar', score: sortedTeachers[0].score};
    } else {
      this.firstPlace = { photo: '', name: 'N/A', score: 0, place: 'Primer Lugar' };
    }

    if (sortedTeachers.length > 1) {
      this.secondPlace = { photo: sortedTeachers[1].photo, name: sortedTeachers[1].name, place: 'Segundo Lugar', score: sortedTeachers[1].score};
    } else {
      this.secondPlace = {photo: '', name: 'N/A', score: 0, place: 'Segundo Lugar' };
    }

    if (sortedTeachers.length > 2) {
      this.thirdPlace = { photo: sortedTeachers[2].photo, name: sortedTeachers[2].name, place: 'Primer Lugar', score: sortedTeachers[2].score};
    } else {
      this.thirdPlace = { photo: '', name: 'N/A', score: 0, place: 'Tercer Lugar' };
    }
  }

  logOut() {
    localStorage.clear();
    this.route.navigate(['login']);
  }
}