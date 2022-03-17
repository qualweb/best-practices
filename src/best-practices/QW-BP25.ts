import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementHasParent } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP25 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  @ElementHasParent('*')
  execute(element: typeof window.qwElement): void {
    const test = new Test();
    const parent = this.getCorrectParent(element);
    let isValidParent = false;
    if (parent) {
      const parentRole = window.AccessibilityUtils.getElementRole(parent);
      const parentName = parent.getElementTagName();

      if (parentName === 'dl' && parentRole && ['presentation', 'none', 'list'].includes(parentRole)) {
        isValidParent = true;
      }
    }
    if (isValidParent) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }
    test.addElement(element);
    super.addTestResult(test);
  }

  getCorrectParent(element: typeof window.qwElement) {
    let parent = element.getElementParent();
    if (parent) {
      const parentRole = window.AccessibilityUtils.getElementRole(parent);
      const parentName = parent.getElementTagName();
      if (parentName === 'div' && ['presentation', 'none', null].includes(parentRole))
        parent = parent.getElementParent();
    }
    return parent;
  }
}

export = QW_BP25;