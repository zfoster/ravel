'use strict';

const ApplicationError = require('../util/application_error');

const sMeta = Symbol.for('_metadata');

function isPrototype(target) {
  if (!(typeof target === 'object')) {
    throw new ApplicationError.IllegalValue('Must get and set metadata on a class prototype.');
  }
}

/**
 * Facilitates accessing andstoring metadata, generally
 * created by decorators, safely within a class's prototype.
 */
class Metadata {
 /**
  * Gets or creates a metadata object for a class
  * @param target {Class} a class
  * @return {Object} the metadata object for the given class
  */
 static getMeta(target) {
   isPrototype(target);
   if (typeof target[sMeta] !== 'object') {
     target[sMeta] = Object.create(null);
     target[sMeta].class = Object.create(null);
     target[sMeta].method = Object.create(null);
   }
   return target[sMeta];
 }

 /**
  * Gets the class-level metadata for a class
  * @param target {Class} a class
  * @param category {String} a category
  * @param defaultValue {Any | undefined} return this value if the given category does not exist
  * @return {Object} the class-level metadata object for the given class
  */
 static getClassMeta(target, category, defaultValue) {
   isPrototype(target);
   const classMeta = Metadata.getMeta(target).class;
   return classMeta[category] ? classMeta[category] : defaultValue;
 }

 /**
  * Gets the class-level metadata value for a class and a key
  * @param target {Class} a class
  * @param category {String} a category
  * @param key {String} the key to get within the metadata category
  * @param defaultValue {Any | undefined} return this value if the given key is not set
  * @return {Object} the class-level metadata object for the given class
  */
 static getClassMetaValue(target, category, key, defaultValue) {
   isPrototype(target);
   const classMeta = Metadata.getClassMeta(target, category);
   return classMeta && classMeta[key] ? classMeta[key] : defaultValue;
 }

 /**
  * Gets the class-level metadata for a class
  * @param target {Class} a class
  * @param method {String} the method name
  * @param category {String} a category
  * @param defaultValue {Any | undefined} return this value if the given category does not exist
  * @return {Object} the class-level metadata object for the given class
  */
 static getMethodMeta(target, method, category, defaultValue) {
   isPrototype(target);
   const methodMeta = Metadata.getMeta(target).method;
   return methodMeta[method] ?
     methodMeta[method][category] ? methodMeta[method][category] : defaultValue : defaultValue;
 }

 /**
  * Gets the class-level metadata value for a class and a key
  * @param target {Class} a class
  * @param method {String} the method name
  * @param category {String} a category
  * @param key {String} the key to get within the metadata category
  * @param defaultValue {Any | undefined} return this value if the given key is not set
  * @return {Object} the class-level metadata object for the given class
  */
 static getMethodMetaValue(target, method, category, key, defaultValue) {
   isPrototype(target);
   const methodMeta = Metadata.getMethodMeta(target, method, category);
   return methodMeta && methodMeta[key] ? methodMeta[key] : defaultValue;
 }

 /**
  * Add or modify class-level metadata
  * @param target {Class} a class
  * @param category {String} a category
  * @param key {String} the key to set within the metadata category
  * @param value {Any} the value to set at the given key
  */
 static putClassMeta(target, category, key, value) {
   isPrototype(target);
   const classMeta = Metadata.getMeta(target).class;
   if (typeof classMeta[category] !== 'object') {
     classMeta[category] = Object.create(null);
   }
   classMeta[category][key] = value;
 }

 /**
  * Add or modify method-level metadata
  * @param target {Class} a class
  * @param method {String} the method name
  * @param category {String} a category
  * @param key {String} the key to set within the metadata category
  * @param value {Any} the value to set at the given key
  */
 static putMethodMeta(target, method, category, key, value) {
   isPrototype(target);
   const methodMeta = Metadata.getMeta(target).method;
   if (typeof methodMeta[method] !== 'object') {
     methodMeta[method] = Object.create(null);
   }
   if (typeof methodMeta[method][category] !== 'object') {
     methodMeta[method][category] = Object.create(null);
   }
   methodMeta[method][category][key] = value;
 }
};

module.exports = Metadata;