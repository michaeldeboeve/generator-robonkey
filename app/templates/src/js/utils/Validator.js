function Validator(){
  String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
  }



  /**
  * Validate all input fields in a container
  * @param target {DomElement}
  * @return Boolean
  */
  var validateForm = function( target ){

    var valid = true;

    // Radio
    target.find('.validate-radio').each(function(index, element){
            $(element).removeClass('error');
            var input = $(element).find('input[type="radio"]').first();

            if ( input.hasClass('is-required')){
                var name = $(element).find('input[type="radio"]').first().attr('name');
                if ( !validateRadioGroup(name) ){
                    $(element).addClass('error');
                    valid = false;
                }
            }
        });


    // Text
        target.find('.validate-text').each(function(index, element){
            $(element).removeClass('error');

      $(element).find('input').each(function(i, e){
        var input = $(e);

        if ( input.hasClass('is-required') && !$(element).hasClass('validate-ignore')){
          if ( !validateString(input)){
            $(element).addClass('error');
            valid = false;
          }
        }
      });

        });



    // Checkbox
        target.find('.validate-checkbox').each(function(index, element){
            $(element).removeClass('error');
            $(element).find('input[type="checkbox"]').each(function(i, e){
                if ( $(e).hasClass('is-required')){
                    if ( !validateCheckbox($(e).attr('name'))){
                        valid = false;
                        $(element).addClass('error');
                    }
                }
            });
        });



    // Email
        target.find('.validate-email').each(function(index, element){
            $(element).removeClass('error');
            var input = $(element).find('input[type="text"]');

            if ( input.hasClass('is-required')){
                if ( !validateEmail(input)){
                    $(element).addClass('error');
                    valid = false;
                }
            }
        });

    return valid;

  }




  /**
   * Validate a normal String in the form
   * @param {DOMElement} input Input to check
   * @return {Boolean}
   */
  var validateString = function( input ){

    var val = input.val();
    val = val.trim();
    if ( val === "" ){
      return false;
    }

    return true;

  }



  /**
   * Validate an email
   * @param {DOMElement} input Input to check
   * @return {Boolean}
   */
  var validateEmail = function( input ){

    var val = input.val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(val);

  }



  /**
   * Validate a number
   * @param {DOMElement} input Input to check
   * @return {Boolean}
   */
  var validateNumber = function( input ){
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
    var val = input.val();
    val = val.trim();
    return isNumeric(val);

  }



  /**
   * Check if the radio button group has been selected
   * @param {String} name Name of the radio button group
   * @return {Boolean}
   */
  var validateRadioGroup = function( name ){

    if ( $("input:radio[name='" + name + "']:checked").val() === undefined ){
      return false;
    }
    return true;

  }



  /**
   * Check if the checkbo has been checked
   * @param {String} name Name of the checkbox to check
   * @return {Boolean}
   */
  var validateCheckbox = function( name ){

    if ( $("input:checkbox[name='" + name + "']:checked").val() === undefined ){
      return false;
    }
    return true;
  }



  /**
  * Check if this is a Number
  * @return {Boolean}
  */
  var isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }



  /**
   * Check if this is a valid date
   * @param {DomElement} Input element to check
   * @return {Boolean}
   */
   var validateDate = function( input ){
     //var date = /^\d{2}([./-])\d{2}\1\d{4}$/
     var date = /^\d{2}([-])\d{2}\1\d{4}$/
     return date.test(input.val());
   }



  return {
    validateForm:validateForm,
    validateString:validateString,
    validateEmail:validateEmail,
    validateNumber:validateNumber,
    validateRadioGroup:validateRadioGroup,
    validateCheckbox:validateCheckbox,
    validateDate:validateDate,
    isNumeric:isNumeric
  }

}
