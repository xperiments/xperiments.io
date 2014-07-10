{
    "title": "Serailizing Typescript Objects",
    "date": "2014-6-24"
}
typescript-serializer
=====================

Lately I've been thinking it would be interesting to have a data serialization system to be used in some client-side developments in which I am working.

But first, for those that don't know what is data serialization: ( wikipedia )

> In computer science, in the context of data storage, **serialization** is the process of translating data structures or object state into a format that can be stored (for example, in a file or memory buffer, or transmitted across a network connection link) and reconstructed later in the same or another computer environment.[1] When the resulting series of bits is reread according to the serialization format, it can be used to create a semantically identical clone of the original object


I have used these systems before in Java and Actionscript, an missed not being able to have a similar system in Typescript so I have developed a fairly simple one named typescript-serializer.

I took concepts from Java and Actionscript, adapting them to the requirements and limitations of Typescript.

You can find it at [GitHub](https://github.com/xperiments/typescript-serializer).


## Serializable Classes

Imagine a User Class like this:

```javascript
class User
{
	name:string;
	surname:string;
	street:string;
	number:number;
}
```

And we want to serialize only the *name*, *street* and *number* properties of the object.


### "Serializable" classes must extend Serializable

This methods are inherited when extending from Serializable:

* writeObject();
* readObject(obj:ISerializableObject);
* stringify();
* parse(jsonstring);


### Defining Serializable properties

We will make the definition of what properties and how these properties should be serialized by creating a "serializer" class that must implement ISerializerHelper. 

```javascript
class UserSerializer implements ISerializerHelper
{
	/* REMEMBER we need to init to null all props to this work */
	"@serializer":string = null; 
    name:string = null;
    surname:string = null;
	street:string = null;
    number:number = null; 
}
```

As we see in this example, we have defined the properties we want to serialize from the "User" class by declaring it in the new class an initializing it to **NULL ( this is IMPORTANT )** .

In this class, simply specify the properties you want to export by declaring new class properties


### Registering Serializable Classes

So far the only thing we have done is to define which classes are serializable and how they should be serialized, but for this to work we need to register them together using the method registerClass of the class Serializer.

	Serializer.registerClass( classContext:()=>any, SerializerDataClass:typeof SerializerDefinition ):void

It takes 2 arguments:

* **classContext** // a function that returns the Main class to Serialize
* **SerializerDataClass:any** // The SerializableData Class that defines how & what elements to serialize.


```javascript
// register here the User and UserSerializer
Serializer.registerClass( ()=>User, UserSerializer );
```

We must be careful in how we define "class Context." It must be a function that just returns the serialized class and nothing else. This function is used later to determine his name.

## Usage

Now that we have everything in place, we will create a new "User" and see how serialize and deserialize it:

```javascript
// create a new User (source) instance:
var sourceInstance:User = new User();
    sourceInstance.name = "John";
    sourceInstance.surname = "Smith";
    sourceInstance.street = "Some Street Address";
    sourceInstance.number = 67;
```

### Write method


The writeObject method inherited from Serializable lets us serialize the object to another "transportable" object

```javascript
var serializedObject:any = sourceInstance.writeObject();
console.log( serializedObject );
```
Running it will have something like this:

```javascript
{
    "@serializable": "User",
    "name": "John",
    "surname": "Smith",
    "street": "Some Street Address",
    "number": 67
}
```

### Read method

To rehydrate another User instance:

```javascript
var serializedObjectClone:any = new User();
console.log( serializedObjectClone ); // outputs an Empty User instance

serializedObjectClone.readObject( serializedObject );
console.log( serializedObjectClone ); // outputs a rehydrated User instance
```

## Working with complex structures

For now we have only serialized a simple Object but we can serialize nested Classes inside other Classes.

For this example we will using this 2 Classes:
```typescript
class User extends Serializable
{
    "@serializable":string;
    name:string;
    surname:string;
    addresses:UserAddress[];
}
class UserSerializer
{
    name:string = null; // we need to init to null to this work
    surname:string = null;
    addresses:UserAddress[] = null;
}

// register serializer
Serializer.registerClass( ()=>User, UserSerializer );

class UserAddress extends Serializable
{
    "@serializable":string;
    address:string;
    number:number;
}

class UserAddressSerializer extends Serializable
{
    name:string = null; // we need to init to null to this work
    surname:string = null;
    addresses:UserAddress[] = null;
}

// register serializer
Serializer.registerClass( ()=>UserAddress, UserAddressSerializer );

```

Pedro