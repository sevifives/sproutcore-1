// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            portions copyright @2009 Apple Inc.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*global module test htmlbody ok equals same sc_static*/

htmlbody('<style> .sc-static-layout { border: 1px red dotted; } </style>');

var iconURL= sc_static("/images/sproutcore-logo.png");
(function() {
var pane = SC.ControlTestPane.design()
  .add("basic", SC.LabelView, { 
    value:'hello'
  })
  
  .add("disabled", SC.LabelView, { 
    value:'hello',
    isEnabled: NO
  })
  
  .add("selectable", SC.LabelView, { 
    value:'hello',
    isTextSelectable: YES
  })
  
  .add("centered", SC.LabelView, { 
     value: "hello",
     textAlign: SC.ALIGN_CENTER 
  })
   
  .add("centered,icon", SC.LabelView, { 
     value: "hello",
     textAlign: SC.ALIGN_CENTER ,
     icon: iconURL 
  })
  
  .add("regular size", SC.LabelView, { 
     value: "hello",
     controlSize: SC.REGULAR_CONTROL_SIZE
  })
  
  .add("small size", SC.LabelView, { 
     value: "hello",
     controlSize: SC.SMALL_CONTROL_SIZE
  })
  
  .add("tiny size", SC.LabelView, { 
     value: "hello",
     controlSize: SC.TINY_CONTROL_SIZE
  })
  
  .add("bold", SC.LabelView, { 
     value: "hello",
     fontWeight: SC.BOLD_WEIGHT
  })
   
  .add("bold height", SC.LabelView, { 
     value: "hello",
     fontWeight: SC.BOLD_WEIGHT,
     height: 16 
  })
  
  .add("editable", SC.LabelView, { 
     value: "double click me",
     isEditable: YES
  });

pane.show(); // add a test to show the test pane


module('SC.LabelView ui');

test("Check that all Label are visible", function() {
  ok(pane.view('basic').get('isVisibleInWindow'), 'basic.isVisibleInWindow should be YES');
  ok(pane.view('disabled').get('isVisibleInWindow'), 'title.isVisibleInWindow should be YES');
  ok(pane.view('selectable').get('isVisibleInWindow'), 'icon.isVisibleInWindow should be YES');
  ok(pane.view('centered').get('isVisibleInWindow'), 'title,icon.isVisibleInWindow should be YES');
  ok(pane.view('centered,icon').get('isVisibleInWindow'), 'title,icon,disabled.isVisibleInWindow should be YES');
  ok(pane.view('regular size').get('isVisibleInWindow'), 'title,icon,default.isVisibleInWindow should be YES');
  ok(pane.view('small size').get('isVisibleInWindow'), 'title.icon,selected.isVisibleInWindow should be YES');
  ok(pane.view('tiny size').get('isVisibleInWindow'), 'title,toolTip.isVisibleInWindow should be YES');
  ok(pane.view('bold').get('isVisibleInWindow'), 'title,toolTip.isVisibleInWindow should be YES');
  ok(pane.view('bold height').get('isVisibleInWindow'), 'title,toolTip.isVisibleInWindow should be YES');
  ok(pane.view('editable').get('isVisibleInWindow'), 'title,toolTip.isVisibleInWindow should be YES');
});
  

test("Check that all labels have the right classes set", function() {
  var viewElem=pane.view('basic').$();
  ok(viewElem.hasClass('sc-view'), 'basic.hasClass(sc-view) should be YES');
  ok(viewElem.hasClass('sc-label-view'), 'basic.hasClass(sc-label-view) should be YES');
  ok(!viewElem.hasClass('icon'), 'basic.hasClass(icon) should be NO');
  ok(!viewElem.hasClass('disabled'), 'basic.hasClass(disabled) should be YES');
  
  
  viewElem=pane.view('disabled').$();
  ok(viewElem.hasClass('sc-view'), 'title.hasClass(sc-view) should be YES');
  ok(viewElem.hasClass('sc-label-view'), 'title.hasClass(sc-label-view) should be YES');
  ok(!viewElem.hasClass('icon'), 'title.hasClass(icon) should be NO');
  ok(viewElem.hasClass('disabled'), 'title.hasClass(disabled) should be NO');
 
  viewElem=pane.view('selectable').$();
  ok(viewElem.hasClass('sc-view'), 'icon.hasClass(sc-view) should be YES');
  ok(viewElem.hasClass('sc-label-view'), 'icon.hasClass(sc-label-view) should be YES');
  ok(viewElem.hasClass('sc-regular-size'), 'icon.hasClass(sc-regular-size) should be YES');
  ok(!viewElem.hasClass('icon'), 'icon.hasClass(icon) should be YES');
  ok(!viewElem.hasClass('sel'), 'icon.hasClass(sel) should be NO');
  ok(!viewElem.hasClass('disabled'), 'icon.hasClass(disabled) should be NO');
 
  viewElem=pane.view('centered').$();
  ok(viewElem.hasClass('sc-view'), 'title,icon.hasClass(sc-view) should be YES');
  ok(viewElem.hasClass('sc-label-view'), 'title,icon.hasClass(sc-label-view) should be YES');
  ok(!viewElem.hasClass('icon'), 'title,icon.hasClass(icon) should be YES');
  ok(!viewElem.hasClass('disabled'), 'title,icon.hasClass(disabled) should be NO');
 
  viewElem=pane.view('centered,icon').$();
  ok(viewElem.hasClass('sc-view'), 'title,icon,disabled.hasClass(sc-view) should be YES');
  ok(viewElem.hasClass('sc-label-view'), 'title,icon,disabled.hasClass(sc-label-view) should be YES');
  ok(viewElem.hasClass('icon'), 'title,icon,disabled.hasClass(icon) should be YES');
  ok(!viewElem.hasClass('disabled'), 'title,icon,disabled.hasClass(disabled) should be YES');
 
  viewElem=pane.view('regular size').$();
  ok(viewElem.hasClass('sc-view'), 'title,icon,default.hasClass(sc-view) should be YES');
  ok(viewElem.hasClass('sc-label-view'), 'title,icon,default.hasClass(sc-label-view) should be YES');
  ok(viewElem.hasClass('sc-regular-size'), 'title,icon,default.hasClass(sc-regular-size) should be YES');
  ok(!viewElem.hasClass('disabled'), 'title,icon,default.hasClass(disabled) should be NO');
      
  viewElem=pane.view('bold').$();
  ok(viewElem.hasClass('sc-view'), 'title,icon,selected.hasClass(sc-view) should be YES');
  ok(viewElem.hasClass('sc-label-view'), 'title,icon,selected.hasClass(sc-label-view) should be YES');
  ok(!viewElem.hasClass('icon'), 'title,icon,selected.hasClass(icon) should be YES');
  ok(!viewElem.hasClass('disabled'), 'title,icon,selected.hasClass(disabled) should be NO');
   
});

test("Check that the title is set or not and if it is in the appropriate element", function() {
  var viewElem=pane.view('basic').$();
  equals(viewElem.text(), 'hello', 'has a value set');

  viewElem=pane.view('centered,icon').$('img');
  ok((viewElem!==null), 'should have an image corresponding to an icon');

});

})();
