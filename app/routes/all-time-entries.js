import Route from '@ember/routing/route';
import UnAuthenticatedRouteMixin from '../mixins/un-authenticated-route-mixin';

export default Route.extend(UnAuthenticatedRouteMixin, {
    model(params) {
        let forUserId = params.user_id;

        return { "forUserId": forUserId }
    }
});
