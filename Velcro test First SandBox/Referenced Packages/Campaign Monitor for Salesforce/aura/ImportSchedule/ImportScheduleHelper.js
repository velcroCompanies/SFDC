({

    buildRunAtTimeList : function(cmp, helper) {

        // Build schedule picklist
		var runAtTimeList = [];
       	for (var i = 0; i < 24; i += 1 ) {

			var str = "" + i;
			var pad = "00";
			var ans = pad.substring(0, pad.length - str.length) + str;

            var optionTemplate = {};
            optionTemplate.class = 'optionClass';
            optionTemplate.label = ans + ':00';
            optionTemplate.value = ans + ':00';

            runAtTimeList.push(optionTemplate);
        }
        cmp.set('v.runAtTimeList', runAtTimeList);

    },

    // Set the schedule preferences
    setScheduledPreference : function(cmp, helper) {

        var scheduleRecord = cmp.get('v.importConfig.scheduledRecord');

        // Set the runAt time
        if ( scheduleRecord.runAt ) {
            var runAtTimeList = cmp.get( 'v.runAtTimeList' );
            for ( var timeList in runAtTimeList ) {
                for ( var time in scheduleRecord.runAt ) {
                    if ( scheduleRecord.runAt[ time ] === runAtTimeList[ timeList ].value ) {
                        runAtTimeList[ timeList ].selected = true
                    }
                }
            }
            cmp.set( 'v.runAtTimeList', runAtTimeList );
        }

        // Set the Scheduled Day(s) checkbox buttons
        if(scheduleRecord.scheduledDays) {
            for(var i in scheduleRecord.scheduledDays) {
                cmp.find(scheduleRecord.scheduledDays[i].toLowerCase()).getElement().checked = true;
            }
        }

        // Set the refresh type for the import
        cmp.set('v.refreshTypeUpdate', cmp.get('v.importConfig.refreshType').toUpperCase() === 'UPDATE');
        cmp.set('v.refreshTypeReplace', cmp.get('v.importConfig.refreshType').toUpperCase() !== 'UPDATE');


        cmp.find('scheduleToggleId').getElement().checked = true;
        helper.doToggleSchedule(cmp, helper);

    },

    doToggleSchedule : function(cmp, helper) {

        $A.util.toggleClass(cmp.find('scheduledDayDivId'), "slds-hide");
        $A.util.toggleClass(cmp.find('runAtTimeDivId'), "slds-hide");

        var importConfig = cmp.get('v.importConfig');

        if(cmp.find('scheduleToggleId').getElement().checked) {
            cmp.set('v.importConfig.title', 'Report Import Wizard - Schedule');
            cmp.set('v.importConfig.runType', 'Schedule');
            helper.fireWizardEvent(cmp, helper);
        } else {
            cmp.set('v.importConfig.title', 'Report Import Wizard - Run');
            importConfig.runType ='run';
            cmp.set('v.importConfig', importConfig);
            helper.fireWizardEvent(cmp, helper);
        }


    },
    checkScheduledDays : function(cmp) {
        var selectedDays = [];
        var days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        for(var i in days) {
            if(cmp.find(days[i]).getElement().checked) {
                selectedDays.push(cmp.find(days[i]).getLocalId());
            }
        }
        return selectedDays;
    },
    turnOffSpinner : function(cmp, helper) {
        $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('schedule-body-id'), "slds-hide");
    },
    fireWizardEvent : function(cmp, helper) {

        var importConfig = cmp.get('v.importConfig');
        importConfig.schedule = {};

        importConfig.refreshType = cmp.get('v.importConfig.refreshType');

        if(!importConfig.refreshType) {
            importConfig.refreshType = 'UPDATE';
        }
        importConfig.schedule.scheduledDays = helper.checkScheduledDays(cmp);
        importConfig.schedule.runAt = cmp.get('v.selectedTime');

        if(cmp.find('scheduleToggleId').getElement() && cmp.find('scheduleToggleId').getElement().checked) {
            if(helper.checkScheduledDays(cmp).length === 0 || importConfig.schedule.runAt.length == 0) {
                importConfig.runType = 'scheduleDisabled';
            } else {
                importConfig.runType = 'schedule';
            }
        } else {
            importConfig.runType = 'run';
        }
        importConfig.step = 4;
        cmp.set('v.importConfig', importConfig);

        var compEvent = cmp.getEvent("ImportWizardEvent");
        compEvent.setParams({"importConfig": cmp.get('v.importConfig') });
        compEvent.fire();
    },
})