class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(str) {
        
        function InsertException(message) {
            this.message = message;
            this.name = "Исключение, при добавлении";
        }

        
        var node = { 
                value: str, 
                left: null,
                right: null 
            };
        let temp = null;
        
       
            if(this.root === null) {
                this.root = node;
            } else {
                temp = this.root;
                
                while(true) {
                    
                    if(str < temp.value) {
                        
                        if (temp.left === null){
                            temp.left = node;
                            break;
                        } else {                    
                            temp = temp.left;
                        }
                    
                    } else if(str > temp.value){
                        if (temp.right === null){
                            temp.right = node;
                            break;
                        } else {                    
                            temp = temp.right;
                        }
                    }
                    else {
                        throw new InsertException("This tree already contains '"+ str + "'" )
                    }
                }   
            }
    }

    remove(str) {
        function RemoveException(message) {
            this.message = message;
            this.name = "Исключение, при удалении";
        }
        
        let found = false;
        let temp = this.root,
        newRoot = null,
        newRootParent = null,
        head = null;
        
        while(!found && temp) {
            if (str < temp.value){
                head = temp;
                temp = temp.left;
            } else if (str > temp.value){
                head = temp;
                temp = temp.right;
            } else {
                found = true;
            }
        }
        
        if (found){
            if(temp === this.root) {
            
                if(temp.left === null && temp.right === null) {
                    this.root = null;
                }
                if(temp.left === null && temp.right !== null) {
                    this.root = temp.right;
                }
                if(temp.left !== null && temp.right === null) {
                    this.root = temp.left;
                }
                if(temp.left !== null && temp.right !== null) {
                    newRoot = this.root.left;
                    while(newRoot.right !== null) {
                        newRootParent = newRoot;
                        newRoot = newRoot.right;
                    }
                    
                    if(newRootParent !== null) {
                        temp.value = newRoot.value;
                        newRootParent.right = null;
                    } else {
                        temp.value = newRoot.value;
                        temp.left = null;
                    }
                    
                }
                
            } else {
                
                if(temp.left === null && temp.right === null) {
                    if (temp.value < head.value){
                        head.left = null;
                    } else {
                        head.right = null;
                    }
                }
                if(temp.left === null && temp.right !== null) {
                    if (temp.value < head.value){
                        head.left = temp.right;
                    } else {
                        head.right = temp.right;
                    }
                }
                if(temp.left !== null && temp.right === null) {
                    if (temp.value < head.value){
                        head.left = temp.left;
                    } else {
                        head.right = temp.left;
                    }
                }
                if(temp.left !== null && temp.right !== null) {
                    newRoot = temp.left;
                    newRootParent = temp;
                    
                    while(newRoot.right !== null){
                        newRootParent = newRoot;
                        newRoot = newRoot.right;                            
                    }
                    
                    newRootParent.right = newRoot.left;
                    newRoot.right = temp.right;
                    newRoot.left = temp.left;
                        
                    if (temp.value < newRootParent.value){
                        newRootParent.left = newRoot;
                    } else {
                        newRootParent.right = newRoot;
                    }                        
                }
                
            }
        } else {
            throw new RemoveException("This tree does not contain '"+ str + "'" );
            }
    }

    height() {
        
        var result = 1;
        var num = 1;
        
        function inOrder(node, num){
            if(node) {
                if (node.left !== null){
                    inOrder(node.left,num + 1);
                }
                
                if (node.right !== null){
                    inOrder(node.right,num + 1);
                }
                if (node.right === null && node.left === null ) {
                    if(num > result ) {
                        result = num;
                    }
                }
            } else {
                result = 0;
            }
        }
        
        inOrder(this.root,1)
        return result;
    }

    toArray() {
        
        var result = [];
        
        function inOrder(node){
            if(node) {
                if (node.left !== null){
                    inOrder(node.left);
                }            
                
                result.push(node.value);
            
                if (node.right !== null){
                    inOrder(node.right);
                }
            }
        }
        
        inOrder(this.root)
        
        return result;
    }
};