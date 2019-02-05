class Converter {
	constructor(baseCurrencyUs) {
		this.baseCurrencyUs = baseCurrencyUs;
	}
	roundTwoDecimal(amount){
		return Math.round(amount * 100) / 100;
	}

	convertToUa(currency) {
	 	return this.roundTwoDecimal(currency * this.baseCurrencyUs);
	}
	convertToUs(currency) {
		return this.roundTwoDecimal(currency / this.baseCurrencyUs);
	}

}

module.exports = Converter;