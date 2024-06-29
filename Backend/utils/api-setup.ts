import { APIRequestContext, request, expect } from "@playwright/test";

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

    public async getPropertyDetails(): Promise<PropertyDetails> {
        const data = await this.fetchData(this.context, '/properties/v1/public/properties/129');
        return data;
    }

    public async fetchData(apiRequestContext: Promise<APIRequestContext>, url: string) {
        const context = await apiRequestContext;
        const response = await context.get(url);
        expect(response.status()).toBe(200);
      
        return await response.json();
    }
    
}