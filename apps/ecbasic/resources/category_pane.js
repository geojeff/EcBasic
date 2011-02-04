// ==========================================================================
// EcBasic.categoryPage
// ==========================================================================
/*globals EcBasic */

EcBasic.categoryPanel = SC.PanelPane.create({
  childViews: 'cancelButton'.w(),
  classNames: ['category'],
  defaultResponder: EcBasic.statechart,

//  name: SC.View.design({
//    layout: { left: 17, right: 14, top: 0, height: 26 },
//    childViews: 'label field'.w(),
//
//    label: SC.LabelView.design({
//      layout: { left: 0, width: 107, height: 18, centerY: 0 },
//
//      value: '_category',
//      localize: YES,
//      textAlign: SC.ALIGN_RIGHT
//    }),
//
//    field: SC.TextFieldView.design({
//      layout: { width: 200, height: 22, right: 3, centerY: 0 },
//
//      isEnabledBinding: SC.Binding.from("EcBasic.categoryController.isEditing")
//              .bool()
//              .transform(function(value, isForward) {
//        return !value;
//      }),
//      valueBinding: 'EcBasic.categoryController.name'
//    })
//  }),

  cancelButton: SC.ButtonView.design({
    layout: { right: 120, bottom: 10, width: 100, height: 24 },
    title: 'Cancel',
    action: 'cancel'
  })
//
//  saveButton: SC.ButtonView.design({
//    layout: { right: 10, bottom: 10, width: 100, height: 24 },
//    title: 'Save',
//    action: 'save',
//    isEnabledBinding: SC.Binding.from("EcBasic.categoryController.isEditing")
//            .bool()
//            .transform(function(value, isForward) {
//      return !value;
//    })
//  })
});