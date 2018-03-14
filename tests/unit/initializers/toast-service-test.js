
import { initialize } from 'hgnapp/initializers/toast-service';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';
import { run } from '@ember/runloop';
import Application from '@ember/application';

module('Unit | Initializer | toast service', {
  beforeEach() {
    run(() => {
      this.application = Application.create();
      this.application.deferReadiness();
    });
  },
  afterEach() {
    destroyApp(this.application);
  }
});

// Replace this with your real tests.
test('it works', function (assert) {
  initialize(this.application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
