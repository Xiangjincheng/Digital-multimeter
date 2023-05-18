Page({
  data: {
    table_flag: 1,
    data_flag:0,
    pic_flag:0,
    vol_ave:20,
    reg_ave:20,
    cur_ave:20,
    rows :[
      {vol: 22, reg:50, cur: 60},
      {vol: 25, reg:50, cur: 60},
      {vol: 27, reg:50, cur: 60},
      {vol: 29, reg:50, cur: 60},
      {vol: 25, reg:50, cur: 60}
    ],
    headers: ['电压(V)', '电阻(KΩ)', '电流(A)'],
    keys: ['vol', 'reg', 'cur'],
    tableConfig: {
      columnWidths: ['228rpx','228rpx','228rpx'],
      border: true,
      scroll: true,
    }
  },
  onLoad: function () {
    var sum_vol=0;
    var sum_reg=0;
    var sum_cur=0;
    for (let index = 0; index <5 ; index++) {
      const vol = this.data.rows[index].vol;
      const reg = this.data.rows[index].reg;
      const cur = this.data.rows[index].cur;
      sum_vol+=vol;
      sum_reg+=reg;
      sum_cur+=cur;
    }
    this.setData({
      vol_ave:sum_vol/5,
      reg_ave:sum_reg/5,
      cur_ave:sum_cur/5
    })
  },
  openline:function(e){
    wx.navigateTo({
      url:'../line/line'
    })
  },
  opendata:function(e){
    wx.navigateTo({
      url:'../data/data'
    })
  },
})
