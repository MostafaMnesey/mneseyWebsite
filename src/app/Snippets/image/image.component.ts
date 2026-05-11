import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input, OnInit } from '@angular/core';

@Component({
	selector: 'app-image',
	imports: [NgOptimizedImage],
	templateUrl: './image.component.html',
	styleUrl: './image.component.css',
})
export class ImageComponent implements OnInit {
	url = input<string>('');

	width = input<number>(0);
	alt = input<string>('');
	dpr = input<boolean>(false);
	compress = input<boolean>(true);
	ratio = input<number>(16 / 9);
	priority = input<boolean>(false);
	placeholder = input<boolean>(false);
	quality = input<number>(50);
	height = computed<number>(() => this.width() / this.ratio());
	assetUrl = computed<string>(() => this.setUrl());
	srcset = computed<string>(() => this.setSrcset());

	setUrl(): string {
		// Make the parameters ready
		let params = '?';
		params += `w=${this.width()}`;
		params += `&h=${this.height()}`;
		params += '&fit=clip';
		params += '&compress=auto';
		params += `&q=${this.quality()}`;
		let url = this.url() + params;
		return url;
	}

	setSrcset(): string {
		let srcset = '';
		let sizes = ['1x', '2x', '3x'];
		sizes.forEach(size => {
			srcset += `${this.url()}?w=${size} ${size}w, `;
		});

		return srcset;
	}
	ngOnInit() {
		this.setUrl();
	}
}
