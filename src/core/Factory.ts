type Currency = "USD" | "PEN"

type Money<C extends Currency> = {
	value: number,
	currency: C,
	exchangeTo: <D extends Currency>(currency: D) => Money<D>
}

const a: Money<"PEN"> = {
	value: 4,
	currency: "PEN",
	exchangeTo: currency => {
		return {
			value: a.value,
			currency,
			exchangeTo: a.exchangeTo
		}
	}
}

const b = a.exchangeTo("USD")