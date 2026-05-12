import { Brand } from "./../../core/interfaces/brand";
import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  Input,
  signal,
  ViewEncapsulation,
  WritableSignal,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { SkeletonModule } from "primeng/skeleton";
import { TabsModule } from "primeng/tabs";
import { MainService } from "../../core/services/main.service";
import { TranslatePipe } from "@ngx-translate/core";
import { MyTranslateService } from "../../core/services/my-translate.service";

@Component({
  selector: "app-shop-content",
  imports: [
    ButtonModule,
    TabsModule,
    CommonModule,
    DialogModule,
    RouterLink,
    SkeletonModule,
    TranslatePipe,
  ],
  templateUrl: "./shop-content.component.html",
  styleUrl: "./shop-content.component.css",
  encapsulation: ViewEncapsulation.None,
})
export class ShopContentComponent {
  // Add dialog control variables
  @Input() brand: any;
  showCountriesDialog = false;
  selectedProductCountries: any[] = [];
  selectedProductName = "";
  selectedTab = signal(0);

  // Commented product arrays removed for brevity
  // ...

  products: WritableSignal<any[]> = signal([]);
  brands: WritableSignal<Brand[]> = signal([]);
  currentLang = signal("");

  tabs = computed(() => {
    return this.brands().map((brand, index) => {
      // Filter products by brand_id
      const brandProducts = this.products().filter(
        (product) =>
          product.brand_id === brand.id.toString() ||
          product.brand_id === brand.id,
      );

      // Define background colors for different brands (you can customize these)
      const bgColors = ["#F9423A", "#002D62", "#3D1A54", "#E81E63", "#30214E"];

      return {
        title: brand.name,
        value: index,
        products: brandProducts,
        bgColor: bgColors[index % bgColors.length], // Cycle through colors if more brands than colors
        brand: brand,
      };
    });
  });

  constructor(
    private main: MainService,
    private mytranslate: MyTranslateService,
  ) {
    this.mytranslate.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
  }
  geo: any;
  //  ngOnInit(): void {
  //    if(Window){
  //      this.geo=localStorage.getItem('geo')

  //      }
  //    this.main.shopByBrand('').subscribe({
  //      next: (res) => {
  //        this.brands.set(res.brands);
  //        this.products.set(res.products);

  //      },
  //      error: (err) => {
  //        console.log(err);
  //      },
  //    });
  //  }

  // Helper method to get products for a specific brand

  ngOnInit(): void {
    if (window) {
      this.geo = localStorage.getItem("geo");
    }

    this.main.shopByBrand("").subscribe({
      next: (res) => {
        this.brands.set(res.brands);
        this.products.set(res.products);

        // 👉 Set selectedTab based on input brand
        if (this.brand) {
          const matchingIndex = res.brands.findIndex(
            (b: Brand) =>
              b.slug === this.brand ||
              b.name?.toLowerCase() === this.brand?.toLowerCase(),
          );

          if (matchingIndex !== -1) {
            this.selectedTab.set(matchingIndex);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getProductsByBrandId(brandId: number | string): any[] {
    return this.products().filter(
      (product) =>
        product.brand_id === brandId.toString() || product.brand_id === brandId,
    );
  }
  shouldShowShopButton(product: any): boolean {
    return true;
  }

  hasAnyPurchaseOption(product: any): boolean {
    if (!product || !product.countries) return false;
    return product.countries.some(
      (country: any) =>
        country.pivot?.where_to_buy_link ||
        country.pivot?.available_in_pharmacies === 1,
    );
  }

  where(product: any) {
    // Check if geo exists in localStorage
    if (this.geo) {
      // Parse the geo data if it's stored as a string
      const geoData =
        typeof this.geo === "string" ? JSON.parse(this.geo) : this.geo;

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
            window.open(buyLink, "_blank");
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
    //  console.log(this.selectedProductCountries);
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
      window.open(link, "_blank");
    }
  }
}
