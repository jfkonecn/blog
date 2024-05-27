---
title: "The Factorio Architecture"
subTitle: "Do what the math tells you"
tldr: "Factorio is the perfect visual and practical manifestation of how ALL software is designed, whether intentionally or not, and we as software developers can use that fact to design better systems before writing a single line of code."
pubDate: "May 27 2024"
---

## Introduction

For a while now I have felt that there is something fundamentally missing when
it comes to designing complex software systems. I have often seen people take for
granted that software architecture is an unknowable monster. It is not uncommon
for architects to answer questions about how to design software with the phrase
“it depends”. While I completely agree that a decision has to be made with the
context of the problem in mind, the “it depends” answer never comes with a
systematic way of answering the question. For example, you will probably hear
“if your system is small then use a monolith” or “start with a monolith and then
when your system has scaling issues then switch to a microservice”, but these
answers miss something big. How do I answer the question of what is a “big”
system or when do I know if my system has “scaling issues”? The good news is
that we as software developers have already come up with much of the theory to
answer these questions in an objective way, but we simply need to start using
the tool all engineers know and love, math!

### What does this have to do with Factorio?

For those of you who do not know already, [Factorio](https://www.factorio.com/)
is a game where you turn raw materials into useful products through a series of
machines. These products are then used to create more machines and defenses for
your machines. The objective of the game is to build a rocket with your machine
to leave the planet you are stranded on. So what does this game have to do with
software architecture? If you think about it in a literal sense, all the
products and raw materials of the game are just bytes of data and the machines
are functions that operate on those bytes of data. So what I am saying is that
Factorio is a [low code no code solution](https://en.wikipedia.org/wiki/Low-code_development_platform)!
You even run into common problems we face as software developers such as scaling
issues and [spaghetti factory designs](https://en.wikipedia.org/wiki/Spaghetti_code).
Are there any lessons which can be taken away from Factorio that can help us
become better at designing software? Yes! We simply need to see what another
discipline of engineering, which is dedicated to designing and scaling
factories, has learned about them, Chemical Engineering.

### What can we learn from Chemical Engineers?

Oftentimes chemical engineers have to work on something related to manufacturing
products. They may take crude oil and turn it into gas, convert sand into
silicon wafers, or take chemicals and turn them into life saving drugs. All
these industries are very different, but they all hire chemical engineers who
are taught in more or less the same way in every university. How are these
people even qualified if these industries are so different? The answer is that
these industries all share common “unit operations” which is a term coined by
an early pioneer of chemical engineering, [Arthur D Little](https://www.thechemicalengineer.com/features/cewctw-arthur-d-little-dedicated-to-industrial-progress/).
What Arthur essentially discovered was that there were common categories of
equipment that all manufacturing processes shared. According to him these unit
operations were:

- fluid flow processes
  - how gas and liquids flow through pipes
- heat transfer processes
  - how to cool and heat materials
- mass transfer processes
  - how to purify materials
- thermodynamic processes
  - how to know how much energy is required to perform a process
- mechanical processes
  - changing materials without chemical reactions (ie mixing, pulverizing, etc.)

The understanding of what the basic unit operations are has changed with time,
but teaching these unit operations with dedicated classes is still the way
most chemical engineers are taught today. In each of these categories of unit
operations they learn different ways to accomplish the operation and,
critically, learn equations to ensure their process can produce the required
amount of product. For example, calculating how much heat they need to boil
sea water in order to purify it would be taught to them in their
thermodynamics class. In thermodynamics, as with all of the chemical
engineering courses, they learn how to look up the correct equations to use
and then apply them. It just so happens that the same equations that are used
to calculate the heat required to boil sea water can also be used to calculate
something like the heat required to boil crude oil in order to refine it.
The equations have different constants to account for the material they are
concerned about, but the same principles apply. These equations allow a
chemical engineer to jump into a problem they have never dealt with before
and come up with a good understanding about how viable a solution is.
Experience, as always, is important because there is always domain specific
information that needs to be understood, but their education helps them avoid
designs which are certain to fail. You may be wondering if we as developers
have discovered our unit operations yet and, to me, the answer is yes, but
we have not categorized our existing knowledge correctly to be able to take
advantage of it.

## What are our “unit operations” in software?

Software, in contrast with manufacturing plants, does not produce chemicals,
but instead it produces data—so all the unit operations must interact with data.
As there have been refinements since the early days of chemical engineering on
what the unit operations are, I am almost certainly missing operations on my
list, but my hope is that our industry will further refine this list as our
understanding of software improves. I included my own definitions for clarity.

- Map
  - Convert one piece of data to another
- Filter
  - Remove Data
- Sort
  - Order Data
- Distribution
  - Determine where data should go (e.g. Load Balancer or a switch statement)
- Validate
  - Check the integrity of the data. This normally will result in mapping of the
    data to a new type. (e.g. parsing)
- Authenticate
  - Determine identity of the person/software triggering a data flow
- Authorize
  - Determine if an identified person/software is allowed to trigger a data flow
- Global state read/write
  - Read/write data to memory that is scoped beyond the call stack
  - Examples:
    - Mathematical constants such as PI
    - String message constants
    - The document variable available to javascript in a web browser
- I/O
  - Any communication outside of your program
  - Examples:
    - Network, database, console input/output, etc
    - Caching
    - Logging
- Panic
  - Kill the program

## This looks like functional programming… So you want me to do functional programming?

While I think functional programming works so well because it has these concepts
built into it, this is not about functional vs object oriented programming.
Functional programming is a style and I believe the use of unit operations is
not a style, but fundamental to programming itself. Simply put, all programs
use unit operations, whether intentionally or not, in order to function and
thus unit operations apply to all of programming, even to assembly and machine
code.

## I guess this is nice, but how is this useful in a real world scenario?

Much like how neural networks are made up of tiny math functions, or “neurons”,
and are composed into powerful things such as large language models, breaking
down your software into these unit operations gives you power only through
combining them into a structured, repeatable system. While there may be more
implications, these points I feel are enough to give a strong incentive to
start programming with unit operations in mind.

- Allows developers to estimate the runtime complexity, memory usage, and disk
  usage of their system before they write a single line of code.
- Enables a means of visualizing the data flow.
- Allows developers to estimate the cost of their project.
- Easier Design Patterns to Replicate

### Estimating System Requirements

If you know the general flow of an algorithm then you can reasonably estimate
the runtime performance before writing any code. For example, fetching
weather data from an API and printing it onto the console could be broken
down the following way:

1. Ask the user what location they want data for (I/O)
2. Validate location input (Validate)
3. Make a GET request to the API endpoint (I/O)
4. Parse the JSON in the response (Validate)
5. Convert the parsed JSON data into a string (Map)
6. Print the string to the console (I/O)

Trying to estimate the system requirements for this program as a whole would
be challenging since there are different ways to accomplish the goal even for
a simple program like this one. For example, maybe we could cache previously
requested JSON responses which would impact the performance as well as the
memory usage. Clearly stating the data flow now gives us something concrete
to make estimates with. To do this, you would calculate both memory usage and
performance for each unit operation in isolation. Once the individual unit
operations’ memory usage and performance is calculated you simply need to:
(1) sum all the results for every given flow of data (in the case of performance)
and, (2) sum memory allocation and subtract freed memory
(in the case of memory usage), for every data flow. You would want to calculate
max memory usage as well. Undoubtedly additional calculations would be needed,
but these results provide an example of how designing systems with unit
operations enables estimation of the hardware demands from your program.

#### So are you saying we have to build this system before we know how well it will perform? We are right back where we started!

You are correct—at first. Fortunately, chemical engineers have a way around this
problem since they too have the same issue with their equipment. The way around
it is to rely on published and verified laboratory results from which equations
are derived, and thus calculations can be made. Unfortunately, this is not a
task for a single person, but from many individuals over many years. This is a
big reason why I want to call attention to this way of thinking!

### Visualizing Data Flow

Putting the flow of chemicals, just like the flow of data, in words makes it
difficult to fully understand the design of a system. Chemical Engineers use
process [flow diagrams](https://en.wikipedia.org/wiki/Process_flow_diagram) to
aid in understanding complex systems. Process flow diagrams connect individual
unit operations together using pictures. I have put together a process flow
diagram for my [previous weather API example]() as well as a
slightly more complicated example of an API that [fetches medical patient
information](). These visualizations give a clear picture to developers of
what needs to be done, but still gives them the absolutely necessary creative
freedom to organize and structure the code as they see fit.

### Estimating Cost

Determining the cost of a software project, or for that matter a chemical
engineering project, is never going to be completely accurate or precise.
However, being good enough at estimating avoids unnecessary stress in your
career. Your management needs to know how much a software project is going to
cost and if it is worth investing in. Can you blame them? If you were thinking
about paying someone to build you a house would you not want to know how much
it is going to cost you and how long it is going to take? Would you want to
hear that it depends and that there is no way to know for sure, with no
concrete answer?

By breaking your system down into unit operations and calculating the
resources those unit operations will consume, you have a good chance at giving
a more realistic estimate. There are plenty of factors that contribute to the
cost of a project, but I will focus on the two that are most important when
breaking down data flows into unit operations: operational cost and building cost.

### Operational Cost

The operational cost is simple enough since it is derived by using the
memory usage and runtime performance of your data flows. Once this information
is known it is simply a matter of determining how much the machines with the
correct specifications will cost over time.

### Building Cost

The building cost is a little more difficult since it depends on factors that
are difficult to measure, such as the skill of the developers on the project.
However, it is my belief that if breaking down software projects into unit
operations becomes widely adopted that publications will arise which will,
in turn, give our industry those equations. There will be a larger error with
building estimates when compared to estimating operational costs—but that is
still better than having no idea how much a software project should cost.

### Reproducible Design Pattern

Design patterns which are truly repeatable and generic can eventually be
created based on the composition of these unit operations. Examples of this
would be fetching a single record from a database by ID and displaying it to
the user, or drawing a single frame on a screen. There are many ways to
achieve this requirement, but there is no reason why equations cannot be used
to predict the building and operational cost since fetching data by ID and
displaying the results is such a common algorithm in many software projects.
This is not to say that you would only have one “true” way to perform these
algorithms; instead, over time, many computer scientists would contribute
multiple compositions of unit operations—in much the same way as there are
different algorithms for an operation as simple as sorting. They would have
different assumptions built into them, but, if picked carefully, would enable
significant performance gains without requiring a developer who is an expert
in every kind of algorithm.

## This is a waste of time. Upfront planning is always wrong and changing software is quick, so why bother?

As is the case for every developer, I have seen plenty of projects that have
been a complete mess. And the reason why those projects continue to rot in
the condition that they are in? Because it is not so easy to change software
as we assume, and rewrites pause feature development. Yes, writing lines of
code and building new versions of software is relatively quick, but that is
not the hard part of maintaining a project. The hard part is figuring out
which lines of code to write quickly without breaking existing functionality.
When you continually design systems so poorly that you need to rewrite your
whole solution every couple of years, your judgment as a developer will be
severely questioned even if starting from scratch is not as costly as it is
for other engineering disciplines. Keep in mind your salary is a cost—and not
a cheap one. I do agree that plans are never going to be executed perfectly—and
that is for the best. As with other engineering disciplines, there are always
unforeseen problems, and the goal should not be perfection. The goal of upfront
planning and designing through the use of unit operations should be that a
change to the system should be proportional to the change in the business
requirement. If you worked for a company which sold books online and they
wanted to set up a promo code system, saying it would take a full rewrite of
the system would be completely out of line with the change proportional to the
change in business requirements. Conversely if the business said they were
pivoting and were going to start running hotel chains instead of selling books,
a complete rewrite is well justified because the business has completely changed
as well.

To judge if a code change is out of line with the change in business
requirements, I like to think of what a “reasonable user” would expect as far
as timelines go. So for example let’s say you have to add a new item to a
dropdown. Would a reasonable user expect this change to take a minimum of a month?

## Conclusion

The reason why engineers do so many calculations is not to create a perfectly
crafted system. It is not to know exactly how your system will behave when it
is completed. In fact, in many situations chemical engineers will run
[“pilot plants”](https://en.wikipedia.org/wiki/Pilot_plant) to test ideas
they have on a system they are designing. As it turns out, there is no
equation that says your system is easy for operators to use—sound familiar?
The main purpose of doing the math is to avoid wasting time on building a
system that is either way over engineered or way under engineered.
You do not want to build a nuclear power plant to power a single house or
use a single solar panel to power an entire city. In the same way for
software, you want to avoid building microservices for your personal blog site
with one view per day or use a single CSV file to store posts for a social
media site which has millions of active users. Ultimately if we want to
become officially recognized as an engineering disciple we have to go from
saying “it depends on a lot of factors” to “it depends on what the math tells you”.

I encourage you to go out right now and try [Factorio](https://store.steampowered.com/app/427520/Factorio/)
to see for yourself how much it is just like software. You can even enable
[peaceful mode](https://www.reddit.com/r/factorio/comments/kh9yka/peaceful_mode/)
so you can focus on just building a massive factory!
