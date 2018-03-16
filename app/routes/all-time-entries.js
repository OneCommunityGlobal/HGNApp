import Route from '@ember/routing/route';

export default Route.extend({
    model(params) {
        let forUserId = params.user_id;

        return { "forUserId": forUserId }
    }
});
