const {LinkedList, printList, display} = require('../linked-list');

const testList = new LinkedList;

testList.insert(0, 'zero')
testList.insert(1, 'one')

display(testList)