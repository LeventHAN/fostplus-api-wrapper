import FostPlusAPI from "../src/index";

describe("FostPlusAPI", () => {
  const api = new FostPlusAPI({
    xConsumer: "recycleapp.be",
  });

  jest.setTimeout(30000); // 30 seconds timeout for API calls

  test("getZipcodes returns zipcodes for a given query", async () => {
    const zipcodes = await api.getZipcodes("2880");
    expect(zipcodes).toHaveProperty("items");
    expect(zipcodes.items.length).toBeGreaterThan(0);
    expect(zipcodes.items[0]).toHaveProperty("code", "2880");
  });

  test("getRecyclingParks returns recycling parks for a given zipcode", async () => {
    const recyclingParks = await api.getRecyclingParks("2880-12007");
    expect(recyclingParks).toHaveProperty("items");
    expect(recyclingParks.items.length).toBeGreaterThan(0);
    expect(recyclingParks.items[0]).toHaveProperty("city", "Bornem");
  });

  test("getStreets returns streets matching the query and zipcode", async () => {
    const streets = await api.getStreets("Sint-", "2880-12007");
    expect(streets).toHaveProperty("items");
    expect(streets.items.length).toBeGreaterThan(0);
    expect(streets.items[0].name).toMatch(/Sint-/);
  });

  test("getCollections returns collection data for given parameters", async () => {
    const collections = await api.getCollections(
      "2880-12007",
      "https://data.vlaanderen.be/id/straatnaam-9365",
      "80",
      "2024-10-19",
      "2024-11-02"
    );
    expect(collections).toHaveProperty("items");
    expect(collections.items.length).toBeGreaterThan(0);
    expect(collections.items[0]).toHaveProperty("type", "collection");
  });
});
