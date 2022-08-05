---
title: 'Study Buddies: Utilizing OpenAI for Programming Studies'
layout: post
comments: false
tags: Academics
excerpt_separator: "<!--more-->"
sticky: false
---

As I go through uni, I've noticed that a lot of my classmates seem to struggle when it comes to preparing for exams that include writing actual code especially for the language C. <!--more-->

After multiple discussions and group-studying sessions, I've come to the conclusion that it's mostly due to the fact that they don't have samples of code to base their studies on. That's where OpenAI comes into play.

<br>

![OpenAI](/assets/pics/ai.webp)
*OpenAI working with instructions*

<br>

# Getting Sample Code from OpenAI

To demonstrate the possibilities the bot provides, I asked it to do the following:

```c
typedef struct node{
    char data;
    struct node *link;
} *List;

Given the definition in C, write the code for the function insertNode() where the function inserts a new node at the end
of the given list.
```

And it answered with the following code:

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

# Interpreting the Implementation

With the code it provides, one would be able to observe that one way to insert into a linked list is by implementing the following
steps:

1. Initialize a new node by allocating space for it using `malloc()`.
2. Assign values to the structure's variables (`link` is assigned `NULL` as it will be at the end of the list).
3. Create a pointer-to-node variable `current` for list traversal (I recommend variable creations to be done at the start of the function as much as possible).
4. Check if the given list is empty. If it is, make the head point to the new node.
5. If the list isn't empty, traverse til the end and link the last node to the new node.

