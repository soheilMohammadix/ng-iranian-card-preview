import { TestBed } from '@angular/core/testing'
import { NgIranianCardPreview } from './ng-iranian-card-preview.component'
import { getBankByCardNumber, validateCard } from './iranian-bank-utility'

describe('NgIranianCardPreview', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NgIranianCardPreview]
		}).compileComponents()
	})

	it('should create', () => {
		const fixture = TestBed.createComponent(NgIranianCardPreview)
		const component = fixture.componentInstance
		expect(component).toBeTruthy()
	})

	it('should format card number correctly', () => {
		const fixture = TestBed.createComponent(NgIranianCardPreview)
		const component = fixture.componentInstance
		component.cardNumber.set('6037991234567890')
		fixture.detectChanges()
		expect(component.formattedCardNumber()).toBe('6037–9912–3456–7890')
	})
})

describe('Iranian Bank Utility', () => {
	it('should get bank by card number', () => {
		const bank = getBankByCardNumber('6037991234567890')
		expect(bank).toBeTruthy()
		expect(bank?.bankName).toBe('ملي ايران')
	})

	it('should validate correct card number', () => {
		expect(validateCard('6037997356723233')).toBe(true)
	})

	it('should validate incorrect card number', () => {
		expect(validateCard('6037997356723234')).toBe(false)
	})

	it('should return null for unknown card prefix', () => {
		const bank = getBankByCardNumber('9999999999999999')
		expect(bank).toBeNull()
	})
})
