---
name: Classification and Regression
layout: post
author: yannidd
abstract: ooooo
---
<!----------------------------------------------------------------------------->
{% capture images_dir %}
/assets/images/posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.title | remove: " -" | replace: " ", "-" | downcase }}
{% endcapture %}

{% capture report_pdf_dir %}
/{{ images_dir }}/report.pdf
{% endcapture %}

<!----------------------------------------------------------------------------->

This is my report for a coursework from the Foundations of Machine Learning course I took at the University of Southampton. The tasks were:
 - Implementing and analysing Fisher's LDA for binary classification by finding the best projection vector (by looking at all possible vectors).
 - Finding the optimal vector by solving the generalised eigenvalue condition for optimal weights and using it to perform LDA on the Iris dataset.
 - Implementing and performing linear regression with non-linear functions (analytically and with gradient descent).
 - Analysing how gradient descent generalises (looking at the bias-variance tradeof).

All algorithms were implemented from scratch in `Python` and `matplotlib` was used for the plots. I apologise for any unclarities, I had to cram everything in six A4 pages with the tightest margins. 

<h1>1. Separating Two Gaussians</h1>
The covariance matrices were calculated using (1) [1]:
<div class="eqn">
  $$\
  \Sigma = 
  \begin{pmatrix} 
    S_x^2 & \rho S_X S_Y \\ 
    \rho S_X S_Y & S_Y^2 
  \end{pmatrix} 
  $$
  <div class="eqncaption">
    (1)
  </div>
</div>

Figure 1 shows the histograms of the two classes projected on three different direction vectors. The expectation is that a vector $\omega$ which is parallel to the centroids of the two distributions (Figure 1 - left) would result in a good separation of the projected histograms. On the other hand, $\omega$ that is perpendicular to the centroids (Figure 1 - right) results in an overlap. The subplot in the middle shows a vector which is in between the mentioned extremes. The results match the expectations. The middle plot has a clearer separation than the right one, but a worse separation than the one to the left.

<figure>
  <img src="{% asset_path /image001.png %}">
  <figcaption>
    Figure 1. The probability densities of $x_a$ and $x_b$ projected on three different direction vectors $\omega$. In addition to the histograms, there is a KDE plot (solid line) and the actual gaussian distribution derived from the generating parameters (dashed line). The black dashed lines show the optimal Bayes decision boundary, whilst the solid ones show the estimated boundary by the LDA. It is worth noting, that when the distributions are overlapping, and the standard deviation of one is much higher than the other (right plot), there are two decision boundaries. This can also be noticed in the 2D log-odds.  
  </figcaption>  
</figure>

This separation can be scored by the Fisher ratio, which takes the square of the difference of the projected means and scales it in accordance to the standard deviations and the relative sizes of the classes. To do this, any vector $\omega$ (in this case $\omega=(0,1)$) can be picked and rotated by a range of angles between $0 \; rad$ and $\pi \; rad$ (see Figure 2). Since we only care about the direction of the vector, the function will be periodic with a period of $\pi \; rad$. The ideal direction vector from the Fisher ratio is reasonably close to the one predicted in Figure 1.

<figure>
  <img width="450px" src="{% asset_path /image002.png %}">
  <figcaption>
    Figure 2. Fischer ratio for a range of $\theta$ angles. The peak value is $13.48$ and it corresponds to $\omega^∗ = (−0.96,0.27)$. This is the $(0,1)$ vector rotated by $1.30 \; rad$.
  </figcaption>  
</figure>

Figure 3 shows the optimal 𝝎𝝎 vector together with equiprobable contour lines of the two distributions. The clear separation of the projections (Figure 3 - right) further confirms that this is the optimal vector. The overlap in the projection exists because the original 2D data is also slightly overlapped.

<figure>
  <img width="600px" src="{% asset_path /image003.png %}">
  <figcaption>
    Figure 3. Equiprobable lines for the two classes and the optimal 𝝎𝝎 vector (left) and histograms of the projections (right). It is worth noting that 𝝎𝝎 is not exactly parallel to the centroids of the distributions. This is because of the difference between the covariance matrices and the relative sizes of the distributions (this affects the denominator of the Fisher ratio).
  </figcaption>  
</figure>

The log-odds ( 2 ) of the distributions can be rearranged using Bayes’ theorem. This reveals that the log-odds are the sum of the logarithms of the ratios between the prior and posterior probabilities. The prior probability is 𝑃𝑃(𝑐𝑐)=𝑛𝑛𝑐𝑐𝑛𝑛, where n is the sum of elements in all classes [2].

<div class="eqn">
  $$\
  ln\left( \frac{P(c=a|x^n)}{P(c=b|x^n)} \right)
  = ln\left( \frac{P(x^n|c=a)}{P(x^n|c=b)} \frac{P(c=a)}{P(c=b)} \right)
  = ln\left( \frac{P(x^n|c=a)}{P(x^n|c=b)} \right) + ln\left( \frac{P(c=a)}{P(c=b)} \right)
  $$
  <div class="eqncaption">
    (2)
  </div>
</div>

The posterior probability ( 3 ) is [3]:

<div class="eqn">
  $$\
  P(x^n|c)=
  \frac{\sqrt{|\mathbf{\Sigma_c}^{-1}|}}{2\pi} \
  exp \left( - \frac{1}{2} \mathbf{(x^n - m_c)^T \Sigma_c^{-1} (x^n - m_c)} \right )
  $$
  <div class="eqncaption">
    (3)
  </div>
</div>

Figure 4 shows the log-odds decision boundaries. The fact that the boundary gets pushed by the bigger class is due to the fact that the prior probability of that class increases, and hence the log-odds shift either up or down.

<figure>
  <img  width="850px" src="{% asset_path /image004.png %}">
  <figcaption>
    Figure 4. Decision boundaries for balanced (solid) and unbalanced (dashed) distributions. When the two classes have different covariances, the boundary is a parabola (left). When the classes have the same covariances, the boundary is a straight line (middle). When the classes are unbalanced (one class is 10 times bigger), the decision boundary gets “pushed” by the bigger class. An effect that was mentioned in Figure 1 can be seen on the right subplot, where two boundaries exist.
  </figcaption>  
</figure>

The unbalanced Fisher ratio would only give a different result if the projected variances are different. If they are the same, the balanced and unbalanced ratios will just be proportional (𝜇𝜇𝑎𝑎−𝜇𝜇𝑏𝑏)22σ2∝(𝜇𝜇𝑎𝑎−𝜇𝜇𝑏𝑏)2(πa+𝜋𝜋𝑏𝑏)σ2 (which is not important since we only care about 𝝎𝝎 at the highest ratio and not the actual ratio). The datasets must also be unbalanced (one set having more elements than the other).
Figure 5 - left shows that the maximum Fisher ratio is at a different angle when the unbalanced formulation is used. Once again, the decision boundary gets “pushed” by the bigger class. The consequences of accounting for the different fractions
3
of data in each class is accounted for in the log-odds
( 2 ) in the last term, which is the logarithm of the ratio of the prior probabilities.

<figure>
  <img width="700px" src="{% asset_path /image005.png %}">
  <figcaption>
    Figure 5. Fisher ratios (left) and projected probability densities (right). The dashed lines show the projections on the balanced 𝝎𝝎. It is obvious that when the prior probabilities are considered, the decision boundary expands in favour of the bigger dataset.
  </figcaption>  
</figure>

## 2. Iris Dataset

First, the generalised eigenvalue problem needs to be set. For this, the within-class ( 4 ) and between-class ( 5 ) scatter matrices need to be computed [4]. 𝒎𝒎𝒕𝒕 is the mean of all means. Since we only want to retain the discriminative parts of the data, the goal is to transform the data, so that the between class scatter is maximised, whilst the within class scatter gets minimised. This can be done by solving the generalised eigenvalue problem and projecting the data onto the optimal eigenvector.

<div class="eqn">
  $$\
  \mathbf{\Sigma_w}=
  \sum_{c=1}^{3}\sum_{n=1}^{50}(\mathbf{x^n-m_c})(\mathbf{x^n-m_c})^T
  $$
  <div class="eqncaption">
    (4)
  </div>
</div>

<div class="eqn">
  $$\
  \mathbf{\Sigma_b}=
  \sum_{c=1}^{3}\mathbf{n_c}(\mathbf{m_c-m_t})(\mathbf{m_c-m_t})^T
  $$
  <div class="eqncaption">
    (5)
  </div>
</div>

Since the rank of 𝚺𝚺𝒘𝒘 is three (there are three classes), there can be no more than 2 non-zero eigenvalues and corresponding directions [5]. This means that the last two, almost-zero, eigenvalues that SciPy returns after solving the generalized eigenvalue problem are floating point errors and should be ignored. This leaves us with the two eigenvalues 𝜆𝜆1=32.2 and 𝜆𝜆2=0.85, with corresponding eigenvectors ( 6 ) and ( 7 ).

<div class="eqn">
  $$\
  \mathbf{\omega_1}=\begin{pmatrix}
  0.0684 & 0.1266 & -0.1816 & -0.2318
  \end{pmatrix}
  $$
  <div class="eqncaption">
    (6)
  </div>
</div>

<div class="eqn">
  $$\
  \mathbf{\omega_2}=\begin{pmatrix}
  0.002 & 0.1785 & -0.0769 & 0.2342
  \end{pmatrix}
  $$
  <div class="eqncaption">
    (7)
  </div>
</div>

The eigenvectors form the eigenbasis of the projected feature space. Their corresponding eigenvalues tell how much the data is stretched in this new feature space. Therefore, the eigenvector with highest eigenvalue should be the optimal direction vector (𝝎𝝎∗=𝝎𝝎𝟏𝟏). The projection of all classes is shown in Figure 6.

<figure>
  <img width="550px" src="{% asset_path /image006.png %}">
  <figcaption>
    Figure 6. Projections of the three classes onto the optimal direction 𝝎𝝎∗. There is a clear separation between the classes, with a slight overlap between the blue and the green class.
  </figcaption>  
</figure>

To confirm that this is in fact the best direction vector, a new projection is shown in Figure 7 on a vector 𝝎𝝎=𝝎𝝎∗+𝜶𝜶, where 𝜶𝜶 is the other generalized eigenvector. It is apparent that there is a greater overlap between versicolor and virginica, and the setosa class has been pulled closer to the other two. What is more, the projected variances have seemingly increased.

<figure>
  <img width="550px" src="{% asset_path /image007.png %}">
  <figcaption>
    Figure 7. The projections on this dataset are worse than the one on Figure 6
  </figcaption>  
</figure>

The two eigenvectors are the basis vectors (forming an eigenbasis) of a two-dimensional plane in the four-dimensional feature space. Therefore, we can describe any vector in this plane by the linear combination of the two eigenvectors 𝝎𝝎=𝝎𝝎∗+𝜶𝜶. This is the reason that 𝜶𝜶 must be constructed of the other generalised eigenvector.

The generalised eigenvalue problem 𝚺𝚺𝒃𝒃𝝎𝝎=𝝀𝝀𝚺𝚺𝒘𝒘𝝎𝝎 finds the eigenvectors, which form a two-dimensional basis in which the between scatter matrix is maximised and the within scatter matrix is minimised. The generalised matrix form of the Fisher ratio is ( 8 ) [5]. Plotting the Fisher ratio for different linear combinations of 𝝎𝝎 (Figure 8) confirms that 𝝎𝝎𝟏𝟏 (the eigenvector with highest eigenvalue) is in fact the best direction for highest separation.

<div class="eqn">
  $$\
  F(\mathbf{\omega})=\mathbf{\frac{\omega^T \Sigma_b \omega}{\omega^T \Sigma_w \omega}}
  $$
  <div class="eqncaption">
    (8)
  </div>
</div>

<figure>
  <img width="550px" src="{% asset_path /image008.png %}">
  <figcaption>
    Figure 8. The variation of the Fisher ratio when different fractions of the second eigenvector are added to the optimal one. Highest ratio is at 𝑎 =0, meaning that 𝝎𝝎∗=𝝎𝝎𝟏𝟏.
  </figcaption>  
</figure>

The benefits of this method over the one in the previous section is that it analytically returns the optimal direction vector, saving computational effort. The Fisher approach in the previous section relies on calculating all possible direction vectors and their corresponding Fisher ratios, which can be time consuming, and the final result depends on how fine the rotation angle step is. Both methods result in a linear decision boundary.

In comparison, the two-dimensional log-odds approach (the quadratic discriminant analysis (QDA)) results in a quadratic decision boundary. Therefore, there will be cases where the QDA more accurately models the problem, when compared to the linear approaches [3].

## 3. Linear Regression with non-Linear Functions
### 3.1. Performing Linear Regression

To perform gradient descent, the gradient ( 10 ) of the loss function ( 9 ) must be calculated. The last term (square of 𝐿𝐿2 norm) penalises the weights for getting large. The 𝜆𝜆 factor gauges how much to penalise.
<!-- flex: 1 1 auto;  -->
<figure>
  <div style="
  display: flex;
  flex-direction: row;
  box-pack: center;
  justify-content: center;
  box-align: center;  
  align-items: center;">
    <div style="flex: 1 1 auto;"><img style="max-width: 100%;" src="{% asset_path /image009a.png %}"></div>
    <div style="flex: 1 1 auto;"><img style="max-width: 100%;" src="{% asset_path /image009b.png %}"></div>
    <div style="flex: 1 1 auto;"><img style="max-width: 100%;" src="{% asset_path /image009c.png %}"></div>
  </div>
  <figcaption>
    Figure 9. Gradient descend for 𝑝𝑝=1 (𝑟𝑟𝑟𝑟𝑟𝑟𝑟𝑟=60𝑒 −3) (left), 𝑝𝑝=2 (𝑟𝑟𝑟𝑟𝑟𝑟𝑟𝑟=2𝑒 −5)(middle), and 𝑝𝑝=3 (𝑟𝑟𝑟𝑟𝑟𝑟𝑟𝑟=2𝑒 −5) (right). It is expected that the third order would have the best fit since it has two concaves (similarly to the sinusoid). The generalisation factor has the effect of squishing the weights towards zero. The number of iterations is 300000.
  </figcaption>  
</figure>

The input dataset has 30 points with additive gaussian noise which has a mean of 0 and a standard deviation of 1. The training – testing ratio is 70/30. Figure 9 shows the learned models for 𝑝𝑝∈[1,3] and different regularisation strengths.

<div class="eqn">
  $$\
  L(\mathbf{\omega})=
  \sum_{n=1}^{N}\
  \left( y^n - \sum_{j=1}^{p+1}A_{nj}\omega_j \right )^2 + \lambda \left \| \omega \right \|_2^2
  $$
  <div class="eqncaption">
    (9)
  </div>
</div>

<div class="eqn">
  $$\
  \frac {\partial L}{\partial \omega_i}=
  -2 \mathbf{\left( A^T (y - A\omega) \right )}_i + 2 \lambda \omega_i
  $$
  <div class="eqncaption">
    (10)
  </div>
</div>

Increasing the order of the polynomial increases the constraints on the learning rate. In particular, higher orders require smaller learning rates. This is because, very high powers of 𝑥𝑥 exist and small changes in 𝜔𝜔 result in large changes in the gradient, pushing it to infinity. However, a small learning rate results in a very slow convergence and a high number of iterations. Fortunately, an analytical approach is available, which gives the optimal weights without iterations (Figure 10). It can be seen in this figure that for a low order, the model can not overfit and hence the regularisation results in a worse model.

<figure>
  <img src="{% asset_path /image010.png %}">
  <figcaption>
    Figure 10. 3𝑟𝑟𝑟𝑟 order polynomial fit using the analytical formula with different regularisation factors.
  </figcaption>  
</figure>

Table 1 compares the weights for models trained on the same data. After 300000 iterations, the gradient descent is still far from the analytical weights.

|Method|Order|Weights|
|-|-|-|
|Gradient descent|1|[1.15 −0.314]|
|Gradient descent|2|[0.933 −0.201 −0.012]|
|Gradient descent|3|[0.846 0.487 −0.386 0.045]|
|Analytical|1|[0.647 −0.218]|
|Analytical|2|[0.683 −0.254 0.006]|
|Analytical|3|[−0.6133 2.123 −0.907 0.0942]|

<caption>
Table 1. Comparison of weights for three orders of polynomials.
</caption>

Next, the effect of changing the regularisation factor and the order of the polynomial is explored. This is done by evaluating the mean of the squared residuals for different parameters on a constant set of testing data (Figure 11). It is hard to find the optimal polynomial and regularisation factor, since this is dependent on the added noise and the chosen training set. However, it is apparent that polynomials of order 𝑝𝑝∈[3,10] give the lowest errors. Lower order polynomials underfit and higher order polynomials overfit to the training data. Regularisation factors 𝜆𝜆∈[0.1,0.3] result in the best results for high order polynomials. Low factors don’t manage to prevent overfitting, but factors that are too high eliminate the important trends in the data [6]. Polynomials of order 𝑝𝑝∈[3,4] give lowest errors with 𝜆𝜆=0. This is because the order is too low for the data to overfit and reducing the weights towards zero results in underfitting.

<figure>
  <img width="750px" src="{% asset_path /image011.png %}">
  <figcaption>
    Figure 11. Change of the mean of squared residuals with polynomial order (left) and regularisation factor (right).
  </figcaption>  
</figure>

### 3.2. How Does Linear Regression Generalise

A new distribution of 100 points was split into $$a$$. The training set was then split into 10 overlapping subsets 𝑆𝑆𝑖𝑖 such that $$a$$. Therefore, $$a$$ and $$\|𝑆𝑆𝑡𝑡𝑡𝑡\|=20$$. As seen in Figure 12, training to different sets 𝑆𝑆𝑖𝑖, picked from a larger set, results in different models.

<figure>
  <img width="800px" src="{% asset_path /image012.png %}">
  <figcaption>
    Figure 12. Ten 5th order polynomials trained on the 𝑆𝑆𝑖𝑖 sets (left). The output of the average model (right). (adapted from [6])
  </figcaption>  
</figure>

The bias is a measure that shows the property of the model to persistently learn wrong relations. The variance shows the consistency of the model, when different training subset is chosen. A high variance means that the model is very sensitive to the choice of 𝑆𝑆𝑖𝑖. Using ( 11 ) and ( 12 ) [6], the variance can be calculated. The bias is simply the mean of the average loss of all models 𝑀𝑀.

<div class="eqn">
  $$\
  \bar{y}(x)= \frac{1}{10} \sum_{i=1}^{10}y^i(x)
  $$
  <div class="eqncaption">
    (11)
  </div>
</div>

<div class="eqn">
  $$\
  variance = 
  \frac{1}{N}\sum_{n=1}^{N} \frac{1}{10} \sum_{i=1}^{10} \left\{ y^i(x_n) - \bar{y}(x_n)\right \}^2
  $$
  <div class="eqncaption">
    (12)
  </div>
</div>

Intuitively, a larger regularisation factor (and hence smaller weights) should result in higher bias and smaller variance. However, the polynomials in Figure 12 do not manage to fit well to the right side of the sinusoid and even high regularisation factors do not reduce the variance. The bias and variance relationship is shown in Figure 13. According to [6], the sum of 𝑏𝑏𝑏 𝑠𝑠2 and 𝑣𝑣𝑣 𝑣𝑣𝑣 𝑣𝑣𝑣𝑣𝑣𝑣 is related to the loss of the model. Therefore, the lowest point of the curve corresponds to the optimal regularisation factor (𝜆𝜆~0.1) and should result in the best bias-variance balance. Note that this value is also in the range defined in section 3.1.

<figure>
  <img width="550px" src="{% asset_path /image013.png %}">
  <figcaption>
    Figure 13. The change of bias and variance with 𝜆𝜆 (adapted from [6])
  </figcaption>  
</figure>

Another view on how the bias-variance changes can be seen in Figure 14. Increasing 𝜆𝜆 increases the bias.

<figure>
  <img width="550px" src="{% asset_path /image014.png %}">
  <figcaption>
    Figure 14. The bias-variance distribution for different regularisation factors.
  </figcaption>  
</figure>

## References

[1] C. . M. Grinstead, “Continuous Random Variables,” in Introduction to Probability, p. 281.

[2] C. M. Bishop, “Probability Theory,” in Pattern Recognition and Machine Learning, Springer, 2006, p. 17.

[3] G. James, “Linear Discriminant Analysis for p>1,” in An Introduction to Statistical Learning, Springer, 2014, p. 156.

[4] C. M. Bishop, “Linear Models for Classification,” in Pattern Recognition and Machine Learning, Springer, 2006, p. 192.

[5] D. Barber, “Canonical variates,” in Bayesian Reasoning and Machine Learning, 2011, pp. 325-327.

[6] C. M. Bishop, “The Bias-Variance Decomposition,” in Pattern Recognition and Machine Learning, Springer, 2006, pp. 148-150.


<script src="/assets/js/katex_render.js"></script>
