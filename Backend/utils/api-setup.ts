import { APIRequestContext, request, expect } from "@playwright/test";
import {PropertyDetails} from "./types";

export class ApiSetup {
    private context: Promise<APIRequestContext>;

    constructor() {
      this.context = request.newContext({
        baseURL: "https://api.limehome.com",
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }

    /**
     * Fetches property details for a given property ID.
     * @param id The ID of the property to fetch details for.
     * @returns A Promise resolving to PropertyDetails object containing property information.
     */
    public async getPropertyDetails(id: number): Promise<PropertyDetails> {
        const data = await this.fetchData(this.context, `/properties/v1/public/properties/${id}`);
        return data.payload;
    }
    /**
     * Performs an HTTP GET request to fetch data from the specified URL.
     * @param apiRequestContext Promise resolving to APIRequestContext for making API requests.
     * @param url The URL to fetch data from.
     * @returns A Promise resolving to the JSON response data.
     */
    public async fetchData(apiRequestContext: Promise<APIRequestContext>, url: string) {
      // Wait for API request context to resolve
      const context = await apiRequestContext;

      // Send a GET request to the specified URL
      const response = await context.get(url);

      // Assert that the response status is 200 (OK), failing the test if it's not
      expect(response.status()).toBe(200);
      
      // Return the JSON content of the response
      return await response.json();
    }
    
}