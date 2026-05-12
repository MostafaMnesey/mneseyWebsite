import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { MainService } from '../../core/services/main.service';
import { MyTranslateService } from '../../core/services/my-translate.service';
// Add this import to your component imports
import { SkeletonModule } from 'primeng/skeleton';
import { SingleBrandHeroComponent } from "../../Snippets/single-brand-snippets/single-brand-hero/single-brand-hero.component";
import { SingleBrandDataComponent } from "../../Snippets/single-brand-snippets/single-brand-data/single-brand-data.component";
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-single-brand',
  templateUrl: './single-brand.component.html',
  styleUrls: ['./single-brand.component.css'],
  standalone: true,
  imports: [
    SkeletonModule, SingleBrandHeroComponent, SingleBrandDataComponent]
})
export class SingleBrandComponent  {
  id!: any;
  currentLang = signal('');
  brandData: any;
  constructor(
    private cd: ChangeDetectorRef,
    private ActivatedRoute: ActivatedRoute,
    private main: MainService,
    private mytranslate: MyTranslateService,
    private seoService: SeoService,
  ) {
    this.mytranslate.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
    this.ActivatedRoute.paramMap.subscribe((p) => {
      this.id = p.get('id');
      this.main.getSingleBrand(this.id).subscribe({
        next: (res) => {
          this.brandData = res.brand;
          
          if (this.brandData) {
            this.seoService.updateSeoTags({
              title: `${this.brandData.title || this.brandData.name} - Mentholatum Arabia`,
              description: this.brandData.description?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
              image: this.brandData.image || this.brandData.logo,
              type: 'website'
            });
          }

          this.cd.detectChanges();
        },
      });
    });
  }




  



}