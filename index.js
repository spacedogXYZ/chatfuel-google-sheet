const sheet = require('./lib/sheet');
const createRows = require('./lib/createRows');
const querystring = require('querystring');

module.exports = {
  handler(event, context, callback) {
    const config = event.queryStringParameters || event.query;
    const body = querystring.parse(event.body);

    const sheetId = config.sheet_id;
    const rows = createRows(config, body);

    if (!sheetId) return callback(null, { statusCode: 200, body: 'Specify a spreadsheet with ?sheet_id=xxx' });

    sheet.append(sheetId, rows, (error) => {
      if (error) console.error(error);
    });

    // return a blank callback because we don't need to block user input here
    return callback(null, { statusCode: 200 });
  },
};
