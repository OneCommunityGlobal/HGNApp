import Route from '@ember/routing/route';

export default Route.extend({
    model(params) {
        let userId = params.forcepassword_id;

        return { "userId": userId }
    }
});
