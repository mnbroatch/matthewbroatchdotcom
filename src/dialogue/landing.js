// Yarn Language dialogue for the landing hero. Export as string for DialogueTree.
// Commands: <<useDefaultNode>> = next line uses default node; <<useCustomNode>> = use custom node again.
export const landingDialogue = `
title: Start
---
Welcome! Explore some things built by developer Matthew Broatch
Starting with me, the very dialogue component you're talking to!
  -> Tell me more!
    <<jump TellMeMore>>
  -> What else ya got?
    <<jump WhatElse>>


<<useDefaultNode>>
Have a look around.
<<useCustomNode>>
See you.
===

title: TellMeMore
---
All right! Yarn is a language for making videogame-style dialogues.
<<useYarnCodeNode>>
It looks like this:
<<useCustomNode>>
  -> Ew, I can see your code...
Ahem! Matthew Broatch did a full rewrite of the JavaScript interpreter to bring it from version 1.0 to version 2.0, and created a user-friendly API for it called YarnBound.
He also made a React component to run dialogues in React apps!
<<useWavyNode>>
It's Meee!!!
<<useCustomNode>>
ReactDialogueTree, at your service.
  -> Nice to meet you.
Likewise! One other thing, I am customizable! I'll show you my true (default, anyway) form:
<<useDefaultNode>>
I have a history feature and everything!
<<useCustomNode>>
<<jump WhatElse>>
===

title: WhatElse
---
Scroll down to check out Matthew's other projects! The libraries have NPM links with documentation on GitHub so you can use them today in your own projects!
Oh, and don't forget to download a resume... I hear Matthew is available for work!
===
`
