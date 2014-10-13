/**
 * chrome-jironimo
 *
 * @author Kanstantsin Kamkou <2ka.by>
 * @{@link http://github.com/kkamkou/chrome-jironimo}
 * @license http://opensource.org/licenses/BSL-1.0 Boost Software License 1.0 (BSL-1.0)
 */

angular
  .module('jironimo', ['jironimo.settings', 'jironimo.jira', 'jironimo.notifications'])
  .run(
    function (cjSettings, cjJira, cjNotifications) {
      chrome.alarms.create('jironimoRefreshIcon', {periodInMinutes: 1});
      chrome.alarms.create('jironimoStatusCheck', {periodInMinutes: +cjSettings.timer.workspace});

      // notifications.onClicked
      chrome.notifications.onClicked.addListener(function (id) {
        cjNotifications.clear(id, function (err, id) {
          if (err) { return; }

          if (id === 'jironimo-update') {
            chrome.tabs.create({active: true, url: 'http://2ka.by/article/chrome-jironimo'});
            return;
          }

          chrome.tabs.create({active: true, url: cjSettings.account.url + '/browse/' + id});
        });
      });

      // alarms.onAlarm
      chrome.alarms.onAlarm.addListener(
        function (alarm) {
          // alarm validation
          if (!alarm || alarm.name !== 'jironimoStatusCheck') {
            return;
          }

          var cache = [];

          _.where(cjSettings.workspaces, {changesNotify: true}).forEach(
            function (workspace) {
              var query = 'updated > "-%dm" AND '.replace('%d', cjSettings.timer.workspace) +
                workspace.query;

              cjJira.search(query, function (err, result) {
                if (err) { return; }

                _.forEach(result.issues, function (issue) {
                  if (cache[issue.id]) {
                    return;
                  }

                  cache[issue.id] = true;

                  var params = {
                    title: issue.key,
                    eventTime: moment(issue.fields.updated).valueOf(),
                    isClickable: true,
                    message: 'Updated at ' + moment(issue.fields.updated).format('LT')
                  };

                  cjNotifications.createOrUpdate(issue.key, params);
                });
              });
            }
          );
        }
      );

      // alarms.onAlarm
      chrome.alarms.onAlarm.addListener(
        function (alarm) {
          // alarm validation
          if (!alarm || alarm.name !== 'jironimoRefreshIcon') {
            return;
          }

          // defaults
          var timer = _.where(cjSettings.timers || {}, {started: true}).pop();
          if (!timer) {
            return;
          }

          // time difference calculation
          var diff = moment().diff(moment.unix(timer.timestamp + 3600));

          // badge update
          chrome.browserAction.setBadgeText({text: moment(diff).format('HH:mm')});
        }
      );

      // runtime.onInstalled
      chrome.runtime.onInstalled.addListener(function (details) {
        if (details.reason !== 'update') {
          return;
        }

        cjNotifications.createOrUpdate('jironimo-update', {
          title: 'Jironimo updated!',
          message: 'The extension extension has been updated, please check the settings page!'
        });
      });
    }
  );

angular.bootstrap(document, ['jironimo']);