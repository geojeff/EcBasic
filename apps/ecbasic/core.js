// ==========================================================================
// Project:   EcBasic
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals EcBasic */

/** @namespace

  SproutCore app for EcBasicCreations.biz
  
  @extends SC.Object
*/
EcBasic = SC.Application.create(
  /** @scope EcBasic.prototype */ {

  NAMESPACE: 'EcBasic',
  VERSION: '0.1.0',

  store: SC.Store.create().from(SC.Record.fixtures),
  storeType: 'fixtures',

  FloatValidator: SC.Validator.Number.extend( { places: 1 } )
}) ;
