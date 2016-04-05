<% if(requireOption || !jqueryOption) {%>document.addEventListener 'DOMContentLoaded', -><% } %><% if(!requireOption && jqueryOption) {%>$(document).ready -><% } %>

  <% if(requireOption) {%>
  # the left side is the module ID,
  # the right side is the path to
  # the javascript file, relative to baseUrl.
  # Also, the path should NOT include
  # the '.js' file extension.
  requirejs.config
    baseUrl: '<%= jsLibDirPath %>'
    <% if(jqueryOption) {%>paths: jquery: 'jquery.min'<% } %><% } %>

  init = ->
    <% if(requireOption) {%><% if(jqueryOption) {%>define 'jQuery', [ 'jquery' ], ->
    require [ 'jQuery' ], ->
      if window.jQuery != 'undefined'
        console.log 'is jQuery'
      return
    return<% } %><% } %>


  init()
  return
