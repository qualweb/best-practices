'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';

import BestPractice from './BestPractice.object';

const bestPractice: BestPracticeType = {
  name: 'At least one width attribute of an HTML element is expressed in absolute values',
  code: 'QW-BP15',
  description: 'At least one width attribute of an HTML element is expressed in absolute values',
  metadata: {
    target: {
      element: '*'
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

class QW_BP15 extends BestPractice {

  absoluteLengths = ["cm", "mm", "in", "px", "pt", "pc"];
  relativeLengths = ["em", "ex", "ch", "rem", "vw", "vh", "vmin", "vmax", "%"];

  constructor() {
    super(bestPractice);
  }

  async execute(element: ElementHandle | undefined): Promise<void> {

    if (!element) {
      return;
    }

    if (!aWithImg) {
      return;
    }
    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const width = DomUtils.getStyleProperty("width");
		console.log("TCL: QW_BP15 -> width", width)

    if (!width) {
      return;
    }

    if (this.lenghIsAbsolute(width)) {
      evaluation.verdict = 'failed';
      evaluation.description = `At least one width attribute of an HTML element is expressed in absolute values`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'At least one width attribute of an HTML element is expressed in relative values';
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation);

  }

  private lenghIsAbsolute(value: String){
    for(const metric of this.absoluteLengths){
      if (value.includes(metric))
        return true
    }
    return false;
  }
}

export = QW_BP15;