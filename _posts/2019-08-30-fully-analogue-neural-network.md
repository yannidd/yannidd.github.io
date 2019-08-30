---
name: Fully Analogue Neural Network
layout: post
author: yannidd
abstract: N\A
---

## Introduction

## The Multilayer Perceptron

Arguably the most basic neural network - and probably the first one everyone learns about - is the multilayer perceptron (MLP). A basic MLP usually consists of three layers: an input layer, a hidden layer, and an output layer. This section will explain, with the aid of mathematical equations, how an MLP generates an output from a set of inputs; this is commonly known as forward propagation. This section will not explain how the network learns (through a process called backpropagation), since this is not necessary to understand the following electronics related sections.

To understand the MLP operation, we shall first look at its smallest building block called the perceptron. 

### A Single Perceptron

### Activation Functions

## Modelling the Perceptron Using Transistors

### The Sumation Half

### The Activation Half

#### The relu Activation

#### The tanh Activation

#### The step Activation

## Solving the XOR Problem

One of the typical problems that is presented when teaching MLPs is the XOR problem. As the name suggests, this problem requires the mapping of two inputs to a single output using the binary XOR operation. The reason this problem is so popular, is ... because it is not linearly separable; this shows the ability of MLPs to classify non-linearly separable data.

## Conclusion

Further work: implement softmax for multi-class classification.

## References
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


<script src="/assets/js/katex_render.js"></script>
