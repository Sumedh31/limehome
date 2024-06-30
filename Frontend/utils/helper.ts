/**
 * Generates a random email address with the proton.me domain.
 * @returns A string representing the random email address.
 */
export function generateRandomEmail(): string {
    // Define characters to use in the email local part
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let emailLocalPart = '';

    // Generate a random local part with 10 characters
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        emailLocalPart += chars[randomIndex];
    }

    // Combine the local part with the proton.me domain
    return `${emailLocalPart}@proton.me`;
}

/**
 * Generates a random first name.
 * @returns A string representing the random first name.
 */
export function generateRandomFirstName(): string {
    const firstNames = ['John', 'Jane', 'Alex', 'Alice', 'Chris', 'Dana', 'Eli', 'Eva', 'Max', 'Mia'];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
}

/**
 * Generates a random last name.
 * @returns A string representing the random last name.
 */
export function generateRandomLastName(): string {
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Martinez', 'Lopez'];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
}

/**
 * Generates a random password containing at least one special character and one capital letter.
 * @returns A string representing the random password.
 */
export function generateRandomPassword(length: number = 10): string {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#_';

    let allChars = lowercaseChars + uppercaseChars + numberChars + specialChars;
    
    let password = '';
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
    
    for (let i = 2; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password;
}
