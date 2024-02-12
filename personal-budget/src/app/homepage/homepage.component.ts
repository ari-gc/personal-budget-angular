import { Component, OnInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [ArticleComponent, HttpClient, Chart],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [
      {
        data: [
          {
          title: 'Eat out',
          budget: 25
        },
        {
          title: 'Rent',
          budget: 275
        },
        {
          title: 'Grocery',
          budget: 110
        }
      ],
        backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
          ]
      }
    ],
    labels: [
      'Eat out',
      'Rent',
      'Budget'
    ]
  }

 constructor(private http: HttpClient) {

 };

  createChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
}

  ngOnInit(): void {
    this.http.get('http://localhost:4200/').subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        this.createChart();
    }
    });
  }}
