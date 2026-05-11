import { Component, signal, WritableSignal } from '@angular/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { MainService } from '../../core/services/main.service';
import { Blog } from '../../core/interfaces/blog';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-blogs-section',
  imports: [RouterLink, TranslatePipe, CarouselModule],
  templateUrl: './blogs-section.component.html',
  styleUrl: './blogs-section.component.css',
})
export class BlogsSectionComponent {
  currentLang = signal('');

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  constructor(
    private mytranslate: MyTranslateService,
    private main: MainService,
  ) {
    this.mytranslate.lang.subscribe((l) => {
      this.currentLang.set(l);
    });
  }

  blogs: WritableSignal<Blog[]> = signal([]);

  ngOnInit(): void {
    this.main.getBlogs().subscribe({
      next: (res) => {
        this.blogs.set(res.blogs.data.slice(0, 3));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
