const fs = require('fs')
const path = require('path')
const moment = require('moment')

const filePath = path.join(__dirname, './dist/index.json')

const rawFile = fs.readFileSync(filePath)
const raw = JSON.parse(rawFile)

const listings = raw.listings
	.map((ll) => {
		// hoist params
		const params = ll.params
		delete ll.params
		const llFixed = Object.assign({}, ll, params)
		// standardize dates
		Object.keys(llFixed).forEach((key) => {
			if (key.includes('date')) {
				const rawDateValue = llFixed[key]
				if (typeof rawDateValue === 'string') {
					const parsedDateValue = moment.utc(rawDateValue)
					llFixed[key] = parsedDateValue.format('YYYY-MM-DD')
					llFixed[key + '_human'] = parsedDateValue.format('MMMM Do YYYY')
				}
			}
		})
		return llFixed
	})

fs.writeFileSync(filePath, JSON.stringify({ listings }))