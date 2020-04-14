const { BestPractices } = require('../../dist/index');
const { expect } = require('chai');
const puppeteer = require('puppeteer');
const { getDom } = require('../getDom');
describe('Technique QW-BP16', function () {
  const tests = [
    {
      url: 'https://accessible-serv.lasige.di.fc.ul.pt/~asantos/BP16/test1.html',
      outcome: 'passed'
    },
    {
      url: 'https://accessible-serv.lasige.di.fc.ul.pt/~asantos/BP16/test2.html',
      outcome: 'passed'
    },
    {
      url: 'https://accessible-serv.lasige.di.fc.ul.pt/~asantos/BP16/test3.html',
      outcome: 'failed'
    }
  ];
  let browser;
  it("pup open", async function () {
    browser = await puppeteer.launch();
  });
  let i = 0;
  let lastOutcome = 'warning';
  for (const test of tests || []) {
    if (test.outcome !== lastOutcome) {
      lastOutcome = test.outcome;
      i = 0;
    }
    i++;
    describe(`${test.outcome.charAt(0).toUpperCase() + test.outcome.slice(1)} example ${i}`, function () {
      it(`should have outcome="${test.outcome}"`, async function () {
        this.timeout(10 * 1000);
        const { page, stylesheets } = await getDom(browser,test.url);

        const bestPractices = new BestPractices({
          bestPractices: ['QW-BP16']
        });

        const report = await bestPractices.execute(page, stylesheets);
        expect(report['best-practices']['QW-BP16'].metadata.outcome).to.be.equal(test.outcome);
      });
    });
  }
  describe(``,  function () {
    it(`pup shutdown`, async function () {
      await browser.close();
    });
  });
});