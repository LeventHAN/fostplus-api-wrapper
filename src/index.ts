import axios from "axios";
import {
  ZipcodeResponse,
  RecyclingParksResponse,
  StreetsResponse,
  CollectionsResponse,
} from "./types";
import { ICalCalendar, ICalEventData } from "ical-generator";

interface FostPlusAPIConfig {
  xConsumer: string;
}

class FostPlusAPI {
  private apiClient: import("axios").AxiosInstance;

  constructor(config: FostPlusAPIConfig) {
    this.apiClient = axios.create({
      baseURL: "https://api.fostplus.be/recyclecms/public/v1",
      headers: {
        "Content-Type": "application/json",
        "x-consumer": config.xConsumer,
      },
    });
  }

  async getZipcodes(q: string): Promise<ZipcodeResponse> {
    try {
      const response = await this.apiClient.get<ZipcodeResponse>("/zipcodes", {
        params: { q },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getRecyclingParks(
    zipcode: string,
    language: string = "en",
    size: number = 100
  ): Promise<RecyclingParksResponse> {
    try {
      const response = await this.apiClient.get<RecyclingParksResponse>(
        "/collection-points/recycling-parks",
        {
          params: { zipcode, language, size },
        }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getStreets(q: string, zipcodes: string): Promise<StreetsResponse> {
    try {
      const response = await this.apiClient.get<StreetsResponse>("/streets", {
        params: { q, zipcodes },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getCollections(
    zipcodeId: string,
    streetId: string,
    houseNumber: string,
    fromDate: string,
    untilDate: string,
    size: number = 100
  ): Promise<CollectionsResponse> {
    try {
      const response = await this.apiClient.get<CollectionsResponse>(
        "/collections",
        {
          params: {
            zipcodeId,
            streetId,
            houseNumber,
            fromDate,
            untilDate,
            size,
          },
        }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  async generateICalendar(
    zipcodeId: string,
    streetId: string,
    houseNumber: string,
    fromDate: string,
    untilDate: string,
    size: number = 100
  ): Promise<string> {
    const collections = await this.getCollections(
      zipcodeId,
      streetId,
      houseNumber,
      fromDate,
      untilDate,
      size
    );

    const calendar = new ICalCalendar({
      prodId: "//fostplus-api-wrapper//EN",
      name: "Trash Collection Calendar",
    });

    collections.items.forEach((item) => {
      const eventData: ICalEventData = {
        start: new Date(item.timestamp),
        end: new Date(item.timestamp),
        summary: item.fraction.name.en,
        description: item.fraction.name.en,
        allDay: true,
      };
      calendar.createEvent(eventData);
    });

    return calendar.toString();
  }

  private handleError(error: any): never {
    if (error.response) {
      console.error("API Error Response:", error.response.data);
      throw new Error(
        `API Error: ${error.response.status} - ${error.response.statusText} - ${JSON.stringify(
          error.response.data
        )}`
      );
    } else if (error.request) {
      throw new Error("API Error: No response received from the server.");
    } else {
      throw new Error(`API Error: ${error.message}`);
    }
  }
}

export default FostPlusAPI;
