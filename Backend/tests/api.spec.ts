import { test } from '../utils/fixture';
import { APIResponse, expect } from '@playwright/test';
import { convertGermanToEnglish } from '../utils/helper';
import { PropertyDetails, UnitGroup } from '../utils/types';

// Test Suite: Property Details and Units Verification
test.describe('Verify details and units for property with id 129', () => {
  // Property details for property with id 129
  const propertyID = 129;
  const propertyName = 'aachen vereinsstraße';
  const propertyCity = 'aachen';
  const propertyCountry = 'germany';
  const propertyStreet = 'vereinsstraße';
  const propertyParkingRules = 'there are no private parking spaces available';
  const propertyCheckInTime = '15:00';
  const propertyCheckOutTime = '11:00';
  const propertyRules = 'Short and simple: no smoking, no parties or events and no pets.';

  // Define variables to store property details and unit groups
  let propertyDetails: PropertyDetails;
  let data: any;
  let response: APIResponse;
  let propertyUnits: UnitGroup[];

  test.beforeEach(async ({ apiSetup }) => {
    // Fetch property details before each test
    response = await apiSetup.getPropertyDetails(propertyID);
    data = await response.json();
    propertyDetails = await data.payload;
    propertyUnits = propertyDetails.unit_groups;
  });

  test('Verify Property Basic Information Matches Expected Values', async ({ apiSetup }) => {
    // Verify the API response status is 200
    expect(response.status()).toBe(200);

    // Verify the property details match the expected values
    expect(propertyDetails.name).toBe(propertyName);
    expect(propertyDetails.street.toLowerCase()).toContain(propertyStreet);
    expect(propertyDetails.description.toLowerCase()).toContain('aachen');
    expect(propertyDetails.location.city.toLowerCase()).toBe(propertyCity);
    expect(propertyDetails.location.countryName.toLowerCase()).toBe(propertyCountry);
  });

  test('Verify Check-In/Check-Out Times, Parking Details, and House Rules Are Accurately Defined', async ({ apiSetup }) => {
    // Verify the API response status is 200
    expect(response.status()).toBe(200);

    // Verify the property has check-in, check-out times, parking details, and house rules defined
    expect(propertyDetails.default_check_in_time).toBe(propertyCheckInTime);
    expect(propertyDetails.default_check_out_time).toBe(propertyCheckOutTime);
    expect(propertyDetails.parking).toContain(propertyParkingRules);
    expect(propertyDetails.house_rules).toContain(propertyRules);
  });

  test('Verify All Property Image URLs are Accessible and Return 200 Status', async ({ apiSetup, request }) => {
    // Verify the API response status is 200
    expect(response.status()).toBe(200);

    // Verify all property image URLs are accessible and return 200
    for (const image of propertyDetails.images) {
      const response = await request.get(image.url);
      expect(response.status()).toBe(200);
    }
  });

  test('Verify Unit Details for Valid Information and Proper Associations', async ({ apiSetup }) => {
    // Verify the API response status is 200
    expect(response.status()).toBe(200);

    // Verify the property has units and the units have valid information
    for (const unit of propertyUnits) {
      // Convert German characters to English equivalents for consistency
      // TO DO IF REQUIRED: Do not convert German to English if strict consistency is required
      const unitTitle = convertGermanToEnglish(unit.title);
      const englishPropertyName = convertGermanToEnglish(propertyName);

      // Verify unit title includes the property nameß

      /* Some unit titles contain German letters with diacritical marks (umlauts and eszett). 
         To ensure consistency, we convert these characters to their English equivalents before validation.
         If strict consistency is required and titles should either use only German or only English characters,
         the test should fail, prompting the use of unconverted titles for comparison. */

      expect(unitTitle.toLowerCase()).toContain(englishPropertyName.toLowerCase());

      // Verify the unit description is not empty and the max_guests is greater than 0
      expect(unit.description).not.toBe('');
      expect(unit.max_guests).toBeGreaterThan(0);
    }
  });

  test('Verify each Unit Space at least have a Room in Spaces', async ({ apiSetup }) => {
    // Verify the API response status is 200
    expect(response.status()).toBe(200);

    // Verify each unit has at least has one room, wifi and tv
    for (const unit of propertyUnits) {
      // check if any space has a room and if amenities have TV and Wifi
      const roomExists = unit.spaces.some((space: { name: string; value: number; }) => space.name === "Room" && space.value >= 1);
      const hasTV = unit.amenities.some(amenity => amenity.name.toLowerCase().includes("tv"));
      const hasWifi = unit.amenities.some(amenity => amenity.name.toLowerCase().includes("wifi"));

      // Assertion to check if a valid room exists, TV and Wifi are available
      expect(roomExists).toBe(true);
      expect(hasTV).toBe(true);
      expect(hasWifi).toBe(true);
    }
  });
});
