---
title: "A bit, a coin and a qubit"
description: "A bit is a switch. A coin is a probability. A qubit is neither, and every hard idea in this subject starts from that difference. Six moving pictures, two sliders, and the only two pieces of maths you need today."
edition: 1
category: Core concepts
tags: [Computing, Qubit, Superposition, Measurement]
maths: [Vectors, Probability]
read_time: 12
next_title: "Edition 2: Why quantum computing, and what the book promises"
summary:
  - "A bit is a switch: 0 or 1, and looking at it changes nothing."
  - "A coin is a probability: one flip tells you one result, many flips tell you the odds."
  - "A qubit is an arrow: the angle sets the odds, and looking at it snaps it to an end."
outcomes:
  - "Say what a qubit is without using the word “both”"
  - "Explain why one measurement tells you almost nothing, and a tally tells you a lot"
  - "Show, with real numbers, why a qubit is not a fancy coin"
terms: [Bit, Qubit, Superposition, Amplitude, Measurement, Interference, Pulse]
remember:
  - "Probability is amplitude squared. This one rule runs the whole subject."
  - "Measuring snaps the arrow to 0 or 1 and the angle is lost. To learn the angle you need many fresh copies."
  - "Amplitudes can be negative, so they can cancel. Probabilities cannot. That is the difference between a qubit and a coin."
---
<div class="jump">
<span>IN THIS EDITION</span>
<a href="#s1"><b>1</b> The bit</a>
<a href="#s2"><b>2</b> The coin</a>
<a href="#s3"><b>3</b> The qubit</a>
<a href="#s4"><b>4</b> Measurement</a>
<a href="#s5"><b>5</b> Why it is not a coin</a>
<a href="#s6"><b>6</b> The pulse</a>
<a href="#maths"><b>M</b> The maths you need</a>
</div>

Most explanations of quantum computing start with the word “both”. A qubit is both 0 and 1. That is where most people stop understanding, because that is not what a qubit is. This edition builds the idea from three things you already know: a switch, a coin, and an arrow.

By the end you will be able to say, in one line each, what a bit is, what a coin is, what a qubit is, and why the third one is not a fancy version of the second. The maths is at the bottom, and it is two rules.

<h2 id="s1"><span class="n">1 OF 6</span>The bit is a switch</h2>

A bit is a switch. It is 0 or 1. Nothing in between, and you can look at it as often as you like without changing it. A laptop’s storage holds a few trillion of them, and every one of them is in exactly one of two states right now.

{% include figures/switch.html num="1" title="A bit. Two states. Reading it changes nothing." caption="This is the whole of classical computing in one picture. Everything a normal computer does is a very large number of these, flipped very fast." %}

<h2 id="s2"><span class="n">2 OF 6</span>The coin is a probability</h2>

A coin before you look is a probability. Heads with some chance, tails with the rest. The two chances add up to 1. Flip it many times and the chances show up as counts. One flip tells you one result, not the chance.

That last sentence matters more than it looks. A single flip never reveals whether the coin is fair. Only a tally does.

{% include figures/coin.html num="2" title="A coin. One flip gives one result. Many flips reveal the odds." caption="Flip once and you learn one thing. Flip twenty times and the heads share drifts toward one half. The coin never knew it was fair. The tally found out." %}

<h2 id="s3"><span class="n">3 OF 6</span>The qubit is an arrow</h2>

A qubit is an arrow. Pointing straight up means 0. Straight down means 1. Anywhere in between is allowed, and the angle decides the odds of what you will see when you look.

Drag the slider. Watch two things at once: the arrow tilts, and the two bars change. The bars are what you would get if you measured many fresh copies of this arrow and tallied the results, exactly like the coin.

{% include figures/bloch.html num="3" angle="60" title="A qubit. The angle sets the odds." caption="Straight up: 100% zero. Straight down: 100% one. Halfway (90°): 50/50, which looks exactly like a fair coin. Keep this in mind for Figure 5." %}

Notice what the arrow is not. It is not “both 0 and 1”. It is a definite direction that happens not to be either end. The word for a tilted arrow is **superposition**, and that is all the word means.

<h2 id="s4"><span class="n">4 OF 6</span>Measuring forces the arrow to pick</h2>

Measuring a qubit forces it to pick. The arrow snaps straight up or straight down, and stays there. You get one bit out. The angle is gone. To learn the angle, you need many fresh copies and a tally, exactly as you needed many flips to learn the coin.

This is the first thing that confuses people. A qubit holds an angle, but it will only ever give you a bit.

{% include figures/bloch.html num="4" mode="measure" angle="60" title="Measurement. One look, one bit, angle gone." caption="Press Measure once. The arrow snaps to an end and the tally moves by one. Press Measure 50 fresh copies and watch the observed share settle near the expected one. Any single result tells you almost nothing." %}

<h2 id="s5"><span class="n">5 OF 6</span>Why a qubit is not a coin</h2>

At 90° the qubit looked exactly like a fair coin: 50/50. So why not just use coins? Here is the difference. It is the most important idea in the whole subject.

Shuffle a coin twice and it is still 50/50. Rotate a qubit by a quarter turn twice and it is back at 0, with certainty. The second rotation undid the first. Nothing you can do to a coin undoes randomness, because a coin only has probabilities. A qubit has amplitudes, and amplitudes can cancel.

{% include figures/compare.html num="5" title="Same operation, done twice. The coin stays random. The qubit comes back." caption="After the first step both sides read 50/50 and look identical. After the second step the coin is still 50/50 and the qubit is back at 0 with certainty. The quarter turn is called a Hadamard gate. Applying it twice is the simplest example of interference: two routes to 1 cancelled each other out. The maths box shows the cancellation with real numbers." %}

<h2 id="s6"><span class="n">6 OF 6</span>How you tilt the arrow: a pulse</h2>

In a real machine nobody drags a slider. The arrow is tilted with a pulse: a short burst of microwave or laser energy, shaped and timed so the arrow turns by exactly the angle you want. A pulse that takes the arrow all the way from 0 to 1 is called a π pulse. Half of it gets you to the equator.

That waveform is the one on the masthead of this site. Here it is doing its job.

{% include figures/pulse.html num="6" title="A π pulse drives the arrow from 0 to 1." caption="The grey curve is the pulse envelope; the oscillation inside it is the carrier, at the qubit’s own frequency. The arrow turns only while the pulse has energy. So the shape and length of the pulse decide how well the qubit is controlled." %}

<section class="maths" id="maths">
<h2>The maths you need, this edition</h2>
<p class="sub">Two rules. Both are about the arrow in Figure 3. Nothing here needs more than squaring a number.</p>
<ol>
<li>
<strong>Two numbers describe the arrow.</strong> Call them <span class="k">a</span> and <span class="k">b</span>. They are called amplitudes. Physicists write the arrow as
<div class="eq">|ψ⟩ = a |0⟩ + b |1⟩ <small>&nbsp;&nbsp;|0⟩ is just a name for “up”, |1⟩ for “down”</small></div>
<strong>Rule 1:</strong> the arrow has length 1, so
<div class="eq">a² + b² = 1</div>
That is the only constraint. Any pair of numbers that squares to 1 is an allowed qubit.
</li>
<li>
<strong>Rule 2: probability is amplitude squared.</strong> Look at the arrow, and you get 0 with probability <span class="k">a²</span>, 1 with probability <span class="k">b²</span>. Rule 1 guarantees the two probabilities add to 1, so the coin picture still works.
<div class="eq">P(0) = a² &nbsp;&nbsp;&nbsp; P(1) = b²</div>
Try it. Slide <span class="k">a</span> below zero and watch the bars.
{% include figures/amplitude.html a="0.6" caption="a = 0.6 and a = −0.6 give the same bars. The sign is invisible to a measurement. It is not invisible to a second rotation, which is the point of the next item." %}
</li>
<li>
<strong>Why Figure 5 works: the minus sign.</strong> The quarter turn (Hadamard) sends the two ends to
<div class="eq">|0⟩ → (0.71, 0.71) &nbsp;&nbsp;&nbsp; |1⟩ → (0.71, −0.71) <small>&nbsp;&nbsp;0.71 is 1/√2, so each squares to 0.5</small></div>
Start at 0, apply it twice, and track the two numbers:
<table class="tbl">
<tr><th>step</th><th>a (for 0)</th><th>b (for 1)</th><th>P(1) = b²</th></tr>
<tr><td>start</td><td>1</td><td>0</td><td>0%</td></tr>
<tr><td>after 1st turn</td><td>0.71</td><td>0.71</td><td>50%</td></tr>
<tr><td>after 2nd turn</td><td>0.71·0.71 + 0.71·0.71 = <b>1</b></td><td>0.71·0.71 <span class="neg">− 0.71·0.71</span> = <b>0</b></td><td>0%</td></tr>
</table>
The two contributions to <span class="k">b</span> are equal and opposite, so they cancel. A coin has no minus sign to cancel with, so its 50% can never go back to 0%. That cancelling is called interference. Every quantum speed-up ever proposed is a bigger version of this same trick.
</li>
<li>
<strong>The angle, for completeness.</strong> If the arrow is at angle θ from the top, then <span class="k">a = cos(θ/2)</span> and <span class="k">b = sin(θ/2)</span>. Since cos² + sin² = 1 for any angle, Rule 1 is automatic. That is why Figure 3 can use one slider for two numbers.
</li>
</ol>
<p style="margin-top:16px"><span class="cond">Where this goes next:</span> this edition was a preview. From here the blog follows <em>Dancing with Qubits</em> in the book’s own order: why quantum (chapter 1), then the maths chapters 2 to 6, then back to the qubit with everything in hand. Today the arrow lived on a flat circle; the missing direction, phase, arrives with complex numbers in chapter 3.</p>
</section>

<div class="cover">
<div>
<h3>Covered this edition</h3>
<ul>
<li>Bit versus qubit: a switch versus an arrow</li>
<li>Superposition: the arrow tilted, not “both”</li>
<li>Measurement: one look, one bit, angle gone</li>
</ul>
<h3 style="margin-top:14px">Introduced, own edition later</h3>
<ul class="touched">
<li>The Bloch sphere (drawn flat today)</li>
<li>Interference (seen once, in Figure 5)</li>
<li>Pulses (seen once, in Figure 6)</li>
</ul>
</div>
<div>
<h3>What this edition did not do</h3>
<ul class="not">
<li>It drew the arrow on a circle. The real object is a sphere, and the extra direction is phase. That needs complex numbers, which come with chapter 3 of the book.</li>
<li>It treated the qubit as perfect. Real ones drift on their own, some within microseconds. That is decoherence, and it comes after gates.</li>
<li>It used one qubit. Almost everything interesting needs two, and two is not twice one. That is tensor products.</li>
</ul>
</div>
</div>

### Where this came from

- Nielsen and Chuang, *Quantum Computation and Quantum Information*, Chapter 1. The standard textbook; the arrow and the two rules are its opening pages, in heavier notation.
- Matuschak and Nielsen, *Quantum Country*, “Quantum computing for the very curious”. Free, online, and the clearest treatment of amplitudes versus probabilities I have found.
- IBM Quantum Learning, “Basics of quantum information”. Free course that starts from the same two rules.

<p class="small-note">Nothing above is copied from these sources. The pictures and numbers are my own. If you find a mistake, write to me and I will add the correction here with a date.</p>
