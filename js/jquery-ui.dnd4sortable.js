/**
 * Drag and drop for the jQuery UI sortable widget
 * Version: 0.6
 * https://github.com/elwiz/dnd4sortable
 * 
 * Copyright 2011, Tom Wojcik
 * Licensed under the MIT license: http://opensource.org/licenses/MIT
 */
(function( $, undefined ) {

    $.widget('ui.dnd4sortable', {

        /**
         * Default widget otptions
         */
        options: {
            dummy: {
                tag: 'li',
                text: '...',
                html: false,
                attr: {},
                css: {}
            },
            drop: function(event) {},
            dragIn: function(event) {},
            dragOut: function(event) {}
        },

        /**
         * Widget constructor
         */
        _create: function() {
            this.element.addClass(this.widgetBaseClass);

            $(this.element).bind('dragover', {self: this}, this._dragIn);
            $(this.element).parent().bind('dragover', {self: this}, this._dragOut);
            $(this.element).bind('dragover', {self:this}, this._dragOver);
            $(this.element).bind('drop', {self: this}, this._drop);
        },

        /**
         * "mouseenter-like" drag event handler
         */
        _dragIn: function(event) {
            var self = event.data.self;

            if ( $(self.element).data(self.widgetName+'IsOver') ) return false;
            $(self.element).data(self.widgetName+'IsOver', true);

            var dummy = $(document.createElement(self.options.dummy.tag));
            if (self.options.dummy.text) dummy.text(self.options.dummy.text);
            if (self.options.dummy.html) dummy.html(self.options.dummy.html);
            dummy.attr(self.options.dummy.attr);
            dummy.css(self.options.dummy.css);

            $(self.element).data(self.widgetName+'Dummy', dummy);

            self.options.dragIn.call(self, event.originalEvent);
        },

        /**
         * "mouseleave-like" drag event handler
         */
        _dragOut: function(event) {
            var self = event.data.self;

            if ( !$(self.element).data(self.widgetName+'IsOver') ) return false;
            $(self.element).data(self.widgetName+'IsOver', false);

            var dummy = $(self.element).data(self.widgetName+'Dummy');
            var sortable = $(self.element).data('sortable');

            if (dummy && sortable && sortable.helper) {
                sortable._mouseStop(event);
                dummy.remove();
            }

            self.options.dragOut.call(self, event.originalEvent);
        },

        /**
         * initializes the sortables elements and events
         */
        _dragOver: function(event) {
            var self = event.data.self;

            var dummy = $(self.element).data(self.widgetName+'Dummy');
            var sortable = $(self.element).data('sortable');

            if (dummy && (dummy.parent().length == 0)&& sortable ) {
                $(self.element).append(dummy);
                sortable.currentItem = dummy.data("sortable-item", true);

                event.target = dummy;
                sortable._mouseCapture(event, true);
                sortable._mouseStart(event, true, true);
                sortable.offset.click.top = 0;
                sortable.offset.click.left = 0;
            }

            if (sortable.currentItem && sortable.helper) {
                sortable._mouseDrag(event);
            }

            event.preventDefault();
            event.stopPropagation();
        },

        /**
         * drop event handler
         */
        _drop: function(event) {
            var self = event.data.self;

            var dummy = $(self.element).data(self.widgetName+'Dummy');
            var sortable = $(self.element).data('sortable');

            if (sortable && sortable.helper) {
                sortable._mouseStop(event);
                self.options.drop.call(self, event.originalEvent);
            }

            event.preventDefault();
        },

        /**
         * external getter of the last dummy element
         */
        dummy: function() {
            return $(this.element).data(this.widgetName+'Dummy');
        },

        /**
         * removes the dummy node from the sortable list
         */
        revert: function() {
            var dummy = $(this.element).data(this.widgetName+'Dummy');
            var sortable = $(this.element).data('sortable');

            if (dummy) {
                dummy.remove();
            }
            if (sortable && sortable.helper) {
                sortable._mouseStop();
            }
        }
    });

})(jQuery);