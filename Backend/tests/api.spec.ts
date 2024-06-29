import { test } from '../utils/fixture';
import {expect } from '@playwright/test';
import { convertGermanToEnglish } from '../utils/helper';

test.describe('Test property details', () => {
  const propertyID = 129;
  const propertyName = 'aachen vereinsstraße';
  const propertyCity = 'aachen';
  const propertyCountry = 'germany';
  const propertyStreet = 'vereinsstraße';

  test('Verify Property Details Match Expected Values', async ( {apiSetup} ) => {
    const propertyDetails = await apiSetup.getPropertyDetails(propertyID);

    // Verify the property details match the expected values
    expect(propertyDetails.name).toBe(propertyName);
    expect(propertyDetails.street.toLowerCase()).toContain(propertyStreet);
    expect(propertyDetails.description.toLowerCase()).toContain('aachen');
    expect(propertyDetails.location.city.toLowerCase()).toBe(propertyCity);
    expect(propertyDetails.location.countryName.toLowerCase()).toBe(propertyCountry);

  });

  test('Verify property has check-in, check-out times, parking details and house rules defined', async ({ apiSetup }) => { 
    const propertyDetails = await apiSetup.getPropertyDetails(propertyID);

    // Verify the property has check-in, check-out times, parking details and house rules defined
    expect(propertyDetails.default_check_in_time).not.toBe('');
    expect(propertyDetails.default_check_out_time).not.toBe('');
    expect(propertyDetails.parking).not.toBe('');
    expect(propertyDetails.house_rules).not.toBe('');
  });

  test('Verify all property image URLs are accessible and return 200', async ({ apiSetup, request }) => {
    const propertyImages = (await apiSetup.getPropertyDetails(propertyID)).images;

    // Verify all property image URLs are accessible and return 200
    for (const image of propertyImages) {
      const response = await request.get(image.url);
      expect(response.status()).toBe(200);
    }
  });

  test('Verify Unit Details within the Property for Valid Information and Associations', async ({ apiSetup }) => {
    const propertyUnits = (await apiSetup.getPropertyDetails(propertyID)).unit_groups;

    // Verify the property has units and the units have valid information and associations
    for (const unit of propertyUnits) {
      const unitSpaces = unit.spaces;
      const unitAmenities = unit.amenities;
      // TO DO: Do not convert German to English if strict consistency is required
      const unitTitle = convertGermanToEnglish(unit.title);
      const englishPropertyName = convertGermanToEnglish(propertyName);

      // Verify unit title include the property name
      /* Some unit titles contain German letters with diacritical marks (umlauts and eszett). 
        To ensure consistency, we convert these characters to their English equivalents before validation.
        If strict consistency is required and titles should either use only German or only English characters,
        the test should fail, prompting the use of unconverted titles for comparison. */
      expect(unitTitle.toLowerCase()).toContain(englishPropertyName.toLowerCase());
      // Verify spaces are not empty
      expect(unitSpaces).not.toBeNull();
      // Verify amenities are not empty
      expect(unitAmenities).not.toBeNull();
      // Verify the unit description is not empty
      expect(unit.description).not.toBe('');
      // Verify max occupancy is greater than 0
      expect(unit.max_guests).toBeGreaterThan(0);
    }
  });
});
