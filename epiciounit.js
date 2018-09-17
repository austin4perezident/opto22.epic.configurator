// JavaScript Document, I/O unit

//change: Change all mouse over and mouse out events to use a color change instead of the show/hide of a hlight object because the show/hide is not working on the ipad.
//a tap is being read as a mouse over and then a second tap is required to activate the command. The SNAP PAC configurator does work, so use it as a model.

function EpicIoUnit(divContainerID, id, lookuppart, showpart, config, res){ 

	var epic = {};
	epic.searchID = '#' + divContainerID;
	epic.svgID = 'svg' + divContainerID;
	epic.bkgdWidth = 588;
	epic.bkgdHeight = 1060;
	epic.marginLeft = 2;
	epic.marginTop = 2;
	epic.marginRight = 2;
	epic.marginBottom = 2;
	
	epic.configDefault = { 
		name: '',
		chassis: 'GRV-EPIC-CHS8',
		size: 8,
		controller: 'GRV-EPIC-PR1',
		powersupply: '', 
		io_array: ['', '', '', '',	'', '', '', '', '', '', '', '', '', '', '', '', ],
		accessories: [],
	};
	
	epic.firstConfig = {};
	
	epic.config = null;
	epic.configInWaiting = null;
	
	epic.chassissize = -1;
	epic.fm = ''; //-FM or ''
	epic.currentPosition = null;
	epic.modIdsArray = ['mod0', 'mod1', 'mod2', 'mod3', 'mod4', 'mod5', 'mod6', 'mod7', 'mod8', 'mod9', 'mod10', 'mod11', 'mod12', 'mod13', 'mod14', 'mod15',];
	epic.alarmMsgArray = [];

	epic.modInWaiting = null;
	epic.modNextOverlay = null;
	epic.brainInWaiting = null;
	
	epic.panelOpen = true;
	epic.totalAI = 0;
	epic.totalAO = 0;
	epic.totalDI = 0;
	epic.totalDO = 0;
	epic.totalSerial = 0;
	
	epic.m_ai = '<svg class="colorcode"><g id="ai">	<path fill="#51ABFF" d="M247,7.9l-1.7,1.7c18.6,4.8,16,20.5,28.1,28.2l1.2-2.1C263,28,265.8,14,247,7.9z"/>	<path fill="#85C4FF" d="M247,7.9c18.8,6,16,20,27.6,27.8l-0.4,0.4c-11.6-7.8-8.8-21.7-27.6-27.8L247,7.9z"/>	<path fill="#73BBFF" d="M245.2,9.7c18.6,4.8,16,20.5,28.1,28.2l0.2-0.2c-12.1-7.7-9.6-23.4-28.2-28.2"/></g></svg>';
	
	epic.m_ao = '<svg class="colorcode"><g id="ao">	<path fill="#09FF23" d="M247,7.9l-1.7,1.7c18.6,4.8,16,20.5,28.1,28.2l1.2-2.1C263,28,265.8,14,247,7.9z"/>	<path fill="#73FF82" d="M247,7.9c18.8,6,16,20,27.6,27.8l-0.4,0.4c-11.6-7.8-8.8-21.7-27.6-27.8L247,7.9z"/>	<path fill="#82FF8F" d="M245.2,9.7c18.6,4.8,16,20.5,28.1,28.2l0.2-0.2c-12.1-7.7-9.6-23.4-28.2-28.2"/></g></svg>';
	
	epic.m_iac = '<svg class="colorcode"><g id="iac">	<path fill="#FFFF03" d="M247,7.9l-1.7,1.7c18.6,4.8,16,20.5,28.1,28.2l1.2-2.1C263,28,265.8,14,247,7.9z"/>	<path fill="#FFFFB0" d="M247,7.9c18.8,6,16,20,27.6,27.8l-0.4,0.4c-11.6-7.8-8.8-21.7-27.6-27.8L247,7.9z"/>	<path fill="#FFFFB0" d="M245.2,9.7c18.6,4.8,16,20.5,28.1,28.2l0.2-0.2c-12.1-7.7-9.6-23.4-28.2-28.2"/></g></svg>';
	
	epic.m_idc = '<svg class="colorcode"><g id="idc">	<path fill="#DEDEDE" d="M247,7.9l-1.7,1.7c18.6,4.8,16,20.5,28.1,28.2l1.2-2.1C263,28,265.8,14,247,7.9z"/>	<path fill="#FFFFFF" d="M247,7.9c18.8,6,16,20,27.6,27.8l-0.4,0.4c-11.6-7.8-8.8-21.7-27.6-27.8L247,7.9z"/>	<path fill="#FFFFFF" d="M245.2,9.7c18.6,4.8,16,20.5,28.1,28.2l0.2-0.2c-12.1-7.7-9.6-23.4-28.2-28.2"/></g></svg>';
	
	epic.m_oac = '<svg class="colorcode"><g id="oac">	<path d="M247,7.9l-1.7,1.7c18.6,4.8,16,20.5,28.1,28.2l1.2-2.1C263,28,265.8,14,247,7.9z"/>	<path fill="#FFFFFF" d="M247,7.9c18.8,6,16,20,27.6,27.8l-0.4,0.4c-11.6-7.8-8.8-21.7-27.6-27.8L247,7.9z"/>	<path fill="#FFFFFF" d="M245.2,9.7c18.6,4.8,16,20.5,28.1,28.2l0.2-0.2c-12.1-7.7-9.6-23.4-28.2-28.2"/></g></svg>';
	
	epic.m_odc = '<svg class="colorcode"<g id="odc"><path fill="#FF0000" d="M247,7.9l-1.7,1.7c18.6,4.8,16,20.5,28.1,28.2l1.2-2.1C263,28,265.8,14,247,7.9z"/><path fill="#FF8787" d="M247,7.9c18.8,6,16,20,27.6,27.8l-0.4,0.4c-11.6-7.8-8.8-21.7-27.6-27.8L247,7.9z"/><path fill="#FF8787" d="M245.2,9.7c18.6,4.8,16,20.5,28.1,28.2l0.2-0.2c-12.1-7.7-9.6-23.4-28.2-28.2"/></g>></svg>';
	
	epic.m_ser = '<svg class="colorcode"><g id="ser">	<path fill="#999999" d="M247,7.9l-1.7,1.7c18.6,4.8,16,20.5,28.1,28.2l1.2-2.1C263,28,265.8,14,247,7.9z"/>	<path fill="#CCCCCC" d="M247,7.9c18.8,6,16,20,27.6,27.8l-0.4,0.4c-11.6-7.8-8.8-21.7-27.6-27.8L247,7.9z"/>	<path fill="#1A1A1A" d="M245.2,9.7c18.6,4.8,16,20.5,28.1,28.2l0.2-0.2c-12.1-7.7-9.6-23.4-28.2-28.2"/></g></svg>';
	
	epic.m4 = '<svg class="chanNo"><g id="c4"><path fill="#636363" d="M92.9,15.8l0.2-1.1c0.4,0.1,0.6,0.3,0.8,0.5s0.3,0.6,0.3,1.1c0,0.6-0.1,1-0.3,1.2s-0.5,0.4-0.8,0.4	c-0.2,0-0.4-0.1-0.5-0.2s-0.3-0.3-0.4-0.5c0,0.2-0.1,0.3-0.1,0.4c-0.1,0.1-0.2,0.3-0.3,0.3S91.5,18,91.3,18c-0.3,0-0.5-0.1-0.7-0.2	s-0.4-0.3-0.5-0.6s-0.2-0.6-0.2-1s0-0.7,0.1-0.9s0.2-0.4,0.4-0.6s0.4-0.3,0.7-0.3l0.2,1.2c-0.2,0-0.4,0.1-0.5,0.2s-0.1,0.2-0.1,0.4	s0.1,0.3,0.2,0.4s0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2s0.2-0.2,0.2-0.4c0-0.1,0-0.2-0.1-0.4L92.9,15.8c0,0.2,0,0.2,0,0.3	c0,0.2,0,0.3,0.1,0.4s0.2,0.2,0.4,0.2c0.1,0,0.2,0,0.3-0.1s0.1-0.2,0.1-0.3c0-0.1,0-0.3-0.1-0.3S93.1,15.8,92.9,15.8z"/><path fill="#636363" d="M137.9,18.1v-3.6c0.4,0,0.7,0.2,1,0.4s0.7,0.6,1.1,1.2c0.3,0.3,0.5,0.6,0.6,0.7s0.3,0.1,0.4,0.1	c0.1,0,0.2,0,0.3-0.1s0.1-0.2,0.1-0.4c0-0.2,0-0.3-0.1-0.4s-0.3-0.2-0.5-0.2l0.1-1.2c0.3,0,0.6,0.1,0.8,0.3s0.3,0.3,0.4,0.5	s0.2,0.5,0.2,0.9c0,0.4,0,0.7-0.1,1s-0.2,0.4-0.4,0.6s-0.4,0.2-0.7,0.2s-0.5-0.1-0.8-0.2s-0.5-0.4-0.8-0.8c-0.2-0.2-0.3-0.4-0.3-0.5	s-0.2-0.2-0.3-0.3v1.9h-1V18.1z"/><path fill="#636363" d="M190.3,17.4h-4.4v-1.2h2.9c-0.1-0.2-0.3-0.4-0.4-0.6s-0.2-0.4-0.3-0.7h1c0.1,0.4,0.3,0.7,0.5,0.9	s0.4,0.4,0.7,0.5V17.4z"/><path fill="#636363" d="M236.1,14.7c0.8,0,1.4,0.1,1.7,0.4s0.5,0.7,0.5,1.3c0,0.3,0,0.5-0.1,0.7s-0.2,0.3-0.3,0.5	c-0.1,0.1-0.2,0.2-0.4,0.3c-0.1,0.1-0.3,0.1-0.4,0.2c-0.3,0.1-0.7,0.1-1,0.1c-0.8,0-1.3-0.1-1.7-0.4s-0.5-0.7-0.5-1.4	c0-0.4,0.1-0.7,0.2-0.9s0.3-0.4,0.5-0.5s0.4-0.2,0.6-0.2C235.5,14.7,235.8,14.7,236.1,14.7z M236.1,15.8c-0.5,0-0.9,0-1.1,0.1	c-0.2,0.1-0.3,0.2-0.3,0.4c0,0.1,0,0.2,0.1,0.3c0.1,0.1,0.2,0.2,0.4,0.2s0.5,0.1,0.9,0.1c0.6,0,1,0,1.1-0.1c0.2-0.1,0.3-0.2,0.3-0.4	c0-0.2-0.1-0.3-0.3-0.4S236.6,15.8,236.1,15.8z"/><path fill="#636363" d="M190.3,17.4h-4.4v-1.2h2.9c-0.1-0.2-0.3-0.4-0.4-0.6s-0.2-0.4-0.3-0.7h1c0.1,0.4,0.3,0.7,0.5,0.9	s0.4,0.4,0.7,0.5V17.4z"/><path fill="#636363" d="M92.9,15.8l0.2-1.1c0.4,0.1,0.6,0.3,0.8,0.5s0.3,0.6,0.3,1.1c0,0.6-0.1,1-0.3,1.2s-0.5,0.4-0.8,0.4	c-0.2,0-0.4-0.1-0.5-0.2s-0.3-0.3-0.4-0.5c0,0.2-0.1,0.3-0.1,0.4c-0.1,0.1-0.2,0.3-0.3,0.3S91.5,18,91.3,18c-0.3,0-0.5-0.1-0.7-0.2	s-0.4-0.3-0.5-0.6s-0.2-0.6-0.2-1s0-0.7,0.1-0.9s0.2-0.4,0.4-0.6s0.4-0.3,0.7-0.3l0.2,1.2c-0.2,0-0.4,0.1-0.5,0.2s-0.1,0.2-0.1,0.4	s0.1,0.3,0.2,0.4s0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2s0.2-0.2,0.2-0.4c0-0.1,0-0.2-0.1-0.4L92.9,15.8c0,0.2,0,0.2,0,0.3	c0,0.2,0,0.3,0.1,0.4s0.2,0.2,0.4,0.2c0.1,0,0.2,0,0.3-0.1s0.1-0.2,0.1-0.3c0-0.1,0-0.3-0.1-0.3S93.1,15.8,92.9,15.8z"/></g></svg>';
	
	epic.m8 = '<svg class="chanNo"><g id="c8"><path fill="#636363" d="M236.1,14.7c0.8,0,1.4,0.1,1.7,0.4s0.5,0.7,0.5,1.3c0,0.3,0,0.5-0.1,0.7s-0.2,0.3-0.3,0.5	c-0.1,0.1-0.2,0.2-0.4,0.3c-0.1,0.1-0.3,0.1-0.4,0.2c-0.3,0.1-0.7,0.1-1,0.1c-0.8,0-1.3-0.1-1.7-0.4s-0.5-0.7-0.5-1.4	c0-0.4,0.1-0.7,0.2-0.9s0.3-0.4,0.5-0.5s0.4-0.2,0.6-0.2C235.5,14.7,235.8,14.7,236.1,14.7z M236.1,15.8c-0.5,0-0.9,0-1.1,0.1	c-0.2,0.1-0.3,0.2-0.3,0.4c0,0.1,0,0.2,0.1,0.3c0.1,0.1,0.2,0.2,0.4,0.2s0.5,0.1,0.9,0.1c0.6,0,1,0,1.1-0.1c0.2-0.1,0.3-0.2,0.3-0.4	c0-0.2-0.1-0.3-0.3-0.4S236.6,15.8,236.1,15.8z"/><path fill="#636363" d="M214.3,17.4h-4.4v-1.2h2.9c-0.1-0.2-0.3-0.4-0.4-0.6s-0.2-0.4-0.3-0.7h1c0.1,0.4,0.3,0.7,0.5,0.9	s0.4,0.4,0.7,0.5V17.4z"/><path fill="#636363" d="M185.9,18.1v-3.6c0.4,0,0.7,0.2,1,0.4s0.7,0.6,1.1,1.2c0.3,0.3,0.5,0.6,0.6,0.7s0.3,0.1,0.4,0.1	c0.1,0,0.2,0,0.3-0.1s0.1-0.2,0.1-0.4c0-0.2,0-0.3-0.1-0.4s-0.3-0.2-0.5-0.2l0.1-1.2c0.3,0,0.6,0.1,0.8,0.3s0.3,0.3,0.4,0.5	s0.2,0.5,0.2,0.9c0,0.4,0,0.7-0.1,1s-0.2,0.4-0.4,0.6s-0.4,0.2-0.7,0.2s-0.5-0.1-0.8-0.2s-0.5-0.4-0.8-0.8c-0.2-0.2-0.3-0.4-0.3-0.5	s-0.2-0.2-0.3-0.3v1.9h-1V18.1z"/><path fill="#636363" d="M165,15.8l0.2-1.1c0.4,0.1,0.6,0.3,0.8,0.5s0.3,0.6,0.3,1.1c0,0.6-0.1,1-0.3,1.2s-0.5,0.4-0.8,0.4	c-0.2,0-0.4-0.1-0.5-0.2s-0.3-0.3-0.4-0.5c0,0.2-0.1,0.3-0.1,0.4c-0.1,0.1-0.2,0.3-0.3,0.3s-0.3,0.1-0.5,0.1c-0.3,0-0.5-0.1-0.7-0.2	s-0.4-0.3-0.5-0.6s-0.2-0.6-0.2-1s0-0.7,0.1-0.9s0.2-0.4,0.4-0.6s0.4-0.3,0.7-0.3l0.2,1.2c-0.2,0-0.4,0.1-0.5,0.2s-0.1,0.2-0.1,0.4	s0.1,0.3,0.2,0.4s0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2s0.2-0.2,0.2-0.4c0-0.1,0-0.2-0.1-0.4L165,15.8c0,0.2,0,0.2,0,0.3	c0,0.2,0,0.3,0.1,0.4s0.2,0.2,0.4,0.2c0.1,0,0.2,0,0.3-0.1s0.1-0.2,0.1-0.3c0-0.1,0-0.3-0.1-0.3S165.2,15.8,165,15.8z"/><path fill="#636363" d="M138.7,16.7v-2.2h1l2.6,2.2v1h-2.6v0.5h-0.9v-0.5H138v-1H138.7z M139.6,16.7h1.4l-1.4-1.1V16.7z"/><path fill="#636363" d="M118.2,15.1V18h-1v-1.9l-0.6-0.1c0.1,0.1,0.1,0.3,0.1,0.4s0,0.3,0,0.4c0,0.4-0.1,0.8-0.4,1s-0.6,0.4-1,0.4	c-0.3,0-0.5-0.1-0.8-0.2s-0.5-0.3-0.6-0.6s-0.2-0.6-0.2-1c0-0.3,0-0.5,0.1-0.7s0.1-0.4,0.2-0.5s0.2-0.3,0.4-0.3s0.3-0.2,0.5-0.2	l0.1,1.2c-0.2,0-0.3,0.1-0.4,0.2s-0.2,0.2-0.2,0.4c0,0.2,0.1,0.3,0.2,0.4s0.3,0.2,0.6,0.2c0.3,0,0.4-0.1,0.6-0.2s0.2-0.3,0.2-0.4	s0-0.2-0.1-0.3c0-0.1-0.1-0.2-0.2-0.3l0.1-1L118.2,15.1z"/><path fill="#636363" d="M93.2,18.1l-0.1-1.2c0.2,0,0.3-0.1,0.4-0.2s0.1-0.2,0.1-0.3c0-0.2-0.1-0.3-0.3-0.5c-0.1-0.1-0.4-0.1-0.9-0.2	c0.1,0.1,0.3,0.3,0.3,0.4s0.1,0.3,0.1,0.5c0,0.4-0.1,0.7-0.4,1s-0.6,0.4-1,0.4c-0.3,0-0.5-0.1-0.8-0.2s-0.4-0.3-0.5-0.6	s-0.2-0.5-0.2-0.9s0.1-0.8,0.2-1s0.4-0.5,0.7-0.6s0.7-0.2,1.3-0.2c0.8,0,1.3,0.2,1.7,0.5s0.5,0.8,0.5,1.4c0,0.3,0,0.6-0.1,0.8	s-0.2,0.4-0.3,0.5S93.5,18,93.2,18.1z M91.3,15.9c-0.2,0-0.4,0.1-0.5,0.2s-0.2,0.3-0.2,0.4c0,0.2,0.1,0.3,0.2,0.4s0.3,0.2,0.5,0.2	s0.4-0.1,0.6-0.2s0.2-0.2,0.2-0.4c0-0.2-0.1-0.3-0.2-0.4S91.5,15.9,91.3,15.9z"/><path fill="#636363" d="M70.2,14.7v3.5h-0.8c-0.3-0.3-0.6-0.6-0.9-0.8c-0.4-0.2-0.8-0.4-1.3-0.6c-0.4-0.1-0.8-0.2-1.3-0.2v-1.2	c0.7,0.1,1.3,0.2,1.8,0.4s1,0.5,1.5,1v-2.1C69.2,14.7,70.2,14.7,70.2,14.7z"/></g></svg>';
	
	epic.m12 = '<svg class="chanNo"><g id="c12"><path fill="#636363" d="M245.3,18.4c-1.4,0-2.3-0.5-2.3-1.7s1-1.7,2.3-1.7s2.3,0.5,2.3,1.7S246.5,18.4,245.3,18.4z M245.3,16.1	c-1,0-1.5,0.2-1.5,0.6s0.5,0.6,1.5,0.6s1.5-0.2,1.5-0.6C246.7,16.3,246.3,16.1,245.3,16.1z"/><path fill="#636363" d="M230.3,16.5L230.3,16.5l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V16.5z"/><path fill="#636363" d="M210.7,15.1h0.6l0.5,0.5c0.8,1,1.4,1.4,1.9,1.4c0.4,0,0.6-0.2,0.6-0.8c0-0.4-0.2-0.7-0.4-0.9l0.8-0.3	c0.2,0.3,0.5,0.8,0.5,1.4c0,1-0.6,1.5-1.4,1.5s-1.4-0.5-1.9-1.1l-0.3-0.4l0,0v1.7h-0.8L210.7,15.1L210.7,15.1z"/><path fill="#636363" d="M195.5,15.3c-0.1,0.2-0.3,0.6-0.3,1c0,0.5,0.2,0.8,0.6,0.8c0.5,0,0.6-0.5,0.6-0.9v-0.5h0.8v0.4	c0,0.4,0.2,0.8,0.5,0.8c0.2,0,0.5-0.2,0.5-0.7c0-0.4-0.2-0.8-0.2-0.9l0.8-0.2c0.2,0.2,0.3,0.8,0.3,1.4c0,0.9-0.5,1.4-1.1,1.4	c-0.5,0-0.8-0.2-1-0.8l0,0c-0.1,0.5-0.5,1-1.1,1c-0.8,0-1.4-0.7-1.4-1.8c0-0.6,0.2-1.1,0.3-1.3L195.5,15.3z"/><path fill="#636363" d="M178.4,16.9h1.1v-2h0.7l2.6,1.7v1.3h-2.6v0.5h-0.8v-0.5h-1.1v-1H178.4z M180.2,16.9h1c0.2,0,0.5,0,0.8,0	l0,0c-0.3-0.2-0.5-0.2-0.8-0.4l-1-0.6l0,0V16.9z"/><path fill="#636363" d="M165.8,18.1v-1.7l-0.7-0.1c0,0.1,0,0.2,0,0.3c0,0.5-0.1,0.8-0.3,1.1s-0.6,0.5-1.1,0.5	c-0.8,0-1.5-0.7-1.5-1.9c0-0.5,0.2-1,0.2-1.2l0.8,0.2c-0.1,0.2-0.2,0.6-0.2,1c0,0.5,0.2,0.9,0.7,0.9s0.8-0.4,0.8-1.2	c0-0.2,0-0.4-0.1-0.6l2.3,0.3v2.4L165.8,18.1L165.8,18.1z"/><path fill="#636363" d="M149.7,17.9c0-0.2,0-0.2,0-0.4c-0.1-0.9-0.5-1.3-1.1-1.4l0,0c0.2,0.2,0.4,0.5,0.4,0.9	c0,0.8-0.5,1.4-1.4,1.4s-1.6-0.7-1.6-1.6c0-1.1,0.9-1.7,1.9-1.7c0.8,0,1.5,0.3,2,0.8c0.4,0.5,0.6,1,0.7,1.7c0,0.2,0,0.3,0,0.4	L149.7,17.9L149.7,17.9z M147.5,17.4c0.4,0,0.8-0.2,0.8-0.7c0-0.3-0.2-0.5-0.4-0.6c-0.1,0-0.2-0.1-0.2-0.1c-0.5,0-0.9,0.2-0.9,0.7	C146.7,17.2,147,17.4,147.5,17.4z"/><path fill="#636363" d="M134.2,18.3h-0.7l-3.7-1.8v-1.1l3.5,1.8l0,0v-2h0.8L134.2,18.3L134.2,18.3z"/><path fill="#636363" d="M114.8,15c0.5,0,0.9,0.3,1.1,0.8l0,0c0.2-0.5,0.6-0.6,1-0.6c0.8,0,1.2,0.7,1.2,1.5c0,1.1-0.6,1.4-1.1,1.4	c-0.4,0-0.8-0.2-1-0.6l0,0c-0.2,0.5-0.5,0.8-1.1,0.8c-0.8,0-1.4-0.7-1.4-1.7C113.6,15.6,114.2,15,114.8,15z M114.9,17.3	c0.4,0,0.6-0.3,0.8-0.7c-0.1-0.3-0.3-0.5-0.7-0.5c-0.3,0-0.6,0.2-0.6,0.6C114.3,17.1,114.6,17.3,114.9,17.3z M116.9,16.2	c-0.3,0-0.5,0.3-0.6,0.6c0.1,0.2,0.3,0.5,0.5,0.5c0.3,0,0.5-0.2,0.5-0.5C117.4,16.3,117.2,16.2,116.9,16.2z"/><path fill="#636363" d="M98.3,15.4c0,0.2,0,0.2,0,0.5c0,0.3,0.1,0.6,0.3,0.8c0.2,0.3,0.5,0.5,0.8,0.5l0,0c-0.2-0.2-0.3-0.5-0.3-0.9	c0-0.8,0.5-1.4,1.4-1.4c0.8,0,1.6,0.7,1.6,1.7c0,1.1-0.8,1.7-1.9,1.7c-0.9,0-1.6-0.3-2-0.8s-0.6-1-0.6-1.7c0-0.2,0-0.4,0-0.5	L98.3,15.4z M100.5,16.1c-0.4,0-0.7,0.2-0.7,0.6c0,0.3,0.2,0.5,0.3,0.6c0.1,0,0.2,0.1,0.2,0.1c0.5,0,0.9-0.2,0.9-0.6	S100.9,16.1,100.5,16.1z"/><path fill="#636363" d="M84.8,16.5L84.8,16.5l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V16.5z"/><path fill="#636363" d="M83.5,22.1c-1.4,0-2.3-0.5-2.3-1.7c0-1.1,1-1.7,2.3-1.7s2.3,0.5,2.3,1.7C85.8,21.7,84.7,22.1,83.5,22.1z	 M83.5,19.9c-1,0-1.5,0.2-1.5,0.6s0.5,0.6,1.5,0.6s1.5-0.2,1.5-0.6S84.5,19.8,83.5,19.9z"/><path fill="#636363" d="M68.6,16.5L68.6,16.5l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V16.5z"/><path fill="#636363" d="M68.6,20.2L68.6,20.2l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V20.2z"/></g></svg>';
	
	
	epic.m24 = '<svg class="chanNo"><g id="c24"><path fill="#636363" d="M245.3,18.4c-1.4,0-2.3-0.5-2.3-1.7s1-1.7,2.3-1.7s2.3,0.5,2.3,1.7S246.5,18.4,245.3,18.4z M245.3,16.1	c-1,0-1.5,0.2-1.5,0.6s0.5,0.6,1.5,0.6s1.5-0.2,1.5-0.6C246.7,16.3,246.3,16.1,245.3,16.1z"/><path fill="#636363" d="M238.5,16.5L238.5,16.5l-0.4-0.8l0.8-0.2l0.5,1.1v0.8H235v-1h3.5V16.5z"/><path fill="#636363" d="M226.9,15.1h0.6l0.5,0.5c0.8,1,1.4,1.4,1.9,1.4c0.4,0,0.6-0.2,0.6-0.8c0-0.4-0.2-0.7-0.4-0.9l0.8-0.3	c0.2,0.3,0.5,0.8,0.5,1.4c0,1-0.6,1.5-1.4,1.5c-0.8,0-1.4-0.5-1.9-1.1l-0.3-0.4l0,0v1.7H227L226.9,15.1L226.9,15.1z"/><path fill="#636363" d="M219.8,15.3c-0.1,0.2-0.3,0.6-0.3,1c0,0.5,0.2,0.8,0.6,0.8c0.5,0,0.6-0.5,0.6-0.9v-0.5h0.8v0.4	c0,0.4,0.2,0.8,0.5,0.8c0.2,0,0.5-0.2,0.5-0.7c0-0.4-0.2-0.8-0.2-0.9l0.8-0.2c0.2,0.2,0.3,0.8,0.3,1.4c0,0.9-0.5,1.4-1.1,1.4	c-0.5,0-0.8-0.2-1-0.8l0,0c-0.1,0.5-0.5,1-1.1,1c-0.8,0-1.4-0.7-1.4-1.8c0-0.6,0.2-1.1,0.3-1.3L219.8,15.3z"/><path fill="#636363" d="M210.7,16.9h1.1v-2h0.7l2.6,1.7v1.3h-2.6v0.5h-0.8v-0.5h-1.1L210.7,16.9L210.7,16.9z M212.5,16.9h1	c0.2,0,0.5,0,0.8,0l0,0c-0.3-0.2-0.5-0.2-0.8-0.4l-1-0.6l0,0V16.9z"/><path fill="#636363" d="M206.2,18.1v-1.7l-0.7-0.1c0,0.1,0,0.2,0,0.3c0,0.5-0.1,0.8-0.3,1.1c-0.2,0.3-0.6,0.5-1.1,0.5	c-0.8,0-1.5-0.7-1.5-1.9c0-0.5,0.2-1,0.2-1.2l0.8,0.2c-0.1,0.2-0.2,0.6-0.2,1c0,0.5,0.2,0.9,0.7,0.9s0.8-0.4,0.8-1.2	c0-0.2,0-0.4-0.1-0.6l2.3,0.3v2.4L206.2,18.1L206.2,18.1z"/><path fill="#636363" d="M198.2,17.9c0-0.2,0-0.2,0-0.4c-0.1-0.9-0.5-1.3-1.1-1.4l0,0c0.2,0.2,0.4,0.5,0.4,0.9c0,0.8-0.5,1.4-1.4,1.4	s-1.6-0.7-1.6-1.6c0-1.1,0.9-1.7,1.9-1.7c0.8,0,1.5,0.3,2,0.8c0.4,0.5,0.6,1,0.7,1.7c0,0.2,0,0.3,0,0.4L198.2,17.9L198.2,17.9z	 M196,17.4c0.4,0,0.8-0.2,0.8-0.7c0-0.3-0.2-0.5-0.4-0.6c-0.1,0-0.2-0.1-0.2-0.1c-0.5,0-0.9,0.2-0.9,0.7S195.5,17.4,196,17.4z"/><path fill="#636363" d="M190.8,18.3h-0.7l-3.7-1.8v-1.1l3.5,1.8l0,0v-2h0.8L190.8,18.3L190.8,18.3z"/><path fill="#636363" d="M179.5,15c0.5,0,0.9,0.3,1.1,0.8l0,0c0.2-0.5,0.6-0.6,1-0.6c0.8,0,1.2,0.7,1.2,1.5c0,1.1-0.6,1.4-1.1,1.4	c-0.4,0-0.8-0.2-1-0.6l0,0c-0.2,0.5-0.5,0.8-1.1,0.8c-0.8,0-1.4-0.7-1.4-1.7C178.3,15.6,178.9,15,179.5,15z M179.6,17.3	c0.4,0,0.6-0.3,0.8-0.7c-0.1-0.3-0.3-0.5-0.7-0.5c-0.3,0-0.6,0.2-0.6,0.6C179,17.1,179.2,17.3,179.6,17.3z M181.6,16.2	c-0.3,0-0.5,0.3-0.6,0.6c0.1,0.2,0.3,0.5,0.5,0.5c0.3,0,0.5-0.2,0.5-0.5C182.2,16.3,181.9,16.2,181.6,16.2z"/><path fill="#636363" d="M171.1,15.4c0,0.2,0,0.2,0,0.5c0,0.3,0.1,0.6,0.3,0.8c0.2,0.3,0.5,0.5,0.8,0.5l0,0c-0.2-0.2-0.3-0.5-0.3-0.9	c0-0.8,0.5-1.4,1.4-1.4c0.8,0,1.6,0.7,1.6,1.7c0,1.1-0.8,1.7-1.9,1.7c-0.9,0-1.6-0.3-2-0.8s-0.6-1-0.6-1.7c0-0.2,0-0.4,0-0.5	L171.1,15.4z M173.2,16.1c-0.4,0-0.7,0.2-0.7,0.6c0,0.3,0.2,0.5,0.3,0.6c0.1,0,0.2,0.1,0.2,0.1c0.5,0,0.9-0.2,0.9-0.6	S173.7,16.1,173.2,16.1z"/><path fill="#636363" d="M165.7,16.5L165.7,16.5l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V16.5z"/><path fill="#636363" d="M164.4,22.1c-1.4,0-2.3-0.5-2.3-1.7c0-1.1,1-1.7,2.3-1.7s2.3,0.5,2.3,1.7C166.7,21.7,165.6,22.1,164.4,22.1z	 M164.4,19.9c-1,0-1.5,0.2-1.5,0.6s0.5,0.6,1.5,0.6s1.5-0.2,1.5-0.6C165.8,20.1,165.4,19.8,164.4,19.9z"/><path fill="#636363" d="M157.6,16.5L157.6,16.5l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V16.5z"/><path fill="#636363" d="M157.6,20.2L157.6,20.2l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V20.2z"/><path fill="#636363" d="M149.5,16.5L149.5,16.5l-0.4-0.8l0.8-0.2l0.5,1.1v0.8H146v-1h3.5V16.5z"/><path fill="#636363" d="M146,18.9h0.6l0.5,0.5c0.8,1,1.4,1.4,1.9,1.4c0.4,0,0.6-0.2,0.6-0.8c0-0.4-0.2-0.7-0.4-0.9l0.8-0.3	c0.2,0.3,0.5,0.8,0.5,1.4c0,1-0.6,1.5-1.4,1.5c-0.8,0-1.3-0.5-1.9-1.1l-0.3-0.4l0,0V22h-0.8L146,18.9L146,18.9z"/><path fill="#636363" d="M141.4,16.5L141.4,16.5l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V16.5z"/><path fill="#636363" d="M139,19c-0.1,0.2-0.3,0.6-0.3,1c0,0.5,0.2,0.8,0.6,0.8c0.5,0,0.6-0.5,0.6-0.9v-0.5h0.8v0.4	c0,0.4,0.2,0.8,0.5,0.8c0.2,0,0.5-0.2,0.5-0.7c0-0.4-0.2-0.8-0.2-0.9l0.8-0.2c0.2,0.2,0.3,0.8,0.3,1.4c0,0.9-0.5,1.4-1.1,1.4	c-0.5,0-0.8-0.2-1-0.8l0,0c-0.1,0.5-0.5,1-1.1,1c-0.8,0-1.4-0.7-1.4-1.8c0-0.6,0.2-1.1,0.3-1.3L139,19z"/><path fill="#636363" d="M133.3,16.5L133.3,16.5l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V16.5z"/><path fill="#636363" d="M129.8,20.7h1.1v-2h0.7l2.6,1.7v1.3h-2.6v0.5h-0.8v-0.5h-1.1v-1H129.8z M131.6,20.7h1c0.2,0,0.5,0,0.8,0l0,0	c-0.3-0.2-0.5-0.2-0.8-0.4l-1-0.6l0,0V20.7z"/><path fill="#636363" d="M125.2,16.5L125.2,16.5l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V16.5z"/><path fill="#636363" d="M125.3,21.8v-1.7l-0.7-0.1c0,0.1,0,0.2,0,0.3c0,0.5-0.1,0.8-0.3,1.1s-0.6,0.5-1.1,0.5	c-0.8,0-1.5-0.7-1.5-1.9c0-0.5,0.2-1,0.2-1.2l0.8,0.2c-0.1,0.2-0.2,0.6-0.2,1c0,0.5,0.2,0.9,0.7,0.9s0.8-0.4,0.8-1.2	c0-0.2,0-0.4-0.1-0.6l2.3,0.3v2.4L125.3,21.8L125.3,21.8z"/><path fill="#636363" d="M117.1,16.5L117.1,16.5l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V16.5z"/><path fill="#636363" d="M117.3,21.7c0-0.2,0-0.2,0-0.4c-0.1-0.9-0.5-1.3-1.1-1.4l0,0c0.2,0.2,0.4,0.5,0.4,0.9c0,0.8-0.5,1.4-1.4,1.4	s-1.6-0.7-1.6-1.6c0-1.1,0.9-1.7,1.9-1.7c0.8,0,1.5,0.3,2,0.8c0.4,0.5,0.6,1,0.7,1.7c0,0.2,0,0.3,0,0.4L117.3,21.7L117.3,21.7z	 M115.1,21.1c0.4,0,0.8-0.2,0.8-0.7c0-0.3-0.2-0.5-0.4-0.6c-0.1,0-0.2-0.1-0.2-0.1c-0.5,0-0.9,0.2-0.9,0.7	C114.3,20.9,114.6,21.1,115.1,21.1z"/><path fill="#636363" d="M109.1,16.5L109.1,16.5l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V16.5z"/><path fill="#636363" d="M110,22h-0.7l-3.7-1.8v-1.1l3.5,1.8l0,0v-2h0.8L110,22L110,22z"/><path fill="#636363" d="M101,16.5L101,16.5l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V16.5z"/><path fill="#636363" d="M98.6,18.8c0.5,0,0.9,0.3,1.1,0.8l0,0c0.2-0.5,0.6-0.6,1-0.6c0.8,0,1.2,0.7,1.2,1.5c0,1.1-0.6,1.4-1.1,1.4	c-0.4,0-0.8-0.2-1-0.6l0,0c-0.2,0.5-0.5,0.8-1.1,0.8c-0.8,0-1.4-0.7-1.4-1.7C97.4,19.4,98,18.8,98.6,18.8z M98.6,21.1	c0.4,0,0.6-0.3,0.8-0.7c-0.1-0.3-0.3-0.5-0.7-0.5c-0.3,0-0.6,0.2-0.6,0.6C98.1,20.9,98.3,21.1,98.6,21.1z M100.8,20	c-0.3,0-0.5,0.3-0.6,0.6c0.1,0.2,0.3,0.5,0.5,0.5c0.3,0,0.5-0.2,0.5-0.5C101.3,20.1,101.1,20,100.8,20z"/><path fill="#636363" d="M92.9,16.5L92.9,16.5l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V16.5z"/><path fill="#636363" d="M90.2,19.2c0,0.2,0,0.2,0,0.5s0.1,0.6,0.3,0.8c0.2,0.3,0.5,0.5,0.8,0.5l0,0c-0.2-0.2-0.3-0.5-0.3-0.9	c0-0.8,0.5-1.4,1.4-1.4c0.8,0,1.6,0.7,1.6,1.7c0,1.1-0.8,1.7-1.9,1.7c-0.9,0-1.6-0.3-2-0.8s-0.6-1-0.6-1.7c0-0.2,0-0.4,0-0.5	L90.2,19.2z M92.4,19.8c-0.4,0-0.7,0.2-0.7,0.6c0,0.3,0.2,0.5,0.3,0.6c0.1,0,0.2,0.1,0.2,0.1c0.5,0,0.9-0.2,0.9-0.6	C93.1,20.1,92.8,19.8,92.4,19.8z"/><path fill="#636363" d="M81.3,15.1H82l0.5,0.5c0.8,1,1.4,1.4,1.9,1.4c0.4,0,0.6-0.2,0.6-0.8c0-0.4-0.2-0.7-0.4-0.9l0.8-0.3	c0.2,0.3,0.5,0.8,0.5,1.4c0,1-0.6,1.5-1.4,1.5s-1.3-0.5-1.9-1.1l-0.3-0.4l0,0v1.7h-0.8L81.3,15.1L81.3,15.1z"/><path fill="#636363" d="M83.5,22.1c-1.4,0-2.3-0.5-2.3-1.7c0-1.1,1-1.7,2.3-1.7s2.3,0.5,2.3,1.7C85.8,21.7,84.7,22.1,83.5,22.1z	 M83.5,19.9c-1,0-1.5,0.2-1.5,0.6s0.5,0.6,1.5,0.6s1.5-0.2,1.5-0.6S84.5,19.8,83.5,19.9z"/><path fill="#636363" d="M73.3,15.1h0.6l0.5,0.5c0.8,1,1.4,1.4,1.9,1.4c0.4,0,0.6-0.2,0.6-0.8c0-0.4-0.2-0.7-0.4-0.9l0.8-0.3	c0.2,0.3,0.5,0.8,0.5,1.4c0,1-0.6,1.5-1.4,1.5s-1.3-0.5-1.9-1.1l-0.3-0.4l0,0v1.7h-0.8L73.3,15.1L73.3,15.1z"/><path fill="#636363" d="M76.7,20.2L76.7,20.2l-0.4-0.8l0.8-0.2l0.5,1.1v0.8h-4.4v-1h3.5V20.2z"/><path fill="#636363" d="M65.1,15.1h0.6l0.5,0.5c0.8,1,1.4,1.4,1.9,1.4c0.4,0,0.6-0.2,0.6-0.8c0-0.4-0.2-0.7-0.4-0.9l0.8-0.3	c0.2,0.3,0.5,0.8,0.5,1.4c0,1-0.6,1.5-1.4,1.5s-1.3-0.5-1.9-1.1L66,16.6l0,0v1.7h-0.8L65.1,15.1L65.1,15.1z"/><path fill="#636363" d="M65.1,18.9h0.6l0.5,0.5c0.8,1,1.4,1.4,1.9,1.4c0.4,0,0.6-0.2,0.6-0.8c0-0.4-0.2-0.7-0.4-0.9l0.8-0.3	c0.2,0.3,0.5,0.8,0.5,1.4c0,1-0.6,1.5-1.4,1.5s-1.3-0.5-1.9-1.1L66,20.3l0,0V22h-0.8L65.1,18.9L65.1,18.9z"/><path fill="#636363" d="M57,15.1h0.6l0.5,0.5c0.8,1,1.4,1.4,1.9,1.4c0.4,0,0.6-0.2,0.6-0.8c0-0.4-0.2-0.7-0.4-0.9L61,15	c0.2,0.3,0.5,0.8,0.5,1.4c0,1-0.6,1.5-1.4,1.5c-0.8,0-1.3-0.5-1.9-1.1l-0.3-0.4l0,0v1.7h-0.8L57,15.1L57,15.1z"/><path fill="#636363" d="M58.1,19c-0.1,0.2-0.3,0.6-0.3,1c0,0.5,0.2,0.8,0.6,0.8c0.5,0,0.6-0.5,0.6-0.9v-0.5h0.8v0.4	c0,0.4,0.2,0.8,0.5,0.8c0.2,0,0.5-0.2,0.5-0.7c0-0.4-0.2-0.8-0.2-0.9l0.8-0.2c0.2,0.2,0.3,0.8,0.3,1.4c0,0.9-0.5,1.4-1.1,1.4	c-0.5,0-0.8-0.2-1-0.8l0,0c-0.1,0.5-0.5,1-1.1,1c-0.8,0-1.4-0.7-1.4-1.8c0-0.6,0.2-1.1,0.3-1.3L58.1,19z"/></g></svg>';
	
	this.init = init;
	function init(){
		
		if(config) {
		//	console.log('assigning config from incoming default and assign to firstConfig');
			epic.firstConfig = $.extend(true, {}, config);
			epic.config = config;
		} else {
			epic.config = $.extend(true, {}, epic.configDefault);
		}
		
		//KEEP: removing the height and width dimensions to the SVG was what I needed to make the svg scalable but aligned to the top of the container.
		epic.svgtemplate = '<button id="clearIO">Clear I/O Modules</button><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="component" type="iounit" id="'+epic.svgID+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 '+epic.bkgdWidth+' '+epic.bkgdHeight+'" enable-background="new 0 0 '+epic.bkgdWidth+' '+epic.bkgdHeight+'" xml:space="preserve"><rect x="0" y="0" fill="#fff" width="'+epic.bkgdWidth+'px" height="'+epic.bkgdHeight+'px"/>' + epicSvgParts + '</svg>'; //</div>
		
		$(epic.searchID).append(epic.svgtemplate);
	
		// ************************* clear I/O button  *************************** //
		$(epic.searchID).find('button#clearIO').css({'background':'#ab0d0d', 'color': '#fff', 'font-size': '1.2em', 'padding-bottom': '0.1em', 'margin-bottom': '0.2em'})
			.on('click', this, function(e){
				e.preventDefault();
				// Assess whether there is any I/O to clear. 
				// read ioconfig
				
				var flag = false;
				//epic.config.io_array
				for (var i = 0; i<epic.config.io_array.length; i++){
					var io = epic.config.io_array[i];
					if (io != '') {
						flag = true;
						break;	
					}
				}
				
				if (flag==true){
					$(epic.searchID).find('.overlay').hide();
					$(epic.searchID).find('rect#select').attr('opacity', 0);
					$(epic.searchID).find('g#clearIO').show();
				}
			});
			
		// ************************* svg chassis size buttons ****************************** //
		$(epic.searchID).find('.cbtn').on('click', this, function(){
			var bttn = $(this);
			var id = bttn.attr('id');
			switch (id){
				case 'c0btn':
					epic.chassissize = 0;
					epic.config.chassis = 'GRV-EPIC-CHS0';
					
				break;
				
				case 'c4btn':
					epic.chassissize = 4;
					epic.config.chassis = 'GRV-EPIC-CHS4';
					
				break;
				case 'c8btn':
					epic.chassissize = 8;
					epic.config.chassis = 'GRV-EPIC-CHS8';
				break;
				case 'c16btn':
					epic.chassissize = 16;
					epic.config.chassis = 'GRV-EPIC-CHS16';
				break;
			}
			epic.redrawIoUnit();
		})
		
			.on('mouseover', this, function(){
				$(this).find('.hlight').attr('opacity', '1');
			})
			
			.on('mouseout', this, function(){
				$(this).find('.hlight').attr('opacity', '0');
			});
		
		// ************************ power supply event listeners ********************** //
		$(epic.searchID).find('#pwr_hotspot').on('click',this, function(){
			showpart(epic.config.powersupply, 'pwr');
			
		})
		.on('mouseover', this, function(){
			$(this).siblings('#pwr_hlight').attr('opacity', '1');
			
		})
		.on('mouseout', this, function(){
			$(this).siblings('#pwr_hlight').attr('opacity', '0');
		});
		
		// ***************************** controller event listeners *************************** //
		$(epic.searchID).find('#controller').on('click',this,function(){
			showpart(epic.config.controller, 'ctrl');
			
		})
		.on('mouseover', this, function(){
			$(this).find('.hlight').attr('opacity', '1');	
		})
		
		.on('mouseout', this, function(){
			$(this).find('.hlight').attr('opacity', '0');	
		});
		
		// ********************* open/close panel button ************************ //
		$(epic.searchID).find('g#openclose').on('click', this, function(){
			var bttn = $(this);
			var state = bttn.attr('state');
			if(state == 0){
				epic.panelOpen = true;
				bttn.attr('state', 1);
				bttn.find('g#open_pnl').hide();
				bttn.find('g#close_pnl').show();
				epic.redrawIoUnit();
			} else {
				epic.panelOpen = false;
				bttn.attr('state', 0);
				bttn.find('g#open_pnl').show();
				bttn.find('g#close_pnl').hide();
				epic.redrawIoUnit();
			}
		})
		.on('mouseover', this, function(){
			$(this).find('.hlight').css({'stroke':'#FCEE21', 'stroke-width': '2'});
		//	$(this).children('g.base').css({'stroke': '#FCEE21', 'stroke-width': '2' });
			//console.log('mouse over')
		})
		.on('mouseout', this, function(){
			$(this).find('.hlight').css({'stroke':'',});
			//console.log('mouse over')
		});
		
		// ******************** build module objects ********************** //
		//Modules are built from code and then placed via transforms. This reduces the svg content of this file and allows the transform coordinates to be used to move overlays.
		var mod = $(epic.searchID).find('g#modules');

		var tArray = [];
		for (var n=0; n<16; n++){
			var v1 = 250 + (46 * n); //434
			tArray.push('4 ' + v1);
		}
		
		var modappend = '';
		
		for (var i=0; i<tArray.length; i++){
			var tCoor = tArray[i];
			var tMod = 'mod'+i;

			var alarm = '<g class="alarm" display="none"><circle fill="#FFFF00" stroke="#000000" stroke-miterlimit="10" cx="296.6" cy="21.7" r="17"/><polygon points="300.6,25.1 301.1,11 292,11 292.5,25.1 "/>	<polygon points="292.6,28.6 292.8,34.2 300.3,34.2 300.5,28.6 "/></g>';
		
			modappend += '<g class="module" id="'+tMod+'" pos="'+i+'" partNo="" sel=0 transform="translate('+tCoor+')"> <rect id="select" opacity="0" x="1" y="1" fill="none" stroke="#FF8348" stroke-width="2" stroke-miterlimit="10" width="329.2" height="42.3"/><rect id="hlight" opacity="0" x="1" y="1" fill="none" stroke="#FF8348" stroke-width="2" stroke-miterlimit="10" width="329.2" height="42.3"/><g class="image" display="none"><g id="image">	<rect id="knob" x="323.7" y="13.5" stroke="#000000" stroke-miterlimit="10" width="6.9" height="16.7"/>	<rect id="top" x="318.7" y="1.4" fill="#4D4D4D" stroke="#000000" stroke-miterlimit="10" width="8.7" height="40.9"/>	<linearGradient id="shape_1_'+i+'" gradientUnits="userSpaceOnUse" x1="355.3564" y1="-283.9033" x2="355.3564" y2="37.9046" gradientTransform="matrix(0 1 -1 0 40.5 -333.5)"><stop  offset="0.8226" style="stop-color:#262626"/>	<stop  offset="0.8696" style="stop-color:#181818"/>	<stop  offset="0.9449" style="stop-color:#060606"/>	<stop  offset="1" style="stop-color:#000000"/>	</linearGradient>	<path id="shape" fill="url(#shape_1_'+i+')" stroke="#000000" stroke-miterlimit="10" d="M23.5,42.3h301.6V1.4H25.2c0,0-23,5.3-23,23.9	C2.2,43.4,23.5,42.3,23.5,42.3z"/><path id="glint" fill="none" stroke="#CCCCCC" stroke-miterlimit="10" d="M325.1,42.3V1.4"/>	<path id="numberpad" d="M292.6,42.3c-40.8,0-17.7-34.1-60.6-34.1L67,8.1c-28.4,0-24.2,34.5-38.8,34.5L292.6,42.3z"/>	<g id="groovsymbol"><g>	<g>	<path fill="#3D3D3D" d="M301.8,36.3c-2.5-0.8-4.9-2.8-4.9-5.7c0-2.6,1.7-4.5,4.8-4.5c0.1,0,0.2,0,0.2,0v-8.3 c-2.5-0.8-4.9-2.8-4.9-5.7c0-2.6,1.7-4.5,4.8-4.5c0.1,0,0.2,0,0.2,0V1.8c-0.1,0-0.2,0-0.3,0c-5.6,0-9.6,3.9-9.6,10						c0,3.9,2,7.4,4.9,9.6c-3,1.6-4.9,4.7-4.9,8.9c0,5.9,4.6,10.8,10,11.9L301.8,36.3L301.8,36.3z"/></g><path fill="#3D3D3D" d="M313.5,32.4c0-3.9-2-7.4-4.9-9.6c3-1.6,4.9-4.7,4.9-8.9c0-6.2-5.1-11.3-10.8-11.9v5.8					c2.7,0.5,5.7,2.7,5.7,5.9c0,2.6-1.7,4.5-4.8,4.5c-0.3,0-0.7,0-1-0.1v8.2c2.7,0.5,5.7,2.7,5.7,5.9c0,2.6-1.7,4.5-4.8,4.5	c-0.3,0-0.7,0-1-0.1v5.8c0.4,0.1,0.8,0.1,1.1,0.1C309.4,42.5,313.5,38.6,313.5,32.4z"/></g></g></g></g><g id="hotspot" opacity="0"><rect x="1.8" y="1" opacity="0.21" fill="#006CA3" enable-background="new    " width="329.2" height="42.3"/>	</g>'+alarm+'</g>'
			
		}
		
		mod.append('<svg>' + modappend + '</svg>');
		// ***************************** module event listeners ********************************** //
		
		$(epic.searchID).find('.module').find('#hotspot').on('click', this, function(){ //called when user clicks blank or placed module
			$(epic.searchID).find('.overlay').hide(); //hide any displayed overlay when module is clicked
			var module = $(this).parent();
			module.find('rect#select').attr('opacity', 1);
			module.siblings().find('rect#select').attr('opacity', 0);
			module.siblings().attr('sel', 0);
			module.attr('sel', 1);//set the sel attribute
			var partNo = module.attr('partNo');
			epic.currentPosition = module.attr('pos');
			epic.modNextOverlay = null; // add this to prevent redisplay of move overlay when a new module is added.
			$(epic.searchID).find('#repov').hide(); //hide the replace module overlay
			$(epic.searchID).find('#show_hlight').hide();
			
			if(partNo !== ''){	//there is a partNumber
				$(epic.searchID).find('#modoverlay').show()
					.attr('transform', module.attr('transform')) ;//get module's transform coordinates to position edit overlay
				epic.editModule(module); 
			} else {
				$(epic.searchID).find('#modoverlay').hide();
			} 
			showpart(partNo, 'mod');
		})
			.on('mouseover', this, function(){
				$(this).parent().find('#hlight').css({stroke: '#ff0', opacity:'0.5'})  ;
		})
			.on('mouseout', this, function(){
				$(this).parent().find('#hlight').css({stroke: '', opacity: '0'});
		});
		
		// ************ module alarm event listener *************** //
		
		
		$(epic.searchID).find('.alarm').on('click', this, function(){
			var trans = $(this).parent().attr('transform');
			$(epic.searchID).find('#modmsg').show()
			
			$(epic.searchID).find('#modmsg').attr('transform', trans);
			
			epic.modPositionError(this)
		})
		
		
		.on('mouseover', this, function(){
			$this = $(this)
			$this.find('circle').css({'stroke': '#ff0', 'fill': '#000'});
			$this.find('polygon').css({'fill': '#ff0'});
		})
		
		.on('mouseout', this, function(){
			$this = $(this)
			$this.find('circle').css({'stroke': '#000', 'fill': '#ff0'});
			$this.find('polygon').css({'fill': '#000'});
		})
		
		
		// ********************** module overlay event listeners ******************************** //
		
		// ************ mod overlay, move left/up button
		$(epic.searchID).find('#moveup').on('click', this, function(){
			var selectedPartNo = $(epic.searchID).find('.module[id=mod'+epic.currentPosition+']').attr('partNo');
			var previous = parseInt(epic.currentPosition) - 1;
			if (previous >= 0){ //check for end of rack, it shouldn't be necessary if move up isn't offered to module 0
				if (epic.config.io_array[parseInt(previous)] == '') {
					epic.config.io_array[parseInt(previous)] = selectedPartNo;
					epic.config.io_array[parseInt(epic.currentPosition)] = '';	
					epic.modNextOverlay = epic.modIdsArray[previous];//store the next module to get the overlay so I can keep overlay displayed for fast moving of modules.
					epic.ModNextPosition = previous;
					epic.redrawIoUnit();			
				} else {
					//find previous open module.
					for (var i=previous; i>=0; i--){
						previous-=1;
						if(epic.config.io_array[previous] == ''){
							epic.config.io_array[previous] = selectedPartNo;
							epic.config.io_array[epic.currentPosition] = '';
							epic.modNextOverlay = epic.modIdsArray[previous];//store the next module to get the overlay so I can keep overlay displayed for fast moving of modules.
							epic.ModNextPosition = previous;
							epic.redrawIoUnit();
							break;
						}
					}
				}
			}	
		})
		
		//rollovers
		.on('mouseover', this, function(){
				//$(this).children().css({'stroke': '#c62f2f', 'stroke-width': '2' });
				$(this).children('g.base').css({'stroke': '#FCEE21', 'stroke-width': '2' });
				//$(this).find('.hlight').show();
		})
		.on('mouseout', this, function(){
				//$(this).children().css({stroke: ''});
				$(this).children('g.base').css({'stroke': '' });
			//	$(this).find('.hlight').hide();
		});
		
		// **************************** mod overlay, move right/down button *****************************  //
		$(epic.searchID).find('#movedown').on('click', this, function(){
			var ioArray = epic.config.io_array;
			selectedPartNo = $(epic.searchID).find('.module[id=mod'+epic.currentPosition+']').attr('partNo');
			var next = parseInt(epic.currentPosition) + 1;
			if (next < 16){ //check for end of rack. This is hard coded at 16 so user can manipulate modules beyond rack, up to 16.
				if (epic.config.io_array[next] == '') { //falls here if next position is open
					epic.config.io_array[next] = selectedPartNo;
					epic.config.io_array[epic.currentPosition] = '';
					epic.modNextOverlay = epic.modIdsArray[next];//store the next module to get the overlay so I can keep overlay displayed for fast moving of modules.
					epic.ModNextPosition = next;
					epic.redrawIoUnit();
				} else { //falls here if next position is not open
					for (var i=next; i<16; i++){ //looking for next opening
						next+=1;
						if(epic.config.io_array[next] == ''){
							epic.config.io_array[next] = selectedPartNo;
							epic.config.io_array[epic.currentPosition] = '';
							epic.modNextOverlay = epic.modIdsArray[next];//store the next module to get the overlay so I can keep overlay displayed for fast moving of modules.
							epic.ModNextPosition = next;
							epic.redrawIoUnit();
							break;
						}
					}	
				}
			}
		})

		//rollovers
		.on('mouseover', this, function(){
			$(this).children('g.base').css({'stroke': '#FCEE21', 'stroke-width': '2' });
			//$(this).find('.hlight').show();
		})
		.on('mouseout', this, function(){
		//	$(this).find('.hlight').hide();
			$(this).children('g.base').css({'stroke': '', });
		});
		
		// *************************** mod overlay, Show Details button ********************************* //
		$(epic.searchID).find('#moddetails').on('click', this, function(){
			var module = $(epic.searchID).find('.module[id=mod'+epic.currentPosition+']');
			var partNo = module.attr("partNo");
			$(epic.searchID).find('#modoverlay').hide();
			$(epic.searchID).find('#show_hlight').show()
				.attr('transform', module.attr('transform'));//apply current module's transform coordinates.
			showpart(partNo, 'details'); //calls parts viewer object
		})
		
		.on('mouseover', this, function(){
			//$(this).find('.hlight').show();
			$(this).children('g.base').css({'stroke': '#FCEE21', 'stroke-width': '2' });
		})
		.on('mouseout', this, function(){
			//$(this).find('.hlight').hide();
			$(this).children('g.base').css({stroke: ''});
		});
		
		// *************************** mod overlay, remove button ****************************** //
		$(epic.searchID).find('#removemod').on('click', this, function(){
			var module = $(epic.searchID).find('.module[id=mod'+epic.currentPosition+']');
			module.attr("partNo", '');
			module.attr("sel", 0);
			$(epic.searchID).find('#modoverlay').hide();
			epic.config.io_array[epic.currentPosition] = '';
			epic.currentPosition = null;
			epic.modNextOverlay = null;
			epic.redrawIoUnit();
			
		})
		.on('mouseover', this, function(){
		//	$(this).find('.hlight').show();
			$(this).children('g.base').css({'stroke': '#FCEE21', 'stroke-width': '2' });
		})
		.on('mouseout', this, function(){
		//	$(this).find('.hlight').hide();
			$(this).children('g.base').css({stroke: ''});
		});
		
		// ************************* mod overlay, cancel button *************************** //
		$(epic.searchID).find('#cancelmod').on('click', this, function(){
			//cancel should clear out selection of module; added this section 
			var module = $(epic.searchID).find('.module[id=mod'+epic.currentPosition+']');
			module.attr("sel", 0); //clear module selection status
			epic.currentPosition = null; //clear current position.
			$(epic.searchID).find('#modoverlay').hide();
		})
		.on('mouseover', this, function(){
			$(this).children('g.base').css({'stroke': '#FCEE21', 'stroke-width': '2' });
		})
		.on('mouseout', this, function(){
			$(this).children('g.base').css({'stroke': ''  });
		});
		
		// ******************************** Additional  listeners for replace message ************************************
		var modReplace = $(epic.searchID).find('#repov');
		modReplace.find('#repov_yes').on('click', this, function(){
			$(epic.searchID).find('#repov').hide();
			var module = $(epic.searchID).find('.module[id=mod'+epic.currentPosition+']');
			module.attr('sel', 0);
			if(epic.modInWaiting != null){
				epic.config.io_array[epic.currentPosition] = epic.modInWaiting;
				epic.redrawIoUnit();
				epic.currentPosition = null;
			}
		})
			.on('mouseover', this, function(){
				$(this).children('g.base').css({'stroke': '#FCEE21', 'stroke-width': '2' });
		})
			.on('mouseout', this, function(){
				$(this).children('g.base').css({'stroke': ''  });
		});
		
		//Replace Module message, "no/cancel" event listener
		modReplace.find('#repov_cancel').on('click', this, function(){  
			$(this).parent('g').hide();
			var module = $(epic.searchID).find('.module[id=mod'+epic.currentPosition+']');
			module.attr('sel',  0);
			module.find('rect#select').attr('opacity', 0);	//NOTE: I need to clear the red highlight in addition to clearing the module overlay
			epic.currentPosition = null;
		})
			.on('mouseover', this, function(){
				$(this).children('g.base').css({'stroke': '#FCEE21', 'stroke-width': '2' });
		})
			.on('mouseout', this, function(){
				$(this).children('g.base').css({'stroke': ''  });
		}); 
		
		// ***************************************************************************************************************
		
		// **************** clear all I/O message **************************** //
		var $clear = $(epic.searchID).find('g#clearIO');
		$clear.find('#clio_yes').on('click', this, function(e){
			epic.clearIo();
			$clear.hide();
		})
		
		.on('mouseover', this, function(e){
			$(this).children('g.base').css({'stroke': '#FCEE21', 'stroke-width': '2' });
		})
		.on('mouseout', this, function(e){
			$(this).children('g.base').css({'stroke': ''  });
		});
		
		$clear.find('#clio_cancel').on('click', this, function(e){
			$clear.hide();
		})
		.on('mouseover', this, function(e){
			$(this).children('g.base').css({'stroke': '#FCEE21', 'stroke-width': '2' });
		})
		.on('mouseout', this, function(e){
			$(this).children('g.base').css({'stroke': ''  });
		});
		
		// ********************* end clear I/O *********************** //
		
		
		// **************** replace config ******************* //
		var $replaceConfig = $(epic.searchID).find('#newconfig')
		
		$replaceConfig.find('#new_yes').on('click', this, function(e){
			epic.config = $.extend(true, {}, epic.configInWaiting);
			epic.modInWaiting = null;
			epic.currentPosition = null;
			epic.redrawIoUnit();
			$replaceConfig.hide();
		})
		
		.on('mouseover', this, function(e){
			$(this).children('g.base').css({'stroke': '#FCEE21', 'stroke-width': '2' });
		})
		.on('mouseout', this, function(e){
			$(this).children('g.base').css({'stroke': ''  });
		});
		
		$replaceConfig.find('#new_cancel').on('click', this, function(e){
			$replaceConfig.hide();
		})
		.on('mouseover', this, function(e){
			$(this).children('g.base').css({'stroke': '#FCEE21', 'stroke-width': '2' });
		})
		.on('mouseout', this, function(e){
			$(this).children('g.base').css({'stroke': ''  });
		});
		// ********************* end replace config ****************** //
		
		$('#' + divContainerID).find('#'+epic.svgID).css({'vertical-align': 'top'});
	// border on SVG content
		$('svg').css({'width': '100%'});//, 'vertical-align':'top' //cosmetic boorder for development 'border': '1px solid rgba(200,0,0,1)', 
		$(epic.searchID).find('#modoverlay').hide();
		$(epic.searchID).find('#repov').hide();
		epic.redrawIoUnit();
		return [epic.placePart, epic.getConfig, epic.buildIncomingConfig];
		
	}  // ************************** end of Init() ********************************* //
	
	// ******************** get config **************************** //
	epic.getConfig = function(){
		return epic.config;
	};
	
	// ******************** build incoming config ******************* //
	epic.buildIncomingConfig = function(newConfig){
		//cf epic.config to epic.defaultconfig; determine if there is a change
		//means of doing so is to save the incoming config as epic.firstConfig and compare it to epic.config
		var changeFlag = false;
		
		if(epic.config.chassis != epic.firstConfig.chassis){
			changeFlag = true;
		}
		
		if(epic.config.controller != epic.firstConfig.controller){
			changeFlag = true;
		}
		
		if (changeFlag == false){
			for (var n = 0; n<16; n++){
				if (epic.config.io_array[n] !== epic.firstConfig.io_array[n]){
						changeFlag = true;
						break;
				} 
			}
		}
		
		if(changeFlag == true){
			//show warning (or do it in this function)
			
			epic.configInWaiting = $.extend(true, {}, newConfig);
			$(epic.searchID).find('.overlay').hide();
			
			$(epic.searchID).find('#newconfig').show();
			
		} else {//modules added?
			epic.config = $.extend(true, {}, newConfig);
		//	epic.modInWaiting = null;
		//	epic.currentPosition = null;
			epic.redrawIoUnit();
		}
	};
	
	// ************************* Add parts *************************** //
	epic.placePart = function(partNo){
		$(epic.searchID).find('.overlay').hide();
		$(epic.searchID).find('#show_hlight').hide();
		
		//get part data
		var partObj = lookuppart(partNo);
		
		switch (partObj.partType) {
			case "module":
				epic.addModule(partObj);
				break;
			case "pwr": 
				epic.config.powersupply = partNo;
				epic.redrawIoUnit();
				break;
			case "ctlr":
				epic.config.controller = partNo;
				epic.redrawIoUnit();
			break;
		}
	};
	
	epic.addModule = function(obj){
		var partNo = '';
		if (epic.currentPosition == null){ //find the next open position
			//interate through modules 0 - 15 and find the first unoccupied module.	If no openings are found, currentPosition remains null.
			for(var i=0; i<16; i++){ //was epic.chassissize to prevent placing modules beyond the rack size, but now that I flag this with a warning, I can allow it
				partNo = $('#' + epic.modIdsArray[i]).attr('partNo');
				if(partNo !=''){
					//nothing, loop to next increment
				} else {
					epic.currentPosition = i;	
					break;
				}
			}
		} 
		
		//second: test the current position for the following:
		//selection valid
			//module has partNumber 
				//selected
				//not selected
			//no part number
				//selected and not selected are handled the same
		//selection not valid (user has run off the end of the rack)
			//rack is 8 mod
			//rack is 16 and can't be made larger
		
		var flag = false;
		partNo = '';
		var sel;
		
		if(epic.currentPosition == null){ //displayed when user adds module when all filled.
			//I've commented out the message now that the text instructions handles this condition.
			alert('The rack is full. Extra modules can be ordered when this configuration is sent to the shopping cart.') ;
		} else {
			partNo = $('#'+epic.modIdsArray[epic.currentPosition]).attr('partNo');
			sel = $('#'+epic.modIdsArray[epic.currentPosition]).attr('sel');
			if (sel == 1){
				if(partNo == ""){
					flag = true; //place module
				} else {//ask before replacing module
					flag = false; 
				}
			} else if (sel==0) { //	place module in unselected position
				flag = true; //place module
			}
		}
		
		if (flag == true){
			//write to config array and redraw rack. Make sure redraw sets partNo property on module. This was done differently on the epic.configurator because
			//I had an option to receive an array of part numbers and didn't want to redraw the rack after each
	
			var module = $(epic.searchID).find('.module[id=mod'+epic.currentPosition+']')
			epic.config.io_array[epic.currentPosition] = obj.partNo;
			epic.redrawIoUnit();
			epic.clearSelection();
			
		} else {
			// ************************************************************************************************************ //	
			// two main conditions:
			// 1: over writing a module. It doesn't matter whether the rack is full or not
			// 2: Placed modules excede 16. It doesn't matter whether there's no rack, an 8-module rack, or a 16 module rack.

			if (epic.currentPosition != null) { //condition 1. Offer replace or cancel for selected module
			//store incoming part number so it can replace existing if user says yes.
				epic.modInWaiting = obj.partNo;
				var module = $(epic.searchID).find('.module[id=mod'+epic.currentPosition+']');
				var modov = $(epic.searchID).find('#modoverlay').hide();
				var msg = $(epic.searchID).find('#repov'); 
				msg.attr('transform', module.attr('transform'))
				msg.show();	
		
			} else { //condition 2: Over 16 modules. Suggest that rack is full, and offer larger rack if nce
				if (epic.chassissize == -1){
					alert('16 is max, but you should select a rack');
				} else if (epic.chassissize == 8){
					alert('16 is max. You may want to choose the 16 module rack');
				} else if (epic.chassissize == 16){
					alert('16 is max.');
				}
			}
			// *********************************************** end ******************************************************** //
		}
	};
	
	// *********************** module error message **************************** //
	
	epic.modPositionError = function(module){
		
		console.log($(module).attr('msg'))
		
		//I need both the module and the message so this can choose between the serial message and the \
		//have the error message assign an attribute to the alarm graphic, called msg. then read it here.
		
		//I may have to rework how to handle errors once serial modules create a 2nd type of error for a module./
		//don't assign click event listener to the alarm graphic till the alarm is displayed.
	/*		var trans = $(this).parent().attr('transform');
			$(epic.searchID).find('#modmsg').show()
			
			$(epic.searchID).find('#modmsg').attr('transform', trans); */
	
	};
	
	epic.modSerialError = function(obj){
		
		
	}
	
	// ************************** module editing ************************* //
	
	epic.editModule = function(module){ //For changing a placed module
	//There may some duplication of when to display and move the I/O edit window, I may move all the funcionality to one location.
		var partNo =  module.attr('partNo');
	//	showparts(partNo, 'list'); //I think list must be a placeholder so that could use an I/O unit later or I thought I'd use list as a code
		if(partNo !== ''){
			//remove any hlighting
			$(epic.searchID).find('rect#select').attr('opacity', 0); 
				//I'm using two highlights. One is with the module image; the other is with the overlay.
												
			var overlay = $(epic.searchID).find('#modoverlay');
			//check if there are open places before and after the selected module to determine if up and down arrows are displayed.
			var upflag = false;
			var downflag = false;
			for(var i=epic.currentPosition; i>-1; i--){
				if(epic.config.io_array[i] == ''){
					upflag = true;
					break;			
				} 
			}
			
			for(var n = epic.currentPosition; n<16; n++){
				if(epic.config.io_array[n] == ''){
					downflag = true;	
					break;
				}
			}
		
			if(upflag==false){ 
				overlay.find('#moveup').hide();
			} else {
				overlay.find('#moveup').show();
			}
			
			if(downflag == false){ //pi.currentPosition >= pi.chassissize-1
				overlay.find('#movedown').hide();
			} else {
				overlay.find('#movedown').show();
			}
		}
	};
	
	epic.clearSelection = function(){
		$(epic.searchID).find('rect#select').attr('opacity', 0);
		epic.currentPosition = null;
	};
	
	epic.clearIo = function(){
		epic.config.io_array = ['', '', '', '',	'', '', '', '', '', '', '', '', '', '', '', '', ];
		epic.currentPosition = null; //didn't hide overlay
		epic.modNextOverlay = null;
		epic.redrawIoUnit();
	};
	
	// ************************* end module editing and moving ********************** //
	
	epic.redrawIoUnit = function(){
		
		if(epic.config.chassis !=='') {
			$(epic.searchID).find('#chassis').attr('partNo', epic.config.chassis);
			switch (epic.config.chassis) {
				case 'GRV-EPIC-CHS16' :
					$(epic.searchID).find('g#c16').show(); //show chassis
					$(epic.searchID).find('g#c8').show(); //show chassis
					$(epic.searchID).find('g#c4').show()
					epic.chassissize = 16;
					epic.config.size = 16;
					
					var bttn = $(epic.searchID).find('#c16btn');
					bttn.find('.bkgd').attr('fill', '#333');
					bttn.siblings().find('.bkgd').attr('fill', '#ab0d0d'); //
					
				break;
				
				case 'GRV-EPIC-CHS8' :
					$(epic.searchID).find('g#c4').show()
					$(epic.searchID).find('g#c8').show()
							.siblings('g#c16').hide(); //show chassis
					epic.chassissize = 8;
					epic.config.size = 8;
					
					var bttn = $(epic.searchID).find('#c8btn');
					bttn.find('.bkgd').attr('fill', '#333');
					bttn.siblings().find('.bkgd').attr('fill', '#ab0d0d'); //
				
				break;
				
				case 'GRV-EPIC-CHS4' :
					$(epic.searchID).find('g#c4').show()
						.siblings('g.chassis').hide(); //show chassis
					epic.chassissize = 4;
					epic.config.size = 4;
					
					var bttn = $(epic.searchID).find('#c4btn');
					bttn.find('.bkgd').attr('fill', '#333');
					bttn.siblings().find('.bkgd').attr('fill', '#ab0d0d'); //
				
				break;
				
				case 'GRV-EPIC-CHS0' :
				
					$(epic.searchID).find('g#c0').show()
						.siblings('g.chassis').hide(); //show chassis
					epic.chassissize = 0;
					epic.config.size = 0;
					
					var bttn = $(epic.searchID).find('#c0btn');
					bttn.find('.bkgd').attr('fill', '#333');
					bttn.siblings().find('.bkgd').attr('fill', '#ab0d0d'); //
				break;
				
				
			}
			//update displayed text for chassis
			$(epic.searchID).find('#chs_txt').text(epic.config.chassis); 
			
	//		console.log('redraw, config.chassis = ' + epic.config.chassis + ', firstConfig.chassis = ' + epic.firstConfig.chassis)
			
		} else {
			epic.chassissize = 0;
			epic.config.size = 0;
			//no chassis; I hope this condition is unreachable
		}
		
		// ************************ do controller ************************** //
		if (epic.config.controller !== ''){
			$(epic.searchID).find('g#controller').show();
			if(epic.panelOpen == true) {
				$(epic.searchID).find('g#panel_open').show();
				$(epic.searchID).find('g#panel_closed').hide();
			} else {
				$(epic.searchID).find('g#panel_open').hide();
				$(epic.searchID).find('g#panel_closed').show();
			}
		} else {
			$(epic.searchID).find('g#controller').hide();
		}
		
		$(epic.searchID).find('#ctrl_txt').text(epic.config.controller)
		
		// *********************** do powersupply ************************* //
		if (epic.config.powersupply !=''){
				$(epic.searchID).find('#pwr_txt').text(epic.config.powersupply)
				$(epic.searchID).find('#pwr_image').show();
		} else {
			$(epic.searchID).find('#pwr_image').hide();
		}

		var count8 = 0;
		var count12 = 0;
		var count24 = 0;


		// ************************* do modules ***************************** //
		for(var i = 0; i<16; i++){	
		//	if(i==7){
		//		console.log(epic.config.io_array[i])	
		//	}
			
			var partNo = epic.config.io_array[i];
			
				if( partNo!=''){
					var obj = lookuppart(partNo);
					
					if (obj.error == false){
						var module = $(epic.searchID).find('.module[pos='+i + ']');
						module.attr('partNo', obj.partNo);
						module.find('g.image').show();
					//	console.log('redraw I/O, i = ' + i)
						var modimage = module.find('g.image');
						
						modimage.children('svg').remove();
						
						switch (obj.colorcode) {
							case 'ai':
								modimage.append(epic.m_ai);
							break;
							case 'ao':
								modimage.append(epic.m_ao);
							break;
							case 'iac': 
								modimage.append(epic.m_iac);
							break;
							case 'idc':
								modimage.append(epic.m_idc);
							break;
							case 'oac':
								modimage.append(epic.m_oac);
							break;
							case 'odc':
								modimage.append(epic.m_odc);
							break;
							case 'ser':
								modimage.append(epic.m_ser);
							break;
							
							default:
							
							break;	
						}
						
						switch(obj.channels) {
							case 4:
								modimage.append(epic.m4);
							break;
							case 8:
								modimage.append(epic.m8);
								count8+=1;
							break;
							case 12:
								modimage.append(epic.m12);
								count12 += 1;
						//		console.log('channels = 12, ? '+ obj.channels)
								//Where am I?  This isn't reading the channel number correctly.
							break;
							case 24:
								modimage.append(epic.m24);
								count24+=1;
							break;
						}
							
						$(epic.searchID).find('text#mod'+i+'_txt').text(partNo)
							.siblings('text#mod'+i+'_pt').text(obj.channels);
							
					} else {
						console.log('Error, part number not recognized for ' + i)	
					}// end of error check loop
					
				} else {	//I think this loop handles a blank module (maybe not as if failed)
					var module = $(epic.searchID).find('.module[pos='+i + ']');
					module.find('g.image').hide();
					module.attr('partNo', '');
					$(epic.searchID).find('text#mod'+i+'_txt').text('')
						.siblings('text#mod'+i+'_pt').text('');
				} 
		}
			
		//redisplays the edit overlay
		if(epic.modNextOverlay!=null){ //pi.modNextOverlay and pi.ModNextPosition are set by the move up and move down functions
			epic.currentPosition = epic.ModNextPosition;
			var module = $(epic.searchID).find('#' +epic.modNextOverlay);
			//Error: This part is called when placing a new module after moving one. This situation needs to be prevented --SOLUTION:  did it by resetting epic.modNextOverlay to null when mod position is clicked.
			$(epic.searchID).find('#modoverlay').show()
				.attr('transform', module.attr('transform')) ;//get module's transform coordinates to position edit overlay
			epic.editModule(module);
		} else { }
		epic.update(); //enable when ready
	}; // *********** end redrawIoUnit

epic.update = function(){ //this is a data update and a check for conflicts.
	// do a set of counts to arrive at any needed instruction.
	
	//Make sure that a serial module is not in slots 4-15.
	
	var instRack = 0;
	var instMods = 0;
	var instOverRun = 0;
	var countRack = -1; //counts modules to compare to length of rack
	var rackFull = 0; 
	
	epic.alarmMsgArray = []
		
	// ******** Check for conflicts and display module warnings ******** // 
	$(epic.searchID).find('.alarm').hide();
	$(epic.searchID).find('#modmsg').hide();
			
	//check rack
	if (epic.config.rack ==''){
		$(epic.searchID).find("#rackalarm").show()
	}
		
	// check brain, anything to check? 
	
	// check power supply
	
	//check I/O
	for (var i=0; i<16; i++){
		var mod = '#'+ epic.modIdsArray[i];
		var partNo = $(mod).attr('partNo');
		if((i>=epic.chassissize)&&(partNo != '')){
			instOverRun = 1;
			if (i < 8){
				epic.alarmMsgArray[i] = 'Recommend larger chassis.';
			} else {
				epic.alarmMsgArray[i] = 'A larger chassis is recommended.';
			}
			
		//	epic.alarmMsgArray[i] = 'This module needs a larger chassis';
			$(mod).find('.alarm').show()
				.attr('msg', 'rack and module location mismatch')
			
			/* no good here. The event listener gets created may times.
				.on('click', this, function(){
					alert('The chassis is too small to support the location of this module.')
				});*/
		} else {
			epic.alarmMsgArray.push('ok')
		}
	}
		
	//UI clean up
	if(epic.modNextOverlay != null){
			
	} else {
		$(epic.searchID).find('#modov').hide();
	}
		
	if(countRack == epic.chassissize - 1){
		rackFull = 1;	
	}
	
	//check for serial module restriction. If present, must be in slots 0-3; 
	//possibilities: wrong position; too many serial modules
	
	var serialCount = 0;
	var serialErrorsArray = [];
	var placesArray = [];
	
	for (var s=0; s<epic.config.io_array.length; s++){
		if(epic.config.io_array[s] != ''){
			if(epic.config.io_array[s] == 'GRV-CSERI-4'){
				serialCount += 1;
				placesArray.push(s);
				if(s>3){
					$(epic.searchID).find('.module[pos='+s + ']').find('.alarm').show()
						.attr('msg', 'serial modules need to be in positions 0-3.')
					console.log('need to move module in position '+ s);
					if(serialCount > 4) {
						//Where am I? I need to work this message into the mix.
						console.log('Only 4 serial modules supported');
					} 
				}
			}
		}
	}
	
	//count point types
	epic.totalAI = 0;
	epic.totalAO = 0;
	epic.totalDI = 0;
	epic.totalDO = 0;
	epic.totalSerial = 0;
		
	for (var i=0; i<epic.config.io_array.length; i++){
		if(epic.config.io_array[i] !== "") {
			var obj = lookuppart(epic.config.io_array[i]);
				
			switch (obj.category) {
				case 1: 
					epic.totalAI += obj.channels;
				break;
				case 2: 
					epic.totalAO += obj.channels;
				break;	
				case 3: 
					epic.totalDI += obj.channels;
				break;	
				case 4: 
					epic.totalDO += obj.channels;
				break;	
				case 5: 
					epic.totalSerial += obj.channels;
				break;	
			}
			$(epic.searchID).find('#'+epic.modIdsArray[i]).find('#price').text(obj.channels);
		} else { //clear price field, which is being used to show channels
			$(epic.searchID).find('#'+epic.modIdsArray[i]).find('#price').text("");
		}
	}
	
	$(epic.searchID).find('#totalAI').text(epic.totalAI);
	$(epic.searchID).find('#totalAO').text(epic.totalAO);
	$(epic.searchID).find('#totalDI').text(epic.totalDI);
	$(epic.searchID).find('#totalDO').text(epic.totalDO);
	$(epic.searchID).find('#totalSerial').text(epic.totalSerial);
	
	};
	
}
