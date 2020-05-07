'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';

import {QWElement,DomUtils} from "@qualweb/html-util";

class QW_BP12 extends BestPractice {

  constructor() {
    super({
      name: 'Using scope col and row ',
      code: 'QW-BP12',
      description: 'Using using scope col in the first row  (except first) and scope row in the first element of each row (except first)',
      metadata: {
        target: {
          element: ['table', 'tr']
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

    let rows = domUtils.getElementsInsideElement(element, "tr");
    let firstRowChildren: QWElement[] = [];
    if (rows.length > 0) {
      firstRowChildren = await domUtils.getElementChildren(rows[0]);

      let i, scope;
      let scopeCole = true;

      for (i = 1; i < firstRowChildren.length; i++) {
        if (await domUtils.getElementTagName(firstRowChildren[i]) === "td" || await domUtils.getElementTagName(firstRowChildren[i]) === "th" && scopeCole) {
          scope = await domUtils.getElementAttribute(firstRowChildren[i], "scope");
          scopeCole = scope === "col"
        }
      }
      let scopeRow = true;
      let row;

      for (i = 1; i < rows.length; i++) {
        if ( scopeRow) {
          row = rows[i];
          let cells = domUtils.getElementsInsideElement(row, "td");
          if (cells.length > 0) {
            scope = await domUtils.getElementAttribute(cells[0], "scope");
            scopeRow = scope === "row";
          }
        }
      }

      if (scopeCole && scopeRow) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The scope attribute is correctly used.';
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'The scope attribute is incorrectly used.';
        evaluation.resultCode = 'RC2';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The table has no rows.';
      evaluation.resultCode = 'RC3';

    }
    evaluation.htmlCode = await domUtils.getElementHtmlCode(element, true, true);
    evaluation.pointer = await domUtils.getElementSelector(element);
    
    super.addEvaluationResult(evaluation);
  }

}

export = QW_BP12;
