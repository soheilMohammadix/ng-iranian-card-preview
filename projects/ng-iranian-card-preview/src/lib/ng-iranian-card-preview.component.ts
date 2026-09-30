import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { NgStyle } from '@angular/common'
import { getBankByCardNumber } from './iranian-bank-utility'

@Component({
	selector: 'ng-iranian-card-preview',
	standalone: true,
	imports: [NgStyle],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div
			class="relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl transition-all duration-300 hover:shadow-2xl sm:hover:shadow-3xl hover:scale-[1.02] sm:hover:scale-105 mx-auto max-w-full">
			<!-- Card Background with Bank Color -->
			<div
				[ngStyle]="{ backgroundColor: bankInfo()?.bgColor || '#6366f1' }"
				class="relative z-10 h-48 sm:h-64 w-80 sm:w-96">
				<!-- Pattern Overlay -->
				<div class="absolute inset-0 opacity-10">
					<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<pattern
								[id]="patternId()"
								[attr.fill]="bankInfo()?.bgColor || '#6366f1'"
								viewBox="0 0 24 24"
								x="0"
								y="0"
								width="5"
								height="5"
								patternTransform="scale(0.6) rotate(0)"
								patternUnits="userSpaceOnUse">
								<circle [attr.fill]="bankInfo()?.bgColor || '#6366f1'" cx="2" cy="2" r="1" />
							</pattern>
						</defs>
						<rect
							[attr.fill]="'url(#' + patternId() + ')'"
							x="0"
							y="0"
							width="100%"
							height="100%"
							transform="translate(0,0)" />
					</svg>
				</div>

				<!-- Gradient Effect -->
				<div
					[ngStyle]="{
						background: 'linear-gradient(to left, ' + (bankInfo()?.bgColor || '#6366f1') + ', transparent)',
					}"
					class="absolute inset-0"></div>

				<!-- Card Content -->
				<div class="relative z-20 h-full flex flex-col justify-between p-4 sm:p-6">
					<!-- Header Section -->
					<div class="flex justify-between items-start">
						<!-- Bank Logo -->
						@if (bankInfo()?.logo) {
							<div class="w-12 h-8 sm:w-16 sm:h-10 flex items-center justify-center">
								<img
									[src]="bankInfo()?.logo"
									[alt]="bankInfo()?.bankName || 'Bank'"
									[style]="{ filter: 'brightness(0) invert(1)' }"
									class="h-full w-full object-contain object-right" />
							</div>
						}
					</div>

					<!-- Card Number -->
					<div class="flex justify-center">
						<div
							[ngStyle]="{ color: bankInfo()?.textColor || '#ffffff' }"
							dir="ltr"
							class="text-white text-base sm:text-xl font-mono tracking-wider letter-spacing-wider">
							{{ formattedCardNumber() }}
						</div>
					</div>

					<!-- Footer Section -->
					<div class="flex justify-between items-end">
						<!-- Bank Name -->
						<div>
							<div [ngStyle]="{ color: bankInfo()?.textColor || '#ffffff' }" class="text-base sm:text-lg font-bold">
								{{ bankInfo()?.bankName || defaultBankName }}
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Card Shadow Effect -->
			<div
				[ngStyle]="{
					boxShadow:
						(bankInfo()?.bgColor || '#6366f1') +
						' 0px 8px 20px -12px, ' +
						(bankInfo()?.bgColor || '#6366f1') +
						' 0px 10px 25px -15px',
				}"
				class="absolute inset-0 -z-10 rounded-xl sm:rounded-2xl transition-all duration-300"></div>
		</div>
	`,
})
export class NgIranianCardPreview {
	cardNumber = input('')
	defaultBankName = input('بانک')
	cleanCardNumber = computed(() => this.cardNumber().replace(/\D/g, ''))
	bankInfo = computed(() => getBankByCardNumber(this.cleanCardNumber()))

	formattedCardNumber = computed(() => {
		if (this.cleanCardNumber().length <= 4) return this.cleanCardNumber()
		if (this.cleanCardNumber().length <= 8)
			return this.cleanCardNumber().slice(0, 4) + '–' + this.cleanCardNumber().slice(4)
		if (this.cleanCardNumber().length <= 12)
			return (
				this.cleanCardNumber().slice(0, 4) +
				'–' +
				this.cleanCardNumber().slice(4, 8) +
				'–' +
				this.cleanCardNumber().slice(8, 12)
			)
		return (
			this.cleanCardNumber().slice(0, 4) +
			'–' +
			this.cleanCardNumber().slice(4, 8) +
			'–' +
			this.cleanCardNumber().slice(8, 12) +
			'–' +
			this.cleanCardNumber().slice(12, 16)
		)
	})

	patternId = computed(() => 'card-pattern-' + Math.random().toString(36).substring(2, 11))
}
