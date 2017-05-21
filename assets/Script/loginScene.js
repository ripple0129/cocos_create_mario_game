cc.Class({
    extends: cc.Component,

    properties: {
        money:{
          default:null,
        }


    },

    // use this for initialization
    onLoad: function () {
        var args = new KBEngine.KBEngineArgs();
    	KBEngine.create(args);
    	this.installEvents();
    },



    /* -----------------------------------------------------------------------/
    							KBEngine 事件响应
    /------------------------------------------------------------------------ */
    installEvents : function()
    {
		// common
		KBEngine.Event.register("onKicked", this, "onKicked");
		KBEngine.Event.register("onDisconnected", this, "onDisconnected");
		KBEngine.Event.register("onConnectionState", this, "onConnectionState");

		// login
		KBEngine.Event.register("onCreateAccountResult", this, "onCreateAccountResult");
		KBEngine.Event.register("onLoginFailed", this, "onLoginFailed");
		KBEngine.Event.register("onVersionNotMatch", this, "onVersionNotMatch");
		KBEngine.Event.register("onScriptVersionNotMatch", this, "onScriptVersionNotMatch");
		KBEngine.Event.register("onLoginBaseappFailed", this, "onLoginBaseappFailed");
		KBEngine.Event.register("onLoginSuccessfully", this, "onLoginSuccessfully");
		KBEngine.Event.register("onReloginBaseappFailed", this, "onReloginBaseappFailed");
		KBEngine.Event.register("onReloginBaseappSuccessfully", this, "onReloginBaseappSuccessfully");
		KBEngine.Event.register("onLoginBaseapp", this, "onLoginBaseapp");
		KBEngine.Event.register("Loginapp_importClientMessages", this, "Loginapp_importClientMessages");
		KBEngine.Event.register("Baseapp_importClientMessages", this, "Baseapp_importClientMessages");
		KBEngine.Event.register("Baseapp_importClientEntityDef", this, "Baseapp_importClientEntityDef");

    },




	onKicked : function(failedcode)
	{
		console.log("kick, disconnect!, reason=" + KBEngine.app.serverErr(failedcode));
	},

	onDisconnected : function()
	{
		console.log("disconnect! will try to reconnect...");
		this.reloginCount = 0;
		this.scheduleOnce(function timerfn(){
        this.onReloginBaseappTimer(this);
        }, 1);
	},

	onReloginBaseappTimer : function(self)
	{
		if(KBEngine.app.socket !== undefined && KBEngine.app.socket !== null)
		{
			return;
		}

		if(this.reloginCount >= 3)
		{
			// 切换起始到场景
			cc.director.runScene(new StartScene());
			return;
		}

		this.reloginCount += 1;

		console.log("will try to reconnect(" + this.reloginCount + ")...");
		KBEngine.app.reloginBaseapp();
		this.scheduleOnce(function timerfn() {
            self.onReloginBaseappTimer(self);
        	    }, 1);
	},

    onReloginBaseappFailed : function(failedcode)
    {
    	console.log("reogin is failed(断线重连失败), err=" + KBEngine.app.serverErr(failedcode));
    },

    onReloginBaseappSuccessfully : function()
    {
	console.log("reogin is successfully!(断线重连成功!)");
    },

	onConnectionState : function(success)
	{
		if(!success)
			console.log("Connect(" + KBEngine.app.ip + ":" + KBEngine.app.port + ") is error! (连接错误)");
		else
			cc.log("Connect successfully, please wait...(连接成功，请等候...)");
	},


    onCreateAccountResult : function(retcode, datas)
    {
		if(retcode !== 0)
		{
			console.log("CreateAccount is error(注册账号错误)! err=" + retcode);
			return;
		}

		//if(KBEngineApp.validEmail(stringAccount))
		//{
		cc.log("createAccount is successfully, Please activate your Email!(注册账号成功，请激活Email!)");
		//}
		//else
		{
			console.log("CreateAccount is successfully!(注册账号成功!)");
		}
    },

    onLoginFailed : function(failedcode)
    {
		if(failedcode == 20)
		{
			console.log("Login is failed(登陆失败), err=" + KBEngine.app.serverErr(failedcode) + ", " + KBEngine.app.serverdatas);
		}
		else
		{
			console.log("Login is failed(登陆失败), err=" + KBEngine.app.serverErr(failedcode));
		}
    },

    onVersionNotMatch : function(clientVersion, serverVersion)
    {
    	console.log("Version not match(curr=" + clientVersion + ", srv=" + serverVersion + " )(版本不匹配)");
        this.serverScriptVersion.setString("serverScriptVersion: " + KBEngine.app.serverScriptVersion);
        this.serverVersion.setString("serverVersion: " + KBEngine.app.serverVersion);
    },

    onScriptVersionNotMatch : function(clientScriptVersion, serverScriptVersion)
    {
    	console.log("ScriptVersion not match(curr=" + clientScriptVersion + ", srv=" + serverScriptVersion + " )(脚本版本不匹配)");
        this.serverScriptVersion.setString("serverScriptVersion: " + KBEngine.app.serverScriptVersion);
        this.serverVersion.setString("serverVersion: " + KBEngine.app.serverVersion);
    },

    onLoginBaseappFailed : function(failedcode)
    {
    	console.log("LoginBaseapp is failed(登陆网关失败), err=" + KBEngine.app.serverErr(failedcode));
    },

    onLoginSuccessfully : function(rndUUID, eid, accountEntity)
    {
    	console.log("Login is successfully!(登陆成功!)");
      this.setEntity(accountEntity)
    	cc.game.addPersistRootNode(this.node)
        cc.director.loadScene('lobby');

    },

    setEntity : function(entity){
      this.accEntity = entity
    },

    getEntity : function(){
      return this.accEntity
    },

    onLoginBaseapp : function()
    {
    	console.log("Connect to loginBaseapp, please wait...(连接到网关， 请稍后...)");
    },

    Loginapp_importClientMessages : function()
    {
        console.log("Loginapp_importClientMessages ...");
    },

    Baseapp_importClientMessages : function()
    {
    	console.log("Baseapp_importClientMessages ...");
    },

    Baseapp_importClientEntityDef : function()
    {
        console.log("Baseapp_importClientEntityDef ...");
    },

    sleep : function (milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
    }
}
});
