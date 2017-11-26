var server_callback = 'https://nickverbeet.com/tracker/status/';


var tracker = new Vue({
	el: '#tracking',
	data: {
		person: {
			name: "Laura Nijenhuis",
		},
		items:[
			{
				id: "item-1",
				name:"Take off",
				time:"± 2 hr 35 min",
				offset: "629px",
			},
			{
				id: "item-2",
				name:"Landing",
				time:"± 15 min",
				offset: "489px",
			},
			{
				id: "item-3",
				name:"Luggage pickup",
				time:"± 10 min",
				offset: "349px",
			},
			{
				id: "item-4",
				name:"Customs",
				time:"± 2 min",
				offset: "209px",
			},
			{
				id: "item-5",
				name:"Embrace",
				time:"",
				offset: "0",
			},
		],
		seconds: 0,
		minutes: 0,
		hours: 0,
	},
	mounted: function() {
		this.setStatus(0);
		var self = this;
		this.interval = setInterval(function() {
			console.log('start');
			self.getState();
		}, 1000);
		
		// setTimeout(function(){
		// 	self.setStatus(1);
		// }, 1500);
		// setTimeout(function(){
		// 	self.setStatus(1);
		// }, 3000);
		// setTimeout(function(){
		// 	self.setStatus(3);
		// }, 4500);
		// setTimeout(function(){
		// 	self.setStatus(4);
		// }, 6000);
	},
	methods: {
		getState: function(){
			var self = this;
			var locationPath = window.location.pathname.split('/');
			locationPath = locationPath[(locationPath.length-1)];
			$.ajax({
                url: server_callback+locationPath,
                method: 'GET',
                success: function (data) {
                    self.setStatus(data.currentZone);
                    var endDate   = new Date();
                    var seconds = parseInt(data.estimatedArrival - endDate.getTime());
                    var minutes = parseInt(seconds / 60);
                    self.seconds = parseInt(seconds % 60);
                    self.minutes = parseInt(minutes % 60)
                    self.hours = parseInt(minutes / 60);

                },
                error: function (error) {
                    //alert(JSON.stringify(error));
                }
            });
		},
		setStatus: function(item){
			$(".future-overlay").css({
				"height": this.items[item].offset,
				"marginTop": "-"+this.items[item].offset,
			});
		},
	}
});