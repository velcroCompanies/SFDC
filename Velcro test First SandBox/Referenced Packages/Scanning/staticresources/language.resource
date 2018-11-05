
var T = {
	language: "en",
	DB: {}
};

// lookup text by key and swap in variable data
T.convert = function(key, vars){
	var str = T.DB[T.language][key];
	if(typeof str == 'undefined'){
		return '';
	}
	if(typeof vars != 'undefined'){
		return T.sprintf(str, vars);
	}
	return str;
}

// javascript equivalent to sprintf
T.sprintf = function(str, vars){
	// find location of all tokens
	var regex = /(%[ds])/g
//	console.log('vars:', vars);
	var index = 0;
	var indices = [];
	while(match = regex.exec(str))
	{
	//	console.log(index, match);
		// see if we have a value for this token
		if(typeof vars[index] != 'undefined')
		{
			// make sure the value is the right type
			var token = match[1];
			indices.push(match.index);
			switch(token)
			{
				case '%s':
					if(typeof vars[index] != 'string'){
						vars[index] = '';
					}
					break;
				case '%d':
					if(typeof vars[index] != 'number')
					{
						try{
							vars[index] = parseInt(vars[index]);
						}
						catch(e){
							vars[index] = '';
						}
					}
					break;
				default:
					if(typeof vars[index] == 'undefined'){
						vars[index] = '';
					}
			}
		}
		
		index++;
	}
	
	// replace tokens starting from the end of the string so the replacement text doesn't throw off position of other tokens
	for(var ii=indices.length-1; ii>=0; --ii){
		str = str.slice(0, indices[ii]) + vars[ii] + str.slice(indices[ii]+2);
	}
	return str;
}

T.addDictionary = function(lang, json)
{
	lang = lang.split('_')[0];
	if(typeof json == 'string'){
		json = $.parseJSON(json);
	}
	T.DB[lang] = json;
}

T.init = function(lang){
	lang = lang.split('_')[0];
	if (typeof T.DB[lang] != 'undefined'){
		T.language = lang;
	}
}

T.DomScan = function(){

	// scan the dom and swap elements
	$(".lang").each(function(){
		var k = $( this ).attr('data-key');
		$( this ).html(T.convert(k));
	});
  
}