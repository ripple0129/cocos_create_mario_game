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



        doDepositButton:{
            default:null,
            type: cc.Button,
        },

        lobbyDepositButton:{
            default:null,
            type: cc.Button
        },

        playButton:{
            default:null,
            type: cc.Button,
        },

        doCancelButton:{
            default:null,
            type: cc.Button
        },


        layout:{
            default:null,
            type: cc.Layout
        },

        accEntity:{
          default:null
        },

        loginScene:{
          default:null
        }

    },

    // use this for initialization
    onLoad: function () {

        this.layout.node.active = false
        var sceneCtrl = this
        this.loginScene = cc.find('accEntity').getComponent('loginScene')
        this.accEntity = this.loginScene.getEntity()
    },




    onPlayButtonClicked: function(){
         cc.director.loadScene("machine");
     },

     onDepositButtonClicked: function(){
         this.lobbyDepositButton.node.active = false
         this.playButton.node.active = false
         this.layout.node.active = true
     },

     onLogoutButtonClicked: function(){
         cc.director.loadScene("logout");
     },

     onBackToLobbyButtonClicked: function(){
         cc.director.loadScene("lobby");
     },

     doDepositBoxInputDidChanged: function(text, sender) {
        this.depositMoney = text
    },

    doDepositButtonOneClicked: function(){
        //this.money.string = parseInt(this.money.string)+parseInt(this.depositMoney)
        this.accEntity.depositOne()
     },

     doDepositButtonTwoClicked: function(){
        //this.money.string = parseInt(this.money.string)+parseInt(this.depositMoney)
        this.accEntity.depositTwo()
     },

     doCancelButtonClicked: function(){
        this.layout.node.active = false
        this.playButton.node.active = true
        this.lobbyDepositButton.node.active = true
     },

     updateMoney:function(money){
       this.money.string = money
     }




    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
