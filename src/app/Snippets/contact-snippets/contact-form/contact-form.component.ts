import { ChangeDetectorRef, Component, inject, afterNextRender } from '@angular/core';
declare var grecaptcha: any;
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TranslatePipe } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    TextareaModule,
    TranslatePipe,
    NgClass
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  contactForm: any;
  private fb = inject(FormBuilder);
  private contact = inject(ContactService);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef
  private messageService = inject(MessageService);
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
  captchaToken = '';

  constructor() {
    // 1. Initialize the form first
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      type: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      captchaAnswer: ['', [Validators.required]]
    });

    // 2. Initialize reCAPTCHA on the client side with retry logic
    afterNextRender(() => {
      this.initRecaptcha();
    });
  }

  initRecaptcha(retries = 0) {
    if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
      grecaptcha.render('recaptcha-container', {
        'sitekey': '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        'callback': (token: string) => {
          this.captchaToken = token;
          this.contactForm.patchValue({ captchaAnswer: token });
          this.cdr.detectChanges();
        },
        'expired-callback': () => {
          this.captchaToken = '';
          this.contactForm.patchValue({ captchaAnswer: '' });
          this.cdr.detectChanges();
        }
      });
    } else if (retries < 10) {
      // Retry every 500ms for up to 5 seconds
      setTimeout(() => this.initRecaptcha(retries + 1), 500);
    }
  }

  ngOnInit(): void {
    // Form is already initialized in constructor
  }

  submit() {
    if (this.contactForm.valid) {
      if (!this.captchaToken) {
        this.messageService.add({ 
          severity: 'warn', 
          summary: 'CAPTCHA Required', 
          detail: 'Please complete the CAPTCHA checkbox.' 
        });
        return;
      }
      
      console.log('Sending form data...', this.contactForm.value);
      
      this.contact.contact(this.contactForm.value).subscribe({
        next: (res) => {
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Success', 
            detail: 'Message sent successfully!' 
          });
          this.formSubmitted = true;
          this.contactForm.reset();
          this.captchaToken = '';
          if (typeof grecaptcha !== 'undefined') {
            grecaptcha.reset();
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Server error:', err);
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Failed to send message. Please try again later.' 
          });
          this.formSubmitted = false;
          this.cdr.detectChanges();
        },
      });
    } else {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Form Invalid', 
        detail: 'Please fill in all required fields correctly.' 
      });
      Object.keys(this.contactForm.controls).forEach((key) => {
        this.contactForm.get(key).markAsTouched();
      });
    }
  }
}
