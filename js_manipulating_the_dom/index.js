// Selection

// document.querySelector
// use document.querySelector by giving a CSS as
// a string. It returns the Node object that represents
// the HTML tag for that CSS selector. It
// only returns the first one even if the
// CSS selector matches multiple nodes.

let toxicTim = document.querySelector('#toxic-tim');

// Only the first node that matches is returned.
let firstDiv =  document.querySelector('div');


// document.querySelectorAll
// This method works nearly the same way as document.querySelectorAll
// except that it returns ALL NODES that match
// the CSS query.

let allH1s = document.querySelectorAll('h1');
let allNodes = document.querySelectorAll('*');
let allDoggoFighters = document.querySelectorAll('.doggo.fighter');


// Exercise: Picking Doggos
// 1. Select Moneybags Michael & Larry The Lion
document.querySelectorAll('#larry-the-lion, #moneybags-michael')

// 2. Select all Team Teal Doggos but the first
document.querySelectorAll('.team.teal .doggo:not(:first-child)')

// 3. Select the second doggo in every team
document.querySelectorAll('.team .doggo:nth-child(2)')


// Selecting Surrounding Nodes

// <node>.nextElementSibling & <node>.previousElementSibling
// Use these to get the next sibling or the previous sibling node.
// For example:

let bumbleBertha = document.querySelector('#bumble-bertha');
// let toxicTim = bumbleBertha.previousElementSibling;
let ninaTheNinja = bumbleBertha.nextElementSibling;


// <node>.parentElement
// Returns the parent node of <node>
let teamSalmon = toxicTim.parentElement.parentElement;

// <node>.children
// Returns all child nodes of a <node> in a Array-like object.
teamSalmon.children // returns H1.title and the div.roster nodes

// <node>.matches()
// Takes a CSS selector string as argument and returns true
// if the <node> matches that selector otherwise returns false.
toxicTim.matches('#toxic-tim') // true
toxicTim.matches('#bumble-bertha') // false
toxicTim.matches('div') // true
toxicTim.matches('.doggo') // true

// <node>.closest()
// Takes a CSS selector searches ancestors of a node until finds
// the first one that matches the CSS selector.

toxicTim.closest('.team') // returns div.team.salmon
toxicTim.closest('.teams') // returns div.teams
toxicTim.closest('.tea') // returns null

// Manipulation

// Modifying in-line stylesheet

// Nodes have a style property that holds an object which
// contains all inline styles. When a setting through this object,
// you must name the property with camelCase.

toxicTim.style.border = 'medium solid lime';
toxicTim.style.borderRadius = '5px';

// Sometimes its necessary to read the actual computed value of a
// style property on a node. To do this, use the global
// function `getCopmutedStyle`. This will return a CSSStyleDeclaration
// object which contains all CSS properties and their values for
// that node.

getComputedStyle(toxicTim);
getComputedStyle(toxicTim).backgroundColor;
getComputedStyle(toxicTim).fontFamily;

// Changing and reading a node's content.

// <node>.innerHTML
// This property contains all the HTML inside of a node.

toxicTim.innerHTML; // returns '<h1>Toxic Tim</h1>'
// 👇 replaces the contents of toxicTim with the
// string on the right of =
// toxicTim.innerHTML = '<h1>Imposter Doggo</h1>';

// <node>.outerHTML
// The outerHTML property is similar to innerHTML, but includes
// the node itself as well. Assigning to it would also replace
// node and not just its contents.

// Reading and Writing HTML Attributes

// <node>.getAttribute(<attribute-name>)
// This methods returns the value of an html attribute by its
// name as string on a <node>.

toxicTim.getAttribute('id') // "toxic-tim"
toxicTim.getAttribute('class') // "doggo fighter"
toxicTim.getAttribute('style') // "border: medium solid lime; border-radius: 5px;"

// <node>.setAttribute(<attribute-name>, <attribute-value>)
// Use this method to add new html attributes or replace
// existing attributes.

toxicTim.setAttribute('data-confirm', 'Are you sure?')
toxicTim.setAttribute('id', 'larry-the-lion')

// <node>.hasAttribute(<attribute-name>)
// Returns true if an attribute of <attribute-name> exists.
// False, otherwise.

// <node>.removeAttribute(<attribute-name>)
// Removes an attribute of name <attribute-name> from a
// <node>

// What about classes?

// <node>.classList
// To work with classes, use the methods of classList instead of
// of using getAttribute or setAttribute.

// <node>.classList.add(<class-name>, <class-name>, ...)
// To add classes use this method. You can add as many classes
// as you want by adding as seperate arguments.
toxicTim.classList.add('worker');
toxicTim.classList.add('cancer', 'shocked');

// <node>.classList.remove(<class-name>, <class-name>, ...)
toxicTim.classList.remove('shocked');
toxicTim.classList.remove('cancer', 'fighter');

// <node>.classList.toggle(<class-name>)
toxicTim.classList.toggle('shocked');

// <node>.classList.contains(<class-name>)
toxicTim.classList.contains('doggo'); //returns true
toxicTim.classList.contains('rich'); //returns false

// Exercise: Vandalise the Arena

/*
// 1. Change the color of all teams to fuchsia
// document.querySelectorAll('.team').forEach(node => {
// ...
// })

for (let node of document.querySelectorAll('.team')) {
  node.style.backgroundColor = 'fuchsia';
}

// 2. Rename all doggos to Rob The Slob

document.querySelectorAll('.doggo').forEach(node => {
  node.innerHTML = '<h1>Rob The Slob</h1>';
  // 3. Change all doggo pictures to that of a cat from the internet
  node.style.backgroundImage = `url(https://i.imgur.com/huNlwY3.jpg)`;
});

*/

// Creating Nodes

// document.createElement(<tag-name>)
// Creates an empty of tag, <tag-name>. This is not yet
// placed in the document.

const drillBitDarel = document.createElement('div');

drillBitDarel.setAttribute('id', 'drill-bit-darel');
drillBitDarel.classList.add('doggo', 'fighter');
drillBitDarel.style.backgroundImage = `url(images/drill_bit_darel.jpg)`;

const h1 = document.createElement('h1');
h1.innerHTML = 'Drill Bit Darel';

// <node>.append(<another-node>)
// Use method to add <another-node> as the last child of <node>.

// This adds the h1 node above as a child of drillBitDarel
drillBitDarel.append(h1);

// This finds the node for Team Teal's roster (the node contains
// all its doggos) and adds drillBitDarel as its last child.
document
.querySelector('.team.teal > .roster')
.append(drillBitDarel);

// <node>.prepend(<another-node>)
// Use this method add <another-node> as the first child of
// <node>.

const teamSalmonRoster = document
  .querySelector('.team.salmon > .roster');

teamSalmonRoster.prepend(drillBitDarel);

// <node>.insertBefore(<another-node>, <child-node-of-node>)

teamSalmonRoster
.insertBefore(
  drillBitDarel,
  document.querySelector('#nina-the-ninja')
);

teamSalmonRoster
.insertBefore(
  drillBitDarel,
  teamSalmonRoster.children[1]
);

// When using any method to place or move nodes, the nodes
// are not copied. They're always just moved. To create
// a copy, use the following:

// <node>.cloneNode()
// This method will duplicate a node create new node that
// has all of the same properties as <node>. By default,
// descendent nodes are not copied. To also copy all
// descendent nodes, use `<node>.cloneNode(true)` instead.

let drillBitDarelClone = drillBitDarel.cloneNode();
teamSalmonRoster.append(drillBitDarelClone);









// bump
