# FostPlus API Wrapper

A TypeScript wrapper for the Fost Plus API, providing methods to access waste collection data and generate iCalendar files.

## Installation

```bash
npm install @leventhan/fostplus-api-wrapper
```

## Usage

```ts
import FostPlusAPI from 'fostplus-api-wrapper';

const api = new FostPlusAPI({
  xConsumer: process.env.CONSUMER_UNIQUE_KEY || 'your_consumer_id',
  xAppVersion: process.env.APP_VERSION || '1.0.0',
  xAppOs: process.env.APP_OS || 'Web',
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
