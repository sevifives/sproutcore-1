/**
 * Nested Records and the Data Store(SC.Record) Unit Test
 *
 * @author Evin Grano
 */

// ..........................................................
// Basic Set up needs to move to the setup and teardown
// 
var NestedRecord, store, storeKeys; 

var initModels = function(){
  NestedRecord.Directory = SC.Record.extend({
    /** Child Record Namespace */
    nestedRecordNamespace: NestedRecord,
    primaryKey: 'id',
    name: SC.Record.attr(String),
    contents: SC.Record.toMany('SC.Record', { nested: true })
  });
  
  NestedRecord.File = SC.Record.extend({
    primaryKey: 'id',
    name: SC.Record.attr(String)
  });
  
};

// ..........................................................
// Basic SC.Record Stuff
// 
module("Data Store Tests for Nested Records", {

  setup: function() {
    NestedRecord = SC.Object.create({
      store: SC.Store.create()
    });
    store = NestedRecord.store;
    initModels();
    SC.RunLoop.begin();
    storeKeys = store.loadRecords([NestedRecord.Directory, NestedRecord.File], [
      {
        type: 'Directory',
        name: 'Dir 1',
        id: 1,
        contents: [
          {
            type: 'Directory',
            name: 'Dir 2',
            id: 2,
            contents: [
              {
                type: 'File',
                id: 3,
                name: 'File 1'
              },
              {
                type: 'File',
                id: 4,
                name: 'File 2'
              } 
            ]
          }
        ]
      },
      {
        type: 'File',
        id: 5,
        name: 'File 3'
      }
    ]);
    SC.RunLoop.end();
  },

  teardown: function() {
    delete NestedRecord.Directory;
    delete NestedRecord.File;
    NestedRecord = null;
    store = null;
  }
});

test("Proper Initialization",function() {
  var first, second;
  equals(storeKeys.get('length'), 2, "number of primary store keys should be 2");
  
  // First
  first = store.materializeRecord(storeKeys[0]);
  ok(SC.kindOf(first, SC.Record), "first record is a kind of a SC.Record Object");
  ok(SC.instanceOf(first, NestedRecord.Directory), "first record is a instance of a NestedRecord.Directory Object");
  
  // Second
  second = store.materializeRecord(storeKeys[1]);
  ok(SC.kindOf(second, SC.Record), "second record is a kind of a SC.Record Object");
  ok(SC.instanceOf(second, NestedRecord.File), "second record is a instance of a NestedRecord.File Object");
});

test("Proper Status",function() {
  var first, second;
  
  // First
  first = store.materializeRecord(storeKeys[0]);
  equals(first.get('status'), SC.Record.READY_CLEAN, 'first record has a READY_CLEAN State');
  
  // Second
  second = store.materializeRecord(storeKeys[1]);
  equals(second.get('status'), SC.Record.READY_CLEAN, 'second record has a READY_CLEAN State');
});

test("Can Push onto child array",function() {
  var first, contents;
  
  // First
  first = store.materializeRecord(storeKeys[0]);
  first = first.get('contents').objectAt(0);
  contents = first.get('contents');
  equals(contents.get('length'), 2, "should have two items");
  contents.forEach(function(f){
    ok(SC.instanceOf(f, NestedRecord.File), "should be a NestedRecord.File");
    ok(f.get('name'), "should have a name property");
  });
  
  contents.pushObject({type: 'File', name: 'File 4', id: 12});
  
  equals(contents.get('length'), 3, "should have three items");
  contents.forEach(function(f){
    ok(SC.instanceOf(f, NestedRecord.File), "should be a NestedRecord.File");
    ok(f.get('name'), "should have a name property");
    equals(f.get('status'), SC.Record.READY_DIRTY, 'second record has a READY_CLEAN State');
    
  });

});

test("Function: nestedStoreKeyForPath()", function() {
  var parentDir = store.find(NestedRecord.Directory, 1);
  var parentKey = parentDir.get('storeKey');
  var childDir = parentDir.get('contents').objectAt(0);
  var childDirKey = childDir.get('storeKey');

  equals(store.nestedStoreKeyForPath(parentKey, 'contents.0'), childDirKey,
    'Should return correct store key for child directory (one level deep)');

  var childFile = childDir.get('contents').objectAt(0);
  var childFileKey = childFile.get('storeKey');

  equals(store.nestedStoreKeyForPath(childDirKey, 'contents.0'), childFileKey,
    'Should return correct store key for child file (two levels deep)');
});

test("Use in Nested Store", function(){
  var nstore, dir, c, file,
      pk, id, nFile;
  
  // First, find the first file
  dir = store.find(NestedRecord.Directory, 1);
  ok(dir, "Directory id:1 exists"); 
  equals(dir.get('name'), 'Dir 1', "Directory id:1 has a name of 'Dir 1'");
  c = dir.get('contents');
  ok(c, "Content of Directory id:1 exists");
  dir = c.objectAt(0);
  ok(dir, "Directory id:2 exists"); 
  equals(dir.get('name'), 'Dir 2', "Directory id:2 has a name of 'Dir 2'");
  c = dir.get('contents');
  ok(c, "Content of Directory id:2 exists");
  file = c.objectAt(0);
  ok(file, "File id:1 exists"); 
  equals(file.get('name'), 'File 1', "File id:1 has a name of 'File 1'");
  
  // Second, create nested store
  // nstore = store.chain({ 'lockOnRead': NO });
  nstore = store.chain();
  SC.RunLoop.begin();
  pk = file.get('primaryKey');
  id = file.get(pk);
  nFile = nstore.find(NestedRecord.File, id);
  SC.RunLoop.end();
  ok(nFile, "Nested > File id:1 exists"); 
  equals(nFile.get('name'), 'File 1', "Nested > File id:1 has a name of 'File 1'");
  
  // Third, change the name of the nested store and see what happens
  nFile.set('name', 'Change Name');
  equals(nFile.get('name'), 'Change Name', "Nested > File id:1 has changed the name to 'Changed Name'");
  equals(file.get('name'), 'File 1', "Base > File id:1 still has the name of 'File 1'");
  
  // Forth, commit the changes
  // nstore.commitChanges(YES);
  nstore.commitChanges();
  nstore.destroy();
  nstore = null;
  equals(file.get('name'), 'Change Name', "Base > File id:1 has changed to name of 'Changed Name'");
});
