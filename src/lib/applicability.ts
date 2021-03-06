import { BestPractice, BestPracticeResult } from '@qualweb/best-practices';
import bestPractices from './bestPractices.json';

function BestPracticeClass<T extends { new (...args: any[]): {} }>(constructor: T) {
  //@ts-ignore
  const bestPractice = <BestPractice>bestPractices[constructor.name];

  bestPractice.metadata.passed = 0;
  bestPractice.metadata.warning = 0;
  bestPractice.metadata.failed = 0;
  bestPractice.metadata.inapplicable = 0;
  bestPractice.metadata.outcome = 'inapplicable';
  bestPractice.metadata.description = 'No test targets found.';
  bestPractice.results = new Array<BestPracticeResult>();

  const newConstructor: any = function () {
    const func: any = function () {
      return new constructor(bestPractice);
    };
    func.prototype = constructor.prototype;
    return new func();
  };
  newConstructor.prototype = constructor.prototype;
  return newConstructor;
}

function IsApplicable(conditions: { if: Array<any> }) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      let isApplicable = true;

      for (const condition of conditions.if) {
        isApplicable &&= condition(arguments);
      }
      if (isApplicable) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementItsDefined(...args: any[]) {
  return args[0] !== undefined;
}

function ElementExists(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    if (<typeof window.qwElement>arguments[0]) {
      return method.apply(this, arguments);
    }
  };
}

function ElementHasAttribute(attribute: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const attr = (<typeof window.qwElement>arguments[0]).elementHasAttribute(attribute);
      if (attr) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementHasNonEmptyAttribute(attribute: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const attr = (<typeof window.qwElement>arguments[0]).getElementAttribute(attribute);
      if (attr && attr.trim()) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementHasChild(child: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const children = (<typeof window.qwElement>arguments[0]).getElements(child);
      if (children.length !== 0) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementDoesNotHaveChild(child: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const children = (<typeof window.qwElement>arguments[0]).getElements(child);
      if (children.length === 0) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementHasParent(parent: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const element = (<typeof window.qwElement>arguments[0]).elementHasParent(parent);
      if (element) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementIsNotChildOf(parent: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const hasParent = (<typeof window.qwElement>arguments[0]).elementHasParent(parent);
      if (!hasParent) {
        return method.apply(this, arguments);
      }
    };
  };
}

export {
  BestPracticeClass,
  IsApplicable,
  ElementItsDefined,
  ElementExists,
  ElementHasAttribute,
  ElementHasNonEmptyAttribute,
  ElementHasChild,
  ElementDoesNotHaveChild,
  ElementHasParent,
  ElementIsNotChildOf
};
