const server_callback = 'https://nickverbeet.com/tracker/status/';


const tracker = new Vue({
  el: '#tracking',
  data: {
    person: {
      name: 'Laura Nijenhuis',
    },
    items: [
      {
        id: 'item-1',
        name: 'Take off',
        time: '± 2 hr 35 min',
        offset: '629px',
      },
      {
        id: 'item-2',
        name: 'Landing',
        time: '± 15 min',
        offset: '489px',
      },
      {
        id: 'item-3',
        name: 'Luggage pickup',
        time: '± 10 min',
        offset: '349px',
      },
      {
        id: 'item-4',
        name: 'Customs',
        time: '± 2 min',
        offset: '209px',
      },
      {
        id: 'item-5',
        name: 'Embrace',
        time: '',
        offset: '0',
      },
    ],
    seconds: 0,
    minutes: 0,
    hours: 0,
  },
  mounted() {
    this.setStatus(0);
    const self = this;
    this.interval = setInterval(() => {
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
    getState() {
      const self = this;
      let locationPath = window.location.pathname.split('/');
      locationPath = locationPath[(locationPath.length - 1)];
      $.ajax({
        url: server_callback + locationPath,
        method: 'GET',
        success(data) {
          self.setStatus(data.currentZoneIndex);
          const endDate = new Date();
          const seconds = parseInt(data.estimatedArrival - endDate.getTime());
          const minutes = parseInt(seconds / 60);
          self.seconds = parseInt(seconds % 60);
          self.minutes = parseInt(minutes % 60);
          self.hours = parseInt(minutes / 60);
        },
        error(error) {
          // alert(JSON.stringify(error));
        },
      });
    },
    setStatus(item) {
      $('.future-overlay').css({
        height: this.items[item].offset,
        marginTop: `-${this.items[item].offset}`,
      });
    },
  },
});
