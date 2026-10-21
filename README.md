# Introduction to Data Science and Machine Learning: course slides

Md Mahbub E Noor · University of Barishal

Open **index.html** to see all lectures. Each lecture opens in the browser with
step-by-step diagrams and embedded videos. No installation is needed, and the
folder also works offline: download it and open `index.html` in any browser.

## Publishing on GitHub Pages
1. Create a repository (for example `intro-ds-ml`) and upload the contents of this folder
   so that `index.html` is at the top level of the repository.
2. In the repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   choose the `main` branch and the `/ (root)` folder, then **Save**.
3. After a minute or two the site is live at `https://<your-username>.github.io/intro-ds-ml/`.

## Navigating a lecture
The bar on top of every lecture: ⌂ course home, ◀ ▶ previous / next session, a menu of all sessions, the lab, the step counter,
☰ slide list, PDF, Notes (instructor edition), full screen and ? for keys.
Keys: → / Space next step, ← back, a number + Enter to jump, [ ] previous / next session, L lab, S slide list, F full screen, N speaker notes.
Clicking the right two thirds of a slide goes forward, the left third back. Add `#12` to a lecture's address to open slide 12.

## Interactive labs
The `labs/` folder has 17 interactive labs (Lectures 2.2 to 14). Each lecture with a lab has an
"Interactive lab" slide with an **Open the lab** button. All labs: `labs/START_HERE.html`.
The labs need no internet and no installation; every number in them was checked against Python,
pandas or scikit-learn.

## Data
- `data/sms.tsv`: SMS Spam Collection, T. A. Almeida and J. M. Gómez Hidalgo,
  UCI Machine Learning Repository (2011).
- `data/students.csv`: invented records made for this course.
Other datasets are built into scikit-learn.

## Editions
This is the instructor edition: `notes/` holds the speaker notes (Notes button, key N) and `decks/` the PowerPoint files. Delete both folders to make a student edition.
