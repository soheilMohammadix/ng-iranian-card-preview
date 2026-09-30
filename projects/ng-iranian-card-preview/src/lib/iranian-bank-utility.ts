import banksList from './assets/iran-bank-list.json'
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export interface BankInfo {
	id: string
	bankName: string
	iBan: string
	prefixes: string[]
	logo: string
	bgColor: string
	textColor: string
}

interface BankInfoInternal extends Omit<BankInfo, 'logo'> {
	logo: string
}

const BASE_LOGO_URL = 'https://cdn.jsdelivr.net/gh/4limirzaei/iran-bank-assets/logos/'

function attachLogoPath(bank: BankInfo): BankInfo {
	return {
		...bank,
		logo: BASE_LOGO_URL + bank.logo
	}
}

function cleanIBanCode(code: string): string {
	return code.trim().replace(/^ir/i, '').replace(/^.{2}/, '')
}

export function getBankByIBanCode(iBan: string): BankInfo | null {
	const cleanedCode = cleanIBanCode(iBan)
	const bank = banksList.find((item: BankInfoInternal) => item.iBan && cleanedCode.startsWith(item.iBan))
	return bank ? attachLogoPath(bank) : null
}

export function getBankByCardNumber(cardNumber: string): BankInfo | null {
	const bin = cardNumber.slice(0, 6)
	const bank = banksList.find((item: BankInfoInternal) => item.prefixes.includes(bin)) || null
	return bank ? attachLogoPath(bank) : null
}

export function validateCard(cardNumber: string): boolean {
	if (!/^\d{16}$/.test(cardNumber)) return false

	const digits = cardNumber.split('').map(Number)
	const checkSum = digits.reduce((sum, digit, index) => {
		const num = digit * (index % 2 === 0 ? 2 : 1)
		return sum + (num > 9 ? num - 9 : num)
	}, 0)

	return checkSum % 10 === 0
}

export function cardValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		return validateCard(control.value.replace(/\D/g, '')) ? null : { invalidCard: true }
	}
}
