const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class EditItemPage extends Page{
    /**
     * define selectors using getter methods
     */
    get openItem () {
        return $('.k-row:nth-child(1) td:nth-child(2) #fieldValue');
    }

    get iconEdit () {
        return $('button[title="Edit"]');
    }

    get btnSave () {
        return $('//section/div/div/div/div[3]/div[1]/div[1]/button[1]');
    }

    get btnClose () {
        return $('._s_Close');
    }

    get updatedTitle () {
        return $('.k-row:nth-child(1) td:nth-child(3) #fieldValue');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to edit title field value and verify
     */
    async editTitle (title) {
        // open item and click on edit icon
        await this.openItem.click();
        await super.waitForElementInvisible();
        await super.waitForElementInvisible('svg + p.chakra-text');
        await super.waitForElementInvisible();
        await super.waitForSometime(2000);
        await this.iconEdit.waitForDisplayed();
        await this.iconEdit.click();
        await super.waitForElementInvisible();

        // edit title by passing new title
        const editTitleElement = await $('div:nth-child(2) > div > div > div > input');
        await editTitleElement.waitForDisplayed();
        await editTitleElement.setValue(title);

        // finally save and close
        await this.btnSave.click();
        await super.waitForElementInvisible();
        await this.btnClose.click();
        await super.waitForElementInvisible();
        await super.waitForElementInvisible('//li//div[2]');
        await super.waitForElementInvisible();
        await expect(await this.updatedTitle.getText()).toEqual(title);
    }

}

module.exports = new EditItemPage();
