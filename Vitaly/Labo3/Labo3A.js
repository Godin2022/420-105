/* 	Nom du script: Labo3A.js
    Auteur: Vitaly Savin
    Date: Le 04/05/2022
    But: Demander des nombres à l'utilisateur 
         et afficher des statistiques sur ces nombres
*/

function main() {
    let intNbNombresSaisis = 0;
    let fltSomme = 0;
    let fltPlusPetit = Number.MAX_VALUE;
    let fltPlusGrand = -Number.MAX_VALUE;
    let binTermine = false;

    do {
        let strQuestion = 'Tapez le nombre #' + (intNbNombresSaisis + 1) + ' (Annuler pour terminer): ';
        let strNombreSaisi = prompt(strQuestion, '');
        binTermine = (strNombreSaisi == null);

        if (!binTermine) {
            if (strNombreSaisi.trim() == '') {
                alert('ERREUR: Vous n\'avez rien tapé');
            }
            else {
                if (isNaN(strNombreSaisi)) {
                    alert('ERREUR: Vous avez tapé autre chose qu\'un nombre');
                }
                else {
                    let fltNombreSaisi = parseFloat(strNombreSaisi);
                    if (!isFinite(fltNombreSaisi)) {
                        alert('ERREUR: Le nombre que vous avez tapé est trop grand ou trop petit');
                    }
                    else {
                        intNbNombresSaisis++;
                        fltSomme += fltNombreSaisi;
                        fltPlusPetit = (fltNombreSaisi < fltPlusPetit) ? fltNombreSaisi : fltPlusPetit;
                        fltPlusGrand = (fltNombreSaisi > fltPlusGrand) ? fltNombreSaisi : fltPlusGrand;
                        console.log('Somme: '+fltSomme);
                        console.log('Plus petit: '+fltPlusPetit);
                        console.log('Plus grand: '+fltPlusGrand);
                    }
                }
            }
        }
    } while (!binTermine);

    if (intNbNombresSaisis == 0) {
        alert('Vous n\'avez tapé aucun nombre');
    } else {
        alert('Vous avez tapé ' + intNbNombresSaisis + ' nombre(s)');
        alert('Le plus petit nombre est ' + fltPlusPetit);
        alert('Le plus grand nombre est ' + fltPlusGrand);
        alert('La somme des nombres est ' + fltSomme);
        alert('La moyenne des nombres est ' + (fltSomme / intNbNombresSaisis));
    }
}
