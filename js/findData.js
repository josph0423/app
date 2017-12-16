function show( query ) {
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
		},
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
	for ( var i = 0; i < data.length; i++ ) {
		for ( var j = 0; j < category.length; j++ ) {
			if ( data[ i ].kind == category[ j ].kind ) {
				category[ j ].much += Number( data[ i ].price );
			}
		}
	}



	for ( var i = 0; i < category.length; i++ ) {
		$( "#myTbody2" )
			.append(
				$( "<tr>" )
				.append( $( "<td>" )
					.text( category[ i ].kind ) )
				.append( $( "<td>" )
					.text( category[ i ].much ) )
				.append( $( "<td>" )
					.text( function {
							if ( category[ i ].much == 0 ) {
								return "0%";
							} else {
								var a = ( category[ i ].much / allMuch() * 100 )
									.toFixed( 2 ) + "%" );
							return a;
						}
					}
				)
			)
	}

}

function allMuch() {
	var allMuch = 0;
	for ( var i = 0; i < category.length; i++ ) {
		allMuch += category[ i ].much;
	}
	return allMuch;
}

var fdb = new ForerunnerDB();
// 創造資料庫
var db = fdb.db( "myDB" );
// 創造資料表
var myCollection = db.collection( 'myCollection' );
myCollection.load();

show();

$( "#btn_search_date" )
	.on( "click", show );
