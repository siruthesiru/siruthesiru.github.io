---
title: 'Study Buddies: OpenAI Playground for Programming Studies'
layout: post
subtitle: But, much like everything, there is a catch.
header-img: img/in-post/2022/bladerunner.png
header-style: text

header-hide-desc: true
pinned: true

catalog: true
code: true
comments: true;

tags:
  - Guides
  - Study Buddies
published: true
---

Some feller in a "Ways To Help You Study" video on the tube would probably tell you about tools that they wish they knew
about when they were learning about stuff.

Fortunately for me, I found about this little study buddy smack-dab in the middle of my college "career" and fortunately
for you I've written this piece for you (this refers to all readers not you specifically, you narcissist)!

## What The Digital Hell Is This?

Notice how I used name case for the header for inclusivity? In all seriousness, as stated [OpenAI's Playground's documentation](https://beta.openai.com/docs/introduction):
> The OpenAI API can be applied to virtually any task that involves understanding or generating natural language or code.
> We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to 
> fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.

Basically, OpenAI is an artificial intelligence toolset. Playground, in particular, is a tool that uses their 
[completions](https://beta.openai.com/docs/api-reference/completions) endpoint (remote code) which lets us input a prompt
which the bot attempts to answer or complete within the provided context.

![OpenAI](/img/in-post/2022/ai.webp)
*OpenAI Playground working with instructions*
{:.desc}

## Playground In Action

To demonstrate the possibilities the bot provides, I tried to make it give me some sample code by asking it to do the 
following:

```c
typedef struct node{
    char data;
    struct node *link;
} *List;

// Given the definition in C, write the code for the function insertNode() 
// where the function inserts a new node at the end of the given list.
```

In the instructions above, I provided the definition for a **linked list** in the C language where each node is connected 
through their `*link` pointers and the `*List` pointer points to the first node of the list. I asked it to write code for 
a function (important detail) which initializes the list to be used and with that, it answered with the following code:

```c
void insertNode(List* head, char data)
{
    // Create a new node
    List newNode = malloc(sizeof(struct node));
    newNode->data = data;
    newNode->link = NULL;

    List current;

    // If the list is empty, make the new node the head of the list
    if (*head == NULL)
    {
        *head = newNode;
    }
    else
    {
        // Traverse to the end of the list
        current = *head;
        while (current->link != NULL)
        {
            current = current->link;
        }

        // Insert node at the end of the list
        current->link = newNode;
    }
}
```

As you can see, OpenAI was able to generate the function's code with the provided instructions.

## Interpreting The Implementation

With the code provided, one would be able to observe that one way to insert into a linked list is by implementing the following
steps:

1. Initialize a new node by allocating space for it using `malloc()`.
2. Assign values to the structure's variables (`link` is assigned `NULL` as it will be at the end of the list).
3. Create a pointer-to-node variable `current` for list traversal (I recommend variable creations to be done at the start of the function as much as possible).
4. Check if the given list is empty. If it is, make the head point to the new node.
5. If the list isn't empty, traverse til the end and link the last node to the new node.

And viola! You have good clean study material for linked list initialization. Of course, you aren't limited to just this
function and are free to try it out yourself at the [OpenAI Playground website](https://beta.openai.com/)
 (you will be required to create an account first).

## Alright, So Spit Out The Catch Already!

The catch is that, as expected, it doesn't always generate functional code. Since the bot is generating code based off of
what it's learned from millions of lines of code made by humans, it is very prone to this unfortunate fact.

One of the most annoying things I've noticed is that it doesn't consider the fact that the code is supposed to be for a 
function outside of main and will therefore mistakenly **attempt to access structures without dereferencing** pointers. 
Other unwanted behavior I've noticed are:
- It **really** likes to use recursion even for the most basic loops (not ideal for me because I'm quite stingy with 
memory. Learn more about that <a href="https://www.youtube.com/watch?v=mMEmNX6aW_k" target="_blank">here</a>.)
- It sometimes uses variable names from other people's code.
- It can occasionally call functions that were never defined or provided in the instructions (especially bad when abstract
data types).
- It sometimes doesn't even provide code. It just tries to explain some part of your prompt unprovoked (easily fixed by
clicking the regenerate button).

These problems might not even be problems to the eagle-eyed veteran programmer who can easily provide solutions to them -
but for those who are trying to use the model as a learning tool it could go unnoticed and provide incorrect material for
ones studies.

## How Do I Deal With The Catch?

As many have learned throughout life: every mistake is an opportunity to learn. And this is no different. 

By knowing the potential errors that you may encounter while using the tool, you can learn a lot about the specified
topics such as learning how to convert a recursive function into a loop, learning how and when to dereference pointers
(or pointer arithmetic in general), and more! 

### Preparing By Learning

Since you're using the bot to study anyways, it wouldn't hurt to dive deeper into topics you might not have completely 
comprehended before. This might be the perfect time for you to finally sit down and brush up on pointers since by doing
so, you'd then enable yourself with the ability to use this powerful tool to its full potential with full confidence.

### Using A Good IDE

I would also like to suggest using it in conjunction with other tools such as an IDE in which you can copy and paste the
generated code into, attempt to compile it, and let the IDE do the error detection for you. 

For learning C, I would really recommend [CLion by JetBrains](https://www.jetbrains.com/clion/) as it is a complete IDE 
with a built in compiler, very accurate and descriptive pre-compilation error messages and highlighting (especially good 
with pointers), and the option to compile and run code through [Valgrind](https://valgrind.org/) - a tool that can 
automatically detect many memory management and threading bugs, and profile your programs in detail (really helpful when
using memory allocation). 

It might not be free for everyone as it is a paid product but JetBrains does provide [free
licenses](https://www.jetbrains.com/community/education/#students) for their entire development suite for people with 
valid **.edu** emails.

### Reading Documentation

By reading through the bot's documentation, you'd be able to identify its limitations beforehand. It would also be a great
idea to read through it in order to figure out the best practices for providing prompts.

### Keep Using It

Another, more fun way to figure out its best practices and limitations is to use the tool yourself - practicing in a way.
Every time you encounter an error you can either figure out a way to solve it or go the other direction and learn how to
avoid the wrong answers completely.

## Conclusion

The OpenAI Playground should in no way be seen as the end-all-be-all for obtaining study material for your pathway to 
perfect programming but it should definitely be in consideration if you need a quick and simple way to get at least an
idea of how to implement a certain algorithm you have in mind. 

As long as you prepare for the potential hundreds of regeneration attempts you'll have with it, 
[OpenAI Playground](https://beta.openai.com/playground) could most definitely be one of, if not your favorite, study buddies.