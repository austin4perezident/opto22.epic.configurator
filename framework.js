// JavaScript Document

function EpicConfigurator(divContainerID){  //data = snappacsystemparts from searchdata.js
	var sys = {};
	sys.searchID = '#' + divContainerID;
	sys.res = "../images/epic/"//live version /Opto22/media/epicconfigurator/
	sys.currentIoUnit = [];

	sys.epicConfig =  { 
		name: '',
		chassis: 'GRV-EPIC-CHS16', 
		controller: 'GRV-EPIC-PR1', 
		powersupply: '', 
		io_array: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
	//	io_array: ['', 'GRV-IV-24', 'GRV-ITMI-8', 'GRV-IMA-24', '', 'GRV-IDC-12', 'GRV-IAC-24', 'GRV-IACS-24', 'GRV-IACHV-24', 'GRV-IACI-12', 'GRV-IACDCTTL-24', 'GRV-IACDCTTLS-24', 'GRV-OVMALC-8', '', 'GRV-ODCSRC-24', '', ], //GRV-IDC-24, GRV-ODC-24, ,GRV-CSER-4, GRV-OMRIS-8
		accessories: [],
	};
		
	sys.userConfigurations = [];
	
	sys.ctlr = [{partNo: 'GRV-EPIC-PR1', description: 'The GRV-EPIC-PR1 provides the I/O management, programming logic, and communication via a variety of means....', 	
					images: [
					{image: 'GRV-EPIC-PR1.png', description: 'groov EPIC Controller with touch-screen panel open'}, 
					{image: 'GRV-EPIC-PR1_2.png', description: 'Two Ethernet ports, HDMI and USB'},	
					{image: 'GRV-EPIC-PR1_3.png', description: 'groov EPIC controller with touch-screen panel closed'}],}, ];
	
	sys.pwr = [
		{partNo: 'GRV-EPIC-PSAC', description: 'Power supply, 110–240 VAC. The GRV-EPIC-PSAC power supply provides power for a groov EPIC chassis with a GRV-EPIC-PR1 processor, and groov® I/O modules mounted on the chassis.'},
		{partNo: 'GRV-EPIC-PSDC', description: 'Power converter, 24–48 VDC. The GRV-EPIC-PSDC voltage converter provides power for a groov EPIC chassis with a GRV-EPIC-PR1 processor, and groov® I/O modules mounted on the chassis.'},
		{partNo: 'GRV-EPIC-PSPT', description: 'Pass-through power adapter designed to connect a user-supplied, external 12 V power supply to the I/O unit. 11.4–12.6 VDC, up to 9 A.'},
	];
	
	sys.io = [	
	//	groov Analog Input Modules
		{ partNo: 'GRV-IMA-24', iogroup: 'ai', colorcode: 'ai', cat: ['aia'], signal: [0], rangeDes:'± 20 mA, 0–20 mA, 4–20 mA', description: 'Analog current input, 24 channels, configurable input ranges of ± 20 mA, 0–20 mA, 4–20 mA', channels: 24,},
		{ partNo: 'GRV-ITMI-8', iogroup: 'ai', colorcode: 'ai', cat: ['aiv', 'temp'], signal: [0], rangeDes:'thermocouple or mV', description: 'Analog input, 8 channel, thermocouple or mV, channel-to-channel isolation. Each channel is individually configurable for ±1200 mV, ±600 mV, ±300 mV, ±150 mV, ±75 mV, ±50 mV, ±25 mV or Type B, E, J, K, N, R, S, or T thermocouples', channels: 8,},
		{ partNo: 'GRV-IV-24', iogroup: 'ai', colorcode: 'ai', cat: ['aiv'], signal: [0], rangeDes:'±160 V to ±1.25 V', description: 'Analog voltage input, 24 channels, 8 configurable input ranges from ±160 V to ±1.25 V', channels: 24,}, //±160.0 VDC, ±80.0 VDC, ±40.0 VDC, ±20.0 VDC, ±10.0 VDC, ±5.0 VDC, ±2.5 VDC, ±1.25 VDC
		//groov Analog Output Modules
		{ partNo: 'GRV-OVMALC-8', iogroup: 'ao', colorcode: 'ao', cat: ['aoa', 'aov'], signal: [0], rangeDes:'voltage or current', description: 'Analog output, 8 channels, voltage or current, chassis-powered loop', channels: 8,},
	
		{ partNo: 'GRV-IAC-24', iogroup: 'di', colorcode: 'iac', cat: ['iac'], signal: [0], rangeDes:'85–140 VAC', description: 'AC input, 24 channels, 85–140 VAC', channels: 24,},
		{ partNo: 'GRV-IACS-24', iogroup: 'di', colorcode: 'iac', cat: ['iac', 'simple'], signal: [0], rangeDes:'85–140 VAC', description: 'AC input, 24 channels, 85–140 VAC, on/off state only', channels: 24,},
		{ partNo: 'GRV-IACI-12', iogroup: 'di', colorcode: 'iac', cat: ['iac', 'iso'], signal: [0], rangeDes:'', description: 'GRV-IACI-12 AC input, 12 channels, 85–140 VAC, channel-to-channel isolation', channels: 12,},
		{ partNo: 'GRV-IACIS-12', iogroup: 'di', colorcode: 'iac', cat: ['iac', 'iso', 'simple'], signal: [0], rangeDes:'', description: 'GRV-IACIS-12 AC input, 12 channels, 85–140 VAC, channel-to-channel isolation, on/off state only', channels: 12,},
		{ partNo: 'GRV-IACHV-24', iogroup: 'di', colorcode: 'iac', cat: ['iac', 'hv'], signal: [0], rangeDes:'180–280 VAC', description: 'AC input, 24 channels, 180–280 VAC', channels: 24,},
		{ partNo: 'GRV-IACHVS-24', iogroup: 'di', colorcode: 'iac', cat: ['iac', 'hv', 'simple'], signal: [0], rangeDes:'180–280 VAC', description: 'GRV-IACHVS-24 AC input, 24 channels, 180–280 VAC, on/off state only', channels: 24,},
		{ partNo: 'GRV-IACIHV-12', iogroup: 'di', colorcode: 'iac', cat: ['iac', 'hv', 'iso'], signal: [0], rangeDes:'180–280 VAC', description: 'GRV-IACIHV-12 AC input, 12 channels, 180–280 VAC, channel-to-channel isolation', channels: 12,},
		{ partNo: 'GRV-IACIHVS-12', iogroup: 'di', colorcode: 'iac', cat: ['iac', 'hv', 'iso', 'simple'], signal: [0], rangeDes:'180–280 VA', description: 'GRV-IACIHVS-12 AC input, 12 channels, 180–280 VAC, channel-to-channel isolation, on/off state only', channels: 12,},
		
		{ partNo: 'GRV-IACDCTTL-24', iogroup: 'di', colorcode: 'iac', cat: ['iac', 'idc'], signal: [0], rangeDes:'2.0–16 V AC/DC', description: 'AC/DC input, 24 channels, 2.0–16 V AC/DC', channels: 24,},
		{ partNo: 'GRV-IACDCTTLS-24', iogroup: 'di', colorcode: 'iac', cat: ['iac', 'idc', 'simple'], signal: [0], rangeDes:'2.0–16 V AC/DC', description: 'AC/DC input, 24 channels, 2.0–16 V AC/DC, on/off state only', channels: 24,},	
		
		{ partNo: 'GRV-IDC-24', iogroup: 'di', colorcode: 'idc', cat: ['idc'], signal: [0], rangeDes: '15–30 VDC input', description: 'DC digital input, 24 channels, 15–30 V', channels: 24,},
		{ partNo: 'GRV-IDCS-24', iogroup: 'di', colorcode: 'idc', cat: ['idc', 'simple'], signal: [0], rangeDes:'15–30 VDC', description: 'DC digital input, 24 channels, 15–30 V, on/off status only', channels: 24,},
		{ partNo: 'GRV-IDCI-12', iogroup: 'di', colorcode: 'idc', cat: ['idc', 'iso'], signal: [0], rangeDes:'10–30 V', description: 'GRV-IDCI-12 DC input, 12 channels, 10–30 V, channel-to-channel isolation,', channels: 12,},
		{ partNo: 'GRV-IDCIS-12', iogroup: 'di', colorcode: 'idc', cat: ['idc', 'iso', 'simple'], signal: [0], rangeDes:'10–30 V', description: 'GRV-IDCIS-12 DC input, 12 channels, 10–30 V, channel-to-channel isolation, on/off state only', channels: 12,},

		{ partNo: 'GRV-OAC-12', iogroup: 'do', colorcode: 'oac', cat: ['oac'], signal: [0], rangeDes:'12–250 VAC', description: 'GRV-OAC-12 AC output, 12 channels, 12–250 VAC', channels:12,},
		{ partNo: 'GRV-OACS-12', iogroup: 'do', colorcode: 'oac', cat: ['oac', 'simple'], signal: [0], rangeDes:'12–250 VAC', description: 'GRV-OACS-12 AC output, 12 channels, 12–250 VAC, on/off only', channels: 12,},
		{ partNo: 'GRV-OACI-12', iogroup: 'do', colorcode: 'oac', cat: ['oac', 'iso'], signal: [0], rangeDes:'12–250 VAC', description: 'GRV-OACI-12 AC output, 12 channels, 12–250 VAC, channel-to-channel isolation', channels: 12,},
		{ partNo: 'GRV-OACIS-12', iogroup: 'do', colorcode: 'oac', cat: ['oac', 'iso', 'simple'], signal: [0], rangeDes:'12–250 VAC', description: 'GRV-OACIS-12 AC output, 12 channels, 12–250 VAC, channel-to-channel isolation, on/off only', channels: 12,},

		{ partNo: 'GRV-ODCI-12', iogroup: 'do', colorcode: 'odc', cat: ['odc', 'iso'], signal: [0], rangeDes:'5–60 VDC', description: 'DC digital output, 12 channels, 5–60 VDC, channel-to-channel isolation', channels: 12,},
		{ partNo: 'GRV-ODCIS-12', iogroup: 'do', colorcode: 'odc', cat: ['odc', 'iso', 'simple'], signal: [0], rangeDes:'5–60 VDC', description: 'DC digital output, 12 channels, 5–60 VDC, channel-to-channel isolation, on/off only', channels: 12,},
		{ partNo: 'GRV-ODCSRC-24', iogroup: 'do', colorcode: 'odc', cat: ['odc', 'src'], signal: [0], rangeDes:'5–60 VDC', description: 'DC digital output, 24 channels, 5–60 VDC, sourcing', channels: 24,},
		{ partNo: 'GRV-OMRIS-8', iogroup: 'do', colorcode: 'odc',  cat: ['oac', 'odc'], signal: [0], rangeDes:'0–250 VAC/5–30 VDC', description: 'AC/DC output, 8 channels, electromechanical Form C relay, 0–250 VAC/5–30 VDC, 5 A', channels: 8,},
		
		{ partNo: 'GRV-CSERI-4', iogroup: 'ser', colorcode: 'ser',  cat: ['rs232', 'rs485'], signal: [0], rangeDes:'', description: '', channels: 4,},
	];
	
	this.init = init;
	function init(){
		
		$(sys.searchID).append('<div class="menu"><button class="topic" id="bttnConfig">Configure groov EPIC</button><button class="topic" id="buy">Review</button><button class="topic" id="bttnOv">Help</button></div><div class="content" id="overview"></div><div class="content" id="configurator"><div class="top" id="iounits"></div><div class="bottom" id="parts"></div></div><div class="content" id="review"></div>');
		
		
		$('div#iounits').css({'border-color': '#00aaff', 'border-width': '1px', 'float': 'left', 'width':'45%'});
		$('div#parts').css({'border-color': '#F00', 'overflow-y': 'scroll', }); // 'height': '900px'
		//	$('div#configurator').css('border', '1px solid rgba(250,100,150,1'); //debug
	
		// *************** main topic buttons **************** //
		$(sys.searchID).find('button.topic').on('click', this, function(e){
			e.preventDefault();
			var button = $(this);
			button.css('#333'); //cludge for ie and iPhone, which ignore the following command but do this one; must precede following for other platforms to work
			button.css('background', '#333');
			button.css('color', '#fff');
			button.siblings('button[class="topic"]').css('color', '#fff') //#276193
				.css('background-color', '#ab0d0d')
				//cludge for ie and iPhone, which ignore the following command but do this one; must precede following for other platforms
				.css('background', '#ab0d0d');
			
			switch(button.attr('id')){
				case 'bttnOv':
					$(sys.searchID).find('div#overview').show()
						.siblings('div.content').hide();
				break;
				case 'bttnConfig':
					$(sys.searchID).find('div#configurator').show()
						.siblings('div.content').hide();
				break;
				
				case 'buy':
					$(sys.searchID).find('div#review').show()
						.siblings('div.content').hide();
					sys.readConfig(); 
				break;
			}	
		});
		
		$(sys.searchID).find('button.topic').css({'background':'#ab0d0d', 'color': '#fff', 'font-size': '1.3em', 'padding-bottom':'0.2em', 'margin-bottom': '0.2em'});
		$(sys.searchID).find('button#bttnConfig').css({'background': '#333'});
		
		$(sys.searchID).find('div#iounits').css({'padding':'10px'});
		$(sys.searchID).find('div#parts').css({'padding':'10px'});
		
		// *********** end main topic buttons ************** //
		/*
		$(sys.searchID).find('button#getuserconfigs').on('click', this, function(e){
			e.preventDefault();
			sys.getUserConfigs();
		});
		*/
		
		// *********************** build I/O unit and parts viewer ************************* //
		//(divContainerID, id, lookuppart, showparts, showsearch, config, res)
		sys.epicIoUnit = new EpicIoUnit('iounits', 'id',  sys.lookupPart, sys.showPart, sys.epicConfig, sys.res);
		var tempArray = sys.epicIoUnit.init();

		sys.epicPartsViewer = new EpicPartsViewer('parts', sys.io, sys.pwr, sys.ctlr, tempArray[0], sys.showPart, sys.res);
		sys.showPartInViewer = sys.epicPartsViewer.init(); //this returns one function in epicPartsViewer that will display the selector and/or highlight a specific part when passed 
		//a string containing either a part type 'ctrl', 'mod', pwr or "details" ;
		
		sys.currentIoUnit = tempArray;
	
		$(sys.searchID).find('div#overview').append('<p id="how">How to use the configurator:</p><img src="'+sys.res+'epicconfig_help.jpg"/>')
			.hide();
		$(sys.searchID).find('div#review').hide();
		
		$('#how').css({'font-weight': 'bold', 'color': '#fff'})
		//$(element).is(":visible"); 
	
	} // ******************** end init *********************** //
	
	sys.showPart = function(partNumber, type){	//this function is trick to store the search function where it can be reached. Otherwise, I think I had trouble passing the value before it was created.
		switch (type) {
			case 'pwr': //show power supply choices
				sys.showPartInViewer(partNumber, 'pwr')
			break;
			case 'ctrl':
				sys.showPartInViewer(partNumber, 'ctrl')
			break;
			case 'mod':
				sys.showPartInViewer(partNumber, 'mod')
			break;
			case 'details': //display module information
				sys.showPartInViewer(partNumber, 'details')
			break;
		}
	};
	
	sys.lookupPart = function(partNumber){
	//make sure this can handle a part number error. 
		var obj = {};
		var data = sys.io;
		var matchFlag = false;
		for(var i=0; i<data.length; i++){
			var tempPartNo = data[i].partNo;
			if(tempPartNo == partNumber){
				matchFlag = true;
				obj.error = false;
				obj.partNo = tempPartNo;
				obj.partClass = data[i].partClass;
				
				obj.partType = "module";
				obj.description = data[i].description;
				obj.signal = data[i].signal;
				obj.channels = parseInt(data[i].channels); //channel
	// ****** type code: ai, ao, idc, iac, odc, iac, serial ****** //
				obj.colorcode = data[i].colorcode;
				obj.iogroup = data[i].iogroup;
				return obj;
			}
		}
		
		data = sys.pwr;
		for(var n=0; n<data.length; n++){
			var tempPartNo = data[n].partNo;
			if(tempPartNo === partNumber){
				obj.error = true;
				obj.partNo = tempPartNo;
				obj.partType = "pwr";
				obj.description = data[n].description;
				return obj;
			}
		}
		
		if(matchFlag == false){
			obj.partNo ="";
			obj.error = true;
			return obj;
		}
	};
	

	
	
	sys.readConfig = function(){
		$('div#review').children('.report').remove();
		$('div#review').children('svg').remove();
		sys.epicReview = new EpicReview('review', 'epicRev',  sys.lookupPart, sys.showPart, sys.epicConfig, sys.res);
		var tempArray = sys.epicReview.init();
		var config = sys.currentIoUnit[1](); //function returned from I/O unit that retrieves it's configuration data.
		var string = '<div class="report">';
		if (config.controller !==''){
			var lowercase = config.controller.toLowerCase();
			var htext = 'https://www.opto22.com/products/product-container/' + lowercase;
			var hlink = '<a href="'+ htext +'" target="_blank">'+ htext +'</a>'
			string += '<table class="rpt"><tr><td>Controller:</td><td>'+config.controller+'</td><td></td><td>'+hlink+'</td></tr>';
		}
		if (config.chassis !==''){
			var lowercase = config.chassis.toLowerCase();
			var htext = 'https://www.opto22.com/products/product-container/' + lowercase;
			var hlink = '<a href="'+ htext +'" target="_blank">'+ htext +'</a>'

			string += '<tr><td>Chassis: </td><td>'+config.chassis+'</td><td id="csize" style="color: #ff0000"></td><td>'+hlink+'</td></tr>';
		}
		if (config.powersupply !== ''){
			var lowercase = config.powersupply.toLowerCase();
			var htext = 'https://www.opto22.com/products/product-container/' + lowercase;
			var hlink = '<a href="'+ htext +'" target="_blank">'+ htext +'</a>'
			
			string += '<tr><td>Power Supply: </td><td>'+config.powersupply+'</td><td></td><td>'+ hlink +'</td></tr>';
		} else {//warn that a power supply selection is needed.
			string += '<tr><td>Power Supply: </td><td style="color: #ff0000">Warning! No power supply selected.</td></tr>';
		}
		
		string +='<tr><td>Modules:</td><td id="modwarning" style="color: #ff0000"></td></tr><tr><td>Position</td><td>Part Number</td><td>Channels</td><td>Description</td><tr>';
		var modwarning = true;
		var countModules = 0;
		var highestModPosition = 0;
		for (var i=0; i<16; i++){
			if(config.io_array[i] !==""){
				
				var lowercase = config.io_array[i].toLowerCase();
				var htext = 'https://www.opto22.com/products/product-container/' + lowercase;
				var hlink = '<a href="'+ htext +'" target="_blank">'+ htext +'</a>'
				
				countModules += 1;
				var obj = sys.lookupPart(config.io_array[i]);
				string += '<tr><td style="text-align:center">'+ i +'</td><td> ' + config.io_array[i] + '</td><td style="text-align:center">'+obj.channels+'</td><td>'+obj.description+'<br/>'+hlink+'</td></tr>';
				modwarning = false;
				highestModPosition = i;
				
			} else {
				
			}
		}
		
		string += '<table></div>';
		$('div#review').append(string);
		
		if ((highestModPosition >= config.size)&&(countModules > config.size)){
			$('div#review').find('td#csize').text('Need a larger chassis')
		}
		
		if(modwarning == true){
			$('td#modwarning').text('Warning: No modules selected');
		}
	//	$('table.rpt').css({'border-width': '1px', 'border-style': 'solid'});
	};	
	
	/*
	sys.getUserConfigs = function() {
		sys.userConfigurations[0] =  { name: 'Large system', chassis: 'GRV-EPIC-CHS16', controller: 'GRV-EPIC-PR1', powersupply: 'GRV-EPIC-PSDC', io_array: ['GRV-OVMALC-8', 'GRV-IV-24', 'GRV-ITMI-8', 'GRV-IMA-24', 'GRV-OMRIS-8', 'GRV-ODCSRC-24', 'GRV-ODCIS-12', 'GRV-ODCI-12', 'GRV-OACIS-12', 'GRV-OACI-12', 'GRV-OACS-12', 'GRV-OAC-12', 'GRV-IACDCTTLS-24', 'GRV-IACDCTTL-24', 'GRV-IDCIS-12', 'GRV-IDCI-12',],};
		sys.userConfigurations[1] =  { name: 'Small system', chassis: 'GRV-EPIC-CHS8', controller: 'GRV-EPIC-PR1', powersupply: 'GRV-EPIC-PSDC', io_array: ['GRV-OVMALC-8', 'GRV-IV-24', 'GRV-ITMI-8', 'GRV-IMA-24', '', '', '', '', '', '', '', '', '', '', '', '',],};
		
		$('div#userconfigs').children('.config').remove();
		
		for (var n=0; n<sys.userConfigurations.length; n++){
			var string = '<div class="config"><hr/>Configuration Name: '+sys.userConfigurations[n].name+'&nbsp;&nbsp;<button class="loaduserconfig" index="'+n+'">Load Configuration</button></div><br/>';
			if (sys.userConfigurations[n].controller !==''){
				string += '<table class="userconfig"><tr><td>Controller:</td><td>'+sys.userConfigurations[n].controller+'</td></tr>';
			}
			if (sys.userConfigurations[n].chassis !==''){
				string += '<tr><td>Chassis: </td><td>'+sys.userConfigurations[n].chassis+'</td></tr>';
			}
			if (sys.userConfigurations[n].powersupply !== ''){
				string += '<tr><td>Power Supply: </td><td>'+sys.userConfigurations[n].powersupply+'</td></tr>';
			} else {
				string += '<tr><td>Power Supply: </td><td style="color: #ff0000">Warning! No power supply selected.</td></tr>';
				//warn that a power supply selection is needed.
			}
			
			string +='<tr><td>Modules:</td><td id="modwarning" style="color: #ff0000"></td></tr><tr><td>Position</td><td>Part Number</td><td>Channels</td><td>Description</td><tr>';
			var modwarning = true;
			
			for (var i=0; i<16; i++){
				if(sys.userConfigurations[n].io_array[i] !==""){
					var obj = sys.lookupPart(sys.userConfigurations[n].io_array[i]);
					string += '<tr><td style="text-align:center">'+ i +'</td><td> ' + sys.userConfigurations[n].io_array[i] + '</td><td style="text-align:center">'+obj.channels+'</td><td>'+obj.description+'</td></tr>';
					modwarning = false;
				} else {
					
				}
			}
			
			string += '<table></div>';
			$(sys.searchID).find('div#userconfigs').append(string);
			
			if(modwarning == true){
				$('td#modwarning').text('Warning: No modules selected');
			}
			$('table.userconfig').css({'border-width': '1px', 'border-style': 'solid'});
		}
		
		$(sys.searchID).find('button.loaduserconfig').on('click',this, function(e){
			e.preventDefault();
			var index = $(this).attr('index');
			sys.currentIoUnit[2](sys.userConfigurations[index]);
		});
		
		
	};
	*/
	
	sys.saveConfig = function() {
		
	};
	
}