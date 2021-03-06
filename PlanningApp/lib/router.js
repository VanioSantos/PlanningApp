Router.configure({
    layoutTemplate: 'layout',
});

Router.route('/', {
  name: 'home',
});
Router.route('/login', {
  name: 'login',
});
Router.route('/upcoming', {
  name: 'upcoming',
  waitOn: function() {
    return Meteor.subscribe("theTasks"), Meteor.subscribe("theGoals");
  },
  loadingTemplate: 'loading',
});
Router.route('/events', {
  name: 'events',
  waitOn: function() {
      return Meteor.subscribe("theUsers"), Meteor.subscribe("theTasks"), Meteor.subscribe("theGoals"), Meteor.subscribe("theTexts");
  },
  loadingTemplate: 'loading',
});
Router.route('/settings', {
  name: 'settings',
});

Router.route('/calendar', {
  name: 'calendar',
  waitOn: function() {
    return Meteor.subscribe("theTasks"), Meteor.subscribe("theGoals");
  },
  loadingTemplate: 'loading',
});

var requireLogin = function() {
		// if the user is not logged in...
    if (!Meteor.userId()) {
        // ...render the home template in order to login
        this.render('login');
    } else {
        // otherwise continue
        this.next();
    }
};

var loggedIn = function() {
  if (Meteor.userId()) {
    this.render('upcoming');
  } else {
    this.next();
  }
};

Router.onBeforeAction(requireLogin, {
		// the only pages that don't require logged in user are:
    except: ['login', 'home']
});

Router.onBeforeAction(loggedIn, {
		// the only pages that don't require logged in user are:
    except: ['upcoming', 'events', 'settings', 'test','calendar']
});

Router.route('/test', {name: 'test'});
