import { APIRequestContext, request, expect, APIResponse } from "@playwright/test";

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
    public async getPropertyDetails(id: number): Promise<APIResponse> {
        const response = await this.get(this.context, `/properties/v1/public/properties/${id}`);
        return response;
    }
    /**
     * Performs an HTTP GET request to fetch data from the specified URL.
     * @param apiRequestContext Promise resolving to APIRequestContext for making API requests.
     * @param url The URL to fetch data from.
     * @returns A Promise resolving to the JSON response data.
     */
    public async get(apiRequestContext: Promise<APIRequestContext>, url: string): Promise<APIResponse> {
      // Wait for API request context to resolve
      const context = await apiRequestContext;

      // Send a GET request to the specified URL
      const response = await context.get(url);
     
      // Return the JSON content of the response
      return response;
    }
    
}