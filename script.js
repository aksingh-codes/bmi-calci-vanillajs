const weightINPUT = document.querySelector("input#weight");
const heightINPUT = document.querySelector("input#height");
const calculateBTN = document.querySelector(".btn.calculate");
const bmiIndexElement = document.querySelector("#bmi-index");
const bmiStatusElement = document.querySelector("#bmi-status");

weightINPUT.value = 65;
heightINPUT.value = 170;

const options = {
  angle: -0.1, // The span of the gauge arc
  lineWidth: 0.3, // The line thickness
  radiusScale: 0.8, // Relative radius
  pointer: {
    length: 0.8, // // Relative to gauge radius
    strokeWidth: 0.021, // The thickness
    color: "#000000", // Fill color
  },
  limitMax: 100, // If false, max value increases automatically if value > maxValue
  limitMin: 0, // If true, the min value of the gauge will be fixed
  colorStart: "#6F6EA0", // Colors
  colorStop: "#C0C0DB", // just experiment with them
  strokeColor: "#EEEEEE", // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true, // High resolution support
  staticLabels: {
    font: "12px sans-serif", // Specifies font
    labels: [0, 18, 25, 30], // Print labels at these values
    color: "#000000", // Optional: Label text color
    fractionDigits: 0, // Optional: Numerical precision. 0=round off.
  },
  staticZones: [
    { strokeStyle: "#FFE233", min: 0, max: 18 }, // Yello
    { strokeStyle: "#458B00", min: 18, max: 25 }, // Green
    { strokeStyle: "#FA7700", min: 25, max: 30 }, // Orange
    { strokeStyle: "#FF5733", min: 30, max: 100 }, // Red
  ],
};
const target = document.getElementById("bmi-meter"); // your canvas element
const gauge = new Gauge(target).setOptions(options); // create sexy gauge!
gauge.maxValue = 100; // set max gauge value
gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 32; // set animation speed (32 is default value)
gauge.set(0); // set actual value

const calculateBMI = (e) => {
  e.preventDefault();
  const weight = parseInt(weightINPUT.value);
  const height = parseInt(heightINPUT.value) / 100; // cm to m
  let bmi = weight / (height * height);

  if (height === 0) {
    bmi = 0;
  }

  const status = getBMIStatus(bmi);
  const color = getBMIColor(bmi);

  bmiIndexElement.innerHTML = bmi.toFixed(2);
  bmiStatusElement.innerHTML = status;
  bmiStatusElement.style.color = color;
  // console.log(bmi, status);
  gauge.set(bmi);
};

const getBMIStatus = (bmi) => {
  let status = "";
  if (bmi < 18.5) {
    status = "Underweight";
  } else if (bmi < 25) {
    status = "Normal";
  } else if (bmi < 30) {
    status = "Overweight";
  } else {
    status = "Obese";
  }
  return status;
};

const getBMIColor = (bmi) => {
  let color = "";
  if (bmi < 18.5) {
    color = "#FFE233";
  } else if (bmi < 25) {
    color = "#458B00";
  } else if (bmi < 30) {
    color = "#FA7700";
  } else {
    color = "#FF5733";
  }
  return color;
};

calculateBTN.addEventListener("click", calculateBMI);

window.addEventListener("load", calculateBMI);
