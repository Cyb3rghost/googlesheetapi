$( document ).ready(function() {

    $.get( "https://spreadsheets.google.com/feeds/cells/1kN6n8hUc_prFY6Ohq3VQI7Wj2d039m-ovX3j7vUSM-g/1/public/full?alt=json", function( data ) {
        console.log(data.feed.entry)
        var test = data.feed.entry

        var monTableau = []; // On déclare un nouveau tableau qui va recevoir toute les données sauf entête
        var enTete = []; // On déclare un nouveau tableau qui va recevoir le nom des colonnes.

        $.each( test, function( key, value ) {
            // console.log( key + ": " + value );
            console.log( value.gs$cell.inputValue); // WORKING

            var valeur = htmlEntities(value.gs$cell.inputValue) // ON nettoie le code qui provient de l'API celui qui n'est pas traiter.

            if(value.gs$cell.row === "1") // Si la cellule = 1 alors on remplie le tableau en tête.
            {

                //enTete += [value.gs$cell.inputValue]
                enTete.push(valeur.toUpperCase())

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

                monTableau += [valeur + aLaLigne]

            }


        });

        $('#afficheData').html(enTete + "<br/>" + monTableau) // On affiche le tableau d'entête + le tableau.

        console.log(monTableau)
        console.log("En-tête : " + enTete.length)


        //alert( "Load was performed." );
    });

});

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/*var HTMLEntities = function(str){
	var str = String(str), chars = {
	  '&':'&',
	  '"':'"',
	  '<':'<',
	  '>':'>'
	};
	for (var i in chars) 
	  	str=str.replace(new RegExp(i,'g'), chars[i]);
	return str;
};*/