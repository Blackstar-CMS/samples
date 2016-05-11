var assert = require('assert');
var Blackstar = require('../blackstar');
var fetch = require('node-fetch');
global.fetch = fetch;

describe('javascript client', function() {
    
  describe('validating request type', function () {
      
      describe('valid requests', ()=> {
        it('should detect an ids request', ()=> {
            assert.equal('ids', Blackstar.Client.prototype.requestKind({ ids:[1,2,3] }));
        });
        it('should detect an names request', ()=> {
            assert.equal('names', Blackstar.Client.prototype.requestKind({ names:['foo','bar'] }));
        });
        it('should detect an tags request', ()=> {
            assert.equal('tags', Blackstar.Client.prototype.requestKind({ tags:['first','snd'] }));
        }); 
      });
      
      describe('invalid requests', ()=> {
          it('should fail for ids and tags', ()=> {
              assert.throws(()=>{
                  Blackstar.Client.prototype.requestKind({
                      ids: [1,2], 
                      tags:['first','snd'] 
                  });
              });
          });
          it('should fail for ids and names', ()=> {
              assert.throws(()=>{
                  Blackstar.Client.prototype.requestKind({
                      ids: [1,2], 
                      names:['first','snd'] 
                  });
              });
          });
          it('should fail for none', ()=> {
              assert.throws(()=>{
                  Blackstar.Client.prototype.requestKind({});
              });
          });
      });
  });
  
  describe('searching the results', ()=> {
      var results = [];
      before(()=> {
        results = Blackstar.Client.prototype.enrichCollectionWithByMethods(JSON.parse('[{"id":6,"tags":["index-page"],"name":"index-heading","value":"This is the page heading"},{"id":7,"tags":["index-page"],"name":"index-title","value":"This is a title"},{"id":8,"tags":["index-page"],"name":"index-content","value":"<p>The <b>Seebeck effect</b> is the conversion of "},{"id":9,"tags":["index-page"],"name":"index-footer","value":"This is a footer"}]'));       
      });
      
      describe('by id',()=> {
          it('should find chunk that is present', ()=>{
            var chunk = results.byId(8);
            assert.ok(chunk);
            assert.equal('index-content', chunk.name);
            assert.equal(8, chunk.id);
          });
          it('should not find chunk that is missing', ()=>{
            var chunk = results.byId(99);
            assert.ok(!chunk);
          });
      });
      describe('by name',()=> {
          it('should find chunk that is present', ()=>{
            var chunk = results.byName('index-heading');
            assert.ok(chunk);
            assert.equal('index-heading', chunk.name);
          });
          it('should not find chunk that is missing', ()=>{
            var chunk = results.byName('index-aweriu');
            assert.ok(!chunk);
          });
      });
      describe('by tags',()=> {
          it('should find chunk that is present', ()=>{
            var chunk = results.byTag('index-page');
            assert.ok(chunk);
            assert.ok(chunk.length > 2);
          });
          it('should not find chunk that is missing', ()=>{
            var chunk = results.byTag('not a real tag');
            assert.ok(chunk);
            assert.equal(0, chunk.length);
          });
      });
      
  });
  
  describe('integration', function () {
      var blackstar = null;
      before(function () {
          blackstar = new Blackstar.Client('http://localhost:2999');
      });
      describe('fetching content', function () {
          it('should return content', function () {
            return blackstar.getAll().then(chunks => {
                assert.ok(chunks);
                assert.ok(chunks.length > 0);
            }).catch(err => { console.error(err); assert(false, 'Failed calling the API. This test expects the blackstar server to be running on port 2999.');});
          });
          it('should be filterable by name', function () {
            return blackstar.getAll().then(chunks => {
                var chunk = chunks.byName(chunks[0].name);
                assert.ok(chunk);
            }).catch(err => { console.error(err); assert(false, 'Failed calling the API. This test expects the blackstar server to be running on port 2999.');});;
          });
          
      });
      
  });
});
