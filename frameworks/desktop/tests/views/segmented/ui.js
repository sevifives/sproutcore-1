// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            portions copyright @2009 Apple Inc.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*global module test htmlbody ok equals same stop start */


htmlbody('<style> .sc-static-layout { border: 1px red dotted; } </style>');
var pane;
(function() {
  var iconURL= sc_static("/images/tests/people.gif");
  
  pane = SC.ControlTestPane.design()
    
    .add("3_empty", SC.SegmentedView, { 
      items: [ '', '' , ''],
      layout: { height: 25 }
    })
    .add("3_empty,icon", SC.SegmentedView, { 
      items: [
      { value: "", icon: iconURL },
      { value: "", icon: iconURL },
      { value: "", icon: iconURL }],
      itemTitleKey: 'value',
      itemValueKey: 'value',
      itemIconKey: 'icon',
      layout: { height: 25 }
    })
    .add("3_items,1_sel", SC.SegmentedView, { 
      items: "Item1 Item2 Item3".w(),
      value: "Item2",
      layout: { height: 25 }
    })
    .add("2_items,toolTip", SC.SegmentedView, { 
      items: [
      { value: "title1", toolTip: "this is title1's tip" },
      { value: "title2", toolTip: "this is title2's tip" }],
      itemTitleKey: 'value',
      itemValueKey: 'value',
      itemToolTipKey: 'toolTip',
      layout: { height: 25 }
    })
    .add("3_items,1_sel,disabled", SC.SegmentedView, { 
      items: "Item1 Item2 Item3".w(),
      value: "Item2",
      isEnabled: NO,
      layout: { height: 25 }
    })
    .add("3_items,icon,2_sel", SC.SegmentedView, { 
      items: [
      { value: "Item1", icon: iconURL },
      { value: "Item2", icon: iconURL },
      { value: "Item3", icon: iconURL }],
      itemTitleKey: 'value',
      itemValueKey: 'value',
      itemIconKey: 'icon',
      value: "Item1 Item3".w(),
      allowsEmptySelection: NO,
      layout: { height: 25 }
    })
    .add("3_items,2_sel,disabled", SC.SegmentedView, { 
       items: [
        { value: "Item1", icon: iconURL },
        { value: "Item2", icon: iconURL },
        { value: "Item3", icon: iconURL }],
        itemTitleKey: 'value',
        itemValueKey: 'value',
        itemIconKey: 'icon',
        isEnabled: NO,
        value: "Item1 Item3".w(),
        layout: { height: 25 }
    })   
    .add("3_items,1_sel,emptySel", SC.SegmentedView, { 
      items: ["Item1", "Very Long Item", "Item 3"],
        value: "Very Long Item",
        allowsEmptySelection: YES,
        layout: { height: 25 }
    })
    .add("3_items,2_sel,emptySel", SC.SegmentedView, { 
      items: ["Item1", "Very Long Item", "Item 3"],
      value: "Item1 Item3".w(),
      allowsEmptySelection: YES,
      layout: { height: 25 }
    })
    .add("3_items,1_sel,multipleSel", SC.SegmentedView, { 
      items: "Item1 Item2 Item3".w(),
      value: "Item2",
      allowsMultipleSelection: YES,
      layout: { height: 25 }
    })
    .add("3_items,2_sel,multipleSel", SC.SegmentedView, { 
      items: "Item1 Item2 Item3".w(),
      value: "Item1 Item3".w(),
      allowsMultipleSelection: YES,
      layout: { height: 25 }
    })
    .add("3_items,1_sel,emptySel,multiSel", SC.SegmentedView, { 
      items: "Item1 Item2 Item3".w(),
      value: "Item2",
      allowsEmptySelection: YES,
      allowsMultipleSelection: YES,
      layout: { height: 25 }
    })
    .add("3_items,2_sel,emptySel,multiSel", SC.SegmentedView, { 
      items: "Item1 Item2 Item3".w(),
      value: "Item1 Item3".w(),
      allowsEmptySelection: YES,
      allowsMultipleSelection: YES,
      layout: { height: 25 }
    })
    .add("3_items,longstrings,nocompress", SC.SegmentedView, {
      items: [ "really long tab1","even longer and more annoying tab2", "tab3" ],
      layout: { height: 25 }
    })
    .add("3_items,longstrings,compress", SC.SegmentedView, {
      items: [ "really long tab1","even longer and more annoying tab2", "tab3" ],
      layout: { height: 25 },
      maxTitleLength: 15
    });
    
  pane.show(); // add a test to show the test pane

  // ..........................................................
  // TEST VIEWS
  // 
  module('SC.SegmentedView ui', pane.standardSetup());
  
  test("Check that all segmentedViews are visible", function() {
    ok(pane.view('3_empty').get('isVisibleInWindow'), '3_empty.isVisibleInWindow should be YES');
    ok(pane.view('3_empty,icon').get('isVisibleInWindow'), '3_empty,icon.isVisibleInWindow should be YES');
    ok(pane.view('3_items,1_sel').get('isVisibleInWindow'), '3_items,1_sel.isVisibleInWindow should be YES');
    ok(pane.view('2_items,toolTip').get('isVisibleInWindow'), '2_items,toolTip.isVisibleInWindow should be YES');
    ok(pane.view('3_items,1_sel,disabled').get('isVisibleInWindow'), '3_items,1_sel,disabled.isVisibleInWindow should be YES');
    ok(pane.view('3_items,icon,2_sel').get('isVisibleInWindow'), '3_items,icon,2_sel.isVisibleInWindow should be YES');
    ok(pane.view('3_items,2_sel,disabled').get('isVisibleInWindow'), '3_items,2_sel,disabled.isVisibleInWindow should be YES');
    ok(pane.view('3_items,1_sel,emptySel').get('isVisibleInWindow'), '3_items,1 sel,emptySel.isVisibleInWindow should be YES');
    ok(pane.view('3_items,2_sel,emptySel').get('isVisibleInWindow'), '3_items,2 sel,emptySel.isVisibleInWindow should be YES');
    ok(pane.view('3_items,1_sel,multipleSel').get('isVisibleInWindow'), '3_items,1_sel,multipleSel.isVisibleInWindow should be YES');
    ok(pane.view('3_items,2_sel,multipleSel').get('isVisibleInWindow'), '3_items,2_sel,multipleSel.isVisibleInWindow should be YES');
    ok(pane.view('3_items,1_sel,emptySel,multiSel').get('isVisibleInWindow'), '3_items,1_sel,emptySel,multiSel.isVisibleInWindow should be YES');
    ok(pane.view('3_items,2_sel,emptySel,multiSel').get('isVisibleInWindow'), '3_items,2_sel,emptySel,multiSel.isVisibleInWindow should be YES');
    ok(pane.view('3_items,longstrings,nocompress').get('isVisibleInWindow'), '3_items,longstrings,nocompress.isVisibleInWindow should be YES');
    ok(pane.view('3_items,longstrings,compress').get('isVisibleInWindow'), '3_items,longstrings,compress.isVisibleInWindow should be YES');
  });
  
  
  test("Check that all segments have the right classes set", function() {
    var viewElem=pane.view('3_empty').$();
    var segments=pane.view('3_empty').$('a');
    equals(segments.length, 3, 'precond - segmented view should have 3 segments');
    ok(viewElem.hasClass('sc-view'), '3_empty.hasClass(sc-view) should be YES');
    ok(viewElem.hasClass('sc-segmented-view'), '3_empty.hasClass(sc-segmented-view) should be YES');
    for (var i=0, ilen=segments.length; i<ilen; i++){
      var seg=segments[i];
      if(i===0){
        ok((seg.className.indexOf('sc-first-segment')>=0), 'first segment has the right classname assigned.');
      }    
      if(i==segments.length-1){
        ok((seg.className.indexOf('sc-last-segment')>=0), 'last segment has the right classname assigned.');
      }
      ok((seg.childNodes[0].className.indexOf('sc-button-inner')>=0), 'segment '+i+' should have an inner-button.');
      ok((seg.childNodes[0].childNodes[0].className.indexOf('sc-button-label')>=0), 'segment '+i+' should have a label.');
        
      if(i!==0 && i!=segments.length-1){
        ok((seg.className.indexOf('sc-middle-segment')>=0), 'middle segment has the right classname assigned.');
      }
      viewElem=pane.view('3_items,2_sel,disabled').$();
      ok(viewElem.hasClass('disabled'), '3_items,2_sel,disabled should have the disabled class set');
    }

  });
  
  
  test("Check that all segments have the right classes set", function() {
    var viewElem=pane.view('3_empty,icon').$();
    var segments=pane.view('3_empty,icon').$('a');
    equals(segments.length, 3, 'precond - segmented view should have 3 segments');
    ok(viewElem.hasClass('sc-view'), '3_empty.hasClass(sc-view) should be YES');
    ok(viewElem.hasClass('sc-segmented-view'), '3_empty.hasClass(sc-segmented-view) should be YES');
    for (var i=0, ilen=segments.length; i<ilen; i++){
      var seg=segments[i];
      if(i===0){
        ok((seg.className.indexOf('sc-first-segment')>=0), 'first segment has the right classname assigned.');
      }    
      if(i==segments.length-1){
        ok((seg.className.indexOf('sc-last-segment')>=0), 'last segment has the right classname assigned.');
      }
      ok((seg.childNodes[0].className.indexOf('sc-button-inner')>=0), 'segment '+i+' should have an inner-button.');
      ok((seg.childNodes[0].childNodes[0].className.indexOf('sc-button-label')>=0), 'segment '+i+' should have a label.');
      ok((seg.childNodes[0].childNodes[0].childNodes[0].src.length>0), 'segment '+i+' should have an icon.');
        
      if(i!==0 && i!=segments.length-1){
        ok((seg.className.indexOf('sc-middle-segment')>=0), 'middle segment has the right classname assigned.');
      }
      viewElem=pane.view('3_items,2_sel,disabled').$();
      ok(viewElem.hasClass('disabled'), '3_items,2_sel,disabled should have the disabled class set');
    }

  });
  
  
  test("Check that the selected segments have the right classes assigned.", function() {
    var segments=pane.view('3_empty').$('a');
    equals(segments.length, 3, 'precond - segmented view should have 3 segments');
    for (var i=0, ilen=segments.length; i<ilen; i++){
      var seg=segments[i];
      ok((seg.className.indexOf('sel')==-1), 'this element should not be selected.');
    }

  });
  
  
  test("Check that two items are selected.", function() {
    var segments=pane.view('3_items,icon,2_sel').$('a');
    var count=0;
    equals(segments.length, 3, 'precond - segmented view should have 3 segments');
    for (var i=0, ilen=segments.length; i<ilen; i++){
      var seg=segments[i];
      if(seg.className.indexOf('sel')!=-1){
        count++;
      }
    }
    equals(count, 2, '3_items,2_sel,disabled should have two segments selected.');

  });
  
  
  test("2_items,toolTip has toolTips assigned.", function() {
    var segments=pane.view('2_items,toolTip').$('a');
    equals(segments[0].title,"this is title1's tip", 'first segment has expected tool tip assigned.');
    equals(segments[1].title,"this is title2's tip", 'second segment has expected tool tip assigned.');
  });


  test("3_items,1_sel has title as toolTips assigned.", function() {
    var segments=pane.view('3_items,1_sel').$('a');
    equals(segments[0].title, 'Item1', 'first segment has title as tool tip assigned.');
  });

  test("3_items,longstrings,nocompress and 3_items,longstrings,compress react correctly", function() {
    var segments=pane.view('3_items,longstrings,nocompress').$('a');
    equals(segments[0].childNodes[0].childNodes[0].childNodes[0].data,"Really Long Tab1", 'first segment has expected text.');
    equals(segments[1].childNodes[0].childNodes[0].childNodes[0].data,"Even Longer And More Annoying Tab2", 'second segment has expected text.');
    equals(segments[2].childNodes[0].childNodes[0].childNodes[0].data,"Tab3", 'third segment has expected text.');

    segments=pane.view('3_items,longstrings,compress').$('a');
    equals(segments[0].childNodes[0].childNodes[0].childNodes[0].data,"Really Long Tab1", 'first segment (right on the edge, 16 char of max 15) has expected text intact');
    equals(segments[1].childNodes[0].childNodes[0].childNodes[0].data,"Even Longer And...", 'second segment has expected truncated text.');
    equals(segments[1].title,"Even Longer And More Annoying Tab2", 'second segment has expected full text as title.');
    equals(segments[2].childNodes[0].childNodes[0].childNodes[0].data,"Tab3", 'third segment has expected indact text.');
  });

})();
