# Backend API Tests

This directory contains the API tests for the backend services, focusing on ensuring the integrity and reliability of the API endpoints.

## Overview

The API tests are designed to validate the responses, status codes, and data integrity of the property details endpoint. 

## Setup
1. cd limehome/Frontend and run `yarn install`
2. run `yarn playwright install`

## Running the Test
1. run `yarn test` to tun the test
2. The tests are run using 4 parallel workers by default. You can change the workers by running tests using `yarn test --workers=n`

## Reports

The HTML report opens automatically upon the completion of tests. The results are saved in the `./html-test-results` directory as the file `index.html`.

## Test Suite: Property Details and Units Verification

This specific test suite, `Property Details and Units Verification`, focuses on verifying the correctness and completeness of property details fetched from the backend. It covers the following aspects:

- **Basic Information Matching**: Ensures that the basic details of a property, such as name, street, city, and country, match the expected values.
- **Defined Check-In/Out Times and Amenities**: Verifies that properties have defined check-in/check-out times, parking details, and house rules.
- **Image URL Accessibility**: Checks that all property image URLs are accessible and return a 200 status code.
- **Unit Spaces and Amenities**: Checks that Unit spaces comes along proper information, spaces and amenities.
