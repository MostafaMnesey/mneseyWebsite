import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    TextareaModule,
    TranslatePipe,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  contactForm: any;
  private fb = inject(FormBuilder);
  private contact = inject(ContactService);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef
  formSubmitted = false;
  input = {
    border: {
      radius: '25px',
    },
    background: 'transparent',
    filled: {
      background: 'transparent',
    },
    width: '100%',
  };

  inputDT = {
    root: {
      borderRadius: '8px',
      background: '#F7F7F5 !important',
      padding: '8px 0',
      borderColor: 'transparent',
      focusBorderColor: 'transparent',
    },
  };
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      type: ['', [Validators.required]],
      reason: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.contactForm.valid) {
      this.contact.contact(this.contactForm.value).subscribe({
        next: (res) => {
          this.formSubmitted = true;
          this.contactForm.reset();
          this.cdr.detectChanges(); // Manually trigger change detection
        },
        error: (err) => {
          console.error(err);
          this.formSubmitted = false;
          this.cdr.detectChanges();
        },
      });
    } else {
      Object.keys(this.contactForm.controls).forEach((key) => {
        this.contactForm.get(key).markAsTouched();
      });
    }
  }
}
