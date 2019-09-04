const pm2 = require('pm2')

pm2.connect(function(err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  pm2.start([
    {
      script             : "server.js",
    },
  ]
    , function(err, proc) {
      if(err) {
        throw err
      }
    });

  pm2.launchBus((err, bus) => {
    bus.on('log:out', data => {
      (data.data);
    });
    bus.on('log:err', data => {
      console.log(data.data);
    });
  });
})
