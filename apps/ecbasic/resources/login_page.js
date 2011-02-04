// ==========================================================================
// EcBasic.loginPage
// ==========================================================================
/*globals EcBasic */

EcBasic.loginPanel = SC.PanelPane.create({
  layout: { top: 0, bottom: 0, left: 0, right: 0 },
  defaultResponder: 'EcBasic.statechart',

  contentView: SC.View.design({

    layout: { centerX: 0, centerY: 0, width: 400, height: 300 },
    childViews: 'instructions usernameField passwordField loginErrorMessageLabel loginButton'.w(),

    instructions: SC.LabelView.design({
      layout: { left: 60, top: 60, right: 60, height: 50 },
      value: "Admin functions are for EcBasic personnel only."
    }),

    usernameField: SC.TextFieldView.design({
      layout: { top: 120, left: 60, right: 60, height: 32 },
      hint: 'login name',
      valueBinding: 'EcBasic.adminController.username'
    }),

    passwordField: SC.TextFieldView.design({
      layout: { top: 160, left: 60, right: 60, height: 32 },
      isPassword: YES,
      hint: 'password',
      valueBinding: 'EcBasic.adminController.password'
    }),

    loginErrorMessageLabel: SC.LabelView.design({
      layout: { top: 204, left: 60, right: 60, height: 20 },
      valueBinding: SC.Binding.oneWay('EcBasic.adminController.loginErrorMessage')
    }),

    loginButton: SC.ButtonView.design({
      layout: { bottom: 60, right: 60, width: 80, height: 24 },
      titleMinWidth: 0,
      isEnabledBinding: SC.Binding.oneWay('EcBasic.adminController.username').bool(),
      isDefault: YES,
      title: 'Log In',
      action: 'authenticate'
    })

  }),

  focus: function() {
    this.contentView.usernameField.becomeFirstResponder();
  }

});
