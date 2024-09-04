import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { getEvaluaciones } from 'src/main'; // Ajusta la importación según tu estructura de proyecto

@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {
  public teachers: any = [];
  public questions: any = [];
  teacher: string[] = [];
  questionIds: number[] = [];
  evaluations: any[] = [];

  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit() {
    let url = "./../assets/data/teachers.json";
    let urlQuestions = "./../assets/data/questions.json";
    let data: Observable<any> = this.http.get(url);
    let questionsData: Observable<any> = this.http.get(urlQuestions);

    data.subscribe(result => {
      this.teachers = result;
      this.teacher = this.teachers.map((t: Teacher) => t.first_name);
    });

    questionsData.subscribe(result => {
      this.questions = result;
      this.questionIds = this.questions.map((q: any) => q.id);

      this.loadEvaluations();
    });
  }

  async loadEvaluations() {
    try {
      const evaluaciones = await getEvaluaciones();
      this.evaluations = evaluaciones;
      this.updateChartOptions();
    } catch (error) {
      console.error("Error loading evaluations:", error);
    }
  }

  updateChartOptions() {
    this.options = {
      legend: {
        data: this.teacher
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value'
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: this.questionIds
        }
      ],
      series: this.generateSeriesData()
    };
  }

  generateSeriesData(): any[] {
    let seriesData: any[] = [];

    this.teachers.forEach((teacher: Teacher) => {
      const teacherEvaluations = this.evaluations.filter(e => e.TeacherId === teacher.id);
      const ratings = this.questionIds.map(qId => {
        const questionRatings = teacherEvaluations.flatMap(evaluation =>
          evaluation.Questions.filter((q: any) => q.id === qId).map((q: any) => parseInt(q.rating))
        );
        const averageRating = questionRatings.reduce((a, b) => a + b, 0) / questionRatings.length;
        return averageRating || 0; // Evitar NaN si no hay ratings
      });

      seriesData.push({
        name: teacher.first_name,
        type: 'bar',
        label: {
          show: true,
          position: 'inside'
        },
        data: ratings
      });
    });

    return seriesData;
  }

  logOut() {
    localStorage.clear();
    this.route.navigate(['login']);
  }

  options: EChartsOption = {
    legend: {
      data: this.teacher
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value'
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: []
      }
    ],
    series: []
  };
}

interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  urlImage: string;
  phone: string;
  office_location: string;
  years_of_experience: number;
  degree: string;
  schedules: string[];
}