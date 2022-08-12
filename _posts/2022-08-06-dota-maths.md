---
//: null
published: true
---
---
title: Mathematics in Dota 2
layout: post
subtitle: Interesting Math Implementations
header-img: img/in-post/2022/oracle.png
header-style: text

header-hide-desc: false

catalog: true
katex: true
chart: false
mermaid: false
comments: true

tags:
- "Dota 2"
- "Video Games"
---

![Oracle from Dota 2](/img/in-post/2022/oracle.png)

In video games, when a character has a 10% chance to trigger an effect during a certain action, then you would expect that
event to occur at least once in 10 attempts. However with true random number generation, that isn't quite how it works. <!--more-->

## Pseudo Random Generation

The first attempt will have a lower chance than the intended percentage. However, succeeding attempts will consistently raise the chance. This is to ensure that the effect will occur at least once in the expected number of attempts.

![Spirit Breaker](/img/in-post/2022/breaker.png)
*Spirit Breaker*
{:.desc}

## Math

Inline math: $$ E = mc^2 $$

inline: $$f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2 \pi i \xi x} \,d\xi$$
display mode (centered):

$$f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2 \pi i \xi x} \,d\xi$$
