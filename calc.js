var display = document.querySelector("#display");
var numpad = document.querySelectorAll(".numpad");
var button = document.querySelectorAll(".button");
var plus = document.querySelector("#plus");
var calculate = document.querySelector("#result");
var operators = document.querySelectorAll(".operator");
var del = document.querySelector("#delete");
var clear = document.querySelector("#clear");
var clearEntry = document.querySelector("#clearentry");

var num1 = "";
var num2 = "";
var mode = "";

var action = {
	plus: function(one, two) {
		return one + two;
	},
	minus: function(one, two) {
		return one - two;
	},
	multiply: function(one, two) {
		return one*two;
	},
	divide: function(one, two) {
		return one/two;
	}
}

for (var i=0;i<numpad.length;i++) {
	numpad[i].addEventListener("click", function() {
    if (!mode) {
      num1 += this.textContent;
      displayChange(num1);
    }
    else if (mode === "reset") {
      reset();
      num1 += this.textContent;
      displayChange(num1);
    }
    else {
      num2 += this.textContent;
      displayChange(num2);
    }
	});
}

for (var i=0;i<operators.length;i++) {
	operators[i].addEventListener("click", function() {
		display.textContent = this.textContent;

		if (this.textContent === "+") {
			mode = "plus";
		}
		else if (this.textContent === "-") {
			mode = "minus";
		}
		else if (this.textContent === "/") {
			mode = "divide";
		}
		else {
			mode = "multiply";
		}
	});
}

clear.addEventListener("click", function() {
  reset();
});

clearEntry.addEventListener("click", function() {
  displayChange(0);
  num2 = "";
});

calculate.addEventListener("click", function() {
	if (mode && mode !== "reset") {
		var result = action[mode](Number(num1),Number(num2));
		displayChange(result);
		num1 = result.toString();
    num2 = "";
    mode = "reset";
	}
});

del.addEventListener("click", function() {
	if (display.textContent.length !== 1)	{
    if (mode) {
      num2 = num2.slice(0, -1);
      displayChange(num2);
    }
    else {
      num1 = num1.slice(0, -1);
      displayChange(num1);
    }
  }
});

function reset() {
	displayChange(0);
	num1 = "";
	num2 = "";
	mode = "";
}

function displayChange(input) {
  var data = input.toString();
  display.textContent = data.replace(/\d(?=(\d{3})+$)/g, function(x) { return x + " "});
}
