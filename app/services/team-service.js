import Service from '@ember/service';
import { inject} from '@ember/service';

export default Service.extend({
    dataService: inject("datastore-service"),

    getAllTeams() {
        let relativePath = "/team";
        let data = null;
        let method = "get";

        let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
        return request;

    },
    postTeam(team) {
        let relativePath = "/team/";
        let data = team;
        let method = "post";
        let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);

        return request;

    },
    getTeamById(teamId) {
        let relativePath = "/team/" + teamId;
        let data = "";
        let method = "get";
        let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);

        return request;


    },
    deleteTeam(teamId) {
        let relativePath = "/team/" + teamId;
        let data = null;
        let method = "delete";

        let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
        return request;

    },
    editTeamData(team, teamId) {
        let relativePath = "/team/" + teamId;
        let data = team;
        let method = "put";

        let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
        return request;
    },
    getTeamMembers(teamId) {
        let relativePath = "/team/" + teamId + "/users";
        let data = null;
        let method = "get";

        let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
        return request;
    },

    manageTeamMembers(teamId, users) {
        let relativePath = "/team/" + teamId + "/users";
        let data = users;
        let method = "post";

        let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
        return request;

    }
});
