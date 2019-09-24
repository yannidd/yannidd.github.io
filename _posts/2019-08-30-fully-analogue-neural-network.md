---
name: Fully Analogue Neural Network
layout: post
author: yannidd
abstract: N\A
---

## Introduction

Machine learning is used all around these days - from tasks as basic as ... to self-driving cars, walking robots and medical diagnosis. Different algorithms are used for each task, but what is common between them is the fact that they are all represented digitally. To compute them, a processor does linear algebra one clock cycle at a time. As you can imagine, this can easily become a bottleneck for large neural networks that need to operate in real-time. In this article I present my work on developing a neural network, which operates fully in the analogue domain. The network is built only using basic electronic components such as resistors, transistors and op-amps. The inputs, outputs and all other values within the network are electronic signals.

After reading this article, you will be able to realise an all electronic neural network, which has the exact same mathematical representation as a normal neural network. The network supports tanh and ReLU activations. I will also provide an example use case with a network that learns the XOR problem. To avoid writing an extremely lengthy article, I have skipped any derivations. However, I have referenced some excellent books by very clever people if you want more details. In my explanations I assume that you know the basics of feedforward neural networks and analogue electronic circuits.

## The Feedforward Neural Network

Arguably the most basic neural network - and probably the first one everyone learns about - is called the feedforward neural network. In it, data flows from the inputs, through all inside neurons and then to the outputs. This section will briefly explain, with the aid of mathematical equations, how this type of network generates an output from a set of inputs; this is commonly known as forward propagation.

To understand the neural network operation, we shall first look at its smallest building block called the neuron. 

As a quick disclaimer, this is by no means a comprehensive introduction to neural networks. It is rather a quick recap of how the output of the network is calculated, which will be useful when modelling the neural network using electronics. If you are unfamiliar with neural networks, I highly recommend Michael Nielsen book {% cite neurons --file assets/posts/fully-analogue-neural-network/references.bib %} introducing neural networks and deep learning.

### A Single Artificial Neuron

As the name hints, a neural network is build of many interconnected artificial neurons. An artificial neuron has an arbitrary number of inputs and a single output. One of the inputs always has a constant value of 1 and is called a bias. 


 
...

The operation of a neuron, mathematically speaking, is quite simple. A neuron takes the weighted sum of a number of inputs, adds a bias, and lastly passes the sum to an activation function. All numbers involved are real numbers. Weighing the inputs means that the neuron has the ability to make decisions by prioritising or ignoring some of the knowledge it receives. Adding the activation function in the end, allows the

[link](http://neuralnetworksanddeeplearning.com/chap1.html#perceptrons)

### Activation Functions

## Modelling the Perceptron Using Transistors

### The Sumation Half
Modelling the sumation half of the neuron using op-amps is relatively straightforward. If you have had experience with analogue electronics before, you have most probably come accross a circuit called a voltage adder ([Figure \label_of{#fig_voltage_adder}](#fig_voltage_adder)). As the name suggests, this circuit outputs the sum of some voltages. Even better, it weighs these input voltages depending on the values of the input resistors. $V_O$ is the weighted sum of the inputs $V_i$.

<figure id='fig_voltage_adder'>
  <img src="{% asset_path /img/voltage_adder.png %}">
  <figcaption>
    A voltage adder. The output $V_O$ is the weighted sum of the inputs $V_i$. The weight of each input $V_i$ is controlled by its corresponding input resistor value $R_i$. Adapted from {% cite voltage_adder --file assets/posts/fully-analogue-neural-network/references.bib %}.
  </figcaption>
</figure>

Voltage adder expression \eqref{eqn_voltage_adder}.

\\[
\label{eqn_voltage_adder}
\tag{}
V_o = - R_f \sum_{i=0}^{N}{\frac{V_i}{R_i}} 
\\]

This looks very similar to the summing part of a neuron. The input voltages $V_i$ correspond to the neuron inputs $x_i$ and the resistance ratios $R_f / R_i$ correspond to the weights $\omega_i$ and the output voltage $V_o$ corresponds to the neuron output $y$. 

If you have been paying attention, you might have noticed a few problems with this model. First of all, there is a minus sign in the adder expression (the output is inverted in electronic engineering terms). Next, if any of the weights $w_i$ is negative then the corresponding resistor value $R_i$ should also be negative. Lastly, the sum of the inputs in the neuron is unbounded, but the sum in the op-amp is bounded by the supply rail voltages. 

The first problem can be solved by adding a voltage inverter to the inverted output. Simple! 

...

For the second one, instead of having negative resistors we can invert the inputs $V_i$ for which the neuron weights are negative. In a real-life implementation, this means extra circuitry due to negative weights. However, in simulation we can save the hassle of adding an inverter to each input with a negative weight and instead use a negative resistor value (LTspice accepts negative resistances).

Unfortunately, there is no solution to the last problem. The best thing to do is to hope that your neural network will never have a sum that is higher than the supply rails (typically $\pm15V$). Luckily this happens rarely. For reassurance, you could plot a histogram of the neural network values.

### The Activation Half

#### The relu Activation

#### The tanh Activation

#### The step Activation

## Solving the XOR Problem
One of the typical problems that is presented when teaching MLPs is the XOR problem. As the name suggests, this problem requires the mapping of two inputs to a single output using the binary XOR operation. The reason this problem is so popular, is because it is a simple problem which is not linearly separable (that is, you cannot draw a straight line to separate the zeros and the ones). This shows the ability of MLPs to classify non-linearly separable data. 

In this example a slight modification of the XOR problem will be used. Instead of having 0 and 1 to denote logic low and logic high, -1 and 1 will be used (see [Figure \label_of{#fig_xor_plane}](#fig_xor_plane)). The reason for this is that the network below is built using tanh cells, which saturate at -1 and 1.

<figure id='fig_xor_plane'>
  <img src="{% asset_path /img/xor_plane.png %}">

  <figcaption>
    The slightly modified XOR problem.
  </figcaption>
</figure>

The network structure with all the weights and biases is visualised below. 

<figure id='xor_network'>
  <div>
    <object 
    data="{% asset_path /img/xor_network.svg %}" 
    type="image/svg+xml"
    style="
      width: 600px; 
      display: block;
      margin: auto;
    ">
      Your browser seems to be too old to display SVGs. Consider updating! :(
    </object>
    {% include colab.html link='https://colab.research.google.com/github/yannidd/analog-electronics-nn/blob/master/python/notes.ipynb' %}
  </div>
  <figcaption>
    The final network.
  </figcaption>
</figure>

One of the typical problems that is presented when teaching MLPs is the XOR problem. As the name suggests, this problem requires the mapping of two inputs to a single output using the binary XOR operation. The reason this problem is so popular, is ... because it is not linearly separable; this shows the ability of MLPs to classify non-linearly separable data.

<figure id='xor_network_analog' class='full_width'>
  <object 
  data="{% asset_path /img/xor_network_analog.svg %}" 
  type="image/svg+xml"
  style="
    width: 90vw; 
    max-width: 1500px;
    display: block;
    margin: auto;
  ">
  Your browser seems to be too old to display SVGs. Consider updating! :(
  </object>
  <figcaption>
    The final network.
  </figcaption>
</figure>

<figure id='fig_networks_outputs' class=''>
  <video muted autoplay loop>
    <source src="{% asset_path /img/networks_outputs.mp4 %}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <img src='{% asset_path /img/networks_outputs_difference.png %}'>
  <figcaption>
    The final network.
  </figcaption>
</figure>

## Conclusion

$$
\begin{align*}
    \tag{}
    x &= y^2 \\
    \tag{}
    x &= z + 2^t
\end{align*}
$$

Further work: implement softmax for multi-class classification.

##### References


{% bibliography --file assets/posts/fully-analogue-neural-network/references.bib %}

perceptron  
Michael A. Nielsen, "Neural Networks and Deep Learning", Determination Press, 2015  
http://neuralnetworksanddeeplearning.com/chap2.html

adder + rectifier  
http://www.ti.com/lit/an/sboa092b/sboa092b.pdf  
Bruce Carter and Thomas R. Brown, "Handbook of Operational Amplifier Applications", Texas Instruments, 2016

activations  
@inproceedings{glorot2011deep,
  title={Deep sparse rectifier neural networks},
  author={Glorot, Xavier and Bordes, Antoine and Bengio, Yoshua},
  booktitle={Proceedings of the fourteenth international conference on artificial intelligence and statistics},
  pages={315--323},
  year={2011}
}  
http://proceedings.mlr.press/v15/glorot11a/glorot11a.pdf

Weights for layer 'dense' (2 unit(s)):
 - Kernel: [[-1.4473087 -1.6303953]
            [-1.4470474 -1.6299497]]
 - Bias:    [-1.2659273  1.474662 ]

Weights for layer 'dense_1' (1 unit(s)):
 - Kernel: [[-2.3368418]
            [ 2.3172097]]
 - Bias:    [-2.0349612]

<script src="/assets/js/posts/numberize.js"></script>