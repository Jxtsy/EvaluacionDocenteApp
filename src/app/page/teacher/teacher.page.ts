import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EvaluacionPageModule } from '../evaluacion/evaluacion.module';
import { getEvaluacionByUserIdAndTeacherId } from 'src/main';
import { NotificationService } from 'src/app/services/notificacion.services';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.page.html',
  styleUrls: ['./teacher.page.scss'],
})
export class TeacherPage implements OnInit {

  constructor(
    private http: HttpClient, 
    private route: Router,
    private notificationService: NotificationService) { }
  @ViewChild('modalRef') modalRef: any;
  public teachers: any = [];
  isModalOpen = false;
  selectedTeacher: any;
  userId: number = 0;
  isEvaluted = false;

  componet = EvaluacionPageModule;

  ngOnInit() {
    const state = this.route.getCurrentNavigation()?.extras?.state;
    if (state) {
      this.userId = state['userId'];
      console.log("UserId:", this.userId)
    }

    let url = "./../assets/data/teachers.json";
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
      this.teachers = result;
      console.log(result);
    })
  }

  setOpen(isOpen: boolean, teacher: any) {
    this.isModalOpen = isOpen;
    this.selectedTeacher = teacher;
  }

  async navigateToEvaluation(selectedTeacher: any) {
    try {
      const evaluation = await getEvaluacionByUserIdAndTeacherId(this.userId, selectedTeacher.id);
      if (evaluation) {
        console.log("Evaluación encontrada:", evaluation);
        this.notificationService.success('Ya se encuentra evaluado.');
        this.modalRef.dismiss();
        this.setOpen(false, selectedTeacher);
      } else {
        console.log("No se encontró ninguna evaluación para el usuario y profesor dados.");
        this.modalRef.dismiss();
        this.setOpen(false, selectedTeacher);
        // Redirigir a la página de evaluación con los datos necesarios
        const navigationExtras: NavigationExtras = { state: { teacher: selectedTeacher, idUser: this.userId } };
        this.route.navigate(['/evaluacion'], navigationExtras);
      }
    } catch (error) {
      console.error("Error al buscar la evaluación:", error);
      // Aquí puedes manejar cualquier error que pueda ocurrir al buscar la evaluación
    }
  }

  logOut() {
    localStorage.clear()
    this.route.navigate(['login']);
  }

}