---
title: "Declarative C#"
description: "Explore the benefits of declarative programming C#"
pubDate: "April 6 2024"
heroImage: "/2024/declarative-csharp.jpg"
---

Declarative programming is a bit of a fad in programming and with good reason.
It has the ability to improve code readability. The readability is improved by
allowing the developer to better describe the business process they writing software
for. Though as with any approach it probably should not be used for every problem
you have.

## What is Declarative Programming?

The simple definition of declarative programming is telling the computer what to
do as opposed to imperative programming where you tell the computer how to do it.

Let us take a look at what imperative programming looks like first as it is something
most developer are comfortable with.

```csharp
public List<int> DoubleInts(List<int> numbers)
{
    var answer = new List<int>();
    foreach(var num in numbers)
    {
        answer.Add(num * 2);
    }
    return answer;
}
```

As you can see we are telling the computer to go through each element in our list
and then add the result to a new list. While there is nothing wrong with this code
it can be more annoying to deal with more complex logic. Let us take a look at the
declarative way.

```csharp
public List<int> DoubleInts(List<int> numbers)
{
    return numbers.Select(x => x * 2).ToList();
}
```

Here we have our fabled one liner! Admittedly we do not gain much by taking such
an approach for a couple lines of code, but with more complex business logic
you start to see the benefits. Something you might have noticed is how minimal
the code is. With the declarative style more operations are done with less code.
The con of this is that you have to know what a bunch of functions do. In imperative
programming you have few function to remember so you can get away by just reading
the code. Declarative programming forces you to have a bunch of utility function
which means lots more reading of the documentation. However, once you learn these
function you can do way more with way less.
