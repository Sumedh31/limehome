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

    public async getPropertyDetails(id: number): Promise<PropertyDetails> {
        const data = await this.fetchData(this.context, `/properties/v1/public/properties/${id}`);
        return data.payload;
    }

    public async fetchData(apiRequestContext: Promise<APIRequestContext>, url: string) {
        const context = await apiRequestContext;
        const response = await context.get(url);

        // The response status should be 200, otherwise the test will fail
        expect(response.status()).toBe(200);
      
        return await response.json();
    }
    
}