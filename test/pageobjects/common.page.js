
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MainPage extends Page {
    /**
     * define selectors using getter methods
     */
    get dropdownDAM () {
        return $('.dropdown ._s_Label');
    }

    get optionAssets () {
        return $('//a[text()="Assets"]');
    }

    get uploadFile () {
        return $('input[type="File"]');
    }

    async goToAssets () {
        await this.dropdownDAM.waitForDisplayed();
        await this.dropdownDAM.click();
        await this.optionAssets.click();
    }

    async uploadImage (path) {
        await this.uploadFile.setValue(path);
    }
    
    async getRandomEmail() {
        // Generate a random number between 1 and 999999
        const randomNumber = Math.floor(Math.random() * 999999) + 1;
        const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    
        // Create the email address by appending the random number to a base email
        const email = `automation${randomNumber}${randomLetter}@maildrop.cc`;
        console.log("file width = " + email);
        return email;
    
    }
}
module.exports = new MainPage();
