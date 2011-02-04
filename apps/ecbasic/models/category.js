// ==========================================================================
// Project:   EcBasic.Category
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals EcBasic */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
EcBasic.Category = SC.Record.extend(
/** @scope EcBasic.Category.prototype */ {
  name:       SC.Record.attr(String),
  isVisible:  SC.Record.attr(Boolean),
  products:   SC.Record.toMany('EcBasic.Product', { inverse: 'category', isMaster: YES }),

  treeItemIsExpanded: NO,

  treeItemChildren: function() {
    return this.get('products').filterProperty('isVisible');
  }.property()
});
