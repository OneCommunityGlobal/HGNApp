import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('userprofile-inputboxes', 'Integration | Component | userprofile inputboxes', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{userprofile-inputboxes}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#userprofile-inputboxes}}
      template block text
    {{/userprofile-inputboxes}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
