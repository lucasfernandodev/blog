export default function Slugify( str: string ): string{
  
  let string = str;

	string = string.replace(/^\s+|\s+$/g, ''); // trim
	string = string.toLowerCase();

  string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñçěščřžýúůďťň·/_,:;";
	var to   = "aaaaeeeeiiiioooouuuuncescrzyuudtn------";

	for (var i=0, l=from.length ; i<l ; i++)
	{
		string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	string = string.replace('.', '-') // replace a dot by a dash 
		.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by a dash
		.replace(/-+/g, '-') // collapse dashes
		.replace( /\//g, '' ); // collapse all forward-slashes

	return string;
}