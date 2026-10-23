# Introduction to Data Science and Machine Learning

Course materials for **Introduction to Data Science and Machine Learning**, Department of Computer Science and Engineering,
University of Barishal. Course teacher: **Md Mahbub E Noor**, Assistant Professor.

The course starts from zero: no Python is assumed. Part 1 teaches Python step by step and ends with a **real spam detector**
built from 5,169 text messages. Part 2 turns to machine learning: charts and statistics, regression, classification, honest
evaluation, preparing features, clustering, and responsible use, with three practice classes and a final project.

**Website:** open `index.html` (or [here](https://mahbubnoor.github.io/data-science-and-machine-learning/)). Every lecture plays in the browser with
step-by-step slides, short videos and an interactive lab. Nothing needs to be installed.

## At a glance

- **14 lectures in 19 parts**, **3 practice classes** and a **project kick-off**: 23 sessions, 469 slides.
- **17 interactive labs**, one for every lecture from 2.2 on. They run in the browser, work without internet, and every
  number in them was checked against real Python 3, pandas and scikit-learn.
- **A 90-second recap video** for every lecture, plus short animations inside the slides.
- **A PDF handout** of every deck, with every step shown.

## How to study with these materials

1. **Before class:** skim the slides of the next lecture (*present* in the browser, or the PDF handout).
2. **In class:** the slides build up step by step. On "By hand" slides, predict the next row before it appears.
3. **After class:** watch the recap video, then open the lecture's lab and work through its four tabs. Tick the *Try this* boxes as you go.
4. **Homework:** every lecture from 2.2 on ends with a homework slide. Write the code yourself in **Jupyter Notebook** (offline)
   or **Google Colab** (online). The labs help you check your thinking; they do not replace writing the code.

Every code output on the slides is **real**: it was produced by running the code. Where randomness is involved
(`random_state`), you get the same numbers as the slides if you use the same settings.

## Using the slides

| Key or button | What it does |
|---|---|
| <kbd>→</kbd> <kbd>Space</kbd> / <kbd>←</kbd> | next step / back (clicking the right two thirds of a slide also goes forward, the left third back) |
| a number, then <kbd>Enter</kbd> | jump to that slide (or add `#12` to the address) |
| <kbd>[</kbd> <kbd>]</kbd> | previous / next session |
| <kbd>L</kbd> | open the lecture's lab |
| <kbd>S</kbd> | list of all slides |
| <kbd>F</kbd> | full screen (the bar hides itself) |
| <kbd>?</kbd> | all keys |

On a phone, swipe left or right, and turn the phone sideways for bigger slides.

## Part 1 · Data science: from Python to a spam detector

| No. | Topic | Slides | Handout | Lab | Recap video |
|---|---|---|---|---|---|
| 1 | Turning data into decisions (what data science is, and why it matters) | [present](lecture_01.html) | [PDF](slides/lecture_01.pdf) | – | [mp4](media/r1.mp4) |
| 2.1 | Getting started (running Python online in Colab and offline in Jupyter Notebook) | [present](lecture_2.1.html) | [PDF](slides/lecture_2.1.pdf) | – | [mp4](media/r21.mp4) |
| 2.2 | Hello, Python (your first lines of code: numbers, variables and text) | [present](lecture_2.2.html) | [PDF](slides/lecture_2.2.pdf) | [Variables Lab](labs/L2.2_Variables_Lab.html) | [mp4](media/r22.mp4) |
| 2.3 | Finding and fixing mistakes (reading error messages and debugging, step by step) | [present](lecture_2.3.html) | [PDF](slides/lecture_2.3.pdf) | [Debugging Lab](labs/L2.3_Debugging_Lab.html) | [mp4](media/r23.mp4) |
| 3.1 | Making decisions (if, elif, else, and match: teaching Python to choose) | [present](lecture_3.1.html) | [PDF](slides/lecture_3.1.pdf) | [Decisions Lab](labs/L3.1_Decisions_Lab.html) | [mp4](media/r31.mp4) |
| 3.2 | Lists and tuples (storing many values: a whole inbox in one variable) | [present](lecture_3.2.html) | [PDF](slides/lecture_3.2.pdf) | [Lists Lab](labs/L3.2_Lists_Lab.html) | [mp4](media/r32.mp4) |
| 3.3 | Loops (for, while, range, break: judging a whole inbox) | [present](lecture_3.3.html) | [PDF](slides/lecture_3.3.pdf) | [Loops Lab](labs/L3.3_Loops_Lab.html) | [mp4](media/r33.mp4) |
| 4.1 | Functions (write once, use everywhere, and how Python passes arguments) | [present](lecture_4.1.html) | [PDF](slides/lecture_4.1.pdf) | [Functions Lab](labs/L4.1_Functions_Lab.html) | [mp4](media/r41.mp4) |
| 4.2 | Counting words with dictionaries (the idea behind real spam filters) | [present](lecture_4.2.html) | [PDF](slides/lecture_4.2.pdf) | [Word Counting Lab](labs/L4.2_Word_Counting_Lab.html) | [mp4](media/r42.mp4) |
| 5 | Real data with pandas (exploring 5,572 real text messages) | [present](lecture_05.html) | [PDF](slides/lecture_05.pdf) | [Real Data Lab](labs/L5_Real_Data_Lab.html) | [mp4](media/r5.mp4) |
| 6 | Build a real spam detector (from 5,169 messages to a working model, step by step) | [present](lecture_06.html) | [PDF](slides/lecture_06.pdf) | [Spam Model Lab](labs/L6_Spam_Model_Lab.html) | [mp4](media/r6.mp4) |

## Part 2 · Machine learning

| No. | Topic | Slides | Handout | Lab | Recap video |
|---|---|---|---|---|---|
| 7 | Seeing data (charts and basic statistics: the foundation of machine learning) | [present](lecture_07.html) | [PDF](slides/lecture_07.pdf) | [Charts Lab](labs/L7_Charts_Lab.html) | [mp4](media/r7.mp4) |
| 8 | What is machine learning? (learning from examples: the ideas behind every model) | [present](lecture_08.html) | [PDF](slides/lecture_08.pdf) | [What is ML? Lab](labs/L8_What_is_ML_Lab.html) | [mp4](media/r8.mp4) |
| 9 | Regression (predicting numbers with a straight line) | [present](lecture_09.html) | [PDF](slides/lecture_09.pdf) | [Regression Lab](labs/L9_Regression_Lab.html) | [mp4](media/r9.mp4) |
| 10 | Classification (k-nearest neighbours and decision trees) | [present](lecture_10.html) | [PDF](slides/lecture_10.pdf) | [Classifier Lab](labs/L10_Classifier_Lab.html) | [mp4](media/r10.mp4) |
| P1 | Practice class: Regression and classification (hand calculations first, then code) | [present](practice_1.html) | [PDF](slides/practice_1.pdf) | – | – |
| 11 | Evaluating models properly (overfitting, cross-validation, precision and recall) | [present](lecture_11.html) | [PDF](slides/lecture_11.pdf) | [Evaluation Lab](labs/L11_Evaluation_Lab.html) | [mp4](media/r11.mp4) |
| 12 | Preparing features (missing values, categories, scaling and pipelines) | [present](lecture_12.html) | [PDF](slides/lecture_12.pdf) | [Feature Prep Lab](labs/L12_Feature_Prep_Lab.html) | [mp4](media/r12.mp4) |
| P2 | Practice class: Evaluation clinic (find the mistakes in four experiments, then fix them) | [present](practice_2.html) | [PDF](slides/practice_2.pdf) | – | – |
| 13 | Unsupervised learning (finding groups without labels: k-means clustering) | [present](lecture_13.html) | [PDF](slides/lecture_13.pdf) | [Clustering Lab](labs/L13_Clustering_Lab.html) | [mp4](media/r13.mp4) |
| P3 | Practice class: A complete mini-project (recognising handwritten digits, from question to report) | [present](practice_3.html) | [PDF](slides/practice_3.pdf) | – | – |
| 14 | Responsible ML and what's next (fairness, privacy, and a first look at neural networks) | [present](lecture_14.html) | [PDF](slides/lecture_14.pdf) | [Responsible ML Lab](labs/L14_Responsible_ML_Lab.html) | [mp4](media/r14.mp4) |
| Project | Your machine learning project (choosing a question, finding data, and planning honest evaluation) | [present](project_kickoff.html) | [PDF](slides/project_kickoff.pdf) | – | – |

Lectures 2, 3 and 4 have several parts (for example 3.1, 3.2, 3.3); each part is one class. Lecture 1 also has an
[interactive spam filter demo](spam-demo.html): rules versus learning.

## Labs

Each lab has four tabs. Open it from the "Interactive lab" slide of its lecture, from the course home page, or start at
[labs/START_HERE.html](labs/START_HERE.html). The bar on top of every lab goes back to the slides, or to the previous or next lab.

| Lecture | Lab | The four tabs |
|---|---|---|
| 2.2 | [Variables Lab](labs/L2.2_Variables_Lab.html) | Memory boxes · Operators · Text tools · f-strings |
| 2.3 | [Debugging Lab](labs/L2.3_Debugging_Lab.html) | Error decoder · Logic error hunt · Notebook trap |
| 3.1 | [Decisions Lab](labs/L3.1_Decisions_Lab.html) | Grade machine · and · or · not · Spam rule tester · match-case |
| 3.2 | [Lists Lab](labs/L3.2_Lists_Lab.html) | List playground · Slicing · Ask the list · Two names, one list |
| 3.3 | [Loops Lab](labs/L3.3_Loops_Lab.html) | Loop stepper · range() explorer · Nested loop grid · Predict the loop |
| 4.1 | [Functions Lab](labs/L4.1_Functions_Lab.html) | Call visualiser · Argument matcher · Change or move? · Write and test |
| 4.2 | [Word Counting Lab](labs/L4.2_Word_Counting_Lab.html) | Split and clean · Dictionary builder · Spam vs normal · Spam score |
| 5 | [Real Data Lab](labs/L5_Real_Data_Lab.html) | Look inside · Word clues · Group and compare · Duplicates |
| 6 | [Spam Model Lab](labs/L6_Spam_Model_Lab.html) | Split · Words to numbers · Train and evaluate · Try your own |
| 7 | [Charts Lab](labs/L7_Charts_Lab.html) | Mean, median, spread · Histogram · Scatter and correlation · Box plot |
| 8 | [What is ML? Lab](labs/L8_What_is_ML_Lab.html) | Sort the tasks · Be the model · Same pattern, any model · Memorise or generalise |
| 9 | [Regression Lab](labs/L9_Regression_Lab.html) | Fit by hand · Outliers and extrapolation · Real data: diabetes · What R² means |
| 10 | [Classifier Lab](labs/L10_Classifier_Lab.html) | k-NN by hand · Decision boundaries · Read the tree · Compare the models |
| 11 | [Evaluation Lab](labs/L11_Evaluation_Lab.html) | Underfit and overfit · Choose depth honestly · Precision and recall · The accuracy trap |
| 12 | [Feature Prep Lab](labs/L12_Feature_Prep_Lab.html) | Missing values · Categories to numbers · Scaling and neighbours · Data leakage |
| 13 | [Clustering Lab](labs/L13_Clustering_Lab.html) | k-means by hand · Watch k-means · Choose k · Limits of k-means |
| 14 | [Responsible ML Lab](labs/L14_Responsible_ML_Lab.html) | Check every group · Privacy · One neuron · A small network |

### Software for the homework

* **Offline (lab PCs):** [Anaconda](https://www.anaconda.com/download) includes Python, Jupyter Notebook, pandas, matplotlib
  and scikit-learn. Lecture 2.1 shows how to start Jupyter.
* **Online:** [Google Colab](https://colab.research.google.com) needs only a Google account; everything is already installed.
* Without Anaconda: `pip install notebook pandas matplotlib scikit-learn`

## Data

| File | What it is | Used in |
|---|---|---|
| [data/sms.tsv](data/sms.tsv) | SMS Spam Collection: 5,574 labelled text messages (T. A. Almeida and J. M. Gómez Hidalgo, UCI Machine Learning Repository, 2011) | Lectures 5, 6, 7 |
| [data/students.csv](data/students.csv) | 150 **invented** student records, made for this course (some values are missing on purpose) | Lectures 7, 12, 13, 14 |

Put the file in the same folder as your notebook. All other datasets (iris, wine, breast cancer, diabetes, digits) are built into scikit-learn.

## Use it offline

Everything is in this repository: slides, videos, labs, data and fonts. Download it (**Code → Download ZIP**), unzip,
and open `index.html` in any browser. No internet and no installation needed. To use only the labs on a lab PC,
copy the `labs/` folder and open `labs/START_HERE.html`.

## Repository layout

```
index.html          course home: every session with its slides, lab, recap video and handout
lecture_*.html      the lectures, practice_*.html the practice classes, project_kickoff.html the project
labs/               17 interactive labs and START_HERE.html
slides/             PDF handouts
media/              videos and their poster images
figs/               figures used on the slides
data/               sms.tsv and students.csv
assets/             slide styles (deck.css), the slide viewer (viewer.js, viewer.css) and the fonts
```

## Credits

* SMS Spam Collection: T. A. Almeida and J. M. Gómez Hidalgo, UCI Machine Learning Repository (2011).
* Other datasets: scikit-learn (iris, wine, breast cancer, diabetes, digits).
* IBM Plex Sans and Mono fonts: SIL Open Font License 1.1 (`assets/fonts/OFL.txt`).
* Slides, figures, videos and labs were made for this course by Md Mahbub E Noor.
