var fdb = new ForerunnerDB();
// 創造資料庫
var db = fdb.db( "myDB" );
// 創造資料表
var myCollection = db.collection( 'myCollection' );
myCollection.load( show );

function show() {

	window.category = [ {
		kind: "食",
		much: 0
	}, {
		kind: "衣",
		much: 0
	}, {
		kind: "住",
		much: 0
	}, {
		kind: "行",
		much: 0
	}, {
		kind: "育",
		much: 0
	}, {
		kind: "樂",
		much: 0
	}, {
		kind: "其它",
		much: 0
		 } ];

	$( "#myTbody" )
		.text( "" );
	$( "#myTbody2" )
		.text( "" );
	var sFromDate = $( ".form_from" )
		.val();
	var sToDate = $( ".form_to" )
		.val();

	var data = myCollection.find( {
		date: {
			$gte: sFromDate,
			$lte: sToDate
		}
	}, {
		$orderBy: {
			date: -1
		}
	} );

	console.log( data );
	data.forEach( function ( item, index ) {
		$( "#myTbody" )
			.append( $( "<tr>" )
				.append( $( "<td>" )
					.text( index + 1 ) )
				.append( $( "<td>" )
					.text( item.date ) )
				.append( $( "<td>" )
					.text( item.kind ) )
				.append( $( "<td>" )
					.text( item.price ) )
				.append( $( "<td>" )
					.text( item.remark ) ) )
	} )

	for ( var i = 0; i < data.length; i++ ) {
		for ( var j = 0; j < category.length; j++ ) {
			if ( data[ i ].kind == category[ j ].kind ) {
				category[ j ].much += Number( data[ i ].price );
			}
		}
	}



	for ( var i = 0; i < category.length; i++ ) {

		if ( category[ i ].much == 0 ) {
			var a = "0%";
		} else {
			var a = ( ( category[ i ].much / allMuch() * 100 )
				.toFixed( 1 ) ) + "%";
		}


		$( "#myTbody2" )
			.append(
				$( "<tr>" )
				.append( $( "<td>" )
					.text( category[ i ].kind ) )
				.append( $( "<td>" )
					.text( category[ i ].much ) )
				.append( $( "<td>" )
					.text( a ) ) );
	}
}

function allMuch() {
	var allMuch = 0;
	for ( var i = 0; i < category.length; i++ ) {
		allMuch += Number( category[ i ].much );
	}
	return allMuch;
}


$( btn_search_month )
	.on( "click", function () {
		var d = new Date();
		var dat = {
			year: d.getFullYear() + "",
			month: ( d.getMonth() + 1 ) + "",
			date: d.getDate() + ""
		}
		if ( dat.month.length < 2 ) {
			dat.month += "0";
		}
		if ( dat.date.length < 2 ) {
			dat.date += "0";
		}
		for ( ; dat.year.length < 4; i++ ) {
			dat.year += "0";
		}
		$( "#date2" )
			.val( dat.year + "-" + dat.month + "-" + "01" );
		$( "#date" )
			.val( dat.year + "-" + dat.month + "-" + dat.date );
		show();
	} );
$( "#btn_search_date" )
	.on( "click", show );
