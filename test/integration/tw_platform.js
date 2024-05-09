const {test} = require('tap');
const VM = require('../../src/virtual-machine');
const platform = require('../../src/engine/tw-platform');

test('the internal object', t => {
    // the idea with this test is to make it harder for forks to screw up modifying the file
    t.type(platform.name, 'string');
    t.type(platform.url, 'string');
    t.end();
});

test('vm property', t => {
    const vm = new VM();
    t.same(vm.runtime.platform, platform, 'copy of tw-platform.js');
    t.not(vm.runtime.platform, platform, 'not the same object as tw-platform.js');
    t.end();
});

test('sanitize', t => {
    const vm = new VM();
    vm.runtime.platform.name += ' - test';
    const json = JSON.parse(vm.toJSON());
    t.same(json.meta.platform, vm.runtime.platform, 'copy of runtime.platform');
    t.not(json.meta.platform, vm.runtime.platform, 'not the same object as runtime.platform');
    t.end();
});
