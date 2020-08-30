const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
	constructor() {
		this.doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
	}

	async load() {
		await this.doc.useServiceAccountAuth(require('./credentials.json'));
		await this.doc.loadInfo();
	}

	async getRows() {
		const sheet = this.doc.sheetsByIndex[0];
		return await sheet.getRows();
	}
};
