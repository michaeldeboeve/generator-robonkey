<% if(requireOption || !jqueryOption) {%>document.addEventListener("DOMContentLoaded", function() {<% } %><% if(!requireOption && jqueryOption) {%>
$(document).ready(function() {<% } %>
  <% if(requireOption) {%>requirejs.config({
    baseUrl: '<%= jsLibDirPath %>',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the javascript file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension.
        <% if(requireOption && jqueryOption) {%>jquery: 'jquery.min'<% } %><% if(requireOption && !jqueryOption) {%>
        foo: 'foo.min'<% } %>
    }
  });<% } %>

  function init(){
    <% if(requireOption && jqueryOption) {%>define('jQuery', ['jquery'], function () {});<% } %><% if(requireOption && !jqueryOption) {%>define('foo', ['foo'], function () {});<% } %>

    <% if(requireOption && jqueryOption) {%>require(['jQuery'], function() {
      // your code
    });<% } %><% if(requireOption && !jqueryOption) {%>
    require(['foo'], function() {
      // your code
    });<% } %>
  }

  init();

});
