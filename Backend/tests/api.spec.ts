import { test } from '@playwright/test';
import { ApiSetup } from '../utils/api-setup';

test.describe('Adding products in logged out state', () => {
  test('User should be able to add products in cart', async () => {
    const apiSetup = new ApiSetup();
    const text = await apiSetup.getPropertyDetails();
    const text2 = await apiSetup.getPropertyDetails(); 
  });
});
