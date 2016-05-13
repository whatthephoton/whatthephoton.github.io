function removeWords (remList,wList) {
  var j;
  var remLen = remList.length;
  console.log('remlist',remList);
  for (j=0;j < remLen; j++) {
    console.log(j);
    var k = $.inArray(remList[j],wList);
    console.log(remList[j])
    console.log('k',k)
    if (k != -1) {
      wList.splice(k,1);
    }
  }
}

function showChoices (j,wordList) {
  if (wordList.length == 1) {
    $('#choices').remove();
    $('#controls').after("<p id='chosen'> Your chosen name is: "+ wordList[0] + '</p>');
    $('#controls').hide();
    $('#restart').show();
  } else {
    $('#choices').remove();
    $('#controls').after("<p id='choices'> A) " + wordList[2*j]+' B) '+
      wordList[2*j + 1] + '</p>');
  }
}

$(document).ready(function(){
  $('clear').click(function(){
    $('text').value = '';
  });
  $('#submitB').click(function(){
    var boxInput = $("textarea[name=words]").val();
    //console.log(boxInput);
    var re = /\s*[,\n\t\r;]+\s*/ //captures multiple newlines, multiple commas, etc.
    var wordList = boxInput.trim().split(re); //trim() is like Python's strip()
    //console.log(wordList); //debugging

    if (wordList.length > 1) {
      $('#err').remove();
      $('#submit').hide();
      //console.log('def');
      $('#controls').removeClass('hidden');
      //this is a global variable!!! (what is scope)
      i = 0;
      //actual code to do stuff
      //display first set of choices
      showChoices(i,wordList);
      toRemove = [];
      //chose option A
      $('#buttonA').click(function(){
        //put option B in removal array
        toRemove.push(wordList[2*i+1]);
        i++;
        //if we've gotten to the end now, remove elements and shuffle,
        //then display the next option
        if (i>=Math.floor(wordList.length/2)) {
          removeWords(toRemove,wordList);
          i=0;
          toRemove = [];
          wordList = _.shuffle(wordList);
          showChoices(i,wordList);
        } else {
          //otherwise just display the next option
          showChoices(i,wordList);
        }
      });

      //chose option b
      $('#buttonB').click(function(){
        toRemove.push(wordList[2*i]);
        i++;
        if (i>=Math.floor(wordList.length/2)) {
          removeWords(toRemove,wordList);
          i=0;
          toRemove = [];
          wordList = _.shuffle(wordList);
          showChoices(i,wordList);
        } else {
          showChoices(i,wordList);
        }
      });
    } else {
      $('#err').remove();
      $('#controls').after( "<p id='err'> Please input at least two names.</p>");
    }
  });
});
