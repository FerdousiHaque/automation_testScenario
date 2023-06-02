const Page = require('./page');
const MainPage = require('./common.page')
const assert = require('assert');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ItemPage extends Page{
    /**
     * define selectors using getter methods
     */

    get btnUpload () {
        return $('[title="Upload"]');
    }

    get inputTitle () {
        return $('.controls input');
    }

    get dropdownType () {
        return $('.category-value-container');
    }

    get btnSave() {
        return $('.btnSuccess');
    }

    get fileName () {
        return $('tbody .k-row:nth-child(1) .file-name');
    }

    get thumbnail () {
        return $('tbody .k-row:nth-child(1) .thumb_Image_Size img');
    }

    get textTitle () {
        return $('tbody .k-row:nth-child(1) td:nth-child(3) #fieldValue');
    }

    get textType () {
        return $('tbody .k-row:nth-child(1) td:nth-child(4) #fieldValue');
    }

    /**
     * a method to encapsule automation code to interact with item page
     * e.g. to save and upload image with title and type
     */
    async add (imagePath, title, type) {
        await MainPage.goToAssets();
        await super.waitForElementInvisible();
        await this.btnUpload.click();
        await super.waitForElementInvisible();
        await MainPage.uploadImage(imagePath);
        await this.inputTitle.setValue(title);
        await this.inputTitle.click();
        await this.dropdownType.click();
        await this.dropdownType.selectByVisibleText(type);
        await this.btnSave.scrollIntoView();
        await super.jsClick(await this.btnSave);
        await super.waitForElementInvisible('.gp-bar.progress-striped.active');
        await super.waitForElementInvisible();

        // Checking the image file name
        await super.waitForSometime(2000);
        await super.waitForElementInvisible('.thumb-processing div');
        await super.waitForElementInvisible();
        await super.waitForElementInvisible('.thumb-spinner');
        await super.waitForElementInvisible();
        await this.fileName.waitForDisplayed();
        await expect(await this.fileName.getText()).toEqual(imagePath.substring(imagePath.lastIndexOf('\\') + 1));

        // Wait for the thumbnail to be visible
        await this.thumbnail.waitForDisplayed();
    
        // Check if the thumbnail has a non-zero width
        const width = await this.thumbnail.getProperty('clientWidth');
        const isThumbnailGenerated = width > 0;
        assert.strictEqual(isThumbnailGenerated, true, 'Thumbnail has been generated.');

        // Verify Title and Type fields value
        await expect(await this.textTitle.getText()).toEqual(title);
        await expect(await this.textType.getText()).toEqual(type);
    }

}

module.exports = new ItemPage();
