// ==========================================================================
// Project:   EcBasic.Category Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals EcBasic */

sc_require('models/category');

EcBasic.Category.FIXTURES = [
  { 'guid': 1,
    'name': 'Hand Tools',
    'isVisible': YES,
    'products': [1, 2, 3, 4] },
  { 'guid': 2,
    'name': 'Saws',
    'isVisible': YES,
    'products': [5, 6, 7, 8] }
];
