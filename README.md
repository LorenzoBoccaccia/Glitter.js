Glitter.js: It's Fabolous
=================================

Glitter.js is a library for creating eye catching effects on normally boring text

Integrating glitter in your code is as easy as including the script itself:

    <script type="text/javascript" src="glitter.js"></script>

Then you can start the awesome with:

    glitter('#text-id', {
        loopPeriod: 5000,        //ms between each glitter
        maxIteration: undefined, //maximum number of glitters
        accentTime: 100,         //time the accent class is shown
        highlightTime: 20,        //time the highlight class is shown 
        downlightTime: 20,        //time the downlight class is shown
        rtl: false,              //direction of the glitter
        travelPeriod: 40,        //ms between each subsequent letter glitter
        flipping: false          //makes half loop between default and accent
    });
    
and that's it!

The library rolls these 4 css classes along the text characters:

        glitter-default   //class the text is normally at
        glitter-highlight //class the text gets before the accent
        glitter-accent    //class that represent the highlighted text
        glitter-downlight //class the text gets after the accent
        
Normally the classes are applied in order according to the timed defined in the configuration; the only difference of note is when using 'flipping: true', which maintains the accent for a whole half loop before showing the default again on the next loop.
        
See more samples [here](https://cdn.rawgit.com/lookcast/Glitter.js/master/index.html) 



Glitter.js was was built as part of the fashiontech application [LOOKCAST](http://www.lookcast.com)

Beware of browser timers! Background tabs fire them at a reduced rate.
Use instead the wonderful HackTimer library found here:
https://github.com/turuslan/HackTimer

     
 