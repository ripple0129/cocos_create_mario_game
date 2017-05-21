cc.Class({
    extends: cc.Component,

    properties: {


        // status:0 preparing, status:1 running, status:2 winning

        money:{
            default:null,
            type:cc.Label,
        },

        backButton:{
            default:null,
            type:cc.Button
        },

        extractButton:{
            default:null,
            type:cc.Button
        },

        //light
        light:{
            default:null,
            type:cc.Sprite
        },

        light2:{
            default:null,
            type:cc.Sprite
        },

        //Numbers
        barNum:{
            default:null,
            type:cc.Label
        },

        sevenNum:{
            default:null,
            type:cc.Label
        },

        starNum:{
            default:null,
            type:cc.Label
        },

        watermelonNum:{
            default:null,
            type:cc.Label
        },

        bellNum:{
            default:null,
            type:cc.Label
        },

        snakemelonNum:{
            default:null,
            type:cc.Label
        },

        orangeNum:{
            default:null,
            type:cc.Label
        },

        appleNum:{
            default:null,
            type:cc.Label
        },

        barButton:{
            default:null,
            type:cc.Button
        },

        sevenButton:{
            default:null,
            type:cc.Button
        },

        starButton:{
            default:null,
            type:cc.Button
        },

        watermelonButton:{
            default:null,
            type:cc.Button
        },

        bellButton:{
            default:null,
            type:cc.Button
        },

        snakemelonButton:{
            default:null,
            type:cc.Button
        },

        orangeButton:{
            default:null,
            type:cc.Button
        },

        appleButton:{
            default:null,
            type:cc.Button
        },

        startButton:{
            default:null,
            type:cc.Button
        },

        bigButton:{
            default:null,
            type:cc.Button
        },

        smallButton:{
            default:null,
            type:cc.Button
        },

        winScore:{
          default:null,
          type:cc.Label
        },

        accEntity:{
            default:null,
        },

    },

    // use this for initialization
    onLoad: function () {
        var loginScene = cc.find('accEntity').getComponent('loginScene')
        this.accEntity = loginScene.getEntity()
        this.accEntity.getAccountInfo()
        KBEngine.Event.register("onGetAccountInfo", this, "onGetAccountInfo");
    },

    onGetAccountInfo : function(info){
      cc.log(info)
        var playctrl = this
        setTimeout(function(){
            playctrl.money.string = info.money
            playctrl.barNum.string = info.barNum
            playctrl.sevenNum.string = info.sevenNum
            playctrl.starNum.string = info.starNum
            playctrl.watermelonNum.string = info.watermelonNum
            playctrl.bellNum.string = info.bellNum
            playctrl.snakemelonNum.string = info.snakemelonNum
            playctrl.orangeNum.string = info.orangeNum
            playctrl.appleNum.string = info.appleNum
            playctrl.winScore.string = info.winScore
            playctrl.resultItemHandler(info.resultItem)
            playctrl.bigSmallHandler(info.bigSmall)
          },10)
    },

    resultItemHandler: function(resultItem){
      var x1 = 193, x2 = 226, x3 = 288, x4 = 355, x5 = 421, x6 = 485, x7 = 513
      var y1 = 560, y2 = 531, y3 = 469, y4 = 406, y5 = 342, y6 = 281, y7 = 254
      var lightNode = this.light.node
      lightNode.active = true
      if(resultItem=='right_once_again'){lightNode.x=x7;lightNode.y=y4}
      else if(resultItem=='left_once_again'){lightNode.x=x1;lightNode.y=y4}
      else if(resultItem=='little_apple'){lightNode.x=x6;lightNode.y=y1}
      else if(resultItem=='little_orange'){lightNode.x=x7;lightNode.y=y6}
      else if(resultItem=='little_snakemelon'){lightNode.x=x2;lightNode.y=y7}
      else if(resultItem=='little_bell'){lightNode.x=x1;lightNode.y=y2}
      else if(resultItem=='little_watermelon'){lightNode.x=x7;lightNode.y=y3}
      else if(resultItem=='little_star'){lightNode.x=x1;lightNode.y=y5}
      else if(resultItem=='little_seven'){lightNode.x=x5;lightNode.y=y7}
      else if(resultItem=='little_bar'){lightNode.x=x3;lightNode.y=y1}
      else if(resultItem=='bar'){lightNode.x=x4;lightNode.y=y1}
      else if(resultItem=='seven'){lightNode.x=x4;lightNode.y=y7}
      else if(resultItem=='star'){lightNode.x=x1;lightNode.y=y6}
      else if(resultItem=='watermelon'){lightNode.x=x7;lightNode.y=y2}
      else if(resultItem=='bell'){
        if(Math.floor((Math.random() * 2) + 1)==1){
          lightNode.x=x2;lightNode.y=y1
        }else{
          lightNode.x=x6;lightNode.y=y7
        }
      }
      else if(resultItem=='snakemelon'){
        if(Math.floor((Math.random() * 2) + 1)==1){
          lightNode.x=x7;lightNode.y=y1
        }else{
          lightNode.x=x1;lightNode.y=y7
        }
      }
      else if(resultItem=='orange'){
        if(Math.floor((Math.random() * 2) + 1)==1){
          lightNode.x=x1;lightNode.y=y1
        }else{
          lightNode.x=x7;lightNode.y=y7
        }
      }
      else if(resultItem=='apple'){
        var applePos = Math.floor((Math.random() * 4) + 1)
        if(applePos==1){
          lightNode.x=x5;lightNode.y=y1
        }else if(applePos==2){
          lightNode.x=x1;lightNode.y=y3
        }else if(applePos==3){
          lightNode.x=x3;lightNode.y=y7
        }else{
          lightNode.x=x7;lightNode.y=y5
        }
      }else{
        lightNode.active = false
      }
    },

    bigSmallHandler: function(bigSmall){
      if(bigSmall == 1){
        this.light2.node.setPosition(257,285)
        this.light2.node.active=true
      }else if(bigSmall == 2){
        this.light2.node.setPosition(451,285)
        this.light2.node.active=true
      }else{
        this.light2.node.active = false
      }

    },

    pressBarButton: function(){
        if(this.barNum.string!='99' && parseInt(this.money.string)>=5){
            this.accEntity.pressBarButton()
            this.accEntity.getAccountInfo()
        }
    },

    pressSevenButton: function(){
        if(this.sevenNum.string!='99' && parseInt(this.money.string)>=5){
            this.accEntity.pressSevenButton()
            this.accEntity.getAccountInfo()
        }
    },

    pressStarButton: function(){
        if(this.starNum.string!='99' && parseInt(this.money.string)>=5){
            this.accEntity.pressStarButton()
            this.accEntity.getAccountInfo()
        }
    },

    pressWatermelonButton: function(){
      if(this.watermelonNum.string!='99' && parseInt(this.money.string)>=5){
        this.accEntity.pressWatermelonButton()
        this.accEntity.getAccountInfo()
      }
    },

    pressBellButton: function(){
      if(this.bellNum.string!='99' && parseInt(this.money.string)>=5){
        this.accEntity.pressBellButton()
        this.accEntity.getAccountInfo()
      }
    },

    pressSnakemelonButton: function(){
      if(this.snakemelonNum.string!='99' && parseInt(this.money.string)>=5){
        this.accEntity.pressSnakemelonButton()
        this.accEntity.getAccountInfo()
      }
    },

    pressOrangeButton: function(){
      if(this.orangeNum.string!='99' && parseInt(this.money.string)>=5){
        this.accEntity.pressOrangeButton()
        this.accEntity.getAccountInfo()
      }
    },

    pressAppleButton: function(){
      if(this.appleNum.string!='99' && parseInt(this.money.string)>=5){
        this.accEntity.pressAppleButton()
        this.accEntity.getAccountInfo()
      }
    },

    pressStartButton: function(){
        this.accEntity.pressStartButton()
        this.accEntity.getAccountInfo()
    },

    pressBackButton: function(){
        cc.director.loadScene("lobby");
    },

    pressWinScoreToMoneyButton: function(){
        this.accEntity.pressWinScoreToMoneyButton()
        this.accEntity.getAccountInfo()
    },

    pressClearButton: function(){
        this.accEntity.pressClearButton()
        this.accEntity.getAccountInfo()
    },

    pressBigButton: function(){
        this.accEntity.pressBigButton()
        this.accEntity.getAccountInfo()
    },

    pressSmallButton: function(){
        this.accEntity.pressSmallButton()
        this.accEntity.getAccountInfo()
    },



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
