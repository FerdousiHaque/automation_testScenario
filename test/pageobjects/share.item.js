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
     * e.g. to share the item using email
     */
    async shareUsingEmail (email) {
        // select item and share checkbox
        await this.checkboxItem.waitForDisplayed();
        await this.checkboxItem.click();
        await super.waitForElementInvisible();
        await this.btnShare.waitForDisplayed();
        await this.btnShare.click();
        await super.waitForElementInvisible();

        // input and check email with link
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
        await this.waitForEmail();
        
        await this.frame.waitForDisplayed();
        await browser.switchToFrame(0);
        await this.linkDownload.scrollIntoView();
        await this.linkDownload.waitForDisplayed();
        const hrefValue = await this.linkDownload.getAttribute('href');
        await browser.switchToParentFrame();
        const linkPattern = /^https:\/\/qatest\.marcombox\.com\/FileShare\?id=.+$/;
        assert.ok(linkPattern.test(hrefValue), 'Link is not valid');
    }

    
    async waitForEmail () {
        const MAX_CLICKS = 20;
        let clickCount = 0;
        const element = $('//span[text()="Refresh Mailbox"]');
        if (await element.isExisting()) {
            while (clickCount < MAX_CLICKS) {
            await super.waitForSometime(2000);
            if (!element.isExisting()) {
                break;
            }
            
            await element.click();
            clickCount++;
            await super.waitForElementInvisible('div > span.hidden');
            // Wait for 3 seconds before the next click
            await super.waitForSometime(3000);
            }
        }

    }

}

module.exports = new ShareItem();
