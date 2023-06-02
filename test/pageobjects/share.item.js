const assert = require('assert');
const Page = require('./page');
/**
 * sub page containing specific selectors and methods for a specific page
 */
class ShareItem extends Page{
    /**
     * define selectors using getter methods
     */
    get checkboxItem () {
        return $('tbody .k-row:nth-child(1) .select-icon-check');
    }

    get btnShare () {
        return $('[title="Share"] div');
    }

    get inputEmail () {
        return $('.select2-offscreen + input[type="text"]');
    }

    get optionEmail () {
        return $('._s_item-selector-item + div');
    }

    get btnSend() {
        return $('.btn-success._s_Send');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to share the item using email
     */
    async shareUsingEmail (email) {
        // Select item and share checkbox
        await this.checkboxItem.waitForDisplayed();
        await this.checkboxItem.click();
        await super.waitForElementInvisible();
        await this.btnShare.waitForDisplayed();
        await this.btnShare.click();
        await super.waitForElementInvisible();

        // Input and check email with link
        await this.inputEmail.waitForDisplayed();
        await this.inputEmail.click();
        await browser.keys(email);
        await super.waitForElementInvisible();
        await this.optionEmail.click();
        await super.waitForElementInvisible();
        await this.btnSend.click();
        await super.waitForElementInvisible();
        await this.getEmail(email);
    }

    async getEmail (testEmailAddress) {
        const linkPattern = /^https:\/\/qatest\.marcombox\.com\/FileShare\?id=.+$/;
        const MailosaurClient = require('mailosaur')
        const mailosaur = new MailosaurClient('bRs6lzb5CBGbjtMyjE6yQOe6WhHwWFV3');
        const serverId = 'rrxshwzq'
    
        const searchCriteria = {
        sentTo: testEmailAddress
        }
    
        // depending on search criteria get the email
        const message = await mailosaur.messages.get(serverId, searchCriteria)
        const firstLink = message.html.links[0].href;
        assert.ok(linkPattern.test(firstLink), 'Link is not valid');
        
    }

}

module.exports = new ShareItem();
