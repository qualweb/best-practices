import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP13 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const aWithImg = element.getParent();

    if (!aWithImg) {
      return;
    }

    const test = new Test();

    const href = aWithImg.getAttribute('href');
    const aWithImgNext = aWithImg.nextElementSibling();
    const aWithImgPrev = aWithImg.previousElementSibling();

    if (
      (aWithImgNext && aWithImgNext.getAttribute('href') === href) ||
      (aWithImgPrev && aWithImgPrev.getAttribute('href') === href)
    ) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    }

    if (aWithImg.getParent()) {
      test.addElement(element);
    }
    super.addTestResult(test);
  }
}

export = QW_BP13;
