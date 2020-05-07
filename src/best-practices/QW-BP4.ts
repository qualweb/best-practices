'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import {QWElement,DomUtils} from "@qualweb/html-util";

class QW_BP4 extends BestPractice {

  constructor() {
    super({
      name: 'Grouped links not within a nav element',
      code: 'QW-BP4',
      description: 'Set of 10 or more links not grouped within a list (nav)',
      metadata: {
        target: {
          element: 'a'
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

    if (!element || await domUtils.elementHasParent(element, 'nav')) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const aCount = domUtils.getNumberOfSiblingsWithTheSameTag(element);
    if (aCount >= 10) {
      evaluation.verdict = 'failed';
      evaluation.description = `It was found a group of 10 or more links not grouped within a nav element`;
      evaluation.resultCode = 'RC1';
    } else  {
      return;
    }

    const parent = await domUtils.getElementParent(element);
    if (parent) {
      evaluation.htmlCode = await domUtils.getElementHtmlCode(parent, true, true);
      evaluation.pointer = await domUtils.getElementSelector(parent);
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP4;
