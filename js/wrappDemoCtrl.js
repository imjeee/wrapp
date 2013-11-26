function WrappDemoCtrl ($scope) {
  $scope.title = "Wrapp demo calculator";
  $scope.inputOutputModel = "";
  $scope.validInput = true;
  
  var INVALID_INPUT = "Invalid Input!";

  $scope.addToInput = function(input) {
    if (input != null && input != undefined) {
      var inputCharIsNum = isNumber(input) || input == '.';
      var addition = lastInputCharIsNum($scope.inputOutputModel) && inputCharIsNum ? input : " " + input;
      $scope.inputOutputModel += addition;
    } else {
      $scope.inputOutputModel = "";
    }
    $scope.validInput = validateExp($scope.inputOutputModel);
  }

  $scope.evalExp = function() {
    if ($scope.validInput) {
      var evaluableInput = cleanupInput($scope.inputOutputModel);
      $scope.inputOutputModel = eval(evaluableInput);
      //console.log(evaluableInput);
    } else {
      $scope.inputOutputModel = INVALID_INPUT;
    }
  }

  $scope.cleanInput = function() {
    $scope.inputOutputModel = "";
    $scope.validInput = true;
  }

}

function validateExp(input) {
  try {
    var evaluableInput = cleanupInput(input);
    eval(evaluableInput);
    return true;
  } catch (err) {
    //console.log("input failed to validate");
    return false;
  }
}

function cleanupInput(input) {
  if (input == null || input == undefined)
    return "";
  var evaluableInput = input.replace('x', '*');
  return evaluableInput.replace(' ', '');
}

function lastInputCharIsNum(input) {
  if (input == null || input == undefined)
    return false;
  var currInputLength = input.length;
  var lastCharIsNum = input[currInputLength - 1] == '.';
  lastCharIsNum |= isNumber(input[currInputLength - 1]);
  return lastCharIsNum;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
