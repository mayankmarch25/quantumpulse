# Figure library

Reusable, animated figures. Drop one into any edition with a single include line. All wiring lives in `assets/js/figures.js`; nothing to script per edition.

| Include | What it shows | Parameters |
|---|---|---|
| `figures/switch.html` | A bit as a flipping switch | `num`, `title`, `caption` |
| `figures/coin.html` | A coin with flip buttons and a running tally | `num`, `title`, `caption` |
| `figures/bloch.html` | A qubit arrow with an angle slider and probability bars | `num`, `title`, `caption`, `angle` (default 60), `mode` = `slider` (default) or `measure` (adds measure buttons and a tally) |
| `figures/compare.html` | Coin versus qubit, same operation twice | `num`, `title`, `caption` |
| `figures/pulse.html` | A π pulse driving the arrow from 0 to 1 | `num`, `title`, `caption` |
| `figures/amplitude.html` | Amplitude slider showing probability = amplitude squared | `a` (default 0.6), `caption` |

Example:

    {% include figures/bloch.html num="3" mode="measure" angle="60" title="Measurement. One look, one bit." caption="Press Measure once." %}

Rules: keep captions in double quotes with no double quotes inside; use ’ for apostrophes. Several copies of the same figure on one page are fine; each instance is self-contained.

To add a new figure: create `_includes/figures/<name>.html` with `data-fig="<name>"` on the outer `.fig` div, then add an initialiser under that name in `assets/js/figures.js`.
