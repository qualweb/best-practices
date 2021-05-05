import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP6 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const titleText = element.getElementText();

    if (titleText.length < 100) {
      test.verdict = 'passed';
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'RC2';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_BP6;
