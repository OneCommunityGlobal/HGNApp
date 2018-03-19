import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | updatepassword', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:updatepassword');
    assert.ok(route);
  });
});
