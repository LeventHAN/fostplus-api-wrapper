# FostPlus API Wrapper

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b4fd41aa99244883918bdb4abaf5458f)](https://app.codacy.com/gh/LeventHAN/fostplus-api-wrapper/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Daily Test](https://github.com/LeventHAN/fostplus-api-wrapper/actions/workflows/test.yml/badge.svg)](https://github.com/LeventHAN/fostplus-api-wrapper/actions/workflows/test.yml)


A TypeScript wrapper for the Fost Plus API, providing methods to access waste collection data and generate iCalendar files.

## Installation

```bash
npm install @leventhan/fostplus-api-wrapper
```

## Usage

```ts
import FostPlusAPI from 'fostplus-api-wrapper';

const api = new FostPlusAPI({
  xConsumer: process.env.CONSUMER_UNIQUE_KEY || 'your_consumer_id', // should be obtained from Fostplus itself however since this field is publicly available you can scrape the web for it (or my tests)
});

// Example usage
(async () => {
  const icsContent = await api.generateICalendar(
    '2880-12007',
    'https://data.vlaanderen.be/id/straatnaam-9365',
    '80',
    '2024-10-19',
    '2024-11-02'
  );
  // Do something with icsContent
})();

```
