const app = require('../app.js');
const Agenda = require('agenda');

const connectionOpts = {
  // mongo: mongoose.connection,
  db: {
    address: process.env.MONGODB_URI,
    collection: 'agendaJobs'
  }
};

const agenda = new Agenda(connectionOpts);

const jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : [];

jobTypes.forEach(type => {
  require('./jobs/' + type)(agenda);
});

if (jobTypes.length) {
  agenda.start(); // Returns a promise, which should be handled appropriately
}

module.exports = agenda;