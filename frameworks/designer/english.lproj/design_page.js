// ==========================================================================
// Project:   SC - designPage
// Copyright: ©2009 Mike Ball
// ==========================================================================
/*globals SC */
require('views/designer_drop_target');
require('views/page_item_view');
SC.designPage = SC.Page.create({
  // ..........................................................
  // Views used inside iframe...
  // 
  designMainPane: SC.MainPane.design({
    classNames: ['workspace'],
    childViews: 'container viewList'.w(),
    
    container: SC.DesignerDropTarget.design({
      layout: {top: 20, left: 20, right: 20, bottom: 83},
      classNames: ['design'],
      contentViewBinding: SC.Binding.transform(function(value, binding){
        return value && value.kindOf && value.kindOf(SC.View) ? value : null;
      }).from('SC.designController.view')
    }),
    
    viewList: SC.ScrollView.design({
      layout: {left:0, right: 0, bottom: 0, height: 63},
      classNames: ['dock'],
      hasBorder: NO,
      hasVerticalScroller: NO,
      contentView: SC.GridView.design({
        exampleView: SC.pageItemView,
        rowHeight: 63,
        columnWidth: 100,
        hasContentIcon: YES,
        //contentBinding: 'SC.designsController',
        delegate: SC.designsController,
        selectionBinding: 'SC.designsController.selection',
        contentValueKey: 'name',
        isDropTarget: YES,
        canEditContent: YES,
        canReorderContent: YES,
        canDeleteContent: YES,
        actOnSelect: YES,
        targetIsInIFrame: YES,
        target: 'SC.designController',
        action: 'viewSelected'
      })
    })
  })
});