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

    get frame () {
        return $('iFrame.w-full');
    }

    get linkDownload () {
        return $('//span[contains(text(),"download")]/parent::a');
    }


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to edit title field value and verify
     */
    async shareUsingEmail (email) {
        await this.checkboxItem.waitForDisplayed();
        await this.checkboxItem.click();
        await super.waitForElementInvisible();
        await this.btnShare.waitForDisplayed();
        await this.btnShare.click();
        await super.waitForElementInvisible();

        await this.inputEmail.waitForDisplayed();
        await this.inputEmail.click();
        await browser.keys(email);
        await super.waitForElementInvisible();
        await this.optionEmail.click();
        await super.waitForElementInvisible();
        await this.btnSend.click();
        await super.waitForElementInvisible();
        await this.openEmail(email);
    }

    async openEmail (email) {
        browser.url(`https://maildrop.cc/inbox/?mailbox=${email.substring(0, email.indexOf("@"))}`)
        await super.waitForElementInvisible('div > span.hidden');
        await super.waitForElementInvisible('div.bg-white.w-full');
        await this.frame.waitForDisplayed();
        await browser.switchToFrame(0);
        await this.linkDownload.scrollIntoView();
        await this.linkDownload.waitForDisplayed();
        const hrefValue = await this.linkDownload.getAttribute('href');
        await browser.switchToParentFrame();
        const linkPattern = /^https:\/\/qatest\.marcombox\.com\/FileShare\?id=.+$/;

        assert.ok(linkPattern.test(hrefValue), 'Link is not valid');
    }


}

module.exports = new ShareItem();
