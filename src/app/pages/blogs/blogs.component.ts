import { Component, signal, WritableSignal } from '@angular/core';
import { MainService } from '../../core/services/main.service';
import { Blog } from '../../core/interfaces/blog';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Skeleton } from 'primeng/skeleton';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { HeroBackgroundComponent } from '../../Snippets/home-snippets/hero_background.component';

@Component({
  selector: 'app-blogs',
  imports: [RouterLink, TranslatePipe, Skeleton, Paginator, HeroBackgroundComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent {
  loading = signal(true);

  constructor(
    private main: MainService,
    private mytranslate: MyTranslateService,
  ) {
    this.mytranslate.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
  }
  first = 0;
  rows = 10;
  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
  paginatedBlogs() {
    return this.blogs().slice(this.first, this.first + this.rows);
  }
  blogs: WritableSignal<Blog[]> = signal([]);
  currentLang = signal('');

  ngOnInit(): void {
    this.main.getBlogs().subscribe({
      next: (res) => {
        this.blogs.set(res.blogs.data);
        this.loading.set(false);
      },
    });
  }
}
