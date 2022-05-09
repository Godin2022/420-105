/* 	Nom du script: Labo3B.js
    Auteur: Vitaly Savin
    Date: Le 04/05/2022
    But: Demander, à l’utilisateur, de taper un nombre entier entre 1 et 100 inclusivement.
        A chaque fois que l’utilisateur tape un nombre, votre script doit indiquer à l’utilisateur si le nombre 
        au hasard est plus grand ou plus petit que le nombre qu’il a tapé.
        L’exécution de votre script doit se terminer lorsque l’utilisateur a réussi à trouver le nombre au hasard
        ou lorsque l’utilisateur appuie sur le bouton Annuler.
        Lorsque l’utilisateur réussit à trouver le nombre au hasard, votre script doit féliciter l’utilisateur et
        lui indiquer le nombre de coups que cela lui a pris pour trouver le nombre au hasard. Si l’utilisateur a
        appuyé sur le bouton Annuler, votre script doit afficher un message indiquant qu’il n’a pas réussi 
        à trouver le nombre */

function main() {
    let intNbNombresSaisis = 0;
    const intNombreCache = Math.floor(Math.random() * 100) + 1;
    console.log('intNombreCaché : ' + intNombreCache);
    let binTermine = false;

    do {
        let strNombreSaisi = prompt('Tapez le nombre caché' + ' (Annuler pour terminer): ', '');
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
                    let intNombreSaisi = parseInt(strNombreSaisi);
                    if (intNombreSaisi < 0 || intNombreSaisi > 100) {
                        alert('ERREUR: Le nombre que vous avez tapé est trop grand (>100) ou trop petit (<0)');
                    }
                    else {
                        intNbNombresSaisis++;
                        if (intNombreSaisi === intNombreCache) {
                            alert('Winner et nombre de tentatives c\'est: ' + intNbNombresSaisis);
                            binTermine = true;
                        } else {
                            if (intNombreSaisi < intNombreCache) {
                                alert('Le nombre entré est inférieur au nombre caché');
                            } else {
                                alert('Le nombre entré est supérieur au nombre caché');
                            }

                        }
                    }
                }
            }
        }
    } while (!binTermine);
    if (intNbNombresSaisis == 0) {
        alert('Vous n\'avez tapé aucun nombre');
    }
    if (!(intNombreSaisi === intNombreCache)){
        alert('Le jeu est terminé. Vous avez fait '+intNbNombresSaisis+' tentatives, mais n\'a pas deviné le nombre caché : '+intNombreCache);
    }
}
     