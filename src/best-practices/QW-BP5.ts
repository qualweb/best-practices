'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import { QWElement } from '@qualweb/qw-element';

class QW_BP5 extends BestPractice {

  constructor() {
    super({
      name: 'Using table elements inside other table elements',
      code: 'QW-BP5',
      description: 'It is not recommended to use table elements inside other table elements',
      metadata: {
        target: {
          element: 'table',
          parent: 'table'
        },
        related: [],
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0,
        outcome: '',
        description: ''
      },
      results: new Array<BestPracticeResult>()
    });
  }

  execute(element: QWElement | undefined): void {

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    //const parent = await DomUtils.getElementParent(element);

    if (!element) {
      evaluation.verdict = 'passed';
      evaluation.description = 'There are not table elements inside other table elements';
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = 'There are table elements inside other table elements';
      evaluation.resultCode = 'RC2';
      evaluation.htmlCode = element.getElementHtmlCode( true, true);
      evaluation.pointer =element.getElementSelector();
    }
    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP5;
