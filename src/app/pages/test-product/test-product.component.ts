import { Component, signal } from '@angular/core';
import { MainService } from '../../core/services/main.service';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-product',
  imports: [],
  templateUrl: './test-product.component.html',
  styleUrl: './test-product.component.css',
})
export class TestProductComponent {
  images = ['images/single.png', 'images/single-1.jpg'];
  selectedImage = signal('images/single.png');
  currentIndex = signal(0);
  activeIndex = signal<number | null>(null);
  product = signal({});
  id = signal('');
  currentLang = signal('');

  constructor(
    private main: MainService,
    private ActivatedRoute: ActivatedRoute,
    private mytranslate: MyTranslateService,
  ) {
    this.mytranslate.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
    this.ActivatedRoute.paramMap.subscribe((p) => {
      this.id.set(p.get('id') as string);
    });
  }

  accordionItems = [
    {
      title: 'When to use & How it works',
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit...`,
    },
    {
      title: 'How To Use',
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit...`,
    },
    {
      title: 'Sizes Available ',
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit...`,
    },
    {
      title: 'Ingredients ',
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit...`,
    },
    {
      title: 'Please read all instructions and warnings carefully before use',
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit...`,
    },
    {
      title: 'F.A.Q',
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit...`,
    },
  ];

  hearProducts = [
    {
      name: 'Heat Rub',
      image: 'images/heat-brand/1.png',
    },
    {
      name: 'Max Strength',
      image: 'images/heat-brand/2.png',
    },
    {
      name: 'Muscle Massage Roll-on Lotion',
      image: 'images/heat-brand/3.png',
    },
  ];

  toggleAccordion(index: number) {
    this.activeIndex.set(this.activeIndex() === index ? null : index);
  }

  selectImage(image: string) {
    this.selectedImage.set(image);
  }

  ngOnInit(): void {
    this.main.getSingleProduct(this.id()).subscribe({
      next: (res) => {
        this.product.set(res.blogs);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
