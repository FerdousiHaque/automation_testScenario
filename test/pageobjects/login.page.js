const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('[for="userName"] + [name="userName"]');
    }

    get inputPassword () {
        return $('[name="password"]');
    }

    get btnSubmit () {
        return $('div > .sign-in-box-btn');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using email and password
     */
    async login (email, password) {
        await this.inputUsername.setValue(email);
        await this.btnSubmit.click();
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
        await super.waitForElementInvisible();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
