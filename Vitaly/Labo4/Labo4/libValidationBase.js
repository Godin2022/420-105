/* 	Nom du script: libValidationBase.js
	Auteurs: Ronald Jean-Julien et Vitaly Savin
	Date: Le 4/5/2022
	But: Librairie de fonctions pour des validations de base 
*/

// Retourne true si la donnée vaut null
// sinon retourne false
function estNull(donnee) {
	return (donnee == null);
}

// Retourne true si la donnée est un nombre (de type number)
// sinon retourne false
function estUnNombre(fltDonnee) {
	return ((!estNull(fltDonnee)) && (typeof fltDonnee == 'number'));
}

// Retourne true si la donnée est une chaîne (de type string)
// sinon retourne false
function estUneChaine(strDonnee) {
	return ((!estNull(strDonnee)) && (typeof strDonnee == 'string'));
}

// Retourne true si les deux données sont de même type
// sinon retourne false
function sontDeMemeType(donnee1, donnee2, donnee3 = false) {
	return ((!estNull(donnee1)) && (!estNull(donnee2) && (!estNull(donnee3)) && (typeof donnee1 == typeof donnee2) && (!donnee3 || (typeof donnee2 == typeof donnee3))));
}

// Retourne true si une donnée est située entre une valeur et une autre valeur
// sinon retourne false; les données doivent toutes être de même type
function estDansIntervalle(donnee, valeur1, valeur2) {
	return sontDeMemeType(donnee,valeur1,valeur2) ? ((donnee>=valeur1)&&(donnee<=valeur2)) : false;
	// return((donnee>=valeur1)&&(donnee<=valeur2));
}

// Retourne true si une chaîne de caractères contient un nombre
// sinon retourne false
function contientSeulementUnNombre(strDonnee) {
	return strDonnee && estUneChaine(strDonnee) ? !isNaN(Number(strDonnee)) && (!!strDonnee.trim()) : false;
}

// Retourne true si une chaîne de caractères contient un nombre entier
// sinon retourne false
function contientSeulementUnNombreEntier(strDonnee) {
	return contientSeulementUnNombre(strDonnee) ? Number.isInteger(Number(strDonnee)) : false;
}

// Retourne true si une chaîne de caractères est vide
// sinon retourne false
function estUneChaineVide(strDonnee) {
	return estUneChaine(strDonnee) ? strDonnee == "" : false;
}

// Retourne true si une chaîne de caractères ne contient que des caractères blancs
// sinon retourne false
function estUneChaineBlanche(strDonnee) {
	return estUneChaine(strDonnee) ? strDonnee.trim() == "" : false;
}

// Retourne true si une chaîne de caractères contient un seul chiffre
// sinon retourne false
function estUnCaractereNumerique(strDonnee) {
	return estUneChaine(strDonnee) && contientSeulementUnNombreEntier(strDonnee) && strDonnee.length == 1 ? estDansIntervalle(strDonnee,'0','9') : false;
}

// Retourne true si une chaîne de caractères contient une seule lettre
// sinon retourne false
function estUnCaractereAlpha(strDonnee) {
	return estUneChaine(strDonnee) ? (estDansIntervalle(strDonnee,'a','z') || estDansIntervalle(strDonnee,'A','Z')) : false;
}

// Retourne true si une chaîne de caractères contient un seul chiffre ou une seule lettre
// sinon retourne false
function estUnCaractereAlphaNumerique(strDonnee) {
    return estUnCaractereNumerique(strDonnee) || estUnCaractereAlpha(strDonnee)
}

// Retourne true si un caractère est présent parmi les choix
// sinon retourne false
function estUnCaractereValide(strCaractere, strChoixCaracteres) {
	if (estUneChaine(strCaractere) && estUneChaine(strChoixCaracteres) && strCaractere.length == 1){
		return strChoixCaracteres.indexOf(strCaractere) != -1
	} else return false;
}

// Retourne true si une donnée est dans un format valide
// sinon retourne false
// Dans le format, # représente un chiffre, @ représente une lettre
// tout autre caractère est le caractère lui-même 
function estDansUnFormatValide(strDonnee, strFormat) {
	let result = true;
	if (estUneChaine(strDonnee) && estUneChaine(strFormat) && strDonnee.length==strFormat.length){

		for(i=0;i<strFormat.length;i++){
			a = strDonnee.charAt(i);
			b = strFormat.charAt(i);
			if(b=='@'){
				result = estUnCaractereAlpha(a);
			}else if(b=='#'){
				result = estUnCaractereNumerique(a);
			}else if (a == b){ 
				result = true;
			} else {
				result = false;
			}
			if (!result) return result; 
		}
		return result
	} else return false;
}

// Retourne true si une donnée est un code postal
// sinon retourne false
function estUnCodePostal(strDonnee) {
	return estDansUnFormatValide(strDonnee,'@#@ #@#')
}

// Retourne true si une donnée est un numéro d'assurance sociale
// sinon retourne false
function estUnNAS(strDonnee) {
    return estDansUnFormatValide(strDonnee,'### ### ###')
}

// Retourne true si une donnée est un matricule
// sinon retourne false
function estUnMatricule(strDonnee) {
    return estDansUnFormatValide(strDonnee,'#######')
}

// Retourne true si une donnée est un code permanent
// sinon retourne false
function estUnCodePermanent(strDonnee) {
    return estDansUnFormatValide(strDonnee,'@@@@########')
}

// Retourne true si une donnée est un numéro de téléphone
// sinon retourne false
function estUnNoDeTelephone(strDonnee) {
    return estDansUnFormatValide(strDonnee,'(###) ###-####') || estDansUnFormatValide(strDonnee,'### ###-####')
}

function main() {
// Pour tester
console.log('estNull(56) '+estNull(56));
console.log('estNull(\'56Allo\') '+estNull('56Allo'));
console.log('estNull(true) '+estNull(true));
console.log('estNull(null) '+estNull(null));

console.log('estDansIntervalle(6, 4, 8)) '+estDansIntervalle(6, 4, 8));
console.log('(estDansIntervalle(4, 4, 8)) '+estDansIntervalle(4, 4, 8));
console.log('estDansIntervalle(8, 4, 8)) '+estDansIntervalle(8, 4, 8));
console.log('(estDansIntervalle(9, 4,8)) '+estDansIntervalle(9, 4,8));
console.log('estDansIntervalle(3, 4, 8)) '+estDansIntervalle(3, 4, 8));
console.log('(estDansIntervalle(6, 8,4)) '+estDansIntervalle(6, 8,4));
console.log('(estDansIntervalle(\'6\', 4, 8)) '+estDansIntervalle('6', 4, 8));
console.log('(estDansIntervalle(6, \'4\', 8)) '+estDansIntervalle(6, '4', 8));
console.log('(estDansIntervalle(\'d\', \'a\', \'z\')) '+estDansIntervalle('d', 'a', 'z'));
console.log('(estDansIntervalle((\'d\', \'e\', \'z\')))'+estDansIntervalle(('d', 'e', 'z')));
console.log('(estDansIntervalle(\'D\', \'A\', \'Z\'))'+estDansIntervalle('D', 'A', 'Z'));
console.log('(estDansIntervalle(\'Jean\', \'Janette\', \'Julius\')) '+estDansIntervalle('Jean', 'Janette', 'Julius'));

console.log("contientSeulementUnNombre(60) doit retourner false: "+contientSeulementUnNombre(60));
console.log("contientSeulementUnNombre(60.1) doit retourner false : "+contientSeulementUnNombre(60.1));
console.log("contientSeulementUnNombre('') doit retourner false : "+contientSeulementUnNombre(''));
console.log("contientSeulementUnNombre(' ') doit retourner false : "+contientSeulementUnNombre(' '));
console.log("contientSeulementUnNombre('60') doit retourner true : "+contientSeulementUnNombre('60'));
console.log("contientSeulementUnNombre('60s') doit retourner false : "+contientSeulementUnNombre('60s'));
console.log("contientSeulementUnNombre('60.1') doit retourner true : "+contientSeulementUnNombre('60.1'));
console.log("contientSeulementUnNombre('Allo') doit retourner false : "+contientSeulementUnNombre('Allo'));
console.log("contientSeulementUnNombre('-60') doit retourner true : "+contientSeulementUnNombre('-60'));
console.log("contientSeulementUnNombre('-60.1') doit retourner true : "+contientSeulementUnNombre('-60.1'));
console.log("contientSeulementUnNombre(true) doit retourner false : "+contientSeulementUnNombre(true));

console.log("contientSeulementUnNombreEntier('60') doit retourner true : "+contientSeulementUnNombreEntier('60'));
console.log("contientSeulementUnNombreEntier('60.1') doit retourner false : "+contientSeulementUnNombreEntier('60.1'));
console.log("contientSeulementUnNombreEntier(60) doit retourner false: "+contientSeulementUnNombreEntier(60));
console.log("contientSeulementUnNombreEntier(60.1) doit retourner false : "+contientSeulementUnNombreEntier(60.1));
console.log("contientSeulementUnNombreEntier('Allo') doit retourner false: "+contientSeulementUnNombreEntier('Allo'));
console.log("contientSeulementUnNombreEntier('60s') doit retourner false : "+contientSeulementUnNombreEntier('60s'));
console.log("contientSeulementUnNombreEntier('-60') doit retourner true : "+contientSeulementUnNombreEntier('-60'));
console.log("contientSeulementUnNombreEntier ('-60.1') doit retourner false : "+contientSeulementUnNombreEntier ('-60.1'));
console.log("contientSeulementUnNombreEntier('') doit retourner false: "+contientSeulementUnNombreEntier(''));
console.log("contientSeulementUnNombreEntier(' ') doit retourner false : "+contientSeulementUnNombreEntier(' '));
console.log("contientSeulementUnNombreEntier(true) doit retourner false : "+contientSeulementUnNombreEntier(true));

console.log("estUneChaineVide(0) doit retourner false: "+estUneChaineVide(0));
console.log("estUneChaineVide(null) doit retourner false: "+estUneChaineVide(null));
console.log("estUneChaineVide('') doit retourner true: "+estUneChaineVide(''));
console.log("estUneChaineVide(' ') doit retourner false: "+estUneChaineVide(' '));
console.log("estUneChaineVide('\\n') doit retourner false: "+estUneChaineVide('\n'));
console.log("estUneChaineVide('Allo') doit retourner false: "+estUneChaineVide('Allo'));
 
console.log("estUneChaineBlanche(0) doit retourner false: "+estUneChaineBlanche(0) );
console.log("estUneChaineBlanche(' ') doit retourner true: "+estUneChaineBlanche(' '));
console.log("estUneChaineBlanche('\\n') doit retourner true: "+estUneChaineBlanche('\n'));
console.log("estUneChaineBlanche('\\t') doit retourner true: "+estUneChaineBlanche('\t'));
console.log("estUneChaineBlanche('\\t\\n \\n\\t') doit retourner true: "+estUneChaineBlanche('\t\n \n\t'));
console.log("estUneChaineBlanche('\\t\\n0\\n\\t') doit retourner false: "+estUneChaineBlanche('\t\n0\n\t') );
console.log("estUneChaineBlanche(' 0 ') doit retourner false: "+estUneChaineBlanche(' 0 ') );
console.log("estUneChaineBlanche('Allo') doit retourner false: "+estUneChaineBlanche('Allo') );
console.log("estUneChaineBlanche(' ') doit retourner true: "+estUneChaineBlanche(' '));
console.log("estUneChaineBlanche(' Allo ') doit retourner false: "+estUneChaineBlanche(' Allo ') );
 
console.log("estUnCaractereNumerique(0) doit retourner false: "+estUnCaractereNumerique(0) );
console.log("estUnCaractereNumerique(null) doit retourner false: "+estUnCaractereNumerique(null) );
console.log("estUnCaractereNumerique(6) doit retourner false: "+estUnCaractereNumerique(6) );
console.log("estUnCaractereNumerique(61) doit retourner false: "+estUnCaractereNumerique(61) );
console.log("estUnCaractereNumerique('') doit retourner false: "+estUnCaractereNumerique('') );
console.log("estUnCaractereNumerique ('6') doit retourner true: "+estUnCaractereNumerique ('6'));
console.log("estUnCaractereNumerique('-6') doit retourner false: "+estUnCaractereNumerique('-6') );
console.log("estUnCaractereNumerique ('61') doit retourner false: "+estUnCaractereNumerique ('61') );
console.log("estUnCaractereNumerique('D') doit retourner false: "+estUnCaractereNumerique('D') );
console.log("estUnCaractereNumerique ('6D') doit retourner false: "+estUnCaractereNumerique ('6D') );

console.log("estUnCaractereAlpha(0) doit retourner false: "+estUnCaractereAlpha(0) );
console.log("estUnCaractereAlpha(null) doit retourner false: "+estUnCaractereAlpha(null) );
console.log("estUnCaractereAlpha(6) doit retourner false: "+estUnCaractereAlpha(6) );
console.log("estUnCaractereAlpha(true) doit retourner false: "+estUnCaractereAlpha(true) );
console.log("estUnCaractereAlpha('') doit retourner false: "+estUnCaractereAlpha('') );
console.log("estUnCaractereAlpha('6') doit retourner false: "+estUnCaractereAlpha('6') );
console.log("estUnCaractereAlpha('d') doit retourner true: "+estUnCaractereAlpha('d'));
console.log("estUnCaractereAlpha('a') doit retourner true: "+estUnCaractereAlpha('a'));
console.log("estUnCaractereAlpha('D') doit retourner true: "+estUnCaractereAlpha('D'));
console.log("estUnCaractereAlpha('ZD') doit retourner false: "+estUnCaractereAlpha('ZD') );
console.log("estUnCaractereAlpha('Z') doit retourner true: "+estUnCaractereAlpha('Z'));
console.log("estUnCaractereAlpha('z') doit retourner true: "+estUnCaractereAlpha('z'));
console.log("estUnCaractereAlpha(',') doit retourner false: "+estUnCaractereAlpha(',') );
console.log("estUnCaractereAlpha(' $') doit retourner false: "+estUnCaractereAlpha(' $') );

console.log("estUnCaractereAlphaNumerique(0) doit retourner false: "+estUnCaractereAlphaNumerique(0) );
console.log("estUnCaractereAlphaNumerique(null) doit retourner false: "+estUnCaractereAlphaNumerique(null) );
console.log("estUnCaractereAlphaNumerique(6) doit retourner false: "+estUnCaractereAlphaNumerique(6) );
console.log("estUnCaractereAlphaNumerique(true) doit retourner false: "+estUnCaractereAlphaNumerique(true) );
console.log("estUnCaractereAlphaNumerique('') doit retourner false: "+estUnCaractereAlphaNumerique('') );
console.log("estUnCaractereAlphaNumerique('6') doit retourner true: "+estUnCaractereAlphaNumerique('6') );
console.log("estUnCaractereAlphaNumerique('d') doit retourner true: "+estUnCaractereAlphaNumerique('d'));
console.log("estUnCaractereAlphaNumerique('a') doit retourner true: "+estUnCaractereAlphaNumerique('a'));
console.log("estUnCaractereAlphaNumerique('D') doit retourner true: "+estUnCaractereAlphaNumerique('D'));
console.log("estUnCaractereAlphaNumerique('ZD') doit retourner false: "+estUnCaractereAlphaNumerique('ZD') );
console.log("estUnCaractereAlphaNumerique('Z') doit retourner true: "+estUnCaractereAlphaNumerique('Z'));
console.log("estUnCaractereAlphaNumerique('z') doit retourner true: "+estUnCaractereAlphaNumerique('z'));
console.log("estUnCaractereAlphaNumerique(',') doit retourner false: "+estUnCaractereAlphaNumerique(',') );
console.log("estUnCaractereAlphaNumerique(' $') doit retourner false: "+estUnCaractereAlphaNumerique(' $') );
console.log("estUnCaractereAlphaNumerique('0') doit retourner true: "+estUnCaractereAlphaNumerique('0') );
console.log("estUnCaractereAlphaNumerique(null) doit retourner false: "+estUnCaractereAlphaNumerique(null) );
console.log("estUnCaractereAlphaNumerique(6) doit retourner false: "+estUnCaractereAlphaNumerique(6) );
console.log("estUnCaractereAlphaNumerique(61) doit retourner false: "+estUnCaractereAlphaNumerique(61) );
console.log("estUnCaractereAlphaNumerique('') doit retourner false: "+estUnCaractereAlphaNumerique('') );
console.log("estUnCaractereAlphaNumerique ('6') doit retourner true: "+estUnCaractereAlphaNumerique ('6'));
console.log("estUnCaractereAlphaNumerique('-6') doit retourner false: "+estUnCaractereAlphaNumerique('-6') );
console.log("estUnCaractereAlphaNumerique ('61') doit retourner false: "+estUnCaractereAlphaNumerique ('61') );
console.log("estUnCaractereAlphaNumerique('D') doit retourner true: "+estUnCaractereAlphaNumerique('D') );
console.log("estUnCaractereAlphaNumerique ('6D') doit retourner false: "+estUnCaractereAlphaNumerique ('6D') );

console.log("estUnCaractereValide('Q', 'PQR') devrait retourner true : "+estUnCaractereValide('Q', 'PQR'));
console.log("estUnCaractereValide('S', 'PQR') devrait retourner false : "+estUnCaractereValide('S', 'PQR'));
console.log("estUnCaractereValide('PQ', 'PQR') devrait retourner false : "+estUnCaractereValide('S', 'PQR'));

console.log("estDansUnFormatValide('G9H 3N6', '@#@ #@#') devrait retourner true : "+estDansUnFormatValide('G9H 3N6', '@#@ #@#'));
console.log("estDansUnFormatValide('G9H 3NB', '@#@ #@#') devrait retourner false : "+estDansUnFormatValide('G9H 3NB', '@#@ #@#'));
console.log("estDansUnFormatValide('G9H3NB', '@#@ #@#') devrait retourner false : "+estDansUnFormatValide('G9H3NB', '@#@ #@#'));
console.log("estDansUnFormatValide('G9H 3NB', '@#@#@#') devrait retourner false : "+estDansUnFormatValide('G9H 3NB', '@#@#@#'));
console.log("estDansUnFormatValide('G9H  3NB', '@#@ @#@') devrait retourner false : "+estDansUnFormatValide('G9H  3NB', '@#@ @#@'));

console.log("estUnCodePostal('G9H 3N6') devrait retourner true : "+estUnCodePostal('G9H 3N6'));
console.log("estUnCodePostal('G9H 3NB') devrait retourner false : "+estUnCodePostal('G9H 3NB'));
console.log("estUnCodePostal('G9H3NB') devrait retourner false : "+estUnCodePostal('G9H3NB'));
console.log("estUnCodePostal('G9H 3NB') devrait retourner false : "+estUnCodePostal('G9H 3NB'));
console.log("estUnCodePostal('G9H  3NB') devrait retourner false : "+estUnCodePostal('G9H  3NB'));

console.log("estUnNAS('235 456 789') devrait retourner true : "+estUnNAS('235 456 789'));
console.log("estUnNAS('G9H 235 456 789') devrait retourner false : "+estUnNAS('G9H 235 456 789'));
console.log("estUnNAS('235456 789') devrait retourner false : "+estUnNAS('235456 789'));
console.log("estUnNAS('G9H 3NB 3NB') devrait retourner false : "+estUnNAS('G9H 3NB 3NB'));
console.log("estUnNAS('           ') devrait retourner false : "+estUnNAS('           '));
console.log("estUnNAS('') devrait retourner false : "+estUnNAS(''));
console.log("estUnNAS(null) devrait retourner false : "+estUnNAS(null));
console.log("estUnNAS(235456789) devrait retourner false : "+estUnNAS(235456789));

console.log("estUnMatricule(1234567) devrait retourner false : "+estUnMatricule(1234567));
console.log("estUnMatricule('1234567') devrait retourner true : "+estUnMatricule('1234567'));
console.log("estUnMatricule('124567') devrait retourner false : "+estUnMatricule('124567'));
console.log("estUnMatricule('12 4567') devrait retourner false : "+estUnMatricule('12 4567'));
console.log("estUnMatricule('12A4567') devrait retourner false : "+estUnMatricule('12A4567'));

console.log("estUnCodePermanent(112312345678) devrait retourner false : "+estUnCodePermanent(112312345678));
console.log("estUnCodePermanent('ABCd12345678') devrait retourner true : "+estUnCodePermanent('ABCd12345678'));
console.log("estUnCodePermanent('ABCD12345678') devrait retourner true : "+estUnCodePermanent('ABCD12345678'));
console.log("estUnCodePermanent('ABCDE2345678') devrait retourner false : "+estUnCodePermanent('ABCDE2345678'));
console.log("estUnCodePermanent(undefined) devrait retourner false : "+estUnCodePermanent(undefined));
console.log("estUnCodePermanent(null) devrait retourner false : "+estUnCodePermanent(null));
console.log("estUnCodePermanent(NaN) devrait retourner false : "+estUnCodePermanent(NaN));
console.log("estUnCodePermanent('        ') devrait retourner false : "+estUnCodePermanent('        '));
console.log("estUnCodePermanent(['A','B','C','D','1','2','3','4','5','6','7','8']) devrait retourner false : "+estUnCodePermanent(['A','B','C','D','1','2','3','4','5','6','7','8']));

console.log("estUnNoDeTelephone(5145645676) devrait retourner false : "+estUnNoDeTelephone(5145645676));
console.log("estUnNoDeTelephone('(514) 564-5676') devrait retourner true : "+estUnNoDeTelephone('(514) 564-5676'));
console.log("estUnNoDeTelephone('514 564-5676') devrait retourner true : "+estUnNoDeTelephone('514 564-5676'));
console.log("estUnNoDeTelephone('51F 564-5676') devrait retourner false : "+estUnNoDeTelephone('51F 564-5676'));
console.log("estUnNoDeTelephone('514 5649-676') devrait retourner false : "+estUnNoDeTelephone('514 5649-676'));
console.log("estUnNoDeTelephone('514 564-676') devrait retourner false : "+estUnNoDeTelephone('514 564-676'));
console.log("estUnNoDeTelephone('514 5649676') devrait retourner false : "+estUnNoDeTelephone('514 5649676'));
}	