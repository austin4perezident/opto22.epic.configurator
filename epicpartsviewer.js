// JavaScript Document, parts viewer

function EpicPartsViewer(divContainerID, sendPartCmd, showPartCmd, res, partsSW, partsCtlr, partsPwr, partsIO){  //partsIO, partsPwr, and partsCtlr are resources of parts
//sendPartCmd sends to the epic I/O unit. Res is location of artwork.

	var list = {};
	
	list.res = res;
	list.searchID = '#'+divContainerID+'list1';
	list.id = divContainerID+'list1';
	list.checkedArray = [];
	list.currentSearchArray = [];
	list.pointsize = 10;
	list.imagesArray = [];
	list.ioCategories = [];
	list.ioFeatures = ['aia', 'aiv', 'temp', 'lc', 'aoa', 'aov', 'iac', 'idc', 'oac', 'odc', 'simple', 'iso', 'hv', 'src', 'rs232', 'rs485'];

	this.init = init;
	function init(){
		
		$('#' + divContainerID).append('<div id="'+ list.id +'"><div class="selector" id="swSelector" state="0"><table class="selTitle"><tr><td style="padding-left:20px;">Software</td><td class="showhide"></td></tr></table></div><div class="selector" id="ctlrSelector" state="0"><table class="selTitle"><tr><td style="padding-left:20px;">EPIC Controller</td><td class="showhide"></td></tr></table></div><div class="selector" id="pwrSelector" state="0"><table class="selTitle"><tr><td style="padding-left:20px;">EPIC Power Supplies</td><td class="showhide"></td></tr></table></div><div class="selector" id="ioSelector" state="0"><table class="selTitle"><tr><td style="padding-left:20px;">Input/Output Modules</td><td class="showhide"></td></tr></table></div></div>');
		
		// ************************************************************************************** //
		// *************************** build software selector ********************************* //
		var $sw = $(list.searchID).find('div#swSelector').append('<div style="margin: 4px 20px"><p>The groov EPIC includes software need to control, monitor, share data, and connect with web services. Here is an interactive overview what each software component does and how it fit within the groov EPIC system: </p><div id="swdemo"><button id="swd_log" state=0><img src="'+list.res+'sw_controllogic.png"/><br/>Control Logic</button>&nbsp;<button id="swd_hmi" state=0><img src="'+list.res+'sw_hmi.png"/><br/>User Interface</button>&nbsp;<button id="swd_ent" state=0><img src="'+list.res+'sw_enterprise.png"/><br/>Enterprise</button>&nbsp;<button id="swd_3p" state=0><img src="'+list.res+'sw_3rdparty.png"/><br/>Interoperability</button>&nbsp;<button id="swd_ws" state=0><img src="'+list.res+'sw_webservices.png"/><br/>Web services</button>&nbsp;</div><div id="swlist"></div>');
		
		var swlist = '';
		for (var s=0; s<partsSW.length; s++){
			var partNo = partsSW[s].partNo;
			var des = partsSW[s].description;
			swlist += '<div class="part" index="'+s+'"><p>'+partNo+':&nbsp;'+des + '</p></div>';
		}
		$(list.searchID).find('div#swlist').append(swlist);
		
		$(list.searchID).find('button.swlist').on('click', this, function(e){
			e.preventDefault();
			var button = $(this);
			button.css('#333'); //cludge for ie and iPhone, which ignore the following command but do this one; must precede following for other platforms to work
			button.css({'background': '#333', 'color': '#fff', });

			button.siblings('button[class="swlist"]').css('color', '#fff') //#276193
				.css('background-color', '#C62F2F')//ab0d0d
				//cludge for ie and iPhone, which ignore the following command but do this one; must precede following for other platforms
				.css('background', '#C62F2F');
			
			switch(button.attr('id')){
				case 'swdemobtn':
					$(list.searchID).find('div#swdemo').show()
						.siblings('div').hide();
				break;
				case 'swlistbtn':
					$(list.searchID).find('div#swlist').show()
						.siblings('div').hide();
				break;
			}	
		});
		
		$(list.searchID).find('div#swlist').hide();
		var imgsrc = list.res+'swdemobtnbkgd.png';
		$(list.searchID).find('button#swlistbtn').css({'background': '#C62F2F', 'color': '#fff', 'border':'none',});
		
		//Where am I? Trying to make a graphic as a background
		$(list.searchID).find('button#swdemobtn').css({'background': '#333', 'color': '#fff', 'border':'none', });//'background-image': 'url ("images/swdemobtnbkgd.png") no-repeat'
	
		var url = list.res + 'swdemo.svg'; 
		var ajax = new XMLHttpRequest();
		ajax.open("GET", url, true); // ajax.open("GET", url + ".svg", true);
		ajax.send();
		ajax.onload = function(e) {
			//var firstG = ajax.responseText.indexOf('<g>')
			//var lastG = ajax.responseText.lastIndexOf('</g>')
			//var slice1 = ajax.responseText.slice(firstG, lastG+4);
			//var image = '<svg>'+slice1+'</svg>'
			var image = ajax.responseText;
			$(list.searchID).find('div#swdemo').append(image);
			list.enableSwDemo();

		}; 
		
		// ********************************************************************************************
		// *************************** build Controller Selector **************************** //
		var $ctlr = $(list.searchID).find('div#ctlrSelector');
		$(list.searchID).find('table.selTitle').css({'width': '100%', 'background-color': '#C62F2F', 'color': '#fff', 'border-color': '#FFFFFF', 'border-style':'solid'})
		
		for (var i=0; i<partsCtlr.length; i++){
			var partNo = partsCtlr[i].partNo;
			var des = partsCtlr[i].description;
			var index = parseInt(list.imagesArray.push(partsCtlr[i].images));
			index -= 1;
		var str1 = '<div style="margin: 4px 20px;" class="part" index='+index+'><p>The groov EPIC controller is required with any epic I/O system. It is already selected and placed on the chassis. More information about the controller: </p> <table><tr><td>'+partNo+'</td><td>Description: '+des+'</td></tr></table><table class="ctrl"><tr> <td style="width:50%"><img src="'+list.res+partNo+'.png" index=0></img></td>  <td>  <table> <tr><td style="width: 50%"><button class="btn btn-default prevImg"><span style="font-size: 12px;" class="glyphicon glyphicon-triangle-left"></span></button><button class="btn btn-default nextImg"><span style="font-size: 12px;" class="glyphicon glyphicon-triangle-right"></span></button></td></tr> <tr> <td><p class="figcap"></p></td> </tr> </table></td> </tr></table></div>';
			$ctlr.append(str1);
		}
		
		$(list.searchID).find('button.prevImg').on('click', this, function(e){
			e.preventDefault();	
			var origin = $(this).parentsUntil('div.part').parent('div');
			var src = origin.attr('index');

			var thisImageSet = list.imagesArray[src];
			var length = parseInt(thisImageSet.length);

			var temp = origin.find('img').attr('index');
			var index = parseInt(temp);
			if (index != 0){
				index -=1;	
			} else {
				index = length - 1;
			}
			var tempImg = list.res + thisImageSet[index].image;
			
			origin.find('img').attr('src', tempImg)
				.attr('index', index);
			origin.find('p.figcap').text(thisImageSet[index].description);
		});
		
		$(list.searchID).find('button.nextImg').on('click', this, function(e){
			e.preventDefault();	
			var origin = $(this).parentsUntil('div.part').parent('div');
			var src = origin.attr('index');
			var thisImageSet = list.imagesArray[src];
			var length = parseInt(thisImageSet.length); //eg 3

			var temp = origin.find('img').attr('index');
			var index = parseInt(temp);
			if (index != length-1){
				index +=1;
			} else {
				index = 0;
			}
			var tempImg = list.res + thisImageSet[index].image;
			
			origin.find('img').attr('src', tempImg)
				.attr('index', index);
			origin.find('p.figcap').text(thisImageSet[index].description);
		});
		
		// ******************************************************************************************
		// *************************** build power supply selector ************************** //
		var $pwr = $(list.searchID).find('div#pwrSelector');
		
		for (var i=0; i<partsPwr.length; i++){
			var partNo = partsPwr[i].partNo;
			var str1 = '<div style="margin: 4px 20px;" class="part" partNo="'+partNo+'"><table class="pwr"><tr><td><img src="'+list.res+partNo+'.png"/></td><td>'+partNo+'<br/>Description: '+ partsPwr[i].description +'</td></tr></table><button class="btn btn-default placepart" value="'+partNo+'"><span style="font-size: 12px;" class="glyphicon glyphicon-triangle-left"></span> Place '+partNo+'</button></div>';
			$pwr.append(str1);
		}
		
		// *****************************************************************************************
		// ****************************** build I/O selector ******************************* //
		var $this = $(list.searchID).find('div#ioSelector');
		
		$this.append('<div class="partslist"><div id="iomenu" style="margin: 4px 20px"><div style="padding-bottom:10px;">Filters:</div><button id="all_btn"></button>&nbsp;&nbsp;<button class="cat" id="ai" des="analog input" state=0/><button class="cat" id="ao" des="analog ouput" state=0/><button class="cat" id="di" des="digital input" state=0/><button class="cat" id="do" des="digital output" state=0/><button class="cat" id="ser" des="Serial" state=0/><div class="checkbox"><label style="padding-right:20px;"><input id="showchck" type="checkbox">Show checked</input></label><label><input id="featurechart" type="checkbox">Show checked items in a feature-comparison chart</input></label></div><div id="modsubmenu"></div></div></div>');//<button class="cat" id="ser"/>
		
		$(list.searchID).find('button#do').css({'background': 'url('+list.res + 'do_sm.png) no-repeat center', 'width': '79px', 'height': '54px'});
		$(list.searchID).find('button#ai').css({'background': 'url('+list.res + 'ai_sm.png) no-repeat center', 'width': '79px', 'height': '54px'});
		$(list.searchID).find('button#ao').css({'background': 'url('+list.res + 'ao_sm.png) no-repeat center', 'width': '79px', 'height': '54px'});
		$(list.searchID).find('button#di').css({'background': 'url('+list.res + 'di_sm.png) no-repeat center', 'width': '79px', 'height': '54px'});
		$(list.searchID).find('button#ser').css({'background': 'url('+list.res + 'ser_sm.png) no-repeat center', 'width': '79px', 'height': '54px'});
		$(list.searchID).find('button#all_btn').css({'background': 'url('+list.res + 'showall.png) no-repeat center', 'width': '79px', 'height': '54px', 'background-color': 'rgba(251,176,59,0.7)'});
		//$(list.searchID).find('button#ser').css({'background': 'url('+list.res + 'serial_m.png) no-repeat center', 'width': '100px', 'height': '67px'});
		
		$this.find('button#all_btn').on('click',this, function(e){
			e.preventDefault();
			//all button just turns itself on. It doesn't toggle on and off for it might not be logical to revert to another state after the variety of searches the user can do.
			$(this).css({'background-color': 'rgba(251,176,59,0.7)'});
			$(list.searchID).find('tr.module').show();
			$(list.searchID).find('button.cat').css({'background-color': '#ffffff'})
				.attr('state', 0);
			$(list.searchID).find('span.fmenu').css({'background-color': '#ffffff'})//was div.fmenu
				.hide();
			$(list.searchID).find('div.modfeature').css({'background-color': '#ffffff'});
			$(list.searchID).find('div#modsubmenu').hide();
			$(list.searchID).find('#showchck').attr('checked', false);
		});
		
		//module features submenu
		$(list.searchID).find('div#modsubmenu').append('<div id="fdes">Features: (This narrows down the list to only modules will all selected features.)<br/><span class="fmenu" cat="aia" state=0><img class="ifmenu" src="'+list.res+'aia_t.png"/>Amps</span><span class="fmenu" cat="aiv" state=0><img class="ifmenu" src="'+list.res+'aiv_t.png"/>Millivolts</span>	<span class="fmenu" cat="temp" state=0><img class="ifmenu" src="'+list.res+'temp_t.png"/>Thermocouple or mV</span>	<span class="fmenu" cat="aoa" state=0><img class="ifmenu" src="'+list.res+'aoa_t.png"/>Current</span>	<span class="fmenu" cat="aov" state=0><img class="ifmenu" src="'+list.res+'aov_t.png"/>Voltage</span><span class="fmenu" cat="iac" state=0><img class="ifmenu" src="'+list.res+'iac_t.png"/>Alternating Current</span>	<span class="fmenu" cat="idc" state=0><img class="ifmenu" src="'+list.res+'idc_t.png"/>Direct Current</span>	<span class="fmenu" cat="oac" state=0><img class="ifmenu" src="'+list.res+'oac_t.png"/>Alternating Current</span>	<span class="fmenu" cat="odc" state=0><img class="ifmenu" src="'+list.res+'odc_t.png"/>Direct Current</span>	<span class="fmenu" cat="simple" state=0><img class="ifmenu" src="'+list.res+'simple_t.png"/>Simple</span>	<span class="fmenu" cat="iso" state=0><img class="ifmenu" src="'+list.res+'iso_t.png"/>Channel-to-channel isolation</span> <span class="fmenu" cat="hv" state=0><img class="ifmenu" src="'+list.res+'hv_t.png"/>High voltage</span> <span class="fmenu" cat="src" state=0><img class="ifmenu" src="'+list.res+'src_t.png"/>Sourced output</span><span class="fmenu" cat="rs232" state=0><img class="ifmenu" src="'+list.res+'rs232_t.png"/>Serial RS-232</span><span class="fmenu" cat="rs485" state=0><img class="ifmenu" src="'+list.res+'rs485_t.png"/>Serial RS-485</span></div>')
			.hide();
		
		// ********************** module category buttons *************** //
		$this.find('button.cat').on('click',this, function(e){
			e.preventDefault();
			var button = $(this);
			var id=button.attr('id');
			var state = button.attr('state');
			
			if(state==0) {
				button.attr('state', 1);
				button.css({'background-color': 'rgba(251,176,59,0.7)'});//
				button.siblings('button').css({'background-color': '#ffffff'}); 
				button.siblings('button.cat').attr('state', 0)
				button.siblings('div#modsubmenu').show();
				$(list.searchID).find('td#fdes').text('Features for '+button.attr('des') + ' modules: ');
				$(list.searchID).find('tr.module').hide();
				
				var items = $(list.searchID).find('tr[iogroup='+id+']').show();
				$(list.searchID).find('#showchck').attr('checked', false);	//set checkbox to unselected
			} else {
				button.attr('state', 0);	
				button.css({'background-color': '#ffffff'});
				$(list.searchID).find('tr.module').show();
				$(list.searchID).find('button#all_btn').css({'background-color': 'rgba(251,176,59,0.7)'});
			}
			
			$(list.searchID).find('span.fmenu').hide(); //was div.fmenu
			
			for(var i = 0; i<list.ioFeatures.length; i++){
				if(items){
					for (var n=0; n<items.length; n++){
						var indexFound = $(items[n]).find('div[cat='+list.ioFeatures[i]+']');
						if(indexFound.length > 0){
							var cat = indexFound.attr('cat');
							$(list.searchID).find('span.fmenu[cat='+cat+']').show(); //was div.fmenu
							//break;  //consider from SNAP
						}
					}
				}
			}
		});
	
		// ************************ build list of modules **************************** //
		var modules = [];

		for (var i=0; i<partsIO.length; i++){
			var partNo = partsIO[i].partNo;
			var des = partsIO[i].description;
			var rangeDes = partsIO[i].rangeDes;
			var catString = '';

			var tableStart = '<div id="header"><table class="table table-striped" id="modcat"><thead><tr><th> </th><th>Part Number</th><th>Add Module</th><th>Features</th><th style="text-align:right">More Information</th></tr></thead><tbody>';
			var rowStart = '<tr class="module" id="'+partNo+'" iogroup="'+partsIO[i].iogroup+'" checkstate="f" partNo="'+partNo+'">';
			var checkbox = '<td style="padding-left:10px;line-height: 34px;"><input class="tag" type="checkbox"></td>';
			var partName = '<td style="padding-left:10px;line-height: 34px;">'+partNo+'</td>';;
			var placePartButton = '<td style="width: 100px"><button type="button" class="btn btn-default placepart" value="'+partNo+'"><span style="font-size: 12px;" class="glyphicon glyphicon-triangle-left"></span> Place</button></td>';
			var moreInfoButton = '<td style="width:34px"><button class="showhide" state=0></button></td>'
			var rowEnd = '</tr>'
			var detailsRow = '<tr class="details-row" style="background-color:#fff !important"><td colspan="5"><div class="details">'+des+'</div></td></tr> <tr style="background-color:#fff !important"></tr>';
			var tableEnd = '</tbody></table></div>';

			if (i == 0) modules.push(tableStart);
			
			for (var n=0; n<partsIO[i].cat.length; n++){
				if (n == 0) catString += '<td style="line-height: 34px;">';
				catString += '<div class="modfeature" cat="' + partsIO[i].cat[n] + '" hstate=0></div>';
				if (n == partsIO[i].length - 1) catString += '<div style="float: left; padding-left:10px;">' + rangeDes + '</div></td>'; 
			}

			modules.push(rowStart + 
									checkbox + 
									partName + 
									placePartButton + 
									catString + 
									moreInfoButton + 
									rowEnd +
									detailsRow);
			
			if (i == partsIO.length - 1) {
				modules.push(tableEnd);
				$this.append(modules.join(""));
			}
		}
			
		// ******************* end build I/O selector ********************** //
		// ****************** selector category titles *********************** //
		$(list.searchID).find('table.selTitle').css({'width': '100%', 'background-color': '#C62F2F', 'color': '#fff'});
		
		$(list.searchID).find('div#swSelector').find('table.selTitle').on('click', this, function(){
				var selector = $(this).parent('div.selector');
				var state = selector.attr('state');
				if (state == 0){
					selector.attr('state', 1);
					selector.children('div').show()
						.css('border', '');
					selector.find('td.showhide').css({'background': 'url('+list.res + 'arrowdown_white.png) no-repeat center'});
				} else {
					selector.attr('state', 0);
					selector.children('div').hide();
					selector.find('td.showhide').css({'background': 'url('+list.res+ 'arrowleft_white.png) no-repeat center'});
				}
			});
		
		$(list.searchID).find('div#ctlrSelector').find('table.selTitle').on('click', this, function(){
				var selector = $(this).parent('div.selector');
				var state = selector.attr('state');
				if (state == 0){
					selector.attr('state', 1);
					selector.children('div').show()
						.css('border', '');
					selector.find('td.showhide').css({'background': 'url('+list.res + 'arrowdown_white.png) no-repeat center'});
				} else {
					selector.attr('state', 0);
					selector.children('div').hide();
					selector.find('td.showhide').css({'background': 'url('+list.res+ 'arrowleft_white.png) no-repeat center'});
				}
			});
		
		$(list.searchID).find('div#pwrSelector').find('table.selTitle').on('click', this, function(){
				var selector = $(this).parent('div.selector');
				var state = selector.attr('state');
				if (state == 0){
					selector.attr('state', 1);
					selector.children('div').show()
						.css('border', '');
					selector.find('td.showhide').css({'background': 'url('+list.res + 'arrowdown_white.png) no-repeat center'});
				} else {
					selector.attr('state', 0);
					selector.children('div').hide();
					selector.find('td.showhide').css({'background': 'url('+list.res+ 'arrowleft_white.png) no-repeat center'});
				}
			});
		
		$(list.searchID).find('div#ioSelector').find('table.selTitle').on('click', this, function(){
				var selector = $(this).parent('div.selector');
				var state = selector.attr('state');
				if (state == 0){
					selector.attr('state', 1);
					selector.children('div').show()
						.css('border', '');
					selector.find('td.showhide').css({'background': 'url('+list.res + 'arrowdown_white.png) no-repeat center'});
					
					//get state of buttons for io, category and feature buttons
					var len = $(list.searchID).find('button.cat[state=1]').length;
					if (len > 0 ){
						var iogroup = $(list.searchID).find('button.cat[state=1]').attr('id');
						$(list.searchID).find('tr.module').hide();
						$(list.searchID).find('tr.module[iogroup='+iogroup+']').show();
					}
				} else {
					selector.attr('state', 0);
					selector.children('div').hide();
					selector.find('td.showhide').css({'background': 'url('+list.res+ 'arrowleft_white.png) no-repeat center'});
				}
			});
		// **************************** module part divs ***************************** //
		
		$(list.searchID).find('button.placepart').on('click', this, function(e){
			e.preventDefault();
			var button = $(this);
			var partNo = button.attr('value');
			sendPartCmd(partNo);
			//I may have the I/O unit return a success/fail message used to reset the selector's highlighting
			button.parent('div.part').css('border', '2px solid rgba(247,147,30,1)')
				.siblings('div.part').css('border','');
		});
		
		$(list.searchID).find('tr.module').find('button.showhide').on('click', this, function(e){
			e.preventDefault();
			var button = e.currentTarget;
			var state = $(button).attr('state');
			if(state == 0) {
				$(button).attr('state', 1);
				$(this).closest('tr.module').next(".details-row").show();
				$(button).css({'background': 'url('+list.res + 'arrowdown_white.png) no-repeat center'});
			} else {
				$(button).attr('state', 0);
				$(this).closest('tr.module').next(".details-row").hide();
				$(button).css({'background': 'url('+list.res+ 'arrowleft_white.png) no-repeat center'});
			}
		});
		
		// *********************** show checked items button ************************** //
		$('input#showchck').on('click', this, function(e){
			var val = $(e.currentTarget).is(':checked');
			if (val == true) { //show checked items
				$(list.searchID).find('tr.module').hide();
				$(list.searchID).find('tr.module[checkstate*="t"]').show(); //checkstate is a proxy for the checkbox value
				$(list.searchID).find('#all_btn').css({'background-color':'#ffffff'});//'background-color': 'rgba(251,176,59,0.7)'
				$(list.searchID).find('div#modsubmenu').hide();
				$(list.searchID).find('button.cat').attr('state', 0)
					.css({'background-color': '#ffffff'});

			} else { //restore full list (it may be more intuitive to bring the whole list back (and programmatically easier) rather than restore the last state
				$(list.searchID).find('tr.module').show();
				$(list.searchID).find('button.cat').css({'background-color': '#ffffff'});//this needs to reset backgrounds for io type buttons
				$(list.searchID).find('#all_btn').css({'background-color':'rgba(251,176,59,0.7)'});
			}
		});
		
		// ******************* show modules within feature comparison chart ********************************* //
		
		$('input#featurechart').on('click', this, function(e){
			//build chart	
			var val = $(e.currentTarget).is(':checked');
			
			if (val == true) { //show checked items
				$(list.searchID).find('tr.module').hide();
				$(list.searchID).find('tr.module[checkstate*="t"]').show(); //checkstate is a proxy for the checkbox value
				$(list.searchID).find('#all_btn').css({'background-color':'#ffffff'});//'background-color': 'rgba(251,176,59,0.7)'
				$(list.searchID).find('div#modsubmenu').hide();
				$(list.searchID).find('button.cat').attr('state', 0)
					.css({'background-color': '#ffffff'});
				
				var parts = $(list.searchID).find('tr.module[checkstate*="t"]');
				var partNoArray = [];
				for (var i = 0; i<parts.length; i++){
					partNoArray.push($(parts[i]).attr('partNo'));
				}
				list.doFeatureChart(partNoArray);
			
			} else { //restore full list (it may be more intuitive to bring the whole list back (and programmatically easier) rather than restore the last state
				$(list.searchID).find('div#featureChart').remove();
				$(list.searchID).find('tr.module').show();
				$(list.searchID).find('button.cat').css({'background-color': '#ffffff'});//this needs to reset backgrounds for io type buttons
				$(list.searchID).find('#all_btn').css({'background-color':'rgba(251,176,59,0.7)'});
			}
		});
		
		// ***************** check box for each part *********************** //
		$(list.searchID).find('input.tag').on('click', this, function(e){	
			var val = $(e.currentTarget).is(':checked');
			if (val == true){
				$(e.currentTarget).parents('tr.module').attr('checkstate', 't'); //set div parent's checkstate property
			} else {
				$(e.currentTarget).parents('tr.module').attr('checkstate', '');//clear div parent's checkstate property
			}
		});
		
		// ***************** create interactive feature tags ************************ //
		$(list.searchID).find('div.modfeature').on('click', this, function(e){
			var feature = $(this);
			var cat = feature.attr('cat');
			var state = feature.attr('hstate');
			if (state==0){
				$(list.searchID).find('div [cat=' + cat +']').css({'border': '2px solid rgba(247,147,30,1)'}) 
					.attr('hstate', 1); //
			} else {
				$(list.searchID).find('div [cat=' + cat +']').css({'border':'1px solid rgba(100,100,150,.5)'})
					.attr('hstate', 0); //
			}
		});
		
		// ******************* specific features *********************** //
		$(list.searchID).find('span.fmenu').on('click', this, function(e){//was div.fmenu
			var feature = $(this);
			var cat = feature.attr('cat');
			var state = feature.attr('state');
			if (state==0){
				$(list.searchID).find('div [cat=' + cat +']').css({'background-color':'rgba(251,176,59,0.7)'})
					.attr('state', 1);
			} else {
				$(list.searchID).find('div [cat=' + cat +']').css({'background-color':''})
					.attr('state', 0);
			}

			var iogroup = $(list.searchID).find('#iomenu').children('button.cat[state=1]').attr('id');

			var selectedFeatures = [];
			var visibleFeatures =  $(list.searchID).find('span.fmenu[state=1]');
			for (var i=0; i<visibleFeatures.length; i++){
				var vis = $(visibleFeatures[i]).is(':visible');
				if (vis == true){
					selectedFeatures.push(visibleFeatures[i]);
				}
			}
			
			if (selectedFeatures.length == 0) {
				$(list.searchID).find('tr.module[iogroup='+iogroup+']').show();
			}else{
				$(list.searchID).find('tr.module').hide();
				var modfeatures = []; //one or more features of each module in the parts list.
				var modules = $(list.searchID).find('tr.module[iogroup='+iogroup+']'); //get all brain objects (part numbers, one or more brain features)
				var tempArray = [] ;//received found parts and is used to replace brains array at the end of each loop
				for (var i=0; i<selectedFeatures.length; i++){  //go through each feature on the submenu that is selected
					$(modules).hide();
					var feature = $(selectedFeatures[i]).attr('cat')
					for(var n=0;n<modules.length; n++){
						var mod = modules[n];
						var modFeaturesArray = $(mod).find('div.modfeature');
						for(var k=0; k<modFeaturesArray.length; k++){
							var testfeature = $(modFeaturesArray[k]).attr('cat');
							if (testfeature == feature){
								tempArray.push(mod);
								break;	
							}
						}
					}
					modules = $.extend(true, [], tempArray);
					$(modules).show();
					tempArray = []; //this line will determine whether searches are "and" or "or".  "And" when in use; "or", when commented out.
				}
			}
		});		// ******************** end category/feature tags *********************** //
		
		$(list.searchID).find('div.modfeature[cat=rs232]').css({'background': 'url('+list.res + 'rs232.png) no-repeat center', 'width': '34px', 'height': '34px'});
		$(list.searchID).find('div.modfeature[cat=rs485]').css({'background': 'url('+list.res + 'rs485.png) no-repeat center', 'width': '34px', 'height': '34px'});
		
	
		$(list.searchID).find('div.modfeature[cat=aia]').css({'background': 'url('+list.res + 'aia_sm.png) no-repeat center', 'width': '34px', 'height': '34px'});
		$(list.searchID).find('div.modfeature[cat=aiv]').css({'background': 'url('+list.res + 'aiv_sm.png) no-repeat center', 'width': '34px', 'height': '34px'});
		$(list.searchID).find('div.modfeature[cat=temp]').css({'background': 'url('+list.res + 'temp_sm.png) no-repeat center', 'width': '34px', 'height': '34px'});
		$(list.searchID).find('div.modfeature[cat=lc]').css({'background': 'url('+list.res + 'lc_sm.png) no-repeat center', 'width': '34px', 'height': '34px'});
		
		$(list.searchID).find('div.modfeature[cat=aoa]').css({'background': 'url('+list.res + 'aoa_sm.png) no-repeat center', 'width': '34px', 'height': '34px'});
		$(list.searchID).find('div.modfeature[cat=aov]').css({'background': 'url('+list.res + 'aov_sm.png) no-repeat center', 'width': '34px', 'height': '34px'});
		$(list.searchID).find('div.modfeature[cat=iac]').css({'background': 'url('+list.res + 'iac_sm.png) no-repeat center', 'width': '34px', 'height': '34px'});
		$(list.searchID).find('div.modfeature[cat=hv]').css({'background': 'url('+list.res + 'hv_sm.png) no-repeat center', 'width': '34px', 'height': '34px'});
		$(list.searchID).find('div.modfeature[cat=idc]').css({'background': 'url('+list.res + 'idc_sm.png) no-repeat center', 'width': '34px', 'height': '34px'});
		$(list.searchID).find('div.modfeature[cat=oac]').css({'background': 'url('+list.res + 'oac_sm.png) no-repeat center', 'width': '34px', 'height': '34px'});
		$(list.searchID).find('div.modfeature[cat=odc]').css({'background': 'url('+list.res + 'odc_sm.png) no-repeat center', 'width': '34px', 'height': '34px'});
		$(list.searchID).find('div.modfeature[cat=src]').css({'background': 'url('+list.res + 'src_sm.png) no-repeat center', 'width': '34px', 'height': '34px'});
		$(list.searchID).find('div.modfeature[cat=iso]').css({'background': 'url('+list.res + 'iso_sm.png) no-repeat center', 'width': '34px', 'height': '34px'});
		$(list.searchID).find('div.modfeature[cat=simple]').css({'background': 'url('+list.res + 'simple_sm.png) no-repeat center', 'width': '34px', 'height': '34px'});
			
		$(list.searchID).find('button.showhide').css({ background: 'url('+ list.res+'arrowleft_white.png) no-repeat center', height: '32px', width: '32px', float: 'right',	border: 'none',});
		$(list.searchID).find('td.showhide').css({ background: 'url('+ list.res+'arrowleft_white.png) no-repeat center', height: '32px', width: '32px', float: 'right',	border: 'none',});
		$(list.searchID).find('div.modfeature').css({'border': '1px solid rgba(100,100,150,.5)', 'float': 'left', 'margin-right': '5px'}); //border around icons in modules part descriptions
		$(list.searchID).find('div#fdes').css({'padding-top': '6px'});
		$(list.searchID).find('span.fmenu').css({'border': '1px solid rgba(100,100,150,.5)', 'padding-top': '8px', 'display':'inline-block'}); 
		$(list.searchID).find('img.ifmenu').css({'height': '20px', 'width': '20px'});
		// $(list.searchID).find('tr.module table.frame').css({'border': '2px solid #f2f2f2', 'width': '100%'});
		$(list.searchID).find('table#modcat').css({'border': '2px solid #f2f2f2', 'width': '100%'});
		$(list.searchID).find('tr.module').css({'margin-left': '20px', 'margin-right': '10px', }) //'border': '2px solid rgba(247,147,30,1)'
		$(list.searchID).find('tr.module').next(".details-row").hide();
		
		$(list.searchID).find('.modchck').css({'width': '30px'});
		$(list.searchID).find('div.selector').children('div').hide();
		$(list.searchID).find('div.selector').children('.selTitle').css({'cursor':'pointer'});
				$(list.searchID).find('div.selector').children('.selTitle').hover(function(){
		    $(this).css({opacity:'0.8'});
		}, function(){
		    $(this).css({opacity:'1'});
		});
		
		return list.showPartInViewer;
		
	} // *************************** end Init ******************************  //
	
	list.doFeatureChart = function(partNos){
	//	find each part number and pull in it's specs
		$(list.searchID).find('.module').hide();
		var keysArray = [];
		var specsArray = [];
		var mechArray = [];
		var modulesArray = [];
		// two parts; first, get all keys and build a features column
	
	//get features and specs
		for (var i=0; i<partNos.length; i++){
			var partNo = partNos[i];
			for (var n=0; n<modspecs.length; n++){
				if(modspecs[n].partNo == partNo){
					//found match
					//put module features and specs object into array
					modulesArray.push(modspecs[n]);
					
					//get features
					var catKey = Object.keys(modspecs[n].features);  //IE doesn't support this command, but somehow I got it to work on other demos
					for(var m=0; m<catKey.length; m++){
						var topicname = catKey[m];	
						var include =  keysArray.includes(topicname, 0);
						if(include == false){
							keysArray.push(topicname);
						}
					}
					
					//get specs
					var catKeySpecs = Object.keys(modspecs[n].specifications);
					for(var h=0; h<catKeySpecs.length; h++){
						var specname = catKeySpecs[h];	
						var include =  specsArray.includes(specname, 0);
						if(include == false){
							specsArray.push(specname);
						}
					}
					
					//get mechanical
					var catKeyMech = Object.keys(modspecs[n].mechanical);
					for(var a=0; a<catKeyMech.length; a++){
						var specname = catKeyMech[a];	
						var include =  mechArray.includes(specname, 0);
						if(include == false){
							mechArray.push(specname);
						}
					}
				}
			}
		}
		
		var prestring = '<div id=featureChart>'
		var buttonString = '<button id="print">Print Friendly Display</button>'
		
		var tableString = '<table id=featureChart><tr style="background-color: #C62F2F; color: #fff"><td>Features</td>';
		
		// ********************************* features ********************************* //
		//put module part numbers in first row
		for(var x=0; x < partNos.length; x++){
			tableString += '<td>' + partNos[x] + '</td>';
		}
		
		tableString += '</tr>';
		
		for (var b=0; b<keysArray.length; b++){
			tableString += '<tr class=spec><td>'+keysArray[b]+'</td>';
			for (var c =0; c<modulesArray.length; c++){
				var data = modulesArray[c].features[keysArray[b]];
				var test = list.toType(data);
				if((test=='boolean')||(test=='number')||(test=='string')){
					if(test=='boolean'){
						if(data==true){
							tableString += '<td><img style="max-width:34px;" src="'+ list.res+'check.png"/></td>'	;
						} else {
							tableString += '<td style="color: #666;">no</td>';
						}
					} else {
						tableString += '<td>'+data+'</td>';
					}
				} else {
					tableString += '<td style="background-color: #666; color: #aaa">N/A</td>';
				}
			}
			tableString += '</tr>';
		}
		// ********************** specifications ********************* //
		tableString += '<tr style="background-color: #C62F2F; color: #fff"><td>Specifications</td>';
		for(var y=0; y < partNos.length; y++){
			tableString += '<td>' + partNos[y] + '</td>';
		}
		
		tableString += '</tr>';
		
		for (var d=0; d<specsArray.length; d++){
			tableString += '<tr class=spec><td>'+specsArray[d]+'</td>';
			for (var e =0; e<modulesArray.length; e++){
				var data = modulesArray[e].specifications[specsArray[d]];
				var test = list.toType(data);
				
				if((test=='boolean')||(test=='number')||(test=='string')){
					tableString += '<td>'+data+'</td>';
				} else {
					tableString += '<td style="background-color: #666; color: #aaa">N/A</td>';
				}
			}
			tableString += '</tr>';
		}
		// ***************** mechanical specs ******************** //
		tableString += '<tr style="background-color: #C62F2F; color: #fff"><td>Mechanical</td>';
		for(var y=0; y < partNos.length; y++){
			tableString += '<td>' + partNos[y] + '</td>';
		}
		tableString += '</tr>';
		for (var k=0; k<mechArray.length; k++){
			tableString += '<tr class=mech><td>'+mechArray[k]+'</td>';
			for (var j =0; j<modulesArray.length; j++){
				var data = modulesArray[j].mechanical[mechArray[k]];
				var test = list.toType(data);
				if((test=='boolean')||(test=='number')||(test=='string')){
					tableString += '<td>'+data+'</td>';
				} else {
					tableString += '<td style="background-color: #666; color: #aaa">N/A</td>';
				}
			}
			tableString += '</tr>';
		}
		tableString += '</table></div>';
		$(list.searchID).find('div#ioSelector').append(prestring+buttonString+tableString);
		
		$(list.searchID).find('button#print').on('click', this, function(e){
			e.preventDefault();
			list.printToWindow(prestring + tableString)
		})
	};
	
	list.printToWindow = function(content){
		var myWindow=window.open('','','width=800,height=600');
    	myWindow.document.write(content);
   		myWindow.document.close(); 
		myWindow.focus();
//		myWindow.print(); 
	}
	
	list.toType = function(obj) {
	  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
	}
	
	//this will highlight a specific part and/or expose the selector for brains, I/O or accessories.
	list.showPartInViewer = function(part, type){
		if(type){
			switch (type){
				case 'ctrl' :
					var controller = $(list.searchID).find('div#ctlrSelector');
					controller.children('div').show();
					controller.attr('state', 1);
					controller.find('td.showhide').css({'background': 'url('+list.res + 'arrowdown_white.png) no-repeat center'});
					controller.siblings('div#pwrSelector').attr('state', 0)
						.children('div').hide();
					controller.siblings('div#pwrSelector').find('td.showhide').css({'background': 'url('+list.res + 'arrowleft_white.png) no-repeat center'});
				break;
				case 'pwr':
					var pwr = $(list.searchID).find('div#pwrSelector');
					pwr.children('div').show();
					pwr.attr('state', 1);
					pwr.find('td.showhide').css({'background': 'url('+list.res + 'arrowdown_white.png) no-repeat center'});
					pwr.siblings('div#ctlrSelector').attr('state', 0)
						.children('div').hide();
					pwr.siblings('div#ctlrSelector').find('td.showhide').css({'background': 'url('+list.res + 'arrowleft_white.png) no-repeat center'});
					pwr.children('div.part').css({'border': ''});
					
					if(part!=''){
						$(list.searchID).find('div.part[partNo='+part+']').css({'border': '2px solid rgba(247,147,30,1)'});
					}
					
					var $container = $('div#parts');
					$container.animate({//from https://stackoverflow.com/questions/2905867/how-to-scroll-to-specific-item-using-jquery
						scrollTop: pwr.offset().top - $container.offset().top + $container.scrollTop()
					});
				
				break;
				case 'mod' :
					var io = $(list.searchID).find('div#ioSelector');
					var state = parseInt(io.attr('state'));
					io.children('tr.module').css({'border': ''});
				
					if(state==0){//no module selected, open module viewer.
						//console.log('This must deal with module tab')
						io.attr('state', 1);
						io.children('div').show()
							.css('border', '');
						//get state of buttons for io, category and feature buttons
						var len = $(list.searchID).find('button.cat[state=1]').length;
						if (len > 0 ){
							
							var iogroup = $(list.searchID).find('button.cat[state=1]').attr('id');
							$(list.searchID).find('tr.module').hide();
							$(list.searchID).find('tr.module[iogroup='+iogroup+']').show();
							
						} else {
							
							io.find('td.showhide').css({'background': 'url('+list.res + 'arrowdown_white.png) no-repeat center'});
							io.siblings('div.selector').attr('state', 0)
							.children('div').hide();
							io.siblings('div.selector').find('td.showhide').css({'background': 'url('+list.res + 'arrowleft_white.png) no-repeat center'});
							io.children('div').show();	
						}
						
					} else {
						io.siblings('div.selector').attr('state', 0)
							.children('div').hide();
						io.siblings('div.selector').find('td.showhide').css({'background': 'url('+list.res + 'arrowleft_white.png) no-repeat center'});
					}
					
					var $container = $('div#parts');
				break;	
				
				case 'details':
					var module = $(list.searchID).find('tr.module[partNo='+part+']');
					module.css({'border': '2px solid rgba(247,147,30,1)'});
					
					//show module details, set arrow and state
					module.next(".details-row").show();
					module.find('button.showhide').css({'background': 'url('+list.res + 'arrowdown_white.png) no-repeat center'})
						.attr('state', 1)
					
					var $container = $('div#parts');
					
		//		var test = module.is(':hidden');//get display state of module; keep for reference
				var test = $(list.searchID).find('input#showchck').is(':checked');

				//the following occured only when the module was hidden, but I changed that because I couldn't get the full list to scroll to modules on the end of the list.
				//so this way there is always change, though only marginally better that what I had before. The bigger problem is that the module can be off the screen
				//and not scrolled to because I've not enabled the scrolling by closing the window height. This was because I'd end up with two horizontal scrollbars which is confusing.
				if(test==false){
					var iogroup = module.attr('iogroup');
					$(list.searchID).find('tr.module').hide();
					$(list.searchID).find('tr.module[iogroup='+iogroup+']').show();
					$container.animate({//from https://stackoverflow.com/questions/2905867/how-to-scroll-to-specific-item-using-jquery
						scrollTop: module.offset().top - $container.offset().top - 50 + $container.scrollTop() 
					});
						
					var button = $('button.cat[id='+iogroup+']')
						
					button.css({'background-color': 'rgba(251,176,59,0.7)'})
						.attr('state', 0)
					button.siblings('button.cat').css({'background-color': '#ffffff'})
						.attr('state', 0);
					button.siblings('button#all_btn').css({'background-color': '#ffffff'});
						
					$(list.searchID).find('#showchck').attr('checked', false);
					button.siblings('div#modsubmenu').show();
					$(list.searchID).find('td#fdes').text('Features for '+button.attr('des') + ' modules: ');
					var items = $(list.searchID).find('tr[iogroup='+iogroup+']').show();
						
					$(list.searchID).find('span.fmenu').hide();//was div.fmenu
					for(var i = 0; i<list.ioFeatures.length; i++){
						for (var n=0; n<items.length; n++){
							var indexFound = $(items[n]).find('div[cat='+list.ioFeatures[i]+']');
							if(indexFound.length > 0){
								var cat = indexFound.attr('cat');
								$(list.searchID).find('span.fmenu[cat='+cat+']').show();//was div.fmenu
							}
						}
					}

				} else {
					$container.animate({//from https://stackoverflow.com/questions/2905867/how-to-scroll-to-specific-item-using-jquery
						scrollTop: module.offset().top - $container.offset().top - 50 + $container.scrollTop() 
					});
				}
				//other useful code
				//	console.log(module.find('.details').offset().top);
				//	$container.scrollTop( module.offset().top - $container.offset().top + $container.scrollTop());
				break;
			}
		}
	};
	
	list.enableSwDemo = function(){
		list.coreSelected = 0;
		var dim = 0.3;
		var btnColor = '#ddd';
		var btnSelColor = '#333';
		var delay = 500

		// *************** control logic ****************** //
		$(list.searchID).find('button#swd_log').on('mouseover', this, function(){
			$(list.searchID).find('g#overlaycontrol').show();
		})
		.on('mouseout', this, function(){
			$(list.searchID).find('g#overlaycontrol').hide();
		})
		.on('click', this, function(e){
			e.preventDefault();
			var bttn = $(this);
			
			if (bttn.attr('state')==0){ //show logic
				$(list.searchID).find('g#detailcontrol').animate({'opacity': 1}, delay)
					.siblings('g.detail').animate({'opacity': 0}, delay);
				$(list.searchID).find('g#corelogic').animate({'opacity': 1}, delay)
					.siblings('g.core').animate({'opacity': 0}, delay);
				bttn.attr('state', 1);
				bttn.css({'background-color': btnSelColor, 'color': '#fff'});
				bttn.siblings('button').css({'background-color': btnColor, 'color': '#000'})
					.attr('state', 0);
					
				$(list.searchID).find('g.overlay').attr('opacity', 0);
			} else {
				$(list.searchID).find('g.detail').animate({'opacity': 0}, delay);
				$(list.searchID).find('g.core').animate({'opacity': 1}, delay);
				bttn.attr('state', 0);
				bttn.css({'background-color': btnColor, 'color': '#000'});
				$(list.searchID).find('g.overlay').attr('opacity', 1);
			}
		});
		
		// *************** groov HMI **************** //
		$(list.searchID).find('button#swd_hmi').on('mouseover', this, function(){
			$(list.searchID).find('g#overlaygroov').show();
		})
		.on('mouseout', this, function(){
			$(list.searchID).find('g#overlaygroov').hide();
		})
		.on('click', this, function(e){
			e.preventDefault();
			var bttn = $(this);
			if (bttn.attr('state')==0){
				$(list.searchID).find('g#detailgroov').animate({'opacity': 1}, delay)
					.siblings('g.detail').animate({'opacity': 0}, delay);
				$(list.searchID).find('g#coregroov').animate({'opacity': 1}, delay)
					.siblings('g.core').animate({'opacity': 0}, delay);
				bttn.attr('state', 1);
				bttn.css({'background-color': btnSelColor, 'color': '#fff'});
				bttn.css({'background-color': btnSelColor, 'color': '#fff'});
				bttn.siblings('button').css({'background-color': btnColor, 'color': '#000'})
					.attr('state', 0);
				$(list.searchID).find('g.overlay').attr('opacity', 0);
			} else {
				$(list.searchID).find('g#detailgroov').animate({'opacity': 0}, delay);
				$(list.searchID).find('g.core').animate({'opacity': 1}, delay);
				bttn.attr('state', 0);
				bttn.css({'background-color': btnColor, 'color': '#000'});
				$(list.searchID).find('g.overlay').attr('opacity', 1);
			}
		});
		
		// *************** enterprise applications ***************** //
		$(list.searchID).find('button#swd_ent').on('mouseover', this, function(){
			$(list.searchID).find('g#overlayenterprise').show();
		})
		.on('mouseout', this, function(){
			$(list.searchID).find('g#overlayenterprise').hide();
		})
		.on('click', this, function(e){
			e.preventDefault();
			var bttn = $(this);
			if (bttn.attr('state')==0){
				$(list.searchID).find('g#detailenterprise').animate({'opacity': 1}, delay)
					.siblings('g.detail').animate({'opacity': 0}, delay)
				$(list.searchID).find('g#coreenterprise').animate({'opacity': 1}, delay)
					.siblings('g.core').animate({'opacity': 0}, delay);
					
				bttn.attr('state', 1);
				bttn.css({'background-color': btnSelColor, 'color': '#fff'});
				bttn.css({'background-color': btnSelColor, 'color': '#fff'});
				bttn.siblings('button').css({'background-color': btnColor, 'color': '#000'})
					.attr('state', 0);
				$(list.searchID).find('g.overlay').attr('opacity', 0);
			} else {
				$(list.searchID).find('g#detailenterprise').animate({'opacity': 0}, delay)
				$(list.searchID).find('g.core').animate({'opacity': 1}, delay);
				bttn.attr('state', 0);
				bttn.css({'background-color': btnColor, 'color': '#000'});
				$(list.searchID).find('g.overlay').attr('opacity', 1);
			}
		});
		
		// *************** 3rd party controllers ******************* //
		$(list.searchID).find('button#swd_3p').on('mouseover', this, function(){
			$(list.searchID).find('g#overlay3rdparty').show();
		})
		.on('mouseout', this, function(){
			$(list.searchID).find('g#overlay3rdparty').hide();
		})
		.on('click', this, function(e){
			e.preventDefault();
			var bttn = $(this);
			if (bttn.attr('state')==0){
				$(list.searchID).find('g#detail3rdparty').animate({'opacity': 1}, delay)
					.siblings('g.detail').animate({'opacity': 0}, delay);
				$(list.searchID).find('g#core3rdparty').animate({'opacity': 1}, delay)
					.siblings('g.core').animate({'opacity': 0}, delay);
				bttn.attr('state', 1);
				bttn.css({'background-color': btnSelColor, 'color': '#fff'});
				bttn.css({'background-color': btnSelColor, 'color': '#fff'});
				bttn.siblings('button').css({'background-color': btnColor, 'color': '#000'})
					.attr('state', 0);
				$(list.searchID).find('g.overlay').attr('opacity', 0);
			} else {
				$(list.searchID).find('g#detail3rdparty').animate({'opacity': 0}, delay)
				$(list.searchID).find('g.core').animate({'opacity': 1}, delay);
				bttn.attr('state', 0);
				bttn.css({'background-color': btnColor, 'color': '#000'});
				$(list.searchID).find('g.overlay').attr('opacity', 1);
			}
		});
		
		// *************** web serveces ********************* //
		$(list.searchID).find('button#swd_ws').on('mouseover', this, function(){
			$(list.searchID).find('g#overlaywebserv').show();
		})
		.on('mouseout', this, function(){
			$(list.searchID).find('g#overlaywebserv').hide();
		})
		.on('click', this, function(e){
			e.preventDefault();
			var bttn = $(this);
			if (bttn.attr('state')==0){
				$(list.searchID).find('g#detailwebserv').animate({'opacity': 1}, delay)
					.siblings('g.detail').animate({'opacity': 0}, delay);
				$(list.searchID).find('g#corewebserv').animate({'opacity': 1}, delay)
					.siblings('g.core').animate({'opacity': 0}, delay);
				bttn.attr('state', 1);
				bttn.css({'background-color': btnSelColor, 'color': '#fff'});
				bttn.css({'background-color': btnSelColor, 'color': '#fff'});
				bttn.siblings('button').css({'background-color': btnColor, 'color': '#000'})
					.attr('state', 0);
				$(list.searchID).find('g.overlay').attr('opacity', 0);
			} else {
				$(list.searchID).find('g#detailwebserv').animate({'opacity': 0}, delay)
				$(list.searchID).find('g.core').animate({'opacity': 1}, delay);
				bttn.attr('state', 0);
				bttn.css({'background-color': btnColor, 'color': '#000'});
				$(list.searchID).find('g.overlay').attr('opacity', 1);
			}
		});
	}
}

