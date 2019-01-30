import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    loadFbLoginApi() {
        window.fbAsyncInit = function () {
            window.window.FB.init({
                appId: '576142106131330',
                cookie: true,
                xfbml: true,
                version: 'v3.2'
            });
        };

        console.log("Loading fb api");
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    componentDidMount() {
        this.loadFbLoginApi();
    }

    testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        window.window.FB.api('/me', function (response) {
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
        });
    }

    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            this.testAPI();
        } else if (response.status === 'not_authorized') {
            console.log("Please log into this app.");
        } else {
            console.log("Please log into this facebook.");
        }
    }

    checkLoginState() {
        window.FB.login(function(response) {
            if (response.authResponse) {
             console.log('Welcome!  Fetching your information.... ');
             window.FB.api('/me', function(response) {
               console.log('Good to see you, ' + response.name + '.');
             });
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'public_profile,email,manage_pages,publish_pages'});
        // window.window.FB.getLoginStatus(function (response) {
        //     console.log(response);
        //     // this.statusChangeCallback(response);
        // });
    }

    handleScriptCreate() {
        this.setState({scriptLoaded: false})
    }

    handleScriptError() {
        this.setState({scriptError: true})
    }

    handleScriptLoad() {
        this.setState({scriptLoaded: true})
    }

    render() {
        return (
            <div>
                <script src="https://connect.facebook.net/en_US/sdk.js"></script>

                < button
                    className="btn-facebook"
                    id="btn-social-login"
                    onClick={this.checkLoginState}
                >
            <span
                className="fa fa-facebook"> 
                </span> Sign in with Facebook
                </button>
            </div>
        )
            ;
    }
}

export default App;
 