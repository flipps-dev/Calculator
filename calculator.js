$(document).ready(function(){
 
  var box = '';
  var result = '';
  var current = '';
  var log = '';
  var decimal = true;
  var reset = '';
  
  function round(val) {
    val = val.toString().split('');
    if (val.indexOf('.') !== -1) {
      var valTest = val.slice(val.indexOf('.') + 1, val.length);
      val = val.slice(0, val.indexOf('.') + 1);
      var i = 0;
      while (valTest[i] < 1) {
        i++
      }
      valTest = valTest.join('').slice(0, i + 2);
      if (valTest[valTest.length-1] === '0') {
        valTest = valTest.slice(0, -1);
      }
      return val.join('') + valTest;
    } else {
      return val.join('');
    }
  }
  
  $('button').click(function() {

    box = $(this).attr("value");
    console.log('entry: ' + box);
    
    if (reset) {
      if (box === '/' || box === '*' || box === '-' || box === '+') {
        log = result;
      } else {
        result = '';
      }
    }
    reset = false;
    
    if (box === 'c') {
      result = '';
      current = '';
      box = '';
      log = '';
      $('#result').html('0');
      $('#progressive').html('0');
      decimal = true;
    } 
    
    // prevents more than one deciminal in a number
    if (box === '.' || box === '0.') {
      if (!decimal) {
        box = '';
      }
    }

    // prevents improper use of first digit
    if (result.length === 0 && isNaN(box) && box !== '.' || result.length === 0 && box === '0') {
      box = '';
      result = '';
    }

    // prevents extra operators
    if (current !== 'noChange') {
      if (current === '' && isNaN(box) && box !== '.' || isNaN(current) && isNaN(box) && box !== '.') {
        box = '';
      }
    }

    // digit combining
    while (Number(box) || box === '0' || current === '.') {

      if (isNaN(current) && box === '0' && current !== '.') {
        box = '';
      } else if (isNaN(current) && Number(box) && current !== '.') {
        current = '';
      }
      if (box === '.') {
        decimal = false;
      }
      if (current === '0.' && isNaN(box)) {
        box = '';
      } else {
        if (current[current.length - 1] === '.') {
          current = current.concat(box);
        } else {
          current += box;
        }
        result += box;
        $('#result').html(current);
        log += box;
        $('#progressive').html(log);
        box = '';
      }
    }

    // Operation list

    if (box === '.') {
      if (current === '' || isNaN(current[current.length - 1])) {
        current = '0.';
        result += box;
        $('#result').html('0.');
        log += current;
        $('#progressive').html(log);

      } else {
        current = current.concat('.');
        result = result.concat('.');
        log = result;
        $('#progressive').html(result);
        $('#result').html(current);
      }
      box = '';
      decimal = false;

    } else if (box === '/') {
      current = '/';
      result = round(eval(result)) + current;
      log += current;
      $('#progressive').html(log);
      $('#result').html('/');
      box = '';
      decimal = true;

    } else if (box === '*') {
      current = '*';
      result = round(eval(result)) + current;
      log += 'x';
      $('#progressive').html(log);
      $('#result').html('x');
      box = '';
      decimal = true;

    } else if (box === '-') {
      current = '-';
      result = round(eval(result)) + current;
      log += current;
      $('#progressive').html(log);
      $('#result').html('-');
      box = '';
      decimal = true;

    } else if (box === '+') {
      current = '+';
      result = round(eval(result)) + current;
      log += current;
      $('#progressive').html(log);
      $('#result').html('+');
      box = '';
      decimal = true;

    } else if (box === '=') {
      if (current[current.length - 1] === '.') {
        box = '';
      } else {
        current = eval(result).toString();
        $('#result').html(round(eval(result)));
        result = round(eval(result));
        log += box + result;
        $('#progressive').html(log);
        log = result;
        box = '';
        reset = true;
        decimal = true;
      }
      current = 'noChange';
    }
    box = '';

    if (reset) {
      log = '';
    }

    // max digits on screen
    if ($('#box').children().text().length > 8 || $('#progressive').text().length > 22) {
      $('#result').html('0');
      $('#progressive').html('Digit Limit over. Please click C');
      current = '';
      result = '';
      log = '';
      decimal = true;
    }

    console.log('decimal: ' + decimal);
    console.log('current: ' + current);
    console.log('answer: ' + result);
    console.log($('#progressive').text().length);
  });
  
  $('#title').removeClass('color_fade');
  $('button').mousedown(function(){
    $('#title').addClass('color_fade');
    $('button').mouseup(function(){
      $('#title').removeClass('color_fade');
    });
  });
  
  
}); // end doc ready function

  
