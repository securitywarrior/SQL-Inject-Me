/*
Copyright 2007 Security Compass

This file is part of SQL Inject Me.

SQL Inject Me is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

SQL Inject Me is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with SQL Inject Me.  If not, see <http://www.gnu.org/licenses/>.
*/

/** 
 * AttackRunner.js
 * @requires ResultsManager
 * @requires TabManager
 * @requires AttackHttpResponseObserver
 */

/**
 * \class AttackRunner
 */
function AttackRunner(){

    this.className = "AttackRunner";
    
}

AttackRunner.prototype = {
    testData: null
    ,
    submitForm: function(tab, formIndex){
        dump('going to submit form in tab: ' + tab.nodeName + '\n');
        dump('the forms are: ' + tab.linkedBrowser.contentDocument.forms + 
                ' ' + tab.linkedBrowser.contentDocument.forms  + '\n');
        dump('dorons question: ' + 
                tab.linkedBrowser.contentDocument.getElementsByTagName('form').
                length + '\n');
        dump('tab.linkedBrowser.contentDocument.location.href == ' + 
                tab.linkedBrowser.contentDocument.location.href +
                '\n');
        var forms = tab.linkedBrowser.contentDocument.forms;
        var formFound = false;
        for (var i = 0; i < forms.length && !formFound; i++){
            if (i == formIndex){
                dump('submitting form ... ' + i + ' ' + (i == formIndex) + '\n');
                forms[i].submit();
                formFound = true;
            }
            //debug code..
            else {
                dump('this form is not it... ' + i + ' ' + (i == formIndex) + '\n');  
            }
        }
        return formFound;
    }
    ,
    do_test: function(formPanel, formIndex, field, testValue, resultsManager){
        var mainBrowser = getMainWindow().getBrowser();
        var currentTab = mainBrowser.selectedTab;
        var workTab = null;
        var wroteTabData = false;
        var tabManager = new TabManager();
        var self = this; //make sure we always have a reference to this object
        
        this.testValue = testValue;
        this.formIndex = formIndex;
        this.fieldIndex = field.index;
        
        dump('do_test::curentTab:' + currentTab + '\n');
        tabManager.readTabData(currentTab);
        dump('do_test... tabManager: ' + tabManager + '\n');
        workTab = mainBrowser.addTab('about:blank');
        workTab.linkedBrowser.webNavigation.stop(STOP_ALL);
        mainBrowser.selectedTab = currentTab; //make sure that the stab stays.
        
        setTimeout(afterWorkTabStopped, 10);
            
        function afterWorkTabStopped(event){
            dump('start afterWorkTabStopped\n');
            
            workTab.linkedBrowser.addEventListener('pageshow', 
                    afterWorkTabHasLoaded, false);            
            
            //this also moves worktab to the same page as the currentTab
            tabManager.writeTabHistory(workTab.linkedBrowser.webNavigation);
            
            dump('end afterWorkTabStopped\n');
        }
        
        function afterWorkTabHasLoaded(event) {
            dump('start afterWorkTabHasLoaded\n');
            var formData = null;
            workTab.linkedBrowser.removeEventListener('pageshow', 
                    afterWorkTabHasLoaded, false);
            
            //this will copy all the form data...
            if (field){
                tabManager.writeTabForms(workTab.linkedBrowser.contentDocument.
                        forms,  formIndex, field.index, testValue);
                formData = tabManager.getFormDataForURL(workTab.linkedBrowser.
                        contentDocument.forms,  formIndex, field.index, 
                        testValue);
            }
            else {
                tabManager.writeTabForms(workTab.linkedBrowser.contentDocument.
                        forms,  formIndex, null, null);
                formData = tabManager.getFormDataForURL(workTab.linkedBrowser.
                        contentDocument.forms,  formIndex, null, null);
            }
            self.testData = tabManager.getTabData(workTab.linkedBrowser.
                    contentDocument.forms,  formIndex, field.index);
            dump('attackRunner::testData == ' + this.testData + '\n');
            dump('tab data should be written now\n');
            
            if (window.navigator.platform.match("win", "i")) {
                workTab.linkedBrowser.addEventListener('pageshow', 
                        afterWorkTabHasSubmittedAndLoaded, false);
            }
            else {
                setTimeout(function(){workTab.linkedBrowser.addEventListener('pageshow', 
                        afterWorkTabHasSubmittedAndLoaded, false)}, 1);
            }
                    
            if (resultsManager)
            {
                workTab.linkedBrowser.addEventListener('pageshow', 
                        afterWorkTabHasSubmittedAndLoaded, false); 
                           
                var observerService = Components.
                        classes['@mozilla.org/observer-service;1'].
                        getService(Components.interfaces.nsIObserverService);

                var attackHttpResponseObserver = 
                        new AttackHttpResponseObserver(self, resultsManager);

                resultsManager.addObserver(attackHttpResponseObserver);
                observerService.addObserver(attackHttpResponseObserver, 
                        'http-on-examine-response', false);
                
            }
            var formGotSubmitted = self.submitForm(
                    workTab, formIndex);
            dump('end afterWorkTabHasLoaded '+ formGotSubmitted +'\n');
     
        }
        
        //this should fire only *after* the form has been sumbitted and the new
        //page has loaded.
        function afterWorkTabHasSubmittedAndLoaded(event){
            var results = resultsManager.evaluate(workTab.linkedBrowser, self);
            for each (result in results){
                tabManager.addFieldData(result);
            }
            mainBrowser.removeTab(workTab);
        }
        
    }
    
}