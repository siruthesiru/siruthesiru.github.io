---
title: Common Mistakes With Pointers (in C)
layout: post
subtitle: A few notes from past me.
header-img: ''
header-style: text
header-hide-desc: false
catalog: true
katex: false
chart: false
mermaid: false
comments: true
tags:
- Guides
- C Language

---
I'm not ashamed to say that I did indeed struggle with learning and mastering pointers. As a matter of fact, I **still** make mistakes accessing parts of a structure if it involves a pointer or two. This article will discuss these mistakes and more in detail to serve as a cautionary tale for those learning how to work with pointers and their arithmetic behavior.

## Initialization vs Accessing

A common mistake people make is trying to access pointer values the same way the initialize the variable.

```c
int main(){
	int age = 22;
	int *agePtr;

	agePtr = age;
}
```