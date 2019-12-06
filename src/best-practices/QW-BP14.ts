'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';

import BestPractice from './BestPractice.object';

const bestPractice: BestPracticeType = {
  name: `At least one container's width has been specified using values expressed in px`,
  code: 'QW-BP13',
  description: `At least one container's width has been specified using values expressed in px`,
  metadata: {
    target: {
      element: 'a'
    },
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array<BestPracticeResult>()
};

class QW_BP14 extends BestPractice {

  constructor() {
    super(bestPractice);
  }

  async execute(element: ElementHandle | undefined): Promise<void> {

    if (!element) {
      return;
    }

    const width = DomUtils.getStyleProperty("width");
		console.log("TCL: QW_BP14 -> width", width)

    if (!width) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (width.includes('px')) {
      evaluation.verdict = 'failed';
      evaluation.description = `At least one container's width has been specified using values expressed in px`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'There are no consecutive links with the same href in which one of the links contained an image';
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation);

  }
}

export = QW_BP14;