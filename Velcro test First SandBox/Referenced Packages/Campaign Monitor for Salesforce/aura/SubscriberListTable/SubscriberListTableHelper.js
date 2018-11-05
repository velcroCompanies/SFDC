( {
    doGetLists: function( cmp, event, helper ) {

        var action = cmp.get( "c.getSubscriberLists" );
        action.setCallback( this, function( result ) {

            var records = result.getReturnValue();
            cmp.set( "v.allLists", records );
            cmp.set( "v.maxPage", Math.floor( ( records.length + 19 ) / 20 ) );


            helper.renderPage( cmp );
        } );
        $A.enqueueAction( action );
    },
    sortBy: function( cmp, field ) {
        var sortAsc = cmp.get( "v.sortAsc" ),
            sortField = cmp.get( "v.sortField" ),
            records = cmp.get( "v.allLists" );

        sortAsc = sortField !== field || !sortAsc;
        records.sort( function( a, b ) {
            var t1 = a[ field ] === b[ field ],
                t2 = ( !a[ field ] && b[ field ] ) || ( a[ field ] < b[ field ] );
            return t1 ? 0 : ( sortAsc ? -1 : 1 ) * ( t2 ? 1 : -1 );
        } );

        cmp.set( "v.sortAsc", sortAsc );
        cmp.set( "v.sortField", field );
        cmp.set( "v.allLists", records );

        this.renderPage( cmp );
    },
    doGetLicenceDetails: function( cmp, event, helper ) {
        var action = cmp.get( "c.getLicenceDetails" );
        action.setCallback( this, function( result ) {

            var records = result.getReturnValue();
            cmp.set( "v.licenceDetail", records );
        } );
        $A.enqueueAction( action );
    },
    renderPage: function( cmp ) {
        var records = cmp.get( "v.allLists" ),
            pageNumber = cmp.get( "v.pageNumber" ),
            pageRecords = records.slice( ( pageNumber - 1 ) * 20, pageNumber * 20 );
        cmp.set( "v.currentList", pageRecords );
    },

    doRefreshLists: function( cmp, event, helper ) {

        // Disable the buttons and show banner
        cmp.set( 'v.disableRefreshButton', true );
        cmp.set( 'v.showJobsBanner', true );

        var action = cmp.get( "c.refreshSubscriberLists" );

        //Set up the callback
        action.setCallback( this, function( actionResult ) {

            var state = actionResult.getState();
            if ( state === "SUCCESS" ) {
                helper.pollRefreshList( cmp, event, helper );
            } else if ( state === "ERROR" ) {

                var errors = actionResult.getError();
                if ( errors ) {
                    if ( errors[ 0 ] && errors[ 0 ].message ) {
                        console.log( "Error message: " + errors[ 0 ].message ); // eslint-disable-line
                    }
                } else {
                    console.log( "Unknown error" ); // eslint-disable-line
                }
            }
        } );
        $A.enqueueAction( action );


    },
    checkRefreshLists: function( cmp, event, helper, lastcheck ) {

        var action = cmp.get( "c.isRefreshRunning" );

        //Set up the callback
        action.setCallback( this, function( actionResult ) {

            var state = actionResult.getState();
            if ( state === "SUCCESS" ) {
                var isJobRunning = actionResult.getReturnValue();


                var timerId = cmp.get( 'v.timerId' );
                if ( !isJobRunning ) {
                    clearInterval( timerId );
                    cmp.set( 'v.timerId', null );
                }

                if ( lastcheck ) {
                    helper.doGetLists( cmp, event, helper );
                    cmp.set( 'v.disableRefreshButton', false );
                    cmp.set( 'v.showJobsBanner', false );
                } else if ( cmp.get( 'v.timerId' ) === null ) {

                    // Do one last check in case there was a break in the jobs
                    internalTimer = window.setTimeout(
                        $A.getCallback( function() {
                            helper.checkRefreshLists( cmp, event, helper, true );
                        } ), 5000
                    );
                }
            } else if ( state === "ERROR" ) {

                var errors = actionResult.getError();
                if ( errors ) {
                    if ( errors[ 0 ] && errors[ 0 ].message ) {
                        console.log( "Error message: " + errors[ 0 ].message ); // eslint-disable-line
                    }
                } else {
                    console.log( "Unknown error" ); // eslint-disable-line
                }
            }
        } );
        $A.enqueueAction( action );


    },
    pollRefreshList: function( cmp, event, helper ) {
        helper.checkRefreshLists( cmp, event, helper );

        var internalTimer = 0;

        //execute checkRefreshLists() again after 5 sec each
        internalTimer = window.setInterval(
            $A.getCallback( function() {
                helper.checkRefreshLists( cmp, event, helper );
            } ), 5000
        );
        cmp.set( 'v.timerId', internalTimer );

    }


} )