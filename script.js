$( document ).ready(function() {

    $.get( "https://spreadsheets.google.com/feeds/cells/1kN6n8hUc_prFY6Ohq3VQI7Wj2d039m-ovX3j7vUSM-g/1/public/full?alt=json", function( data ) {
        console.log(data.feed.entry)
        var test = data.feed.entry

        var monTableau = []; // On déclare un nouveau tableau qui va recevoir toute les données sauf entête
        var enTete = []; // On déclare un nouveau tableau qui va recevoir le nom des colonnes.

        $.each( test, function( key, value ) {
            // console.log( key + ": " + value );
            console.log( value.gs$cell.inputValue); // WORKING

            if(value.gs$cell.row === "1") // Si la cellule = 1 alors on remplie le tableau en tête.
            {

                //enTete += [value.gs$cell.inputValue]
                enTete.push(value.gs$cell.inputValue)

            }
            else
            {


                if(value.gs$cell.col === `${enTete.length}`){ // Ici on dit que si a colonne est égale au nombre total d'entête dans la tableau on met un passage à la ligne.

                var aLaLigne = "<br/>"

                }
                else
                {

                    var aLaLigne = " - "

                }

                monTableau += [value.gs$cell.inputValue + aLaLigne]

            }


        });

        $('#afficheData').html(enTete + "<br/>" + monTableau) // On affiche le tableau d'entête + le tableau.

        console.log(monTableau)
        console.log("En-tête : " + enTete.length)


        //alert( "Load was performed." );
    });

});