/* 
	Create a Mask in an email address
	This function create a mask using a valid email address.
	This is usefull when someone need to confirm the email used in a system
	Author: Gabriel Froes - https://gist.github.com/gabrielfroes
 */
function emailMask(email) {
	var maskedEmail = email.replace(/([^@\.])/g, "*").split('');
	var previous	= "";
	for(i=0;i<maskedEmail.length;i++){
		if (i<=1 || previous == "." || previous == "@"){
			maskedEmail[i] = email[i];
		}
		previous = email[i];
	}
	return maskedEmail.join('');
}

// Usage:
//	console.log ( emailMask("my.email@mydomain.com") );
// Output: my.e****@m*******.c**