
function comparison(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
}

function incomparison(a, b, opts) {
    if (a != b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
}


function replaceWithAsterisks(inputString) {
    console.log(inputString+" password");
    
    return '•'.repeat(inputString.length);
};


function multiplication(a,b) {
   
    
    return a*b;
};

module.exports = {
    comparison,
    incomparison,
    replaceWithAsterisks,
    multiplication
  };