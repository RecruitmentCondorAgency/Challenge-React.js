export interface Weather {
	product: string
	init: string
	dataseries?:
		| {
				timepoint: number
				cloudcover: number
				lifted_index: number
				prec_type: string
				prec_amount: number
				temp2m: number
				rh2m: string
				wind10m: { direction: string; speed: number }
				weather: string
		  }[]
		| null
}
