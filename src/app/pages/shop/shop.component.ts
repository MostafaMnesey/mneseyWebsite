import { Component, inject, ViewEncapsulation } from '@angular/core';
import { PagesHeroComponent } from '../../Snippets/pages-hero/pages-hero.component';
import { ShopContentComponent } from '../../Snippets/shop-content/shop-content.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HeroBackgroundComponent } from '../../Snippets/home-snippets/hero_background.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  standalone: true,
  imports: [ShopContentComponent, HeroBackgroundComponent],
  encapsulation: ViewEncapsulation.None,
})
export class ShopComponent {
  private route = inject(ActivatedRoute);

  // signal that always holds the latest "brand" value
  readonly brand = toSignal(
    this.route.queryParamMap.pipe(map((p) => p.get('brand'))),
    { initialValue: null },
  );
}
