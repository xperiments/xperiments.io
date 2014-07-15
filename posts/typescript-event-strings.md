{
    "title": "Typescript: Rethinking \"Strings\" Events",
    "date": "2014-7-7",
    "image": "/images/238522209.jpg",
    "categories": [
        "Typescript"
    ]
}
Lately I have found repeating myself the same process while working with static events names in Typescript.

Normally I declare the static events properties like this:

    class EventTest
    {
        static SOME_EVENT:string = "EventTest.SOME_EVENT";
    }

But what happens if we like to **refactor** the class name to "RefactoredEventTest" ? ...

    class RefactoredEventTest
    {
        static SOME_EVENT:string = "RefactoredEventTest.SOME_EVENT";
    }

**Manually "refactoring" the static strings is not optimal and also is error prone.**

To **solve** this we can re-assign the value of the property **at runtime** to the "ClassName.PROPERTY_NAME" pattern using a simple helper class:

```typescript
// StaticEvent Helper Class
class StaticEvent
{
	static init(EventClass:any)
	{
		Object.keys(EventClass).forEach((key:string)=> {
			EventClass[key] = [ StaticEvent.className(EventClass), key ].join('.')
		})
	}

	static className(cls:any):string
	{
		var funcNameRegex = /function (.{1,})\(/;
		var results = (funcNameRegex).exec(cls.toString());
		return (results && results.length > 1) ? results[1] : "";
	}
}

// Simple Event Class Processed at runtime
class EventTest
{
    static SOME_EVENT:string = null;
}
// Initlialize it 
StaticEvent.init( EventTest );
console.log( EventTest.SOME_EVENT );

```

Now printing the SOME_EVENT property of the class "EventTest" will output:

    console.log( EventTest.SOME_EVENT );
    // outputs: "EventTest.SOME_EVENT"
    
If later we like to refactor the **EventTest** class as **RefactoredEventClass** we only need to change the StaticEvent.init() method call as:

    class RefactoredEventClass
    {
        static SOME_EVENT:string = null;
    }
    StaticEvent.init( EventTest );
    
Printing the SOME_EVENT property of the renamed class "RefactoredEventClass" will output:

    RefactoredEventClass.SOME_EVENT;
    
    
    