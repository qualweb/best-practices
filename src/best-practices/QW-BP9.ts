'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import {QWElement,DomUtils} from "@qualweb/html-util";

class QW_BP9 extends BestPractice {

  constructor() {
    super({
      name: 'Table element without header cells has a caption',
      code: 'QW-BP9',
      description: 'A table without th elements should have a caption element to describe it.',
      metadata: {
        target: {
          element: 'table'
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

  async execute(domUtils:DomUtils,element: QWElement | undefined): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const headers =  domUtils.getElementsInsideElement(element,'th');

    if (headers.length === 0) {
      const caption =  domUtils.getElementsInsideElement(element,'caption');

      if (caption.length !== 0) {
        evaluation.verdict = 'passed';
        evaluation.description = `Table doesn't have header cells but has a caption`;
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `Table doesn't have header cells or caption`;
        evaluation.resultCode = 'RC2';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `Table has header cells`;
      evaluation.resultCode = 'RC3';
    }
    
    evaluation.htmlCode = await domUtils.getElementHtmlCode(element, true, true);
    evaluation.pointer = await domUtils.getElementSelector(element);
    
    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP9;
