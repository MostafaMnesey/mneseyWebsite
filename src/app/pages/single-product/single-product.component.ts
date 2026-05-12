import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { MainService } from '../../core/services/main.service';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { RelatedProductsComponent } from '../../Snippets/single-product-snippets/related-products/related-products.component';
import { ProductDetailsComponent } from '../../Snippets/single-product-snippets/product-details/product-details.component';
import { SymptomSnippetComponent } from '../../Snippets/single-product-snippets/symptom-snippet/symptom-snippet.component';
import { FaqComponent } from '../../Snippets/single-product-snippets/faq/faq.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-single-product',
  imports: [
    DialogModule,
    SkeletonModule,
    RelatedProductsComponent,
    ProductDetailsComponent,
    SymptomSnippetComponent,
    FaqComponent,
  ],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css',
})
export class SingleProductComponent {
  product = signal({});
  slug = signal('');
  currentLang = signal('');

  constructor(
    private main: MainService,
    private ActivatedRoute: ActivatedRoute,
    private mytranslate: MyTranslateService,
    private cd: ChangeDetectorRef,
    private seoService: SeoService,
  ) {
    this.mytranslate.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
    this.ActivatedRoute.paramMap.subscribe((p) => {
      this.slug.set(p.get('slug') as string);
      this.getData();
    });
  }

  productDetails: any = null;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.productDetails = null;
    this.main.getSingleProduct(this.slug()).subscribe({
      next: (res) => {
        // console.log(res);
        this.productDetails = res;
        
        // Update SEO tags dynamically
        if (res && res.product) {
          const product = res.product;
          const title = product.title || product.name || 'Product';
          const description = product.short_description || product.description || '';
          const image = product.image || product.main_image || '';
          
          this.seoService.updateSeoTags({
            title: `${title} - Mentholatum Arabia`,
            description: description.replace(/<[^>]*>/g, '').substring(0, 160),
            image: image,
            type: 'product'
          });
        }
        
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
