{
    "title": "Typescript AngularJS Best Practices",
    "date": "2014-7-16",
    "description": "#001 Injections",
    "image": "/images/-1515626995.jpg",
    "categories": [
        "Typescript"
    ]
}
##Introduction

I will write a series of posts about some working practices I have found helpful while developing AngularJS apps with Typescript.
If you consider that something is wrong or could be improved, just leave a message in the corresponding post and I will update it.

# #001 Injections

Lately I've been struggling with a bug in AngularJS which has given me a good number of headaches.

Consider this Controller class:

```javascript
class MyController
{
    static $inject = ["$scope","$elenent","$attr"];
    constructor( $scope, $attr, $element )
    {
    }

}

```

Seems correct at first time, also give no Typescript compiler time error. 

Inspecting carefully our class we can find 2 errors:

### $element is misspelled

    static $inject = ["$scope", --> "$elenent" <-- ,"$attr"];
    
### injection between constructor & $inject not in Sync

    $inject:        "$scope", --> "$elenent","$attr" <--
    constructor:    "$scope", --> "$attr", "$element" <--

## Best practices to Overcome this errors:

### Misspelling

To avoid the misspelling and benefit of IDE code completion I suggest to use a static class to hold all AngularJS injection properties "names".

Let's define a simple class to hold the name values:

```javascript
module $di
{
    export class $ng
    {
        ...
        public static $scope:string = null;
        public static $element:string = null;
        public static $attr:string = null;
        ...
    }
    
    $di.initStaticClass( $ng );
}
```
**full $di source code at bottom** or at [Gist](https://gist.github.com/xperiments/5dff26e1ab673b74194d)

Calling the $di.initStaticClass( $ng ); will set the value of every property to his own keyname, resulting in:

        ...
        public static $scope:string = "$scope";
        public static $element:string = "$element";
        public static $attr:string = "$attr";
        ...
        
> Note here we are initializing all the properties of $ng class to null. This is required to be able to initialize the values with the $di.initStaticClass method.

Later at our MyController class we can then reference the static properties like:

```javascript
class MyController
{
    static $inject =
    [
        $di.$ng.$scope,
        $di.$ng.$element
        $di.$ng.$attr
    ];
    constructor( $scope, $element, $attr )
    {
    }

}
```


### injection between constructor & $inject not in Sync

This is the cause of some difficult to find bugs, because sometimes injection is working but not in the correct order or some parameters are missing.

To avoid this the $di code at bottom provides with a helper method **$di.checkDI** that let us check the correct injection value/order at runtime.

To test MyController and check the injection correctness do:  

```javascript

// this will Fail as $element is not in order
class MyControllerFail
{
    static $inject =
    [
        $di.$ng.$scope,
        $di.$ng.$element
        $di.$ng.$attr
    ];
    constructor( $scope, $attr, $element )
    {
    }

}
$di.checkDI( MyControllerFail );

// this will Pass as $element is in order
class MyController
{
    static $inject =
    [
        $di.$ng.$scope,
        $di.$ng.$element
        $di.$ng.$attr
    ];
    constructor( $scope, $element, $attr )
    {
    }

}
$di.checkDI( MyController );
```

And finally the [Gist](https://gist.github.com/xperiments/5dff26e1ab673b74194d) and full source code of the $di module:

```typescript

/**
 * $di.ts
 * http://www.xperiments.io/posts/typescript-angularjs-best-practices/
 * Created by xperiments on 15/07/14.
 */
module $di
{
	/* service */
	export class $ng
	{
		/* Services */
		static $anchorScroll:string = null;
		static $animate:string = null;
		static $cacheFactory:string = null;
		static $compile:string = null;
		static $controller:string = null;
		static $document:string = null;
		static $filter:string = null;
		static $http:string = null;
		static $interpolate:string = null;
		static $locale:string = null;
		static $location:string = null;
		static $parse:string = null;
		static $q:string = null;
		static $rootElement:string = null;
		static $rootScope:string = null;
		static $sce:string = null;
		static $sceDelegate:string = null;
		static $templateCache:string = null;
		static $window:string = null;
		static $exceptionHandler:string = null;
		static $httpBackend:string = null;
		static $interval:string = null;
		static $log:string = null;
		static $timeout:string = null;
		static $resource:string = null;
		static $sanitize:string = null;
		static $swipe:string = null;


		/* providers */
		static $animateProvider:string = null;
		static $compileProvider:string = null;
		static $controllerProvider:string = null;
		static $filterProvider:string = null;
		static $httpProvider:string = null;
		static $interpolateProvider:string = null;
		static $locationProvider:string = null;
		static $logProvider:string = null;
		static $parseProvider:string = null;
		static $rootScopeProvider:string = null;
		static $sceDelegateProvider:string = null;
		static $sceProvider:string = null;
		static $exceptionHandlerProvider:string = null;
		static $routeProvider:string = null;

		/* auto */
		static $injector:string = null;
		static $provide:string = null;

		/* ngCookies service */
		static $cookieStore:string = null;
		static $cookies:string = null;


		/* ngRoute service */
		static $route:string = null;
		static $routeParams:string = null;

		/* controller */
		static $scope:string = null;
		static $element:string = null;
		static $attrs:string = null;
		static $transclude:string = null;

	}
	export module $ng
	{
		initStaticClass( $ng );
	}



	var __dev_mode:boolean = false;
	export function setDevelopment(devMode:boolean){ __dev_mode = devMode }

	/* HELPERS */
	export function initStaticClass( Class:any ):void
	{
		// sets the same value from the keyname itself
		// bypassing not nulled properties
		Object.keys(Class).forEach((key:string)=> { (Class[key] === null) && ( Class[key] = key ); })
	}
	export function checkDI( Class:Function ):void
	{
		if( !__dev_mode ) return; // Do nothing in production!!

		// do a dity check here :-(
		var className:string = getClassName(Class);
		if ( annotate(Class).toString().toLowerCase()!=Class.$inject.toString().toLowerCase() )
		{
			var err = ("\n\nPlease check the injection in class $className$\n\n").replace('$className$',className);
			throw new Error(err);
			return;
		}
		console.log('$di class checked: '+className)
	};

	/** INTERNAL **/
	function getClassName(Class:any):string
	{
		return Class.toString().match(/function (.*)\(/)[1];
	}

	//http://taoofcode.net/studying-the-angular-injector-annotate/
	var FN_ARGS:RegExp = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
	var FN_ARG_SPLIT:RegExp = /,/;
	var FN_ARG:RegExp = /^\s*(_?)(\S+?)\1\s*$/;
	var STRIP_COMMENTS:RegExp = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

	function annotate(fn:Function):string[]
	{
		var $inject:string[];
		var fnText:string;
		var argDecl:any[];

		if (typeof fn == 'function') {

			$inject = [];
			if (fn.length) {
				fnText = fn.toString().replace(STRIP_COMMENTS, '');
				argDecl = fnText.match(FN_ARGS);
				argDecl[1].split(FN_ARG_SPLIT).forEach(function(arg){
					arg.replace(FN_ARG, function(all, underscore, name){
						$inject.push(name);
					});
				});
			}
		}
		return $inject;
	}
}
```

* Thanks to Alejandro for his help :P

