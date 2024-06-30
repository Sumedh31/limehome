import { expect, Locator, Page } from '@playwright/test';
import { generateRandomEmail, generateRandomFirstName, generateRandomLastName, generateRandomPassword } from '../utils/helper';

export class Signup {
    // Locators for signup form
    private email: Locator;
    private createAccountButton: Locator;
    private titleMr: Locator;
    private titleMrs: Locator;
    private firstName: Locator;
    private lastName: Locator;
    private password: Locator;
    private registerUserButton: Locator;
    private firstAddressButton: Locator;
    private siteLogo: Locator;

    // Address details locators
    private address: Locator;
    private city: Locator;
    private stateSelect: Locator;
    private postcode: Locator;
    private countrySelect: Locator;
    private phone: Locator;
    private mobilePhone: Locator;
    private saveAddressButton: Locator;

    private page: Page;

    constructor(page: Page) {
        // Initialize locators for signup form
        this.email = page.locator('input[id="email_create"]');
        this.createAccountButton = page.locator('button[id="SubmitCreate"]');
        this.titleMr = page.locator('[id="id_gender1"]');
        this.titleMrs = page.locator('[id="uniform-id_gender2"]');
        this.firstName = page.locator('[id="customer_firstname"]');
        this.lastName = page.locator('[id="customer_lastname"]');
        this.password = page.locator('[id="passwd"]');
        this.registerUserButton = page.locator('[id="submitAccount"]');
        this.firstAddressButton = page.getByTitle('Add my first address', { exact: true });
        this.siteLogo = page.locator('[id="header_logo"]');

        // Initialize locators for address details
        this.address = page.locator('[id="address1"]');
        this.city = page.locator('[id="city"]');
        this.stateSelect = page.locator('select[name="id_state"]');
        this.postcode = page.locator('[id="postcode"]');
        this.countrySelect = page.locator('select[id="id_country"]');
        this.phone = page.locator('[id="phone"]');
        this.mobilePhone = page.locator('[id="phone_mobile"]');
        this.saveAddressButton = page.locator('[id="submitAddress"]');
        this.page = page;
    }

    // Register a new user with random email, password and address details
    public async registerNewUser() {
        await this.registerUser(); // Register user
        await this.clickOnAddFirstAddress(); // Click on 'Add my first address'
        await this.fillAddressDetails(); // Fill address details

        // Go back to the home page by clicking on the site logo
        await this.siteLogo.click();
    }

    // Method to register a user with random email and password
    public async registerUser() {
        const email = generateRandomEmail(); // Generate random email
        const password = generateRandomPassword(); // Generate random password

        // Fill signup form fields
        await this.email.fill(email);
        await this.createAccountButton.click();
        await this.titleMr.click();
        await this.firstName.fill(generateRandomFirstName());
        await this.lastName.fill(generateRandomLastName());
        await this.password.fill(password);
        await this.registerUserButton.click();

        // Return the generated email and password for further use
        return { email, password };
    }

    // Fill address details in the form
    public async fillAddressDetails() {
        // Fill address details form fields
        await this.address.fill('123 Main Street');
        await this.city.fill('New York');
        await this.postcode.fill('10001');
        await this.countrySelect.selectOption({ value: '21' });
        await this.stateSelect.selectOption({ value: '1' });
        await this.phone.fill('2125551234');
        await this.mobilePhone.fill('2125551234');
        await this.saveAddressButton.click();
    }

    // Method to click on 'Add my first address' button
    public async clickOnAddFirstAddress() {
        await this.firstAddressButton.click();
    }
}
