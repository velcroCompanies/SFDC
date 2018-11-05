( {
    doInit: function( cmp, event, helper ) {
        helper.doGetListDetails( cmp, event, helper );
    },
    onSearch: function( cmp, event, helper ) {
        cmp.set( 'v.searchFilter', cmp.find( 'search' ).get( 'v.value' ) );
        cmp.set( 'v.isLoading', true );
        helper.doGetListMembers( cmp, event, helper );
    },
    onClearSearch: function( cmp, event, helper ) {
        cmp.set( 'v.searchFilter', cmp.find( 'search' ).get( 'v.value' ) );
        if( !cmp.find( 'search' ).get( 'v.value' )) {
            cmp.set( 'v.isLoading', true );
            helper.doGetListMembers( cmp, event, helper );
        }
    },
    onRefreshLists: function( cmp, event, helper ) {
        cmp.set( 'v.progress', 0 );
        helper.doRefreshLists( cmp, event, helper );
    },
    onSelectMember: function( cmp, event, helper ) {
        helper.doSelectMember( cmp, event, helper, event.target.id );
    },
    renderPage: function( cmp, event, helper ) {
        helper.renderPage( cmp );
    },
    onListMenu: function( cmp, event, helper ) {

        var selectedMenuItemValue = event.getParam( "value" );

        var currentList = cmp.get( "v.currentList" );

        var Member = currentList[ selectedMenuItemValue.split( ":" )[ 1 ] ];
        var memberId = Member.id;

        if ( selectedMenuItemValue.split( ":" )[ 0 ] === 'viewItem' ) {

            helper.doSelectMember( cmp, event, helper, memberId );
        }
    },
    onBack: function( cmp, event, helper ) {
        helper.doNavigateBack( cmp, event, helper );
    },
} )