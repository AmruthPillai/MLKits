const tf = require('@tensorflow/tfjs');
const _ = require('lodash');

class LinearRegression {

  m;
  b;

  features;
  labels;
  options;

  constructor(features, labels, options) {
    this.m = 0;
    this.b = 0;

    this.features = features;
    this.labels = labels;
    this.options = Object.assign({
      learningRate: 0.1,
      iterations: 1000
    }, options);
  }

  gradientDescent() {
    const currentGuessesForMPG = this.features.map(row => {
      return this.m * row[0] + this.b;
    });

    const bSlope = _.sum(currentGuessesForMPG.map((guess, i) => {
      return guess - this.labels[i][0];
    })) * 2 / this.features.length;

    const mSlope = _.sum(currentGuessesForMPG.map((guess, i) => {
      return -1 * this.features[i][0] * (this.labels[i][0] - guess);
    })) * 2 / this.features.length;
  }

  train() {
    for (let i = 0; i < this.options.iterations; i++) {
      this.gradientDescent();
    }
  }
}

module.exports = LinearRegression;