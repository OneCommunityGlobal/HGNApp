import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({

    isFormSubmitted: "",
    fromDate: Date.now(),
    toDate: Date.now(),

    isEditable: computed('loggedinUser', 'forUserId', function () {

        let loggedinUser = this.get("userId");
        let forUserId = this.get('model.forUserId');
        let userrrole = this.get("userrole");
        return (loggedinUser === forUserId || userrrole === "Administrator");

    }),
    datesarray: computed('fromdate', 'todate', function () {
        alert("computing");

        let fromdate = this.get('fromdate');
        let todate = this.get('todate');
        alert(fromdate);
        alert(todate);
        let obj = {
            "fromdate": fromdate,
            "todate": todate
        };
        return obj
    }),

    validateForm() {


        let form = $("#frmallTimeEntries").get(0);
        let ffromdate = $("#fromdate").get(0);
        let ftodate = $("#todate").get(0);

        let fromdate = Date.parse(ffromdate.value);
        let todate = Date.parse(ftodate.value);

        if (fromdate > todate) {
            ffromdate.setCustomValidity("From Date should be before To Date");
            ftodate.setCustomValidity("From Date should be before To Date");
            alert("From Date should ne before To Date");
        }
        else {
            ffromdate.setCustomValidity("");
            ftodate.setCustomValidity("");
        }

        return form.checkValidity();
    },

    actions: {
        getDataForPeriod() {

            this.set("isFormSubmitted", "submitted");

            if (this.get('validateForm')()) {

                this.set("showData", true)
            }
            else {
                alert("Please fix form errors");
            }



        }
    }
});
