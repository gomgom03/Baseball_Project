const { google } = require('googleapis');
const keys = require('./keys.json');



const client = new google.auth.JWT(
    keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets.readonly']
);

let recentData;

client.authorize((err, tokens) => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log("No errors.")
        recentData = gsrun(client);
    }

});

async function gsrun(cl) {
    const gsapi = google.sheets({ version: "v4", auth: cl });
    const opt = {
        spreadsheetId: '18sfcKZ1lWSDfzWseJE9A1yLMoai0oOsnCLJ4_OUDWLM',
        range: 'Sheet1!B2:C8'
    }
    let data = await gsapi.spreadsheets.values.get(opt);
    return data
}