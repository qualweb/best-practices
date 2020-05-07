'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import {QWElement,DomUtils} from "@qualweb/html-util";
class QW_BP2 extends BestPractice {

  constructor() {
    super({
      name: 'Concise images alt text',
      code: 'QW-BP2',
      description: 'Image alt text attribute with more than 100 characters',
      metadata: {
        target: {
          element: 'img'
        },
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

  async execute(domUtils:DomUtils,element: QWElement | undefined): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    const altValue = await domUtils.getElementAttribute(element, 'alt');   

    if (!altValue || altValue === '') {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The img alt text attribute is empty';
      evaluation.resultCode = 'RC1';
    } else if (altValue.trim().length > 100) {
      evaluation.verdict = 'failed';
      evaluation.description = 'The img alt text attribute has more than 100 characters';
      evaluation.resultCode = 'RC2';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'The img alt text attribute has less than 100 characters';
      evaluation.resultCode = 'RC3';
    }
    
    evaluation.htmlCode = await domUtils.getElementHtmlCode(element, true, true);
    evaluation.pointer = await domUtils.getElementSelector(element);
    
    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP2;
