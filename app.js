const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

let server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})

app.get('/', (req, res) => {
    console.log(JSON.stringify(recentData.data.values));
    res.render("index.ejs", { data: JSON.stringify(recentData.data.values) });
})



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
    }

});

async function gsrun(cl) {
    const gsapi = google.sheets({ version: "v4", auth: cl });
    const opt = {
        spreadsheetId: '1-Ng4zfNfrvK3U-n2HcX2rfZ17hWwmNUso18cwQPhT80',
        range: 'Sheet1!A1:K13'
    }
    recentData = await gsapi.spreadsheets.values.get(opt);

}

function retrieveData() {
    gsrun(client);
}

retrieveData();