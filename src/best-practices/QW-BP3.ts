'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import { QWElement } from '@qualweb/qw-element';

class QW_BP3 extends BestPractice {

  constructor() {
    super({
      name: 'Link element with text content equal to the content of the title attribute',
      code: 'QW-BP3',
      description: 'The link element text content shouldn\'t be equal to the content of the title attribute',
      metadata: {
        target: {
          element: 'a',
          attributes: 'title'
        },
        related: ['H33'],
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0,
        outcome: '',
        description: ''
      },
      results: new Array < BestPracticeResult > ()
    });
  }

  async execute(element: QWElement | undefined): Promise < void > {

    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const titleValue = element.getElementAttribute( 'title');
    const text = element.getElementText();

    if (titleValue && titleValue.trim().toLowerCase() === text.trim().toLowerCase()) {
      evaluation.verdict = 'failed';
      evaluation.description = `Link text content and title attribute value are the same`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'Link text content and title attribute value are not the same';
      evaluation.resultCode = 'RC2';
    }

    evaluation.htmlCode = element.getElementHtmlCode( true, true);
    evaluation.pointer = element.getElementSelector();

    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP3;
