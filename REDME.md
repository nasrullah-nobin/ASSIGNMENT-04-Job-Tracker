## 1.Deference Between DOM Selector
 getElementById: gets a single element by it's Id , getElementsByClassName: gets all  element with the same class (return HTML Collection), querySelector: gets a first matching element, querySelectorAll: get every matching element form DOM using css selector (NodeList)


## 2.How to Create or insert a new Element?
 use document.createElement('element') to create a new Element, and append() or appendChild() to inset it ;


## 3.What is event bubbling?
 Event Bubbling is a process , where an event starts from target elements it's propagate upward to it's parent element;

## 4.What Is Event Delegation
 Event Delegation is a technique , where we attach event listener to parent element to controls childElement using event bubbling ;

## 5. Deference Between preventDefault and stopPropagation
 preventDefault()  the default browser behavior (like from submission or link navigation) , and stopPropagation() stops event from propagating to parent or child elements;
