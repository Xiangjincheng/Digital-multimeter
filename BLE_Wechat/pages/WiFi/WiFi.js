//获取应用实例
const app = getApp()
Page({
  data: {
    userName: '',
    userN:'',
    passWd: '',
    passW:'',
    recievedata:'',
  },
  onLoad() {
    this.setData({
      windowHeight: app.globalData.windowHeight-app.globalData.navHeight
    })
  },
  //用户名和密码输入框事件
  userNameInput:function(e){
    this.setData({
      userN:e.detail.value
    })
  },
  passWdInput:function(e){
    this.setData({
      passW:e.detail.value
    })
  },
  //登录按钮点击事件，调用参数要用：this.data.参数；
  //设置参数值，要使用this.setData({}）方法
  loginBtnClick:function(e){
      this.setData({
        userName: this.data.userN,
        passWd: this.data.passW,
        recievedata: app.globalData.recievedata
      })
  },
  //重置按钮点击事件
  resetBtnClick:function(e){

    this.setData({
      infoMess: '',
      userName: '',
      userN:'',
      passWd: '',
      passW:'',
    })
  },
  //发送蓝牙数据(数据在buffer中写入)
  writeBLECharacteristicValue() {
    var that = this
    var buffer = stringToBytes('W'+this.data.userN+'#'+this.data.passW+'*')
    wx.writeBLECharacteristicValue({
        deviceId: app.globalData.deviceId,
        serviceId: app.globalData.serviceId,
        characteristicId: app.globalData.characteristicId,
        value: buffer,
    })
    //接收蓝牙数据(数据接收到recievedata)
    wx.notifyBLECharacteristicValueChange({
      state: true,
      deviceId: app.globalData.deviceId,
      serviceId: app.globalData.serviceId,
      characteristicId: app.globalData.characteristicId,
      success: function (res) {
        console.log('notifyBLECharacteristicValueChange success', res.errMsg)
      }
    })
    function ab2hex(buffer) {
      var hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function(bit) {
          return ('00' + bit.toString(16)).slice(-2)
        }
      )
      return hexArr.join('');
    }
    wx.onBLECharacteristicValueChange(function (res) {
      var recieveID = ab2hex(res.value)
      console.log('characteristic value comed:', recieveID)
      that.setData({
        recievedata : String.fromCharCode.apply(null, new Uint8Array(res.value))
      })
    })
  }
})
//字符串转byte
function stringToBytes(str){
    var array = new Uint8Array(str.length);
    for (var i = 0, l = str.length; i < l; i++){
      array[i] = str.charCodeAt(i);
    }
    console.log(array);
    return array.buffer;
}