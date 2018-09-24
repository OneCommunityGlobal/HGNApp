import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | forcepassword', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:forcepassword');
    assert.ok(route);
  });
});
