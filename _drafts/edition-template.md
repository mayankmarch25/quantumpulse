---
title: "Clean title, no edition number"
description: "One to two sentences. Shown under the title, on the homepage card, in the archive and in link previews."
edition: 2
category: Core concepts
tags: [Computing]
maths: [Complex numbers]
read_time: 10
next_title: "Edition 3: ..."
summary:
  - "Line one. The whole idea in plain words."
  - "Line two."
  - "Line three."
outcomes:
  - "Something the reader can now do or explain"
  - "Another"
terms: [Term, Term]
remember:
  - "Sentence one."
  - "Sentence two."
  - "Sentence three."
---
<div class="jump">
<span>IN THIS EDITION</span>
<a href="#s1"><b>1</b> First section</a>
<a href="#s2"><b>2</b> Second section</a>
<a href="#maths"><b>M</b> The maths you need</a>
</div>

Opening paragraph. Name the reader’s assumption, then say what they are missing.

<h2 id="s1"><span class="n">1 OF 2</span>First section</h2>

Three short sentences. Then the figure.

{% include figures/bloch.html num="1" angle="45" title="What the figure shows." caption="What to notice." %}

<h2 id="s2"><span class="n">2 OF 2</span>Second section</h2>

Prose in Markdown. **Bold** for the one term being defined.

<section class="maths" id="maths">
<h2>The maths you need, this edition</h2>
<p class="sub">One or two rules, each tied to a figure above.</p>
<ol>
<li><strong>Rule.</strong> Plain words first, then the line of symbols.
<div class="eq">symbols here</div>
</li>
</ol>
<p style="margin-top:16px"><span class="cond">Where this shows up in a qubit:</span> for Part I editions, the closing figure and one paragraph tying the chapter to a quantum idea.</p>
</section>

<div class="cover">
<div>
<h3>Covered this edition</h3>
<ul><li>Concept</li></ul>
<h3 style="margin-top:14px">Introduced, own edition later</h3>
<ul class="touched"><li>Concept</li></ul>
</div>
<div>
<h3>What this edition did not do</h3>
<ul class="not"><li>The condition that limits it, and the risk still open.</li></ul>
</div>
</div>

### Where this came from

- Source, chapter or page. One line on what was taken from it.
