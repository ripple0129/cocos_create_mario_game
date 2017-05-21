cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        
        accountInput: {
            default: null,
            type: cc.EditBox
        },
        passwordInput: {
            default: null,
            type: cc.EditBox
        },
        
        username: {
            default:null
        },
        
        password: {
            default:null
        }
        

    },

    // use this for initialization
    onLoad: function () {
       
    },
    
    accountInputDidChanged: function(text, sender) {
       this.username = text;
    },
    
    passwordInputDidChanged: function(text, sender) {
       this.password = text;
    },

     onLoginButtonClicked: function(){
        KBEngine.Event.fire("login", this.username, this.password, "web-mobile");  
     },
     
     onCreateButtonClicked: function(){
        KBEngine.Event.fire("createAccount", this.username, this.password, "web-mobile");  
     }
     
     
     
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
