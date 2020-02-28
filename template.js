export default () => {
    return `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <meta name="description" content="Premium Quality and Responsive UI for Dashboard.">
        <meta name="author" content="ThemePixels">
    
        <title>Bracket Responsive Bootstrap 4 Admin Template</title>
    
        <!-- vendor css -->
        <link href="/lib/font-awesome/css/font-awesome.css" rel="stylesheet">
        <link href="/lib/Ionicons/css/ionicons.css" rel="stylesheet">
        <link href="/lib/perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet">
        <link href="/lib/jquery-switchbutton/jquery.switchButton.css" rel="stylesheet">
        <link href="/lib/rickshaw/rickshaw.min.css" rel="stylesheet">
        <link href="/lib/chartist/chartist.css" rel="stylesheet">
        <link href="/lib/jquery-toggles/toggles-full.css" rel="stylesheet">

        <!-- Bracket CSS -->
        <link rel="stylesheet" href="/css/bracket.css">
      </head>
        <body>
                <div id="root"></div>
                <script type="text/javascript" src="/dist/bundle.js"></script>
                
                
        <script src="/lib/jquery/jquery.js"></script>
        <script src="/lib/popper.js/popper.js"></script>
        <script src="/lib/bootstrap/bootstrap.js"></script>
        <script src="/lib/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
        <script src="/lib/moment/moment.js"></script>
        <script src="/lib/jquery-ui/jquery-ui.js"></script>
        <script src="/lib/jquery-switchbutton/jquery.switchButton.js"></script>
        <script src="/lib/peity/jquery.peity.js"></script>
        <script src="/lib/highlightjs/highlight.pack.js"></script>
        <script src="/lib/select2/js/select2.min.js"></script>
        <script src="/lib/jquery-toggles/toggles.min.js"></script>
    
        <script src="/js/bracket.js"></script>
        <script>
            $(function(){
            'use strict'

            // Toggles
            $('.toggle').toggles({
              on: true,
              height: 26
            });
    
    
            $('.form-layout .form-control').on('focusin', function(){
                $(this).closest('.form-group').addClass('form-group-active');
            });
    
            $('.form-layout .form-control').on('focusout', function(){
                $(this).closest('.form-group').removeClass('form-group-active');
            });
    
            // Select2
            $('#select2-a, #select2-b').select2({
                minimumResultsForSearch: Infinity
            });
    
            $('#select2-a').on('select2:opening', function (e) {
                $(this).closest('.form-group').addClass('form-group-active');
            });
    
            $('#select2-a').on('select2:closing', function (e) {
                $(this).closest('.form-group').removeClass('form-group-active');
            });
    
            });
        </script>
        </body> 
    </html>`  
}

{/* <script src="../lib/jquery/jquery.js"></script>
    <script src="../lib/popper.js/popper.js"></script>
    <script src="../lib/bootstrap/bootstrap.js"></script>
    <script src="../lib/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
    <script src="../lib/moment/moment.js"></script>
    <script src="../lib/jquery-ui/jquery-ui.js"></script>
    <script src="../lib/jquery-switchbutton/jquery.switchButton.js"></script>
    <script src="../lib/peity/jquery.peity.js"></script>
    <script src="../lib/highlightjs/highlight.pack.js"></script>
    <script src="../lib/select2/js/select2.min.js"></script>
    <script src="../lib/jquery-toggles/toggles.min.js"></script>
    <script src="../lib/jt.timepicker/jquery.timepicker.js"></script>
    <script src="../lib/spectrum/spectrum.js"></script>
    <script src="../lib/jquery.maskedinput/jquery.maskedinput.js"></script>
    <script src="../lib/bootstrap-tagsinput/bootstrap-tagsinput.js"></script>
    <script src="../lib/ion.rangeSlider/js/ion.rangeSlider.min.js"></script> */}