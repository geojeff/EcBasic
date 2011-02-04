// ==========================================================================
// Project:   EcBasic.categoryController
// ==========================================================================
/*globals EcBasic */

/** @class

  For use with adding/editing a category.

  @extends SC.Object
*/
EcBasic.categoryController = SC.ObjectController.create(
/** @scope EcBasic.categoryController.prototype */ {
  contentBinding: 'EcBasic.categoriesController.selection',
  isEditing: NO
});
