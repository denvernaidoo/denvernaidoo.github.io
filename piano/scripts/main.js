$( document ).ready(function() {
    // Handler for .ready() called.
    $(".lyric-line").click(function(){
        $lyricLine = $(this);
        $(".lyric-line").addClass("text-muted").removeClass("text-primary");
        $lyricLine.removeClass("text-muted").addClass("text-primary");

        var notes = $lyricLine.data("notes").split(",").map(function(i){
            var note = {
                note: "",
                octave: ""
            };
            note.note = i.substring(0,i.length - 1);
            note.octave = i.substring(i.length - 1,i.length);
            return note;
        });

        $('.button-bar').empty();

        notes.forEach(i => {
            var template = $('#button-template').html();
            template = template.replace(/{{note}}/g, i.note).replace(/{{octave}}/g, i.octave);
            $lyricLine.parents(".card-text").find('.button-bar').append(template);
            //$('.button-bar').append(template);
        });
    });

    $(document).on("click",".btn-note", function() {
        var note = $(this).data("note");
        var octave = $(this).data("octave");
        var piano = Synth.createInstrument('piano');
        piano.play(note, octave, 5);
    });

    $(".lyric-line").first().click();
}); 