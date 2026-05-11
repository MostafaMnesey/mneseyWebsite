import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MyTranslateService } from '../../../core/services/my-translate.service';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  imports: [SkeletonModule, DialogModule, NgClass, TranslatePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  @Input() productDetails: any;

  images = [RouterLink];
  selectedImage = signal('');
  currentIndex = signal(0);
  product = signal({});
  slug = signal('');
  currentLang = signal('');

  constructor(private mytranslate: MyTranslateService) {
    this.mytranslate.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
  }

  selectImage(image: string) {
    this.selectedImage.set(image);
  }

  geo: any;

  ngOnInit(): void {
    if (Window) {
      this.geo = localStorage.getItem('geo');
    }
  }
  showCountriesDialog = false;
  selectedProductCountries: any[] = [];
  selectedProductName = '';

  shouldShowShopButton(product: any): boolean {
    const matched = product.countries?.find((country: any) => {
      return (
        country.name_en === this.geo.country &&
        country.pivot.available_in_pharmacies === 0 &&
        (!country.pivot.where_to_buy_link ||
          country.pivot.where_to_buy_link === '')
      );
    });

    // If match found, button should be hidden
    return !matched;
  }

  where() {
    let product = this.productDetails.product;
    // Check if geo exists in localStorage
    if (this.geo) {
      // Parse the geo data if it's stored as a string
      const geoData =
        typeof this.geo === 'string' ? JSON.parse(this.geo) : this.geo;

      // Get the country name and code from geo data
      const userCountry = geoData?.country;
      const userCountryCode = geoData?.countryCode;

      // Check if the product has countries data
      if (product.countries && product.countries.length > 0) {
        // Find if the user's country is in the product's countries by name
        const matchingCountry = product.countries.find(
          (country: any) =>
            country.name_en === userCountry ||
            country.name_ar === userCountry ||
            country.name_en.includes(userCountry) ||
            (userCountryCode && country.name_en.includes(userCountryCode)),
        );

        if (matchingCountry) {
          // Country matches, get the where_to_buy_link from the pivot
          const buyLink = matchingCountry.pivot?.where_to_buy_link;
          if (buyLink) {
            // Open the link in a new tab
            window.open(buyLink, '_blank');
          }
        } else {
          // Filter out duplicate countries by ID before showing dialog
          const uniqueCountries = this.filterDuplicateCountries(
            product.countries,
          );
          this.selectedProductCountries = uniqueCountries;
          this.selectedProductName = product.name;
          this.showCountriesDialog = true;
        }
      }
    } else {
      // If no geo data, show all available countries (filtered for duplicates)
      const uniqueCountries = this.filterDuplicateCountries(
        product.countries || [],
      );
      this.selectedProductCountries = uniqueCountries;
      this.selectedProductName = product.name;
      this.showCountriesDialog = true;
    }
    this.hasAvailableCountries();
  }
  available!: boolean;
  hasAvailableCountries() {
    this.available = this.selectedProductCountries?.some(
      (country) =>
        country.pivot?.where_to_buy_link ||
        country.pivot?.available_in_pharmacies === 1,
    );
  }
  // Add this new method to filter out duplicate countries by ID
  filterDuplicateCountries(countries: any[]): any[] {
    const uniqueCountriesMap = new Map();

    // Use a Map to keep only the first occurrence of each country ID
    countries.forEach((country) => {
      if (!uniqueCountriesMap.has(country.id)) {
        uniqueCountriesMap.set(country.id, country);
      }
    });

    // Convert the Map values back to an array
    return Array.from(uniqueCountriesMap.values());
  }

  // Add method to open country link
  openCountryLink(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }

  getBrandBgColor() {
    const brandId = this.productDetails?.product?.brand?.id?.toString();
    switch (brandId) {
      case '23':
        return 'bg-[#C2332C]'; // Deep Heat - Red
      case '24':
        return 'bg-[#184A9A]'; // Deep Freeze - Blue
      case '25':
        return 'bg-[#3D1A54]'; // Deep Relief - Purple
      case '26':
        return 'bg-[#E7317A]'; // Hada Labo - Pink
      case '27':
        return 'bg-[#30214E]'; // Rohto - Purple
      default:
        return 'bg-[#C2332C]';
    }
  }

  getCircleBgClass() {
    const brandId = this.productDetails?.product?.brand?.id?.toString();
    switch (brandId) {
      case '23':
        return 'bg-[#FF5F57]'; // Deep Heat
      case '24':
        return 'radial-blue'; // Deep Freeze
      case '25':
        return 'radial-green'; // Deep Relief
      case '26':
        return 'radial-pink'; // Hada Labo
      case '27':
        return 'radial-purple'; // Rohto
      default:
        return 'bg-[#FF5F57]';
    }
  }

  getTitleColorClass() {
    const brandId = this.productDetails?.product?.brand?.id?.toString();
    switch (brandId) {
      case '23':
        return 'text-[#DC3B41]'; // Deep Heat
      case '24':
        return 'text-[#184A9A]'; // Deep Freeze
      case '25':
        return 'text-[#3D1A54]'; // Deep Relief
      case '26':
        return 'text-[#E7317A]'; // Hada Labo
      case '27':
        return 'text-[#30214E]'; // Rohto
      default:
        return 'text-[#DC3B41]';
    }
  }

  getRadialBgClass() {
    const brandId = this.productDetails?.product?.brand?.id?.toString();
    switch (brandId) {
      case '23':
        return 'radial-red'; // Deep Heat
      case '24':
        return 'radial-blue'; // Deep Freeze
      case '25':
        return 'radial-green'; // Deep Relief
      case '26':
        return 'radial-pink'; // Hada Labo
      case '27':
        return 'radial-purple'; // Rohto
      default:
        return 'radial-red';
    }
  }

  getButtonBgClass() {
    const brandId = this.productDetails?.product?.brand?.id?.toString();
    switch (brandId) {
      case '23':
        return 'bg-red-500'; // Deep Heat
      case '24':
        return 'bg-[#184A9A]'; // Deep Freeze
      case '25':
        return 'bg-[#3D1A54]'; // Deep Relief
      case '26':
        return 'bg-[#E7317A]'; // Hada Labo
      case '27':
        return 'bg-[#30214E]'; // Rohto
      default:
        return 'bg-red-500';
    }
  }
}
