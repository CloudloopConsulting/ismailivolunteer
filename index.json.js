const fs = require('fs')
const path = require('path')
const moment = require('moment')

const allJamatkhanas = require('./data/jamatkhanas.json')

const filePath = path.join(__dirname, './dist/index.json')

const rawFile = fs.readFileSync(filePath)
const raw = JSON.parse(rawFile)

const allListings = raw.listings
	.map((rawListing) => {
		// hoist params
		const { params, ...data } = rawListing
		const listing = Object.assign({}, data, params)
		// standardize dates
		const listingKeys = Object.keys(listing)
		listingKeys.forEach((key) => {
			if (key.includes('date')) {
				const rawDateValue = listing[key]
				if (typeof rawDateValue === 'string') {
					const parsedDateValue = moment.utc(rawDateValue)
					listing[key] = parsedDateValue.format('YYYY-MM-DD')
					listing[key + '_human'] = parsedDateValue.format('MMMM Do YYYY')
				}
			}
		})
		// fix marketing_jamatkhanas because hugo's jsonify can't jsonify an array of maps
		listing.marketing_jamatkhanas = (listing.marketing_jamatkhanas || []).map((arr) => {
			const obj = {
				jk: arr[0],
				weight: arr[1] || 0
			}
			if (allJamatkhanas[obj.jk] === undefined) {
				throw new Error(`${obj.jk} is an invalid jamatkhana`)
			}
			if (typeof obj.weight !== 'number') {
				throw new Error(`invalid weight for ${obj.jk} in ${listing.permalink}`)
			}
			return obj
		})
		// done!
		return listing
	})

fs.writeFileSync(filePath, JSON.stringify({ listings: allListings }, null, 4))
