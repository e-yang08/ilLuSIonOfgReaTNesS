---
title: 'Awesome App'
disqus: hackmd
---

Awesome App
===
<!-- ![downloads](https://img.shields.io/github/downloads/atom/atom/total.svg)
![build](https://img.shields.io/appveyor/ci/:user/:repo.svg)
![chat](https://img.shields.io/discord/:serverId.svg)
 -->
 
:::success
Welcome! Thank you for visiting our page.
It is a mobile application created by 4 passionate women engineering students to elevate women's safety.

Submitted to Black Wings Hack 2024 as a team `Illution of Greatness`


Contributed by [Alina](https://www.linkedin.com/in/alina-erofeeva-minerva), [Erela](https://linkedin.com/in/erela-yang-snow), [Ivanna](https://www.linkedin.com/in/ivanna-kreshchenetska/), & [Polina](https://www.linkedin.com/in/polina-vishnevskaya/) with <33
:::

**Table of Contents**

[TOC]

## How to use our product
There are following two ways to check our product
- A: Clone repository
- B: Access Expo Go website

**A: Clone repository**
1. Clone our repository
2. `npm install` to install dependencies
3. Install `ExpoGo` from App Store
4. `npx expo start`

**B: Access Expo Go website**

User flows
---

In the following user flows, we show 
- the user registration process (Numbered `1-4`)
- 2 features
    - A: Safety level check upon location search
    - B: Check route to the closest safe spot when you're in danger

```sequence
User->OUR APP: 1. Register App

Note right of OUR APP: 2. Store user info & emergency contacts

OUR APP->User: 3. Ask location sharing

User ->OUR APP: 4. Share Location

User--> OUR APP: A.Check the safety of area

Note right of OUR APP: (Render Google Map)

User--> OUR APP: B1. Check routes to the safe spot nearby

OUR APP-->Google Map: B2. Redirect users for routing
```

Project Timeline
---

```mermaid
gantt
    dateFormat YYYY-MM-DD HH:mm
     axisFormat %I%p

Brainstorm Ideas: milestone, m1, 2024-02-02 21:00, 1m

Start Hacking: milestone, m1, 2024-02-03 11:00, 1m
section Frontend
    User authentication :fr, 2024-02-03 11:00, 2024-02-03 14:00
    Map :fr2, 2024-02-03 13:00, 2024-02-03 22:00

    section Backend
    Location Sharing :ba, 2024-02-03 13:00, 2024-02-03 15:00
    Map Interaction :ba2, 2024-02-03 14:00, 2024-02-03 23:00
    Map Shading :ba3, 2024-02-03 19:00, 2024-02-03 23:00
    Map Routing :ba4, 2024-02-03 22:00, 2024-02-04 00:00
    Location Search :ba5, 2024-02-03 23:00, 2024-02-04 03:00

Final Submission: milestone, m1, 2024-02-04 16:00, 1m
```

Future Ideas
---
If we have more time to develop, here are some  features we find meaningful to implement on top of the current version.
- widget on mobile devices to activate the nearest safe location search
- call car-sharing application/taxi to pick up when you're in danger
- motion tracker with Machine Learning


## Appendix and FAQ