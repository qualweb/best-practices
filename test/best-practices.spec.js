const { expect } = require('chai');
const puppeteer = require('puppeteer');
const { getDom } = require('./getDom');
const { BestPractices } = require('../dist/index');

describe('BP module', function () {
  it('Should evaluate www.nav.no', async function () {
    this.timeout(1000 * 1000);
    const browser = await puppeteer.launch();
    const { sourceHtml, page, stylesheets } = await getDom(browser, ' https://www.accessibility.nl/wai-tools/validation-test-sites/wikipedia-wikipedia/');

    try {
      await page.addScriptTag({
        path: require.resolve('./bp.js')
      })
      await page.addScriptTag({
        path: require.resolve('./qwPage.js')
      })
      await page.addScriptTag({
        path: require.resolve('./act.js')
      })
      await page.addScriptTag({
        path: require.resolve('./html.js')
      })
      sourceHtml.html.parsed = {};
      let report = await page.evaluate((sourceHtml, stylesheets) => {
        let page = new QWPage.QWPage(document);
        const bp = new BestPractices.BestPractices();
        const actRules = new ACTRules.ACTRules();
        const html = new HTMLTechniques.HTMLTechniques();
        let reportACT = actRules.execute(sourceHtml, page, stylesheets);
        let reportBP = bp.execute(page);
        let reportHTML= html.execute(page ,false, {});
        return {reportACT,reportBP,reportHTML};
      },sourceHtml, stylesheets);

      console.log(report);
      /*
      const fs = require('fs')
      // Write data in 'Output.txt' . 
      fs.writeFile('Output.txt', JSON.stringify(report, null, 2), (err) => {
        // In case of a error throw err. 
        if (err) throw err;
      })*/
    } catch (err) {
      console.error(err);
    } finally {
      await browser.close();
    }
  })
});