# Ng Iranian Card Preview

Angular component for previewing Iranian bank cards with validation utilities.

## Installation

```bash
npm install ng-iranian-card-preview
```

## Usage

### Import the Module

```typescript
import { NgIranianCardPreview } from 'ng-iranian-card-preview'
import { NgIranianCardPreviewComponent } from 'ng-iranian-card-preview'
```

### Basic Usage

```html
<ng-iranian-card-preview [cardNumber]="cardNumber"></ng-iranian-card-preview>
```

### With Custom Default Bank Name

```html
<ng-iranian-card-preview [cardNumber]="cardNumber" [defaultBankName]="'Bank Name'"></ng-iranian-card-preview>
```

### Using Validators

```typescript
import { cardValidator, validateCard } from 'ng-iranian-card-preview'

// In a reactive form
this.form = new FormGroup({
  cardNumber: new FormControl('', [cardValidator()])
})

// Manual validation
if (validateCard('6037991234567890')) {
  console.log('Valid card')
}
```

### Getting Bank Information

```typescript
import { getBankByCardNumber, getBankByIBanCode, type BankInfo } from 'ng-iranian-card-preview'

const bankInfo = getBankByCardNumber('6037991234567890')
console.log(bankInfo?.bankName) // 'ملي ايران'
```

## API

### NgIranianCardPreviewComponent

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| cardNumber | string | '' | The card number to display |
| defaultBankName | string | 'بانک' | Default bank name when no bank is detected |

### Utility Functions

#### getBankByCardNumber(cardNumber: string): BankInfo | null
Returns bank information based on card number prefix.

#### getBankByIBanCode(iBan: string): BankInfo | null
Returns bank information based on IBAN code.

#### validateCard(cardNumber: string): boolean
Validates an Iranian card number using the Luhn algorithm.

#### cardValidator(): ValidatorFn
Angular form validator for card numbers.

### BankInfo Interface

```typescript
interface BankInfo {
  id: string
  bankName: string
  iBan: string
  prefixes: string[]
  logo: string
  bgColor: string
  textColor: string
}
```

## Supported Banks

This library supports all Iranian banks including:
- بانک ملت
- بانک ملی ایران
- بانک صادرات
- بانک تجارت
- بانک سپه
- بانک پارسیان
- بانک پاسارگاد
- بانک سامان
- بانک توسعه صادرات
- بانک مسکن
- بانک کشاورزی
- بانک رفاه کارگران
- And 20+ more banks...

## License

MIT
# ng-iranian-card-preview
