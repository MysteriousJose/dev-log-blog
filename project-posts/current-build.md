---
title: ScorePlus - Linux Release
date: 2026-11-11
---
Original Windows Release: [Github](https://github.com/lhultimate/ScorePlus)

My  Linux Fork:  [Github](https://github.com/MysteriousJose/ScorePlus-Linux)


This is where I will talk about my progress and what I have completed so far. Right now the best way to run it on anything other than windows is your translation app of choice, linux being [Wine](https://www.winehq.org/).

Today Oct 31st, I updated my fork and started seeing what I could do. As this program is fully windows only functions I will have to do a full rebuild.


On nov 2nd I got all smoke tests prebuilt from LHUltimate recoded and working on my base rewrite to avalonia.


As of now Nov 7th I have rebuilt most windows and amd starting to work on the connecting services. I still have no proof it works, because the AI is keeping that process for later.

Now November 11th my first build is almost ready and I have improved my AI assistants speeds to over 100 tokens per second. LHUltimate also made a website for the project [here](https://lhultimate.github.io/ScorePlus/)

November 14th I connected all the free apis I could find to my agent Hub if you will of QFN and had them get to work on build errors, we are down to 13 errors. AYYYY! no more build errors ```129 Warning(s) 0 Error(s)```, those warnings are crucial. Atleast on my machine both windows open.... and are blank. Will get working on that asap. For now this will be my first merge into the main upstream repo.

November 16th, all build errors cleared, github actions made, first release created.

November 17th, WE ARE OFFICIALY UP TO DATE WITH WINDOWS WOOHOO. I may have skipped intermeieary alpha releases but all features are in the beta release anyways so why would I make one for each version?

November 21st. Well I see now why linux is hard to develop for, everyone has different machines, things that work on mine don't always work on everyone elses.