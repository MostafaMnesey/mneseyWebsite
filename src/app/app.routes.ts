import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Mentholatum - Specialists in family healthcare for over 130 years',
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./pages/brands/brands.component').then((m) => m.BrandsComponent),
    title: 'Our Brands - Mentholatum',
  },
  {
    path: 'brand/:id',
    data: { isCSR: true },
    loadComponent: () =>
      import('./pages/single-brand/single-brand.component').then(
        (m) => m.SingleBrandComponent,
      ),
    title: 'Brand - Mentholatum',
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./pages/shop/shop.component').then((m) => m.ShopComponent),
    title: 'Shop Mentholatum Products',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'About Mentholatum',
  },
  {
    path: 'blogs',
    loadComponent: () =>
      import('./pages/blogs/blogs.component').then((m) => m.BlogsComponent),
    title: 'Health care blogs - Mentholatum',
  },
  {
    path: 'blogs/:slug',
    data: { isCSR: true },
    loadComponent: () =>
      import('./pages/single-blog/single-blog.component').then(
        (m) => m.SingleBlogComponent,
      ),
    title: 'Health care blogs - Mentholatum',
  },
  {
    path: 'blink-test',
    data: { isCSR: true },
    loadComponent: () =>
      import('./pages/blink-test/blink-test.component').then(
        (m) => m.BlinkTestComponent,
      ),
    title: 'blink-test',
  },
  {
    path: 'environment',
    loadComponent: () =>
      import('./pages/environment/environment.component').then(
        (m) => m.EnvironmentComponent,
      ),
    title: 'Environment - Mentholatum',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
    title: 'Contact us - Mentholatum',
  },
  {
    path: 'product/:slug',
    data: { isCSR: true },
    loadComponent: () =>
      import('./pages/single-product/single-product.component').then(
        (m) => m.SingleProductComponent,
      ),
    title: 'Product - Mentholatum',
  },
  {
    path: 'test-product',
    loadComponent: () =>
      import('./pages/test-product/test-product.component').then(
        (m) => m.TestProductComponent,
      ),
    title: 'test-product',
  },
  {
    path: 'test-brand',
    loadComponent: () =>
      import('./pages/test-brand/test-brand.component').then(
        (m) => m.TestBrandComponent,
      ),
    title: 'test-brand',
  },
  {
    path: 'symptom-checker-v2',
    loadComponent: () =>
      import('./pages/symptom-checker/symptom-checker.component').then(
        (m) => m.SymptomCheckerComponent,
      ),
    title: 'Symptom Checker - Mentholatum',
  },
  {
    path: 'dax',
    loadComponent: () =>
      import('./pages/dax-cosmetics/dax-cosmetics.component').then(
        (m) => m.DAXCosmeticsComponent,
      ),
    title: 'DAX-Cosmetics - Mentholatum',
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./pages/terms/terms.component').then((m) => m.TermsComponent),
    title: 'Terms & Consdition - Mentholatum',
  },
  {
    path: 'Privacy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component').then(
        (m) => m.PrivacyPolicyComponent,
      ),
    title: 'Privacy olicy - Mentholatum',
  },
];
