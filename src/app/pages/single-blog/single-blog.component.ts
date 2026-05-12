import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { MainService } from '../../core/services/main.service';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Blog } from '../../core/interfaces/blog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogsSectionComponent } from '../../Snippets/blogs-section/blogs-section.component';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-single-blog',
  standalone: true,
  imports: [BlogsSectionComponent, RouterLink, TranslatePipe],
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.css',
})
export class SingleBlogComponent {
  main = inject(MainService);
  id: any;
  blogData: Blog = {} as Blog;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private mytranslate: MyTranslateService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef,
    private seoService: SeoService,
  ) {
    this.ActivatedRoute.paramMap.subscribe((p) => {
      this.id = p.get('slug');

      this.main.getSingleBlog(this.id).subscribe({
        next: (res) => {
          this.blogData = res.blog;
          
          if (this.blogData) {
            this.seoService.updateSeoTags({
              title: `${this.blogData.title} - Mentholatum Arabia`,
              description: this.blogData.content?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
              image: this.blogData.image,
              type: 'article'
            });
          }

          // Force Angular to detect changes immediately
          this.cdRef.detectChanges();
        },
        error: (err) => {
          console.error(err);
        },
      });
    });
  }

  formatContent(content: string): SafeHtml {
    if (!content) return this.sanitizer.bypassSecurityTrustHtml('');

    const formattedContent = content
      .split('\r\n')
      .filter((paragraph) => paragraph.trim() !== '')
      .map((paragraph) => `<p class="mb-4">${paragraph}</p>`)
      .join('');

    return this.sanitizer.bypassSecurityTrustHtml(formattedContent);
  }
}
