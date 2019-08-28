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
  <img src="{% asset_path /report_files/image001.png %}">
  <figcaption>
    Figure 1. The probability densities of $x_a$ and $x_b$ projected on three different direction vectors $\omega$. In addition to the histograms, there is a KDE plot (solid line) and the actual gaussian distribution derived from the generating parameters (dashed line). The black dashed lines show the optimal Bayes decision boundary, whilst the solid ones show the estimated boundary by the LDA. It is worth noting, that when the distributions are overlapping, and the standard deviation of one is much higher than the other (right plot), there are two decision boundaries. This can also be noticed in the 2D log-odds.  
  </figcaption>  
</figure>

This separation can be scored by the Fisher ratio, which takes the square of the difference of the projected means and scales it in accordance to the standard deviations and the relative sizes of the classes. To do this, any vector $\omega$ (in this case $\omega=(0,1)$) can be picked and rotated by a range of angles between $0 \; rad$ and $\pi \; rad$ (see Figure 2). Since we only care about the direction of the vector, the function will be periodic with a period of $\pi \; rad$. The ideal direction vector from the Fisher ratio is reasonably close to the one predicted in Figure 1.

<figure>
  <img src="{% asset_path /report_files/image003.png %}">
  <figcaption>
    Figure 2. Fischer ratio for a range of $\theta$ angles. The peak value is $13.48$ and it corresponds to $\omega^∗ = (−0.96,0.27)$. This is the $(0,1)$ vector rotated by $1.30 \; rad$.
  </figcaption>  
</figure>

Figure 3 shows the optimal 𝝎𝝎 vector together with equiprobable contour lines of the two distributions. The clear separation of the projections (Figure 3 - right) further confirms that this is the optimal vector. The overlap in the projection exists because the original 2D data is also slightly overlapped.

<figure>
  <img src="{% asset_path /report_files/image005.png %}">
  <figcaption>
    Figure 3. Equiprobable lines for the two classes and the optimal 𝝎𝝎 vector (left) and histograms of the projections (right). It is worth noting that 𝝎𝝎 is not exactly parallel to the centroids of the distributions. This is because of the difference between the covariance matrices and the relative sizes of the distributions (this affects the denominator of the Fisher ratio).
  </figcaption>  
</figure>

The log-odds ( 2 ) of the distributions can be rearranged using Bayes’ theorem. This reveals that the log-odds are the sum of the logarithms of the ratios between the prior and posterior probabilities. The prior probability is 𝑃𝑃(𝑐𝑐)=𝑛𝑛𝑐𝑐𝑛𝑛, where n is the sum of elements in all classes [2].

$$eq$$

## 2. Iris Dataset
## 3. Linear Regression with non-Linear Functions
### 3.1. Performing Linear Regression
### 3.2. How Does Linear Regression Generalise
## References

<script src="/assets/js/katex_render.js"></script>

<img src="{% asset_path /report_files/image011.png %}">
<img src="{% asset_path /report_files/image015.png %}">
<img src="{% asset_path /report_files/image017.png %}">
<img src="{% asset_path /report_files/image019.png %}">
<img src="{% asset_path /report_files/image021.png %}">
<img src="{% asset_path /report_files/image023.png %}">
<img src="{% asset_path /report_files/image024.png %}">
<img src="{% asset_path /report_files/image025.png %}">
<img src="{% asset_path /report_files/image028.png %}">
<img src="{% asset_path /report_files/image030.png %}">
<img src="{% asset_path /report_files/image032.png %}">
<img src="{% asset_path /report_files/image037.png %}">
<img src="{% asset_path /report_files/image039.png %}">