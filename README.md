# About

Dnd4sortable is a [jQuery UI](http://jqueryui.com/) widget designed to work together with the [sortable](http://jqueryui.com/demos/sortable/) widget. The dnd4sortable widget simulates element moving while the user drags an external element over a sortable list. External elements include:

* files
* bookmarks
* parts of web pages.

This is different from what can be done using the draggable widget. The draggable widget allows the user to add local DOM nodes to the sortable widget. Using the dnd4sortable widget you can implement fast and simple file uploaders or bookmark imports. Just look how easy it can be:

![dnd4sortable preview](http://img6.imageshack.us/img6/1807/dnd4sortable.png)

#Usage

Here is a sample HTML structure:

    <ul id="sortable">
        <li>this</li>
        <li>list</li>
        <li>is</li>
        <li>sortable</li>
    </ul>

And the JavaScript required to enable the sortable and the dnd4sortable widgets:

    // sortable
    $('#sortable').sortable();

    // dnd4sortable
    $('#sortable').dnd4sortable();

This is the simplest way to do it. More can be achieved using the options parameter.

#Options

The widgets behaviour can be customized using the options parameter. Sample usage looks like this:

    $('#sortable').dnd4sortable({
        dummyTag: 'div',
        dummyText: '(new)'
    });

Available options:

* dummy - Object used to create a new sortable element. Attributes described below:
    * tag - Defines the tag name of the node that will be added when the dragging will start, the dummy tag should be equal to all tags available inside the sortable component. Default value is **li**.
    * text - Defines the text that will be inserted into the dummy tag when it is created. The dummy text will be visible at least till the file is dropped on the sortable component. If the text is set to false it won't be applied on the dummy node. Default value is **...**.
    * html - Defines the HTML contents that will be inserted into the dummy tag when it is created. The dummy HTML will be visible at least till the file is dropped on the sortable component. If the HTML is set to false it won't be applied on the dummy node. Default value is **false**.
    * attr - A map of attribute-value pairs to set as attributes of the dummy node. Default value is **an empty object**.
    * css - A map of attribute-value pairs to set as style properties of the dummy node. Default value is **an empty object**.
* drop - Callback function executed when the file is dropped on the sortable component.
* dragIn - Callback function executed when the dragged file enters the area of the sortable component.
* dragOut - Callback function executed when the dragged file leaves the area of the sortable component.

All callback functions take one parameter - the event object. Each callback is executed with the widget available as the *this* variable.  All default callbacks are **empty functions**.

The dnd4sortable widget has additional methods:

* dummy - This function returns the last dummy tag created by the widget. The dummy will represent the newly added node when the file is dropped. Use the object returned by the dummy to alter the newly added element.
* revert - This functions performs a rollback operation on the sortable component. It can be used to remove the last dummy node (i.e. when the file upload fails).

Those methods can be called by typing:

    // globally:
    $('selector-to-the-sortable-component').dnd4sortable('dummy');

    // in the drop callback:
    this.revert();

# Changelog

Version 0.6:

* New options for the dummy node added.

Version 0.5:

* Callbacks dragIn and dragOut added.

Version 0.4:

* First public release.