var assert = require('assert');
var Blackstar = require('../blackstar');
var fetch = require('node-fetch');
global.fetch = fetch;

describe('javascript client', function () {
    "use strict";
    describe('validating request type', function () {

        describe('valid requests', () => {
            it('should detect an ids request', () => {
                assert.equal('ids', Blackstar.Client.prototype.requestKind({ ids: [1, 2, 3] }));
            });
            it('should detect an names request', () => {
                assert.equal('names', Blackstar.Client.prototype.requestKind({ names: ['foo', 'bar'] }));
            });
            it('should detect an tags request', () => {
                assert.equal('tags', Blackstar.Client.prototype.requestKind({ tags: ['first', 'snd'] }));
            });
        });

        describe('invalid requests', () => {
            it('should fail for ids and tags', () => {
                assert.throws(() => {
                    Blackstar.Client.prototype.requestKind({
                        ids: [1, 2],
                        tags: ['first', 'snd']
                    });
                });
            });
            it('should fail for ids and names', () => {
                assert.throws(() => {
                    Blackstar.Client.prototype.requestKind({
                        ids: [1, 2],
                        names: ['first', 'snd']
                    });
                });
            });
            it('should fail for none', () => {
                assert.throws(() => {
                    Blackstar.Client.prototype.requestKind({});
                });
            });
        });
    });

    describe('searching the results', () => {
        var results = [];
        before(() => {
            results = Blackstar.Client.prototype.enrichCollectionWithByMethods(JSON.parse('[{"id":6,"tags":["index-page"],"name":"index-heading","value":"This is the page heading"},{"id":7,"tags":["index-page"],"name":"index-title","value":"This is a title"},{"id":8,"tags":["index-page"],"name":"index-content","value":"<p>The <b>Seebeck effect</b> is the conversion of "},{"id":9,"tags":["index-page"],"name":"index-footer","value":"This is a footer"}]'));
        });

        describe('by id', () => {
            it('should find chunk that is present', () => {
                var chunk = results.byId(8);
                assert.ok(chunk);
                assert.equal('index-content', chunk.name);
                assert.equal(8, chunk.id);
            });
            it('should not find chunk that is missing', () => {
                var chunk = results.byId(99);
                assert.ok(!chunk);
            });
        });
        describe('by name', () => {
            it('should find chunk that is present', () => {
                var chunk = results.byName('index-heading');
                assert.ok(chunk);
                assert.equal('index-heading', chunk.name);
            });
            it('should not find chunk that is missing', () => {
                var chunk = results.byName('index-aweriu');
                assert.ok(!chunk);
            });
        });
        describe('by tags', () => {
            it('should find chunk that is present', () => {
                var chunk = results.byTag('index-page');
                assert.ok(chunk);
                assert.ok(chunk.length > 2);
            });
            it('should not find chunk that is missing', () => {
                var chunk = results.byTag('not a real tag');
                assert.ok(chunk);
                assert.equal(0, chunk.length);
            });
        });

    });

    describe('integration', function () {
        var blackstar = null;
        before(function () {
              blackstar = new Blackstar.Client('http://demo.blackstarcms.net');
            // blackstar = new Blackstar.Client('http://localhost:2999');
        });

        describe('create, edit, delete', function () {
            let initialValue = 'Redundant content';
            var chunkId = null;

            before(function () {
                return blackstar.create({ id: 0, tags: ['foo-test-tag'], name: 'DELETE ME', value: initialValue })
                    .then(response => {
                        if (!response.ok) {
                            return response.text().then(j => { throw new Error(j); });
                        } else {
                            return response.json();
                        }
                    }).then(id => { chunkId = id; });
            });

            describe('updating an item', function () {
                var updatedValue = 'updated value';
                before(function () {
                    return blackstar.get({ ids: [chunkId] })
                        .then(chunks => {
                            var chunk = chunks[0];
                            assert.equal(initialValue, chunk.value);
                            chunk.value = updatedValue;
                            return blackstar.update(chunk);
                        });
                });
                it('should be updated', function () {
                    return blackstar.get({ ids: [chunkId] })
                        .then(chunks => {
                            var chunk = chunks[0];
                            assert.equal(updatedValue, chunk.value);
                        });
                });
            });

            describe('deleting an item', function () {
                before(function () {
                    return blackstar.get({ ids: [chunkId] })
                        .then(chunks => {
                            return blackstar.delete(chunks[0].id);
                        }).then(delResp => {
                            return delResp.text().then(t => {
                                if (!delResp.ok) throw new Error(t);
                            });
                        });
                });
                it('should be gone', function () {
                    return blackstar.get({ ids: [chunkId] })
                        .then(chunks => {
                            assert.equal(0, chunks.length);
                        });
                });
            });
        });

        describe('fetching all content', function () {
            it('should return content', function () {
                return blackstar.getAll().then(chunks => {
                    assert.ok(chunks);
                    assert.ok(chunks.length > 0);
                }).catch(err => { console.error(err); assert(false, 'Failed calling the API. This test expects the blackstar server to be running on port 2999.'); });
            });
            it('should be filterable by name', function () {
                return blackstar.getAll().then(chunks => {
                    var chunk = chunks.byName(chunks[0].name);
                    assert.ok(chunk);
                }).catch(err => { console.error(err); assert(false, 'Failed calling the API. This test expects the blackstar server to be running on port 2999.'); });;
            });
        });
        describe('fetching by id', () => {
            it('should find the correct content', () => {
                blackstar.get({ ids: [29, 30] }).then(chunks => {
                    assert.ok(chunks.byName('main-content'));
                    assert.ok(chunks.byName('smaller-heading'));
                    assert.equal(2, chunks.length);
                });
            });
        });
        describe('fetching by name', () => {
            it('should find the correct content', () => {
                blackstar.get({ names: ['main-content', 'smaller-heading'] }).then(chunks => {
                    assert.ok(chunks.byName('main-content'));
                    assert.ok(chunks.byName('smaller-heading'));
                    assert.equal(2, chunks.length);
                });
            });
        });
        describe('fetching by tag', () => {
            it('should find the correct content', () => {
                blackstar.get({ tags: ['blackstarpedia'] }).then(chunks => {
                    assert.ok(chunks.length > 3);
                });
            });
        });
    });
});
