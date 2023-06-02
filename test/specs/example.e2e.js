const LoginPage = require('../pageobjects/login.page')
const ItemPage = require('../pageobjects/add.item')
const EditItemPage = require('../pageobjects/edit.title')
const ShareItem = require('../pageobjects/share.item')
const CommonFunction = require('../pageobjects/common.page')
const filePath = process.cwd() + '\\test\\images\\image.jpg'


describe('Test application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login('ehasanul.haque@wundermanthompson.com', 'Ferdousi1234')

    });

    it('should create item by uploading image', async () => {

        await ItemPage.add(filePath, 'QA Automation', 'Image')

    });

    it('should edit first item title', async () => {

        await EditItemPage.editTitle('QA Automation Engineer')

    });

    it('should share item using email', async () => {

        await ShareItem.shareUsingEmail(await CommonFunction.getRandomEmail())

    })
})


