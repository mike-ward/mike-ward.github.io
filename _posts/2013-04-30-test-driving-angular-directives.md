---
layout: post
title: 'Test Driving Angular Directives'
---
[AngularJS](http://angularjs.org) is a client-side JavaScript framework from Google. With it you can extend the HTML vocabulary of your application resulting in extraordinarily expressive, readable and quick to develop code.

Extending the HTML vocabulary you say? Well, in a sense, yes. Here's an example:
    
    <combobox ng-model="color" label="Colors" options="colors"   
        placeholder="Pick a color"></combobox>

The `combobox` tag renders a control that functions much like a desktop combo-box widget. I've written the [demo](/cdn/samples/angulardirective.html) as a single HTML file, including scripts, to make it easier to grok.

I'll give you a moment to pickup yourself up off the floor.

All kidding aside, this is pretty darn powerful stuff. Custom declarative markup can put a serious dent in the complexity curve of any application.

To accomplish this seemingly magical feat, Angular uses _directives_. Directives are how Angular rewrites parts of the DOM. In the simplest of cases, it's not much more than a template.

> Note: If you're not familiar with Angular's concepts of models, controllers, scope, modules and dependency injection, this article might not be a good place to start. The  [_AngularJS_](http://angularjs.org) site has some excellent learning materials. Start with the two videos on the home page. If you're not hooked after that then maybe Angular is not of you. That's OK. We all have our preferred ways to work.

There are different ways to write a directive. For this example, we'll take the easy route and just return an object that describes directive's look and behavior. The first directive is we'll look at is called `<dropdown>`. It's simply a label and a select control combined in a containing div.
    
    var app = angular.module("myapp", []);  
       
    app.directive("dropdown", function () {  
      return {  
        replace: true,  
        restrict: 'E',  
        scope: { label: '@', options: '=', placeholder: '@', ngModel: '=' },  
        template:  
            '<div class="dropdown">' +  
            '<label>{{label}}</label>' +  
            '<select ng-model="ngModel">' +  
              '<option value="" selected disabled>{{placeholder}}</option>' +  
              '<option ng-repeat="option in options">{{option.label}}</option>' +  
            '</select>' +  
            '</div>'  
      };  
    });

Adding a directive is simply a matter of calling `angular.directive()` with the name of the directive and a function the returns a [Directive Definition Object](http://docs.angularjs.org/guide/directive). There are some specific settings required but I want to emphasize that there isn't any extraordinary effort required to add your own directives.

The `<dropdown>` directive is minimal and doesn't describe any behavior and so serves as a good starting point. Let's go through the Directive Definition Object line by line.

  * **replace**: When true, replaces the directive markup with template. If false, it appends to the existing markup. 
  * **restrict**: 'E' specifies that this is an element tag. Other options include 'C' for class, 'A' for attribute and 'M' for comment. 
  * **scope**: There are lots of options for scope here. See the documentation for details. The ['@'](mailto:'@') symbol binds a specified property to a DOM element (`label` or `placeholder` in this case). It's a convenient mechanism for passing parameters into directives. The '=' symbol is more powerful in that is establishes two-way binding between an object in the parent scope and local scope. In our case, we're assigning the parent scope property `ngModel` to the local scope property `ngModel`. If the parent scope property was not `ngModel`, we could specify the name. example: `ngModel: "=SomeOtherProperyName"`. 
  * **template**: Is just what it says it is, a template. Notice that the template can refer to scope properties just as in normal markup.

The part I've struggled the most with is the scope. The scope in the directive is not the scope of the parent (the parent being the outer scope where the directive is invoked). Nor is there a prototypal relationship (inherited). By declaring an object we're getting a new scope with just copies of the properties we've specified (`label`, `options`, `placeholder`). 

And that's it. There are of course more items to the Directive Definition Object to handle a myriad of situations but the basics are easy.

> Note: Some of you may have noticed I used a repeater instead of `ng-options`. It's because there are few bugs in the current implementation of `ng-options`.

The second directive, `<combobox>` adds some behavior and allows for multiple selections. Here's the code.
    
    app.directive("combobox", function () {  
      return {  
        replace: true,  
        restrict: 'E',  
        scope: { label: '@', options: '=', placeholder: '@', ngModel: '=' },  
        template:  
            '<div class="combobox">' +  
              '<label>{{label}}</label>' +  
              '<div>' +  
                '<input ng-model="ngModel" type="text" placeholder="{{placeholder}}">' +  
                '<button class="btn"><i class="icon-arrow-down"></i></button>' +  
                '<div>' +  
                  '<select multiple ng-show="show" ng-model="ngModel">' +  
                    '<option value = "">{{placeholder}}</option>' +  
                    '<option ng-repeat="option in options">{{option.label}}</option>' +  
                  '</select>' +  
                '</div>' +  
              '</div>' +  
            '</div>',  
        link: function (scope, element, attributes) {  
          var select = element.find("select");  
          var showSelect = function (show) { scope.$apply(scope.show = show); };  
          element.find("button").bind("mousedown", function () { showSelect(!scope.show); });  
          select.attr("size", Math.min(scope.options.length + 1, 11));  
          select.bind("blur", function () { showSelect(false); });  
          select.bind("change", function () {  
            var values = _.compact(select.val()).join(", ");  
            element.find("input").val(values);  
          });  
        }  
      };  
    });

In this version I've added an input box, a button and a multi-select box that only becomes visible when the button is clicked. It's essentially the same as `<dropdown>` above but also includes an additional `link` function.

The `link` method is responsible for registering DOM (Document Object Model) listeners and updating the DOM. It's called after the template is cloned. There are other ways to accomplish this with `compile` and `controller` methods but link is generally the most straightforward and appropriate path.

If the code in `link` strikes you as jQuery-ish, it's because it's jQuery. Angular comes with a "lite" version of jQuery. The `element` parameter is a jQuery-like object. If you do include the jQuery library, Angular will delegate to jQuery (how cool is that).

> Note: jQuery is required in this example. The element.val() method in Angular does not return an array of selected items in the case of `<select multiple>`. I've submitted a bug on this.

The multi-select control's visibility is controlled by the `ng-show` directive. If the `show` parameter evaluates to true, the control is made visible. Otherwise it is hidden. Because I'm setting `scope.show` inside an DOM event handler, I'm essentially "outside" of the Angular framework. Angular's watch listeners won't detect the change in `scope.show` without some help. The scope.$apply() method executes the given expression in the correct Angular context and lets the rest of the framework react to the model change.

The `mousedown`, `blur` and `change` handlers are similar to what you might expect using a jQuery library.

Hopefully I've tickled your interest in Angular and in particular, directives. Directives have a reputation of being difficult to write. While there is a fair bit of conceptual overhead, writing them is straightforward. Hopefully, these examples without help you, "Break the ice" and start writing your own directives.
