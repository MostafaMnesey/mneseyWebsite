import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Dialog } from 'primeng/dialog';
interface CountryCard {
  name: string;
  key: string;
  flag: string;
  phone: string;
  email: string;
  isExpanded?: boolean;
  p_name: string;
  address: string;
  multi?: boolean;
  p_name2?: string;
  phone2?: string;
  email2?: string;
  address2?: string;
  isExpanded2?: boolean;
}
@Component({
  selector: 'app-contact-data',
  imports: [TranslatePipe, Dialog],
  templateUrl: './contact-data.component.html',
  styleUrl: './contact-data.component.css',
})
export class ContactDataComponent {
  countries: any[] = [
    {
      key: 'bahrain',
      flag: '/new/Flags/Bahrain.svg',
      name: 'Bahrain',
      distributors: [
        {
          company: 'Jaffar Pharmacy',
          address: 'Building 2616, Road 855, Wadyan 608. Sitra, Bahrain',
          phone: '+97317731415',
          email: 'jhruyan@jaffar-h-ruyan.com',
        },
      ],
      isExpanded: false,
    },
    {
      key: 'jordan',
      flag: '/new/Flags/Jordan.svg',
      name: 'Jordan',
      distributors: [
        {
          company: 'Khoury Drug Store',
          address: 'Umm Metawee Al-Aslameyah St. 8, Amman, Jordan',
          phone: '+96265827015',
          email: 'info@khds.jo',
        },
      ],
      isExpanded: false,
    },
    {
      key: 'kuwait',
      flag: '/new/Flags/Kuwait.svg',
      name: 'Kuwait',
      distributors: [
        {
          company: 'Mohamed N. Al-Hajery & Sons Ltd',
          address: `Shuwaikh Industrial Area 3,
Block D, Bldg No. 73, St. No. 67,
P.O.Box 152, Safat 13002, Kuwait`,
          phone: '+9654831000',
          email: 'abdullah.mismar@hajery.com',
        },
      ],
      isExpanded: false,
    },
    {
      key: 'oman',
      flag: '/new/Flags/Oman.svg',
      name: 'Oman',
      distributors: [
        {
          company: 'Taiba Pharmacy',
          address: 'Head office 564 Russayl Industrial estate Muscat Oman',
          phone: '+96824442222',
          email: 'customer.service@taibahealthcare.com',
        },
        {
          company: 'Muscat Pharmacy & Stores LLC',
          address: 'PO Box 438, PC 100, Muscat 100, Oman',
          phone: '+96824814501',
          email: 'myahya@mpmct.com',
        },
      ],
      isExpanded: false,
    },
    {
      key: 'qatar',
      flag: '/new/Flags/Qatar.svg',
      name: 'Qatar',
      distributors: [
        {
          company: 'Gulf Technical Trading',
          address: 'P.O. Box 22234, Doha, Qatar',
          phone: '+974414664 / +974414088 / +97444414088',
          email: 'charisma.salariosa@gulftechtrading.com',
        },
        {
          company: 'International Medical Company',
          address: '819 Haloul st, Zone 56, Building 168, Al-Maamoura',
          phone: '+97444291555',
          email: 'info@imcqatar.com',
        },
      ],
      isExpanded: false,
    },
    {
      key: 'saudi',
      flag: '/new/Flags/Saudi Arabia.svg',
      name: 'Saudi Arabia',
      distributors: [
        {
          company: 'Exeo Health Care',
          address:
            'Sharafiyyah District Almaamoun Building Ali Bin Abi Taleb Street, PO Box: 19435, Jeddah',
          phone: '+966122316163',
          email: 'info@exeohc.com',
        },
      ],
      isExpanded: false,
    },
    {
      key: 'uae',
      flag: '/new/Flags/UAE.svg',
      name: 'United Arab Emirates',
      distributors: [
        {
          company: 'GULF DRUG LLC.',
          address: `Gulf Drug Tower, 2nd Street, Next to Saleh Bin Lahej Building, Al Barsha 1, Dubai, UAE.`,
          phone: '+971569968766',
          email: 'info@gulfdrug.com',
        },
      ],
      isExpanded: false,
    },
    {
      key: 'morocco',
      flag: '/new/Flags/Morocco.svg',
      name: 'Morocco',
      distributors: [
        {
          company: 'Iphabiotics',
          address:
            '6, rue Ibn Khalikane, 20340, Quartier: Palmier, Casablanca, Maroc',
          phone: '+212522453200',
          email: 'contact@cooperpharma.ma',
        },
      ],
      isExpanded: false,
    },
    {
      key: 'palestine',
      flag: '/new/Flags/Palestine.svg',
      name: 'Palestine',
      distributors: [
        {
          company: 'Al Rowwad For Medical Supplies & Services',
          address: 'Shareket Al Rowwad, Al-Rawdah St., Nablus, Palestine',
          phone: '+970923377227',
          email: 'm.tashtoush@rowwadmss.com',
        },
      ],
      isExpanded: false,
    },
    {
      key: 'pakistan',
      flag: '/new/Flags/Pakistan.svg',
      name: 'Pakistan',
      distributors: [
        {
          company: 'Titlis Pharma',
          address:
            '528-A, Sundar Industrial Estate, Raiwind Road, Lahore, Pakistan',
          phone: '+923077574843',
          email: 'faisal@titlispharma.com',
        },
      ],
      isExpanded: false,
    },
    {
      key: 'egypt',
      flag: '/new/Flags/Egypt.svg',
      name: 'Egypt',
      distributors: [
        {
          company: 'Rotabiogen For Pharmaceutical Investment & Chemicals',
          address: '39 Gamal Eldien Kassim Street, Nasr City, Cairo, Egypt',
          phone: '+20222871991',
          email: 'hussien.khaled@hefnypharmagroup.com',
        },
      ],
      isExpanded: false,
    },
    {
      key: 'iraq',
      flag: '/new/Flags/Iraq.svg',
      name: 'Iraq',
      distributors: [
        {
          company: 'Global Health',
          address:
            'Queen Alla Int. Airport, Duty Free Zone - In Transit, P.O. Box 852098, Amman 11185, Jordan',
          phone: '+962795009061',
          email: 'jiriesm@globalhealth-fz.com',
        },
      ],
      isExpanded: false,
    },
    {
      key: 'libya',
      flag: '/new/Flags/Libya.svg',
      name: 'Libya',
      distributors: [
        {
          company: 'Aeeade Alshefa',
          address: 'Head office Ben Ashor street - Tripoli - Libya',
          phone: '+218213620426',
          email: 'info@aa.med.ly',
        },
      ],
      isExpanded: false,
    },
  ];

  // distributors: { company: string; address: string }[] = [];

  toggleCountry(index: any) {
    // Close all countries first
    console.log(index);

    const wasExpanded = this.countries[index].isExpanded;
    this.countries.forEach((country, i) => {
      country.isExpanded = false;
    });

    // Then expand only the clicked country
    this.countries[index].isExpanded = !wasExpanded;
  }

  selectedCountry: any = null;
  displayDialog = false;
  constructor(private translate: TranslateService) {}

  openDialog(country: any) {
    this.translate.get('countries.' + country).subscribe((res: any) => {
      this.selectedCountry = { key: country, ...res };
      this.displayDialog = true;
    });
    this.selectedCountry = country;
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
    this.selectedCountry = null;
  }
}
