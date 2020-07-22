import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { NewsList } from '../models/news-list-model';
import { NewsModel } from '../models/news-model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
declare var google: any;

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.scss']
})
export class NewsContentComponent implements OnInit, OnDestroy {

  @ViewChild('lineChart', { static: false }) lineChart: ElementRef;
  pageDetails: NewsList;
  newsList: Array<NewsModel>;
  graphData: Array<Array<any>>;
  pageNo = 0;
  localStorageString: string;
  private _onDestroy = new Subject<void>();
  constructor(private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute) {
    this.pageDetails = new NewsList();
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this._onDestroy)).subscribe((param: any) => {
      this.pageNo = param.pageNo ? param.pageNo : 0;
      this.getNewsListFromApi();
    });
  }

  getNewsListFromApi() {
    this.localStorageString = 'News data of Page = ' + this.pageNo;
    localStorage.getItem(this.localStorageString) ?
      this.setPageData(JSON.parse(localStorage.getItem(this.localStorageString))) :
      this.dataService.getNewsList(this.pageNo).pipe(takeUntil(this._onDestroy)).subscribe((data) => {
        this.setPageData(new NewsList(data));
        localStorage.setItem(this.localStorageString, JSON.stringify(this.pageDetails));
        this.loadGrap();
      });
  }

  setPageData(pageDetails: NewsList) {
    this.pageDetails = pageDetails;
    this.newsList = this.pageDetails.newslist;
    this.loadGrap();
  }

  loadGrap() {
    this.constructGraphData();
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  constructGraphData() {
    this.graphData = [];
    this.newsList = this.newsList.filter((data) => !data.hidden);
    this.graphData = this.newsList.map((data) => [data.objectId, data.upVoteCount]
    );
    this.graphData.unshift(['Task', 'News Up vote count']);
  }

  hideNews(objectID: string) {
    this.newsList[this.newsList.findIndex((news: NewsModel) => news.objectId === objectID)].hidden = true;
    localStorage.setItem(this.localStorageString, JSON.stringify(this.pageDetails));
    this.constructGraphData();
    this.loadGrap();
  }

  increaseUpVote(objectID: string) {
    this.newsList[this.newsList.findIndex((news: NewsModel) => news.objectId === objectID)].upVoteCount++;
    localStorage.setItem(this.localStorageString, JSON.stringify(this.pageDetails));
    this.loadGrap();
  }

  drawChart = () => {
    const data = google.visualization.arrayToDataTable(this.graphData);

    const options = {
      title: 'News Object Id to vote count',
      hAxis: {
        direction: -1,
        slantedText: true,
        slantedTextAngle: 90
      },
      legend: { position: 'bottom' }
    };

    const chart = new google.visualization.LineChart(this.lineChart.nativeElement);

    chart.draw(data, options);
  }

  goToPrevPage() {
    if (this.checkValidPrevPage()) {
      this.pageNo--;
      this.goToUrl();
    }
  }

  goToUrl() {
    this.pageNo > 0 ? this.router.navigate(['/news', this.pageNo]) : this.router.navigate(['/news']);
  }

  gotToNextPage() {
    if (this.checkValidNextPage()) {
      this.pageNo++;
      this.goToUrl();
    }
  }

  checkValidPrevPage() {
    return this.pageNo > 0;
  }

  checkValidNextPage() {
    return this.pageNo < this.pageDetails.maxPageNo - 1;
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
