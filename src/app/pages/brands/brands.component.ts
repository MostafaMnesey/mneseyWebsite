import { Component, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brand } from '../../core/interfaces/brand';
import { MainService } from '../../core/services/main.service';
import { PagesHeroComponent } from '../../Snippets/pages-hero/pages-hero.component';
import { BrandsContentComponent } from '../../Snippets/brands-content/brands-content.component';
import { HeroBackgroundComponent } from '../../Snippets/home-snippets/hero_background.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  imports: [BrandsContentComponent, HeroBackgroundComponent, TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  // brands: WritableSignal<Brand[]> = signal([]);
  constructor(private main: MainService) {}
  // ngOnInit(): void {
  //   this.main.getBrands().subscribe({
  //     next: (res) => {

  //       this.brands.set(res.brands);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
