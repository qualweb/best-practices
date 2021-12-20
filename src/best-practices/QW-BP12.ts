import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementHasChild } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP12 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  @ElementHasChild('tr')
  execute(element: typeof window.qwElement): void {
    const rows = element.findAll('tr');
    let firstRowChildren = new Array<typeof window.qwElement>();
    if (rows.length > 0) {
      firstRowChildren = rows[0].getChildren();

      let i, scope;
      let scopeCole = true;

      for (i = 1; i < firstRowChildren.length; i++) {
        if (firstRowChildren[i].getTagName() === 'td' || (firstRowChildren[i].getTagName() === 'th' && scopeCole)) {
          scope = firstRowChildren[i].getAttribute('scope');
          scopeCole = scope === 'col';
        }
      }
      let scopeRow = true;
      let row;

      for (i = 1; i < rows.length; i++) {
        if (scopeRow) {
          row = rows[i];
          const cells = row.findAll('td');
          if (cells.length > 0) {
            scope = cells[0].getAttribute('scope');
            scopeRow = scope === 'row';
          }
        }
      }

      const test = new Test();

      if (scopeCole && scopeRow) {
        test.verdict = 'passed';
        test.resultCode = 'P1';
      } else {
        test.verdict = 'failed';
        test.resultCode = 'F1';
      }

      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_BP12;
