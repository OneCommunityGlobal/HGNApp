import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | AllTimeEntries', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:all-time-entries');
    assert.ok(route);
  });
});
