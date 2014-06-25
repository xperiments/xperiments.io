{
    "title": "Serailizing Typescript Objects",
    "date": "2014-6-24"
}
I will write a series of posts about **Serializing** and **Deserializing** Typescript class instances.

Typescript does not provide a native way of Serializing Objects/Classes so I have developed a proof of concept mechanism to allow it. You can download it at:

[GitHub: typescript-serializer](https://github.com/xperiments/typescript-serializer)


## Defining Serializable Classes

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

To do this we need to make User class extend Serializable and **annotate** it **adding** a property named **"@serializable"**.

Extending the class as Serializable will add 2 main methods to our class:

* writeObject();
* readObject(obj:any);

We will see the usage of these methods later, for now our User class will be like this:

```javascript
class User extends extends Serializable
{
    "@serializable":string;
    name:string;
    surname:string;
    street:string;
    number:number;
}
```

Define & register what properties we like to export using another helper Class:

```javascript
class UserSerializer
{
    name:string = null; // we need to init to null to this work
    street:string = null;
    number:number = null;
}
```
**REMEMBER** to initialize all props to null, if not it won't work :-(


Register it in the main Serializer using the Serializer.registerClass method.

It takes 2 arguments:

* **classContext** // a funciton that returns the Main class to Serialize
* **SerializerDataClass:any** // The serializer Class that defines what elements to serialize


```javascript
// register here the MainClass and SerializerClass
Serializer.registerClass( ()=>User, UserSerializer );
```


## Usage

```javascript
// create a new User (source) instance:
var sourceInstance:User = new User();
    sourceInstance.name = "John";
    sourceInstance.street = "Some Street Address";
    sourceInstance.number = 67;
```

To serialize the instance we will use the writeObject method inherited from Serializable as:

```javascript
var serializedObject:any = sourceInstance.writeObject();
console.log( serializedObject );
```

The writeObject method will serialize the instance to a plain js-object:

```javascript
{
    "@serializable": "User",
    "name": "John",
    "street": "Some Street Address",
    "number": 67
}
```

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
class User extends extends Serializable
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

class UserAddress extends extends Serializable
{
    "@serializable":string;
    address:string;
    number:number;
}

class UserAddressSerializer extends extends Serializable
{
    name:string = null; // we need to init to null to this work
    surname:string = null;
    addresses:UserAddress[] = null;
}

// register serializer
Serializer.registerClass( ()=>UserAddress, UserAddressSerializer );

```
