String.prototype.validate = function (rule) {
  if (typeof rule === "string") {
    let operatorNo = false;

    if (rule.includes("!")) {
      rule = rule.slice(1);
      operatorNo = true;
    }

    if (rule.includes("length")) {
      return lengthValidator(this, rule, operatorNo);
    }

    if (rule.includes("empty")) {
      return emptyValidator(this, operatorNo);
    }
  }

  return !!this.match(rule);
};

function lengthValidator(string, rule, operatorNo) {
  if (typeof eval(rule) === "number") {
    return eval(
      `${operatorNo ? "!" : ""}(string.length === ${rule.split("=")[1].trim()})`
    );
  } else {
    return eval(`${operatorNo ? "!" : ""}(string.${rule})`);
  }
}

function emptyValidator(string, operatorNo) {
  return operatorNo ? !!string.length : !string.length;
}

console.log('some-string'.validate('!empty'))        //toEqual(true)
console.log('some-string'.validate('length>30'))     //toEqual(false)
console.log('some-string'.validate('!length<=10'))   //toEqual(true)
console.log('some-string'.validate('length=3'))      //toEqual(false)
console.log('some-string'.validate(/^.*-s/i))        //toEqual(true)
