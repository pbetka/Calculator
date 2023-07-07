//Input Filter

(function($) {
    $.fn.inputFilter = function(callback, errMsg) {
      return this.on("input keydown keyup mousedown mouseup select contextmenu drop focusout", function(e) {
        if (callback(this.value)) {
          if (["keydown","mousedown","focusout"].indexOf(e.type) >= 0){
            $(this).removeClass("input-error");
            this.setCustomValidity("");
          }
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          $(this).addClass("input-error");
          this.setCustomValidity(errMsg);
          this.reportValidity();
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    };
  }(jQuery));

  var operation = null;
  
  var firstNumber = null;

$(document).ready(function() {
    $("input").inputFilter(function(value) {
        return /^\-?\d*\.?\d*$/.test(value);
    },"Only integer or float value allowed");

//Addition

    $("#addition").click(function(){
        firstNumber = $("input:text").val();
        $("input:text").val("");
        operation = "+";
        $("#memory").text(firstNumber + " " + operation);
    });

//Subtraction

    $("#subtraction").click(function(){
        firstNumber = $("input:text").val();
        $("input:text").val("");
        operation = "-";
        $("#memory").text(firstNumber + " " + operation);
    });

//Multiplication

    $("#multiplication").click(function(){
        firstNumber = $("input:text").val();
        $("input:text").val("");
        operation = "×";
        $("#memory").text(firstNumber + " " + operation);
    });

//Division

    $("#division").click(function(){
        firstNumber = $("input:text").val();
        $("input:text").val("");
        operation = "÷";
        $("#memory").text(firstNumber + " " + operation);
    });

//Equal

    $("#equal").click(function(){
        oldMemory = $("#memory").text()
        $("#memory").text(oldMemory + " " + $("input:text").val() + " = ");
        switch(operation) {
            case "+":
                result = parseFloat(firstNumber) + parseFloat($("input:text").val());
                break;
            case "-":
                result = parseFloat(firstNumber) - parseFloat($("input:text").val());
                break;
            case "×":
                result = parseFloat(firstNumber) * parseFloat($("input:text").val());
                break;
            case "÷":
                result = parseFloat(firstNumber) / parseFloat($("input:text").val());
                break;
        }
        $("input:text").val(result);
    });

//Numbers

    $("#0, #1, #2, #3, #4, #5, #6, #7, #8, #9").click(function(){
        number = $(this).attr('id');
        oldValue = $("input:text").val();
        $("input:text").val(oldValue + number);
    })

//Point

    $("#point").click(function(){
        oldValue = $("input:text").val();
        if(oldValue == "")
            $("input:text").val("0.");
        else
            if(oldValue.indexOf(".") < 0)
                $("input:text").val(oldValue + ".");
    })

//Clear

    $("#clear").click(function(){
        $("input:text").val("");
        operation = null;
        firstNumber = null;
        $("#memory").text("");
    })

//Backspace

    $("#backspace").click(function(){
        oldValue = $("input:text").val();
        $("input:text").val(oldValue.substr(0, oldValue.length - 1));
    })

//Positive / Negative

    $("#positiveNegative").click(function(){
        oldValue = $("input:text").val();
        if(oldValue.substr(0, 1) == "-")
            $("input:text").val(oldValue.substr(1, oldValue.length - 1));
        else
            $("input:text").val("-" + oldValue);
    })

//Pi

    $("#pi").click(function(){
        $("input:text").val(Math.PI);
    })
});