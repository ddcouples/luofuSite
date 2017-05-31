function rand(min,max){
	return Math.round(Math.random()*(max-min)+min);
}
function rndDecimals(min,max){
	return Math.random()*(max-min)+min;
}

export  {
	rand,
	rndDecimals
}