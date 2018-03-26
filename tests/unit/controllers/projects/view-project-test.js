import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | projects/view-project', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:projects/view-project');
    assert.ok(controller);
  });
});
