1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

getElementById => The method of searching element with id.

getElementsByClassName => The method of searching element with class. IT gives html list collection.

querySelector => querySelector method helps to find element with tag name, class, or id. it gives only matches item.

querySelectorAll => querySelectorAll method same as querySelector. but it gives node list.

2. How do you create and insert a new element into the DOM?
firstly we find the parent element by id or querySelector. then will create child element and set it content with innerText. lastly parentElement.appendChild(childElement). 

What is Event Bubbling? And how does it work?
Event bubbling is the default JavaScript behavior where an event triggered on a child element propagates upward through its ancestor elements in the DOM tree—from the innermost target up to the document object. It works by first firing the event on the target element, then its parent, then grandparent, and so on.

4. What is Event Delegation in JavaScript? Why is it useful?
event Delegation is a tricks, user add event in parent div. but it work for children.
it is useful for Memory Efficiency, Works for Future Elements, Cleaner Code.

5.What is the difference between preventDefault() and stopPropagation() methods?
preventDefault() stops the browsers default behavior. stopPropagation() Stop the event from traveling up the DOM. 