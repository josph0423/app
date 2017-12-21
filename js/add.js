var fdb = new ForerunnerDB();
var myDB = fdb.db( "myDB" );
var myCollection = myDB.collection( 'myCollection' );
myCollection.load( show );

function show() {
	var data = myCollection.find();
	console.log( data );
}

$( "#button" )
	.on( "click", function () {
		var data = {
			date: $( "#date" )
				.val(),
			kind: $( "#kind" )
				.val(),
			price: $( "#price" )
				.val(),
			remark: $( "#remark" )
				.val()
		}
		if ( data.date != "" &&
			data.kind != "" &&
			data.price != "" ) {
			myCollection.insert( data );
			myCollection.save( show );
			$( "#date" )
				.val( "" );
			$( "#kind" )
				.val( "" );
			$( "#price" )
				.val( "" );
			$( "#remark" )
				.val( "" );
			window.location.href = "index2.html";
		}
	} );
