package com.yutian.panel;

/** 面板 JS 桥包装脚本：把 ZeehoNative 映射成面板期望的 ZeehoShell / ZeehoShellTxn / ZeehoCast。 */
final class BridgeScript {

    static final String JS =
            "(function(){try{var N=window.ZeehoNative;if(!N)return;"
            + "function mk(n,b){return function(){var a=Array.prototype.slice.call(arguments);"
            + "try{return b?N.callBool(n,JSON.stringify(a)):N.call(n,JSON.stringify(a));}catch(e){return '';}};}"
            + "var names=['amapIdentity','appLogSession','appVersion','applyPanelUpdate',"
            + "'autoTask','autoTaskScope','background','batteryHistory',"
            + "'batteryOcvHistoryVersion','batterySpan','beginAppLog',"
            + "'beginAppUpdate','beginBatteryHistory','beginBatteryOcvHistory',"
            + "'beginBatterySpan','beginCacheManagement','beginChargeHistory',"
            + "'beginClearChargeHistory','beginDiagStore','beginGpsSpeed',"
            + "'beginImageExport','beginInductiveSession','beginKeepaliveSave',"
            + "'beginNearbyVehicle','beginPageSync','beginPageUpdate',"
            + "'beginPanelLine','beginRideRecording','beginWallpaperTransfer',"
            + "'beginWallpaperTransferLocal','beginWidgetPreview','btDebugClear',"
            + "'btDebugCommands','btDebugFrames','btDebugSend',"
            + "'cancelAe4ControllerWrite','cancelInductiveSession',"
            + "'cancelNearbyVehicle','cancelPanelLine','cancelWallpaperTransfer',"
            + "'captureDiag','captureStatus','chargeLog','checkAppUpdate',"
            + "'checkPageUpdate','checkRootSupervisor','clearCapture',"
            + "'clearCaptureDiag','clearNotifyLog','copyCaptureDiag',"
            + "'detachRideRecording','downloadAppUpdate','dynamicColors',"
            + "'endGpsSpeed','imageExportInfo','inductiveCapabilities',"
            + "'inductiveSessionAction','insets','keepaliveModuleInfo',"
            + "'keepaliveStatus','launchOfficialApp','marketRouteControl',"
            + "'nearbyForeground','notifyGroups','notifyLog','openBtDebug',"
            + "'openInductive','openMeterOta','openOfficialApp','openRecovery',"
            + "'openSettings','openWallpaperTransfer','pageReady','pageReadyV2',"
            + "'panelLineInfo','panelLineVersion','pendingPrize',"
            + "'pollAe4ControllerWrite','pollAppLog','pollAppUpdate',"
            + "'pollBatteryHistory','pollBatteryOcvHistory','pollBatterySpan',"
            + "'pollCacheManagement','pollChargeHistory','pollDiagStore',"
            + "'pollGpsSpeed','pollImageExport','pollInductiveSession',"
            + "'pollKeepaliveSave','pollPageSync','pollPageUpdate','pollPanelLine',"
            + "'pollRideRecording','pollWallpaperTransfer','pollWidgetCar',"
            + "'pollWidgetPreview','prizeCelebrated','refreshBatteryDisplay',"
            + "'releaseTrustVersion','requestAddWidget','requestNearbyPermission',"
            + "'requestNotifications','resetWidgetSettings',"
            + "'resignedUpdateException','restartBackground','restartPage',"
            + "'rideRecordingAction','rootSupervisorStatus','setAutoTask',"
            + "'setAutoTaskScope','setBackground','setDark','setInductiveTheme',"
            + "'setKeepScreenOn','setRootSupervisorEnabled','setThemeColors',"
            + "'setWidgetSetting','setWidgetSettingFor','setWidgetStats',"
            + "'setWidgetStatsForSize','startCapture','stopCapture','storeAll',"
            + "'storeBootstrap','storeCommit','storeCommitBegin','storeCommitPoll',"
            + "'storePut','storeRemove','storeVersion','syncSession',"
            + "'syncSessionV2','syncWidgetCar','taskAccountParamsVersion',"
            + "'updateStatus','wallpaperLocalCapabilities','widgetAddStatus',"
            + "'widgetSettings','widgetSettingsFor','widgetSettingsForSize',"
            + "'requestResignedUpdateException'];"

            + "var boolNames={background:1};"
            + "var s={};for(var i=0;i<names.length;i++){s[names[i]]=mk(names[i],boolNames[names[i]]);}"

            + "window.ZeehoShell=s;"
            + "window.ZeehoShellTxn={version:1,beginRequest:function(){return '1';},pollRequests:function(){return '[]';}};"
            + "var castNames=['version','capabilities','available','getStatus','getDiagnostics','pair','start','stop','requestProjection','forgetProfile','setTier'];"
            + "var c={};for(var j=0;j<castNames.length;j++){c[castNames[j]]=mk('cast.'+castNames[j]);}"
            + "c.version=function(){return '1';};"
            + "window.ZeehoCast=c;"
            + "}catch(e){}})();";

    private BridgeScript() {
    }
}
