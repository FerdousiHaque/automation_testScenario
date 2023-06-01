/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`https://qatest.marcombox.com/${path}`)
    }

    async waitForElementInvisible(element = '#_s_ServerBusy_Footer') {
        await browser.waitUntil(async () => {
            const loaderElement = await $(element);
            const isLoaderVisible = await loaderElement.isDisplayed();
            return !isLoaderVisible;
          }, { timeout: 30000, timeoutMsg: `Element '${element}' is still visible after 30 seconds`});
          
    }

    async waitForSometime(time) {
        browser.setTimeout({'implicit': time});
    }
}
