class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }
    insert(nthPosition, value) {
        if (nthPosition < 0 || nthPosition > this.length) {
            throw new Error('Index error');
        }

        const newNode = {
            value
        };

        if (nthPosition == 0) {
            newNode.next = this.head;
            this.head = newNode;
        }
        else {
            // Find the node which we want to insert after
            const node = this._findNthElement(nthPosition - 1);
            newNode.next = node.next; 
            node.next = newNode;
        }

        this.length++;
    }

    //this is another way of finding things when you don't have the nth item which in most cases you don't
    _findItem(item) {
        let node = this.head;
        while(node && node.value != item){
            node = node.next;
        }
        return node;
    }
    //----------------------------
   _findNthElement(nthElement) {
        let node = this.head;
        for (let i=0; i<nthElement; i++) {
            node = node.next;
        }
        return node;
    }
    //----------------------------
    get(nthElement) {
        if (nthElement < 0 || nthElement >= this.length) {
            throw new Error('Index error');
        }

        return this._findNthElement(nthElement).value;
    }

    remove(nthElement) {
        if (nthElement < 0 || nthElement >= this.length) {
            throw new Error('Number of item is incorrect error');
        }

        if (nthElement == 0) {
            this.head = this.head.next;
        }
        else {
            // Find the node before the one we want to remove
            const node = this._findNthElement(nthElement - 1);
            node.next = node.next.next;
        }

        this.length--;
    }
    
}
//************************************************

//You can send the list to this function but if you send the head, that will be
//good enough since you can follow the next point of head to see what the list is
function display(lst){
    let currNode = lst.head;
    if(!currNode){
        return 'List is Empty';
    }
    while (!(currNode.next == null)) {
        console.log(currNode.value);
        currNode = currNode.next;
    }
    console.log(currNode.value);
}

function findPrevious(lst, item) {
    let currNode = lst.head;
    while (!(currNode.next == null) && (currNode.next.value != item)) {
        currNode = currNode.next;
    }
    return currNode;
}
//size of the list
function size(lst){
    let counter = 0;
    let currNode = lst.head;
    if(!currNode){
        return counter;
    }
    else
        counter++;
    while (!(currNode.next == null)) {
        counter++;
        currNode = currNode.next;
    }
    return counter;
}



function printList(head) {
        console.log(`I am going to print the list ->>>>`);
        let current = head;
        while (current != null) {
            console.log(current.value + " -> ");
            current = current.next;
        }
        console.log();
}

let questionList = new LinkedList();



//BACKEND
    //get questions
    //put them in user document
    //get questions from user doc into linked lsit

//QUESTIONS----------------------

//when get request is made, should insert each element into list in order of position
    //adds currentQuestion and correctAnswer: null keys
    //if position 1, make current question = true. everything else is false. current question true means this is what will be displayed

//if question answered correct (correctAnswer:true)
    // make the position shift to the last node + 1 and double nValue (maybe display as multiplier on front end?)

//if question answered incorrect (correctAnswer: false)
    // make the position shift + 2 and double nValue (maybe display as multiplier on front end?), move others behind it position + 1

//.next method will mark the next position as currentQuestion: true and display