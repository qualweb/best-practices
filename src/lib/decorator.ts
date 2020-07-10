import { BestPracticeResult } from '@qualweb/best-practices';
import bestPractices from './bestPractices.json';
import cloneDeep from 'lodash.clonedeep';

function BestPractice<T extends { new (...args: any[]): {} }>(constructor: T) {
  const bestPractice = bestPractices[constructor.name];
  
  bestPractice.metadata.passed = 0;
  bestPractice.metadata.warning = 0;
  bestPractice.metadata.failed = 0;
  bestPractice.metadata.outcome = '';
  bestPractice.metadata.description = '';
  bestPractice.results = new Array<BestPracticeResult>();
  
  const newConstructor: any = function () {
    let func: any = function () {
      return new constructor(cloneDeep(bestPractice));
    }
    func.prototype = constructor.prototype;
    return new func();
  }
  newConstructor.prototype = constructor.prototype;
  return newConstructor;
}

function ElementExists(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function() {
    if (arguments[0]) {
      return method.apply(this, arguments);
    }
  };
}

function ElementHasAttribute(attribute: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function() {
      const attr = arguments[0].elementHasAttribute( attribute);
      if (attr) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementHasNonEmptyAttribute(attribute: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function() {
      const attr = arguments[0].getElementAttribute( attribute);
      if (attr && attr.trim()) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementHasChild(child: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function() {
      if (arguments[0]) {
        const children = arguments[0].getElements(child);
        if (children.length !== 0) {
          return method.apply(this, arguments);
        }
      }
    };
  };
}

function ElementDoesNotHaveChild(child: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function() {
      if (arguments[0]) {
        const children = arguments[0].getElements(child);
        if (children.length === 0) {
          return method.apply(this, arguments);
        }
      }
    };
  };
}

function ElementHasParent(parent: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function() {
      const element = arguments[0].elementHasParent( parent);
      if (element) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementIsNotChildOf(parent: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function() {
      const hasParent = arguments[0].elementHasParent( parent);
      if (!hasParent) {
        return method.apply(this, arguments);
      }
    };
  };
}

export {
  BestPractice,
  ElementExists,
  ElementHasAttribute,
  ElementHasNonEmptyAttribute,
  ElementHasChild,
  ElementDoesNotHaveChild,
  ElementHasParent,
  ElementIsNotChildOf
};