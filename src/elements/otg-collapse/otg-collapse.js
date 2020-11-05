define(['browser', 'css!./otg-collapse', 'registerElement', 'otg-button'], function (browser) {
    'use strict';

    var EmbyButtonPrototype = Object.create(HTMLDivElement.prototype);

    function slideDownToShow(button, elem) {

        elem.classList.remove('hide');
        elem.classList.add('expanded');
        elem.style.height = 'auto';
        var height = elem.offsetHeight + 'px';
        elem.style.height = '0';

        // trigger reflow
        var newHeight = elem.offsetHeight;
        elem.style.height = height;

        setTimeout(function () {
            if (elem.classList.contains('expanded')) {
                elem.classList.remove('hide');
            } else {
                elem.classList.add('hide');
            }
            elem.style.height = 'auto';
        }, 300);

        var icon = button.querySelector('i');
        //icon.innerHTML = 'expand_less';
        icon.classList.add('otg-collapse-expandIconExpanded');
    }

    function slideUpToHide(button, elem) {

        elem.style.height = elem.offsetHeight + 'px';
        // trigger reflow
        var newHeight = elem.offsetHeight;

        elem.classList.remove('expanded');
        elem.style.height = '0';

        setTimeout(function () {
            if (elem.classList.contains('expanded')) {
                elem.classList.remove('hide');
            } else {
                elem.classList.add('hide');
            }
        }, 300);

        var icon = button.querySelector('i');
        //icon.innerHTML = 'expand_more';
        icon.classList.remove('otg-collapse-expandIconExpanded');
    }

    function onButtonClick(e) {

        var button = this;
        var collapseContent = button.parentNode.querySelector('.collapseContent');

        if (collapseContent.expanded) {
            collapseContent.expanded = false;
            slideUpToHide(button, collapseContent);
        } else {
            collapseContent.expanded = true;
            slideDownToShow(button, collapseContent);
        }
    }

    EmbyButtonPrototype.attachedCallback = function () {

        if (this.classList.contains('otg-collapse')) {
            return;
        }

        this.classList.add('otg-collapse');

        var collapseContent = this.querySelector('.collapseContent');
        if (collapseContent) {
            collapseContent.classList.add('hide');
        }

        var title = this.getAttribute('title');

        var html = '<button is="otg-button" type="button" on-click="toggleExpand" id="expandButton" class="otg-collapsible-button iconRight"><h3 class="otg-collapsible-title" title="' + title + '">' + title + '</h3><i class="md-icon otg-collapse-expandIcon">expand_more</i></button>';

        this.insertAdjacentHTML('afterbegin', html);

        var button = this.querySelector('.otg-collapsible-button');

        button.addEventListener('click', onButtonClick);

        if (this.getAttribute('data-expanded') === 'true') {
            onButtonClick.call(button);
        }
    };

    document.registerElement('otg-collapse', {
        prototype: EmbyButtonPrototype,
        extends: 'div'
    });
});