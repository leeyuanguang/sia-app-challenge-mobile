
// Initialize your app
var myApp = new Framework7({
    modalTitle: 'Singapore Airlines',
    // Enable Material theme
    material: true,
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
});
// Add another view, which is in right panel
var rightView = myApp.addView('.view-right', {
});

mainView.router.loadPage("login.html");
var jqueryReady = $.Deferred();
var cordovaReady = $.Deferred();
$(function () {
    jqueryReady.resolve();
});
document.addEventListener("deviceready", function () {
    cordovaReady.resolve();
}, false);

$.when(jqueryReady, cordovaReady).done(function () {
// Login events 
    myApp.onPageInit('login', function (page) {
        $$(page.container).find('.button').on('click', function () {
            var username = $$(page.container).find('input[name="username"]').val();
            var password = $$(page.container).find('input[name="password"]').val();
            myApp.showPreloader('Verifying...')
            if (username == "" || password == "") {
                setTimeout(function () {
                    myApp.hidePreloader();
                }, 800);
                myApp.alert('Invalid Login');
            } else {
                setTimeout(function () {
                    myApp.hidePreloader();
                }, 1800);
                myApp.alert('Welcome Jason!', function () {
                    //mainView.router.back();
                    mainView.router.loadPage("index-logged-in.html");
                });
            }
        });
    });

    myApp.onPageInit('inflight-beverages-detail', function (page) {
        $$('.inflight-order-prompt').on('click', function () {
            myApp.confirm('Are you sure you want to place a request?', function () {
                myApp.showPreloader('Sending request...')
                setTimeout(function () {
                    myApp.hidePreloader();
                }, 1200);
                myApp.alert('Our flight attendants will be with you shortly.');
            });
            var title;
            var price;
            var type;
            title = $('#title1').text();
            price = $('#price1').text();
            type = $('#type1').text();

            $.ajax({
                //url: "http://siaflightattendant.mybluemix.net/api/request?everything=Coke+2+1",
                url: "http://localhost:8080/WebApplication1/api/request?request=Coke+2+1",
                type: 'post', // performing a POST request
                data: {
                    param1: title,
                    param2: price
                },
                dataType: 'json',
                success: function (data)
                {

                }
            });
        });
    });

    myApp.onPageInit('inflight-amenities-detail', function (page) {
        $$('.inflight-order-prompt').on('click', function () {
            myApp.confirm('Are you sure you want to place a request?', function () {
                myApp.showPreloader('Sending request...')
                setTimeout(function () {
                    myApp.hidePreloader();
                }, 1200);
                myApp.alert('Our flight attendants will be with you shortly.');
            });
        });
    });

    myApp.onPageInit('inflight-food-detail', function (page) {
        $$('.inflight-order-prompt').on('click', function () {
            myApp.confirm('Are you sure you want to place a request?', function () {
                myApp.showPreloader('Sending request...')
                setTimeout(function () {
                    myApp.hidePreloader();
                }, 1200);
                myApp.alert('Our flight attendants will be with you shortly.');
            });
        });
    });

    myApp.onPageInit('inflight-menu', function (page) {
        $$('.inflight-order-prompt').on('click', function () {
            myApp.confirm('Are you sure you want to place a request?', function () {
                myApp.showPreloader('Sending request...')
                setTimeout(function () {
                    myApp.hidePreloader();
                }, 1200);
                myApp.alert('Our flight attendants will be with you shortly.');
            });
        });
        $$('.inflight-delight-me-prompt').on('click', function () {
            myApp.confirm('Are you sure you want to place a request?', function () {
                myApp.showPreloader('Generating delights...');
                setTimeout(function () {
                    myApp.hidePreloader();
                }, 800);
                myApp.showPreloader('Guessing your preferences...');
                setTimeout(function () {
                    myApp.hidePreloader();
                }, 2800);
                myApp.alert('Our flight attendants will be with you shortly.');
            });
        });
    });

    myApp.onPageInit('krisair-beauty-detail', function (page) {
        $$('.inflight-order-prompt').on('click', function () {
            myApp.showIndicator();
            setTimeout(function () {
                myApp.hideIndicator();
            }, 500);
        });
    });

    /* ===== Messages Page ===== */
    myApp.onPageInit('messages', function (page) {
        var conversationStarted = false;
        var answers = [
            'Fuck you!',
            'Bitch',
            'Hm...',
            'GO to hell you!!!',
            'you asshole!!',
            'May be ;)',
            'Lorem ipsum dolor sit amet, consectetur',
            'What?',
            'Are you sure?',
            'Of course',
            'Need to think about it',
            'Amazing!!!',
        ];
        var people = [
            {
                name: 'Kate Johanson',
                avatar: 'img/avatar/people-q-c-100-100-9.jpg'
            },
            {
                name: 'Raheed Maden',
                avatar: 'img/avatar/people-q-c-100-100-7.jpg'
            }

        ];
        var answerTimeout, isFocused;

        // Initialize Messages
        var myMessages = myApp.messages('.messages');

        // Initialize Messagebar
        var myMessagebar = myApp.messagebar('.messagebar');

        $$('.messagebar a.send-message').on('touchstart mousedown', function () {
            isFocused = document.activeElement && document.activeElement === myMessagebar.textarea[0];
        });
        $$('.messagebar a.send-message').on('click', function (e) {
            // Keep focused messagebar's textarea if it was in focus before
            if (isFocused) {
                e.preventDefault();
                myMessagebar.textarea[0].focus();
            }
            var messageText = myMessagebar.value();
            if (messageText.length === 0) {
                return;
            }
            // Clear messagebar
            myMessagebar.clear();

            // Add Message
            myMessages.addMessage({
                text: messageText,
                avatar: 'img/avatar/people-q-c-100-100-5.jpg',
                type: 'sent',
                date: 'Now'
            });
            conversationStarted = true;
            // Add answer after timeout
            if (answerTimeout)
                clearTimeout(answerTimeout);
            answerTimeout = setTimeout(function () {
                var answerText = answers[Math.floor(Math.random() * answers.length)];
                var person = people[Math.floor(Math.random() * people.length)];
                myMessages.addMessage({
                    text: answers[Math.floor(Math.random() * answers.length)],
                    type: 'received',
                    name: person.name,
                    avatar: person.avatar,
                    date: 'Just now'
                });
            }, 2000);
        });
    });

    /* ===== empty_conversation Page ===== */
    myApp.onPageInit('empty_conversation', function (page) {
        var conversationStarted = false;
        var answers = [
            'May be ;)',
            'Lorem ipsum dolor sit amet, consectetur',
            'What?',
            'Are you sure?',
            'Of course',
            'Need to think about it',
            'Amazing!!!'
        ];
        var people = [
            {
                name: 'Kate Johanson',
                avatar: 'img/avatar/people-q-c-100-100-9.jpg'
            }
        ];
        var answerTimeout, isFocused;

        // Initialize Messages
        var myMessages = myApp.messages('.messages');

        // Initialize Messagebar
        var myMessagebar = myApp.messagebar('.messagebar');

        $$('.messagebar a.send-message').on('touchstart mousedown', function () {
            isFocused = document.activeElement && document.activeElement === myMessagebar.textarea[0];
        });
        $$('.messagebar a.send-message').on('click', function (e) {
            // Keep focused messagebar's textarea if it was in focus before
            if (isFocused) {
                e.preventDefault();
                myMessagebar.textarea[0].focus();
            }
            var messageText = myMessagebar.value();
            if (messageText.length === 0) {
                return;
            }
            // Clear messagebar
            myMessagebar.clear();

            // Add Message
            myMessages.addMessage({
                text: messageText,
                avatar: 'img/avatar/people-q-c-100-100-5.jpg',
                type: 'sent',
                date: 'Now'
            });
            conversationStarted = true;
            // Add answer after timeout
            if (answerTimeout)
                clearTimeout(answerTimeout);
            answerTimeout = setTimeout(function () {
                var answerText = answers[Math.floor(Math.random() * answers.length)];
                var person = people[Math.floor(Math.random() * people.length)];
                myMessages.addMessage({
                    text: answers[Math.floor(Math.random() * answers.length)],
                    type: 'received',
                    name: person.name,
                    avatar: person.avatar,
                    date: 'Just now'
                });
            }, 2000);
        });
    });


    function removeFromCart(e) {
        $(this).closest('li').remove();
    }
}).error(function () {
    alert("Error setting up");
});