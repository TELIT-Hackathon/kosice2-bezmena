import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  articles = new MatTableDataSource<any>(null);
  subscriptions = new MatTableDataSource<any>(null);
  columns: string[] = ['id', 'title', 'tags', 'action'];
  columnsSub: string[] = ['email', 'username'];

  profile = new BehaviorSubject<any>(null);
  subscribers: any[] = [];

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.profile = {};
    this.reloadArticles();
    this.api.getUserSubscribers().subscribe((res) => (this.subscribers = res));
    this.api
      .getUserSubscriptions()
      .subscribe((res) => (this.subscriptions.data = res));
  }

  reloadArticles(): void {
    this.api.getUserArticles().subscribe((response) => {
      this.articles.data = response;
    });
  }

  ngAfterViewInit(): void {
    this.articles.paginator = this.paginator;

    this.articles.filterPredicate = (
      article: any,
      filter: string
    ): boolean => {
      if (article.title.toLowerCase().includes(filter)) {
        return true;
      }
      return false;
    };
  }

  trackBy(index: number, data: any): string {
    return data.pk;
  }

  applyFilter(phrase: string): void {
    this.articles.filter = phrase.trim().toLowerCase();
    this.paginator.firstPage();
  }

  edit(art: any): void {
    this.router.navigate(['/create', art.pk], {
      state: { data: art },
    });
  }
}
