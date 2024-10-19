# FostPlus API Wrapper

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b4fd41aa99244883918bdb4abaf5458f)](https://app.codacy.com/gh/LeventHAN/fostplus-api-wrapper/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Daily Test](https://github.com/LeventHAN/fostplus-api-wrapper/actions/workflows/test.yml/badge.svg)](https://github.com/LeventHAN/fostplus-api-wrapper/actions/workflows/test.yml)

A TypeScript wrapper for the Fost Plus API, providing methods to access waste collection data and generate iCalendar files.

## Installation

```bash
npm install @leventhan/fostplus-api-wrapper
```

## Usage

This simple example will use all available methods.

```js
const FostPlusAPI = require('@leventhan/fostplus-api-wrapper').default
const fs = require('fs');
const path = require('path');


const api = new FostPlusAPI({
  xConsumer: process.env.CONSUMER_UNIQUE_KEY || 'your_consumer_id', // should be obtained from Fostplus itself however since this field is publicly available you can scrape the web for it (or my tests)
});

(async () => {
    try{
        // Step 1: Zipcode data using a valid zipcode as param
        const zipcodesResponse = await api.getZipcodes("2880");
        // Display the list of zipcodes
        /*
            console.log('\nAvailable Zipcodes:');
            zipcodesResponse.items.forEach((item, index) => {
            console.log(`${index + 1}. ${item.code} - ${item.name}`);
            });
        */

        // Step 2: Select a zipcode (we select the first as default)
        const selectedZipcode = zipcodesResponse.items[0];

        const zipcodeId = selectedZipcode.id;
        console.log(`\nSelected Zipcode ID: ${zipcodeId}`);

        // Step 3: Get street query data by street name
        const streetsResponse = await api.getStreets("Sint-Amandsesteenweg", zipcodeId);
        // Display the list of streets
        /*
            console.log('\nAvailable Streets:');
            streetsResponse.items.forEach((item, index) => {
            console.log(`${index + 1}. ${item.name}`);
            });
        */

        // Step 4: Select a street (we select the first as default)
        const selectedStreet = streetsResponse.items[0];

        const streetId = selectedStreet.id;
        console.log(`\nSelected Street ID: ${streetId}`);

        // Step 5: date range
        const fromDate = "2024-10-19"
        const untilDate = "2024-11-02"

        // Step 6: house number
        const houseNumber = "80"

        // Step 7: Generate the iCalendar file
        const icsContent = await api.generateICalendar(
            zipcodeId,
            streetId,
            houseNumber,
            fromDate,
            untilDate
        );

        // Step 8: Save the iCalendar content to a file
        const filePath = path.join(__dirname, 'trash_collection_calendar.ics');

        fs.writeFile(filePath, icsContent, (err) => {
        if (err) {
            console.error('Error saving iCalendar file:', err);
        } else {
            console.log(`\niCalendar file has been saved to ${filePath}`);
        }
        });

    } catch (error) {
      console.error('Error generating iCalendar:', error);
    }
  })();

```
