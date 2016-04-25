<% if(requireOption || !jqueryOption) {%>document.addEventListener("DOMContentLoaded", function() {<% } if(!requireOption && jqueryOption) {%>$(document).ready(function() {<% } %>
  <% if(requireOption) {%>requirejs.config({
    baseUrl: '<%= jsLibDirPath %>',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the javascript file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension.
        <% if(jqueryOption) {%>jquery: 'jquery.min',<% } %>
    }
  });<% } %>

  function init(){<% if(requireOption) { if(jqueryOption) {%>
    define('jQuery', ['jquery'], function () {});<% } %>

    <% if(jqueryOption) {%>require(['jQuery'], function() {
      if (window.jQuery != 'undefined') {
        console.log('is jQuery');
      }
    });<% } } %>
  }

  init();

});
