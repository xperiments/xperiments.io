{
    "title": "Serailizing Typescript Objects",
    "date": "2014-6-24"
}
I will write a series of posts about **Serializing** and **Deserializing** Typescript class instances.

Typescript does not provide a native way of Serializing Objects/Classes but here is a a proof of concept mechanism to allow it:

[GitHub: typescript-serializer](https://github.com/xperiments/typescript-serializer)


#### First Steps

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

But we only want to serialize the *name*, *street* and *number*.

To do this we need to extend Serializable and **annotate** it **adding** a property named **"@serializable"**:

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

Also we need to define & register what properties we like to export using another Class:

```javascript
class UserSerializer
{
    name:string = null; // we need to init to null to this work
    street:string = null;
    number:number = null;
}

// register here the Data Serializer
Serializer.registerClass( ()=>User, UserSerializer );
```

**REMEMBER** to initialize the variable to null.

Now that we have 


